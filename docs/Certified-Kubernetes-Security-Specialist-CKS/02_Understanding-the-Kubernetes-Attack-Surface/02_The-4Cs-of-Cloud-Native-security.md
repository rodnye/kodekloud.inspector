# The 4Cs of Cloud Native security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Understanding-the-Kubernetes-Attack-Surface/The-4Cs-of-Cloud-Native-security)

---

## Table of Contents

- The 4Cs of Cloud Native security
  - 1. Cloud Security
  - 2. Cluster Security
  - 3. Container Security
  - 4. Code Security
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Understanding the Kubernetes Attack Surface

# The 4Cs of Cloud Native security

In this article, we explore the Four C's of Cloud Native Security and break down the critical components that contribute to protecting cloud native environments. Previously, we reviewed a demo where an attacker exploited vulnerabilities in a Kubernetes-hosted voting application. Multiple weaknesses were identified, and now we will examine each aspect in detail.

## 1\. Cloud Security

The first “C” is cloud security, which focuses on protecting the overall infrastructure—be it a public cloud, private cloud, on-premises data center, or co-located environment. In our demo, the infrastructure hosting the Kubernetes cluster was insufficiently secured, permitting unrestricted access to cluster ports. Without proper network firewalls, remote access from the attacker’s system was easily achieved.

> [!important]
> **Note**
>
> Ensure that your cloud infrastructure includes robust network firewalls and proper access controls. This is not only essential for preventing unauthorized access but also for mitigating broader risks that can stem from exposed ports.

## 2\. Cluster Security

The second “C” focuses on securing the Kubernetes cluster itself. In the demo, the attacker compromised the system by exploiting a publicly accessible Docker daemon and an unsecured Kubernetes dashboard that lacked proper authentication and authorization measures.

To secure your cluster:

- Follow best practices to protect the Docker daemon.
- Secure the Kubernetes API by enforcing strong access controls.
- Restrict dashboard access with proper authentication.
- Implement network policies and ingress security for additional safeguard measures.

For more detailed guidance on these topics, refer to our earlier section on cluster setup and hardening.

## 3\. Container Security

The third “C” addresses container security. In the demonstration, the attacker was able to deploy containers without restrictions, including running containers in privileged mode. The absence of constraints on image sources or tags allowed the deployment of potentially harmful containers and unapproved applications.

To mitigate these risks:

- Enforce policies that allow only images from secure, trusted repositories.
- Disallow privileged mode for containers.
- Use container sandboxing to provide an additional layer of security.

These strategies also support efforts to minimize microservice vulnerabilities and enhance supply chain security.

## 4\. Code Security

The final “C” focuses on code security. Although not the main focus of this lesson, securing application code remains critical. Common pitfalls include hard coding credentials, passing sensitive information via environment variables, or transmitting data without TLS encryption.

Key recommendations include:

- Implement Secrets Management and vault solutions for critical information.
- Enable mTLS encryption to ensure secure communication between pods.

![The image outlines code security best practices across layers: code, container, cluster, and cloud, highlighting elements like authentication, authorization, and network policy.](https://kodekloud.com/kk-media/image/upload/v1752871755/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-The-4Cs-of-Cloud-Native-security/frame_170.jpg)

> [!important]
> **Security Reminder**
>
> Never overlook the importance of code security. Integrating strong security practices at the code level ensures that vulnerabilities are minimized, complementing other security layers such as container and cluster security.

## Summary

Adopting a comprehensive approach to cloud native security means addressing all four critical areas: cloud infrastructure, cluster configurations, container practices, and code integrity. By implementing robust security measures in each of these areas, you can significantly reduce the risk of exploits and ensure a more secure environment for your applications.

That concludes this lesson. See you in the next section!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/9c6c64a8-08e3-41f3-b9b4-30849336e6f9/lesson/bde8f9ba-c41f-4ec9-a7d4-7bd831f1e049)**
>
> Watch video content
