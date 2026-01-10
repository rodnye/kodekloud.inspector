# Demo Configure Multiple Sites - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Demo-Configure-Multiple-Sites)

---

## Table of Contents

- Demo Configure Multiple Sites
  - Table of Contents
  - 1. Remove the Default Site
  - 2. Create Site Configurations
  - 3. Set Up Document Roots and Index Files
  - 4. Enable Sites and Reload Nginx
  - 5. Verify Virtual Host Routing
  - 6. Optional: Single Combined Config
  - 7. Best Practices
  - References
  - Watch Video
  - Practice Lab
    - 2.1 example1.com
    - 2.2 example2.com

---

## Content

Nginx For Beginners

Intermediate Config

# Demo Configure Multiple Sites

In this guide, you’ll learn how to host two distinct domains—**www.example1.com** and **www.example2.com**—on a single Nginx server. Incoming HTTP requests are routed based on the `Host` header, matching the `server_name` directive within each server block (often called _virtual hosts_). By the end of this tutorial, you’ll have two separate site roots and configurations, each serving its own content.

---

## Table of Contents

1.  [Remove the Default Site](#1-remove-the-default-site)
2.  [Create Site Configurations](#2-create-site-configurations)
3.  [Set Up Document Roots and Index Files](#3-set-up-document-roots-and-index-files)
4.  [Enable Sites and Reload Nginx](#4-enable-sites-and-reload-nginx)
5.  [Verify Virtual Host Routing](#5-verify-virtual-host-routing)
6.  [Optional: Single Combined Config](#6-optional-single-combined-config)
7.  [Best Practices](#7-best-practices)
8.  [References](#references)

---

## 1\. Remove the Default Site

Before adding your own configurations, disable the default Nginx welcome page.

```
# Verify the default page
curl localhost
# → Welcome to nginx!
```

> [!important]
> **Warning**
>
> Removing the `default` site will cause `localhost` to refuse connections until you enable at least one server block.

```
# Disable default configuration
rm /etc/nginx/sites-enabled/default


# Reload Nginx to apply changes
nginx -s reload


# Confirm removal
curl localhost
# → curl: (7) Failed to connect to localhost port 80: Connection refused
```

---

## 2\. Create Site Configurations

We’ll copy the default config twice—once for each domain—and then adjust the `root` and `server_name`.

### 2.1 example1.com

```
# List available configs
ls -l /etc/nginx/sites-available


# Copy default to example1
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example1
```

Edit `/etc/nginx/sites-available/example1`:

```
# /etc/nginx/sites-available/example1
server {
    listen 80;
    server_name www.example1.com;
    root /var/www/example1;
    index index.html index.htm;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 2.2 example2.com

```
# Duplicate example1 for example2
cp /etc/nginx/sites-available/example1 /etc/nginx/sites-available/example2
```

Update `/etc/nginx/sites-available/example2`:

```
# /etc/nginx/sites-available/example2
server {
    listen 80;
    server_name www.example2.com;
    root /var/www/example2;
    index index.html index.htm;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 3\. Set Up Document Roots and Index Files

Create directories for each site and add a simple `index.html`:

```
mkdir -p /var/www/example1 /var/www/example2


cat << 'EOF' > /var/www/example1/index.html
<h1>Example 1</h1>
EOF


cat << 'EOF' > /var/www/example2/index.html
<h1>Example 2</h1>
EOF


# Ensure Nginx can read the files
chown -R www-data:www-data /var/www/example1 /var/www/example2
```

---

## 4\. Enable Sites and Reload Nginx

Create symbolic links in `sites-enabled`, then test and reload.

```
# Enable both sites
ln -s /etc/nginx/sites-available/example1 /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/example2 /etc/nginx/sites-enabled/


# Test configuration
nginx -t
# Reload Nginx
nginx -s reload
```

---

## 5\. Verify Virtual Host Routing

Simulate browser requests using `curl` with custom `Host` headers:

```
curl --header "Host: www.example1.com" localhost
curl --header "Host: www.example2.com" localhost
curl --header "Host: unknown.com" localhost
# → <h1>Example 1</h1>  (first enabled server block)
```

---

## 6\. Optional: Single Combined Config

You may merge both server blocks into one file, though we recommend keeping them separate.

```
# /etc/nginx/sites-available/example
server {
    listen 80;
    server_name www.example1.com;
    root /var/www/example1;
    index index.html index.htm;


    location / {
        try_files $uri $uri/ =404;
    }
}


server {
    listen 80;
    server_name www.example2.com;
    root /var/www/example2;
    index index.html index.htm;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable and reload:

```
ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
nginx -t && nginx -s reload
```

> [!important]
> **Note**
>
> Keeping separate files in `sites-available` makes it simpler to enable/disable individual domains without affecting others.

---

## 7\. Best Practices

| Practice                     | Benefit                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| Separate config per domain   | Isolate changes and minimize risk to other sites.                                      |
| Use descriptive file names   | Quickly identify which domain each configuration serves.                               |
| Regularly test configuration | Run `nginx -t` before reloading to catch syntax errors.                                |
| Limit server-wide directives | Keep domain-specific settings in individual server blocks, not in global `nginx.conf`. |

---

## References

- [Nginx Server Blocks (Virtual Hosts)](https://docs.nginx.com/nginx/admin-guide/server-blocks/)
- [Ubuntu Nginx Documentation](https://ubuntu.com/server/docs/web-servers-nginx)
- [Curl Manual](https://curl.se/docs/manpage.html)
- [Nginx Try Files Documentation](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/db98f13e-91c5-43d1-9400-fd40daf84b42)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/c74f891f-6063-47cc-8144-ada26fef3e78)**
>
> Practice lab
