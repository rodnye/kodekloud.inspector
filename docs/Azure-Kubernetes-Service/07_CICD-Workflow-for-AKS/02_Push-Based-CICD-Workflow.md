# Push Based CICD Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/CICD-Workflow-for-AKS/Push-Based-CICD-Workflow)

---

## Table of Contents

- Push Based CICD Workflow
  - Preparing Your Environment
  - 1. Export the Deployment to YAML
  - 2. Export the Service to YAML
  - 3. Delete Imperative Resources
  - 4. Redeploy Declaratively
  - 5. Push-Based CI/CD Pipeline Overview
  - References
  - Watch Video

---

## Content

Azure Kubernetes Service

CICD Workflow for AKS

# Push Based CICD Workflow

In this guide, you’ll learn how to convert an imperative AKS deployment into a declarative setup with YAML manifests and integrate it into a push-based CI/CD pipeline. We cover:

1.  Exporting existing Kubernetes resources to YAML
2.  Cleaning up and reapplying manifests
3.  Deleting old imperative resources
4.  Redeploying declaratively
5.  Designing a push-based CI/CD workflow with Azure DevOps

---

## Preparing Your Environment

1.  Log in to your Azure subscription (local machine or Cloud Shell).
2.  Fetch and merge your AKS credentials into `kubeconfig`:

```
az aks get-credentials \
  --name AKS1-KodeKloudApp \
  --resource-group MyResourceGroup
# Merged "AKS1-KodeKloudApp" as current context in /home/user/.kube/config
```

3.  Verify your existing Service and Deployment:

```
kubectl get service
kubectl get deployment
```

> [!important]
> **Note**
>
> Make sure your current context points to the correct AKS cluster. Use `kubectl config current-context` to check.

---

## 1\. Export the Deployment to YAML

Run the following command to export the `kodekloudapp` Deployment manifest:

```
kubectl get deployment kodekloudapp \
  --namespace default \
  --output yaml > deployment.yaml
```

A portion of the generated `deployment.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kodekloudapp
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kodekloudapp
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: kodekloudapp
    spec:
      containers:
        - name: kodekloudapp
          image: <your-image>
          ports:
            - containerPort: 80
```

> Tip: Customize `replicas`, `strategy`, and container resources to match your production requirements.

---

## 2\. Export the Service to YAML

Export the Service object:

```
kubectl get service kodekloudapp \
  --namespace default \
  --output yaml > service.yaml
```

Remove dynamic fields from `service.yaml`:

- `clusterIP`
- `status.loadBalancer.ingress`
- `spec.ports[*].nodePort`

Your cleaned-up `service.yaml` should look like:

```
apiVersion: v1
kind: Service
metadata:
  name: kodekloudapp
  namespace: default
spec:
  type: LoadBalancer
  selector:
    app: kodekloudapp
  ports:
    - port: 80
      targetPort: 80
      protocol: TCP
```

> [!important]
> **Warning**
>
> If you switch to `type: NodePort`, ensure `nodePort` values are in the 30000–32767 range.

---

## 3\. Delete Imperative Resources

Remove the existing Deployment and Service:

```
kubectl delete deployment kodekloudapp
kubectl delete service kodekloudapp
```

Verify they’re gone:

```
kubectl get deployment  # No resources found
kubectl get service     # No resources found
```

---

## 4\. Redeploy Declaratively

Apply your YAML manifests:

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Check the status:

```
kubectl get deployment
kubectl get service
```

Open the external IP in your browser to confirm the application is running.

---

## 5\. Push-Based CI/CD Pipeline Overview

Below is a sample push-based pipeline in Azure DevOps. You can adapt these stages for GitHub Actions, GitLab CI, or other tools.

| Stage                  | Description                              | Example Tools                       |
| ---------------------- | ---------------------------------------- | ----------------------------------- |
| Source Control         | Push code & manifests to Git repo        | Azure Repos, GitHub, GitLab         |
| Continuous Integration | Build container image and run unit tests | Azure Pipelines, GitHub Actions     |
| Artifact Publishing    | Push Docker image to registry            | ACR, Docker Hub, ECR                |
| Continuous Deployment  | Detect new image; apply YAML to AKS      | `kubectl apply`, Helm, Flux CD      |
| Monitoring & Feedback  | Collect logs/metrics, update backlog     | Azure Monitor, Application Insights |

1.  **Commit & Push** your application code and `deployment.yaml` + `service.yaml` to your repo.
2.  **CI Pipeline**: Build the container image, run tests, and publish to Azure Container Registry (ACR).
3.  **CD Trigger**: ACR webhook invokes the CD pipeline upon new image push.
4.  **Deploy**: Execute `kubectl apply -f` on your manifests to update AKS.
5.  **Monitor**: Use [Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/) or [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) for observability.

---

## References

- [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/azure/aks/)
- [Kubernetes YAML Configuration](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)
- [Azure DevOps CI/CD](https://docs.microsoft.com/azure/devops/pipelines/)
- [Azure Container Registry](https://docs.microsoft.com/azure/container-registry/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/60e74513-d231-493d-90a3-71787380ae79/lesson/35e2e42a-ab83-4742-bb6b-280336043a36)**
>
> Watch video content
