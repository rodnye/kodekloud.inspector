# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Monitoring-Kubernetes/Introduction)

---

## Table of Contents

- Introduction
  - Monitoring Applications and Kubernetes Components
  - Deploying Node Exporter with DaemonSets
  - Deploying Prometheus on Kubernetes
  - The Prometheus Operator and Custom Resources
  - Conclusion
  - Watch Video
    - 1. Manual Deployment
    - 2. Using Helm and the Prometheus Operator

---

## Content

Prometheus Certified Associate (PCA)

Monitoring Kubernetes

# Introduction

In this guide, we explore how to utilize Prometheus for monitoring both applications running in a Kubernetes environment and the Kubernetes cluster itself. We focus on monitoring not only application workloads such as web servers but also critical Kubernetes components including the control plane, kubelet processes, kube-state metrics, and Node Exporter metrics. Deploying Prometheus on your Kubernetes cluster leverages its proximity to monitored targets and allows you to integrate it with existing infrastructure, eliminating the need for a separate monitoring server.

![The image is a diagram of a Kubernetes cluster, showing a control plane with components like API and nodes with kubelet. It emphasizes deploying close to targets and using existing Kubernetes infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752882986/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/kubernetes-cluster-diagram-control-plane.jpg)

## Monitoring Applications and Kubernetes Components

There are two primary monitoring focuses in a Kubernetes environment:

1.  **Applications Running on Kubernetes**  
    These include workloads such as web applications, web servers, and other services deployed in the cluster.
2.  **The Kubernetes Cluster Itself**  
    Monitoring cluster-level metrics requires tracking control plane components—like the API server, kube-scheduler, and CoreDNS—as well as the kubelet process that functions similarly to cAdvisor for container metrics. Additionally, kube-state metrics provide insights into deployments, pods, and other objects, while Node Exporter gathers essential statistics on CPU, memory, and network usage from each Linux host.

![The image is a slide about monitoring applications and Kubernetes clusters, detailing components like Control-Plane, Kubelet, Kube-state-metrics, and Node-exporter.](https://kodekloud.com/kk-media/image/upload/v1752882987/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/monitoring-apps-kubernetes-clusters.jpg)

> [!important]
> **Note**
>
> By default, Kubernetes does not expose cluster-level metrics for pods, deployments, or services. To collect these metrics, you must deploy the kube-state metrics container, which then advertises critical information directly to Prometheus.

## Deploying Node Exporter with DaemonSets

Every Kubernetes node ought to run a Node Exporter process to expose vital statistics such as CPU usage, memory consumption, and network throughput. Although you could manually install Node Exporter on each node or include it in your node images, a more efficient solution in Kubernetes is to deploy Node Exporter using a DaemonSet. This approach ensures that every node, including any new nodes joining the cluster, will automatically run the Node Exporter pod.

![The image explains the use of a node_exporter to expose CPU, memory, and network stats on every host, suggesting the use of a Kubernetes daemonSet for efficiency. It includes a diagram of a Kubernetes cluster with multiple nodes.](https://kodekloud.com/kk-media/image/upload/v1752882989/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/node-exporter-kubernetes-cluster-diagram.jpg)

Kubernetes service discovery utilizes the cluster API to automatically detect all endpoints that need to be scraped by Prometheus. This automatic discovery covers base Kubernetes components, Node Exporters running on every node, and the kube-state metrics container, eliminating the need for manual endpoint configurations.

![The image illustrates a service discovery process involving Kubernetes API, Prometheus, and Kubernetes components like node exporters and kube state metrics.](https://kodekloud.com/kk-media/image/upload/v1752882989/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/kubernetes-service-discovery-process.jpg)

## Deploying Prometheus on Kubernetes

There are two main strategies for deploying Prometheus on a Kubernetes cluster:

### 1\. Manual Deployment

This method involves manually creating various Kubernetes objects such as Deployments, Services, ConfigMaps, and Secrets. While this approach provides granular control, it requires extensive configuration and is generally more complex.

![The image provides instructions for manually deploying Prometheus on Kubernetes, highlighting the complexity and configuration required, with icons for deployments, services, and secrets.](https://kodekloud.com/kk-media/image/upload/v1752882991/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/prometheus-kubernetes-deployment-guide.jpg)

### 2\. Using Helm and the Prometheus Operator

A more straightforward approach involves deploying Prometheus using a Helm chart, specifically the kube-prometheus stack from the Prometheus Community repository. Helm—a package manager for Kubernetes—bundles all necessary configurations and dependencies into a single package, making deployment and management significantly easier.

![The image is a slide explaining Helm as a package manager for Kubernetes, highlighting its ability to bundle and deploy application and Kubernetes configurations.](https://kodekloud.com/kk-media/image/upload/v1752882992/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/helm-package-manager-kubernetes-slide.jpg)

Helm charts are collections of YAML template files that generate Kubernetes manifest files. They package application-specific and Kubernetes configurations with custom templating, allowing you to adjust settings during deployment seamlessly. Helm charts can be managed and shared via repositories much like source code on GitHub or GitLab.

![The image is a slide explaining Helm charts as a collection of template and YAML files that convert into Kubernetes manifest files, providing a GitHub link to a specific Helm chart repository.](https://kodekloud.com/kk-media/image/upload/v1752882993/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/helm-chart-yaml-kubernetes-manifest.jpg)

The kube-prometheus stack not only deploys Prometheus but also automatically sets up Alertmanager, Push Gateway, and the Prometheus Operator for comprehensive monitoring.

## The Prometheus Operator and Custom Resources

The Prometheus Operator simplifies the management of Prometheus within a Kubernetes environment. By extending the Kubernetes API with custom resources, the operator streamlines tasks such as initialization, configuration, scaling, upgrading, and lifecycle management of complex applications.

Using the Prometheus Operator, you can deploy a Prometheus instance via a custom resource named "Prometheus" rather than managing Deployments or StatefulSets manually. This abstraction simplifies modifications and ongoing operations.

For example, a Prometheus custom resource might be defined as follows:

```
apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  annotations:
    meta.helm.sh/release-name: prometheus
    meta.helm.sh/release-namespace: default
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

The operator also provides additional custom resources to manage Alertmanager configurations, Prometheus rules, ServiceMonitor, and PodMonitor resources. These abstractions allow you to declare and adjust Prometheus components without directly manipulating low-level Kubernetes objects.

![The image describes the Kube-Prometheus-stack, which uses the Prometheus Operator to manage complex applications in Kubernetes, and provides a GitHub link for more information.](https://kodekloud.com/kk-media/image/upload/v1752882994/notes-assets/images/Prometheus-Certified-Associate-PCA-Introduction/kube-prometheus-stack-prometheus-operator.jpg)

> [!important]
> **Note**
>
> Leveraging the Prometheus Operator significantly simplifies the deployment and lifecycle management of Prometheus on Kubernetes by automatically handling configuration changes, restarts, and upgrades.

## Conclusion

Deploying Prometheus on a Kubernetes cluster—whether through manual configuration or by using Helm charts and the Prometheus Operator—enables efficient, scalable, and automated monitoring of both application workloads and cluster components. This integrated approach provides detailed insights, helps maintain cluster health, and optimizes performance across your infrastructure.

For additional information and detailed documentation on Prometheus and Kubernetes monitoring, consider exploring the following resources:

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Helm Documentation](https://helm.sh/docs/)

By following this guide, you can ensure robust monitoring of your Kubernetes environment, keeping your applications and infrastructure running smoothly and efficiently.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/bb958f66-38c3-41ed-ae2f-7a4ee96c4d66/lesson/69a0ec52-6238-4e25-8ab3-d24bfe735b1d)**
>
> Watch video content
