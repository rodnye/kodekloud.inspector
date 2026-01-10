# DEMO HELM Controller with Helm Repository as Source - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/DEMO-HELM-Controller-with-Helm-Repository-as-Source)

---

## Table of Contents

- DEMO HELM Controller with Helm Repository as Source
  - 1. Helm Chart Package on GitHub Releases
  - 2. Chart Listing on Artifact Hub
  - 3. Defining a HelmRepository in Flux
  - 4. Customizing Chart Values
  - 5. Creating a HelmRelease with Flux
  - 6. Committing to Git and Triggering Flux
  - 7. Verifying Flux Resources
  - 8. Exploring Source Controller Data
  - 9. Validating the Deployment
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# DEMO HELM Controller with Helm Repository as Source

In this walkthrough, we’ll package a Helm chart as a `.tgz` artifact, host it in a Helm repository (via GitHub Pages and [Artifact Hub](https://artifacthub.io/)), then use Flux’s **Source Controller** and **Helm Controller** to automate its deployment.

---

## 1\. Helm Chart Package on GitHub Releases

We’ve bundled our application into `block-buster-helm-app-7.6.0.tgz` and published it on the [GitHub Releases](https://github.com/sidd-harth/block-buster-helm-app/releases) page. Below is an example of the default `values.yaml` included in the chart:

```
# Sample values.yaml (for reference)
replicaCount: 1

service:
  type: NodePort
  nodePort: 30006

namespace:
  name: 6-demo
```

![This image shows a GitHub release page for the "block-buster-helm-app" version 7.6.0, with assets available for download.](https://kodekloud.com/kk-media/image/upload/v1752877624/notes-assets/images/GitOps-with-FluxCD-DEMO-HELM-Controller-with-Helm-Repository-as-Source/github-release-block-buster-helm-app.jpg)

---

## 2\. Chart Listing on Artifact Hub

Our chart is also discoverable on [Artifact Hub](https://artifacthub.io/). Artifact Hub provides metadata, download statistics, and security reports for Helm charts.

```
# Extended sample values.yaml
replicaCount: 1

service:
  type: NodePort
  nodePort: 30006

namespace:
  name: 6-demo

labels:
  app:
    name: block-buster
    version: 7.6.0
    env: dev
```

| Feature         | Description                                            |
| --------------- | ------------------------------------------------------ |
| Repository URL  | `https://sidd-harth.github.io/block-buster-helm-app`   |
| Chart Version   | `7.6.0`                                                |
| Maintainer      | sidd-harth                                             |
| Install Command | `helm install my-app block-buster-app --version 7.6.0` |

![The image shows a webpage from Artifact Hub displaying a search result for a Helm chart named "block-buster-helm-app." It includes details like the repository, publisher, and version information.](https://kodekloud.com/kk-media/image/upload/v1752877625/notes-assets/images/GitOps-with-FluxCD-DEMO-HELM-Controller-with-Helm-Repository-as-Source/artifact-hub-helm-chart-search-results.jpg)

![The image shows a dashboard from Artifact Hub displaying a bar chart of package views over the last 30 days, along with related package information and a security report indicating vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752877627/notes-assets/images/GitOps-with-FluxCD-DEMO-HELM-Controller-with-Helm-Repository-as-Source/artifact-hub-dashboard-bar-chart.jpg)

You could install manually:

```
helm repo add block-buster-app https://sidd-harth.github.io/block-buster-helm-app/
helm install my-block-buster-helm-app block-buster-app/block-buster-helm-app --version 7.6.0
```

---

## 3\. Defining a HelmRepository in Flux

To automate updates, Flux’s **Source Controller** can track the Helm repository for new chart versions.

```
cd block-buster/flux-clusters/dev-cluster/

flux create source helm 6-demo-source-helm-bb-app \
  --url https://sidd-harth.github.io/block-buster-helm-app \
  --interval 1m \
  --timeout 10s \
  --export > 6-demo-source-helm-bb-app.yaml
```

This generates:

```
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: 6-demo-source-helm-bb-app
  namespace: flux-system
spec:
  url: https://sidd-harth.github.io/block-buster-helm-app
  interval: 1m0s
  timeout: 10s
```

> [!important]
> **Note**
>
> Adjust `--interval` and `--timeout` to suit your release cadence and network conditions.

---

## 4\. Customizing Chart Values

Create a file named `6-demo-values.yaml` to override default settings:

```
replicaCount: 2

service:
  type: NodePort
  nodePort: 30006

namespace:
  name: 6-demo

labels:
  app:
    name: block-buster
    version: 7.6.0
    env: dev
```

Save it alongside your Flux manifests.

---

## 5\. Creating a HelmRelease with Flux

Now define a `HelmRelease` to instruct Flux’s **Helm Controller** to deploy the chart:

```
flux create helmrelease 6-demo-helm-release-bb-app \
  --chart block-buster-helm-app \
  --interval 10s \
  --target-namespace 6-demo \
  --source HelmRepository/6-demo-source-helm-bb-app \
  --values 6-demo-values.yaml \
  --export > 6-demo-helm-release-bb-app.yaml
```

Generated manifest:

```
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: 6-demo-helm-release-bb-app
  namespace: flux-system
spec:
  interval: 10s
  targetNamespace: 6-demo
  chart:
    spec:
      chart: block-buster-helm-app
      sourceRef:
        kind: HelmRepository
        name: 6-demo-source-helm-bb-app
      reconcileStrategy: ChartVersion
  values:
    replicaCount: 2
    service:
      type: NodePort
      nodePort: 30006
    namespace:
      name: 6-demo
    labels:
      app:
        name: block-buster
        version: 7.6.0
        env: dev
```

---

## 6\. Committing to Git and Triggering Flux

```
git add \
  6-demo-source-helm-bb-app.yaml \
  6-demo-helm-release-bb-app.yaml \
  6-demo-values.yaml

git commit -m "Add HelmRepository and HelmRelease for block-buster-app v7.6.0"
git push
```

Flux will detect the new manifests and begin reconciliation.

---

## 7\. Verifying Flux Resources

Check the status of your `HelmRepository`:

```
flux get sources helm -n flux-system

NAME                          READY  MESSAGE
6-demo-source-helm-bb-app     True   stored artifact: revision 'sha256:...'
```

List all source types:

```
flux get sources -A
```

Inspect your `HelmRelease`:

```
flux get helmreleases -A

NAME                          READY  MESSAGE
6-demo-helm-release-bb-app    True   Release reconciliation succeeded
```

---

## 8\. Exploring Source Controller Data

Enter the `source-controller` pod to view how Flux stores chart artifacts:

![The image shows a Visual Studio Code interface with a terminal open at the bottom and a YAML file being edited. The terminal is in a directory related to a Kubernetes cluster setup.](https://kodekloud.com/kk-media/image/upload/v1752877628/notes-assets/images/GitOps-with-FluxCD-DEMO-HELM-Controller-with-Helm-Repository-as-Source/vscode-terminal-yaml-kubernetes-setup.jpg)

```
kubectl -n flux-system exec deploy/source-controller -- sh
/data$ ls -d */
gitrepository/  bucket/  helmchart/  helmrepository/
/data$ cd helmrepository/flux-system/6-demo-source-helm-bb-app/
/data/helmrepository/...$ cat index-*.yaml
/data$ cd ../helmchart/flux-system/6-demo-helm-release-bb-app/
/data/...$ tar -tf latest.tar.gz
# Shows Chart.yaml, values.yaml, templates/, etc.
```

| Resource       | Stored Data                              |
| -------------- | ---------------------------------------- |
| HelmRepository | Index files (versions, URLs)             |
| HelmChart      | Unpacked chart with templates & defaults |

---

## 9\. Validating the Deployment

Once reconciled, Flux will create the target namespace (`6-demo`) and deploy your app:

```
kubectl -n 6-demo get all
```

You should see:

- 2 Pods (as per `replicaCount`)
- A Deployment
- A NodePort Service on port 30006

Access the game in your browser:

```
http://<node-ip>:30006
```

![The image shows a "Block Buster" game interface with colorful blocks, a paddle, and a ball. It includes game details like level, score, and lives, along with some technical information about the app.](https://kodekloud.com/kk-media/image/upload/v1752877629/notes-assets/images/GitOps-with-FluxCD-DEMO-HELM-Controller-with-Helm-Repository-as-Source/block-buster-game-interface-colorful-blocks.jpg)

> [!important]
> **Try It Out**
>
> Starting with version 7.6.0, Block Buster introduces multiple levels. Complete Level One to unlock Level Two!

---

## Links and References

- [Flux Documentation](https://fluxcd.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)
- [Artifact Hub](https://artifacthub.io/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Congratulations—you’ve automated the deployment of a Helm chart `.tgz` artifact using Flux’s Helm Controller and Source Controller!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/ecf68189-22e7-42cb-8d37-42c920fc6eff)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/a5be4a2b-b5d7-46ea-9b43-c41d097ba161)**
>
> Practice lab
