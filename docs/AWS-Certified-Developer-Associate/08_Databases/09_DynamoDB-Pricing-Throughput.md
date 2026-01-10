# DynamoDB Pricing Throughput - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-Pricing-Throughput)

---

## Table of Contents

- DynamoDB Pricing Throughput
  - Capacity Modes Overview
  - Understanding RCUs and WCUs
  - Summary
  - Watch Video
    - Provisioned Throughput Details
    - Write Capacity Units (WCUs)
    - Read Capacity Units (RCUs)
    - Mitigating Provisioned Throughput Exceeded Exceptions
      - Consistency Explained
      - Read Capacity Calculations

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB Pricing Throughput

In this guide, we'll dive into DynamoDB’s pricing structure and throughput management by exploring its two capacity modes: provisioned and on-demand. Understanding these modes is essential for optimizing performance and cost.

## Capacity Modes Overview

DynamoDB provides two capacity modes, each tailored to different workload patterns:

- **Provisioned Mode:** Best suited for predictable workloads. In this mode, you reserve a predefined number of read (RCUs) and write (WCUs) capacity units. You are billed based on the provisioned throughput, regardless of the actual usage.
- **On-Demand Mode:** Ideal for unpredictable or spiky workloads. Here, throughput capacity scales automatically based on the current demand and you only pay for the actual requests made. Note that on-demand costs are higher per request compared to the provisioned option.

### Provisioned Throughput Details

When using provisioned mode, it is necessary to configure your table with the required read and write capacity units:

- **Read Capacity Units (RCUs):** Measure the throughput for read operations.
- **Write Capacity Units (WCUs):** Measure the throughput for write operations.

![The image is a slide titled "Capacity Modes – Provisioned," explaining that tables must be provisioned in advance with read and write capacity, highlighting "Read Capacity Units (RCUs)" and "Throughput for reads per second."](https://kodekloud.com/kk-media/image/upload/v1752858785/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/capacity-modes-provisioned-slide.jpg)

Provisioned mode also allows for a temporary burst in capacity. However, if your workload exceeds the provisioned limits, DynamoDB will raise a "ProvisionedThroughputExceededException."

## Understanding RCUs and WCUs

Accurately calculating and provisioning capacity is crucial for maintaining optimal performance. Below, we break down the two core metrics.

### Write Capacity Units (WCUs)

- **Definition:** One WCU corresponds to one write per second for items up to 1 kilobyte in size.
- **Calculation:** Determine the required WCUs by multiplying the number of writes per second by the item size in kilobytes. If the resulting value is fractional, round up to the next whole number.

For instance:

- Writing an item of 1 KB per second requires 1 WCU.
- Writing an item of 3 KB per second requires 3 WCUs.
- For fractional results (e.g., 5.5), round up to 6 WCUs.

Consider this example calculation:

![The image explains how to calculate Write Capacity Units (WCUs) with a formula and provides two examples of item sizes and their corresponding WCUs.](https://kodekloud.com/kk-media/image/upload/v1752858786/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/calculate-write-capacity-units-examples.jpg)

```
# Example calculations for WCUs
# Example #1: 20 items per second with each item of 4.5 KB (round up to 5 KB)
# Example #2: 5 items per second with each item of 3 KB
# Example #3: 120 items per minute with each item of 3 KB (convert to per second)
# Calculation: (120 / 60) x 3KB / 1KB = 6 WCUs
```

### Read Capacity Units (RCUs)

DynamoDB distinguishes between two types of read operations, each with its own capacity considerations:

- **Strongly Consistent Reads:** Every read request for items up to 4 KB consumes one RCU.
- **Eventually Consistent Reads:** Two read operations per second can be served using one RCU for items up to 4 KB.

#### Consistency Explained

When data is written to DynamoDB, it is replicated across multiple servers. Fetching data from a replica other than the one that received the write can cause temporary inconsistencies. This scenario results in an eventually consistent read. In contrast, strongly consistent reads always reflect the latest data but consume twice the RCUs.

![The image compares "Strongly Consistent Read" and "Eventually Consistent Read," explaining that the former provides correct data immediately but consumes more resources, while the latter may return stale data. It includes a diagram illustrating data replication and read/write processes.](https://kodekloud.com/kk-media/image/upload/v1752858787/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/strongly-vs-eventually-consistent-read.jpg)

#### Read Capacity Calculations

Below are examples of how to calculate RCUs for different read scenarios:

- **Eventually Consistent Reads:**  
  If you perform 20 eventually consistent reads per second for items of 8 KB each, then:

  RCUs required = 20 (reads/s) × (8 KB / 4 KB) / 2 = 20 RCUs.

- **Strongly Consistent Reads:**  
  For 10 strongly consistent reads per second on items of 12 KB each:

  RCUs required = 10 (reads/s) × ceil(12 KB / 4 KB) = 10 × 3 = 30 RCUs.

- **Alternate Strongly Consistent Read Example:**  
  For 30 reads per second with each item of 9 KB (round up to 12 KB):

  RCUs required = 30 (reads/s) × (12 KB / 4 KB) = 90 RCUs.

![The image provides examples of calculating Read Capacity Units (RCUs) for different scenarios involving consistent and eventually consistent reads, with varying item sizes and read frequencies.](https://kodekloud.com/kk-media/image/upload/v1752858788/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/rcu-calculation-examples-reads.jpg)

> [!important]
> **Note**
>
> Exceeding the provisioned throughput for RCUs or WCUs will trigger a "ProvisionedThroughputExceededException." This often happens when there is a high frequency of operations on a single partition key, inadequate partition key distribution, or unusually large item sizes.

### Mitigating Provisioned Throughput Exceeded Exceptions

To prevent or mitigate these errors, consider the following strategies:

- Use a well-distributed partition key to balance the workload.
- Implement exponential backoff to manage retries when requests are throttled.
- Leverage DynamoDB Accelerator (DAX) to cache read-intensive operations, reducing the likelihood of read throttling.

![The image explains the "ProvisionedThroughputExceededException" error in throttling, detailing when it occurs and providing solutions such as distributing partition keys and using exponential backoff.](https://kodekloud.com/kk-media/image/upload/v1752858790/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/provisioned-throughput-exceeded-exception.jpg)

## Summary

DynamoDB’s capacity modes allow you to tailor throughput performance based on your application needs:

- **Provisioned Mode:** Involves pre-configuring the RCUs and WCUs, offers temporary burst capacity, and requires careful capacity planning.
- **On-Demand Mode:** Automatically adjusts capacity to meet demand, with billing based on usage.

For optimal performance and cost-efficiency when using provisioned mode:

- Appropriately configure throughput based on anticipated workload.
- Ensure a diverse partition key structure to avoid hotspots.
- Consider implementing exponential backoff for retries.
- Explore DAX for caching to help manage high read loads.

![The image is a summary slide about DynamoDB's capacity modes, explaining provisioned and on-demand modes, temporary burst capacity, and strategies for throttling.](https://kodekloud.com/kk-media/image/upload/v1752858791/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-Pricing-Throughput/dynamodb-capacity-modes-summary.jpg)

For more detailed information, refer to the [official DynamoDB documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/0c798276-cbd7-4429-a66e-24fcc89d1257)**
>
> Watch video content
