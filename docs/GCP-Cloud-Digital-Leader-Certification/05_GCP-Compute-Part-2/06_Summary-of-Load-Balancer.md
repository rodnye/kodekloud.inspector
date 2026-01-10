# Summary of Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-Compute-Part-2/Summary-of-Load-Balancer)

---

## Table of Contents

- Summary of Load Balancer
  - TCP Protocol
  - Network Models: TCP/IP vs. OSI
  - Load Balancing Protocol Options
  - Health Checks
  - Core Concepts of Load Balancing
  - Conclusion
  - Watch Video
    - Example Scenario

---

## Content

GCP Cloud Digital Leader Certification

GCP Compute Part 2

# Summary of Load Balancer

In this lesson, we explore key terminologies and concepts related to load balancers that are essential for managing and optimizing network traffic.

## TCP Protocol

The Transmission Control Protocol (TCP) is a foundational element in networking. TCP ensures reliable, ordered, and error-checked delivery of data between servers and clients, forming a key part of the TCP/IP suite.

![The image illustrates the TCP Protocol with icons of various devices and a server, accompanied by text explaining TCP as the Transmission Control Protocol and its relation to TCP/IP.](https://kodekloud.com/kk-media/image/upload/v1752875280/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Summary-of-Load-Balancer/tcp-protocol-diagram-devices-server.jpg)

## Network Models: TCP/IP vs. OSI

Understanding network communication begins with layered models. Two of the most common models include:

- **TCP/IP Model**: Consists of four layers—Application, Transport, Network, and Network Interface.
- **OSI Model**: Divides communication into seven layers—Application, Presentation, Session, Transport, Network, Data Link, and Physical.

Each protocol operates at specific layers:

- HTTP functions at the Application layer.
- Ethernet operates at the Network Interface (or Data Link) layer.
- TCP works at the Transport layer.

![The image is a diagram comparing the TCP/IP model and OSI model layers, along with associated protocols and services used in load balancing. It lists layers such as Application, Transport, Network, and Network Interface for TCP/IP, and Application, Presentation, Session, Transport, Network, Data Link, and Physical for OSI.](https://kodekloud.com/kk-media/image/upload/v1752875281/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Summary-of-Load-Balancer/tcp-ip-osi-model-comparison-diagram.jpg)

## Load Balancing Protocol Options

When setting up a load balancer, you have three primary protocol options to choose from:

- **HTTP**: Ideal for static websites serving simple content.
- **TCP**: Suitable for services requiring reliable transport, such as streaming platforms.
- **UDP**: Often used for streaming and applications where speed is critical over reliability.

For example, streaming services like [YouTube](https://www.youtube.com) or [Netflix](https://www.netflix.com) might use TCP or UDP protocols depending on their specific requirements. Understanding these protocol options is crucial before diving deeper into TCP networking.

## Health Checks

Health checks ensure the backend services behind a load balancer are operational and ready to handle traffic. They continuously monitor the status of instance groups and help direct traffic to healthy nodes.

> [!important]
> **Note**
>
> Health checks are integral in minimizing downtime by automatically rerouting traffic when an instance group fails the health check, thereby maintaining continuous service.

![The image features a stethoscope and a medical cross icon, with text explaining that Google Cloud provides health-checking mechanisms for backend instances.](https://kodekloud.com/kk-media/image/upload/v1752875282/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Summary-of-Load-Balancer/google-cloud-health-check-stethoscope.jpg)

### Example Scenario

Imagine a setup where two instance groups host a website through a load balancer. Health checks monitor these instance groups; if one group encounters an issue (such as returning a "no upstream" error), the load balancer automatically directs traffic to the operational group. This ensures that users continue to access the website seamlessly despite underlying failures.

![The image is a diagram of a Google Cloud architecture showing mobile devices connecting to a cloud load balancer, which distributes traffic to two instance groups, each containing three virtual machines (VMs).](https://kodekloud.com/kk-media/image/upload/v1752875284/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Summary-of-Load-Balancer/google-cloud-architecture-diagram.jpg)

## Core Concepts of Load Balancing

Load balancers distribute incoming user traffic across multiple servers or groups to achieve several benefits:

- Reducing load on individual servers
- Enhancing overall performance and reliability
- Dynamically routing traffic to healthy instances to mitigate failures

Load balancers operate primarily at two layers:

- **Layer 4**: Handles TCP and UDP traffic.
- **Layer 7**: Manages application-level traffic, such as HTTPS.

They can be deployed as either external-facing or internal-facing systems, and the use of robust health checks is critical to ensure optimal performance.

![The image is a summary slide about load balancing, explaining its role in distributing user traffic, reducing performance risks, and mentioning Layer 4 and Layer 7 load balancing, as well as health checks.](https://kodekloud.com/kk-media/image/upload/v1752875285/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Summary-of-Load-Balancer/load-balancing-summary-slide.jpg)

## Conclusion

This article has provided a concise overview of load balancer concepts, from TCP protocols and network models to protocol options and health checks. Understanding these elements is crucial for configuring and maintaining efficient, resilient networks. We look forward to elaborating on these topics in upcoming lessons as we explore service deployment and advanced network configurations.

Thank you for reading, and stay tuned for more insights in our next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/da34bf7c-6568-4fbd-82a2-181ac35e826f/lesson/5e23e01d-fdf8-458b-af5e-3428a850ae8b)**
>
> Watch video content
