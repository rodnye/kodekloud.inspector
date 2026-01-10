# Demo Configure URL Redirect - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Demo-Configure-URL-Redirect)

---

## Table of Contents

- Demo Configure URL Redirect
  - 1. Verify the Current Setup
  - 2. Review Existing NGINX Configuration
  - 3. Create the HTTPS Configuration
  - 4. Enable and Test the New Configuration
  - Links and References
  - Watch Video

---

## Content

Nginx For Beginners

Intermediate Config

# Demo Configure URL Redirect

In this tutorial, you will learn how to enforce HTTPS by redirecting all HTTP requests (port 80) to HTTPS (port 443) using NGINX. We’ll demonstrate this on a simple diner app currently served over HTTP.

> [!important]
> **Note**
>
> Before you begin, ensure NGINX is installed and your TLS certificates (`.pem` and `.key`) are available in `/etc/ssl/certs/`.

---

## 1\. Verify the Current Setup

1.  Open the diner app in your browser at `http://localhost`.
2.  Check your firewall rules:

```
root@ubuntu-host# ufw status
Status: active


To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
```

Port 443 is not yet allowed, so accessing HTTPS returns a 502 Gateway error:

![The image shows a KodeKloud terminal interface with a "View Port" dialog box open, prompting the user to enter a port number, with "443" already entered and an "Open Port" button highlighted.](https://kodekloud.com/kk-media/image/upload/v1752882315/notes-assets/images/Nginx-For-Beginners-Demo-Configure-URL-Redirect/kodekloud-terminal-view-port-dialog.jpg)

3.  Allow HTTPS traffic:

```
root@ubuntu-host# ufw allow 443/tcp
root@ubuntu-host# ufw status
Status: active


To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
22/tcp (v6)                ALLOW       Anywhere (v6)
80/tcp (v6)                ALLOW       Anywhere (v6)
443/tcp (v6)               ALLOW       Anywhere (v6)
```

Your firewall now permits port 443, but NGINX isn’t listening there yet.

---

## 2\. Review Existing NGINX Configuration

List enabled sites:

```
root@ubuntu-host# ls -l /etc/nginx/sites-enabled
total 4
lrwxrwxrwx 1 root root 32 Feb  7 00:51 diner -> /etc/nginx/sites-available/diner
```

Open `/etc/nginx/sites-available/diner`—it currently listens only on HTTP:

```
server {
    listen 80;
    server_name diner.com;


    root /var/www/diner;
    index index.html index.htm index.nginx-debian.html;


    location / {
        # First attempt to serve request as file,
        # then as directory, then return a 404.
        try_files $uri $uri/ =404;
    }
}
```

---

## 3\. Create the HTTPS Configuration

Create (or edit) `/etc/nginx/sites-available/diner-https` with **two** server blocks:

```
server {
    listen 80;
    server_name diner.com;


    # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}


server {
    listen 443 ssl;
    server_name diner.com;


    # SSL certificates (already present on the system)
    ssl_certificate     /etc/ssl/certs/diner.com.pem;
    ssl_certificate_key /etc/ssl/certs/diner.com-key.pem;


    root /var/www/diner;
    index index.html index.htm index.nginx-debian.html;


    location / {
        # First attempt to serve request as file,
        # then as directory, then return a 404.
        try_files $uri $uri/ =404;
    }
}
```

| Server Block   | Purpose                                              | Port |
| -------------- | ---------------------------------------------------- | ---- |
| HTTP → HTTPS   | Permanent redirect (`301`) to the same URI over TLS  | 80   |
| HTTPS with SSL | Serves encrypted content using provided certificates | 443  |

---

## 4\. Enable and Test the New Configuration

1.  Disable the old site and enable the new one:

    ```
    root@ubuntu-host# sudo rm /etc/nginx/sites-enabled/diner
    root@ubuntu-host# sudo ln -s \
        /etc/nginx/sites-available/diner-https \
        /etc/nginx/sites-enabled/diner-https
    ```

2.  Test NGINX syntax and reload:

    ```
    root@ubuntu-host# nginx -t
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful


    root@ubuntu-host# nginx -s reload
    ```

> [!important]
> **Warning**
>
> If NGINX fails to reload, check for syntax errors in all files under `/etc/nginx/` and confirm your certificate paths are correct.

3.  Verify the redirect and HTTPS response:
    - **HTTP → HTTPS redirect:**

      ```
      root@ubuntu-host# curl -I http://localhost
      HTTP/1.1 301 Moved Permanently
      Location: https://localhost/
      Server: nginx/1.18.0 (Ubuntu)
      ```

    - **Serving content over HTTPS:**

      ```
      root@ubuntu-host# curl -I https://localhost --insecure
      HTTP/1.1 200 OK
      Server: nginx/1.18.0 (Ubuntu)
      ```

All HTTP requests on port 80 now automatically redirect to HTTPS on port 443, ensuring encrypted connections.

---

## Links and References

- [NGINX HTTP to HTTPS Redirect](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#return)
- [UFW Documentation](https://help.ubuntu.com/community/UFW)
- [NGINX Official Documentation](https://nginx.org/en/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/4335a4b8-d404-4150-9001-09851f436e4a)**
>
> Watch video content
