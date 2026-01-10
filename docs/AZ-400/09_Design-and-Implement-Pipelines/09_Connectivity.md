# Connectivity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-Pipelines/Connectivity)

---

## Table of Contents

- Connectivity
  - Why Connectivity Matters
  - Azure Pipelines Network Components
  - Advanced Connectivity Features
  - Troubleshooting Connectivity Issues
  - Best Practices for Secure Connectivity
  - Conclusion
  - Further Reading
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement Pipelines

# Connectivity

In this article, you’ll learn how to architect secure, reliable connectivity for CI/CD pipelines using Azure DevOps. Proper network design ensures that agents communicate seamlessly with code repositories, build services, and deployment targets without compromising security.

## Why Connectivity Matters

Connectivity is the backbone of any DevOps workflow. When pipelines cannot reach external package feeds or self-hosted agents lack network access, builds fail and deployments stall. By designing a resilient network topology, you guarantee:

- Secure access to source code and artifacts
- Efficient data transfer between pipeline stages
- Compliance with organizational security policies

## Azure Pipelines Network Components

The following table summarizes the key elements involved in Azure DevOps connectivity:

| Component                      | Purpose                                                                       | Example or Link                                                    |
| ------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Internet                       | Provides access to public endpoints and third-party services                  | Download NuGet packages, Docker images                             |
| Virtual Network (VNet)         | Isolates pipeline resources in a private Azure network                        | [Azure VNets](https://docs.microsoft.com/azure/virtual-network/)   |
| Network Security Groups (NSGs) | Enforce inbound/outbound traffic rules at subnet and NIC levels               | Allow HTTPS (443) to Azure Artifacts                               |
| Agent Pools                    | Execute build and deployment jobs on Microsoft-hosted or self-hosted machines | Self-hosted agents in a VNet require NSG and routing configuration |
| Inbound/Outbound Port Rules    | Define which ports and protocols can enter or leave your VNet                 | Allow outbound 443, 80 for dependency retrieval                    |

## Advanced Connectivity Features

Azure provides private and service endpoints to enhance security by avoiding the public internet:

- **Private Endpoints**  
  Connect directly to Azure services like [Azure Storage](https://docs.microsoft.com/azure/storage/) over the Azure backbone.
- **Service Endpoints**  
  Extend your VNet identity to PaaS resources such as [Azure Key Vault](https://docs.microsoft.com/azure/key-vault/) and [Azure Container Registry](https://docs.microsoft.com/azure/container-registry/), ensuring traffic stays within Azure’s network.

## Troubleshooting Connectivity Issues

Even the best network designs encounter issues. Start with these steps:

- Verify NSG rules and route tables for correct port ranges and address prefixes.
- Check DNS resolution and outbound connectivity from self-hosted agents.
- Use Azure Monitor and [Network Watcher](https://docs.microsoft.com/azure/network-watcher/) to review logs for dropped packets or denied traffic.

> [!important]
> **Note**
>
> Enable NSG Flow Logs in Azure Monitor to capture detailed traffic information and speed up root cause analysis.

## Best Practices for Secure Connectivity

- Define least-privilege NSG rules and avoid overly permissive configurations.
- Keep self-hosted agent VM images and NSG rule sets up to date with security patches.
- Continuously monitor network performance metrics and security alerts.

> [!important]
> **Warning**
>
> Overly broad port rules increase attack surface. Always restrict access to specific IP ranges and protocols.

![The image illustrates best practices for connectivity, emphasizing regular updates and network performance monitoring. It includes icons representing updates and performance metrics, with accompanying text for each practice.](https://kodekloud.com/kk-media/image/upload/v1752867798/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Connectivity/connectivity-best-practices-updates-monitoring.jpg)

## Conclusion

Robust network connectivity is critical for seamless CI/CD operations in Azure DevOps. By correctly configuring VNets, NSGs, agent pools, and leveraging private or service endpoints, you’ll ensure your pipelines remain secure, reliable, and performant.

![The image is a flowchart illustrating the CI/CD process, including stages like Plan, Code, Build, Test, Release, Deploy, Operate, and Monitor. It emphasizes the importance of connectivity and proper network setup for efficient CI/CD.](https://kodekloud.com/kk-media/image/upload/v1752867800/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Connectivity/ci-cd-process-flowchart-connectivity.jpg)

## Further Reading

- [Azure Networking Concepts](https://docs.microsoft.com/azure/virtual-network/)
- [Azure DevOps Documentation](https://docs.microsoft.com/azure/devops/)
- [CI/CD with Azure DevOps](https://docs.microsoft.com/azure/devops/pipelines/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/55cf24db-89bc-4b93-bb75-7350d1593073/lesson/4943deeb-2550-4b02-9315-5733b94dfbde)**
>
> Watch video content
