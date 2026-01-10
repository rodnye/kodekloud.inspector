# Kubernetes Monitoring Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Kubernetes-Monitoring-Basics)

---

## Table of Contents

- Kubernetes Monitoring Basics
  - Kubernetes Monitoring Overview
  - Built-in Monitoring Tools
  - Advanced Open-Source Monitoring with Prometheus and Grafana
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Kubernetes Monitoring Basics

Kubernetes streamlines container orchestration across clouds, but its abstraction can hide critical insights into cluster health and resource usage. In this guide, we’ll explore essential monitoring concepts, built-in tools, and an advanced open-source stack using Prometheus and Grafana.

## Kubernetes Monitoring Overview

To maintain reliability and performance, monitor:

- **Cluster & Node Metrics**: CPU, memory usage, availability, capacity
- **Deployment & Pod Status**: Desired vs. running replicas, CrashLoopBackOff errors
- **Pod Resource Consumption**: Requests and limits for CPU/memory
- **Application-Level Health**: Latency, throughput, error rates

A major challenge is capturing and storing vast quantities of metrics to enable trend analysis and alerting over time.

> [!important]
> **Note**
>
> Without persistent storage, short-lived metrics are lost and you miss critical events that could help diagnose incidents.

## Built-in Monitoring Tools

Kubernetes includes several basic monitoring components:

| Tool                 | Function                                             | Limitation                                      |
| -------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| cAdvisor             | Container resource collector in the kubelet          | No long-term storage, trend analysis, or alerts |
| Metrics Server       | Aggregates CPU/memory from cAdvisor into Metrics API | No built-in dashboards or advanced queries      |
| Kubernetes Dashboard | Web UI for namespaces, workloads, and basic metrics  | Real-time only; no historical trend analysis    |

> [!important]
> **Warning**
>
> For production environments requiring SLA guarantees, these out-of-the-box tools are insufficient. Plan for a full monitoring stack.

Retrieve real-time metrics:

```
# View node metrics
kubectl top nodes


# View pod metrics in a namespace
kubectl top pods -n <namespace>
```

## Advanced Open-Source Monitoring with Prometheus and Grafana

For comprehensive observability, combine Prometheus for metrics scraping/storage with Grafana for visualization and alerting.

![The image is a diagram explaining Kubernetes monitoring, detailing the monitoring of clusters, nodes, deployments, pods, and applications, and listing tools like Prometheus and Grafana.](https://kodekloud.com/kk-media/image/upload/v1752873813/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Kubernetes-Monitoring-Basics/kubernetes-monitoring-diagram-prometheus-grafana.jpg)

Follow these steps to deploy:

1.  Add and update Helm repos:

    ```
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    ```

2.  Install Prometheus:

    ```
    helm install prometheus prometheus-community/prometheus \
      --namespace monitoring --create-namespace
    ```

3.  Install Grafana:

    ```
    helm install grafana prometheus-community/kube-grafana \
      --namespace monitoring
    ```

4.  Forward ports to access UIs:

    ```
    # Grafana UI
    kubectl port-forward svc/grafana 3000:80 -n monitoring


    # Prometheus UI
    kubectl port-forward svc/prometheus-server 9090:80 -n monitoring
    ```

> [!important]
> **Note**
>
> After first login to Grafana (default credentials `admin/admin`), immediately update the password and configure your data source.

With Prometheus scraping Kubernetes endpoints and Grafana connected:

- Persist historical metrics for capacity planning
- Build custom dashboards to visualize CPU, memory, and application metrics
- Configure alerts in Prometheus Alertmanager to detect anomalies

Thank you for reading this lesson!

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Prometheus Helm Charts](https://github.com/prometheus-community/helm-charts)
- [Grafana Documentation](https://grafana.com/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/ff5071f2-d8f1-47a7-8a8d-746ac865a12b)**
>
> Watch video content
