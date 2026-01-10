# Demo Deploying task revisions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Deploying-a-new-application-from-scratch/Demo-Deploying-task-revisions)

---

## Table of Contents

- Demo Deploying task revisions
  - Making Application Changes
  - Pushing the Updated Image
  - Updating the ECS Service
  - Verifying the Deployment
  - The Role of a Load Balancer
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Deploying a new application from scratch

# Demo Deploying task revisions

In this guide, you'll learn how to update your application, rebuild and push a new Docker image to Docker Hub, and deploy the updated image using [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs). Follow along to modernize your deployment process and ensure seamless application updates.

## Making Application Changes

Begin by modifying your application. For this demonstration, we update the HTML file by adding extra exclamation points to the H1 tag. The updated HTML file now appears as follows:

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

Next, build a new Docker image to incorporate your changes. Tag the image as "KodeKloud/ecs-project1" and execute the Docker build command. The console output may look similar to this:

```
user1 on user1 in ecs-project1 [!] is v1.0.0 via took 3s
```

## Pushing the Updated Image

Once the Docker image is built successfully, push it to Docker Hub. During the push, you may notice that many layers already exist. Finally, the output provides a digest confirming a successful push:

```
8cba2b7a5a3d: Layer already exists
2713d9662e94: Layer already exists
72140ff0db3: Layer already exists
93a6676ff6e4: Layer already exists
c77311ff502e: Layer already exists
ba9804f7abed: Layer already exists
a5186a09280a: Layer already exists
1e69438976e4: Layer already exists
47b6660a2b9b: Layer already exists
5cbc21d1985: Layer already exists
07b905e91599: Layer already exists
20833a96725e: Layer already exists
latest: digest: sha256:98216dd964fd5bb910fb23a527ed9e9d804b5cedaaa47fb45264cebe664006b size: 3261
user1 on user1 in ecs-project1 [!] is v1.0.0 via took 4s
```

Now that your image is updated on Docker Hub, it's time to inform ECS of the new changes so that it pulls the latest image for your service.

## Updating the ECS Service

Refreshing your application immediately after pushing the updated image may still display the old version. This happens because ECS hasn't been notified of the change. To update your deployed service, follow these steps in the ECS Console:

1.  Navigate to Clusters and select your cluster.
2.  Choose the service you wish to update.
3.  Click on **Update**.
4.  Enable the **Force New Deployment** option.

> [!important]
> **Note**
>
> Forcing new deployment instructs ECS to pull the latest image and replace the old tasks with new ones.

The diagram below shows the AWS ECS Task Details page, which provides essential information about running tasks, including network settings and container statuses:

![The image shows an AWS ECS task details page, displaying information about a running task, including network settings and container status.](https://kodekloud.com/kk-media/image/upload/v1752869143/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/aws-ecs-task-details-page.jpg)

Additionally, observe the following diagram that illustrates a cluster with an active service:

![The image shows an AWS ECS console displaying details of a cluster named "cluster1," with an active service called "project1-service" running on Fargate.](https://kodekloud.com/kk-media/image/upload/v1752869144/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/aws-ecs-cluster1-project1-service.jpg)

After applying the force deployment, ECS pulls the updated image and redeploys the tasks. Review the ECS Service Configuration screen as shown in the following diagram:

![The image shows an AWS ECS configuration screen for setting up a service with details like task definition, launch type, operating system, and cluster information.](https://kodekloud.com/kk-media/image/upload/v1752869145/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/aws-ecs-service-configuration-screen.jpg)

If you also modify the task definition file, a new revision of the task definition is created. For example, after updating "ecs-project1-taskdef", the ECS console may display multiple revisions:

![The image shows a web interface displaying task definitions for "ecs-project1-taskdef" with two active revisions listed.](https://kodekloud.com/kk-media/image/upload/v1752869146/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/ecs-project1-taskdef-revisions-interface.jpg)

Then, review the updated service configuration before finalizing the update:

![The image shows an AWS ECS service configuration review screen, detailing settings like cluster, launch type, task definition, and network configuration. There is an option to update the service at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752869148/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/aws-ecs-service-configuration-review.jpg)

After updating the service, ECS starts new tasks using the latest image while gradually shutting down the older tasks once the new ones pass all health checks. You can monitor this transition in the ECS Tasks view.

## Verifying the Deployment

After the deployment, refresh the ECS service page and inspect one of the running tasks. Keep in mind that the task's IP address changes with each new deployment. The diagram below illustrates the network details and container status of a running task:

![The image shows an Amazon ECS console displaying details of a running task, including network information and container status.](https://kodekloud.com/kk-media/image/upload/v1752869150/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deploying-task-revisions/amazon-ecs-console-running-task-details.jpg)

Once you confirm the update on port 3000, you'll notice the additional exclamation points in the H1 tag. However, be aware that changes in IP addresses could affect clients accessing the application directly.

## The Role of a Load Balancer

> [!important]
> **Note**
>
> A load balancer addresses the potential issue of changing IP addresses by providing a consistent endpoint. It automatically routes traffic to the updated task IP addresses after each deployment, ensuring uninterrupted client connectivity.

By integrating a load balancer, you simplify deployment updates while maintaining reliable access to your application, regardless of changes in the infrastructure.

---

For further reading on container orchestration and managing deployments, consider exploring the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/5d992c10-db1a-4e88-91f3-83c23d3595d0/lesson/5536d9a0-fc6a-401e-81e2-24451c4163dc)**
>
> Watch video content
