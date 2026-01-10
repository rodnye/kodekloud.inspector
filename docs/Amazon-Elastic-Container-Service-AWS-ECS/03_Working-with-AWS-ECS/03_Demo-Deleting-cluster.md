# Demo Deleting cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Working-with-AWS-ECS/Demo-Deleting-cluster)

---

## Table of Contents

- Demo Deleting cluster
  - Step 1: Remove the Active Service
  - Step 2: Delete the Cluster
  - Completion
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Working with AWS ECS

# Demo Deleting cluster

In this lesson, you'll learn how to delete all resources in your Amazon ECS environment to start fresh without using the quick start wizard. After confirming that your application deployed successfully, follow these steps to remove the active service and delete the cluster.

## Step 1: Remove the Active Service

First, navigate to your default cluster and locate the active service you want to remove.

![The image shows an AWS ECS console displaying details of a cluster named "default," with one active service called "ecs-project1-service" running on Fargate.](https://kodekloud.com/kk-media/image/upload/v1752869159/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deleting-cluster/aws-ecs-console-default-cluster.jpg)

Select the desired service and initiate the deletion process. When the system prompts you for confirmation, type "delete me" in the provided text box. The deletion process may take a few seconds. You should see that all corresponding tasks are automatically terminated; if any tasks remain running, you can delete them manually.

> [!important]
> **Note**
>
> After deleting the service, ensure there are no orphaned tasks before proceeding to delete the cluster.

## Step 2: Delete the Cluster

Once the service has been removed, return to the default cluster view to delete the cluster itself.

![The image shows a confirmation dialog for deleting a cluster in a cloud management interface, with a progress bar indicating the deletion of resources and a text box to confirm the action by typing "delete me."](https://kodekloud.com/kk-media/image/upload/v1752869160/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deleting-cluster/delete-cluster-confirmation-dialog.jpg)

Confirm the deletion, and the cluster removal will begin. You will receive a confirmation message once the process is complete.

![The image shows an Amazon ECS (Elastic Container Service) dashboard with a notification indicating that a cluster was deleted successfully. There are no clusters currently found, and options to create a new cluster or get started are available.](https://kodekloud.com/kk-media/image/upload/v1752869162/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Demo-Deleting-cluster/amazon-ecs-dashboard-cluster-deleted.jpg)

## Completion

Your ECS environment is now cleared. You can deploy your applications from scratch without any interference from previously deployed resources.

For more detailed information on managing ECS resources, refer to the [Amazon ECS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-launch-types.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/fb45f65b-b11f-447c-9a22-ae6eae5bfc9d/lesson/be394642-9a09-40e8-a494-635397c1d1ae)**
>
> Watch video content
