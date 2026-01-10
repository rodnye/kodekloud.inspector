# Image Automation Controller - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Image-Automation-Controller/Image-Automation-Controller)

---

## Table of Contents

- Image Automation Controller
  - Use Case: Updating an Nginx Deployment
  - Flux Image Automation Components
  - Workflow Summary
  - Links and References
  - Watch Video
    - 1. Image Reflector Controller
    - 2. Image Automation Controller

---

## Content

GitOps with FluxCD

Image Automation Controller

# Image Automation Controller

Flux’s Image Automation Controller streamlines the process of keeping Kubernetes manifests up to date with the latest container image tags. By integrating with your Git repository and container registry, it automates tag discovery, manifest updates, and Git commits—eliminating manual edits.

## Use Case: Updating an Nginx Deployment

Imagine you maintain a Git repo containing Kubernetes manifests for an Nginx application. The Deployment initially pins the image tag to `1.0.0`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  template:
    spec:
      containers:
        - name: nginx
          image: sid/nginx:1.0.0
```

When your CI pipeline builds and publishes a new version (e.g., `1.2.0`), Flux’s Image Automation can detect that change and automatically update your manifest in Git.

> [!important]
> **Note**
>
> These examples use Flux CLI v0.34+. Adjust flags if you’re on an earlier release.

---

## Flux Image Automation Components

The automation workflow involves two controllers working together:

| Component                   | Resource Kinds                   | Purpose                                            |
| --------------------------- | -------------------------------- | -------------------------------------------------- |
| Image Reflector Controller  | `ImageRepository`, `ImagePolicy` | Scans container registries and resolves tags       |
| Image Automation Controller | `ImageUpdateAutomation`          | Clones Git repo, updates manifests, pushes commits |

---

### 1\. Image Reflector Controller

This controller watches your container registry and picks the latest tags based on a policy.

1.  **Create an ImageRepository**  
    Configure Flux to scan your registry every minute:

    ```
    flux create image repository nginx-repo \
      --image=docker.io/sid/nginx \
      --interval=1m
    ```

2.  **Define an ImagePolicy**  
    Filter tags via Semantic Versioning. For example, to allow any minor or patch bump within `1.x.0`:

    ```
    flux create image policy nginx-policy \
      --image-ref=nginx-repo \
      --select-semver=1.x.0
    ```

3.  **Verify Scans and Policy Resolution**

    ```
    flux get image all
    ```

    Example output:

    ```
    NAME                        LAST SCAN                   READY  MESSAGE
    image.repository/nginx-repo 2022-11-23T14:21:10+05:30  True   successful scan, found 3 tags


    NAME                        LATEST IMAGE
    imagepolicy/nginx-policy    docker.io/sid/nginx:1.2.0   True   latest image tag for 'docker.io/sid/nginx' resolved to: 1.2.0
    ```

> [!important]
> **Warning**
>
> Ensure your registry credentials are correctly configured so Flux can access private repositories.

---

### 2\. Image Automation Controller

This controller takes the resolved image tag and injects it into your Git repository.

1.  **Create an ImageUpdateAutomation**  
    Point Flux at your Git repo path and specify commit details:

    ```
    flux create image update nginx-update \
      --git-repo-ref=nginx-app \
      --git-repo-path="./nginx/manifests" \
      --checkout-branch=main \
      --push-branch=main \
      --author-name=fluxcdbot \
      --author-email=fluxcdbot@users.noreply.github.com \
      --commit-template="{{range .Updated.Images}}{{println .}}{{end}}"
    ```

2.  **Annotate Your Deployment**  
    Mark the image field with the policy reference so Flux knows which tags to update:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx
    spec:
      template:
        spec:
          containers:
            - name: nginx
              image: sid/nginx:1.2.0 # {"imagepolicy":"flux-system:nginx-policy"}
    ```

3.  **Observe the Automation**

    ```
    flux get image all
    ```

    After Flux commits the update, you’ll see:

    ```
    NAME                                     READY  MESSAGE
    image.repository/nginx-repo              True   successful scan, found 3 tags
    imagepolicy/nginx-policy                 True   latest image tag for 'docker.io/sid/nginx' resolved to: 1.2.0
    imageautomation/nginx-update             True   committed and pushed 86a9a9ac42ba524ca543f07bd4872c357ba to main
    ```

---

## Workflow Summary

1.  **Registry Scan**: Image Reflector fetches new tags.
2.  **Policy Resolve**: ImagePolicy picks the latest eligible tag.
3.  **Git Update**: Image Automation clones your repo and updates the annotated fields.
4.  **Commit & Push**: Changes are pushed back to Git and then applied to the cluster via Flux.

---

## Links and References

- [Flux Documentation – Image Automation](https://fluxcd.io/docs/components/image/overview/)
- [Semantic Versioning Specification](https://semver.org/)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/f6b0a652-df6c-4b40-9011-05aba7c505d9)**
>
> Watch video content
