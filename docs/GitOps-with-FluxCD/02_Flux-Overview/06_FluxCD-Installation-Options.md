# FluxCD Installation Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Flux-Overview/FluxCD-Installation-Options)

---

## Table of Contents

- FluxCD Installation Options
  - Prerequisites
  - 1. Install the Flux CLI
  - 2. Bootstrap Flux with Git
  - 3. Inspect Your Git Repository
  - 4. Customizing Flux Components
  - 5. Alternative Installation Methods
  - 6. Uninstalling Flux
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Flux Overview

# FluxCD Installation Options

Discover the different methods for installing FluxCD and adopting GitOps on your Kubernetes clusters. This guide covers prerequisites, CLI installation, Git-based bootstrapping, repository inspection, customization, alternative installs, and uninstallation.

## Prerequisites

Before you begin, ensure:

- Your Kubernetes version is **1.20.6** or newer.
- `kubectl` is configured to communicate with your target cluster.

> [!important]
> **Warning**
>
> Using End-of-Life (EOL) Kubernetes versions in production is **not recommended**. Upgrade your cluster if you’re on a version older than v1.20.6.

## 1\. Install the Flux CLI

FluxCD is managed via its command-line interface. Download precompiled binaries from GitHub for macOS, Linux, and Windows.

| Operating System | Install Command                                  | Reference                                                                               |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Linux            | `curl -s https://fluxcd.io/install.sh \\         | sudo bash`                                                                              | [FluxCD Install Script](https://fluxcd.io/install.sh) |
| macOS            | `brew install fluxcd/tap/flux`                   | [Homebrew FluxCD Tap](https://github.com/fluxcd/flux2/tree/main/manifests/install/helm) |
| Windows          | `scoop install fluxcd` or `choco install fluxcd` | [FluxCD Releases](https://github.com/fluxcd/flux2/releases)                             |

> [!important]
> **Note**
>
> Running the install script (`install.sh`) automatically places the `flux` binary in your `$PATH`.

## 2\. Bootstrap Flux with Git

Use `flux bootstrap` to initialize FluxCD in your cluster and configure it to manage itself from a Git repository. The command supports multiple Git providers:

| Git Provider   | Flag      | Example                                        |
| -------------- | --------- | ---------------------------------------------- |
| GitHub         | `--owner` | `flux bootstrap github …`                      |
| GitLab         | `--owner` | `flux bootstrap gitlab …`                      |
| Bitbucket      | `--owner` | `flux bootstrap bitbucket …`                   |
| Azure DevOps   | `--owner` | `flux bootstrap azure --organization your-org` |
| AWS CodeCommit | `--owner` | `flux bootstrap aws --region us-west-2`        |

Example for GitHub:

```
flux bootstrap github \
  --owner sidd-harth \
  --repository brick-breaker \
  --path flux-clusters/dev-cluster \
  --personal true \
  --private false
```

This command will:

1.  Prompt for your GitHub Personal Access Token (PAT).
2.  Create the specified repository if it doesn’t exist.
3.  Generate FluxCD component manifests.
4.  Commit and push manifests to your Git branch and path.
5.  Create the `flux-system` namespace in your cluster and install Flux controllers.
6.  Generate an SSH keypair, store it as a Kubernetes secret, and add it as a deploy key to the repo.
7.  Synchronize and begin reconciling resources.

```
Please enter GitHub personal access token (PAT): ********
connecting to github.com
repository created
generating manifests
installing components in flux-system namespace
deployment "source-controller" successfully rolled out
deployment "kustomize-controller" successfully rolled out
configuring deploy key
bootstrap finished
```

> [!important]
> **Note**
>
> The `bootstrap` command is idempotent—running it multiple times will not change an already-bootstraped setup.

## 3\. Inspect Your Git Repository

After bootstrapping, clone your repo to review the FluxCD configuration and any starter workloads:

```
git clone https://github.com/sidd-harth/brick-breaker.git
cd brick-breaker
tree flux-clusters/dev-cluster
```

Example directory structure:

```
flux-clusters
└── dev-cluster
    └── flux-system
        ├── gotk-components.yaml
        ├── gotk-sync.yaml
        └── kustomization.yaml
```

Add your application manifests under your specified path. For example, placing YAML files into `flux-clusters/dev-cluster/apps/` will automatically trigger reconciliation.

## 4\. Customizing Flux Components

You can tailor Flux manifests at two stages:

- Before bootstrapping:
  - Add flags to your `flux bootstrap` command.
  - Edit the generated manifests locally and then push to Git.
- After bootstrapping:
  - Modify YAML files under `flux-system` in your Git repository.
  - Flux will detect changes and apply them to the cluster automatically.

## 5\. Alternative Installation Methods

| Method                    | Description                                                                                                         | Link                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Terraform                 | Bootstrap FluxCD declaratively using Terraform and the Flux provider                                                | [Flux Terraform Provider](https://registry.terraform.io/providers/fluxcd/flux/latest) |
| flux install (local only) | Quickly install Flux controllers directly into a cluster without Git integration (ideal for testing or development) | `flux install`                                                                        |

Example local install:

```
flux install
```

## 6\. Uninstalling Flux

To remove Flux controllers and CRDs from your cluster:

```
flux uninstall
```

> [!important]
> **Warning**
>
> `flux uninstall` **does not** delete Kubernetes objects or Helm releases that Flux managed—those resources remain in your cluster.

---

## Links and References

- [FluxCD Documentation](https://fluxcd.io/docs/)
- [GitOps Fundamentals](https://www.gitops.tech/)
- [Kubernetes Official Docs](https://kubernetes.io/docs/)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/44949c1c-edf6-4432-81ce-78d709c30af5/lesson/e42a7e67-3bb0-4e47-9e43-4309c31f6ce7)**
>
> Watch video content
