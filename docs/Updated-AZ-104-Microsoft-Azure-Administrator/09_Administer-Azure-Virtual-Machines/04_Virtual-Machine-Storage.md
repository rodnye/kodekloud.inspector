# Virtual Machine Storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Virtual-Machines/Virtual-Machine-Storage)

---

## Table of Contents

- Virtual Machine Storage
  - OS Disk
  - Temporary Disk
  - Data Disks
  - Performance Tiers
  - Managed vs. Unmanaged Disks
  - Deploying a Virtual Machine
  - Watch Video
    - Managed Disks
    - Unmanaged Disks

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Virtual Machines

# Virtual Machine Storage

Understanding how storage works for virtual machines in Azure is crucial for deploying robust and efficient cloud resources. Each Azure virtual machine (VM) is equipped with different types of storage disks designed to serve specific purposes.

## OS Disk

The OS disk acts as the primary storage device where the operating system resides. This disk is a Virtual Hard Disk (VHD) stored in Azure Blob Storage, ensuring both persistence and durability of your OS.

## Temporary Disk

The temporary disk is located on the host machine and provides storage for ephemeral data, such as swap or page files.

> [!important]
> **Important**
>
> Data stored on the temporary disk may be lost during maintenance events or when the VM is redeployed, so use it only for data that does not require persistence.

## Data Disks

Data disks offer persistent storage for your applications and their data. The number of data disks you can attach depends on the VM size and family. For example, one VM family might support up to two data disks, while another may allow three. Choose a VM size that meets your application's storage needs.

## Performance Tiers

Selecting the right disk performance tier is essential to align with your application's workload requirements. Consider the following options:

- **Standard HDDs**: Suitable for basic workloads with moderate performance needs.
- **Standard SSDs**: Ideal for applications requiring better performance than HDDs.
- **Premium SSDs**: Recommended for I/O-intensive tasks that need high throughput and low latency.

When selecting a tier, evaluate factors such as Input/Output Operations Per Second (IOPS) and cost to determine the best fit for your environment.

## Managed vs. Unmanaged Disks

Azure offers two primary methods for managing your VM disks: managed and unmanaged.

### Managed Disks

Managed disks provide a simplified storage solution by abstracting the complexities of storage account management. Azure takes care of disk provisioning and storage account scalability, which helps avoid concerns about IOPS limits. Managed disks offer several built-in features, including:

- Snapshots and backups
- Site recovery support
- Integration with Azure availability sets to eliminate single points of failure

They are available in both standard and premium options, supporting both SSDs and HDDs.

### Unmanaged Disks

With unmanaged disks, you are responsible for creating and managing the storage accounts that hold your disks. This approach gives you more control but also requires you to manually handle scalability and monitor IOPS limits. Unmanaged disks store page blobs in storage accounts that you manage. Due to the increased management overhead, Microsoft generally recommends using managed disks for most deployments.

## Deploying a Virtual Machine

With a clear understanding of virtual machine storage components—OS disks, temporary disks, and data disks—as well as knowing the differences between managed and unmanaged disks and the importance of choosing the right performance tier, you're ready to deploy your Azure virtual machines.

In the upcoming sections, we will guide you through the process of creating a VM using the Azure portal. We will delve into the key factors to consider during deployment to ensure your configuration meets both performance and cost requirements.

Enjoy learning and deploying your Azure virtual machines, and leverage these insights to build a scalable and resilient infrastructure!

For additional resources, check out the following links:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Azure Virtual Machines Documentation](https://docs.microsoft.com/azure/virtual-machines/)
- [Terraform Registry](https://registry.terraform.io/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/34d9af06-fc33-4556-a3f2-2e7a5c5db484/lesson/f41c1fe0-a757-4826-841b-c44b6ae25b13)**
>
> Watch video content
