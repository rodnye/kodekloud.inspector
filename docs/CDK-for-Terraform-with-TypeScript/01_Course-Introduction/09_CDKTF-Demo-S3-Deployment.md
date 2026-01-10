# CDKTF Demo S3 Deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Course-Introduction/CDKTF-Demo-S3-Deployment)

---

## Table of Contents

- CDKTF Demo S3 Deployment
  - Setting Up the Environment
  - Reviewing the CDKTF Code
  - Deploying the Infrastructure
  - Terraform Configuration Output
  - Verifying the Deployment on AWS
  - Overview of the CDKTF Approach
  - Watch Video
    - S3 Buckets Resource Definitions
    - Reusable Construct: S3BucketWithEnvTag

---

## Content

CDK for Terraform with TypeScript

Course Introduction

# CDKTF Demo S3 Deployment

In this guide, you'll learn how to deploy S3 buckets using the Cloud Development Kit for Terraform (CDKTF) with TypeScript. We will deploy two S3 buckets: one with object lock enabled and another with an environment tag.

## Setting Up the Environment

Begin by navigating to the "cdk-tf" directory in your KodeKloud Labs environment. Then, run the following command to install the necessary dependencies:

```
yarn install
```

The command output should resemble the following:

```
Yarn 4.4.1
   YN0000:   Resolution step
   YN0001:   Completed in 0s 94ms
   YN0002:   Post-resolution validation
   YN0006:   Some peer dependencies are incorrectly met by dependencies; run yarn explain peer-requirements for detail
   YN0003:   Completed
   YN0004:   Fetch step
   YN0005:   Completed in 3s 999ms
   YN0006:   Link step
   YN0007:   Completed in 0s 93ms
   YN0000:   Done with warnings in 6s 168ms
root in ~/code/cdktf via 🦙 v20.17.0 on 🌏 (us-east-1) took 6s
```

This step downloads all required dependencies for TypeScript development.

## Reviewing the CDKTF Code

The CDKTF code begins with provider definitions and resource declarations. In this example, we define two S3 buckets:

- The first bucket is created with object lock enabled.
- The second bucket includes an environment tag.

### S3 Buckets Resource Definitions

```
// Create the first S3 bucket with object lock enabled
new S3Bucket(this, 's3-bucket', {
  bucket: `cdktf-demo-bucket-1-${randomId.hex}`,
  objectLockEnabled: true,
});


// Create the second S3 bucket with an environment tag
new S3BucketWithEnvTag(this, 's3-bucket-with-env-tag', {
  name: `cdktf-demo-bucket-2-${randomId.hex}`,
  env: 'dev',
});


const app = new App();
new MyStack(app, 'cdktf-demo');
app.synth();
```

During dependency linking and validation, you might see output similar to the following:

```
YN0000: Post-resolution validation
YN0086: Some peer dependencies are incorrectly met by dependencies; run yarn explain peer-requirements for details.
Completed
Fetch step
Completed in 3s 999ms
Link step
Completed in 0s 293ms
Done with warnings in 6s 168ms
root in ~/code/cdktf via 🐫 v20.17.0 on 🌐 (us-east-1) took 6s
```

> [!important]
> **Tip**
>
> If you're already comfortable with TypeScript, you'll appreciate how the CDKTF leverages familiar constructs to define and manage cloud infrastructure.

### Reusable Construct: S3BucketWithEnvTag

This reusable construct creates an S3 bucket with an environment tag, demonstrating how to build infrastructure components with TypeScript:

```
class S3BucketWithEnvTag extends Construct {
  constructor(scope: Construct, id: string, { env, name }: S3BucketWithEnvTagProps) {
    super(scope, id);


    // Create the S3 bucket with object lock enabled and an environment tag
    new s3Bucket.S3Bucket(this, 's3-bucket', {
      bucket: name,
      objectLockEnabled: true,
      tags: {
        env: env,
      },
    });
  }
}


class MyStack extends TerraformStack { }
```

During the build process, you might also see logs like these:

```
YN0000: Post-resolution validation
YN0006: Some peer dependencies are incorrectly met by dependencies; run yarn explain peer-requirements for details.
YN0000: Completed
YN0000: Fetch step
YN0000: Completed in 3s 999ms
YN0000: Link step
YN0000: Completed in 0s 931ms
YN0000: Done with warnings in 6s 168ms
root in ~/code/cdktf via v20.17.0 on ➜ (us-east-1) took 6s
```

## Deploying the Infrastructure

To deploy your S3 buckets, execute the following CDKTF command:

```
yarn cdktf deploy
```

You will be prompted for approval, just as you would with Terraform. Once approved, the CDKTF synthesizes your TypeScript code into Terraform configuration and deploys the resources to AWS.

An example snippet that configures the AWS and random providers looks like this:

```
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    // Configure the AWS provider
    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1', // change to your preferred region
    });


    // Configure the random provider
    new random.provider.RandomProvider(this, 'random-provider');

    const randomId = new random.id.Id('random-id', {
      // Configuration here
    });
  }
}
```

The deployment output will be similar to the following:

```
cdktf-demo    random_id.random-id: Creating...
cdktf-demo    random_id.random-id: Creation complete after 0s [id=Nk4LnQl]
cdktf-demo    aws_s3_bucket.s3-bucket: Creating...
cdktf-demo    aws_s3_bucket.s3-bucket: Creation complete after 2s [id=cdktf-demo-bucket-1-371e0b9d]
cdktf-demo    Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
No outputs found.
root in ~/code/cdktf via v20.17.0 on ⎈ (us-east-1) took 1m56s
```

This output confirms that your TypeScript code has been successfully compiled into Terraform configuration and applied to deploy your S3 buckets.

## Terraform Configuration Output

The generated Terraform configuration may resemble the following JSON:

```
{
  "backend": {
    "local": {
      "path": "/root/code/cdktf/terraform.cdktf-demo.tfstate"
    }
  },
  "required_providers": {
    "aws": {
      "source": "aws",
      "version": "5.76.0"
    },
    "random": {
      "source": "hashicorp/random",
      "version": "3.6.3"
    }
  }
}
```

And when applying the configuration, you will see output such as:

```
cdktf-demo    random_id.random-id: Creating...
cdktf-demo    random_id.random-id: Creation complete after 0s [id=Nx4LnQ]
cdktf-demo    aws_s3_bucket.s3-bucket: Creating...
cdktf-demo    aws_s3_bucket.s3-bucket: Creation complete after 2s [id=cdktf-demo-bucket-1-371e0b9d]
cdktf-demo    aws_s3_bucket_with_env_tag.s3-bucket: Creating...
cdktf-demo    aws_s3_bucket_with_env_tag.s3-bucket: Creation complete after 2s [id=cdktf-demo-bucket-2-371e0b9d]
cdktf-demo
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
No outputs found.
root in ~/code/cdktf via v20.17.0 on (us-east-1) took 1m56s
```

## Verifying the Deployment on AWS

After the deployment, log in to your AWS account to verify the creation of the two S3 buckets:

- The first bucket, prefixed with "cdktf-demo-bucket-1", should have object lock enabled.
- The second bucket, prefixed with "cdktf-demo-bucket-2", will include an environment tag labeled "dev".

Below is the reusable construct code for creating an S3 bucket with an environment tag:

```
interface S3BucketWithEnvTagProps {
  env: 'dev' | 'prod';
  name: string;
}


class S3BucketWithEnvTag extends Construct {
  constructor(scope: Construct, id: string, { env, name }: S3BucketWithEnvTagProps) {
    super(scope, id);
    // Create the S3 bucket with object lock enabled and environment tag
    new s3Bucket.S3Bucket(this, 's3-bucket', {
      bucket: name,
      objectLockEnabled: true,
      tags: {
        env: env,
      },
    });
  }
}
```

> [!important]
> **Insight**
>
> Remember, if you're new to TypeScript, understanding these foundational concepts will help you utilize CDKTF effectively. The TypeScript code is seamlessly converted into Terraform configuration, enabling familiar language constructs to manage sophisticated cloud infrastructure.

## Overview of the CDKTF Approach

In this guide, you've learned how to:

- Define and manage cloud infrastructure as code using TypeScript.
- Deploy S3 buckets with specific configurations such as object lock and environment tagging.
- Leverage reusable constructs for cleaner and more maintainable code.
- Synthesize and deploy TypeScript code through Terraform with CDKTF.

![The image is a diagram illustrating the Cloud Development Kit for Terraform (CDKTF), showing its integration with various programming languages and cloud providers. It highlights the flow from languages like TypeScript and Python to Terraform, and then to providers like AWS and Google Cloud.](https://kodekloud.com/kk-media/image/upload/v1752869579/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Demo-S3-Deployment/cdktf-diagram-integration-languages-cloud.jpg)

In the next section, we will discuss the benefits of using CDKTF and explore how it simplifies the process of managing cloud infrastructure using familiar programming languages.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/813d9207-e35e-4698-babc-436986515d19/lesson/143800c0-baed-4527-b647-1726fef7f375)**
>
> Watch video content
