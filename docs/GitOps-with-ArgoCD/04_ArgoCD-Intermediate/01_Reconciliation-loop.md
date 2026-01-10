# Reconciliation loop - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Reconciliation-loop)

---

## Table of Contents

- Reconciliation loop
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Reconciliation loop

ArgoCD continuously reconciles the current state of your Kubernetes cluster to match the desired state defined in Git. In a GitOps workflow, application updates occur several times a day as developers commit changes. This article explains how ArgoCD synchronizes these updates with your cluster using its reconciliation loop.

ArgoCD’s reconciliation loop determines how frequently it pulls the desired state from the Git repository. Typically, the default timeout is set to 3 minutes. This timeout value, configurable within the ArgoCD repo server, dictates the wait period for a reconciliation operation before timing out.

The ArgoCD repo server fetches the desired state from Git and its behavior can be modified through the environment variable `ARGOCD_RECONCILIATION_TIMEOUT`. This variable is established using the key `timeout.reconciliation` in the ArgoCD configuration map (`argocd-cm`). By default, this configuration map is empty upon installation. You can customize the reconciliation timeout (for example, to 300 seconds) by patching this configuration map and then restarting the ArgoCD repo server deployment.

Once the configuration is updated and the deployment is restarted, ArgoCD checks for any changes in the Git repository every 5 minutes—unless webhooks are implemented to trigger immediate reconciliations.

> [!important]
> **Note**
>
> For immediate synchronization after each commit, configure a webhook on your Git provider that targets `[ARGOCD_SERVER_URL]/api/webhook`. This setup bypasses the default polling mechanism.

Below is a consolidated set of commands to patch the configuration map, restart the repo server, and verify the updated timeout setting:

```
# Check the current reconciliation timeout setting
kubectl -n argocd describe pod argocd-repo-server | grep -i "ARGOCD_RECONCILIATION_TIMEOUT:" -B1


# Patch the ArgoCD config map with a custom timeout of 300 seconds
kubectl -n argocd patch configmap argocd-cm --patch='{"data":{"timeout.reconciliation":"300s"}}'


# Restart the ArgoCD repo server deployment to apply the new setting
kubectl -n argocd rollout restart deploy argocd-repo-server


# Verify that the new timeout is active
kubectl -n argocd describe pod argocd-repo-server | grep -i "ARGOCD_RECONCILIATION_TIMEOUT:" -B1
```

In summary, the repo server relies on the reconciliation timeout parameter from the ArgoCD configuration map. Without any modifications, ArgoCD typically checks for manifest changes every 3 to 5 minutes. However, integrating a webhook—such as one from GitHub targeting `[ARGOCD_SERVER_URL]/api/webhook`—can trigger instant notifications, reducing synchronization delays.

![The image illustrates a reconciliation loop using webhooks, showing a process flow from code commit to deployment in a Kubernetes environment, with configuration settings for managing webhooks.](https://kodekloud.com/kk-media/image/upload/v1752877574/notes-assets/images/GitOps-with-ArgoCD-Reconciliation-loop/reconciliation-loop-webhooks-kubernetes.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/d3efe658-1b95-496f-8e92-2e34247109aa)**
>
> Watch video content
