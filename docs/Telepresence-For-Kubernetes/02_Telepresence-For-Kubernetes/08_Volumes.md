# Volumes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/Volumes)

---

## Table of Contents

- Volumes
  - Prerequisites
  - 1. Intercept Without Volume Mount
  - 2. Intercept With Volume Mount
  - 3. Command Reference
  - 4. Verifying the Volume Mount
  - Further Reading
  - Watch Video
    - Customizing the Local Mount Point

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# Volumes

When you intercept a Kubernetes service locally using Telepresence, any volumes mounted by the original container won’t automatically appear on your host. To ensure your local process reads from or writes to the same volume, you must explicitly mount it. This guide covers intercepting a deployment with and without volume mounts, customizing the mount point, and verifying where the volume is available on your machine.

## Prerequisites

- A running Kubernetes cluster
- `telepresence` CLI installed ([install guide](https://www.telepresence.io/docs/latest/install/))
- A Deployment named `products-depl` that uses a volume

## 1\. Intercept Without Volume Mount

By default, intercepting a service only redirects traffic—you won’t have access to the original volume on your local file system:

```
telepresence intercept products-depl --port 8000:3000
```

Use this when your local process doesn’t need the container’s on-disk data.

## 2\. Intercept With Volume Mount

If your container reads or writes data to a volume, add the `--mount` flag. Telepresence will mount the volume into a randomly generated directory on your host:

```
telepresence intercept products-depl \
  --port 8000:3000 \
  --mount
```

### Customizing the Local Mount Point

To choose a specific directory on your machine, pass `--mount=<path>`:

```
telepresence intercept products-depl \
  --port 8000:3000 \
  --mount=/tmp/products-data
```

> [!important]
> **Note**
>
> When you specify a mount point, ensure the directory exists and you have write permissions.
> Telepresence won’t create nested directories for you.

## 3\. Command Reference

| Command                                                               | Description                                    |
| --------------------------------------------------------------------- | ---------------------------------------------- |
| `telepresence intercept products-depl --port 8000:3000`               | Intercept without mounting the volume          |
| `telepresence intercept products-depl --port 8000:3000 --mount`       | Mount the volume at a random local directory   |
| `telepresence intercept products-depl --port 8000:3000 --mount=/tmp/` | Mount the volume at `/tmp/` on the host        |
| `telepresence list`                                                   | List current intercepts and their mount points |

## 4\. Verifying the Volume Mount

Run the following to see active intercepts and where volumes are mounted locally:

```
telepresence list
```

Example output:

```
$ telepresence list
auth-depl      : ready to intercept (traffic-agent already installed)
inventory-depl : ready to intercept (traffic-agent not yet installed)
products-depl  : intercepted
    Intercept name         : products-depl
    State                  : ACTIVE
    Workload kind          : Deployment
    Destination            : 127.0.0.1:8000
    Service Port Identifier: 3000/TCP
    Volume Mount Point     : /tmp/telfs-1147625726
    Intercepting           : all TCP connections
```

| Field                   | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| Intercept name          | The identifier for this intercept                        |
| State                   | `ACTIVE` if currently intercepting, otherwise `READY`    |
| Workload kind           | Kubernetes resource type (e.g., Deployment, StatefulSet) |
| Destination             | Local address and port where traffic is forwarded        |
| Service Port Identifier | Original service port and protocol                       |
| Volume Mount Point      | Local directory where the pod’s volume is mounted        |

## Further Reading

- [Telepresence Volume Mounts](https://www.telepresence.io/docs/latest/reference/cli/#telepresence-intercept)
- [Kubernetes Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
- [Using Telepresence with Stateful Applications](https://www.telepresence.io/docs/latest/topics/stateful/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/790b6ba6-2d7d-4a16-a349-815da1f03b88)**
>
> Watch video content
