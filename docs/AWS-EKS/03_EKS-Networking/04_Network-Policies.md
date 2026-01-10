# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/EKS-Networking/Network-Policies)

---

## Table of Contents

- Network Policies
  - CNI Plugins & Policy Enforcement
  - Demo: Enabling and Testing Network Policies
  - Inspecting the eBPF Agent Logs
  - Learn More
  - Watch Video

---

## Content

AWS EKS

EKS Networking

# Network Policies

Kubernetes Network Policies enable fine-grained control over Pod-to-Pod traffic (ingress and egress). While some CNI plugins like Calico pioneered policy enforcement, AWS VPC CNI now supports native NetworkPolicies using eBPF in the node kernel—bringing security rules closer to your application manifests.

![The image illustrates network policy concepts, featuring icons for Calico, CNI plugins, and network policies in various colors and shapes.](https://kodekloud.com/kk-media/image/upload/v1752862797/notes-assets/images/AWS-EKS-Network-Policies/network-policy-calico-cni-icons.jpg)

By embedding network rules alongside your Deployment YAML, you avoid external firewall tickets or manual IP table edits. As your application stack grows—databases, caches, external services—the same declarative NetworkPolicy objects evolve with it.

![The image illustrates a network traffic blocking concept, showing a Virtual Private Cloud (VPC) with a Container Network Interface (VPC-CNI) connected to a Network Policy.](https://kodekloud.com/kk-media/image/upload/v1752862798/notes-assets/images/AWS-EKS-Network-Policies/vpc-cni-network-traffic-blocking.jpg)

## CNI Plugins & Policy Enforcement

| CNI Plugin  | Native NetworkPolicy Support | Enforcement Mechanism |
| ----------- | ---------------------------- | --------------------- |
| Calico      | Yes                          | iptables / eBPF       |
| AWS VPC CNI | Yes (with flag)              | eBPF in Linux kernel  |
| Flannel     | Requires extension           | iptables              |

> [!important]
> **Note**
>
> AWS VPC CNI’s eBPF agent installs tiny packet-filter programs on each node. It intercepts traffic before it reaches the container network namespace.

![The image shows logos for three network traffic blocking tools: Flannel, Calico, and VPC-CNI.](https://kodekloud.com/kk-media/image/upload/v1752862798/notes-assets/images/AWS-EKS-Network-Policies/network-traffic-blocking-tools-logos.jpg)

Traffic hits eBPF hooks that enforce ingress and egress rules defined by Kubernetes NetworkPolicy objects:

![The image illustrates network traffic blocking, showing a pod with ingress and egress controlled by a network policy, connected to a node and a Container Network Interface (CNI).](https://kodekloud.com/kk-media/image/upload/v1752862800/notes-assets/images/AWS-EKS-Network-Policies/network-traffic-blocking-pod-diagram.jpg)

## Demo: Enabling and Testing Network Policies

This walkthrough uses an EKS cluster with AWS VPC CNI and `--enable-network-policy=true`.

1.  Verify nodes and pods:

    ```
    kubectl get nodes
    kubectl get pods --all-namespaces
    ```

2.  Ensure no policies exist:

    ```
    kubectl get networkpolicies --all-namespaces
    # No resources found
    ```

3.  Inspect the `aws-node` DaemonSet for policy flags:

    ```
    kubectl get daemonset aws-node -n kube-system -o yaml | grep -A3 enable-network-policy
    ```

    ```
    - args:
      - --enable-network-policy=true
    image: amazon/aws-network-policy-agent:v1.0.8-eksbuild.1
    ```

4.  Launch an Alpine pod and install `curl`:

    ```
    kubectl run alpine --image=alpine --restart=Never -- sleep 1d
    kubectl exec -it alpine -- apk add --no-cache curl
    ```

5.  Test egress connectivity:

    ```
    kubectl exec alpine -- curl -I https://kubernetes.io
    ```

6.  Apply a **default-deny egress** policy:

    ```
    # default-deny.yaml
    apiVersion: networking.k8s.io/v1
    kind: NetworkPolicy
    metadata:
      name: default-deny-egress
    spec:
      podSelector: {}
      policyTypes:
        - Egress
    ```

    ```
    kubectl apply -f default-deny.yaml
    kubectl get networkpolicies
    ```

    Now all outbound traffic is blocked:

    ```
    kubectl exec alpine -- curl -I https://kubernetes.io
    # curl: (6) Could not resolve host: kubernetes.io
    ```

> [!important]
> **Warning**
>
> A default-deny policy stops **all** egress. Verify you’ve whitelisted required endpoints before applying to production Pods.

You can then craft allow-rules to permit only specific ports, CIDR ranges, or peer Pods.

## Inspecting the eBPF Agent Logs

On any node running `aws-node`, view the network policy agent logs:

```
sudo tail -f /var/log/aws-routed-eni/network-policy-agent.log
```

Typical entries include:

```
{"level":"info","msg":"Pod has an Ingress hook attached","progFD":16,"mapName":"ingress_map"}
{"level":"info","msg":"Pod has an Egress hook attached","progFD":18,"mapName":"egress_map"}
{"level":"info","msg":"Successfully attached Ingress TC probe","pod":"alpine-xxxxx","namespace":"default"}
{"level":"info","msg":"Successfully attached Egress TC probe","pod":"alpine-xxxxx","namespace":"default"}
```

These eBPF probes enforce your NetworkPolicy at the kernel level—packets are dropped before reaching the container.

![The image is a summary slide with five key points about a Kubernetes feature related to VPC-CNI, eBPF, network proximity, application-native firewall, and team communication. The design includes colorful numbered arrows and a gradient background.](https://kodekloud.com/kk-media/image/upload/v1752862801/notes-assets/images/AWS-EKS-Network-Policies/kubernetes-vpc-cni-ebpf-summary-slide.jpg)

## Learn More

- [Kubernetes NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [AWS VPC CNI Plugin](https://github.com/aws/amazon-vpc-cni-k8s)
- [eBPF Overview](https://ebpf.io/)

By combining Kubernetes Network Policies with AWS VPC CNI’s eBPF enforcement, you achieve an application-centric firewall that lives alongside your manifests—no extra tickets, no manual IP tables, just declarative security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/fdf5f38f-ffcc-4b70-bde9-751c06d39ac1/lesson/d532d4d0-52db-4bf8-a08d-6ebff5954e39)**
>
> Watch video content
