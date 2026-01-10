# Lambda Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Lambda-Demo)

---

## Table of Contents

- Lambda Demo
  - Creating a Lambda Function
  - The Default Lambda Function Code
  - Testing the Lambda Function
  - Adding an API Gateway Trigger
  - Incorporating Third-Party Libraries
  - Bundling Dependencies with Your Code
  - Using Lambda Layers
  - Monitoring Your Lambda Function
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# Lambda Demo

In this guide, you'll learn how to create and deploy an AWS Lambda function from scratch using the AWS Management Console. This tutorial covers configuring a Lambda function, testing it with custom events, adding triggers such as an API Gateway, incorporating third-party libraries using Lambda layers, and monitoring performance with CloudWatch.

---

## Creating a Lambda Function

Begin by searching for the Lambda service in the AWS Management Console search bar.

![The image shows the AWS Management Console with a search for "lambda," displaying various AWS services and features related to the search term. The console includes options like Lambda, CodeBuild, AWS Signer, and Amazon Inspector.](https://kodekloud.com/kk-media/image/upload/v1752864960/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-management-console-lambda-search.jpg)

Once in the Lambda service, click **Create a function**. You will then see several options:

- **Author from scratch:** Write code entirely from scratch.
- **Use a blueprint:** Choose from AWS-provided blueprints for common tasks (e.g., processing an S3 upload, configuring an API Gateway trigger, etc.).
- **Container image:** Package your application as a container image if preferred.

For this demo, select **Author from scratch**.

Next, supply a name for your function (e.g., "my-first-function") and choose the runtime. AWS Lambda offers a variety of runtimes such as .NET, Go, Java, Node.js, Python, and Ruby. In this example, we will use Node.js. You may also select the architecture and configure the execution role. By default, Lambda creates a new role with CloudWatch Logs upload permissions. Alternatively, you can use an existing role or create a new one from an AWS policy template.

![The image shows the AWS Lambda "Create function" page, where users can configure a new function with options for runtime, architecture, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752864961/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-create-function-page.jpg)

![The image shows the AWS Lambda console where a user is creating a function using a blueprint. Various blueprints and runtime options are listed for selection.](https://kodekloud.com/kk-media/image/upload/v1752864962/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-function-creation-blueprint.jpg)

![The image shows the AWS Lambda console where a user is creating a new function. It displays options for creating the function using a blueprint, with various templates and runtimes listed.](https://kodekloud.com/kk-media/image/upload/v1752864963/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-console-create-function.jpg)

Leave the optional settings (like VPC configuration) unchecked and click **Create function**.

After creation, you'll see a graphical overview of your function. The interface includes a trigger section that indicates when your function will run. AWS Lambda can be initiated by various sources, including API Gateway, S3, SNS, SQS, Alexa, Apache Kafka, and more.

![The image shows an AWS Lambda console where a function named "firstFunction" has been successfully created. It includes options to add triggers, destinations, and view the function's code source.](https://kodekloud.com/kk-media/image/upload/v1752864964/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-firstfunction-console.jpg)

To review available triggers, click **Add trigger**. You will see a list of potential trigger sources.

![The image shows the AWS Lambda console with the "Add trigger" section open, displaying a list of potential trigger sources such as Alexa, Apache Kafka, and API Gateway.](https://kodekloud.com/kk-media/image/upload/v1752864965/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-add-trigger-console.jpg)

---

## The Default Lambda Function Code

When your Lambda function is created, it comes with a default handler. The basic code is as follows:

```
export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
```

This simple function always returns a status code of 200 along with a message. Such a response is particularly useful when integrating your function with an API Gateway that expects specific response formatting.

---

## Testing the Lambda Function

You can test your Lambda function directly using the built-in test functionality without needing an external trigger. Click the **Test** button to configure a test event. Initially, you will be provided with a sample JSON event similar to this:

```
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

You can customize this test event, for example by renaming it to "test one" and modifying its content to include a product identifier:

```
{
  "products": "TV"
}
```

When you run the test, AWS passes this JSON object as the `event` to your Lambda function. Initially, your function returns a static message. To utilize the event data in your code, update your function as follows:

```
export const handler = async (event) => {
  const products = event.products;
  const response = {
    statusCode: 200,
    body: JSON.stringify({ Product: products }),
  };
  return response;
};
```

After deploying the changes, re-run the test to see the function returning the product data (e.g., `"Product": "TV"`). The log output will display details such as request IDs, duration, memory usage, and more, which are viewable in CloudWatch Logs.

---

## Adding an API Gateway Trigger

To allow external HTTP requests to invoke your function, add an API Gateway trigger:

1.  In the Lambda console, click **Add trigger**.
2.  Select **API Gateway**.
3.  Choose **Create a new API** and configure its settings. For the demo, you can leave the security settings open.
4.  Click **Add**.

An API Gateway is now attached to your function. You can view the API endpoint details in the configuration tab.

![The image shows the AWS Lambda console where a user is configuring an API Gateway trigger. Options for creating a new API or using an existing one, along with API type and security settings, are visible.](https://kodekloud.com/kk-media/image/upload/v1752864966/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-api-gateway-configuration.jpg)

The endpoint URL, including the specific path (e.g., "first function"), will be displayed. Copy this URL and use your browser, curl, or Postman to send a GET request. If properly configured, you will receive a response from your Lambda function (e.g., "lambda trigger example").

![The image shows an AWS Lambda console with a configuration tab open, displaying details of an API Gateway trigger for a function named "firstFunction-API."](https://kodekloud.com/kk-media/image/upload/v1752864967/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-api-gateway-config.jpg)

---

## Incorporating Third-Party Libraries

For more advanced functionality, you may need to use third-party libraries. In this example, we'll integrate the Node.js library bcryptjs to hash a user-supplied password.

On your local development machine, install bcryptjs by running:

```
npm install bcryptjs
```

The console output should resemble:

```
C:\Users\sanje\Documents\scratch\demo\lambda>npm install bcryptjs


added 1 package, and audited 2 packages in 1s
found 0 vulnerabilities
C:\Users\sanje\Documents\scratch\demo\lambda>
```

Notice that a new folder named `node_modules` is created, which contains the bcryptjs code.

Now, modify your Lambda function code to import and utilize bcryptjs:

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

Prepare a test event with a `password` property (for example, `"password": "123"`) and run the test. If you encounter an error like:

```
{
  "errorType": "Error",
  "errorMessage": "Cannot find package 'bcryptjs' imported from /var/task/index.mjs",
  "trace": [
    "Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'bcryptjs' imported from /var/task/index.mjs",
    "... stack trace ..."
  ]
}
```

it indicates that although bcryptjs was installed locally, the `node_modules` folder was not included when deploying your function.

> [!important]
> **Remember:**
>
> To resolve this issue, ensure that you bundle your `node_modules` folder with your Lambda function.

---

## Bundling Dependencies with Your Code

To prevent errors like the package not found error, bundle your code along with all required third-party dependencies. One way to do this is to zip your project directory—including your code file and the `node_modules` folder—and then upload the zip file directly to AWS Lambda. This approach ensures that AWS Lambda has access to bcryptjs and other dependencies.

After uploading the zip file, deploy your changes and run your test again. Your function should now return a successful response with the hashed password.

---

## Using Lambda Layers

An alternative solution for managing dependencies is to use Lambda layers. Layers allow you to package libraries separately and share them across multiple functions.

To create a Lambda layer for bcryptjs:

1.  Prepare the folder structure required by Lambda. For Node.js, create a folder named `Node.js` (or `nodejs` as per the documentation) and move your `node_modules` folder inside it.
2.  Zip the `Node.js` folder. For example, name the zip file `hash-layer.zip`.
3.  In the Lambda console, navigate to **Layers** and click **Create layer**.
4.  Name your layer (e.g., "hash") and upload the zip file.
5.  Select the supported runtime (Node.js) and create the layer.

Next, associate the newly created layer with your Lambda function:

1.  Open your function in the Lambda console.
2.  In the Layers section, click **Add a layer**.
3.  Choose **Custom layers** and select your "hash" layer.
4.  Add the layer and deploy your function.

Your function now loads bcryptjs from the layer instead of bundling it with the function code.

![The image shows an AWS Lambda console where a function named "secondFunction" has been successfully updated. The console displays the code editor, execution results, and function logs.](https://kodekloud.com/kk-media/image/upload/v1752864969/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-secondfunction-update.jpg)

For further details on folder structure and additional instructions, refer to the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).

![The image shows a webpage from the AWS Lambda Developer Guide, detailing how to include library dependencies in a layer for different Lambda runtimes like Node.js, Python, Java, and Ruby. It includes a table with paths for each runtime and an example folder structure for Node.js.](https://kodekloud.com/kk-media/image/upload/v1752864970/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-lambda-library-dependencies-guide.jpg)

After adding the layer, test your function to ensure that bcryptjs is correctly imported and the output meets expectations.

---

## Monitoring Your Lambda Function

AWS Lambda integrates seamlessly with Amazon CloudWatch to monitor your function’s performance. In the Monitoring tab, check metrics such as invocation count, duration, errors, and throttling. For more detailed information, click **View logs in CloudWatch**.

Example log snippet:

```
@log  0404973171401:/aws/lambda/secondfunction
@logStream  2023/03/09/[LATEST]49f42dab34f9682a151629fdcbff
@maxMemoryUsed  76
@memorySize  128
@message  REPORT RequestId: 83cd19c9-e317-446c-8880-c266adeaeb9b Duration: 847.18 ms Billed Duration: 848 ms Memory Used: 128 MB Max Memory Used: 76 MB Init Duration: 244.71 ms
@requestId  83cd19c9-e317-446c-8880-c266adeaeb9b
@timestamp  1678350237422
@type  REPORT
```

For a complete overview, access the full CloudWatch interface.

![The image shows an AWS CloudWatch interface displaying log group details for a Lambda function, including log streams and their timestamps.](https://kodekloud.com/kk-media/image/upload/v1752864971/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Lambda-Demo/aws-cloudwatch-lambda-log-details.jpg)

---

## Conclusion

In this guide, we covered how to create a simple AWS Lambda function, test it using custom event data, and extend its functionality by adding an API Gateway trigger and third-party libraries. We discussed methods for bundling dependencies and using Lambda layers for efficient code management, alongside monitoring performance with CloudWatch logs. With AWS managing the underlying infrastructure, you can focus on designing, implementing, and deploying your serverless applications with ease.

Happy coding with AWS Lambda!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/84f0bbbe-cbcf-4f1d-b5d1-94c0333b5dc2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/86193dfb-ca81-4acc-8fae-fca9402fcf17)**
>
> Practice lab
