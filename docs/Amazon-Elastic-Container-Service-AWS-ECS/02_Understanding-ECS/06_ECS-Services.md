# ECS Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Understanding-ECS/ECS-Services)

---

## Table of Contents

- ECS Services
  - What is a Service?
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Understanding ECS

# ECS Services

In this article, we will explore the concept of an ECS service and how it ensures consistent and reliable operations for your containerized applications.

## What is a Service?

An ECS service is designed to maintain a specified number of task instances running at all times. Suppose you have a simple Python application and require two running instances (or containers) at all times. By configuring the ECS service with the desired count of two, the service guarantees that exactly two instances of your application are active.

If no instances are running when the service is initiated, it will launch two new instances and deploy them across the available servers within the cluster.

> [!important]
> **Self-Healing Mechanism**
>
> ECS services constantly monitor the running tasks. If any container crashes or stops unexpectedly, the service will automatically restart the affected container. This self-healing feature ensures that the intended number of instances is maintained, providing continuous availability for your application.

Moreover, ECS services also keep an eye on the underlying [EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instances. In the event that one of these instances fails, the service will detect the failure, cease tasks on the problematic instance, and relaunch them on healthy [EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instances.

By utilizing ECS services, you can achieve high availability and seamless scalability for your containerized applications, ensuring an optimal balance between performance and resilience.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/cec2a3ca-2cb6-4e9c-a1f2-693b3303765d/lesson/620211ce-38f2-4ac8-bd81-1ef7fd347f85)**
>
> Watch video content
