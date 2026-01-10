# API Gateway Construct - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/API-Gateway-Construct)

---

## Table of Contents

- API Gateway Construct
  - Creating the Basic Construct
  - Building the API Gateway Construct
  - Utility Function: getConstructName
  - Integrating the API Gateway Construct in the Stack
  - Verifying Deployment and API Invocation
  - Summary
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# API Gateway Construct

In this lesson, we walk through creating an API Gateway construct that deploys all the necessary resources for our API. The API provides an HTTP endpoint that triggers an AWS Lambda function. All the logic is encapsulated within a reusable construct.

Below is an overview of the process:

1.  Create a new construct file named `lambda-rest-api.ts` in the appropriate folder.
2.  Instantiate the API Gateway, define its resources (including both root and proxy resources), attach HTTP methods with Lambda integrations, and finally expose the API URL.

---

## Creating the Basic Construct

We begin by setting up a construct to initialize the API Gateway. In your stack file, create a file called `lambda-rest-api.ts` with the following content:

```
import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { iamRole, provider } from '@cdktf/provider-aws';
import { LambdaFunction } from './constructs/LambdaFunction';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    new LambdaFunction(this, 'lambda-function', {
      functionName: 'cdktf-name-picker-api',
      bundle: './function-name-picker',
      handler: 'index.handler',
    });
  }
}
```

The above code sets up a basic Terraform stack with an AWS provider and deploys a Lambda function. The API Gateway construct will later reference this Lambda function.

---

## Building the API Gateway Construct

Within `lambda-rest-api.ts`, we now create the API Gateway construct. This includes importing the required AWS provider modules:

```
import {
  apiGatewayRestApi,
  apiGatewayDeployment,
  apiGatewayResource,
  apiGatewayMethod,
  apiGatewayIntegration,
  lambdaPermission,
} from '@cdktf/provider-aws';
// Todo: Implement reusable getConstructName function
import { getConstructName } from '../utils/utils';


interface LambdaRestApiProps {
  handler: lambdaFunction.LambdaFunction;
  stageName: string;
}


export class LambdaRestApi extends Construct {
  public readonly url: string;


  constructor(scope: Construct, id: string, { handler, stageName }: LambdaRestApiProps) {
    super(scope, id);


    // Create REST API with a unique name using the utility function
    const restApi = new apiGatewayRestApi.ApiGatewayRestApi(this, 'rest-api', {
      name: getConstructName(this, 'rest-api'),
    });


    // Attach a Lambda integration to the root resource
    this.createApiGatewayLambdaMethod('root', restApi, restApi.rootResourceId, handler);


    // Create a proxy resource for dynamic paths
    const proxyResource = new apiGatewayResource.ApiGatewayResource(this, 'proxy-resource', {
      restApiId: restApi.id,
      parentId: restApi.rootResourceId,
      pathPart: '{proxy+}',
    });


    // Attach a Lambda integration to the proxy resource
    this.createApiGatewayLambdaMethod('proxy-resource', restApi, proxyResource.id, handler);


    // Add Lambda permission to allow API Gateway to invoke the Lambda function
    new lambdaPermission.LambdaPermission(this, 'api-gateway-permission', {
      action: 'lambda:InvokeFunction',
      functionName: handler.functionName,
      principal: 'apigateway.amazonaws.com',
      sourceArn: `${restApi.executionArn}/*/*`,
    });


    // Create API deployment and ensure it waits for necessary dependencies.
    const deployment = new apiGatewayDeployment.ApiGatewayDeployment(this, 'deployment', {
      restApiId: restApi.id,
      stageName,
      dependsOn: [proxyResource, handler],
    });


    // Expose the API's invoke URL as a public property
    this.url = deployment.invokeUrl;
  }


  private createApiGatewayLambdaMethod(
    idPrefix: string,
    restApi: apiGatewayRestApi.ApiGatewayRestApi,
    resourceId: string,
    apiLambda: lambdaFunction.LambdaFunction,
  ) {
    // Create the API method with ANY HTTP method and no authorization
    new apiGatewayMethod.ApiGatewayMethod(this, `${idPrefix}-method`, {
      restApiId: restApi.id,
      resourceId,
      httpMethod: 'ANY',
      authorization: 'NONE',
    });


    // Integrate the method with the Lambda function using AWS_PROXY integration type
    new apiGatewayIntegration.ApiGatewayIntegration(this, `${idPrefix}-lambda-integration`, {
      restApiId: restApi.id,
      resourceId,
      httpMethod: 'ANY',
      integrationHttpMethod: 'POST',
      type: 'AWS_PROXY',
      uri: apiLambda.invokeArn,
    });
  }
}
```

> [!important]
> **Key Points**
>
> - The construct accepts a Lambda function handler and a stage name.
> - Unique API names are generated with the `getConstructName` function.
> - Both the root and proxy resources are integrated with the Lambda function using an AWS_PROXY integration.
> - Lambda permissions are set to allow API Gateway to invoke the Lambda function.

---

## Utility Function: getConstructName

This helper function creates unique resource names by appending the stack name to an identifier. Add the following code in a file like `utils/utils.ts`:

```
import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';


export const getConstructName = (scope: Construct, id: string) =>
  `${TerraformStack.of(scope)}_${id}`;
```

This utility retrieves the current Terraform stack name and appends it to a supplied ID, ensuring resource names remain unique and easily identifiable in the AWS console.

---

## Integrating the API Gateway Construct in the Stack

Update your main stack file to instantiate the Lambda function and link it to the API Gateway construct:

```
import * as path from 'path';
import { App, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { getConstructName } from './utils/utils';
import { LambdaFunction } from './constructs/LambdaFunction';
import { LambdaRestApi } from './constructs/LambdaRestApi';
import { Construct } from 'constructs';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    // Create the Lambda function using a unique name generated by the utility function
    const functionNamePicker = new LambdaFunction(this, 'lambda-function', {
      functionName: getConstructName(this, 'api'),
      bundle: './function-name-picker',
      handler: 'index.handler',
    });


    // Create the API Gateway construct, passing the Lambda and desired stage name
    new LambdaRestApi(this, 'lambda-rest-api', {
      handler: functionNamePicker,
      stageName: 'dev',
    });
  }
}


const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
```

This code initializes an AWS provider, deploys a Lambda function, and then associates that function with the API Gateway construct. The stage name "dev" designates the development stage for the API.

---

## Verifying Deployment and API Invocation

After deployment, you should see outputs similar to the following in your console:

```
cdktf-name-picker aws_api_gateway_integration.lambda-rest-api_root-lambda-integration_35089D24: Creation complete after 0s [id=...]
cdktf-name-picker aws_api_gateway_deployment.lambda-rest-api_deployment_FCE7AD5D: Creation complete after 0s [id=...]
cdktf-name-picker Apply complete! Resources: 11 added, 0 changed, 0 destroyed.
```

You can review the API Gateway details in the AWS console. For example, these images illustrate the deployed API and its stage details:

![The image shows a Visual Studio Code editor with TypeScript code for setting up an AWS API Gateway deployment. The code includes a to-do comment about exposing the API Gateway URL as a string property.](https://kodekloud.com/kk-media/image/upload/v1752869531/notes-assets/images/CDK-for-Terraform-with-TypeScript-API-Gateway-Construct/vscode-typescript-aws-api-gateway.jpg)

![The image shows an AWS API Gateway interface where an API named "cdktf-name-picker-rest-api" has been successfully deleted. It displays resource details and methods associated with the API.](https://kodekloud.com/kk-media/image/upload/v1752869532/notes-assets/images/CDK-for-Terraform-with-TypeScript-API-Gateway-Construct/aws-api-gateway-cdktf-deleted.jpg)

![The image shows an AWS API Gateway interface with details of a stage named "dev" for a REST API. It includes information about the stage, such as the invoke URL and deployment details.](https://kodekloud.com/kk-media/image/upload/v1752869534/notes-assets/images/CDK-for-Terraform-with-TypeScript-API-Gateway-Construct/aws-api-gateway-dev-stage-details.jpg)

To test the API endpoint, execute the following command (replace <your-api-invoke-url> with your actual API URL):

```
curl https://<your-api-invoke-url>/dev
```

Each call should return a unique name as designed by the Lambda function.

---

## Summary

In this lesson, we built a Lambda REST API construct that:

- Defines an API Gateway REST API with both root and proxy resources.
- Integrates HTTP methods with an AWS Lambda function using AWS_PROXY.
- Sets up necessary Lambda permissions for API Gateway.
- Deploys the API and exposes its invoke URL.

This construct offers an efficient way to connect API Gateway with AWS Lambda. In the next section, we will discuss backend strategies for managing Terraform state using CDKTF.

Happy Coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/95253f3c-95d5-40e4-a2ae-dda3e72fc02c)**
>
> Watch video content
