import * as aws from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

const methods = {
  async getContentFile(bucketName: string, keyName: string) {
    const params = {
      Bucket: bucketName,
      Key: keyName,
    };

    const s3sdk = new aws.S3();

    return s3sdk.getObject(params).promise();
  },

  async sendFile(fileDetails, expires, acl = 'public-read') {
    const params: PutObjectRequest = {
      Bucket: fileDetails.bucket,
      Key: fileDetails.caption,
      ContentType: fileDetails.contentType,
      ContentDisposition: fileDetails.contentDisposition,
      Body: fileDetails.buffer,
      ACL: acl,
    };

    if (expires) {
      params.Expires = expires;
    }

    const s3sdk = new aws.S3();

    return s3sdk.upload(params).promise();
  },

  async listFiles(fileDetails) {
    const s3sdk = new aws.S3();

    const params = {
      Bucket: fileDetails.bucket,
      Prefix: fileDetails.key,
    };

    return s3sdk.listObjectsV2(params).promise();
  },

  async deleteFile(params) {
    const s3sdk = new aws.S3();

    return s3sdk.deleteObject(params).promise();
  },
};

export const S3 = () => {
  aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
  });

  return methods;
};
