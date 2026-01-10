# Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Load-Balancer)

---

## Table of Contents

- Load Balancer
  - What Is a Load Balancer?
  - Why Use Nginx as a Load Balancer?
  - Configuring Upstream Pools
  - Load Balancing Methods
  - References
  - Watch Video
    - 1. Round-Robin (Default)
    - 2. Weighted Round-Robin
    - 3. IP Hash (Sticky Sessions)
    - 4. Least Connections
    - 5. Least Time (NGINX Plus)

---

## Content

Nginx For Beginners

Intermediate Config

# Load Balancer

In this lesson, we’ll dive into what a load balancer does and how Nginx handles load balancing out of the box. You’ll learn how to configure upstream pools, choose the right algorithm, and ensure high availability for your web applications.

## What Is a Load Balancer?

A load balancer is a network device—software or hardware—that distributes incoming traffic across multiple backend servers. It prevents any single server from becoming a performance bottleneck or single point of failure.

![The image illustrates a load balancing setup using Nginx, showing the flow from users through a network cloud to a load balancer, which distributes traffic to multiple web servers.](https://kodekloud.com/kk-media/image/upload/v1752882320/notes-assets/images/Nginx-For-Beginners-Load-Balancer/nginx-load-balancing-setup-diagram.jpg)

Without a load balancer, every request hits one server:

![The image illustrates a network setup without a load balancer, showing users connecting through a network cloud to a web server running NGINX, with a question about handling growing traffic.](https://kodekloud.com/kk-media/image/upload/v1752882321/notes-assets/images/Nginx-For-Beginners-Load-Balancer/network-setup-nginx-users-traffic.jpg)

![The image illustrates a network setup without a load balancer, showing users connecting through a network cloud to a single NGINX web server, with a warning about potential issues if the server goes offline.](https://kodekloud.com/kk-media/image/upload/v1752882322/notes-assets/images/Nginx-For-Beginners-Load-Balancer/network-setup-nginx-server-warning.jpg)

If that lone server crashes, your entire site goes down—and you lose traffic, revenue, and user trust.

## Why Use Nginx as a Load Balancer?

Nginx not only distributes traffic but also performs health checks on backend servers. When a node fails, Nginx automatically marks it unhealthy and stops sending traffic its way, keeping your site available on remaining nodes.

![The image is a diagram illustrating load balancing with Nginx, showing the flow from users through a network cloud to a load balancer, and then to web servers with health checks.](https://kodekloud.com/kk-media/image/upload/v1752882323/notes-assets/images/Nginx-For-Beginners-Load-Balancer/nginx-load-balancing-diagram.jpg)

> [!important]
> **Note**
>
> By default, Nginx excludes failed servers from the pool. You can tune probe intervals, timeouts, and retry counts for advanced health checks.

---

## Configuring Upstream Pools

Upstream blocks group your backend servers into a single logical name. Later, you reference that name with `proxy_pass` in a server block.

```
upstream backend {
    server 10.10.0.101:80;
    server 10.10.0.102:80;
    server 10.10.0.103:80;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

---

## Load Balancing Methods

Nginx supports multiple algorithms to suit different workloads. Here’s a quick summary:

| Algorithm            | Use Case                                | Directive                     |
| -------------------- | --------------------------------------- | ----------------------------- |
| Round Robin          | Even distribution (default)             | —                             |
| Weighted Round Robin | Prioritize higher-capacity servers      | `weight=`                     |
| IP Hash              | Sticky sessions based on client IP      | `ip_hash`                     |
| Least Connections    | Send to server with fewest active conns | `least_conn`                  |
| Least Time\\\*       | Fastest response (NGINX Plus only)      | `least_time last_byte/header` |

\* Requires NGINX Plus subscription

### 1\. Round-Robin (Default)

Distributes requests evenly in a circular order.

![The image illustrates a Round Robin load balancing algorithm using NGINX, distributing requests across three web servers.](https://kodekloud.com/kk-media/image/upload/v1752882325/notes-assets/images/Nginx-For-Beginners-Load-Balancer/round-robin-nginx-load-balancing.jpg)

```
upstream backend {
    server 10.10.0.101:80;
    server 10.10.0.102:80;
    server 10.10.0.103:80;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

### 2\. Weighted Round-Robin

Assign heavier weights to more powerful servers so they receive a larger share of traffic.

![The image illustrates a load balancing algorithm using NGINX, specifically the Weighted Round Robin method, distributing requests to web servers with different weights.](https://kodekloud.com/kk-media/image/upload/v1752882326/notes-assets/images/Nginx-For-Beginners-Load-Balancer/nginx-weighted-round-robin-load-balancing.jpg)

```
upstream backend {
    server 10.10.0.101:80 weight=4;
    server 10.10.0.102:80 weight=2;
    server 10.10.0.103:80 weight=1;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

### 3\. IP Hash (Sticky Sessions)

Ensures the same client IP always hits the same server—ideal for session persistence when data is stored in memory on each backend.

![The image illustrates an IP Hash algorithm used in load balancing, showing a load balancer directing traffic to multiple web servers based on IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752882327/notes-assets/images/Nginx-For-Beginners-Load-Balancer/ip-hash-load-balancing-diagram.jpg)

```
upstream backend {
    ip_hash;
    server 10.10.0.101:80;
    server 10.10.0.102:80;
    server 10.10.0.103:80;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

> [!important]
> **Warning**
>
> Sticky sessions can lead to uneven load if some clients generate more traffic. Use only when backend-level session sharing isn’t an option.

### 4\. Least Connections

Routes each new request to the server with the fewest active connections—ideal for dynamic workloads.

![The image illustrates a load balancing algorithm called "Least Connection" using NGINX, showing how connections are distributed to web servers based on the number of active connections.](https://kodekloud.com/kk-media/image/upload/v1752882328/notes-assets/images/Nginx-For-Beginners-Load-Balancer/least-connection-load-balancing-nginx.jpg)

```
upstream backend {
    least_conn;
    server 10.10.0.101:80;
    server 10.10.0.102:80;
    server 10.10.0.103:80;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

### 5\. Least Time (NGINX Plus)

Selects the backend with the fastest response time—either time to first byte or last byte. This requires NGINX Plus.

```
upstream backend {
    least_time last_byte/header;
    server 10.10.0.101:80;
    server 10.10.0.102:80;
    server 10.10.0.103:80;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend;
    }
}
```

---

## References

- [Nginx Load Balancing Documentation](https://nginx.org/en/docs/http/load_balancing.html)
- [Health Checks in NGINX Plus](https://docs.nginx.com/nginx/admin-guide/load-balancer/monitoring-health/)
- [Nginx Upstream Module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)
- [NGINX Plus Features](https://www.nginx.com/products/nginx/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/4356e2fa-9121-4fb3-9d11-8b96f964df6c)**
>
> Watch video content
