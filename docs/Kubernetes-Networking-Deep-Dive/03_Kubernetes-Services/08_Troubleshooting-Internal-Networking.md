# Troubleshooting Internal Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Troubleshooting-Internal-Networking)

---

## Table of Contents

- Troubleshooting Internal Networking
  - 1. Troubleshooting CNIs
  - 2. Troubleshooting Network Policies
  - 3. Troubleshooting Service Discovery & DNS
  - 4. Troubleshooting Services, Endpoints & Pods
  - Links and References
  - Watch Video

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Troubleshooting Internal Networking

When Kubernetes networking breaks, identifying the root cause quickly is crucial. This guide highlights common troubleshooting scenarios—CNI issues, network policies, DNS/service discovery, and service-endpoint-pod connectivity. Follow the structured steps below to restore cluster networking.

![The image shows a slide with the title "Section Objectives" and a point stating "Discuss common scenarios that will require troubleshooting."](https://kodekloud.com/kk-media/image/upload/v1752880370/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/section-objectives-troubleshooting-scenarios.jpg)

Networking in Kubernetes depends on: ![The image shows four colored icons representing different scenarios: CNIs, Network Policies, Service Discovery and DNS, and Services, Endpoints, and Pods.](https://kodekloud.com/kk-media/image/upload/v1752880371/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/colored-icons-network-scenarios.jpg)

| Scenario                | Focus                             | Key Commands                                        |
| ----------------------- | --------------------------------- | --------------------------------------------------- |
| CNI                     | Pod network agents & connectivity | `kubectl get pods -n kube-system`, `cilium status`  |
| Network Policies        | Ingress/Egress filters            | `kubectl get networkpolicies`, `ping`, `nc`, `curl` |
| Service Discovery & DNS | CoreDNS health & resolution       | `kubectl logs coredns`, `nslookup`, `dig`           |
| Services & Endpoints    | Service definitions & backends    | `kubectl describe svc`, `kubectl get endpoints`     |

---

## 1\. Troubleshooting CNIs

All Container Network Interfaces (CNIs) run as pods. Start by validating their status:

1.  **Check CNI pod status**
    - Run `kubectl get pods -n kube-system` and look for restarts or CrashLoop.
    - Inspect events: `kubectl describe pod <cni-pod> -n kube-system`.
    - Review logs: `kubectl logs <cni-pod> -n kube-system`.

    ![The image illustrates a diagram showing "CNI Pods" with arrows pointing to "Logs" and "Events," indicating data flow or communication.](https://kodekloud.com/kk-media/image/upload/v1752880371/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/cni-pods-logs-events-diagram.jpg)

2.  **Verify node health**
    - Confirm `kubelet` and the container runtime (Docker, containerd) are Running.
    - For Cilium users, `cilium node status` shows kernel modules, BPF maps, and node health.

    ![The image is an informational graphic about "Cilium," featuring its logo and three sections: Requirements, Verification, and Tool Utilization, each with brief descriptions.](https://kodekloud.com/kk-media/image/upload/v1752880373/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/cilium-logo-requirements-verification-tool.jpg)

3.  **Use CNI-specific tools**  
    Many CNIs include CLIs and connectivity tests:
    - **Cilium CLI**: `cilium status`, `cilium connectivity test`
    - **Hubble**: Visualize flows and policy enforcement

    > [!important]
    > **Note**
    >
    > Deploy automated connectivity tests to validate pod-to-pod networking before diving deeper.

    ![The image is a diagram illustrating the concept of CNIs, showing connections between command-line utilities, automated testing deployments, and status checking, with various geometric shapes in the center.](https://kodekloud.com/kk-media/image/upload/v1752880374/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/cni-diagram-command-line-utilities.jpg)  
    ![The image lists three CNIs: Cilium CLI, Networking Connectivity Test, and Hubble, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752880374/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/cni-list-cilium-hubble-networking.jpg)

---

## 2\. Troubleshooting Network Policies

Misconfigured or missing NetworkPolicies can silently block traffic:

1.  **Locate policies**

    ```
    kubectl get networkpolicies --all-namespaces
    ```

    If no policies exist, skip to other troubleshooting areas.

2.  **Review selectors and intent**
    - Ensure `podSelector` and `namespaceSelector` match the intended workload.
    - Overly broad selectors may catch nothing; too narrow may block all traffic.

3.  **Verify ingress/egress rules**  
    An empty list blocks traffic by default. Confirm each rule explicitly allows the necessary ports and protocols.

    > [!important]
    > **Warning**
    >
    > An empty network policy blocks all ingress and egress. Always define at least one rule.

    ![The image illustrates network policies in a Kubernetes environment, showing a pod's communication being blocked by network policies, with potential issues like misconfiguration, deployment errors, and accidental policy deletion.](https://kodekloud.com/kk-media/image/upload/v1752880376/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/kubernetes-network-policies-communication-issues.jpg)  
    ![The image is a diagram titled "Network Policies" with three steps: "Review Policy Purpose," "Check Policy Selectors," and "Verify Policy Rules," accompanied by an icon of a magnifying glass over a gear.](https://kodekloud.com/kk-media/image/upload/v1752880377/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/network-policies-diagram-steps.jpg)  
    ![The image outlines steps for network policies, including reviewing policy purpose, checking policy selectors, and verifying policy rules, with a note on ensuring ingress and egress rules are defined.](https://kodekloud.com/kk-media/image/upload/v1752880377/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/network-policies-steps-outline.jpg)

4.  **Test connectivity**  
    Launch pods in both allowed and denied namespaces and validate traffic flows:
    - `ping <pod-IP>`
    - `nc -zv <pod-IP> <port>`
    - `curl http://<service>`

    ![The image illustrates network policies with a focus on testing connectivity using tools like ping, netcat, nmap, and curl, and shows two namespaces each containing a pod.](https://kodekloud.com/kk-media/image/upload/v1752880378/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/network-policies-connectivity-testing-tools.jpg)

---

## 3\. Troubleshooting Service Discovery & DNS

CoreDNS manages internal name resolution. Follow these steps:

1.  **Check CoreDNS pods**

    ```
    kubectl get pods -n kube-system -l k8s-app=kube-dns
    ```

    Ensure pods are Running, then `kubectl logs` for errors.

2.  **Inspect ConfigMap**

    ```
    kubectl get configmap coredns -n kube-system -o yaml
    ```

    Look for syntax errors or missing zones.

3.  **Validate pod DNS settings**  
    Inside a test pod, check `/etc/resolv.conf` matches your cluster DNS IP.
4.  **Test DNS resolution**

    ```
    nslookup kubernetes.default
    dig @<coredns-ip> my-service.my-namespace.svc.cluster.local
    ```

    ![The image is about service discovery and DNS, focusing on CoreDNS. It highlights checking the CoreDNS configmap in the kube-system namespace and lists possible issues like incorrect reconfiguration, DNS file deletion, and specific namespace resolution.](https://kodekloud.com/kk-media/image/upload/v1752880379/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/coredns-service-discovery-dns-issues.jpg)

---

## 4\. Troubleshooting Services, Endpoints & Pods

Connectivity issues here often stem from selector or port mismatches:

1.  **Check pod health**
    - Pods should be Running without restarts.
    - Look for CrashLoopBackOff in `kubectl describe pod`.
    - Review logs for errors or resource exhaustion.

    ![The image is a diagram about "Services, Endpoints, and Pods," showing a pod icon with sections for "Events," "Status," and "Logs," alongside a checklist for pod health and issues.](https://kodekloud.com/kk-media/image/upload/v1752880380/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/services-endpoints-pods-diagram.jpg)

2.  **Validate services**
    - Confirm service type suits your use case (ClusterIP, NodePort, LoadBalancer).
    - Check `spec.selector` labels match pod labels.
    - Verify service ports map to container ports.
    - Ensure the application listens on the advertised port.

    ![The image is a diagram titled "Service Validation" with six connected steps: Confirm Service Type, Understand Service Purpose, Validate Pod Selectors, Verify Port Configurations, Ensure Proper Pod Configuration, and Validate Image Port Configuration.](https://kodekloud.com/kk-media/image/upload/v1752880381/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/service-validation-six-steps-diagram.jpg)

3.  **Compare Services and Endpoints**  
    Each Service should have a corresponding Endpoints object:

    ```
    kubectl get endpoints <service-name>
    ```

    Verify the IPs match the target pods to avoid silent failures.

    ![The image illustrates the relationship between services, endpoints, and IPs, highlighting a potential loss of connectivity.](https://kodekloud.com/kk-media/image/upload/v1752880382/notes-assets/images/Kubernetes-Networking-Deep-Dive-Troubleshooting-Internal-Networking/services-endpoints-ips-connectivity-illustration.jpg)

4.  **Port-forward as needed**

    ```
    kubectl port-forward svc/<service> 8080:<port>
    ```

    This isolates the service without external load balancers.

---

Next, apply these techniques on a live cluster to reinforce your troubleshooting skills.

## Links and References

- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Cilium Documentation](https://docs.cilium.io/)
- [CoreDNS Official Guide](https://coredns.io/manual/toc/)
- [NetworkPolicy Reference](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/026468d5-50d5-4836-a33d-63da44f7ca51)**
>
> Watch video content
