# Using Helm Charts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Lens-Kubernetes-IDE/Lens-Introduction/Using-Helm-Charts)

---

## Table of Contents

- Using Helm Charts
  - Prerequisites
  - 1. Add Helm Repositories in Lens
  - 2. Browse and Search Charts
  - 3. Install the Cassandra Chart
  - 4. Review and Customize Default Values
  - 5. Inspect Deployed Resources
  - 6. Connect to Cassandra
  - Links and References
  - Watch Video
    - A. Using a Temporary Pod
    - B. Port-Forward from Local Host

---

## Content

Lens - Kubernetes IDE

Lens Introduction

# Using Helm Charts

Deploying applications to Kubernetes is seamless with Helm charts and Lens. In this guide, you’ll learn how to add Helm repositories, browse and install charts, customize values, inspect deployed resources, and connect to your application—all within Lens.

## Prerequisites

> [!important]
> **Prerequisites**
>
> - Lens installed and connected to your Kubernetes cluster
> - [Helm](https://helm.sh/docs/) CLI installed and configured
> - Access to the internet (for public Helm repositories)

---

## 1\. Add Helm Repositories in Lens

1.  Open Lens and select **Clusters → _your-cluster_**.
2.  Go to **Lens → Preferences → Kubernetes → Helm**.
3.  Click **Add** to include community and custom repositories (e.g., Aerokube, Armory, Bitnami).

![The image shows a software interface for managing Helm charts, with a dropdown menu listing various repositories and an option to add a custom Helm repository.](https://kodekloud.com/kk-media/image/upload/v1752881202/notes-assets/images/Lens-Kubernetes-IDE-Using-Helm-Charts/helm-charts-management-interface.jpg)

---

## 2\. Browse and Search Charts

1.  Press **Esc** to close Preferences.
2.  Navigate to **Apps → Charts** in the sidebar.
3.  Filter by repository or search for **cassandra**.

![The image shows a software interface listing various Helm charts, including their names, descriptions, versions, app versions, and repositories. The interface appears to be part of a Kubernetes management tool.](https://kodekloud.com/kk-media/image/upload/v1752881203/notes-assets/images/Lens-Kubernetes-IDE-Using-Helm-Charts/helm-charts-kubernetes-interface.jpg)

Click **Details** on the Cassandra chart to view installation steps and default values.

---

## 3\. Install the Cassandra Chart

You can install directly in Lens or via the CLI:

```
# Add Bitnami repository (if not already added)
helm repo add bitnami https://charts.bitnami.com/bitnami


# Install Cassandra with default settings
helm install my-release bitnami/cassandra


# Install Cassandra with custom values
helm install my-release -f values.yaml bitnami/cassandra
```

Back in Lens, click **Install**, review the form, then click **Install** again. Lens will deploy the chart to your cluster.

---

## 4\. Review and Customize Default Values

Before finalizing, Lens displays the `values.yaml`. Tweak global settings, storage, and more:

```
## Global Docker image parameters
global:
  imageRegistry: ""
  imagePullSecrets: []
  storageClass: ""


## Common parameters
nameOverride: ""
fullnameOverride: ""
commonLabels: {}
commonAnnotations: {}
clusterDomain: cluster.local
extraDeploy: []


## Diagnostic mode
diagnosticMode:
  enabled: false
  command:
    - sleep
```

> [!important]
> **Tip**
>
> Customize `storageClass` and `imagePullSecrets` to match your Kubernetes environment.

---

## 5\. Inspect Deployed Resources

After installation, click **View Helm Release** in Lens to explore all resources:

| Resource Type  | Description                           |
| -------------- | ------------------------------------- |
| ServiceAccount | Identity for Cassandra pods           |
| Secret         | Stores credentials (`cassandra` user) |
| Service        | Exposes port 9042                     |
| StatefulSet    | Manages Cassandra pods with storage   |
| ConfigMap      | Configuration for Cassandra           |

![The image shows a Kubernetes dashboard in Minikube, displaying details of a Cassandra StatefulSet, including its status, labels, and resource usage.](https://kodekloud.com/kk-media/image/upload/v1752881204/notes-assets/images/Lens-Kubernetes-IDE-Using-Helm-Charts/kubernetes-dashboard-minikube-cassandra-statefulset.jpg)

Lens lets you edit metadata (labels, annotations) on the fly and view logs, metrics, and YAML definitions.

---

## 6\. Connect to Cassandra

### A. Using a Temporary Pod

```
kubectl run cassandra-client --rm -i --tty --restart=Never \
  --namespace default \
  --env CASSANDRA_PASSWORD=$CASSANDRA_PASSWORD \
  --image docker.io/bitnami/cassandra:4.0.0-debian-10-r3 -- bash
```

Inside the pod:

```
cqlsh -u cassandra -p $CASSANDRA_PASSWORD cassandra
```

### B. Port-Forward from Local Host

```
kubectl port-forward --namespace default svc/my-release-cassandra 9042:9042 &
cqlsh -u cassandra -p $CASSANDRA_PASSWORD 127.0.0.1 9042
```

---

## Links and References

- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Lens Documentation](https://docs.k8slens.dev/)
- [Bitnami Cassandra Helm Chart](https://github.com/bitnami/charts/tree/master/bitnami/cassandra)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/lens-kubernetes-ide/module/5612678e-a690-4e4e-b43d-966183dffdbf/lesson/9fc751f1-d8b5-4bd5-abb5-6c034f76da99)**
>
> Watch video content
