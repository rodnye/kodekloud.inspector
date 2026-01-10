# Inspect infrastructure performance indicators including CPU memory disk and network - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Analyze-Metrics/Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network)

---

## Table of Contents

- Inspect infrastructure performance indicators including CPU memory disk and network
  - CPU Performance
  - Memory Utilization
  - Disk Performance
  - Network Performance
  - Benefits and Common Challenges
  - References
  - Watch Video
    - Practical Example: Alerting on CPU Spikes
    - How to Monitor Memory
    - Key Disk Metrics
    - Monitoring Disk Performance
    - Monitoring with Azure Network Watcher

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Analyze Metrics

# Inspect infrastructure performance indicators including CPU memory disk and network

In this guide, you’ll discover how to monitor four critical performance metrics in Azure:

| Metric  | Why It Matters                                                | Azure Tools                                        |
| ------- | ------------------------------------------------------------- | -------------------------------------------------- |
| CPU     | Measures compute load and identifies processing bottlenecks   | Azure Monitor, Azure Metrics                       |
| Memory  | Tracks RAM consumption to prevent slowdowns and crashes       | Azure Monitor, Azure Metrics                       |
| Disk    | Monitors IOPS, latency, and throughput for data operations    | Azure Storage Metrics, Azure Monitor               |
| Network | Analyzes bandwidth, latency, and packet loss for connectivity | Azure Network Watcher, Network Performance Monitor |

Understanding these indicators is essential for maintaining optimal performance, minimizing downtime, and preparing for the AZ-400 exam. By keeping an eye on these metrics, you’ll ensure a smooth user experience while optimizing costs.

![The image is an infographic titled "Infrastructure Performance Indicators," highlighting four key performance indicators (KPIs): CPU usage, memory utilization, disk performance, and network activity.](https://kodekloud.com/kk-media/image/upload/v1752867295/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/infrastructure-performance-indicators-infographic.jpg)

---

## CPU Performance

CPU performance reflects the percentage of processing capacity your workloads consume. Sustained high CPU can lead to slow response times and application failures.

![The image illustrates CPU performance, highlighting that it is typically expressed as a percentage of total available CPU capacity.](https://kodekloud.com/kk-media/image/upload/v1752867295/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/cpu-performance-capacity-percentage-illustration.jpg)

Use Azure Monitor and Azure Metrics to collect real-time and historical CPU data:

![The image lists tools for monitoring CPU usage in Azure, specifically Azure Monitor and Azure Metrics.](https://kodekloud.com/kk-media/image/upload/v1752867296/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/azure-monitor-cpu-usage-tools.jpg)

High CPU usage often signals a busy application or a resource-intensive process. If it remains above 80% for extended periods, you may experience:

- Slow response times
- Increased processing latency
- Application crashes

![The image illustrates the impact of high CPU usage, showing slow performance with a warning symbol and an application crash with an error message.](https://kodekloud.com/kk-media/image/upload/v1752867297/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/high-cpu-usage-performance-warning-crash.jpg)

### Practical Example: Alerting on CPU Spikes

```
# Steps to create a CPU alert in Azure Portal:
1. Go to Azure Monitor > Alerts
2. Click New alert rule
3. Select target resource (VM or App Service)
4. Under Condition, choose "CPU Percentage"
5. Set threshold (e.g., CPU > 80% for 5 minutes)
6. Define an action group for notifications
7. Review and create
```

By proactively tracking CPU trends, you can right-size VMs or refactor code before performance degrades.

---

## Memory Utilization

Memory utilization shows how much RAM your applications consume. Excessive memory usage can trigger slowdowns or out-of-memory errors.

![The image illustrates memory utilization issues, showing slow performance with a warning symbol and an application crash with an error message.](https://kodekloud.com/kk-media/image/upload/v1752867299/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/memory-utilization-issues-performance-warning.jpg)

### How to Monitor Memory

1.  In Azure Portal, navigate to **Azure Metrics**.
2.  Select your target resource (e.g., VM, Web App).
3.  Add the **Memory Usage** metric to a chart.
4.  Configure an alert on critical thresholds.

![The image is a flowchart illustrating a practical example of memory monitoring in three steps: navigating Azure metrics, selecting a relevant resource, and choosing a memory usage metric.](https://kodekloud.com/kk-media/image/upload/v1752867299/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/memory-monitoring-flowchart-azure-metrics.jpg)

Review memory usage graphs over time to uncover leaks or inefficient allocation:

![The image shows a memory monitoring graph with available memory data over time, highlighting average, 5th, and 10th percentile values. It emphasizes identifying trends and spikes in memory consumption.](https://kodekloud.com/kk-media/image/upload/v1752867300/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/memory-monitoring-graph-trends-spikes.jpg)

**Remediation Tips:**

- Optimize code to release unused memory
- Scale up the VM or App Service plan if needed

---

## Disk Performance

Disk performance metrics gauge how efficiently your storage layer handles read/write operations—vital for data-intensive workloads.

![The image illustrates disk performance, showing a diagram of data being read from and written to a storage disk, with accompanying text explaining the concept.](https://kodekloud.com/kk-media/image/upload/v1752867301/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/disk-performance-data-read-write-diagram.jpg)

### Key Disk Metrics

| Metric     | Description                            |
| ---------- | -------------------------------------- |
| IOPS       | Input/Output Operations per Second     |
| Latency    | Time taken for each read/write request |
| Throughput | Volume of data transferred per second  |

![The image is a diagram titled "Disk Performance" featuring three colored boxes labeled "Input/Output Operations per Second (IOPS)," "Latency," and "Throughput."](https://kodekloud.com/kk-media/image/upload/v1752867302/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/disk-performance-iops-latency-throughput.jpg)

![The image is a diagram titled "Disk Performance," showing three components: Input/Output Operations per Second (IOPS), Latency, and Throughput, with a note that throughput measures the amount of data transferred per second.](https://kodekloud.com/kk-media/image/upload/v1752867303/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/disk-performance-iops-latency-throughput-2.jpg)

Poor disk performance manifests as slow file operations and timeouts:

![The image illustrates a decline in disk performance, represented by a downward graph and arrows, with a label indicating "Poor disk performance."](https://kodekloud.com/kk-media/image/upload/v1752867304/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/poor-disk-performance-decline-graph.jpg)

![The image is a diagram about disk performance, highlighting issues like slow response times and increased latency, which impact user experience.](https://kodekloud.com/kk-media/image/upload/v1752867305/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/disk-performance-latency-response-times-diagram.jpg)

### Monitoring Disk Performance

- Enable metrics for IOPS, latency, and throughput on your storage account or managed disk.
- Use Azure Monitor and Azure Storage Metrics to chart and alert.
- Set thresholds (e.g., latency > 20 ms) to trigger notifications.

![The image is a diagram illustrating disk performance monitoring using Azure Monitor and Azure Storage Metrics to track IOPS, latency, and throughput.](https://kodekloud.com/kk-media/image/upload/v1752867306/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/disk-performance-monitoring-azure-diagram.jpg)

**Remediation Strategies:**

- Upgrade to Premium or Ultra disks
- Use striping and caching for high-throughput scenarios
- Implement an in-memory or CDN cache for hot data

---

## Network Performance

Network performance determines how swiftly and reliably data travels across your Azure resources and to end users.

Key metrics:

- **Bandwidth**: Maximum data transfer rate
- **Latency**: Round-trip time between endpoints
- **Packet Loss**: Percentage of dropped packets

Poor network health can cause application delays, timeouts, and degraded user satisfaction.

### Monitoring with Azure Network Watcher

1.  Enable **Network Watcher** in your subscription.
2.  Use **Connection Monitor** to assess latency and packet loss.
3.  Review bandwidth usage on each virtual NIC.

![The image illustrates a practical example of network performance monitoring using Azure Network Watcher, focusing on bandwidth, latency, and packet loss.](https://kodekloud.com/kk-media/image/upload/v1752867307/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/azure-network-watcher-performance-monitoring.jpg)

Azure Network Watcher’s **Network Performance Monitor** provides end-to-end visibility:

![The image is a slide titled "Practical Example of Network Performance Monitoring," showing a diagram of network issues and listing corrective actions: optimizing network configurations, increasing bandwidth, and implementing QoS policies.](https://kodekloud.com/kk-media/image/upload/v1752867308/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/network-performance-monitoring-diagram.jpg)

**Remediation Tips:**

- Optimize routing, peering, and gateway configurations
- Increase bandwidth allocation for high-traffic workloads
- Apply QoS policies to prioritize mission-critical packets

---

## Benefits and Common Challenges

Proactive monitoring helps you:

- Detect issues before they impact users
- Optimize resource allocation and reduce costs
- Maintain consistent performance under load

However, you may encounter:

- Alert fatigue from too many notifications
- Difficulty selecting the most relevant metrics
- Balancing performance improvements with budget constraints

![The image is a diagram titled "Common Challenges," highlighting three issues: managing alert fatigue, identifying relevant metrics, and balancing performance and cost.](https://kodekloud.com/kk-media/image/upload/v1752867309/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Inspect-infrastructure-performance-indicators-including-CPU-memory-disk-and-network/common-challenges-alert-fatigue-metrics.jpg)

---

## References

- [Azure Monitor documentation](https://docs.microsoft.com/azure/azure-monitor/)
- [Azure Metrics in Azure Portal](https://docs.microsoft.com/azure/azure-monitor/essentials/metrics)
- [Azure Network Watcher overview](https://docs.microsoft.com/azure/network-watcher/)
- [AZ-400 Exam Guide](https://docs.microsoft.com/learn/certifications/exams/az-400)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/473876ba-f35b-4ae7-a361-3fc9572e593d/lesson/14a3b0ef-81f0-42d4-ad18-699cd8b90cea)**
>
> Watch video content
