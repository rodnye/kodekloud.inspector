# Observability Falco Overview and Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Observability-Falco-Overview-and-Installation)

---

## Table of Contents

- Observability Falco Overview and Installation
  - How Falco Works
  - Installation Methods
  - Next Steps
  - Links and References
  - Watch Video
    - Installing Falco on a Linux Node
    - Deploying Falco in Kubernetes via Helm

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Observability Falco Overview and Installation

In this guide, you’ll learn how to install Falco to enhance threat detection and analysis in your Kubernetes environment. Falco is an open-source runtime security tool that inspects system calls from user-space applications, applying customizable rules to identify suspicious behavior.

## How Falco Works

Falco captures kernel events via two primary methods, then filters them through its policy engine:

| Capture Method | Description                                                                | Pros & Cons                                                                              |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Kernel Module  | Inserts a module into the Linux kernel to intercept syscalls.              | **Pros:** High performance<br>**Cons:** Intrusive; may be restricted on managed clusters |
| eBPF           | Uses Extended Berkeley Packet Filter to attach probes to kernel functions. | **Pros:** Safer, non-intrusive<br>**Cons:** Slightly higher overhead                     |

Once captured, events flow through Falco’s user-space components—including Sysdig libraries and the Falco policy engine—where they’re evaluated against rules. Alerts can be forwarded to syslog, standard output, Slack, email, and other sinks.

![The image is a diagram of Falco's architecture, showing the interaction between applications, syscalls, the Falco kernel module, eBPF, and components like the policy engine, libraries, and Falco rules, leading to output.](https://kodekloud.com/kk-media/image/upload/v1752880892/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Falco-Overview-and-Installation/falco-architecture-diagram-syscalls.jpg)

## Installation Methods

You have two common ways to deploy Falco, depending on your access level and platform restrictions:

| Method                        | Use Case                                    | Advantages                                        |
| ----------------------------- | ------------------------------------------- | ------------------------------------------------- |
| Native Linux Installation     | Full root access to a Linux node            | Isolated from Kubernetes control plane            |
| Kubernetes DaemonSet via Helm | Managed clusters or restricted environments | Easy upgrades and centralized management via Helm |

### Installing Falco on a Linux Node

Use this approach if you can install packages and kernel modules directly on your host. It ensures Falco remains operational even if your Kubernetes control plane is compromised.

> [!important]
> **Warning**
>
> Ensure you have the correct `linux-headers-$(uname -r)` package. Mismatched headers can prevent the Falco kernel module from building.

```
# Add the Falco GPG key and apt repo
curl -s https://falco.org/repo/falcosecurity-3672BA8F.asc | apt-key add -
echo "deb https://download.falco.org/packages/deb stable main" \
  | tee /etc/apt/sources.list.d/falcosecurity.list

# Update and install
apt-get update -y
apt-get install -y linux-headers-$(uname -r) falco

# Enable and start the Falco service
systemctl enable --now falco
```

### Deploying Falco in Kubernetes via Helm

If you’re on a managed Kubernetes service or prefer Kubernetes-native deployment, use Helm to install Falco as a DaemonSet:

> [!important]
> **Note**
>
> You can customize Falco’s configuration by passing values files (`-f values.yaml`) to `helm install`.

```
# Add the Falco Helm repository
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm repo update

# Install Falco
helm install falco falcosecurity/falco
```

After installation, verify that Falco agents are running on each node:

```
kubectl get pods -l app=falco
# Example output:
# NAME         READY   STATUS    RESTARTS   AGE
# falco-7grdt  1/1     Running   0          2m21s
# falco-tmq28  1/1     Running   0          2m21s
```

## Next Steps

- Customize or create [Falco rules](https://falco.org/docs/rules/) to detect specific threats.
- Integrate alerts with your SIEM, Slack, or PagerDuty for real-time notifications.
- Monitor Falco logs and metrics to fine-tune performance and rule accuracy.

## Links and References

- [Falco Documentation](https://falco.org/docs/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [Aqua Security Tracee (eBPF)](https://github.com/aquasecurity/tracee)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/21203b3d-64b3-4ed1-ab02-2a111b6e7e9d)**
>
> Watch video content
