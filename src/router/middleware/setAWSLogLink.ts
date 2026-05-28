/**
 * @param {Promise} requestPromise
 * @param {string} service
 * @param {object} event
 * @param {object} context
 */
const handler = async (
  requestPromise: Promise<any>,
  service: string,
  event: object,
  context: {
    functionName: string;
    awsRequestId: string;
  }
) => {
  const response = await requestPromise;
  const link = `https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${context.functionName}/log-events$3FfilterPattern$3D$2522${context.awsRequestId}$2522+`;

  // Controller sinalizou que esta resposta não deve receber o awsFilter.
  // Removemos o header interno para não vazar ao cliente.
  const skipAwsFilter = response?.headers?.["x-disable-aws-filter"] === "true";
  if (skipAwsFilter) {
    delete response.headers["x-disable-aws-filter"];
  }

  if (process.env.stage === "local" || skipAwsFilter) {
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

export default handler;
