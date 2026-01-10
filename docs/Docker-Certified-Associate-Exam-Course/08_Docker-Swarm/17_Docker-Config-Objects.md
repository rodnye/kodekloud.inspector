# Docker Config Objects - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Docker-Config-Objects)

---

## Table of Contents

- Docker Config Objects
  - 1. Override Configuration on a Single Host
  - 2. Limitations of Bind-Mounts in a Swarm Cluster
  - 3. Introducing Docker Config Objects
  - 4. Managing Docker Configs
  - 5. Further Reading and References
  - Links and Resources
  - Watch Video
    - 3.1 Create a Config Object
    - 3.2 Deploy a Service with Config

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Docker Config Objects

In this guide, you’ll learn how to distribute configuration files across multiple Docker nodes using **Docker Config** objects. We’ll start by overriding a container’s default config on a single host, examine the pitfalls of bind-mounts in a Swarm cluster, and then introduce Docker Config objects as the robust solution for managing configs in Swarm mode.

## 1\. Override Configuration on a Single Host

By default, an NGINX container uses its built-in `nginx.conf`. To replace this with your custom file at `/tmp/nginx.conf` on the Docker host:

```
docker run -d \
  --name nginx-single \
  -v /tmp/nginx.conf:/etc/nginx/nginx.conf \
  nginx
```

When the container starts, Docker bind-mounts `/tmp/nginx.conf` into the container’s `/etc/nginx/nginx.conf`, and NGINX loads your custom configuration.

## 2\. Limitations of Bind-Mounts in a Swarm Cluster

Attempting the same bind-mount approach in a Swarm cluster fails if not every node has the file:

```
docker service create \
  --name nginx-service \
  --replicas 4 \
  -v /tmp/nginx.conf:/etc/nginx/nginx.conf \
  nginx
```

Because Swarm schedules tasks across multiple nodes, the service will error out on any node missing `/tmp/nginx.conf`. Keeping config files in sync manually is error-prone and unscalable.

## 3\. Introducing Docker Config Objects

Docker Configs store configuration data in the Swarm control plane and inject it into containers at runtime.

### 3.1 Create a Config Object

```
docker config create nginx-conf /tmp/nginx.conf
```

### 3.2 Deploy a Service with Config

```
docker service create \
  --name nginx-service \
  --replicas 4 \
  --config src=nginx-conf,target=/etc/nginx/nginx.conf \
  nginx
```

Each task receives the `nginx-conf` content mounted at `/etc/nginx/nginx.conf`. Configs are **read-only** and reside on the Swarm manager, eliminating the need for manual file distribution.

> [!important]
> **Note**
>
> Configs are not a replacement for persistent volumes. Use volumes when your service requires write access or persistent storage.> [!important]
> **Warning**
>
> Docker Config objects are only available in Swarm mode. Standalone containers cannot consume configs.

## 4\. Managing Docker Configs

Use the following commands to modify or remove configs in your running services:

| Action                                                              | Command                                                                                                 | Description                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Detach config from service                                          | `docker service update --config-rm nginx-conf nginx-service`                                            | Removes the config mount from the service.          |
| Delete a config object                                              | `docker config rm nginx-conf`                                                                           | Deletes the config from the Swarm after detachment. |
| Rotate config for a service                                         | <ul><li>`docker config create nginx-conf-new /tmp/nginx-new.conf`</li><li>\\`docker service update \\\\ |                                                     |
| \\--config-rm nginx-conf \\\\                                       |                                                                                                         |                                                     |
| \\--config-add src=nginx-conf-new,target=/etc/nginx/nginx.conf \\\\ |                                                                                                         |                                                     |
| nginx-service\\`</li></ul>                                          | Creates a new config and updates the service without downtime.                                          |                                                     |

## 5\. Further Reading and References

- [Docker Config Documentation](https://docs.docker.com/engine/swarm/configs/)
- [Docker Service Commands](https://docs.docker.com/engine/reference/commandline/service/)
- [Docker Volumes vs. Configs](https://docs.docker.com/storage/)

## Links and Resources

- [Docker Swarm Mode Overview](https://docs.docker.com/engine/swarm/)
- [NGINX Official Image on Docker Hub](https://hub.docker.com/_/nginx)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/142aebcc-9c35-463f-bd83-79297c18419f)**
>
> Watch video content
