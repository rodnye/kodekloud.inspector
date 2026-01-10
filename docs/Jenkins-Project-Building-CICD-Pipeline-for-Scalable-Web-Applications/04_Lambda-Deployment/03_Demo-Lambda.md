# Demo Lambda - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Lambda-Deployment/Demo-Lambda)

---

## Table of Contents

- Demo Lambda
  - Creating Your Lambda Function
  - Testing Your Lambda Function
  - Viewing Logs in CloudWatch
  - Function Configuration and Permissions
  - Cleaning Up
  - Summary
  - Watch Video
    - Understanding Function Triggers
    - Sample Test Event Templates

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Lambda Deployment

# Demo Lambda

In this article, we will demonstrate how to work with AWS Lambda by creating, testing, and configuring a simple Lambda function. This guide walks you through each step using the AWS Lambda console, ensuring that even beginners can follow along.

## Creating Your Lambda Function

Begin by searching for "Lambda" in the AWS console. Once located, click the **Create Function** button to start building your new Lambda function. You will see several options:

- **Author from scratch**: Provides a basic "Hello World" function.
- **Use a blueprint**: Offers sample code and pre-configurations.
- **Use a container image**: Supports containerized applications.

For our demo, choose **Author from scratch**. Name your function (for example, "demo function") and select your runtime. AWS Lambda supports multiple runtimes (such as Python 3.12, Ruby 3.3, Node.js 16, 18, or 20.x). We will use **Node.js 20.x** in this example and keep the default architecture setting (x86_64).

When setting up permissions, AWS Lambda will automatically create a new role with the necessary permissions. Alternatively, if you have an existing role, you can select that one instead. For this demo, we will create a new role for our function.

![The image shows the AWS Lambda console where a user is creating a new function. It includes fields for function name, runtime, architecture, and permissions settings.](https://kodekloud.com/kk-media/image/upload/v1752879949/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-lambda-console-new-function.jpg)

If desired, you can also create a new role using a policy template. For now, leave all advanced settings as default and click **Create function**.

Once created, selecting the function from the AWS Lambda console displays an overview of its configuration—including the function name ("demo function") and any associated triggers.

![The image shows the AWS Lambda console with a function named "demoFunction." It includes options to add triggers, destinations, and view code, along with details like the function's ARN and last modified time.](https://kodekloud.com/kk-media/image/upload/v1752879950/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-lambda-console-demo-function.jpg)

### Understanding Function Triggers

Triggers instruct AWS Lambda when to run your function. For example, you can configure API Gateway, a load balancer, or other integrations to trigger the function upon receiving a request.

![The image shows an AWS Lambda interface where a user is adding a trigger, with a dropdown menu listing various trigger sources like Alexa, API Gateway, and CloudFront.](https://kodekloud.com/kk-media/image/upload/v1752879951/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-lambda-trigger-interface-dropdown.jpg)

For this demonstration, we will not add triggers or destinations. Instead, scroll down to the **Code** section where you will see a file (typically named `index.js` for Node.js projects) containing your function code.

Below is the sample code for our function:

```
exports.handler = async (event) => {
  // Log the incoming event for debugging purposes
  console.log(event);
  return 'Hello from Lambda!';
};
```

> [!important]
> **Note**
>
> In production scenarios, the event object can provide details like the request body, query parameters, or path parameters—information you might need to handle accordingly.

## Testing Your Lambda Function

AWS Lambda allows you to test your function directly from the console without configuring an actual trigger integration. To test:

1.  Click on the **Test** button.
2.  Create a new test event by providing a name (e.g., "API Gateway test") and selecting an appropriate template.
3.  AWS offers blueprint templates (e.g., for API Gateway requests) that simulate a real event.

### Sample Test Event Templates

Here’s an example of a test event:

```
{
  "body": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.JFjZSOIQSQT8Ne8x2Uw99X5kiQexSzIWW3TXKDghGmA",
  "resource": "/proxy*",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  }
}
```

Another configuration might resemble:

```
{
  "body": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
  "resource": "/{proxy+}",
  "path": "/path/to/resource",
  "httpMethod": "POST",
  "isBase64Encoded": true,
  "queryStringParameters": {
    "foo": "bar"
  }
}
```

After saving the test event, select it from the dropdown menu and click **Test**. The function will execute, returning a response similar to the following:

```
const response = {
  statusCode: 200,
  body: JSON.stringify('Hello from Lambda!'),
};
return response;
```

The expected output should display a status code of 200 and a response message “Hello from Lambda!”. You can also inspect the function logs to view detailed execution information:

```
{
  "statusCode": 200,
  "body": "Hello from Lambda!"
}
```

And sample log entries might look like:

```
START RequestId: c8887250-1fca-418a-afeb-eabd46370461 Version: $LATEST
END RequestId: c8887250-1fca-418a-afeb-eabd46370461 Duration: 11.35 ms Billed Duration: 12 ms Memory Size: 128 MB Max Memory Used: 64 MB Init Duration: 135.03 ms
REPORT RequestId: c8887250-1fca-418a-afeb-eabd46370461
```

If you modify your function to include more detailed event information, be sure to deploy the changes. For instance, updating the function as follows:

```
export const handler = async (event) => {
  // Log the event to gain more insights during testing
  console.log(event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
    event: event,
  };
  return response;
};
```

After redeploying, run the test again. The logs might now display additional details:

```
START RequestId: 431b559c-4e5d-44ea-9c50-37b3ada3a87 Version: $LATEST
INFO    Hey this is my application log message
END RequestId: 431b559c-4e5d-44ea-9c50-37b3ada3a87
REPORT RequestId: 431b559c-4e5d-44ea-9c50-37b3ada3a87 Duration: 21.77 ms Billed Duration: 24 ms Memory Size: 128 MB Max Memory Used: 66 MB Init Duration: 190.14 ms
```

> [!important]
> **Hint**
>
> Any modifications in your code must be deployed; otherwise, the test run will not reflect the latest changes.

## Viewing Logs in CloudWatch

After your Lambda function runs, you can monitor its behavior through CloudWatch Logs, which provide additional diagnostic details such as request IDs and execution durations.

1.  Click on the **view CloudWatch logs** link in your Lambda function interface to navigate to the relevant log group.
2.  Within the log group, select the latest log stream to review detailed logs.

![The image shows the AWS CloudWatch interface displaying a list of log groups, with options to configure settings and manage log retention. The sidebar includes navigation options for logs, metrics, and insights.](https://kodekloud.com/kk-media/image/upload/v1752879952/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-cloudwatch-log-groups-interface.jpg)

![The image shows an AWS CloudWatch interface displaying log group details for a Lambda function named "demoFunction." It includes information such as ARN, creation time, and log streams.](https://kodekloud.com/kk-media/image/upload/v1752879954/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-cloudwatch-lambda-log-details.jpg)

Your log entries may appear as follows:

```
INIT_START Runtime Version: nodejs:20.x v20 Runtime Version ARN: arn:aws:lambda:us-east-1:runtime:...
START RequestId: 58749655-829d-44b1-a81b-170d6e8bd848 Version: $LATEST
END RequestId: 58749655-829d-44b1-a81b-170d6e8bd848
REPORT RequestId: 58749655-829d-44b1-a81b-170d6e8bd848 Duration: 7.45 ms Billed Duration: 8 ms Memory Size: 128 MB Max Memory Used: 64 MB Init Duration: ...
START RequestId: fbe8c084-5d86-43b7-b746-de6e8DEFd9ff Version: $LATEST
REPORT RequestId: fbe8c084-5d86-43b7-b746-de6e8DEFd9ff Duration: 160.68 ms Billed Duration: 161 ms Memory Size: 128 MB Max Memory Used: 65 MB
```

![The image shows an AWS CloudWatch interface displaying log events for a Lambda function, with details such as timestamps, request IDs, and log messages.](https://kodekloud.com/kk-media/image/upload/v1752879955/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-cloudwatch-lambda-logs.jpg)

## Function Configuration and Permissions

Within the **Configuration** section of your Lambda function, you can adjust several settings:

- **Memory Allocation**: Default is 128 MB.
- **Ephemeral Storage**
- **Timeout Duration**: The default is 3 seconds (can be increased up to 15 minutes).
- **Execution Role**: Determines the permissions your function has.

If you need to change the execution role (the IAM role assigned to the function), do so from this configuration page.

![The image shows the AWS Lambda console screen with details about a function named "demoFunction," including its execution role and permissions related to Amazon CloudWatch Logs.](https://kodekloud.com/kk-media/image/upload/v1752879956/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-lambda-console-demo-function-2.jpg)

Adjusting these parameters allows you to better match your application's resource needs. For example, if your Lambda function must interact with other AWS services like S3, update the IAM policy to grant the necessary permissions. Below is an example policy that AWS might automatically create to allow logging to CloudWatch:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:841860927337:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:us-east-1:841860927337:log-group:/aws/lambda/demoFunction:*"
      ]
    }
  ]
}
```

Review the resource summary in the **Configuration** view to see all permissions granted to your function:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:841860927337:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:us-east-1:841860927337:log-group:/aws/lambda/demoFunction:*"
    }
  ]
}
```

> [!important]
> **Security Best Practice**
>
> Ensure that your IAM role only includes the permissions necessary for your Lambda function. This minimizes potential security risks.

## Cleaning Up

After testing and verifying your Lambda function, it’s a good practice to remove any resources you no longer need, preventing unnecessary charges. To delete the Lambda function:

1.  Return to the AWS Lambda console.
2.  Click on **Actions**.
3.  Select **Delete function**.

![The image shows an AWS Lambda console interface displaying details of a function named "demoFunction," including its configuration and execution role settings.](https://kodekloud.com/kk-media/image/upload/v1752879957/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Lambda/aws-lambda-demo-function-interface.jpg)

## Summary

This guide has demonstrated how to create, test, and configure an AWS Lambda function, along with viewing execution logs in CloudWatch and managing permissions. Following these steps makes it simple to develop and deploy Lambda functions for scalable web applications.

For further reading, check out:

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [CloudWatch Logs Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/ddd997d7-0eea-4fa7-8265-5feeb01301e8/lesson/89c70302-3834-4a97-9dbf-78c092364137)**
>
> Watch video content
