# ECS Demo Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/ECS-Demo-Part-1)

---

## Table of Contents

- ECS Demo Part 1
  - Project 1 Overview
  - Dockerfile
  - Deploying with the ECS Console
  - Service and Cluster Setup
  - Exploring ECS Components
  - Tearing Down the Quick Start Deployment
  - Deploying from Scratch Using Fargate
  - Updating the Application
  - Cleanup and Next Steps
  - Watch Video
    - index.html
    - Express Server Code
    - Step 1 – Using the Quick Start Wizard
    - Task Definitions
    - Clusters and Services
    - Creating a New Cluster
    - Creating a Task Definition
    - Creating a Service from the Task Definition
    - Updated index.html

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# ECS Demo Part 1

In this lesson, you will deploy a simple Node.js application to [AWS ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs). Before working with ECS using the AWS Console, review the two public demo projects available on Docker Hub:

• https://kodekloud.com/ecs-project1  
• https://kodekloud.com/ecs-project2

Pull these images to follow along with the lesson.

---

## Project 1 Overview

Project 1 features a basic Node.js application using the Express framework to serve a simple HTML file. A GET request to the root path returns the HTML document.

### index.html

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

```
user1 on user1 in ecs-project1 is v1.0.0 via ⎊
```

### Express Server Code

The Express server is configured to render the HTML page. The application listens on port 3000.

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

```
user1 on user1 in ecs-project1 is 🧱 v1.0.0 via []
```

---

## Dockerfile

The Dockerfile below packages the application and exposes port 3000. When configuring your ECS container, ensure that port 3000 is specified.

```
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

---

## Deploying with the ECS Console

Navigate to the AWS Console and search for [Elastic Container Service (ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs). When you first use ECS, you will encounter a quick-start wizard. Although the wizard includes sample apps, choose a custom configuration to understand each underlying component.

### Step 1 – Using the Quick Start Wizard

When prompted by the wizard:

1.  Click the **Get started** button.
2.  Instead of selecting one of the example applications, choose _Custom_ to provide your own configurations.

![The image is a webpage for Amazon Elastic Container Service (ECS), highlighting features like running containers at scale, flexible container placement, and integration with other services. It includes a video thumbnail and a "Get started" button.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/amazon-ecs-webpage-features.jpg)

![The image shows a webpage from Amazon Web Services (AWS) for getting started with Amazon Elastic Container Service (ECS) using Fargate, featuring a diagram of ECS objects and container definitions.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-fargate-getting-started-diagram.jpg)

Configure the container using the following settings:

- **Container Name:** ECS-Project1
- **Image:** kodekloud/ECS-Project1 (public repository; no credentials required)
- **Memory Limits:** Adjust as needed.
- **Port Mapping:** Specify port 3000 (TCP). As the Express app listens on port 3000, set the container port to 3000.

> [!important]
> **Important**
>
> Unlike a typical Docker run command (e.g., `-p 80:3000`), in ECS the external port must match the container port (e.g., 3000 mapped to 3000).

For example, your Docker run command would look like:

```
docker run -p 3000:3000
```

Advanced container settings like health checks can also be configured. For example, add the following health check command:

```
CMD-SHELL, curl -f http://localhost/ || exit 1
```

These settings are similar to options found in a Docker Compose file, allowing you to specify environment variables, volumes, resource limits, and labels.

![The image shows a configuration interface for setting up AWS CloudWatch Logs, resource limits, and Docker labels, with fields for entering key-value pairs and limits.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-cloudwatch-logs-configuration.jpg)

Click **Update** to complete the container configuration.

---

## Service and Cluster Setup

After the container configuration, click **Next** to proceed to the service definition. ECS will generate a service named _ECS-project1-service_. You may choose to attach a load balancer (for this demo, select _None_). The wizard will automatically provision a new cluster and VPC along with the required subnets.

![The image shows a diagram explaining ECS objects and their relationships, along with a form for defining a service in an ECS cluster, including fields for service name, desired tasks, security group, and load balancer type.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/ecs-objects-relationships-diagram.jpg)

![The image shows a configuration screen for setting up an AWS ECS cluster, including a diagram illustrating the relationship between ECS objects like container definition, task definition, service, and cluster. It also includes fields for entering a cluster name and options for VPC and subnets.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-cluster-configuration-diagram.jpg)

Review the configuration details for your container, task definition, service, and cluster, then click **Create**. After a few minutes, select **View Service** to verify that your application has been deployed.

Before verifying, let’s review some ECS components that were created in the background.

---

## Exploring ECS Components

### Task Definitions

Task definitions serve as blueprints for your container configurations (including port mappings, environment variables, and volumes). Under **Task Definitions** in the ECS Console, locate the task definition for this project, noting that revisions indicate configuration changes.

![The image shows the Amazon ECS console displaying a list of task definitions, all with an "ACTIVE" status. The interface includes options to create a new task definition and manage existing ones.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/amazon-ecs-task-definitions-active.jpg)

Select the relevant task definition (for example, “first-run-task-definition”). The highest revision number indicates the latest configuration.

![The image shows an Amazon ECS console page displaying task definitions with the name "first-run-task-definition" and three active revisions.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/amazon-ecs-task-definitions-first-run.jpg)

Upon reviewing the configuration, you will notice settings such as Fargate usage, memory/CPU allocations, and the host-to-container mapping (port 3000 to port 3000).

![The image shows an AWS management console interface for configuring a task execution IAM role and task size, including memory and CPU allocation. It also includes container definitions with details like port mappings and environment variables.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-management-console-task-configuration.jpg)

### Clusters and Services

Within **Clusters**, the wizard-created cluster displays the active service _ECS-project1-service_. This service is associated with one desired task and, later, one running task.

![The image shows an AWS ECS cluster dashboard with details about a cluster named "default," including active services and tasks. It lists one active service, "ecs-project1-service," using the Fargate launch type.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-cluster-dashboard-default.jpg)

Click on the service to review the network details (VPC, subnets, and security groups).

![The image shows an AWS ECS service dashboard for "ecs-project1-service," indicating its active status, task definition, and network access details. It includes information about the cluster, service type, and security groups.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-service-dashboard-ecs-project1-2.jpg)

Under **Tasks**, you will find the running task. The details page displays a public IP address that can be used to access the application.

![The image shows a task details page from a cloud service, displaying information about a running task, including network settings and container status. It includes details like the task ID, cluster, launch type, IP addresses, and container information.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/cloud-service-task-details-page.jpg)

When you access the public IP on port 3000, the browser shows the simple HTML page served by your application.

> [!important]
> **IP Address Changes**
>
> If multiple tasks are running, each task will have a unique IP address. This dynamic nature is why a load balancer is crucial—it provides a stable endpoint for clients.

---

## Tearing Down the Quick Start Deployment

After confirming a successful deployment, delete the resources created via the quick start wizard. Delete the ECS service by navigating to the cluster, selecting the service, and confirming deletion (type “delete me” when prompted). Then, delete the cluster.

![The image shows a dialog box for deleting a cluster in a cloud management interface, with a progress bar indicating the deletion of cluster resources. The user is prompted to enter "delete me" to confirm the deletion.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/delete-cluster-dialog-progress-bar.jpg)

Now that the ECS configuration is removed, you can deploy the application from scratch.

---

## Deploying from Scratch Using Fargate

### Creating a New Cluster

1.  In the ECS Console, click **Create Cluster**.
2.  Choose the "Networking only" option (Fargate).
3.  Provide a cluster name (e.g., "cluster1"). Leave the default VPC CIDR block and subnets intact.
4.  Click **Create**.

![The image shows an AWS console interface for creating a cluster, with options to configure networking settings such as VPC, CIDR block, and subnets. It also includes a section for enabling CloudWatch Container Insights.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-console-cluster-creation-settings.jpg)

Select **View Cluster** to inspect the new cluster.

---

### Creating a Task Definition

1.  In the ECS Console, navigate to **Task Definitions** and click **Create new Task Definition**.
2.  Select **Fargate** as the launch type.
3.  Name the task definition (e.g., "ECS-Project1-taskdef") and choose the appropriate IAM role (this may have been auto-created if you previously ran the quick start wizard).
4.  Choose Linux as the operating system and keep the default execution role.
5.  Specify a minimal task size for this demo.

![The image shows a configuration screen for creating a new task definition in AWS, specifically for setting up task and container definitions with options like task definition name, network mode, and task role.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-task-definition-configuration.jpg)

6.  Add a container with these settings:
    - **Container Name:** node app
    - **Image:** kodekloud/ECS-Project1
    - **Health Check Command:**

      ```
      CMD-SHELL, curl -f http://localhost/ || exit 1
      ```

    - **Port Mapping:** 3000

Click **Add** and then **Create** to finalize the task definition.

![The image shows an AWS management console interface for configuring a task, including options for operating system family, task execution IAM role, and task size with a dropdown for selecting task memory in GB.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-management-console-task-configuration-2.jpg)

---

### Creating a Service from the Task Definition

1.  Within your cluster ("cluster1"), go to the **Services** tab and click **Create**.
2.  Set the **Launch type** to Fargate and the **Operating system** to Linux.
3.  Select the latest revision of your task definition ("ECS-Project1-taskdef").
4.  Name your service (e.g., "project1-service") and choose the desired number of tasks (for instance, 2 to demonstrate scaling).
5.  Click **Next**.

![The image shows an AWS management console screen for configuring a service deployment, with options for service type, number of tasks, deployment type, and task tagging configuration. The "Next step" button is highlighted at the bottom.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-management-console-service-deployment.jpg)

6.  For the network configuration:
    - Select the VPC created for ECS.
    - Choose the two subnets.
    - Edit the default security group to permit incoming traffic on port 3000 (instead of port 80).
7.  Skip the load balancer configuration for this demo.
8.  Optionally disable autoscaling and click **Next**.

![The image shows a configuration screen for setting up a network in AWS, specifically focusing on VPC and security groups. It includes options for selecting subnets, security groups, and enabling auto-assign public IP.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-network-configuration-vpc-security-groups.jpg)

![The image shows an AWS console interface for configuring load balancing options, including choices for Application, Network, and Classic Load Balancers.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-console-load-balancing-options.jpg)

![The image shows an AWS management console screen for creating a service, displaying configuration details such as cluster, launch type, operating system, and network settings. It includes sections for reviewing service settings and configuring network and auto-scaling options.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-console-create-service-settings.jpg)

Finally, click **Create Service**. ECS will begin provisioning the two tasks. They may initially show a "PENDING" status until transitioning to "RUNNING."

![The image shows an AWS ECS console displaying details of a task with a "PENDING" status, including network information and container details for a "node-app."](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-console-task-pending-node-app.jpg)

Once the tasks are running, each will receive a unique public IP. Note that manually tracking these changing IPs is not ideal; hence a load balancer is recommended, as it establishes a consistent endpoint.

![The image shows an AWS ECS console displaying details of a running task, including network information and container status.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-console-running-task-details.jpg)

Click on a task to view its details and copy its public IP. Visiting this IP on port 3000 will display the simple HTML page of your application.

![The image shows an AWS ECS task details page, displaying information about a running task, including network settings and container status.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-task-details-page.jpg)

---

## Updating the Application

Suppose you decide to update the application by modifying the HTML. For example, you can add extra exclamation points to the H1 tag.

### Updated index.html

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
    <h1>ECS Project 1!!!!!</h1>
  </body>
</html>
```

Rebuild your Docker image and tag it:

```
docker build . -t kodekloud/ecs-project1
```

Push the updated image to Docker Hub. The output may look like:

```
8cba2b7a5a3d: Layer already exists
2713d962e94: Layer already exists
72140ff0de3: Layer already exists
93a6676ff620: Layer already exists
c77311ff52e: Layer already exists
ba9804f7abed: Layer already exists
a5186a09280: Layer already exists
1e69438976e4: Layer already exists
47b6660a2b9b: Layer already exists
5cbc21d19fb: Layer already exists
07b905e91599: Layer already exists
20833a96725e: Layer already exists
latest: digest: sha256:98216dd964fd5bb910fb23a527ed9d804b5cedacaa47fb45264cebe664006b size: 3261
user1 on user1 in ecs-project1 [!] is v1.0.0 via ⬢ took 4s
```

The ECS service must be notified of this update. In the ECS Console, update the service by selecting **Update** and then opting for **Force new deployment**. This command instructs ECS to pull the latest image and deploy new tasks. Alternatively, if you modify the task definition (even if only the image tag changes), create a new revision and update your service to use this latest revision.

![The image shows an AWS ECS configuration screen for setting up a service with options for task definition, launch type, operating system, and other deployment settings.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-service-configuration-screen.jpg)

If you create a new revision of the task definition, update the service appropriately.

![The image shows a screenshot of the AWS console, specifically the "Create new revision of Task Definition" page for Amazon ECS. It includes fields for task definition name, task role, network mode, and other configuration options.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-console-create-task-definition.jpg)

After the update, the ECS Console will display both the old and new tasks running side by side until the health checks pass and the old tasks are terminated. The new tasks will receive different public IP addresses:

![The image shows an Amazon ECS (Elastic Container Service) dashboard displaying cluster information, including one Fargate service with two running tasks and no data for CPU or memory utilization.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/amazon-ecs-dashboard-fargate-tasks.jpg)

Refreshing the service confirms that the new tasks are active with the updated application. This dynamic change of IPs further reinforces the necessity of a load balancer to provide a stable endpoint.

![The image shows an Amazon ECS task details page, displaying information about a running task, including network settings and container status.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/amazon-ecs-task-details-page.jpg)

---

## Cleanup and Next Steps

After verifying the updated deployment, you can delete the application resources if desired. In the ECS Console, delete the service (confirm by entering “delete me”) and ensure all tasks are terminated.

![The image shows an AWS ECS (Elastic Container Service) dashboard displaying details of a cluster named "cluster1," including task statuses and configurations. It lists two running tasks with their respective details such as task definition, status, and launch type.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-cluster1-dashboard.jpg)

![The image shows an AWS ECS console with a pop-up window asking for confirmation to delete a service named "project1-service." The user is prompted to enter "delete me" to confirm the deletion.](/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-1/aws-ecs-delete-service-confirmation.jpg)

Next, we will demonstrate how to deploy a more complex application that includes a database, persistent storage (volumes), and a load balancer to ensure a single, stable endpoint for your front-end applications.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/939c7164-d6d4-41ee-b16f-d7089a8c2c86)**
>
> Watch video content
