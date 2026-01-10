# Kubernetes Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Kubernetes-Introduction/Kubernetes-Introduction)

---

## Table of Contents

- Kubernetes Introduction
  - Comparing Kubernetes and Docker Swarm
  - Kubernetes Pods: The Building Blocks
  - Deployments and Services in Kubernetes
  - Managing Kubernetes with kubectl
  - Creating a Simple Pod Definition
  - Deploying a Voting Application on Kubernetes
  - Next Steps
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Kubernetes Introduction

# Kubernetes Introduction

Welcome to this detailed lesson on Kubernetes. In this article, we delve into advanced container orchestration concepts, focusing on Kubernetes—an innovative platform originally developed by Google and now open-sourced for broad adoption. Kubernetes stands out for managing containerized applications in production environments with high availability, scalability, and robust performance.

In this article, you’ll learn about:

- Kubernetes architecture and its basic components
- Differences between Kubernetes and Docker Swarm
- How Kubernetes encapsulates containers within pods
- The roles of Deployments and Services in managing container lifecycles
- Hands-on examples for running an application on Kubernetes using YAML configuration files and command line tools

> [!important]
> **Key Concept**
>
> Kubernetes does not run containers directly on worker nodes; instead, it uses pods—the smallest deployable units that encapsulate one or more containers along with networking and storage resources.

## Comparing Kubernetes and Docker Swarm

Previously, Docker Swarm enabled us to manage clusters of Docker hosts, automatically deploying container instances to ensure high availability and load balancing. In contrast, a Kubernetes cluster consists of a master node and multiple worker nodes. The master node orchestrates tasks such as scheduling, monitoring, restarting failed containers, and auto-scaling.

The image below compares Docker Swarm and Kubernetes cluster architectures:

![The image compares Docker Swarm and Kubernetes cluster architectures, showing Swarm Manager and Workers versus Kubernetes Master and Nodes/Minions.](https://kodekloud.com/kk-media/image/upload/v1752874116/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_160.jpg)

## Kubernetes Pods: The Building Blocks

A fundamental difference between Docker Swarm and Kubernetes is the use of pods in Kubernetes. Each pod acts as a logical host for one or more containers. Although many applications maintain a one-to-one mapping between pods and containers, pods can also house multiple containers that work in close collaboration. For example, one container might manage web requests while another processes backend tasks, sharing the same network namespace and storage volumes.

The following image illustrates a typical Kubernetes pod structure featuring two containers with shared storage and an assigned IP address on a worker node:

![The image illustrates a Kubernetes pod structure, showing two containers, shared storage, and an IP address within a "Kube Worker" node.](https://kodekloud.com/kk-media/image/upload/v1752874118/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_320.jpg)

This grouping mechanism allows all containers within a pod to share the same lifecycle—ensuring they are deployed, scaled, and terminated together.

## Deployments and Services in Kubernetes

In Docker Swarm, we relied on services to maintain high availability and load balancing by deploying multiple container instances. Kubernetes achieves a similar goal using Deployments, which create ReplicaSets to ensure that the desired number of pod instances are always running.

Kubernetes Services provide network connectivity both internally and externally:

- **Internal-Facing Services:** Manage communication between different pods (e.g., between a web service and its corresponding database).
- **External-Facing Services:** Use load balancers to expose specific ports for external access.

The images below illustrate the Kubernetes services architecture and compare concepts between Docker Swarm services and Kubernetes deployments:

![The image illustrates Kubernetes pods, each containing two containers, storage, and an IP address, labeled under "Kube Worker."](https://kodekloud.com/kk-media/image/upload/v1752874119/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_370.jpg)

![The image compares Docker Swarm services with Kubernetes deployment, illustrating web server configurations on worker nodes and pods within respective clusters.](https://kodekloud.com/kk-media/image/upload/v1752874120/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_400.jpg)

![The image illustrates a Kubernetes services architecture, showing Docker Swarm links, with pods for voting-app, result-app, redis, db, and worker, connected via services.](https://kodekloud.com/kk-media/image/upload/v1752874122/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_450.jpg)

## Managing Kubernetes with kubectl

Kubernetes is primarily managed using the `kubectl` command-line interface. Below are a few examples of common `kubectl` commands:

- **Creating a Pod from a Definition File:**

  ```
  kubectl create -f pod-definition.yml
  ```

- **Listing All Pods and Their Statuses:**

  ```
  kubectl get pods
  ```

- **Getting Detailed Information about a Specific Pod:**

  ```
  kubectl describe pods
  ```

Much like Docker Compose files in Docker Swarm, Kubernetes uses YAML files to define pods, deployments, and services. These YAML definitions typically include the following sections:

| Section  | Description                                                |
| -------- | ---------------------------------------------------------- |
| version  | Specifies the API version or schema version                |
| kind     | Defines the resource type (pod, deployment, service)       |
| metadata | Contains data such as the name and labels                  |
| spec     | Describes the resource configuration (images, ports, etc.) |

## Creating a Simple Pod Definition

Below is an example of a Kubernetes YAML file that defines a basic pod running an Nginx container. The pod is named "my-nginx" and exposes port 80:

```
apiVersion: v1
kind: pod
metadata:
  name: my-nginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
```

Once this file (e.g., named `pod-definition.yml`) is created, deploy the pod using:

```
kubectl create -f pod-definition.yml
```

Kubernetes reads the definition file and configures the pod as specified. Similarly, you can create separate YAML files for different components of your application (pods, deployments, or services) and apply them using the `kubectl create` command.

## Deploying a Voting Application on Kubernetes

Let's put theory into practice with an example: deploying a voting application on a Kubernetes cluster. In this scenario, assume your Kubernetes cluster is already operational. The objectives include deploying five different Docker containers for components such as Redis, Postgres (for the database), voting app, results app, and a worker application.

The deployment process involves:

1.  Creating pods for each component.
2.  Configuring internal services for pod-to-pod communication (e.g., ensuring the voting app connects to Redis).
3.  Setting up external load balancer services for the voting and results apps.

The image below provides an overview of a sample voting app architecture using Kubernetes pods and services:

![The image illustrates an example voting app architecture using Kubernetes pods and services, including components like voting-app, result-app, Redis, database, and worker, with deployment steps.](https://kodekloud.com/kk-media/image/upload/v1752874122/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Kubernetes-Introduction/frame_760.jpg)

> [!important]
> **Deployment Tip**
>
> Ensure that your YAML definition files are correctly configured and validated before deploying to minimize errors during runtime.

## Next Steps

This introduction has highlighted several key differences between Kubernetes and Docker Swarm and demonstrated the power of Kubernetes in orchestrating complex applications. Although this lesson provides a high-level overview, mastering Kubernetes requires further exploration.

Now, let’s move on to a live demo where we deploy Docker containers on Kubernetes using two different platforms: a Kubernetes playground and Google Cloud Platform.

Thank you for your time, and I look forward to seeing you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9b8ffcd1-c5b0-45d0-968d-55a5146c3e39/lesson/60ad5136-ee70-4552-b089-50faeefd39e7)**
>
> Watch video content
