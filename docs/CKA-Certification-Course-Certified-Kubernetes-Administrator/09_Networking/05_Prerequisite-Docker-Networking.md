# Prerequisite Docker Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Prerequisite-Docker-Networking)

---

## Table of Contents

- Prerequisite Docker Networking
  - Docker Networking Modes
  - Container Attachment to the Bridge Network
  - Port Mapping
  - Conclusion
  - Watch Video
    - None Network
    - Host Network
    - Bridge Network
    - How Port Forwarding Works

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Prerequisite Docker Networking

Welcome to this comprehensive lesson on Docker networking. In this guide, we explore the various networking options available in Docker and how they relate to network namespaces. We'll begin by focusing on a single Docker host— a server with Docker installed. Assume the host has an Ethernet interface (eth0) with the IP address 192.168.1.10 on the local network.

## Docker Networking Modes

When you run a container, Docker provides several networking modes to tailor connectivity to your application's needs:

### None Network

With the "none" network mode, the container is not attached to any network. As a result, it cannot communicate with external systems, nor can external systems reach the container. For example:

```
docker run --network none nginx
```

> [!important]
> **Note**
>
> Multiple containers started in the none network mode remain completely isolated from each other and the external network.

### Host Network

In the host network mode, the container shares its host's network stack. This means there is no network isolation between the host and the container. For instance, if a web application inside the container listens on port 80, that application immediately becomes accessible on port 80 of the host. However, running a second container that also attempts to bind to the same port will result in a failure because two processes cannot share the same port on the host. For example:

```
docker run --network host nginx
```

### Bridge Network

The default Docker networking mode is the bridge network. When Docker is installed, it automatically creates an internal private network called "bridge" (visible as "docker0" on the host) with a default subnet (usually 172.17.0.0/16). Each container connected to this network receives a unique IP address from this subnet. For example, running two containers:

```
docker run nginx
docker run nginx
```

These containers communicate with each other over the internal bridge network. To inspect the list of available networks, use:

```
docker network ls
```

An example output might look like:

```
NETWORK ID          NAME                DRIVER              SCOPE
2b6008726112        bridge              bridge              local
0beb4870b093        host                host                local
99035e02694f        none                null                local
```

Internally, Docker creates the "docker0" interface on the host, serving as the bridge between host and containers. Although the command output names it "bridge," it is implemented as the "docker0" interface. Verify this by running:

```
ip link show docker0
```

By default, the "docker0" interface is assigned the IP address 172.17.0.1. When a container is launched, Docker creates a new network namespace for it (similar to those discussed in earlier lessons). To list the available network namespaces (a minor hack may be required to display Docker-created namespaces):

```
ip netns list
```

Typically, the namespace will have a name starting with an identifier like `b3165...`. To view the network namespace details associated with a container, inspect the container details with:

```
docker inspect <container_id>
```

A snippet of the output under "NetworkSettings" might appear as follows:

```
"NetworkSettings": {
    "Bridge": "",
    "SandboxID": "b3165c10a92b50edc4c8aa5f37273e180907ded31",
    "SandboxKey": "/var/run/docker/netns/b3165c10a92b"
}
```

## Container Attachment to the Bridge Network

Docker attaches each container to the bridge network by creating a pair of virtual interfaces—essentially a virtual cable with an interface at each end. One interface is connected to the host's "docker0" bridge, and the other interface is placed inside the container's network namespace.

Inspect the interfaces on the Docker host using:

```
ip link show
```

You might see an output similar to:

```
4: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default
    link/ether 02:42:9b:5f:d6:21 brd ff:ff:ff:ff:ff:ff
8: vethbb1c343@if7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP mode DEFAULT group default
    link/ether 9e:71:37:83:9f:50 brd ff:ff:ff:ff:ff:ff link-netnsid 1
```

To inspect the network namespace of a container (for example, with namespace ID `b3165c10a92b`), run:

```
ip -n b3165c10a92b link show
```

The output might be similar to:

```
7: eth0@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
```

To view the IP address assigned to the container’s network interface:

```
ip -n b3165c10a92b addr show eth0
```

This may display:

```
7: eth0@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

Each time a new container is created, Docker follows these sequential steps:

1.  Creates a new network namespace.
2.  Establishes a pair of virtual interfaces.
3.  Attaches one end to the container’s namespace and the other to the "docker0" bridge.
4.  Assigns an IP address to the container's interface.

The virtual interface pairs are numbered consistently, with odd and even numbers forming a pair (e.g., 7 and 8, 9 and 10).

## Port Mapping

Consider a scenario where a container runs an nginx web application that listens on port 80. By default, since the container runs in a private network segment, only other containers on the same network or the host can access application endpoints. Port mapping (port publishing) in Docker enables external access by mapping a port on the host to a port on the container.

For example, to map port 8080 on the host to port 80 within the container:

```
docker run -p 8080:80 nginx
```

After setting up port mapping, you can test connectivity as follows:

- Accessing the container directly via its IP on port 80 might result in a failure:

  ```
  curl http://172.17.0.3:80
  # Output: curl: (7) Failed to connect... No route to host
  ```

- However, accessing the application using the host’s IP and port 8080 should succeed:

  ```
  curl http://192.168.1.10:8080
  # Output: Welcome to nginx!
  ```

All incoming traffic to port 8080 on the Docker host is forwarded to port 80 in the container.

### How Port Forwarding Works

Docker employs IP tables to implement port forwarding. This mechanism adds a Network Address Translation (NAT) rule to translate traffic arriving on a specific host port to the corresponding container port. For example, Docker might add a rule similar to the following:

```
iptables \
  -t nat \
  -A PREROUTING \
  -j DNAT \
  --dport 8080 \
  --to-destination 80
```

This rule directs traffic arriving at port 8080 on the host to port 80 on the container. You can review the active NAT table rules by running:

```
iptables -nvL -t nat
```

An excerpt from the output might resemble:

```
Chain DOCKER (2 references)
target     prot opt source               destination
RETURN     all  --  anywhere             anywhere
DNAT       tcp  --  anywhere             anywhere     tcp dpt:8080 to:172.17.0.2:80
```

After the mapping is configured, testing access to the container using:

```
curl http://172.17.0.3:80
```

should return a response like:

```
Welcome to nginx!
```

## Conclusion

In summary, Docker networking offers multiple modes—none, host, and bridge—to manage connectivity for containers. The default bridge network uses a virtual switch (docker0) to connect containers via dedicated network namespaces, while port mapping enables external access by forwarding traffic from a designated host port to the container's port.

> [!important]
> **Further Reading**
>
> For a deeper dive into container networking, consider exploring the [Kubernetes Networking Basics](https://kubernetes.io/docs/concepts/cluster-administration/networking/) and other resources in the [Docker Documentation](https://docs.docker.com/network/).

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/0d7969b8-82a8-47f1-a09d-d5410ff26c04)**
>
> Watch video content
