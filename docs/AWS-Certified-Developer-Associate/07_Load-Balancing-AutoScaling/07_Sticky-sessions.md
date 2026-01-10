# Sticky sessions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Sticky-sessions)

---

## Table of Contents

- Sticky sessions
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Sticky sessions

In this lesson, we explore Sticky Sessions—also known as Session Affinity—a feature that enables Elastic Load Balancers to bind a user's session to a specific instance. This ensures that all subsequent requests from that user are consistently processed by the same instance, which enhances session continuity and improves overall user experience.

Without Sticky Sessions enabled, the Load Balancer distributes incoming requests randomly across available instances. For example, a user's first request might be processed by instance A, the second by instance B, and the third by instance C, leading to a potentially inconsistent session experience.

> [!important]
> **Session Affinity Benefit**
>
> Enabling Sticky Sessions ensures that if a user's initial request is handled by a particular instance (e.g., instance A), then every subsequent request from that user will be routed to instance A. This consistent routing is vital for applications where session data must persist across multiple requests.

![The image illustrates the concept of sticky sessions, comparing request distribution without sticky sessions (requests go to different instances) and with sticky sessions (all requests go to the same instance).](https://kodekloud.com/kk-media/image/upload/v1752859091/notes-assets/images/AWS-Certified-Developer-Associate-Sticky-sessions/sticky-sessions-request-distribution.jpg)

This behavior is applied on a per-user basis. For instance, if one user’s traffic is continuously routed to instance A, traffic from another user might be consistently sent to instance B. Each user’s session remains isolated and consistently served by the designated instance.

For further insights on load balancing and session management, refer to the related [AWS Documentation](https://aws.amazon.com/elasticloadbalancing/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/c79ffb5c-2f53-4a9d-9de1-2564be468948)**
>
> Watch video content
