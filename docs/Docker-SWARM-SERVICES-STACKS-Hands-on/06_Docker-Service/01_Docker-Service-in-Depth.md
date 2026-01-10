# Docker Service in Depth - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Service/Docker-Service-in-Depth)

---

## Table of Contents

- Docker Service in Depth
  - Introducing Docker Swarm and Services
  - Service Distribution Scenarios
  - Types of Docker Services
  - Updating Services
  - Next Steps
  - Watch Video
    - 1. Replicated Services
    - 2. Global Services

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Service

# Docker Service in Depth

Hello and welcome to this in-depth lesson on Docker services. I’m Mumshad Mannambeth, and in this session we will dive into advanced Docker concepts, focusing on Docker services within a Swarm Cluster.

Previously, we learned how to run an application on a single Docker host using the familiar `docker run` command. For example, to start an instance of a web server:

```
docker run my-web-server
```

This command creates a single container instance that serves your web application. However, when scaling an application to support a larger number of users, managing containers individually across many nodes becomes impractical. Manually logging into each node to execute `docker run`, setting up load balancing, and monitoring each instance is simply not scalable.

> [!important]
> **Key Concept**
>
> Docker Swarm orchestration automates container management by running multiple instances of your service across a cluster of nodes.

## Introducing Docker Swarm and Services

Docker Swarm provides orchestration that automatically manages and maintains multiple instances (tasks) of your service. The key component is the Docker service, which represents one or more containers running a single application across the Swarm Cluster.

For instance, to create a service running multiple instances of your web server using the manager node, use:

```
docker service create --replicas=3 --name web-server my-web-server
```

You can also add options such as network attachment or port mapping. For example:

```
docker service create --replicas=3 --network frontend my-web-server
docker service create --replicas=3 -p 8080:80 my-web-server
```

When you execute the `docker service create` command, the manager node’s orchestrator determines the number of tasks (each corresponding to one container instance) to create. The scheduler then assigns these tasks to worker nodes, ensuring that if a container fails, the manager is notified and a new task is automatically rescheduled.

## Service Distribution Scenarios

Consider these scenarios when deploying services in your cluster:

- **Limited Nodes:** If you have only two worker nodes and request three replicas, Docker Swarm will distribute the three containers across the available nodes.
- **Spare Capacity:** With four worker nodes and a service defined with three replicas, three nodes run one container each, leaving one node idle. However, if one of the active nodes fails, Swarm will relaunch a container on an available node to maintain the desired replica count.

## Types of Docker Services

Docker Swarm provides two primary types of services:

### 1\. Replicated Services

With replicated services, you define the desired number of container instances using the `--replicas` option, regardless of the number of available worker nodes. This is ideal for scalable applications such as web servers. For example:

```
docker service create --replicas=3 --name web-server my-web-server
```

### 2\. Global Services

Global services run exactly one instance on every worker node. This model is perfect for use cases such as monitoring agents, log collectors, or antivirus scanners that need to operate on all nodes in your cluster. To deploy a monitoring agent across all nodes, run:

```
docker service create --mode global my-monitoring-agent
```

> [!important]
> **Service Naming**
>
> If you do not specify a custom name, Docker swarms automatically generate a memorable name for your service. When you use the `--name` option, Docker Swarm appends a unique number to each container’s name to ensure distinction within the cluster.

## Updating Services

Scaling a service is straightforward with Docker Swarm. Suppose you created a service with three replicas and later need to scale up to four instances. Instead of recreating the service, simply update it with the new replica count:

```
docker service update --replicas=4 web-server
```

This command instructs Docker Swarm to adjust your deployment so that four container instances of the service are running at all times.

## Next Steps

Let’s now proceed to a demo where these concepts are put into practice. Once you’ve completed the demo, be sure to explore the coding exercises for hands-on experience with these Docker service commands.

Thank you for following along in this lesson, and see you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/438444ef-50af-45e0-87e2-cdba1492962f/lesson/2a48e3cd-282f-4c4b-bedb-0fea11ad8445)**
>
> Watch video content
