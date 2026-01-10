# Deploying Loki in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-2/Deploying-Loki-in-Kubernetes)

---

## Table of Contents

- Deploying Loki in Kubernetes
  - 1. Adding and Updating the Grafana Helm Repository
  - 2. Searching for the Loki Chart
  - 3. Inspecting and Customizing Chart Values
  - 4. Installing the Loki Stack with Helm
  - 5. Verifying the Deployment
  - Watch Video

---

## Content

Grafana Loki

Grafana Loki Essentials Part 2

# Deploying Loki in Kubernetes

In this guide, we demonstrate how to deploy Grafana Loki using Helm in a Kubernetes cluster. We cover adding and updating the Grafana Helm repository, searching for the appropriate Loki chart, customizing the default configuration values, and finally installing the Loki stack (which includes Loki, Promtail, and Grafana) with minimal manual configuration.

---

## 1\. Adding and Updating the Grafana Helm Repository

To begin, add the Grafana Helm repository by executing the following command:

```
helm repo add grafana https://grafana.github.io/helm-charts
```

You should receive output confirming that the repository has been added:

```
Documents\scratch\loki-demo
> helm repo add grafana https://grafana.github.io/helm-charts
"grafana" has been added to your repositories
```

Next, update your Helm repositories with:

```
helm repo update
```

The terminal output will indicate a successful update:

```
Documents\scratch\loki-demo
> helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "grafana" chart repository
...Successfully got an update from the "prometheus-community" chart repository
Update Complete. ⚓ Happy Helming! ⚓
```

> [!important]
> **Note**
>
> Ensure that your Helm version is up-to-date to prevent compatibility issues with newer charts.

---

## 2\. Searching for the Loki Chart

Grafana offers several Loki-related charts. To search for these charts within the Grafana repository, run:

```
helm search repo loki
```

You will see output similar to this:

```
NAME                              CHART VERSION   APP VERSION     DESCRIPTION
grafana/loki                     5.10.0          2.8.3          Helm chart for Grafana Loki in simple, scalable...
grafana/loki-canary              0.13.0          2.8.3          Helm chart for Grafana Loki Canary
grafana/loki-distributed         0.71.1          2.8.3          Helm chart for Grafana Loki in microservices mode
grafana/loki-simple-scalable     1.8.11          2.6.1          Helm chart for Grafana Loki in simple, scalable...
grafana/loki-stack               2.6.1           2.8.3          Loki: like Prometheus, but for logs.
grafana/fluent-bit               2.6.0           v2.1.0         Uses fluent-bit Loki go plugin for gathering logs...
grafana/promtail                 6.14.1          2.8.3          Promtail is an agent which ships the contents of log files.
```

For this deployment, we will use the **loki-stack** chart, which packages Loki, Promtail, and Grafana for a complete logging solution.

---

## 3\. Inspecting and Customizing Chart Values

Before installing the chart, it is best practice to review and customize its default configuration. Export the default values to a file named `values.yaml`:

```
helm show values grafana/loki-stack > values.yaml
```

Open `values.yaml` in your favorite editor to review the configuration. The file includes sections for Loki, Promtail, Fluent Bit, and Grafana. For instance, the Promtail configuration section may look like this:

```
promtail:
  enabled: true
  config:
    logLevel: info
    serverPort: 3101
    clients:
      - url: http://{{ .Release.Name }}:3100/loki/api/v1/push
```

This configuration ensures that Promtail is enabled and connected to the Loki server. Note that Fluent Bit is disabled and Grafana is disabled by default. Since Grafana is needed for dashboards, update the configurations as follows:

```
promtail:
  enabled: true
  config:
    logLevel: info
    serverPort: 3101
    clients:
      - url: http://{{ .Release.Name }}:3100/loki/api/v1/push


fluent-bit:
  enabled: false


grafana:
  enabled: true
  sidecar:
    datasources:
      label: ""
      labelValue: ""
      enabled: true
      maxLines: 1000
  image:
    tag: latest
```

> [!important]
> **Tip**
>
> You can adjust the Grafana image tag if you require a specific version for your environment.

---

## 4\. Installing the Loki Stack with Helm

With your customized `values.yaml` in place, install the Loki stack by running:

```
helm install --values values.yaml loki grafana/loki-stack
```

The installation process will output information similar to the following:

```
Documents\scratch\loki-demo
> helm install --values values.yaml loki grafana/loki-stack
W0806 19:03:54.310850 34388 warnings.go:70] policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+
W0806 19:03:54.312802 34388 warnings.go:70] policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+
W0806 19:03:54.381651 34388 warnings.go:70] policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+
W0806 19:03:54.382713 34388 warnings.go:70] policy/v1beta1 PodSecurityPolicy is deprecated in v1.21+
NAME: loki
LAST DEPLOYED: Sun Aug  6 19:03:53 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
The Loki stack has been deployed to your cluster. Loki can now be added as a datasource in Grafana.
See http://docs.grafana.org/features/datasources/loki/ for more detail.
Documents\scratch\loki-demo took 2s
```

This output verifies that your Loki stack has been successfully deployed. You can now add Loki as a data source in Grafana.

---

## 5\. Verifying the Deployment

Confirm that all components have been deployed by listing your Kubernetes resources:

```
kubectl get all
```

A sample output may look like this:

```
NAME                                      READY   STATUS      RESTARTS   AGE
pod/loki-0                                0/1     Running     0          40s
pod/loki-grafana-5df4fd7d99-x4794          2/2     Running     0          40s
pod/loki-promtail-bk9r                    1/1     Running     0          40s


NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)      AGE
service/kubernetes       ClusterIP   10.96.0.1       <none>        443/TCP      157d
service/loki           ClusterIP   10.96.247.199   <none>        3100/TCP     40s
service/loki-grafana   ClusterIP   10.103.158.170  <none>        80/TCP       40s
service/loki-headless  ClusterIP   None            <none>        3100/TCP     40s
service/loki-memberlist ClusterIP   None            <none>        7946/TCP     40s


NAME                                  DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
daemonset.apps/loki-promtail          1         1         1       1            1           <none>          40s


NAME                                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/loki-grafana             1/1     1            1           40s


NAME                                         DESIRED   CURRENT   READY   AGE
replicaset.apps/loki-grafana-5df4fd7d99       1         1         1       40s


NAME                               READY   AGE
statefulset.apps/loki             0/1     40s
```

This output confirms the deployment of key components:

- A StatefulSet for Loki
- A Deployment (and ReplicaSet) for Grafana
- A DaemonSet for Promtail, ensuring an instance runs on every node

> [!important]
> **Reminder**
>
> For multi-node clusters, Promtail will automatically run on every node, ensuring comprehensive log collection.

Once deployed, log in to Grafana to verify that Loki has been automatically added as a data source, simplifying your log monitoring workflow.

---

By following these steps, you have successfully deployed the Loki stack to your Kubernetes cluster using Helm. This complete logging solution integrates efficient log aggregation with Grafana dashboards for powerful monitoring and troubleshooting.

For further reading and additional resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Helm Documentation](https://helm.sh/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/bcacc3b5-9868-4ee5-9a59-a2b73b2c500f/lesson/cc132842-6da4-4924-98db-186bd08d88ea)**
>
> Watch video content
