# API Gateway Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/API-Gateway-Demo)

---

## Table of Contents

- API Gateway Demo
  - Step 1: Access the AWS API Gateway Console
  - Step 2: Create a Resource for Books
  - Step 3: Define Methods for the Resource
  - Step 4: Understand API Gateway's Request Flow
  - Step 5: Test the API Method
  - Step 6: Deploy Your API
  - Step 7: Add an Authors Resource
  - Step 8: Create a Nested Endpoint for Top Books
  - Conclusion
  - References
  - Watch Video
  - Practice Lab
    - Create the Lambda Function for Books

---

## Content

AWS Certified Developer - Associate

API Gateway

# API Gateway Demo

In this lesson, you'll learn how to work with the AWS API Gateway by creating a REST API that integrates with AWS Lambda functions. This step-by-step guide demonstrates how to configure resources, methods, and Lambda integrations for a library application.

## Step 1: Access the AWS API Gateway Console

Open the AWS Console and search for **API Gateway**. You will see several options such as HTTP APIs, WebSocket APIs, REST APIs, and private REST APIs. For this demo, we will use the REST API.

![The image shows the AWS API Gateway console with options to build WebSocket, REST, and REST API Private, each with descriptions and "Build" buttons.](https://kodekloud.com/kk-media/image/upload/v1752857814/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-console-options.jpg)

Select **REST API** and click **Build**. When creating a REST API, you have several choices:

- Create a new API from scratch
- Import an API from an OpenAPI definition file
- Clone an existing API
- Use an AWS-provided demo API  
  For this demo, choose the "create a new API from scratch" option.

![The image shows the AWS API Gateway interface for creating a REST API, with options to create a new API, clone an existing API, import an API, or use an example API. There are fields for entering the API name, description, and selecting the API endpoint type.](https://kodekloud.com/kk-media/image/upload/v1752857816/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-rest-api-interface.jpg)

Provide an API name that reflects its purpose. For example, for a library application that keeps track of books, you might name it **Library**. Optionally, add a description, select the API endpoint type (regional, edge optimized, or private), and click **Create API**. Once created, the console will display your API resources. Initially, only the root resource ("/") will be visible.

![The image shows the AWS API Gateway console, displaying a newly created REST API with no methods defined yet. The interface includes options to create resources and methods.](https://kodekloud.com/kk-media/image/upload/v1752857817/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-rest-api-console.jpg)

## Step 2: Create a Resource for Books

Since this is a library API, the next step is to create a new resource for books. Click on **Create Resource** and set the resource path to `/books`. This ensures that any requests to `/books` are handled by this resource.

![The image shows the AWS API Gateway interface with a resource named "/books" created, but no methods are defined yet.](https://kodekloud.com/kk-media/image/upload/v1752857818/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-books-resource.jpg)

## Step 3: Define Methods for the Resource

For a basic REST API, a GET request is commonly used to retrieve data. In our case, a GET request to `/books` should return a list of books. Under the `/books` resource, click on **Create Method** and select **GET** from the dropdown menu of HTTP methods.

![The image shows the AWS API Gateway interface for creating a method, with a dropdown menu displaying HTTP method options like GET, POST, and PUT.](https://kodekloud.com/kk-media/image/upload/v1752857819/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-http-methods.jpg)

Next, choose **Lambda Function** as the integration type. Note that by default, API Gateway does not forward the complete HTTP request details (headers, IP address, or body) to the Lambda function unless you enable Lambda proxy integration. For this demo, we keep Lambda proxy integration disabled and only configure the necessary data.

### Create the Lambda Function for Books

Before integrating with API Gateway, create a Lambda function. Open the AWS Lambda console and create a function named **getBooks** using Node.js as the runtime. The runtime selection does not affect the API Gateway integration since the process remains the same regardless of the language.

![The image shows the AWS Lambda console with a list of four functions, including their names, package types, runtimes, and last modified dates. The interface includes options for creating a new function and accessing additional resources.](https://kodekloud.com/kk-media/image/upload/v1752857820/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-lambda-console-functions-list.jpg)

Update the sample code with the following handler function:

---

export const handler = async (event, context) => { const response = { body: "Here is a list of all books", }; return response; };

---

After updating the code, deploy the function changes. You can test the Lambda function by clicking **Test** in the Lambda console; it should return:

---

{ "body": "Here is a list of all books" }

---

Return to API Gateway, choose your **getBooks** Lambda function for the GET method integration, and leave the default timeout (29 seconds). You can adjust the integration timeout in the Lambda function configuration if needed.

![The image shows the AWS API Gateway interface for creating a method, with options for selecting the method type and integration type, such as Lambda function, HTTP, Mock, AWS service, and VPC link.](https://kodekloud.com/kk-media/image/upload/v1752857822/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-method-creation.jpg)

## Step 4: Understand API Gateway's Request Flow

API Gateway displays a visual diagram of the request flow:

- The client's request goes through the method request.
- API Gateway processes the integration request and forwards it (with optional data transformations) to the Lambda function.
- Once the Lambda function returns a response, API Gateway can modify it via the integration response before sending the final HTTP response to the client.

![The image shows the AWS API Gateway console with a GET method for a "/books" resource, integrated with a Lambda function named "getBooks." Integration request settings are displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752857823/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-get-books-lambda.jpg)

You can edit mapping templates for both integration requests and responses to tailor incoming data (like URL paths, query parameters, and headers) or modify the Lambda response. By default, API Gateway returns a 200 status code if the Lambda function completes successfully.

![The image shows the AWS API Gateway console, specifically the method response configuration for a GET request to a "/books" resource, with a 200 response status.](https://kodekloud.com/kk-media/image/upload/v1752857825/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-get-books-response.jpg)

## Step 5: Test the API Method

In API Gateway, you can simulate an HTTP request by providing dummy query strings and headers. Click **Test** to view the response, which should be:

---

{"body": "Here is a list of all books"}

---

This output includes details such as headers and execution logs that show the request flow through API Gateway and the Lambda function.

![The image shows the AWS API Gateway interface where a Lambda function is being configured, with options for integration type and timeout settings.](https://kodekloud.com/kk-media/image/upload/v1752857826/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-lambda-configuration.jpg)

## Step 6: Deploy Your API

After confirming that your method works as expected, deploy your API:

1.  Click **Deploy API** in API Gateway.
2.  Choose (or create) a stage. Stages represent environments like development, testing, or production. For this demo, create a stage named **dev**.
3.  Deploy the API.

![The image shows an AWS API Gateway interface where a GET method has been successfully created for a resource named "books." It includes options for method execution, integration, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752857828/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-get-books.jpg)

Once deployed, navigate to the **Stages** section to locate the **invoke URL**. This URL is the endpoint where your API is hosted. Access it in a web browser; if you see an error such as:

---

{"message":"Missing Authentication Token"}

---

it means you are hitting the root URL without a configured method. Simply append the resource path (e.g., `/books`) to the URL to correctly invoke the GET method.

To further test the endpoint, use an HTTP client like [Postman](https://www.postman.com/). Paste the full invoke URL (including the resource path) into Postman and send a GET request. The expected response:

---

{ "body": "Here is a list of all books" }

---

with a status code of 200 along with additional headers such as Content-Type and X-Amzn-Trace-Id.

![The image shows a screenshot of an API request being made in Postman, with details of the request and response headers visible. It also includes an AWS API Gateway interface in the background.](https://kodekloud.com/kk-media/image/upload/v1752857829/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/postman-api-request-aws-gateway.jpg)

## Step 7: Add an Authors Resource

Next, add a new resource for authors to enable users to retrieve a list of authors.

1.  In your API's resource tree (not the deployed stage view), click **Create Resource**.
2.  Set the resource path to `/authors`.
3.  Add a GET method under this resource.

![The image shows the AWS API Gateway interface for creating a new resource, with fields for resource path and resource name. A green notification bar indicates a successful deployment.](https://kodekloud.com/kk-media/image/upload/v1752857830/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-new-resource.jpg)

Similarly, create a Lambda function named **getAuthors** using Node.js. Update the function code to:

---

export const handler = async (event, context) => { const response = { body: "Here is a list of all authors", }; return response; };

---

Deploy this function, then return to API Gateway. Integrate the GET method under `/authors` with the **getAuthors** Lambda function and deploy the updated API to the **dev** stage.

![The image shows the AWS API Gateway interface with a GET method for the "/authors" resource, indicating a successful creation of the method. It includes details about method execution and integration with AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752857832/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-get-authors.jpg)

After a short propagation period, test the `/authors` endpoint using the invoke URL appended with `/authors`. You should receive:

---

{"body": "Here is a list of all authors"}

---

with a status code of 200.

![The image shows a screenshot of an API request being made in Postman, with details of the request and response headers visible. The background displays the AWS API Gateway console.](https://kodekloud.com/kk-media/image/upload/v1752857833/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/postman-api-request-aws-console.jpg)

## Step 8: Create a Nested Endpoint for Top Books

To retrieve top-rated or top-selling books, create a nested endpoint under the `/books` resource:

1.  Under `/books`, click **Create Resource**.
2.  Define the nested resource path as `/top`.

![The image shows the AWS API Gateway console with a resource path "/books/top" successfully created, but no methods defined yet.](https://kodekloud.com/kk-media/image/upload/v1752857835/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-books-top-resource.jpg)

Under the `/books/top` resource, add a GET method. Then, create a new Lambda function named **getTopBooks** using Node.js with the following code:

---

export const handler = async (event, context) => { const response = { body: "Here is a list of all top books", }; return response; };

---

Deploy the Lambda function, configure the GET method integration to use **getTopBooks**, and then deploy the API to the **dev** stage.

![The image shows the AWS Lambda console where a new function named "getTopBooks" is being created with Node.js 20.x as the runtime and x86_64 architecture selected.](https://kodekloud.com/kk-media/image/upload/v1752857836/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-lambda-gettopbooks-function.jpg)

![The image shows an AWS API Gateway interface with a method execution setup for a GET request on the "/books/top" resource. It includes details about method requests, integration requests, and Lambda integration.](https://kodekloud.com/kk-media/image/upload/v1752857837/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-get-books-2.jpg)

Test this nested endpoint by appending `/books/top` to your stage invoke URL in a web browser or Postman. If you receive a "Missing Authentication Token" error, ensure you are using the correct full URL with the nested resource path. After propagation, the endpoint should return:

---

{"body": "Here is a list of all top books"}

---

![The image shows a screenshot of an API Gateway interface on AWS, with a GET request being tested in Postman, displaying a JSON response with a message about top books.](https://kodekloud.com/kk-media/image/upload/v1752857839/notes-assets/images/AWS-Certified-Developer-Associate-API-Gateway-Demo/aws-api-gateway-postman-json-response.jpg)

> [!important]
> **Deployment Reminder**
>
> Remember to redeploy your API after making any changes, as the deployment stage represents the active configuration.

## Conclusion

This demo has guided you through setting up resources, methods, and Lambda integrations with AWS API Gateway for a library application. You learned how to configure a REST API, create and integrate Lambda functions, and test your endpoints using both the API Gateway console and Postman.

Happy developing, and see you in the next lesson!

## References

- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Postman](https://www.postman.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/8cc0391b-4499-4631-b314-b3f07dc7d76e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/7e2b6760-5537-40a8-ad01-8683740c0974)**
>
> Practice lab
