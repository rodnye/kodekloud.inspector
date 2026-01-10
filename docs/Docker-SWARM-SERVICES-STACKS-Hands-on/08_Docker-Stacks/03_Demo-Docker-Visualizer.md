# Demo Docker Visualizer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Stacks/Demo-Docker-Visualizer)

---

## Table of Contents

- Demo Docker Visualizer
  - Introducing Docker Visualizer
  - Deploying Docker Visualizer on Your Docker Swarm Cluster
  - Example: Deploying a Docker Stack
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Stacks

# Demo Docker Visualizer

In this lesson, you will learn how to monitor your Docker Swarm cluster and manage its services through a visual interface. While the command-line tools `docker service ls` and `docker service ps` are effective for checking which services are running on which nodes, they can become cumbersome as your cluster scales.

> [!important]
> **Tip**
>
> For clusters with multiple nodes and services, consider using Docker Visualizer to simplify monitoring and management.

## Introducing Docker Visualizer

Docker Visualizer is a user-friendly tool available on Docker Hub under Docker Samples. Look for the image named "visualizer" when browsing Docker Samples. The help section on its Docker Hub page provides all necessary instructions for running the tool.

## Deploying Docker Visualizer on Your Docker Swarm Cluster

To deploy Docker Visualizer, execute the following commands on your Docker master node. This first command creates a Docker service for the visualizer:

```
docker service create \
  --name=viz \
  --publish=8080:8080/tcp \
  --constraint=node.role=manager \
  --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  dockersamples/visualizer
```

If you're using an ARM-based system, build the image with the ARM-specific Dockerfile using:

```
docker build -f Dockerfile.arm -t visualizer-arm:latest .
```

Alternatively, you can run the visualizer as a standalone interactive container. This command binds the host's Docker socket and maps port 8080:

```
docker run -it -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
```

Once the container launches, Docker will download the image if it is not already available locally. Open your web browser and navigate to:

http://<your-docker-master>:8080

This interface displays your Docker Swarm cluster topology, including the master node, worker nodes, and the details of individual services and containers.

## Example: Deploying a Docker Stack

Below is an example of deploying a Docker stack for an application. The output shows the creation of various services and provides a snapshot of the current state of your Docker services:

```
root@docker-master:/root/voting-app-stack# docker stack deploy voting-app-stack --compose-file docker-stack.yml
Creating service voting-app-stack_db
Creating service voting-app-stack_worker
Creating service voting-app-stack_result
Creating service voting-app-stack_vote
Creating service voting-app-stack_redis
root@docker-master:/root/voting-app-stack# docker service ls
ID                  NAME                             MODE                REPLICAS            IMAGE                                        PORTS
2nq2ztvpy61        voting-app-stack_vote            replicated          2/2                dockersamples/examplevotingapp_vote:latest   *:5000->80/tcp
aeoxuz73m4tr       voting-app-stack_result          replicated          0/1                dockersamples/examplevotingapp_result:latest  *:5001->80/tcp
i6xh43nVj60        voting-app-stack_redis           replicated          1/1                redis:latest
khiivku6vbt2       voting-app-stack_db              replicated          1/1                postgres:9.4
roz4lu9f823x       voting-app-stack_worker           replicated          0/1                dockersamples/examplevotingapp_worker:latest
root@docker-master:/root/voting-app-stack# docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
Unable to find image 'dockersamples/visualizer:latest' locally
latest: Pulling from dockersamples/visualizer
8c8727412375: Downloading [================>              ]  17.5MB/19.19MB
8a4e2c2f84d4: Download complete
8a4e2e96a4e3: Download complete
3597b94b8cfe: Download complete
729775f62015: Download complete
9b40b6c4b671: Download complete
6d05668a7853: Download complete
6d0879a890a6: Downloading [================>              ]  23.9MB/29.09MB
```

> [!important]
> **Visualizer Interface Overview**
>
> The Docker Visualizer interface presents a clear and dynamic view of your Docker Swarm topology, showcasing nodes, running containers, and resource usage details. This visual approach enhances your ability to manage and troubleshoot cluster deployments.

![The image shows a Docker container visualizer interface displaying three nodes with running containers, including details like RAM usage and container states.](https://kodekloud.com/kk-media/image/upload/v1752874075/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Visualizer/frame_120.jpg)

Thank you very much for your time, and happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9c0c70f2-8fd8-459d-b5fb-6c70585ad4a7/lesson/eccb3ecf-6cf9-47f1-9e04-038620d773a7)**
>
> Watch video content
