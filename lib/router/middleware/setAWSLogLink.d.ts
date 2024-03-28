/**
 * @param {Promise} requestPromise
 * @param {string} service
 * @param {object} event
 * @param {object} context
 */
declare const handler: (requestPromise: Promise<any>, service: string, event: object, context: {
    functionName: string;
    awsRequestId: string;
}) => Promise<any>;
export default handler;
