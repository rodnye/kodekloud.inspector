# Swarm Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Swarm-Services)

---

## Table of Contents

- Swarm Services
  - From docker run to Swarm Services
  - Creating a Docker Service
  - How Swarm Orchestration Works
  - Managing Services
  - Removing a Service
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Swarm Services

Docker services enable you to deploy, scale, and manage containers across a Swarm cluster. With built-in load balancing, health checks, and automatic rescheduling, services take container orchestration to the next level.

---

## From `docker run` to Swarm Services

On a single Docker host, you might launch a web server like this:

```
docker run --name webserver httpd
```

But scaling out across multiple nodes manually requires SSHing into each host:

```
docker run httpd
```

Challenges of this approach:

- You must configure external load balancing.
- Health monitoring and restarts are manual.
- Deployment becomes error-prone as the cluster grows.

Swarm services automate all of these tasks:

- Unified load balancing across nodes
- Built-in health monitoring and self-healing
- Declarative desired state and scaling

---

## Creating a Docker Service

A Swarm **service** represents one or more replicas of the same container. On a manager node, run:

```
docker service create \
  --name web \
  --replicas 3 \
  --publish 80:80 \
  httpd:alpine
```

| Flag         | Description                         | Example        |
| ------------ | ----------------------------------- | -------------- |
| `--name`     | Assigns a name to the service       | `web`          |
| `--replicas` | Number of container replicas to run | `3`            |
| `--publish`  | Maps a host port to container port  | `80:80`        |
| Image        | Container image (with optional tag) | `httpd:alpine` |

> [!important]
> **Default Replicas**
>
> If you omit `--replicas`, Docker defaults to a single replica (`1`).

---

## How Swarm Orchestration Works

When you issue `docker service create`, the Swarm manager components collaborate:

1.  **API Server**  
    Accepts the CLI/API request.
2.  **Orchestrator**  
    Calculates desired tasks (one per replica).
3.  **Allocator**  
    Assigns virtual IPs and ports to each task.
4.  **Dispatcher**  
    Sends tasks to available worker nodes.
5.  **Worker Node**  
    Launches containers and reports status back to the manager.
6.  **Rescheduler**  
    Detects failures and automatically replaces failed tasks.

> [!important]
> **Swarm Task vs. Container**
>
> A _task_ is the Swarm abstraction for running a container and maintaining its desired state.

---

## Managing Services

Use the following commands to inspect and troubleshoot services:

| Command                                     | Description                                                |
| ------------------------------------------- | ---------------------------------------------------------- |
| `docker service ls`                         | List all services in the Swarm cluster                     |
| `docker service ps <service>`               | View tasks (containers) for a specific service             |
| `docker service inspect <service> --pretty` | Show detailed service configuration in human-readable form |
| `docker service logs <service>`             | Retrieve aggregated logs from all service replicas         |
| `docker service scale <service>=<replicas>` | Adjust the number of replicas on the fly                   |

Example:

```
docker service ls
```

```
ID            NAME  MODE        REPLICAS  IMAGE         PORTS
3zhe91mns5vz  web   replicated  3/3       httpd:alpine  *:80->80/tcp
```

Sample logs:

```
web.1.xxxxxx@worker1 | [mpm_event:notice] AH00489: Apache/2.4.43 configured
web.2.yyyyyy@worker2 | [core:notice] AH00994: Command line: 'httpd -D FOREGROUND'
web.3.zzzzzz@worker3 | 10.0.0.4 - - [24/Apr/2020] "POST /cgi-bin/main.cgi" 400 226
```

---

## Removing a Service

To tear down a service and its tasks:

```
docker service rm web
```

All associated containers will be stopped and removed.

---

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Deploy Services](https://docs.docker.com/engine/swarm/how-swarm-mode-works/swarm-deploy/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [Docker Networking](https://docs.docker.com/network/)

---

Happy containerizing! See you in the next guide.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/47fd285b-7e50-48b3-8177-b49573f12556)**
>
> Watch video content
