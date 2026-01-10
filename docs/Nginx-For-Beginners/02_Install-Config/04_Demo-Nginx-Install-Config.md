# Demo Nginx Install Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Install-Config/Demo-Nginx-Install-Config)

---

## Table of Contents

- Demo Nginx Install Config
  - Prerequisites
  - 1. Update Package Index
  - 2. Install Nginx
  - 3. Manage the Nginx Service
  - 4. Test with curl
  - 5. Explore Nginx Configuration Directory
  - 6. View Nginx Logs
  - Links and References
  - Watch Video
    - 5.1 Common Configuration Directories
    - 5.2 Global Settings (nginx.conf)

---

## Content

Nginx For Beginners

Install Config

# Demo Nginx Install Config

Learn how to install, manage, and configure Nginx on Ubuntu (or any Debian-based distribution) using `apt`. For CentOS or RHEL-based systems, swap `apt` with `yum`.

> [!important]
> **Note**
>
> All commands below assume you have `sudo` privileges.
> If you’re on RHEL/CentOS, use `yum install nginx` and `yum update -y` instead of `apt`.

## Prerequisites

- A running Ubuntu server (18.04, 20.04, or newer).
- Internet connectivity to download packages.
- Basic familiarity with the Linux command line.

## 1\. Update Package Index

Start by refreshing the local package index to fetch the latest metadata.

```
sudo apt update -y
```

Example output:

```
bob@alpine-host:~$ sudo apt update -y
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [128 kB]
...
Fetched 34.3 MB in 3s (10.7 MB/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done
47 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

Clear any clutter from your terminal before moving on:

```
clear
```

## 2\. Install Nginx

Install Nginx and its dependencies:

```
sudo apt install nginx
```

When prompted, confirm installation:

```
Do you want to continue? [Y/n] Y
```

Clear the screen again:

```
clear
```

## 3\. Manage the Nginx Service

Verify the current status of the Nginx service:

```
sudo systemctl status nginx
```

You might see it inactive at first:

```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: inactive (dead)
```

Start Nginx and confirm it’s running:

```
sudo systemctl start nginx
sudo systemctl status nginx
```

Now the service should be **active (running)**:

```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2025-02-05 11:59:11 EST; 5s ago
```

Clear the screen:

```
clear
```

## 4\. Test with curl

Ensure Nginx is serving content:

```
curl localhost
```

You should receive the default **Welcome to nginx!** HTML response.

Clear the screen once more:

```
clear
```

## 5\. Explore Nginx Configuration Directory

All Nginx configurations live under `/etc/nginx`. Change into this directory and inspect the contents:

```
cd /etc/nginx
ll
```

Example listing:

```
total 76
drwxr-xr-x  2 root root  4096 Feb  5 11:58 ./
drwxr-xr-x  2 root root  4096 Feb  5 11:58 ../
drwxr-xr-x  1 root root  1077 Mar 20  2024 conf.d/
-rw-r--r--  1 root root   1642 Mar 20  2024 fastcgi.conf
-rw-r--r--  1 root root    113 Mar 20  2024 fastcgi_params
...
drwxr-xr-x  2 root root  4096 Feb  5 11:58 sites-available/
drwxr-xr-x  2 root root  4096 Feb  5 11:58 sites-enabled/
```

### 5.1 Common Configuration Directories

| Directory                  | Description                                    |
| -------------------------- | ---------------------------------------------- |
| /etc/nginx                 | Core Nginx configuration                       |
| /etc/nginx/conf.d          | Independent configuration fragments            |
| /etc/nginx/sites-available | Virtual host definitions (disabled by default) |
| /etc/nginx/sites-enabled   | Symlinks to enabled virtual hosts              |

### 5.2 Global Settings (`nginx.conf`)

Open `nginx.conf` to review global directives:

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;


events {
    worker_connections 768;
}


http {
    ##
    # Basic Settings
    ##
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;


    include /etc/nginx/mime.types;
    default_type application/octet-stream;


    ##
    # SSL Settings
    ##
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;


    ##
    # Logging
    ##
    error_log /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;


    ##
    # Gzip Settings
    ##
    gzip on;


    ##
    # Virtual Host Configs
    ##
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

This configuration covers:

- Worker processes, user, and module inclusion
- Connection and timeout settings
- SSL protocol and cipher preferences
- Logging paths for access and errors
- Gzip compression
- Modular includes for virtual hosts

## 6\. View Nginx Logs

By default, Nginx writes logs to `/var/log/nginx`. List the log files:

```
cd /var/log/nginx
ll
```

Example:

```
total 16
drwxr-xr-x 2 root adm  4096 Feb  5 11:58 ./
drwxr-xr-x 1 root root 4096 Feb  5 11:58 ../
-rw-r--r-- 1 www-data adm   86 Feb  5 12:00 access.log
-rw-r----- 1 www-data adm    0 Feb  5 11:58 error.log
```

As you host multiple domains, consider creating subdirectories within `/var/log/nginx/` for per-site logging.

---

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [Ubuntu APT Guide](https://help.ubuntu.com/lts/serverguide/apt.html)
- [Managing Services with systemd](https://www.freedesktop.org/wiki/Software/systemd/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/0de43784-b08d-4ce0-8470-a7541b78fe58/lesson/8a76fda2-9055-43c0-af1e-f08df0c8cb1a)**
>
> Watch video content
