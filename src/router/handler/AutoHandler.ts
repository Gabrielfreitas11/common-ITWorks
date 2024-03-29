import * as fs from 'fs';
import BaseHandler from './BaseHandler';

const AutoHandler = (controllersPath: string[] | string, ...middlewares) => {
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
        const requestPromise = handler.handle(event, context, service);

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
export default AutoHandler;
