# Deploy and validate and validate the service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-06/Deploy-and-validate-and-validate-the-service)

---

## Table of Contents

- Deploy and validate and validate the service
  - 1. Create a New Git Branch
  - 2. Add the Service to gke.yaml
  - 3. Open a Pull Request & Trigger Cloud Build
  - 4. Verify the Build in Cloud Build
  - 5. Inspect the Service in GKE
  - Links and References
  - Watch Video
    - Kubernetes Resources Overview

---

## Content

GCP DevOps Project

Sprint 06

# Deploy and validate and validate the service

In this tutorial, we’ll extend an existing Kubernetes Deployment by adding a Service of type `LoadBalancer` to expose your application on Google Kubernetes Engine (GKE). You’ll learn how to update your manifest, trigger a Cloud Build, and verify the Service in the GKE console.

![The image shows a Google Cloud Platform interface displaying a Kubernetes Engine dashboard with details of a cluster named "gcp-devops-project" located in "us-central1-c" with 3 nodes, 6 vCPUs, and 12 GB of total memory.](https://kodekloud.com/kk-media/image/upload/v1752875507/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-and-validate-the-service/gcp-kubernetes-engine-dashboard-cluster.jpg)

## 1\. Create a New Git Branch

First, sync your `main` branch and create a feature branch for the Service manifest:

```
git checkout main
git pull origin main
git checkout -b feature/add-loadbalancer-service
```

## 2\. Add the Service to gke.yaml

Open your `gke.yaml` and append the following Service definition beneath the existing Deployment:

```
apiVersion: v1
kind: Service
metadata:
  name: gcp-devops-gke-service
  namespace: default
  labels:
    app.kubernetes.io/managed-by: gcp-cloud-build-deploy
spec:
  type: LoadBalancer
  selector:
    app: gcp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
```

> [!important]
> **Note**
>
> If you’re targeting a production namespace, replace `namespace: default` with your environment (e.g., `gcp-devops-prod`).> [!important]
> **Warning**
>
> Using `LoadBalancer` provisions a cloud load balancer and may incur additional costs.

### Kubernetes Resources Overview

| Resource Kind | Purpose                                   | Key Fields                         |
| ------------- | ----------------------------------------- | ---------------------------------- |
| Deployment    | Manages a set of identical Pods           | `replicas`, `template`, `selector` |
| Service       | Exposes Pods to external/internal traffic | `type`, `ports`, `selector`        |

Save your changes, then commit and push:

```
git add gke.yaml
git commit -m "Add LoadBalancer Service to gke.yaml"
git push origin feature/add-loadbalancer-service
```

## 3\. Open a Pull Request & Trigger Cloud Build

1.  Go to your GitHub repository.
2.  Create a PR from `feature/add-loadbalancer-service` into `main`.
3.  Merge the PR to kick off the Cloud Build trigger configured on `main`.

## 4\. Verify the Build in Cloud Build

In the [Google Cloud Console – Cloud Build](https://console.cloud.google.com/cloud-build/builds), you’ll see logs for:

- Building the Docker image
- Pushing to Container Registry
- Deploying to GKE

A successful build ends with a green checkmark:

![The image shows a Google Cloud Build interface with a successful build summary, detailing steps and logs for a project deployment. The build includes Docker and GKE deployment steps.](https://kodekloud.com/kk-media/image/upload/v1752875508/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-and-validate-the-service/google-cloud-build-successful-deployment.jpg)

## 5\. Inspect the Service in GKE

Navigate to **Kubernetes Engine > Services & Ingress** in the Cloud Console. You should see your `gcp-devops-gke-service` with an external IP:

![The image shows a Google Cloud Kubernetes Engine dashboard displaying service details, including load balancer information, deployments, and serving pods. It also provides suggested next steps for managing the deployment.](https://kodekloud.com/kk-media/image/upload/v1752875509/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-and-validate-the-service/google-cloud-kubernetes-dashboard-service-details.jpg)

Click the external IP to access your application. To monitor resource usage, switch to the **Metrics** tab:

![The image shows a Google Cloud Platform Kubernetes Engine service details page, displaying metrics for CPU, memory, and disk usage, along with load balancer information and suggested next steps.](https://kodekloud.com/kk-media/image/upload/v1752875510/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-and-validate-the-service/google-cloud-kubernetes-engine-metrics.jpg)

Congratulations! You’ve successfully deployed and exposed your application on GKE using a LoadBalancer Service—without modifying `cloudbuild.yaml`. Stay tuned for the next lesson.

## Links and References

- [Google Kubernetes Engine (GKE) Overview](https://cloud.google.com/kubernetes-engine)
- [Kubernetes Service Types](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)
- [Cloud Build Triggers](https://cloud.google.com/build/docs/automating-builds/create-build-trigger)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/001eaf30-3cc6-4d71-8b48-c59ac4e5e0f8/lesson/e2a20570-927a-4f06-af7e-566817455e97)**
>
> Watch video content
