# Monitoring Demo CloudTrail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-IAM/Configure-AWS-IAM-at-Scale/Monitoring-Demo-CloudTrail)

---

## Table of Contents

- Monitoring Demo CloudTrail
  - 1. Access CloudTrail Event History
  - 2. Filter for TerminateInstances Events
  - 3. Inspect Event Details
  - 4. Summary of Event Record
  - 5. Automate Alerts with EventBridge
  - References
  - Watch Video
    - 3.1 User Identity & Metadata
    - 3.2 Instance State Transition

---

## Content

AWS - IAM

Configure AWS IAM at Scale

# Monitoring Demo CloudTrail

In this walkthrough, you’ll learn how to pinpoint the IAM user who terminated an EC2 instance (ID ends with `1D91`) using AWS CloudTrail’s Event History. This helps you audit critical API calls and enhance security visibility.

## 1\. Access CloudTrail Event History

1.  Sign in to the AWS Management Console and search for **CloudTrail**.
2.  In the left-hand menu, select **Event history**.
3.  Adjust the time range and apply filters as needed to narrow down results.

By default, Event history shows all recorded API calls, such as:

- `CreateBucket`
- `PutBucketEncryption`
- `ConsoleLogin`
- `TerminateInstances`

> [!important]
> **Note**
>
> Ensure your IAM user or role has the `cloudtrail:LookupEvents` permission to view event history.

## 2\. Filter for TerminateInstances Events

1.  In the **Event name** filter, type `TerminateInstances`.
2.  (Optional) Under **Resource name**, enter the instance ID:

    ```
    i-02287a6b78cc71d91
    ```

Now you should see the specific `TerminateInstances` event for the target instance. The summary row displays the IAM user, timestamp, and event name.

## 3\. Inspect Event Details

Click the `TerminateInstances` entry to expand the details pane. You’ll find several sections:

### 3.1 User Identity & Metadata

```
{
  "eventVersion": "1.08",
  "userIdentity": {
    "type": "IAMUser",
    "principalId": "AIDAZZBPMTHEGGK6QLMU",
    "arn": "arn:aws:iam::672261773768:user/John",
    "accountId": "672261773768",
    "accessKeyId": "ASIAZZBPMTHEGOIBHXVW",
    "userName": "John",
    "sessionContext": {
      "attributes": {
        "creationDate": "2023-10-16T17:24:53Z",
        "mfaAuthenticated": "false"
      }
    }
  },
  "eventTime": "2023-10-16T17:25:20Z",
  "eventSource": "ec2.amazonaws.com"
}
```

This indicates:

- IAM user **John** (`principalId`: `AIDAZZBPMTHEGGK6QLMU`)
- Event timestamp: `2023-10-16T17:25:20Z`
- API source: `ec2.amazonaws.com`

### 3.2 Instance State Transition

Scroll down to **Response elements** to view the state change:

```
{
  "responseElements": {
    "requestId": "77104859-e0f6-4465-a836-830c1cb8583e",
    "instancesSet": {
      "items": [
        {
          "instanceId": "i-02287a6b78cc71d91",
          "previousState": {
            "code": 16,
            "name": "running"
          },
          "currentState": {
            "code": 32,
            "name": "shutting-down"
          }
        }
      ]
    }
  }
}
```

| State         | Code | Meaning       |
| ------------- | ---- | ------------- |
| previousState | 16   | Running       |
| currentState  | 32   | Shutting-down |

This confirms the `TerminateInstances` call initiated a shutdown.

## 4\. Summary of Event Record

At the bottom of the details pane, you’ll find additional metadata:

```
{
  "eventID": "0ea6b2d5-51d5-4765-ad83-4db65d506d9c",
  "readOnly": false,
  "eventType": "AwsApiCall",
  "managementEvent": true,
  "recipientAccountId": "672261773768",
  "eventCategory": "Management"
}
```

| Field              | Sample Value                         | Description                            |
| ------------------ | ------------------------------------ | -------------------------------------- |
| eventID            | 0ea6b2d5-51d5-4765-ad83-4db65d506d9c | Unique ID for the CloudTrail event     |
| eventType          | AwsApiCall                           | Type of API call                       |
| managementEvent    | true                                 | Indicates a management-level operation |
| recipientAccountId | 672261773768                         | AWS account where the event occurred   |

From this audit trail, you’ve confirmed that **John** executed the `TerminateInstances` API call, changing the instance from **running** to **shutting-down**.

## 5\. Automate Alerts with EventBridge

Integrate these CloudTrail logs with Amazon EventBridge (formerly CloudWatch Events) to trigger alerts or remediation workflows when critical actions occur:

```
aws events put-rule \
  --name EC2TerminationRule \
  --event-pattern '{
    "source": ["aws.ec2"],
    "detail-type": ["AWS API Call via CloudTrail"],
    "detail": {
      "eventName": ["TerminateInstances"]
    }
  }'
```

Attach a target (e.g., SNS topic, Lambda function) to notify your team or perform automated checks.

## References

- [AWS CloudTrail User Guide](https://docs.aws.amazon.com/cloudtrail/latest/userguide/)
- [Amazon EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/)
- [EC2 TerminateInstances API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_TerminateInstances.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-iam/module/586f5114-fd4d-45e3-88ba-6a691fde129c/lesson/459cb4fc-2717-4d4a-a80b-868b4c11ea21)**
>
> Watch video content
