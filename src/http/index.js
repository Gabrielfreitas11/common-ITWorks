const axios = require("axios");

const logger = require("../logger");

const logAdapter = async ({
  statusCode = null,
  response = { data: "" },
  options,
  log,
  error = null,
}) => {
  if (error) {
    await logger.fail(
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
  await logger[logType](
    {
      request: options,
      response: {
        statusCode,
        body:
          options.responseType === "stream"
            ? "**STREAM**"
            : response.data instanceof Buffer
            ? { type: "Buffer", data: "**ARRAYBUFFER**" }
            : JSON.stringify(response.data).length > 10.0
            ? { type: "Provavelmente Base64", data: "**Retorno muito grande**" }
            : response.data, // eslint-disable-line
      },
    },
    log
  );
};

module.exports.request = async function request(
  options,
  optionsHttpsAgent = null
) {
  const log = logger.initLog({ request: options }, "pending");

  const optionsAxios =
    optionsHttpsAgent && optionsHttpsAgent.httpsAgent
      ? optionsHttpsAgent
      : options;

  return axios(optionsAxios).then(
    async (response) => {
      const logPayload = log();

      await logAdapter({
        statusCode: response.status,
        response,
        options,
        log: logPayload,
      });
      return response;
    },
    async (error) => {
      const logPayload = log();

      await logAdapter({ error, options, log: logPayload });
      throw error;
    }
  );
};