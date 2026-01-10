# Elastic Beanstalk Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Elastic-Beanstalk-Demo)

---

## Table of Contents

- Elastic Beanstalk Demo
  - 1. Creating an Application in Elastic Beanstalk
  - 2. Creating a New Environment
  - 3. Uploading Application Code
  - 4. Configuration and Presets
  - 5. Setting Up Service Roles and EC2 Key Pairs
  - 6. Configuring VPC, Subnets, and Database
  - 7. Configuring Security Groups and Auto Scaling
  - 8. Configuring the Load Balancer
  - 9. Monitoring and Deployment Settings
  - 10. Verifying the Deployment
  - 11. Updating the Application
  - Conclusion
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# Elastic Beanstalk Demo

In this guide, we demonstrate how to deploy a simple Node.js application using AWS Elastic Beanstalk. The application is a basic web app that displays the message "Okay, this is Elastic Beanstalk demo." Elastic Beanstalk automates the provisioning and management of your infrastructure, including EC2 instances, load balancers, security groups, auto scaling, and other AWS resources.

Let's walk through the process step-by-step.

## 1\. Creating an Application in Elastic Beanstalk

First, log in to the AWS Management Console and search for "Elastic Beanstalk." Under Applications, click **Create an Application**. Assign a name (e.g., "Node.js app"), optionally add a description and tags, then click **Create**. This will take you to the application dashboard, where you can manage multiple environments, such as development, staging, or production.

## 2\. Creating a New Environment

Click to create a new environment. Since you are deploying a web application rather than a background task, select the **Web Server Environment** option.

- The application name will be pre-populated.
- Name your environment (e.g., "environment-prod" for production).
- Optionally, assign a custom domain or use the auto-generated one.
- Provide a description if needed.
- Select **Node.js** as your platform and choose the appropriate version.

![The image shows an AWS Elastic Beanstalk configuration page where a user is selecting a managed platform for a Node.js application, specifying the platform branch and version.](https://kodekloud.com/kk-media/image/upload/v1752864924/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-nodejs-config.jpg)

## 3\. Uploading Application Code

Under the Application Code section, choose to upload your code. You can either store your code in Amazon S3 or upload it directly from your computer. For this demonstration, click **Choose file**. Note that Elastic Beanstalk requires a ZIP archive containing your application’s source code.

To prepare your deployment package:

- Copy all necessary files.
- Create a ZIP archive (e.g., "EB demo-v1.zip").

Once the ZIP file is ready, select it for upload.

![The image shows a Windows File Explorer window with a folder named "eb-demo" open, displaying various files and folders. A dialog box titled "Archive name and parameters" is open, indicating options for creating an archive file.](https://kodekloud.com/kk-media/image/upload/v1752864925/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/windows-file-explorer-eb-demo-archive.jpg)

## 4\. Configuration and Presets

Proceed through the configuration wizard. Elastic Beanstalk automatically populates many settings from presets. For this demo, choose a high availability deployment using multiple EC2 instances behind a load balancer. Even when using presets, you can adjust the settings later.

Before moving to the next step, assign a version label for your application code (e.g., "1.0.0") and click **Next**.

## 5\. Setting Up Service Roles and EC2 Key Pairs

Elastic Beanstalk requires an IAM service role to perform AWS operations. If you do not have an existing role:

- Select **Create and use new service role** to have one generated automatically.
- Alternatively, choose an existing role if available.

Similarly, assign an EC2 key pair or create a new one if needed.

![The image shows an AWS Elastic Beanstalk configuration screen for setting up service access, including options for selecting IAM roles, EC2 key pairs, and instance profiles. The interface provides options to create or use existing service roles and profiles.](https://kodekloud.com/kk-media/image/upload/v1752864927/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-configuration-screen.jpg)

## 6\. Configuring VPC, Subnets, and Database

Choose the Virtual Private Cloud (VPC) and subnets for your deployment:

- Use two private subnets for EC2 instances (which don’t require direct public access).
- Deploy the load balancer on two public subnets.

Optionally, you can enable an associated database, though this demo leaves that option disabled. Additional tags can be added if required, and default settings for attached storage volumes are retained.

![The image shows an AWS Elastic Beanstalk console screen where instance settings and subnets are being configured, including options for public IP addresses and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752864928/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-instance-settings.jpg)

![The image shows an AWS configuration page for setting up instance traffic and scaling options, including root volume settings and CloudWatch monitoring.](https://kodekloud.com/kk-media/image/upload/v1752864929/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-instance-traffic-scaling-setup.jpg)

## 7\. Configuring Security Groups and Auto Scaling

Next, configure the security measures and scaling preferences:

- Select the security group provided by your VPC.
- Configure the auto scaling group by setting:
  - The minimum number of instances (e.g., one instance).
  - The maximum number of instances (e.g., four instances) based on anticipated load.

The demo uses on-demand EC2 instances with default architectural settings, instance types, and the Amazon Linux AMI.

![The image shows an AWS Elastic Beanstalk configuration screen, focusing on EC2 security groups and auto-scaling group settings, including environment type and instance limits.](https://kodekloud.com/kk-media/image/upload/v1752864930/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-ec2-settings.jpg)

## 8\. Configuring the Load Balancer

Configure your load balancer to ensure proper distribution of incoming traffic:

- Deploy it on public subnets.
- Choose the **Application Load Balancer** type with a dedicated load balancer.
- Update the listener settings:
  - The load balancer listens on port 80 by default.
  - Since the Node.js application listens on port 3000, modify the listener configuration to forward HTTP traffic accordingly.

![The image shows an AWS console interface for configuring a load balancer, with options for selecting subnets and load balancer types. It includes settings for application, classic, and network load balancers, as well as dedicated or shared configurations.](https://kodekloud.com/kk-media/image/upload/v1752864931/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-load-balancer-configuration-console.jpg)

![The image shows an AWS Elastic Beanstalk configuration page for setting up a load balancer, with options for selecting the load balancer type and configuring listeners.](https://kodekloud.com/kk-media/image/upload/v1752864932/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-load-balancer-config.jpg)

## 9\. Monitoring and Deployment Settings

Head to the monitoring section and adjust settings based on your requirements:

- Customize options for health reporting, CloudWatch custom metrics, and managed updates if needed.
- For this demo, the default configuration is retained, and managed updates are disabled.
- Configure email notifications and set deployment policies, such as choosing a rolling update to minimize user impact during code deployment.

![The image shows a configuration page from the AWS Elastic Beanstalk console, specifically for setting up updates, monitoring, and logging options. It includes settings for health reporting, CloudWatch custom metrics, and health monitoring rule customization.](https://kodekloud.com/kk-media/image/upload/v1752864933/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-configuration-settings.jpg)

![The image shows a section of the AWS Elastic Beanstalk console, specifically the settings for email notifications and rolling updates and deployments. It includes options for deployment policy and configuration updates.](https://kodekloud.com/kk-media/image/upload/v1752864934/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-email-settings.jpg)

Review your configurations, and once you’re satisfied, submit the settings. Elastic Beanstalk will provision the environment and deploy your application, a process that may take a few minutes.

![The image shows an AWS Elastic Beanstalk review page for configuring a Node.js application environment. It includes details about the environment, service access, and other setup steps.](https://kodekloud.com/kk-media/image/upload/v1752864936/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-nodejs-setup.jpg)

## 10\. Verifying the Deployment

After the environment shows a successful deployment, click the provided domain name to access your application. You should see that version 1.0.0 of your application is running.

![The image shows an AWS Elastic Beanstalk dashboard for a Node.js application environment, indicating a successful launch with a green health status and platform details. It also displays recent event logs related to the environment's deployment and status updates.](https://kodekloud.com/kk-media/image/upload/v1752864937/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-nodejs-dashboard.jpg)

For further verification, navigate to the EC2 console:

- Under Instances, locate the running Node.js app environment instance (e.g., "Nodejs-app-env-prod").
- The load balancer and its forwarding rules, along with target groups, are also visible in the console.

![The image shows an AWS EC2 console with a list of instances, where one instance named "Nodejs-app-env-prod" is running, and others are terminated. The details of the running instance are displayed below.](https://kodekloud.com/kk-media/image/upload/v1752864938/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-ec2-console-nodejs-instance.jpg)

![The image shows an AWS EC2 console interface displaying details of a load balancer, including its name, state, VPC ID, availability zones, and basic configuration.](https://kodekloud.com/kk-media/image/upload/v1752864940/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-ec2-load-balancer-details.jpg)

![The image shows an AWS EC2 console interface displaying details of a target group configuration, including protocol, port, and VPC information. The sidebar lists various AWS services and features.](https://kodekloud.com/kk-media/image/upload/v1752864941/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-ec2-target-group-configuration.jpg)

## 11\. Updating the Application

Once your application is running, updates and new releases are straightforward. Suppose you add new features or bug fixes that require redeployment.

Follow these steps to update your application:

1.  Navigate back to the Elastic Beanstalk environment dashboard.
2.  Click **Upload and Deploy** to load the new version of your code.
3.  Create a new version label (e.g., "1.0.1") for the updated code.

Below is an excerpt from the updated HTML code and corresponding console output:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
</head>
<body>
    <h1>Elastic BeanStalk demo v2</h1>
</body>
</html>
```

```
Run `npm audit` for details.
C:\Users\sanje\Documents\scratch\eb-demo
> node index.js
Server is running on port 3000
^C
C:\Users\sanje\Documents\scratch\eb-demo
> node index.js
Server is running on port 3000
```

After confirming the changes locally, create a new ZIP archive (e.g., "EB demo-v2.zip") that includes all updated source files. Upload this new package, assign it the version label "1.0.1," and choose your deployment policy. The default rolling update method minimizes downtime by gradually updating instances.

![The image shows an AWS Elastic Beanstalk interface for uploading and deploying an application. It includes options for selecting a file, setting a version label, and choosing deployment preferences.](https://kodekloud.com/kk-media/image/upload/v1752864942/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-deployment-interface.jpg)

Click **Deploy** and wait a few minutes for the update to complete. Once finished, verify the running version on the dashboard to ensure that version "1.0.1" of your application is active.

![The image shows an AWS Elastic Beanstalk dashboard for a Node.js application environment. It indicates a successful deployment with a green health status and details about the platform and running version.](https://kodekloud.com/kk-media/image/upload/v1752864944/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Elastic-Beanstalk-Demo/aws-elastic-beanstalk-nodejs-dashboard-2.jpg)

## Conclusion

In this tutorial, we demonstrated how to deploy and update a simple Node.js application using AWS Elastic Beanstalk. We covered essential steps, including:

- Creating an application and environment.
- Uploading and packaging application code.
- Configuring key resources such as EC2 instances, load balancers, security groups, and auto scaling.
- Updating the application with new code revisions.

This process automates infrastructure management and provides a scalable and reliable environment for deploying web applications.

> [!important]
> **Note**
>
> Elastic Beanstalk simplifies the deployment process, making it ideal for developers who want to focus on coding rather than managing servers.

We hope you find this guide informative and helpful. For further details, read the official [AWS Elastic Beanstalk Documentation](https://aws.amazon.com/elasticbeanstalk/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/5f54f435-5ebe-4549-980c-db50c7236122)**
>
> Watch video content
