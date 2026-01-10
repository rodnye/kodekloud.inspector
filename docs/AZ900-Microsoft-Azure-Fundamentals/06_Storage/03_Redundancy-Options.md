# Redundancy Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Storage/Redundancy-Options)

---

## Table of Contents

- Redundancy Options
  - Overview of Redundancy Options
  - Locally Redundant Storage (LRS)
  - Zone Redundant Storage (ZRS)
  - Geo-Redundant Storage (GRS)
  - Geo-Zone Redundant Storage (GZRS)
  - Summary
  - Watch Video

---

## Content

AZ900: Microsoft Azure Fundamentals

Storage

# Redundancy Options

Azure Storage provides multiple redundancy options to safeguard your data by replicating it across various locations. These configurations ensure high availability and data durability, preventing loss in the event of hardware or zonal failures. In this article, we will explore the four primary redundancy options provided by Azure Storage and explain how each configuration works.

## Overview of Redundancy Options

Azure Storage offers the following redundancy configurations:

1.  **Locally Redundant Storage (LRS)**
2.  **Zone Redundant Storage (ZRS)**
3.  **Geo-Redundant Storage (GRS)**
4.  **Geo-Zone Redundant Storage (GZRS)**

Each option replicates data in distinct ways, balancing cost, performance, and protection to meet various durability and availability requirements.

---

## Locally Redundant Storage (LRS)

LRS ensures data durability by replicating your data three times within a single data center in a specified region. Azure distributes these copies across different server racks (fault domains) within that data center, which helps protect against isolated hardware failures.

> [!important]
> **Key Considerations for LRS**
>
> • Only one data center within the region is involved, which makes it suitable primarily for non-critical data.
> • It provides a durability of 99.99%.

Core architectural concepts include:

- **Region:** A geographical area (e.g., East US) that contains multiple Availability Zones.
- **Availability Zone:** Comprises one or more data centers that are strategically separated.
- **Fault Domain:** Within a data center, server racks are organized into fault domains with dedicated power, cooling, and network infrastructure.

---

## Zone Redundant Storage (ZRS)

ZRS enhances availability by synchronously replicating data across three separate Availability Zones within the primary region. This configuration improves resilience by ensuring that even if one data center or Availability Zone fails, your data remains accessible in the other zones.

Key points:

- **Physical Separation:** Availability Zones are physically distant (at least 300 miles apart) yet connected by low-latency fiber networks.
- **Durability:** Like LRS, ZRS offers a durability of 99.99% but with improved protection against zonal disruptions.

---

## Geo-Redundant Storage (GRS)

GRS is designed for scenarios that require protection against entire regional failures. It combines LRS in the primary region with data replication to a secondary region. For instance, if your primary region is East US, your data is also reliably copied to West US.

Features of GRS:

- Primary Region: Uses LRS to maintain three copies of your data within one data center.
- Secondary Region: Also employs LRS, creating three additional copies.
- **Failover Capability:** If the primary region fails, data recovery is possible from the secondary region.

> [!important]
> **Regional Failover Consideration**
>
> While GRS offers robust disaster recovery, it may involve additional latency during failover operations as data is retrieved from a geographically separated region.

---

## Geo-Zone Redundant Storage (GZRS)

GZRS combines the benefits of Zone Redundancy and Geo-Redundancy by replicating data across three Availability Zones in the primary region while also maintaining LRS in a secondary region.

The data replication strategy is:

- **In the Primary Region:** Data is synchronized across three Availability Zones (ZRS), ensuring high resiliency even if one zone encounters failure.
- **In the Secondary Region:** Data is maintained using LRS, ensuring an extra layer of protection.

![The image is a table describing different storage redundancy configurations, their deployment methods, and durability levels, ranging from "Locally redundant storage" to "Geo-zone-redundant storage."](https://kodekloud.com/kk-media/image/upload/v1752868530/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Redundancy-Options/storage-redundancy-configurations-table.jpg)

This dual approach ensures that if an entire Availability Zone fails, your data remains accessible in the other zones. Only in the extreme case where all zones are impacted would the system rely on the secondary region.

---

## Summary

Below is a comparison of the different redundancy options available in Azure Storage:

| Redundancy Type | Replication Method                                  | Key Benefit                                          | Durability |
| --------------- | --------------------------------------------------- | ---------------------------------------------------- | ---------- |
| **LRS**         | 3 copies in a single data center                    | Basic hardware failure protection                    | 99.99%     |
| **ZRS**         | Synchronous replication across 3 Availability Zones | Enhanced resilience against zonal failures           | 99.99%     |
| **GRS**         | LRS in both primary and secondary regions           | Protection against full regional failures            | 99.99%     |
| **GZRS**        | ZRS in primary + LRS in secondary                   | Combined defense against zonal and regional failures | 99.99%     |

Each redundancy option offers varying levels of protection. Organizations should choose the configuration that aligns best with their specific business continuity and disaster recovery requirements.

---

This overview of Azure Storage redundancy models can help you select the right option for your data management needs. Up next, we will explore the full range of services offered by Azure Storage and how they integrate with these redundancy strategies.

For further reading, check out the following references:

- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Cloud Disaster Recovery Best Practices](https://docs.microsoft.com/en-us/azure/architecture/resiliency/)

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/dc6682c4-e930-431d-ae27-8de33ae04303/lesson/e700b282-387f-4fd3-9bfb-14755286255e)**
>
> Watch video content
