# DEMO Image Automation Controller Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Image-Automation-Controller/DEMO-Image-Automation-Controller-Policy)

---

## Table of Contents

- DEMO Image Automation Controller Policy
  - 1. Create an ImagePolicy
  - 2. Other Policy Selectors
  - 3. Apply and Verify the ImagePolicy
  - 4. Deployment Remains on the Previous Version
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Image Automation Controller

# DEMO Image Automation Controller Policy

In the previous lesson, we used the `ImageRepository` CRD to retrieve metadata for all available image tags. Now, we’ll introduce the `ImagePolicy` CRD to automatically select the latest tag based on semantic versioning. By the end of this guide, you’ll know how to configure, apply, and verify an `ImagePolicy` in your Flux-enabled Kubernetes cluster.

---

## 1\. Create an ImagePolicy

First, open your Flux cluster directory in VS Code:

```
cd ~/block-buster/flux-clusters/dev-cluster
```

Generate a new `ImagePolicy` manifest that references the existing `ImageRepository` (`8-demo-image-repo-bb-app`) and selects patch releases in the `7.8.x` range:

```
flux create image policy 8-demo-image-policy-bb-app \
  --image-ref=8-demo-image-repo-bb-app \
  --select-semver 7.8.x \
  --export > 8-demo-image-policy-bb-app.yaml
```

This command outputs a YAML similar to:

```
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImagePolicy
metadata:
  name: 8-demo-image-policy-bb-app
  namespace: flux-system
spec:
  imageRepositoryRef:
    name: 8-demo-image-repo-bb-app
  policy:
    semver:
      range: 7.8.x
```

Key fields:

- `imageRepositoryRef.name`: links to the `ImageRepository` you created earlier.
- `policy.semver.range`: `7.8.x` instructs Flux to pick the highest available patch within the 7.8 series.

> [!important]
> **Note**
>
> Semantic version ranges follow [npm semver syntax](https://github.com/npm/node-semver#ranges); here `7.8.x` matches `7.8.0`, `7.8.1`, etc.

---

## 2\. Other Policy Selectors

Flux supports multiple policy strategies for filtering image tags:

| Selector      | Description                          | Example Range |
| ------------- | ------------------------------------ | ------------- |
| `semver`      | Semantic version matching            | `^1.2.0`      |
| `filterTags`  | Regex-based tag filtering            | `'.*-rc.*'`   |
| (no `policy`) | Always pick the latest available tag | —             |

Example: a policy for release candidates (`-rc`):

```
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImagePolicy
metadata:
  name: podinfo-rc-policy
spec:
  imageRepositoryRef:
    name: podinfo
  filterTags:
    pattern: '.*-rc.*'
  policy:
    semver:
      range: '^1.x-0'
```

Or a policy that always selects the most recent tag:

```
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImagePolicy
metadata:
  name: minio-latest
spec:
  imageRepositoryRef:
    name: minio
  # Omitting `policy` means “pick the very latest tag.”
```

For more examples, see the [Flux Image Policy documentation](https://fluxcd.io/docs/components/image/imagerepositories/#policy).

---

## 3\. Apply and Verify the ImagePolicy

1.  Commit and push `8-demo-image-policy-bb-app.yaml` to your Git repository.
2.  Run Flux CLI to view all image resources:

    ```
    flux get image all
    ```

    Expected output:

    ```
    NAME                                        LAST SCAN                SUSPENDED   READY   MESSAGE
    imagerepository/8-demo-image-repo-bb-app    2023-04-06T19:37:25+05:30   False       True    successful scan: found 2 tags
    imagepolicy/8-demo-image-policy-bb-app                      True    Latest image tag for 'docker.io/siddharth67/bb-app-flux-demo' resolved to 7.8.1
    ```

3.  For a detailed policy status, inspect the resource in Kubernetes:

    ```
    kubectl get imagepolicy 8-demo-image-policy-bb-app \
      -n flux-system \
      -o yaml
    ```

    ```
    apiVersion: image.toolkit.fluxcd.io/v1beta2
    kind: ImagePolicy
    metadata:
      name: 8-demo-image-policy-bb-app
      namespace: flux-system
    spec:
      imageRepositoryRef:
        name: 8-demo-image-repo-bb-app
      policy:
        semver:
          range: 7.8.x
    status:
      latestImage: docker.io/siddharth67/bb-app-flux-demo:7.8.1
      conditions:
        - type: Ready
          status: "True"
          reason: Succeeded
          message: Latest image tag for 'docker.io/siddharth67/bb-app-flux-demo' resolved to 7.8.1
    ```

---

## 4\. Deployment Remains on the Previous Version

Even though the `ImagePolicy` has selected `7.8.1`, your running `Deployment` is still on `7.8.0`:

```
kubectl -n 8-demo get deploy block-buster -o wide
```

```
NAME          READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES                             SELECTOR
block-buster  1/1     1            1           29m   app          siddharth67/bb-app-flux-demo:7.8.0   app=block-buster
```

> [!important]
> **Warning**
>
> An `ImagePolicy` alone does **not** update running workloads. To automate commits of updated tags back into Git, you’ll need the **ImageUpdateAutomation** controller, which we’ll cover next.

---

## Links and References

- [Flux ImagePolicy Documentation](https://fluxcd.io/docs/components/image/imagerepositories/#policy)
- [Semantic Versioning (semver) Specification](https://semver.org/)
- [Flux CLI Reference](https://fluxcd.io/docs/cli/)

Thank you for following this lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/57e394ef-ba09-463d-a515-772847e10df6)**
>
> Watch video content
