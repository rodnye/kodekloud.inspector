# Demo Memory Stress on EKS Part 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Kubernetes-EKS/Demo-Memory-Stress-on-EKS-Part-4)

---

## Table of Contents

- Demo Memory Stress on EKS Part 4
  - 1. PetSite Trace Map
  - 2. Container Insights
  - 3. Real User Monitoring (RUM)
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Kubernetes EKS

# Demo Memory Stress on EKS Part 4

In this fourth installment of our chaos engineering series, we analyze the impact of injecting memory stress into a Kubernetes pod on Amazon EKS using AWS Fault Injection Simulator (FIS). Over a nine-minute interval, we applied a controlled memory fault to the “PetSite” service and collected performance metrics across multiple AWS monitoring tools.

> [!important]
> **Note**
>
> Before running any FIS experiment, ensure your IAM role has the necessary permissions for AWS FIS, CloudWatch, and X-Ray. Review the [AWS FIS documentation](https://docs.aws.amazon.com/fis/latest/userguide/) for setup details.

## 1\. PetSite Trace Map

We start by examining the X-Ray service map for our PetSite EC2 instance. The average latency rose from roughly **90 ms** to **120 ms**, and the overall request count declined slightly—evidence that the memory fault impacted service responsiveness.

![The image shows an AWS CloudWatch X-Ray console displaying a trace map and metrics for an EC2 instance named "PetSite," including latency, requests, and fault rates over a selected time period.](https://kodekloud.com/kk-media/image/upload/v1752871876/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-4/aws-cloudwatch-xray-ec2-trace-map.jpg)

| Metric          | Baseline | Under Memory Stress |
| --------------- | -------- | ------------------- |
| Average Latency | ~90 ms   | ~120 ms             |
| Request Count   | Normal   | Decreased           |

While the increase in latency is measurable, our distributed Kubernetes architecture absorbs much of the fault without cascading failures.

## 2\. Container Insights

Next, we review pod-level resource metrics in CloudWatch Container Insights. The table below summarizes CPU and memory utilization before and during the experiment.

| Resource        | Baseline Utilization | Under Memory Stress |
| --------------- | -------------------- | ------------------- |
| CPU Utilization | 0.29 cores           | 1.57 cores          |
| Memory Usage    | Normal               | Noticeable increase |

These results confirm the FIS memory injection was successful. No pod restarts occurred, indicating adequate headroom and resilience in our EKS cluster.

## 3\. Real User Monitoring (RUM)

To assess real-world impact, we analyzed CloudWatch RUM web vitals. The proportion of “frustrating” user experiences inched up from **1.3 %** to **1.4 %**, still within our acceptable threshold.

![The image shows an AWS CloudWatch dashboard displaying web vitals, including metrics for "Largest Contentful Paint" and "First Input Delay," with graphs indicating performance over time. The data is categorized into positive, tolerable, and frustrating experiences.](https://kodekloud.com/kk-media/image/upload/v1752871877/notes-assets/images/Chaos-Engineering-Demo-Memory-Stress-on-EKS-Part-4/aws-cloudwatch-web-vitals-dashboard.jpg)

> [!important]
> **Note**
>
> Set your own RUM thresholds based on application SLAs. A small increase in “frustrating” sessions may be acceptable if overall availability remains high.

## Conclusion

Despite a clear uptick in latency and resource utilization during the AWS FIS memory stress test, end-user impact remained minimal. This demonstrates the robustness of a well-architected, distributed Kubernetes cluster on Amazon EKS.

## Links and References

- [AWS Fault Injection Simulator (FIS) Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [Amazon EKS Overview](https://aws.amazon.com/eks/)
- [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights.html)
- [AWS X-Ray Developer Guide](https://docs.aws.amazon.com/xray/latest/devguide/)
- [CloudWatch Real User Monitoring (RUM)](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/67947884-154a-43e4-a0cf-1137e1264eee/lesson/666c5bdb-d24f-48cb-b854-4c466abedb96)**
>
> Watch video content
