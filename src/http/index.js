const axios = require("axios");

const logger = require("../logger");

const logAdapter = ({
  statusCode = null,
  response = { data: "" },
  options,
  log,
  error = null,
}) => {
  if (error) {
    logger.fail(
      {
        request: options,
        response: error?.response
          ? error.response?.data
          : error?.Error || "Ocorreu um erro interno",
      },
      log
    );
    return;
  }
  const logType = statusCode < 200 || statusCode > 299 ? "fail" : "info";
  logger[logType](
    {
      request: options,
      response: {
        statusCode,
        body:
          options.responseType === "stream"
            ? "**STREAM**"
            : response.data instanceof Buffer
            ? { type: "Buffer", data: "**ARRAYBUFFER**" }
            : JSON.stringify(response.data).length > 10000
            ? {
                type: "Base64 ou JSON muito grande",
                data: "**Retorno muito grande**",
              }
            : response.data, // eslint-disable-line
      },
    },
    log
  );
};

module.exports = async (options, optionsHttpsAgent = null) => {
  const log = logger.initLog({ request: options }, "pending");

  const optionsAxios =
    optionsHttpsAgent && optionsHttpsAgent.httpsAgent
      ? optionsHttpsAgent
      : options;

  return axios(optionsAxios).then(
    async (response) => {
      const logPayload = log();

      logAdapter({
        statusCode: response.status,
        response,
        options,
        log: logPayload,
      });
      return response;
    },
    async (error) => {
      const logPayload = log();

      logAdapter({ error, options, log: logPayload });
      throw error;
    }
  );
};
