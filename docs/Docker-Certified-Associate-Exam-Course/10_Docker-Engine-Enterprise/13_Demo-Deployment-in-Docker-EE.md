# Demo Deployment in Docker EE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Demo-Deployment-in-Docker-EE)

---

## Table of Contents

- Demo Deployment in Docker EE
  - Prerequisites
  - Step-by-Step: Deploying a Swarm Service
  - Verifying Deployment
  - References
  - Watch Video
    - 1. Access the UCP Console
    - 2. Create a New Service
    - 3. Adjust Scheduling Policies
    - 4. Define Environment Variables
    - 5. Allocate Resources
    - 6. Configure Logging
    - 7. Publish Service Ports

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Demo Deployment in Docker EE

---

title: Demo Deployment in Docker EE with UCP description: Step-by-step guide to deploy and manage a Swarm service in Docker EE using the Universal Control Plane (UCP) console.

---

## Prerequisites

- A running Docker EE UCP cluster
- Access rights to create and manage services

> [!important]
> **Note**
>
> Ensure you are logged into the UCP console with an account that has the `admin` or `cluster_admin` role.

## Step-by-Step: Deploying a Swarm Service

### 1\. Access the UCP Console

Open your browser and navigate to:

```
https://<ucp-domain>/
```

From the left menu, click **Swarm** → **Services**. If no services exist, you’ll see an empty list.

### 2\. Create a New Service

Click **Create** and configure the **Details** tab:

| Setting | Value          |
| ------- | -------------- |
| Name    | `KodeKloud`    |
| Image   | `nginx:latest` |

Leave all other options at their defaults.

![The image shows a "Create Service" interface for Docker, with options for setting service mode, scale, constraints, and update configuration. The interface includes tabs for details, collection, scheduling, network, environment, resources, and logging.](https://kodekloud.com/kk-media/image/upload/v1752873848/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deployment-in-Docker-EE/docker-create-service-interface.jpg)

### 3\. Adjust Scheduling Policies

Switch to the **Scheduling** tab to modify:

- Service mode (replicated or global)
- Replica count
- Placement constraints
- Update policy (parallelism, delay)

### 4\. Define Environment Variables

On the **Environment** tab, you can:

- Add `Environment Variables`
- Attach `Secrets` and `Configs`
- Assign service `Labels`

![The image shows a "Create Service" interface in a Docker management console, with options to configure secrets, configurations, environment variables, and labels. The sidebar includes sections like Details, Collection, Scheduling, Network, Environment, Resources, and Logging.](https://kodekloud.com/kk-media/image/upload/v1752873849/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deployment-in-Docker-EE/docker-create-service-interface-2.jpg)

### 5\. Allocate Resources

Use the **Resources** tab to reserve or limit CPU and memory. Configure volume mounts if needed.

### 6\. Configure Logging

Select a logging driver (e.g., `json-file`, `syslog`) and set driver options under the **Logging** tab.

### 7\. Publish Service Ports

Under **Network**, map the service ports for external access:

| Port Setting   | Value |
| -------------- | ----- |
| Mode           | `tcp` |
| Target Port    | `80`  |
| Published Port | `82`  |

Click **Confirm**, review your settings, then **Create**.

![The image shows a web interface for creating a service in Docker Enterprise, specifically focusing on network settings such as endpoint specifications, ports, and protocols. Options for mode, target port, protocol, and publish mode are visible, with buttons to cancel or confirm the configuration.](https://kodekloud.com/kk-media/image/upload/v1752873850/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deployment-in-Docker-EE/docker-enterprise-service-configuration.jpg)

## Verifying Deployment

After creation, the service appears in _Pending_ (red) and then becomes _Running_ (green). Click the service name to view details and endpoint information.

![The image shows a Docker Enterprise interface displaying details of a service named "kodekloudtest," including its ID, image, creation time, and endpoint.](https://kodekloud.com/kk-media/image/upload/v1752873851/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deployment-in-Docker-EE/docker-enterprise-kodekloudtest-service.jpg)

Copy and open the endpoint URL in your browser:

```
http://<ucp-node-address>:82
```

You’ll see the default NGINX welcome page, confirming external access is working.

> [!important]
> **Cleanup**
>
> To remove the service, select it, choose **Actions** → **Delete**, and confirm the prompt.

![The image shows a confirmation dialog for deleting a service named "kodekloudtest" with options to cancel or confirm the deletion.](https://kodekloud.com/kk-media/image/upload/v1752873851/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Deployment-in-Docker-EE/delete-service-kodekloudtest-confirmation-dialog.jpg)

## References

- [Docker Enterprise Documentation](https://docs.docker.com/ee/ucp/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Kubernetes vs. Swarm](https://docs.docker.com/engine/swarm/stack-deploy/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/0ed35cf3-2521-4b27-8156-e324f1ed9351)**
>
> Watch video content
