# Design for Azure Disks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-Azure-Disks)

---

## Table of Contents

- Design for Azure Disks
  - Azure Disk Types
  - Azure Disk Caching
  - Disk Encryption and Security Options
  - Configuring Disk Settings in the Azure Portal
  - Next Steps
  - Watch Video

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for Azure Disks

This article outlines essential design considerations for Azure Disks, offering guidance on selecting the right disk type, implementing effective caching strategies, and ensuring robust security through encryption. Azure Disks serve as virtual hard disks for your virtual machines (VMs) and are available in managed and unmanaged options. With unmanaged disks, you must manage the underlying storage account, while managed disks are maintained as a service by Microsoft. Microsoft highly recommends using managed disks for enhanced performance and ease of management.

## Azure Disk Types

Azure offers a range of disk types to match varying performance requirements and budget constraints. Choose the disk tier based on your workload's IOPS and throughput needs.

1.  **Ultra SSD**  
    Ultra SSD delivers extremely high IOPS and throughput, making it ideal for I/O-intensive applications such as SAP or transaction-heavy databases like Oracle and SQL.

    > [!important]
    > **Note**
    >
    > Ultra SSD can only be used as a data disk and is supported on select VM SKUs only.

2.  **Premium SSD**  
    Premium SSDs are designed for performance-sensitive workloads, offering throughput of up to 900 megabytes per second and between 160K to 20K IOPS. They are suitable for both operating system and data disks. Typically, a VM is provisioned with a Premium SSD by default, though alternative cost-effective options exist.
3.  **Standard SSD**  
    With up to 750 megabytes per second in throughput and 6K IOPS, Standard SSDs are an excellent choice for web servers and medium transaction workloads. They offer enhanced speeds compared to HDDs due to storage on SSDs, though with lower performance than Premium SSDs.
4.  **Standard HDD**  
    Standard HDDs offer the most economical solution with relatively low throughput and IOPS. They work best for backup solutions, non-critical workloads, or development environments.

![The image is an infographic comparing four types of Azure disks: Ultra SSD, Premium SSD, Standard SSD, and Standard HDD, highlighting their performance metrics and ideal use cases.](https://kodekloud.com/kk-media/image/upload/v1752867114/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/azure-disks-comparison-infographic.jpg)

## Azure Disk Caching

Optimizing read and write operations is critical to enhancing performance on your virtual disks. Azure Disk Caching offers three configurable levels:

1.  **None**  
    No caching is applied. Use this option for disks that are write-only or where cached reads are not required.
2.  **Read-only**  
    In read-only caching, data that is read from the disk is temporarily stored in the cache, which can accelerate subsequent read operations—similar to browser or DNS caching.
3.  **Read-write**  
    Ideal for applications with mixed read and write demands, this option writes data to the cache first before persisting it to disk. This strategy enhances both read and write efficiency.

![The image is an infographic from KodeKloud about enhancing performance using disk caching, showing three options: "None," "Read-only," and "Read-write," each with a description and a plant graphic symbolizing growth.](https://kodekloud.com/kk-media/image/upload/v1752867115/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/disk-caching-performance-infographic.jpg)

## Disk Encryption and Security Options

Ensuring that your data remains secure is paramount. Azure provides multiple encryption strategies to protect data on your disks:

1.  **Azure Disk Encryption (ADE)**  
    ADE uses BitLocker for Windows VMs and DM-Crypt for Linux VMs to encrypt disk data. The encryption keys are securely stored in an Azure Key Vault, ensuring that even if a disk snapshot is obtained, unauthorized access is mitigated.
2.  **Server-Side Encryption (SSE)**  
    SSE automatically encrypts all data written to the storage account. Enabled by default for all storage accounts, SSE can use either Microsoft-managed keys or customer-managed keys (CMK).

    > [!important]
    > **Warning**
    >
    > Choosing CMK may restrict the use of ADE or host-level encryption, so ensure compatibility based on your security requirements.

3.  **Encryption at Host**  
    This approach encrypts data at the VM host level, safeguarding data both at rest and in transit. However, if using a customer-managed key with SSE, ADE or encryption at host cannot be combined. With Microsoft-managed keys, combining SSE with ADE adds an extra layer of security through a defense-in-depth strategy.

![The image is an infographic titled "Securing data disks," explaining Azure's encryption strategies, including Azure Disks Encryption, Server-Side Encryption, and Encryption at host. It provides brief descriptions of each method's purpose and functionality.](https://kodekloud.com/kk-media/image/upload/v1752867116/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/securing-data-disks-azure-encryption.jpg)

## Configuring Disk Settings in the Azure Portal

Follow these steps to configure disk caching and encryption through the Azure Portal:

1.  **Disk Caching**
    - Access your VM in the Azure Portal and navigate to the disk settings.
    - Modify the caching option—switch between read-write, read-only, or none—depending on your workload's demands.
    - The selected caching mode determines whether data is read directly from the disk or via a host-level cache, thereby impacting performance.

    ![The image shows a Microsoft Azure portal interface displaying the disk settings for a virtual machine named "sde-vm-01," including options for OS and data disks.](https://kodekloud.com/kk-media/image/upload/v1752867117/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/azure-portal-disk-settings-sde-vm-01.jpg)

2.  **Azure Disk Encryption and SSE**
    - In the disk's additional settings, you can configure encryption options.
    - The ADE section lets you select the disk for encryption and specify an Azure Key Vault for key management.
    - SSE settings are visible by default, typically set to use a platform-managed key. Switching to customer-managed keys is possible when the VM is deallocated, though this can limit the use of other encryption options like ADE or encryption at host.

    ![The image shows the "Disk settings" page in the Microsoft Azure portal, where options for Ultra Disk compatibility, encryption at host, and encryption settings are configured.](https://kodekloud.com/kk-media/image/upload/v1752867118/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/azure-disk-settings-page.jpg)
    - To access further encryption configurations, open the disk details, locate the encryption settings, and review the key management options available.

    ![The image shows a Microsoft Azure portal page focused on the encryption settings for a virtual machine disk. It includes options for key management, with a dropdown menu for selecting a platform-managed key.](https://kodekloud.com/kk-media/image/upload/v1752867119/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Disks/azure-portal-encryption-settings-vm.jpg)

## Next Steps

Armed with an understanding of the different Azure disk types, caching strategies, and encryption methods, you are well-equipped to design secure and efficient storage solutions on Azure. In our next discussion, we will delve deeper into storage security design considerations and additional measures to protect your data.

This concludes our detailed guide on designing for Azure Disks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/3b909129-beb9-4da2-9bf3-3fa975ca4d26)**
>
> Watch video content
