# Demo Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Demo-Services)

---

## Table of Contents

- Demo Services
  - Prerequisites
  - Step 1: Define the Service
  - Step 2: Verify the Service
  - Step 3: Access the Application
  - Next Steps
  - Links and References
  - Watch Video
    - Service Specification Breakdown

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Demo Services

In this lesson, you’ll learn how to expose your application Pods in Kubernetes by creating a Service of type `NodePort`. Services provide stable endpoints for accessing your workloads and enable load balancing across Pods.

## Prerequisites

Verify that your Deployment is running and has created Pods:

```
kubectl get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
myapp-deployment   6/6     6            6           23m
```

You should see `6/6` READY, meaning six Pods are available.

## Step 1: Define the Service

Create a directory called `service` (optional) and add a file named `service-definition.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30004
```

### Service Specification Breakdown

| Field              | Description                                                 | Example      |
| ------------------ | ----------------------------------------------------------- | ------------ |
| `type`             | Service exposure method (ClusterIP, NodePort, LoadBalancer) | `NodePort`   |
| `selector`         | Matches Pods by label                                       | `app: myapp` |
| `ports.port`       | Port exposed inside the cluster                             | `80`         |
| `ports.targetPort` | Port on the Pod that receives traffic                       | `80`         |
| `ports.nodePort`   | Port on each Node for external access (30000–32767)         | `30004`      |

> [!important]
> **Note**
>
> NodePort Services allocate a port between `30000` and `32767`. If you omit `nodePort`, Kubernetes assigns one automatically.

Save the file, then apply it:

```
kubectl apply -f service/service-definition.yaml
```

## Step 2: Verify the Service

Run the following command to list Services in the current namespace:

```
kubectl get svc
```

Example output:

```
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
kubernetes      ClusterIP   10.96.0.1       <none>        443/TCP         24h
myapp-service   NodePort    10.101.76.121   <none>        80:30004/TCP    5s
```

- **CLUSTER-IP**: Internal IP of the Service.
- **80:30004/TCP**: Maps Service port `80` to NodePort `30004`.

## Step 3: Access the Application

There are two ways to reach your application:

1.  Using your node’s IP address:

    ```
    minikube ip   # If you're on Minikube
    ```

    Then open your browser at

    ```
    http://<NODE_IP>:30004
    ```

2.  Using Minikube’s service tunnel:

    ```
    minikube service myapp-service --url
    ```

    This outputs a URL such as:

    ```
    http://192.168.99.101:30004
    ```

> [!important]
> **Warning**
>
> Exposing a Service via NodePort makes it accessible externally on the node’s network. Ensure your firewall rules and security groups are configured appropriately.

Open the URL in your browser. You should see the default NGINX welcome page:

![The image shows a default "Welcome to nginx!" page, indicating that the nginx web server is successfully installed and running, but further configuration is required.](https://kodekloud.com/kk-media/image/upload/v1752873988/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Services/nginx-welcome-page-default.jpg)

---

## Next Steps

- Explore other Service types such as `ClusterIP` and `LoadBalancer`.
- Learn about Ingress resources for advanced HTTP routing.
- Consult the [Kubernetes Services documentation](https://kubernetes.io/docs/concepts/services-networking/service/) for more details.

## Links and References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Minikube — Quickstart](https://minikube.sigs.k8s.io/docs/start/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/5c68b556-29eb-40eb-8eb7-bf20f1378079)**
>
> Watch video content
