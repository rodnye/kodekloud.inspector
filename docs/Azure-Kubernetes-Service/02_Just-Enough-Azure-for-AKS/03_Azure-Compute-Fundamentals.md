# Azure Compute Fundamentals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Just-Enough-Azure-for-AKS/Azure-Compute-Fundamentals)

---

## Table of Contents

- Azure Compute Fundamentals
  - Common Azure VM Series and Use Cases
  - Choosing the Right VM Series
  - Understanding Azure VM Naming Conventions
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Just Enough Azure for AKS

# Azure Compute Fundamentals

Azure offers a rich portfolio of virtual machine (VM) types and sizes to support workloads from development and testing to mission-critical production systems and large-scale deployments. Most VM series are also compatible with Azure Kubernetes Service (AKS), giving you flexibility in containerized environments.

![The image is a diagram titled "Azure Compute" showing different types of virtual machine workloads, including development, test, burstable, small scale systems, mission-critical production, and large systems.](https://kodekloud.com/kk-media/image/upload/v1752869471/notes-assets/images/Azure-Kubernetes-Service-Azure-Compute-Fundamentals/azure-compute-virtual-machine-workloads-diagram.jpg)

Each VM series is optimized for specific workload profiles—compute-intensive, memory-optimized, storage-optimized, GPU-accelerated, and more. If you’re new to Azure, it’s important to understand these series and their naming conventions. For a complete list of available VM sizes and their specifications, see the official Azure VM sizes reference.

> [!important]
> **Note**
>
> For detailed specifications and regional availability, visit [Azure VM Sizes](https://aka.ms/azure-vm-sizes).

![The image illustrates different types of Azure Compute virtual machines: compute intensive, memory optimized, storage optimized, and GPU accelerated, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752869472/notes-assets/images/Azure-Kubernetes-Service-Azure-Compute-Fundamentals/azure-compute-virtual-machines-icons.jpg)

## Common Azure VM Series and Use Cases

| VM Series          | Use Case                                                 | Example Workloads                           |
| ------------------ | -------------------------------------------------------- | ------------------------------------------- |
| Memory-optimized   | High memory-to-core ratio, premium disk support          | SQL Server, SAP HANA, in-memory caching     |
| General-purpose    | Balanced CPU-to-memory ratio                             | Web servers, small to medium databases      |
| Storage-optimized  | High disk throughput and low-latency I/O with local NVMe | Big data, ETL, data warehousing             |
| GPU-accelerated    | Graphics-intensive and AI/deep learning tasks            | Model training, rendering, HPC simulations  |
| ARM-based (Ampere) | Cost-effective performance for Linux containers          | Microservices, CI/CD agents, edge computing |

## Choosing the Right VM Series

When selecting a VM series, align its capabilities with your workload requirements:

- **Memory-optimized (E-series)**  
  Optimal for mission-critical databases and in-memory analytics.
- **General-purpose (D-series)**  
  Ideal for balanced workloads like web servers and small databases.
- **Storage-optimized (Ls-series)**  
  Best for applications needing high disk I/O throughput.
- **GPU-accelerated (N-series)**  
  Designed for AI, machine learning, and graphics rendering.
- **ARM-based (Ampere Altra)**  
  Provides a favorable performance-to-cost ratio for Linux container workloads.

## Understanding Azure VM Naming Conventions

Azure VM names encode key details about the series, size, features, and generation. Decoding these names simplifies the selection process:

```
Standard_E64ds_v5
│        │ │  └─ v5: Latest version
│        │ └──── d: Premium disk & cache support
│        └──────── 64 vCPUs
└────────────────── Series E: Memory-optimized
```

- **Standard**: Indicates billing tier
- **Series** (e.g., E, D, Ls, N)
- **vCPU count**
- **Features** (d = premium disks, s = support for accelerated networking)
- **Version** (v<number>)

![The image illustrates Azure Compute with connections to Intel, Ampere, and AMD, featuring the Linux mascot.](https://kodekloud.com/kk-media/image/upload/v1752869473/notes-assets/images/Azure-Kubernetes-Service-Azure-Compute-Fundamentals/azure-compute-intel-ampere-amd-linux.jpg)

> [!important]
> **Warning**
>
> Selecting an unsupported VM size for your AKS cluster can lead to scheduling failures. Always verify compatibility in the [AKS VM compatibility guide](https://docs.microsoft.com/azure/aks/quotas-skus-regions).

---

## Links and References

- [Azure VM Sizes Reference](https://aka.ms/azure-vm-sizes)
- [Azure Kubernetes Service (AKS) Documentation](https://docs.microsoft.com/azure/aks/)
- [Compute Optimized VMs Overview](https://docs.microsoft.com/azure/virtual-machines/sizes-compute)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/4a7168ba-8262-47d0-a9de-7a4342b0b0f6/lesson/068d1a7c-a00b-44a1-8532-237b6a7bf960)**
>
> Watch video content
