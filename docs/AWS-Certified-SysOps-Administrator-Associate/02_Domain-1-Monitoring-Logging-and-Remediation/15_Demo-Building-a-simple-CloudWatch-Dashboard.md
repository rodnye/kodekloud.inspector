# Demo Building a simple CloudWatch Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Demo-Building-a-simple-CloudWatch-Dashboard)

---

## Table of Contents

- Demo Building a simple CloudWatch Dashboard
  - Creating the Dashboard
  - Choosing the Data Source
  - Configuring Alarms
  - Adding Widgets to the Dashboard
  - Viewing Logs
  - Final Dashboard Overview
  - Conclusion
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Demo Building a simple CloudWatch Dashboard

Welcome to this lesson on creating a custom AWS CloudWatch dashboard. In this guide, we will walk through the process of designing your own dashboard, adding various widgets, and configuring alarms to monitor your AWS resources effectively.

## Creating the Dashboard

Begin by navigating to the CloudWatch service and clicking on "Dashboards." Here you will see a list of existing dashboards:

![The image shows the AWS CloudWatch dashboard interface, displaying a list of custom dashboards with options to share, delete, or create new dashboards.](https://kodekloud.com/kk-media/image/upload/v1752859874/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-dashboard-interface.jpg)

Click on "Create dashboard" to start building your new dashboard. For this demonstration, we will name the dashboard "KodeKloud demo dashboard":

![The image shows a web interface for creating a new dashboard in AWS CloudWatch, with a dialog box where "KK-demo" is entered as the dashboard name.](https://kodekloud.com/kk-media/image/upload/v1752859875/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-dashboard-kk-demo.jpg)

## Choosing the Data Source

After specifying your dashboard name, you will be presented with several data source options. In addition to CloudWatch, you can link other data sources such as Lambda, Prometheus, and more.

For this demo, we will continue to use CloudWatch as our primary data source:

![The image shows a widget configuration screen in AWS CloudWatch, where users can select data source types and widget types such as line, data table, number, gauge, stacked area, and bar.](https://kodekloud.com/kk-media/image/upload/v1752859876/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-widget-configuration.jpg)

When adding a widget, you have a variety of options. You can choose from eight different widget types for metrics—including line charts, data tables, gauges, bar charts, stacked areas, and pie charts—five options for logs, and one for an alarm status view.

![The image shows an AWS CloudWatch interface for adding a widget, with options to select data source types such as CloudWatch, other content types, or create new data sources. There are buttons for creating a data source and refreshing the list.](https://kodekloud.com/kk-media/image/upload/v1752859877/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-widget-interface.jpg)

## Configuring Alarms

Let's configure an alarm to monitor resource health via an alarm status widget. Although no alarms exist by default, you can easily create one based on a single metric. For instance, if you are monitoring EC2 instances, you might want to trigger an alarm when an instance’s CPU credit balance exceeds a specified threshold—a crucial factor for T-series instances.

![The image shows a configuration screen for adding a widget in AWS CloudWatch, with options to select data source types and configure widget settings for alarms.](https://kodekloud.com/kk-media/image/upload/v1752859879/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-widget-configuration-2.jpg)

Select the CPU credit balance metric that corresponds to your EC2 instance. You can set an alarm threshold to trigger if the CPU credit balance is greater than, for example, five:

![The image shows an AWS CloudWatch interface for creating an alarm, specifically for monitoring the CPUCreditBalance metric of an EC2 instance. It includes a graph and fields for specifying metric details and conditions.](https://kodekloud.com/kk-media/image/upload/v1752859880/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-alarm-cpu-metric.jpg)

![The image shows an AWS CloudWatch configuration screen for setting an alarm condition based on CPU credit balance. It includes options for threshold type, condition settings, and a numeric input for the threshold value.](https://kodekloud.com/kk-media/image/upload/v1752859881/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-alarm-cpu-credits.jpg)

You are not required to add notification actions, Lambda functions, or other advanced configurations for this demonstration. Simply proceed by assigning a name to your alarm (e.g., "Instance alarm for CPU credits"):

![The image shows an AWS CloudWatch interface where a user is adding a name and description for an alarm. The alarm name is "kk-demo-instance" and there are formatting guidelines for the description.](https://kodekloud.com/kk-media/image/upload/v1752859882/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-alarm-kk-demo.jpg)

The alarm utilizes a static threshold. When the defined condition is met—such as CPU utilization exceeding five—the alarm will trigger. For this demo, no follow-up actions are configured.

![The image shows an AWS CloudWatch dashboard displaying a graph of CPU credit balance for an EC2 instance, with conditions set for an alarm when the balance is greater than 5.](https://kodekloud.com/kk-media/image/upload/v1752859883/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-cpu-credit-graph.jpg)

## Adding Widgets to the Dashboard

Return to your demo dashboard to start adding widgets. First, include an alarm status widget and select the alarm you just created to display its status.

![The image shows an AWS CloudWatch Alarms dashboard with one alarm named "kk-demo-instance-cpucredits" in a state of "Insufficient data." The condition is set for CPUCreditBalance to be greater than 5 for one datapoint within 5 minutes.](https://kodekloud.com/kk-media/image/upload/v1752859884/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-alarms-dashboard-kk-demo.jpg)

Next, add another widget for displaying critical metrics. For example, you can use a "Number" widget to illustrate network packets in or out. Note that if no data is available, the widget may appear empty until data starts flowing.

![The image shows an AWS CloudWatch dashboard with an empty graph area and a list of metrics related to CPU and network usage, with no alarms set.](https://kodekloud.com/kk-media/image/upload/v1752859885/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-dashboard-empty-graph.jpg)

You can also add a gauge widget to monitor metrics like the total write time for a specific EBS volume. After configuring the gauge range (e.g., from 1 to 5), you will observe a real-time visualization of this metric. Hovering over the widget provides additional insights, such as write time per hour.

## Viewing Logs

To facilitate log analysis, you can add a logs table widget. In this demonstration, we utilize CloudTrail logs to capture operational events.

Run the following CloudWatch Logs Insights query to list relevant fields, sort the entries by timestamp (in descending order), and limit the output to 10,000 entries:

```
fields @timestamp, @message, @logStream, @log
| sort @timestamp desc
| limit 10000
```

> [!important]
> **Note**
>
> Initially, while the query executes and data is collated, the logs widget may not appear immediately. Once the process completes, the widget will display streaming log entries from your chosen log group.

## Final Dashboard Overview

At this stage, your CloudWatch dashboard aggregates multiple widgets, providing a comprehensive view of your system’s performance:

- Alarm status widget for monitoring CPU credit balance.
- A numeric widget displaying key metrics (e.g., network packets).
- A gauge widget tracking EBS volume write time.
- A logs table widget showcasing CloudTrail events.

These widgets collectively provide deep insights into your resources. Additionally, the dashboard supports customizable time ranges, refresh intervals, a full-screen mode, and options to add variables or additional components.

![The image shows an AWS CloudWatch dashboard named "KK-demo" displaying metrics like NetworkPacketsIn and VolumeTotalWriteTime, along with a log group containing CloudTrail logs.](https://kodekloud.com/kk-media/image/upload/v1752859887/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Building-a-simple-CloudWatch-Dashboard/aws-cloudwatch-kk-demo-dashboard.jpg)

## Conclusion

This simple dashboard demonstration highlights several key aspects:

- Integration of multiple data sources into a unified CloudWatch dashboard.
- A variety of widget types available for displaying metrics, logs, and alarms.
- A practical example of setting up a static alarm for monitoring CPU credits.

> [!important]
> **Tips for Effective Monitoring**
>
> Remember, CloudWatch dashboards allow you to link data from various tools, providing comprehensive insights into your AWS environment. Explore the wide range of widget options to tailor your dashboard to your specific monitoring needs.

We hope this lesson has given you a clear understanding of how to build and customize your CloudWatch dashboards. For further details and advanced configurations, check out the [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/).

Happy monitoring, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/ef2c774d-a375-4da7-84cb-da9d39d38efa)**
>
> Watch video content
