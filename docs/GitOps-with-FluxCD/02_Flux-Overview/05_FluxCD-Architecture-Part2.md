# FluxCD Architecture Part2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Flux-Overview/FluxCD-Architecture-Part2)

---

## Table of Contents

- FluxCD Architecture Part2
  - 1. Source Controller
  - 2. Kustomize Controller
  - 3. Helm Controller
  - 4. Image Controllers
  - 5. Notification Controller
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Flux Overview

# FluxCD Architecture Part2

Welcome to Part 2 of our deep dive into FluxCD Architecture. In this lesson, we’ll explore each Flux controller and see how they collaborate to implement GitOps workflows on Kubernetes.

Below is an overview of the five core controllers deployed in the `flux-system` namespace when you install Flux:

| Controller                   | Resource Types                                               | Primary Function                                          |
| ---------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| Source Controller            | `GitRepository`, `HelmRepository`, `OCIRepository`, `Bucket` | Fetches and makes external artifacts available            |
| Kustomize Controller         | `Kustomization`                                              | Builds and applies Kustomize overlays                     |
| Helm Controller              | `HelmRelease`                                                | Manages Helm chart lifecycle (install, upgrade, rollback) |
| Image Reflector & Automation | `ImageRepository`, `ImagePolicy`, `ImageUpdateAutomation`    | Detects new image tags and updates Git manifests          |
| Notification Controller      | `Alert`, `Receiver`                                          | Routes inbound webhooks and outbound notifications        |

---

## 1\. Source Controller

The Source Controller offers a consistent interface to pull artifacts from various external systems into your cluster.

Supported sources:

- **Git repositories** via `GitRepository`
- **Helm chart repositories** via `HelmRepository`
- **OCI registries** via `OCIRepository`
- **S3-compatible buckets** via `Bucket`

Example: A simple Kubernetes Deployment stored in Git

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: game
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: game
    spec:
      containers:
        - name: game
          image: game:v1
```

The Source Controller will clone or pull the repo, then expose the manifest to downstream Flux controllers.

> [!important]
> **Note**
>
> Ensure you provide credentials for private Git, OCI or S3 repositories via Kubernetes Secrets.

---

## 2\. Kustomize Controller

Use the Kustomize Controller when your repository holds raw YAML or [Kustomize](https://kubectl.docs.kubernetes.io/references/kustomize/) overlays. Define a `Kustomization` resource that:

1.  References a fetched source (e.g., `GitRepository`).
2.  Builds the Kustomize overlays.
3.  Applies the resulting manifests to your Kubernetes cluster.

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: game-app
spec:
  interval: 5m0s
  sourceRef:
    kind: GitRepository
    name: game-repo
  path: "./overlays/production"
  prune: true
  validation: client
```

Every commit to the Git repo triggers the Source Controller, which in turn prompts the Kustomize Controller to reconcile your desired state.

---

## 3\. Helm Controller

If you prefer [Helm](https://helm.sh/docs) charts, Flux can fetch them via the Source Controller from Git, Helm repos, or OCI registries. Declare a `HelmRelease` to manage:

- Chart source and version
- Custom values
- Release settings (rollback, tests)

```
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: game-chart
spec:
  chart:
    spec:
      chart: ./charts/game
      sourceRef:
        kind: GitRepository
        name: game-repo
      version: ">=1.2.0"
  interval: 10m
  values:
    replicaCount: 3
```

The Helm Controller watches these resources and automates installs, upgrades, rollbacks, tests, and uninstalls.

---

## 4\. Image Controllers

Flux splits image automation into two controllers for granular control:

| Controller           | Role                                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Image Reflector**  | Periodically scans registries for new image tags, populating `ImageRepository` resources |
| **Image Automation** | Observes `ImagePolicy` updates and rewrites Git manifests via `ImageUpdateAutomation`    |

When a new tag (e.g., `game:v2`) matches your policy, Flux commits the updated image reference back to Git:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: game
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: game
    spec:
      containers:
        - name: game
          image: game:v2
```

> [!important]
> **Warning**
>
> The Image Automation Controller requires write access to your Git repository. Ensure branch protections and commit permissions are configured securely.

---

## 5\. Notification Controller

The Notification Controller connects Flux events with external systems:

- **Inbound**: Listens for Git webhooks (GitHub, GitLab) or registry events to trigger immediate reconciliation.
- **Outbound**: Sends events (deployment success/failure, image updates, reconciliation errors) to channels like Slack, Teams, Discord, or email.

You configure `Alert` and `Receiver` resources to route events:

```
apiVersion: notification.toolkit.fluxcd.io/v1beta1
kind: Alert
metadata:
  name: slack-alert
spec:
  eventSources:
    - kind: GitRepository
      name: game-repo
  eventSeverity: info
  receiverRefs:
    - name: team-slack
```

---

Whenever the Source Controller pulls commits or the Image Automation Controller pushes an update, the Kustomize or Helm Controller reconciles your cluster to match the latest Git state—completing the GitOps loop.

---

## Links and References

- [FluxCD Documentation](https://fluxcd.io/docs)
- [FluxCD Website](https://fluxcd.io)
- [Kustomize Reference](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Helm Docs](https://helm.sh/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [OCI Artifacts Specification](https://github.com/opencontainers/artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/44949c1c-edf6-4432-81ce-78d709c30af5/lesson/5f3cbf37-d357-4b1f-aaff-7f16734de827)**
>
> Watch video content
