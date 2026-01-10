# Services Loadbalancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Services-Loadbalancer)

---

## Table of Contents

- Services Loadbalancer
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Services Loadbalancer

In this article, we explore another service type: the LoadBalancer. Previously, we examined the NodePort service that exposes an application on a specific port of the worker nodes. Here, we focus on front-end applications such as the voting app and the result app.

Imagine that these pods are distributed across a cluster—say, a four-node cluster. To allow external users to access these applications, services of type NodePort were created. The NodePort service routes incoming traffic from designated ports on the worker nodes to the corresponding pods. With NodePort, you can reach the applications using any node's IP address along with its high port number. For example, if the voting app and the result app are bound to different IP-port combinations, users could access the application using any node's IP address and its specified port, even if the pods are running on only two of the nodes.

> [!important]
> **Note**
>
> While NodePort works, it forces users to remember multiple IP-port pairs, which can be inconvenient.

End users typically prefer a single URL—for instance, votingapp.com or resultapp.com—rather than juggling several combinations. One approach to provide a unified entry point is to set up a dedicated virtual machine as a load balancer, using tools like [HAProxy](https://www.haproxy.org) or [Nginx](https://www.nginx.com) to distribute the traffic across your nodes. However, managing an external load balancer can add complexity and overhead.

For a simpler solution, many cloud platforms such as [Google Cloud Platform (GCP)](https://cloud.google.com), [AWS](https://aws.amazon.com), or [Azure](https://azure.microsoft.com) offer integrated load balancing. When running Kubernetes on one of these supported cloud environments, you can simply change the service type from NodePort to LoadBalancer for your front-end services. Kubernetes then automatically provisions and configures a cloud-native load balancer, providing a single, user-friendly URL to access your application.

Below is a diagram that illustrates a cloud-based voting app architecture on Google Cloud Platform. The image shows nodes, pods, deployments, and a load balancer configured to handle the voting and result services:

![The image illustrates a cloud-based voting app architecture using Google Cloud Platform, featuring nodes, pods, deployments, and a load balancer for voting and result services.](https://kodekloud.com/kk-media/image/upload/v1752869744/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Services-Loadbalancer/frame_160.jpg)

> [!important]
> **Important**
>
> Keep in mind that the LoadBalancer service type only functions as intended on supported cloud environments. In unsupported settings—such as VirtualBox—the LoadBalancer type behaves like NodePort by exposing the service on a high port without providing external load balancing.

In upcoming articles, we will demonstrate how to deploy applications on cloud platforms and observe how this configuration works in action. Stay tuned for more detailed guides in our series.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/96eb0c1f-48cc-483e-bc1e-9a5a4c9e75e1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/3d48e7c7-442e-4491-9ec2-aa5e1fffccf2)**
>
> Practice lab
