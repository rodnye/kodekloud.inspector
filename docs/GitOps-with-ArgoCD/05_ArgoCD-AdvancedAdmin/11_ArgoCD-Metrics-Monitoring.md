# ArgoCD Metrics Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/ArgoCD-Metrics-Monitoring)

---

## Table of Contents

- ArgoCD Metrics Monitoring
  - Configuring Prometheus to Scrape ArgoCD Metrics
  - Visualizing Metrics with Grafana
  - Watch Video
    - Viewing the Prometheus Configuration
    - Configuring Prometheus to Scrape ArgoCD Metrics
    - Example Service and ServiceMonitor Configurations

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# ArgoCD Metrics Monitoring

In this article, we explore how to effectively visualize ArgoCD metrics using Prometheus and Grafana. ArgoCD exposes a comprehensive set of Prometheus metrics that can be scraped and visualized via a Grafana dashboard, offering deep insights into its performance and operational states.

## Configuring Prometheus to Scrape ArgoCD Metrics

ArgoCD provides various endpoints that expose Prometheus metrics for its critical components. To capture these metrics, Prometheus must be configured appropriately. The Prometheus Operator makes this process simpler by managing Prometheus, Alertmanager, Grafana, and other monitoring elements using Kubernetes custom resources.

### Viewing the Prometheus Configuration

To inspect the Prometheus configuration, execute commands inside the config-reloader container of the Prometheus pod. This allows you to verify global settings, scrape intervals, and the configured targets.

```
$ kubectl exec -it prometheus-0 -c config-reloader -- /bin/sh
$ cat /etc/prometheus/config_out/prometheus.env.yaml
global:
  scrape_interval: 30s
rule_files:
  - /etc/prometheus/rules/prometheus-0/*.yaml
scrape_configs:
  - job_name: serviceMonitor/monitoring/kube-apiserver/0
```

> [!important]
> **Note**
>
> By default, Prometheus is set to scrape metrics from various Kubernetes components such as the kube-apiserver.

### Configuring Prometheus to Scrape ArgoCD Metrics

The Prometheus Operator leverages ServiceMonitor and PodMonitor custom resources to automatically discover and configure scraping targets. To enable service monitoring in ArgoCD, follow these steps:

1.  **Expose Metrics in Services**  
    Ensure that the services exposing metrics are configured with an endpoint, port, and proper labels. ArgoCD includes services for the RepoServer, ArgoCD server, ServiceServer, and ApplicationSetController, each exposing its metrics.
2.  **Create a ServiceMonitor**  
    A ServiceMonitor is a custom resource that instructs Prometheus how to discover metric-exposing services using matching labels. ArgoCD supplies a sample ServiceMonitor manifest ready for application in your Kubernetes cluster.
3.  **Automatic Configuration Generation**  
    The Prometheus Operator uses the Prometheus custom resource to identify ServiceMonitors by their labels, subsequently generating the configuration required to scrape the defined services.
4.  **Automatic Reload of Configuration**  
    Once ServiceMonitors are detected and processed, the Prometheus Operator triggers the ConfigReloader component. This action updates the Prometheus configuration to include new targets defined by the ServiceMonitors.

### Example Service and ServiceMonitor Configurations

Below you'll find an example of a service that exposes ArgoCD server metrics:

```
$ kubectl get svc argocd-server-metrics -o yaml
apiVersion: v1
kind: Service
metadata:
  name: argocd-server-metrics
  namespace: argocd
spec:
  ports:
    - name: metrics
      port: 8083
      protocol: TCP
      targetPort: 8083
  selector:
    app.kubernetes.io/name: argocd-server
```

Next, review the corresponding ServiceMonitor configuration that allows Prometheus to automatically discover the above service:

```
$ kubectl get servicemonitor argocd-server-metrics -o yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: argocd-server-metrics
  labels:
    release: prometheus-operator
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: argocd-server-metrics
  endpoints:
    - port: metrics
```

After applying these configurations, verify the updated Prometheus configuration. The ConfigReloader should now include additional scrape configurations for ArgoCD metrics:

```
$ kubectl exec -it prometheus-0 -c config-reloader -- /bin/sh
$ cat /etc/prometheus/config_out/prometheus.env.yaml
global:
  scrape_interval: 30s
rule_files:
  - /etc/prometheus/rules/prometheus-0/*.yaml
scrape_configs:
  - job_name: serviceMonitor/monitoring/kube-apiserver/0
  - job_name: serviceMonitor/argocd/argocd-server-metrics/0
  - job_name: serviceMonitor/argocd/argocd-repo-server-metrics/0
  - job_name: serviceMonitor/argocd/argocd-applicationset-controller-metrics/0
```

> [!important]
> **Note**
>
> Ensure that all necessary ServiceMonitors and corresponding labels are correctly defined in your configurations to enable comprehensive metric scraping.

## Visualizing Metrics with Grafana

Once Prometheus begins scraping ArgoCD metrics, you can leverage Grafana to create insightful dashboards. Grafana connects to Prometheus as a data source and enables the creation of detailed, customizable dashboards that display:

- Operational metrics of various ArgoCD components
- Performance statistics and trends
- Alerts and notifications based on defined thresholds

You can use pre-built dashboards or develop custom ones tailored to your monitoring requirements.

> [!important]
> **Further Reading**
>
> For more detailed information and guidance on setting up Grafana dashboards, please explore the [Grafana Documentation](https://grafana.com/docs/).

Thank you for reading this article on ArgoCD metrics monitoring. For additional insights, refer to the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/50e919db-d553-4f70-9073-256fe42720d3)**
>
> Watch video content
