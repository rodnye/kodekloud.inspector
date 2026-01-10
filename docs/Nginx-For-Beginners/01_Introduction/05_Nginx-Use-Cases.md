# Nginx Use Cases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Introduction/Nginx-Use-Cases)

---

## Table of Contents

- Nginx Use Cases
  - Load Balancing
  - Reverse Proxy
  - Forward Proxy
  - Caching
  - Links and References
  - Watch Video
    - Load Balancer vs. Reverse Proxy

---

## Content

Nginx For Beginners

Introduction

# Nginx Use Cases

Nginx is more than a high-performance web server. It can improve your architecture by acting as a load balancer, reverse proxy, forward proxy, or caching layer—boosting scalability, reducing latency, and enhancing security.

Key benefits include:

- Distributing requests for high availability
- Offloading SSL/TLS and request routing
- Caching responses to cut backend load
- Controlling outbound traffic and anonymizing clients

Explore each use case below, complete with configuration examples, diagrams, and best practices.

---

## Load Balancing

By distributing incoming requests across multiple servers, Nginx prevents any single backend from becoming a bottleneck. You declare an `upstream` block listing your servers, then proxy traffic to it.

```
upstream backend {
    server backend1.example.com;
    server backend2.example.com max_fails=3 fail_timeout=30s;
}


server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

> [!important]
> **Note**
>
> Nginx supports multiple algorithms including `round_robin` (default), `least_conn`, and `ip_hash`. Choose one based on your workload characteristics.

![The image illustrates a load balancing setup using Nginx, showing the flow from users through a network cloud to a load balancer, which distributes traffic to multiple web servers. It includes indicators for queries/responses and server health checks.](https://kodekloud.com/kk-media/image/upload/v1752882357/notes-assets/images/Nginx-For-Beginners-Nginx-Use-Cases/nginx-load-balancing-setup-diagram.jpg)

---

## Reverse Proxy

A reverse proxy accepts client requests, applies routing or SSL offloading, then forwards them to one or more backend servers. This hides your infrastructure behind a single public endpoint.

```
server {
    listen 443 ssl;
    server_name example.com;


    ssl_certificate     /etc/nginx/ssl/example.crt;
    ssl_certificate_key /etc/nginx/ssl/example.key;


    location / {
        proxy_pass       http://internal_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

![The image illustrates the concept of a reverse proxy using NGINX, showing how it routes requests from users through a network cloud to either an NGINX or Apache web server.](https://kodekloud.com/kk-media/image/upload/v1752882358/notes-assets/images/Nginx-For-Beginners-Nginx-Use-Cases/reverse-proxy-nginx-architecture.jpg)

### Load Balancer vs. Reverse Proxy

| Feature          | Load Balancer                     | Reverse Proxy                           |
| ---------------- | --------------------------------- | --------------------------------------- |
| Primary Role     | Distribute traffic across servers | Intercept and forward requests          |
| Backend Servers  | Requires two or more              | Can work with a single server           |
| Common Use Cases | Scaling, failover, health checks  | SSL/TLS termination, path-based routing |

---

## Forward Proxy

A forward proxy sits between clients and the internet, filtering or anonymizing outbound requests. Configure Nginx to restrict sites or mask client IPs for privacy.

```
server {
    listen 3128;


    resolver 8.8.8.8;
    proxy_pass_request_headers on;


    location / {
        proxy_pass $scheme://$http_host$request_uri;
        proxy_hide_header Proxy-Authorization;
    }
}
```

> [!important]
> **Warning**
>
> Opening a forward proxy to the public can lead to abuse. Always secure it with `allow`/`deny` or authentication mechanisms.

![The image illustrates the concept of a forward proxy, showing clients accessing websites through an NGINX proxy and a network cloud.](https://kodekloud.com/kk-media/image/upload/v1752882359/notes-assets/images/Nginx-For-Beginners-Nginx-Use-Cases/forward-proxy-nginx-clients-diagram.jpg)

---

## Caching

Caching with Nginx reduces response times and eases load on backend services. Define a cache zone, set key parameters, and control how responses are stored.

```
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m
                 inactive=60m max_size=1g;


server {
    listen 80;
    location / {
        proxy_cache my_cache;
        proxy_pass http://backend;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
    }
}
```

> [!important]
> **Note**
>
> Monitor cache usage and tune `inactive` and `max_size` to avoid running out of disk space. Use `proxy_cache_bypass` for selective caching.

![The image illustrates a caching system with a network cloud, a reverse proxy using NGINX, and multiple web servers, including Apache and a generic server. It shows the flow of data from users through the network and proxy to the servers.](https://kodekloud.com/kk-media/image/upload/v1752882360/notes-assets/images/Nginx-For-Beginners-Nginx-Use-Cases/caching-system-nginx-proxy-servers.jpg)

---

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [HTTP Load Balancing with Nginx](https://nginx.org/en/docs/http/load_balancing.html)
- [Using Nginx as a Forward Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [Caching Guide in Nginx](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/9e6f72d7-933d-42dd-a948-ae48d66aecb6/lesson/9868630e-34b1-4e4c-8eb6-cb29859824e8)**
>
> Watch video content
