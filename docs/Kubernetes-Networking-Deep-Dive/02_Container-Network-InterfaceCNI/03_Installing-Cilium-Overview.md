# Installing Cilium Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Installing-Cilium-Overview)

---

## Table of Contents

- Installing Cilium Overview
  - 1. Cilium CLI: Your Primary Management Tool
  - 2. Installation Methods: CLI vs. Helm
  - 3. Observability with Hubble
  - Watch Video

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Installing Cilium Overview

Before diving into the demo, let’s explore the key tools, installation approaches, and observability options for Cilium on Kubernetes.

## 1\. Cilium CLI: Your Primary Management Tool

The [Cilium CLI](https://docs.cilium.io/cilium-cli/) is the go-to command-line utility for installing, managing, and troubleshooting Cilium:

- View the overall status of Cilium components
- Verify network connectivity across endpoints
- Run built-in network tests
- Enable Hubble for deep observability
- Install Cilium and addons

![The image shows a diagram titled "Installation Options and Components" with icons representing a management tool and various Cilium commands: status, connectivity test, hubble enable, and install.](https://kodekloud.com/kk-media/image/upload/v1752880259/notes-assets/images/Kubernetes-Networking-Deep-Dive-Installing-Cilium-Overview/installation-options-components-diagram.jpg)

```
# Check the health of your Cilium cluster
cilium status


# Run a connectivity test between pods
cilium connectivity test


# Enable Hubble for network observability
cilium hubble enable


# Install Cilium into your Kubernetes cluster
cilium install
```

> [!important]
> **Note**
>
> The Cilium CLI v0.14+ supports both direct CLI installs and Helm-style deployments, giving you full flexibility.

## 2\. Installation Methods: CLI vs. Helm

Cilium can be installed in two interchangeable ways:

| Installation Method | Command Example                                     | Benefits                             |
| ------------------- | --------------------------------------------------- | ------------------------------------ |
| Cilium CLI          | `cilium install`                                    | All-in-one tool; built-in validation |
| Helm Chart          | `helm install cilium cilium/cilium --version 1.x.y` | Familiar Helm workflow; chart config |

![The image shows logos for "Cilium" and "Helm" under the title "Installation Options and Components," with a note about the benefits for Helm users who also use the Cilium CLI.](https://kodekloud.com/kk-media/image/upload/v1752880260/notes-assets/images/Kubernetes-Networking-Deep-Dive-Installing-Cilium-Overview/cilium-helm-installation-options-components.jpg)

In this demo, we’ll walk through both methods side by side.

## 3\. Observability with Hubble

[Hubble](https://docs.cilium.io/gettingstarted/hubble/) provides real-time visibility into network flows, service dependencies, and security policies. You can enable it:

- **During** Cilium installation:

  ```
  cilium install --enable-hubble
  ```

- **After** Cilium is up and running:

  ```
  cilium hubble enable
  ```

> [!important]
> **Warning**
>
> You must install Cilium before enabling Hubble, as Hubble relies on core Cilium components.

To interact with Hubble:

```
# Install Hubble CLI
curl -L --remote-name https://github.com/cilium/hubble-cli/releases/latest/download/hubble-linux-amd64.tar.gz
tar xzvf hubble-linux-amd64.tar.gz
sudo mv hubble /usr/local/bin/


# Check Hubble status
hubble status


# Stream live network events
hubble observe
```

---

- [Cilium Documentation](https://docs.cilium.io/)
- [Cilium CLI Reference](https://docs.cilium.io/cilium-cli/)
- [Hubble Observability](https://docs.cilium.io/gettingstarted/hubble/)
- [Helm Charts – Cilium](https://docs.cilium.io/gettingstarted/k8s-install-default/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/a8f11d12-c943-4891-b899-e28bb4a94c03)**
>
> Watch video content
