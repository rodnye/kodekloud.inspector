# Ingress - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Networking/Ingress)

---

## Table of Contents

- Ingress
  - Ingress Controller
  - Ingress Resources
  - Watch Video
    - NGINX Ingress Controller Deployment
    - Single Backend Ingress
    - Ingress with URL Path Rules
    - Ingress with Host-Based Rules

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Networking

# Ingress

Welcome to this in-depth guide on Ingress in Kubernetes. This article revisits Kubernetes services and progressively builds up to explain Ingress—detailing differences between services and Ingress, when to use each, and the best practices for managing external access to your applications.

Imagine you are deploying an online store with the domain name myonlinestore.com. You package your application into a Docker image and deploy it as a pod within a Deployment. Your application requires a MySQL database, so you deploy MySQL as a pod and expose it via a ClusterIP service named "MySQL service" to enable internal communication.

To expose your application externally, you create a NodePort service and assign port 38080. Users can now access your application using the IP address of any node followed by port 38080 (e.g., http://<node-ip>:38080). As traffic grows, the service distributes network traffic across multiple pod replicas.

![The image illustrates a network diagram showing a NodePort service setup for "wear-service" with three instances, accessible via a specific IP and port.](https://kodekloud.com/kk-media/image/upload/v1752880568/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_110.jpg)

In production, exposing node IPs and ports directly is not ideal. Typically, you configure your DNS server to map your domain (myonlinestore.com) to the node IPs and port 38080. However, users would still need to specify the port number in the URL.

To address this, you introduce an additional layer—a proxy server—that forwards requests from the standard port 80 to port 38080. Once your DNS is updated to point to the proxy, users can access your application simply by navigating to myonlinestore.com.

![The image illustrates a network flow diagram for an online store, showing a proxy server and a NodePort service with multiple instances labeled "wear."](https://kodekloud.com/kk-media/image/upload/v1752880569/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_140.jpg)

If your application is deployed on a public cloud such as [Google Cloud Platform (GCP)](https://cloud.google.com), you can opt for a LoadBalancer service instead of a NodePort service. Kubernetes will then provision a high port (like NodePort) and request a network load balancer from GCP. The load balancer receives an external IP address that you can map to your DNS, allowing users to access your application via myonlinestore.com without specifying a port.

As your business expands, you might add new services. For example, suppose you introduce a video streaming service. You want users to access it at myonlinestore.com/watch while keeping the original application available at myonlinestore.com/wear. Although these applications run in separate Deployments within the same cluster, each service might otherwise require its own load balancer—resulting in additional costs.

![The image illustrates a Google Cloud Platform architecture with a load balancer directing traffic to multiple "wear" services via a specific port.](https://kodekloud.com/kk-media/image/upload/v1752880570/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_180.jpg)

You also want to enable SSL to provide secure HTTPS access and centralize SSL termination, load balancing, and routing configurations within Kubernetes—avoiding dispersed SSL settings across various configurations or application code.

> [!important]
> **Key Benefit**
>
> Ingress enables centralized management of HTTP routing, SSL termination, and load balancing through native Kubernetes API objects.

Ingress provides a layer seven load balancing solution integrated into Kubernetes. After exposing the Ingress controller externally (using a NodePort or cloud load balancer), further configurations—such as load balancing, authentication, SSL, and URL-based routing—are managed through Ingress resources within the cluster.

![The image illustrates a Google Cloud Platform ingress architecture with load balancing for "wear" and "video" services.](https://kodekloud.com/kk-media/image/upload/v1752880571/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_440.jpg)

Without Ingress, you would be required to deploy a reverse proxy or dedicated load balancing solution (like NGINX, HAProxy, or Traefik) and manage complex configurations separately for each service. As the number of services grows, this approach becomes increasingly cumbersome.

---

## Ingress Controller

An Ingress controller is responsible for implementing Ingress rules. It continuously monitors the Kubernetes cluster for new Ingress resource definitions and dynamically reconfigures the underlying proxy (such as NGINX). Kubernetes does not include an Ingress controller by default—you must deploy one. Many options exist ([GCE](https://cloud.google.com/compute), [NGINX](https://www.nginx.com/), [Contour](https://projectcontour.io/), [HAProxy](https://www.haproxy.org/), [Traefik](https://traefik.io/), [Istio](https://istio.io/)), but in this guide we demonstrate the NGINX Ingress Controller which is actively supported by the Kubernetes project.

### NGINX Ingress Controller Deployment

Below is an example Deployment YAML for the NGINX Ingress Controller. This configuration deploys one replica of the controller with the label "nginx-ingress" using a dedicated NGINX image. The container's command initiates the controller.

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx-ingress-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-ingress
  template:
    metadata:
      labels:
        app: nginx-ingress
    spec:
      containers:
      - name: nginx-ingress-controller
        image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
        args:
        - /nginx-ingress-controller
```

To externalize the Ingress controller, create a NodePort service and a ConfigMap to decouple runtime configuration from the container image. The ConfigMap stores configuration parameters like log paths, keep-alive thresholds, SSL settings, and session timeouts.

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-configuration
```

The Service definition below exposes the Ingress controller on standard HTTP (port 80) and HTTPS (port 443) ports:

```
apiVersion: v1
kind: Service
metadata:
  name: nginx-ingress
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
  - name: https
    port: 443
    targetPort: 443
    protocol: TCP
  selector:
    app: nginx-ingress
```

For an enhanced deployment, include environment variables to capture the pod's metadata, and reference the ConfigMap for dynamic configuration:

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx-ingress-controller
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-ingress
  template:
    metadata:
      labels:
        app: nginx-ingress
    spec:
      containers:
      - name: nginx-ingress-controller
        image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
        args:
        - /nginx-ingress-controller
        - --configmap=$(POD_NAMESPACE)/nginx-configuration
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        ports:
        - name: http
          containerPort: 80
        - name: https
          containerPort: 443
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nginx-ingress-serviceaccount
```

In summary, setting up an Ingress controller involves deploying:

- A Deployment running the NGINX Ingress Controller.
- A Service to expose the controller externally.
- A ConfigMap for dynamic configuration.
- A Service Account with the necessary permissions.

![The image illustrates an ingress resource diagram for routing traffic to different subdomains and paths of "my-online-store.com" using NGINX.](https://kodekloud.com/kk-media/image/upload/v1752880572/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_810.jpg)

---

## Ingress Resources

An Ingress resource specifies rules for routing external HTTP/HTTPS traffic to backend services within your cluster. Whether you configure a simple default backend or more complex routing based on URL paths and hostnames, Ingress resources provide versatile traffic management.

### Single Backend Ingress

For simple scenarios, all incoming traffic is directed to a single service. The following Ingress definition routes all traffic to the "wear-service" on port 80:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear
spec:
  backend:
    serviceName: wear-service
    servicePort: 80
```

After creating the Ingress resource with:

```
kubectl create -f Ingress-wear.yaml
```

You can view it using:

```
kubectl get ingress
```

Expected output:

```
NAME           HOSTS   ADDRESS   PORTS   AGE
ingress-wear   *       80        2s
```

### Ingress with URL Path Rules

To route traffic based on URL paths (e.g., separating traffic for "/wear" and "/watch"), define rules that specify paths and their corresponding backend services. The example below routes traffic arriving at myonlinestore.com based on the URL path:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-wear-watch
spec:
  rules:
  - http:
      paths:
      - path: /wear
        backend:
          serviceName: wear-service
          servicePort: 80
      - path: /watch
        backend:
          serviceName: watch-service
          servicePort: 80
```

After creating the Ingress resource, verify its configuration with:

```
kubectl describe ingress ingress-wear-watch
```

A sample output might be:

```
Name:             ingress-wear-watch
Namespace:        default
Address:
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host    Path      Backends
  ----    ----      --------
  *       /wear    wear-service:80 (<none>)
          /watch   watch-service:80 (<none>)
Annotations:
Events:
  Type    Reason  Age   From                      Message
  ----    ------  ----  ----                      -------
  Normal  CREATE  14s   nginx-ingress-controller  Ingress default/ingress-wear-watch
```

### Ingress with Host-Based Rules

You can also route traffic based on domain names. For example, different subdomains can be configured to route traffic to distinct backend services. The following definition routes traffic based on the host field:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-host-based
spec:
  rules:
  - host: wear.my-online-store.com
    http:
      paths:
      - path: /
        backend:
          serviceName: wear-service
          servicePort: 80
  - host: watch.my-online-store.com
    http:
      paths:
      - path: /
        backend:
          serviceName: watch-service
          servicePort: 80
```

If the host field is omitted in your Ingress rules, the rules will apply to all incoming traffic. This flexibility enables routing based on URL paths as well as hostnames.

![The image shows a flowchart with URLs and rules for different paths, including "/wear," "/watch," and a 404 error page.](https://kodekloud.com/kk-media/image/upload/v1752880573/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_980.jpg)

In scenarios where a user navigates to an undefined URL (e.g., myonlinestore.com/listen or myonlinestore.com/eat), you can configure a default backend to return a 404 Not Found page.

![The image outlines URL paths and rules for an online store, categorizing them into four rules with associated images and a 404 error message.](https://kodekloud.com/kk-media/image/upload/v1752880574/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Ingress/frame_1030.jpg)

By leveraging various Ingress configurations—whether based on URL paths or hostnames—you can serve multiple services through a single Ingress controller. This centralized approach manages SSL termination, load balancing, and routing within Kubernetes, simplifying operations and reducing cloud resource costs.

For further reading and additional examples, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [NGINX Ingress Controller](https://www.nginx.com/)
- [Google Cloud Platform](https://cloud.google.com)

Deploy an Ingress controller (for instance, the NGINX Ingress Controller) and create appropriate Ingress resources to efficiently manage external access to your Kubernetes services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/35623c9b-b30e-4a5d-a868-cc9f30de96d2/lesson/72540fa4-652d-4392-b78b-0b0cf32a2510)**
>
> Watch video content
