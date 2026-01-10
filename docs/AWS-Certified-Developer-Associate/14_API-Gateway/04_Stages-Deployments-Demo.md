# Stages Deployments Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Stages-Deployments-Demo)

---

## Table of Contents

- Stages Deployments Demo
  - Creating the Lambda Function
  - Creating Aliases for Lambda Versions
  - Setting Up API Gateway
  - Updating Lambda Permissions for API Gateway
  - Completing the API Gateway Setup
  - Watch Video
    - Publishing Version Two
    - Publishing Version Three
    - Deploying the API

---

## Content

AWS Certified Developer - Associate

API Gateway

# Stages Deployments Demo

In this lesson, you'll learn how to use API Gateway stages and stage variables to manage different Lambda function versions. We will begin by creating a Lambda function that serves as an API for an e-commerce application, and then integrate it with API Gateway.

## Creating the Lambda Function

First, navigate to the AWS Lambda console.

![The image shows the AWS Management Console home page, displaying recently visited services, application management, AWS health, and cost and usage information.](https://kodekloud.com/kk-media/image/upload/v1752857891/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-management-console-home-page.jpg)

Next, create a new Lambda function. For this example, the function will return a list of products for an e-commerce website. Name the function something like "get products."

![The image shows the AWS Lambda console where a user is creating a new function. The function is named "getPr" with Node.js 20.x selected as the runtime.](https://kodekloud.com/kk-media/image/upload/v1752857892/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-lambda-create-function-getpr-nodejs.jpg)

Use the following code as the initial version (version one) of the function:

```
export const handler = async (event, context) => {
    const response = {
        body: "Here is a list of all products",
    };
    return response;
};
```

Add a comment indicating that this is version one of your function, then deploy and test the changes. A sample test output might be:

```
{
  "body": "Here is a list of all products }"
}
```

If you test again, you could see something like:

```
Response
{
  "body": "Here is a list of all products \"%"
}

Function Logs
START RequestId: f64eab30-2c13-457a-b269-eeb69cc12b32 Version: $LATEST
END RequestId: f64eab30-2c13-457a-b269-eeb69cc12b32
REPORT RequestId: f64eab30-2c13-457a-b269-eeb69cc12b32 Duration: 143.16 ms Billed Duration: 144 ms Memory Size: 128 MB Max Memory Used: 65 MB
```

Once the function displays version one correctly, publish it as version one.

You will now simulate code changes over time by publishing two additional function versions.

### Publishing Version Two

Edit your Lambda function code to implement version two:

```
export const handler = async (event, context) => {
    const response = {
        body: "Here is a list of all products v2",
    };
    return response;
};
```

Deploy this change and publish it as version two.

### Publishing Version Three

Next, update the code to represent version three:

```
export const handler = async (event, context) => {
    const response = {
        body: "Here is a list of all products v3",
    };
    return response;
};
```

Deploy and publish this update as version three.

![The image shows an AWS Lambda console with a function named "getProducts" at version 3. It includes options for exporting, downloading, and adding destinations, along with a function ARN displayed.](https://kodekloud.com/kk-media/image/upload/v1752857893/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-lambda-getproducts-console-2.jpg)

## Creating Aliases for Lambda Versions

To enable API Gateway to reference specific versions of your Lambda function, complete the following steps:

1.  Navigate to the "Aliases" section.
2.  Create an alias named **prod** and point it to version one. This alias represents your production environment.
3.  Create an alias named **staging** that points to version two.
4.  Finally, create an alias named **dev** for the development environment, ideally pointing to the latest version (version three).

![The image shows an AWS Lambda console screen with details of a function alias named "prod" for the function "getProducts." It includes options to add triggers and destinations, and displays the function's ARN and version information.](https://kodekloud.com/kk-media/image/upload/v1752857894/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-lambda-console-getproducts-prod.jpg)

At this point, you should have three aliases:

- **prod (version one)**
- **staging (version two)**
- **dev (version three)**

## Setting Up API Gateway

Now that your Lambda function has multiple versions and aliases, configure API Gateway as follows:

![The image shows an AWS Lambda console interface for a function named "getProducts," displaying its overview, configuration options, and aliases.](https://kodekloud.com/kk-media/image/upload/v1752857896/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-lambda-getproducts-console-3.jpg)

1.  Open the AWS Management Console, search for API Gateway, and access it in a new tab.
2.  Create a new REST API – for example, name it "eCommerce."

![The image shows an AWS API Gateway interface with options to build WebSocket API, REST API, and REST API Private, each with corresponding "Build" buttons.](https://kodekloud.com/kk-media/image/upload/v1752857898/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-interface-options.jpg)

![The image shows the AWS API Gateway interface for creating a REST API. The "New API" option is selected, and the API name is set to "ecommerce."](https://kodekloud.com/kk-media/image/upload/v1752857899/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-ecommerce-rest-api.jpg)

3.  Create a resource named **products**.

![The image shows an AWS API Gateway interface where a user is creating a new resource named "product" with options for proxy resource and CORS.](https://kodekloud.com/kk-media/image/upload/v1752857900/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-create-product-resource.jpg)

4.  Under the **products** resource, add a GET method and select **Lambda function** as the integration type.
5.  Select the "getProducts" Lambda function. By default, API Gateway will use the latest version of the function.

![The image shows an AWS API Gateway interface where a user is configuring a method to integrate with a Lambda function. Various integration options like HTTP, AWS service, and VPC link are visible.](https://kodekloud.com/kk-media/image/upload/v1752857902/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-lambda-integration.jpg)

If you need to invoke a specific version via an alias—for example, using the prod alias—you can modify the function ARN manually. The prod alias ARN contains the suffix ":prod", ensuring API Gateway calls the intended version.

To keep the integration flexible, instead of hardcoding a specific version, use stage variables. In the function integration configuration, append the following ARN:

```
:lambda:us-east-1:841860929733:function:getProducts
```

Then, append the stage variable reference:

```
:${stageVariables.ENV}
```

This instructs API Gateway to use the stage variable named ENV to determine which alias (prod, staging, or dev) to invoke.

![The image shows an AWS API Gateway interface where a Lambda function is being integrated. Various integration options like HTTP, AWS service, and VPC link are visible.](https://kodekloud.com/kk-media/image/upload/v1752857903/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-lambda-integration-2.jpg)

> [!important]
> **Note**
>
> Ensure you update the Lambda function's permissions after modifying API Gateway configurations.

## Updating Lambda Permissions for API Gateway

To grant API Gateway permission to invoke your Lambda function, execute the following AWS CLI command. Replace the stage variable reference with the actual alias as needed (e.g., dev):

```
aws lambda add-permission \
  --function-name "arn:aws:lambda:us-east-1:184186097273:function:getProducts:dev" \
  --source-arn "arn:execute-api:us-east-1:184186097273:6gkxxg7et3:get/products" \
  --principal apigateway.amazonaws.com \
  --statement-id a227f988-a34e-4325-b5c9-8c6b686f982 \
  --action lambda:InvokeFunction
```

Repeat this process for the staging and prod aliases by updating the alias in the command accordingly. For example, for the prod alias:

```
aws lambda add-permission \
  --function-name "arn:aws:lambda:us-east-1:841860927373:function:getProducts:prod" \
  --source-arn "arn:aws:execute-api:us-east-1:841860927373:67gx8xm3f/*/GET/products" \
  --principal apigateway.amazonaws.com \
  --statement-id a22f988a-34fe-4352-ab59-3cc6b686f982 \
  --action lambda:InvokeFunction
```

You can run these commands on your local machine (with the AWS CLI installed) or directly within AWS CloudShell.

After updating the permissions, verify in the Lambda console that each alias has the appropriate API Gateway invocation permissions.

## Completing the API Gateway Setup

With Lambda permissions in place, return to API Gateway to complete the GET method configuration. Test the method by setting the stage variable ENV. For example, setting ENV to **prod** should return:

```
{
  "body": "Here is a list of all products v1"
}
```

Switching the stage variable to **dev** or **staging** should return version three and version two, respectively.

![The image shows an AWS API Gateway interface with a GET request to the "/products" endpoint, displaying a response body that lists all products. The response includes headers and a log of the request execution.](https://kodekloud.com/kk-media/image/upload/v1752857905/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-get-products-response.jpg)

### Deploying the API

Deploy your API by creating stages for each environment:

1.  Create a new stage for the dev environment:
    - In the stage editor, set a stage variable with the key **ENV** and the value **dev**.
2.  Create another stage called staging, and set the stage variable **ENV** to **staging**.
3.  Finally, create a production stage and set its stage variable **ENV** to **prod**.

![The image shows an AWS API Gateway console with details of the "staging" stage for an API named "ecommerce." It includes stage details like the invoke URL and deployment information.](https://kodekloud.com/kk-media/image/upload/v1752857906/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-ecommerce-staging.jpg)

After deploying, test each environment by modifying the URL path (e.g., /prod, /staging, or /dev). For instance, the prod stage URL should return the version one response.

![The image shows an AWS API Gateway console with stages for an "ecommerce" API, highlighting the "prod" stage and a GET method for the "/products" endpoint.](https://kodekloud.com/kk-media/image/upload/v1752857907/notes-assets/images/AWS-Certified-Developer-Associate-Stages-Deployments-Demo/aws-api-gateway-ecommerce-prod-get.jpg)

When you test, you should see the following responses:

- **prod** returns "Here is a list of all products v1"
- **staging** returns "Here is a list of all products v2"
- **dev** returns "Here is a list of all products v3"

A sample response might be:

```
{
  "body": "Here is a list of all products v2"
}
```

This concludes our lesson on configuring stages and stage variables in API Gateway to manage multiple versions of your Lambda functions. Enjoy the streamlined deployment process for your e-commerce API!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/8a4e4794-205e-47b0-acc9-003c3f97610a)**
>
> Watch video content
