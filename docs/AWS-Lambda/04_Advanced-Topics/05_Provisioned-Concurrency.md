# Provisioned Concurrency - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Provisioned-Concurrency)

---

## Table of Contents

- Provisioned Concurrency
  - Understanding Cold Starts
  - How Provisioned Concurrency Works
  - Steps to Configure Provisioned Concurrency
  - Cost Considerations
  - Summary
  - Links and References
  - Watch Video

---

## Content

AWS Lambda

Advanced Topics

# Provisioned Concurrency

Provisioned Concurrency lets you keep Lambda function instances initialized and ready, eliminating the latency of cold starts. This is ideal for latency-sensitive applications that demand consistent performance.

## Understanding Cold Starts

AWS Lambda scales automatically by initializing new function instances on demand. The first invocation of each new instance—including scale-out events—can take hundreds of milliseconds. Traditional servers, in contrast, run continuously and respond immediately.

## How Provisioned Concurrency Works

With Provisioned Concurrency, AWS keeps a specified number of “warm” instances ready to serve requests. When your function is invoked, these pre-initialized environments handle the traffic in double-digit milliseconds.

## Steps to Configure Provisioned Concurrency

1.  **Select your function**  
    In the Lambda console, pick the function you want to optimize (e.g., **KodeKloudSQSdemo**).  
    ![The image shows an AWS Lambda console with a function named "KodeKloudSQSdemo," which is an Amazon SQS trigger that logs messages in a queue. The function uses Node.js 14.x and was last modified 7 days ago.](https://kodekloud.com/kk-media/image/upload/v1752863096/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/aws-lambda-kodekloudsqs-demo-function.jpg)
2.  **Publish a new version**  
    Under **Versions**, choose **Publish new version** from `$LATEST`.

    > [!important]
    > **Note**
    >
    > Once published, a version’s code and settings are immutable. Use versions to guarantee consistency.

    ![The image shows a dialog box in the AWS Lambda console for publishing a new version from the $LATEST version, with an optional field for a version description and buttons to cancel or publish.](https://kodekloud.com/kk-media/image/upload/v1752863097/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/aws-lambda-publish-version-dialog.jpg)

3.  **Check your new version**  
    After publishing (for example, **Version 5**), review its details and verify you can configure concurrency on that version.  
    ![The image shows an AWS Lambda console screen for a function named "KodeKloudSQSDemo" with version 5. It displays configuration details, including provisioned concurrency settings.](https://kodekloud.com/kk-media/image/upload/v1752863098/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/aws-lambda-kodekloudsqdemo-console.jpg)
4.  **Create an alias**  
    Go to **Aliases**, click **Create alias**, name it (for example, **TestAlias**), and point it at your new version (**5**).  
    ![The image shows an AWS Lambda console screen where a user is creating an alias named "TestAlias" for a function version. The interface includes fields for name, optional description, and version selection, with a "Save" button highlighted.](https://kodekloud.com/kk-media/image/upload/v1752863100/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/aws-lambda-console-create-alias.jpg)
5.  **Enable Provisioned Concurrency**  
    Open **Configuration > Concurrency**, select **Provisioned Concurrency**, choose your alias (e.g., **TestAlias**), and enter the number of pre-warmed instances.

    ```
    console.log('Loading function');

    exports.handler = async (event) => {
      for (const { messageId, body } of event.Records) {
        console.log('SQS message %s: %j', messageId, body);
      }
      return `Successfully processed ${event.Records.length} messages.`;
    };
    ```

    ![The image shows an AWS Lambda console screen for configuring provisioned concurrency, with options to select a qualifier type and set concurrency levels. The cost is displayed as $164.19 per month for 100 units.](https://kodekloud.com/kk-media/image/upload/v1752863101/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/aws-lambda-provisioned-concurrency-console.jpg)

## Cost Considerations

Provisioned Concurrency charges apply for every allocated instance, whether it’s handling requests or idle.

> [!important]
> **Warning**
>
> You incur hourly rates for each provisioned instance plus normal invocation costs. Monitor usage closely to optimize performance versus cost.

![The image illustrates the concept of "Provisioned Concurrency" with an AWS Lambda icon, a dollar sign, and a clock symbol, suggesting cost and time considerations.](https://kodekloud.com/kk-media/image/upload/v1752863103/notes-assets/images/AWS-Lambda-Provisioned-Concurrency/provisioned-concurrency-aws-lambda-cost-time.jpg)

| Pricing Metric       | Description                                   | Example Rate                |
| -------------------- | --------------------------------------------- | --------------------------- |
| Provisioned Instance | Hourly price per pre-warmed Lambda instance   | $0.00001667 per LCUs per hr |
| Invocation Charges   | Standard Lambda invocation pricing            | $0.20 per million requests  |
| Memory Allocation    | Billed based on allocated memory per instance | 128 MB, 256 MB, etc.        |

## Summary

- Cold starts introduce latency in serverless functions.
- Provisioned Concurrency keeps instances warm for consistent performance.
- Publish a version, create an alias, and set your desired concurrency level.
- Remember that provisioned instances incur continuous charges.

## Links and References

- [AWS Lambda Provisioned Concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html)
- [AWS Lambda Aliases](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html)
- [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/59c022a0-7e62-47e2-bd34-bfd26225e1f2)**
>
> Watch video content
