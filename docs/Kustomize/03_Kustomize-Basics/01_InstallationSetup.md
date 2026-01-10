# InstallationSetup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/InstallationSetup)

---

## Table of Contents

- InstallationSetup
  - Prerequisites
  - Supported Platforms
  - Install Kustomize
  - Verify the Installation
  - Links and References
  - Watch Video

---

## Content

Kustomize

Kustomize Basics

# InstallationSetup

Learn how to install and configure Kustomize on your local machine. This guide covers the prerequisites, installation steps, and verification process for Linux, macOS, and Windows.

## Prerequisites

> [!important]
> **Note**
>
> Before you begin, ensure you have the following:
>
> - A running Kubernetes cluster
> - `kubectl` installed and configured to communicate with your cluster

## Supported Platforms

Kustomize provides a single installation script that auto-detects your operating system and installs the appropriate binary.

| Operating System     | Installation Method                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ----- |
| Linux                | `curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" \\    | bash` |
| macOS                | `curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" \\    | bash` |
| Windows (PowerShell) | `iwr -useb "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.ps1" \\ | iex`  |

## Install Kustomize

Run the official installation script:

```
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
```

This will download the latest Kustomize binary and place it in your current directory. To make it globally available, move it into your `PATH`:

```
mv kustomize /usr/local/bin/
chmod +x /usr/local/bin/kustomize
```

## Verify the Installation

Check that Kustomize is installed correctly by running:

```
kustomize version --short
```

Expected output:

```
{kustomize/v4.4.1 2021-11-11T23:36:27Z}
```

If you don’t see a version string:

1.  Close and reopen your terminal to refresh `PATH`.
2.  Rerun the installation script from above.

> [!important]
> **Warning**
>
> If the `kustomize` command is not found after installation, ensure `/usr/local/bin` (or your chosen install directory) is included in your `PATH` environment variable.

## Links and References

- [Kustomize GitHub Repository](https://github.com/kubernetes-sigs/kustomize)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Installation Guide](https://kubernetes.io/docs/tasks/tools/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/5e33e25a-3607-4e71-823a-76a38ae0a3c0)**
>
> Watch video content
