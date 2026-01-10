# Demo FIS Experiment After Metrics in X Ray and EC2 instances - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Compute-EC2/Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances)

---

## Table of Contents

- Demo FIS Experiment After Metrics in X Ray and EC2 instances
  - Introduction
  - 1. Verifying Application Availability
  - 2. Injecting the Disk Fill Fault
  - 3. Monitoring EC2 Metrics in CloudWatch
  - Conclusion
  - References
  - Watch Video
    - 3.1 CPU Utilization
    - 3.2 Network Out

---

## Content

Chaos Engineering

Chaos Engineering on Compute EC2

# Demo FIS Experiment After Metrics in X Ray and EC2 instances

## Introduction

Kick off an [AWS Fault Injection Simulator (FIS) Experiment](https://docs.aws.amazon.com/fis/latest/userguide/what-is-fis.html) to validate your system’s resilience under disk saturation conditions. In this demo, we verify application availability and observe key metrics in [AWS X-Ray](https://aws.amazon.com/xray/) and [Amazon EC2](https://aws.amazon.com/ec2/).

> [!important]
> **Note**
>
> Ensure your IAM role has the necessary FIS permissions and your EC2 instances are tagged for tracing with X-Ray.

## 1\. Verifying Application Availability

Immediately after triggering the disk fill fault, refresh the web interface to confirm the site remains fully functional:

![The image shows a webpage displaying various puppies for sale, each with a price and a "Take me home" button.](https://kodekloud.com/kk-media/image/upload/v1752871835/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances/puppies-for-sale-webpage-display.jpg)

All interactive elements, such as the “Take me home” buttons, continue responding without errors:

![The image shows a webpage with a message indicating "Adoption Complete" and a pop-up asking to resubmit a form. The page is related to pet adoptions.](https://kodekloud.com/kk-media/image/upload/v1752871836/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances/adoption-complete-form-resubmit-popup.jpg)

## 2\. Injecting the Disk Fill Fault

We used the FIS [Disk Fill Test](https://docs.aws.amazon.com/fis/latest/userguide/faults-disk-fill.html) to fill up the root volume of instance “fc095”. Our hypothesis: the application remains highly available due to automatic failover.

## 3\. Monitoring EC2 Metrics in CloudWatch

Head over to the EC2 dashboard and view the CloudWatch metrics for both instances:

![The image shows an AWS EC2 dashboard with two running instances selected, displaying metrics like CPU utilization and network activity. The instances are of type m5.xlarge and are located in different availability zones.](https://kodekloud.com/kk-media/image/upload/v1752871837/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances/aws-ec2-dashboard-m5-xlarge-instances.jpg)

### 3.1 CPU Utilization

The graph below shows CPU usage over time for both servers. Notice the divergence around 04:30 UTC:

![The image shows a line graph depicting CPU utilization percentages over time for two instances, with a noticeable increase and divergence in utilization around 04:30.](https://kodekloud.com/kk-media/image/upload/v1752871838/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances/cpu-utilization-line-graph-instances.jpg)

| Instance          | Metric Behavior                          |
| ----------------- | ---------------------------------------- |
| fc095 (disk full) | CPU drops to near zero (idle state)      |
| failover node     | CPU increases (handling redirected load) |

### 3.2 Network Out

A similar trend appears in network throughput. The saturated disk instance goes idle, while the standby instance picks up traffic:

![The image shows a line graph from AWS CloudWatch displaying "Network out (bytes)" over time for two instances, with one line increasing and the other decreasing after a certain point.](https://kodekloud.com/kk-media/image/upload/v1752871840/notes-assets/images/Chaos-Engineering-Demo-FIS-Experiment-After-Metrics-in-X-Ray-and-EC2-instances/aws-cloudwatch-network-out-graph.jpg)

| Instance          | Network Out Trend               |
| ----------------- | ------------------------------- |
| fc095 (disk full) | Drops to ~0 bytes/sec           |
| failover node     | Spikes as requests are rerouted |

> [!important]
> **Warning**
>
> Always test fault injection in a staging environment before applying to production. Disk saturation can lead to data loss if not handled properly.

## Conclusion

This exercise demonstrates that our architecture withstands disk saturation without impacting user experience or performance. Leveraging AWS FIS, X-Ray tracing, and CloudWatch metrics ensures visibility and reliability in a chaos engineering workflow.

## References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/latest/userguide/)
- [AWS X-Ray](https://aws.amazon.com/xray/)
- [Amazon EC2](https://aws.amazon.com/ec2/)
- [AWS CloudWatch Metrics](https://docs.aws.amazon.com/cloudwatch/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/822aac19-f6c1-4f39-bc41-59b523a98155/lesson/15870631-f760-4bc4-9226-293fe2ef646e)**
>
> Watch video content
