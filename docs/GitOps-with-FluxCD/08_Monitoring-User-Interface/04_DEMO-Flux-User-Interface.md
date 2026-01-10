# DEMO Flux User Interface - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Monitoring-User-Interface/DEMO-Flux-User-Interface)

---

## Table of Contents

- DEMO Flux User Interface
  - Comparison at a Glance
  - 1. VS Code GitOps Extension for Flux
  - 2. Weaveworks GitOps User Interface
  - Links and References
  - Watch Video
  - Practice Lab
    - Install the Extension
    - Navigating the GitOps Pane
    - Prerequisites
    - Install the Weave GitOps CLI
    - Deploy the Dashboard
    - Expose & Access the Dashboard
    - Dashboard Overview
      - Clusters
      - Sources
      - Workloads
      - Adding New Sources or Kustomizations
      - Sources
      - Applications
      - Image Automation & Notifications
      - Flux Runtime

---

## Content

GitOps with FluxCD

Monitoring User Interface

# DEMO Flux User Interface

In this guide, we’ll explore two open-source graphical interfaces for managing Flux CD:

- **VS Code GitOps Tools for Flux** – a lightweight VS Code extension
- **Weaveworks GitOps UI** – a full-featured web dashboard

Both solutions let you inspect clusters, sources, workloads, and more without manual `kubectl` commands or hand-editing YAML.

## Comparison at a Glance

| Tool                          | Interface Type    | Key Features                                |
| ----------------------------- | ----------------- | ------------------------------------------- |
| VS Code GitOps Tools for Flux | VS Code Extension | Clusters, Sources, Workloads, Docs links    |
| Weaveworks GitOps UI          | Web Dashboard     | Sources, Applications, Runtimes, Automation |

---

## 1\. VS Code GitOps Extension for Flux

The **GitOps Tools for Flux** extension brings Flux CD insights directly into Visual Studio Code.

### Install the Extension

1.  Open **Extensions** (⇧⌘X or Ctrl+Shift+X).
2.  Search for **GitOps Tools for Flux**.
3.  Click **Install**.

Once installed, you’ll see a new **GitOps** icon in the Activity Bar:

![The image shows a webpage from the Flux ecosystem, detailing open-source projects that offer graphical user interfaces for Flux, including descriptions of Weaveworks tools.](https://kodekloud.com/kk-media/image/upload/v1752877643/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/flux-ecosystem-open-source-gui-tools.jpg)

![The image shows the Visual Studio Code interface with the "GitOps Tools for Flux" extension details displayed, including features and ratings. The terminal at the bottom is open, showing a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752877644/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/vscode-gitops-tools-flux-extension-details.jpg)

### Navigating the GitOps Pane

Click the **GitOps** icon to reveal four sections:

- **Clusters** – view all Flux controllers
- **Sources** – inspect GitRepositories, HelmRepositories, Buckets, OCIRepositories
- **Workloads** – check Kustomizations & HelmReleases
- **Documentation** – quick links to Flux docs

#### Clusters

Select your Kubernetes context (e.g., Docker Desktop) to see live YAML for each controller:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helm-controller
  namespace: flux-system
  labels:
    app.kubernetes.io/part-of: flux
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/component: helm-controller
  template:
    metadata:
      labels:
        control-plane: controller
    spec:
      containers:
        - name: manager
          image: ghcr.io/fluxcd/helm-controller:v0.41.2
```

![The image shows a Visual Studio Code interface with the "GitOps Tools for Flux" extension details open, alongside a terminal window at the bottom. The extension is used for managing Kubernetes and cloud-native applications.](https://kodekloud.com/kk-media/image/upload/v1752877645/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/vscode-gitops-tools-flux-extension.jpg)

#### Sources

Browse all configured Sources in the `flux-system` namespace:

- GitRepository
- HelmRepository
- Bucket
- OCIRepository

#### Workloads

Inspect Kustomizations and HelmReleases in one place. For example, clicking a HelmRelease reveals its specification:

```
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: 2-demo-kustomize-git-bb-app
  namespace: flux-system
spec:
  sourceRef:
    kind: GitRepository
    name: 2-demo-source-git-bb-app
    targetNamespace: 2-demo
  path: ./manifests
  interval: 10s
  prune: true
  force: false
```

![The image shows a Visual Studio Code interface with a GitOps extension displaying a list of Kubernetes workloads in the "flux-system" namespace. A tooltip provides details about a HelmRelease named "sealed-secrets."](https://kodekloud.com/kk-media/image/upload/v1752877646/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/vscode-gitops-kubernetes-flux-system.jpg)

#### Adding New Sources or Kustomizations

Create new Git sources or Kustomizations via an intuitive form:

![The image shows a Visual Studio Code interface with a GitOps configuration screen, where a Git repository is being set up with details like repository name, URL, and branch.](https://kodekloud.com/kk-media/image/upload/v1752877647/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/visual-studio-code-gitops-configuration.jpg)

> [!important]
> **Note**
>
> The VS Code extension is ideal for developers who prefer keeping their GitOps workflow within the editor.

---

## 2\. Weaveworks GitOps User Interface

The Weaveworks GitOps UI (part of [Weave GitOps](https://www.weave.works/docs/weave-gitops/)) provides a standalone web dashboard for Flux.

### Prerequisites

- Kubernetes cluster with Flux installed
- `kubectl` configured

### Install the Weave GitOps CLI

```
curl -sSL \
  "https://github.com/weaveworks/weave-gitops/releases/download/v0.20.0/gitops-$(uname -s)-$(uname -m).tar.gz" \
  | tar xz -C /tmp
sudo mv /tmp/gitops /usr/local/bin/gitops
gitops version
```

### Deploy the Dashboard

Generate and apply the dashboard manifest:

```
export PASSWORD="your-password"
gitops create dashboard ww-gitops \
  --password="$PASSWORD" \
  --export > weave-gitops-dashboard.yaml


kubectl apply -f weave-gitops-dashboard.yaml
```

You should see:

```
Creating GitOps Dashboard objects ...
Generated GitOps Dashboard manifests
Checking for a cluster in the kube config ...
Flux v0.41.2 (flux-system) is already installed
Applying GitOps Dashboard manifests
HelmRepository/flux-system/ww-gitops created
HelmRelease/flux-system/ww-gitops created
GitOps Dashboard ww-gitops is ready
```

![The image shows a webpage with instructions for installing Weave GitOps on a cluster, including prerequisites and steps for installing Flux. The page is part of the Weave GitOps documentation site.](https://kodekloud.com/kk-media/image/upload/v1752877648/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/weave-gitops-installation-instructions-flux.jpg)

### Expose & Access the Dashboard

List the GitOps service and pod:

```
kubectl -n flux-system get po,svc | grep gitops
```

Patch the service to use `NodePort`:

```
kubectl -n flux-system patch svc www-gitops-weave-gitops \
  -p '{"spec": {"type": "NodePort"}}'
kubectl -n flux-system get svc www-gitops-weave-gitops
```

Forward to localhost or browse directly:

```
kubectl port-forward svc/www-gitops-weave-gitops -n flux-system 9001:9001
```

Open your browser at:  
http://localhost:9001  
Login with **admin** and your password.

> [!important]
> **Warning**
>
> Exposing services via `NodePort` can pose security risks. Ensure proper network policies and firewall rules are in place.

### Dashboard Overview

#### Sources

Monitor all Git and Helm sources, their sync status, intervals, and last reconciliation:

![The image shows a dashboard interface from Weave GitOps, displaying a list of sources with details such as name, kind, namespace, status, and messages.](https://kodekloud.com/kk-media/image/upload/v1752877650/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/weave-gitops-dashboard-sources-list.jpg)

![The image shows a Weave GitOps interface displaying a list of sources with their status, messages, URLs, and other details. One source is marked "Not Ready" due to a missing bucket, while others are "Ready" with various updates and revisions.](https://kodekloud.com/kk-media/image/upload/v1752877651/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/weave-gitops-interface-sources-status.jpg)

#### Applications

Inspect Kustomizations and HelmReleases along with dependency graphs, events, and raw YAML:

![The image shows a dashboard interface for Weave GitOps, displaying a list of applications with details such as name, kind, namespace, source, status, and messages. The applications are mostly in "Ready" status, and the interface includes navigation options on the left.](https://kodekloud.com/kk-media/image/upload/v1752877653/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/weave-gitops-dashboard-applications-interface.jpg)

![The image shows a Weave GitOps application interface displaying details of a Kubernetes deployment, including resources like namespaces, deployments, and services, with their statuses and messages.](https://kodekloud.com/kk-media/image/upload/v1752877654/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/weave-gitops-kubernetes-deployment-interface.jpg)

#### Image Automation & Notifications

Manage image repositories, policies, automation events, and notification controllers—all from the UI.

#### Flux Runtime

View the status of all Flux controllers and custom resources in one panel:

![The image shows a Flux Runtime dashboard from Weave GitOps, displaying a list of controllers with their status as "Ready" in the "flux-system" namespace.](https://kodekloud.com/kk-media/image/upload/v1752877655/notes-assets/images/GitOps-with-FluxCD-DEMO-Flux-User-Interface/flux-runtime-dashboard-controllers-status.jpg)

---

Whether you embed GitOps directly in VS Code or operate via a standalone dashboard, these tools streamline your Flux workflows and improve observability.

## Links and References

- [Flux CD Documentation](https://fluxcd.io/docs/)
- [Weave GitOps Documentation](https://www.weave.works/docs/weave-gitops/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)
- [VS Code Marketplace: GitOps Tools for Flux](https://marketplace.visualstudio.com/items?itemName=weaveworks.flux)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/fb9e59dc-9dee-4532-92a8-553d0df1df27/lesson/8a49376a-79bc-4910-bd42-07c3de0f57a6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/fb9e59dc-9dee-4532-92a8-553d0df1df27/lesson/565653b9-da58-4b18-8485-63f9f9416481)**
>
> Practice lab
