const aws = require("aws-sdk");

const methods = {
  async invokeLambda(service, funcName, payload) {
    const lambda = new aws.Lambda();

    const params = {
      FunctionName: `serverless-${service}-${process.env.stage}-${funcName}`,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(payload),
    };

    const response = await lambda.invoke(params).promise();

    return response;
  },
};

module.exports = () => {
  aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
  });

  return methods;
};
