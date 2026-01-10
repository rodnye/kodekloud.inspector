# Advanced Networking Overlay Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Advanced-Networking/Advanced-Networking-Overlay-Networking)

---

## Table of Contents

- Advanced Networking Overlay Networking
  - Docker Network Types Overview
  - Bridge Network and Overlay Networks
  - Port Publishing and Ingress Networking
  - Ingress Networking in a Multi-Node Cluster
  - Container-to-Container Communication
  - Watch Video
    - Bridge Network
    - Host Network
    - Null Network

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Advanced Networking

# Advanced Networking Overlay Networking

Welcome to this comprehensive guide on Docker networking. My name is Mumshad Mannambeth, and in this article, we explore advanced Docker networking concepts such as overlay networks in Docker Swarm, embedded DNS servers, and the routing mesh. This guide builds upon the fundamentals introduced earlier, including the bridge, null, and host network types.

> [!important]
> **Overview**
>
> Docker containers by default attach to the bridge network. However, you can customize container connectivity by specifying different networks using the network command-line parameter.

## Docker Network Types Overview

### Bridge Network

The bridge network is a private internal network created by Docker on the host. All containers use this network by default and receive an internal IP address (commonly in the 172.17.x.x range). Containers on the bridge network communicate with each other using these internal IPs. To expose a container externally, Docker maps its internal ports to the host's ports.

### Host Network

The host network removes the network isolation between the Docker host and the container. For example, if a web server running on port 5000 inside a container using the host network is started, it is automatically accessible externally on port 5000 without the need for port mapping (using the -p option). However, note that you cannot run multiple containers on the same host if they require the same port.

### Null Network

Containers attached to the null network are completely isolated. These containers do not have network access to other containers or external networks.

Below is an example of running containers with different network configurations:

```
docker run ubuntu
docker run ubuntu --network=none
docker run ubuntu --network=host
```

## Bridge Network and Overlay Networks

When operating multiple Docker hosts, each host creates its own internal bridge network (e.g., 172.17.x.x) allowing containers on the same host to communicate; however, containers across different hosts cannot communicate directly. To address this limitation, overlay networks come into play.

With Docker Swarm, you can create an overlay network encompassing all nodes in the swarm cluster. The command below creates an overlay network:

```
docker network create --driver overlay my-overlay-network
```

After creating an overlay network, attach containers or services by specifying the network option when creating a service. For instance:

```
docker network create --driver overlay --subnet 10.0.9.0/24 my-overlay-network
docker service create --replicas 2 --network my-overlay-network nginx
```

## Port Publishing and Ingress Networking

For a standalone container running a web service on port 5000, external access is achieved by mapping the container port to a host port, as shown below:

```
docker run -p 80:5000 my-web-server
```

In a Docker Swarm cluster with multiple replicas of a service, binding the same host port on a single node would typically result in a conflict. Docker Swarm resolves this issue through ingress networking. When you create a swarm, an ingress network with a built-in load balancer is automatically configured. This load balancer listens on the published port (in this example, port 80) and forwards traffic to port 5000 on every container. Consider the following service creation:

```
docker service create \
  --replicas=2 \
  -p 80:5000 \
  my-web-server
```

The ingress network ensures that ports are adequately published on all nodes and that traffic is properly balanced among service instances.

## Ingress Networking in a Multi-Node Cluster

Imagine a three-node Docker Swarm cluster running two instances of a web service. Without ingress networking, a user accessing a node that does not actually host an instance (e.g., node three) might not reach the service. With ingress networking—a special overlay network—the built-in load balancer accepts requests on any node’s IP address and routes the traffic to a node running the service. This routing mesh guarantees that incoming requests are always directed to an active service instance.

![The image illustrates an ingress network setup with load balancers, routing mesh, and Docker hosts, explained by a person in a white jacket.](https://kodekloud.com/kk-media/image/upload/v1752874040/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Advanced-Networking-Overlay-Networking/frame_430.jpg)

## Container-to-Container Communication

In many scenarios, containers need to communicate with each other, such as a web service accessing a MySQL database running on the same host. While using the internal IP address of a container (for example, 172.17.0.3) might seem viable, it is not reliable as IP addresses can change when containers restart.

The recommended approach is to use container names. Docker’s built-in DNS server allows containers on the same host to resolve each other by name automatically. For example, instead of using a static IP address, a service can connect using:

```
mysql.connect(mysql)
```

Note that Docker's DNS server consistently listens at 127.0.0.11, ensuring reliable container-to-container communication.

> [!important]
> **Tip**
>
> Always consider using container names for service discovery to maintain stability during container restarts or scaling.

This concludes our exploration of advanced Docker networking. We have covered overlay networks, ingress networking, and container-to-container communication. I hope you found this guide informative and useful. For more insights into Docker and container orchestration, continue exploring our tutorials and documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/f595e5d7-310e-423f-81da-415570768593/lesson/b4b19cc9-4072-48f3-b983-e301823b8488)**
>
> Watch video content
