# Developing network policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Developing-network-policies)

---

## Table of Contents

- Developing network policies
  - Allowing Specific Ingress Traffic
  - Restricting Traffic by Namespace
  - Allowing Traffic from External Sources
  - Configuring Egress Policies
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Developing network policies

In this lesson, we will explore Kubernetes network policies in detail using our familiar web API and database pods. Our objective is to protect the database pod by allowing only the API pod to access it on port 3306, while all other pods remain unrestricted.

By default, Kubernetes allows all traffic between pods. Therefore, the first step is to block all traffic to and from the database pod by creating a network policy—named "db-policy"—and associating it with the database pod via labels. In our case, the database pod is labeled with role: db.

Below is the network policy that initially blocks all ingress traffic to the database pod:

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

## Allowing Specific Ingress Traffic

To allow the API pod to connect to the database on port 3306, we add an ingress rule. This rule specifies a pod selector for the API pod (labeled as name: api-pod) and restricts the allowed port to TCP 3306.

> [!important]
> **Note**
>
> Once the incoming traffic is allowed, the corresponding response traffic is automatically permitted without needing an additional rule.

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

It is important to note that this ingress rule only governs traffic coming into the database pod; it does not allow the database pod to initiate connections. For example, if the database pod tries to communicate with the API pod, that outbound (egress) traffic would be blocked unless you define an explicit egress rule.

## Restricting Traffic by Namespace

Consider a scenario with multiple API pods across different namespaces (e.g., dev, test, and prod). If these pods share the same labels, the above policy would allow all API pods to access the database. To restrict access only to the API pod in the prod namespace, we can add a namespace selector to the ingress rule. This additional selector ensures that only pods matching both the label and the specific namespace label (name: prod) are allowed.

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

Keep in mind: if you include only the namespace selector without a pod selector, every pod within the specified namespace would gain access, potentially permitting unwanted traffic from pods like the web pod.

## Allowing Traffic from External Sources

In some scenarios, external systems like a backup server (outside your Kubernetes cluster) might need to connect to the database. Since the external server isn’t managed by Kubernetes, pod and namespace selectors do not apply. Instead, use an IP block to allow traffic from a specific external IP address. For example, if the backup server’s IP is 192.168.5.10, you can configure the ingress rule as follows:

```
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

In this configuration, there are two elements under the "from" section:

- The first element requires that the traffic come from a pod labeled `api-pod` residing in the prod namespace.
- The second element allows traffic directly from the specified external IP address.

Separating selectors into distinct blocks changes the logic. It is crucial to structure these rules carefully based on your security and traffic requirements.

## Configuring Egress Policies

While the previous rules focused on controlling incoming (ingress) traffic, there are cases when the database pod needs to initiate outbound communications. For example, if an agent on the database pod is pushing backups to an external server, you must define an egress rule.

Below is an example rule that permits outbound traffic to an external server (with IP 192.168.5.10) on port 80:

```
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

This configuration maintains the ingress restrictions while adding an egress rule that specifically permits outbound traffic to the external backup server.

## Summary

In this lesson, you learned how to configure Kubernetes network policies to manage both ingress and egress traffic. Key topics covered include:

- Blocking all traffic by default and protecting a specific pod (database).
- Allowing traffic from a specific pod and namespace.
- Permitting access from external sources using IP blocks.
- Defining egress rules for outbound communications.

> [!important]
> **Practice Makes Perfect**
>
> We recommend practicing with these network policies in your Kubernetes environment to reinforce these concepts and tailor them to your specific use cases.

For further reading on Kubernetes networking and network policies, check out [Kubernetes Documentation](https://kubernetes.io/docs/) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/dd43a81a-4bcd-462f-afc0-7571004cd819)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/3fc36fb1-17fc-4654-9b78-f8856377feed)**
>
> Practice lab
