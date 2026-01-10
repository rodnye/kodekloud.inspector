# Compare Backup Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Data-Protection/Compare-Backup-Options)

---

## Table of Contents

- Compare Backup Options
  - Benefits
  - Limitations
  - Protection Capabilities
  - Storage Options
  - Watch Video
    - MARS Agent
    - Backup Server (MABS)
    - MARS Agent Limitations
    - Backup Server (MABS) Limitations

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Data Protection

# Compare Backup Options

In this lesson, we'll explore and compare two on-premises backup strategies: the MARS agent and the backup server (MABS). This comparison will help you determine which solution best meets your backup needs.

## Benefits

### MARS Agent

The MARS agent is ideal for users seeking a straightforward backup solution for Windows-based systems. Key advantages include:

- Backing up files and folders on both physical and virtual Windows environments without needing a dedicated backup server.
- Direct installation on the machine, allowing you to synchronize backups, delete backups, and restore data directly from the host.

### Backup Server (MABS)

MABS offers a more robust set of features for advanced backup scenarios. Its benefits include:

- Application-aware snapshots that ensure consistent backups of critical applications.
- Flexible backup scheduling combined with granular recovery options.
- Support for Linux on Hyper‑V and VMware environments.
- Operation without requiring a System Center license.

A complete evaluation of these options covers their components, benefits, limitations, the types of items they protect, and their backup storage mechanisms. See the comparison table below for a quick visual reference:

![The image is a comparison table of Azure Backup options, detailing components, benefits, limits, what they protect, and backup storage for Azure Backup (MARS) agent and Azure Backup Server (MABS).](https://kodekloud.com/kk-media/image/upload/v1752884480/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Compare-Backup-Options/azure-backup-options-comparison-table.jpg)

## Limitations

> [!important]
> **Note**
>
> Review the following limitations for each solution to ensure they align with your backup strategy.

### MARS Agent Limitations

- Backups are limited to three per day, matching the three time slots available in the Azure agent user interface.
- The agent is not application-aware and can only restore individual files, folders, or entire volumes.
- Linux environments are not supported.

### Backup Server (MABS) Limitations

- Oracle workloads cannot be backed up using MABS.
- Requires an active Azure subscription for operation.
- Tape backups are not supported.

## Protection Capabilities

The protection scope of each solution varies significantly:

- **MARS Agent:** Primarily designed to secure files and folders.
- **Backup Server (MABS):** Offers broader protection, securing files, folders, volumes, virtual machines, applications, and complete workloads.

## Storage Options

Both solutions utilize Recovery Services vaults, albeit with different storage strategies:

- **MARS Agent:** All backup data is stored exclusively in a Recovery Services vault.
- **Backup Server (MABS):** In addition to using the Recovery Services vault, MABS maintains a local backup copy. This local copy facilitates low-latency and rapid restores.

With these detailed insights, you now have a comprehensive understanding of how each backup option caters to different environments and requirements. Next, we'll delve into additional data protection methods, including the benefits of soft delete, to further enhance your backup strategy.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/a25ecd10-20ce-4ff9-bcc1-386c2e018b09/lesson/2c08d923-b216-4e80-bfa9-bf822eddb3f0)**
>
> Watch video content
