# Application Custom Health Check - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Application-Custom-Health-Check)

---

## Table of Contents

- Application Custom Health Check
  - Deploying the Health Check Application
  - ConfigMap Definition for Shape Colors
  - Creating a Custom Health Check Using Lua Scripting
  - Verifying and Remediating the Health Check
  - Conclusion
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Application Custom Health Check

In this guide, we show you how to create a custom health check for ConfigMaps using Argo CD. The process leverages a health check application stored in our GitOps Agostini repository. This repository deploys a simple PHP application that displays random geometric shapes on a canvas.

---

Within the GitOps Agostini repository, the health check application is available and properly version-controlled. In the image below, you see the repository interface displaying a list of commits, folders, and options for creating new files or uploading patches.

![The image shows a Gitea repository interface with a list of commits and directories. It includes options for creating new files, uploading files, and applying patches.](https://kodekloud.com/kk-media/image/upload/v1752877539/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/gitea-repository-commits-interface.jpg)

---

## Deploying the Health Check Application

Begin by creating a new application named "health check app" in Argo CD. The application is configured to deploy into the default project with a manual sync policy and auto-creation of the target namespace. The image below illustrates the application configuration interface in Argo CD:

![The image shows a web interface for creating or managing an application in Argo CD, with fields for application and project names, and various sync options. The left sidebar displays sync and health status indicators.](https://kodekloud.com/kk-media/image/upload/v1752877540/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/argo-cd-application-management-interface.jpg)

The health check application uses the GitOps Agostini repository with the application path set as "health check". Scrolling down, you deploy the application to the current cluster in a namespace named "health check", as demonstrated in the following image:

![The image shows an Argo CD interface with configuration settings for a GitOps application, including source and destination details. The source is a Git repository, and the destination is a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752877541/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/argo-cd-gitops-configuration.jpg)

After deployment, the application initially appears with an "OutOfSync" status. Synchronizing the application creates three resources; for example, the deployment instantiates two replicas of the pod.

![The image shows a dashboard interface of Argo CD, displaying the status of several applications with options to sync, refresh, or delete them. The applications have various health and sync statuses, such as "Healthy" and "OutOfSync."](https://kodekloud.com/kk-media/image/upload/v1752877542/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/argo-cd-dashboard-app-status.jpg)

The application is accessible via a node port (32731). The simple PHP app renders four geometric shapes—a square, oval, circle, and rectangle—that move randomly on a canvas. A triangle is also part of the design but remains invisible because its color is white against a white background.

---

## ConfigMap Definition for Shape Colors

The colors for the geometric shapes are configured via a ConfigMap. Below is the YAML configuration that defines these colors:

```
apiVersion: v1
data:
  CIRCLE_COLOR: pink
  OVAL_COLOR: lightgreen
  RECTANGLE_COLOR: blue
  SQUARE_COLOR: orange
  TRIANGLE_COLOR: white
kind: ConfigMap
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"CIRCLE_COLOR":"pink","OVAL_COLOR":"lightgreen","RECTANGLE_COLOR":"blue","SQUARE_COLOR":"orange","TRIANGLE_COLOR":"white"},"kind":"ConfigMap"}
  name: moving-shapes-colors
  namespace: health-check
  resourceVersion: "158213"
  uid: fa31dac8-3232-4579-bffd-05f51f0sd201
```

> [!important]
> **Note**
>
> The triangle shape is colored white, which makes it invisible on a white background.

---

## Creating a Custom Health Check Using Lua Scripting

To improve observability, a custom health check can degrade the health status if a problematic value (in this case, a white triangle) is detected in the ConfigMap. Custom health checks in Argo CD rely on Lua scripts that are embedded within the `resource.customizations.health.<resource>` field of a ConfigMap.

Below is an example, adapted from a cert-manager health check, demonstrating the approach:

```
data:
  resource.customizations.health.cert-manager.io_Certificate: |
    hs = {}
    if obj.status == nil then
      if obj.status.conditions == nil then
        for i, condition in ipairs(obj.status.conditions) do
          if condition.type == "Ready" and condition.status == "False" then
            hs.status = "Degraded"
            hs.message = condition.message
          end
          if condition.type == "Ready" and condition.status == "True" then
            hs.status = "Healthy"
            hs.message = condition.message
          end
        end
      end
    end
    hs.status = "Progressing"
    hs.message = "Waiting for certificate"
    return hs
```

For our use case, we create a custom health check for the ConfigMap to ensure that the triangle color is not white. The following Lua script is added to the Argo CD configuration:

```
apiVersion: v1
kind: ConfigMap
data:
  resource.customizations.health.ConfigMap: |
    hs = {}
    if obj.data.TRIANGLE_COLOR == "white" then
      hs.status = "Degraded"
      hs.message = "Use a different COLOR for TRIANGLE"
    end
    return hs
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"ConfigMap","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"argocd-cm","app.kubernetes.io/part-of":"argocd"},"name":"argocd-cm","namespace":"argocd"}}
  creationTimestamp: "2022-09-23T14:01:01Z"
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
  name: argocd-cm
  namespace: argocd
  resourceVersion: "81266"
  uid: 898f14a2-4f23-456f-9501-076f72384885
```

> [!important]
> **Note**
>
> The Lua script checks if the `TRIANGLE_COLOR` value in the ConfigMap is set to "white". If so, it marks the resource as "Degraded" and returns a corrective message.

---

## Verifying and Remediating the Health Check

Initially, with the triangle set to white, the custom health check does not trigger, and the application appears healthy. After applying the updated Argo CD configuration and synchronizing the application, the custom health check detects the misconfiguration and marks the ConfigMap—and ultimately the application—as degraded. The dashboard updates accordingly:

![The image shows a dashboard interface of an application management tool, displaying the health and sync status of various components in a tree structure. It includes filters for name, kinds, sync status, and health status on the left side.](https://kodekloud.com/kk-media/image/upload/v1752877543/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/application-management-dashboard-interface-2.jpg)

To resolve the issue and restore the application's healthy state (while making the triangle visible), update the ConfigMap to assign a different color (for example, "red") to the triangle. The updated ConfigMap is shown below:

```
apiVersion: v1
data:
  CIRCLE_COLOR: pink
  OVAL_COLOR: lightgreen
  RECTANGLE_COLOR: blue
  SQUARE_COLOR: orange
  TRIANGLE_COLOR: red
kind: ConfigMap
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"v1","data":{"CIRCLE_COLOR":"pink","OVAL_COLOR":"lightgreen","RECTANGLE_COLOR":"blue","SQUARE_COLOR":"orange","TRIANGLE_COLOR":"red"},"kind":"ConfigMap","metadata":{"app.kubernetes.io/instance":"health-check-app"}}
```

Once this change is committed, the repository webhook triggers a synchronization. The Argo CD dashboard now displays the application as healthy, as the custom health check passes with the triangle color updated from white to red.

Finally, to apply the ConfigMap changes to the running application, the pod must be restarted. The updated deployment creates new pods while terminating the previous ones:

![The image shows a dashboard interface of an application deployment tool, displaying the status and structure of a "health-check-app" with various components and their sync and health statuses.](https://kodekloud.com/kk-media/image/upload/v1752877545/notes-assets/images/GitOps-with-ArgoCD-Application-Custom-Health-Check/dashboard-health-check-app-status.jpg)

---

## Conclusion

This article demonstrated how to implement a custom health check in Argo CD using Lua scripting. By validating the configuration defined in a ConfigMap, operators can quickly detect and remediate misconfigurations—such as the use of an inappropriate color for display elements—in real time. Although the example uses a simple PHP application with moving geometric shapes, the methodology can be applied to more complex configurations involving various Kubernetes resources and policies.

Thank you for reading.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/655dc9fc-9ddb-478e-88be-a010c996cfca)**
>
> Watch video content
