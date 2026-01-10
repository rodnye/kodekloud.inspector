# Design for Azure Site Recovery - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-business-continuity-solution/Design-for-Azure-Site-Recovery)

---

## Table of Contents

- Design for Azure Site Recovery
  - Overview
  - Configuring ASR in the Azure Portal
  - Recovery Plans and Test Failover
  - Combining ASR with Azure Backup
  - Conclusion
  - Watch Video
    - Steps to Enable Replication

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a business continuity solution

# Design for Azure Site Recovery

Azure Site Recovery (ASR) is a robust disaster recovery solution that ensures business continuity and disaster recovery (BCDR) for both Azure-based and on-premises or multi-cloud resources. This guide explains how ASR replicates virtual machines (VMs) between regions, supports seamless migrations, and manages retention policies—all configured via the Azure Portal.

## Overview

Imagine you have a set of VMs running in East US. With ASR, these machines can be replicated to a secondary region, such as West US. In the event of a regional outage, you can quickly initiate a failover, enabling your VMs to come online from the secondary region. Key ASR scenarios include:

- **Business Continuity and Disaster Recovery (BCDR):** Replicate your entire infrastructure to a secondary site, with the option to perform a failover when needed.
- **Disaster Recovery Drills:** Test failovers to validate the effectiveness of your recovery plan.
- **Migration:** While Azure Migrate is available, ASR facilitates replication of on-premises environments to the cloud with a simple cutover to the replicated resources.
- **Continuous Data Replication and Retention:** Configure retention periods for restore points as ASR continuously replicates data between regions.

The diagram below illustrates the fundamental concept of replicating VMs from East US to West US:

![The image illustrates Azure Site Recovery, showing disaster recovery processes between East US and West US regions, with steps for BCDR, migration, and replication.](https://kodekloud.com/kk-media/image/upload/v1752866820/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-site-recovery-bcdr-diagram.jpg)

## Configuring ASR in the Azure Portal

Setting up ASR involves using a Recovery Services Vault in the Azure Portal, which supports both backup and site recovery operations.

![The image shows the Microsoft Azure portal interface, displaying various Azure services and a list of recent resources with their types and last viewed times.](https://kodekloud.com/kk-media/image/upload/v1752866822/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-portal-interface-services-list.jpg)

### Steps to Enable Replication

1.  **Open the Recovery Services Vault**  
    In the Azure Portal, locate and open a Recovery Services Vault. Ensure the vault is placed in the correct region—if your source VM is in East US, choose a vault in the secondary region (such as West US).
2.  **Select Enable Replication**  
    Click on **"Enable Replication"** to start replicating your Azure Virtual Machine or other supported infrastructures (e.g., VMware, Hyper-V, AWS, or GCP environments).

    ![The image is a screenshot of the Microsoft Azure portal, specifically the Site Recovery section, showing options for protecting infrastructure for disaster recovery with Azure virtual machines, VMware machines, and Hyper-V machines.](https://kodekloud.com/kk-media/image/upload/v1752866823/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-site-recovery-disaster-recovery.jpg)

3.  **Configure Source and Target Details**
    - Verify that the VM is located in East US.
    - Choose the appropriate subscription and resource group.
    - Indicate that disaster recovery between availability zones is not required (set to "No").
    - Select the target VM and click **Next**.

4.  **Set Replication Settings**  
    Provide the necessary replication settings:
    - **Target Location:** West US
    - **Subscription & Resource Group:** Choose the target subscription and resource group
    - **Failover Network:** Specify the correct network for failover
    - **Failover Subnet:** Choose or configure the subnet for the VM in the target region

    ![The image shows a Microsoft Azure portal screen for enabling replication settings in Site Recovery, with options for location, resource group, network, storage, and availability.](https://kodekloud.com/kk-media/image/upload/v1752866825/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-portal-replication-settings.jpg)

    > [!important]
    > **Note**
    >
    > If you do not specify names for target resources, Azure will automatically append an "ASR" suffix to source resource names.

5.  **Configure Retention Policies and Extensions**  
    Before finalizing, set up the retention policies and any extension settings. By clicking **"Enable Replication"**, the process starts replicating your VM’s disks from East US to West US. Note that several background resources will be provisioned during this process, which may take some time.

    ![The image shows a Microsoft Azure interface for enabling replication, with options to set a replication policy, manage replication groups, and configure extension settings. The user is on the "Manage" step of the process.](https://kodekloud.com/kk-media/image/upload/v1752866826/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-replication-interface-manage.jpg)

6.  **Monitor Replication Progress**  
    After initiating replication, monitor the process to track the creation of resources, restore points, and policy applications. Review the summary of replication settings and target resources:

    ![The image shows a Microsoft Azure interface for enabling replication in a site recovery service. It includes a summary of settings such as region, subscription, and virtual machine details.](https://kodekloud.com/kk-media/image/upload/v1752866828/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-replication-site-recovery-interface.jpg)

    Additionally, a cache storage account is created in the source region to store data temporarily before it is transferred.

## Recovery Plans and Test Failover

ASR supports creating customized recovery plans, which is particularly beneficial for multi-tier applications. For instance, in a three-tier architecture (front-end, mid-tier, and database), a recovery plan allows you to specify the failover sequence. You might configure the database to power up first, followed by the mid-tier and then the front-end, ensuring proper application functionality.

Test and manual failovers are initiated via the Recovery Services Vault. Keep in mind that synchronization and replication processes might require 20 minutes or more. The system also issues a warning if a test failover hasn’t been executed within the last 180 days.

Once synchronization is complete and the status is displayed as "protected," you can perform a failover, which creates a new VM in West US. The diagram below displays the replication status and monitoring details for a VM:

![The image shows a Microsoft Azure portal interface displaying the replication status of a virtual machine named "sde-vm-01," indicating a healthy replication status and no errors. It includes details about failover readiness, configuration issues, and agent status.](https://kodekloud.com/kk-media/image/upload/v1752866829/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-portal-sde-vm-replication-status.jpg)

The current Recovery Point Objective (RPO) is two minutes. Failovers can be executed manually via the portal or automated using Azure Monitor and automation runbooks. Once failover is initiated, note that synchronization is not automatically reversed when the primary region (East US) recovers. You must manually replicate the VM back to East US and trigger resynchronization.

Another view of the replication jobs is available here:

![The image shows a Microsoft Azure portal page displaying "Site Recovery jobs" with two entries: one for creating a site, which is in progress, and another for creating a replication policy, which is successful.](https://kodekloud.com/kk-media/image/upload/v1752866830/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/azure-portal-site-recovery-jobs.jpg)

## Combining ASR with Azure Backup

Integrating ASR with Azure Backup provides a comprehensive approach for both disaster recovery and data restoration. While backups are crucial for recovering from data corruption or catastrophic failures, disaster recovery focuses on reactivating instances in another region.

For on-premises environments hosting multiple VMs, it is common to deploy two key agents:

| Agent Type     | Functionality    | Description                                                                                             |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| Backup Agent   | Data Backup      | Sends data to the Recovery Services Vault to create restore points using backup servers or DPM.         |
| Mobility Agent | Data Replication | Uses a replication appliance (including a process server and configuration server) to push data to ASR. |

The following diagram illustrates the integration of ASR with Azure Backup:

![The image is a diagram illustrating the integration of ASR (Azure Site Recovery) and Azure Backup, showing data flow between on-premises systems and a Recovery Services Vault in the cloud. It includes components like backup agents, ASR mobility agents, and a cloud vault for disaster recovery.](https://kodekloud.com/kk-media/image/upload/v1752866832/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Azure-Site-Recovery/asr-azure-backup-integration-diagram.jpg)

## Conclusion

Azure Site Recovery offers a versatile solution for ensuring disaster recovery, seamless migration, and continuous replication. By following the detailed configuration steps in the Azure Portal and understanding recovery plans and synchronization processes, you can ensure high availability and robust business continuity across regions. Integrating ASR with Azure Backup further solidifies your disaster resilience strategy.

> [!important]
> **Key Takeaway**
>
> Azure Site Recovery not only simplifies disaster recovery planning but also provides flexible options for multi-cloud and on-premises environments, ensuring minimal downtime and operational continuity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/d9cff719-f4ed-4b69-a9a5-5994a66e8e15/lesson/9939da99-ded8-47f9-8e68-5aad8747ce93)**
>
> Watch video content
