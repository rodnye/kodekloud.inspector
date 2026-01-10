# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/Introduction)

---

## Table of Contents

- Introduction
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# Introduction

Prometheus is already monitoring metrics from various components of our infrastructure, including Linux servers, Windows servers, Docker containers, and the Docker engine. However, to gather metrics specific to your application, you need to add instrumentation directly in your code. This is where Prometheus client libraries become indispensable.

A Prometheus client library simplifies the process of embedding metric tracking into your application. It formats the metrics following the Prometheus standard and exposes them via a `/metrics` endpoint, where Prometheus can easily scrape and collect them.

Prometheus officially supports several client libraries for these popular programming languages:

- Go
- Java
- Python
- Ruby
- Rust

In addition, there are unofficial third-party client libraries available for other languages, and you can even develop your own library if your language isn’t supported or to avoid extra dependencies.

For a clear visual representation, refer to the network diagram below which shows a centralized Prometheus instance monitoring multiple servers and Docker engines:

![The image illustrates a network diagram showing instrumentation with a central Prometheus logo connected to multiple server icons, some of which have Python logos.](https://kodekloud.com/kk-media/image/upload/v1752882968/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/prometheus-network-diagram-python-servers.jpg)

Below is a JavaScript code snippet that demonstrates a functional approach used in one of the client libraries:

```
res = fms.reduce((accum, next) => next(accum), res)


const unfold = (f, seed) => {
  const res = f(seed)
  return res ? [res[0]].concat(unfold(f, res[1])) : acc
}
return g0f(seed, [])
```

> [!important]
> **Key Insight**
>
> Effective instrumentation in your application can provide valuable insights into performance and usage metrics, which are essential for optimizing and troubleshooting in production environments.

In this lesson, our focus is on instrumenting a Python-based application. Even if you're new to Python or programming in general, you will learn how to integrate metric collection within your application, and understand the types of metrics being tracked. These principles apply regardless of your programming language or application type.

The diagram below categorizes both official and unofficial Prometheus client libraries by language (e.g., Go, Java/Scala, Python, etc.), and also highlights the flexibility to create custom client libraries if necessary:

![The image lists official and unofficial client libraries for Prometheus, including languages like Go, Java/Scala, Python, and others. It also mentions the possibility of writing custom client libraries.](https://kodekloud.com/kk-media/image/upload/v1752882969/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/prometheus-client-libraries-list.jpg)

Our primary focus will be on instrumenting an API to collect detailed metrics, ensuring robust monitoring and performance optimization for your services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/761f13d4-68d6-45ca-87d4-db480fdc0204)**
>
> Watch video content
