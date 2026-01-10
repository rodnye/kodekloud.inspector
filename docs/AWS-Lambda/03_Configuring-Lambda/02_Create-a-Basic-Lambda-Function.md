# Create a Basic Lambda Function - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Configuring-Lambda/Create-a-Basic-Lambda-Function)

---

## Table of Contents

- Create a Basic Lambda Function
  - Prerequisites
  - 1. Navigate to the AWS Lambda Console
  - 2. Create a New Function
  - 3. Add and Deploy Your Code
  - 4. Test Your Lambda Function
  - 5. Test the Else Branch
  - 6. Summary of Test Events
  - Next Steps
  - References
  - Watch Video
  - Practice Lab
    - Review CloudWatch Logs

---

## Content

AWS Lambda

Configuring Lambda

# Create a Basic Lambda Function

In this tutorial, you’ll learn how to create, deploy, and test a simple AWS Lambda function written in Python. We’ll cover the entire workflow from the AWS Management Console to verifying your function’s output and logs.

## Prerequisites

- An AWS account with permissions to create Lambda functions
- Basic knowledge of Python

## 1\. Navigate to the AWS Lambda Console

1.  Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2.  In the search bar, type **Lambda** and select **AWS Lambda**.

![The image shows the AWS Management Console with a search for "lamb" displaying services like AWS Lambda, CodeBuild, and AWS Signer.](https://kodekloud.com/kk-media/image/upload/v1752863119/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function/aws-management-console-lambda-services.jpg)

## 2\. Create a New Function

1.  Click **Create function**.
2.  Select **Author from scratch**.
3.  Enter a name, e.g., `MyFirstFunction`.
4.  Choose **Python 3.7** for the runtime.
5.  Under **Permissions**, leave the default to let AWS create a new IAM role with basic Lambda permissions.
6.  Click **Create function**.

![The image shows a screenshot of the AWS Lambda console, where a user is configuring a function with Python 3.7, selecting architecture options, and setting permissions for execution roles.](https://kodekloud.com/kk-media/image/upload/v1752863120/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function/aws-lambda-console-python37-function-config.jpg)

Once provisioning is complete, you’ll see the function’s configuration page:

![The image shows an AWS Lambda console with a function named "myfirstfunction" displayed. The interface includes options for testing, monitoring, configuration, aliases, and versions.](https://kodekloud.com/kk-media/image/upload/v1752863121/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function/aws-lambda-console-myfirstfunction.jpg)

## 3\. Add and Deploy Your Code

Scroll to the **Code source** section, remove the default boilerplate, and paste the following handler:

```
def lambda_handler(event, context):
    name = event.get("name")
    if name == "KodeKloud":
        return "Success"
    else:
        return "No"
```

Click **Deploy** to save your changes.

> [!important]
> **Note**
>
> The function returns a simple string based on the `name` parameter. You can expand this logic to handle more complex business rules.

## 4\. Test Your Lambda Function

1.  Switch to the **Test** tab.
2.  Click **Create new test event**.
3.  Configure the event:
    - **Event name**: `ColdStartTest`
    - **Template**: Hello World
    - **Event JSON**:

      ```
      {
        "name": "KodeKloud"
      }
      ```
4.  Click **Create** and then **Test**.

A successful run will display the output `"Success"` and execution details:

![The image shows an AWS Lambda console with a successful execution result for a test event. It includes options to create or edit a test event and displays JSON formatting options.](https://kodekloud.com/kk-media/image/upload/v1752863122/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function/aws-lambda-console-successful-execution.jpg)

### Review CloudWatch Logs

Under **Monitor**, click **View logs in CloudWatch** to inspect log entries similar to:

```
START RequestId: ... Version: $LATEST
END RequestId: ...
REPORT RequestId: ... Duration: 1.90 ms Billed Duration: 2 ms Memory Size: 128 MB Max Memory Used: 36 MB Init Duration: 137.57 ms
```

## 5\. Test the Else Branch

Create a second test event:

```
{
  "name": "Other"
}
```

- **Event name**: `OtherTest`

Run the test again. The function should return `"No"`.

## 6\. Summary of Test Events

| Event Name    | Input JSON              | Expected Output |
| ------------- | ----------------------- | --------------- |
| ColdStartTest | `{"name": "KodeKloud"}` | "Success"       |
| OtherTest     | `{"name": "Other"}`     | "No"            |

## Next Steps

You’ve successfully created, configured, and tested a Python-based AWS Lambda function. In upcoming lessons, we’ll explore:

- Advanced Lambda configurations
- Integrating event source triggers (S3, SNS, API Gateway)
- Environment variables and layers

## References

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS IAM Roles for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html)
- [Serverless Computing Overview](https://aws.amazon.com/serverless/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/4a747724-4192-4328-b7b6-f0d74947f7b7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/8884cacc-b4fb-4e14-93b1-f85a38adf069)**
>
> Practice lab
