# AWS With CDKTF - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/AWS-With-CDKTF)

---

## Table of Contents

- AWS With CDKTF
  - Manual AWS Deployment Demo
  - Automating with CDKTF
  - Watch Video
    - Deploying the Lambda Function Manually
    - Creating the API Gateway
    - AWS CLI and Authentication
    - Setting Up a CDKTF App
    - Adding the AWS Provider
    - Deploying an AWS IAM Role for Lambda
    - Recap

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# AWS With CDKTF

Welcome back to this lesson!

In our previous session, we built a basic app using the Terraform local provider. Today, we leverage the AWS provider to deploy resources on Amazon Web Services (AWS) using CDKTF.

In this module, we start by defining the problem and reviewing prerequisites and essential tools for deploying AWS resources.

![The image is a roadmap diagram with two steps: "Problem Definition" and "Prerequisites and Essential Tools," set against a gradient blue background.](https://kodekloud.com/kk-media/image/upload/v1752869535/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/roadmap-problem-definition-tools-diagram.jpg)

We will deploy to AWS with CDKTF, following the journey of Arthur—a developer facing a household dilemma about who does the washing up each night. Arthur’s solution is to build an application that randomly assigns the chore.

![The image shows a graphic of a developer facing a household dilemma about deciding who does the washing up each night.](https://kodekloud.com/kk-media/image/upload/v1752869536/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/developer-washing-up-dilemma-graphic.jpg)

## Manual AWS Deployment Demo

Before automating with CDKTF, let's walk through a manual deployment process using the AWS Console.

![The image shows a diagram illustrating the deployment of an app to AWS Cloud, with a note about deploying the app for household use.](https://kodekloud.com/kk-media/image/upload/v1752869537/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-cloud-app-deployment-diagram.jpg)

To get started, we manually create all the necessary AWS resources for Arthur’s Name Picker application.

![The image shows an illustration of a person at a computer with coding symbols and gears, labeled "AWS," and the text "Manually creating all necessary AWS resources."](https://kodekloud.com/kk-media/image/upload/v1752869538/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-resources-creation-illustration.jpg)

The target architecture is straightforward: Arthur calls an API Gateway on AWS, which then triggers an AWS Lambda function to pick a family member for the chore.

![The image depicts a high-level architecture of an application, showing a flow from an author to an API Gateway, and then to AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752869539/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/application-architecture-api-gateway-lambda.jpg)

### Deploying the Lambda Function Manually

1.  Open the KodeKloud Labs console and log in using the provided URL, username, and password.

![The image shows the AWS Management Console home screen, displaying sections for recently visited services, applications, and various AWS resources. It includes options to add widgets and create applications using tags.](https://kodekloud.com/kk-media/image/upload/v1752869541/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-management-console-home-screen.jpg)

2.  In the Lambda console, create a new function with the name “console name picker.” Select Node.js 20 as the runtime and click **Create Function**.

![The image shows an AWS Lambda console interface where a user is setting up a new function with options for function name, runtime, architecture, and permissions. There's also a tutorial section on creating a simple web app.](https://kodekloud.com/kk-media/image/upload/v1752869543/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-lambda-console-function-setup.jpg)

3.  Rename the file to use the .js extension and paste in the following basic business logic:

```
export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
```

Later, you'll enhance this function with logic to randomly select a name from a hardcoded array or to shuffle the array when needed. The final version of the Lambda function code is shown below:

```
let shuffledNames = [];
let currentIndex = 0;


exports.handler = async (event) => {
  console.log('Received event', event);
  // Parse environment variables with default values
  const names = JSON.parse(process.env.NAMES || '["Arthur","Martin","Douglas","Carolyn"]');
  const shuffle = process.env.SHUFFLE === 'true';


  if (!shuffle) {
    // Return a random name if not shuffling
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
      statusCode: 200,
      body: JSON.stringify(randomName),
    };
  } else {
    // Shuffle names and persist the order in memory
    if (shuffledNames.length === 0 || currentIndex >= shuffledNames.length) {
      shuffledNames = shuffleArray([...names]); // Shuffle a copy of the names array
      currentIndex = 0; // Reset index
    }
    const nameToReturn = shuffledNames[currentIndex];
    currentIndex += 1; // Move to the next index
    return {
      statusCode: 200,
      body: JSON.stringify(nameToReturn),
    };
  }
};
```

> [!important]
> **Note**
>
> The implementation of the function `shuffleArray` is assumed to be available elsewhere in the code.

After pasting the code, deploy the Lambda function and test it to ensure that a random name from the hardcoded list is returned with each invocation.

![The image shows an AWS Lambda console with a function named "console-name-picker" that has been successfully updated. It displays the general configuration settings, including memory, timeout, and storage details.](https://kodekloud.com/kk-media/image/upload/v1752869545/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-lambda-console-function-update.jpg)

When tested, the function returns a response similar to:

```
{
  "statusCode": 200,
  "body": "\"Douglas\""
}
```

### Creating the API Gateway

Next, create a REST API using API Gateway to integrate with the Lambda function.

1.  In the AWS API Gateway console, create a new API named “console name picker API.”

![The image shows an AWS interface for creating an API, with options to add integrations and name the API. Steps for configuring routes, defining stages, and reviewing are also listed.](https://kodekloud.com/kk-media/image/upload/v1752869546/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-api-creation-interface.jpg)

2.  Once a root resource is created, add a new method that integrates with the Lambda function.

![The image shows an AWS API Gateway interface where a REST API named "console-name-picker-api" has been successfully created. The interface displays options to create resources and methods, with no methods currently defined.](https://kodekloud.com/kk-media/image/upload/v1752869547/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-api-gateway-console-name-picker-api.jpg)

3.  Select “ANY” as the method type to support all HTTP methods, and create a proxy resource using the path parameter `{proxy+}`. This ensures that any path (e.g., `/hello`, `/goodbye`) will route to your Lambda function.

![The image shows an AWS API Gateway console where a resource with the path `/{proxy+}` has been successfully created. It displays resource details and methods, including "ANY" and "OPTIONS," with their integration types and authorization settings.](https://kodekloud.com/kk-media/image/upload/v1752869548/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-api-gateway-resource-details.jpg)

4.  Configure the integration to map the method to your Lambda function.

![The image shows an AWS API Gateway console with a resource named `{proxy+}` successfully created. It highlights a method execution flow with a warning about undefined integration.](https://kodekloud.com/kk-media/image/upload/v1752869549/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-api-gateway-proxy-resource.jpg)

5.  Deploy the API by creating a stage (e.g., “dev”). Once deployed, the invoke URL will return a random name when accessed in a browser. Refreshing the URL should yield a new random name for each request.

Although the manual deployment process works, it is time-consuming, prone to human error, and difficult to reproduce. This is where CDKTF proves invaluable.

## Automating with CDKTF

CDKTF enables you to share your project as a single script. A simple command like `yarn deploy` automates the entire setup.

### AWS CLI and Authentication

To configure your AWS account locally (or in any environment outside KodeKloud Labs):

1.  Install the AWS CLI (for example, via Homebrew):

    ```
    brew install awscli
    ```

2.  In the AWS Management Console, navigate to IAM and create a user with command line access. Generate an access key and a secret access key.

![The image shows an AWS interface for creating access keys, highlighting best practices and alternatives for different use cases such as CLI, local code, and third-party services.](https://kodekloud.com/kk-media/image/upload/v1752869551/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-access-keys-best-practices.jpg)

3.  Configure the AWS CLI by running:

    ```
    aws configure
    ```

    Fill in your access key ID and secret key when prompted. To verify that authentication is working, run:

    ```
    aws sts get-caller-identity
    ```

    You should see output similar to:

    ```
    {
      "UserId": "AIDA3FLDW3LPP24HQUEN",
      "Account": "767397779696",
      "Arn": "arn:aws:iam::767397779696:user/kk_labs_user_335488"
    }
    ```

When you run CDKTF with the AWS provider, it uses the default profile configured in your AWS CLI.

### Setting Up a CDKTF App

Create a basic CDKTF application by replacing the contents of `main.ts` with the following code that simply outputs a message:

```
import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    // Define resources here
    new TerraformOutput(this, 'lets-go', { value: 'lets go!' });
  }
}


const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
```

Install dependencies and deploy the app by running:

```
yarn install
yarn deploy
```

You should see output similar to:

```
Outputs:
lets-go = "lets go!"
```

### Adding the AWS Provider

To enable AWS resource deployment via CDKTF, add the AWS provider. First, install it by executing:

```
yarn add @cdktf/provider-aws
```

Next, update your `main.ts` stack as follows:

```
import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { provider } from '@cdktf/provider-aws';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    // Define resources here
    new TerraformOutput(this, 'lets-go', { value: 'lets go!' });
  }
}


const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
```

If you're using KodeKloud Labs, use the US East 1 region; otherwise, choose the region that suits your requirements.

### Deploying an AWS IAM Role for Lambda

AWS Lambda functions require an execution role with the appropriate permissions. Deploy an IAM role specifically for the Lambda function by adding the following code. Ensure that you import the necessary modules for IAM:

```
import * as iamRole from '@cdktf/provider-aws/lib/iam-role';


const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
  name: 'cdktf-name-picker-api-execution-role',
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com'
        },
        Action: 'sts:AssumeRole'
      }
    ]
  }),
});
```

After running `yarn deploy`, Terraform will display output similar to:

```
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.
Enter a value: yes
aws_iam_role.lambda-execution-role: Creating...
aws_iam_role.lambda-execution-role: Creation complete after 1s [id=cdktf-name-picker-api-execution-role]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
Outputs:
lets-go = "lets go!"
```

You can also verify the role in the AWS IAM Console.

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, with a search for a specific role and options for managing roles and accessing AWS from non-AWS workloads.](https://kodekloud.com/kk-media/image/upload/v1752869552/notes-assets/images/CDK-for-Terraform-with-TypeScript-AWS-With-CDKTF/aws-iam-console-roles-management.jpg)

### Recap

In this lesson, we have:

- Defined the problem and set up prerequisites.
- Deployed Arthur’s Name Picker application manually using the AWS Console.
- Configured the AWS CLI and authenticated with AWS.
- Created a basic CDKTF application.
- Added the AWS provider and deployed our first AWS resource (an IAM role).

In the next section, we will continue developing Arthur’s Game Picker app by further defining and deploying the necessary AWS resources using CDKTF.

For more details on AWS deployments and CDKTF, explore the [AWS Documentation](https://aws.amazon.com/documentation/) and [Terraform Registry](https://registry.terraform.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/6b3e89b0-6156-475c-a2cf-0b3771783e10)**
>
> Watch video content
