# Services Load balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Services/Services-Load-balancer)

---

## Table of Contents

- Services Load balancer
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Services

# Services Load balancer

In this article, we explore the LoadBalancer service type in Kubernetes and how it simplifies external application access in cloud-based environments.

When you deploy applications such as a voting app and a result app across multiple nodes, a NodePort service is typically used to expose these applications on specific ports of each node. For instance, if your cluster consists of four nodes, a NodePort service listens on a fixed port on each node and forwards incoming traffic to the appropriate Pods. Although this method technically enables access via multiple URLs (each node’s IP combined with the NodePort), end users usually prefer a single, user-friendly URL like "votingapp.com" or "resultapp.com".

> [!important]
> **NodePort Service Recap**
>
> A NodePort service routes external traffic on a specific port to Pods across all nodes, even if the Pods only reside on a subset of those nodes.

Consider a scenario where the voting and result applications' Pods are running on nodes with IPs 70 and 71. Even though the applications are hosted on just two nodes, the service will expose them on the NodePort across all nodes in the cluster. This results in multiple URLs for access, which can be confusing for users.

One common solution to consolidate these access points is to deploy an external load balancer on a dedicated VM using tools such as HAProxy or Nginx. These load balancers can be configured to route incoming traffic to the correct nodes based on the URL. However, this approach requires extra maintenance and configuration effort.

![The image illustrates an example voting app architecture with nodes, pods, deployments, and services, managed by a load balancer, showing IP addresses and service ports.](https://kodekloud.com/kk-media/image/upload/v1752884971/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Services-Load-balancer/frame_150.jpg)

A more streamlined solution is available when operating on supported cloud platforms like Google Cloud, AWS, or Azure. Kubernetes can automatically integrate with the cloud provider’s native load balancer, significantly reducing the configuration overhead. To leverage this feature, you would simply change your service type from NodePort to LoadBalancer, as shown in the configuration below:

```
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  ports:
    - targetPort: 80
      port: 80
      nodePort: 30008
```

> [!important]
> **Platform Support Reminder**
>
> This LoadBalancer functionality only works on supported cloud platforms. In environments like VirtualBox or local setups, setting the service type to LoadBalancer will default to NodePort behavior, exposing your application on a high-numbered port without an external load balancer.

In upcoming sections, we will demonstrate how to deploy your application on various cloud platforms and showcase the external load balancer in action.

Thank you for reading this guide on Kubernetes services and load balancing. For more detailed information, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/7e491918-c5e6-47e3-b4b2-54e6e311292c/lesson/d8b93ce0-66cc-4b70-9b14-68757779e689)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/7e491918-c5e6-47e3-b4b2-54e6e311292c/lesson/e4cc834c-9548-4b25-bc89-a4d9b0445f9d)**
>
> Practice lab
