# Installing Istio Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Installing-Istio-Introduction)

---

## Table of Contents

- Installing Istio Introduction
  - Installing Istio with Istioctl
  - Verifying the Istio Installation
  - Watch Video

---

## Content

Istio Service Mesh

Istio Introduction

# Installing Istio Introduction

In this article, we will explore how to install Istio on your Kubernetes cluster. There are three primary approaches:

1.  Using the Istioctl command-line utility.
2.  Deploying via an Istio operator.
3.  Installing with a Helm package.

For this guide, we will install Istio using Istioctl.

## Installing Istio with Istioctl

To deploy Istio using Istioctl, execute the following command using the demo profile:

```
$ istioctl install --set profile=demo -y
Detected that your cluster does not support third party JWT authentication. Falling back to less secure first party JWT. See https://istio.io/v1.9/docs/ops/best-practices/security/#configure-third-party-service-account-tokens for details.
∘ Istio core installed
∘ Istiod installed
∘ Ingress gateways installed
∘ Egress gateways installed
Installation complete
```

> [!important]
> **Note**
>
> This command deploys a control plane component named Istiod in a new namespace (typically the Istio system namespace). In addition to Istiod — which includes key components such as Citadel, Pilot, and Galley — Istioctl deploys the Istio Ingress Gateway and the Istio Egress Gateway. Several Kubernetes service objects are also created to expose these services within your cluster.

Different profiles are available to suit various environments such as production or performance testing. For this demo, the demo profile is used.

## Verifying the Istio Installation

Once the installation completes, verify that Istio has been correctly deployed by running:

```
$ istioctl verify-install
1 Istio control planes detected, checking --revision "default" only
✔ Deployment: istio-ingressgateway.istio-system checked successfully
✔ PodDisruptionBudget: istio-ingressgateway.istio-system checked successfully
✔ Role: istio-ingressgateway-sds.istio-system checked successfully
✔ RoleBinding: istio-ingressgateway-sds.istio-system checked successfully
✔ Service: istio-ingressgateway.istio-system checked successfully
✔ ServiceAccount: istio-ingressgateway-service-account.istio-system checked successfully
✔ Deployment: istio-egressgateway.istio-system checked successfully
✔ PodDisruptionBudget: istio-egressgateway.istio-system checked successfully
✔ Role: istio-egressgateway-sds.istio-system checked successfully
✔ RoleBinding: istio-egressgateway-sds.istio-system checked successfully
✔ Service: istio-egressgateway.istio-system checked successfully
✔ ServiceAccount: istio-egressgateway-service-account.istio-system checked successfully
✔ ClusterRole: istiod.istio-system checked successfully
✔ EnvoyFilter: tcp-stats-filter-1.9.istio-system checked successfully
Checked 12 custom resource definitions
Checked 3 Istio Deployments
✔ Istio is installed and verified successfully
```

This verification step confirms that Istio extends Kubernetes by adding custom resource definitions (CRDs) and deploying essential components into your cluster.

> [!important]
> **Next Steps**
>
> Stay tuned for the upcoming demo where we will show Istio in action and demonstrate its capabilities within your cluster.

For further reading on Istio and Kubernetes, check out the following resources:

- [Istio Documentation](https://istio.io/latest/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Helm Charts Repository](https://artifacthub.io/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/0dac29fe-b45b-4612-acda-b404f048b1ad)**
>
> Watch video content
