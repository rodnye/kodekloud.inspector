# Reverse Proxy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Reverse-Proxy)

---

## Table of Contents

- Reverse Proxy
  - What Is a Reverse Proxy?
  - Reverse Proxy vs. Load Balancer
  - Placing Application Frameworks Behind a Reverse Proxy
  - SSL/TLS Termination (Offloading)
  - Caching to Reduce Backend Load
  - Further Reading
  - Watch Video
    - 1. Basic HTTP Reverse Proxy
    - 2. HTTPS Termination at the Proxy
    - 3. End-to-End TLS Encryption
    - Sample Cache Configuration

---

## Content

Nginx For Beginners

Intermediate Config

# Reverse Proxy

In this lesson, we’ll explore what a reverse proxy is, how it works, and the benefits it brings to your architecture.

## What Is a Reverse Proxy?

A **reverse proxy** sits between clients and one or more backend servers. It receives incoming requests, routes them to the appropriate server pool, and returns the server’s response to the client. Common use cases include:

- Hiding backend server identities
- SSL/TLS offloading
- Caching static assets
- Distributing traffic across multiple application servers

> [!important]
> **Why Use a Reverse Proxy?**
>
> A reverse proxy can improve security, performance, and scalability by centralizing request handling, encryption, and caching.

## Reverse Proxy vs. Load Balancer

While both components sit in front of your servers, their primary responsibilities differ:

| Feature              | Reverse Proxy                            | Load Balancer                            |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| Main Role            | Hide backend details and forward traffic | Distribute traffic evenly across servers |
| SSL/TLS Offloading   | Yes                                      | Sometimes (depends on implementation)    |
| Caching              | Yes                                      | Rarely                                   |
| Application Firewall | Often integrated                         | Rarely                                   |

![The image illustrates the concept of a reverse proxy, showing how it forwards client requests to backend servers, effectively hiding the backend server.](https://kodekloud.com/kk-media/image/upload/v1752882330/notes-assets/images/Nginx-For-Beginners-Reverse-Proxy/reverse-proxy-client-requests-diagram.jpg)

## Placing Application Frameworks Behind a Reverse Proxy

Modern web apps often use frameworks like React (Node.js), Flask (Python), Rails (Ruby), or Laravel (PHP). By default, these bind to local ports (e.g., React on 3000, Flask on 5000). In production:

- The reverse proxy exposes only itself to the Internet
- Backend servers remain isolated on private networks

![The image shows two browser windows: one displaying a React app with a React logo and another showing a simple webpage using the Flask framework.](https://kodekloud.com/kk-media/image/upload/v1752882331/notes-assets/images/Nginx-For-Beginners-Reverse-Proxy/react-flask-browser-windows.jpg)

> [!important]
> **Production Best Practice**
>
> Never expose application-framework ports directly to the public Internet. Always route through a hardened reverse proxy.

## SSL/TLS Termination (Offloading)

Offloading SSL/TLS decryption to the reverse proxy reduces CPU load on your application servers. Clients connect over HTTPS to the proxy, which decrypts the traffic, forwards plain HTTP to backends, then re-encrypts responses.

![The image illustrates an SSL/TLS termination process using a reverse proxy with NGINX, showing the flow from users through a network cloud to various web servers.](https://kodekloud.com/kk-media/image/upload/v1752882333/notes-assets/images/Nginx-For-Beginners-Reverse-Proxy/ssl-tls-termination-nginx-diagram.jpg)

### 1\. Basic HTTP Reverse Proxy

```
http {
    upstream backend {
        server 10.10.0.101:80;
        server 10.10.0.102:80;
        server 10.10.0.103:80;
    }
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_pass http://backend/;
    }
}
```

### 2\. HTTPS Termination at the Proxy

```
server {
    listen 443 ssl;
    server_name example.com www.example.com;


    ssl_certificate     /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;
    ssl_protocols       TLSv1.2 TLSv1.3;


    location / {
        proxy_pass http://backend/;
    }
}
```

### 3\. End-to-End TLS Encryption

When compliance mandates encrypted links all the way to your app servers, enable HTTPS in `proxy_pass`:

```
http {
    upstream backend {
        server 10.10.0.101:443;
        server 10.10.0.102:443;
        server 10.10.0.103:443;
    }
}


server {
    listen 443 ssl;
    server_name example.com www.example.com;


    ssl_certificate     /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;
    ssl_protocols       TLSv1.2 TLSv1.3;


    location / {
        proxy_pass https://backend/;
    }
}
```

## Caching to Reduce Backend Load

Caching static files and repeatable responses (images, CSS, JSON) at the proxy layer decreases latency and backend CPU usage. NGINX can act as a cache server to serve frequent requests directly from local storage.

![The image is a diagram illustrating a network setup with a reverse proxy using NGINX, connecting users through a network cloud to various web servers, including NGINX, Apache, and a generic web server.](https://kodekloud.com/kk-media/image/upload/v1752882334/notes-assets/images/Nginx-For-Beginners-Reverse-Proxy/nginx-reverse-proxy-network-diagram.jpg)

### Sample Cache Configuration

```
http {
    proxy_cache_path /var/lib/nginx/cache levels=1:2 zone=app_cache:8m;
    proxy_cache_key "$scheme$request_method$host$request_uri$is_args$args";
    proxy_cache_valid 200 302 10m;
    proxy_cache_valid 404 1m;
}


server {
    listen 80;
    server_name example.com www.example.com;


    location / {
        proxy_cache        app_cache;
        proxy_cache_bypass $http_cache_control;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_pass         http://backend/;
    }
}
```

## Further Reading

- [NGINX Reverse Proxy Official Docs](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
- [TLS/SSL Termination Strategies](https://security.example.com/tls-termination)
- [Best Practices for Web Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/beb4a7aa-77e5-4e9b-9d41-4a3f7029a73a)**
>
> Watch video content
