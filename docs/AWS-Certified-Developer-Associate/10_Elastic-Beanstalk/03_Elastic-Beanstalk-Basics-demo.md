# Elastic Beanstalk Basics demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Beanstalk/Elastic-Beanstalk-Basics-demo)

---

## Table of Contents

- Elastic Beanstalk Basics demo
  - Deploying a Production Environment
  - Reviewing AWS Resources
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Elastic Beanstalk

# Elastic Beanstalk Basics demo

In this guide, we demonstrate how to set up an AWS Elastic Beanstalk application, including the creation of multiple environments for development and production. With Elastic Beanstalk, you can deploy your web application seamlessly while AWS manages the underlying infrastructure.

![The image shows the Amazon Elastic Beanstalk web page, highlighting its features for end-to-end web application management, with options to get started and information on pricing and benefits.](https://kodekloud.com/kk-media/image/upload/v1752858852/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/amazon-elastic-beanstalk-features.jpg)

Begin by selecting **Create Application**. This launches a wizard that not only creates your application but also provisions your first environment. Remember that an application represents your code base and can host multiple isolated environments—for example, development, staging, and production.

![The image shows the AWS Elastic Beanstalk "Configure environment" page, where users can select the environment tier, and input application and environment information.](https://kodekloud.com/kk-media/image/upload/v1752858853/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-configure-environment.jpg)

Depending on your project, choose the appropriate environment tier:

- For web applications, APIs, or web servers, select the **web server environment**.
- For long-running tasks, background processes, or scheduled jobs, select the **worker environment**.

Since this demo focuses on a web application, select the **web server environment**. Next, assign a name to your application (for example, "My Web App"). Optionally, you can add tags, though they are not required for this demonstration.

![The image shows an AWS Elastic Beanstalk configuration screen where a user is entering application and environment information for a web application deployment.](https://kodekloud.com/kk-media/image/upload/v1752858855/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-configuration-screen.jpg)

When you create your application, you also create your first environment. An environment is a single deployment of your application. For instance, you could have separate environments for development, staging, and production. In this demo, we create a development environment named "My Web App-Dev". You can either use an auto-generated domain name or specify one manually. Then, choose the platform suitable for your application. For this demonstration, we have selected a Node.js application.

![The image shows an AWS Elastic Beanstalk configuration screen where a user is selecting a platform for their environment, with options like .NET, Docker, and Python.](https://kodekloud.com/kk-media/image/upload/v1752858856/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-platform-selection.jpg)

You have three methods to deploy your code:

1.  Use a built-in sample application provided by AWS.
2.  Upload an existing application version.
3.  Manually upload your code.

For this demo, we walk through uploading your own Node.js code. AWS provides a sample application for Node.js which you can use as a starting point. To get the sample code, visit the Elastic Beanstalk documentation under Tutorials and Samples, download the Node.js zip file, and extract it.

> [!important]
> **Sample Code Overview**
>
> Below is a snippet of the sample Node.js code. This basic web server reads an HTML file and logs POST requests.

```
const port = process.env.PORT || 3000,
  http = require('http'),
  fs = require('fs'),
  html = fs.readFileSync('index.html');


const log = function(entry) {
  fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};


const server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    let body = '';


    req.on('data', function(chunk) {
      body += chunk;
    });


    req.on('end', function() {
      if (req.url === '/') {
        log('Received a message.');
      } else if (req.url === '/scheduled') {
        // Scheduled tasks can be handled here.
      }
    });
  }
});
```

Compress all the application files into a single zip file (e.g., "version1.zip"). Then, return to Elastic Beanstalk and choose **Upload Your Code**. Provide an appropriate label (for example, "version 1") and upload your zip file from your local computer.

![The image shows an AWS Elastic Beanstalk configuration screen where a user is uploading application code via a public S3 URL and selecting configuration presets.](https://kodekloud.com/kk-media/image/upload/v1752858857/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-upload-s3.jpg)

After uploading, Elastic Beanstalk offers configuration presets that simplify the deployment process:

- **Single Instance:** Deploys your application on a single EC2 instance (free-tier eligible) using spot instances.
- **High Availability:** Deploys the application on multiple EC2 instances behind a load balancer.
- **High Availability with Spot/On-Demand:** Deploys with a mix of spot and on-demand instances.
- **Custom Configuration:** Offers manual configuration of all settings.

For this demo, select the **Single Instance** option and click **Next**.

At this point, you need to configure IAM roles so that Elastic Beanstalk can handle operations on your behalf. This includes creating a service role for Elastic Beanstalk and designating an EC2 instance profile. New users should select "Create and use a new service role." If a service role already exists that suits your requirements, you can select it instead. Then, choose an EC2 key pair and create or select an existing instance profile.

![The image shows an AWS Elastic Beanstalk configuration page for setting up service access, including options for selecting service roles and EC2 key pairs.](https://kodekloud.com/kk-media/image/upload/v1752858858/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-configuration-page.jpg)

To establish a new EC2 instance profile with the required permissions:

1.  Open the IAM console and create a new role for AWS Service.
2.  Choose **EC2** as the trusted entity.
3.  Attach these policies:
    - AWS Elastic Beanstalk Web Tier
    - AWS Elastic Beanstalk Worker Tier
    - AWS Elastic Beanstalk Multicontainer Docker

![The image shows an AWS IAM console screen where various AWS Elastic Beanstalk policies are listed, with some policies selected for attachment to a new role.](https://kodekloud.com/kk-media/image/upload/v1752858859/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-iam-console-elastic-beanstalk-policies.jpg)

Assign a name to the role (for example, "EC2-BeanstalkRole") and complete the role creation process. Refresh the Elastic Beanstalk configuration page to select the new instance profile.

![The image shows an AWS IAM console screen where permissions policies are being added to a role, with options to add tags and a button to create the role.](https://kodekloud.com/kk-media/image/upload/v1752858860/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-iam-console-role-permissions.jpg)

Once all settings are configured, click **Next**. Although you can customize network and other settings in the next section, for this demo select **Skip to Review** and then click **Submit** to deploy the environment.

> [!important]
> **Role Name Conflict**
>
> If you receive an error indicating that a role with the same name already exists, provide a new unique name and try again.

During deployment, Elastic Beanstalk provisions your environment. You can monitor progress via the **Events** tab, which logs actions such as the creation of security groups, Elastic IPs, and EC2 instances. An S3 bucket is also used to store environment information. After a few minutes, the environment health will change to "OK".

![The image shows an AWS Elastic Beanstalk dashboard with a successfully launched environment named "my-webapp-dev," which is running on Node.js 20.](https://kodekloud.com/kk-media/image/upload/v1752858861/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-my-webapp-dev-nodejs.jpg)

Click on the environment name to access detailed information about events and resource configurations. This dashboard provides insights about instance health, deployment events, and log summaries, thereby verifying that your application is functioning as expected.

Elastic Beanstalk uses AWS CloudFormation to manage resources. In the CloudFormation console, you will find a stack corresponding to your environment (for example, "mywebapp-dev"). Reviewing the CloudFormation events and resources confirms that elements such as auto-scaling groups, launch configurations, security groups, and Elastic IPs are in place.

![The image shows an AWS CloudFormation console with a list of stacks, their statuses, creation times, and descriptions. The statuses include "CREATE_COMPLETE," "UPDATE_COMPLETE," and "CREATE_FAILED."](https://kodekloud.com/kk-media/image/upload/v1752858862/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-cloudformation-stacks-statuses.jpg)

The Elastic Beanstalk dashboard also provides health metrics for your environment, including CPU utilization and network traffic. Links to CloudWatch alarms and logs offer deeper insights into the application’s performance.

![The image shows an AWS Elastic Beanstalk monitoring dashboard with service metrics such as environment health, CPU utilization, and network data. The environment has been successfully launched.](https://kodekloud.com/kk-media/image/upload/v1752858864/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-dashboard-metrics.jpg)

To test your application, click the domain link under the environment details. This will open your application in a new tab, displaying the AWS sample HTML page rendered via Node.js.

At this stage, the development environment is live. Next, we move on to deploying a production environment, showcasing Elastic Beanstalk’s capability to manage multiple environments within a single application.

---

## Deploying a Production Environment

Return to your application ("My Web App") and click **Create New Environment**. Name this environment "mywebapp-prod" and select the Node.js platform. You can reuse the previously uploaded version ("version 1").

![The image shows an AWS Elastic Beanstalk configuration screen where a user is setting up a new environment, with options for environment name, domain, and platform type.](https://kodekloud.com/kk-media/image/upload/v1752858864/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-configuration-screen-4.jpg)

For production, choose the **High Availability** configuration. This setup deploys your application across multiple EC2 instances behind a load balancer to ensure redundancy. Click **Next** to continue.

Select the same IAM roles, EC2 key pair, and instance profile used in the development environment.

![The image shows an AWS Elastic Beanstalk configuration screen where a user is selecting a service access role from a dropdown menu. Various IAM roles are listed for selection.](https://kodekloud.com/kk-media/image/upload/v1752858865/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-iam-roles.jpg)

You will now be presented with a full suite of configuration options. These settings allow customization of networking, database integration, instance types, auto-scaling policies, load balancer rules, logging, and deployment strategies (e.g., rolling updates, immutable deployments, or traffic splitting).

For example, within the networking section you can:

- Select a Virtual Private Cloud (VPC) and multiple subnets for redundancy.
- Choose whether EC2 instances receive public IP addresses.
- Enable and configure an RDS database, selecting instance type, storage options, and deletion policies.

![The image shows an AWS Elastic Beanstalk configuration page, specifically focusing on instance settings and subnets in the us-east-1 region. It lists various availability zones and their corresponding subnets and CIDR blocks.](https://kodekloud.com/kk-media/image/upload/v1752858867/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-instance-settings.jpg)

In the auto-scaling settings, define the minimum, maximum, and desired number of instances. Choose between on-demand or mixed spot and on-demand instances, and configure scaling triggers based on metrics such as CPU utilization or network traffic.

![The image shows an AWS Elastic Beanstalk configuration screen for setting scaling triggers, including options for metric, statistic, unit, period, breach duration, and upper threshold.](https://kodekloud.com/kk-media/image/upload/v1752858867/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-scaling-configuration.jpg)

The load balancer configuration lets you:

- Choose between a public and internal load balancer.
- Select the load balancer type (Application Load Balancer or Network Load Balancer).
- Configure dedicated or shared load balancers.
- Set listener rules, such as the default rule for port 80 and health check settings.

![The image shows an AWS console screen where load balancer network settings are being configured, with options for visibility (Public or Internal) and a list of subnets in different availability zones.](https://kodekloud.com/kk-media/image/upload/v1752858869/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-load-balancer-network-settings.jpg)

Additional settings include log file access, CloudWatch monitoring, email notifications, and deployment strategies. After reviewing all settings, click **Submit** to launch the production environment. If needed, you can cancel and restart the process with AWS-recommended defaults.

![The image shows an AWS Elastic Beanstalk configuration page where a user is setting up application and environment information, including names and domains.](https://kodekloud.com/kk-media/image/upload/v1752858870/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-configuration.jpg)

Once deployed, the production environment should display a health status of "OK" on the dashboard.

![The image shows an AWS Elastic Beanstalk dashboard for an environment named "My-webapp-prod," indicating a successful launch with a health status of "OK." It displays platform details, environment ID, and recent events related to the environment.](https://kodekloud.com/kk-media/image/upload/v1752858871/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-elastic-beanstalk-dashboard-my-webapp-prod.jpg)

Click the production domain to confirm that your application is accessible. With both development and production environments live under the same application, you can test new features in development before promoting changes to production.

---

## Reviewing AWS Resources

Elastic Beanstalk leverages AWS CloudFormation to create and manage resources. For your production environment, you can review these components:

- **CloudFormation Stack:** Lists resources including auto-scaling groups, launch configurations, CloudWatch alarms, and load balancer settings.

![The image shows an AWS CloudFormation console with a list of stacks and their resources, including CloudWatch alarms, all marked as "CREATE_COMPLETE."](https://kodekloud.com/kk-media/image/upload/v1752858873/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-cloudformation-stacks-create-complete.jpg)

- **EC2 Instances:** Displays the running instances that are part of an auto-scaling group, detailing the desired, minimum, and maximum instance counts.

![The image shows an AWS EC2 management console with a list of running instances, including details like instance ID, type, and status checks.](https://kodekloud.com/kk-media/image/upload/v1752858874/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-ec2-management-console-instances.jpg)

- **Auto Scaling Groups:** Provides configurations linked to launch configurations and scaling policies.

![The image shows an AWS console displaying a list of Auto Scaling groups with details such as name, instances, and desired capacity. The interface includes options for launching configurations and creating new Auto Scaling groups.](https://kodekloud.com/kk-media/image/upload/v1752858875/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-auto-scaling-groups-console.jpg)

- **Load Balancer Details:** Includes listener rules and target groups, ensuring seamless traffic forwarding to your EC2 instances.

![The image shows an AWS Management Console screen focused on the Load Balancers section, displaying details about listeners and rules for a specific load balancer. It includes information about protocols, ports, and target groups.](https://kodekloud.com/kk-media/image/upload/v1752858876/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-management-console-load-balancers.jpg)

![The image shows an AWS console screen displaying details of a target group in Elastic Load Balancing, with one healthy registered target instance.](https://kodekloud.com/kk-media/image/upload/v1752858878/notes-assets/images/AWS-Certified-Developer-Associate-Elastic-Beanstalk-Basics-demo/aws-console-target-group-elb.jpg)

This comprehensive view highlights how Elastic Beanstalk streamlines deployment by automatically managing the underlying AWS components.

---

In summary, this demo illustrated how to deploy multiple environments with AWS Elastic Beanstalk. The development environment allows for safe testing of new code changes, while the production environment is configured for high availability and scalability. Through the use of AWS CloudFormation, Elastic Beanstalk efficiently manages all necessary resources, greatly reducing deployment complexity.

Enjoy leveraging AWS Elastic Beanstalk for your web applications, and explore its robust features to optimize your deployment workflows!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3f5ca094-fa86-4914-92ae-0ccab67b102d/lesson/39ca2668-4852-4abb-be79-08620708877f)**
>
> Watch video content
