# Backend Strategies in CDKTF - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/Backend-Strategies-in-CDKTF)

---

## Table of Contents

- Backend Strategies in CDKTF
  - The Problem with Local State
  - Demo: Adding an S3 Backend to the NamePicker App
  - Importing an Existing Terraform Module
  - Circular Dependency Challenges
  - Refactoring the NamePicker Stack
  - Configuring and Deploying the Prerequisite App
  - Migrating Local State to Remote State
  - Final Cleanup and Summary
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# Backend Strategies in CDKTF

In this lesson, we dive into backend strategies in CDKTF, focusing on managing Terraform state for your infrastructure projects. If you’re already comfortable with Terraform, you know the importance of the state file—it tracks all managed resources and their configurations. Traditionally, this state file is stored locally, but as your team grows, a remote backend becomes essential for consistency and collaboration.

When you run `cdktf deploy`, CDKTF synthesizes the Terraform configuration and compares it with the current state. For example, you might see output similar to:

```
cdktf-name-picker aws_api_gateway_deployment.lambda-rest-api_deployment_FCE7AD5D: Creation complete after 1s [id=nmz3d]
cdktf-name-picker
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://exgnru9me6.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker
namePickerApiUrl = https://exgnru9me6.execute-api.us-east-1.amazonaws.com/dev
root in ~/code via v20.17.0 on ─ (us-east-1) took 1m35s
```

Each deployment, CDKTF compares the synthesized configuration to the state file to decide which resources require updating, adding, or removal.

Another sample output is:

```
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.
Outputs:


namePickerApiUrl = "https://exgrnu9me6.execute-api.us-east-1.amazonaws.com/dev"


cdktf-name-picker
namePickerApiUrl = https://exgrnu9me6.execute-api.us-east-1.amazonaws.com/dev


root in ~/code via 🦕 v20.17.0 on (us-east-1) took 1m35s
```

## The Problem with Local State

Storing state locally works for simple projects, but it can cause issues in team environments. Without a shared source of truth, multiple users working on the same project might experience discrepancies.

> [!important]
> **Tip**
>
> For collaborative projects, always consider using a remote backend like Amazon S3 to centralize your state file.

A remote backend, such as an S3 bucket, ensures that the Terraform state file is stored on AWS. It supports state locking via DynamoDB, preventing simultaneous conflicting changes. Terraform Cloud is another popular solution for remote state management.

![The image is about managing state with remote backends, specifically using Amazon S3 for storage. It includes icons of folders and an Amazon S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752869558/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/managing-state-remote-backends-s3.jpg)

## Demo: Adding an S3 Backend to the NamePicker App

Let’s configure our NamePicker app to use an S3 backend. In your main stack file (after the provider configuration), add the backend configuration like so:

```
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    new S3Backend(this, {
      bucket: 'cdktf-name-picker-backend', // Ensure this bucket exists or will be created
      dynamodbTable: 'cdktf-name-picker-locks', // Ensure this table exists or will be created
      region: 'us-east-1',
      key: 'state-file',
    });


    const functionNamePicker = new LambdaFunction(this, 'lambda-funtions', {
      // function properties
    });
  }
}
```

After deploying with this configuration, the state file will be stored in your S3 bucket instead of locally. An example post-deployment output could be:

```
cdktf-name-picker
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.
Outputs:
  namePickerApiUrl = "https://exgnrum9e6.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker
namePickerApiUrl = https://exgnrum9e6.execute-api.us-east-1.amazonaws.com/dev
root in ~/code via v20.17.0 on ⬢ (us-east-1) took 1m35s
```

In this configuration, you instantiate the S3 backend by specifying the bucket name, DynamoDB table, region, and key to determine the state file’s location in the bucket.

## Importing an Existing Terraform Module

The Terraform community has created remote backend modules that simplify this process. Instead of building your own, you can import an S3 DynamoDB remote backend module. Add the following HCL code to your project:

```
module "s3-dynamodb-remote-backend" {
  source  = "my-devops-way/s3-dynamo"
  version = "0.0.2"
  # insert the 1 required variable
}
```

You might also update your CDKTF JSON configuration to include a module reference similar to:

```
module "s3-dynamodb-remote-backend" {
  source  = "my-devops-way/s3-dynamo"
  version = "0.0.1"
  # insert the 3 required variables
}
```

In your `cdk.tf.json` file, add:

```
{
  "language": "typescript",
  "app": "npx ts-node main.ts",
  "projectId": "14d8912e-1850-4ff8-bbc1-af7df07e7407",
  "sendCrashReports": "false",
  "terraformProviders": [],
  "terraformModules": [
    {
      "name": "s3-dynamodb-remote-backend",
      "source": ""
    }
  ],
  "context": {}
}
```

After referencing the module, run:

```
yarn cdktf get
```

This command generates TypeScript constructs wrapping the Terraform module, allowing you to use it seamlessly in your CDKTF project. You will see output resembling:

```
{
  "language": "typescript",
  "app": "npx ts-node main.ts",
  "projectId": "41d8912e-1850-4ff8-bbc1-af7df07e7407",
  "sendCrashReports": "false",
  "terraformProviders": [],
  "terraformModules": [
    {
      "name": "s3-dynamodb-remote-backend",
      "source": "my-devops-way/s3-dynamodb-remote-backend/aws"
    }
  ],
  "context": {}
}
```

Now, use the generated module in your stack:

```
import { S3DynamodbRemoteBackend } from '../gen/modules/s3-dynamodb-remote-backend';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    const backend = new S3DynamodbRemoteBackend(this, 's3-dynamodb-remote-backend', {
      bucket: 'cdktf-name-picker-backend', // Bucket for storing Terraform State
      dynamodbTable: 'cdktf-name-picker-locks', // Table for state locking
      region: 'us-east-1',
      key: 'state-file',
    });
  }
}
```

> > [!important]
> > **IDE Tip**
> >
> > If autocompletion does not work in your IDE (e.g., VS Code), manually import the constructs as needed.

![The image shows a Terraform Registry page for the "s3-dynamodb-remote-backend" module, including download statistics and provision instructions.](https://kodekloud.com/kk-media/image/upload/v1752869559/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/terraform-registry-s3-dynamodb-module.jpg)

## Circular Dependency Challenges

When using a remote backend, you may encounter circular dependencies. CDKTF must synthesize the application before deploying resources, but synthesis checks if the remote backend (S3 bucket and DynamoDB table) exists. Similarly, destroying the app might remove the remote backend before Terraform can update its state.

To overcome this, split your project into two distinct apps:

1.  **Prerequisite App:** Deploys the remote backend resources (S3 bucket and DynamoDB table) using local state.
2.  **Main App:** Reads the prerequisite app's state outputs and configures its remote backend accordingly.

![The image illustrates a circular dependency problem in a "cdktf-name-picker app" between the deploy and synthesize processes, with a visual representation of a snake biting its tail.](https://kodekloud.com/kk-media/image/upload/v1752869560/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/circular-dependency-cdktf-name-picker.jpg)

A flowchart of the deployment process:

![The image is a flowchart illustrating the deployment process of a new app called "cdktf-name-picker-prereq," involving steps like "Synthesize" and "Deploy," with components such as S3 Bucket and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752869561/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/cdktf-name-picker-deployment-flowchart.jpg)

In this setup, the prerequisite app (using local state) deploys the backend resources. The main app then reads outputs from the prerequisite’s state file to configure its remote backend.

## Refactoring the NamePicker Stack

For better management, separate the NamePicker stack into its own file (e.g., `NamePickerStack.ts`). Here’s an example:

```
import { provider } from '@cdktf/provider-aws';
import { TerraformStack, S3Backend, TerraformOutput } from 'cdktf';
import { Construct } from 'constructs';
import { LambdaFunction } from '../constructs/LambdaFunction';
import { LambdaRestApi } from '../constructs/LambdaRestApi';
import { getConstructName } from '../utils/utils';


export class NamePickerStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    new S3Backend(this, {
      bucket: 'cdktf-name-picker-backend', // Created by the prerequisite app
      dynamodbTable: 'cdktf-name-picker-locks', // Created by the prerequisite app
      region: 'us-east-1',
      key: 'state-file',
    });


    const functionNamePicker = new LambdaFunction(this, 'lambda-function', {
      // Lambda function configuration
    });


    const lambdaRestApi = new LambdaRestApi(this, 'lambda-rest-api', {
      handler: functionNamePicker.lambdaFunction,
      stageName: 'dev',
    });


    new TerraformOutput(this, 'namePickerApiUrl', {
      value: lambdaRestApi.url,
    });
  }
}
```

In your main application file, update the stack registration:

```
import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';


const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
app.synth();
```

Next, create a separate prerequisite stack (e.g., `PreReqStack.ts`) that deploys the S3 bucket and DynamoDB table:

```
import { TerraformStack, TerraformOutput } from 'cdktf';
import { provider } from 'cdktf/provider-aws';
import { DataAwsCallerIdentity } from 'cdktf/provider-aws/lib/data-aws-caller-identity';
import { S3DynamodbRemoteBackend } from '../../modules/s3-dynamodb-remote-backend';
import { Construct } from 'constructs';


export interface PreReqStackProps {
  backendName: string;
}


export class PreReqStack extends TerraformStack {
  constructor(scope: Construct, id: string, { backendName }: PreReqStackProps) {
    super(scope, id);


    const currentAccount = new DataAwsCallerIdentity(this, 'current-account', {});


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    const backend = new S3DynamodbRemoteBackend(this, 's3-dynamodb-remote-backend', {
      bucket: `${backendName}-${currentAccount.accountId}`,
      dynamodbTable: backendName,
      // Optionally include additional properties such as region and key
    });


    new TerraformOutput(this, 'bucket', {
      value: backend.bucket,
    });


    new TerraformOutput(this, 'dynamodbTable', {
      value: backend.dynamodbTable,
    });
  }
}
```

A summary flowchart of this process:

![The image is a flowchart illustrating the process of adding a new app called "cdktf-name-picker-prereq," showing steps like synthesizing and deploying with components such as S3 Bucket, DynamoDB, Lambda, and API Gateway. It also indicates the use of local and S3 backend states.](https://kodekloud.com/kk-media/image/upload/v1752869562/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/cdktf-name-picker-flowchart.jpg)

## Configuring and Deploying the Prerequisite App

Create a configuration file (e.g., `config.ts`) to store shared constants:

```
export const PROJECT_NAME = 'cdktf-name-picker';
export const BACKEND_NAME = `${PROJECT_NAME}-prereq`;
```

Then, in your root prerequisite file (e.g., `prereq.ts`), instantiate the prerequisite stack:

```
import { App } from 'cdktf';
import { PreReqStack } from './stacks/PreReqStack';
import { BACKEND_NAME } from './config';


const app = new App();
new PreReqStack(app, BACKEND_NAME, { backendName: BACKEND_NAME });
app.synth();
```

Update your `package.json` scripts to facilitate deployment of the prerequisite app:

```
{
  "scripts": {
    "get": "cdktf get",
    "build": "tsc",
    "synth": "cdktf synth",
    "deploy": "cdktf deploy",
    "deploy:prereq": "cdktf deploy --app='yarn ts-node prereq.ts'",
    "compile": "tsc --pretty",
    "watch": "tsc --w",
    "test": "jest",
    "test:watch": "jest --watch",
    "upgrade": "npm i cdktf@latest cdktf-cli@latest",
    "upgrade:next": "npm i cdktf@next cdktf-cli@next"
  }
}
```

Deploy the prerequisite stack with:

```
yarn deploy:prereq
```

After deployment, verify in the AWS Console that the S3 bucket and DynamoDB table have been created.

## Migrating Local State to Remote State

Once your prerequisite app is deployed, update your main app to use the remote backend. Typically, this involves extending a base stack (e.g., `AwsBaseStack`) that reads the backend configuration from the prerequisite state file. An example base stack implementation:

```
import * as fs from 'fs';
import * as path from 'path';
import { S3Backend, TerraformStack } from 'cdktf';
import { provider } from 'cdktf/provider-aws';
import { Construct } from 'constructs';
import { BACKEND_NAME } from '../config';


export class AwsBaseStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    const prereqStateFile = path.join(process.env.INIT_CWD!, `./terraform.${BACKEND_NAME}.tfstate`);
    let prereqState: any = null;
    try {
      prereqState = JSON.parse(fs.readFileSync(prereqStateFile, 'utf-8'));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new Error(`Could not find prerequisite state file: ${prereqStateFile}`);
      }
      throw error;
    }


    new S3Backend(this, {
      bucket: prereqState.outputs.bucket.value,
      dynamodbTable: prereqState.outputs.dynamodbTable.value,
      region: 'us-east-1',
      key: id, // Unique key per stack using the stack ID
    });
  }
}
```

Modify your NamePicker stack to extend from this base stack and remove the local backend configuration. After synthesizing the project with:

```
yarn synth
```

verify that the generated Terraform code now points to the S3 backend.

To migrate your existing local state to the remote backend, run the following command manually in the generated Terraform directory:

```
terraform init --migrate-state
```

Terraform will prompt you to copy the local state into the S3 bucket. Confirm the migration, and you should see the state file as an object in your S3 bucket. Finally, deploy the main app:

```
yarn deploy
```

If everything is configured properly, Terraform should output:

```
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"
```

A result with no changes confirms that the state has been successfully migrated.

## Final Cleanup and Summary

Once verified, you can safely remove any leftover local state files (e.g., `cdktf-name-picker.tfstate` and its backups).

In summary, this lesson covered:

- How local Terraform state works and its limitations in team environments.
- Configuring a remote backend using Amazon S3 and DynamoDB for state locking.
- Importing external Terraform modules into your CDKTF project.
- Overcoming circular dependency challenges by splitting your project into a prerequisite and a main app.
- Migrating your local state to a remote backend and verifying the migration.

In the next and final section, we will enhance Arthur's application with additional functionality.

![The image is a flowchart with five steps related to backend strategies, including deploying IAM roles, constructing Lambda functions, and adding functionality. Step 4, "Backend Strategies," is highlighted.](https://kodekloud.com/kk-media/image/upload/v1752869563/notes-assets/images/CDK-for-Terraform-with-TypeScript-Backend-Strategies-in-CDKTF/backend-strategies-flowchart-steps.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/259a73bf-3532-457a-a4ae-f30b8eea25c6)**
>
> Watch video content
