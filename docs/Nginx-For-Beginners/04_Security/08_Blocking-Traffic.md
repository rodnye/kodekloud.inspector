# Blocking Traffic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Security/Blocking-Traffic)

---

## Table of Contents

- Blocking Traffic
  - Restricting Access by IP in Nginx
  - Why Manual IP Blocking Falls Short
  - Links and References
  - Watch Video
    - Example: Allow Only Two IPs, Block Everything Else
    - Example: Deny a Subnet Globally, Allow a Subnet to /admin
    - Installing Fail2Ban
    - Configuring Jails
    - Built-in Filters
    - Checking Status and Unbanning
      - Protecting Nginx HTTP Authentication
      - Blocking Bad Bots
      - Rate Limiting Excessive Requests

---

## Content

Nginx For Beginners

Security

# Blocking Traffic

Hackers can steal data, distribute spyware or ransomware, and even bring down entire websites. While legitimate bots crawl your pages for search indexing,

![The image illustrates a hacker in a hoodie at a computer, with icons and text describing activities like stealing data, spreading spyware and ransomware, and taking down websites.](https://kodekloud.com/kk-media/image/upload/v1752882442/notes-assets/images/Nginx-For-Beginners-Blocking-Traffic/hacker-hoodie-computer-cybercrime.jpg)

malicious bots may spam forms, scrape content, or post fake reviews.

![The image shows a cartoon robot with a detached head, displaying a speech bubble that says "Oops! 404 Error," labeled as "Bad Bots."](https://kodekloud.com/kk-media/image/upload/v1752882443/notes-assets/images/Nginx-For-Beginners-Blocking-Traffic/cartoon-robot-404-error-bad-bots.jpg)

In this guide, we’ll cover how to block unwanted traffic—whether it’s individual IPs, bots, or entire network ranges—to protect your site.

![The image illustrates the concept of blocking traffic, showing how IPs, bots, and network traffic are prevented from accessing a website or service.](https://kodekloud.com/kk-media/image/upload/v1752882445/notes-assets/images/Nginx-For-Beginners-Blocking-Traffic/blocking-traffic-ip-bots-diagram.jpg)

---

## Restricting Access by IP in Nginx

Nginx’s HTTP Access module uses two directives—`allow` and `deny`—to control client access at the server or location level.

| Directive | Description                              | Example                 |
| --------- | ---------------------------------------- | ----------------------- |
| allow     | Grants access to a specific IP or subnet | `allow 192.168.1.0/24;` |
| deny      | Blocks access from an IP or subnet       | `deny 203.0.113.0/24;`  |

> [!important]
> **CIDR Basics**
>
> CIDR notation (`/32` for a single IPv4, `/24` for 256 addresses) lets you include entire IP ranges in one rule.

### Example: Allow Only Two IPs, Block Everything Else

```
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html;


    # Permit two individual IPs
    allow 192.168.1.100/32;
    allow 174.0.252.8/32;
    deny all;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

- `/32` mask = single IPv4 address
- `deny all;` blocks every other client

### Example: Deny a Subnet Globally, Allow a Subnet to /admin

```
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html;


    # Block the entire 203.0.113.0/24 network site-wide
    deny 203.0.113.0/24;


    location /admin {
        # Only allow 174.0.252.0/24 to access /admin
        allow 174.0.252.0/24;
        deny all;
        try_files $uri $uri/ =404;
    }
}
```

---

## Why Manual IP Blocking Falls Short

Maintaining long lists of `deny` rules is error-prone—attackers simply switch IPs. For automated protection, consider using [Fail2Ban](https://www.fail2ban.org/).

> [!important]
> **Warning**
>
> Never rely on static IP denylists alone; automated tools help you stay ahead of rotating attackers.

![The image is a logo for "Fail2Ban," featuring a house with a stop hand sign, and a description stating it enhances server security by blocking malicious IPs, especially against brute-force attacks.](https://kodekloud.com/kk-media/image/upload/v1752882446/notes-assets/images/Nginx-For-Beginners-Blocking-Traffic/fail2ban-logo-server-security.jpg)

Fail2Ban monitors logs for repeated failures or suspicious patterns, then automatically bans the offending IP for a configurable duration.

```
$ sudo tail -f /var/log/fail2ban.log
2024-08-10 19:26:27,469 fail2ban.jail   [7786]: INFO    Creating new jail 'ssh'
2024-08-10 19:26:27,473 fail2ban.filter [7786]: INFO    maxRetry: 2
...
2024-08-10 19:27:40,771 fail2ban.actions: NOTICE  [ssh] Ban 192.168.8.131
```

### Installing Fail2Ban

On Ubuntu/Debian:

```
sudo apt update
sudo apt install fail2ban
```

On Red Hat/CentOS:

```
sudo yum install fail2ban
```

### Configuring Jails

Copy the default `jail.conf` to `jail.local` and enable only the jails you need:

```
cd /etc/fail2ban
sudo cp jail.conf jail.local
sudo vim jail.local
```

#### Protecting Nginx HTTP Authentication

```
[nginx-http-auth]
enabled  = true
port     = http,https
filter   = nginx-http-auth
logpath  = /var/log/nginx/access.log
maxretry = 3
findtime = 600
bantime  = 600
```

#### Blocking Bad Bots

```
[nginx-badbots]
enabled  = true
port     = http,https
filter   = nginx-badbots
logpath  = /var/log/nginx/access.log
maxretry = 1
bantime  = 48h
```

#### Rate Limiting Excessive Requests

```
[nginx-limit-req]
enabled  = true
port     = http,https
filter   = nginx-limit-req
logpath  = /var/log/nginx/access.log
maxretry = 10
findtime = 3600
bantime  = 24h
```

### Built-in Filters

Filters are stored in `/etc/fail2ban/filter.d`. Common patterns include Nginx, SSH, and more:

```
$ ls -l /etc/fail2ban/filter.d
-rw-r--r-- 1 root root  474 Nov  9 2022 nginx-bad-request.conf
-rw-r--r-- 1 root root  740 Nov  9 2022 nginx-botsearch.conf
-rw-r--r-- 1 root root 1048 Nov  9 2022 nginx-http-auth.conf
-rw-r--r-- 1 root root 1513 Nov  9 2022 nginx-limit-req.conf
```

To customize, edit or add new `.conf` files under this directory.

### Checking Status and Unbanning

View a jail’s status:

```
sudo fail2ban-client status nginx-http-auth
```

Sample output:

```
Status for the jail: nginx-http-auth
|- Filter
|  |- Currently failed: 0
|  |- Total failed: 3
|  `- File list: /var/log/nginx/access.log
`- Actions
   |- Currently banned: 1
   `- Banned IP list: 108.172.85.62
```

Unban an IP if needed:

```
sudo fail2ban-client set nginx-http-auth unbanip 108.172.85.62
```

Fail2Ban operates independently of Nginx or SSH, so there’s no need to restart those services after making changes.

---

These techniques—IP-based restrictions in Nginx and automated bans with Fail2Ban—can significantly reduce brute-force and bot-driven attacks. In containerized platforms like [Kubernetes](https://kubernetes.io/), you may need different integrations, but the core ideas carry over to any host-based environment.

## Links and References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Fail2Ban Official Site](https://www.fail2ban.org/)
- [CIDR Cheatsheet](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/8905470e-b1ea-48ec-b0cd-711687ce7159/lesson/328c0054-1639-4d6d-aeda-f1255e8ebaa0)**
>
> Watch video content
