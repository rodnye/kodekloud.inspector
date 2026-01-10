# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Push-Gateway/Introduction)

---

## Table of Contents

- Introduction
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Push Gateway

# Introduction

In this lesson, we explore the significance of the Prometheus Push Gateway in monitoring batch jobs. Batch jobs typically run for only a short period before exiting, which makes it challenging for Prometheus to scrape their metrics in time. Without an active process, Prometheus might miss these essential data points.

> [!important]
> **Note**
>
> The Prometheus Push Gateway acts as an intermediary for batch jobs, ensuring that their metrics are preserved long enough to be scraped reliably.

When a batch job completes, it pushes its metrics to the Push Gateway. Prometheus then scrapes these metrics at regular intervals, just as it does with any other target. From Prometheus' perspective, the Push Gateway functions as a standard HTTP endpoint without requiring any special configuration.

By integrating the Push Gateway into your monitoring strategy, you ensure that critical metrics from short-lived batch jobs are not lost, enhancing the overall reliability and accuracy of your observability system.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/18b41166-411a-42a8-91c2-18a5b49bc189/lesson/978542d0-0941-457f-b7be-fc82245031b9)**
>
> Watch video content
