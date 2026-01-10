# Installation and configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Introduction-to-Helm/Installation-and-configuration)

---

## Table of Contents

- Installation and configuration
  - Installing Helm on Linux
  - Watch Video
  - Practice Lab
    - Using Snap
    - Using APT on Debian/Ubuntu
    - Using pkg

---

## Content

Helm for Beginners

Introduction to Helm

# Installation and configuration

In this guide, you'll learn how to install Helm on Linux systems. Before you begin, make sure that you have a functional Kubernetes cluster and that the kubectl CLI is installed and configured on your local machine. Your kubeconfig file should include the correct credentials to connect to your intended Kubernetes cluster.

> [!important]
> **Prerequisites**
>
> Ensure that your Kubernetes cluster is up and running and that you have properly set up the kubeconfig file with the correct access details.

Helm can be installed on Linux, Windows, or macOS. This article focuses specifically on installing Helm on Linux operating systems.

## Installing Helm on Linux

### Using Snap

For systems that utilize Snap, you can install Helm with a relaxed sandbox using the classic confinement. This allows Helm to access your kubeconfig file (typically located in your home directory) so it can connect to your Kubernetes cluster. To install Helm using Snap, run the following command:

```
sudo snap install helm --classic
```

### Using APT on Debian/Ubuntu

If you are using an apt-based system such as Debian or Ubuntu, follow these steps to add the necessary repository and install Helm:

```
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

### Using pkg

For systems that use the pkg package manager, install Helm with the following command:

```
pkg install helm
```

> [!important]
> **Further Information**
>
> Always refer to the latest official [Helm documentation](https://helm.sh/docs/) to ensure you are using the most up-to-date installation instructions for your operating system.

With these installation steps completed, you are now ready to practice installing and configuring Helm in your lab environment. Enjoy exploring Helm's capabilities and managing your Kubernetes deployments more efficiently!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/b14dde7e-2c25-418c-a822-a6f4376a1518)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/54b55ff3-2c0c-4f30-b57f-64a0da820624)**
>
> Practice lab
