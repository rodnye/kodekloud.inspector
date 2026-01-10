# AWS Compute Lambda Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Compute-Lambda-Demo)

---

## Table of Contents

- AWS Compute Lambda Demo
  - Creating Your Lambda Function
  - Editing the Lambda Function Code
  - Testing Your Lambda Function
  - Configuring an API Gateway Trigger
  - Deploying a Function with Third-Party Dependencies – A Hashing Demo
  - Using Lambda Layers for Dependencies
  - Monitoring Your Lambda Function
  - Conclusion
  - Watch Video
    - Adding Dependencies with Layers (Optional)
    - Using the Event Data in Your Code
    - Bundling the Dependencies

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Compute Lambda Demo

In this article, you'll learn how to create your first AWS Lambda function and explore various configuration options, including triggers, permissions, third-party dependencies, and layers.

---

## Creating Your Lambda Function

To get started, log in to the AWS Management Console, search for the Lambda service, and click on **Create a Function**.

![The image shows the AWS Management Console with a search for "lambda," displaying related services like Lambda, CodeBuild, AWS Signer, and Amazon Inspector.](https://kodekloud.com/kk-media/image/upload/v1752861779/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_10.jpg)

When creating your function, you will see these options:

- **Author from scratch** – Create your Lambda function and code from the ground up.
- **Blueprints** – Use a pre-configured template for common tasks (e.g., triggering an action on an S3 object upload or setting up an API Gateway).
- **Container image** – Deploy your application as a containerized Lambda function.

For this demo, select **Author from scratch**.

Provide a function name (for example, "my first function") and choose the runtime. The runtime specifies the programming language and version (such as .NET, Go, Java, Node.js, Python, or Ruby). In this example, we'll use Node.js.

Configure the architecture and permissions as needed. By default, Lambda creates an execution role with basic permissions to upload logs to CloudWatch Logs. You can choose to use an existing role or customize the policy, but for this demo, simply leave it as "Create a new role with basic Lambda permissions."

> [!important]
> **Advanced Options**
>
> Advanced options like VPC connections are available, but you can ignore them for this simple demonstration.

Finally, click **Create function**.

![The image shows the AWS Lambda console, focusing on permissions and advanced settings for creating a new function, including execution role options and VPC connectivity.](https://kodekloud.com/kk-media/image/upload/v1752861781/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_130.jpg)

After creating the function, you will see its configuration details, including the **Triggers** section, which specifies when your function executes. Triggers can be set up for API Gateway requests, S3 uploads, SNS/SQS messages, Alexa interactions, and more.

![The image shows the AWS Lambda interface for adding a trigger, listing various services like Alexa, API Gateway, and CloudFront as potential sources.](https://kodekloud.com/kk-media/image/upload/v1752861783/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_170.jpg)

---

## Editing the Lambda Function Code

By default, AWS provides a simple handler function. Below is an example of a basic Node.js handler:

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

Each time your function is invoked, the handler receives an `event` object containing the request data (for instance, parameters from an API Gateway request or metadata when a file is uploaded to S3).

### Adding Dependencies with Layers (Optional)

Below the code editor, you'll notice a section for Layers. Layers enable you to incorporate third-party dependencies or custom libraries separately from your main code. This is especially useful when multiple functions share common dependencies.

Additionally, you can configure a **Destination** to send asynchronous invocation records to an SNS topic, SQS queue, or other supported destinations.

![The image shows an AWS Lambda configuration screen for adding a destination, with options for source, condition, and destination type, including SNS topic and SQS queue.](https://kodekloud.com/kk-media/image/upload/v1752861784/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_230.jpg)

Once you scroll down, you will see the basic configuration details for your Lambda function, which for now returns a status code 200 along with a stringified message.

---

## Testing Your Lambda Function

AWS Lambda includes a built-in testing mechanism. Click the **Test** button to open the test event configuration panel. You can create a new event or modify the default JSON event. For example:

```
{
  "key1": "value1",
  "key2": "value2",
  "key3": "value3"
}
```

Assign a name to your test event (such as "test one") and adjust the JSON as needed. This event mimics the data provided during an actual trigger, such as file information if triggered on an S3 upload.

After configuring your test event, click **Test**. The console will display the response and accompanying log data, similar to the following examples:

```
{
  "statusCode": 200,
  "body": "\"my first lambda function\""
}
```

```
START RequestId: 109f761e-0afa-46c0-b036-099bacar7320 Version: $LATEST
END RequestId: 109f761e-0afa-46c0-b036-099bacar7320
REPORT RequestId: 109f761e-0afa-46c0-b036-099bacar7320 Duration: 10.68 ms Billed Duration: 11 ms Memory Size: 128 MB Max Memory Used: 67 MB Init Duration: 228.37 ms
```

### Using the Event Data in Your Code

Adjust your function to extract properties from the incoming event. For example, to process an event property named `products`, update your code as follows:

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

Now, if you use the following test event:

```
{
  "products": "TV"
}
```

The response body will include the product information extracted from the event. Remember to click **Deploy** after editing your code before testing again. The updated logs will reflect your changes.

---

## Configuring an API Gateway Trigger

To simulate a real-world scenario, you can add an API Gateway trigger that invokes your Lambda function via an HTTP request. In the Lambda console, navigate to the **Triggers** section, click **Add trigger**, and select **API Gateway**. Choose **Create a new API** and set the security as required (for this demo, leaving it open is acceptable).

![The image shows an AWS Lambda interface for adding an API Gateway trigger, with options for HTTP or REST API types and security settings.](https://kodekloud.com/kk-media/image/upload/v1752861785/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_550.jpg)

After adding the trigger, the console will display the API endpoint (such as `/first/function`) along with details for supported HTTP methods (GET, POST, etc.). You can click through to the API Gateway page for further details.

![The image shows an AWS Lambda configuration screen with an API Gateway trigger for a function named "firstFunction-API," detailing its HTTP settings and endpoint.](https://kodekloud.com/kk-media/image/upload/v1752861787/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_570.jpg)

To test the integration, copy the API endpoint URL and make a GET request using your browser, curl, Postman, or any HTTP client. A successful request returns a message (e.g., "lambda trigger example") that confirms the function has been invoked correctly.

![The image shows an AWS Lambda console with a function named "firstFunction" configured with an API Gateway trigger, displaying its API endpoint details.](https://kodekloud.com/kk-media/image/upload/v1752861789/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_620.jpg)

---

## Deploying a Function with Third-Party Dependencies – A Hashing Demo

In this section, you'll build a more complex Lambda function that incorporates a third-party library. For this Node.js demo, we'll use [bcrypt.js](https://www.npmjs.com/package/bcryptjs) to hash a password supplied in the event.

First, install the dependency locally by running the following command in your project directory:

```
npm install bcryptjs
```

This command creates a new folder named `node_modules` that includes the required bcrypt.js files.

Below is the complete code for the Lambda function:

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

After pasting the code into the Lambda console, deploy your changes and create a test event as shown below:

```
{
  "password": "123"
}
```

If you encounter an error indicating that the "bcryptjs" package cannot be found, it means your Lambda function hasn't bundled the `node_modules` folder.

### Bundling the Dependencies

To resolve this, bundle your Lambda function code along with the `node_modules` folder. Zip the following:

- Your handler file (e.g., `index.mjs`)
- The `node_modules` folder

Upload the resulting ZIP file using the **Upload from .zip file** option in the Lambda console. Once deployed, you should see the hashed password in the response and function logs reflecting a successful execution.

---

## Using Lambda Layers for Dependencies

Instead of bundling the `node_modules` folder with every function, you can create a Lambda Layer to share common dependencies among multiple functions.

To create a layer for bcrypt.js, follow these steps:

1.  Create a folder named `Node.js`.
2.  Move the `node_modules` folder inside the `Node.js` folder.
3.  Zip the `Node.js` folder and name the archive (for example, `my-hash-layer.zip`).

Upload this ZIP file as a new custom layer in the Lambda Layers section and select the appropriate runtime (e.g., Node.js) when creating the layer.

![The image shows an AWS Lambda console with a successfully created layer named "hash," compatible with Node.js 18.x, and version details displayed.](https://kodekloud.com/kk-media/image/upload/v1752861791/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_1170.jpg)

After creating the layer, return to your Lambda function, scroll to the Layers section, click **Add a layer**, choose **Custom layers**, and select your newly created hash layer (default version). Deploy the changes and retest your function to confirm it loads bcrypt.js from the layer instead of a bundled `node_modules` folder.

![The image shows an AWS Lambda console with a function named "secondFunction" successfully updated, displaying code execution results and logs.](https://kodekloud.com/kk-media/image/upload/v1752861792/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Compute-Lambda-Demo/frame_1220.jpg)

---

## Monitoring Your Lambda Function

Monitoring is an essential part of ensuring your Lambda function performs as expected. In the Lambda console, the **Monitoring** tab offers insights into:

- Number of invocations
- Execution duration (minimum, average, and maximum)
- Error counts and success rates
- Throttling metrics (if applicable)

You can also view detailed CloudWatch logs for each invocation. The logs include information like the request ID, execution duration, billed duration, memory usage, and initialization duration.

Example log entry:

```
@log  0404973171401:/aws/lambda/secondfunction
@logStream  2023/03/09/[LATEST]709f42dab34f9682a151c629fdcbff
@maxMemoryUsed  7.667
@memosize  1.28B
$message  REPORT RequestId: 83cd1959-e437-446c-8880-c266adeae89b Duration: 847.18 ms Billed Duration: 848 ms Memory Size: 128 MB Max Memory Used: 76 MB Init Duration: 244.71 ms
@requestid  83cd1959-e437-446c-8880-c266adeae89b
@timestamp  2023-03-09T03:17:42.400Z
@type  REPORT
```

For a more comprehensive view, open the dedicated CloudWatch page for your Lambda function.

---

## Conclusion

This article demonstrated how to:

- Create and configure an AWS Lambda function from scratch.
- Set up triggers, including API Gateway integration.
- Test your function using custom events.
- Incorporate third-party dependencies by either bundling them or using Lambda Layers.
- Monitor your function through CloudWatch logs and metrics.

By leveraging these techniques, you can efficiently deploy serverless applications without the need to manage the underlying infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/2c1db565-472d-4128-b2c8-fffcbcce01de)**
>
> Watch video content
