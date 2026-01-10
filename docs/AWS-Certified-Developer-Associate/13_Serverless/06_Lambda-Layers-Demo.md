# Lambda Layers Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Layers-Demo)

---

## Table of Contents

- Lambda Layers Demo
  - Setting Up the Application
  - Writing the Lambda Function Code
  - Deploying and Testing the Application
  - Packaging the Application with Dependencies
  - Introducing Lambda Layers
  - Conclusion
  - Watch Video
    - Preparing the Lambda Layer
    - Creating and Attaching the Layer in AWS Lambda
    - Testing with the Lambda Layer

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Layers Demo

In this lesson, we demonstrate how to use third-party libraries in AWS Lambda functions and create a Lambda layer to share these libraries across multiple functions. We will build a simple demo application where a user provides a password to the Lambda function, which then returns a hashed version of that password.

## Setting Up the Application

When developing a Node.js application, third-party libraries are managed via NPM—similar to how pip works in Python. In this demo, we use the [bcrypt.js](https://www.npmjs.com/package/bcryptjs) library for hashing passwords.

Our project begins with a basic package manifest file (`package.json`):

```
{
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

To add bcrypt.js to your project, navigate to your project folder in the terminal and run:

```
npm install bcryptjs
```

After execution, NPM creates a `node_modules` folder that stores the source code for bcrypt.js along with its dependencies. The terminal output might look like this:

```
C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\lambda\layers>npm install bcryptjs
added 1 package, and audited 2 packages in 566ms
found 0 vulnerabilities
C:\Users\sanje\OneDrive\Documents\courses-sanjeev-desktop\aws-developer-associate\lambda\layers>
```

## Writing the Lambda Function Code

Next, build your Lambda function by importing bcrypt.js, extracting the password from the event object, hashing it, and returning the hashed password in the response. Below is the source code (`index.js`) for the Lambda function:

```
import bcrypt from "bcryptjs";

export const handler = async (event) => {
    const numSaltRounds = 8;
    const password = event.password;
    const hashedPassword = await bcrypt.hash(password, numSaltRounds);
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hashed Password: " + hashedPassword),
    };
    return response;
};
```

## Deploying and Testing the Application

Follow these steps to deploy and test your Lambda function:

1.  Create a new AWS Lambda function (for example, "passwordHash") with the runtime set to Node.js.
2.  Copy and paste the above source code into the Lambda console.
3.  Deploy the changes.
4.  Configure a test event. Make sure to include a `password` property, as shown below:

```
{
  "password": "123"
}
```

When you run the test, you might see an error similar to the following:

```
{
  "errorType": "Error",
  "errorMessage": "Cannot find package 'bcryptjs' imported from /var/task/index.mjs",
  "trace": [
    {
      "Error": "ERR_MODULE_NOT_FOUND: Cannot find package 'bcryptjs' imported from /var/task/index.mjs",
      "at packageResolve": "node:internal/modules/esm/resolve:858:9",
      "at moduleResolve": "node:internal/modules/esm/resolve:915:20",
      "at defaultResolve": "node:internal/modules/esm/resolve:1135:12",
      "at ModuleLoader.defaultResolve": "node:internal/modules/esm/loader:961:12",
      "at ModuleLoader.resolve": "node:internal/modules/esm/loader:365:14",
      "at ModuleLoader.getModuleJob": "node:internal/modules/esm/module:240:83",
      "at ModuleWrap.<anonymous>": "node:internal/modules/esm/module:198:21",
      "at link": "node:internal/modules/esm/module:84:36"
    }
  ]
}
```

> [!important]
> **Note**
>
> This error occurs because the Lambda function does not have access to the `node_modules` folder that contains bcrypt.js.

## Packaging the Application with Dependencies

To ensure that your Lambda function can find the bcrypt.js library, you must include the `node_modules` folder along with your source code in a zip file. Follow these steps:

1.  Open your project folder containing both `index.js` and the `node_modules` folder.
2.  Select both `index.js` and the `node_modules` folder.
3.  Compress these into a zip file (for example, `hash_lambda.zip`).
4.  Upload the zip file to your Lambda function using the "Upload from" option in the Lambda console.
5.  Save the changes.

After deploying, test the function again. You should receive a response similar to:

```
{
  "statusCode": 200,
  "body": "\"Hashed Password: $2a$08$572qij5n5l9C9txulrmmOSoi2/a9/EHKyDjnThkA2bUjEic\""
}
```

## Introducing Lambda Layers

Including the complete `node_modules` folder with every Lambda function can be redundant, especially when multiple functions share the same dependencies. Lambda layers allow you to share common libraries across functions without bundling them repeatedly.

### Preparing the Lambda Layer

1.  Delete the `node_modules` folder from your main source bundle and deploy to confirm that the error reappears.
2.  Create a new folder structure for the layer. For Node.js, the structure must include a folder named `Node.js` containing the `node_modules` folder:
    - Create a folder named `Node.js`.
    - Move your `node_modules` folder into the `Node.js` folder.

    Ensure that your folder structure now includes a `Node.js` folder with the `node_modules` folder inside it.

3.  Compress the `Node.js` folder into a zip file (for example, `hash_layer.zip`).

### Creating and Attaching the Layer in AWS Lambda

1.  Open the AWS Lambda console and navigate to the Layers section.
2.  Click "Add a new layer".
3.  Name your layer (e.g., "bcrypt") and upload the `hash_layer.zip` file.
4.  Select the compatible runtime (e.g., Node.js 20.x) and create the layer.
5.  Attach the layer to your Lambda function via the Layers section in the Lambda console by following the on-screen instructions.

With the layer attached, your Lambda function will reference the bcrypt.js library from the layer instead of needing `node_modules` within its deployment package.

> [!important]
> **Note**
>
> Before attaching the layer, your Lambda function may display errors due to the missing bcrypt.js package.

### Testing with the Lambda Layer

After attaching the layer, test your Lambda function again. The function should now import bcrypt.js from the layer and return a hashed password successfully. A typical successful response might look like:

```
{
  "statusCode": 200,
  "body": "\"Hashed password: $2a$08$UlNbc6aTAUNkC7THD.DhE2XHhAy7dkRUC.CLETKSZghfBfabhUrK\""
}
```

## Conclusion

In this lesson, we learned how to bundle a Node.js application with third-party libraries and deploy it as a Lambda function on AWS. We also explored using Lambda layers to simplify dependency management when multiple Lambda functions share the same external libraries. This approach not only reduces the size of your deployment package but also centralizes common dependencies for easier updates and maintenance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/a6e91699-0fe2-422a-85ae-7fe201a2cfa8)**
>
> Watch video content
