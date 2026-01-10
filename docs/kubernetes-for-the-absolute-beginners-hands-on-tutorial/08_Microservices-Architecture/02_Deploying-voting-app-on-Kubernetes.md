# Deploying voting app on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Microservices-Architecture/Deploying-voting-app-on-Kubernetes)

---

## Table of Contents

- Deploying voting app on Kubernetes
  - Deployment Plan
  - Pods and Kubernetes Objects
  - Connectivity Between Components
  - Exposing External Applications
  - High-Level Architecture Overview
  - Docker Images
  - Watch Video

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Microservices Architecture

# Deploying voting app on Kubernetes

In this guide, we transition from deploying the voting application on Docker to deploying it on Kubernetes. With a solid understanding of how the application components interact, the next step is to deploy its containers on a Kubernetes cluster, ensuring proper connectivity between them. This approach allows the applications to communicate with their respective databases and enables external access via a web browser for both the voting and result apps.

## Deployment Plan

Our objective is to deploy multiple containers as pods (and later as ReplicaSets or Deployments) within the Kubernetes cluster. The primary components of the voting application include:

- **Voting App:**  
  Provides the user interface for submitting votes and runs a Python web server on port 80.
- **Result App:**  
  Displays voting results and runs a Node.js server on port 80.
- **Worker App:**  
  Processes votes by reading from Redis and updating PostgreSQL; this component runs in the background and does not require direct access.
- **Redis Database:**  
  Acts as the datastore for votes, listening on port 6379. It is accessed by both the voting app (to record votes) and the worker app (to process votes).
- **PostgreSQL Database:**  
  Maintains aggregated vote counts with a service listening on port 5432. It is accessed by the worker app (to update votes) and the result app (to display results).

> [!important]
> **Note**
>
> Even though inter-component communication is critical, the worker app functions solely as a background processor and is not directly accessed by external users.

## Pods and Kubernetes Objects

Kubernetes deploys containers inside a pod—the smallest deployable unit. In this lesson, we start by deploying each component as an individual pod. You can later convert these pod definitions into Deployments to leverage advanced features like scaling, rolling updates, and self-healing.

## Connectivity Between Components

For reliable inter-component communication, Kubernetes services are used instead of direct pod IP addressing, which can change upon pod restarts. The following services are configured:

- **Redis Service:**  
  A Kubernetes service will expose the Redis pod internally. Both the voting app and the worker app require access to Redis. The service is named “Redis” to match the hard-coded host details in the source code of these applications. Although using environment variables would be preferable to hard-coding, we follow the current design for simplicity.
- **PostgreSQL Service:**  
  Similarly, a service is created for the PostgreSQL pod. The worker and result apps expect the database to be available at “DB,” so the PostgreSQL service is named “DB.” Be sure to set the initial credentials (username and password as "Postgres") during deployment.

Both internal services are configured with a ClusterIP, ensuring that they are accessible only within the cluster.

## Exposing External Applications

To provide external access for the voting and result applications, services with a NodePort type are created. These services require specification of a high port number (greater than 30,000) to allow external network traffic.

## High-Level Architecture Overview

The overall deployment consists of five pods and four services configured as follows:

- Two internal services (ClusterIP) for Redis and PostgreSQL.
- Two external-facing services (NodePort) for the voting and result apps.
- The worker pod does not have an associated service, as it does not expose an interface for external access.

![Diagram of a Kubernetes-based voting app architecture with pods for voting, result, Redis, Postgres, and worker, detailing service connections and deployment steps.](https://kodekloud.com/kk-media/image/upload/v1752884956/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deploying-voting-app-on-Kubernetes/frame_420.jpg)

A common question arises: Why does the worker app not require a service? Since it does not run a web server or any other externally accessible process, it only functions as a background processor, making an exposed endpoint unnecessary.

## Docker Images

Before deployment, ensure you have the correct Docker images available. The images for the application components are built from a fork of the original repository available at Docker samples. The image names are:

- KodeKloud/example-voting-app_vote:v1
- KodeKloud/example-voting-app_worker:v1
- KodeKloud/example-voting-app_result:v1

For the databases, the official images for Redis and PostgreSQL will be used.

![The image illustrates a Kubernetes deployment diagram for a voting app, showing pods for voting, results, Redis, Postgres, and worker, with service connections.](https://kodekloud.com/kk-media/image/upload/v1752884957/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Deploying-voting-app-on-Kubernetes/frame_480.jpg)

> [!important]
> **Upcoming Demo**
>
> This article lays the groundwork for the deployment. In the next demonstration, you will see these concepts implemented in a live environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/a603e70d-8473-4de4-aec9-7cc76c396ad3/lesson/0e896dbf-e057-4324-9a6a-5a7114232513)**
>
> Watch video content
