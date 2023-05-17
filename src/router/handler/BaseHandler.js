const allowedOrigins = [
  "http://localhost:4200",
  "https://app.impostograma.com.br",
];
const logger = require("../../logger");

module.exports = class BaseHandler {
  event = null;

  context = null;

  env = process.env;

  async handle(event, context, method, ignoreBaseHandler) {
    let log;

    this.setFunctionContext(event, context);

    const origin = event.headers?.origin || event.headers?.Origin;

    if (ignoreBaseHandler) return this[method](event, context);

    if (!(await this.isAuthorized())) {
      const logPayload = log();
      logPayload.response = {
        statusCode: 401,
        message: "Unauthorized!",
      };

      logger.initLog(logPayload, "warn");

      return BaseController.httpResponse(
        401,
        JSON.stringify(logPayload.response),
        null,
        origin
      );
    }

    try {
      if (JSON.stringify(event?.headers).includes("form-data")) {
        event.body = JSON.stringify({
          formData: event.body,
        });

        const newEvent = { ...event };

        newEvent.body = JSON.stringify({
          formData: "***FORMDATA***",
        });

        log = logger.initLog({ event: newEvent, context }, "pending");
      } else {
        log = logger.initLog({ event, context }, "pending");
      }

      context.callbackWaitsForEmptyEventLoop = false;

      const response = await this[method](event, context);

      const logPayload = log();

      logPayload.response = response;

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

      return BaseHandler.httpResponse(500, message, null, origin);
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
    const allowOriginIndex = allowedOrigins.findIndex((el) => el == origin);

    return {
      statusCode,
      body,
      headers: {
        "Access-Control-Allow-Origin":
          origin == null
            ? "*"
            : allowedOrigins[allowOriginIndex == -1 ? 0 : allowOriginIndex],
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
    if (this.event.headers === undefined) {
      return true;
    }

    return (
      this.event.headers.Authorization === this.env.authToken ||
      this.event.headers.authorization === this.env.authToken
    );
  }
};
