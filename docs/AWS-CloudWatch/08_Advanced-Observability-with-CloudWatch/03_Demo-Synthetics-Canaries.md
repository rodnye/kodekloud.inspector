# Demo Synthetics Canaries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Advanced-Observability-with-CloudWatch/Demo-Synthetics-Canaries)

---

## Table of Contents

- Demo Synthetics Canaries
  - 1. Accessing Synthetic Canaries
  - 2. Configuring the Canary
  - 3. Scheduling Executions
  - 4. Monitoring Canary Metrics
  - 5. Pausing and Stopping a Canary
  - 6. Organizing Canaries into Groups
  - 7. Building a GUI Workflow Canary
  - 8. Deleting a Canary
  - Links and References
  - Watch Video

---

## Content

AWS CloudWatch

Advanced Observability with CloudWatch

# Demo Synthetics Canaries

In this guide, you’ll learn how to create, configure, and manage Synthetic Canaries in AWS CloudWatch Synthetics to continuously monitor your website’s availability and performance.

## 1\. Accessing Synthetic Canaries

1.  Sign in to the AWS Management Console.
2.  Navigate to **CloudWatch** under Services.
3.  In the left pane, select **Synthetics** > **Canaries**.
4.  Click **Create Canary**.

![The image shows an AWS console interface for creating synthetic canaries, with options for different monitoring blueprints like heartbeat monitoring and API canary. There's also a section for configuring the canary builder with a name and endpoint URL.](https://kodekloud.com/kk-media/image/upload/v1752862341/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-console-synthetic-canaries-monitoring.jpg)

CloudWatch provides several built-in blueprints:

| Blueprint Type       | Purpose                        | Example Use Case                      |
| -------------------- | ------------------------------ | ------------------------------------- |
| Heartbeat monitoring | Simple URL availability check  | Verifying your landing page uptime    |
| API canary           | REST API endpoint validation   | Monitoring backend API performance    |
| Visual monitoring    | Browser-based UI element tests | Checking login page elements          |
| Custom script        | Upload your own Node.js script | Complex workflows or multi-step flows |

For this demo, we’ll select the **Heartbeat monitoring** blueprint.

## 2\. Configuring the Canary

1.  Under **Select blueprint**, choose **Heartbeat monitoring**.
2.  Enter **Name**: `KodeKloud-monitoring`.
3.  Provide the **Endpoint URL**, e.g., `https://www.kodekloud.com`.

![The image shows an AWS CloudWatch console screen where a user is setting up a Canary for monitoring, with options to add an endpoint URL and take screenshots.](https://kodekloud.com/kk-media/image/upload/v1752862342/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-canary-setup-monitoring.jpg)

Below the setup, you can review and customize the default script, configure VPC settings, tags, and tracing options.

## 3\. Scheduling Executions

Select a run schedule:

- **Run continuously** (minimum 1-minute interval)
- **Run on schedule** (CRON expression)
- **Run once**

For this tutorial, choose **Run continuously** and set the frequency to **1 minute**.

> [!important]
> **Note**
>
> Running a canary every minute can increase AWS charges. Adjust the interval to balance cost and monitoring needs.

![The image shows an AWS CloudWatch console screen, specifically the Synthetics Canaries section, where a schedule for running a canary is being configured. Options include running continuously, using a CRON expression, or running once, with a frequency setting of every 5 minutes.](https://kodekloud.com/kk-media/image/upload/v1752862344/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-synthetics-canaries-schedule.jpg)

Scroll down and click **Create Canary**. Deployment takes about **5–10 minutes**.

![The image shows an AWS CloudWatch console screen where a user is configuring settings for a synthetic canary, including optional CloudWatch alarms, VPC settings, tags, and active tracing.](https://kodekloud.com/kk-media/image/upload/v1752862345/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-synthetic-canary-settings.jpg)

## 4\. Monitoring Canary Metrics

After the canary is active, return to the **Synthetics** dashboard to view:

- A pie chart of passed vs. failed runs
- Average runtime, status, and success rate

![The image shows an AWS CloudWatch dashboard for Synthetics Canaries, displaying the status of canary tests with a pie chart indicating one passed test and no failures. It also lists details of a specific canary named "kodekloud-monitoring" with a 100% success rate.](https://kodekloud.com/kk-media/image/upload/v1752862346/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-synthetics-canaries-dashboard.jpg)

Click your canary’s name to access the **Runs** view:

- **Steps Executed**: Each scripted step (e.g., open URL)
- **Screenshots**: Page captures at each step
- **Logs**: Console output from the script
- **HAR file**: HTTP archive for detailed analysis
- **Execution info**: Timestamps, duration, runtime environment

![The image shows an AWS CloudWatch dashboard displaying Canary runs with a graph indicating successful and failed checks. The "Steps Executed" section shows one step with a "Passed" status.](https://kodekloud.com/kk-media/image/upload/v1752862347/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-canary-runs-dashboard.jpg)

This insight ensures uptime, measures performance, and validates essential user paths.

## 5\. Pausing and Stopping a Canary

To stop a running canary:

1.  In the **Synthetics** console, select your canary.
2.  Click **Actions** > **Stop**.
3.  Confirm the stop operation.

![The image shows an AWS CloudWatch dashboard for "kodekloud-monitoring," indicating a successful stop of a canary with no issues in the last 24 hours and a 100% success rate in the last 7 days.](https://kodekloud.com/kk-media/image/upload/v1752862349/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-kodekloud-monitoring-dashboard.jpg)

## 6\. Organizing Canaries into Groups

Group related canaries (up to 10 per group) for streamlined management:

1.  Navigate to **Synthetics** > **Canary groups**.
2.  Click **Create group**, specify a name, and add existing canaries.

## 7\. Building a GUI Workflow Canary

For advanced end-to-end testing:

1.  Click **Create Canary**.
2.  Choose a **Visual monitoring** or **Browser-based** blueprint.
3.  Use the **Inline editor** or **Import from S3** for custom Node.js scripts.

![The image shows the AWS CloudWatch console interface for creating a canary, with options to use a blueprint, inline editor, or import from S3, and various blueprint options like heartbeat monitoring and API canary.](https://kodekloud.com/kk-media/image/upload/v1752862350/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-canary-creation-interface.jpg)

A GUI workflow canary can:

- Validate login flows
- Measure form submission times
- Navigate menus and verify element visibility

Automate these tests at regular intervals to detect performance regressions and trigger alerts.

## 8\. Deleting a Canary

When a canary is no longer needed:

1.  Select it in the **Synthetics** console.
2.  Choose **Actions** > **Delete**.
3.  Optionally remove its IAM role.

> [!important]
> **Warning**
>
> If deletion fails, ensure the canary is stopped before retrying.

![The image shows an AWS CloudWatch interface where a canary named "kodekloud-monitoring" has been successfully deleted, along with its associated resources. The interface includes options for managing alarms, logs, metrics, and application monitoring.](https://kodekloud.com/kk-media/image/upload/v1752862352/notes-assets/images/AWS-CloudWatch-Demo-Synthetics-Canaries/aws-cloudwatch-kodekloud-monitoring-deleted.jpg)

Deleting a canary cleans up its CloudWatch alarms, logs, metrics, and IAM resources.

---

## Links and References

- [AWS CloudWatch Synthetics Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics.html)
- [AWS CloudWatch Pricing](https://aws.amazon.com/cloudwatch/pricing/)
- [AWS IAM Roles Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/74326609-21c0-467c-a033-b526c2af16f2/lesson/92bb02a8-1b54-4874-8849-ac9b66881bbd)**
>
> Watch video content
