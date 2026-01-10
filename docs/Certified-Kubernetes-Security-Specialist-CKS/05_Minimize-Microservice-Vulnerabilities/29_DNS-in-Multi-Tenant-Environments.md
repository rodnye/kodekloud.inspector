# DNS in Multi Tenant Environments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/DNS-in-Multi-Tenant-Environments)

---

## Table of Contents

- DNS in Multi Tenant Environments
  - Configuring CoreDNS for Tenant Isolation
  - Summary Table
  - Watch Video
    - Step 1: Edit the CoreDNS ConfigMap
    - Step 2: Update the CoreDNS Corefile
    - Step 3: Test the DNS Restrictions

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# DNS in Multi Tenant Environments

In this guide, we explore how to configure DNS in a multi-tenant Kubernetes environment. DNS plays a crucial role in Kubernetes by translating service and pod names to IP addresses, ensuring seamless communication within the cluster. However, when multiple tenants share the same cluster—each represented by different namespaces—special considerations are necessary to enforce security and isolation between these tenants.

By default, Kubernetes deploys a DNS service (typically CoreDNS) to manage name resolution throughout the cluster. This default configuration allows any service or pod to be accessed across namespaces using fully qualified domain names (FQDNs). For example, a service named "backend" in namespace A can be resolved from namespace B using the following FQDN:

```
backend.namespace-a.svc.cluster.local
```

This behavior simplifies in-cluster communication but lacks robust isolation between tenants. In multi-tenant setups, restricting cross-namespace DNS resolution is essential to prevent accidental or malicious discovery of resources across namespaces.

> [!important]
> **Key Information**
>
> Restricting DNS queries to the same namespace enhances tenant security and prevents unwanted cross-namespace communication.

## Configuring CoreDNS for Tenant Isolation

To enhance security, you can modify the CoreDNS configuration so that DNS queries are limited to the namespace in which they originate. The following steps demonstrate how to achieve this.

### Step 1: Edit the CoreDNS ConfigMap

Use the following command to edit the CoreDNS configuration stored in the ConfigMap:

```
kubectl edit configmap coredns -n kube-system
```

### Step 2: Update the CoreDNS Corefile

Within the ConfigMap, adjust the Corefile by adding the `fallthrough in-namespace` directive under the Kubernetes block. Below is an example of the updated Corefile:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health {
            lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
            pods verified
            fallthrough in-namespace
        }
        prometheus :9153
        forward . /etc/resolv.conf
        cache 30
        loop
        reload
        loadbalance
    }
```

After updating the ConfigMap, CoreDNS automatically reloads the configuration in its running pods.

> [!important]
> **Security Alert**
>
> Be aware that misconfiguring DNS settings can interrupt service discovery within your cluster. Always validate changes in a test environment before applying them to production.

### Step 3: Test the DNS Restrictions

Deploy pods in different namespaces and perform DNS queries to verify that cross-namespace resolution is restricted. For instance, use the command below to launch a test pod in "namespace-a" and attempt to resolve a service in "namespace-b":

```
kubectl run test-pod --rm -i --tty --image=busybox --restart=Never --namespace=namespace-a -- nslookup backend.namespace-b.svc.cluster.local
```

If configured correctly, the DNS lookup from a pod in namespace A will not resolve a service in namespace B, thereby ensuring improved tenant isolation and enhanced security.

## Summary Table

| Configuration Step     | Action                                   | Command/Code Example                                                                                                                           |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Edit CoreDNS ConfigMap | Modify the CoreDNS settings              | `kubectl edit configmap coredns -n kube-system`                                                                                                |
| Update Corefile        | Add `fallthrough in-namespace` directive | See the YAML snippet above for the updated Corefile configuration                                                                              |
| Test DNS Isolation     | Verify isolation by performing nslookup  | `kubectl run test-pod --rm -i --tty --image=busybox --restart=Never --namespace=namespace-a -- nslookup backend.namespace-b.svc.cluster.local` |

Implementing these steps guarantees that pods in one namespace cannot resolve services in another, reinforcing security in your multi-tenant Kubernetes environment. For additional best practices, see the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/0717d4eb-9fb4-4f54-80a7-3e04f18a1971)**
>
> Watch video content
