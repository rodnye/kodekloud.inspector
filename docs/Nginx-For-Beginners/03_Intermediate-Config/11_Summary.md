# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Intermediate-Config/Summary)

---

## Table of Contents

- Summary
  - Links and References
  - Watch Video

---

## Content

Nginx For Beginners

Intermediate Config

# Summary

In this lesson, we explored core NGINX features for hosting, securing, and optimizing web applications.

- **Server Blocks**  
  Host multiple domains or subdomains on a single NGINX instance by configuring the `server_name` directive. This enables you to serve different content based on the Host header without extra IP addresses.
- **HTTP → HTTPS Redirection**  
  Enforce secure connections by redirecting all incoming HTTP traffic to HTTPS using the `return 301` directive.

  > [!important]
  > **Warning**
  >
  > Always verify that your SSL certificates are correctly installed to avoid redirect loops.

- **Rewrite Rules**  
  Transform and redirect request URIs with powerful regular expressions via the `rewrite` directive. Use this to maintain clean URLs, handle legacy paths, or implement SEO-friendly structures.

  > [!important]
  > **Note**
  >
  > Test complex regex patterns with tools like [regex101.com](https://regex101.com/) before deploying to production.

- **Upstream Blocks**  
  Define a named pool of backend servers for reverse proxying or load balancing. Upstreams simplify maintenance by centralizing backend definitions.
- **Load-Balancing Algorithms**  
  Distribute client requests across multiple backends to improve availability and performance.

  | Algorithm            | Description                                                    |
  | -------------------- | -------------------------------------------------------------- |
  | Round Robin          | Distributes requests evenly in sequence.                       |
  | Weighted Round Robin | Assigns more requests to servers with a higher `weight` value. |
  | IP Hash              | Routes clients to the same backend based on their IP address.  |

- **Reverse Proxy**  
  Forward client requests to application servers (e.g., React, Flask) running on different ports or hosts. This setup abstracts your backend architecture and improves security.
- **Reverse Proxy vs. Load Balancer**
  - A **reverse proxy** can operate with a single backend server for caching, SSL termination, or request routing.
  - A **load balancer** requires two or more backends to distribute traffic and provide failover.

- **Caching**  
  Configure NGINX’s `proxy_cache` directives to store upstream responses locally, reducing latency and lowering backend load.

  > [!important]
  > **Note**
  >
  > Use cache keys that include URI, headers, or query strings to avoid serving stale or incorrect content.

---

## Links and References

- [NGINX Server Blocks](https://nginx.org/en/docs/http/server_names.html)
- [NGINX Rewrite Module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html)
- [NGINX Upstream Module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)
- [NGINX Caching Guide](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/c78ff9cb-c15d-4f85-92fc-abee5ed98b20/lesson/924e21e1-b2e9-4b6d-b35e-8b1f6ed56a62)**
>
> Watch video content
