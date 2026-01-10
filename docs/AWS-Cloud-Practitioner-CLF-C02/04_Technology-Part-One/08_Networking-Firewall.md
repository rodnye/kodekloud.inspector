# Networking Firewall - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-One/Networking-Firewall)

---

## Table of Contents

- Networking Firewall
  - Firewall Fundamentals
  - Stateless vs. Stateful Firewalls
  - AWS Firewall Constructs
  - Summary
  - Watch Video
    - Key Firewall Rules
    - Stateless Firewalls
    - Stateful Firewalls
    - Network Access Control Lists (NACLs)
    - Security Groups

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part One

# Networking Firewall

In this lesson, we explore the concept of firewalls within AWS and how they secure your applications by filtering network traffic. We discuss the differences between stateless and stateful firewalls and demonstrate how to implement firewall rules using AWS constructs.

## Firewall Fundamentals

When an application listens on port 443, the following typical flow occurs:

- A client sends a request where the destination port is 443 and the source port is a random ephemeral port.
- The server responds using port 443 as the source port, and the destination port is the client’s ephemeral port.

This communication flow underscores the need for proper firewall controls. Firewalls monitor network traffic and enforce predefined rules to allow only specific types of traffic based on criteria such as port numbers.

### Key Firewall Rules

There are two primary types of firewall rules:

- **Inbound Rules:** Control incoming traffic directed toward a device.
- **Outbound Rules:** Control outgoing traffic from a device.

For instance, if you set up a firewall for a server:

- An inbound rule will explicitly allow incoming traffic on port 443.
- An outbound rule will allow traffic destined to the client’s ephemeral port or any other permitted destination.

Consider a scenario where the server needs to fetch updates from another server that listens on port 80. In this case:

- The outbound rule would allow traffic to port 80.
- The inbound rule would then allow responses from the connection.

> [!important]
> **Firewall Rules Reminder**
>
> Remember, both stateless and stateful firewalls require careful configuration of both inbound and outbound rules to ensure secure communication.

## Stateless vs. Stateful Firewalls

### Stateless Firewalls

Stateless firewalls do not track the state of network connections. This means they require explicit rules for both inbound and outbound traffic. A matching rule must be added for the request and its corresponding response.

### Stateful Firewalls

Stateful firewalls maintain the state of active connections. When a request is allowed by an inbound rule (for example, traffic on port 443), the return traffic is automatically permitted without needing an explicitly defined outbound rule. Similarly, when the server initiates a connection (such as sending a request to port 80), only the outbound rule is required—the firewall will automatically allow the inbound response.

![The image explains stateful firewalls, showing how they manage inbound and outbound requests and responses by allowing specific IP/ports.](https://kodekloud.com/kk-media/image/upload/v1752861963/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Firewall/frame_290.jpg)

## AWS Firewall Constructs

Within AWS, two key firewall features help control network access: Network Access Control Lists (NACLs) and Security Groups.

### Network Access Control Lists (NACLs)

NACLs act as firewalls at the subnet level. Here are some key points:

- They evaluate traffic entering and leaving a subnet based on predefined rules.
- They are stateless; you must configure rules for both ingress (incoming) and egress (outgoing) traffic.
- They do not filter traffic between resources within the same subnet.

### Security Groups

Security groups act as individualized firewalls for AWS resources such as EC2 instances, load balancers, and RDS databases. Their characteristics include:

- They provide a dedicated firewall for each associated resource.
- They are stateful, meaning you need to define only the initial traffic direction; the return traffic is allowed automatically.
- You can attach multiple security groups to a single resource or use one security group across multiple resources (for example, all web servers on port 443).

![The image compares NACLs and Security Groups, explaining their roles in monitoring traffic and acting as firewalls within a Virtual Private Cloud (VPC) setup.](https://kodekloud.com/kk-media/image/upload/v1752861965/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Firewall/frame_450.jpg)

## Summary

- **Stateless Firewalls:** Require explicit rules for both inbound and outbound traffic.
- **Stateful Firewalls:** Track connection states, so only the initiating direction of traffic needs a rule.
- **Network ACLs:** Filter traffic at the subnet level and are stateless.
- **Security Groups:** Serve as personalized firewalls for individual resources and are stateful.

![The image summarizes firewall types: stateless firewalls require explicit permissions, stateful firewalls track requests, Network ACLs are stateless, and Security Groups are stateful.](https://kodekloud.com/kk-media/image/upload/v1752861968/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Networking-Firewall/frame_520.jpg)

> [!important]
> **Key Takeaway**
>
> Understanding the differences between stateless and stateful firewalls—along with how NACLs and Security Groups operate—ensures that you can properly secure your AWS infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/dcba3ea8-580a-4aac-ad89-48969e6876ee/lesson/1ef2a457-b99c-45f2-a080-3b18b74ad978)**
>
> Watch video content
