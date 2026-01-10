# HELM Controller - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/HELM-Controller)

---

## Table of Contents

- HELM Controller
  - Source Controller: Fetching Helm Charts
  - Defining a HelmRelease
  - Helm Controller Responsibilities
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# HELM Controller

In this guide, we’ll dive into the Flux Helm Controller and its interaction with the Source Controller to manage Helm charts in a GitOps workflow. You’ll learn how to fetch Helm artifacts, define `HelmRelease` resources, and understand the responsibilities of the Helm Controller.

## Source Controller: Fetching Helm Charts

The Source Controller in Flux can retrieve Helm charts from multiple source types and package them as tarballs or YAML index files. Common source types include Git repositories, OCI registries, S3 buckets, and Helm repositories (e.g., Bitnami, Artifactory).

| Source Type    | Description                    | Format           | Example Provider          |
| -------------- | ------------------------------ | ---------------- | ------------------------- |
| GitRepository  | Charts stored in Git           | `.tar.gz`        | GitHub, GitLab            |
| HelmRepository | Official Helm chart repos      | YAML index files | Bitnami, Artifactory      |
| OCI Registry   | OCI-compliant chart registry   | OCI artifacts    | GitHub Container Registry |
| S3 Bucket      | Charts in cloud object storage | `.tar.gz`        | AWS S3, MinIO             |

Register your sources using `flux create source`:

```
# Git-based Helm charts
flux create source git my-helm-charts \
  --url https://github.com/sidd-harth/charts \
  --branch main


# Bitnami Helm repository with TLS certs
flux create source helm bitnami \
  --url https://charts.bitnami.com/bitnami \
  --cert-file=./cert.crt \
  --key-file=./key.crt \
  --ca-file=./ca.crt
```

> [!important]
> **Note**
>
> Ensure your credentials (`--cert-file`, `--key-file`, `--ca-file`) are stored securely and referenced via [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).

After a reconciliation cycle, inspect the contents of the Source Controller’s data directory:

```
kubectl -n flux-system exec -it source-controller -- sh
~ # tree data/
data/
├── gitrepository
│   └── flux-system
│       └── my-helm-charts
│           ├── 1b31558bb1a701c7592652bbc9e3.tar.gz
│           └── latest.tar.gz
├── helmrepository
│   └── flux-system
│       └── bitnami
│           ├── index-e6dc924894f5f871db9b968.yaml
│           └── index.yaml
```

## Defining a HelmRelease

A `HelmRelease` is a Flux custom resource that declares the desired state of a Helm chart deployment. The Helm Controller watches these resources and orchestrates Helm operations accordingly.

Create a `HelmRelease` resource:

```
flux create helmrelease chart-z-release \
  --source HelmRepository/bitnami \
  --chart chart-z \
  --chart-version 1.2.3 \
  --values values.yaml
```

This command generates a `HelmChart` object, which the Source Controller will reconcile and produce as an artifact:

```
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmChart
metadata:
  name: flux-system-chart-z-release
spec:
  interval: 1m0s
  chart: chart-z
  reconcileStrategy: ChartVersion
  sourceRef:
    kind: HelmRepository
    name: bitnami
    version: "1.2.3"
status:
  artifact:
    path: helmchart/flux-system/flux-system-chart-z-release/chart-z-release-1.2.3.tgz
    revision: 1.2.3
    url: http://source-controller-flux-system.svc.cluster.local/.helmchart/flux-system/flux-system-chart-z-release/chart-z-release-1.2.3.tgz
```

Verify the published chart artifact:

```
kubectl -n flux-system exec -it source-controller -- sh
~ # tree data/
data/
├── gitrepository
│   └── flux-system
│       └── my-helm-charts
│           ├── 1b31558bb1a701c7592652bbc9e3.tar.gz
│           └── latest.tar.gz
├── helmrepository
│   └── flux-system
│       └── bitnami
│           ├── index-e6dc924894f5f871db9b968.yaml
│           └── index.yaml
└── helmchart
    └── flux-system-chart-z-release
        ├── chart-z-release-1.2.3.tgz
        └── latest.tar.gz
```

## Helm Controller Responsibilities

The Flux Helm Controller automates the lifecycle of Helm releases:

- Watches `HelmRelease` CRs and reconciles them into `HelmChart` artifacts.
- Retrieves packaged charts from the Source Controller.
- Executes Helm commands: install, upgrade, test, rollback, and uninstall.
- Supports automatic rollbacks on failed deployments.
- Cleans up resources when a `HelmRelease` is deleted.

> [!important]
> **Warning**
>
> Deleting a `HelmRelease` object will trigger the uninstallation of the associated release. Backup any persistent data before removal.

---

## Links and References

- [Flux Helm Controller Documentation](https://fluxcd.io/docs/components/helm/helm-controller/)
- [Source Controller Documentation](https://fluxcd.io/docs/components/source/)
- [GitOps with Flux](https://fluxcd.io/docs/)
- [Helm Charts Guide](https://helm.sh/docs/topics/charts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/e700bfa3-d070-452d-a9c4-7fad1dfcff87)**
>
> Watch video content
