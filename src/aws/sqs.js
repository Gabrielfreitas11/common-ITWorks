const aws = require("aws-sdk");

const methods = {
  async sendMessage(
    payload,
    QueueUrl,
    MessageBody = "Disparo de mensagem no SQS"
  ) {
    const sqs = new aws.SQS({ apiVersion: "2012-11-05" });

    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        Body: {
          DataType: "String",
          StringValue: JSON.stringify(payload),
        },
      },
      MessageBody,
      QueueUrl,
    };

    return sqs.sendMessage(params).promise();
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
