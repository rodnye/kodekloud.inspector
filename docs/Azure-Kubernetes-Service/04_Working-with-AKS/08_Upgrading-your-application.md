# Upgrading your application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Working-with-AKS/Upgrading-your-application)

---

## Table of Contents

- Upgrading your application
  - 1. Expose Your Deployment via a LoadBalancer
  - 2. Perform a Rolling Update to v2
  - 3. Verify the Updated Version
  - 4. Rolling Back to a Previous Revision
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Working with AKS

# Upgrading your application

In this guide, you’ll learn how to upgrade your running application from version v1 to v2 using Azure Container Registry (ACR) and Azure Kubernetes Service (AKS). We’ll cover exposing the app, performing a rolling update, verifying the new version, and—if needed—rolling back to a previous revision.

---

## 1\. Expose Your Deployment via a LoadBalancer

First, ensure your v1 image is deployed and reachable from the Internet:

```
PS C:\Users\msadmin> kubectl expose deployment kodekloudapp \
  --type=LoadBalancer --target-port=80 --port=80
service/kodekloudapp exposed
```

Check the service status:

| Service Name | Type         | Cluster IP   | External IP    | Ports        | Age |
| ------------ | ------------ | ------------ | -------------- | ------------ | --- |
| kodekloudapp | LoadBalancer | 10.0.112.113 | 20.205.144.237 | 80:30344/TCP | 2m  |
| kubernetes   | ClusterIP    | 10.0.0.1     | <none>         | 443/TCP      | 2d  |

> [!important]
> **Note**
>
> If the `EXTERNAL-IP` remains `<pending>`, wait a minute or check your Azure networking configuration.

---

## 2\. Perform a Rolling Update to v2

To point the existing deployment at your `v2` image in ACR, use:

```
PS C:\Users\msadmin> kubectl set image deployment/kodekloudapp \
  kodekloudapp=crkodekloud.azurecr.io/kodekloudapp:v2
deployment.apps/kodekloudapp image updated
```

Kubernetes will perform a rolling update—terminating old pods and creating new ones—without downtime for your users.

---

## 3\. Verify the Updated Version

Once the update completes, refresh your application’s public IP in the browser. You should see the v2 message.

To confirm the deployment is using the new image:

```
PS C:\Users\msadmin> kubectl describe deployment kodekloudapp
```

Under **Pod Template → Containers**, look for:

Image: crkodekloud.azurecr.io/kodekloudapp:v2

---

## 4\. Rolling Back to a Previous Revision

Kubernetes retains a history of deployment revisions by default. If you encounter issues in v2, you can quickly revert to v1.

View the rollout history:

```
PS C:\Users\msadmin> kubectl rollout history deployment/kodekloudapp
```

| Revision | Change Cause |
| -------- | ------------ |
| 1        | <none>       |
| 2        | <none>       |

> [!important]
> **Warning**
>
> Rolling back in production can affect end users. Consider testing rollbacks in a staging environment first.

To undo to the previous revision:

```
PS C:\Users\msadmin> kubectl rollout undo deployment/kodekloudapp
deployment.apps/kodekloudapp rolled back
```

After the rollback finishes, refresh your app endpoint to confirm v1 is active again.

---

## Next Steps

You’ve successfully managed upgrades and rollbacks in AKS. Next, explore Azure Kubernetes Fleet Management to coordinate multiple clusters and streamline governance.

---

## Links and References

- [Azure Kubernetes Service (AKS) Overview](https://docs.microsoft.com/azure/aks/overview)
- [Azure Container Registry Documentation](https://docs.microsoft.com/azure/container-registry/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/2e4891fe-2f53-4239-9ab9-8b15ba4c6369/lesson/56e5b535-f62c-4bfe-ab3e-5d8b5602012c)**
>
> Watch video content
