/**
 * @param {Promise} requestPromise
 * @param {string} service
 * @param {object} event
 * @param {object} context
 */
module.exports = async (requestPromise, service, event, context) => {
  const response = await requestPromise;
  const link = `https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${context.functionName}/log-events$3FfilterPattern$3D$2522${context.awsRequestId}$2522+`;

  if (process.env.stage === "local") {
    return response;
  }

  try {
    const parsedBody = JSON.parse(response.body);
    parsedBody.awsFilter = link;
    response.body = JSON.stringify(parsedBody);
    return response;
  } catch (error) {
    return response;
  }
};
