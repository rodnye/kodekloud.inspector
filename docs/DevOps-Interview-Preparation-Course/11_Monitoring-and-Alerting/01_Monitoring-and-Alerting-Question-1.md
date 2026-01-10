# Monitoring and Alerting Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Monitoring-and-Alerting/Monitoring-and-Alerting-Question-1)

---

## Table of Contents

- Monitoring and Alerting Question 1
  - Interview Question
  - Prometheus Architecture Overview
  - Next Steps
  - Watch Video
    - 1. Pull-Based Approach
    - 2. Push-Based Approach

---

## Content

DevOps Interview Preparation Course

Monitoring and Alerting

# Monitoring and Alerting Question 1

In this article, we explore a common interview question centered on monitoring and alerting with a focus on Prometheus. Understanding how Prometheus collects and processes metrics is essential for a robust monitoring solution.

## Interview Question

Explain the different ways in which Prometheus can collect metrics.

Many DevOps training sessions or bootcamps might cover alternative tools such as Nagios or Zabbix. If you are not familiar with Prometheus, you can mention your experience with other monitoring solutions while noting the differences in metric collection methods.

## Prometheus Architecture Overview

Prometheus is a popular monitoring tool that collects and stores metrics, which can be later used for dashboarding and alerting purposes. The strength of Prometheus lies in its ability to retrieve performance and system metrics through two primary methods:

### 1\. Pull-Based Approach

In the pull-based method, applications — irrespective of whether they are written in Java, JavaScript, Node.js, or any other language — expose an endpoint that serves their metrics. Prometheus periodically scrapes these endpoints to gather data. This approach is straightforward and works well for applications that run continuously.

### 2\. Push-Based Approach

With the push-based method, applications send metrics to Prometheus via a gateway node. This method is especially useful for applications that do not run continuously (i.e., they start and stop frequently). The push-based approach ensures that metrics are still collected even when the application is not permanently online.

> [!important]
> **Key Takeaway**
>
> Both pull-based and push-based approaches are valid methods for collecting metrics. The choice between them hinges on the operational behavior and design of your application.

A concise response in an interview might be:

"Prometheus collects metrics in two ways: first, through a pull-based approach where it scrapes exposed endpoints; and second, through a push-based approach where metrics are sent via a gateway. The method used depends on whether the application runs continuously or intermittently."

If you have limited experience with Prometheus, it is acceptable to reference your expertise with other monitoring tools and clarify the similarities and differences in their data collection methods.

## Next Steps

That concludes our discussion on Prometheus metric collection. In our next article, we will review additional interview questions related to monitoring and alerting to further enhance your understanding and preparation.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/e9c0a8fa-ed69-494c-9d95-c5e3eb5ecfde/lesson/704ed9f7-1b9d-4c44-8025-a801fc243a72)**
>
> Watch video content
