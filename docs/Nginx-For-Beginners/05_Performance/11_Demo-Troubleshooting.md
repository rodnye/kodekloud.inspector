# Demo Troubleshooting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Demo-Troubleshooting)

---

## Table of Contents

- Demo Troubleshooting
  - 1. Validate Configuration Syntax with nginx -t
  - 2. Understand Directive Contexts
  - 3. Graceful Reload vs. Full Restart
  - 4. Configure Per-Site Logging
  - 5. Perform Health Checks with curl
  - 6. Ensure Local DNS Resolution
  - 7. Verify Firewall Rules
  - 8. Recommended Global Settings
  - Links and References
  - Watch Video

---

## Content

Nginx For Beginners

Performance

# Demo Troubleshooting

Welcome to the final demo of this course. In this lesson, we’ll explore essential Nginx troubleshooting techniques—from syntax checks and graceful reloads to per-site logging, health checks, DNS resolution, and firewall configuration. These tips will help you diagnose and fix Nginx issues quickly, ensuring high availability for your applications.

---

## 1\. Validate Configuration Syntax with `nginx -t`

Always verify your Nginx configuration after any edit. This prevents deploying broken configs that could take your server offline.

```
root@nginx:~# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If there’s a typo (e.g., a missing semicolon), Nginx reports an error immediately:

```
root@nginx:~# nginx -t
nginx: [emerg] directive "deny" is not terminated by ";" in /etc/nginx/sites-enabled/example-https:9
nginx: configuration file /etc/nginx/nginx.conf test failed
```

> [!important]
> **Note**
>
> Running `nginx -t` is a **must** step in your deployment pipeline to catch syntax errors early.

---

## 2\. Understand Directive Contexts

Certain directives only work within specific blocks. For example, you cannot place an `http { … }` block inside a `server { … }` block:

```
server {
    listen 80;
    server_name example.com;


    # ❌ This will fail
    http {
        access_log /var/log/nginx/access.log;
    }
}
```

Testing this misplacement yields:

```
nginx: [emerg] "http" directive is not allowed here in /etc/nginx/sites-enabled/example-https:33
nginx: configuration file /etc/nginx/nginx.conf test failed
```

> [!important]
> **Warning**
>
> Always refer to the [Nginx Directive Reference](https://nginx.org/en/docs/dirindex.html) to confirm where directives are allowed.

---

## 3\. Graceful Reload vs. Full Restart

Use a **graceful reload** to apply configuration changes without dropping active connections. A full restart will briefly disconnect users.

| Action                   | Command                       | Impact                           |
| ------------------------ | ----------------------------- | -------------------------------- |
| Graceful reload          | `nginx -t && nginx -s reload` | No dropped connections           |
| Full restart (not ideal) | `systemctl restart nginx`     | Active sessions are disconnected |

```
# Preferred: Graceful reload
root@nginx:~# nginx -t && nginx -s reload


# Only if necessary: Full restart
root@nginx:~# systemctl restart nginx
```

---

## 4\. Configure Per-Site Logging

When hosting multiple domains, separate logs per site for easier debugging.

| Configuration File                   | Purpose                       |
| ------------------------------------ | ----------------------------- |
| `/etc/nginx/nginx.conf`              | Global defaults and includes  |
| `/etc/nginx/sites-available/example` | Domain-specific server blocks |
| `/var/log/nginx/example.com/`        | Dedicated log directory       |

1.  **Global Logging Settings** (`/etc/nginx/nginx.conf`):

    ```
    access_log  /var/log/nginx/access.log;
    error_log   /var/log/nginx/error.log;
    include     /etc/nginx/sites-enabled/*;
    ```

2.  **Site-Specific Configuration** (`/etc/nginx/sites-available/example-https`):

    ```
    server {
        listen 80;
        server_name example.com;
        return 301 https://$host$request_uri;
    }


    server {
        listen 443 ssl;
        server_name example.com;


        ssl_certificate     /etc/ssl/certs/example.com.pem;
        ssl_certificate_key /etc/ssl/private/example.com-key.pem;


        root /var/www/html;


        access_log /var/log/nginx/example.com/access.log;
        error_log  /var/log/nginx/example.com/error.log;


        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
        add_header X-Frame-Options           "SAMEORIGIN";
        add_header Content-Security-Policy  "default-src 'self'";
        add_header Referrer-Policy          origin;


        index index.html index.htm;


        location / {
            try_files $uri $uri =404;
        }
    }
    ```

3.  **Create and Secure Log Directory**:

    ```
    root@nginx:~# mkdir -p /var/log/nginx/example.com
    root@nginx:~# chown www-data:adm /var/log/nginx/example.com
    root@nginx:~# nginx -t && nginx -s reload
    ```

4.  **Verify**:

    ```
    root@nginx:/var/log/nginx# ll
    drwxr-xr-x 2 www-data adm 4096 Feb 18 19:48 example.com/
    root@nginx:/var/log/nginx/example.com# tail -f access.log
    ```

---

## 5\. Perform Health Checks with `curl`

Use `curl` to isolate failures between network/DNS issues and Nginx itself:

- **Local HTTP check**:

  ```
  root@nginx:/# curl localhost
  ```

- **HTTPS header inspection**:

  ```
  root@nginx:/# curl --head https://example.com
  HTTP/1.1 200 OK
  Server: nginx/1.18.0 (Ubuntu)
  ```

- **Verify service is down**:

  ```
  root@nginx:/# systemctl stop nginx
  root@nginx:/# curl --head https://example.com
  curl: (7) Failed to connect to example.com port 443: Connection refused
  ```

---

## 6\. Ensure Local DNS Resolution

For accurate testing, map your domain to localhost in `/etc/hosts`:

```
# /etc/hosts
127.0.0.1   localhost example.com www.example.com
::1         ip6-localhost ip6-loopback
```

---

## 7\. Verify Firewall Rules

Confirm both OS-level and cloud firewalls allow inbound traffic on ports 80, 443, and SSH (22):

```
root@nginx:/# ufw status
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

If port 80 is closed, HTTP traffic can’t reach Nginx for redirection to HTTPS.

---

## 8\. Recommended Global Settings

Unless you have advanced requirements, the defaults suffice. These common tweaks help improve security and performance:

```
# Disable legacy TLS and prefer strong ciphers
ssl_protocols       TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;


# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

---

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [How To Secure Nginx with Let's Encrypt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu)
- [UFW Basics](https://help.ubuntu.com/community/UFW)

Thanks for joining this lesson—good luck with your deployments!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/53475fbe-d12f-48d7-9602-d4a93debd874)**
>
> Watch video content
