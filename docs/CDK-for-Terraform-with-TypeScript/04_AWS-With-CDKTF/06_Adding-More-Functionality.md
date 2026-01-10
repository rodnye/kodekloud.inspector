# Adding More Functionality - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/AWS-With-CDKTF/Adding-More-Functionality)

---

## Table of Contents

- Adding More Functionality
  - Recap of Core Concepts
  - Adding New Functionality
  - Verifying Deployed Resources
  - Cleaning Up Resources
  - Watch Video
  - Practice Lab
    - Example: Implementing the Week Planner Stack

---

## Content

CDK for Terraform with TypeScript

AWS With CDKTF

# Adding More Functionality

In this final section, we summarize the application created so far and discuss how to extend its functionality. The module has covered several key points including the problem definition of Arthur’s name picker app, the manual deployment of resources to AWS, and the automation improvements using CDKTF. Below is a high-level overview of these concepts.

## Recap of Core Concepts

The module addressed the following areas:

- Arthur’s name picker app problem definition.
- The manual process of deploying AWS resources.
- The creation of a Lambda function construct for deployment using CDKTF.
- The packaging approach with CDKTF, highlighting the disadvantages of synthesizing with `execSync` compared to using a Terraform asset.

We illustrated these concepts with this recap diagram:

![The image is a recap slide with a list of four topics: Problem, Manual process, LambdaFunction construct, and Packaging with execSync vs TerraformAsset.](https://kodekloud.com/kk-media/image/upload/v1752869553/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/recap-problem-manual-lambda-terraform.jpg)

Next, we built a Lambda REST API construct that exposes the Lambda function via an API Gateway. We transitioned from local state management to a remote S3 backend to enable collaborative state management. Additionally, we demonstrated how to import Terraform modules into CDKTF for a scalable, automated infrastructure that Arthur can share with his friends.

Another diagram recaps these additional topics:

![The image is a recap slide with a gradient background, listing three topics: "LambdaRestApi construct," "Managing state," and "Importing Terraform modules into CDKTF," numbered 05 to 07.](https://kodekloud.com/kk-media/image/upload/v1752869554/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/lambda-rest-api-managing-state-terraform.jpg)

The final application produces a name picker URL that can be accessed (for example, via `curl`) to retrieve a random family member’s name for washing up or other chores.

---

## Adding New Functionality

To further extend the application, consider the following configuration snippet. This snippet can be adapted to add additional stacks for new business functionalities or support multiple environments:

```
{
  "terraform": {
    "backend": {
      "s3": {
        "bucket": "cdktf-name-picker-prereq-471112546740",
        "dynamodb_table": "cdktf-name-picker-prereq",
        "key": "cdktf-name-picker",
        "region": "us-east-1"
      }
    },
    "required_providers": {
      "aws": {}
    }
  }
}
```

```
root in cdk.tf.out/stacks/cdktf-name-picker via ⍟ default on ⍟ (us-east-1)
root in cdk.tf.out/stacks/cdktf-name-picker via ⍟ default on ⍟ (us-east-1)
root in cdk.tf.out/stacks/cdktf-name-picker via ⍟ default on ⍟ (us-east-1)
root in cdk.tf.out/stacks/cdktf-name-picker via ⍟ default on ⍟ (us-east-1)
```

The diagram below provides an overview of the architecture when adding new stacks or managing different environments:

![The image shows two labeled folders: "Adding Stacks" and "Multiple Environments," suggesting a concept of organizing or managing different software stacks and environments.](https://kodekloud.com/kk-media/image/upload/v1752869554/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/adding-stacks-multiple-environments.jpg)

Imagine Arthur now wants to add a new "week planner" stack. To implement this, create a new stack file (for example, `week-planner-stack.ts`) in the stacks directory. The diagram below illustrates the creation process:

![The image shows a diagram labeled "WeekPlannerStack" with eight blue rectangles arranged in two rows. Below, there's a caption instructing to "Create and deploy a new stack (WeekPlannerStack)."](https://kodekloud.com/kk-media/image/upload/v1752869555/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/weekplannerstack-diagram-creation.jpg)

### Example: Implementing the Week Planner Stack

Inside the new file, you might start by reading the prerequisite state as shown below:

```
try {
    prereqState = JSON.parse(fs.readFileSync(prereqStateFile, 'utf-8'));
} catch (error: any) {
    if (error.code === 'ENOENT') {
        throw new Error(`Could not find prerequisite state file: ${prereqStateFile}`);
    }
    throw error;
}


// Only one backend is supported by Terraform
// S3 Backend - https://www.terraform.io/docs/backends/types/s3.html
// ToDo: Add S3Backend
new S3Backend(this, {
    bucket: prereqState.outputs.bucket.value,
    dynamodbTable: prereqState.outputs.dynamodbTable.value,
    region: 'us-east-1',
    key: id,
});
```

```
cdktf-name-picker
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"
```

The week planner stack extends the AWS base stack to inherit the provider, backend, and other reusable functionalities. For example:

```
import { Construct } from "constructs";
import { AwsBaseStack } from "./AwsBaseStack";


export class WeekPlannerStack extends AwsBaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
    }
}
```

```
cdktf-name-picker
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"


cdktf-name-picker
namePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev


root in ~/code via v20.17.0 on (us-east-1) took 48s
```

Next, let’s add a Terraform output to simulate the deployment of a resource within the new stack:

```
import { Construct } from "constructs";
import { AwsBaseStack } from "./AwsBaseStack";
import { TerraformOutput } from "cdktf";


export class WeekPlannerStack extends AwsBaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new TerraformOutput(this, 'weekPlannerUrl', {
            value: 'https://example.com',
        });
    }
}
```

```
cdktf-name-picker
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"


cdktf-name-picker
namePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev
```

For an alternative approach:

```
import { Construct } from "constructs";
import AwsBaseStack from "./AwsBaseStack";
import { TerraformOutput } from "cdktf";


export class WeekPlannerStack extends AwsBaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);


        new TerraformOutput({
            value: 'https://'
        });
    }
}
```

```
cdktf-name-picker
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker
mePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev
root in ~/code via  v20.17.0 on (us-east-1) took 48s
```

Finally, to incorporate the new week planner stack into the main application, import and instantiate it:

```
import { Construct } from 'constructs';
import { AwsBaseStack } from './AwsBaseStack';
import { TerraformOutput } from 'cdktf';


export class WeekPlannerStack extends AwsBaseStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        new TerraformOutput(this, 'weekPlannerUrl', {
            value: 'https://example.com',
        });
    }
}
```

```
cdktf-name-picker
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"


cdktf-name-picker
namePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev
```

In your main application file, you can instantiate the stacks as follows:

```
import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';
import { WeekPlannerStack } from './stacks/WeekPlannerStack';


const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
new WeekPlannerStack(app, 'cdktf-week-planner');
app.synth();
```

```
Outputs:
namePickerApiUrl = "https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev"
```

When deploying multiple stacks, CDKTF prompts you to choose which stack to deploy. You can deploy a specific stack (e.g., `yarn deploy cdk tf week planner`) or deploy all stacks with a wildcard (e.g., `yarn deploy "*"`) to deploy every stack.

For example, to verify both stacks deploy correctly, you might use:

```
import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';
import { WeekPlannerStack } from './stacks/WeekPlannerStack';


const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
new NamePickerStack(app, 'cdktf-name-picker-prod');
app.synth();
```

```
after 0s [id=terraform-202411160818048000000002]
cdktf-name-picker-prod aws_api_gateway_deployment.lambda-rest-api_deployment_FCE7AD5D: Creation complete after 0s [id=88p95h]
cdktf-name-picker-prod
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.


Outputs:
namePickerApiUrl = "https://x7b8ixa8yf.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker
namePickerApiUrl = https://p67gqu4qdc4.execute-api.us-east-1.amazonaws.com/dev
cdktf-name-picker-prod
namePickerApiUrl = https://x7b8ixa8yf.execute-api.us-east-1.amazonaws.com/dev
```

> [!important]
> **Note**
>
> The production stack currently uses the `/dev` stage in the API URL. This is an issue scheduled for resolution in a later lab question.

Arthur can also split the infrastructure by environment. For instance, you may replicate the name picker stack for a production environment by copying the stack, assigning a unique ID (such as appending a prod suffix), and optionally adjusting resource names. A helper function can aid in ensuring unique naming across stacks:

```
import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';


export const getConstructName = (scope: Construct, id: string) => `${TerraformStack.of(scope)}-${id}`;
```

```
Outputs:
  weekPlannerUrl = "https://example.com"
  cdktf-name-picker
  namePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev
  cdktf-week-planner
  weekPlannerUrl = https://example.com
```

To deploy the production stack, adjust your main application file as follows:

```
import { App } from 'cdktf';
import { NamePickerStack } from './stacks/NamePickerStack';
import { WeekPlannerStack } from './stacks/WeekPlannerStack';


const app = new App();
new NamePickerStack(app, 'cdktf-name-picker');
new NamePickerStack(app, 'cdktf-name-picker-prod');


app.synth();
```

```
cdktf-name-picker-prod
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.
Outputs:
namePickerApiUrl = "https://x7b8ixa8yf.execute-api.us-east-1.amazonaws.com/dev"
cdktf-name-picker-prod
namePickerApiUrl = https://p67gu4qdc4.execute-api.us-east-1.amazonaws.com/dev
```

This results in two deployed stacks (one for development and one for production). Remember, even though the production stack shows a `/dev` stage in the URL, it will be addressed later.

---

## Verifying Deployed Resources

After deployment, verify the resources in AWS. For example, check the Lambda console for the deployed functions:

![The image shows three colored boxes representing different app components: "Name Picker Stack (dev)", "Name Picker Stack (prod)", and "Week Planner (dev)", each containing constructs like "LambdaFunction" and "LambdaRestApi".](https://kodekloud.com/kk-media/image/upload/v1752869556/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/app-components-name-picker-week-planner.jpg)

When using additional stacks, keep in mind:

- Each stack should represent a unit of deployable business functionality (e.g., front end or back end).
- Separate stacks are used for different environments (dev, prod, etc.).
- Experiment with proof-of-concept stacks and remove them later if they are no longer needed; non-deployed stacks are never destroyed automatically.

---

## Cleaning Up Resources

When Arthur is finished with the application, he can destroy the entire infrastructure to avoid unwanted AWS charges. To properly clean up, first destroy the main application stacks, and then the prerequisites:

```
yarn destroy "*"
yarn destroy:prereq
```

> [!important]
> **Warning**
>
> It is important to destroy the main application before the prerequisites. Destroying the prerequisites first (which includes the S3 backend state) may cause failures in destroying the main application.

For example, the package.json might include the following scripts:

```
{
  "main": "main.js",
  "types": "main.ts",
  "license": "MPL-2.0",
  "private": true,
  "scripts": {
    "get": "cdktf get",
    "build": "cdktf synth",
    "deploy": "cdktf deploy",
    "deploy:prereq": "cdktf deploy --app='yarn ts-node prereq.ts'",
    "destroy": "cdktf destroy",
    "destroy:prereq": "cdktf destroy --app='yarn ts-node prereq.ts'",
    "watch": "tsc -w",
    "test": "jest"
  }
}
```

Example output during destruction:

```
cdktf-name-picker-prod 🐹 aws_api_gateway_rest_api.lambda-rest-api_740DF6EC: Destroying... [id=qLnytck7qa]
aws_lambda_function.lambda-function_lambda-function_0ABACFAE: Destruction complete after 0s
aws_iam_role.lambda-function_lambda-execution-role_B8EC76BB: Destruction complete after 0s
aws_api_gateway_rest_api.lambda-rest-api_740DF6EC: Still destroying... [id=qLnytck7qa, 10s elapsed]
...
aws_api_gateway_rest_api.lambda-rest-api_740DF6EC: Destruction complete after 47s
Destroy complete! Resources: 11 destroyed.
```

In some cases, destruction may fail if, for example, an S3 bucket is not empty:

```
cdktf-name-picker-prereq module.s3-dynamodb-remote-backend.aws_dynamodb_table.this: Destruction complete after 3s
cdktf-name-picker-prereq
Error: deleting S3 Bucket (cdktf-name-picker-prereq-891317002225): operation error S3: DeleteBucket, https://s3.us-east-1.amazonaws.com/cdktf-name-picker-prereq-891317002225:
An error occurred (BucketNotEmpty) when calling the DeleteBucket operation: The bucket you tried to delete is not empty. You must delete all versions in the bucket.
```

In such cases, manually empty the S3 bucket via the AWS console. The diagram below illustrates what you might see:

![The image shows an Amazon S3 bucket interface with a list of objects, including their names, last modified dates, sizes, and storage classes. The bucket is named "cdktf-name-picker-prereq-992382811848" and contains three objects.](https://kodekloud.com/kk-media/image/upload/v1752869557/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/amazon-s3-bucket-interface-objects.jpg)

After emptying the bucket, run the destroy command for the prerequisites again:

```
yarn destroy:prereq
```

Finally, verify that no Lambda functions remain:

![The image shows an AWS Lambda console interface, specifically the configuration tab for a function, displaying an environment variable with the key "NAMES" and the value `["Fred","Bob"]`.](https://kodekloud.com/kk-media/image/upload/v1752869558/notes-assets/images/CDK-for-Terraform-with-TypeScript-Adding-More-Functionality/aws-lambda-console-configuration-names.jpg)

Also check S3 and DynamoDB to ensure the state has been completely destroyed.

---

This concludes the final section of our article. In the next module, we will review everything learned in this course and discuss best practices for using CDKTF.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/4c12891b-f4d1-42b9-a6d7-855716897e82)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/4625ff69-dbd8-42ac-9542-d0e60a85e2ae/lesson/b53f0026-82f8-4e86-b92d-abba0923d2b3)**
>
> Practice lab
