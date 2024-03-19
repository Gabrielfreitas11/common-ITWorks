const logger = require("../../logger");

module.exports = class BaseHandler {
  event = null;

  context = null;

  env = process.env;

  async handle(event, context, method) {
    let log;

    this.setFunctionContext(event, context);

    const origin = event.headers?.origin || event.headers?.Origin;

    if (JSON.stringify(event?.headers)?.toUpperCase().includes("DB_NAME")) {
      global.DB_NAME = event.headers.DB_NAME ?? event.headers.db_name
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
      if (!(await this.isAuthorized())) {
        const logPayload = log();
        logPayload.response = {
          statusCode: 401,
          message: "Unauthorized!",
        };

        logger.initLog(logPayload, "warn");

        return BaseHandler.httpResponse(
          401,
          JSON.stringify(logPayload.response),
          null,
          origin
        );
      }

      context.callbackWaitsForEmptyEventLoop = false;

      const response = await this[method](event, context);

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

      const returnFunction = BaseHandler.httpResponse(
        response.statusCode,
        typeof response === "string" ? response : JSON.stringify(response),
        response.headers,
        origin
      );

      return returnFunction;
    } catch (err) {
      const logPayload = log();

      const message =
        err?.response && err?.response?.data
          ? err.response.data
          : err?.message || err;

      logger.initLog(logPayload, "error");

      return BaseHandler.httpResponse(
        500,
        message,
        null,
        origin,
        this.allowMethodsDiableCors,
        this.method
      );
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

  static httpResponse(statusCode, body, headers = {}, origin) {
    return {
      statusCode,
      body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, cnpj, type, cnpj_gestor",
        ...headers,
      },
    };
  }

  isAuthorized() {
    const checkByAuthMethod = {
      header: this.authHeaderIsTheSameInTheEnvironment(),
    }[this.env.authMethod];

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
};
