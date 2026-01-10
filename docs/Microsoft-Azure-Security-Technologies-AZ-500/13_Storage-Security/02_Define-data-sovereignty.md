# Define data sovereignty - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Storage-Security/Define-data-sovereignty)

---

## Table of Contents

- Define data sovereignty
  - Azure Global Infrastructure and Data Sovereignty
  - Deployment Considerations
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Storage Security

# Define data sovereignty

Data sovereignty is the principle that any information stored digitally is subject to the laws and regulations of the country where the data resides. This concept has become critical in today's environment with the enforcement of strict privacy regulations and concerns over foreign governments potentially subpoenaing data stored overseas. Regulatory frameworks—such as GDPR—and other data compliance mandates make ensuring data sovereignty essential for organizations worldwide.

## Azure Global Infrastructure and Data Sovereignty

Azure operates in multiple geographies across the globe. An Azure geography is an area that contains at least one Azure region. Each region comprises one or more data centers and is strategically paired with another region in the same geography, a configuration known as a regional pair. Note that the only exception is Brazil South, which is paired with a region outside its geography.

Within these regional pairs, Azure optimizes platform updates and planned maintenance by updating only one region at a time. This design ensures that, during an outage affecting multiple regions, one region from each pair is prioritized for recovery. The strategic benefits of such pairing include:

1.  > [!important]
    > **Physical Isolation**
    >
    > Azure aims to maintain at least 300 miles of separation between data centers within a regional pair where possible. This physical distance helps mitigate simultaneous impacts from natural disasters, civil unrest, power outages, or network failures. However, geographical constraints can sometimes limit this separation.
2.  **Platform-Provided Replication**  
    Services such as geo-redundant storage automatically replicate data to the paired region, providing robust redundancy. For applications requiring high availability, deploying across regional pairs is highly recommended.
3.  **Region Recovery Order**  
    In the event of a widespread outage, one region in each pair is prioritized for recovery. Deploying applications across paired regions ensures that at least one region recovers first, whereas applications distributed over unpaired regions might experience delays.
4.  **Sequential Updates**  
    Azure applies system updates—ranging from maintenance to patching—in a sequential order across paired regions rather than simultaneously. This approach minimizes downtime and localizes any potential issues, making rollbacks easier if problems arise.
5.  **Data Residency Compliance**  
    To adhere to tax laws and law enforcement jurisdiction requirements, paired regions are typically located within the same geography, with the noted exception of Brazil South. This rule is crucial for resources such as geo-redundant storage accounts (GRS), which must ensure that data remains in the appropriate geographic location.

> [!important]
> **Compliance Requirements**
>
> For organizations with strict compliance policies—especially within the military, government, or public sectors—retaining data within a designated region is critical. Political conflicts or local data sovereignty laws might restrict data from residing in foreign territories.

## Deployment Considerations

While testing or development environments may allow for flexibility in deployment locations, production environments with stringent compliance requirements should always be deployed within approved regional pairs to ensure adherence to local laws.

Next, we discuss configuring storage access.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/7acacade-befa-46b1-99e2-3f298d33623d/lesson/9296fbe8-d6f0-4b03-b760-f468fd3eb009)**
>
> Watch video content
