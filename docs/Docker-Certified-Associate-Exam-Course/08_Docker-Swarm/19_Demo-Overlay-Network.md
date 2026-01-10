# Demo Overlay Network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Overlay-Network)

---

## Table of Contents

- Demo Overlay Network
  - 1. List Existing Docker Networks
  - 2. Create a Custom Overlay Network
  - 3. Deploy a Service in Ingress Mode
  - 4. Deploy a Service in Host Mode
  - 5. Clean Up Resources
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Overlay Network

In this tutorial, you'll learn how to create a custom Docker overlay network, deploy services in both **ingress** and **host** publish modes, and clean up all resources. This is essential for scalable, multi-host deployments in Docker Swarm.

---

## 1\. List Existing Docker Networks

Start by checking the current Docker networks on your Swarm manager:

```
docker network ls
```

Example output:

```
NETWORK ID     NAME                DRIVER    SCOPE
a57b5746ed31   bridge              bridge    local
b407178964ed3  docker_gwbridge     bridge    local
b8a3f6b8b75    host                host      local
iudyepxwd79a   ingress             overlay   swarm
02733bc831dd   none                null      local
```

Docker Swarm mode automatically creates two additional networks:

| Network Name       | Driver  | Purpose                                    |
| ------------------ | ------- | ------------------------------------------ |
| ingress            | overlay | Ingress load-balancing across Swarm nodes  |
| docker\\\_gwbridge | bridge  | Host-to-container communication on manager |

---

## 2\. Create a Custom Overlay Network

Overlay networks enable containers across multiple Docker hosts to communicate. To create a custom network named `kodekloudnet`, run:

```
docker network create \
  --driver overlay \
  kodekloudnet
```

Verify the new network appears in the list:

```
docker network ls
```

Inspect the network’s configuration:

```
docker network inspect kodekloudnet
```

Sample JSON output:

```
[
  {
    "Name": "kodekloudnet",
    "Id": "mr17hw7o7lnos8qyu3ndecv7",
    "Scope": "swarm",
    "Driver": "overlay",
    "IPAM": {
      "Config": [
        {
          "Subnet": "10.0.2.0/24",
          "Gateway": "10.0.2.1"
        }
      ]
    },
    "Attachable": false,
    "Ingress": false
  }
]
```

> [!important]
> **Custom Subnet and Gateway**
>
> To specify your own IP range, add `--subnet` and `--gateway` flags:
>
> ```
> docker network create \
> --driver overlay \
> --subnet 10.10.0.0/16 \
> --gateway 10.10.0.1 \
> kodekloudnet
> ```

---

## 3\. Deploy a Service in Ingress Mode

Ingress mode distributes traffic across all nodes on the published port. Even if a task isn’t running on a specific node, it will forward traffic to an active task elsewhere.

```
docker service create \
  --name ingressservice \
  --publish published=80,target=80 \
  --replicas=2 \
  --network=kodekloudnet \
  yogeshraheja/kodekloudwebimage:v1
```

- `--publish published=80,target=80` uses the Swarm ingress load-balancer.
- Access the application via any manager or worker node IP:  
  `http://<node-ip>/`

---

## 4\. Deploy a Service in Host Mode

Host mode binds the published port directly on each node where a task is running. Nodes without a task on port 80 will not respond.

```
docker service create \
  --name hostservice \
  --publish mode=host,published=80,target=80 \
  --replicas=2 \
  --network=kodekloudnet \
  yogeshraheja/kodekloudwebimage:v1
```

| Publish Mode | Behavior                                                                |
| ------------ | ----------------------------------------------------------------------- |
| ingress      | Load-balances across all nodes                                          |
| host         | Binds port on each node running a task; other nodes won’t serve traffic |

> [!important]
> **Host Mode Considerations**
>
> - Traffic is only served on nodes hosting a task.
> - Ensure your load balancer or DNS directs requests to the correct node IPs.

---

## 5\. Clean Up Resources

When you’re done, remove the services and the custom network:

```
docker service rm ingressservice hostservice
docker network rm kodekloudnet
```

---

## Links and References

- [Docker Networking Overview](https://docs.docker.com/network/)
- [Docker Swarm Mode](https://docs.docker.com/engine/swarm/)
- [Overlay Network Driver](https://docs.docker.com/network/overlay/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/de22e7b9-7a5f-4140-9d7e-8fa14caf10b4)**
>
> Watch video content
