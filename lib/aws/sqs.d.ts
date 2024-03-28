import * as aws from "aws-sdk";
export declare const SQS: () => {
    sendMessage(payload: any, QueueUrl: any, MessageBody?: string): Promise<import("aws-sdk/lib/request").PromiseResult<aws.SQS.SendMessageResult, aws.AWSError>>;
};
