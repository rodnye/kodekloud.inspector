# ECS Demo Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Containers-on-AWS/ECS-Demo-Part-1)

---

## Table of Contents

- ECS Demo Part 1
  - Project One Overview
  - Setting Up ECS Using the AWS Console
  - Understanding the ECS Task Wizard Components
  - Creating a New ECS Cluster
  - Creating Task Definitions for Your New Cluster
  - Creating the ECS Service
  - Updating Your Application
  - Final Notes
  - Watch Video
    - Quick Start with ECS
    - Defining Your ECS Service
    - 1. Task Definitions
    - 2. Cluster
    - 3. Service and Tasks
    - Cleaning Up the Quick Start Environment

---

## Content

AWS Certified Developer - Associate

Containers on AWS

# ECS Demo Part 1

Before working with Amazon ECS in the AWS Console, visit [Docker Hub](https://hub.docker.com) and review the two images that form the basis of our demo projects. These public repositories—available at [kodekloud.com/ecs-project1](https://kodekloud.com/ecs-project1) and [kodekloud.com/ecs-project2](https://kodekloud.com/ecs-project2)—contain the project images we will use.

![The image shows a webpage displaying a list of repositories under a community organization, with options to search and create a new repository. Each repository entry includes details like the name, last push time, and visibility status.](https://kodekloud.com/kk-media/image/upload/v1752858511/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/community-organization-repositories-list.jpg)

## Project One Overview

Project One uses a simple Node.js application powered by an Express server. When a GET request is sent to the root path, the server responds with a basic HTML file. Below is the HTML file delivered by the application:

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
  <h1>ECS Project 1</h1>
</body>
</html>
```

An indicative terminal prompt might appear as follows:

```
user1 on user1 in ecs-project1 is v1.0.0
```

The core application is built with Express, as demonstrated below:

```
const express = require("express");
const path = require("path");


const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

A sample Docker CLI prompt may look like:

```
user1 on 🐳 user1 in ecs-project1 is 🐳 v1.0.0 via 🐳
```

> [!important]
> **Important**
>
> Note that the Express server listens on port 3000.

The Dockerfile for this project is straightforward and exposes port 3000:

```
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

## Setting Up ECS Using the AWS Console

### Quick Start with ECS

1.  Log in to the AWS Console, search for **"ECS"**, and select **Elastic Container Service**.
2.  If you're new to ECS, a quick start wizard will guide you. Although sample applications are available, select the custom option to configure your container manually.
3.  In the container configuration:
    - **Container Name:** For example, "ECS-Project1".
    - **Image:** Use "KodeKloud/ECS-Project1". If your image resides in a private repository, provide your credentials; otherwise, leave it as is.
    - **Port Mapping:** Set to 3000/TCP to match the Express application.

Below is a recap of the Dockerfile content referenced earlier:

```
WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install
RUN npm ci --only=production
COPY .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

For traditional Docker deployments, an external port can be mapped to an internal port like this:

```
# Example (not applicable for ECS)
docker run -p 80:3000
```

In ECS, however, the external and internal ports must match (e.g., both being 3000). The advanced container configuration also allows you to set up health checks, environment variables, and volumes through a graphical interface. Click "Update" when the container configuration is complete.

### Defining Your ECS Service

After setting up the container:

- **Service Name:** For instance, "ECS-project1-service".
- **Load Balancer:** Optionally add one—select "none" for now.

The wizard creates a cluster that groups all underlying resources, provisioning a new VPC along with subnets automatically.

![The image shows a setup screen for defining a service in Amazon ECS, including a diagram of ECS objects and fields for service name, number of tasks, security group, and load balancer type.](https://kodekloud.com/kk-media/image/upload/v1752858512/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/amazon-ecs-service-setup-diagram.jpg)

Review the configuration details including container definition, task definition, service details, and cluster settings. Then click "Create." Wait a few minutes for provisioning and click "View Service" when ready.

## Understanding the ECS Task Wizard Components

### 1\. Task Definitions

Task definitions store all container configurations, including port mappings, volumes, and environment variables. Revision numbers help track changes, with the latest revision reflecting the current configuration.

![The image shows an AWS Management Console screen for creating or managing a task definition in Amazon ECS. It includes fields for task definition name, task role, network mode, operating system family, and compatibility settings.](https://kodekloud.com/kk-media/image/upload/v1752858514/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-task-definition-console.jpg)

### 2\. Cluster

The ECS cluster represents the infrastructure—whether EC2 instances when using the EC2 launch type, or a managed Fargate environment. The default cluster, set up by the wizard, includes a newly created VPC and subnets.

![The image shows an AWS ECS cluster dashboard with details about a cluster named "default." It displays information about tasks and services, including an active service named "ecs-project1-service" using Fargate.](https://kodekloud.com/kk-media/image/upload/v1752858515/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-cluster-dashboard-default.jpg)

### 3\. Service and Tasks

The service, "ECS-project1-service", is created with a desired task count (initially one). You can inspect network settings, including VPC, subnets, and security groups. The running task receives a public IP address which you can use to access the deployed application.

![The image shows an AWS ECS service dashboard for "ecs-project1-service," indicating its active status, task definition, and network access details, including VPC, subnets, and security groups. There are no load balancers configured.](https://kodekloud.com/kk-media/image/upload/v1752858516/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-service-dashboard-ecs-project1-2.jpg)

![The image shows details of an AWS ECS task, including its status, network configuration, and container information. The task is running on Fargate with a public IP address of 44.211.129.14.](https://kodekloud.com/kk-media/image/upload/v1752858517/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-task-fargate-details.jpg)

After obtaining the task’s public IP address and accessing it in a browser, you should see the demo HTML page served on port 3000, confirming the application deployment.

### Cleaning Up the Quick Start Environment

After verification, delete the environment created by the quick start wizard in order to redeploy from scratch:

1.  In your cluster, select the service and delete it. Confirm with "delete me." Ensure that all tasks are removed.
2.  Delete the cluster.

![The image shows a dialog box for deleting an AWS ECS cluster, with a progress bar indicating the deletion of resources and a text field requiring confirmation by typing "delete me."](https://kodekloud.com/kk-media/image/upload/v1752858518/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-cluster-delete-dialog.jpg)

With the ECS environment cleared, you are now ready to deploy the application manually.

## Creating a New ECS Cluster

1.  In the ECS Console, click **Create Cluster**.
2.  Choose **Networking only** if using Fargate. (For EC2, you can choose between Linux and Windows options.)
3.  Name your cluster (for example, "cluster1") and create a new VPC with default CIDR and subnet settings.
4.  Click **Create**.

![The image shows an AWS interface for configuring a new cluster, including options for setting up a VPC, CIDR block, subnets, and enabling CloudWatch Container Insights.](https://kodekloud.com/kk-media/image/upload/v1752858520/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-cluster-configuration-interface.jpg)

![The image shows an AWS ECS launch status page, indicating that an ECS cluster named "cluster1" has been successfully created, with CloudFormation stack resources being set up and various cluster resources listed.](https://kodekloud.com/kk-media/image/upload/v1752858521/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-cluster1-launch-status.jpg)

## Creating Task Definitions for Your New Cluster

1.  Navigate to **Task Definitions** and click **Create new Task Definition**.
2.  Select **Fargate** as the launch type.
3.  Name the task definition (e.g., "ECS-Project1") and assign the appropriate task execution role.
4.  Choose Linux as the operating system and allocate modest CPU and memory resources for the demo.
5.  Add a container:
    - **Container Name:** (e.g., "node app")
    - **Image:** Use "KodeKloud/ECS-Project1"
    - **Port Mapping:** Set to 3000

![The image shows a configuration screen for creating a new task definition in AWS, specifically for setting up task and container definitions with options like task name, network mode, and task role.](https://kodekloud.com/kk-media/image/upload/v1752858522/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-task-definition-configuration.jpg)

After configuring the task definition, click **Add** and then **Create**.

## Creating the ECS Service

1.  In your new cluster ("cluster1"), go to the **Services** tab and click **Create Service**.
2.  Configure the following:
    - **Launch Type:** Fargate
    - **Operating System:** Linux
    - **Task Definition:** Select "ECS-Project1" (latest revision)
    - **Service Name:** (e.g., "project1-service")
    - **Number of Tasks:** For demonstration purposes, choose 2 tasks.
3.  Set up networking:
    - Select the VPC created earlier.
    - Choose the appropriate subnets.
    - Configure the security group: Change the default setting (typically allowing traffic on port 80) to allow Custom TCP traffic on port 3000 from anywhere.

![The image shows a configuration screen for creating a service in AWS, specifically focusing on network settings such as VPC, subnets, and security groups. Options for enabling public IP assignment and health check grace periods are also visible.](https://kodekloud.com/kk-media/image/upload/v1752858523/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-service-configuration-network-settings.jpg)

4.  Proceed without a load balancer by selecting **No load balancer** (this will be discussed later).
5.  Optionally configure auto scaling, then click **Next** to review all configurations.
6.  Finally, click **Create Service**.

![The image shows an AWS console screen for creating a service, displaying configuration details such as cluster, launch type, task definition, and network settings. It includes options for reviewing and editing service parameters.](https://kodekloud.com/kk-media/image/upload/v1752858525/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-console-service-creation-screen.jpg)

Initially, the console may show no tasks until refreshed; you should then notice two tasks being provisioned. Each task receives its own public IP address which requires tracking if not behind a load balancer. A load balancer is recommended for production environments to provide a consistent endpoint and handle traffic distribution.

![The image shows an AWS ECS console displaying details of a service named "project1-service" within a cluster. It includes information about task definitions, status, and launch type, with tasks currently in the "PROVISIONING" state.](https://kodekloud.com/kk-media/image/upload/v1752858526/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-console-project1-service.jpg)

Click on a task to view its details, then copy its public IP address and open it in your browser at port 3000. The expected output is the simple HTML page served by the application. Note that each new deployment generates new public IP addresses, which underscores the importance of using a load balancer in production.

![The image shows an AWS ECS task details page, displaying information about a running task, including cluster details, network configuration, and container status.](https://kodekloud.com/kk-media/image/upload/v1752858528/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-task-details-page.jpg)

## Updating Your Application

Suppose you modify the HTML file by adding extra exclamation marks to the H1 tag. The updated HTML might look like this:

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
  <h1>ECS Project 1!!!!</h1>
</body>
</html>
```

To build and push the changed Docker image, use the following commands:

```
docker build -t KodeKloud/ECS-project1 .
```

```
docker push KodeKloud/ECS-project1
```

Even after pushing the updated image, the running ECS service continues to use the old image until you force a new deployment. To do this, go to the ECS Console, select your service in the cluster, click **Update**, and then choose **Force new deployment**. This instructs ECS to pull the latest image and deploy updated tasks.

Alternatively, if you update the task definition, create a new revision (e.g., revision 2) and update the service to use it. ECS will then start tasks with the latest configuration, and once health checks pass, the old tasks are terminated.

![The image shows a web interface for creating a new revision of a task definition in Amazon ECS. It includes fields for task definition name, task role, network mode, and other configuration options.](https://kodekloud.com/kk-media/image/upload/v1752858529/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/amazon-ecs-task-definition-revision.jpg)

When new tasks are deployed, they will obtain new public IP addresses. While this confirms the update, it also illustrates why a load balancer is essential—it provides a stable endpoint and manages traffic distribution automatically.

![The image shows an AWS ECS dashboard for "project1-service" with tasks running on Fargate. It displays details like task definitions, status, and platform version.](https://kodekloud.com/kk-media/image/upload/v1752858531/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-dashboard-project1-service.jpg)

Refresh the ECS console to verify that only the desired number of tasks (in this example, two) are running, and that the deployment process has gracefully terminated the old tasks.

![The image shows an AWS ECS console displaying details of a running task, including cluster information, network settings, and container status.](https://kodekloud.com/kk-media/image/upload/v1752858532/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-console-running-task-details.jpg)

## Final Notes

This demonstration has shown how to deploy and update a basic application on ECS using both the quick start wizard and manual configuration. Although each ECS task gets a unique IP address, a load balancer is recommended for production to provide a single, stable endpoint and to manage IP changes seamlessly.

After completing the demo, remember to delete the entire service before moving to more complex environments that involve databases, volumes, and load balancing.

![The image shows an AWS ECS console displaying details of a cluster named "cluster1," including task statuses and configurations. It lists two running tasks with their respective details such as task definition, status, and launch type.](https://kodekloud.com/kk-media/image/upload/v1752858535/notes-assets/images/AWS-Certified-Developer-Associate-ECS-Demo-Part-1/aws-ecs-cluster1-task-status.jpg)

Delete the service and confirm that all tasks are removed. The cluster will remain, allowing you to deploy your next application.

> [!important]
> **Summary**
>
> This guide detailed the process of setting up, deploying, updating, and cleaning up an ECS-based application. For production-grade deployments, always consider integrating a load balancer to manage traffic effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c28ddfac-bdff-4566-b056-f6c6391a0d11/lesson/3140dd13-31c2-4c5a-8e18-9a962e7866c7)**
>
> Watch video content
