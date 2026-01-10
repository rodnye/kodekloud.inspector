# Demo Vault PHP Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/HashiCorp-Vault-Kubernetes/Demo-Vault-PHP-Application)

---

## Table of Contents

- Demo Vault PHP Application
  - 1. Clone the Example Repository
  - 2. Build the Docker Image
  - 3. Review the PHP Application Code
  - 4. Define Kubernetes Manifests
  - 5. Access the Application
  - Next Steps
  - Links and References
  - Watch Video
    - Kubernetes Resource Summary

---

## Content

DevSecOps - Kubernetes DevOps & Security

HashiCorp Vault Kubernetes

# Demo Vault PHP Application

In this tutorial, you’ll build and deploy a PHP web app that reads secrets from HashiCorp Vault via file injection and displays them in a browser. We’ll cover:

1.  Cloning the example repository
2.  Building the Docker image
3.  Reviewing the PHP application code
4.  Defining Kubernetes manifests (Deployment, Service, ServiceAccount)
5.  Deploying to Kubernetes and observing the app before secrets are injected

---

## 1\. Clone the Example Repository

```
git clone https://github.com/sidd-harth/php-vault-example.git
cd php-vault-example
```

---

## 2\. Build the Docker Image

Build the PHP-Apache image with your application code:

```
docker build -t php:vault .
```

Dockerfile:

```
FROM php:7.4-apache
COPY src/ /var/www/html
EXPOSE 80
```

> [!important]
> **Note**
>
> Make sure Docker is running and you have permission to build images on your host.

---

## 3\. Review the PHP Application Code

The PHP entrypoint (`src/index.php`) attempts to read `username`, `password`, and `apikey` from `/vault/secrets/`. If any file is missing, the page turns red with an error. Otherwise, it displays a green page with the loaded credentials.

> > [!important]
> > **Note**
> >
> > The Vault UI banner has been removed for brevity.

```
<?php
echo "<table border='3'>
<tr>
  <th>Course</th>
  <th>Demo</th>
</tr>
<tr>
  <td>DevSecOps - Kubernetes, DevOps & Security</td>
  <td>HashiCorp Vault - Secret Injection through SideCar</td>
</tr>
</table><br/>";


$username = @file_get_contents("/vault/secrets/username");
$password = @file_get_contents("/vault/secrets/password");
$apikey   = @file_get_contents("/vault/secrets/apikey");


if ($username === false || $password === false || $apikey === false) {
    echo "<body style='background-color:red'>";
    echo "<h1 style='border: 2px solid DodgerBlue; color:white;'>File(s) Not Found</h1><br/>";
} else {
    echo "<body style='background-color:green'>";
    echo "<h1>Credentials Loaded from Vault</h1><br/>";
    echo "<table border='2'>
            <tr><td>Username</td><td>$username</td></tr>
            <tr><td>Password</td><td>$password</td></tr>
            <tr><td>API Key</td><td>$apikey</td></tr>
          </table>";
}
?>
```

---

## 4\. Define Kubernetes Manifests

Create `php-app-k8s-deploy.yaml` with Deployment, Service, and ServiceAccount resources:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: php
  labels:
    app: php
spec:
  replicas: 1
  selector:
    matchLabels:
      app: php
  template:
    metadata:
      labels:
        app: php
    spec:
      serviceAccountName: app
      containers:
        - name: php
          image: php:vault
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: php
  labels:
    app: php
spec:
  type: NodePort
  selector:
    app: php
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app
  labels:
    app: php
```

### Kubernetes Resource Summary

| Resource Type  | Purpose                           | File/Command              |
| -------------- | --------------------------------- | ------------------------- |
| Deployment     | Runs PHP container replicas       | `php-app-k8s-deploy.yaml` |
| Service        | Exposes app on NodePort           | `php-app-k8s-deploy.yaml` |
| ServiceAccount | Grants Vault Injector permissions | `php-app-k8s-deploy.yaml` |

> [!important]
> **Warning**
>
> Ensure your kubeconfig is pointed at the correct cluster before applying manifests.

Apply the manifest and verify:

```
kubectl apply -f php-app-k8s-deploy.yaml
kubectl get pods
kubectl get svc
kubectl get sa
```

---

## 5\. Access the Application

Open your browser:

```
http://<NODE_IP>:<NODE_PORT>
```

Since secrets are not yet injected, the page will display a red background with **File(s) Not Found**.

You can also inspect the pod’s `/vault/secrets` directory:

```
kubectl exec -it <php-pod-name> -- ls /vault/secrets
```

If empty, the application will render the error state.

---

## Next Steps

Configure the Vault Agent Injector to mount secrets into `/vault/secrets`, enabling the PHP application to load credentials at runtime.

---

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Official Images: PHP](https://hub.docker.com/_/php)
- [Vault Agent Sidecar Injector](https://www.vaultproject.io/docs/platform/k8s/injector)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/baf5859d-32c2-4e7c-9808-f3486d6b9827/lesson/f840eabb-c3ee-43a1-9f04-cd1b70ba3757)**
>
> Watch video content
