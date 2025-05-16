import { HttpResponseModel } from "../../@types/http";
import * as logger from "../../logger";

export default class BaseHandler {
  event: any = null;

  context = null;

  env = process.env;

  async handle(event, context, method) {
    let log;

    this.setFunctionContext(event, context);

    const origin = event.headers?.origin || event.headers?.Origin;

    if (JSON.stringify(event?.headers)?.toUpperCase().includes("DB_NAME")) {
      global.DB_NAME = event.headers.DB_NAME ?? event.headers.db_name;
    }

    if (JSON.stringify(event?.headers)?.toLowerCase().includes("usuario_compartilhado")) {
      global.USUARIO_COMPARTILHADO = event.headers.USUARIO_COMPARTILHADO ?? event.headers.usuario_compartilhado;
    }

    if (JSON.stringify(event?.headers)?.toLowerCase().includes("email_login")) {
      global.EMAIL_LOGIN = event.headers.EMAIL_LOGIN ?? event.headers.email_login;
    }

    if (JSON.stringify(event?.headers)?.toLowerCase().includes("cnpj_gestor")) {
      global.CNPJ_GESTOR = event.headers.CNPJ_GESTOR ?? event.headers.cnpj_gestor;
    }

    if (JSON.stringify(event?.headers)?.includes("form-data")) {
      event.body = JSON.stringify({
        formData: event.body,
      });

      const newEvent = { ...event };

      newEvent.body = JSON.stringify({
        formData: "***FORMDATA***",
      });

      log = logger.initLog({ event: newEvent, context }, "pending");
    } else if (JSON.stringify(event?.body)?.includes("base64")) {
      let newEvent = JSON.parse(event.body);

      newEvent.base64 = "***BASE64***";

      newEvent = JSON.stringify(newEvent);

      log = logger.initLog({ event: newEvent, context }, "pending");
    } else {
      log = logger.initLog({ event, context }, "pending");
    }
    try {
      if (!this.isAuthorized()) {
        const logPayload = log();
        logPayload.response = {
          statusCode: 401,
          message: "Unauthorized!",
        };

        logger.initLog(logPayload, "warn");

        return BaseHandler.httpResponse({
          statusCode: 401,
          body: JSON.stringify(logPayload.response),
        });
      }

      context.callbackWaitsForEmptyEventLoop = false;

      let response;

      if (typeof this[method] == "object") {
        response = await this[method]["default"](event, context);
      } else {
        response = await this[method](event, context);
      }

      if (response?.status) {
        response.statusCode = response?.status;
      }

      const logPayload = log();

      logPayload.response = { ...response };

      if (response.statusCode >= 200 && response.statusCode <= 299) {
        logger.initLog(logPayload, "info");
      } else {
        logger.initLog(logPayload, "error");
      }

      let body =
        typeof response === "string" ? response : JSON.stringify(response);

      if (JSON.parse(body)?.custom) {
        body = JSON.stringify(JSON.parse(body)?.body);
      }

      const returnFunction = BaseHandler.httpResponse({
        statusCode: response.statusCode,
        body,
        headers: response.headers,
      });

      return returnFunction;
    } catch (err) {
      const logPayload = log();

      const message =
        err?.response && err?.response?.data
          ? err.response.data
          : err?.message || err;

      logger.initLog(logPayload, "error");

      return BaseHandler.httpResponse({
        statusCode: 500,
        body: message,
      });
    }
  }

  setFunctionContext(event, context) {
    this.event = event;
    this.context = context;

    process.env.sourceIpAddress =
      event.requestContext &&
      event.requestContext.identity &&
      event.requestContext.identity.sourceIp
        ? event.requestContext.identity.sourceIp
        : null;
  }

  static httpResponse(data: HttpResponseModel) {
    return {
      statusCode: data.statusCode,
      body: data.body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, cnpj, type, cnpj_gestor",
        ...(data.headers ?? {}),
      },
    };
  }

  isAuthorized() {
    const checkByAuthMethod = {
      header: this.authHeaderIsTheSameInTheEnvironment(),
    }[this.env.authMethod ?? "header"];

    if (checkByAuthMethod === undefined) {
      return true;
    }
    return checkByAuthMethod;
  }

  authHeaderIsTheSameInTheEnvironment() {
    if (this.event.headers === undefined || this.env.noAuth) {
      return true;
    }

    return (
      this.event.headers.Authorization === this.env.authToken ||
      this.event.headers.authorization === this.env.authToken
    );
  }
}
