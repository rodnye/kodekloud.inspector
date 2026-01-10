# Installing Lens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Lens-Kubernetes-IDE/Lens-Introduction/Installing-Lens)

---

## Table of Contents

- Installing Lens
  - 1. Download Lens
  - 2. Install Lens
  - 3. Launch Lens & Add Your Cluster
  - Links and References
  - Watch Video
    - macOS
    - Windows
    - Linux

---

## Content

Lens - Kubernetes IDE

Lens Introduction

# Installing Lens

Lens is an open-source, desktop **Kubernetes IDE** that simplifies cluster management, provides real-time metrics, and accelerates your development workflow.

## 1\. Download Lens

Visit the official site to fetch the latest Lens installer:

1.  Open your browser and go to [k8slens.dev](https://k8slens.dev).
2.  The site detects your OS automatically—click **Download** for your platform.

> [!important]
> **Note**
>
> Always download Lens from the official site to ensure you get the latest security fixes and features.

| Operating System | Installer Type | Download Link       |
| ---------------- | -------------- | ------------------- |
| macOS            | `.dmg`         | https://k8slens.dev |
| Windows          | `.exe`         | https://k8slens.dev |
| Linux            | `.AppImage`    | https://k8slens.dev |

## 2\. Install Lens

Follow the steps below for your operating system.

### macOS

1.  Double-click the downloaded `.dmg` file.
2.  Drag **Lens.app** into your **Applications** folder.
3.  Launch Lens from **Spotlight** or **Finder**.

### Windows

1.  Run the downloaded `.exe` installer.
2.  Follow the on-screen wizard to accept the license and choose an install path.
3.  Finish the setup and open Lens from the Start menu.

### Linux

1.  Download the appropriate `.AppImage` for your distribution.
2.  Make the file executable and launch it:

    ```
    chmod +x Lens.AppImage
    ./Lens.AppImage
    ```

> [!important]
> **Warning**
>
> On some Linux distributions you may need to install `fuse` or `libfuse2` before running the AppImage. Check your distro’s package manager if you encounter errors.

## 3\. Launch Lens & Add Your Cluster

1.  Open Lens via your Applications menu, Start menu, or by running `Lens.AppImage`.
2.  In the left sidebar, click **Add Cluster**.
3.  Drag-and-drop your `kubeconfig` file or select an existing context from the list.
4.  Click **Add** to register the cluster.

Your cluster appears in the sidebar—click it to view workloads, logs, and live metrics.

## Links and References

- [Lens Documentation](https://docs.k8slens.dev/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Configuration Files (`kubeconfig`)](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/lens-kubernetes-ide/module/5612678e-a690-4e4e-b43d-966183dffdbf/lesson/75bc9837-dae8-4b2e-a969-79c71a2caa9d)**
>
> Watch video content
