/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import * as fs from "fs";
import BaseHandler from "./BaseHandler";

/**
 * @param controllersPath - Caminho(s) para a(s) pasta(s) contendo os controllers das rotas.
 * @param allowMethodsDiableCors - Métodos com CORS desabilitado.
 * @param publicMethods - Métodos que não exigem autenticação.
 *                        O nome deve corresponder ao nome do arquivo/pasta do controller.
 * @param middlewares - Middlewares adicionais que processam a requisição/resposta.
 */
const AutoHandler = (
  controllersPath,
  allowMethodsDiableCors,
  publicMethods: string[] = [],
  ...middlewares
) => {
  class MyHandler extends BaseHandler {}
  const handler = new MyHandler();
  handler.publicMethods = publicMethods;

  const paths = Array.isArray(controllersPath)
    ? controllersPath
    : [controllersPath];

  const functionsToExport = {};

  paths.forEach((controllerPath) => {
    const folders = fs.readdirSync(controllerPath);

    folders.filter(el => !el.startsWith(".")).forEach((service) => {
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
