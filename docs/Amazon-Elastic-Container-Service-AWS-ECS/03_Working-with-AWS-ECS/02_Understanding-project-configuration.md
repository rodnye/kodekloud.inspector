# Understanding project configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Working-with-AWS-ECS/Understanding-project-configuration)

---

## Table of Contents

- Understanding project configuration
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Working with AWS ECS

# Understanding project configuration

Before validating that your application deployed successfully, it's essential to review all the resources created by the ECS task wizard. The wizard performs multiple behind-the-scenes operations, and understanding each step can help you troubleshoot and optimize your deployment.

![The image shows an Amazon ECS service details page for "ecs-project1-service," indicating its status as active with one running task. It includes information about load balancing and network access settings.](https://kodekloud.com/kk-media/image/upload/v1752869169/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/amazon-ecs-ecs-project1-service-details.jpg)

Start by navigating to the Task Definitions section. The Task Definition file is where all container configurations reside, much like a Docker Compose file or Docker run command flags. It includes vital settings such as port mappings, volume definitions, and environment variables.

![The image shows the AWS ECS console displaying a list of task definitions, all with an "ACTIVE" status. The interface includes options to create a new task definition or revision.](https://kodekloud.com/kk-media/image/upload/v1752869170/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-ecs-task-definitions-active.jpg)

If you are new to ECS, you might find only a single task definition corresponding to your initial run. In cases where multiple task definitions are displayed, select the one relevant to your project. Note that if any container configurations have been updated, multiple revisions will be listed. The highest numbered revision indicates the most recent configuration.

When you inspect a Task Definition, you'll see all of the container configuration settings. Default settings such as using Fargate as the launch type are clearly visible. A scroll through the configuration allows you to review resource allocations like memory and CPU, along with container-specific settings such as host-to-container port mappings (for example, port 3000 mapped to port 3000), volumes, and environment variables.

![The image shows an AWS ECS Task Definition page, detailing settings such as task definition name, network mode, operating system family, and task execution IAM role.](https://kodekloud.com/kk-media/image/upload/v1752869171/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-ecs-task-definition-settings.jpg)

![The image shows an AWS management console interface displaying container definitions for a task, including details like port mappings, environment variables, and resource limits.](https://kodekloud.com/kk-media/image/upload/v1752869172/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-management-console-container-definitions.jpg)

In this example, the task definition contains the configuration for a single container. However, you can define multiple containers within one task definition or create separate task definitions depending on your deployment strategy.

Next, click on Clusters to view the cluster that the wizard created. The cluster represents the underlying resources on which your containers run. In this setup using Fargate, the cluster only contains the necessary configurations for your containerized application. If you deployed with an ECS cluster on EC2 instances, you would have details for each EC2 instance instead.

![The image shows an AWS ECS Clusters dashboard with details about services, running tasks, and monitoring data for Fargate and EC2 instances. It indicates one running task under Fargate and no data for CPU and memory utilization.](https://kodekloud.com/kk-media/image/upload/v1752869173/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-ecs-clusters-dashboard-fargate.jpg)

When you select the default cluster, you'll see a list of services created by the wizard. One of these services is named "ECS - project one - service." Its active status is confirmed, along with details of the associated task definition files. The dashboard indicates one desired task and one running task.

![The image shows an AWS ECS cluster dashboard with details about the cluster's status, including active services and tasks. It lists one active service named "ecs-project1-service" using the Fargate launch type.](https://kodekloud.com/kk-media/image/upload/v1752869174/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-ecs-cluster-dashboard-fargate.jpg)

By selecting the service, you can review additional configuration details such as network settings (including VPC, subnets, and security groups). Next, navigate to the Tasks section to examine the running task. Here, you'll notice that the task is active and has been assigned a public IP address. This address is crucial because it provides access to your application.

![The image shows a task details page from an AWS ECS console, displaying information about a running task, including network settings and container details.](https://kodekloud.com/kk-media/image/upload/v1752869175/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Understanding-project-configuration/aws-ecs-task-details-page.jpg)

> [!important]
> **Deployment Verification**
>
> After copying the public IP address and opening it in your browser, check that it displays the demo application. Since the application is configured to run on port 3000, accessing the IP on port 3000 should serve a simple HTML file, confirming that the deployment is successful.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/fb45f65b-b11f-447c-9a22-ae6eae5bfc9d/lesson/a6642bcd-800a-423b-803e-a371e0bfd3eb)**
>
> Watch video content
