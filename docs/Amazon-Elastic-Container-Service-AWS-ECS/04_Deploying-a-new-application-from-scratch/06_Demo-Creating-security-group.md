# Demo Creating security group - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Deploying-a-new-application-from-scratch/Demo-Creating-security-group)

---

## Table of Contents

- Demo Creating security group
  - Steps to Create a Security Group
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Deploying a new application from scratch

# Demo Creating security group

In this guide, we will walk you through creating a security group for your [Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs) application. A security group acts as a virtual firewall that controls network traffic for your devices. While this example uses a very basic rule, remember to configure only the necessary traffic for production environments.

## Steps to Create a Security Group

1.  Navigate to the [EC2 Dashboard](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) and locate the Security Groups section.
2.  Open the Security Groups page in a new browser tab to simplify navigation.
3.  Click on **Create Security Group** to begin the configuration.
4.  Set the security group name to "ECS SG" and add a description, for example, "ECS security group".
5.  Add an inbound rule that allows all traffic from any IP.

    > [!important]
    > **Warning**
    >
    > Allowing all traffic is not recommended for production. It is best to define explicit rules that permit only the required traffic.

6.  Ensure that the security group is associated with the correct VPC—the one hosting your ECS cluster.
7.  Review your settings and click **Create Security Group** to complete the process.

By following these steps, you have successfully created a basic security group for your AWS ECS application. You can later update these rules to restrict access further as your application requirements evolve.

> [!important]
> **Note**
>
> For more in-depth information on AWS ECS and best practices for security configurations, consider exploring the [AWS ECS Documentation](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/5d992c10-db1a-4e88-91f3-83c23d3595d0/lesson/a58dd49b-d5f8-4f03-9f00-d23d61ac9883)**
>
> Watch video content
