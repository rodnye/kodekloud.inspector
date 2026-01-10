# Publishing Ports - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Publishing-Ports)

---

## Table of Contents

- Publishing Ports
  - 1. Container vs Host IP
  - 2. Publishing a Fixed Port (-p)
  - 3. Binding to Specific Host Interfaces
  - 4. Dynamic Host Port Allocation
  - 5. Publishing All Exposed Ports (-P)
  - 6. Port Publishing Options at a Glance
  - 7. Under the Hood: iptables NAT
  - Watch Video
    - Multiple Instances on Different Ports

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Publishing Ports

In this lesson, we’ll explore how Docker publishes container ports to the host system. We begin with basic port mapping, then move on to advanced options like interface binding, dynamic port allocation, and automatic exposure. By the end, you’ll understand how Docker leverages `iptables` to route traffic between host and container.

## 1\. Container vs Host IP

A containerized web application typically listens on an internal port (e.g., `5000`). Every container receives an internal IP (for example, `172.17.0.2`), which is only reachable from the Docker host:

```
curl http://172.17.0.2:5000
```

However, this IP isn’t accessible from other machines. To allow external access, you must map the container port to a port on the host (e.g., `192.168.1.5`).

## 2\. Publishing a Fixed Port (`-p`)

To map container port `5000` to host port `80`, run:

```
docker run -p 80:5000 kodekloud/simple-webapp
```

Now your application is accessible at:

```
http://192.168.1.5:80
```

### Multiple Instances on Different Ports

You can launch multiple containers binding the same internal port to different host ports:

```
docker run -d -p 8000:5000 kodekloud/simple-webapp
docker run -d -p 8001:5000 kodekloud/simple-webapp
```

For database services:

```
docker run -d -p 3306:3306 mysql
docker run -d -p 8306:3306 mysql
# The next command fails if port 8306 is in use:
docker run -d -p 8306:3306 mysql
```

> [!important]
> **Port Collision Warning**
>
> Host ports must be unique. Attempting to bind the same host port twice will cause Docker to error out.

## 3\. Binding to Specific Host Interfaces

If your machine has multiple network interfaces, you can restrict port binding to a particular IP:

```
# Bind only on 192.168.1.5
docker run -p 192.168.1.5:8000:5000 kodekloud/simple-webapp


# Bind only on loopback (accessible locally)
docker run -p 127.0.0.1:8000:5000 kodekloud/simple-webapp
```

## 4\. Dynamic Host Port Allocation

Omitting the host port lets Docker assign a random port (default range 32768–60999):

```
docker run -d -p 5000 kodekloud/simple-webapp
```

To view the port range:

```
cat /proc/sys/net/ipv4/ip_local_port_range
# Example output:
# 32768 60999
```

## 5\. Publishing All Exposed Ports (`-P`)

If an image’s Dockerfile declares one or more `EXPOSE` ports, you can automatically map them to random host ports:

```
# Dockerfile snippet
FROM ubuntu:16.04
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install flask
COPY app.py /opt/
ENTRYPOINT ["flask", "run", "--host=0.0.0.0"]
EXPOSE 5000
```

Build and run:

```
docker build -t simple-webapp .
docker run -P simple-webapp
```

You can also expose additional ports at runtime:

```
docker run -P --expose=8080 simple-webapp
```

Inspect the exposed ports:

```
docker inspect simple-webapp --format '{{json .NetworkSettings.Ports}}'
# Example output:
# {"5000/tcp":[{"HostIp":"0.0.0.0","HostPort":"32768"}],
#  "8080/tcp":[{"HostIp":"0.0.0.0","HostPort":"32769"}]}
```

## 6\. Port Publishing Options at a Glance

| Option     | Description                                      | Syntax                                  |
| ---------- | ------------------------------------------------ | --------------------------------------- |
| `-p`       | Map specific host and container ports            | `-p [host_ip:]host_port:container_port` |
| `-P`       | Publish all `EXPOSE`d ports to random host ports | `-P`                                    |
| `--expose` | Expose additional container ports (no host bind) | `--expose=port[/protocol]`              |

## 7\. Under the Hood: iptables NAT

Docker uses Linux `iptables` to forward traffic from host ports to container IPs. It creates custom chains (`DOCKER`, `DOCKER-USER`) in the `nat` table:

1.  Packet arrives on the host port.
2.  PREROUTING chain directs it to the `DOCKER` chain.
3.  A DNAT rule rewrites the packet’s destination to the container’s IP and port.
4.  The packet is forwarded to the container.
5.  Response packets are SNAT’d or MASQUERADE’d back to the host.

Inspect Docker’s NAT rules:

```
iptables -t nat -S DOCKER
# Sample output:
# -N DOCKER
# -A DOCKER ! -i docker0 -p tcp -m tcp --dport 41232 \
#     -j DNAT --to-destination 172.17.0.3:5000
```

> [!important]
> **Note**
>
> You can insert custom rules in the `DOCKER-USER` chain to filter or modify traffic before Docker’s own rules apply.

---

Further Reading and References

- [Docker Networking Overview](https://docs.docker.com/network/)
- [Docker Run Reference](https://docs.docker.com/engine/reference/commandline/run/)
- [iptables Manual](https://linux.die.net/man/8/iptables)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/cc1e3b40-f4a6-47a4-acff-e6c9182cafd8)**
>
> Watch video content
