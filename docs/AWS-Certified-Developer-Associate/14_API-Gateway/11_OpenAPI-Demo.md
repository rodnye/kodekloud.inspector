# OpenAPI Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/OpenAPI-Demo)

---

## Table of Contents

- OpenAPI Demo
  - Generating an OpenAPI Specification from an Existing API
  - Importing an OpenAPI Specification into API Gateway
  - Generating an SDK
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# OpenAPI Demo

In this guide, we demonstrate how to integrate OpenAPI with API Gateway. API Gateway offers two key features:

1.  You can generate an OpenAPI specification from an existing API configured in API Gateway.
2.  You can import a pre-existing OpenAPI specification to automatically create a new REST API in API Gateway.

Follow this step-by-step walkthrough to learn how to export, modify, and import API configurations seamlessly.

## Generating an OpenAPI Specification from an Existing API

If you already have an API configured in API Gateway, you can generate an OpenAPI specification from it. Start by navigating to the API's stage (for example, the "dev" stage).

![The image shows an AWS API Gateway console with details of a stage named "dev" for an API called "taskmanager." It includes information about the stage's settings, invoke URL, and logging options.](https://kodekloud.com/kk-media/image/upload/v1752857884/notes-assets/images/AWS-Certified-Developer-Associate-OpenAPI-Demo/aws-api-gateway-dev-taskmanager.jpg)

Next, select the stage actions and choose **Export**. In the export dialog, pick the API specification format you prefer. You can select either Swagger or OpenAPI 3, available in JSON or YAML. Additionally, you can include API Gateway or Postman extensions if needed.

![The image shows an "Export API" dialog box from AWS API Gateway, where options for API specification type, format, and extensions are being selected. The user can choose between Swagger and Open API 3, JSON or YAML format, and different extension options before exporting the API.](https://kodekloud.com/kk-media/image/upload/v1752857886/notes-assets/images/AWS-Certified-Developer-Associate-OpenAPI-Demo/aws-api-gateway-export-dialog.jpg)

After choosing the appropriate options, click **Export API**. The OpenAPI spec file will then be downloaded. When you open this file in a text editor, you might see a structure similar to the snippet below:

```
/application/json:
  schema:
    $ref: "#/components/schemas/Empty"
tasks:
  get:
    responses:
      "200":
        description: "200 response"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Empty"
    security:
      - api_key: []
  post:
    responses:
      "200":
        description: "200 response"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Empty"
```

You can modify the specification as required. For example, to rename the API title to "taskmanager2", update the spec as follows:

```
openapi: "3.0.1"
info:
  title: "taskmanager2"
  version: "2024-04-01T04:00:38Z"
servers:
  - url: "https://l4iujr5ak7.execute-api.us-east-1.amazonaws.com/{basePath}"
variables:
  basePath:
    default: "dev"
paths:
  /tasks/{id}:
    get:
      parameters:
        - name: "id"
          in: "path"
          required: true
          schema:
            type: "string"
      responses:
        "200":
          description: "200 response"
          content:
```

> [!important]
> **Note**
>
> Make sure to save your changes after modifying the OpenAPI specification.

## Importing an OpenAPI Specification into API Gateway

To create a new API in API Gateway using your updated specification, import the OpenAPI file. This feature is particularly useful when you want to convert an existing API from another platform into an API Gateway configuration.

When you import the OpenAPI spec, API Gateway reads the file and automatically creates the API resources and methods. The configuration might resemble the example below:

```
title: "taskmanager2"
version: "2024-04-01T04:00:38Z"
servers:
  - url: "https://14iu9j7s5ak7.execute-api.us-east-1.amazonaws.com/{basePath}"
    variables:
      basePath:
        default: "dev"
paths:
  /tasks/{id}:
    get:
      parameters:
        - name: "id"
          in: "path"
          required: true
          schema:
            type: "string"
      responses:
        "200":
          description: "200 response"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Empty"
```

Click **Create API** to finish the process. Once created, you'll see an API named "taskmanager2" with the specified configuration. Although the import provides the foundational setup, some integrations might require additional manual configuration.

![The image shows an AWS API Gateway interface with a POST method for a "/tasks" resource, indicating an undefined integration warning.](https://kodekloud.com/kk-media/image/upload/v1752857888/notes-assets/images/AWS-Certified-Developer-Associate-OpenAPI-Demo/aws-api-gateway-post-tasks-warning.jpg)

After the import, review and update the configurations to ensure everything is set up correctly.

![The image shows the AWS API Gateway console, displaying the configuration of a REST API named "taskmanager2" with resources and methods like GET and POST under the "/tasks" path.](https://kodekloud.com/kk-media/image/upload/v1752857889/notes-assets/images/AWS-Certified-Developer-Associate-OpenAPI-Demo/aws-api-gateway-taskmanager2-config.jpg)

> [!important]
> **Warning**
>
> Pay close attention to integration settings. Some configurations imported from other platforms might need manual adjustments in API Gateway.

## Generating an SDK

In addition to managing API configurations, API Gateway allows you to generate an SDK for your APIs. To generate an SDK for the API (for example, taskmanager), return to the stages section in API Gateway and follow the instructions to produce an SDK. This SDK helps your clients quickly integrate with your API on their desired platforms.

---

In summary, this guide explained how to:

- Generate an OpenAPI specification from an existing API.
- Modify the specification for your own requirements.
- Import the modified specification to create a new API in API Gateway.
- Optionally generate an SDK for enhanced client integration.

We hope you find this tutorial useful. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/7167538b-0410-4457-92eb-4e5fd6b3381b)**
>
> Watch video content
