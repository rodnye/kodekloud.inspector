# Docker Stacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Stacks/Docker-Stacks)

---

## Table of Contents

- Docker Stacks
  - From Single Containers to Application Stacks
  - Understanding the Docker Stack Hierarchy
  - Deploying an Application on a Multi-Node Swarm Cluster
  - Configuring a Stack for Docker Swarm
  - Watch Video
    - Deploying with Docker Swarm
    - Placement Constraints
    - Limiting Resource Usage

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Stacks

# Docker Stacks

Welcome to this in-depth guide on Docker Stacks. I’m Mumshad Mannambeth, and in this article we’ll explore advanced Docker concepts to help you deploy and manage application stacks more efficiently. Instead of running multiple individual containers with the Docker run command, you can now define your entire application stack in a single Docker Compose file and launch it effortlessly.

## From Single Containers to Application Stacks

Previously, you might have deployed your services with commands like:

```
docker run mmumshad/simple-webapp
docker run mongodb
docker run redis:alpine
docker run ansible
```

With Docker Stacks, these individual commands can be consolidated into a single Docker Compose file:

```
# docker-compose.yml
services:
  web:
    image: "mmumshad/simple-webapp"
  database:
    image: "mongodb"
  messaging:
    image: "redis:alpine"
  orchestration:
    image: "ansible"
```

Start your complete stack with:

```
docker-compose up
```

### Deploying with Docker Swarm

When deploying on Docker Swarm, the concept is similar but offers additional flexibility. Instead of using the Docker run command, you create services for each component. For instance:

```
docker service create mmumshad/simple-webapp
docker service create mongodb
docker service create redis
docker service create ansible
```

You can define the entire stack for Docker Swarm in a Compose file using version 3 format:

```
version: 3
services:
  web:
    image: "mmumshad/simple-webapp"
  database:
    image: "mongodb"
  messaging:
    image: "redis:alpine"
  orchestration:
    image: "ansible"
```

Deploy the complete stack with:

```
docker stack deploy
```

This method enables you to manage your entire application configuration in one file, simplifying the process of scaling and monitoring multiple instances of your services.

---

## Understanding the Docker Stack Hierarchy

Understanding the hierarchy within Docker helps you manage resources effectively. Here's a breakdown of the Docker stack hierarchy:

- **Container:** A packaged unit of an application with all its dependencies.
- **Service:** One or more instances of the same container running on one or more nodes. For example, running several instances of a web application creates a service.
- **Stack:** A collection of interrelated services that form a complete application.

Consider the following diagram that illustrates these relationships:

![The image shows a person explaining a diagram about containers and services in a stack, with visual representations of containerized applications.](https://kodekloud.com/kk-media/image/upload/v1752874076/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Stacks/frame_140.jpg)

In this diagram, multiple web containers are combined to form a service, alongside a separate messaging service (Redis) with a single container and a database service running two containers. Together, these elements compose a full application stack.

![The image illustrates a hierarchical structure of stack, service, and container, with a person explaining the concept.](https://kodekloud.com/kk-media/image/upload/v1752874077/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Stacks/frame_190.jpg)

---

## Deploying an Application on a Multi-Node Swarm Cluster

Let’s examine a scenario where you deploy an application on a Docker Swarm Cluster with five nodes (four worker nodes and one manager node). Consider the following deployment details:

- **Redis Service:** One instance, which Docker Swarm deploys on any available worker node.
- **PostgreSQL Database:** Should reside on a manager node using placement constraints.
- **Voting Application:** Due to high traffic, this application runs two instances, and you may also run separate Result and Worker services.

The diagram below represents a sample multi-node cluster setup:

![The image shows a presentation slide about a sample application in Docker Swarm, featuring manager and worker nodes with various software icons, alongside a presenter.](https://kodekloud.com/kk-media/image/upload/v1752874079/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Stacks/frame_250.jpg)

Docker Swarm optimizes container placement automatically unless specific constraints are provided. You can also configure resource limits per service; for example, the Redis service might use a maximum of 5% of the CPU and 50 MB of memory per host.

---

## Configuring a Stack for Docker Swarm

Stacks in Docker Swarm are defined using YAML files similar to Docker Compose files, but they use version 3 to include swarm-specific properties under the deploy key. Below is a basic configuration example:

```
version: 3
services:
  redis:
    image: redis
    deploy:
      replicas: 1
  db:
    image: postgres:9.4
    deploy:
      replicas: 1
  vote:
    image: voting-app
    deploy:
      replicas: 2
  result:
    image: result
    deploy:
      replicas: 1
  worker:
    image: worker
    deploy:
      replicas: 1
```

### Placement Constraints

To ensure that the database service runs on a specific node (e.g., a manager node), use placement constraints:

```
version: 3
services:
  db:
    image: postgres:9.4
    deploy:
      placement:
        constraints:
          - node.hostname == node1
          - node.role == manager
```

### Limiting Resource Usage

To prevent a service from consuming excessive resources, you can set resource limits. For example, to restrict Redis resource usage:

```
version: 3
services:
  redis:
    image: redis
    deploy:
      replicas: 1
      resources:
        limits:
          cpus: '0.01'
          memory: 50M
```

> [!important]
> **Important**
>
> Keep in mind that these configurations allow for scalable deployment and resource management. For more advanced options, refer to the latest Docker documentation.

---

While numerous options and properties exist for configuring Docker Stacks, it’s crucial to understand the core concepts to adapt them to real-world applications. For the most current best practices and sample templates, always refer to the [Docker Documentation](https://docs.docker.com/).

Ready to put these concepts into practice? Continue to the demo section and experiment with the provided configurations to create your own stack file.

That’s it for this comprehensive guide on Docker Stacks—see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9c0c70f2-8fd8-459d-b5fb-6c70585ad4a7/lesson/7ab62eca-09bc-4baa-bfe5-f251a0e8c329)**
>
> Watch video content
