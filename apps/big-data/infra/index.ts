import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
// import { functions } from '@mussia12/shared/pulumi-gcp';

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('my-bucket');

// Export the DNS name of the bucket
export const bucketName = bucket.url;
