# Demo Load Balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Demo-Load-Balancer)

---

## Table of Contents

- Demo Load Balancer
  - Load Balancing Algorithm Comparison
  - Environment Setup
  - Configuring the Load Balancer
  - Links and References
  - Watch Video
  - Practice Lab
    - 1. Round Robin
    - 2. Weighted Round Robin
    - 3. IP Hash

---

## Content

Nginx For Beginners

Intermediate Config

# Demo Load Balancer

In this tutorial, you'll learn how to configure Nginx as a load balancer using three common algorithms:

1.  **Round Robin**: Distributes requests evenly across all backend servers.
2.  **Weighted Round Robin**: Assigns traffic proportionally based on server weights.
3.  **IP Hash**: Routes each client IP to the same backend to maintain session persistence.

![The image illustrates a Round Robin load balancing algorithm using NGINX, distributing requests to two Apache web servers.](https://kodekloud.com/kk-media/image/upload/v1752882316/notes-assets/images/Nginx-For-Beginners-Demo-Load-Balancer/round-robin-load-balancing-nginx.jpg)

![The image illustrates a weighted round robin load balancing algorithm using NGINX, distributing traffic to two Apache web servers with different weights.](https://kodekloud.com/kk-media/image/upload/v1752882316/notes-assets/images/Nginx-For-Beginners-Demo-Load-Balancer/nginx-weighted-round-robin-load-balancing.jpg)

![The image illustrates an IP Hash algorithm used in load balancing, showing a load balancer directing traffic to multiple web servers based on IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752882318/notes-assets/images/Nginx-For-Beginners-Demo-Load-Balancer/ip-hash-load-balancing-diagram.jpg)

## Load Balancing Algorithm Comparison

| Algorithm            | Behavior                                           | Use Case                                          |
| -------------------- | -------------------------------------------------- | ------------------------------------------------- |
| Round Robin          | Cycles through all servers equally                 | Simple distribution without session affinity      |
| Weighted Round Robin | Traffic proportionate to configured server weights | Differing server capacities or performance levels |
| IP Hash              | Routes same client IP to the same backend          | Session persistence without cookies or headers    |

## Environment Setup

We have three Ubuntu nodes in our test lab:

- **nginx**: Nginx load balancer (192.230.202.10)
- **node01** & **node02**: Apache backend servers

On each backend, Apache is running and UFW is active but only port 22 is open by default:

```
# On node01 (repeat on node02)
root@node01:~# systemctl status apache2
● apache2.service - The Apache HTTP Server
   Active: active (running) ...


root@node01:~# ufw status
Status: active


To                         Action    From
--                         ------    ----
22/tcp                     ALLOW     Anywhere
22/tcp (v6)                ALLOW     Anywhere (v6)
```

> [!important]
> **Allow Only the Load Balancer**
>
> For security, restrict HTTP access so only the load balancer (192.230.202.10) can reach port 80 on your backends.

```
# On node01
root@node01:~# ufw allow from 192.230.202.10 proto tcp to any port 80


# Verify the rule
root@node01:~# ufw status
Status: active


To                         Action    From
--                         ------    ----
22/tcp                     ALLOW     Anywhere
192.230.202.10 80/tcp      ALLOW     Anywhere
22/tcp (v6)                ALLOW     Anywhere (v6)


# Repeat on node02
root@node02:~# ufw allow from 192.230.202.10 proto tcp to any port 80
```

## Configuring the Load Balancer

On the **nginx** node, create or edit your site configuration:

```
root@nginx:~# cd /etc/nginx/sites-available/
root@nginx:/etc/nginx/sites-available# vim apache-app
```

Start with a basic server block:

```
server {
    listen 80;
    server_name apache.example.com;
    root /var/www/html;


    # Default index files
    index index.html index.htm index.nginx-debian.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 1\. Round Robin

Add an `upstream` block for your backend pool:

```
# Upstream (Round Robin)
upstream apache_example {
    server 192.230.202.12:80;
    server 192.230.202.3:80;
}


server {
    listen 80;
    server_name apache.example.com;
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;


    location / {
        proxy_pass http://apache_example;
    }
}
```

Enable the site and reload Nginx:

```
root@nginx:/etc/nginx/sites-available# nginx -t
root@nginx:/etc/nginx/sites-available# ln -s apache-app /etc/nginx/sites-enabled/
root@nginx:/etc/nginx/sites-available# nginx -s reload
```

Test with `curl` to see alternating responses:

```
root@nginx:~# curl localhost
<p>Served by node02</p>
root@nginx:~# curl localhost
<p>Served by node01</p>
```

### 2\. Weighted Round Robin

Adjust the `upstream` block to assign server weights:

```
# Upstream (Weighted Round Robin)
upstream apache_example {
    server 192.230.202.12:80 weight=10;
    server 192.230.202.3:80  weight=1;
}
```

Reload Nginx to apply:

```
root@nginx:~# nginx -s reload
```

Now about 10× more requests go to the higher-weighted server.

### 3\. IP Hash

Enable `ip_hash` for session stickiness by client IP:

```
# Upstream (IP Hash)
upstream apache_example {
    ip_hash;
    server 192.230.202.12:80;
    server 192.230.202.3:80;
}
```

Reload Nginx:

```
root@nginx:~# nginx -s reload
```

> [!important]
> **Consistent Routing**
>
> With `ip_hash`, each client IP always hits the same backend server. This is ideal for stateful applications.

---

You can extend this setup with health checks, SSL termination, or alternative Nginx modules.

## Links and References

- [Nginx Load Balancing](https://nginx.org/en/docs/http/load_balancing.html)
- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [Apache HTTP Server Docs](https://httpd.apache.org/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/a2b8d77e-6682-4fa2-bedf-a8dde19a29ef)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/da8e5437-fc04-466c-9446-8f856d5bb9ec)**
>
> Practice lab
