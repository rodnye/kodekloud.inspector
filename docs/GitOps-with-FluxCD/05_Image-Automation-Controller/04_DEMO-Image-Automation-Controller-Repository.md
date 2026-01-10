# DEMO Image Automation Controller Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Image-Automation-Controller/DEMO-Image-Automation-Controller-Repository)

---

## Table of Contents

- DEMO Image Automation Controller Repository
  - Overview of Flux Image Commands
  - 1. Create an ImageRepository
  - 2. Update the Application and Push a New Tag
  - 3. Flux Scans the New Tag
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab
    - 2.1 Modify the PHP Source
    - 2.2 Build and Push the Docker Image

---

## Content

GitOps with FluxCD

Image Automation Controller

# DEMO Image Automation Controller Repository

In this tutorial, we’ll use Flux’s `ImageRepository` Custom Resource Definition (CRD) to connect to a Docker Hub repository and fetch image tags automatically. Flux provides three subcommands under `flux create image`: `policy`, `repository`, and `update`. We’ll focus on the **repository** subcommand to set up continuous image discovery and metadata polling.

## Overview of Flux Image Commands

| Subcommand | Purpose                                        | Example                                                         |
| ---------- | ---------------------------------------------- | --------------------------------------------------------------- |
| policy     | Define rules for selecting image tags          | `flux create image policy my-policy --image nginx`              |
| repository | Register an image source for Flux to scan      | `flux create image repository my-repo --image nginx`            |
| update     | Manually bump image tags on Kubernetes objects | `flux create image update deployment/my-app --policy my-policy` |

## 1\. Create an ImageRepository

First, verify the available options:

```
root ~/block-buster/flux-clusters/dev-cluster main
➜ flux create image
policy       repository   update
```

Define an `ImageRepository` manifest that points to your Docker Hub image and polls it at a regular interval:

```
apiVersion: image.toolkit.fluxcd.io/v1beta2
kind: ImageRepository
metadata:
  name: bb-app-image-repo
  namespace: flux-system
spec:
  image: docker.io/siddharth67/bb-app-flux-demo
  interval: 10s
```

> [!important]
> **Note**
>
> Make sure your Git repository includes the `flux-system` namespace and the Flux controllers are installed before applying this manifest.

You can export this manifest directly with the Flux CLI:

```
root ~/block-buster/flux-clusters/dev-cluster main
➜ flux create image repository bb-app-image-repo \
    --image docker.io/siddharth67/bb-app-flux-demo \
    --interval 10s \
    --export > bb-app-image-repo.yaml
```

Commit and push the YAML to your Git repository, then trigger reconciliation:

```
➜ flux reconcile source git flux-system
✔ GitRepository annotated
✔ waiting for GitRepository reconciliation
✔ fetched revision main@sha1:dc9922e7f45b3bcd8d085e68766869b15a17919c
```

Verify the repository registration and initial scan:

```
➜ flux get image all
NAME                         LAST SCAN                   SUSPENDED   READY   MESSAGE
imagerepository/bb-app-image-repo 2023-04-06T19:19:02+05:30 False       True    successful scan: found 1 tags
```

At this point, Flux has detected the `7.8.0` tag in your Docker Hub repository.

## 2\. Update the Application and Push a New Tag

### 2.1 Modify the PHP Source

Open `bb-app-source/src/index.php` (and `level2.php`) and update the styling as well as the app version to **7.8.1**:

```
<?php
echo "<table class='container'>
<tr>
  <td style='background-color:#222222; width:25%'><h2>&nbsp; Pod Name</h2></td>
  <td style='background-color:#222222'><h3>&nbsp;". getenv("MY_POD_NAME") ."</h3></td>
</tr>
<tr>
  <td style='background-color:#3C3C3C'><h2>&nbsp; Pod IP</h2></td>
  <td style='background-color:#3C3C3C'><h3>&nbsp;". getenv("MY_POD_IP") ."</h3></td>
</tr>
<tr>
  <td style='background-color:#222222'><h2>&nbsp; Namespace</h2></td>
  <td style='background-color:#222222'><h3>&nbsp;". getenv("MY_POD_NAMESPACE") ."</h3></td>
</tr>
<tr>
  <td style='background-color:#3C3C3C'><h2>&nbsp; K8S Node</h2></td>
  <td style='background-color:#3C3C3C'><h3>&nbsp;". getenv("MY_NODE_NAME") ."</h3></td>
</tr>
<tr>
  <td style='background-color:#222222'><h2>&nbsp; App Version</h2></td>
  <td style='background-color:#222222'><h3>&nbsp;7.8.1 (minor color change)</h3></td>
</tr>
<tr>
  <td style='background-color:#3C3C3C'><h2>&nbsp; What’s New</h2></td>
  <td style='background-color:#3C3C3C'><h3>&nbsp;BugFix – HighScore is persisted</h3></td>
</tr>
</table>";
?>
```

> [!important]
> **Warning**
>
> Be sure to update **all** source files (e.g., `level2.php`) to keep version consistency.

### 2.2 Build and Push the Docker Image

Ensure your `Dockerfile` includes the necessary PHP extensions and copies your application files:

```
FROM php:7.4-apache
RUN docker-php-ext-install mysqli
COPY highscore.php index.php level2.php /var/www/html/
COPY images /var/www/html/images
EXPOSE 80
```

Build and tag the new image version **7.8.1**:

```
root ~/block-buster/flux-clusters/dev-cluster main
cd ../bb-app-source/src
➜ docker build -t siddharth67/bb-app-flux-demo:7.8.1 .
```

Push the updated image to Docker Hub:

```
➜ docker push siddharth67/bb-app-flux-demo:7.8.1
```

After pushing, verify on Docker Hub that the `7.8.1` tag is available.

## 3\. Flux Scans the New Tag

Trigger an immediate reconciliation for the `ImageRepository`:

```
➜ flux reconcile image repository bb-app-image-repo
```

Re-run the `flux get image` command to confirm that two tags are now detected:

```
➜ flux get image all
NAME                         LAST SCAN                   SUSPENDED   READY   MESSAGE
imagerepository/bb-app-image-repo 2023-04-06T19:23:30+05:30 False       True    successful scan: found 2 tags
```

Alternatively, inspect the resource via `kubectl`:

```
kubectl -n flux-system get imagerepositories.image.toolkit.fluxcd.io bb-app-image-repo -o yaml
```

```
status:
  lastScanResult:
    latestTags:
      - "7.8.1"
      - "7.8.0"
    tagCount: 2
```

Even though two tags exist, your Deployment is still running the old version:

```
kubectl -n a-demo get deploy block-buster -o wide
```

```
NAME           READY UP-TO-DATE AVAILABLE AGE   CONTAINERS IMAGES                             SELECTOR
block-buster   1/1   1          1         15m   app        siddharth67/bb-app-flux-demo:7.8.0 app=block-buster
```

## Next Steps

Automate tag selection and deployment by creating a Flux **ImagePolicy** that matches your versioning scheme (e.g., semver or regex). This will ensure your Kubernetes workload always uses the latest approved image.

---

## Links and References

- [Flux Image Automation](https://fluxcd.io/docs/components/image/)
- [Kubernetes API Reference](https://kubernetes.io/docs/reference/)
- [Docker Hub Repository](https://hub.docker.com/)
- [GitOps with Flux](https://fluxcd.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/be049595-7896-451b-b9fc-673552cab8b3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/e4076c7b-6728-412c-b4d7-9316fc346fc5/lesson/9ab613c6-d810-4ae5-ae9a-856294eb32c4)**
>
> Practice lab
