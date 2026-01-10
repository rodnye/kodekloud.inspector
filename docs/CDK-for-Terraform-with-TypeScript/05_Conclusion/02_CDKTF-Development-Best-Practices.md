# CDKTF Development Best Practices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Conclusion/CDKTF-Development-Best-Practices)

---

## Table of Contents

- CDKTF Development Best Practices
  - Module Import vs. Custom Constructs
  - Integrating CDKTF into an Existing Project
  - Incremental Migration Example
  - Defining Constructs and Stacks
  - Further Learning
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Conclusion

# CDKTF Development Best Practices

This article summarizes best practices for using CDKTF. We’ll revisit key CDKTF code concepts, provide further learning resources, and inspire you to build robust Infrastructure as Code projects.

## Module Import vs. Custom Constructs

When adding a component to your CDKTF project, you might wonder whether to import an existing module (from the Terraform Registry or a local file) or create your own construct.

For example, an S3 backend from the Terraform Registry can be imported, or you may choose to import local files from another project. Consider the scenario where an S3 bucket requires an environment tag. In such cases, you can implement a custom construct in TypeScript that replicates Terraform’s behavior.

![Diagram of S3 bucket construct code](https://kodekloud.com/kk-media/image/upload/v1752869570/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Development-Best-Practices/common-questions-best-practices-cdktf.jpg)

Below is a sample implementation of a custom construct in TypeScript:

```
class S3BucketWithEnvTag extends Construct {
  constructor(scope: Construct, id: string, { env, name }: S3BucketWithEnvTagProps) {
    super(scope, id);
    // Create the S3 bucket
    new s3Bucket.S3Bucket(this, 's3-bucket', {
      bucket: name,
      objectLockEnabled: true,
      tags: {
        env: env,
      },
    });
  }
}


class MyStack extends TerraformStack {
  // Stack implementation...
}
```

You have two options:

1.  Rewrite the component in TypeScript using CDKTF provider resources.
2.  Import the module from the Terraform Registry (or from a local path) if it already provides the required functionality.

For example, if you already have a module locally, your CDKTF JSON configuration might include a parameter like:

```
env: 'dev' | 'prod';
```

And you would use the module as follows:

```
class S3BucketWithEnvTag extends Construct {
  constructor(scope: Construct, id: string, { env, name }: S3BucketWithEnvTagProps) {
    super(scope, id);
    // Create the S3 bucket
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

```
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // Stack configuration continues...
  }
}
```

After adding the module path to your CDKTF JSON file and setting the module name (for example, "S3 bucket with env tag"), run:

```
yarn install
```

Then execute:

```
yarn cdk.tf get
```

> [!important]
> **Note**
>
> After running this command, the module should appear in the generated folder, allowing you to import it instead of rewriting the code manually.

For instance, you can import your module as shown below:

```
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { provider, s3Bucket } from '@cdktf/provider-aws';
import * as random from '@cdktf/provider-random';
import { S3BucketWithEnvTag } from './gen/modules/s3_bucket_with_env_tag';
```

Below is an example demonstrating the use of both the imported module and a custom construct:

```
// Configure the random provider
new random.provider.RandomProvider(this, 'random-provider');


const randomId = new random.id.Id(this, 'random-id', {
  byteLength: 4,
});


// Create the S3 bucket using a CDKTF resource
new s3Bucket.S3Bucket(this, 's3-bucket', {
  bucket: `cdktf-demo-bucket-1-${randomId.hex}`,
  objectLockEnabled: true,
});


// Create the S3 bucket using the imported module
new S3BucketWithEnvTag(this, 's3-bucket-with-env-tag', {
  name: `cdktf-demo-bucket-2-${randomId.hex}`,
  env: 'dev',
});
```

```
root in ~/code on  (us-east-1) took 3s
```

> [!important]
> **Tip**
>
> Choose between an imported module and a custom construct based on maintenance needs. If a component (like an S3 backend) rarely changes, using an existing Terraform module is acceptable. However, for components that require frequent modifications, writing them in CDKTF makes the most of TypeScript’s advanced constructs.

## Integrating CDKTF into an Existing Project

Integrate CDKTF into your existing project by importing Terraform modules—from local files or the Terraform Registry—and refactoring them into CDKTF code as needed. For those migrating from a traditional Terraform project, CDKTF offers a migration tool that can rewrite your project into CDKTF code automatically.

Follow these steps to migrate:

1.  Create a new directory (e.g., "CDKTF") and navigate into it.
2.  Install CDKTF globally:

    ```
    npm i -g cdktf-cli
    ```

3.  Initialize a new project:

    ```
    cdktf init
    ```

During initialization, select TypeScript as your language and indicate that you want to migrate an existing Terraform project by providing its path. Choose the AWS and random providers if required. CDKTF will then attempt to migrate the modules automatically.

A sample migrated main file might look like this:

```
const bucketId = new Id(this, "bucket_id", {
  byteLength: 4,
});
new S3BucketWithEnvTag.S3BucketWithEnvTag(this, "s3_bucket", {
  env: "dev",
  name: `tf-demo-bucket-2-${bucketId.hex}`,
});
new S3Bucket(this, "tf-demo-bucket-1", {
  bucket: `tf-demo-bucket-1-${bucketId.hex}`,
  objectLockEnabled: true,
});
```

The console output may include:

```
provider: random
version: latest
language: typescript
cdktf: 0.20.10
[2024-11-17T03:28:26.058] [INFO] default - Found pre-built provider.
[2024-11-17T03:28:26.063] [INFO] cdktf/provider-random @ 11.0.3 - Installing package @cdktf/provider-random using npm.
[2024-11-17T03:28:29.090] [INFO] default - Package installed.
```

After synthesis and resolving any duplicate imports or provider configuration issues, your project will be incrementally migrated to CDKTF code. You may need to make some adjustments, but this process supports a gradual transition from Terraform to CDKTF.

For example, once you resolve duplicate import errors and correctly instantiate each provider, include the following in your stack:

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


    const randomId = new random.id.Id(this, 'random-id', {
      byteLength: 4,
    });
  }
}
```

Then run:

```
yarn cdktf
```

If the synthesis and deployment are successful, you will see resources such as the S3 buckets being created.

## Incremental Migration Example

After deploying with imported modules, you might want to replace Terraform modules with your own CDKTF constructs. For example, define a custom construct for S3 with an environment tag as follows:

```
export class S3BucketWithEnvTag extends TerraformModule {
  private readonly inputs: { [name: string]: any } = {};
  public constructor(scope: Construct, id: string, config: S3BucketWithEnvTagConfig) {
    super(scope, id, {
      ...config,
      source: './modules/s3_bucket_with_env_tag',
    });
    this.env = config.env;
    this.name = config.name;
  }
}
```

Deploy the changes with:

```
cdktf2
random_id.bucket_id: Creation complete after 0s [id=g9CRZA]
aws_s3_bucket.tf-demo-bucket-1: Creating...
aws_s3_bucket.tf-demo-bucket-2: Creating...
aws_s3_bucket.tf-demo-bucket-2: Creation complete after 2s [id=tf-demo-bucket-2-83d09164]
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

Test your new deployment to ensure the improved constructs function as intended.

## Defining Constructs and Stacks

Remember that constructs are reusable components with a single responsibility. They encapsulate deployment details without mixing in business logic. For example:

```
new S3BucketWithEnvTag(this, 's3_bucket', {
  env: 'dev',
  name: 'tf-demo-bucket-2-${ bucketId.hex }',
});
new S3Bucket(this, 'tf-demo-bucket-1', {
  bucket: 'tf-demo-bucket-1-${ bucketId.hex }',
  objectLockEnabled: true,
});
```

Constructs can be deployed across multiple stacks and should be organized with clear dependency management. For example, if an API construct relies on a Lambda construct, ensure you have a clear grouping strategy.

Stacks, on the other hand, represent deployable business functionalities. Depending on your application’s complexity, you may have a single stack or multiple stacks for microservices or distributed components.

## Further Learning

For additional information on CDKTF, consult the official documentation and engage in community discussions. Below is a slide that highlights extra learning resources, including docs, community forums, and practical projects.

![The image is a slide titled "Further Learning" with three sections labeled "Docs," "Discuss," and "Build Something," along with links for further resources.](https://kodekloud.com/kk-media/image/upload/v1752869572/notes-assets/images/CDK-for-Terraform-with-TypeScript-CDKTF-Development-Best-Practices/further-learning-docs-discuss-build.jpg)

Ultimately, the best way to master CDKTF is by building real projects. This article covered best practices for importing modules versus writing your own constructs, migrating existing Terraform projects to CDKTF, and managing dependencies within constructs and stacks.

Thank you for reading. We hope this guide equips you with the tools to create robust Infrastructure as Code projects with CDKTF and inspires you to build something great.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/14cadb71-0522-4f61-8015-24e11e133123/lesson/a18b319f-7dd6-4f80-9422-84d000d2f78a)**
>
> Watch video content
