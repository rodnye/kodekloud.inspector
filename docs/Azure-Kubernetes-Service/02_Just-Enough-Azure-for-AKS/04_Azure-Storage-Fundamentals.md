# Azure Storage Fundamentals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Just-Enough-Azure-for-AKS/Azure-Storage-Fundamentals)

---

## Table of Contents

- Azure Storage Fundamentals
  - 1. Block Storage – Azure Disks
  - 2. File Storage – Azure Files & Azure NetApp Files
  - 3. Object Storage – Azure Blob & Data Lake Gen2
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Just Enough Azure for AKS

# Azure Storage Fundamentals

Azure Storage offers three primary services suited for different storage scenarios:

- **Block Storage (Azure Disks):** Persistent disks for VMs or Kubernetes Data Disks
- **File Storage (Azure Files & Azure NetApp Files):** SMB/NFS file shares for lift-and-shift or shared volumes
- **Object Storage (Azure Blob & Data Lake Storage):** Massively scalable unstructured data store

![The image illustrates three Azure storage categories: Block Storage (Azure Disk Storage), Object Storage (Azure Blob and Data Lake Storage), and File Storage (Azure Files and Azure NetApp Files).](https://kodekloud.com/kk-media/image/upload/v1752869477/notes-assets/images/Azure-Kubernetes-Service-Azure-Storage-Fundamentals/azure-storage-categories-diagram.jpg)

---

## 1\. Block Storage – Azure Disks

Azure Disks provides high-performance block storage with multiple SKUs to fit your IOPS and throughput needs. As you move from Standard HDD to Ultra Disk, performance and cost both increase. Premium SSD v2 slots in between Premium SSD and Ultra Disk for balanced performance.

| Disk SKU       | Backing Media    | Max IOPS      | Max Throughput (MB/s) |
| -------------- | ---------------- | ------------- | --------------------- |
| Standard HDD   | HDD              | Up to 500     | Up to 60              |
| Standard SSD   | SATA SSD         | Up to 6,000   | Up to 200             |
| Premium SSD    | NVMe SSD         | Up to 20,000  | Up to 900             |
| Premium SSD v2 | NVMe SSD (v2)    | Up to 80,000  | Up to 2,000           |
| Ultra Disk     | NVMe SSD (ultra) | Up to 160,000 | Up to 4,000           |

![The image compares different types of block storage (HDD, Standard SSD, Premium SSD, Premium SSD V2, Ultra Disk) based on IOPS and throughput in MB/s.](https://kodekloud.com/kk-media/image/upload/v1752869478/notes-assets/images/Azure-Kubernetes-Service-Azure-Storage-Fundamentals/block-storage-comparison-iops-throughput.jpg)

> [!important]
> **Warning**
>
> Premium SSD v2 cannot be used as an OS disk.
> In AKS, Azure Disks mount as `ReadWriteOnce`, so a disk is accessible by a single node at a time.

---

## 2\. File Storage – Azure Files & Azure NetApp Files

For workloads requiring shared file access, Azure Files offers fully managed SMB and NFS shares:

| SKU            | Protocols | Billing Model        | Throughput / Latency             |
| -------------- | --------- | -------------------- | -------------------------------- |
| Standard (HDD) | SMB / NFS | Pay for data used    | Lower throughput, higher latency |
| Premium (SSD)  | SMB / NFS | Provisioned capacity | High throughput, low latency     |

![The image compares two file storage options: "Standard" with 300 MBps and "Premium" with 10 GBps, highlighting differences in latency and pricing. It also shows a storage capacity indicator from 100 GB to 1 TB.](https://kodekloud.com/kk-media/image/upload/v1752869479/notes-assets/images/Azure-Kubernetes-Service-Azure-Storage-Fundamentals/file-storage-comparison-standard-premium.jpg)

> [!important]
> **Note**
>
> If you provision 1 TB on a Premium share but only use 100 GB, you pay for the full 1 TB.
> Consider Azure NetApp Files for enterprise-grade performance and multitenant workloads.

---

## 3\. Object Storage – Azure Blob & Data Lake Gen2

Azure Blob Storage is designed for massive volumes of unstructured data. You can select performance tiers (Standard or Premium) and enable a hierarchical namespace (ADLS Gen2) for analytics workloads. Four durability options ensure data resilience:

| Durability Option                          | Scope                | Copies & Replication                    |
| ------------------------------------------ | -------------------- | --------------------------------------- |
| Locally Redundant Storage (LRS)            | Single region        | 3 copies within one data center         |
| Zone-Redundant Storage (ZRS)               | Single region, zones | 3 copies across availability zones      |
| Read-Access Geo-Redundant Storage (RA-GRS) | Multi-region primary | LRS + read-only in paired region        |
| Geo-Zone-Redundant Storage (GZRS)          | Multi-region, zones  | ZRS + geo-replication to another region |

![The image illustrates a concept of "Geo-zone Redundant" object storage durability, showing a region with multiple availability zones represented by cylindrical icons.](https://kodekloud.com/kk-media/image/upload/v1752869480/notes-assets/images/Azure-Kubernetes-Service-Azure-Storage-Fundamentals/geo-zone-redundant-storage-durability.jpg)

In AKS, mount Blob Storage (including ADLS Gen2) directly into pods or containers with the \[Blob CSI driver\]\[blob-csi-driver\]. This enables native file-system access to logs, images, documents, and other unstructured data.

---

## Links and References

- [Azure Disks documentation](https://docs.microsoft.com/azure/virtual-machines/disks-types)
- [Azure Files documentation](https://docs.microsoft.com/azure/storage/files/)
- [Azure NetApp Files overview](https://docs.microsoft.com/azure/azure-netapp-files/)
- [Azure Blob Storage overview](https://docs.microsoft.com/azure/storage/blobs/)
- [Blob CSI driver GitHub](https://github.com/kubernetes-sigs/blob-csi-driver)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/4a7168ba-8262-47d0-a9de-7a4342b0b0f6/lesson/22b9ff96-ad61-48ba-800e-0a710e9ab168)**
>
> Watch video content
