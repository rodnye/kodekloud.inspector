# Security Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Network-Security/Security-Overview)

---

## Table of Contents

- Security Overview
  - 1. Encryption and SSL
  - 2. Securing Ingress
  - 3. CNI Network Policies
  - 4. Mutual TLS (mTLS)
  - 5. Observability With Hubble
  - Links and References
  - Watch Video
    - Advanced Policies with Cilium

---

## Content

Kubernetes Networking Deep Dive

Network Security

# Security Overview

As Kubernetes scales to manage hundreds or thousands of containers across multiple nodes, securing your cluster becomes mission-critical. A single vulnerability can cascade through workloads, compromise sensitive data, or disrupt services. This guide outlines proven strategies—from TLS automation to network policies and observability—to strengthen your Kubernetes security posture.

![The image is a security overview diagram highlighting why security is required (complex environment, dynamic nature, compliance requirements) and what security provides (resilience, data protection, monitoring), with a Kubernetes logo in the center.](https://kodekloud.com/kk-media/image/upload/v1752880405/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/security-overview-kubernetes-diagram.jpg)

![The image is a section overview with a list of five topics: Encryption and SSL, Securing an Ingress, CNI Network Policies, Mutual TLS (mTLS), and Observability With Hubble.](https://kodekloud.com/kk-media/image/upload/v1752880406/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/encryption-ssl-ingress-cni-mtls-observability.jpg)

| Section                        | Focus                       | Benefit                           |
| ------------------------------ | --------------------------- | --------------------------------- |
| 1\\. Encryption & SSL          | Automated TLS certificates  | Secure HTTPS endpoints            |
| 2\\. Securing Ingress          | Ingress controller security | Encrypted entry points            |
| 3\\. CNI Network Policies      | Pod network isolation       | Reduced lateral attack surface    |
| 4\\. Mutual TLS (mTLS)         | Service-to-service auth     | Prevent man-in-the-middle attacks |
| 5\\. Observability With Hubble | Traffic & event visibility  | Faster troubleshooting and alerts |

## 1\. Encryption and SSL

Automating TLS certificate issuance and renewal is essential for 24/7 uptime and risk reduction. Let’s Encrypt and cert-manager work together to keep your cluster’s endpoints secure:

- **Let’s Encrypt** ([letsencrypt.org](https://letsencrypt.org/)) provides free SSL/TLS certificates via the ACME protocol.
- **cert-manager** ([cert-manager.io](https://cert-manager.io/)) automates certificate lifecycles using Kubernetes CRDs (`Issuer`, `ClusterIssuer`, `Certificate`).

```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
    - http01:
        ingress:
          class: traefik
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-com-tls
spec:
  secretName: example-com-tls
  dnsNames:
  - example.com
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
```

> [!important]
> **Note**
>
> Make sure your DNS records are properly configured for HTTP-01 or DNS-01 challenges before deploying cert-manager.

cert-manager stores issued certificates in Kubernetes Secrets and renews them automatically before expiration.

![The image is about "Encryption and SSL," featuring logos for Let's Encrypt and Cert Manager, and describes four points related to Kubernetes and TLS certificates.](https://kodekloud.com/kk-media/image/upload/v1752880406/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/encryption-ssl-lets-encrypt-cert-manager.jpg)

## 2\. Securing Ingress

Exposed services must serve traffic securely. Traefik is a popular Ingress controller that integrates seamlessly with cert-manager and Let’s Encrypt to automate SSL/TLS:

```
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: secure-web
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`app.example.com`)
      kind: Rule
      services:
        - name: web
          port: 80
  tls:
    secretName: example-com-tls
```

With this configuration, Traefik delegates certificate requests to cert-manager, enabling HTTPS without manual steps.

![The image shows a combination of Traefik, Let's Encrypt, and Cert Manager logos under the title "Securing Ingress."](https://kodekloud.com/kk-media/image/upload/v1752880408/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/traefik-letsencrypt-cert-manager-ingress.jpg)

## 3\. CNI Network Policies

NetworkPolicies define traffic rules at the pod level, isolating workloads and preventing unauthorized lateral movement:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-from-frontend
spec:
  podSelector:
    matchLabels:
      role: web
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 80
```

### Advanced Policies with Cilium

Cilium uses eBPF for kernel-level enforcement and richer policy definitions:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-frontend-to-web
spec:
  endpointSelector:
    matchLabels:
      role: web
  ingress:
    - fromEndpoints:
        - matchLabels:
            role: frontend
      toPorts:
        - ports:
            - port: "80"
              protocol: TCP
```

![The image illustrates CNI network policies in a Kubernetes cluster, showing allowed and blocked traffic between external sources and applications labeled as "web," "foo," and "bar."](https://kodekloud.com/kk-media/image/upload/v1752880409/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/cni-network-policies-kubernetes-traffic.jpg)

![The image is about Cilium, highlighting its features such as enhancing pod communication security, leveraging eBPF technology, and providing advanced security controls.](https://kodekloud.com/kk-media/image/upload/v1752880410/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/cilium-pod-communication-security-ebpf.jpg)

## 4\. Mutual TLS (mTLS)

Mutual TLS ensures both clients and servers verify each other’s identity before exchanging data. This two-way authentication thwarts man-in-the-middle attacks and enforces strict service-level trust.

![The image illustrates a Mutual TLS (mTLS) process between two pods, showing a TLS handshake and certificate authentication.](https://kodekloud.com/kk-media/image/upload/v1752880410/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/mutual-tls-mtls-pods-handshake-diagram.jpg)

> [!important]
> **Warning**
>
> Expired or misconfigured certificates will break mTLS connections. Monitor certificate lifecycles and automate renewals.

## 5\. Observability With Hubble

Cilium’s Hubble provides deep visibility into network flows, application performance, and security events:

```
# Deploy Cilium with Hubble
kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/v1.12/install/kubernetes/quick-install.yaml


# Enable Hubble metrics server
cilium hubble enable


# Observe live network flows
hubble observe --namespace default
```

![The image is a presentation slide titled "Observability With Hubble," featuring a stylized illustration of a satellite and a list of observability features such as network traffic visibility, application behavior visibility, and security events visibility.](https://kodekloud.com/kk-media/image/upload/v1752880411/notes-assets/images/Kubernetes-Networking-Deep-Dive-Security-Overview/observability-with-hubble-satellite-slide.jpg)

## Links and References

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [cert-manager Documentation](https://cert-manager.io/docs/)
- [Let’s Encrypt ACME API](https://letsencrypt.org/docs/acme-protocol/)
- [Traefik Ingress Controller](https://doc.traefik.io/traefik/)
- [Cilium & Hubble](https://cilium.io/features/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5a70ab6c-2094-4bf2-9f49-e441919fc8c2/lesson/a90600fe-7343-4bfb-b836-f80177c6920d)**
>
> Watch video content
