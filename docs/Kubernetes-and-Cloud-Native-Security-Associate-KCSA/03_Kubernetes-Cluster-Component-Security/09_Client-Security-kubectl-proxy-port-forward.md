# Client Security kubectl proxy port forward - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Cluster-Component-Security/Client-Security-kubectl-proxy-port-forward)

---

## Table of Contents

- Client Security kubectl proxy port forward
  - 1. Interacting with the Kubernetes API
  - 2. Using kubectl proxy
  - 3. Accessing In-Cluster Services via Proxy
  - 4. Port Forwarding with kubectl port-forward
  - Links and References
  - Watch Video
    - Comparison of Access Methods

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Cluster Component Security

# Client Security kubectl proxy port forward

In this guide, we explore how the `kubectl` CLI communicates with the Kubernetes API server and demonstrate two secure methods—**kubectl proxy** and **kubectl port-forward**—for accessing cluster APIs and Services locally. You’ll see how `kubeconfig` provides authentication, how to launch a local HTTP proxy, and how to forward ports from your machine to in-cluster endpoints.

## 1\. Interacting with the Kubernetes API

By default, `kubectl` uses credentials in your `~/.kube/config` (kubeconfig) to authenticate against the API server:

```
kubectl get nodes
```

Example output:

```
NAME     STATUS   ROLES                  AGE    VERSION
master   Ready    control-plane,master   25h    v1.20.1
worker   Ready    <none>                 25h    v1.20.1
```

If you call the API directly over HTTPS without credentials, you’ll get a 403 error:

```
curl https://<kube-api-server-ip>:6443 -k
```

```
{
  "kind": "Status",
  "status": "Failure",
  "message": "forbidden: User \"system:anonymous\" cannot get path \"/\"",
  "code": 403
}
```

Supplying client certificates lets you authenticate:

```
curl https://<kube-api-server-ip>:6443 -k \
  --key admin.key \
  --cert admin.crt \
  --cacert ca.crt
```

This returns a list of available API paths:

```
{
  "paths": [
    "/api/",
    "/api/v1/",
    "/apis/",
    "/healthz/",
    "/metrics/"
  ]
}
```

### Comparison of Access Methods

| Method          | Command                   | Authentication | Use Case                                |
| --------------- | ------------------------- | -------------- | --------------------------------------- |
| kubectl CLI     | `kubectl get nodes`       | kubeconfig     | Standard cluster management             |
| Direct API Curl | `curl https://<api>:6443` | Client certs   | Scripting or debugging API interactions |
| kubectl proxy   | `kubectl proxy`           | kubeconfig     | Local HTTP proxy for API & services     |

## 2\. Using `kubectl proxy`

The `kubectl proxy` command starts a local HTTP server (default port **8001**) that forwards requests to the API server using your `kubeconfig` credentials:

```
kubectl proxy
# Starting to serve on 127.0.0.1:8001
```

Now you can access the API via `http://localhost:8001`:

```
curl http://localhost:8001
```

```
{
  "paths": [
    "/api",
    "/api/v1",
    "/apis",
    "/healthz",
    "/metrics",
    "/openapi/v2",
    "/swagger-2.0.0.json"
  ]
}
```

> [!important]
> **Note**
>
> By default, `kubectl proxy` listens only on the loopback interface (127.0.0.1) for security.> [!important]
> **Warning**
>
> Avoid exposing the proxy on public IPs without proper authentication controls.

## 3\. Accessing In-Cluster Services via Proxy

You can also reach Services of type `ClusterIP` inside the cluster through the proxy. For example, to access an NGINX Service in the `default` namespace:

![The image illustrates the architecture of a Kubectl Proxy setup, showing the connection between a laptop running Kubectl and a Kubernetes cluster's API server through specific ports.](https://kodekloud.com/kk-media/image/upload/v1752880747/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Client-Security-kubectl-proxy-port-forward/kubectl-proxy-architecture-diagram.jpg)

```
curl http://localhost:8001/api/v1/namespaces/default/services/nginx/proxy/
```

You’ll receive the standard NGINX welcome page:

```
<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>…</p>
</body>
</html>
```

With `kubectl proxy`, the in-cluster Service appears as if it’s running locally.

## 4\. Port Forwarding with `kubectl port-forward`

An alternative to proxying is **port forwarding**, which maps a local port directly to a Pod or Service port:

```
kubectl port-forward service/nginx 8080:80
```

- **Local endpoint**: `http://localhost:8080`
- **Cluster endpoint**: Service `nginx` port `80`

Now, visiting `http://localhost:8080` sends traffic through the API server to the `nginx` Service.

## Links and References

- [Kubernetes API Concepts](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [kubeconfig File Format](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)
- [kubectl proxy Reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#proxy)
- [kubectl port-forward Reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#port-forward)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/ca772db3-53aa-44c1-b424-3d32a046b683/lesson/50710279-96bd-47b6-a146-9527b3f8187c)**
>
> Watch video content
