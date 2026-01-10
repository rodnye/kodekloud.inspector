# Jenkins Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Setup-and-Interface/Jenkins-Architecture)

---

## Table of Contents

- Jenkins Architecture
  - Jenkins Controller
  - Nodes and Executors
  - Agents and Tooling
  - Bringing It All Together
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Setup and Interface

# Jenkins Architecture

In this article, we explore the architecture of Jenkins and understand how it efficiently manages CI/CD pipelines through a distributed setup. Jenkins is designed for scalability and reliability, automating complex workflows across multiple machines.

## Jenkins Controller

The Jenkins Controller, often referred to as the Jenkins server (formerly known as the master node), is the central hub of your Jenkins installation. It orchestrates all CI/CD processes by handling several critical management tasks:

- **User Management:** Handles authentication and authorization exclusively on the controller.
- **Job and Pipeline Management:** Defines, schedules, and monitors jobs and pipelines.
- **Centralized Web Interface:** Provides a comprehensive interface for configuration, plugin management, user onboarding, and build monitoring.

![The image illustrates the Jenkins architecture, highlighting the Jenkins Controller Node with components like plugins, jobs, nodes, credentials, and configurations, and its role in managing tasks, job management, and providing a web interface for CI/CD processes.](https://kodekloud.com/kk-media/image/upload/v1752879542/notes-assets/images/Jenkins-For-Beginners-Jenkins-Architecture/jenkins-architecture-controller-node-diagram.jpg)

In simpler or smaller deployments, the Jenkins server might handle both control and build tasks as the only node. However, for enhanced security and performance, it is recommended to use a dedicated controller along with separate worker nodes. This separation ensures that controller configurations remain safe from potential job-related modifications while improving performance by distributing build tasks across multiple machines.

![The image illustrates Jenkins architecture, highlighting the components of the Jenkins Controller Node and comparing basic and advanced deployment strategies.](https://kodekloud.com/kk-media/image/upload/v1752879542/notes-assets/images/Jenkins-For-Beginners-Jenkins-Architecture/jenkins-architecture-controller-node-diagram-2.jpg)

Using multiple nodes not only secures the controller but also allows you to scale Jenkins easily by adding more nodes with additional resources as your projects grow.

## Nodes and Executors

Nodes, previously referred to as Jenkins agents, are the worker machines that execute your build jobs. These machines can run on different operating systems like Linux or Windows and connect to the Jenkins Controller using protocols such as Secure Shell (SSH) or Java Network Launch Protocol (JNLP).

Each node is allocated a set number of executors, which are individual threads that run build jobs concurrently. The number of executors per node is determined by the node's available hardware resources (CPU, memory) and the complexity of the build tasks. While a one-executor-per-node configuration maximizes security, assigning one executor per CPU core is effective for managing small, lightweight tasks.

## Agents and Tooling

Agents extend Jenkins functionality by managing task execution on remote nodes via executors. They define the communication protocol and authentication mechanism between the node and the controller. For example:

- A **Java agent** using JNLP.
- An **SSH agent** using Secure Shell.

All necessary build and test tools are installed on the node where the agent operates. A popular modern approach is to leverage Docker containers as build agents. Instead of installing dependencies directly on a physical machine, you can specify a Docker image that encapsulates all required software. This ensures that each build job runs in a clean, isolated environment, reducing dependency conflicts across projects.

Similarly, Kubernetes clusters can be used to dynamically provision and manage build agents as pods. This approach supports on-demand scaling and optimal resource utilization.

![The image illustrates the Jenkins architecture, showing the relationship between the Jenkins Controller Node and Jenkins Worker Nodes, which include Linux and Windows nodes with agents and executors.](https://kodekloud.com/kk-media/image/upload/v1752879543/notes-assets/images/Jenkins-For-Beginners-Jenkins-Architecture/jenkins-architecture-controller-worker-nodes.jpg)

## Bringing It All Together

Consider a scenario where a Jenkins Controller is connected to two worker nodes. Within the controller, you define jobs and pipelines using its user interface, command-line interface (CLI), or REST APIs. The controller then identifies available executors on the connected nodes and distributes the build jobs accordingly.

Once the nodes execute their respective jobs, the controller collects results, including build statuses, logs, and artifacts. This provides a comprehensive overview of the build processes.

![The image is a diagram showing a Jenkins setup with a controller node and two worker nodes (Linux and MacOS), illustrating job success and failure.](https://kodekloud.com/kk-media/image/upload/v1752879544/notes-assets/images/Jenkins-For-Beginners-Jenkins-Architecture/jenkins-setup-controller-worker-nodes.jpg)

> [!important]
> **Scalability Tip**
>
> For optimal performance, continuously monitor resource usage and consider dynamically provisioning nodes using containerized environments or Kubernetes to handle peak loads.

This distributed architecture enables you to easily scale your Jenkins system by adding more nodes with additional executors. The result is an efficient handling of complex workflows and larger projects while maintaining robust CI/CD pipelines.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/3c1739a1-ee72-4285-a832-4ce3c95b784d/lesson/ef254aa0-d7ac-49b4-b1da-cad4ea2b4bf7)**
>
> Watch video content
