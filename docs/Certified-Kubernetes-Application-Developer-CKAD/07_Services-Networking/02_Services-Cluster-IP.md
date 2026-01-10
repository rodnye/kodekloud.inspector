# Services Cluster IP - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Services-Cluster-IP)

---

## Table of Contents

- Services Cluster IP
  - Creating a ClusterIP Service
  - Deploying the Service
  - How It Works
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Services Cluster IP

Hello, and welcome to this in-depth lesson on the Kubernetes ClusterIP service. In modern full-stack web applications, different Pods are responsible for managing various components of the application. For instance, you might have multiple Pods managing the front-end web servers, a set handling back-end servers, another group dedicated to a key-value store like Redis, and additional Pods operating persistent databases such as MySQL. In this architecture, the web front-end servers need to communicate seamlessly with the back-end servers, and the back-end servers, in turn, must interact with both the database and the Redis service.

Because Pods receive dynamic IP addresses that can change over time, relying on these IP addresses for internal communication is not reliable. Instead, Kubernetes services are used to logically group Pods under a single, stable interface. This design ensures that when a front-end Pod connects to the back-end service, the request is forwarded to one of the available back-end Pods, enabling effective load distribution. Additionally, by setting up separate services (for example, for Redis), backend Pods can communicate using persistent endpoints without having to accommodate IP address changes.

> [!important]
> **Note**
>
> The ClusterIP service type is the default configuration in Kubernetes. If the type is omitted from a service definition, Kubernetes automatically assumes it to be a ClusterIP service.

## Creating a ClusterIP Service

When creating a ClusterIP service, you define it in a YAML file. Below is an example of a service definition for the backend:

```
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  type: ClusterIP
  ports:
    - targetPort: 80
      port: 80
  selector:
    app: myapp
    type: back-end
```

In this example:

- **API Version:** v1
- **Resource Kind:** Service
- **Service Name:** "back-end"
- **Service Type:** ClusterIP (default)
- **Ports:** The service exposes port 80 and forwards traffic to the target port 80 on the backend Pods.
- **Selector:** Matches Pods labeled with `app: myapp` and `type: back-end`.

Below is the corresponding Pod definition with the matching labels:

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: back-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

## Deploying the Service

After defining these resources in separate files (e.g., `service-definition.yml` and `pod-definition.yml`), follow these steps to create and verify your service:

1.  Create the service using the following command:

    ```
    kubectl create -f service-definition.yml
    ```

2.  Verify the service status by listing all services:

    ```
    kubectl get services
    ```

You should see an output similar to the following:

```
> kubectl create -f service-definition.yml
service "back-end" created


> kubectl get services
NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)       AGE
kubernetes  ClusterIP   10.96.0.1        <none>        443/TCP      16d
back-end    ClusterIP   10.106.127.123   <none>        80/TCP       2m
```

> [!important]
> **Best Practice**
>
> Using DNS names provided by Kubernetes for communication between Pods offers greater stability and scalability compared to direct IP addressing.

## How It Works

In this configuration, other Pods within the cluster utilize the ClusterIP or DNS name of the backend service to communicate reliably despite underlying changes when Pods scale or redeploy. This ensures stable interaction between different application components.

For further reading, check out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Introduction to Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

That concludes this detailed discussion on Kubernetes ClusterIP services. A practical walkthrough of these concepts is provided in the accompanying demonstration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/fbf4ae17-0b2d-4cfc-8548-ffd68e8763ad)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/161fb0fe-8424-4ba8-b063-f884b044f700)**
>
> Practice lab
