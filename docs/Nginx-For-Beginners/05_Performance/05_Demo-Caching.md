# Demo Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Demo-Caching)

---

## Table of Contents

- Demo Caching
  - 1. No-Cache Reverse Proxy
  - 2. Caching Enabled
  - 3. Baseline: Watching Apache Logs
  - 4. Inflate Asset Sizes for Demo
  - 5. Configure Nginx Caching
  - 6. Log Cache Status in Apache
  - 7. Verify Cache Directory and Hits
  - 8. Browser Network View
  - Next Steps
  - Watch Video
  - Practice Lab
    - 5.1. Global Cache Settings
    - 5.2. Server Block: Enable Cache

---

## Content

Nginx For Beginners

Performance

# Demo Caching

In this lesson, you’ll compare Nginx acting as a reverse proxy **without** caching and **with** caching to see how offloading static assets can improve backend performance.

## 1\. No-Cache Reverse Proxy

When caching is disabled, every client request passes through Nginx directly to Apache. Assets like CSS, JavaScript, and images are fetched from the backend on each hit.

![The image is a diagram showing a network flow from users to web servers through a network cloud and an NGINX reverse proxy with no-cache.](https://kodekloud.com/kk-media/image/upload/v1752882391/notes-assets/images/Nginx-For-Beginners-Demo-Caching/network-flow-users-web-servers-nginx.jpg)

## 2\. Caching Enabled

With `proxy_cache` enabled, Nginx stores the first response and serves it on subsequent requests. The Apache servers only handle the initial fetch.

![The image illustrates a network architecture with users connecting through a network cloud to an NGINX reverse proxy cache, which then routes requests to Apache web servers.](https://kodekloud.com/kk-media/image/upload/v1752882392/notes-assets/images/Nginx-For-Beginners-Demo-Caching/network-architecture-nginx-apache.jpg)

---

## 3\. Baseline: Watching Apache Logs

First, observe raw traffic on your backend nodes:

```
# On node01
tail -f /var/log/apache2/access.log
# On node02
tail -f /var/log/apache2/access.log
```

Reload `https://example.com` in your browser. You’ll see repeated GETs:

```
example.com:443 127.0.0.1 - - [17/Feb/2025:01:01:34 +0000] "GET / HTTP/1.1" 200 11213 "-" "curl/7.81.0"
example.com:443 192.231.221.10 - - [17/Feb/2025:01:20:34 +0000] "GET /assets/css/main.css HTTP/1.0" 200 10649 ...
```

![The image shows a terminal window displaying server log entries, detailing HTTP requests with timestamps, IP addresses, and user-agent information.](https://kodekloud.com/kk-media/image/upload/v1752882394/notes-assets/images/Nginx-For-Beginners-Demo-Caching/server-log-http-requests-terminal.jpg)

Inspect DevTools → Network and notice **no** `Cache-Control` headers are present.

---

## 4\. Inflate Asset Sizes for Demo

To highlight caching benefits, increase each JPEG to about 20 MB on both nodes:

```
# On node01 and node02, in /var/www/html/images
for file in *.jpg; do
  fallocate -l 20M "$file"
done
```

Verify sizes:

```
ls -lh *.jpg
# pic01.jpg  21M  pic02.jpg 21M  ...
```

Now reload the site and watch logs—each large asset streams from Apache:

```
"GET /images/pic06.jpg HTTP/1.0" 200 21047957 "..." "Mozilla/5.0..."
```

> [!important]
> **Warning**
>
> Creating large files can consume significant disk space. Clean up after testing.

---

## 5\. Configure Nginx Caching

### 5.1. Global Cache Settings

Edit `/etc/nginx/nginx.conf` and, inside the `http { ... }` block, add:

```
##
# Caching
##
proxy_cache_path /var/lib/nginx/cache levels=1:2 keys_zone=app_cache:10m;
proxy_cache_key   "$scheme$request_method$host$request_uri";
proxy_cache_valid 200 302 10m;
proxy_cache_valid 404      1m;
```

> [!important]
> **Note**
>
> Ensure `/var/lib/nginx/cache` exists and is writable by the Nginx user.

For more details, see the [Nginx Proxy Caching Guide](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache).

Here’s a quick overview of the directives:

| Directive               | Description                                  | Example                                                    |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| proxy\\\_cache\\\_path  | Defines cache location, hierarchy, and zone  | `/var/lib/nginx/cache levels=1:2 keys_zone=app_cache:10m;` |
| proxy\\\_cache\\\_key   | Constructs a unique key for each request     | `"$scheme$request_method$host$request_uri"`                |
| proxy\\\_cache\\\_valid | Sets TTL for cached responses by status code | `200 302 10m; 404 1m;`                                     |

### 5.2. Server Block: Enable Cache

Open your SSL virtual host (`/etc/nginx/sites-available/example-https`) and under `server { listen 443 ssl; ... }`, update the `location /` block:

```
# Add cache-control header for clients
add_header Cache-Control "public, max-age=3600";


location / {
    proxy_set_header Host              $host;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Proxy-Cache     $upstream_cache_status;


    proxy_cache     app_cache;
    proxy_pass      https://example;
}
```

Test and reload:

```
nginx -t && nginx -s reload
```

---

## 6\. Log Cache Status in Apache

To capture `HIT` or `MISS`, add `%{X-Proxy-Cache}i` to your Apache log format in `/etc/apache2/apache2.conf`:

```
LogFormat "%v:%p \"%{X-Forwarded-For}i\" \"%{X-Forwarded-Proto}i\" \"%{X-Proxy-Cache}i\" %h %l %u %t \"%r\" %>s %b \"%{Referer}i\"" vhost_combined
```

Reload Apache:

```
apachectl -t && systemctl restart apache2
```

---

## 7\. Verify Cache Directory and Hits

Initially, the cache directory is empty:

```
ll /var/lib/nginx/cache
# only ./ and ../
```

Load the site once. Then check again:

```
ll /var/lib/nginx/cache
# subdirectories under the hex levels, each storing cached files
```

Tail Apache logs to see initial `MISS` entries:

```
example.com:443 "..." "MISS" 192.231.221.4 -- [17/Feb/2025:01:35:09 +0000] "GET /images/pic01.jpg HTTP/1.0" 200 21049497 ...
```

Subsequent requests don’t hit Apache, confirming Nginx serves from cache.

![The image shows a terminal window displaying a series of HTTP GET requests with details such as timestamps, URLs, and user-agent strings.](https://kodekloud.com/kk-media/image/upload/v1752882396/notes-assets/images/Nginx-For-Beginners-Demo-Caching/http-get-requests-terminal-window.jpg)

You can also watch Nginx’s access log for `206` partial responses:

```
tail -f /var/log/nginx/access.log
# 206 partial responses served by cache
192.231.221.4 - - [17/Feb/2025:01:38:22 +0000] "GET /images/pic12.jpg HTTP/1.1" 206 2097136 "-" "Cloud-CDN-Google (GFE/2.0)"
```

---

## 8\. Browser Network View

Finally, use your browser’s Network panel to verify that large assets load instantly from cache:

![The image shows a web browser displaying a webpage with a responsive site template called "Phantom" by HTML5 UP on the left, and the browser's network activity panel on the right, listing various resources loaded by the page.](https://kodekloud.com/kk-media/image/upload/v1752882397/notes-assets/images/Nginx-For-Beginners-Demo-Caching/phantom-responsive-template-browser-network.jpg)

---

## Next Steps

This demo underscored how caching reduces backend load. For even better performance, consider enabling response compression with `gzip` or `brotli` next.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/42757c8a-6e6c-48c7-b89e-a4ada8791ad9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/1559660d-8686-4508-8474-33f2e7fbfdd4)**
>
> Practice lab
