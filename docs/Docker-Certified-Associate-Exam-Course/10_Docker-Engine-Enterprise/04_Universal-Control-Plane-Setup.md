# Universal Control Plane Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Universal-Control-Plane-Setup)

---

## Table of Contents

- Universal Control Plane Setup
  - What Is Universal Control Plane?
  - UCP Architecture Overview
  - Installing Universal Control Plane
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Universal Control Plane Setup

In this lesson, we’ll dive into Docker’s Universal Control Plane (UCP), an enterprise-grade solution for cluster management. You’ll learn about its architecture, core components, and a step-by-step installation guide.

---

## What Is Universal Control Plane?

The Universal Control Plane (UCP) provides a unified management portal—via a web UI or Docker CLI—to monitor and control your Docker Swarm clusters. UCP is designed for production environments, offering:

| Feature                          | Description                                                          |
| -------------------------------- | -------------------------------------------------------------------- |
| LDAP & Active Directory support  | Centralized authentication and directory integration                 |
| Role-Based Access Control (RBAC) | Fine-grained permissions for users and teams                         |
| Multi-Platform Workers           | Manage Linux and Windows worker nodes (Linux only for manager nodes) |
| Web UI & CLI Management          | Flexible control through a graphical interface or Docker commands    |

> [!important]
> **Note**
>
> UCP runs on [Docker Swarm](https://docs.docker.com/engine/swarm/) under the hood, extending it with enterprise security, monitoring, and governance features.

---

## UCP Architecture Overview

UCP deploys a **global** service called the UCP agent on every node—manager or worker. This agent orchestrates the following core components as containers:

- **Web UI**: Central dashboard for cluster health and resource usage
- **Authentication API**: Handles login, LDAP/AD integration, and token issuance
- **Metrics Server**: Collects and displays performance data
- **Proxy**: Routes API requests and enforces security policies
- **Data Stores**: Persist configuration, state, and audit logs

On worker nodes, the UCP agent also spins up a dedicated _ucp-proxy_ that mediates all Docker API calls, ensuring only authorized users and services can execute commands.

In addition, UCP provisions essential Kubernetes binaries—like `kube-controller-manager` and `kubelet`—to enable optional Kubernetes orchestration alongside Docker Swarm. For a complete breakdown, see the [UCP architecture documentation](https://docs.docker.com/ee/ucp/latest/architecture/).

| Service Type       | Role                                            |
| ------------------ | ----------------------------------------------- |
| Global (UCP Agent) | Runs one container on each node                 |
| Replica            | Scales specified containers across the cluster  |
| Worker Proxy       | Secures and filters Docker API calls on workers |

![The image is a diagram of a Docker Swarm setup, showing a manager node and worker nodes with components like "ucp-agent" and "ucp-proxy," and indicating compatibility with Linux and Windows.](https://kodekloud.com/kk-media/image/upload/v1752873890/notes-assets/images/Docker-Certified-Associate-Exam-Course-Universal-Control-Plane-Setup/docker-swarm-setup-diagram.jpg)

---

## Installing Universal Control Plane

Follow these steps to deploy UCP on your Docker Enterprise Engine:

1.  **Verify Prerequisites**
    - Docker Enterprise Engine installed and running
    - Network connectivity between nodes
2.  **Pull the UCP Installer**

    ```
    docker pull docker/ucp:<version>
    ```

3.  **Run the Installer Container**

    ```
    docker run --rm -it \
      --name ucp-install \
      -v /var/run/docker.sock:/var/run/docker.sock \
      docker/ucp:<version> install \
      --host-address <MANAGER-IP> \
      --admin-username admin \
      --admin-password <strong-password>
    ```

4.  **Access the UCP Web UI**  
    Navigate to `https://<MANAGER-IP>:8443` in your browser.
5.  **Upload Docker License**  
    When prompted, upload your Docker Enterprise license file to activate UCP.
6.  **Join Additional Nodes**  
    Use the “Add Node” option in the UCP console to onboard more managers or workers.

> [!important]
> **Warning**
>
> Keep your `admin-password` secure and rotate it periodically. Avoid using weak or reused passwords.

![The image outlines steps for setting up UCP (Universal Control Plane) with Docker EE, including running a container, setting admin credentials, and adding managers and workers.](https://kodekloud.com/kk-media/image/upload/v1752873890/notes-assets/images/Docker-Certified-Associate-Exam-Course-Universal-Control-Plane-Setup/ucp-setup-docker-ee-steps.jpg)

---

A hands-on demonstration will follow, illustrating these installation steps and best practices for scaling your UCP-managed cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/9d977879-7bd7-4f6f-9000-a985b3d452be)**
>
> Watch video content
