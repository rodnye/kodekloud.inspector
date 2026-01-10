# AWS Console Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/AWS-Console-Demo)

---

## Table of Contents

- AWS Console Demo
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# AWS Console Demo

In this lesson, we will explore the AWS Console—a comprehensive web application that provides a graphical interface for interacting with AWS services. The AWS Console simplifies creating and managing resources, allowing you to deploy services with just a few clicks.

When you navigate to [aws.amazon.com/console](https://aws.amazon.com/console), you are presented with the initial AWS Management Console page:

![The image shows the AWS Management Console webpage, featuring options for AWS training, certification, and services like EC2 and Lambda, with a "Log back in" button.](https://kodekloud.com/kk-media/image/upload/v1752861794/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_20.jpg)

Click on “Sign In” to proceed. This page also serves as the registration portal. Since an account already exists in this scenario, simply click “Sign In.”

![The image shows the AWS sign-in page with options for root and IAM user login, and a SageMaker Fridays promotional banner.](https://kodekloud.com/kk-media/image/upload/v1752861795/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_30.jpg)

After entering your login credentials, you are directed to the Console Home Page. This homepage provides a comprehensive overview of your account, including key information and several customizable widgets.

![The image shows the AWS Management Console home screen, displaying recently visited services, AWS Health, cost and usage, and welcome resources.](https://kodekloud.com/kk-media/image/upload/v1752861797/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_50.jpg)

These widgets include:

- **Recently Visited Services:** Quick access to the services you have used.
- **Health Information:** Alerts and updates regarding the status of your AWS services.
- **Cost and Usage Estimator:** Displays of current spending trends, such as:
  - $0 spent so far
  - An estimated $2.94 by month’s end
  - $2.04 spent the previous month

You can easily add or customize these widgets by selecting “Add Widgets” on the home page.

At the top right of the console, your account name is displayed (in this example, "main"). This name is set during the AWS account registration process. Clicking the account dropdown provides additional details including your account ID, links for managing billing information, contact details, security credentials, and other settings.

![The image shows an AWS Billing Management Console screen displaying account details, payment currency preference, alternate contacts, and security challenge questions configuration.](https://kodekloud.com/kk-media/image/upload/v1752861798/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_140.jpg)

Additionally, you can view and manage the regions enabled for your account. A dropdown menu in the top navigation bar displays the current region, which indicates where your resources are deployed. For instance, if “Northern Virginia (US East 1)” is selected, any new resource—such as EC2 instances—will be launched in that designated data center.

> [!important]
> **Important**
>
> Always verify the selected region before launching resources to ensure they are deployed in the correct location.

If you wish to deploy resources in a different geographical location (e.g., Europe), simply select the desired region from the dropdown before proceeding with your deployment.

While reviewing the account settings, you may notice certain AWS services labeled as “global.” This is expected behavior for services like Amazon S3 that are designed to be accessed globally rather than being tied to a specific region.

![The image shows the AWS S3 Management Console with a bucket named "kk-access-point" in the US East (N. Virginia) region, not publicly accessible.](https://kodekloud.com/kk-media/image/upload/v1752861800/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_320.jpg)

If “global” is displayed, rest assured that the service is structured for worldwide access and is not limited to a single region.

Navigating through the AWS Console is straightforward. To deploy a new resource, simply click on the desired service; for example, click on EC2 to launch a virtual machine. Within the EC2 console, click “Launch Instance” to start configuring and deploying your virtual machine. The left-hand side panel offers additional configuration options to further customize your deployment.

![The image shows an AWS EC2 console interface for launching a new instance, with options for selecting an Amazon Machine Image and instance details.](https://kodekloud.com/kk-media/image/upload/v1752861801/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Console-Demo/frame_380.jpg)

The AWS Console offers a user-friendly graphical interface that eliminates the need for command-line interactions. By providing a variety of tools and services via a web user interface, AWS ensures that managing and deploying resources is efficient and accessible.

This concludes our demonstration of the AWS Console. For more detailed information on AWS services and best practices, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **Further Reading**
>
> For an in-depth overview of cloud services and their management, check out our related guides and articles on AWS resource management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/7da16797-b727-4069-8bf3-8fd1a629add4)**
>
> Watch video content
