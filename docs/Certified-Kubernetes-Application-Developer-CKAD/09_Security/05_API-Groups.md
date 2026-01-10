# API Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/API-Groups)

---

## Table of Contents

- API Groups
  - Understanding the Kubernetes API
  - API Groups Overview
  - Accessing the Kubernetes API
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# API Groups

Before diving into authorization, it's essential to understand how API groups are organized in Kubernetes.

## Understanding the Kubernetes API

The Kubernetes API serves as the central interface for interacting with the cluster. Whether you use the kubectl command-line tool or make direct REST calls, every operation in the cluster is handled by the API server. For example, to check the cluster version, you can query the API server running on the master node (default port 6443) by appending the API version to the URL. Similarly, to list all the pods, you would send a request to `/api/v1/pods`.

Below is an example command that retrieves the Kubernetes version:

```
curl https://kube-master:6443/version
```

The expected output is:

```
{
  "major": "1",
  "minor": "13",
  "gitVersion": "v1.13.0",
  "gitCommit": "ddd47ac13c1a9483ea035a79cd7c1005ff21a6d",
  "gitTreeState": "clean",
  "buildDate": "2018-12-03T20:56:12Z",
  "goVersion": "go1.11.2",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

## API Groups Overview

Kubernetes organizes its API functionalities into various groups, making it easier to manage and scale operations. These groups include endpoints for version information, metrics, health checks, logs, and more. For instance, while the `/version` API reveals the cluster version, the `/metrics` and `/healthz` endpoints help monitor your cluster's health. The `/logs` endpoint can be integrated with third-party logging tools.

![The image shows six colored labels with text: /metrics, /healthz, /version, /api, /apis, and /logs, likely representing API endpoints.](https://kodekloud.com/kk-media/image/upload/v1752871267/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-API-Groups/frame_70.jpg)

Kubernetes APIs can be broadly divided into two categories:

1.  **Core API Group**: Contains fundamental components such as namespaces, pods, replication controllers, events, endpoints, nodes, bindings, persistent volumes, persistent volume claims, config maps, secrets, and services.
2.  **Named API Groups**: Organizes newer features into groups like apps, extensions, networking, storage, authentication, and authorization. For example, the "apps" group includes Deployments, ReplicaSets, and StatefulSets, while the "networking" group covers Network Policies. Other functionalities such as Certificate Signing Requests belong to different named groups.

![The image shows a hierarchical structure of a core API, detailing endpoints like namespaces, pods, and services under version v1.](https://kodekloud.com/kk-media/image/upload/v1752871268/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-API-Groups/frame_120.jpg)

Each resource in these API groups supports a collection of actions—referred to as "verbs"—that allow you to perform operations like list, get, create, delete, update, and watch.

![The image is a diagram illustrating Kubernetes API groups, resources, and actions like list, get, create, delete, update, and watch.](https://kodekloud.com/kk-media/image/upload/v1752871269/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-API-Groups/frame_170.jpg)

For a detailed overview of each API object, including its associated group and version, check out the Kubernetes API reference. For example, "v1 core" indicates the core API group at version v1. You can also explore your cluster’s API groups by accessing the API server on port 6443 without providing any specific path:

```
curl http://localhost:6443 -k
```

The response may resemble:

```
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

## Accessing the Kubernetes API

When making direct requests to the Kubernetes API using curl, you might face authentication restrictions. For example, executing the following command without proper certificates might lead to a Forbidden error:

```
curl http://localhost:6443 -k
```

Output:

```
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "Forbidden: User \"system:anonymous\" cannot get path \"/\"",
  "reason": "Forbidden",
  "details": {},
  "code": 403
}
```

> [!important]
> **Authentication Tip**
>
> To access the API securely, include your certificate files in the curl command as follows:

```
curl http://localhost:6443 -k --key admin.key --cert admin.crt --cacert <ca.crt>
```

Alternatively, you can use the `kubectl proxy` command. This command starts a local proxy service on port 8001, utilizing the credentials from your kubeconfig file to authenticate your requests—eliminating the need to explicitly specify certificates.

Start the proxy by running:

```
kubectl proxy
```

This command outputs:

```
Starting to serve on 127.0.0.1:8001
```

Then, access the API via the proxy:

```
curl http://localhost:8001 -k
```

Expected response:

```
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
> **Important Distinction**
>
> Do not confuse `kubectl proxy` with `kube-proxy`. The `kube-proxy` manages networking and connectivity between pods across nodes, while `kubectl proxy` forwards API requests using your kubeconfig credentials.

![The image shows a comparison indicating that "Kube proxy" is not equal to "Kubectl proxy."](https://kodekloud.com/kk-media/image/upload/v1752871270/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-API-Groups/frame_300.jpg)

## Summary

Kubernetes organizes its resources within various API groups, divided into the core API group and named API groups. Each group contains specific resources, and these resources support multiple actions (verbs) such as list, get, create, delete, update, and watch. In the next lesson on authorization, you will learn how these verbs control access within the cluster.

That concludes this lesson. See you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/65ee5a57-01e7-499f-b3bc-33ebcc57dc37)**
>
> Watch video content
