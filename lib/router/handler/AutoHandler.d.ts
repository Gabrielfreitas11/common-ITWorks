/**
 * @param {string} controllersPath path to the folder containing the routes
 * @param  {...Function<Promise>} middlewares any number of middlewares that alter the request response
 */
declare const AutoHandler: (controllersPath: any, allowMethodsDiableCors: any, ...middlewares: any[]) => {};
export default AutoHandler;
