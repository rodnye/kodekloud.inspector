# Developing network policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Developing-network-policies)

---

## Table of Contents

- Developing network policies
  - Blocking All Ingress Traffic to the Database Pod
  - Allowing Ingress Traffic from the API Pod
  - Configuring Egress Traffic
  - Summary of Network Policy Configuration
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Developing network policies

In this article, we explore advanced network policy configurations within Kubernetes. We will use our familiar web API and database pods to demonstrate how to secure your database pod by allowing only authorized access. Specifically, only the API pod will access the database pod on port 3306, while other pods (such as the web pod) remain unrestricted. By default, Kubernetes permits all traffic between pods, so explicit network policies are necessary to enforce these security measures.

## Blocking All Ingress Traffic to the Database Pod

To begin, we block all incoming traffic to the database pod. This is achieved by creating a network policy that targets the database pod using labels and selectors. In our example, the database pod is labeled `role: db`. The following YAML file defines a policy that denies all ingress traffic by default since no specific ingress rules are provided:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
```

> [!important]
> **Note**
>
> If no ingress rules are specified, Kubernetes treats the policy as a complete block for incoming traffic.

## Allowing Ingress Traffic from the API Pod

The next step is to allow ingress traffic from the API pod on port 3306. Because responses to permitted traffic are automatically allowed, configuring an ingress rule is sufficient. In this rule, the source is defined by pod selectors (and optionally namespace selectors) while the destination port is specified.

For instance, to allow traffic only from pods labeled `name: api-pod` within namespaces labeled `prod`—and also permit traffic from a backup server with IP `192.168.5.10`—update the network policy as follows:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          name: api-pod
      namespaceSelector:
        matchLabels:
          name: prod
    - ipBlock:
        cidr: 192.168.5.10/32
  ports:
  - protocol: TCP
    port: 3306
```

In this configuration, the first entry under the `from` section restricts traffic to API pods in the production namespace (an AND condition). The second entry allows an external backup server by specifying its IP block.

> [!important]
> **Tip**
>
> Combining pod selectors with namespace selectors ensures that the rule applies only to the intended pods within the correct namespace.

## Configuring Egress Traffic

In scenarios where the database pod must initiate outbound connections (for example, sending backups to an external server), an egress rule becomes necessary. To support both ingress and egress traffic, include `Egress` in the `policyTypes` and specify an egress rule.

The revised policy below permits the database pod to send traffic to a backup server at IP `192.168.5.10` on port `80` while still restricting all other outbound connections:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          name: api-pod
      namespaceSelector:
        matchLabels:
          name: prod
  ports:
  - protocol: TCP
    port: 3306
  egress:
  - to:
    - ipBlock:
        cidr: 192.168.5.10/32
    ports:
    - protocol: TCP
      port: 80
```

> [!important]
> **Warning**
>
> Ensure that your egress rules cover all required outbound connections. Missing an egress rule may inadvertently block critical communication between your services.

## Summary of Network Policy Configuration

| Configuration Aspect | Description                                                                                                     | YAML Reference                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Blocking Traffic     | Deny all ingress traffic to the database pod by default.                                                        | Initial policy with `podSelector` for `role: db`.             |
| Allowing Ingress     | Permit API pod access on port 3306 by combining pod and namespace selectors. Also allow a specific external IP. | Ingress rule with pod and namespace selectors plus `ipBlock`. |
| Configuring Egress   | Enable the database pod to send outbound traffic to an external backup server on port 80.                       | Egress rule addition with `ipBlock` for backup server.        |

Experiment in your lab environment with these network policy configurations to gain hands-on experience with Kubernetes security practices. Understanding how selectors and rule ordering interact in your network policies will help you optimize traffic flow and maintain a secure architecture.

For additional resources on Kubernetes networking and security, visit the following links:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Kubernetes API Reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/)

Happy networking, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/ea75ba37-04a4-4743-9503-03135583648f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/c8d3b27e-5d6d-4223-9d6d-9220d7e42fdf)**
>
> Practice lab
