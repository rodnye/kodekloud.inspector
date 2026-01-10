# Observability Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Observability-Overview)

---

## Table of Contents

- Observability Overview
  - Why Early Detection Matters
  - Real-World Analogy: Credit Card Alerts
  - Detecting Breaches in Kubernetes
  - Introducing Falco
  - Common Indicators of Compromise
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Observability Overview

In this lesson, we’ll explore how to monitor your Kubernetes clusters for abnormal behavior, ongoing cyber attacks, and security breaches. Even with hardened control planes, workload isolation, sandboxing, mTLS, and strict network policies, attackers may eventually find a way in. Observability lets us detect compromises early, reduce the blast radius, and recover swiftly.

Throughout this course, we’ve covered techniques to secure Kubernetes infrastructure:

![Five colored boxes illustrating key cybersecurity concepts: "Securing Cluster," "Sandboxing Techniques," "Restricting Network Access," "Minimizing Microservices Vulnerability," and "MTLS Encryption."](https://kodekloud.com/kk-media/image/upload/v1752880893/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Overview/cybersecurity-concepts-colored-boxes.jpg)

## Why Early Detection Matters

It might seem that once an attacker breaches your perimeter, the damage is done. However, just as banks now send instant alerts for credit card transactions to limit fraud, rapid detection in Kubernetes prevents lateral movement and stops attackers before they can escalate privileges or exfiltrate data.

## Real-World Analogy: Credit Card Alerts

Imagine your debit card is stolen. In the past, you might not notice fraudulent withdrawals until reviewing your statement days later. Today, banks send instant notifications, allow you to revert unauthorized transactions, and let you set spending limits:

![Credit card icon at the center with three labeled buttons below it: "Instant Notifications," "Revert Transactions," and "Transaction Limits."](https://kodekloud.com/kk-media/image/upload/v1752880894/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Overview/credit-card-icon-buttons-notifications.jpg)

Similarly, when a container is compromised:

- Instant alerts tell you _when_ and _where_ the breach happened.
- Automated workflows can isolate or replace affected pods.
- Policy limits (e.g., resource quotas, network policies) contain the impact.

## Detecting Breaches in Kubernetes

Once a container is breached, rapid detection prevents further spread:

![Network diagram showing a Kubernetes control plane, worker nodes, and a compromised worker node highlighted with an intruder icon and a warning on the node's screen.](https://kodekloud.com/kk-media/image/upload/v1752880895/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Overview/network-diagram-security-breach.jpg)

What we need is a runtime security tool that inspects syscalls and flags suspicious activities in real time. Enter **Falco**.

## Introducing Falco

[Falco](https://falco.org) is an open-source runtime security project by Sysdig. It hooks into the Linux kernel to capture syscalls from containers and applies rules to detect:

![Diagram of containers making syscalls to the Linux kernel, with a list of syscall names on the side and the Falco logo.](https://kodekloud.com/kk-media/image/upload/v1752880897/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Overview/system-architecture-containers-syscalls-falco.jpg)

- **Unexpected shell access** inside a container
- **Reading sensitive files** like `/etc/shadow`
- **Deleting or truncating logs** to cover tracks

> [!important]
> **Note**
>
> Falco requires privileged permissions to monitor syscalls. Make sure to deploy it with appropriate security contexts and RBAC settings.

## Common Indicators of Compromise

| Suspicious Activity               | Description                                                 |
| --------------------------------- | ----------------------------------------------------------- |
| Unexpected shell in container     | `kubectl exec -ti <pod> -- bash` opens an interactive shell |
| Accessing password hashes         | `cat /etc/shadow`                                           |
| Deleting or truncating audit logs | `> /opt/logs/audit.log`                                     |

Example session that Falco would flag:

```
# Open a shell in the nginx-master pod
kubectl exec -ti nginx-master -- bash


# Attempt to view password hashes
cat /etc/shadow


# Erase audit logs
> /opt/logs/audit.log
```

Even legitimate administrative tasks can generate alerts—allowing you to confirm whether activity is expected or malicious.

> [!important]
> **Warning**
>
> Suppressing Falco alerts for critical rules can blind you to real threats. Tune rules carefully rather than disabling them.

## Next Steps

In the next lesson, we’ll install Falco in our Kubernetes cluster, configure its ruleset, and integrate it with notification channels to ensure you receive alerts via Slack, email, or PagerDuty when anomalies occur.

---

## Links and References

- [Falco Official Website](https://falco.org)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Securing Kubernetes Clusters](https://kubernetes.io/docs/concepts/security/overview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/5d53d882-cdd8-4140-a832-7a80755e31f2)**
>
> Watch video content
