# SAM Advanced Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless-Application-Model-SAM/SAM-Advanced-Demo)

---

## Table of Contents

- SAM Advanced Demo
  - Project Initialization
  - Project Structure and Configuration
  - Evolving the Example: Building an API for an E-Commerce Application
  - Testing the API
  - Outputting API Information
  - Cleaning Up
  - Watch Video
  - Practice Lab
    - Create Products Lambda Function
    - Deploying the API

---

## Content

AWS Certified Developer - Associate

Serverless Application Model SAM

# SAM Advanced Demo

In this article, we walk you through an advanced example of using the AWS SAM CLI to build, deploy, and test a serverless application. We will guide you from initializing a new SAM project to deploying a fully functional API integrated with DynamoDB, using multiple Lambda functions.

## Project Initialization

To begin, open your terminal and execute the following command to initialize your SAM project:

```
C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\SAM-Advanced>sam init
```

During initialization, the CLI prompts a series of questions to configure your project. AWS offers several Quick Start templates, such as the simple Hello World example, data processing workflows, serverless APIs, DynamoDB integrations, and machine learning samples. For this demo, choose the simple "Hello World" template.

![The image shows a Visual Studio Code interface with a terminal open, displaying a list of AWS Quick Start application templates to choose from. The templates include options like "Hello World Example," "Data processing," and "Machine Learning."](https://kodekloud.com/kk-media/image/upload/v1752859420/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/vscode-terminal-aws-templates.jpg)

Next, select your desired runtime. Even though Python is typically the default, this example uses Node.js (e.g., Node.js 20). Choose the zip package type and plain JavaScript.

![The image shows a Visual Studio Code interface with a terminal open, displaying options for selecting runtimes, package types, and starter templates for a project setup.](https://kodekloud.com/kk-media/image/upload/v1752859421/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/visual-studio-code-terminal-runtimes.jpg)

The CLI then asks if you want to enable additional features such as X-Ray tracing or CloudWatch monitoring. For simplicity, answer "no" for these options and provide a project name, for example, "SAM API."

After confirmation, SAM creates the project folder structure along with essential files. You might see an output similar to:

```
Commands you can use next
===========================
[*] Create pipeline: cd sam-api && sam pipeline init --bootstrap
[*] Validate SAM template: cd sam-api && sam validate
[*] Test Function in the Cloud: cd sam-api && sam sync --stack-name {stack-name} --watch
```

## Project Structure and Configuration

The generated project includes a `template.yaml` file that defines your SAM configuration. Key sections include a project description, global function settings (like the default function timeout), and resource definitions. Below is an excerpt of the template showcasing the Hello World function:

```
Description: >
  Sample SAM Template for sam-api


Globals:
  Function:
    Timeout: 3


Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function  # More info: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      ...
```

The API event for the Hello World function is defined as shown below:

```
Resources:
  HelloWorldFunction:
    Properties:
      Events:
        Api:
          Type: Api   # More info: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get


Outputs:
  # ServerlessRestApi is an implicit API created out of the Events key under Serverless::Function
```

Other files generated include a `README`, a `.gitignore`, sample tests, and directories for Lambda function code and test events. For instance, here is a Node.js Lambda function snippet:

```
export const lambdaHandler = async (event, context) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
        })
    };
    return response;
};
```

A sample event JSON file for local testing looks like:

```
{
  "requestContext": {
    "accountId": "123456789012",
    "resourceId": "123456",
    "stage": "prod",
    "requestId": "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
    "requestTime": "09/Apr/2015:12:34:56 +0000",
    "requestTimeEpoch": 1428582896000,
    "identity": {
      "sourceIp": "127.0.0.1"
    }
  }
}
```

Similarly, an event simulating an API Gateway POST request is provided below:

```
{
    "body": "{\"message\":\"hello world\"}",
    "resource": "/{proxy+}",
    "path": "/path/to/resource",
    "httpMethod": "POST",
    "isBase64Encoded": false,
    "queryStringParameters": {
        "foo": "bar"
    },
    "pathParameters": {
        "proxy": "/path/to/resource"
    },
    "stageVariables": {
        "baz": "qux"
    }
}
```

Once your application setup is complete, deploy it using:

```
C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\SAM-Advanced>sam deploy
```

## Evolving the Example: Building an API for an E-Commerce Application

In this section, we extend the project to create an API for an e-commerce (or inventory) application. The API will allow users to add new products and retrieve a list of existing products from a DynamoDB table.

Start by cleaning up any unnecessary files (like tests, `.npmignore`, and `package.json`) and reorganize your project structure so that all Lambda functions reside within a dedicated source folder.

Next, add several Lambda functions to the project:

- **Create Products** – Adds a new product to the DynamoDB table.
- **Get All Products** – Retrieves the complete list of products.
- **Get Product by ID** – Retrieves a specific product by its name (used as the primary key).

### Create Products Lambda Function

Below is the Lambda function code snippet for creating products:

```
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);


// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE;


/**
 * A simple example includes an HTTP POST method to add one item to a DynamoDB table.
 */
export const createProductsHandler = async (event) => {
    if (event.httpMethod !== "POST") {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod}`);
    }
    // Add logic to put the item into DynamoDB using ddbDocClient and PutCommand
};
```

The corresponding SAM resource definition in `template.yaml` is provided below:

```
Globals:
  Function:
    Timeout: 3


Resources:
  ProductsTable:
    Type: AWS::Serverless::SimpleTable
    Properties:
      PrimaryKey:
        Name: name
        Type: String


  createProduct:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/create-products.createProductsHandler
      Runtime: nodejs20.x
      Architectures:
        - x86_64
      Environment:
        Variables:
          TABLE: !Ref ProductsTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ProductsTable
      Events:
        Api:
          Type: Api
          Properties:
            Path: /products
            Method: POST
```

> [!important]
> **Note**
>
> The policy template (DynamoDBCrudPolicy) automatically grants the necessary CRUD permissions on the specified DynamoDB table to the Lambda function.

### Deploying the API

After configuring your Lambda function and API event, deploy the stack using the guided deployment command:

```
C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\SAM-Advanced\sam-api>sam deploy --guided
```

Follow the interactive prompts to configure deployment parameters such as stack name, region, and IAM role confirmations. After deployment, CloudFormation creates the DynamoDB table, API Gateway, Lambda functions, and assigns the required permissions.

![The image shows an AWS CloudFormation dashboard displaying details of a stack named "sam-api," including its status as "CREATE_COMPLETE" and various metadata like stack ID and creation time.](https://kodekloud.com/kk-media/image/upload/v1752859422/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/aws-cloudformation-sam-api-dashboard.jpg)

Verify the deployed resources in your AWS Console:

- **DynamoDB:** Check the products table.
- **Lambda:** Confirm the createProduct Lambda function.
- **API Gateway:** Ensure that the API properly triggers your Lambda functions.

![The image shows an AWS Lambda console page displaying details of a function named "aws-sam-HelloWorld-EAYDQV69Ok4P," including options to add triggers and destinations, and a sidebar with a tutorial on creating a simple web app.](https://kodekloud.com/kk-media/image/upload/v1752859424/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/aws-lambda-console-hello-world.jpg)

![The image shows an AWS API Gateway interface with a resource named "/products" and a POST method. The right panel displays resource details and indicates no methods are defined.](https://kodekloud.com/kk-media/image/upload/v1752859425/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/aws-api-gateway-products-post-method.jpg)

![The image shows the AWS API Gateway console, specifically the "Stages" section for an API named "sam-api," displaying details for the "Prod" stage.](https://kodekloud.com/kk-media/image/upload/v1752859426/notes-assets/images/AWS-Certified-Developer-Associate-SAM-Advanced-Demo/aws-api-gateway-stages-sam-api-prod.jpg)

## Testing the API

Use tools like Postman or curl to test your API endpoints. For instance, to create a new product, send a POST request with a JSON payload containing the required "name" field along with additional properties such as price.

Example POST payload for creating a phone:

```
{
  "name": "phone",
  "price": 200
}
```

After adding multiple products (e.g., phone, TV, book), inspect the DynamoDB table to verify the entries.

For the **Get All Products** endpoint, configure a Lambda function in your template as follows:

```
Resources:
  getAllProducts:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/get-all-products.getAllProductsHandler
      Runtime: nodejs20.x
      Architectures:
        - x86_64
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ProductsTable
      Environment:
        Variables:
          TABLE: !Ref ProductsTable
    Events:
      Api:
        Type: Api
        Properties:
          Path: /products
          Method: GET
```

Similarly, set up the **Get Product by ID** endpoint (using the product name as a path parameter) with the following configuration:

```
Resources:
  getProductById:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/get-product-by-id.getProductByIdHandler
      Runtime: nodejs20.x
      Architectures:
        - x86_64
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ProductsTable
      Environment:
        Variables:
          TABLE: !Ref ProductsTable
    Events:
      Api:
        Type: Api
        Properties:
          Path: /products/{name}
          Method: GET
```

Deploy your updated template with:

```
sam deploy
```

Test the endpoints by sending:

- A GET request to `/products` to retrieve all products.
- A GET request to `/products/{name}` (for example, `/products/book`) to retrieve a single product.

Example response for `/products`:

```
[
    {
        "name": "book",
        "price": 25
    },
    {
        "name": "phone",
        "price": 200
    },
    {
        "name": "tv",
        "price": 400
    }
]
```

Example response for `/products/book`:

```
{
  "name": "book",
  "price": 25
}
```

## Outputting API Information

To simplify testing and troubleshooting, add an `Outputs` section to your `template.yaml` to display useful details such as the Lambda ARN and the API URL:

```
Outputs:
  createProductsFunction:
    Description: "ARN of create products function"
    Value: !GetAtt createProduct.Arn


  APIUrl:
    Description: "URL of the API"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod"
```

After running `sam deploy`, you will see output similar to:

```
Outputs
-------------------------------------------------
Key                       Description                           Value
createProductsFunction    ARN of create products function         arn:aws:lambda:us-east-1:841860927337:function:sam-api-createProduct
APIUrl                    URL of the API                          https://<api-id>.execute-api.us-east-1.amazonaws.com/Prod
```

## Cleaning Up

Once testing is complete and you no longer need the deployed resources, clean up by deleting the CloudFormation stack:

```
sam delete
```

This command removes the stack along with all associated resources.

---

This concludes our SAM advanced demo. In this article, we covered how to initialize a SAM project using a Quick Start template, build and configure multiple Lambda functions integrated with DynamoDB and API Gateway, and output essential deployment information for testing. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/66ce1837-7291-4975-bf31-d359170a1fd7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/26824094-9722-4ee8-a5f1-c862a88a2caf/lesson/e2219c21-e9d1-4119-a6c1-e214cf9572ce)**
>
> Practice lab
