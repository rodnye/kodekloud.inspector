# Web Servers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Introduction/Web-Servers)

---

## Table of Contents

- Web Servers
  - How a Browser Loads a Web Page
  - HTTP vs. HTTPS
  - Traditional vs. Modern Server Architectures
  - References
  - Watch Video
    - Legacy Servers: Apache & IIS
    - Modern Alternatives

---

## Content

Nginx For Beginners

Introduction

# Web Servers

A **web server** combines hardware and software to process client requests and serve web content—HTML, CSS, JavaScript, images, and more—back to your browser.

![The image illustrates a web server concept with an icon of a server and a browser window, accompanied by a brief description of web servers.](https://kodekloud.com/kk-media/image/upload/v1752882361/notes-assets/images/Nginx-For-Beginners-Web-Servers/web-server-concept-icon-diagram.jpg)

## How a Browser Loads a Web Page

When you type a URL (for example, `KodeKloud.com`) into your browser:

1.  The browser queries the [DNS (Domain Name System)](https://en.wikipedia.org/wiki/Domain_Name_System) to resolve the domain name into an IP address.
2.  After obtaining the IP, it establishes a TCP connection to the server.
3.  The server receives the HTTP/HTTPS request, gathers the requested assets, and sends a response back.
4.  Your browser renders the response, displaying the web page.

![The image is a flowchart illustrating the query process of accessing a website, from typing the website name to displaying the website.](https://kodekloud.com/kk-media/image/upload/v1752882362/notes-assets/images/Nginx-For-Beginners-Web-Servers/website-query-process-flowchart.jpg)

> [!important]
> **Note**
>
> Think of DNS like a phone book—translating human-friendly domain names into machine-friendly IP addresses.

## HTTP vs. HTTPS

Web servers communicate over two main protocols:

- [HTTP (HyperText Transfer Protocol)](https://en.wikipedia.org/wiki/HTTP) – unencrypted
- [HTTPS (HTTP Secure)](https://en.wikipedia.org/wiki/HTTPS) – encrypted with TLS/SSL

Most browsers redirect HTTP requests to HTTPS to protect data in transit.

![The image shows two browser window illustrations with URLs, one using "https" and the other "http," highlighting the difference in protocols.](https://kodekloud.com/kk-media/image/upload/v1752882363/notes-assets/images/Nginx-For-Beginners-Web-Servers/https-http-browser-windows.jpg)

> [!important]
> **Warning**
>
> Transmitting sensitive information over plain HTTP can expose data to eavesdropping and man-in-the-middle attacks. Always prefer HTTPS.

## Traditional vs. Modern Server Architectures

### Legacy Servers: Apache & IIS

- **Apache HTTP Server** (⟶ mid-1990s) uses a process-per-connection or thread-per-connection model.
- **Microsoft IIS** launched around the same time with a similar architecture for Windows environments.

![The image shows logos for traditional web servers: Apache and Microsoft Internet Information Services (IIS).](https://kodekloud.com/kk-media/image/upload/v1752882364/notes-assets/images/Nginx-For-Beginners-Web-Servers/apache-iis-web-servers-logos.jpg)

Spawning new processes for each request leads to increased CPU and memory usage under high load:

![The image illustrates a web server handling multiple HTTP requests from "www.google.com," with a server showing 80% usage of both memory and CPU.](https://kodekloud.com/kk-media/image/upload/v1752882365/notes-assets/images/Nginx-For-Beginners-Web-Servers/web-server-http-requests-usage.jpg)

### Modern Alternatives

Today's high-traffic sites distribute requests across clusters of servers behind load balancers. Popular event-driven and asynchronous servers include:

| Web Server | First Released | Concurrency Model   | Key Benefit                            |
| ---------- | -------------- | ------------------- | -------------------------------------- |
| Nginx      | 2004           | Event-driven, async | Low memory footprint, high concurrency |
| OpenResty  | 2011           | Nginx + Lua modules | Extensible with Lua scripting          |
| LiteSpeed  | 2003           | Event-driven        | Drop-in Apache replacement option      |
| Caddy      | 2015           | Event-driven, Go    | Automatic HTTPS distribution           |

![The image lists commonly used web servers: Nginx, OpenResty, Litespeed, and Caddy, each with their respective logos.](https://kodekloud.com/kk-media/image/upload/v1752882366/notes-assets/images/Nginx-For-Beginners-Web-Servers/web-servers-nginx-openresty-litespeed-caddy.jpg)

In this guide, we'll focus on **Nginx**, exploring its architecture, configuration syntax, performance optimizations, and real-world deployment patterns.

## References

- [DNS – Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
- [HTTP – Wikipedia](https://en.wikipedia.org/wiki/HTTP)
- [HTTPS – Wikipedia](https://en.wikipedia.org/wiki/HTTPS)
- [Apache HTTP Server Documentation](https://httpd.apache.org/docs/)
- [Nginx Official Documentation](https://nginx.org/en/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/9e6f72d7-933d-42dd-a948-ae48d66aecb6/lesson/fbfa0275-af6c-46f3-8b06-3a0ab86a1f02)**
>
> Watch video content
