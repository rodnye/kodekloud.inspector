# Demo Docker Cloud - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-on-Cloud/Demo-Docker-Cloud)

---

## Table of Contents

- Demo Docker Cloud
  - Accessing Docker Cloud
  - Configuring Cloud Integration
  - Provisioning a Node Cluster
  - Creating the Application Stack
  - Using the Voting Application
  - Exploring Docker Swarm Mode (Beta Feature)
  - Conclusion
  - Watch Video
    - Dashboard Overview
    - Preparing the Stack File
    - Stack File Breakdown
    - Monitoring Deployment

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker on Cloud

# Demo Docker Cloud

Welcome to this technical walkthrough on deploying a Voting Application using Docker Cloud. In this lesson, you'll learn how to integrate Docker Cloud with AWS, set up a node cluster, and deploy a streamlined stack for the application. For further details on Docker Cloud, visit [Docker Cloud](https://cloud.docker.com).

## Accessing Docker Cloud

1.  Navigate to [cloud.docker.com](https://cloud.docker.com) and click on **Sign In**.
2.  Log in with your credentials (for demonstration purposes, a test user is used).
3.  After logging in, the dashboard displays key features including Docker Registry as a service, continuous integration, and continuous deployment.

### Dashboard Overview

- **Repositories**: Lists your repositories. (In this demo, none will be listed.)
- **Stacks**: Shows your deployed stacks (e.g., an older stack might appear in the terminated state).
- **Infrastructure**: Lists your provisioned resources.

![The image shows a Docker Cloud interface with a terminated stack named "example-voting-app-stack" under the "Stacks" section.](https://kodekloud.com/kk-media/image/upload/v1752874090/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Cloud/frame_80.jpg)

## Configuring Cloud Integration

When you log into Docker Cloud for the first time, the recommended first step is to integrate Docker Cloud with a cloud solution provider.

1.  Navigate to **Cloud Settings**.
2.  Under **Cloud Providers**, choose **Amazon Web Services (AWS)**.
3.  Click on **Connect Provider** and enter your AWS credentials. Detailed instructions are available through the provided link within the interface.
4.  Copy the AWS ARN from your AWS account, paste it into the required field, and click **Save**. Once integrated, the icon changes to confirm successful connection.

![The image shows a Docker Cloud interface displaying node clusters, with one terminated cluster named "example-voting-app3" in the us-east-1 region.](https://kodekloud.com/kk-media/image/upload/v1752874091/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Cloud/frame_100.jpg)

## Provisioning a Node Cluster

Before deploying the application stack, you must create a cluster:

1.  Navigate to **Node Clusters** and click on **Create**.
2.  Name the cluster (e.g., "example Voting Application").
3.  Select **Amazon Web Services** as your provider.
4.  Choose the region (e.g., **US East**) and leave other settings as default.
5.  Set the number of nodes to one, select an appropriate instance size (for example, T2 Medium), and click **Launch Node Cluster**.

![The image shows a Docker Cloud interface for setting up a node cluster, with options for provider, region, disk size, and number of nodes.](https://kodekloud.com/kk-media/image/upload/v1752874092/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Cloud/frame_210.jpg)

> [!important]
> **Note**
>
> Be sure to wait until the node cluster deployment completes before moving on to deploy the application stack.

## Creating the Application Stack

### Preparing the Stack File

Navigate to **Stacks** and click on **Create**. Docker Cloud will prompt you to provide a stack file. Although this file is similar to a Docker Compose file, it includes adjustments specific to Docker Cloud.

For reference, here is the base version of the stack file from the example voting application repository:

```
lb:
  image: dockercloud/haproxy
  links:
    - web
  ports:
    - "80:80"
  roles:
    - global
web:
  image: dockercloud/quickstart-python
  links:
    - redis
  target_num_containers: 4
redis:
  image: redis
```

Scroll down the repository to locate the "Docker cloud.yaml" file. Initially, its content might have looked like this:

```
image: 'postgres:9.4'
restart: always
redis:
  image: 'redis:latest'
  restart: always
result:
  autoredeploy: true
  image: 'docker/example-voting-app-result:latest'
  ports:
    - "80:80"
  restart: always
lb:
  autoredeploy: true
  image: 'dockercloud/haproxy:latest'
  links:
    - vote
  ports:
    - "80:80"
  roles:
    - global
  restart: always
vote:
  autoredeploy: true
  image: 'docker/example-voting-app-vote:latest'
  restart: always
  target_num_containers: 5
worker:
  autoredeploy: true
  image: 'docker/example-voting-app-worker:latest'
  restart: always
```

Since the original file contained extra services and load balancer configurations that are not needed for our simplified deployment, we removed the unnecessary sections. The final version of the stack file appears as follows:

```
db:
  image: 'postgres:9.4'
  restart: always
redis:
  image: 'redis:latest'
  restart: always
result:
  autoredeploy: true
  image: 'docker/example-voting-app-result:latest'
  ports:
    - '80:80'
  restart: always
vote:
  autoredeploy: true
  image: 'docker/example-voting-app-vote:latest'
  restart: always
  ports:
    - '5000:80'
worker:
  autoredeploy: true
  image: 'docker/example-voting-app-worker:latest'
  restart: always
```

### Stack File Breakdown

- **db**: Uses the PostgreSQL image (`postgres:9.4`) with restart set to always.
- **redis**: Uses the latest Redis image.
- **result**: Configured with autoredeploy enabled, exposes port 80 on the host.
- **vote**: Configured with autoredeploy enabled and maps port **5000** on the host to port 80 in the container.
- **worker**: Uses the worker image with autoredeploy enabled.

> [!important]
> **Deployment Tip**
>
> After pasting the final stack file into the Docker Cloud stack creation form, click **Create** to deploy. Docker Cloud will automatically detect and deploy the five identified services.

### Monitoring Deployment

Once the stack is deployed:

- Monitor the status until all services display green indicators, signifying that they are running.
- The stack file remains visible at the bottom of the page.
- Under **Endpoints**, you can access links to your application services.

Below is a reiteration of the final stack file for clarity:

```
db:
  image: 'postgres:9.4'
  restart: always
redis:
  image: 'redis:latest'
  restart: always
result:
  autoredeploy: true
  image: 'docker/example-voting-app-result:latest'
  ports:
    - '80:80'
  restart: always
vote:
  autoredeploy: true
  image: 'docker/example-voting-app-vote:latest'
  ports:
    - '5000:80'
worker:
  autoredeploy: true
```

## Using the Voting Application

- Click on the **voting application endpoint** to open the application.
- Click on the **results endpoint** to view updated voting results.
- Cast a vote and observe the checkmark confirmation indicating successful integration with Redis.
- Updated vote counts will be displayed accordingly for each option selected.

![The image shows a Docker Cloud interface displaying the status of an "EXAMPLE-VOTING-APP" stack, with services and endpoints listed.](https://kodekloud.com/kk-media/image/upload/v1752874093/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Cloud/frame_440.jpg)

![The image shows a voting result with "Cats" at 0% and "Dogs" at 100%, totaling 1 vote.](https://kodekloud.com/kk-media/image/upload/v1752874094/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Cloud/frame_470.jpg)

## Exploring Docker Swarm Mode (Beta Feature)

Docker Cloud also includes a beta feature called **Swarm Mode**. By toggling the switch on the interface, you can switch your view to Docker Swarm Mode. This feature enables you to create and manage a Docker Swarm on AWS.

> [!important]
> **Explore Swarm Mode**
>
> If you are interested in orchestration and cluster management, feel free to explore these beta features.

## Conclusion

This walkthrough demonstrated how to deploy the example Voting Application on Docker Cloud by:

- Logging into Docker Cloud and exploring its dashboard.
- Integrating Docker Cloud with AWS.
- Provisioning a node cluster.
- Creating and deploying a customized stack file.
- Monitoring service status and accessing application endpoints.

Thank you for following this lesson. For more information, visit the [Docker Documentation](https://docs.docker.com/). See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/4cf8870d-54e8-4897-8fbe-e8ee9215e405/lesson/23ab942f-3dff-4fd1-83c8-0d21a229d5c4)**
>
> Watch video content
