# Prometheus Chart Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Prometheus-Chart-Overview)

---

## Table of Contents

- Prometheus Chart Overview
  - Listing All Resources
  - StatefulSets
  - Deployments
  - DaemonSet
  - Pods and Services
  - Inspecting the Prometheus Server Configuration
  - Configuring the Init Container
  - The Main Prometheus Container
  - Inspecting the Prometheus Secret
  - Examining the ConfigMap for Prometheus Rule Files
  - Reviewing the Prometheus Operator Configuration
  - Watch Video
    - Key Sections in the Prometheus Container Configuration

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Prometheus Chart Overview

In this lesson, you will review the Kubernetes resources created by the installed Helm chart. The following sections provide a detailed explanation of each component, accompanied by commands and configuration excerpts.

> [!important]
> **Overview**
>
> This guide explains how different Kubernetes resources are organized after installing the Prometheus Helm chart, including StatefulSets, Deployments, DaemonSets, and Services.

## Listing All Resources

Begin by running the following command to list every resource created by the Helm chart:

```
kubectl get all
```

The output displays several components. We will start at the bottom of the list with the StatefulSets.

## StatefulSets

There are two StatefulSets in the cluster:

- **Prometheus StatefulSet**: This StatefulSet creates the Prometheus server instance. Although the name may be long, it represents the actual Prometheus instance. Connecting to Prometheus means connecting to the container running in this StatefulSet.
- **Alertmanager StatefulSet**: This StatefulSet is responsible for running Alertmanager, which handles alert notifications.

## Deployments

Above the StatefulSets, you will notice several Deployments. Key deployments include:

- **Prometheus Grafana Deployment**: Grafana serves as the graphical UI tool to help visualize data from Prometheus. It is automatically deployed and configured via the Helm chart.
- **Kube Prometheus Operator Deployment**: The Prometheus Operator manages the lifecycle of the Prometheus instance, including configuration updates and restarts as needed.
- **Kube-state-metrics Deployment**: This deployment runs a container that gathers metrics about Kubernetes objects (for example, deployments, services, and pods).

ReplicaSets corresponding to these deployments are also present and ensure that the correct number of pod replicas is maintained.

## DaemonSet

Above the Deployments section, there is a DaemonSet called **Node Exporter**. This resource deploys a Node Exporter Pod on every cluster node, including any nodes added later. The Node Exporter collects host-level metrics such as CPU utilization, memory usage, and file system details. For example, if your cluster has two nodes (confirmed using `kubectl get nodes`), you will see two ready Node Exporter Pods.

## Pods and Services

The Pods section lists all deployed pods, including:

- Prometheus server pod
- Alertmanager pod
- Grafana pod
- Prometheus Operator pod
- kube-state-metrics pod
- Two Node Exporter pods (one per node)

The Services section exposes these pods as ClusterIP services, meaning they are accessible only within the cluster. To expose the Prometheus server or Grafana externally, you would need to configure an ingress, load balancer, or proxy.

Below is an excerpt from the output of `kubectl get all`:

```
NAME                                                           READY   STATUS    RESTARTS   AGE
pod/alertmanager-prometheus-kube-prometheus-alertmanager-0      2/2     Running   1          158m
pod/prometheus-grafana-d978ddcb9-xhvgw                           3/3     Running   0          158m
pod/prometheus-kube-state-metrics-649f8795d4-fltnq               1/1     Running   0          158m
pod/prometheus-prometheus-prometheus-0                           1/1     Running   0          158m
pod/prometheus-node-exporter-xntb2                              1/1     Running   0          158m


NAME                                                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                     AGE
service/alertmanager-operated                       ClusterIP   None             <none>        9093/TCP,9094/TCP,9094/UDP   158m
service/kubernetes                                  ClusterIP   10.100.0.1       <none>        443/TCP                     3d19h
service/prometheus-grafana                          ClusterIP   10.100.235.247   <none>        80/TCP                      158m
service/prometheus-kube-prometheus-alertmanager      ClusterIP   10.100.253.114   <none>        443/TCP                    158m
service/prometheus-kube-prometheus                   ClusterIP   10.100.133.149   <none>        8080/TCP                   158m
service/prometheus-kube-state-metrics               ClusterIP   None             <none>        9090/TCP                   158m
service/prometheus-operated                         ClusterIP   10.100.248.61    <none>        9100/TCP                   158m
service/prometheus-prometheus-node-exporter         ClusterIP   None             <none>        9100/TCP                   158m


NAME                                                      DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
daemonset.apps/prometheus-prometheus-node-exporter          2         2         2       2            2           <none>          158m


NAME                                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/prometheus-grafana                1/1     1           1           158m
deployment.apps/prometheus-kube-prometheus-operator 1/1     1           1           158m
deployment.apps/prometheus-kube-state-metrics     1/1     1           1           158m


NAME                                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/prometheus-grafana-d978ddcb9              1         1         1       158m
replicaset.apps/prometheus-kube-prometheus-operator-66c5f68b9 1       1         1       158m
replicaset.apps/prometheus-kube-state-metrics-649f8795d4    1         1         1       158m


NAME                                          READY   AGE
statefulset.apps/alertmanager-prometheus-kube-prometheus-alertmanager   1/1    158m
statefulset.apps/prometheus-prometheus                              1/1    158m
```

## Inspecting the Prometheus Server Configuration

To view the configuration of the Prometheus server StatefulSet, run:

```
kubectl describe statefulset prometheus-prometheus-kube-prometheus-prometheus
```

The output contains extensive details, including container arguments, environment variables, mounts, and probes.

### Key Sections in the Prometheus Container Configuration

- **Container Arguments**:  
  These include parameters such as:
  - `--web.console.templates` and `--web.console.libraries` paths
  - Retention time using `--storage.tsdb.retention.time=10d`
  - Path to configuration files and storage directories
  - Liveness, readiness, and startup endpoints

- **Volume Mounts**:  
  For example:
  - `/etc/prometheus/certs`: Mounted from a secret for TLS assets.
  - `/etc/prometheus/config_out`: Mounted as read-only for configuration output.
  - `/prometheus`: Mounted for Prometheus TSDB (Time Series Database) storage.

To capture the complete configuration, pipe the output to a file:

```
kubectl describe statefulset prometheus-prometheus-kube-prometheus-prometheus > prometheus.yaml
```

Open `prometheus.yaml` in your editor to take advantage of syntax highlighting.

## Configuring the Init Container

Within the `prometheus.yaml` file, locate the configuration for the init container named `init-config-reloader`. This container uses the Prometheus config reloader image and is responsible for generating the initial Prometheus configuration before the main container starts. A snippet of its configuration is as follows:

```
init-config-reloader:
  Image: quay.io/prometheus-operator/prometheus-config-reloader:v0.60.1
  Port: 8080/TCP
  Host Port: 0/TCP
  Command:
    - /bin/prometheus-config-reloader
  Args:
    - --watch-interval=0
    - --listen-address=:8080
    - --config-file=/etc/prometheus/config/prometheus.yaml.gz
    - --config-envsubst-file=/etc/prometheus/config_out/prometheus.env.yaml
    - --watched-dir=/etc/prometheus/rules/
    - prometheus-prometheus-kube-prometheus-rulefiles-0
  Limits:
    cpu: 200m
    memory: 50Mi
  Requests:
    cpu: 200m
```

Below this section, you will find the main Prometheus container configuration.

## The Main Prometheus Container

The main container is configured with the following snippet:

```
prometheus:
  Image: quay.io/prometheus/prometheus:v2.39.1
  Port: 9090/TCP
  Host Port: 0/TCP
  Args:
    - --web.console.templates=/etc/prometheus/consoles
    - --web.console.libraries=/etc/prometheus/console_libraries
    - --storage.tsdb.retention.time=10d
    - --config.file=/etc/prometheus/config_out/prometheus.env.yaml
    - --storage.tsdb.path=/prometheus
    - --web.enable-lifecycle
    - --web.external-url=http://prometheus-kube-prometheus-prometheus.default:9090
    - --web.route-prefix=/
    - --storage.tsdb.wal-compression
```

These arguments define paths for console templates, configuration files, and the data storage directory.

Additional mounted volumes in the Prometheus container include:

- A volume named `config`, containing the Prometheus configuration from a Secret.
- A volume for rules retrieved from a ConfigMap.
- Volumes such as `tls-assets` (for TLS certificates) and `config-out`.

## Inspecting the Prometheus Secret

To examine the secret that holds the Prometheus configuration, execute:

```
kubectl describe secret prometheus-prometheus-kube-prometheus-prometheus
```

A sample output shows that the secret contains a compressed configuration file (`prometheus.yaml.gz`):

```
Name:              prometheus-prometheus-kube-prometheus
Namespace:         default
Labels:            managed-by=prometheus-operator
Annotations:       generated: true


Type: Opaque


Data
====
prometheus.yaml.gz: 1723 bytes
```

## Examining the ConfigMap for Prometheus Rule Files

You can also inspect the ConfigMap that stores Prometheus rule files. After retrieving the ConfigMap details, you might find a rule file snippet defining recording rules and alert expressions. For example:

```
record: namespace_cpu:kube_pod_container_resource_limits:sum
expr: |
  max by (cluster, namespace, workload, pod) (
    label_replace(
      label_replace(
        kube_pod_owner(job="kube-state-metrics", owner_kind="ReplicaSet*"),
        "replicaset", "$1", "owner_name", "(.*)"
      ) on(replicaset, namespace) group_left(owner_name) topk by(replicaset, namespace) (
        kube_replicaset_owner(job="kube-state-metrics")
      )
    )
  )
labels:
  workload_type: deployment
```

The Prometheus Operator simplifies the management of these configurations by using Kubernetes manifests instead of directly modifying YAML files.

## Reviewing the Prometheus Operator Configuration

To inspect the Prometheus Operator Deployment, run:

```
kubectl get deployment
```

You will see entries for Prometheus Grafana, the Prometheus Operator, and kube-state-metrics. Then, describe the operator deployment:

```
kubectl describe deployment prometheus-kube-prometheus-operator > operator.yaml
```

Open the `operator.yaml` file to view the container named `kube-prometheus-stack`, whose configuration includes the following:

```
kube-prometheus-stack:
  Image: quay.io/prometheus-operator/prometheus-operator:v0.60.1
  Port: 10250/TCP
  Host Port: 0/TCP
  Args:
    - --kubelet-service=kube-system/prometheus-kube-prometheus-kubelet
    - --localhost=127.0.0.1
    - --prometheus-config-reloader=quay.io/prometheus-operator/prometheus-config-reloader:v0.60.1
    - --config-reloader-cpu-request=200m
    - --config-reloader-cpu-limit=200m
    - --config-reloader-memory-request=50Mi
    - --config-reloader-memory-limit=50Mi
    - --thanos-default-base-image=quay.io/thanos/thanos:v0.28.1
    - --web.enable-tls=true
    - --web.cert-file=/cert/cert
    - --web.key-file=/cert/key
    - --web.listen-address=10250
    - --web.tls-min-version=VersionTLS13
  Mounts:
    - /cert from tls-secret (ro)
```

This deployment is mainly responsible for managing Prometheus configurations and ensuring that all related resources (Secrets, ConfigMaps, StatefulSets) are correctly set up. Only essential resources, like the TLS certificate secret, are mounted.

> [!important]
> **Summary**
>
> This high-level overview outlines the structure and important components installed with the Helm chart. In later sections, you will learn how to modify these configurations using standard Kubernetes manifests without altering the generated YAML files directly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/cabca690-195e-4e68-8785-938fd09a887b)**
>
> Watch video content
