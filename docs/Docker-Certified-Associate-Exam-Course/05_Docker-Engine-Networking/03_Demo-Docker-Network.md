# Demo Docker Network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Networking/Demo-Docker-Network)

---

## Table of Contents

- Demo Docker Network
  - Listing Default Networks
  - Inspecting the Bridge Network
  - Running Containers on the Default Bridge
  - Creating a User-Defined Bridge Network
  - Running Containers on the Custom Network
  - Connecting an Existing Container to a Network
  - Disconnecting a Container from a Network
  - Removing Networks
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Networking

# Demo Docker Network

In this lesson, we’ll explore Docker networking fundamentals: default networks, custom bridge networks, DNS resolution, and how to connect or disconnect containers from networks. By the end, you’ll understand how Docker manages container networking and how to customize it for your applications.

## Listing Default Networks

Docker comes with three built-in networks:

| Network | Driver | Scope | Description                                  |
| ------- | ------ | ----- | -------------------------------------------- |
| bridge  | bridge | local | Default network for newly created containers |
| host    | host   | local | Container shares the host’s network stack    |
| none    | null   | local | No networking; containers are isolated       |

To see these networks:

```
docker network ls
```

Example output:

```
$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
cf10938f5edf   bridge    bridge    local
d4f46412e7e9   host      host      local
b5b0ab8c1665   none      null      local
```

## Inspecting the Bridge Network

To view details such as subnet configuration and gateway:

```
docker network inspect bridge
```

Key fields:

```
[
  {
    "Name": "bridge",
    "Driver": "bridge",
    "IPAM": {
      "Config": [
        {
          "Subnet": "172.17.0.0/16",
          "Gateway": "172.17.0.1"
        }
      ]
    },
    "Options": {
      "com.docker.network.bridge.default_bridge": "true",
      "com.docker.network.bridge.enable_icc": "true",
      "com.docker.network.bridge.enable_ip_masquerade": "true",
      "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0"
    }
  }
]
```

> [!important]
> **Note**
>
> The IPAM (IP Address Management) section shows how Docker assigns subnets and gateways.

## Running Containers on the Default Bridge

When you start a container without specifying a network, it’s attached to `bridge`:

```
docker run -itd --name first centos:7
```

Inspect its network settings:

```
docker inspect first --format '{{json .NetworkSettings}}' | jq
```

```
{
  "Gateway": "172.17.0.1",
  "IPAddress": "172.17.0.2",
  "IPPrefixLen": 16,
  "MacAddress": "02:42:ac:11:00:02",
  "Networks": {
    "bridge": {
      "IPAddress": "172.17.0.2",
      "Gateway": "172.17.0.1",
      "MacAddress": "02:42:ac:11:00:02"
    }
  }
}
```

Create a second container:

```
docker run -itd --name second centos:7
```

On the default bridge, embedded DNS is **not** enabled. Attempting to ping by container name fails:

```
docker exec first ping -c 2 second
# ping: second: Name or service not known
```

## Creating a User-Defined Bridge Network

User-defined bridge networks include built-in DNS and automatic name resolution. Create one with a custom subnet:

```
docker network create \
  --driver bridge \
  --subnet 192.168.10.0/24 \
  kodekloudnet
```

Verify its presence:

```
docker network ls
```

```
$ docker network ls
NETWORK ID     NAME           DRIVER    SCOPE
cf10938f5edf   bridge         bridge    local
d4f46412e7e9   host           host      local
f22c791ef1ad   kodekloudnet   bridge    local
b5b0ab8c1665   none           null      local
```

## Running Containers on the Custom Network

Launch two containers on `kodekloudnet`:

```
docker run -itd --name customfirst --net kodekloudnet centos:7
docker run -itd --name customsecond --net kodekloudnet centos:7
```

They now receive IPs within `192.168.10.0/24`, and DNS-based name resolution works:

```
docker exec customfirst ping -c 4 customsecond
```

```
PING customsecond (192.168.10.3): 56 data bytes
64 bytes from customsecond.kodekloudnet (192.168.10.3): icmp_seq=1 ttl=64 time=0.07 ms
...
```

## Connecting an Existing Container to a Network

By default, containers attach only to the default bridge. To connect `first` to `kodekloudnet`:

```
docker network connect kodekloudnet first
```

Verify both network endpoints:

```
docker inspect first \
  --format '{{json .NetworkSettings.Networks}}' | jq
```

```
{
  "bridge": {
    "IPAddress": "172.17.0.2"
  },
  "kodekloudnet": {
    "IPAddress": "192.168.10.4"
  }
}
```

Now ping `first` from `customfirst`:

```
docker exec customfirst ping -c 2 first
```

## Disconnecting a Container from a Network

To detach a container:

```
docker network disconnect kodekloudnet first
```

After disconnecting, `customfirst` will no longer reach `first` on that network.

## Removing Networks

Docker prevents removing networks with active endpoints. To delete `kodekloudnet`:

1.  Stop and remove containers:

    ```
    docker container stop $(docker ps -q)
    docker container rm $(docker ps -aq)
    ```

2.  Remove the network:

    ```
    docker network rm kodekloudnet
    ```

You can also prune all unused user-defined networks:

```
docker network prune
```

> [!important]
> **Warning**
>
> `docker network prune` removes only user-defined networks without active containers. Default networks (`bridge`, `host`, `none`) are not affected.

---

## Links and References

- [Docker Networking Overview](https://docs.docker.com/network/)
- [Docker Network Commands](https://docs.docker.com/engine/reference/commandline/network/)
- [Kubernetes Networking](https://kubernetes.io/docs/concepts/services-networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/ddc7602c-93a8-4a6f-900c-a5cf6f7b0716/lesson/312fe0b8-2fc3-4610-b5cd-354b89a4f521)**
>
> Watch video content
