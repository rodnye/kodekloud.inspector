# API Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/API-Groups)

---

## Table of Contents

- API Groups
  - Understanding the Kubernetes API
  - Core API Group vs. Named API Group
  - Exploring the Kubernetes API Server
  - Summary
  - Watch Video
  - Practice Lab
    - A Note on Direct API Access

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# API Groups

Before diving into authorization, it is important to understand API groups in Kubernetes. This article explains how the Kubernetes API is structured and how its groups and verbs interact, offering insights into direct API access and the use of proxies.

## Understanding the Kubernetes API

The Kubernetes API forms the foundation for all interactions with a cluster. Whether you use the Kubernetes command-line utility (kubectl) or interact directly via REST, every operation communicates with the API server. For example, to check the version of the Kubernetes API server, you can run the command below to access it on the master node's default port 6443:

```
curl https://kube-master:6443/version
{
  "major": "1",
  "minor": "13",
  "gitVersion": "v1.13.0",
  "gitCommit": "ddf47ac13c1a9483ea035a79cd7c1005ff21a6d",
  "gitTreeState": "clean",
  "buildDate": "2018-12-03T20:56:12Z",
  "goVersion": "go1.11.2",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

Similarly, to list your pods, you would use the API endpoint `/api/v1/pods`. This article will focus on API pods, versions, and the overall structure of the Kubernetes API.

The API is divided into multiple groups based on their function. Some groups are dedicated to core resources—such as pods, namespaces, persistent volumes—while others are logically grouped by functionality, such as metrics, health, and logs.

![The image shows six colored labels with text: /metrics, /healthz, /version, /api, /apis, and /logs, likely representing API endpoints.](https://kodekloud.com/kk-media/image/upload/v1752871324/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-API-Groups/frame_70.jpg)

The `/version` API endpoint displays the cluster version, while `/metrics` and `/healthz` help monitor the cluster's health. Additionally, the `/logs` API facilitates integration with third-party logging applications.

## Core API Group vs. Named API Group

Kubernetes organizes its API resources into two main groups:

1.  **Core API Group:** Contains resources integral to cluster operation, including:
    - Namespaces
    - Pods
    - Replication controllers
    - Events
    - Endpoints
    - Nodes
    - Bindings
    - Persistent volumes and persistent volume claims
    - Config maps
    - Secrets
    - Services

2.  **Named API Group:** Organizes newer features and additional functionalities into distinct categories, such as:
    - Apps (deployments, replica sets, stateful sets)
    - Extensions
    - Networking (network policies)
    - Storage
    - Authentication
    - Authorization

    For example, certificate signing requests fall under the certificates category.

![The image depicts a hierarchical structure of a Kubernetes API, showing core components like namespaces, pods, and services under the `/api/v1` endpoint.](https://kodekloud.com/kk-media/image/upload/v1752871325/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-API-Groups/frame_120.jpg)

Within each API group, resources support a range of actions—commonly known as "verbs"—including list, get, create, delete, update, and watch. The following diagram illustrates how Kubernetes API groups, resources, and verbs interact:

![The image is a diagram illustrating Kubernetes API groups, resources, and actions like list, get, create, delete, update, and watch.](https://kodekloud.com/kk-media/image/upload/v1752871326/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-API-Groups/frame_170.jpg)

For further details on these interactions and available operations, refer to the Kubernetes API reference documentation. For example, the documentation for "Pod v1 core" includes group details and information on API actions.

![The image shows a Kubernetes documentation page for "Pod v1 core," highlighting API details and a warning about creating Pods through a Controller.](https://kodekloud.com/kk-media/image/upload/v1752871327/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-API-Groups/frame_200.jpg)

## Exploring the Kubernetes API Server

To view the available API groups directly, you can query the Kubernetes API server on port 6443 without specifying an endpoint:

```
curl http://localhost:6443 -k
{
  "paths": [
    "/api",
    "/api/v1",
    "/apis",
    "/apis/",
    "/healthz",
    "/logs",
    "/metrics",
    "/openapi/v2",
    "/swagger-2.0.0.json"
  ]
}
```

This command returns a list of available API groups. Named API groups contain additional resources corresponding to various functional areas of the cluster.

### A Note on Direct API Access

When accessing the API directly using curl without authentication (as shown above), access might be restricted to only certain endpoints—such as the version API. To access other APIs, you need to authenticate using certificate files:

```
curl http://localhost:6443 -k --key admin.key --cert admin.crt --cacert <path-to-cacert>
```

Alternatively, you can simplify the process using the `kubectl proxy` command. This proxy uses the credentials from your kubeconfig file, eliminating the need to specify certificates with every request. To start the proxy, run:

```
kubectl proxy
Starting to serve on 127.0.0.1:8001
```

After the proxy is running, you can access the API server through it:

```
curl http://localhost:8001 -k
{
  "paths": [
    "/api",
    "/api/v1",
    "/apis",
    "/apis/",
    "/healthz",
    "/logs",
    "/metrics",
    "/openapi/v2",
    "/swagger-2.0.0.json"
  ]
}
```

> [!important]
> **Note**
>
> Both "kube proxy" and "kubectl proxy" might sound similar but serve different functions:
>
> - "Kube proxy" manages communication between pods and services across nodes.
> - "Kubectl proxy" is an HTTP proxy used to securely access the Kubernetes API server.

![The image highlights that "Kube proxy" is not equal to "Kubectl proxy," indicating they are distinct concepts or tools.](https://kodekloud.com/kk-media/image/upload/v1752871328/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-API-Groups/frame_300.jpg)

## Summary

All Kubernetes resources are organized into API groups. The core API group contains essential resources for cluster operation, while named API groups provide a structured approach to additional functionalities. Each resource supports actions (verbs) like list, get, create, delete, update, and watch. In the next discussion, we will explore how authorization leverages these API groups and verbs to control user access.

This concludes the article on API groups.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/fac1b9c3-5d91-48a7-aa96-0ae572853d9f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/077b6709-d862-450e-8373-a32974990de8)**
>
> Practice lab
