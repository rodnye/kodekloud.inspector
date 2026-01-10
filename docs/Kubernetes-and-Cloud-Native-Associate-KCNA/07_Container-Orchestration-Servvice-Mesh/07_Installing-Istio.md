# Installing Istio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Installing-Istio)

---

## Table of Contents

- Installing Istio
  - Step 1: Install Istio via istioctl
  - Step 2: Verify the Installation
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Installing Istio

In this lesson, you will learn how to install Istio on your Kubernetes cluster. There are three primary approaches for installing Istio:

1.  Using the command-line utility, istioctl.
2.  Using an Istio operator.
3.  Using a Helm package.

For this lesson, we will use istioctl.

> [!important]
> **Note**
>
> The demo profile is used in this guide because it is ideal for testing and development purposes. Other profiles are available for production and performance testing environments.

## Step 1: Install Istio via istioctl

Run the following command to install Istio with the demo profile:

```
$ istioctl install --set profile=demo -y
Detected that your cluster does not support third party JWT authentication. Falling
back to less secure first party JWT. See https://istio.io/v1.9/docs/ops/best-practices/security/#configure-third-party-service-account-tokens for details.
✔ Istio core installed
✔ Istiod installed
✔ Ingress gateways installed
✔ Egress gateways installed
Installation complete
```

When you execute this command, Istio is deployed to your cluster in a dedicated namespace (typically named the Istio system namespace). Inside this namespace, the Istio operator deploys critical components such as Citadel, Pilot, and Galley. In addition, it sets up the Istio ingress and egress gateways along with several Kubernetes service objects that expose these services within your cluster.

## Step 2: Verify the Installation

After the installation completes, confirm that Istio is functioning correctly by running:

```
$ istioctl verify-install
```

This command displays a comprehensive list of resources, including the Custom Resource Definitions (CRDs) that extend Kubernetes with Istio functionality.

In the upcoming demonstration, we will explore how these components work together, with a detailed discussion on gateways and their role within an Istio-enabled environment.

For additional information, visit the [Istio Documentation](https://istio.io/latest/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/ccb9c0e6-50a7-4f36-9864-fe88cbd6ccf6)**
>
> Watch video content
