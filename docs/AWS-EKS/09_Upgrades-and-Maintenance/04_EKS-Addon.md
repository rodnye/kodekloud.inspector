# EKS Addon - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Upgrades-and-Maintenance/EKS-Addon)

---

## Table of Contents

- EKS Addon
  - What Are EKS Add-ons?
  - Inspecting Default Add-ons in the Console
  - Converting CoreDNS and kube-proxy to Managed Add-ons
  - Viewing Add-on Status
  - Officially Supported vs. Marketplace Add-ons
  - Best Practices: Own Your Add-on Manifests
  - Conclusion
  - References
  - Watch Video

---

## Content

AWS EKS

Upgrades and Maintenance

# EKS Addon

Amazon EKS add-ons let you install and manage essential cluster services—such as the VPC CNI, kube-proxy, and CoreDNS—through the AWS API. While these components are automatically provisioned with your EKS cluster, turning them into managed add-ons enables AWS to handle version alignment and automated upgrades. However, this convenience can introduce limitations and additional steps during control plane or worker node upgrades.

## What Are EKS Add-ons?

EKS add-ons are extensions that AWS maintains for compatibility with your cluster’s Kubernetes version. They include:

- **Amazon VPC CNI**: Integrates Kubernetes pod networking directly with your VPC.
- **CoreDNS**: Provides DNS resolution for in-cluster services.
- **kube-proxy**: Manages cluster networking rules.

By default, the VPC CNI ships as a managed add-on, while CoreDNS and kube-proxy run as unmanaged core components. Converting these into managed add-ons synchronizes their lifecycle with your cluster.

## Inspecting Default Add-ons in the Console

Let’s explore an EKS cluster via the AWS Management Console. Here’s my cluster named **kodekloud**, running Kubernetes **v1.29**. The Amazon VPC CNI appears automatically under the Add-ons section.

![The image shows an AWS console page for an EKS cluster named "kodekloud," displaying its active status, Kubernetes version 1.29, and support details.](https://kodekloud.com/kk-media/image/upload/v1752862904/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-eks-cluster-kodekloud.jpg)

Even though only the VPC CNI shows up as an add-on, you can verify that CoreDNS and kube-proxy are running:

```
kubectl get pods -A
```

## Converting CoreDNS and kube-proxy to Managed Add-ons

To bring CoreDNS and kube-proxy under managed add-on control:

1.  In the AWS Console, go to **Add-ons** for your cluster.
2.  Select **CoreDNS** and **kube-proxy**.
3.  Click **Install**; the console auto-selects a compatible version via the EKS API.

![The image shows an AWS console interface for selecting Amazon EKS add-ons, with options like CoreDNS and kube-proxy highlighted.](https://kodekloud.com/kk-media/image/upload/v1752862905/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-eks-addons-selection.jpg)

Next, review the default settings (IAM role, version) and confirm the installation:

![The image shows an AWS console screen for configuring the "kube-proxy" add-on in the Elastic Kubernetes Service, with options to select the version and IAM role. The status indicates "Ready to install."](https://kodekloud.com/kk-media/image/upload/v1752862906/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-kube-proxy-configure.jpg)

> [!important]
> **Note**
>
> During installation, you may observe both unmanaged and managed instances of these components running in parallel. This is normal until you remove the original unmanaged deployments.

## Viewing Add-on Status

Once installed, all add-ons appear as **Active** in the console—despite already running under the hood.

![The image shows the Amazon Elastic Kubernetes Service (EKS) console, displaying add-ons like Amazon VPC CNI and kube-proxy, with their status and version information.](https://kodekloud.com/kk-media/image/upload/v1752862908/notes-assets/images/AWS-EKS-EKS-Addon/amazon-eks-console-addons-status-version.jpg)

You can update each add-on individually when AWS releases a newer compatible package. The console highlights available updates even if your cluster’s components are up-to-date with Kubernetes standards.

![The image shows an AWS console screen displaying the update status of a Kubernetes add-on in progress, with details like Update ID, AddonVersion, and no errors listed.](https://kodekloud.com/kk-media/image/upload/v1752862909/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-kubernetes-addon-update-status.jpg)

```
kubectl get pods -A
```

When you click **Update**, EKS triggers an internal API call to patch the add-on manifest. You don’t control the rollout strategy, and the console does not expose the underlying YAML changes.

## Officially Supported vs. Marketplace Add-ons

AWS maintains a growing roster of officially supported add-ons:

| Add-on                              | Use Case                                         | Example Installation                               |
| ----------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| AWS Distro for OpenTelemetry (ADOT) | Collect and export metrics/traces                | `eksctl create addon --name aws-otel-collector`    |
| CSI Snapshot Controller             | Volume snapshot management                       | `eksctl create addon --name aws-ebs-csi-node`      |
| EKS Pod Identity Agent              | Enable IAM roles for Kubernetes service accounts | `eksctl create addon --name aws-iam-authenticator` |

![The image shows an AWS console interface for selecting Amazon EKS add-ons, including options like CSI Snapshot Controller and Amazon EKS Pod Identity Agent.](https://kodekloud.com/kk-media/image/upload/v1752862910/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-eks-addons-selection-2.jpg)

Marketplace add-ons introduce extra dependencies and may lag behind Kubernetes releases. For instance, attempting to install KubeCost without a subscription—or if no compatible package exists—can block your upgrade path:

![The image shows an AWS console screen for configuring add-ons, specifically for "Kubecost - Amazon EKS cost monitoring." It indicates that a subscription is required and that the selected add-on does not support the Kubernetes version for the cluster.](https://kodekloud.com/kk-media/image/upload/v1752862912/notes-assets/images/AWS-EKS-EKS-Addon/aws-console-kubecost-addons-configuration.jpg)

> [!important]
> **Warning**
>
> Marketplace add-ons may show “no versions available” if they don’t support your Kubernetes version. This can delay critical upgrades.

## Best Practices: Own Your Add-on Manifests

For maximum control over versions, rollout timing, and configuration, consider managing cluster services yourself:

- Use **Helm charts** or plain YAML manifests.
- Incorporate add-on deployments in your **GitOps** pipeline.
- Align CoreDNS and kube-proxy versions directly with your control plane and node versions.

This approach streamlines testing and upgrades, removing external bottlenecks.

![The image is a diagram illustrating the concept of avoiding add-ons for smoother flow, featuring hexagons with gear icons and a central cloud API symbol.](https://kodekloud.com/kk-media/image/upload/v1752862913/notes-assets/images/AWS-EKS-EKS-Addon/avoiding-add-ons-smoother-flow-diagram.jpg)

## Conclusion

While EKS add-ons simplify cluster service management, they can complicate upgrades and reduce your visibility into rollout processes. Evaluate your operational requirements to decide which components you want AWS to manage and which you prefer to control directly.

---

## References

- [Amazon EKS Add-ons Documentation](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [GitOps Best Practices](https://www.gitops.tech/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1c61ee8d-9fca-4ccb-9670-b87e09b3135b/lesson/74720eb6-8a0d-4b9f-83d7-d9fb65df2d41)**
>
> Watch video content
