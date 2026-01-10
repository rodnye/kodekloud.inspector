# Installing Istio on Your Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Installing-Istio-on-Your-Cluster)

---

## Table of Contents

- Installing Istio on Your Cluster
  - Step 1: Install Istio
  - Step 2: Verify the Istio Installation
  - Next Steps
  - Watch Video
  - Practice Lab

---

## Content

Istio Service Mesh

Istio Introduction

# Installing Istio on Your Cluster

In this lesson, we'll guide you through installing Istio on your Kubernetes cluster using the istioctl command-line tool. This tutorial focuses on using the demo profile, which is ideal for demonstrations and initial testing.

## Step 1: Install Istio

Run the following command to install Istio using the demo profile:

```
istioctl install --set profile=demo -y
```

After executing the command, you should see output resembling:

```
√ Istio core installed
Processing resources for Istiod. Waiting for Deployment/istio-system/istiod
```

This output confirms that the essential Istio core components have been successfully installed and that the resources for Istiod are being processed.

## Step 2: Verify the Istio Installation

Once the installation completes without any errors, several new resources—such as cluster roles, cluster role bindings, and custom resource definitions (CRDs)—will be present in your cluster. To ensure everything is set up correctly, run the following command:

```
istioctl verify-install
```

You should receive output that confirms a single Istio control plane is detected along with successfully verified resources. For example:

```
istiotrain@localhost istio-1.10.3 $ istioctl verify-install
1 Istio control planes detected, checking --revision "default" only
✓ ClusterRole: istiod-istio-system.istio-system checked successfully
✓ ClusterRole: istio-reader-istio-system.istio-system checked successfully
✓ ClusterRoleBinding: istiod-istio-system.istio-system checked successfully
✓ Role: istiod-istio-system.istio-system checked successfully
✓ RoleBinding: istiod-istio-system.istio-system checked successfully
✓ ServiceAccount: istio-reader-service-account.istio-system checked successfully
✓ ServiceAccount: istiod-service-account.istio-system checked successfully
✓ ValidatingWebhookConfiguration: istiod-istio-system.istio-system checked successfully
✓ CustomResourceDefinition: destinations.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: envoyfilters.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: gateways.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: servicedefinitions.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: sidecars.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: virtualservices.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: workloadentries.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: workloadgroups.networking.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: authorizationpolicies.security.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: peerauthentications.security.istio.io.istio-system checked successfully
✓ CustomResourceDefinition: istioroutingrules.networking.istio.io.istio-system checked successfully
✓ ConfigMap: istiod-istio-system checked successfully
✓ Deployment: istiod-istio-system checked successfully
```

> [!important]
> **Note**
>
> Istio deploys three components along with 13 custom resource definitions during installation, confirming that your cluster is now fully equipped with the necessary Istio resources.

## Next Steps

With Istio installed and verified on your cluster, you're ready to explore further configurations and advanced features. Let's move on to the next section to learn more about configuring and managing your Istio service mesh.

For more insights into Istio and service mesh technologies, refer to the [official Istio documentation](https://istio.io/latest/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/2be2e4a9-31f2-4efa-b93d-1b090dc41613)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/ff2c46fd-0d7b-4cb2-85e2-dddf379adb08)**
>
> Practice lab
