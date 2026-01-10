# kubectl exec - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-exec)

---

## Table of Contents

- kubectl exec
  - Basic Syntax
  - Listing Container Filesystem Contents
  - Getting an Interactive Shell
  - Use Cases and Best Practices
  - Next Steps
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl exec

In this lesson, we will explore the purpose and usage of the `kubectl exec` command, which functions very similarly to `docker exec`. This powerful command enables you to execute commands inside a running container, making it an invaluable tool for container management and troubleshooting.

## Basic Syntax

The basic syntax for the `kubectl exec` command is as follows:

```
kubectl exec
```

When using this command, you need to specify the namespace and the pod name. If the pod contains multiple containers, include the container name by using the `-c` flag. For a pod with a single container, you only need to append `--` followed by the command you wish to execute.

## Listing Container Filesystem Contents

For instance, if you want to view the contents of a container’s filesystem, you can run:

```
kubectl exec -n dev nginx -- ls
```

The output will display a directory listing similar to the following:

```
controlplane ~  ->  k exec -n dev nginx -- ls
bin
boot
dev
docker-entrypoint.d
docker-entrypoint.sh
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
controlplane ~  ->
```

## Getting an Interactive Shell

Sometimes it is more convenient to enter into an interactive shell session within the container. For this purpose, add the `-i` (interactive) and `-t` (tty) flags. For example:

```
kubectl exec -n dev nginx -it -- /bin/bash
```

Once you have an interactive shell, you can execute various commands to inspect file permissions, navigate directories, or install debugging tools. For example, to display the content of the default nginx index page, you would run:

```
kubectl exec -n dev nginx -- cat /usr/share/nginx/html/index.html
```

The resulting HTML output appears as follows:

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: Light dark; }
body { width: 35em; margin: 0 auto; font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p>For online documentation and support please refer to <a href="http://nginx.org/">nginx.org</a>.<br>
Commercial support is available at <a href="http://nginx.com/">nginx.com</a>.</p>
<em>Thank you for using nginx.</em>
</body>
</html>
```

After reviewing a file, if you start an interactive shell by running:

```
kubectl exec -n dev nginx -it -- /bin/bash
```

You might see a prompt like this:

```
root@nginx:/# ls
bin     boot    dev     docker-entrypoint.sh  etc     home    lib     lib64   media   mnt     opt     proc    root    run     sbin    srv     sys     tmp     usr     var
```

## Use Cases and Best Practices

This approach is especially useful when you need to inspect file permissions, install debugging utilities, or run diagnostic tools such as `tcpdump` to gain insights into the container's behavior. However, it is important to note that:

> [!important]
> **Warning**
>
> Avoid using `kubectl exec` in production environments as it may interfere with the running workload. Instead, limit its use to development or staging environments and consider using more robust troubleshooting methods for production setups.

## Next Steps

In subsequent lessons, we will explore advanced techniques and diagnostic methods that are more suitable for addressing issues in production workloads.

For further information, check out these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/b2111c44-6b67-4b60-a91c-dabf3b6b78f8)**
>
> Watch video content
