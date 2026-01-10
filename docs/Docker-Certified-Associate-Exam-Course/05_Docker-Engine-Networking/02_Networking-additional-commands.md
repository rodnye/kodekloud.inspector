# Networking additional commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Networking/Networking-additional-commands)

---

## Table of Contents

- Networking additional commands
  - Table of Contents
  - Listing Default Networks
  - Inspecting a Network
  - Connecting and Disconnecting Containers
  - Removing Networks
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Networking

# Networking additional commands

Manage Docker networks beyond the basics. In this guide, you’ll learn how to list default networks, inspect their settings, connect or disconnect containers, and remove unused networks to keep your Docker environment clean.

## Table of Contents

- [Listing Default Networks](#listing-default-networks)
- [Inspecting a Network](#inspecting-a-network)
- [Connecting and Disconnecting Containers](#connecting-and-disconnecting-containers)
- [Removing Networks](#removing-networks)

---

## Listing Default Networks

Docker provides three built-in networks out of the box: `bridge`, `host`, and `none`. Use the following command to see them:

```
docker network ls
```

Example output:

```
NETWORK ID          NAME      DRIVER    SCOPE
599dcaf4e856        bridge    bridge    local
c817f1bca596        host      host      local
e6508d3404a3        none      null      local
```

You can also get a quick overview in tabular form:

| Network Name | Driver | Scope | Description                                   |
| ------------ | ------ | ----- | --------------------------------------------- |
| bridge       | bridge | local | Default network for standalone containers     |
| host         | host   | local | Containers share the host’s network namespace |
| none         | null   | local | Containers have no network interfaces         |

> [!important]
> **Note**
>
> The **bridge** network uses the `172.17.0.0/16` subnet by default, with gateway `172.17.0.1` assigned to the `docker0` interface on the host.

---

## Inspecting a Network

To dive deeper into a network’s configuration—such as its IPAM settings, subnets, gateways, and attached containers—run:

```
docker network inspect bridge
```

Sample output (abridged):

```
[
  {
    "Name": "bridge",
    "Id": "599dcaf4e85648c3a111baa52b7530f097853b96485a8a3ffcd9088b20f0cb",
    "Scope": "local",
    "Driver": "bridge",
    "IPAM": {
      "Driver": "default",
      "Config": [
        {
          "Subnet": "172.17.0.0/16",
          "Gateway": "172.17.0.1"
        }
      ]
    },
    "Containers": {
      // attached container details
    }
  }
]
```

This output shows the network’s driver, IPAM configuration, and any containers currently connected.

---

## Connecting and Disconnecting Containers

You can attach a running container to additional networks or remove it from one without restarting:

```
# Connect a container to a custom network
docker network connect custom-net my-container


# Disconnect a container from a network
docker network disconnect custom-net my-container
```

These commands make it easy to adjust a container’s network access on the fly.

---

## Removing Networks

Clean up unused networks to avoid clutter:

```
# Remove a specific network
docker network rm custom-net


# Remove all unused networks
docker network prune
```

> [!important]
> **Warning**
>
> This will remove **all** networks not used by at least one container.
> Are you sure you want to continue? \[y/N\]

---

## Links and References

- [Docker Networking Overview](https://docs.docker.com/network/)
- [Docker CLI: network commands](https://docs.docker.com/engine/reference/commandline/network/)
- [Docker Compose Networking](https://docs.docker.com/compose/networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/ddc7602c-93a8-4a6f-900c-a5cf6f7b0716/lesson/de119e3f-37e8-4286-97be-55bd35702e84)**
>
> Watch video content
