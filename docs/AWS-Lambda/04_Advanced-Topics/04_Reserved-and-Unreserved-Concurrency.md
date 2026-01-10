# Reserved and Unreserved Concurrency - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Reserved-and-Unreserved-Concurrency)

---

## Table of Contents

- Reserved and Unreserved Concurrency
  - What Is Concurrency?
  - Viewing Concurrency Settings
  - Unreserved Concurrency
  - Reserving Concurrency for Critical Functions
  - Unreserved Concurrency Limits
  - Reserved vs Unreserved Concurrency Comparison
  - Summary
  - References
  - Watch Video

---

## Content

AWS Lambda

Advanced Topics

# Reserved and Unreserved Concurrency

Managing concurrency in AWS Lambda ensures that high-priority functions always have the capacity they need. By default, your account’s unreserved concurrency sets a soft limit on total parallel executions. For mission-critical workloads, you can allocate reserved concurrency to specific functions.

## What Is Concurrency?

Concurrency refers to how many Lambda function executions run in parallel. For example, 100 simultaneous invocations count as 100 concurrent executions.

## Viewing Concurrency Settings

To view or modify a function’s concurrency:

1.  Open the AWS Lambda console and select your function.
2.  Click **Configuration**.
3.  In the left navigation pane, choose **Concurrency**.

![The image shows the AWS Lambda console, specifically the "Concurrency" configuration page, where function concurrency settings and provisioned concurrency configurations can be managed.](https://kodekloud.com/kk-media/image/upload/v1752863104/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/aws-lambda-concurrency-configuration-console.jpg)

> [!important]
> **Note**
>
> We use an SQS cold start demo here. Substitute your own function for real-world testing.

## Unreserved Concurrency

Unreserved (account) concurrency is the pool shared by all Lambda functions in an account. AWS sets a default soft limit of **1,000** concurrent executions per region.

- All functions combined cannot exceed this limit.
- To increase it, submit a [support request](https://aws.amazon.com/support).

## Reserving Concurrency for Critical Functions

Reserved concurrency guarantees a minimum number of concurrent executions for a specific function:

1.  In the **Concurrency** page, click **Edit**.
2.  Select **Reserve concurrency**.
3.  Enter the reservation amount (e.g., `300`).
4.  Click **Save**.

![The image shows an AWS Lambda console page for editing concurrency settings, with options to use unreserved account concurrency or reserve concurrency. The "Reserve concurrency" option is selected with a value of 0, and there are "Cancel" and "Save" buttons.](https://kodekloud.com/kk-media/image/upload/v1752863105/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/aws-lambda-concurrency-settings-console.jpg)

> [!important]
> **Warning**
>
> If your function exceeds its reserved concurrency, additional invocations are throttled with `429` errors.

Reserving 300 concurrency reduces the unreserved pool from 1,000 to 700:

![The image illustrates a concept of reserved concurrency, showing a division of 1000 default account concurrency into 700 unreserved and 300 reserved, with 400 invocations depicted.](https://kodekloud.com/kk-media/image/upload/v1752863107/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/reserved-concurrency-illustration-1000-700-300.jpg)

Use reserved concurrency to prevent downstream overload:

![The image illustrates the concept of reserved concurrency in AWS Lambda, showing two scenarios: regulated concurrency and overloaded concurrency, with corresponding icons and labels.](https://kodekloud.com/kk-media/image/upload/v1752863108/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/aws-lambda-reserved-concurrency-diagram.jpg)

> [!important]
> **Note**
>
> There is no additional cost for reserved concurrency.

## Unreserved Concurrency Limits

Your total unreserved concurrency is a per-account limit. In some regions, bursts up to 3,000 concurrent executions may occur temporarily, but sustained usage above the default requires a support request.

![The image illustrates a concept of reserved concurrency, showing a division between 700 unreserved and 300 reserved units, with a label indicating "Free."](https://kodekloud.com/kk-media/image/upload/v1752863109/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/reserved-concurrency-units-illustration.jpg)

![The image shows the text "Reserved Concurrency" with the number "3000" below it, accompanied by labels "In some Regions" and "Limited Time."](https://kodekloud.com/kk-media/image/upload/v1752863110/notes-assets/images/AWS-Lambda-Reserved-and-Unreserved-Concurrency/reserved-concurrency-3000-limited-time.jpg)

## Reserved vs Unreserved Concurrency Comparison

| Concurrency Type     | Definition                                        | Default Limit | Ideal Use Case                         |
| -------------------- | ------------------------------------------------- | ------------- | -------------------------------------- |
| Unreserved (Account) | Shared pool for all Lambda executions             | 1,000         | General workloads                      |
| Reserved (Function)  | Dedicated capacity for a single high-priority job | N/A           | Traffic-sensitive or rate-limited APIs |

## Summary

- **Unreserved concurrency** sets the total pool for all functions.
- **Reserved concurrency** guarantees capacity for critical functions and avoids downstream throttling.
- No extra charge applies to reserved concurrency.

For advanced performance optimization and cold-start reduction, consider combining reserved concurrency with [provisioned concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html).

## References

- [AWS Lambda Concurrency](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Support Center](https://console.aws.amazon.com/support/home)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/17b56478-34b0-4e7a-adb0-5d64bd5e4e59)**
>
> Watch video content
