import * as aws from "aws-sdk";
export declare const S3: () => {
    getContentFile(bucketName: any, keyName: any): Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.GetObjectOutput, aws.AWSError>>;
    sendFile(fileDetails: any, expires: any, acl?: string): Promise<aws.S3.ManagedUpload.SendData>;
    listFiles(fileDetails: any): Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.ListObjectsV2Output, aws.AWSError>>;
    deleteFile(params: any): Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.DeleteObjectOutput, aws.AWSError>>;
};
