const { createLogger, transports, format } = require("winston");

const LokiTransport = require("winston-loki");

let logger;

const { client, service, hideSensitiveProperies, sourceIpAddress } =
  process.env;

const envsToNotShowLogs = ["local", "test"];

const {
  LEVEL_DEBUG,
  LEVEL_ERROR,
  LEVEL_FAIL,
  LEVEL_INFO,
  LEVEL_PENDING,
  LEVEL_WARN,
} = require("./constants");

const initializeLogger = () => {
  if (logger) {
    return;
  }

  logger = createLogger({
    transports: [
      new LokiTransport({
        host: process.env.GRAFANA_HOST,
        labels: {
          app: `${process.env.client}-serverless`,
          function: `${process.env.client}-${process.env.service}`,
        },
        json: true,
        format: format.json(),
        basicAuth: `${process.env.GRAFANA_USER}:${process.env.GRAFANA_AUTH}`,
        replaceTimestamp: true,
        onConnectionError: (err) => console.error(err),
      }),
      new transports.Console({
        format: format.combine(format.simple(), format.colorize()),
      }),
    ],
  });
};

const hideSensitiveData = (object, propertiesToHide) => {
  const newObject = JSON.parse(JSON.stringify(object));

  propertiesToHide.forEach((property) => {
    if (object[property]) {
      newObject[property] = "** sensitive data **";
    }
  });

  return newObject;
};

const generateLogPayload = (level, payload = {}, propertiesToHide = []) => {
  const toHide = [];
  const newPayload = JSON.parse(JSON.stringify(payload));

  if (propertiesToHide && propertiesToHide.length) {
    toHide.push(propertiesToHide);
  }

  if (hideSensitiveProperies && hideSensitiveProperies.length) {
    toHide.push(hideSensitiveProperies);
  }

  if (payload.response && payload.response.body) {
    const hidedObject = hideSensitiveData(payload.response.body, toHide);
    newPayload.response.body = hidedObject;
  }

  return {
    level,
    newPayload,
    client,
    service,
    ipAddress: sourceIpAddress,
  };
};

const initLog = (logPayload, level) => {
  const startDate = new Date();

  if (!logger) {
    initializeLogger();
  }

  const customLog = {
    debug,
    pending,
    info,
    warn,
    error,
    fail,
  }[level](logPayload);

  return () => ({
    ...customLog,
    duration: (new Date() - startDate) / 1000,
  });
};

const logPayloadAccordingLevel = (level, payload) => {
  const logPayload = JSON.stringify(payload, null, 2);

  switch (level) {
    case LEVEL_DEBUG:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.debug(logPayload);
      }

      logger.debug(logPayload);
      break;
    case LEVEL_PENDING:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.info(logPayload);
      }

      logger.info(logPayload);
      break;
    case LEVEL_INFO:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.info(logPayload);
      }

      logger.info(logPayload);
      break;
    case LEVEL_WARN:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.warn(logPayload);
      }

      logger.warning(logPayload);
      break;
    case LEVEL_ERROR:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.error(logPayload);
      }

      logger.error(logPayload);
      break;
    case LEVEL_FAIL:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.error(logPayload);
      }

      logger.error(logPayload);
      break;
    default:
      if (envsToNotShowLogs.includes(process.env.stage)) {
        return console.info(logPayload);
      }

      logger.info(logPayload);
      break;
  }
};

const log = (level, payload, propertiesToHide = []) => {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  const logPayload = generateLogPayload(level, payloadCopy, propertiesToHide);

  if (process.env.stage) {
    logPayloadAccordingLevel(level, logPayload);
  }

  return payload;
};

/**
 * Creates DEBUG log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const debug = (payload, propertiesToHide = []) => {
  return log(LEVEL_DEBUG, payload, propertiesToHide);
};

/**
 * Creates PENDING log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const pending = (payload, propertiesToHide = []) => {
  return log(LEVEL_PENDING, payload, propertiesToHide);
};

/**
 * Creates INFO log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const info = (payload, propertiesToHide = []) => {
  return log(LEVEL_INFO, payload, propertiesToHide);
};

/**
 * Creates WARN log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const warn = (payload, propertiesToHide = []) => {
  return log(LEVEL_WARN, payload, propertiesToHide);
};

/**
 * Creates ERROR log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const error = (payload, propertiesToHide = []) => {
  return log(LEVEL_ERROR, payload, propertiesToHide);
};

/**
 * Creates FAIL log information for internal requests.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
const fail = (payload, propertiesToHide = []) => {
  return log(LEVEL_FAIL, payload, propertiesToHide);
};

module.exports = {
  debug,
  pending,
  info,
  warn,
  error,
  fail,
  initLog,
  logger,
};
