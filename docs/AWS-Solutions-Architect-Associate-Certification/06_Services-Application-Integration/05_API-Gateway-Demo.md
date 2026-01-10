# API Gateway Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Application-Integration/API-Gateway-Demo)

---

## Table of Contents

- API Gateway Demo
  - Creating the REST API
  - Defining a Resource
  - Configuring the GET Method
  - Deploying the API
  - Creating the POST Method to Add Cars
  - Implementing the PATCH Method for Updating Cars
  - Setting Up the DELETE Method
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Application Integration

# API Gateway Demo

In this guide, you'll learn how to set up an API using AWS API Gateway integrated with [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda) functions. This demo covers configuring a REST API to route incoming HTTP requests to dedicated Lambda functions that handle back-end logic for various operations on a car inventory.

---

## Creating the REST API

Start by searching for API Gateway in the AWS Management Console to access the API Gateway service page. Here, you can choose from HTTP APIs, WebSocket APIs, and REST APIs (public or private). For this demo, we will create a REST API.

Click **Build** to create a new API rather than importing or cloning an existing one.

![The image shows the AWS API Gateway console with options to build or import WebSocket and REST APIs. It includes descriptions of each API type and their compatible services.](https://kodekloud.com/kk-media/image/upload/v1752864657/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-console-websocket-rest-apis.jpg)

Provide a name for your API (for example, "cars") and an optional description. Select **Regional** as the endpoint type and then click **Create API**.

![The image shows the AWS API Gateway interface for creating a new REST API, with options to create, clone, import, or use an example API. The user can enter an API name, description, and select the endpoint type.](https://kodekloud.com/kk-media/image/upload/v1752864659/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-rest-api-interface.jpg)

---

## Defining a Resource

Next, define a resource representing a specific path in your API. In this example, all requests target the `/cars` endpoint. This configuration helps route HTTP methods to their corresponding Lambda functions.

Select your API and create a resource with the path `/cars`. For this demonstration, you can leave CORS settings unchecked. Click **Create Resource** to proceed.

![The image shows the AWS API Gateway console with a newly created REST API named "cars." It displays the resources section with no methods defined yet.](https://kodekloud.com/kk-media/image/upload/v1752864660/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-cars-rest-api.jpg)

![The image shows an AWS API Gateway interface where a user is creating a new resource named "cars." The interface includes options for setting the resource path and enabling CORS.](https://kodekloud.com/kk-media/image/upload/v1752864661/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-cars-resource.jpg)

---

## Configuring the GET Method

Under the `/cars` resource, create a GET method that links to a preconfigured Lambda function. Open the [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda) console in another browser tab and verify that you have a function (named "GetCars" in this demo) returning a fixed list of cars. The simplified Lambda function example is shown below:

```
// Lambda function: GetCars
export const handler = async (event) => {
  const cars = [
    { model: "accord", make: "honda", color: "blue" },
    { model: "camry", make: "toyota", color: "red" },
    { model: "civic", make: "honda", color: "black" }
  ];
  const response = {
    statusCode: 200,
    body: JSON.stringify(cars),
  };
  return response;
};
```

Returning to API Gateway, create the GET method on the `/cars` resource by clicking **Create Method**. Choose **GET** as the HTTP method. Set the integration type to **Lambda Function** and enable Lambda Proxy Integration to pass the complete event to Lambda. Finally, select your "GetCars" Lambda function and create the method.

![The image shows an AWS API Gateway console where a user is configuring an integration type for a GET method, selecting a Lambda function as the integration option. Various integration types are displayed, including HTTP, Mock, AWS service, and VPC link.](https://kodekloud.com/kk-media/image/upload/v1752864662/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-lambda-integration.jpg)

After configuration, any GET request to `/cars` will trigger the "GetCars" Lambda function.

![The image shows an AWS API Gateway interface with a successfully created GET method for a "cars" resource. It displays the method execution flow, including client requests and Lambda integration.](https://kodekloud.com/kk-media/image/upload/v1752864663/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-get-method-cars.jpg)

---

## Deploying the API

Before testing, deploy your API. Click the **Deploy API** button, choose a stage (e.g., **development**), and deploy it. Once deployed, you will receive an invoke URL for sending requests.

![The image shows the AWS API Gateway console with a "Deploy API" dialog box open, prompting the user to choose a stage and enter a stage name for deployment.](https://kodekloud.com/kk-media/image/upload/v1752864664/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-deploy-dialog.jpg)

To test the GET endpoint, copy the invoke URL and append `/cars` (since testing the root URL may result in a "Missing Authentication Token" error):

> [!important]
> **Testing the Endpoint**
>
> Ensure you append `/cars` to your invoke URL, as leaving it out may trigger an incorrect response due to missing endpoint context.

For example, if you receive the following response:

```
{"message":"Missing Authentication Token"}
```

It means the request was sent to the base URL instead of the complete URL with `/cars`.

![The image shows an AWS API Gateway console with details of a "development" stage for an API named "cars," including the invoke URL and logging information. The stage details include rate and burst limits, and the API cache is inactive.](https://kodekloud.com/kk-media/image/upload/v1752864666/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-cars-development.jpg)

---

## Creating the POST Method to Add Cars

To add a new car entry, create a POST method under the `/cars` resource. Select the `/cars` resource (which currently has the GET method) and click **Create Method**, then choose **POST**. Configure it with Lambda proxy integration and select your "CreateCars" Lambda function.

![The image shows the AWS API Gateway console with a resource named "cars" and a GET method integrated with Lambda. A green notification indicates a successful deployment for development.](https://kodekloud.com/kk-media/image/upload/v1752864667/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-cars-lambda-deployment.jpg)

Since POST requests cannot be tested directly in a browser, use tools such as cURL or Postman. Remember to deploy the API after configuring the POST method.

To test, configure your tool to make a POST request using the deployment URL appended with `/cars`. Include a JSON payload in the body, for example:

```
{
  "make": "toyota",
  "model": "camry",
  "color": "red"
}
```

If you receive an error like:

```
{"message": "Missing Authentication Token"}
```

double-check that you are sending the request to the correct endpoint (`/cars`).

Your "CreateCars" Lambda function should parse and process the request body. Here's a sample implementation:

```
// Lambda function: CreateCars
export const handler = async (event) => {
  const response = {
    statusCode: 201,
    body: JSON.stringify({ newCar: JSON.parse(event.body) }),
  };
  return response;
};
```

In API Gateway, ensure that the complete event (including the request body) is passed to Lambda by checking the **Integration Request** settings, enabling proxy integration, and redeploying the API.

After redeploying, send a POST request. You should receive a JSON response confirming the creation of the new car:

Request payload:

```
{
  "make": "toyota",
  "model": "camry",
  "color": "red"
}
```

Response:

```
{
  "newCar": {
    "make": "toyota",
    "model": "camry",
    "color": "red"
  }
}
```

![The image shows an AWS API Gateway interface alongside a Postman application window, where a POST request is being set up with various URLs listed.](https://kodekloud.com/kk-media/image/upload/v1752864668/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-postman-request.jpg)

![The image shows an AWS API Gateway interface where a POST method has been successfully created for a resource named "cars." It includes method execution details and integration with a Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752864669/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-post-cars-lambda.jpg)

---

## Implementing the PATCH Method for Updating Cars

To update a car entry, add a PATCH method under a resource that includes a path parameter. First, under the `/cars` resource, create a sub-resource with the path `/{id}` where `{id}` serves as a placeholder for the car's unique identifier.

![The image shows an AWS API Gateway interface where a user is creating a new resource with the path "/cars" and a placeholder for the resource name. A green banner indicates a successful deployment for "cars."](https://kodekloud.com/kk-media/image/upload/v1752864670/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-new-resource-cars.jpg)

Under the newly created `/{id}` resource, create a PATCH method. Select **PATCH** as the HTTP method and integrate it with your "UpdateCars" Lambda function using Lambda proxy integration.

![The image shows an AWS API Gateway console where a user is selecting an integration type for a PATCH method, with options like Lambda function, HTTP, Mock, AWS service, and VPC link. The Lambda function option is selected, and a dropdown menu displays available Lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752864671/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-patch-integration.jpg)

Your "UpdateCars" Lambda function should parse the request body and return a JSON response with the updated data. Below is an example implementation:

```
// Lambda function: UpdateCars
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const response = {
    statusCode: 200,
    body: JSON.stringify({ updatedCar: body }),
  };
  return response;
};
```

For additional debugging, you might temporarily log or return the full event (including path parameters and headers) as follows:

```
// Debug version of UpdateCars
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const response = {
    statusCode: 200,
    body: JSON.stringify(event),
  };
  return response;
};
```

After validating the event structure, revert to the streamlined version. Redeploy your API once changes are complete.

> [!important]
> **Testing the PATCH Method**
>
> To test the PATCH endpoint, replace `{id}` in your invoke URL (e.g., `/cars/5`) with an actual car ID and send a PATCH request with the updated JSON data.

![The image shows the AWS API Gateway console with details of a "development" stage for an API named "cars," including methods like GET, POST, and PATCH. A green notification indicates a successful deployment.](https://kodekloud.com/kk-media/image/upload/v1752864672/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-cars-development-2.jpg)

Here is the final version of your update handler:

```
// Final version of UpdateCars
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const response = {
    statusCode: 200,
    body: JSON.stringify({ updatedCar: body }),
  };
  return response;
};
```

---

## Setting Up the DELETE Method

Following REST conventions, you can delete a car by specifying its ID. Under the `/{id}` resource (or directly under `/cars` if using query parameters), add a DELETE method and integrate it with the corresponding Lambda function responsible for deletion.

After creating the DELETE method, you can test it by sending a DELETE request with the car's ID. API Gateway will handle the routing and the Lambda function will execute the deletion logic.

![The image shows an AWS console interface for creating a method in API Gateway, with options for method type and integration type, including Lambda function, HTTP, Mock, AWS service, and VPC link.](https://kodekloud.com/kk-media/image/upload/v1752864673/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-API-Gateway-Demo/aws-api-gateway-method-creation.jpg)

If you later decide to remove the API, select the API (e.g., "cars"), click the DELETE button, confirm the action, and the API will be deleted.

---

## Summary

This demo has illustrated how to configure AWS API Gateway to route GET, POST, PATCH, and DELETE requests to various AWS Lambda functions. Each endpoint demonstrates how Lambda functions can simulate back-end operations—such as retrieving car listings, creating a new car entry, updating car details, or deleting a car—without the need for an actual database integration.

For further reading and additional details, consider checking out:

- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a5c60f6-2d46-4dfe-a2e2-66c7eae45a70/lesson/2eb6bc79-b3de-43db-8c16-008ddbeb5f6a)**
>
> Watch video content
