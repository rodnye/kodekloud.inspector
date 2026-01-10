# Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Caching)

---

## Table of Contents

- Caching
  - Core Proxy Cache Configuration
  - Verifying Cache Behavior
  - Further Reading
  - Watch Video
    - proxy_cache_path
    - proxy_cache_key
    - proxy_cache_valid
    - Optional: Bypassing the Cache

---

## Content

Nginx For Beginners

Performance

# Caching

Caching helps you serve repeated requests faster by storing frequently accessed content closer to the client. Think of it like ordering the same coffee and cookie every morning: at first, the barista prepares your order on demand, but over time they have it ready before you even ask. Similarly, Nginx can remember—and quickly deliver—static or dynamic resources without hitting your backend every time.

![The image illustrates a server caching system, showing how a server stores and provides quick access to information like images, video files, style sheets, and HTML pages.](https://kodekloud.com/kk-media/image/upload/v1752882367/notes-assets/images/Nginx-For-Beginners-Caching/server-caching-system-diagram.jpg)

When a user revisits a website, cached assets are served directly, reducing backend load and improving response times.

![The image illustrates a process where a user revisits a website, and the saved version is retrieved from a server, resulting in time savings.](https://kodekloud.com/kk-media/image/upload/v1752882368/notes-assets/images/Nginx-For-Beginners-Caching/website-revisit-time-savings.jpg)

Nginx can act as both a reverse proxy and a cache server. It sits in front of your application, intercepting requests and serving cached responses whenever possible.

![The image illustrates an Nginx caching server setup, showing a backend server, a cache server with various file types, and a user accessing content on a laptop.](https://kodekloud.com/kk-media/image/upload/v1752882369/notes-assets/images/Nginx-For-Beginners-Caching/nginx-caching-server-setup-diagram.jpg)

## Core Proxy Cache Configuration

Below is a minimal `nginx.conf` snippet illustrating the main caching directives:

```
http {
    proxy_cache_path /var/lib/nginx/cache
                     levels=1:2
                     keys_zone=app_cache:8m
                     max_size=50m;


    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_cache_valid 200 302 10m;
    proxy_cache_valid 404 1m;
}


server {
    listen      80;
    server_name example.com www.example.com;


    location / {
        proxy_cache       app_cache;
        add_header        X-Proxy-Cache $upstream_cache_status;
        proxy_pass        http://backend;
    }
}
```

### proxy_cache_path

Defines where and how cache files are stored:

| Parameter                | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `/var/lib/nginx/cache`   | Filesystem path for cached data (ensure correct permissions).               |
| `levels=1:2`             | Two-level directory structure to avoid too many files per folder.           |
| `keys_zone=app_cache:8m` | Shared memory zone `app_cache` using 8 MB for cache keys and metadata.      |
| `max_size=50m`           | Optional limit; older entries are removed when the cache exceeds this size. |

> [!important]
> **Note**
>
> Verify that the Nginx user has read/write access to your cache directory (`/var/lib/nginx/cache` by default).

### proxy_cache_key

By default, Nginx uses the full request URL as the cache key. You can customize it to include protocol, HTTP method, host, and URI for better uniqueness:

```
proxy_cache_key "$scheme$request_method$host$request_uri";
```

![The image illustrates the process of handling a request in NGINX using a proxy cache key to access cached data, including HTML, JavaScript, CSS, and GIF files.](https://kodekloud.com/kk-media/image/upload/v1752882370/notes-assets/images/Nginx-For-Beginners-Caching/nginx-request-handling-proxy-cache.jpg)

### proxy_cache_valid

Control how long different response codes are kept in cache:

```
proxy_cache_valid 200 302 10m;  # Cache successful and redirects for 10 minutes
proxy_cache_valid 404 1m;       # Cache not-found responses for 1 minute
```

### Optional: Bypassing the Cache

For certain dynamic routes or when clients send cache-control headers, you may want to skip cache lookup:

```
location /api/ {
    proxy_cache        app_cache;
    proxy_cache_bypass $http_cache_control;
    add_header         X-Proxy-Cache $upstream_cache_status;
    proxy_pass         http://backend;
}
```

> [!important]
> **Warning**
>
> Overusing `proxy_cache_bypass` will reduce cache effectiveness and increase load on your backend. Use it only when necessary.

## Verifying Cache Behavior

Inspect the `X-Proxy-Cache` header in your HTTP response to determine whether content was served from cache:

```
X-Proxy-Cache: HIT   # Served from cache
X-Proxy-Cache: MISS  # Fetched from backend
```

Example response headers:

```
Accept-Ranges:    bytes
Age:              10
Cache-Control:    s-maxage=60
Content-Encoding: gzip
Content-Length:   103408
Content-Type:     text/html; charset=iso-8859-15
Date:             Fri, 24 Jan 2025 17:25:21 GMT
Vary:             Accept-Encoding, User-Agent
X-Backend:        CONTENT
X-Proxy-Cache:    HIT
X-Cache-Hits:     1, 1
X-Served-By:      cache-ams21071-AMS
X-Timer:          S17337739521.335220,VS0,VE2
```

![The image shows a list of HTTP response headers with various details such as content type, cache control, and date. It is titled "Confirmation" and includes a copyright notice from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752882371/notes-assets/images/Nginx-For-Beginners-Caching/http-response-headers-confirmation.jpg)

Use browser developer tools or your server logs to monitor cache hits and misses. A `HIT` indicates a cached response, while a `MISS` shows that Nginx forwarded the request upstream.

---

## Further Reading

- [Nginx Proxy Caching](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/08d27eea-6435-4900-972f-8ace51a21922)**
>
> Watch video content
