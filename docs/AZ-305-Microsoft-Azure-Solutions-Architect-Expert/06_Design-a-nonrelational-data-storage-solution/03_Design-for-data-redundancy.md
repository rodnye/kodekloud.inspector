# Design for data redundancy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-data-redundancy)

---

## Table of Contents

- Design for data redundancy
  - Replication Options
  - Selecting the Right Option
  - Conclusion
  - Watch Video
    - Locally Redundant Storage (LRS)
    - Zone-Redundant Storage (ZRS)
    - Geo-Redundant Storage (GRS) and Read-Access GRS (RAGRS)
    - Geo-Zone-Redundant Storage (GZRS)

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for data redundancy

Designing data redundancy is a critical aspect when selecting an Azure storage solution. Azure offers multiple redundancy options to help you meet your Service Level Agreement (SLA) requirements and ensure data durability. However, keep in mind that higher redundancy levels may increase costs and availability varies across storage account types and regions. In this article, we review the different replication strategies available in Azure.

For a comprehensive breakdown of these options, please refer to our [AZ-104: Microsoft Azure Administrator](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator) course.

## Replication Options

Below, you will find detailed explanations of the available replication strategies:

### Locally Redundant Storage (LRS)

LRS replicates your data three times within a single data center across different fault domains. This approach ensures that if one rack or cluster becomes unavailable, your data remains accessible from other clusters in the same facility. LRS provides a durability SLA of 99.19%.

### Zone-Redundant Storage (ZRS)

Unlike LRS, ZRS replicates data three times across multiple availability zones within the same region. This distribution across zones offers enhanced protection since your data stays available even if one complete zone goes offline. ZRS delivers a durability level of approximately 99.12%.

### Geo-Redundant Storage (GRS) and Read-Access GRS (RAGRS)

**GRS** uses LRS within the primary region (replicating data three times) and then replicates the data in a secondary region, resulting in six copies overall. This setup achieves a durability of 99.16%. However, note that the secondary copy is not immediately available for read operations without a failover event initiated by you or automatically by Microsoft.

For users requiring continuous read access to the secondary region, **Read-Access Geo-Redundant Storage (RAGRS)** is available. RAGRS enables data access in the secondary region without the need for a failover action.

### Geo-Zone-Redundant Storage (GZRS)

GZRS, sometimes referred to as Geo-Consistent Redundant Storage (GCRS), combines the strengths of ZRS and LRS. In this approach, data is replicated three times across availability zones in the primary region and three times across fault domains in the secondary region. This results in durability similar to GRS (approximately 99.16%). As with GRS, the secondary copy in GZRS is available for read operations only after a failover, unless you opt for RAGRS to allow continuous secondary region read access.

> [!important]
> **Note**
>
> Not all storage account types support every replication option. For example, General Purpose v2 accounts offer the full range of redundancy configurations, while premium page blobs are generally limited to LRS and ZRS.

## Selecting the Right Option

When creating a storage account, Azure displays the available redundancy options based on the account type you choose. For instance, LRS does not support secondary read access. In contrast, selecting GRS will present an option to enable read access—effectively converting it to RAGRS.

The following table summarizes the key characteristics of these replication strategies:

| Replication Strategy              | Replicas | Availability Scope                     | Read Access to Secondary Region |
| --------------------------------- | -------- | -------------------------------------- | ------------------------------- |
| Locally Redundant Storage (LRS)   | 3 copies | Single data center (fault domains)     | Not available                   |
| Zone-Redundant Storage (ZRS)      | 3 copies | Multiple availability zones            | Not available                   |
| Geo-Redundant Storage (GRS)       | 6 copies | Primary (LRS) + Secondary region       | Available after failover        |
| Read-Access GRS (RAGRS)           | 6 copies | Primary (LRS) + Secondary region       | Continuous read access          |
| Geo-Zone-Redundant Storage (GZRS) | 6 copies | Primary (ZRS) + Secondary region (LRS) | Available after failover        |

![The image is a comparison chart of different storage replication strategies, including LRS, ZRS, GRS, and GZRS, highlighting their features, durability, and recommended use cases.](https://kodekloud.com/kk-media/image/upload/v1752867146/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-data-redundancy/storage-replication-strategies-chart.jpg)

These replication options enable you to protect your valuable data by replicating it across availability zones, across secondary regions, or within the same data center. They are designed to safeguard your data from catastrophic failures and major incidents in Microsoft data centers.

> [!important]
> **Warning**
>
> Ensure that your chosen redundancy option aligns with your SLA, durability, and budget requirements. Higher redundancy usually leads to increased costs.

## Conclusion

When designing your Azure storage solution, carefully evaluate your redundancy needs. Choose a replication strategy that strikes the right balance between cost, durability, and accessibility. As you move forward, you can now explore additional design considerations for Azure Blob Storage.

For further details, explore the official [Azure Documentation](https://docs.microsoft.com/azure/storage/common/storage-redundancy).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/7eaf118e-49c9-4910-a013-34050cab6a2f)**
>
> Watch video content
