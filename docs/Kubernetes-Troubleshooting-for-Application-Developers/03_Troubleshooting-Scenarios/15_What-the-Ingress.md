# What the Ingress - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/What-the-Ingress)

---

## Table of Contents

- What the Ingress
  - Examining the Kubernetes Environment
  - Ingress Configuration Overview
  - Verifying Ingress Behavior
  - Diagnosing the Issue with Port-Forwarding
  - Implementing the Rewrite Target
  - Reviewing the Generated Nginx Configuration
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# What the Ingress

In this lesson, we troubleshoot a sample application that exposes web services through an Ingress. The application consists of three pods—Kanye, Techie, and Useless—each paired with its corresponding service. These services deliver distinct types of quotes: Kanye quotes, tech-related quotes, and random humorous quotes.

## Examining the Kubernetes Environment

Below is an example of our Kubernetes environment displaying the available pods:

```
Context: kubernetes-admin@kubernetes
Cluster: kubernetes
User: kubernetes-admin
K9s Rev: v0.32.5
K8s Rev: v1.30.0
CPU: n/a
MEM: n/a


Pods(default)[3]
NAME     PF   READY  STATUS   RESTARTS  IP             NODE    AGE
kanye    ●    1/1    Running  0         10.244.192.2  node01  4m27s
techy    ●    1/1    Running  0         10.244.192.1  node01  4m27s
useless  ●    1/1    Running  0         10.244.192.3  node01  4m27s
```

![The image shows a terminal interface displaying Kubernetes services with details like name, type, cluster IP, ports, and age. The interface includes commands and shortcuts for managing the services.](https://kodekloud.com/kk-media/image/upload/v1752880446/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-What-the-Ingress/kubernetes-services-terminal-interface.jpg)

All services are hosted behind an Ingress controller. The Ingress resource routes incoming requests based on the URL path. For instance, requests to `/techy` are directed to the Techie service—similarly for the Kanye and Useless services. This configuration utilizes the Nginx Ingress Controller.

## Ingress Configuration Overview

The following excerpt illustrates the Ingress configuration that implements load balancing and reverse proxying behavior:

```
service:
  name: techy-service
  port:
    number: 80
  path: /techy
  pathType: Prefix
- backend:
    service:
      name: kanye-service
      port:
        number: 80
      path: /kanye
      pathType: Prefix
- backend:
    service:
      name: useless-service
      port:
        number: 80
      path: /useless
      pathType: Prefix
status:
  loadBalancer:
    ingress:
      - ip: 10.109.243.168
```

This setup directs HTTP requests to their respective backend services based on the request path.

## Verifying Ingress Behavior

First, retrieve the Ingress IP address with:

```
controlplane ~ ➜ k get ingress
NAME         CLASS     HOSTS   ADDRESS       PORTS   AGE
app-ingress  <none>    *       10.109.243.168  80      5m36s
```

Curling the Ingress IP without specifying a path returns an HTML 404 error accompanied by an image:

```
controlplane ~ ➜ curl 10.109.243.168
<!doctype html>
<title>Hello from Flask</title>
<body style="background: #3e169d;">
<div style="color: #e4e4e4;
    text-align: center;
    height: 90px;
    vertical-align: middle;">
<img src="https://res.cloudinary.com/cloudusthad/image/upload/v1547053817/error_404.png">
</div>
</body>
</html>
```

When using a specific service path (e.g., `/techy`), the response is:

```
controlplane ~ ➜ curl 10.109.243.168/techy
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /techy</pre>
</body>
</html>
```

Using verbose curl output confirms the 404 status:

```
bash
curl -v 10.109.243.168/techy
*   Trying 10.109.243.168:80...
* Connected to 10.109.243.168 (10.109.243.168) port 80 (#0)
> GET /techy HTTP/1.1
> Host: 10.109.243.168
> User-Agent: curl/7.81.0
> Accept: */*
* Mark bundle as not supporting multiuse
< HTTP/1.1 404 Not Found
< Date: Sat, 13 Jul 2024 23:51:47 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 144
< Connection: keep-alive
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
<
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /techy</pre>
</body>
</html>
* Connection #0 to host 10.109.243.168 left intact
```

Similarly, requests to `/kanye` yield a 404 error:

```
bash
controlplane ~ ➜ curl -v 10.109.243.168/kanye
*   Trying 10.109.243.168:80...
* Connected to 10.109.243.168 (10.109.243.168) port 80 (#0)
> GET /kanye HTTP/1.1
> Host: 10.109.243.168
> User-Agent: curl/7.81.0
> Accept: */*
* Mark bundle as not supporting multiuse
< HTTP/1.1 404 Not Found
< Date: Sat, 13 Jul 2024 23:52:08 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 144
< Connection: keep-alive
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
<
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /kanye</pre>
</body>
</html>
* Connection #0 to host 10.109.243.168 left intact
```

> [!important]
> **Note**
>
> The Ingress Controller logs indicate that the requests are reaching the controller, but the backend services return a 404 because they are not configured to handle the prefixed path.

## Diagnosing the Issue with Port-Forwarding

To isolate the problem, we use `kubectl port-forward` to bypass the Ingress and directly access the Techie service:

```
# Forward a local port (4444) to the techy-service on port 80 (mapped internally to 3000)
controlplane ~ ➜ k port-forward svc/techy-service 4444:80


# In another terminal, test the service with curl:
curl -v localhost:4444
```

The direct request returns a valid Techie quote:

```
bash
controlplane ~ ➜ curl localhost:4444
All you have to do is hash the capacity adapter
controlplane ~ ➜
```

This confirms that the application is functioning as expected and that the issue lies in the path handling between the Ingress and the backend services. When the Ingress passes the original path (e.g., `/kanye`), the backend applications do not recognize the prefix, resulting in a 404 response.

## Implementing the Rewrite Target

The solution involves using the Nginx Ingress Controller's Rewrite Target annotation. This annotation modifies the URL path before it reaches your backend service. In other words, it strips the service-specific prefix so that the service receives requests on its root path.

Refer to the [Nginx Ingress Controller documentation on rewrite annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) for additional details.

![The image shows a webpage from the Ingress-Nginx Controller documentation, specifically focusing on rewrite annotations. It includes sections on prerequisites and deployment, with a table listing annotation names, descriptions, and values.](https://kodekloud.com/kk-media/image/upload/v1752880448/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-What-the-Ingress/ingress-nginx-rewrite-annotations-docs.jpg)

A common pattern uses a capture group in a regular expression to pass only the desired part of the path to the backend. Consider this example configuration:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: rewrite
  namespace: default
spec:
  ingressClassName: nginx
  rules:
  - host: rewrite.bar.com
    http:
      paths:
      - path: /something(/|$)(.*)
        pathType: ImplementationSpecific
        backend:
          service:
            name: http-svc
            port:
              number: 80
```

In this example, the following rewrite behaviors occur when running the configuration with `kubectl create -f -`:

- rewrite.bar.com/something rewrites to rewrite.bar.com/
- rewrite.bar.com/something/ rewrites to rewrite.bar.com/
- rewrite.bar.com/something/new rewrites to rewrite.bar.com/new

Back in our setup, we can apply a simple rewrite target to strip the service-specific path:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  kubectl.kubernetes.io/last-applied-configuration: |
    {"apiVersion":"networking.k8s.io/v1","kind":"Ingress","metadata":{"annotations":{"nginx.ingress.kubernetes.io/ssl-redirect":"false"},"name":"app-ingress","namespace":"default"},"spec":{"rules":[{"http":{"paths":[{"backend":{"service":{"name":"techy-service","port":{"number":80}}},"path":"/techy","pathType":"Prefix"},{"backend":{"service":{"name":"kanye-service","port":{"number":80}}},"path":"/kanye","pathType":"Prefix"},{"backend":{"service":{"name":"useless-service","port":{"number":80}}},"path":"/useless","pathType":"Prefix"}]}}]}}
  creationTimestamp: "2024-07-13T23:45:38Z"
  generation: 1
  name: app-ingress
  namespace: default
  resourceVersion: "3463"
  uid: 73b9e3a6-1d41-4ad2-9dec-8827b3ebc2aa
spec:
  rules:
  - http:
      paths:
      - backend:
          service:
            name: techy-service
            port:
              number: 80
        path: /techy
        pathType: Prefix
      - backend:
          service:
            name: kanye-service
            port:
              number: 80
        path: /kanye
        pathType: Prefix
      - backend:
          service:
            name: useless-service
            port:
              number: 80
        path: /useless
        pathType: Prefix
```

After applying this updated Ingress configuration, testing with curl shows that the services now receive the expected, rewritten requests. For example:

```
bash
controlplane ~ ➜ curl -v 10.109.243.168/techy
*   Trying 10.109.243.168...
* Connected to 10.109.243.168 (10.109.243.168) port 80 (#0)
> GET /techy HTTP/1.1
> Host: 10.109.243.168
> User-Agent: curl/7.81.0
> Accept: */*
...
< HTTP/1.1 200 OK
...
I spent a lot of time setting up the modulation coupling
```

Other services can be verified similarly:

```
controlplane ~ ➜ curl 10.109.243.168/kanye
{"quote":"Life is the ultimate gift"}
```

```
controlplane ~ ➜ curl 10.109.243.168/useless
{"id":"6df415f6379dc42d110a6e5353b1da41","text":"Obsession is the most popular boat name.","source":"djtech.net","source_url":"http://www.djtech.net/humor/useless_facts.htm","language":"en","permalink":"https://uselessfacts.jsph.pl/api/v2/facts/6df415f6379dc42d110a6e5353b1da41"}
```

This demonstrates the importance of both correctly defining an Ingress resource and understanding how request path rewrites impact backend service behavior.

## Reviewing the Generated Nginx Configuration

To further troubleshoot, it is useful to examine the Nginx configuration generated by the Ingress Controller. This configuration defines the load balancer behavior, including the evaluation order for location blocks and timeout settings.

```
# Backend for when default-backend-service is not configured or lacks endpoints
server {
    listen 8181 default_server reuseport backlog=4096;
    listen [::]:8181 default_server reuseport backlog=4096;
    set $proxy_upstream_name "internal";


    access_log off;
    location / {
        return 404;
    }
}


# Default server used for NGINX healthcheck and stats access
server {
    listen 127.0.0.1:10246;
    set $proxy_upstream_name "internal";


    keepalive_timeout 0;
    gzip off;


    access_log off;
    location /healthz {
        return 200;
    }


    location /is-dynamic-lb-initialized {
        content_by_lua_block {
        }
    }
}
```

Additional configuration snippets such as timeout settings can be defined by annotations or directly in the configuration file:

```
lua_add_variable $proxy_upstream_name;
log_format log_stream '[{$remote_addr} {[$time_local]} $protocol $status $bytes_sent $bytes_received $session_time';
access_log /var/log/nginx/access.log log_stream;
error_log /var/log/nginx/error.log notice;
upstream upstream_balancer {
    server 0.0.0.1:1234; # placeholder
    balancer_by_lua_block {
        tcp_udp_balancer.balance()
    }
}
server {
    listen 127.0.0.1:10247;
    access_log off;
    content_by_lua_block {
        tcp_udp_configuration.call()
    }
    # TCP services
    # UDP services
    # Stream Snippets
}
```

A sample grep on the Nginx configuration might reveal:

```
keepalive_timeout 75s;
client_header_timeout 60s;
client_body_timeout 60s;
ssl_session_timeout 10m;
keepalive_timeout 60s;
proxy_connect_timeout 5s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;
proxy_next_upstream error timeout;
proxy_next_upstream_timeout 0;
```

> [!important]
> **Note**
>
> Reviewing the effective Nginx configuration is critical to ensure that your timeout and proxy settings match your expectations. Adjust these values as necessary to optimize your application's performance.

## Conclusion

This troubleshooting session has demonstrated not only how to define an Ingress resource but also the importance of proper URL path rewriting. By implementing the Nginx Ingress Controller's rewrite-target annotation, we ensure that backend services receive requests in the expected format—eliminating 404 errors caused by unexpected path prefixes.

Mastering the nuances of Ingress configurations is essential for managing traffic routing and resolving production issues effectively. Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/78d21774-d968-41cb-ab3e-64c0f60fee14)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/71a34877-3a04-43c2-a31e-f7bebad3f29c)**
>
> Practice lab
