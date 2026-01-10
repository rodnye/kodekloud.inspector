# Prometheus - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Prometheus)

---

## Table of Contents

- Prometheus
  - Prometheus Architecture
  - Managed Prometheus on AWS
  - Integrating Prometheus with CloudWatch
  - Additional Resources
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Prometheus

In this lesson, we explore Prometheus—a powerful open-source tool engineered to collect, store, and analyze metrics. With its dedicated time series database and flexible query language, PromQL, Prometheus offers deep insights into the health and performance of your applications and infrastructure.

Monitoring an application's health is akin to keeping track of a person's well-being. Just as healthcare professionals monitor tests like blood sugar, cholesterol, and vitamin levels, infrastructure monitoring captures metrics like CPU utilization, memory usage, and application latency. These metrics are essential in ensuring that your systems operate within optimal ranges.

> [!important]
> **Note**
>
> Prometheus not only gathers current metrics but also stores historical data, enabling you to investigate trends and diagnose issues retrospectively.

After collecting these valuable metrics, it is crucial to store them efficiently. For instance, if an incident occurs on a Monday, historical metrics from the previous weekend can help pinpoint the cause. Prometheus addresses this need by periodically pulling metrics from defined targets—such as servers, applications, or containers—and storing them in its built-in time series database. Users can then query this data through an HTTP server interface using PromQL. While similar in function to services like [AWS CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch), Prometheus offers the flexibility of an open-source system that adapts to virtually any platform.

## Prometheus Architecture

Understanding the core components of Prometheus is key to leveraging its full potential. The primary elements include:

- **Targets:** These are the services or applications from which metrics are collected.
- **Receiver:** This component gathers metrics from targets by sending HTTP requests at defined intervals.
- **Time Series Database:** Metrics are stored here, making historical analysis efficient and responsive.
- **HTTP Server:** Provides an interface for querying metrics using PromQL, facilitating data analysis and visualization.

![The image is a diagram illustrating the architecture of a Prometheus server, showing its components: Retriever, Time Series DB, and HTTP Server, along with its interaction with targets and users.](https://kodekloud.com/kk-media/image/upload/v1752865360/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Prometheus/prometheus-server-architecture-diagram.jpg)

## Managed Prometheus on AWS

Managing a Prometheus server can be challenging due to the necessity of ensuring its health, handling high traffic, and scaling resources as needed. Amazon Managed Prometheus simplifies these challenges by handling the underlying infrastructure, allowing you to focus on monitoring and analysis.

Metrics from various services—such as those running on an [Amazon Elastic Container Service (AWS ECS)](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs) cluster—can be seamlessly directed to the managed Prometheus instance. Once the data is in the system, you can query these metrics with PromQL or visualize them using dashboarding tools like Grafana.

![The image is a diagram illustrating the Amazon Managed Service for Prometheus, showing the flow from an ECS Cluster in a VPC to Amazon Managed Grafana, with steps for collecting, monitoring, and analyzing metrics.](https://kodekloud.com/kk-media/image/upload/v1752865361/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Prometheus/amazon-managed-service-prometheus-diagram.jpg)

Key features of Amazon Managed Prometheus include:

- Automatic scaling to manage increased workloads.
- Seamless integration with AWS services such as [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), [AWS EKS](https://learn.kodekloud.com/user/courses/aws-eks), [AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda), and [Amazon ECS](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs).
- Reduced operational overhead, thanks to AWS managing the infrastructure.
- Robust support for PromQL, empowering you to filter, aggregate, and analyze your metrics efficiently.
- Cost-effectiveness with a pay-as-you-go pricing model.

![The image lists four key features: Scalability, Integrated with AWS, Fully Managed, and PromQL Support, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865362/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Prometheus/key-features-scalability-aws-promql.jpg)

## Integrating Prometheus with CloudWatch

A common and powerful use case is integrating Prometheus with CloudWatch. Imagine a containerized application running not only in an EKS cluster but also in an on-premises environment. Prometheus employs service discovery to identify and monitor all relevant targets, and it allows you to configure alerting rules within its setup.

In a standalone Prometheus setup, you might use Alert Manager to send notifications directly via email or Slack. When integrated with AWS, these alerts can be relayed to [AWS CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch), which then routes the notifications to your on-call team through channels like SNS. This ensures a prompt and systematic response to any incidents.

![The image illustrates a workflow for Amazon Managed Service for Prometheus, showing a sequence from Prometheus to Alert Manager and then to Amazon SNS, with triggers for threshold alerts.](https://kodekloud.com/kk-media/image/upload/v1752865364/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Prometheus/amazon-prometheus-workflow-diagram.jpg)

> [!important]
> **Note**
>
> For a deeper dive into how Prometheus compares with other monitoring solutions, explore our detailed articles on modern monitoring practices.

In summary, Prometheus delivers a robust, scalable, and flexible monitoring framework that ensures your systems remain healthy and issues are resolved quickly. Its extensive ecosystem, integration with managed services, and comprehensive query capabilities make it an essential tool for proactive system management.

## Additional Resources

For further reading and related topics, explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [AWS CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch)
- [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2)
- [PromQL Documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/96df4bd0-5a64-4733-8a96-05911228ac6f)**
>
> Watch video content
