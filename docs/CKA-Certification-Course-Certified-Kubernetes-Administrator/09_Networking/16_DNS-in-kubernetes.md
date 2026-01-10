# DNS in kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/DNS-in-kubernetes)

---

## Table of Contents

- DNS in kubernetes
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# DNS in kubernetes

Welcome to this comprehensive guide on how DNS is managed within a Kubernetes cluster. In this article, we explore the mechanisms behind both service and pod DNS records, along with practical examples for enabling communication between pods. Before diving in, ensure you are familiar with the basics of DNS. If you're new to DNS concepts, please review the prerequisites below.

![The image lists prerequisites for understanding DNS, including DNS basics, Host/NS Lookup, Dig utility, record types (A, CNAME), and domain name hierarchy.](https://kodekloud.com/kk-media/image/upload/v1752869843/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DNS-in-kubernetes/frame_10.jpg)

Previously, we covered the fundamentals of DNS, including common tools such as `host`, `nslookup`, and `dig` alongside various DNS record types (A, CNAME, etc.) and the domain name hierarchy. We even demonstrated how to set up your own DNS server using CoreDNS. Now, we shift our focus to the DNS names assigned to various Kubernetes objects—like services and pods—and the different methods of accessing one pod from another.

![The image lists objectives related to DNS records, including assigned names, service DNS records, and POD DNS records.](https://kodekloud.com/kk-media/image/upload/v1752869844/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DNS-in-kubernetes/frame_30.jpg)

Imagine a three-node Kubernetes cluster with multiple pods and services distributed across them. Each node typically has a unique name and IP address registered in your organization's DNS server. However, our focus here is on the internal DNS resolution among the cluster’s pods and services. By default, when you create a cluster, Kubernetes deploys a built-in DNS server (unless manually configured otherwise), which facilitates name resolution for pods and services.

> [!important]
> **Scenario Overview**
>
> Consider a simple scenario with two pods and a service in your cluster:
>
> - A **test pod** with IP `10.244.1.5`.
> - A **web pod** with IP `10.244.2.5`.
>
> Even if these pods reside on different nodes (as indicated by their IP addresses), Kubernetes DNS assumes that all pods and services can be reached via their IP addresses. To allow the test pod to communicate with the web pod, a service named **web-service** is created. This service is assigned its own IP address (e.g., `10.107.37.188`) and automatically gets a DNS record mapping the service name to its IP.

![The image shows a network diagram with Kube DNS, hostnames, IP addresses, and symbols representing different services and nodes.](https://kodekloud.com/kk-media/image/upload/v1752869846/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DNS-in-kubernetes/frame_160.jpg)

Within the cluster, any pod can resolve and access the web service using its service name. For example, to access the web-service from the test pod, you could use:

```
curl http://web-service
# Output: Welcome to NGINX!
```

Earlier, we discussed namespaces in Kubernetes. Remember that pods within the same namespace (default namespace is usually "default") can communicate using just their short names. The image below illustrates the concept of separate namespaces and how naming differs between them.

![The image illustrates two namespaces, each containing different individuals named Mark, highlighting the concept of name differentiation within separate contexts.](https://kodekloud.com/kk-media/image/upload/v1752869847/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-DNS-in-kubernetes/frame_180.jpg)

In our scenario, because the test pod, web pod, and web-service are all in the **default** namespace, the test pod can simply refer to the service as "web-service." However, if the web-service were deployed in another namespace (for example, "apps"), you would need to access it using "web-service.apps." Here, "apps" becomes part of the fully qualified service name.

To illustrate DNS resolution with namespaces, consider the following examples:

```
# When the service is in the default namespace
curl http://web-service
# When the service resides in the 'apps' namespace
curl http://web-service.apps
# Using the fully qualified domain name (FQDN)
curl http://web-service.apps.svc.cluster.local
# Output: Welcome to NGINX!
```

Each namespace in Kubernetes gets its own subdomain. All services within that namespace are grouped under a subdomain called "svc." Additionally, the entire cluster is associated with a root domain (by default, `cluster.local`). Thus, the fully qualified domain name for a service in the "apps" namespace is:

web-service.apps.svc.cluster.local

Now, let’s discuss pod DNS records. By default, DNS records for pods are not created. However, this behavior can be explicitly enabled. When pod DNS records are activated, Kubernetes generates a DNS record for each pod by converting the pod’s IP address into a hostname—replacing dots (`.`) with dashes (`-`). The record includes the pod's namespace, is set to type "pod," and utilizes the cluster's root domain.

For example, if a test pod in the default namespace has the IP `10.244.2.5`, the corresponding DNS record becomes:

10-244-2-5.apps.pod.cluster.local

This DNS entry resolves to the pod's IP address. You can test the resolution with the command below:

```
curl http://10-244-2-5.apps.pod.cluster.local
# Output: Welcome to NGINX!
```

For more detailed information on Kubernetes DNS and other concepts, consider reviewing the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [CoreDNS Documentation](https://coredns.io/)

By understanding these DNS concepts, you can better manage communication within your Kubernetes cluster and ensure reliable service discovery in your environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/bb8dbd25-0589-45c9-b911-a0d8405e1d6a)**
>
> Watch video content
