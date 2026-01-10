# Demo Fargate After State and Learning and Improvements - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Serverless-Fargate/Demo-Fargate-After-State-and-Learning-and-Improvements)

---

## Table of Contents

- Demo Fargate After State and Learning and Improvements
  - 1. Generating Adoption Traffic
  - 2. Monitoring Real User Metrics (RUM)
  - 3. Inspecting ECS Service Metrics
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Chaos Engineering on Serverless Fargate

# Demo Fargate After State and Learning and Improvements

In this exercise, we simulate real user traffic on an AWS Fargate–powered pet adoption application while a parallel I/O stress test runs. Leveraging AWS CloudWatch Real User Monitoring (RUM) and ECS service metrics, we’ll validate the application’s performance and resilience under load. This aligns with Chaos Engineering principles to uncover potential bottlenecks before they impact production.

---

## 1\. Generating Adoption Traffic

To emulate real-world user interactions, we’ll place multiple pet adoption orders:

1.  Navigate to the pet adoption page.
2.  Select pets and complete the adoption form.
3.  Refresh the listing to confirm adoption status.

![The image shows a webpage with a message indicating that a pet adoption is complete, thanking the user for adopting. The page is titled "Adopt a Pet, Save a Life!" and includes navigation options.](https://kodekloud.com/kk-media/image/upload/v1752871902/notes-assets/images/Chaos-Engineering-Demo-Fargate-After-State-and-Learning-and-Improvements/pet-adoption-complete-thank-you-page.jpg)

Throughout this process, the UI remained fully responsive, and no errors or delays were observed.

> [!important]
> **Note**
>
> Generating concurrent adoption events helps ensure your application can handle spikes in user requests without degradation.

---

## 2\. Monitoring Real User Metrics (RUM)

Next, we’ll inspect the CloudWatch RUM dashboard over the last ten minutes to detect any user frustration signals:

![The image shows an AWS CloudWatch RUM (Real User Monitoring) overview dashboard, displaying metrics like page loads, average page load speed, Apdex score, and alarms. It includes options for filtering data and viewing different time ranges.](https://kodekloud.com/kk-media/image/upload/v1752871903/notes-assets/images/Chaos-Engineering-Demo-Fargate-After-State-and-Learning-and-Improvements/aws-cloudwatch-rum-dashboard-overview.jpg)

| Metric              | Value | Threshold |
| ------------------- | ----- | --------- |
| Page Loads          | 1,200 | N/A       |
| Avg Page Load (ms)  | 320   | < 500 ms  |
| Apdex Score         | 0.98  | ≥ 0.85    |
| Frustrated Sessions | 0     | 0         |

> [!important]
> **Note**
>
> An Apdex score above 0.85 and zero frustrated sessions confirm a smooth user experience. For more details, see the [CloudWatch RUM User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html).

---

## 3\. Inspecting ECS Service Metrics

Finally, let’s review our ECS service dashboard for the `pay-for-adoption` task to observe CPU, memory, and network activity during the I/O stress period:

![The image shows an AWS CloudWatch dashboard displaying various metrics such as CPU utilization, memory utilization, network activity, and other performance indicators for a service. There are no alerts present.](https://kodekloud.com/kk-media/image/upload/v1752871904/notes-assets/images/Chaos-Engineering-Demo-Fargate-After-State-and-Learning-and-Improvements/aws-cloudwatch-dashboard-metrics-performance.jpg)

| Metric             | Baseline (%) | Under Stress (%) | Threshold (%) |
| ------------------ | ------------ | ---------------- | ------------- |
| CPU Utilization    | 25           | 18               | < 80          |
| Memory Utilization | 30           | 22               | < 75          |
| Network In (MB/s)  | 5            | 7                | N/A           |
| Network Out (MB/s) | 4            | 6                | N/A           |

> [!important]
> **Warning**
>
> Keep an eye on sustained CPU and memory drops—they may indicate resource throttling or misconfiguration in your task definition.

---

## Conclusion

Our AWS Fargate service demonstrated robust performance under concurrent I/O stress and real user load. No critical spikes or resource exhaustion occurred, confirming that the application design scales reliably.

## Links and References

- [AWS Fargate Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
- [CloudWatch RUM User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html)
- [Chaos Engineering Best Practices](https://www.gremlin.com/chaos-engineering/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/5fdff083-6ddb-4b6a-a584-9c877b0e9c7b/lesson/aaab8008-0164-4bf1-9414-eac6ce32eedf)**
>
> Watch video content
