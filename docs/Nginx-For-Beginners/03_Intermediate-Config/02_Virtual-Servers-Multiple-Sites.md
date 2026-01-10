# Virtual Servers Multiple Sites - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Virtual-Servers-Multiple-Sites)

---

## Table of Contents

- Virtual Servers Multiple Sites
  - How Nginx Virtual Servers Work
  - Configuring a Basic Virtual Host
  - Binding to an IP Address
  - Serving on a Non-Standard Port
  - Managing Multiple Server Blocks
  - Links and References
  - Watch Video
    - Quick Reference: Nginx Directives

---

## Content

Nginx For Beginners

Intermediate Config

# Virtual Servers Multiple Sites

In this guide, you’ll learn how to host multiple websites on a single Nginx server using **virtual servers** (also known as _server blocks_ or _virtual hosts_). Imagine your server as a building and each site as an apartment. Visitors arrive at the building address (your server IP/port) and Nginx routes them to the correct apartment (server block) based on the domain name in the `Host` header.

By consolidating sites on one machine, you reduce infrastructure costs and simplify management—just one SSH session to maintain all your domains.

## How Nginx Virtual Servers Work

When a request arrives, Nginx inspects the `Host` header (e.g., `example.com`, `mail.example.com`) and matches it against configured server blocks:

1.  Nginx listens on a port (80 or 443 by default).
2.  It checks the `Host` header.
3.  It routes the request to the server block with the matching `server_name`.

Whether you’re serving a blog, mail client, or map application, each domain or subdomain points to its own configuration within the same Nginx instance.

Learn more in the [Nginx server block documentation](https://nginx.org/en/docs/http/server_names.html).

## Configuring a Basic Virtual Host

Here’s a minimal example for `example.com`:

```
server {
    listen       80;
    server_name  example.com www.example.com;


    root   /var/www/example.com/html;
    index  index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Key directives:

- `listen 80;`  
  Binds this block to port 80 (HTTP).
- `server_name`  
  Lists domains and subdomains handled here.
- `root`  
  Points to the document root where your site files live.
- `index`  
  Specifies the default file to serve.
- `location /`  
  Tries to serve the requested URI or returns `404` if not found.

## Binding to an IP Address

You can serve content directly from an IP address instead of a domain:

```
server {
    listen       80;
    server_name  172.217.22.14;


    root   /var/www/172.217.22.14/html;
    index  index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

This approach is useful for internal test servers or when DNS is not available.

## Serving on a Non-Standard Port

If your application runs on a different port (e.g., Jenkins on 8080), you can expose it:

```
server {
    listen       8080;
    server_name  wiki.example.com;


    root   /var/www/wiki.example.com/html;
    index  index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

Users must browse to `http://wiki.example.com:8080`.

> [!important]
> **Note**
>
> For production, it’s best to configure a reverse proxy on ports 80/443 and forward traffic internally to port 8080. This avoids requiring users to specify `:8080` in the URL.

## Managing Multiple Server Blocks

You can place several server blocks in one file, but for maintainability, isolate each site into its own configuration:

```
server {
    listen       80;
    server_name  honda.cars.com;


    root   /var/www/honda.cars.com/html;
    index  index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}


server {
    listen       80;
    server_name  toyota.cars.com;


    root   /var/www/toyota.cars.com/html;
    index  index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

> [!important]
> **Warning**
>
> Keep each site’s configuration in its own file (e.g., `/etc/nginx/sites-available/honda.cars.com` and symlink to `/etc/nginx/sites-enabled/`). A typo in one file won’t take down all your sites when you reload Nginx.

### Quick Reference: Nginx Directives

| Directive      | Purpose                         | Example                                    |
| -------------- | ------------------------------- | ------------------------------------------ |
| listen         | Port for incoming connections   | `listen 80;`                               |
| server\\\_name | Domain(s) served by this block  | `server_name example.com www.example.com;` |
| root           | Path to website files           | `root /var/www/example.com/html;`          |
| index          | Default file to serve           | `index index.html;`                        |
| location /     | URI handling and fallback rules | `try_files $uri $uri/ =404;`               |

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [DigitalOcean: How To Set Up Nginx Server Blocks](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-20-04)
- [Stack Overflow: Common Nginx Virtual Host Issues](https://stackoverflow.com/questions/tagged/nginx)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/a594bfb1-dc4e-48a4-9e78-011dc56c0ef8)**
>
> Watch video content
