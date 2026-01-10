# How to protect your GKE cluster components using Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Managing-Security-Aspects/How-to-protect-your-GKE-cluster-components-using-Network-Policies)

---

## Table of Contents

- How to protect your GKE cluster components using Network Policies
  - Securing the Control Plane
  - Securing Worker Nodes
  - Protecting Instance Metadata
  - Managing Pod Access and Credentials
  - Network Security with Network Policies
  - Summary
  - Links and References
  - Watch Video
    - Node Upgrades

---

## Content

GKE - Google Kubernetes Engine

Managing Security Aspects

# How to protect your GKE cluster components using Network Policies

Google Kubernetes Engine (GKE) provides built-in security features and supports Kubernetes Network Policies to safeguard your cluster. In this guide, you'll learn how to secure the control plane, worker nodes, instance metadata, pod access, and network traffic to maintain a robust security posture.

## Securing the Control Plane

The control plane orchestrates your cluster, managing nodes, pods, and services. GKE secures it by running on a hardened Container-Optimized OS with SELinux, AppArmor, and kernel hardening. All communication with the API server is encrypted using TLS, and certificates are rotated automatically. Access is audited for traceability.

![The image illustrates the concept of securing a control plane with elements like hardened OS, encryption, certificate rotation, and auditing access. It includes icons representing each security measure.](https://kodekloud.com/kk-media/image/upload/v1752875658/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/securing-control-plane-security-measures.jpg)

You can tighten control plane access even further:

- **Authorized Networks**: Restrict API endpoint access to whitelisted IP ranges.
- **Private Clusters**: Use private IPs for nodes and the API server, isolating them from the public internet.
- **Identity and Access Management (IAM)**: Assign fine-grained roles and permissions to limit who can perform actions on the control plane.

![The image illustrates the concept of securing a control plane, highlighting elements like authorized networks, private clusters, and IAM (Identity and Access Management).](https://kodekloud.com/kk-media/image/upload/v1752875659/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/securing-control-plane-iam-diagram.jpg)

## Securing Worker Nodes

Worker nodes run your containerized workloads and must be locked down:

- **Container-Optimized OS**: Google-maintained, read-only root filesystem with a built-in firewall and no root SSH access.
- **Autopilot Enforcement**: Autopilot clusters apply these OS controls by default.
- **Limited Accounts**: Only essential user accounts exist with privileges scoped to required operations.

![The image illustrates a container-optimized operating system with features like a locked-down firewall, a read-only filesystem, limited user accounts, and disabled root login. It includes icons representing security measures.](https://kodekloud.com/kk-media/image/upload/v1752875660/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/container-optimized-os-security-features.jpg)

### Node Upgrades

Regular updates close security gaps and ensure compatibility:

- **Autopilot Clusters**: Automatic node upgrades are enabled by default.
- **Standard Clusters**: Choose between automatic or manual upgrades with customizable windows.

```
# Upgrade a specific node pool in a cluster
gcloud container clusters upgrade CLUSTER_NAME \
  --region=REGION \
  --node-pool=POOL_NAME
```

![The image is a diagram illustrating node upgrades, highlighting automatic upgrades and regular updates, with sections labeled "Autopilot," "Upgrades," and "Standard."](https://kodekloud.com/kk-media/image/upload/v1752875661/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/node-upgrades-automatic-regular-diagram.jpg)

## Protecting Instance Metadata

By default, nodes fetch credentials and configuration from the Compute Engine metadata server. Pods shouldn't inherit node service account keys. Enabling **Workload Identity** filters metadata access, exposing only pod-level credentials.

> [!important]
> **Note**
>
> Workload Identity replaces node-level metadata access, preventing privilege escalation from pods to node credentials.

![The image is a diagram showing nodes with a focus on securing instance metadata, providing nodes with credentials and configurations.](https://kodekloud.com/kk-media/image/upload/v1752875662/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/instance-metadata-security-nodes-diagram.jpg)

## Managing Pod Access and Credentials

Apply the principle of least privilege to your workloads:

- **Security Contexts**: Define user IDs, restrict Linux capabilities, and disable privilege escalation.
- **Workload Identity**: Map Kubernetes ServiceAccounts to IAM ServiceAccounts for granular permissions.
- **Binary Authorization**: Enforce image signing and attestation before deployment.

```
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  containers:
  - name: app
    image: gcr.io/my-project/secure-app:latest
    securityContext:
      runAsUser: 1000
      allowPrivilegeEscalation: false
      capabilities:
        drop:
          - ALL
```

![The image illustrates "Pod Access" with three security measures: limiting pod container process privileges, giving pods access to Google Cloud resources, and using binary authorization, connected to a "Control Plane" section.](https://kodekloud.com/kk-media/image/upload/v1752875664/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/pod-access-security-measures-control-plane.jpg)

GKE Autopilot enforces these settings automatically. In Standard clusters, include securityContext fields in your Pod specs:

```
securityContext:
  runAsNonRoot: true
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
```

![The image illustrates pod access with a focus on limiting container process privileges, highlighting that autopilot restricts privileges and allows security-related options.](https://kodekloud.com/kk-media/image/upload/v1752875665/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/pod-access-limiting-container-privileges.jpg)

Binary Authorization integrates with Artifact Registry to allow only trusted, signed images:

![The image illustrates a process for pod access using binary authorization, ensuring only trusted container images are deployed and internal processes are completed for safeguarding software quality and integrity.](https://kodekloud.com/kk-media/image/upload/v1752875666/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/pod-access-binary-authorization-process.jpg)

## Network Security with Network Policies

Kubernetes Network Policies control traffic based on pod labels, enforcing a zero-trust network. For example, restrict an `app=my-app` pod to only communicate with `db=my-db` pods:

![The image illustrates a network security diagram for a GKE cluster, showing the VPC network with subnets, nodes, and pods, along with network policies for "app:my-app" and "app:my-db."](https://kodekloud.com/kk-media/image/upload/v1752875668/notes-assets/images/GKE-Google-Kubernetes-Engine-How-to-protect-your-GKE-cluster-components-using-Network-Policies/gke-cluster-network-security-diagram.jpg)

First, label your workloads:

```
kubectl label pods my-app app=my-app
kubectl label pods my-db db=my-db
```

Then, apply this NetworkPolicy:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-app-to-db
spec:
  podSelector:
    matchLabels:
      db: my-db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: my-app
```

> [!important]
> **Warning**
>
> Without a default deny policy, unintended traffic might still flow. Always set a global deny-all policy if no rules match.

## Summary

By securing the control plane, hardening nodes, protecting metadata, enforcing least privilege, and applying Network Policies, you fortify your GKE cluster against threats.

## Links and References

- [Google Kubernetes Engine Overview](https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview)
- [Kubernetes NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Workload Identity Documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
- [Binary Authorization](https://cloud.google.com/binary-authorization)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/225743c4-eb6e-4393-a51e-4ed7d41dbe51/lesson/b78dfb07-049f-4756-9448-58f217778698)**
>
> Watch video content
