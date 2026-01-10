# DEMO Push Kubernetes Manifest to OCI Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/DEMO-Push-Kubernetes-Manifest-to-OCI-Registry)

---

## Table of Contents

- DEMO Push Kubernetes Manifest to OCI Registry
  - Prerequisites
  - 1. Prepare the Local Repository
  - 2. Log in to GHCR
  - 3. Push the OCI Artifact
  - 4. Verify the Package
  - Next Steps
  - References
  - Watch Video

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# DEMO Push Kubernetes Manifest to OCI Registry

In this walkthrough, we’ll package Kubernetes manifests as an OCI artifact and push them to GitHub Container Registry (GHCR). Flux can then pull and deploy these manifests directly.

## Prerequisites

You need a GitHub Personal Access Token (PAT) with permissions to manage packages and your repository:

| Scope             | Description                          |
| ----------------- | ------------------------------------ |
| `repo`            | Full control of private repositories |
| `write:packages`  | Upload and publish packages          |
| `delete:packages` | Remove packages from GHCR            |

> [!important]
> **Note**
>
> If you already have a PAT, update it to include `repo`, `write:packages`, and `delete:packages`.

![The image shows a GitHub settings page for editing a personal access token, with various scopes selected for repository and package management permissions.](https://kodekloud.com/kk-media/image/upload/v1752877631/notes-assets/images/GitOps-with-FluxCD-DEMO-Push-Kubernetes-Manifest-to-OCI-Registry/github-settings-personal-access-token-scopes.jpg)

Once the correct scopes are selected, click **Update Token** and save the token value securely.

![The image shows a GitHub settings page for managing personal access tokens, specifically the "Tokens (classic)" section, with options to generate or revoke tokens.](https://kodekloud.com/kk-media/image/upload/v1752877632/notes-assets/images/GitOps-with-FluxCD-DEMO-Push-Kubernetes-Manifest-to-OCI-Registry/github-settings-personal-access-tokens.jpg)

---

## 1\. Prepare the Local Repository

1.  Navigate to your source directory and switch to the demo branch:

    ```
    cd ~/bb-app-source
    git checkout 7-demo
    ```

2.  If you see a “dubious ownership” error on Ubuntu, mark it as safe:

    ```
    git config --global --add safe.directory "$(pwd)"
    git checkout 7-demo
    ```

3.  Enter the versioned folder and inspect its contents:

    ```
    cd 7.7.0
    sudo apt update && sudo apt install -y tree
    tree
    ```

    You should see the `manifests/` directory alongside YAML files.

## 2\. Log in to GHCR

Use Docker to authenticate against GHCR. Replace `<username>` with your GitHub handle:

```
docker login ghcr.io --username <username>
# When prompted, paste your PAT
```

On success, you’ll see:

```
Login succeeded
```

## 3\. Push the OCI Artifact

Flux’s `push artifact` command packages a directory (or file) as an OCI artifact and uploads it to a registry.

![The image shows a webpage from the Flux documentation, specifically detailing the "flux push artifact" command. It includes a synopsis of the command's functionality, which involves creating a tarball and uploading it to an OCI repository, along with examples and additional options.](https://kodekloud.com/kk-media/image/upload/v1752877633/notes-assets/images/GitOps-with-FluxCD-DEMO-Push-Kubernetes-Manifest-to-OCI-Registry/flux-push-artifact-command-documentation.jpg)

First, set reusable variables and then run:

```
# Generate tags and metadata
REF=$(git rev-parse --short HEAD)
SRC=$(git config --get remote.origin.url)
TAG="7.7.0-${REF}"
REPO="oci://ghcr.io/<username>/bb-app:${TAG}"


# Push manifests as an OCI artifact
flux push artifact "${REPO}" \
  --path="./manifests" \
  --source="${SRC}" \
  --revision="${TAG}"
```

What happens:

- Flux reads your GHCR credentials from `~/.docker/config.json`
- It tars up `./manifests`
- Uploads to `ghcr.io/<username>/bb-app:7.7.0-<short-git-sha>`
- Attaches the Git remote URL and revision metadata

A successful push shows:

```
pushing artifact to ghcr.io/<username>/bb-app@sha256:<digest>
artifact successfully pushed to ghcr
```

## 4\. Verify the Package

1.  Go to your GitHub repo’s **Packages** tab and refresh.
2.  You should see `bb-app` listed under private packages.

You can also confirm locally:

```
docker pull ghcr.io/<username>/bb-app:7.7.0-<short-git-sha>
```

> [!important]
> **Note**
>
> Flux requires a Kubernetes [imagePullSecret](/docs/guides/oci-acr/) to authenticate when pulling OCI artifacts. We’ll cover secret creation in a later module.

---

## Next Steps

In the following lesson, we will package and push Helm charts to an OCI registry.

## References

- [Flux CLI: push artifact](https://fluxcd.io/docs/cli/flux_push_artifact/)
- [GitHub Container Registry](https://docs.github.com/packages)
- [OCI Artifacts Spec](https://github.com/opencontainers/artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/13765f33-6b31-4a36-bb10-d07ab3bfa621)**
>
> Watch video content
