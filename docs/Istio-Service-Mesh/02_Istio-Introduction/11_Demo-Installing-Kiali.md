# Demo Installing Kiali - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Demo-Installing-Kiali)

---

## Table of Contents

- Demo Installing Kiali
  - Step 1: Install Kiali and Add-ons
  - Step 2: Review the Installation Output
  - Step 3: Verify the Kiali Deployment
  - Step 4: Confirm Service Status
  - Step 5: Launch the Kiali Dashboard
  - Step 6: Exploring Kiali Dashboard Features
  - Additional Resources
  - Watch Video
    - Applications Overview
    - Workloads Overview
    - Services and Istio Config
    - Graph Visualization

---

## Content

Istio Service Mesh

Istio Introduction

# Demo Installing Kiali

In this guide, you'll learn how to install Kiali to visualize your service mesh. By following the steps below, you'll set up Kiali along with its associated add-ons, including Grafana, Jaeger, and Prometheus.

## Step 1: Install Kiali and Add-ons

To begin, apply the configuration files from the samples folder to install Kiali with all available add-ons. Run the following command:

```
kubectl apply
```

> [!important]
> **Note**
>
> The add-ons, such as Grafana and Jaeger, are intended for demonstration purposes only. They are not tuned for production performance or security.

## Step 2: Review the Installation Output

Once you execute the command, you'll see a detailed output showing the creation of various components. Here is an example of the installation output:

```
kubectl apply -f samples/addons
serviceaccount/grafana created
configmap/grafana created
service/grafana created
deployment.apps/grafana created
configmap/istio-grafana-dashboards created
deployment.apps/jaeger created
service/tracing created
service/zipkin created
service/jaeger-collector created
customersourcedefinition.apiextensions.k8s.io/monitoringdashboards.monitoring.kiali.io created
serviceaccount/kiali created
configmap/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrolebinding.rbac.authorization.k8s.io/kiali created
role.rbac.authorization.k8s.io/kiali-controlplane created
rolebinding.rbac.authorization.k8s.io/kiali-controlplane created
service/kiali created
deployment.apps/kiali created
monitoringdashboard.monitoring.kiali.io/envoy created
monitoringdashboard.monitoring.kiali.io/go created
monitoringdashboard.monitoring.kiali.io/micrometer created
monitoringdashboard.monitoring.kiali.io/micrometer-1.0.6-jvm-pool created
monitoringdashboard.monitoring.kiali.io/micrometer-1.0.6-jvm created
monitoringdashboard.monitoring.kiali.io/micrometer-1.1-jvm created
monitoringdashboard.monitoring.kiali.io/micrometer1-1 created
monitoringdashboard.monitoring.kiali.io/micrometer-profile-x.y created
monitoringdashboard.monitoring.kiali.io/springboot created
monitoringdashboard.monitoring.kiali.io/springboot-jvm-pool created
monitoringdashboard.monitoring.kiali.io/springboot-jvm created
monitoringdashboard.monitoring.kiali.io/springboot-tomcat created
```

This output confirms that a large group of objects were created for Kiali. Notably, Prometheus is installed at the end of the process.

## Step 3: Verify the Kiali Deployment

After installation, it's important to confirm that the Kiali deployment has rolled out successfully. Use your deployment file to verify the status with the following command:

```
kubectl apply -f <your-deployment-file>
```

The output should resemble the following:

```
monitoringdashboard.monitoring.kiali.io/kiali created
monitoringdashboard.monitoring.kiali.io/micrometer-1.0.6-jvm-pool created
monitoringdashboard.monitoring.kiali.io/micrometer-1.0.6-jvm created
monitoringdashboard.monitoring.kiali.io/microprofile-1.1 created
monitoringdashboard.monitoring.kiali.io/vertx-pool created
monitoringdashboard.monitoring.kiali.io/vertx-client created
monitoringdashboard.monitoring.kiali.io/vertx-eventbus created
monitoringdashboard.monitoring.kiali.io/vertx-jvm created
monitoringdashboard.monitoring.kiali.io/vertx-pool created
monitoringdashboard.monitoring.kiali.io/vertx-server created
serviceaccount/prometheus created
configmap/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
service/prometheus created
deployment.apps/prometheus created
serviceaccount/prometheus unchanged
configmap/prometheus configured
clusterrole.rbac.authorization.k8s.io/prometheus configured
clusterrolebinding.rbac.authorization.k8s.io/prometheus unchanged
deployment.apps/prometheus unchanged
```

## Step 4: Confirm Service Status

To ensure the Kiali service is active and running, check the service status in the Istio system namespace using the command below:

```
kubectl -n istio-system get services
```

This command displays the current status of services on your cluster.

## Step 5: Launch the Kiali Dashboard

Once the installation and verification steps are complete, start the Kiali dashboard. Executing the launch command will automatically open your web browser to the dashboard's overview page. You should notice the following elements:

- The address bar indicates that the dashboard is served on port 20001.
- The left menu provides several options for visualizing your service mesh.
- A filter option in the top left lets you adjust the displayed data.
- Controls on the far right allow filtering by time intervals and adjusting the data refresh rate.

## Step 6: Exploring Kiali Dashboard Features

### Applications Overview

After launching the dashboard, you'll see all the namespaces in your service mesh. Clicking the number next to the applications takes you to the applications page, which is also accessible from the left menu. In this view, you'll find the four Bookinfo applications and have the option to switch namespaces for more details.

![The image shows the Kiali Console interface displaying a list of applications within the "default" namespace, each with health status, labels, and details.](https://kodekloud.com/kk-media/image/upload/v1752879336/notes-assets/images/Istio-Service-Mesh-Demo-Installing-Kiali/kiali-console-default-namespace-apps.jpg)

### Workloads Overview

Navigate to the "Workloads" section from the menu to view all deployments listed as workloads. Each workload is displayed as healthy with labels indicating its application name and version.

![The image shows the Kiali Console interface displaying a list of workloads in the "default" namespace, all marked as healthy. Each workload is labeled with its application name and version.](https://kodekloud.com/kk-media/image/upload/v1752879337/notes-assets/images/Istio-Service-Mesh-Demo-Installing-Kiali/kiali-console-default-workloads-healthy.jpg)

### Services and Istio Config

Next, check the "Services" section. Initially, no services might be displayed, which is normal as the Service Mesh applications and objects may take some time to load. After a short wait, the services will appear.

When you access the "Istio Config" menu, you might notice that no configurations are shown. This indicates that there are currently no Istio configurations for the selected namespace.

![The image shows a Kiali Console interface displaying a list of services within the "default" namespace, including details like health, labels, and configuration status.](https://kodekloud.com/kk-media/image/upload/v1752879339/notes-assets/images/Istio-Service-Mesh-Demo-Installing-Kiali/kiali-console-default-namespace-services.jpg)

### Graph Visualization

Finally, the Graph section of the Kiali dashboard is one of the most dynamic tools available. Initially, the graph may appear empty if there is no traffic flowing through the mesh. To visualize traffic, generate some load within your service mesh. Once active, the graph will dynamically display the connections and communications among services.

## Additional Resources

For more detailed information on Kubernetes and service mesh concepts, refer to these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

By following these steps, you can effectively install Kiali on your cluster and take advantage of its robust monitoring and visualization capabilities for your service mesh.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/7ef212b0-cd34-4a60-a108-54d254555612)**
>
> Watch video content
