# DEMO Image Automation Controller Update - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Image-Automation-Controller/DEMO-Image-Automation-Controller-Update)

---

## Table of Contents

- DEMO Image Automation Controller Update
  - Overview of Resources
  - Prerequisites
  - 1. Inspect the Flux CLI for Image Updates
  - 2. Create the ImageUpdateAutomation Resource
  - 3. Configure the GitRepository Source
  - 4. Mark the Deployment Manifest for Automated Updates
  - 5. Handle Git Authentication for Push Access
  - 6. Reconfigure GitRepository Source to Use SSH
  - 7. Final Reconciliation and Verification
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitOps with FluxCD

Image Automation Controller

# DEMO Image Automation Controller Update

In this hands‐on walkthrough, you’ll use Flux’s ImageUpdateAutomation controller to detect new container image tags, commit updates to your Git repository, and deploy the changes automatically on your Kubernetes cluster.

---

## Overview of Resources

| Resource Type           | Purpose                                               | Flux CLI Example                                                                                  |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| GitRepository           | Tracks your application manifests in Git              | `flux create source git <name> --url=<repo-url> --branch=<branch> --export`                       |
| ImageUpdateAutomation   | Automates image tag updates in YAML and pushes to Git | `flux create image update <name> --git-repo-ref=<git-source> --interval=1m --export`              |
| Secret (Git deploy key) | Holds SSH key for authenticating Git pushes           | `flux create secret git <name> --url=ssh://git@github.com/... --ssh-key-algorithm=ecdsa --export` |

---

## Prerequisites

- A Kubernetes cluster with Flux v0.34+ installed.
- A Git repository containing your application’s Kubernetes manifests under `./manifests`.
- An `ImagePolicy` resource in `flux-system` (e.g., `8-demo-image-policy-bb-app`) selecting the desired image tags.

For more details, see the [Flux Image Automation Guide](https://fluxcd.io/docs/guides/image-automation/) and the [Flux CLI reference](https://fluxcd.io/docs/cmd/flux/).

---

## 1\. Inspect the Flux CLI for Image Updates

Open a terminal in your cluster directory and verify the ImageUpdateAutomation commands:

```
flux create image update -h
```

You should see usage details for creating an `ImageUpdateAutomation` resource, which watches a Git repo and applies image tag updates to your manifests.

---

## 2\. Create the ImageUpdateAutomation Resource

Generate the `ImageUpdateAutomation` YAML without applying it:

```
flux create image update 8-demo-image-update-bb-app \
  --git-repo-ref=8-demo-source-git-bb-app \
  --checkout-branch=8-demo \
  --author-name=fluxcdbot \
  --author-email=fluxcdbot@users.noreply.github.com \
  --git-repo-path="./manifests" \
  --push-branch=8-demo \
  --interval=100s \
  --export > 8-demo-image-update-bb-app.yml
```

Inspect `8-demo-image-update-bb-app.yml`:

```
apiVersion: image.toolkit.fluxcd.io/v1beta1
kind: ImageUpdateAutomation
metadata:
  name: 8-demo-image-update-bb-app
  namespace: flux-system
spec:
  interval: 1m40s
  sourceRef:
    kind: GitRepository
    name: 8-demo-source-git-bb-app
  git:
    checkout:
      ref:
        branch: 8-demo
    commit:
      author:
        name: fluxcdbot
        email: fluxcdbot@users.noreply.github.com
    push:
      branch: 8-demo
  update:
    path: ./manifests
    strategy: Setters
```

---

## 3\. Configure the GitRepository Source

Define your application Git source and reconcile it:

```
flux create source git 8-demo-source-git-bb-app \
  --url=https://github.com/sidd-harth-2/bb-app-source \
  --branch=8-demo \
  --interval=1m0s \
  --export > 8-demo-source-git-bb-app.yml


kubectl apply -f 8-demo-source-git-bb-app.yml
kubectl apply -f 8-demo-image-update-bb-app.yml


flux reconcile source git 8-demo-source-git-bb-app -n flux-system
flux reconcile image update 8-demo-image-update-bb-app -n flux-system
flux get images all
flux get image update
```

At this stage, `ImageUpdateAutomation` will report **no updates made**, since it doesn’t know where in your manifests to apply new tags.

---

## 4\. Mark the Deployment Manifest for Automated Updates

> [!important]
> **Note**
>
> Ensure an `ImagePolicy` named `8-demo-image-policy-bb-app` exists in `flux-system` to select the desired image tags.

Edit `manifests/deployment.yml` and annotate the `image` field:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: block-buster
  namespace: 8-demo
spec:
  replicas: 1
  template:
    spec:
      containers:
        - name: app
          image: siddharth67/bb-app-flux-demo:7.8.0 # {"$imagepolicy": "flux-system:8-demo-image-policy-bb-app"}
          imagePullPolicy: Always
```

Commit and push your changes:

```
git add manifests/deployment.yml
git commit -m "Add image policy marker"
git push origin 8-demo


flux reconcile source git 8-demo-source-git-bb-app -n flux-system
flux get image update
```

---

## 5\. Handle Git Authentication for Push Access

After marking the manifest, the controller locates the change but cannot push:

```
flux get image update
# MESSAGE: authentication required
```

![The image shows a GitHub repository page with a branch selection dropdown open, displaying various branches like "2-demo" and "9-demo." The page includes options for code management, such as "Compare & pull request" and "Add a README."](https://kodekloud.com/kk-media/image/upload/v1752877634/notes-assets/images/GitOps-with-FluxCD-DEMO-Image-Automation-Controller-Update/github-repo-branch-selection-dropdown.jpg)

Go to your GitHub repository **Settings → Deploy keys**:

![The image shows a GitHub repository settings page, specifically the "Deploy keys" section, indicating that there are no deploy keys for the repository.](https://kodekloud.com/kk-media/image/upload/v1752877635/notes-assets/images/GitOps-with-FluxCD-DEMO-Image-Automation-Controller-Update/github-repo-settings-deploy-keys.jpg)

Generate a deploy key secret and apply it:

```
flux create secret git 8-demo-git-bb-app-auth \
  --url=ssh://git@github.com/sidd-harth-2/bb-app-source.git \
  --ssh-key-algorithm=ecdsa \
  --ssh-ecdsa-curve=p521 \
  --export > 8-demo-git-bb-app-auth-secret.yml


kubectl apply -f 8-demo-git-bb-app-auth-secret.yml -n flux-system
```

Copy the public key from the secret and add it in GitHub as a **write** deploy key. Authenticate if prompted:

![The image shows a GitHub "Confirm access" page prompting the user to enter their password to proceed. It includes a password input field, a "Confirm" button, and links for terms, privacy, and security.](https://kodekloud.com/kk-media/image/upload/v1752877636/notes-assets/images/GitOps-with-FluxCD-DEMO-Image-Automation-Controller-Update/github-confirm-access-password-input.jpg)

---

## 6\. Reconfigure GitRepository Source to Use SSH

Regenerate the `GitRepository` to reference your SSH URL and secret:

```
flux create source git 8-demo-source-git-bb-app \
  --url=ssh://git@github.com/sidd-harth-2/bb-app-source.git \
  --branch=8-demo \
  --secret-ref=8-demo-git-bb-app-auth \
  --timeout=10s \
  --export > 8-demo-source-git-bb-app.yml


kubectl apply -f 8-demo-source-git-bb-app.yml
flux reconcile source git 8-demo-source-git-bb-app -n flux-system
```

---

## 7\. Final Reconciliation and Verification

Trigger the image update and verify the new tag is committed and deployed:

```
flux reconcile image update 8-demo-image-update-bb-app -n flux-system
flux get images all
flux get image update
```

Now Flux will commit the updated tag (e.g., `7.8.1`) to your `manifests/deployment.yml`. Confirm on GitHub:

![The image shows a GitHub repository page for "bb-app-source" with a focus on the "manifests" directory, displaying files like "deployment.yml," "namespace.yml," and "service.yml." The branch is 16 commits ahead and 1 commit behind the main branch.](https://kodekloud.com/kk-media/image/upload/v1752877637/notes-assets/images/GitOps-with-FluxCD-DEMO-Image-Automation-Controller-Update/github-repo-bb-app-manifests-files.jpg)

Finally, ensure the new image is running in your cluster:

```
kubectl -n 8-demo get deploy block-buster -o wide
```

Expected output:

```
block-buster  1/1  1  1  1m  app  docker.io/siddharth67/bb-app-flux-demo:7.8.1
```

![The image shows a game interface for "Block Buster" with details like pod name, IP, and app version. It prompts the user to "PRESS START" to begin the game.](https://kodekloud.com/kk-media/image/upload/v1752877639/notes-assets/images/GitOps-with-FluxCD-DEMO-Image-Automation-Controller-Update/block-buster-game-interface-details.jpg)

---

Congratulations! You’ve successfully automated image tag updates with Flux’s ImageUpdateAutomation controller.

## Links and References

- [Flux Image Automation Guide](https://fluxcd.io/docs/guides/image-automation/)
- [Flux CLI Reference](https://fluxcd.io/docs/cmd/flux/)
- [Kubernetes Concepts Overview](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [GitHub Deploy Keys Documentation](https://docs.github.com/en/developers/overview/managing-deploy-keys)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/d03a07a1-a7f5-481a-bbc7-3fdcbf3768c4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/64cfb295-552e-4ad2-8df8-b7ddb02641d0)**
>
> Practice lab
