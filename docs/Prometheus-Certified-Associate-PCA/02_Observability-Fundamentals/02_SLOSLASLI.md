# SLOSLASLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Observability-Fundamentals/SLOSLASLI)

---

## Table of Contents

- SLOSLASLI
  - Service Level Indicators (SLIs)
  - Service Level Objectives (SLOs)
  - Service Level Agreements (SLAs)
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Observability Fundamentals

# SLOSLASLI

When designing a system or application, it is crucial to define specific, measurable targets that balance product development and operational excellence. Establishing these targets not only guides internal teams but also informs customers about the expected level of service reliability. For instance, an application might be required to maintain a 97% uptime over any rolling 30-day period.

## Service Level Indicators (SLIs)

A Service Level Indicator (SLI) is a quantitative metric that evaluates a specific aspect of the service provided. Essentially, SLIs measure the quality of service from the user's perspective. Common SLIs include:

- Request latency
- Error rate
- Saturation or throughput
- Availability (uptime)

![The image explains the concept of a Service Level Indicator (SLI) as a quantitative measure of service level, listing common SLIs such as request latency, error rate, saturation, throughput, and availability.](https://kodekloud.com/kk-media/image/upload/v1752883008/notes-assets/images/Prometheus-Certified-Associate-PCA-SLOSLASLI/service-level-indicator-sli-explained.jpg)

It is important to note that not every metric qualifies as a good SLI. The most effective SLIs accurately represent the user experience. For example, metrics like high CPU or memory usage are not necessarily indicative of user impact unless they directly affect performance. Instead, metrics such as response time and error occurrences are more reflective of a user’s real-world experience.

![The image explains that not all metrics are suitable for Service Level Indicators (SLIs) and emphasizes the importance of metrics that reflect user experience, noting that high CPU or memory usage may not impact the user. It includes a graphic showing a user and a server with speech bubbles.](https://kodekloud.com/kk-media/image/upload/v1752883010/notes-assets/images/Prometheus-Certified-Associate-PCA-SLOSLASLI/user-experience-metrics-sli-graphic.jpg)

A user is immediately affected by visible errors and high response times—clear indicators that can be measured and improved upon.

## Service Level Objectives (SLOs)

A Service Level Objective (SLO) defines the target value or range for an SLI. For example, if an SLI measures the latency of an application, the corresponding SLO might require that the latency remains below 100 milliseconds. Similarly, an SLO for availability could dictate a minimum of 99.9% uptime. SLOs are set with the customer’s experience in mind, directly quantifying the product's reliability.

![The image explains Service Level Objectives (SLOs) as target values for Service Level Indicators (SLIs) like latency and availability, emphasizing their importance in customer experience and product reliability.](https://kodekloud.com/kk-media/image/upload/v1752883011/notes-assets/images/Prometheus-Certified-Associate-PCA-SLOSLASLI/slo-target-values-indicators-explained.jpg)

> [!important]
> **Note**
>
> When setting SLOs, it is essential to choose realistic and achievable targets. Overly aggressive goals, such as 100% uptime or 99.999% uptime, can be costly and difficult to maintain.

## Service Level Agreements (SLAs)

A Service Level Agreement (SLA) formalizes the targets defined by SLOs in a legally binding document. An SLA acts as a contract between a vendor and a user, guaranteeing a specific level of service quality. Should the service fail to meet the predetermined SLOs, the SLA typically outlines penalties, often in financial terms.

![The image explains a Service Level Agreement (SLA) as a contract between a vendor and a user that guarantees a certain Service Level Objective (SLO), with potential financial or other consequences for not meeting the SLO.](https://kodekloud.com/kk-media/image/upload/v1752883012/notes-assets/images/Prometheus-Certified-Associate-PCA-SLOSLASLI/sla-service-level-agreement-explained.jpg)

> [!important]
> **Summary**
>
> In summary, SLIs provide measurable insights into service quality from a user's perspective, SLOs define the desired performance targets, and SLAs formalize these expectations, ensuring accountability through contractual penalties if the targets are not met.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e2f3102c-1761-4800-9e21-1f2f4b36f050/lesson/20583163-f65a-4d19-bebb-cd01280711f1)**
>
> Watch video content
