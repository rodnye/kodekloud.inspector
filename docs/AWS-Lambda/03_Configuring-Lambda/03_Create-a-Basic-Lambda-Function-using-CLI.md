# Create a Basic Lambda Function using CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Configuring-Lambda/Create-a-Basic-Lambda-Function-using-CLI)

---

## Table of Contents

- Create a Basic Lambda Function using CLI
  - Environment Setup
  - 1. Write the Lambda Function
  - 2. Package Your Code
  - 3. Create an IAM Execution Role
  - 4. Deploy the Function with AWS CLI
  - 5. Verify Deployment
  - 6. Test Your Lambda Function
  - Summary of AWS CLI Commands
  - References
  - Watch Video
  - Practice Lab

---

## Content

AWS Lambda

Configuring Lambda

# Create a Basic Lambda Function using CLI

Building serverless applications with AWS Lambda becomes seamless when you automate deployments using the AWS Command Line Interface (CLI). In this tutorial, you’ll learn how to write, package, deploy, and test a simple Python-based Lambda function from start to finish.

## Environment Setup

Before we dive in, ensure you have the following:

- AWS CLI installed and configured
- Python 3.x installed on your local machine
- An IDE or text editor (e.g., Visual Studio Code)
- AWS account with permissions to create IAM roles and Lambda functions

> [!important]
> **Note**
>
> Run `aws configure` to set up your credentials, default region (e.g., `us-east-1`), and output format (`json`).

![The image is a slide titled "Create Basic Function Demo" showing an environment setup with AWS CLI, Visual Studio Code (or equivalent), and AWS Console.](https://kodekloud.com/kk-media/image/upload/v1752863111/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/create-basic-function-demo-aws-cli.jpg)

To begin, verify there are no existing Lambda functions in your target region:

![The image shows the AWS Lambda dashboard for the US East (N. Virginia) region, displaying metrics such as Lambda functions, code storage, and account concurrency, along with graphs for error count, throttles, and invocations.](https://kodekloud.com/kk-media/image/upload/v1752863112/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/aws-lambda-dashboard-us-east-metrics.jpg)

---

## 1\. Write the Lambda Function

Create a file named `basic_hello_world.py` and add:

```
def lambda_handler(event, context):
    if event.get("name") == "KodeKloud":
        return "Successful"
    return "Failed"
```

This handler inspects the `name` key in the incoming event and returns `"Successful"` when it matches `"KodeKloud"`.

---

## 2\. Package Your Code

AWS Lambda requires your function code in a ZIP archive. On Windows:

1.  Right-click `basic_hello_world.py`
2.  Select **Send to → Compressed (zipped) folder**
3.  Name it `basic_hello_world.zip`

![The image shows a Windows File Explorer window with a Python source file named "basichelloworld" and an "Archive name and parameters" dialog box for creating a ZIP archive.](https://kodekloud.com/kk-media/image/upload/v1752863114/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/windows-file-explorer-python-zip-archive.jpg)

---

## 3\. Create an IAM Execution Role

Your function needs permission to write logs to CloudWatch. In the IAM console:

- Create or select a role (e.g., **LambdaDemoRole**)
- Attach the **AWSLambdaBasicExecutionRole** policy
- Copy the Role ARN for use in the CLI

![The image shows the AWS Identity and Access Management (IAM) console, specifically the details of a role named "LambdaDemoRole," which allows Lambda functions to call AWS services. It includes information like the creation date, last activity, ARN, and permissions policies.](https://kodekloud.com/kk-media/image/upload/v1752863115/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/aws-iam-console-lambdademorole-details.jpg)

> [!important]
> **Warning**
>
> Keep your IAM credentials secure. Grant only the permissions your function requires.

---

## 4\. Deploy the Function with AWS CLI

Use the `create-function` command to deploy:

```
aws lambda create-function \
  --function-name basic_hello_world \
  --runtime python3.7 \
  --role arn:aws:iam::610879136425:role/LambdaDemoRole \
  --handler basic_hello_world.lambda_handler \
  --zip-file fileb://basic_hello_world.zip
```

On success, you’ll see a JSON payload with details like function name, runtime, role, and handler.

---

## 5\. Verify Deployment

Refresh the AWS Lambda console in the **us-east-1** region. Your function should appear in the list:

![The image shows the AWS Lambda console with a list of functions, including one named "basichelloworld" using Python 3.7. The interface includes options to create a new function and manage existing ones.](https://kodekloud.com/kk-media/image/upload/v1752863116/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/aws-lambda-console-basichelloworld-functions.jpg)

---

## 6\. Test Your Lambda Function

1.  Click **Test** in the function’s detail page.
2.  Create a new event named **Demo Test Event**.
3.  Replace the sample JSON with:

    ```
    {
      "name": "KodeKloud"
    }
    ```

![The image shows an AWS Lambda console interface where a test event is being configured. It includes options for creating a new event, setting the event name, and choosing event sharing settings.](https://kodekloud.com/kk-media/image/upload/v1752863118/notes-assets/images/AWS-Lambda-Create-a-Basic-Lambda-Function-using-CLI/aws-lambda-console-test-event-configuration.jpg)

4.  Save and run. The execution result should return:

    ```
    Successful
    ```

---

## Summary of AWS CLI Commands

| Step                          | Command                             | Description                                |
| ----------------------------- | ----------------------------------- | ------------------------------------------ |
| Configure AWS CLI             | `aws configure`                     | Set credentials, region, and output format |
| Create Lambda function        | `aws lambda create-function …`      | Deploy code as a new Lambda function       |
| Update function code (future) | `aws lambda update-function-code …` | Replace function ZIP with new code         |

---

Congratulations! You now have a working Python Lambda function entirely managed through the AWS CLI.

## References

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/55f2fb20-b644-4f18-b5a0-7ba48ecde7cd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-lambda/module/8fef3e34-137a-46d4-8dec-61fb5bae4e0e/lesson/404681fd-0109-4088-a44b-2edc38e7b9cc)**
>
> Practice lab
