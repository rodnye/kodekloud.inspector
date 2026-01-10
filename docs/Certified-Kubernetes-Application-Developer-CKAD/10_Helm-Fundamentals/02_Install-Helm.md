# Install Helm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Install-Helm)

---

## Table of Contents

- Install Helm
  - Installing Helm on Linux
  - Watch Video
  - Practice Lab
    - Using Snap
    - Installing Helm on APT-Based Distributions

---

## Content

Certified Kubernetes Application Developer - CKAD

Helm Fundamentals

# Install Helm

Before installing Helm, ensure you have a working Kubernetes cluster and a correctly configured kubectl utility on your local machine. A valid kubeconfig file containing the proper credentials for your target cluster is essential.

> [!important]
> **Prerequisites**
>
> Verify that your Kubernetes setup is operational and that kubectl is set up before proceeding with the Helm installation.

Helm supports Linux, Windows, and macOS environments. This guide focuses on the installation process for Linux systems.

## Installing Helm on Linux

### Using Snap

If your Linux distribution supports Snap, you can install Helm using the Snap package manager. Snap's classic confinement allows Helm unrestricted access to locate your kubeconfig file (typically in your home directory). Execute the following command:

```
sudo snap install helm --classic
```

### Installing Helm on APT-Based Distributions

For Debian, Ubuntu, or similar APT-based distributions, follow these steps:

```
# Install Helm via Snap with classic confinement (if using Snap)
sudo snap install helm --classic


# Add the Helm GPG key to verify package authenticity
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -


# Install apt-transport-https to handle HTTPS repositories
sudo apt-get install apt-transport-https --yes


# Add the official Helm stable repository to your APT sources list
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list


# Update APT and install Helm
sudo apt-get update
sudo apt-get install helm


# Alternatively, on some package-based systems, you might use:
pkg install helm
```

> [!important]
> **Additional Resources**
>
> For the most up-to-date installation instructions and additional configuration details, refer to the [official Helm documentation](https://helm.sh/docs/intro/install/).

/images/Python_Basics-Comments/frame_100.jpg

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/d6591cc0-9129-4745-8d3e-6fddae4632d6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/bc61a673-47c3-4bef-b7f5-12f85c65cbbb/lesson/8a8835c4-1401-4488-b478-db799ee8c75d)**
>
> Practice lab
