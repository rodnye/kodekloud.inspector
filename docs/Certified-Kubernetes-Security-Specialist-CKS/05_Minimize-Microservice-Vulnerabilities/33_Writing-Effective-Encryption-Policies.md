# Writing Effective Encryption Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Minimize-Microservice-Vulnerabilities/Writing-Effective-Encryption-Policies)

---

## Table of Contents

- Writing Effective Encryption Policies
  - Cilium Network Policy Overview
  - Complete Cilium Network Policy
  - Verify Encrypted Traffic Between Pods
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Minimize Microservice Vulnerabilities

# Writing Effective Encryption Policies

In this guide, you'll learn how to configure robust Pod-to-Pod encryption using a Cilium network policy. This policy ensures that outbound traffic (egress) for your application – for example, "myapp" – is encrypted and secure within your Kubernetes cluster.

## Cilium Network Policy Overview

The Cilium network policy is defined with key components to enforce encryption for your application's traffic. Here’s a breakdown of the essential elements:

1.  **API Version**: The configuration uses `"cilium.io/v2"`, specifying that this is a Cilium-specific network policy.
2.  **Kind**: The policy type is set as `CiliumNetworkPolicy`, indicating that Cilium will manage the enforcement.
3.  **Metadata**: The policy is named `allow-encrypted-traffic`.
4.  **Endpoint Selector**: It targets all pods with the label `app: myapp`, ensuring that the policy applies specifically to your application.
5.  **Egress Rules**: The rules allow outbound traffic directed to pods with the same label (`app: myapp`) over TCP port 80. This ensures encrypted traffic flows only to designated pods.

## Complete Cilium Network Policy

Below is the full YAML configuration for the Cilium network policy:

```
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: allow-encrypted-traffic
spec:
  endpointSelector:
    matchLabels:
      app: myapp
  egress:
  - toEndpoints:
    - matchLabels:
        app: myapp
    toPorts:
    - ports:
      - port: "80"
        protocol: TCP
```

This policy is similar to standard Kubernetes network policies but includes additional settings to handle encrypted traffic effectively.

## Verify Encrypted Traffic Between Pods

To ensure that traffic between pods is properly encrypted, you can capture and inspect network packets using the `tcpdump` utility. Follow these steps:

1.  **Launch a Pod Shell**: Open a shell session in one of the pods.
2.  **Install tcpdump**: Update the package list and install `tcpdump`.
3.  **Monitor Network Traffic**: Use `tcpdump` to capture packets on the `eth0` interface.

Run the following commands:

```
kubectl exec -it <pod-name> -- /bin/bash
apt-get update && apt-get install -y tcpdump
tcpdump -i eth0 -nn
```

> [!important]
> **Note**
>
> Ensure you replace `<pod-name>` with the actual name of your pod when executing the commands.

By monitoring the network interface using `tcpdump`, you can verify that no unencrypted packets are transmitted. When encryption is properly enabled, the captured traffic should appear encrypted and secure.

## Conclusion

By following the steps outlined in this tutorial, you can effectively control and secure Pod-to-Pod communication within your Kubernetes environment using Cilium network policies. This approach not only enhances the security of your applications but also ensures compliance with encryption best practices.

For more information about Kubernetes network policies and advanced security configurations, refer to the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Cilium Documentation](https://docs.cilium.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/7431dd03-f5c2-4ebb-b94a-2d35615bbd8c/lesson/0ece2d20-ac81-43a2-8732-bd861099d668)**
>
> Watch video content
