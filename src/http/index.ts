import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LogAdapterModel } from "../@types/logger";

import * as logger from "../logger";

const logAdapter = ({
  statusCode = 0,
  response = { data: "" },
  options,
}: LogAdapterModel) => {
  if (JSON.stringify(options?.headers)?.includes("form-data")) {
    options.data = {
      formData: "***FORMDATA***",
    };
  }

  const logType = statusCode < 200 || statusCode > 299 ? "fail" : "info";
  logger[logType]({
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
  });
};

const handler = async (
  options: AxiosRequestConfig,
  logData = true,
  optionsHttpsAgent: any = null
) => {
  let log;

  if (JSON.stringify(options?.headers)?.includes("form-data")) {
    const newOptions = { ...options };

    newOptions.data = {
      formData: "***FORMDATA***",
    };

    log = logger.initLog({ request: newOptions }, "pending", logData);
  } else {
    let newOptions = { ...options };

    if (!logData) {
      newOptions = {
        data: "***LOG DESABILITADO***",
      };
    }

    log = logger.initLog({ request: newOptions }, "pending", logData);
  }

  const optionsAxios =
    optionsHttpsAgent && optionsHttpsAgent?.httpsAgent
      ? optionsHttpsAgent
      : options;

  return axios(optionsAxios).then(
    async (response) => {
      logAdapter({
        statusCode: response.status,
        response,
        options,
      });
      return response;
    },
    async (error: AxiosError) => {
      logAdapter({ error, options, statusCode: 500 });
      throw error;
    }
  );
};

export { handler };
