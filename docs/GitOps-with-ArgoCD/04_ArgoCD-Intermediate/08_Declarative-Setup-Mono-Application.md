# Declarative Setup Mono Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Intermediate/Declarative-Setup-Mono-Application)

---

## Table of Contents

- Declarative Setup Mono Application
  - Creating a Declarative ArgoCD Application
  - Exposing the Application
  - Summary
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Intermediate

# Declarative Setup Mono Application

In this lesson, you will learn how to manage a single ArgoCD application declaratively. Unlike previous approaches using the ArgoCD CLI or UI, this method involves storing and managing ArgoCD application manifests in a Git repository—just like any other Kubernetes deployment or service manifest.

![The image shows a web interface for configuring an application in Argo CD, with options for setting the application name, project name, sync policy, and other settings. The left sidebar displays sync and health status indicators.](https://kodekloud.com/kk-media/image/upload/v1752877552/notes-assets/images/GitOps-with-ArgoCD-Declarative-Setup-Mono-Application/argo-cd-application-config-interface.jpg)

Within the ArgoCD UI, you define application metadata, source, and destination details. Behind the scenes, this creates a YAML specification that describes the application. Below is an example manifest:

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sample-app
spec:
  destination:
    namespace: sample
    server: https://kubernetes.default.svc
  source:
    path: ./sample
    repoURL: http://139.59.21.103:3000/siddhanth/gitops-argocd
    targetRevision: HEAD
  project: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

> [!important]
> **Note**
>
> ArgoCD can automatically create and manage applications using YAML specifications stored in Git repositories.

## Creating a Declarative ArgoCD Application

To set up a single ArgoCD application using the declarative approach, follow these steps:

1.  **Locate the Repository Directory**  
    In your GitOps ArgoCD repository, find the "MonoApplication" directory. In this example, the application manifest is stored in the "mono-app" directory. For instance, you should see a file named `geocentric-app.yml`.

![The image shows a Gitea repository interface with details about branches, commits, and recent changes. It includes options to create a new file, upload a file, or apply a patch.](https://kodekloud.com/kk-media/image/upload/v1752877553/notes-assets/images/GitOps-with-ArgoCD-Declarative-Setup-Mono-Application/gitea-repository-branches-commits.jpg)

2.  **Review the YAML Manifest**  
    Below is an excerpt from the `geocentric-app.yml` file that defines the ArgoCD application. This example includes essential fields such as kind, API version, project, and source details:

    ```
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: geocentric-model-app
      namespace: argocd
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: default
      source:
        repoURL: http://165.22.209.118:3000/siddharth/gitops-argocd.git
        targetRevision: HEAD
        path: ./declarative/manifests/geocentric-model
      destination:
        server: https://kubernetes.default.svc
        namespace: geocentric-model
      syncPolicy:
        syncOptions:
          - CreateNamespace=true
        automated:
          prune: true
          selfHeal: true
    ```

    This manifest directs ArgoCD to fetch the application manifests from the specified directory, deploy them into the `geocentric-model` namespace, and enable automated sync with pruning and self-healing capabilities.

    > [!important]
    > **Tip**
    >
    > Duplicate YAML snippets have been consolidated for clarity. Use the same manifest to ensure consistency across deployments.

3.  **Deploy the Application with kubectl**

    Follow these steps to pull the repository into your Kubernetes cluster and create the application:
    - Clone the repository and navigate to the `mono-app` folder:

      ```
      mkdir demo
      cd demo/
      git clone http://139.59.21.103:3000/siddharth/gitops-argocd
      cd gitops-argocd/
      ll
      ```

    - Navigate to the `declarative/mono-app/` directory and confirm the contents of the `geocentric-app.yml` file:

      ```
      cd declarative/mono-app/
      cat geocentric-app.yml
      ```

    - Apply the manifest in the ArgoCD namespace with the following command:

      ```
      kubectl -n argocd apply -f geocentric-app.yml
      ```

    Once applied, you should see the following output indicating success:

    ```
    application.argoproj.io/geocentric-model-app created
    ```

4.  **Verify the Application Deployment**

    Confirm the application status using both the ArgoCD CLI and kubectl commands:

    ```
    argocd app list
    ```

    This will display the list of applications, including `geocentric-model-app`.

    You can also verify its status with:

    ```
    kubectl -n argocd get applications
    ```

    With automated sync enabled, ArgoCD will automatically update the application. Check the ArgoCD UI to verify that both deployment and service resources are correctly deployed.

## Exposing the Application

Access the deployed application via the exposed service NodePort. For example, if the service is exposed on port 30682, you can use that port to access the application's UI. Here is an example of the service manifest:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"v1","kind":"Service","metadata":{},"labels":{"app.kubernetes.io/instance":"geocentric-model-app"},"name":"geocentric-model-svc","namespace":"geocentric-model"}
  creationTimestamp: '2022-09-23T17:52:34Z'
  labels:
    app.kubernetes.io/instance: geocentric-model-app
  name: geocentric-model-svc
  namespace: geocentric-model
  resourceVersion: '183808'
  uid: cde596d8-4841-4ac1-bb6e-7996cffd7036
spec:
  clusterIP: 10.111.125.181
  clusterIPs:
    - 10.111.125.181
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  ipFamily: IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - nodePort: 38684
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: geocentric-model
  sessionAffinity: None
  type: NodePort
```

> [!important]
> **Warning**
>
> Ensure that the `geocentric-app.yml` file is created in the ArgoCD namespace to avoid any deployment issues.

Finally, observe the running application's status in the ArgoCD UI:

![The image shows a dashboard interface of an application management tool, displaying the status and structure of a "geocentric-model-app" with various components like services and pods. The app is marked as "Healthy" and "Synced."](https://kodekloud.com/kk-media/image/upload/v1752877554/notes-assets/images/GitOps-with-ArgoCD-Declarative-Setup-Mono-Application/geocentric-model-app-dashboard.jpg)

## Summary

In this guide, you've learned how to manage a single ArgoCD application declaratively by:

- Storing the YAML manifest in a Git repository.
- Deploying the application using kubectl.
- Verifying application status via both the CLI and the ArgoCD UI.

This declarative approach simplifies application management by integrating GitOps principles, ensuring that your application's deployment is both reproducible and version-controlled.

For more detailed information on Kubernetes deployments and GitOps practices, consider exploring additional resources such as [Kubernetes Documentation](https://kubernetes.io/docs/) and [ArgoCD Getting Started Guide](https://argo-cd.readthedocs.io/en/stable/getting_started/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/7d158b65-58ef-432d-9d26-61e245751bfe/lesson/61dc3185-3abb-4060-8f16-30055c98de7a)**
>
> Watch video content
