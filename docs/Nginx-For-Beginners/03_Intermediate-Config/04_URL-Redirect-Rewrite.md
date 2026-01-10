# URL Redirect Rewrite - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/URL-Redirect-Rewrite)

---

## Table of Contents

- URL Redirect Rewrite
  - Table of Contents
  - Why Redirect vs Rewrite?
  - 1. Redirecting with return
  - 2. Common HTTP Status Codes
  - 3. Transforming URLs with rewrite
  - Links and References
  - Watch Video
    - 1.1. Entire Domain Redirect
    - 1.2. HTTP → HTTPS Redirect
    - 1.3. Single-Page Redirect
    - 3.1. Simple Rewrite Example
    - 3.2. Rewriting Directory Paths
    - 3.3. Regex Cheat Sheet

---

## Content

Nginx For Beginners

Intermediate Config

# URL Redirect Rewrite

In this guide, you’ll learn how to use Nginx’s `return` (redirect) and `rewrite` directives to forward requests, enforce HTTPS, and transform URLs on the fly. Whether you’re migrating a domain, cleaning up paths, or preserving legacy links, these patterns will help you maintain SEO value and user experience.

## Table of Contents

- [Why Redirect vs Rewrite?](#why-redirect-vs-rewrite)
- [1\. Redirecting with `return`](#1-redirecting-with-return)
  - [1.1. Entire Domain Redirect](#11-entire-domain-redirect)
  - [1.2. HTTP → HTTPS Redirect](#12-http--https-redirect)
  - [1.3. Single-Page Redirect](#13-single-page-redirect)
- [2\. Common HTTP Status Codes](#2-common-http-status-codes)
- [3\. Transforming URLs with `rewrite`](#3-transforming-urls-with-rewrite)
  - [3.1. Simple Rewrite Example](#31-simple-rewrite-example)
  - [3.2. Rewriting Directory Paths](#32-rewriting-directory-paths)
  - [3.3. Regex Cheat Sheet](#33-regex-cheat-sheet)
- [Links and References](#links-and-references)

---

## Why Redirect vs Rewrite?

- **Redirect (`return`)** issues an HTTP status code (e.g., 301) back to the client and changes what appears in their browser’s address bar.
- **Rewrite** silently alters the URI before Nginx processes it, keeping the user’s URL intact.

Use redirects when you want search engines and clients to update bookmarks. Use rewrites to preserve a clean URL structure without exposing internal file paths.

---

## 1\. Redirecting with `return`

### 1.1. Entire Domain Redirect

To forward every request from one domain to another:

![The image illustrates a domain redirection from "honda.cars.com" to "cars.honda.com" using Nginx.](https://kodekloud.com/kk-media/image/upload/v1752882335/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/domain-redirection-nginx-honda-cars.jpg)

```
server {
    listen       80;
    server_name  honda.cars.com;


    return 301 https://cars.honda.com$request_uri;


    root  /var/www/example.com/html;
    index index.html;


    location / {
        try_files $uri $uri/ =404;
    }
}
```

![The image is a flowchart illustrating the process of redirecting a request from "honda.cars.com" to new domains using NGINX and decision-making steps.](https://kodekloud.com/kk-media/image/upload/v1752882337/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/nginx-request-redirect-flowchart.jpg)

> [!important]
> **Note**
>
> Use `301` for permanent redirects to transfer SEO equity. For temporary redirects, replace `301` with `302`.

### 1.2. HTTP → HTTPS Redirect

Force all HTTP traffic to HTTPS:

```
server {
    listen       80;
    server_name  honda.cars.com;


    return 301 https://$host$request_uri;
}


server {
    listen       443 ssl;
    server_name  honda.cars.com;


    ssl_certificate     /etc/ssl/certs/honda.cars.com.pem;
    ssl_certificate_key /etc/ssl/certs/honda.cars.com-key.pem;


    root  /var/www/;
}
```

Here, `$host` becomes the requested domain name, and `$request_uri` includes the full path and query string.

![The image illustrates the concept of `$request_uri`, showing how it includes the full URL with arguments, using an example URL transformation.](https://kodekloud.com/kk-media/image/upload/v1752882337/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/request-uri-url-illustration.jpg)

### 1.3. Single-Page Redirect

For path-specific forwarding, wrap only that URI:

```
server {
    listen       80;
    server_name  honda.cars.com;


    root  /var/www/example.com/html;
    index index.html;


    location /civic-type-r {
        return 301 https://cars.honda.com$request_uri;
    }
}
```

---

## 2\. Common HTTP Status Codes

Inspect redirects and responses in your browser’s DevTools (Network tab):

![The image shows a browser window with Google open and the developer tools' network tab displayed, listing various network requests.](https://kodekloud.com/kk-media/image/upload/v1752882339/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/google-browser-developer-tools-network.jpg)

| Status Code | Meaning                    |
| ----------- | -------------------------- |
| 200         | OK                         |
| 301         | Moved Permanently          |
| 302         | Found (Temporary Redirect) |
| 400         | Bad Request                |
| 401         | Unauthorized               |
| 403         | Forbidden                  |
| 404         | Not Found                  |
| 500         | Internal Server Error      |
| 502         | Bad Gateway                |
| 503         | Service Unavailable        |

![The image lists various HTTP status codes with brief explanations, such as "200 - Everything is good!" and "404 - Not Found."](https://kodekloud.com/kk-media/image/upload/v1752882340/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/http-status-codes-explanations.jpg)

---

## 3\. Transforming URLs with `rewrite`

Rewrites let you modify incoming URLs before Nginx searches for files or forwards to upstream servers—ideal for cleanup rules or legacy support.

![The image shows a computer screen displaying an address update form with an old address and a new address, along with an "Update" button.](https://kodekloud.com/kk-media/image/upload/v1752882341/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/address-update-form-computer-screen.jpg)

Use rewrites to convert long URIs into friendly, concise paths:

![The image shows a comparison of two URLs, with the left one being longer and the right one being a simplified version. The text "Rewrite URL" is displayed above them.](https://kodekloud.com/kk-media/image/upload/v1752882341/notes-assets/images/Nginx-For-Beginners-URL-Redirect-Rewrite/rewrite-url-comparison-diagram.jpg)

### 3.1. Simple Rewrite Example

Map `/sports-car-civic-type-r` → `/type-r`:

```
server {
    listen       80;
    server_name  honda.cars.com;


    root  /var/www/example.com/html;
    index index.html;


    rewrite ^/sports-car-civic-type-r$ /type-r permanent;
}
```

### 3.2. Rewriting Directory Paths

When you rename a folder from `/pics` → `/images`, keep existing links functional:

```
# Before rename
$ tree
|-- 50x.html
|-- index.html
`-- pics
    |-- accord.jpg
    |-- civic.jpg
    `-- type-r.jpg


# After rename
$ tree
|-- 50x.html
|-- index.html
|-- images
|   |-- accord.jpg
|   |-- civic.jpg
|   `-- type-r.jpg
`-- pics
    |-- accord.jpg
    |-- civic.jpg
    `-- type-r.jpg
```

```
server {
    listen       80;
    server_name  honda.cars.com;


    root  /var/www/example.com/html;
    index index.html;


    location /pics {
        rewrite ^/pics/(.*)$ /images/$1 permanent;
    }
}
```

Visitors requesting `/pics/type-r.jpg` will be served `/images/type-r.jpg` without broken links.

> [!important]
> **Warning**
>
> Misconfigured regex or overlapping `rewrite` rules can cause redirect loops. Test your configuration with `nginx -t` and in a staging environment first.

### 3.3. Regex Cheat Sheet

| Symbol | Description                         | Example                  |
| ------ | ----------------------------------- | ------------------------ |
| ^      | Start of string                     | `^/old` matches `/old`   |
| $      | End of string                       | `/page$` matches `/page` |
| .      | Any single character                | `a.b` matches `acb`      |
| \\\*   | Zero or more of the preceding token | `.*` captures anything   |
| \\[\\] | Character class                     | `[a-z]`                  |
| ()     | Capture group                       | `(.*)`                   |

For interactive testing, try [regex101](https://regex101.com).

---

## Links and References

- [Nginx Official Documentation](https://nginx.org/en/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/55d731cf-41af-43c3-81f3-469afda88435)**
>
> Watch video content
