# Integration Types mapping Templates Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Integration-Types-mapping-Templates-Demo)

---

## Table of Contents

- Integration Types mapping Templates Demo
  - Creating the Task Manager API
  - Creating the "Tasks" Resource and GET Method
  - Adding a Path Parameter for Task Details
  - Enabling Lambda Proxy Integration for Passing Request Data
  - Using Mapping Templates to Access Path Parameters
  - Creating a New Task with POST
  - Working with Query Parameters
  - Summary
  - Watch Video
    - Note on Request Body Passthrough

---

## Content

AWS Certified Developer - Associate

API Gateway

# Integration Types mapping Templates Demo

In this guide, we explore how to leverage AWS API Gateway integrations and mapping templates with Lambda functions. You will learn how to retrieve data from an HTTP request body, work with path and query parameters, and ultimately send data back to the client. The demo uses a simple Task Manager API to simulate CRUD operations on tasks.

---

## Creating the Task Manager API

To begin, create a REST API that will simulate a task management application:

1.  Click **Create API** and select REST API.
2.  Name your API (e.g., "Task Manager").

![The image shows the AWS API Gateway interface for creating a REST API, with options to create a new API, clone an existing one, import an API, or use an example API. The user can enter an API name and description, and select the API endpoint type.](https://kodekloud.com/kk-media/image/upload/v1752857876/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-rest-api-interface.jpg)

This API will host endpoints to create, retrieve, update, and delete tasks.

---

## Creating the "Tasks" Resource and GET Method

Next, create a resource named `/tasks`:

1.  In the API Gateway console, create the new resource `tasks`.

![The image shows the AWS API Gateway console, specifically the "Resources" section for a REST API named "taskmanager," with options to create resources and methods.](https://kodekloud.com/kk-media/image/upload/v1752857878/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-taskmanager-resources.jpg)

Then, add a GET method on the `/tasks` resource to retrieve a list of tasks:

1.  Select the `GET` method and choose the Lambda function integration.
2.  Create a Lambda function named `getTasks` with the following starter code:

    ```
    # Lambda function: getTasks
    def lambda_handler(event, context):
        return {
            "body": "Here is a list of all tasks"
        }
    ```

3.  Deploy the API (e.g., to a stage named `dev`).

![The image shows the AWS API Gateway interface for creating a method, with options for selecting method types and integration types like Lambda function and HTTP.](https://kodekloud.com/kk-media/image/upload/v1752857879/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-method-creation.jpg)

After deployment, copy the invoke URL and test your API client to verify that the GET method returns the expected task list.

---

## Adding a Path Parameter for Task Details

To retrieve detailed information about a specific task, modify your API by adding a dynamic path parameter. The URL will follow the pattern `/tasks/{id}`, where `{id}` is the task identifier.

1.  Under the `/tasks` resource, add a child resource using a dynamic path variable (e.g., `{id}`).
2.  Create a GET method for this resource and integrate it with a new Lambda function called `getTaskDetail`.
3.  Use the following starter code for the Lambda function:

    ```
    // Lambda function: getTaskDetail
    export const handler = async (event, context) => {
        const response = {
            body: "Getting detailed info on task",
        };
        return response;
    };
    ```

Deploy these changes and test the GET method using a sample endpoint (e.g., `/tasks/50`). You should receive a response similar to:

```
{
  "body": "Getting detailed info on task"
}
```

The API Gateway console will show the method execution details, confirming that the path parameter has been received.

![The image shows the AWS API Gateway console, specifically the method execution details for a GET request on a resource path `/tasks/{id}`. It includes sections for method request, integration request, and Lambda integration.](https://kodekloud.com/kk-media/image/upload/v1752857880/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-get-request-details.jpg)

---

## Enabling Lambda Proxy Integration for Passing Request Data

By default, the Lambda function does not receive the path parameter value. To forward the entire request as a structured event that includes path parameters, headers, query parameters, and more, enable Lambda proxy integration:

1.  In the method's Integration Request, set the integration type to **Lambda Proxy Integration**.
2.  Save and deploy the changes.

After testing, you will see that the event object now contains all the details of the HTTP request.

!!! note "Note" Remember that when using proxy integration, the Lambda function must return a properly formatted response. It should include properties such as `statusCode` and `body` (in JSON string format). For example:

```
export const handler = async (event, context) => {
    const body = {
        body: "Getting detailed info on task",
        event: event
    };


    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };
    return response;
};
```

Deploy and test again to verify that the event object includes all necessary information, such as the original URL, path parameters, and headers.

![The image shows an AWS Lambda console with a function named "getTaskDetail" displayed. It includes options for adding triggers, destinations, and viewing code, along with details like the function ARN.](https://kodekloud.com/kk-media/image/upload/v1752857881/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-lambda-gettaskdetail-console.jpg)

---

## Using Mapping Templates to Access Path Parameters

If you prefer not to use full proxy integration, mapping templates allow you to extract only the parameters you need.

1.  In API Gateway, navigate to the Integration Request of the GET method for `/tasks/{id}`.
2.  Under **Mapping Templates**, add a new template for the content type `application/json`.
3.  In the template editor, add the following mapping to forward all input parameters:

    ```
    {
        "myparam": "$input.params()"
    }
    ```

Deploy and test your setup. The Lambda function will now receive an event object with a property `myparam` containing the parameter details.

To isolate the task ID, adjust the template as follows:

```
{
  "taskID": "$input.params('id')"
}
```

After deploying these changes, update your Lambda function code to utilize the passed parameter:

```
export const handler = async (event, context) => {
    const response = {
        body: `Getting detailed info on task id: ${event.taskID}`,
        event: event,
    };
    return response;
};
```

Test with different task IDs (e.g., `/tasks/28` or `/tasks/31`) to verify that the dynamic path parameter is correctly passed. A representative response should look like:

```
{
  "body": "Getting detailed info on task id: 31",
  "event": {
    "taskID": "31"
  }
}
```

---

## Creating a New Task with POST

Now, implement the POST method to create a new task:

1.  Under the `/tasks` resource, add a POST method.
2.  Select AWS Lambda integration and create a new Lambda function called `createTask`.

A simple version of the `createTask` Lambda function might be:

```
export const handler = async (event, context) => {
    const response = {
        body: "Created new task",
    };
    return response;
};
```

Deploy the API and test the POST method using an API client by sending a JSON payload similar to:

```
{
    "task": "clean my room",
    "priority": "critical",
    "status": "completed"
}
```

To verify that the task details are correctly passed to your Lambda function, update the code to log the complete event:

```
export const handler = async (event, context) => {
    const response = {
        body: "Created new task",
        event: event
    };
    return response;
};
```

After deployment, testing should yield a response that includes the HTTP request body within the event object:

```
{
  "body": "Created new task",
  "event": {
    "task": "clean my room",
    "priority": "critical",
    "status": "completed"
  }
}
```

### Note on Request Body Passthrough

!!! note "Note" By default, if no mapping template matches the request content type (usually `application/json`), API Gateway automatically passes the HTTP request body to your Lambda function. To disable this behavior, change the **Request Body Passthrough** setting to "Never" and create your own mapping template. For example, to explicitly pass the entire JSON body, use:

```
{
  "body": "$input.json('$')"
}
```

Deploy your API changes and test to ensure the Lambda function receives the correct request payload.

![The image shows the AWS API Gateway configuration screen where a Lambda function is being set up with options for request body passthrough and execution role details.](https://kodekloud.com/kk-media/image/upload/v1752857882/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-lambda-setup.jpg)

---

## Working with Query Parameters

Lastly, let’s demonstrate handling query string parameters. For the GET tasks endpoint, you might support features such as filtering or sorting via query parameters. For instance, a client might request `/tasks?sort=asc&status=completed` to get a sorted, filtered list of tasks.

By default, the GET method may not forward these parameters unless a mapping template is defined. To capture query parameters, update the Integration Request mapping template as follows:

```
{
  "myparams": "$input.params()",
  "sort": "$input.params('sort')",
  "status": "$input.params('status')"
}
```

Deploy these changes and test the endpoint using a request URL with query parameters. Your Lambda function should now receive an event object with properties for `sort` and `status`. An example response might be:

```
{
  "body": "Here is a list of all tasks",
  "event": {
    "myparams": {
      "path": [],
      "querystring": "sort=asc, status=completed",
      "header": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "14iujr5ak7.execute-api.us-east-1.amazonaws.com",
        "Postman-Token": "2eec9f9b-886f-4543-9b03-9e49f9074180",
        "User-Agent": "PostmanRuntime/7.36.3",
        "X-Amzn-Trace-Id": "Root=1-660a2cac-6840aac7561cdce2725070f",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
      }
    },
    "sort": "asc",
    "status": "completed"
  }
}
```

![The image shows a webpage from the AWS documentation, specifically the Amazon API Gateway Developer Guide. It details the use of `$input` variables in mapping templates, with a table explaining different functions and their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752857884/notes-assets/images/AWS-Certified-Developer-Associate-Integration-Types-mapping-Templates-Demo/aws-api-gateway-input-variables-2.jpg)

---

## Summary

In this guide, we covered:

- How to create a REST API for a Task Manager application using AWS API Gateway.
- Setting up GET methods for both static resources and dynamic path parameters.
- Enabling Lambda Proxy Integration and adjusting your Lambda function response format.
- Using mapping templates to extract path parameters, request bodies, and query parameters.
- Implementing a POST method to create new tasks and forward HTTP request data to your Lambda function.

Each configuration change was followed by deployment and testing, ensuring that your Lambda functions correctly receive the required data.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/758f14fd-8360-44f0-873c-c2afd59e8805)**
>
> Watch video content
