# Demo Installing Cilium on Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Container-Network-InterfaceCNI/Demo-Installing-Cilium-on-Kubernetes)

---

## Table of Contents

- Demo Installing Cilium on Kubernetes
  - Prerequisites
  - 1. Installation Methods Compared
  - 2. Install Cilium with the CLI
  - 3. Validate Network Connectivity
  - 4. Enable Hubble Observability via Helm
  - 5. Port-Forward Hubble Relay & Check Status
  - 6. Observe Live Network Flows
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Networking Deep Dive

Container Network InterfaceCNI

# Demo Installing Cilium on Kubernetes

In this guide, you’ll learn how to deploy Cilium as your Kubernetes CNI and enable Hubble observability. We cover both the Cilium CLI and Helm methods, validate network connectivity, and demonstrate how to watch live network flows.

## Prerequisites

- A running Kubernetes cluster (v1.18+).
- `kubectl` configured to your target context.
- Cilium CLI (`cilium`) installed.
- Hubble CLI (`hubble`) installed.

> [!important]
> **Note**
>
> Verify your current context before proceeding:
>
> ```
> kubectl config current-context
> ```

## 1\. Installation Methods Compared

| Method     | Command Example                                                                               | Best For                              |
| ---------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| Cilium CLI | `cilium install --version 1.15.4 --wait`                                                      | Rapid installs and upgrades           |
| Helm       | `helm upgrade cilium cilium/cilium --version 1.15.4 --namespace kube-system --reuse-values …` | Advanced customizations and overrides |

> [!important]
> **Warning**
>
> Mixing CLI and Helm installations without `--reuse-values` can lead to configuration drift. Always double-check your values before upgrading.

## 2\. Install Cilium with the CLI

At the time of writing, **v1.15.4** is the latest stable release. Run:

```
cilium install --version 1.15.4 --wait
```

The `--wait` flag blocks until all Cilium pods and operators are ready.

Verify status:

```
cilium status
```

Expected output:

```
Cilium:
    OK
Operator:
    OK
Envoy Daemon Set:
    disabled (using embedded mode)
Hubble Relay:
    disabled
ClusterMesh:
    disabled


Deployment
    cilium-operator      Desired: 1, Ready: 1/1, Available: 1/1
DaemonSet
    cilium              Desired: 2, Ready: 2/2, Available: 2/2
...
```

## 3\. Validate Network Connectivity

Before enabling Hubble, confirm that Cilium networking works end-to-end:

```
cilium connectivity test
```

This can take a few minutes. A timeout like:

```
Connectivity test failed: timeout reached waiting for deployment cilium-test/client3 to become ready
```

indicates a readiness issue in one of the test pods.

## 4\. Enable Hubble Observability via Helm

To add Hubble Relay and UI, upgrade your Cilium release in the `kube-system` namespace:

```
helm repo add cilium https://helm.cilium.io/
helm repo update
helm upgrade cilium cilium/cilium --version 1.15.4 \
  --namespace kube-system \
  --reuse-values \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true
```

Re-check Cilium’s status:

```
cilium status
```

You should now see:

```
Hubble Relay:      OK
Hubble UI:         OK
...
Cluster Pods:      X/Y managed by Cilium
```

## 5\. Port-Forward Hubble Relay & Check Status

Port-forward the Relay service locally:

```
cilium hubble port-forward
```

This sets up:

```
kubectl port-forward -n kube-system svc/hubble-relay --address 127.0.0.1 4245:80
```

In a new terminal, query Hubble’s health:

```
hubble status
```

Sample output:

```
Healthcheck (via localhost:4245):
Current/Max Flows: 5,818/8,190 (71.04%)
Flows/s: 22.83
Connected Nodes: 2/2
```

## 6\. Observe Live Network Flows

Stream live traffic and events:

```
hubble observe
```

Example event:

```
Jul 29 20:37:53.947: 10.0.0.77:46164 (host) <-- kube-system/coredns-... to-stack FORWARDED (TCP Flags: ACK, FIN)
...
```

You have successfully installed Cilium CNI and enabled Hubble observability on your Kubernetes cluster. Next, explore Cilium network policies and advanced Hubble filtering to secure and monitor traffic in production.

## Links and References

- [Cilium Documentation](https://docs.cilium.io/)
- [Hubble Observability Guide](https://docs.cilium.io/en/stable/gettingstarted/hubble/)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/6fd094cb-eaab-48d6-8b81-9867ac2a277a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/5eea49e6-caea-4e84-88a0-268ea6f263af/lesson/68a3d25f-d6d8-4556-a0ef-f9a68db1e9f3)**
>
> Practice lab
