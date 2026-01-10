# Demo Tracking Access with CloudTrail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Demo-Tracking-Access-with-CloudTrail)

---

## Table of Contents

- Demo Tracking Access with CloudTrail
  - Viewing Trails and Event History
  - Sample CloudTrail JSON Record
  - Searching Events in CloudTrail
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Demo Tracking Access with CloudTrail

Welcome to this detailed walkthrough on accessing and monitoring AWS CloudTrail once it is enabled. In this guide, Michael Forrester demonstrates how to navigate the CloudTrail interface, review trails, and analyze event history for enhanced auditing of your AWS account activities.

CloudTrail is an essential API tracking and auditing service that automatically logs events, making it easier to track changes and monitor access to your AWS resources. When you sign in, you'll see a variety of options such as Insights, CloudTrail Lake, event data stores, and trails. In this lesson, we will focus on reviewing the trails and the event history.

## Viewing Trails and Event History

Upon accessing the CloudTrail dashboard, the first thing you will notice is the set of trails configured in your account. For example, a trail titled "KML trail logs" may be present. The event history panel displays a chronological list of recorded events. Navigating to the subsequent pages may reveal recent modifications, such as changes to a network prefix list. Although networking events are typically associated with EC2 APIs, CloudTrail logs these changes along with other events for a comprehensive audit trail.

When you click on a specific event, detailed information is presented, including:

- Event time
- Username (e.g., "Michael Forrester")
- Source IP address
- Access key used during the event
- AWS region where the event occurred
- Whether the event was classified as a read or write operation

The image below illustrates a typical AWS CloudTrail event history page, showcasing a "ModifyManagedPrefixList" event that includes key details like event time, user name, AWS region, and source IP address.

![The image shows an AWS CloudTrail event history page detailing a "ModifyManagedPrefixList" event, including information such as event time, user name, AWS region, and source IP address.](https://kodekloud.com/kk-media/image/upload/v1752859935/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Tracking-Access-with-CloudTrail/aws-cloudtrail-modify-managed-prefix-list.jpg)

> [!important]
> **Event Details Overview**
>
> Reviewing the event details confirms any modifications made — such as a change to the network prefix list. The log indicates a successful update, the use of SSL/TLS settings, and the activation of multi-factor authentication (MFA).

## Sample CloudTrail JSON Record

Below is an example JSON record from CloudTrail. This record highlights the critical information obtained when an event, such as modifying a managed prefix list, occurs:

```
{
  "eventVersion": "1.10",
  "userIdentity": {
    "type": "IAMUser",
    "principalId": "AIDAWWS70AVDGB2WHQLM",
    "arn": "arn:aws:iam::598274344262:user/michael",
    "accountId": "598274344262",
    "accessKeyId": "ASIAVWS70AVDBKBNLJNR",
    "userName": "michael",
    "sessionContext": {
      "attributes": {
        "creationDate": "2024-10-09T21:51:53Z",
        "mfaAuthenticated": "true"
      }
    }
  },
  "eventTime": "2024-10-09T21:57:00Z",
  "eventSource": "ec2.amazonaws.com",
  "eventName": "ModifyManagedPrefixList",
  "awsRegion": "us-west-2",
  "sourceIPAddress": "71.131.87.246",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  "requestParameters": {
    "ModifyManagedPrefixListRequest": {
      "AddEntry": {
        "Description": "My IP Range",
        "cidr": "71.131.0.0/16",
        "tag": "1"
      },
      "PrefixListId": "pl-0c3516b0e5630bf3e"
    }
  }
}
```

## Searching Events in CloudTrail

Returning to the event history view enables you to search for specific events efficiently. You can filter the logs by access key, event ID, or username (for example, events initiated by Michael Forrester). This search functionality is especially useful when you need to quickly pinpoint changes in your account activity.

> [!important]
> **Pro Tip**
>
> Utilize CloudTrail's search filters to narrow down event logs. Filtering by specific criteria ensures you can swiftly investigate any modifications or accesses made within your AWS environment.

## Conclusion

This article demonstrates how AWS CloudTrail provides a detailed logging mechanism, making it an excellent resource for auditing and monitoring your AWS account activities. Whether you review the event history via the AWS Management Console or use command-line tools for similar insights, CloudTrail helps ensure that every change is thoroughly documented and auditable.

For more detailed information on AWS CloudTrail and related security practices, consider exploring the following resources:

- [AWS CloudTrail Documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)
- [AWS Security Blog](https://aws.amazon.com/blogs/security/)

By mastering CloudTrail, you strengthen your ability to maintain a secure and compliant AWS environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/7860b00c-2c34-4067-8cac-26ab9e997efe)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/901f6c2d-10e9-4b85-a2db-c1deac339cbb)**
>
> Practice lab
