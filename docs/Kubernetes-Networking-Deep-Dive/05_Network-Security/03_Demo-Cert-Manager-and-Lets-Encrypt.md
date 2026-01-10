# Demo Cert Manager and Lets Encrypt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Network-Security/Demo-Cert-Manager-and-Lets-Encrypt)

---

## Table of Contents

- Demo Cert Manager and Lets Encrypt
  - 1. Install Cert-Manager
  - 2. Review the Test App and Ingress
  - 3. Create a Let’s Encrypt Staging Issuer
  - 4. Update the Ingress for TLS
  - 5. Verify the ACME Challenge and Certificate Issuance
  - 6. Create a Let’s Encrypt Production Issuer
  - 7. Switch Ingress to Production Issuer
  - Issuer Configuration Summary
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Networking Deep Dive

Network Security

# Demo Cert Manager and Lets Encrypt

In this tutorial, you’ll learn how to install Cert-Manager on Kubernetes and obtain an SSL certificate from Let’s Encrypt to secure a Traefik Ingress. We’ll walk through:

1.  Installing Cert-Manager with Helm
2.  Reviewing the sample “whoami” app and existing Ingress
3.  Creating a Let’s Encrypt **staging** Issuer
4.  Applying the Issuer and validating resources
5.  Updating the Ingress to request TLS
6.  Verifying the ACME challenge and certificate issuance
7.  Creating a Let’s Encrypt **production** Issuer and switching over

---

## 1\. Install Cert-Manager

First, ensure you have Helm installed and a Kubernetes context pointing at your control plane.

```
# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Create a namespace for Cert-Manager
kubectl create namespace cert-manager

# Install Cert-Manager and register its CRDs
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --set installCRDs=true
```

Wait until all pods in the `cert-manager` namespace are in the `Running` state:

```
kubectl get pods -n cert-manager
```

> [!important]
> **Note**
>
> Make sure your cluster meets the [Cert-Manager prerequisites](https://cert-manager.io/docs/installation/).

---

## 2\. Review the Test App and Ingress

We have a simple “whoami” deployment in the `default` namespace, fronted by Traefik:

```
kubectl get all -n default
```

Example output:

```
pod/whoami-8c9864b56-6pm4p   1/1 Running
service/whoami               ClusterIP   10.98.232.119    80/TCP
deployment.apps/whoami       1/1 Running
```

Check the existing Ingress:

```
kubectl get ingress whoami-ingress -n default
```

```
NAME             CLASS    HOSTS   ADDRESS   PORTS   AGE
whoami-ingress   traefik  *       <none>    80      5m
```

Describe it:

```
kubectl describe ingress whoami-ingress -n default
```

---

## 3\. Create a Let’s Encrypt Staging Issuer

To prevent hitting rate limits, start with the staging environment. Save this as `staging-issuer.yaml`:

```
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email:  your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
      - http01:
          ingress:
            name: whoami-ingress
```

Apply and inspect:

```
kubectl apply -f staging-issuer.yaml
kubectl describe issuer letsencrypt-staging -n default
kubectl get secrets -n default
```

You should see `letsencrypt-staging` in the secret list.

---

## 4\. Update the Ingress for TLS

Modify `whoami-ingress.yaml` to include the Cert-Manager annotation and a TLS block:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: whoami-ingress
  namespace: default
  annotations:
    cert-manager.io/issuer: letsencrypt-staging
spec:
  ingressClassName: traefik
  tls:
    - hosts:
        - test-example.com
      secretName: web-ssl
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: whoami
                port:
                  name: web
```

Apply the updated Ingress:

```
kubectl apply -f whoami-ingress.yaml
```

> [!important]
> **Warning**
>
> Ensure DNS for `test-example.com` points to your Traefik load balancer before requesting a certificate.

---

## 5\. Verify the ACME Challenge and Certificate Issuance

Describe the Ingress again to confirm ACME resources:

```
kubectl describe ingress whoami-ingress -n default
```

Look for:

- A `cm-acme-http-solver-…` backend under the ACME challenge path
- An event `CreateCertificate` indicating `web-ssl` was requested

```
Events:
  Type    Reason            Age   From                        Message
  ----    ------            ----  ----                        -------
  Normal  CreateCertificate  10s   cert-manager-ingress-shim  Successfully created Certificate "web-ssl"
```

---

## 6\. Create a Let’s Encrypt Production Issuer

Once staging is validated, switch to the production environment. Create `prod-issuer.yaml`:

```
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email:  your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-production
    solvers:
      - http01:
          ingress:
            name: whoami-ingress
```

Apply and verify:

```
kubectl apply -f prod-issuer.yaml
kubectl describe issuer letsencrypt-production -n default
```

---

## 7\. Switch Ingress to Production Issuer

Update the Ingress annotation to use the production Issuer:

```
kubectl annotate ingress whoami-ingress \
  cert-manager.io/issuer=letsencrypt-production \
  --overwrite -n default
```

Describe the Ingress to confirm renewal:

```
kubectl describe ingress whoami-ingress -n default
```

In the events, you should see:

```
Normal  RenewCertificate  12s  cert-manager-ingress-shim  Successfully renewed Certificate "web-ssl"
```

Your Traefik Ingress is now secured with a Let’s Encrypt production certificate.

---

## Issuer Configuration Summary

| Issuer Name            | Environment | ACME Server URL                                        | Secret Name            |
| ---------------------- | ----------- | ------------------------------------------------------ | ---------------------- |
| letsencrypt-staging    | Staging     | https://acme-staging-v02.api.letsencrypt.org/directory | letsencrypt-staging    |
| letsencrypt-production | Production  | https://acme-v02.api.letsencrypt.org/directory         | letsencrypt-production |

---

## References

- [Cert-Manager Documentation](https://cert-manager.io/docs/)
- [Let’s Encrypt ACME v2 API](https://letsencrypt.org/docs/acme-protocol/)
- [Traefik Ingress Controller](https://doc.traefik.io/traefik/)
- [Kubernetes Ingress Basics](https://kubernetes.io/docs/concepts/services-networking/ingress/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/733b4868-57b0-497e-a4bb-47956f1cb24a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/3cbd85fd-6665-41a7-b190-91a30b0c9a67)**
>
> Practice lab
