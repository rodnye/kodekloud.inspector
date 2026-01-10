# Installing Istioctl - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Installing-Istioctl)

---

## Table of Contents

- Installing Istioctl
  - Creating a Minikube Cluster
  - Switching to a VM-based Driver
  - Installing the Istio Control Plane
  - Useful Resources
  - Watch Video
    - Verifying the Istio Installation

---

## Content

Istio Service Mesh

Istio Introduction

# Installing Istioctl

This guide explains how to set up Minikube and install the Istio control plane using Istioctl. Before you begin, ensure that Minikube is installed on your system.

## Creating a Minikube Cluster

To start, create a cluster using Minikube. Running the standard command:

```
minikube start
```

will initiate a cluster with the default driver. In this demonstration, Docker is already running on your system and is configured as the default driver. When Docker is detected, Minikube deploys the cluster inside a Docker container.

If you encounter the following error:

"Due to the networking limitations of Docker on Darwin, the ingress add-on is not supported."

it indicates that Docker’s limitations on macOS affect the ingress add-on support.

> [!important]
> **Tip**
>
> If you see the above error, follow the steps below to switch to a VM-based driver.

## Switching to a VM-based Driver

For macOS users experiencing issues with the ingress add-on on the Docker driver, you need to delete the existing cluster and restart Minikube using a VM-based driver. Execute the steps below to perform this switch:

```
minikube delete
# Output:
# 🔥  Deleting "minikube" in docker ...
# 🔥  Deleting container "minikube"
# 🚜  Removing /Users/istio training/.minikube/machines/minikube ...
minikube start --vm=true
# Sample output:
# 🚀  minikube v1.16.0 on Darwin 10.15.7
# ✨  Automatically selected the hyperkit driver
# 🔄  Starting control plane node minikube in cluster minikube
# 🛠️  Creating hyperkit VM (CPUs=2, Memory=4000MB, Disk=20000MB) ...
# 📦  Preparing Kubernetes v1.20.0 on Docker 20.10.0 ...
# 🔑  Generating certificates and keys ...
# 🌟  Booting up control plane ...
# 🛠️  Configuring RBAC rules ...
# 🔍  Verifying Kubernetes components...
# 🌟  Enabled addons: storage-provisioner, default-storageclass
minikube addons enable ingress
# Output:
# 🌟  The "ingress" addon is enabled
```

With the ingress add-on now enabled and Minikube running on a VM-based driver, you are ready to install the Istio control plane.

## Installing the Istio Control Plane

Next, install the Istio control plane which is essential for managing Istio’s service mesh features. The following command downloads the latest Istio release directly into your current directory. At the time of this recording, the latest release is Istio 1.10.3; your version might differ.

Run the following command:

```
curl -L https://istio.io/downloadIstio | sh -
```

Sample output:

```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                  Dload  Upload   Total   Spent      Left  Speed
100   102  100   102  100    44    0:00:02  0:00:02 --:--:--    44
100  4573  100  4573  100  1697    0:00:02  0:00:02 --:--:--  1697
Downloading istio-1.10.3 from https://github.com/istio/istio/releases/download/1.10.3/istio-1.10.3-osx.tar.gz ...
Istio 1.10.3 Download Complete!
```

Istio is now downloaded into an `istio-1.10.3` directory on your system. Within this directory, you will find the LICENSE, README files, a `samples` directory with various examples, and the Istio client binary in the `bin` directory.

> [!important]
> **Configuration Reminder**
>
> Ensure you add the Istio client binary to your system PATH to easily run Istio commands:
>
> export PATH="$PATH:/path/to/istio-1.10.3/bin"
>
> Replace `/path/to/istio-1.10.3/bin` with the actual path to your Istio installation.

### Verifying the Istio Installation

Navigate into the Istio package directory and list its contents:

```
cd istio-1.10.3/
ls
```

You should see:

```
LICENSE         README.md       bin           manifest.yaml  manifests  samples  tools
```

Check the contents of the `bin` directory:

```
ls bin/
```

Output should include the `istioctl` binary. You can also explore the `samples` directory by running:

```
ls samples/
```

This directory contains various sample applications and additional resources. For more comprehensive usage details, check the [official Istio documentation](https://istio.io/latest/docs/setup/install/).

Finally, verify that Istio is installed correctly by running:

```
istioctl version
```

The output should display the installed version, for example, Istio 1.10.3. If the Istio control plane is not detected, follow the official installation steps to deploy it on your Kubernetes cluster.

With Istio installed and your Minikube cluster properly set up, you are now ready to explore further Istio features and integrations.

## Useful Resources

| Resource Type | Use Case                                 | Example Command/Link                                                                  |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Minikube      | Local Kubernetes cluster setup           | [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)                          |
| Istio         | Service mesh installation and management | [Istio Installation Guide](https://istio.io/latest/docs/setup/install/)               |
| Kubernetes    | Orchestrating containerized applications | [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) |

For additional details related to Istio and Kubernetes, consider visiting:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Istio Documentation](https://istio.io/latest/docs/)

Happy learning and enhancing your service mesh environment with Istio!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/12a627c5-7aec-43ae-a211-1980cf9a9255)**
>
> Watch video content
