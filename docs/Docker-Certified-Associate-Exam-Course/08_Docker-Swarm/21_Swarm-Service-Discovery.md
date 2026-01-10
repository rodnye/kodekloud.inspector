# Swarm Service Discovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Service-Discovery)

---

## Table of Contents

- Swarm Service Discovery
  - Container-to-Container Communication
  - Service Discovery in Docker Swarm
  - Using a Custom Overlay Network
  - Network Comparison
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Service Discovery

Service discovery in Docker Swarm enables containers and services to locate and communicate with each other by name, rather than by changing IP addresses. This improves reliability and simplifies your microservices architecture.

## Container-to-Container Communication

By default, Docker Engine allows containers on the same node to resolve each other by container name via its built-in DNS server at `127.0.0.11`. Relying on container names prevents issues when IPs change after restarts.

```
# Not recommended: IP address may change on restart
mysql.connect(
    host='172.17.0.3',
    user='root',
    password='password',
    database='mydb'
)

# Recommended: use container name for stable resolution
mysql.connect(
    host='mysql',
    user='root',
    password='password',
    database='mydb'
)
```

## Service Discovery in Docker Swarm

In Swarm mode, every service is assigned a DNS entry matching its service name. Load balancing is handled automatically across all replicas.

```
# Create an API server with 2 replicas
docker service create \
  --name api-server \
  --replicas 2 \
  api-server-image

# Create a web frontend
docker service create \
  --name web \
  web-image
```

The `web` service can connect to `api-server` simply by its name:

```
curl http://api-server:8080/health
```

Requests to `api-server` are distributed across its replicas.

## Using a Custom Overlay Network

DNS-based service discovery only works on user-defined networks. The default `bridge` and `ingress` networks do not support inter-service name resolution. Create an overlay network to enable DNS resolution across multiple swarm nodes:

```
# 1. Create a custom overlay network
docker network create \
  --driver overlay \
  app-network

# 2. Deploy services on the overlay network
docker service create \
  --name api-server \
  --replicas 2 \
  --network app-network \
  api-server-image

docker service create \
  --name web \
  --network app-network \
  web-image
```

Now, `api-server` resolves to one of its replicas whenever any service on `app-network` queries its name.

> [!important]
> **Note**
>
> Always attach your services to a user-defined overlay network for reliable DNS-based service discovery in Swarm.

## Network Comparison

| Network Type         | DNS Resolution Between Services | Scope                       |
| -------------------- | ------------------------------- | --------------------------- |
| Default `bridge`     | No                              | Single host only            |
| Ingress              | Routing mesh only               | Cluster-wide load balancing |
| User-defined overlay | Yes                             | Multi-host overlay          |

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Docker Networking](https://docs.docker.com/network/)
- [Service Discovery in Swarm](https://docs.docker.com/engine/swarm/services/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/b28d1a0b-e491-46b3-a5c6-f81ce9ab2f3c)**
>
> Watch video content
