# Cloud Provider Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Overview-of-Cloud-Native-Security/Cloud-Provider-Security)

---

## Table of Contents

- Cloud Provider Security
  - Threat Management and Response
  - Web Application Firewalls (WAF)
  - Container Security
  - Shared Responsibility Model
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Overview of Cloud Native Security

# Cloud Provider Security

In our Cats and Dogs election simulation, the attacker’s first move—after identifying host IPs—was a port scan. They discovered port 2375 (Docker) wide open, marking an entry point into the host and underlying Kubernetes infrastructure.

```
zsh port-scan.sh 104.21.63.124
21 for ftp ...                     Fail
22 for ssh ...                     Fail
…
2375 for docker...                 Success
…
~ took 4s
```

> [!important]
> **Warning**
>
> Exposed Docker ports (2375) allow unauthenticated remote container management. Always restrict access or enable TLS authentication.

A simple preventative measure is a network firewall. By filtering traffic based on IP, port, and protocol, you can hide or block open ports on your servers.

![The image illustrates a "Cats and Dogs" election simulation within a cloud infrastructure, protected by a firewall, with sources and an attacker depicted outside the firewall.](https://kodekloud.com/kk-media/image/upload/v1752880847/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/cats-dogs-election-simulation-cloud.jpg)

Cloud providers (AWS, Azure, GCP) supply multiple layers of infrastructure security—ranging from firewalls to advanced threat detection, WAFs, and container defenses. Below is an overview of these capabilities.

![The image illustrates cloud provider security capabilities, highlighting threat detection and application firewall features, along with logos for AWS, GCP, and Azure.](https://kodekloud.com/kk-media/image/upload/v1752880848/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/cloud-provider-security-threat-detection.jpg)

---

## Threat Management and Response

All three major cloud platforms offer managed SIEM/SOAR-style tools for continuous threat monitoring and automated response.

| Provider | Service                       | Description                                                                             | Docs                                             |
| -------- | ----------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Azure    | Azure Sentinel                | Integrated SIEM + SOAR for threat detection, hunting, and automated playbooks.          | https://docs.microsoft.com/azure/sentinel        |
| AWS      | Amazon GuardDuty              | ML-driven threat detection for AWS accounts and workloads, no rule authoring required.  | https://aws.amazon.com/guardduty                 |
| GCP      | Security Command Center (SCC) | Centralized dashboard for asset inventory, vulnerability scanning, and threat insights. | https://cloud.google.com/security-command-center |

![The image lists threat management and response techniques for cloud platforms, featuring AWS GuardDuty, GCP Security Command Center, and Microsoft Azure Sentinel.](https://kodekloud.com/kk-media/image/upload/v1752880850/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/cloud-threat-management-techniques.jpg)

---

## Web Application Firewalls (WAF)

To defend against OWASP Top 10 attacks and DDoS, each provider offers a native WAF solution.

| Provider | Service     | Key Features                                                                | Docs                                                      |
| -------- | ----------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| Azure    | Azure WAF   | Integrated with Application Gateway, OWASP rule sets, custom rules.         | https://docs.microsoft.com/azure/web-application-firewall |
| AWS      | AWS WAF     | Custom rule creation, integration with CloudFront & ALB, real-time metrics. | https://docs.aws.amazon.com/waf                           |
| GCP      | Cloud Armor | DDoS protection, geo-based access controls, custom security policies.       | https://cloud.google.com/armor                            |

![The image shows logos of different Web Application Firewalls (WAF) including Azure WAF, AWS WAF, and Google Cloud Armor, along with icons representing SQL Injections, XSS Attack, Load Balancer, and AWS CloudFront.](https://kodekloud.com/kk-media/image/upload/v1752880851/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/waf-logos-sql-injection-xss.jpg)

---

## Container Security

Container orchestration platforms combine built-in controls with ecosystem tools to enforce runtime and image compliance.

| Provider | Service                        | Security Features                                                           | Docs                                                                           |
| -------- | ------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Azure    | Azure Kubernetes Service (AKS) | Control-plane hardening, Azure Policy integration, image scanning.          | https://docs.microsoft.com/azure/aks                                           |
| AWS      | Amazon EKS + Bottlerocket      | Bottlerocket OS, `kube-bench` CIS checks, IAM roles for service accounts.   | https://aws.amazon.com/eks<br>https://aws.amazon.com/bottlerocket              |
| GCP      | Google Kubernetes Engine (GKE) | Private clusters, Anthos policy enforcement with OPA, binary authorization. | https://cloud.google.com/kubernetes-engine<br>https://www.openpolicyagent.org/ |

![The image shows logos related to container security, including AWS, GCP, Azure, EKS, GKE, AKS, Bottlerocket, Kube-bench, and CIS.](https://kodekloud.com/kk-media/image/upload/v1752880852/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/container-security-logos-aws-gcp-azure.jpg)

---

## Shared Responsibility Model

Cloud security is a partnership: the provider secures the cloud _infrastructure_, and you secure your workloads _in_ the cloud.

![The image illustrates a shared responsibility model for cloud services, showing how responsibilities are divided between Microsoft and the customer across different service types (SaaS, PaaS, IaaS, On-prem). It uses color coding to indicate which responsibilities are retained by the customer, shared, or transferred to the cloud provider.](https://kodekloud.com/kk-media/image/upload/v1752880853/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/shared-responsibility-model-cloud-services.jpg)

Every service tier (IaaS, PaaS, SaaS) shifts certain responsibilities. In AWS, for example, customers manage security _in_ the cloud, while AWS handles security _of_ the cloud.

![The image illustrates the AWS Shared Responsibility Model, highlighting the division of security responsibilities between the customer and AWS. It shows that customers are responsible for security "in" the cloud, while AWS is responsible for security "of" the cloud.](https://kodekloud.com/kk-media/image/upload/v1752880854/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/aws-shared-responsibility-model.jpg)

> [!important]
> **Note**
>
> Review the shared responsibility matrix for each cloud provider to ensure you cover all security controls—from networking rules to application hardening.

---

In this article, we examined how Azure, AWS, and Google Cloud approach:

- Threat Management & Response
- Web Application Firewalls
- Container Security
- The Shared Responsibility Model

Next, we’ll move into deeper infrastructure security practices.

![The image is a summary slide highlighting four key points about cloud security: attackers scanning for vulnerabilities, activating firewalls, cloud providers offering security tools, and the shared responsibility model.](https://kodekloud.com/kk-media/image/upload/v1752880855/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Cloud-Provider-Security/cloud-security-summary-four-points.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/a0ddd095-0114-4aa4-b3a5-2b31e773f241/lesson/12d92419-6307-474d-b78d-54eaea05ae23)**
>
> Watch video content
