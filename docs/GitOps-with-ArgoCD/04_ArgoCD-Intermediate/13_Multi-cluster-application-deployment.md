# Multi cluster application deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Multi-cluster-application-deployment)

---

## Table of Contents

- Multi cluster application deployment
  - Overview
  - Configuring the External Cluster
  - Detailed Example
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Multi cluster application deployment

ArgoCD simplifies managing multi-cluster deployments by allowing you to deploy applications either within its own cluster or across external clusters. In this guide, we'll walk you through configuring an external Kubernetes cluster and deploying applications across clusters using ArgoCD.

## Overview

Before deploying applications to multiple clusters, you need to have an external Kubernetes cluster. ArgoCD integrates external clusters by reading their credential details from the kubeconfig file. This allows ArgoCD to manage deployments outside its own cluster.

## Configuring the External Cluster

Begin by updating your kubeconfig file to register your external cluster. Use the following commands to set the cluster and credential configurations:

```
$ kubectl config set-cluster prod --server=https://1.2.3.4 --certificate-authority=prod.crt
Cluster "prod" set.
$ kubectl config set-credentials ad
```

After defining the external cluster in your kubeconfig, add it to ArgoCD by referencing the appropriate context name:

```
$ argocd cluster add <context-name>
```

> [!important]
> **Warning**
>
> This command creates a service account on the external cluster with full cluster-level administrator access. Ensure you understand the security implications before proceeding.

Once you confirm, ArgoCD automatically creates the necessary service account, cluster role, and cluster role binding, thus validating the external cluster as a deployment target.

## Detailed Example

Below is a comprehensive example that illustrates all the essential steps to add an external cluster:

```
$ kubectl config set-cluster prod --server=https://1.2.3.4 --certificate-authority=prod.crt
Cluster "prod" set.


$ kubectl config set-credentials admin --client-certificate=admin.crt --client-key=admin.key
User "admin" set.


$ kubectl config set-context admin-prod --cluster=prod --user=admin --namespace=prod-app
Context "admin-prod" set.


$ argocd cluster add admin-prod
WARNING: This will create a service account `argocd-manager` on the cluster referenced by context `admin-prod` with full cluster level admin privileges. Do you want to continue [y/N]? y
INFO[0011] ServiceAccount "argocd-manager" created in namespace "kube-system"
INFO[0011] ClusterRole "argocd-manager-role" created
INFO[0011] ClusterRoleBinding "argocd-manager-role-binding" created
Cluster 'https://1.2.3.4' added


$ argocd cluster list
SERVER                                  NAME         VERSION  STATUS      MESSAGE   PROJECT
https://1.2.3.4                         admin-prod   1.21     Successful            <none>
https://kubernetes.default.svc           in-cluster   1.20     Successful            <none>
```

You can verify the list of clusters available for deployment by executing the `argocd cluster list` command. Note that credentials for external clusters (or API servers) are securely stored as secrets within the ArgoCD namespace.

For further information on configuring multi-cluster deployments and additional ArgoCD commands, please refer to the [ArgoCD Documentation](https://argo-cd.readthedocs.io/).

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/cdd81691-08a4-493f-aa87-1389240d7ca8)**
>
> Watch video content
