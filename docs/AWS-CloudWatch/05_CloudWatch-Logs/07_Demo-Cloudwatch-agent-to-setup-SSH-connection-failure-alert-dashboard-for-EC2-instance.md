# Demo Cloudwatch agent to setup SSH connection failure alert dashboard for EC2 instance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/CloudWatch-Logs/Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance)

---

## Table of Contents

- Demo Cloudwatch agent to setup SSH connection failure alert dashboard for EC2 instance
  - Table of Contents
  - Prerequisites
  - 1. Update IAM Role
  - 2. Launch an EC2 Instance
  - 3. Verify Instance Status
  - 4. Inspect Audit Logs on EC2
  - 5. Install the CloudWatch Agent
  - 6. Configure Log Collection
  - 7. Create the CloudWatch Log Group
  - 8. Start and Validate the CloudWatch Agent
  - 9. View Logs in CloudWatch
  - Next Steps
  - References
  - Watch Video
  - Practice Lab

---

## Content

AWS CloudWatch

CloudWatch Logs

# Demo Cloudwatch agent to setup SSH connection failure alert dashboard for EC2 instance

In this guide, you’ll learn how to install and configure the AWS CloudWatch Agent on an EC2 instance to collect SSH login and audit logs, stream them to CloudWatch Logs, and verify them in the console. Once streaming is in place, you can create metric filters, alarms, and dashboards to monitor SSH connection failures and other security events.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Update IAM Role](#update-iam-role)
3.  [Launch an EC2 Instance](#launch-an-ec2-instance)
4.  [Verify Instance Status](#verify-instance-status)
5.  [Inspect Audit Logs on EC2](#inspect-audit-logs-on-ec2)
6.  [Install the CloudWatch Agent](#install-the-cloudwatch-agent)
7.  [Configure Log Collection](#configure-log-collection)
8.  [Create the CloudWatch Log Group](#create-the-cloudwatch-log-group)
9.  [Start and Validate the CloudWatch Agent](#start-and-validate-the-cloudwatch-agent)
10. [View Logs in CloudWatch](#view-logs-in-cloudwatch)
11. [Next Steps](#next-steps)
12. [References](#references)

## Prerequisites

- An existing IAM role (e.g., `metrics-filter`) with console access.
- An AWS account with permissions to manage EC2, IAM, and CloudWatch.
- A security group that allows SSH (port 22).

---

## 1\. Update IAM Role

Attach the **CloudWatchAgentServerPolicy** to your IAM role to grant permission for log streaming and metrics.

| IAM Role       | Attached Policies                                                             |
| -------------- | ----------------------------------------------------------------------------- |
| metrics-filter | \\- cloudwatch\\\_logs\\\_ec2\\\_iam\\\_role<br>- CloudWatchAgentServerPolicy |

Steps:

1.  Open the IAM console and choose **Roles**.
2.  Select `metrics-filter`, then **Add permissions → Attach policies**.
3.  Search for and attach **CloudWatchAgentServerPolicy**.

![The image shows an AWS Identity and Access Management (IAM) console screen for a role named "metrics-filter," displaying its summary and permissions policies. Two policies are attached: "cloudwatch_logs_ec2_iam_role" and "CloudWatchAgentServerPolicy."](https://kodekloud.com/kk-media/image/upload/v1752862434/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-iam-console-metrics-filter-policies.jpg)

---

## 2\. Launch an EC2 Instance

1.  In the EC2 console, click **Instances** → **Launch instances**.
2.  Select an **Amazon Linux** AMI and an appropriate instance type.
3.  > [!important]
    > **Warning**
    >
    > For demonstration only: you may proceed without a key pair. **Do not** skip key pair selection in production.
4.  Under **Network settings**, choose your security group (allow SSH).
5.  Expand **Advanced details** and assign the updated IAM role (`metrics-filter`).
6.  Click **Launch instance**.

![The image shows an AWS EC2 console interface for launching an instance, with options for selecting an Amazon Machine Image (AMI) and instance type. The summary section on the right provides details about the selected configuration.](https://kodekloud.com/kk-media/image/upload/v1752862436/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-ec2-launch-instance-console.jpg)

![The image shows an AWS EC2 instance configuration page, where options for security groups, storage, and instance details are being set up before launching an instance.](https://kodekloud.com/kk-media/image/upload/v1752862437/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-ec2-instance-configuration-page.jpg)

---

## 3\. Verify Instance Status

Wait for your instance to enter the **running** state and pass status checks.

![The image shows an AWS EC2 management console with one instance listed, named "cloudwatch-agent," which is in a pending state. The console displays various details such as instance ID, type, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752862438/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-ec2-console-cloudwatch-agent-pending.jpg)

---

## 4\. Inspect Audit Logs on EC2

SSH into the instance, switch to root, and explore the audit logs:

```
ssh ec2-user@<instance-ip>
sudo su -
cd /var/log
ls -l
tail -100f audit/audit.log
```

You should see entries for SSH logins, sudo commands, and other audit events.

---

## 5\. Install the CloudWatch Agent

Download and install the agent package:

```
cd ~
wget https://s3.amazonaws.com/amazoncloudwatch-agent/linux/amd64/latest/AmazonCloudWatchAgent.zip
unzip AmazonCloudWatchAgent.zip
sudo ./install.sh
```

This process creates the `cwagent` user and group.

---

## 6\. Configure Log Collection

Create `cloudwatch-agent-config.json` in your home directory:

```
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/audit/audit.log",
            "log_group_name": "login-monitoring",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```

> [!important]
> **Note**
>
> You can add multiple `collect_list` entries to capture additional log files such as `/var/log/secure` or application logs.

---

## 7\. Create the CloudWatch Log Group

1.  Open the CloudWatch console and go to **Logs → Log groups**.
2.  Click **Create log group**, name it `login-monitoring`, and configure retention as needed.

![The image shows an AWS CloudWatch interface displaying details of a log group named "login-monitoring," including its ARN, creation time, and retention settings. The interface also shows options for configuring anomaly detection and managing log streams.](https://kodekloud.com/kk-media/image/upload/v1752862440/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-cloudwatch-login-monitoring-log-group.jpg)

_No manual log streams needed: the agent creates one per EC2 instance._

---

## 8\. Start and Validate the CloudWatch Agent

Fetch the configuration and launch the agent:

```
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config -m ec2 \
  -cf file:cloudwatch-agent-config.json -s
```

Check status:

```
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status
```

Expected output:

```
{
  "status": "running",
  "starttime": "2023-11-30T02:41:10+00:00",
  "configstatus": "configured",
  "version": "1.30001.0b313"
}
```

Inspect agent logs:

```
ls -l /var/log/amazon-cloudwatch-agent
ls -l /opt/aws/amazon-cloudwatch-agent/logs
tail -f /opt/aws/amazon-cloudwatch-agent/logs/amazon-cloudwatch-agent.log
```

---

## 9\. View Logs in CloudWatch

Back in the CloudWatch console, navigate to **Logs → Log groups → login-monitoring** and refresh. You’ll see one log stream per instance.

![The image shows an AWS CloudWatch console displaying details of a log group named "login-monitoring," including log streams and configuration options.](https://kodekloud.com/kk-media/image/upload/v1752862442/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-cloudwatch-login-monitoring-console.jpg)

Click your instance’s log stream to inspect log events:

![The image shows an AWS CloudWatch log events page displaying a list of log entries with timestamps and messages. The interface includes options for filtering and managing the logs.](https://kodekloud.com/kk-media/image/upload/v1752862443/notes-assets/images/AWS-CloudWatch-Demo-Cloudwatch-agent-to-setup-SSH-connection-failure-alert-dashboard-for-EC2-instance/aws-cloudwatch-log-events-page.jpg)

---

## Next Steps

- Create **metric filters** to detect failed SSH attempts:

  ```
  aws logs put-metric-filter \
    --log-group-name login-monitoring \
    --filter-name SSHFailFilter \
    --filter-pattern "{ $.message = *Failed password* }" \
    --metric-transformations \
      metricName=SSHFailCount,metricNamespace=Security,metricValue=1
  ```

- Set up **CloudWatch Alarms** on `SSHFailCount`.
- Build a **dashboard** to visualize login attempts and failures.

---

## References

- [AWS CloudWatch Logs Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/9fa50074-5184-4ea1-a0fb-233788bf9666/lesson/068a4a78-4b95-47b5-a14e-77640b68d503)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/9fa50074-5184-4ea1-a0fb-233788bf9666/lesson/43494889-a2db-4595-b1bd-107f2ebe0c37)**
>
> Practice lab
