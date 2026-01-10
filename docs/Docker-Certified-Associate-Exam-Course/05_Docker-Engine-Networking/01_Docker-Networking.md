# Docker Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Networking/Docker-Networking)

---

## Table of Contents

- Docker Networking
  - Built-in Docker Networks
  - 1. Bridge Network
  - 2. Host Network
  - 3. None Network
  - Creating a User-Defined Bridge Network
  - Inspecting a Container’s Network Settings
  - Name-Based Container Communication
  - Under the Hood: Namespaces & veth Pairs
  - Links and References
  - Watch Video
    - Port Mapping

---

## Content

Docker Certified Associate Exam Course

Docker Engine Networking

# Docker Networking

Docker simplifies container networking by providing built-in networks and easy-to-use commands for creating custom networks. Whether you need isolated environments or seamless inter-container communication, this guide covers everything from default networks to user-defined bridges, inspection commands, and internal mechanics.

## Built-in Docker Networks

Docker creates three networks upon installation:

| Network Name | Description                                  | Typical Use Case                         |
| ------------ | -------------------------------------------- | ---------------------------------------- |
| bridge       | Default private internal network on the host | General container communication          |
| host         | Shares host’s network namespace—no isolation | High-performance networking, host apps   |
| none         | No network interfaces except loopback        | Security-isolated or self-managed setups |

You can attach containers to any network using the `--network` flag:

```
docker run --network=<network_name> ubuntu
```

---

## 1\. Bridge Network

The **bridge** network is Docker’s default. Each container on this network gets an internal IP (typically in `172.17.x.x`). Containers on the same bridge can communicate directly.

### Port Mapping

Expose container ports to the host with `-p`:

```
docker run -d -p 8080:80 nginx
```

This maps port **80** in the container to port **8080** on your Docker host.

> [!important]
> **Note**
>
> If you omit `-d`, the container runs in the foreground.

---

## 2\. Host Network

Running with `--network=host` makes the container share your host’s network stack:

```
docker run --network=host ubuntu
```

Key points:

- No port mapping needed
- Ports in the container are the same as on the host
- Cannot run multiple containers on the same host port

> [!important]
> **Warning**
>
> Using the host network removes isolation. Only use this when you trust the container’s network behavior.

---

## 3\. None Network

The **none** network disables all external interfaces, leaving only the loopback:

```
docker run --network=none ubuntu
```

Use this for maximum network isolation when <em>no</em> connectivity is desired.

---

## Creating a User-Defined Bridge Network

Custom bridge networks let you isolate groups of containers and define subnets:

```
docker network create \
  --driver bridge \
  --subnet 182.18.0.0/16 \
  custom-isolated-network
```

List all available networks:

```
docker network ls
```

Example output:

```
NETWORK ID          NAME                         DRIVER    SCOPE
dba0fb9370fe        bridge                       bridge    local
4d60768bc9          custom-isolated-network      bridge    local
6de6865ce1c6        docker_gwbridge              bridge    local
e29d81be47          host                         host      local
mmrho7vb9rm         ingress                      overlay   swarm
d371b4009142        simplewebappdocker_default   bridge    local
```

![The image illustrates a user-defined network setup with Docker containers, showing IP addresses and connections between them.](https://kodekloud.com/kk-media/image/upload/v1752873891/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Networking/docker-user-defined-network-setup.jpg)

---

## Inspecting a Container’s Network Settings

To retrieve a container’s IP address and network details:

```
docker inspect <container_id_or_name>
```

Search for the `NetworkSettings` section in the JSON output:

```
"NetworkSettings": {
  "Gateway": "172.17.0.1",
  "IPAddress": "172.17.0.6",
  "MacAddress": "02:42:ac:11:00:06",
  "Networks": {
    "bridge": {
      "Gateway": "172.17.0.1",
      "IPAddress": "172.17.0.6",
      "MacAddress": "02:42:ac:11:00:06"
    }
  }
}
```

> [!important]
> **Tip**
>
> Use `jq` to filter output:
>
> ```
> docker inspect <id> | jq '.[0].NetworkSettings'
> ```

---

## Name-Based Container Communication

Docker’s embedded DNS (at `127.0.0.11`) lets containers resolve each other by name:

```
mysql.connect(mysql)
```

Here, `mysql` refers to the target container’s name. No static IPs required.

---

## Under the Hood: Namespaces & veth Pairs

Docker uses Linux **network namespaces** to isolate containers. Communication between a container and the host bridge relies on **veth** (virtual Ethernet) pairs:

- One end lives in the container’s namespace
- The other end attaches to the host bridge

This setup ensures both isolation and connectivity.

---

## Links and References

- [Docker Networking Overview](https://docs.docker.com/network/)
- [docker network create](https://docs.docker.com/engine/reference/commandline/network_create/)
- [Linux Network Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/ddc7602c-93a8-4a6f-900c-a5cf6f7b0716/lesson/f81b533f-0848-43d3-a6b4-93069bab2cd9)**
>
> Watch video content
