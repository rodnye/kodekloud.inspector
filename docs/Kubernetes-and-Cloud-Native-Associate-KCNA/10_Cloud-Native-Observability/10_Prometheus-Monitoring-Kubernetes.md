# Prometheus Monitoring Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Observability/Prometheus-Monitoring-Kubernetes)

---

## Table of Contents

- Prometheus Monitoring Kubernetes
  - Monitoring Targets in Kubernetes
  - Using DaemonSets for Node Exporters
  - Deploying Prometheus with Helm
  - The Prometheus Operator
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Observability

# Prometheus Monitoring Kubernetes

In this lesson, we explore how to leverage Prometheus for monitoring both your applications and the Kubernetes cluster itself. By deploying Prometheus directly on the cluster, you can efficiently observe your applications while utilizing Kubernetes’ built-in features to monitor infrastructure components.

![The image illustrates a Kubernetes cluster architecture, showing a control plane and nodes, with emphasis on deployment proximity and existing infrastructure utilization.](https://kodekloud.com/kk-media/image/upload/v1752880545/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_70.jpg)

Deploying Prometheus on Kubernetes offers two main advantages:

- It colocates the monitoring tool near your applications.
- It utilizes the existing Kubernetes infrastructure, eliminating the need for separate servers or virtual machines.

## Monitoring Targets in Kubernetes

There are two primary targets when monitoring Kubernetes with Prometheus:

1.  **Applications on the Cluster**: This includes web applications, servers, or any service running on Kubernetes.
2.  **Cluster-Level Components**: This covers control plane elements (like the API server, kube scheduler, CoreDNS), the kubelet (which provides container-level metrics similar to cAdvisor), and metrics exposed by the kube-state-metrics container.

Additionally, every node in your cluster (essentially a Linux server) should run a node exporter to expose CPU, memory, and network statistics.

![The image outlines monitoring applications on Kubernetes, detailing components like Control-Plane, Kubelet, Kube-state-metrics, and Node-exporter for various metrics.](https://kodekloud.com/kk-media/image/upload/v1752880546/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_140.jpg)

> [!important]
> **Note**
>
> Kubernetes does not natively expose cluster-level metrics such as pods, deployments, or services. To gain access to these metrics, you must deploy the kube-state-metrics container.

![The image explains that deploying the kube-state-metrics container is necessary to collect cluster-level metrics in a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752880547/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_170.jpg)

## Using DaemonSets for Node Exporters

Every host in the cluster should run a node exporter to expose essential system statistics such as CPU, memory, and network utilization. The recommended approach is to deploy the node exporter as a Kubernetes DaemonSet. This ensures that:

- Each node runs a node exporter pod.
- The system automatically schedules the node exporter on any new nodes added to the cluster.

![The image explains using a Kubernetes DaemonSet to run node_exporter on every node in a cluster for monitoring CPU, memory, and network stats.](https://kodekloud.com/kk-media/image/upload/v1752880548/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_210.jpg)

Kubernetes service discovery further simplifies this process by accessing the Kubernetes API. It automatically identifies all the targets that Prometheus must scrape, including Kubernetes components, node exporters, and kube-state-metrics endpoints.

![The image illustrates Kubernetes service discovery, showing interaction between Kubernetes API, Prometheus, and components like node exporters and kube state metrics.](https://kodekloud.com/kk-media/image/upload/v1752880549/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_260.jpg)

## Deploying Prometheus with Helm

While Prometheus can be installed manually by creating deployments, services, config maps, and secrets, this method can be complex. A more efficient approach is to deploy Prometheus using Helm charts, specifically the Prometheus operator chart, which automates the configuration of all necessary components.

![The image illustrates deploying Prometheus using a Helm chart, showing connections to Alert Manager and Push Gateway.](https://kodekloud.com/kk-media/image/upload/v1752880550/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_300.jpg)

Helm, the package manager for Kubernetes, simplifies deployment by bundling all configuration files into a single package known as a Helm chart. With Helm, deploying Prometheus becomes as simple as executing the following command:

```
helm install
```

Helm charts are collections of templates and YAML files, bundled in a repository for easy sharing—similar to how you share code on GitHub or GitLab. In this case, the Prometheus setup uses the Kube Prometheus Stack from the Prometheus community repository, which includes components such as Alertmanager, Pushgateway, and the Prometheus operator.

![The image explains Helm charts as collections of template and YAML files for Kubernetes, highlighting sharing capabilities and providing a GitHub link to a specific chart repository.](https://kodekloud.com/kk-media/image/upload/v1752880551/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_420.jpg)

## The Prometheus Operator

The Prometheus operator is a Kubernetes extension that simplifies managing the Prometheus lifecycle. By extending the Kubernetes API, the operator streamlines tasks such as initialization, configuration, and automated restarts when configurations change. Although it can be run independently, using the operator with Helm streamlines the entire deployment process.

![The image describes the Kube-Prometheus-stack using the Prometheus Operator to manage Kubernetes applications, with a GitHub link for more information.](https://kodekloud.com/kk-media/image/upload/v1752880552/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Monitoring-Kubernetes/frame_500.jpg)

With the Prometheus operator, you have access to various custom resources that simplify management. Instead of manually creating standard Kubernetes objects like Deployments or StatefulSets, you define higher-level abstractions such as the Prometheus resource. For example, consider the following custom resource to define a Prometheus instance:

```
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  annotations:
    meta.helm.sh/release-name: prometheus
    meta.helm.sh/release-namespace: default
  creationTimestamp: "2022-11-18T01:19:29Z"
  generation: 1
  labels:
    app: kube-prometheus-stack-prometheus
    name: prometheus-kube-prometheus-prometheus
spec:
  alerting:
    alertmanagers:
      - apiVersion: v2
        name: prometheus-kube-prometheus-alertmanager
        namespace: default
        pathPrefix: /
        port: http-web
```

This abstraction allows you to customize the Prometheus deployment using a more simplified API. Similar abstractions exist for Alertmanager, Prometheus rules, and configurations pertaining to alerting. Additionally, resources like ServiceMonitor and PodMonitor let you define which endpoints Prometheus should scrape.

> [!important]
> **Note**
>
> These high-level abstractions not only simplify the management of Prometheus instances but also allow for easier modifications and maintenance of your monitoring setup within a Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/70e17eea-7e9b-4f65-87a4-1cdb5631e0dc/lesson/3d7419b6-4100-4307-9cfa-7111461b21b1)**
>
> Watch video content
