# Services LoadBalancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Services-LoadBalancer)

---

## Table of Contents

- Services LoadBalancer
  - 1. Recap: Kubernetes NodePort Service
  - 2. Limitations of NodePort
  - 3. Introducing the LoadBalancer Service
  - 4. Comparing Service Types
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Services LoadBalancer

In this lesson, we’ll explore the Kubernetes Service type `LoadBalancer`. We begin with a quick recap of **NodePort**, then introduce **LoadBalancer** and demonstrate how to provision a cloud load balancer automatically.

## 1\. Recap: Kubernetes NodePort Service

A **NodePort** exposes a Service on a static port (the _NodePort_) on every node in your cluster. For example, if you expose the voting app on port `31000` and the result app on port `32000`, external users can reach them via:

- http://<node-ip>:31000
- http://<node-ip>:32000

Even if your Pods run only on nodes with IPs 10.0.0.70 and 10.0.0.71, they remain accessible on the same port across all nodes in the cluster.

## 2\. Limitations of NodePort

While NodePort is straightforward, it has some drawbacks:

- No single friendly URL for end users
- Manual management of external load balancer infrastructure
- Exposure of high-range ports (30000–32767)

> [!important]
> **Warning**
>
> Managing separate load balancer VMs (HAProxy, NGINX, etc.) increases operational overhead.

## 3\. Introducing the LoadBalancer Service

On supported cloud platforms (GCP, AWS, Azure), setting `type: LoadBalancer` in your Service manifest will:

1.  Provision a native cloud load balancer
2.  Configure forwarding rules to cluster nodes
3.  Distribute traffic across Service endpoints

Here’s a sample `voting-service.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: voting-app
spec:
  type: LoadBalancer
  selector:
    app: voting
  ports:
    - port: 80
      targetPort: 80
```

Apply it with:

```
kubectl apply -f voting-service.yaml
kubectl get svc voting-app
# NAME         TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
# voting-app   LoadBalancer   10.0.173.200   34.68.123.456   80:32000/TCP   1m
```

![The image is a diagram of an example voting app architecture on Google Cloud Platform, showing nodes, pods, and services with a load balancer. It includes URLs for the voting and result apps.](https://kodekloud.com/kk-media/image/upload/v1752874033/notes-assets/images/Docker-Certified-Associate-Exam-Course-Services-LoadBalancer/voting-app-architecture-gcp-diagram.jpg)

> [!important]
> **Note**
>
> `type: LoadBalancer` only works on supported cloud environments. In unsupported setups (e.g., VirtualBox), Kubernetes falls back to assigning a NodePort without provisioning an external load balancer.

## 4\. Comparing Service Types

| Service Type | Use Case                                 | Behavior                                     |
| ------------ | ---------------------------------------- | -------------------------------------------- |
| NodePort     | Expose Service on a static port on nodes | Assigns a port from the 30000–32767 range    |
| LoadBalancer | Expose Service via cloud load balancer   | Provisions native LB and assigns external IP |

## Links and References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [LoadBalancer Service](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)
- [Cloud Provider Integration](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/9024d903-57f2-41ae-a659-3afa08da25a4)**
>
> Watch video content
