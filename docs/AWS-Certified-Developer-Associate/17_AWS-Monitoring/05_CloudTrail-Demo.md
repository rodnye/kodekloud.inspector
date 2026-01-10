# CloudTrail Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Monitoring/CloudTrail-Demo)

---

## Table of Contents

- CloudTrail Demo
  - Viewing Recent Events
  - Creating a CloudTrail Trail
  - Exploring S3 Log Storage
  - Forwarding Logs to CloudWatch
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Monitoring

# CloudTrail Demo

In this lesson, we explore how to work with AWS CloudTrail to monitor and store your AWS account activity. You will learn how to view events from the past 90 days, create a CloudTrail trail for long-term event storage or forwarding to CloudWatch, and examine logs stored in Amazon S3.

## Viewing Recent Events

AWS CloudTrail automatically records events for the past 90 days. You can view these events directly from the event history without the need to create a trail. For instance, when you search for a "CreateUser" event, you'll see detailed information such as the event timestamp, the actor responsible, the source IP address, and the relevant AWS resource.

![The image shows the AWS CloudTrail dashboard, highlighting features for logging AWS account activity and providing options for creating a trail, with sections on how it works, pricing, and getting started.](https://kodekloud.com/kk-media/image/upload/v1752858282/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/aws-cloudtrail-dashboard-logging.jpg)

Clicking on an event (like user creation) will display additional details, including event time, user identity, source IP, and resource affected.

![The image shows an AWS CloudTrail event history page detailing a "CreateUser" event, including information such as event time, user name, source IP address, and resources referenced.](https://kodekloud.com/kk-media/image/upload/v1752858283/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/aws-cloudtrail-createuser-event-history.jpg)

Viewing an event in detail will reveal a JSON view containing key entries such as user identity, event type, and region.

## Creating a CloudTrail Trail

If you require event logs beyond the standard 90-day period, or want to forward events to Amazon S3 or CloudWatch, you can create a CloudTrail trail. Follow these step-by-step instructions:

1.  Click on **Create trail**.
2.  Enter a trail name, for example, "CodeCloud-CloudTrail-demo".
3.  By default, CloudTrail captures events from all regions. Optionally, you can capture events across all accounts in your organization (for this demo, leave this unchecked).

![The image shows an AWS CloudTrail setup page where a user is configuring trail attributes, including trail name, storage location, and encryption settings.](https://kodekloud.com/kk-media/image/upload/v1752858284/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/aws-cloudtrail-setup-configuration.jpg)

4.  Decide if you want to create a new S3 bucket or use an existing one. In this demonstration, a new S3 bucket will be created.
5.  Optionally, enable encryption for your log files. In this example, encryption remains disabled.
6.  Optionally, enable log file validation to verify log integrity—this is not essential for this demo.
7.  You may configure SNS notifications to be alerted when CloudTrail events occur or when log files are delivered. For simplicity, leave SNS notifications disabled.
8.  To forward logs to CloudWatch, enable the **CloudWatch Logs** option. Then choose to create a new log group (default settings can be applied).
9.  Configure a role for CloudTrail to forward logs to CloudWatch by selecting “New” and accepting the default role name (e.g., "CloudTrail CloudWatch role").

Click **Next** to proceed.

On the next screen, specify the types of events you wish to log. By default, management events are selected. While you could also log data or insight events, this demo focuses solely on management events.

![The image shows an AWS CloudTrail configuration page, with options for log file validation, SNS notification delivery, and CloudWatch Logs settings.](https://kodekloud.com/kk-media/image/upload/v1752858289/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/aws-cloudtrail-configuration-settings.jpg)

Finally, you can refine API activity logging by filtering for read or write events, or even excluding specific events (such as those from KMS or the RDS Data API).

![The image shows an AWS CloudTrail setup screen where users can choose log events, including management, data, and insights events, with options for API activity logging.](https://kodekloud.com/kk-media/image/upload/v1752858293/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/aws-cloudtrail-setup-log-events.jpg)

Review your settings and create the trail.

## Exploring S3 Log Storage

After creating the trail, navigate to your designated S3 bucket. CloudTrail provides a link, taking you to a specific path within the bucket where your logs reside. The structure typically appears as follows:

- A folder named "AWS Logs" followed by your account ID (e.g., 841860923737).
- Within the account folder, a "CloudTrail" folder exists.
- Logs are organized by region—in our example, only logs for the "us-east-1" region are available.
- Within the regional folder, logs are further divided by year, month, and day.

![The image shows an Amazon S3 console with a bucket named "AWSLogs" containing a folder labeled "841860923737". The interface displays options for managing objects, such as creating folders and uploading files.](https://kodekloud.com/kk-media/image/upload/v1752858295/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/amazon-s3-console-awslogs-folder.jpg)

Selecting a log file opens it in JSON format. Although the raw JSON might not be visually appealing, you can copy and paste it into a JSON Viewer for a clearer, structured display.

Below is an example of a CloudTrail log file in JSON format:

```
{
  "Records": [
    {
      "eventVersion": "1.08",
      "userIdentity": {
        "type": "Root",
        "principalId": "841860927337",
        "arn": "arn:aws:iam::841860927337:root",
        "accountId": "841860927337",
        "accessKeyId": "ASIA...qGV",
        "sessionContext": {
          "attributes": {
            "creationDate": "2023-10-17T17:24:18Z",
            "mfaAuthenticated": "false"
          }
        }
      },
      "eventTime": "2023-10-17T17:24:18Z",
      "eventSource": "cloudtrail.amazonaws.com",
      "eventName": "AssumeRole",
      "awsRegion": "us-east-1",
      "sourceIPAddress": "173.178.145.188",
      "userAgent": "AWS Internal",
      "requestParameters": {
        "roleArn": "arn:aws:iam::841860927337:role/AssumedRole"
      },
      "responseElements": {
        "credentials": {
          "accessKeyId": "ASIA...qb8E",
          "secretAccessKey": "TqE...uNbx",
          "sessionToken": "FwoGZXIvYXdzE...3B4",
          "expiration": "2023-10-17T18:24:18Z"
        }
      },
      "requestID": "98ca...c8be",
      "eventID": "828...8e0d",
      "readOnly": false,
      "eventType": "AWS API Call via CloudTrail",
      "recipientAccountId": "841860927337",
      "eventCategory": "Management"
    }
  ]
}
```

> [!important]
> **Tip**
>
> For an enhanced viewing experience, copy your JSON output into a JSON Viewer or formatter. This helps in parsing the data for easier analysis.

Consider this additional example from a "CreateRole" event:

```
{
  "eventVersion": "1.08",
  "userIdentity": {
    "type": "Root",
    "principalId": "841860927373",
    "arn": "arn:aws:iam::841860927373:root",
    "accountId": "841860927373",
    "accessKeyId": "ASIAIAIW3J5USLDMR7ZR",
    "sessionContext": {},
    "webIdFederationData": {},
    "attributes": {
      "creationDate": "2023-10-21T17:04:29Z",
      "mfaAuthenticated": "true"
    }
  },
  "eventTime": "2023-10-21T17:13:23Z",
  "eventSource": "iam.amazonaws.com",
  "eventName": "CreateRole",
  "awsRegion": "us-east-1",
  "sourceIPAddress": "173.73.184.248",
  "userAgent": "Coral/Jakarta",
  "requestParameters": {
    "path": "/service-role/",
    "roleName": "Cloudtrail-cloudwatch-role",
    "assumeRolePolicyDocument": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"Service\": \"cloudtrail.amazonaws.com\"\n      },\n      \"Action\": \"sts:AssumeRole\"\n    }\n  ]\n}"
  }
}
```

Storing logs in an S3 bucket ensures your CloudTrail data is preserved even after the 90-day retention period.

## Forwarding Logs to CloudWatch

To enable real-time monitoring and leverage analysis tools, CloudTrail logs can be forwarded to CloudWatch. Navigate to CloudWatch and open the log groups section to locate the log group created by your CloudTrail configuration.

Within the log group, select a log stream to inspect events—these logs will follow the same JSON structure previously shown. Below is a simplified CloudWatch log record example:

```
{
  "eventVersion": "1.08",
  "userIdentity": {
    "type": "Root",
    "principalId": "8418609273737",
    "arn": "arn:aws:iam::8418609273737:root",
    "accountId": "8418609273737",
    "accessKeyId": "ASIAIAM5JUQCKLHKU",
    "sessionContext": {},
    "webIdFederationData": {},
    "attributes": {
      "creationDate": "2023-10-21T17:04:29Z",
      "mfAuthenticated": "true"
    }
  }
}
```

Forwarding logs to CloudWatch allows for real-time event monitoring and deeper analysis.

![The image shows a JSON viewer interface displaying a structured JSON file with nested data elements. The left panel lists the JSON keys and values, while the right panel shows the name and value of selected records.](https://kodekloud.com/kk-media/image/upload/v1752858297/notes-assets/images/AWS-Certified-Developer-Associate-CloudTrail-Demo/json-viewer-interface-structured-data.jpg)

## Conclusion

In this lesson, you learned how to:

- View recent CloudTrail events without creating a trail.
- Set up a CloudTrail trail to store logs in Amazon S3 and forward them to CloudWatch.
- Navigate and analyze JSON log files for comprehensive monitoring of AWS account activity.

> [!important]
> **Final Note**
>
> Using AWS CloudTrail in conjunction with S3 and CloudWatch provides a robust solution for auditing and monitoring your AWS environment. Ensure that you customize log retention and forwarding based on your organization’s security and compliance requirements.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/120498e1-b602-4e0c-afea-2a05f2234bbd/lesson/d2b7c1e4-9e98-4d4e-8231-cd63099cb548)**
>
> Watch video content
