# Kubectl Proxy Port Forward - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Kubectl-Proxy-Port-Forward)

---

## Table of Contents

- Kubectl Proxy Port Forward
  - Using Kubectl Proxy
  - Accessing Cluster Services via Kubectl Proxy
  - Accessing Cluster Services via Port Forwarding
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Kubectl Proxy Port Forward

In this article, we dive deep into using the kubectl proxy and port-forward commands to securely interact with your Kubernetes API server and internal services. By leveraging your kubeconfig file, these tools enable seamless authentication and allow you to access cluster resources without manually specifying credentials.

When running kubectl, you don't need to embed authentication details in your commands. Your kubeconfig file contains the necessary credentials, letting kubectl connect to your Kubernetes cluster's API server regardless of whether you are on the control plane host or a remote workstation.

For example, running the following command on your local machine or lab setup produces output similar to:

```
kubectl get nodes
NAME    STATUS   ROLES                  AGE   VERSION
master  Ready    control-plane,master   25h   v1.20.1
worker  Ready    <none>                 25h   v1.20.1
```

The Kubernetes cluster itself might be hosted on a VM, private server, public cloud, or provided by a managed Kubernetes service. In all cases, you can manage it locally with kubectl using the credentials stored in your kubeconfig file.

Another way to directly interact with the Kubernetes API server is by using curl over port 6443. For instance, executing:

```
curl http://<kube-api-server-ip>:6443 -k
```

yields a response like:

```
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {},
  "status": "Failure",
  "message": "forbidden: User \"system:anonymous\" cannot get path \"/\"",
  "reason": "Forbidden",
  "details": {},
  "code": 403
}
```

> [!important]
> **Note**
>
> Because no authentication details are provided in the curl command, the Kubernetes API returns a forbidden status. Always ensure proper credentials are used when accessing services.

## Using Kubectl Proxy

The kubectl proxy command simplifies accessing the API server without manually managing credentials. It launches a local proxy service on port 8001 by default, automatically using the client credentials and certificates specified in your kubeconfig file.

To start the proxy, run:

```
kubectl proxy
```

The output will confirm that the proxy is running:

```
Starting to serve on 127.0.0.1:8001
```

Now, you can query the API server’s endpoints via the proxy. For instance, use:

```
curl http://localhost:8001 -k
```

This command returns a list of all available API paths:

```
{
  "paths": [
    "/api",
    "/api/v1",
    "/apis",
    "/apis/",
    "/healthz",
    "/logs",
    "/metrics",
    "/openapi/v2",
    "/swagger-2.0.0.json"
  ]
}
```

In this setup, your local proxy forwards requests to the Kubernetes API server using the credentials in your kubeconfig file. Note that because the proxy binds to the loopback address (127.0.0.1), it is accessible only from your local machine.

## Accessing Cluster Services via Kubectl Proxy

Using kubectl proxy, you can also access services deployed within the cluster. For example, suppose you have an Nginx service running on a ClusterIP in the default namespace. Although not exposed externally via NodePort or LoadBalancer, you can access it locally by constructing the appropriate URL through the proxy:

```
curl http://localhost:8001/api/v1/namespaces/default/services/nginx/proxy/
```

The response might look like the following HTML page:

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p>For online documentation and support please refer to <a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at <a href="http://nginx.com/">nginx.com</a>.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

This approach makes the service appear as if it were running directly on your local machine.

## Accessing Cluster Services via Port Forwarding

In addition to using a proxy, port forwarding offers a convenient method to map a local port directly to a port on a service, pod, or other resource in your cluster. This method is particularly useful when you need to test applications running remotely.

For example, to forward traffic from your local port 28080 to port 80 on an Nginx service, execute:

```
kubectl port-forward service/nginx 28080:80
```

Once the port-forward is established, access the service using:

```
curl http://localhost:28080/
```

You should see the Nginx welcome page, confirming that the forwarding is successful:

```
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
body {
    width: 35em;
    margin: 0 auto;
    font-family: Tahoma, Verdana, Arial, sans-serif;
}
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed</p>
</body>
</html>
```

Port forwarding is invaluable when working with remote clusters, as it provides direct, secure access to services as if they were running locally.

## Summary

In this article, we explored two fundamental techniques for interacting with a Kubernetes cluster:

1.  Using kubectl proxy to access the Kubernetes API server and internal services without providing manual authentication details.
2.  Using kubectl port-forward to map a local port to a cluster service, enabling local access to remote resources.

> [!important]
> **Key Takeaway**
>
> Leveraging kubectl proxy and port forwarding streamlines remote cluster management, making it easier to perform diagnostic tasks and access internal services securely.

By mastering these techniques, you can efficiently manage your Kubernetes clusters and securely troubleshoot or test services without exposing them externally. For more detailed Kubernetes documentation and further learning, consider exploring the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Practice these commands in your lab environments to gain confidence and explore additional use cases in your upcoming projects.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/5ae09904-7026-40c1-8d94-66ce2d244413)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/e572aaf4-1736-4865-9dd1-b2e46aaaca04)**
>
> Practice lab
