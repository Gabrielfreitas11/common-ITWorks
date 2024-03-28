declare const initLog: (logPayload: any, level: any, logData?: boolean) => () => any;
/**
 * Creates DEBUG log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const debug: (payload: any, propertiesToHide?: never[]) => any;
/**
 * Creates PENDING log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const pending: (payload: any, propertiesToHide?: never[]) => any;
/**
 * Creates INFO log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const info: (payload: any, propertiesToHide?: never[]) => any;
/**
 * Creates WARN log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const warn: (payload: any, propertiesToHide?: never[]) => any;
/**
 * Creates ERROR log information.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const error: (payload: any, propertiesToHide?: never[]) => any;
/**
 * Creates FAIL log information for internal requests.
 *
 * @param {(string|object)} payload
 * @return {object} log model object
 */
declare const fail: (payload: any, propertiesToHide?: never[]) => any;
/**
 * @description A class that makes it easy to show logs
 */
declare class StructureLogger {
    /**
     * @param {string} functionName - the name of the lambda function
     * @param {string} level - the level of logging. Can be 'INFO', 'WARN' or 'ERROR'
     * @param {any} data - anything important to log. Can be Object or string
     */
    log(functionName: any, level: string | undefined, data: any): any;
}
export { debug, pending, info, warn, error, fail, initLog, StructureLogger };
