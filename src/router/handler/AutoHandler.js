/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require("fs");
const BaseHandler = require("./BaseHandler");

/**
 * @param {string} controllersPath path to the folder containing the routes
 * @param  {...Function<Promise>} middlewares any number of middlewares that alter the request response
 */
const AutoHandler = (
  controllersPath,
  allowMethodsDiableCors,
  ...middlewares
) => {
  class MyHandler extends BaseHandler {}
  const handler = new MyHandler();

  const paths = Array.isArray(controllersPath)
    ? controllersPath
    : [controllersPath];

  const functionsToExport = {};

  paths.forEach((controllerPath) => {
    const folders = fs.readdirSync(controllerPath);

    folders.forEach((service) => {
      handler[service] = require(`${controllerPath}/${service}`);
      functionsToExport[service] = (event, context) => {
        const requestPromise = handler.handle(
          event,
          context,
          service,
          allowMethodsDiableCors
        );

        // add middlewares if needed
        if (middlewares.length === 0) {
          return requestPromise;
        }

        const lastPromise = middlewares.reduce((promise, middleware) => {
          return middleware(promise, service, event, context, BaseHandler);
        }, requestPromise);

        return lastPromise;
      };
    });
  });

  return functionsToExport;
};
module.exports = AutoHandler;
