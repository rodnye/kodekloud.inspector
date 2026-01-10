# Exploring the AWS Console - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/Exploring-the-AWS-Console)

---

## Table of Contents

- Exploring the AWS Console
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# Exploring the AWS Console

In this lesson, you'll learn how to navigate the AWS Console—a web-based graphical interface that lets you interact with and manage AWS services with ease. The console provides intuitive menus and widgets to help you create, configure, and monitor resources efficiently.

To get started, visit [aws.amazon.com/console](https://aws.amazon.com/console) and click on "Sign In" to access your account. If you haven’t registered yet, use the registration option on the same page.

![The image shows the AWS sign-in page with options for root user and IAM user login. There's also an advertisement for "SageMaker Fridays" on the right side.](https://kodekloud.com/kk-media/image/upload/v1752858208/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/aws-sign-in-page-root-iam.jpg)

After signing in, you'll arrive at the AWS Console home page. This dashboard provides an overview of your account and quick access to key services. Here are some of the key sections you may notice:

- **Recently Visited Services:** Quickly access the services you use most often.
- **Health Information:** Monitor the overall status and health of your AWS resources.
- **Cost and Usage Estimator:** View your current spend, monthly estimates, and past usage data.

![The image shows the AWS Management Console home page, displaying sections for recently visited services, AWS health, cost and usage, and a welcome section with links to resources. There's an option to add widgets highlighted in red.](https://kodekloud.com/kk-media/image/upload/v1752858209/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/aws-management-console-homepage.jpg)

At the top-right corner of the console, you will see your account name (for example, "main"). By clicking the dropdown menu, you can view detailed account information, including your account ID. This menu also links to several configuration pages, such as billing details, contact information, the billing dashboard, and security credentials.

![The image shows an AWS Billing Management Console screen displaying account details, payment currency preference, and options for alternate contacts and security challenge questions.](https://kodekloud.com/kk-media/image/upload/v1752858211/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/aws-billing-management-console-screen.jpg)

> [!important]
> **Important**
>
> Keep in mind that some settings are account-wide while others are region-specific.

Another essential feature is the region selector dropdown, typically located near the top of the console. While certain global settings are displayed without a specific region (often labeled as "global"), most resource deployments require you to choose a region. For example, if your default region is set to Northern Virginia (US East 1), your EC2 instances and other services will launch there.

![The image shows the AWS EC2 Management Console dashboard, displaying resources, account attributes, and options to launch instances in the US East (N. Virginia) region. It includes sections for service health, scheduled events, and AWS exploration features.](https://kodekloud.com/kk-media/image/upload/v1752858213/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/aws-ec2-management-console-dashboard.jpg)

To deploy resources in another region, such as Europe, simply select the desired region from the dropdown before launching the resource. This ensures that services like EC2 instances are deployed in the intended geographic location.

It’s important to note that some AWS services, like Amazon S3, are inherently global. The S3 console often displays "global" instead of a region-specific label, indicating that the service is not confined to a single region.

![The image shows the Amazon S3 management console with a list of buckets, including one named "kk-access-point" in the US East (N. Virginia) region. A dropdown menu on the right displays various AWS regions.](https://kodekloud.com/kk-media/image/upload/v1752858214/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/amazon-s3-management-console-buckets.jpg)

For service-specific tasks, such as launching a server on Amazon EC2, you can use the search bar on the console home page to quickly locate and select the service. Once selected, the service dashboard will offer tailored configuration options and settings. For example, clicking "Launch Instance" in the EC2 dashboard initiates the instance deployment process.

![The image shows the Amazon EC2 Management Console dashboard, displaying various options and information related to instances, resources, and service health in the Frankfurt region.](https://kodekloud.com/kk-media/image/upload/v1752858215/notes-assets/images/AWS-Certified-Developer-Associate-Exploring-the-AWS-Console/amazon-ec2-management-console-frankfurt.jpg)

In summary, the AWS Console is a robust and user-friendly platform designed to simplify the management of your cloud resources. By familiarizing yourself with the console's layout, checking account configurations, selecting the appropriate regions, and leveraging service-specific dashboards, you can efficiently deploy and manage your applications without relying solely on command-line operations.

Happy exploring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/14f9cf9f-7560-466d-8bc2-fb773bf77a9e)**
>
> Watch video content
