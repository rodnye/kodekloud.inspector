# Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Services)

---

## Table of Contents

- Services
  - Use Case: From Internal Networking to External Access
  - Types of Kubernetes Services
  - Creating a NodePort Service
  - Kubernetes Services in Production
  - Summary
  - Watch Video
    - NodePort Service Breakdown

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Services

Hello, and welcome to this in-depth guide on Kubernetes Services for Beginners. My name is Mumshad Mannambeth, and in this article, we’ll explore how Kubernetes services enable seamless communication between various application components—both within the cluster and from the outside world.

Kubernetes services allow different sets of Pods to interact with each other. Whether connecting the front end to back-end processes or integrating external data sources, services help to decouple microservices while maintaining reliable communication. For instance, you can expose your front-end to end users and enable back-end components to interact efficiently.

![The image is a flowchart titled "Services," depicting interconnected services and databases with icons representing users and data storage.](https://kodekloud.com/kk-media/image/upload/v1752869745/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Services/frame_70.jpg)

## Use Case: From Internal Networking to External Access

So far, we’ve seen how Pods communicate internally using the Kubernetes network. Consider a scenario where you deploy a Pod running a web application and want an external user to access it. Here’s a quick overview of the setup:

- **Kubernetes Node IP:** 192.168.1.2
- **Laptop IP (same network):** 192.168.1.10
- **Internal Pod Network:** 10.244.0.0
- **Pod IP:** 10.244.0.2

Since the Pod is on an isolated internal network, direct access to 10.244.0.2 from your laptop isn’t possible. One workaround is to SSH into the Kubernetes node (192.168.1.2) and use `curl` to reach the Pod:

```
curl http://10.244.0.2
Hello World!
```

While this method works from the node, the goal is to have external access directly from your laptop using the node’s IP. This is where a Kubernetes service, specifically a NodePort service, becomes essential. A NodePort service maps requests arriving at a designated node port (like 30008) to the Pod’s target port.

For example:

```
curl http://192.168.1.2:30008
Hello World!
```

This configuration externally exposes the web server running inside the Pod.

## Types of Kubernetes Services

Kubernetes supports several service types, each serving a unique purpose:

- **NodePort:** Maps a port on the node to a port on a Pod.
- **ClusterIP:** Creates a virtual IP for internal communication between services (e.g., connecting front-end to back-end servers).
- **LoadBalancer:** Provisions an external load balancer (supported in cloud environments) to distribute traffic across multiple Pods.

![The image illustrates three types of services: NodePort, ClusterIP, and LoadBalancer, each represented with a simple diagram.](https://kodekloud.com/kk-media/image/upload/v1752869746/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Services/frame_280.jpg)

> [!important]
> **Key Information**
>
> Remember: The NodePort service type maps a specific node port (e.g., 30008) to the target port on your Pod (e.g., 80). This provides external access while keeping internal port targeting intact.

### NodePort Service Breakdown

With a NodePort service, there are three key ports to consider:

1.  **Target Port:** The port on the Pod where the application listens (e.g., 80).
2.  **Port:** The virtual port on the service within the cluster.
3.  **NodePort:** The external port on the Kubernetes node (by default in the range 30000–32767).

## Creating a NodePort Service

The process of creating a NodePort service begins with defining the service in a YAML file. The definition file follows a similar structure to those used for Deployments or ReplicaSets, including API version, kind, metadata, and spec.

Below is an example YAML file that defines a NodePort service:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
    - targetPort: 80
      port: 80
      nodePort: 30008
```

In this YAML:

- `targetPort` specifies the Pod’s application port.
- `port` is the port on the service that acts as a virtual server port within the cluster.
- `nodePort` maps the external request to the specific port on the node (ensure it’s between 30000 and 32767).

Note that if you omit `targetPort`, it defaults to the same value as `port`. Similarly, if `nodePort` isn’t provided, Kubernetes automatically assigns one.

However, this YAML definition does not link the service to any Pods. To connect the service to specific Pods, a `selector` is used, just as in ReplicaSets or Deployments. Consider the following Pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

Now, update the service definition to include a selector that matches these labels:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
    - targetPort: 80
      port: 80
      nodePort: 30008
  selector:
    app: myapp
    type: front-end
```

Save the file as `service-definition.yml` and create the service using:

```
kubectl create -f service-definition.yml
```

You should see a confirmation message:

```
service "myapp-service" created
```

Verify the service details with:

```
kubectl get services
```

An example output might be:

```
NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP         16d
myapp-service    NodePort    10.106.127.123   <none>        80:30008/TCP    5m
```

Access the web service externally by pointing your browser or using `curl` with the node IP and NodePort:

```
curl http://192.168.1.2:30008
```

A typical response from an Nginx server might be:

```
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
...
```

## Kubernetes Services in Production

In a production environment, your application is likely spread across multiple Pods for high availability and load balancing. When Pods share matching labels, the service automatically detects and routes traffic to all endpoints. Kubernetes employs a round-robin (or random) algorithm to distribute incoming requests, serving as an integrated load balancer.

Furthermore, even if your Pods are spread across multiple nodes, Kubernetes ensures that the target port is mapped on all nodes. This means you can access your web application using the IP of any node along with the designated NodePort, providing reliable external connectivity.

![The image illustrates a Kubernetes NodePort service setup, showing nodes with IPs, ports, and pods, enabling external access to services within a cluster.](https://kodekloud.com/kk-media/image/upload/v1752869747/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Services/frame_750.jpg)

> [!important]
> **Takeaway**
>
> Regardless of whether your application runs on a single Pod on one node, multiple Pods on a single node, or Pods spread across several nodes, the service creation process remains consistent. Kubernetes automatically updates the service endpoints when Pods are added or removed, ensuring a flexible and scalable infrastructure.

## Summary

This article has provided a comprehensive introduction to Kubernetes NodePort services, covering the following key points:

- The purpose and importance of Kubernetes services in enabling both internal and external communications.
- A detailed explanation of how NodePort services work and the roles of targetPort, service port, and nodePort.
- Step-by-step instructions on creating a NodePort service and linking it to your Pods via selectors.
- An overview of production scenarios where multiple Pods ensure high availability and load balancing.

Thank you for reading this guide on Kubernetes NodePort services. Explore the demo, and I look forward to sharing more Kubernetes insights in future articles.

For further reading, check out:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/a16cfa20-df2b-437c-a352-bf6f06a5e589)**
>
> Watch video content
