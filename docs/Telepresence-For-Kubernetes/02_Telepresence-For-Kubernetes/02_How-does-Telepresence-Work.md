# How does Telepresence Work - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Telepresence-For-Kubernetes/Telepresence-For-Kubernetes/How-does-Telepresence-Work)

---

## Table of Contents

- How does Telepresence Work
  - Architecture Overview
  - Prerequisites
  - Installation
  - Establishing the Connection
  - Common Telepresence Commands
  - Verifying Your Connection
  - Local Routing
  - Using Cluster Services Locally
  - Links and References
  - Watch Video
    - 1. Install the Telepresence CLI
    - 2. Deploy the Traffic Manager

---

## Content

Telepresence For Kubernetes

Telepresence For Kubernetes

# How does Telepresence Work

Telepresence lets you develop and debug services locally while connecting seamlessly to a remote Kubernetes cluster. By creating a bi-directional network tunnel, it feels as if your workstation is inside the cluster—eliminating the need to build container images or exec into pods for iterative development.

## Architecture Overview

| Component           | Location           | Responsibility                                                                     |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| Telepresence CLI    | Local machine      | Provides commands to connect, intercept services, and manage the Traffic Manager.  |
| Traffic Manager     | Kubernetes cluster | Coordinates traffic routing between the cluster and your workstation.              |
| Telepresence Daemon | Local machine      | Maintains a persistent tunnel and reroutes intercepted traffic to local processes. |

When you issue an intercept, the Traffic Manager injects a **Traffic Agent** sidecar into the target pod. Incoming requests for that pod are proxied through the agent over the tunnel to your local service.

![The image illustrates the Telepresence architecture, showing a laptop connected via a tunnel to a backend pod with a traffic manager, traffic agent, and frontend components.](https://kodekloud.com/kk-media/image/upload/v1752884090/notes-assets/images/Telepresence-For-Kubernetes-How-does-Telepresence-Work/telepresence-architecture-laptop-pod.jpg)

## Prerequisites

> [!important]
> **Note**
>
> Before you begin, confirm you have:
>
> - Network access to your Kubernetes cluster
> - `kubectl` configured with the correct context
> - Permissions to install or upgrade cluster components (or a colleague who can)

![The image lists three requirements: network connection, kubectl access to a cluster, and permissions to deploy a traffic manager to the cluster.](https://kodekloud.com/kk-media/image/upload/v1752884091/notes-assets/images/Telepresence-For-Kubernetes-How-does-Telepresence-Work/traffic-manager-deployment-requirements.jpg)

## Installation

### 1\. Install the Telepresence CLI

Download the latest Telepresence binary and make it executable:

```
sudo curl -FL \
  https://app.getambassador.io/download/tel2oss/releases/download/v2.20.0/telepresence-linux-amd64 \
  -o /usr/local/bin/telepresence
sudo chmod a+x /usr/local/bin/telepresence
```

### 2\. Deploy the Traffic Manager

Use the built-in Helm support to install:

```
telepresence helm install
```

This command provisions the Traffic Manager and necessary RBAC resources in your cluster.

## Establishing the Connection

Run the following to start the daemon and open the tunnel:

```
telepresence connect
```

This will:

- Launch the local Telepresence daemon
- Connect to the Traffic Manager in your cluster
- Configure routing so cluster pod and service IPs resolve locally

![The image illustrates a "Telepresence connect" setup, showing a laptop connected via a tunnel to a Kubernetes cluster with pods and services, including Kube-DNS.](https://kodekloud.com/kk-media/image/upload/v1752884093/notes-assets/images/Telepresence-For-Kubernetes-How-does-Telepresence-Work/telepresence-connect-kubernetes-setup.jpg)

## Common Telepresence Commands

| Command                     | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| telepresence connect        | Establishes the network tunnel                                   |
| telepresence status         | Displays current connection and routing status                   |
| telepresence intercept NAME | Redirects traffic for a Kubernetes service to your local process |

## Verifying Your Connection

Check connection health and routing:

```
telepresence status
```

Example output:

```
OSS User Daemon: Running
Version              : 2.20.0
Status               : Connected
Subnets (2)          : 10.100.0.0/16, 192.168.0.0/18
...
OSS Traffic Manager: Connected
```

Ensure **Status: Connected** and the **Subnets** match your cluster’s pod CIDR and service network.

## Local Routing

Telepresence adds local routes for cluster IP ranges. View them with:

```
ip route
```

Sample:

```
10.100.0.0/16 dev tel1 scope link
192.168.0.0/18 dev tel1 scope link
```

Traffic on these subnets is directed through the `tel1` tunnel interface.

## Using Cluster Services Locally

With the tunnel in place, resolve and call internal services as if you were in the cluster:

```
nslookup service-a
curl http://service-a:3000
curl http://172.16.0.1
```

This approach removes the overhead of building images or managing port-forwards during development.

## Links and References

- [Telepresence Documentation](https://www.telepresence.io/docs/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Helm Charts Overview](https://helm.sh/docs/topics/charts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/telepresence-for-kubernetes/module/0eb5dcb6-2e2a-40d9-9caa-bd3149741aeb/lesson/46e22602-bab3-4c01-892a-0eabe2aab70e)**
>
> Watch video content
