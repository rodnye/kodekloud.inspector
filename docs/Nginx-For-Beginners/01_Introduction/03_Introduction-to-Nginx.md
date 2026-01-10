# Introduction to Nginx - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Introduction/Introduction-to-Nginx)

---

## Table of Contents

- Introduction to Nginx
  - What Is NGINX?
  - Cross-Platform Support
  - Historical Context
  - Asynchronous, Event-Driven Architecture
  - NGINX Editions
  - Official Download Sites
  - Market Share & Adoption
  - Links and References
  - Watch Video

---

## Content

Nginx For Beginners

Introduction

# Introduction to Nginx

## What Is NGINX?

NGINX is a high-performance web server first released over 20 years ago. It’s available in two editions: the open source Community Edition and the commercial NGINX Plus. NGINX powers static content delivery, load balancing, reverse proxy, and more—across Linux, macOS, and Windows.

![The image is an introduction to Nginx, highlighting that it is open source with a commercial option and compatible with Linux, macOS, and Windows. It includes a graphic of a web browser and servers.](https://kodekloud.com/kk-media/image/upload/v1752882344/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/nginx-introduction-open-source-compatibility.jpg)

## Cross-Platform Support

NGINX overcomes the scalability and performance bottlenecks of legacy web servers. It installs easily on all major operating systems and delivers consistent throughput under heavy load.

![The image is an introduction slide about Nginx, highlighting its design to overcome limitations of older web servers, with a focus on performance. It includes icons representing performance and quality.](https://kodekloud.com/kk-media/image/upload/v1752882345/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/nginx-introduction-performance-design.jpg)

## Historical Context

Originally created to challenge Apache HTTP Server and Microsoft Internet Information Services (IIS), NGINX quickly gained traction thanks to its lightweight, asynchronous design.

![The image is an introduction to Nginx, indicating it was developed to compete with Apache and Microsoft Internet Information Services (IIS).](https://kodekloud.com/kk-media/image/upload/v1752882346/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/nginx-introduction-apache-iis.jpg)

## Asynchronous, Event-Driven Architecture

One of NGINX’s key innovations is handling 10,000+ concurrent connections with minimal overhead. This makes it ideal for serving static assets—HTML, images, audio, and video—more efficiently than traditional, process-based servers.

> [!important]
> **Note**
>
> NGINX processes multiple client requests within a single worker process using non-blocking I/O.

| Feature                     | NGINX                      | Apache                   |
| --------------------------- | -------------------------- | ------------------------ |
| Architecture                | Asynchronous, event-driven | Process/thread-based     |
| Max. concurrent connections | ≥10,000                    | Varies, lower throughput |
| CPU & memory usage          | Low                        | Higher                   |
| Static content performance  | Excellent                  | Good                     |

Recent benchmarks show NGINX can handle up to four times as many connections as Apache, with lower latency and reduced resource consumption.

![The image compares the limitations of Apache and NGINX in handling user requests, showing Apache with multiple processes and NGINX handling requests more efficiently.](https://kodekloud.com/kk-media/image/upload/v1752882348/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/apache-vs-nginx-request-handling.jpg)

## NGINX Editions

NGINX is distributed in two main editions:

| Edition                 | Key Features                                   | Support           | Download URL                          |
| ----------------------- | ---------------------------------------------- | ----------------- | ------------------------------------- |
| Community (Open Source) | Core HTTP, reverse proxy, load balancing       | Community forum   | https://nginx.org/download            |
| NGINX Plus (Commercial) | Advanced modules, dashboard, WAF, 24×7 support | Paid subscription | https://nginx.com/products/nginx-plus |

![The image is a diagram showing two types of software versions: "Open-Source Community Version" and "Commercial Paid Version," with an additional "Paid Support" option.](https://kodekloud.com/kk-media/image/upload/v1752882349/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/software-versions-diagram.jpg)

> [!important]
> **Warning**
>
> Check the licensing and support terms before deploying NGINX Plus in production environments.

## Official Download Sites

For the open source release, visit nginx.org. To learn about NGINX Plus, head to nginx.com.

![The image compares two websites, nginx.org and nginx.com, highlighting their different designs and content focus.](https://kodekloud.com/kk-media/image/upload/v1752882350/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/nginx-org-vs-nginx-com-comparison.jpg)

## Market Share & Adoption

According to a June 2024 survey, NGINX holds 21% market share among web servers—and 32% when including OpenResty, an enhanced NGINX distribution. It ranks second only to Cloudflare in the top million sites and leads in overall domains and compute infrastructure.

Combined, NGINX and OpenResty power roughly two-thirds of all Internet domains. Major organizations such as GitHub, Cloudflare, LinkedIn, Microsoft, and Netflix rely on NGINX for reliable, scalable performance.

| Web Server | Market Share¹ |
| ---------- | ------------- |
| Cloudflare | 34%           |
| NGINX      | 21%           |
| OpenResty  | 11%           |
| Others     | 34%           |

¹ June 2024 survey data

![The image shows NGINX metrics, highlighting its market share as the most popular web server according to a June 2024 survey, with a graph and table detailing market shares of various web server developers.](https://kodekloud.com/kk-media/image/upload/v1752882351/notes-assets/images/Nginx-For-Beginners-Introduction-to-Nginx/nginx-metrics-market-share-2024.jpg)

---

Up next: a deep dive into the NGINX architecture, configuration files, and core modules.

---

## Links and References

- Official NGINX Documentation: https://nginx.org/en/docs/
- NGINX Plus Overview: https://nginx.com/products/nginx-plus/
- OpenResty: https://openresty.org/en/

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/9e6f72d7-933d-42dd-a948-ae48d66aecb6/lesson/7c5a412f-6586-46e5-acb2-b1ea364b4de8)**
>
> Watch video content
