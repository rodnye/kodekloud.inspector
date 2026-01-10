# Lambda Function Construct - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/Lambda-Function-Construct)

---

## Table of Contents

- Lambda Function Construct
  - Deployment Overview
  - Creating the Lambda Construct
  - Automating Code Packaging
  - Watch Video
    - Initial Setup
    - Attaching Policies
    - Creating the Lambda Function
    - Integrating the Construct into the Stack
    - Lambda Function Code Example
    - Automating Packaging with execSync (Not Recommended)
    - Improved Deployment with Terraform Assets

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# Lambda Function Construct

In this lesson, we encapsulate the behavior for a Lambda function in a reusable construct. This construct not only deploys the Lambda function but also creates the necessary IAM role and attaches the essential permissions.

Arthur wants to deploy a Lambda function that randomly selects a name from a list. To achieve this, we are building a reusable Lambda function construct.

## Deployment Overview

Below is the overall deployment diagram that illustrates how the Lambda function is deployed using CDKTF:

![The image is a diagram illustrating the deployment of a Lambda function using CDKTF, featuring icons and a label "Lambda Function Construct."](https://kodekloud.com/kk-media/image/upload/v1752869566/notes-assets/images/CDK-for-Terraform-with-TypeScript-Lambda-Function-Construct/lambda-function-cdkft-deployment-diagram.jpg)

## Creating the Lambda Construct

In the "Constructs" folder, create a new TypeScript file. Remember, it is a good convention to name the file after the class you are creating.

### Initial Setup

Below is an initial code snippet that sets up our construct:

```
import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { iamRole, provider } from '@cdktf/provider-aws';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });
  }
}


const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
  name: 'cdktf-name-picker-api-execution-role',
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { Service: 'lambda.amazonaws.com' },
        Action: 'sts:AssumeRole',
      },
    ],
  }),
});
```

The code above sets up our initial Lambda function construct. Notice how we dynamically create a role name based on the function name and define the assume-role policy.

### Attaching Policies

Next, attach a policy that grants basic permissions (like logging to CloudWatch). Modern IDEs can help suggest resource creation commands; for example, you may see an option for creating an IAM Role Policy Attachment:

```
// Create IAM role for Lambda
const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
  name: `${functionName}-execution-role`,
  assumeRolePolicy: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { Service: 'lambda.amazonaws.com' },
        Action: 'sts:AssumeRole',
      },
    ],
  }),
});


// Attach policy to the role to grant basic permissions (e.g., logging to CloudWatch)
new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
  role: lambdaRole.name,
  policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
});
```

If a required parameter is missing, a type error is thrown, which helps catch issues during development.

### Creating the Lambda Function

Now, create the Lambda function and expose it as a public property for access from the containing stack. The function is created using the CDKTF resource for Lambda:

```
// Attach policy to the role to grant Lambda basic permissions
new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
  role: lambdaRole.name,
  policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
});


// Create the Lambda function resource
this.lambdaFunction = new lambdaFunction.LambdaFunction(this, 'lambda-function', {
  functionName,
  role: lambdaRole.arn,
  runtime: 'nodejs18.x',
  timeout: 30,
});
```

The Lambda function requires several properties:

- **functionName:** The name provided to the construct.
- **role:** The ARN of the IAM role created earlier.
- **runtime:** The execution environment (Node.js 18.x in this case).
- **timeout:** The execution timeout (e.g., 30 seconds).

For more details, use your IDE’s “go to definition” feature to review the CDKTF documentation.

### Integrating the Construct into the Stack

Below is an example that demonstrates how to integrate the Lambda function construct into your main stack:

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
    });


    // Define additional resources
    new TerraformOutput(this, 'lets-go', { value: 'lets go!' });
  }
}


const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
```

Notice that we pass parameters such as the function name (`cdktf-name-picker-api`). Later, you will pass additional properties like the filename (for the zipped code) and the handler.

For example, to deploy your code stored in a zip file, specify the `filename` and `handler` properties:

```
import * as path from 'path';


new LambdaFunction(this, 'lambda-function', {
  functionName: 'cdktf-name-picker-api',
  filename: path.join(process.env.INIT_CWD!, './function-name-picker/index.js.zip'),
  handler: 'index.handler',
});
```

### Lambda Function Code Example

In the Lambda code (for example, in `index.js`), the export structure looks like this:

```
// index.js
let shuffledNames = [];
let currentIndex = 0;


exports.handler = async (event) => {
  console.log('Received event:', event);
  const names = JSON.parse(process.env.NAMES || '["Arthur","Martin","Douglas","Carolyn"]');
  const shuffle = process.env.SHUFFLE === 'true';


  if (!shuffle) {
    // Return a random name from the array if shuffling is disabled
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
      statusCode: 200,
      body: JSON.stringify(randomName),
    };
  } else {
    // If shuffling is enabled, shuffle the list and persist the state
    if (shuffledNames.length === 0 || currentIndex >= shuffledNames.length) {
      shuffledNames = shuffleArray([...names]); // Create a shuffled copy of names
      currentIndex = 0;
    }

    const nameToReturn = shuffledNames[currentIndex];
    currentIndex += 1; // Increment the index


    return {
      statusCode: 200,
      body: JSON.stringify(nameToReturn),
    };
  }
};


// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
```

After you deploy your stack (for example, by running `yarn deploy`), you may see output similar to:

```
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
cdktf-name-picker
lets-go = lets go!
```

Once deployed, check the AWS Lambda console. Under the Lambda functions list, you should see your new `cdktf-name-picker-api` function:

![The image shows the AWS Lambda console with a list of functions, including "cdktf-name-picker-api" and "console-name-picker," both using Node.js runtimes. There's also a tutorial section on creating a simple web app.](https://kodekloud.com/kk-media/image/upload/v1752869568/notes-assets/images/CDK-for-Terraform-with-TypeScript-Lambda-Function-Construct/aws-lambda-console-functions-nodejs.jpg)

Inspecting the configuration details of the deployed function (such as permissions and code settings) should reflect the setup provided in our construct:

![The image shows an AWS Lambda console interface displaying the configuration settings for a function named "picker-api," including memory, timeout, and storage details. There's also a tutorial section on creating a simple web app.](https://kodekloud.com/kk-media/image/upload/v1752869569/notes-assets/images/CDK-for-Terraform-with-TypeScript-Lambda-Function-Construct/aws-lambda-picker-api-settings.jpg)

When tested, a successful response similar to the JSON below is returned:

```
{
  "statusCode": 200,
  "body": "\"Carolyn\""
}
```

---

## Automating Code Packaging

Initially, the Lambda function code was manually zipped and referenced directly, which can be cumbersome and error-prone when the business logic changes frequently.

### Automating Packaging with execSync (Not Recommended)

One approach is to use Node's `execSync` to execute shell commands that package the code. For example:

```
import { execSync } from 'child_process';
import * as path from 'path';


interface LambdaFunctionProps {
  functionName: string;
  // Additional properties from LambdaFunctionConfig can be added here
  bundle: string;
  handler: string;
}


export class LambdaFunction extends Construct {
  public readonly lambdaFunction: lambdaFunction.LambdaFunction;


  constructor(
    scope: Construct,
    id: string,
    { functionName, bundle, ...rest }: LambdaFunctionProps
  ) {
    super(scope, id);


    // Compute the path for the zip file
    const filename = path.join(process.env.INIT_CWD!, `./out/${bundle}.zip`);
    // Zip the bundle using execSync
    execSync(
      `rm -rf ./out && mkdir -p ./out && cd ${bundle} && zip -r ${filename} .`,
      { cwd: process.env.INIT_CWD! }
    );


    // Create the IAM role for Lambda
    const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
      name: `${functionName}-execution-role`,
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { Service: 'lambda.amazonaws.com' },
            Action: 'sts:AssumeRole',
          },
        ],
      }),
    });


    new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
      role: lambdaRole.name,
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    });


    // Create the Lambda function using the generated zip file
    this.lambdaFunction = new lambdaFunction.LambdaFunction(this, 'lambda-function', {
      functionName,
      role: lambdaRole.arn,
      runtime: 'nodejs18.x',
      timeout: 30,
      filename, // Use the generated zip file path
      ...rest,
    });
  }
}
```

> [!important]
> **Warning**
>
> Manual packaging with `execSync` can lead to issues: Terraform won’t detect changes in the zipped file if the timestamp isn’t updated, potentially leading to outdated deployments.

### Improved Deployment with Terraform Assets

A better alternative is to use Terraform assets to automatically track changes in your application code. This approach ensures Terraform detects when you modify your business logic and redeploys the updated code.

Follow these steps to implement this:

1.  Import the Terraform asset classes:

    ```
    import { TerraformAsset, AssetType } from 'cdktf';
    ```

2.  Replace manual zipping with a Terraform asset that creates an archive from your code folder:

    ```
    interface LambdaFunctionProps extends Omit<LambdaFunctionConfig, 'role' | 'filename'> {
      bundle: string;
      functionName: string;
      handler: string;
    }


    export class LambdaFunction extends Construct {
      public readonly lambdaFunction: lambdaFunction.LambdaFunction;


      constructor(
        scope: Construct,
        id: string,
        { functionName, bundle, ...rest }: LambdaFunctionProps
      ) {
        super(scope, id);


        // Create a Terraform asset for the Lambda function code
        const asset = new TerraformAsset(this, 'lambda-asset', {
          path: path.join(process.env.INIT_CWD!, bundle),
          type: AssetType.ARCHIVE,
        });


        // Create IAM role for Lambda
        const lambdaRole = new iamRole.IamRole(this, 'lambda-execution-role', {
          name: `${functionName}-execution-role`,
          assumeRolePolicy: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: { Service: 'lambda.amazonaws.com' },
                Action: 'sts:AssumeRole',
              },
            ],
          }),
        });


        new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaExecutionRolePolicy', {
          role: lambdaRole.name,
          policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
        });


        // Create the Lambda function using the asset file
        this.lambdaFunction = new lambdaFunction.LambdaFunction(this, 'lambda-function', {
          functionName,
          role: lambdaRole.arn,
          runtime: 'nodejs18.x',
          timeout: 30,
          filename: asset.path, // asset.path points to the generated archive
          ...rest,
        });
      }
    }
    ```

In your main stack file, reference the bundle folder rather than a pre-zipped file:

```
import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import { LambdaFunction } from './constructs/LambdaFunction';


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new provider.AwsProvider(this, 'aws-provider', {
      region: 'us-east-1',
    });


    new LambdaFunction(this, 'lambda-function', {
      functionName: 'cdktf-name-picker-api',
      bundle: './function-name-picker', // Path to your code directory
      handler: 'index.handler',
    });


    new TerraformOutput(this, 'lets-go', { value: 'lets go!' });
  }
}


const app = new App();
new MyStack(app, 'cdktf-name-picker');
app.synth();
```

With this approach, Terraform tracks changes in the asset. When you update your business logic (for example, by adding new console logs), Terraform will detect the change and update the Lambda function accordingly.

Below is an example snippet from the Lambda code reflecting a code change:

```
// index.js
let shuffledNames = [];
let currentIndex = 0;


exports.handler = async (event) => {
  console.log('This is a code change');
  console.log('Received event:', event);
  const names = JSON.parse(process.env.NAMES || '["Arthur","Martin","Douglas","Carolyn"]');
  const shuffle = process.env.SHUFFLE === 'true';


  if (!shuffle) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    return {
      statusCode: 200,
      body: JSON.stringify(randomName),
    };
  }
};
```

After deploying, you will see logs confirming that the new code is executed:

```
START RequestId: <ID> Version: $LATEST
INFO Received event: { key1: 'value1', key2: 'value2', key3: 'value3' }
...
```

Using Terraform assets provides a more robust and change-aware deployment, ensuring that only actual code modifications trigger a redeployment.

---

This concludes the section on the Lambda function construct, encompassing both manual and automated packaging methods. By leveraging Terraform assets, your deployments become more efficient and reliable.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/22e7ba11-9fa6-49ea-a28d-3dea2878c676)**
>
> Watch video content
