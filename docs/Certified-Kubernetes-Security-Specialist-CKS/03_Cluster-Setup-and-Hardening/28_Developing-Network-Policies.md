# Developing Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Developing-Network-Policies)

---

## Table of Contents

- Developing Network Policies
  - Using Additional Selectors
  - Adding Egress Rules
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Developing Network Policies

In this lesson, we will explore network policies in detail using a practical scenario. We have a web API and database pods, and our goal is to secure the database pod such that it only accepts traffic from the API pod on port 3306. Traffic from the web pod is not restricted and can be ignored for this policy.

By default, Kubernetes allows all pods to communicate. To restrict access, we first create a network policy—named "db-policy"—that targets the database pod using labels and selectors. In our example, the database pod has the label "role: db". By applying the network policy with a pod selector based on this label, all incoming (ingress) traffic is blocked until explicit allowances are defined.

Below is the basic YAML for an ingress-only network policy that permits database queries from the API pod on port 3306:

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
    ports:
    - protocol: TCP
      port: 3306
```

In this configuration, ingress traffic is allowed only from pods labeled as "api-pod". Keep in mind that once ingress traffic is accepted, the corresponding response traffic is automatically permitted. Therefore, an egress rule is not required for this scenario unless the database pod initiates connections (for example, calling an API).

> [!important]
> **Tip**
>
> If your database pod ever needs to initiate outbound connections, you'll need to define a separate egress rule to manage that traffic.

## Using Additional Selectors

There are many scenarios where more granular control is needed. For instance, imagine you have multiple API pods in different namespaces (dev, test, and prod), but you only want the API pod in the prod namespace to connect to the database pod. To enforce this, combine a namespace selector with a pod selector in the ingress rule:

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
    ports:
    - protocol: TCP
      port: 3306
```

In the above configuration, traffic is only allowed if a pod meets both conditions: it must be labeled as "api-pod" and reside in a namespace with the label "prod". Be cautious when structuring your selectors. Separating the pod and namespace selectors into different list items (each with its own dash) results in an OR operation, which could unintentionally permit more sources.

Another common scenario involves allowing an external resource, such as a backup server, to access the database pod. Since the backup server is external to the Kubernetes cluster, pod or namespace selectors cannot be used. Instead, define an IP block to specify the allowed address. For example, if the backup server has an IP address of 192.168.5.10, the ingress rule can be defined as follows:

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
    - ipBlock:
        cidr: 192.168.5.10/32
    ports:
    - protocol: TCP
      port: 3306
```

Multiple selectors can be combined within a single rule (using an AND condition) or as separate entries (using an OR condition). The example below demonstrates both a combined rule and a rule for a specific IP block:

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

In this combined configuration, traffic is allowed if it either meets the criteria of being from the API pod in the prod namespace or matches the specific IP block.

## Adding Egress Rules

Consider the situation where the database pod must initiate outbound connections—such as pushing backups to an external backup server. Here, an egress rule is necessary, as this traffic originates from the database pod.

To enable both ingress and egress rules in a single network policy, include "Egress" in the policyTypes array and define an egress section. In the example below, the database pod is allowed to send outbound traffic to the external backup server (using an IP block) on port 80:

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
    - ipBlock:
        cidr: 192.168.5.10/32
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

This complete policy ensures that:

- Only traffic from the API pod in the prod namespace (or the specific external IP) is allowed to access the database pod on port 3306.
- Outbound connections from the database pod to the designated external backup server on port 80 are permitted.

> [!important]
> **Further Reading**
>
> For more detailed explanations on Kubernetes network policies and advanced configurations, check out the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/services-networking/network-policies/).

That concludes our discussion on network policies, covering the use of selectors, IP blocks, as well as ingress and egress rules. It's time to put your knowledge into practice by working on your own network policy configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/7e0076f4-851d-4b86-ac99-ee9d278bcaaa)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/ef4c8e94-d23b-49e4-83ec-ac284382f1fd)**
>
> Practice lab
