# Network Policies InterPod Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Network-Policies-InterPod-Security)

---

## Table of Contents

- Network Policies InterPod Security
  - The OSI Model
  - Understanding Kubernetes Network Policies
  - Watch Video

---

## Content

OpenShift 4

Openshift Security

# Network Policies InterPod Security

At a high level, network policies manage traffic flow based on IP addresses and ports, effectively operating at OSI layers 3 and 4. Before diving into network policies, it's essential to revisit the OSI model.

## The OSI Model

The OSI model comprises seven layers:

1.  **Application Layer:** Determines how applications access network services.
2.  **Presentation Layer:** Ensures data is in a usable format, including handling encryption.
3.  **Session Layer:** Manages connections and controls ports and sessions.
4.  **Transport Layer:** Transmits data using protocols like TCP or UDP.
5.  **Network Layer:** Defines the physical path for data transfer through routing.
6.  **Data Link Layer:** Specifies how data is formatted for transmission over the network.
7.  **Physical Layer:** Transmits raw bitstreams over physical media.

![The image shows the OSI Model with its seven layers: Application, Presentation, Session, Transport, Network, Data Link, and Physical.](https://kodekloud.com/kk-media/image/upload/v1752882736/notes-assets/images/OpenShift-4-Network-Policies-InterPod-Security/osi-model-seven-layers.jpg)

In Kubernetes, the layered approach plays a critical role. For instance, an Ingress controller functions at the application layer, whereas network policies operate at the transport and network layers by regulating ports and IP addressing respectively.

![The image features a smiley face above a series of blue rectangles with text related to networking concepts, such as "Transmit Data using TCP/UDP," "Decide Physical Path," "Ports," and "IP Addressing."](https://kodekloud.com/kk-media/image/upload/v1752882737/notes-assets/images/OpenShift-4-Network-Policies-InterPod-Security/smiley-face-networking-concepts.jpg)

> [!important]
> **Key Insight**
>
> Understanding the OSI model is crucial not only in Kubernetes but in networking as a whole. Network policies leverage the OSI layers to enforce secure and efficient traffic control.

## Understanding Kubernetes Network Policies

Network policies in Kubernetes allow you to define how pods communicate with each other, as well as with external resources. These policies specify which endpoints (including pods, services, or entire namespaces) are allowed to exchange traffic, functioning similarly to rules enforced by routers or firewalls.

Imagine a scenario where you have two pods and require controlled traffic flow between them. Network policies let you set restrictions and permissions based on factors such as IP addresses, namespaces, and pod labels.

For example, consider the following requirements:

- Allow ingress traffic to a pod from a specific CIDR range (172.17.0.0/16), except for the subset 172.17.1.0/24.
- Permit additional traffic from pods within the namespace labeled `project: myproject` and pods with the label `role: frontend`.
- Restrict ingress traffic to only TCP port 6379 (commonly used by Redis).
- Limit egress traffic so that the pod can only communicate with IP addresses in the 10.0.0.0/24 range.

Below is an example network policy that demonstrates this configuration:

```
policyTypes:
  - Ingress
  - Egress
ingress:
  - from:
      - ipBlock:
          cidr: 172.17.0.0/16
          except:
            - 172.17.1.0/24
      - namespaceSelector:
          matchLabels:
            project: myproject
      - podSelector:
          matchLabels:
            role: frontend
  ports:
    - protocol: TCP
      port: 6379
egress:
  - to:
      - ipBlock:
          cidr: 10.0.0.0/24
```

> [!important]
> **Policy Breakdown**
>
> - **Ingress:**
> - Allows traffic from the CIDR range 172.17.0.0/16, with the exception of 172.17.1.0/24.
> - Permits traffic from pods in the namespace with the label `project: myproject` and pods with the label `role: frontend`.
> - Restricts allowed traffic to TCP port 6379.
> - **Egress:**
> - Limits outbound connections to IP addresses within the 10.0.0.0/24 range.

Any traffic not matching these specified criteria will be blocked. For example, if ingress traffic comes from an IP outside the allowed ranges (e.g., 172.16.0.0 or 172.15.0.0), it will be denied.

This policy serves as a comprehensive guide for managing both inbound and outbound traffic at a granular level. Now that we've explored the core concepts and configuration details, you're ready to see these network policies in action during the demo.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/82cf9467-7731-4d97-8308-92bf5ff8edfe)**
>
> Watch video content
