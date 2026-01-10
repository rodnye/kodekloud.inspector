# Create Application using UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-Basics/Create-Application-using-UI)

---

## Table of Contents

- Create Application using UI
  - Creating the ArgoCD Application
  - Synchronizing the Application
  - Updating the Application Image
  - Deleting the Application
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD Basics

# Create Application using UI

In this lesson, you will learn how to create an ArgoCD application using its user interface. For demonstration purposes, we will use Gitea—a self-hosted Git service—for all labs and demo sessions. Although any Git service (such as GitHub, Bitbucket, or GitLab) can be used, this guide will focus on Gitea.

![The image is a webpage for Gitea, a self-hosted Git service, highlighting its features such as being easy to install, cross-platform, lightweight, and open source.](https://kodekloud.com/kk-media/image/upload/v1752877511/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/gitea-self-hosted-git-service.jpg)

After signing into Gitea, locate the repository named **gitops-argocd**. This repository contains the demo exercises for the training. For our example, we will deploy an application using the "solar system" manifest stored inside the repository.

![The image shows a Gitea repository interface with a list of folders and recent commit messages. The repository is named "gitops-argocd" and has 170 commits.](https://kodekloud.com/kk-media/image/upload/v1752877512/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/gitea-repository-gitops-argocd.jpg)

Within the repository, navigate to the `solar system` directory to find two Kubernetes manifests:

- **Deployment Manifest:** Configures a deployment that uses a custom image (version v3), deployed as a single replica, and exposes port 80.
- **Service Manifest:** Exposes the application via a NodePort.

Below is the content of the deployment manifest:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: solar-system
  strategy: {}
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
        - image: siddharth67/solar-system:v3
          name: solar-system
          imagePullPolicy: Always
          ports:
            - containerPort: 80
```

And here is the service manifest:

```
apiVersion: v1
kind: Service
metadata:
  labels:
    app: solar-system
  name: solar-system-service
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: solar-system
  type: NodePort
```

## Creating the ArgoCD Application

To create an application using the ArgoCD UI:

1.  Click on **\+ New App**.
2.  Enter an application name (for example, "solar-system-app-1").
3.  Select an ArgoCD project. By default, the "default" project is available.
4.  Choose the synchronization policy. For this guide, select **Manual**.
5.  Under **Source Settings**, select the repository you previously configured.

!!! note "Repository Configuration" To connect your Git repository in ArgoCD, navigate to the **Manage Repositories** section. ArgoCD supports SSH, HTTPS, and GitHub App integrations. This demo uses HTTPS.

![The image shows a web interface for Argo CD with no applications currently listed. It prompts the user to create a new application to manage resources in a cluster.](https://kodekloud.com/kk-media/image/upload/v1752877514/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/argo-cd-web-interface-no-apps.jpg)

When configuring repository connections, enter the repository URL (up to the GitOps part of your URL). Username, password, and TLS certificates are optional and only required for private repositories.

![The image shows a web interface for connecting a repository using HTTPS, with options to select the type (git or helm), and fields for repository URL, username, password, and TLS client certificate.](https://kodekloud.com/kk-media/image/upload/v1752877516/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/web-interface-repo-connection-https.jpg)

After providing proper details, click **Connect**. A successful connection status will be displayed.

![The image shows a web interface for connecting a Git repository using HTTPS in Argo CD, with fields for repository URL, username, and password.](https://kodekloud.com/kk-media/image/upload/v1752877517/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/argo-cd-git-repo-https-interface.jpg)

![The image shows the Argo CD interface with a repository connection status marked as "Successful." There are options to connect repositories using SSH, HTTPS, or GitHub App.](https://kodekloud.com/kk-media/image/upload/v1752877518/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/argo-cd-repository-connection-successful.jpg)

ArgoCD stores these connection details securely in Kubernetes secrets. To inspect these secrets, use the command below:

```
kubectl -n argocd get secrets
```

For example, you might see:

```
NAME                              TYPE    DATA  AGE
argocd-initial-admin-secret       Opaque  1     60m
argocd-secret                     Opaque  5     61m
repo-3254474260                   Opaque  3     52s
```

To view the details of a secret:

```
kubectl -n argocd get secrets repo-3254474260 -o json
```

This secret includes fields such as "project", "type", and "url" (all base64 encoded), ensuring sensitive information remains secure.

Return to the ArgoCD UI and complete the application creation process:

1.  Under **Source Configuration**, select the repository you connected.
2.  Set the **Path** to the `solar system` directory within your repository.
3.  Configure the **Destination** by selecting the Kubernetes cluster where ArgoCD is installed and specifying a namespace (e.g., "solar-system"). You can opt to auto-create the namespace during synchronization if it does not exist.
4.  Leave additional plugin or directory options at their default values.
5.  Click **Create**.

![The image shows a web interface for creating a new application in Argo CD, with fields for application name, project name, and various sync policy options.](https://kodekloud.com/kk-media/image/upload/v1752877519/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/argo-cd-new-application-interface.jpg)

After creation, the application status may appear as "Missing" and the sync status as "OutOfSync" because the defined Kubernetes resources are not yet deployed. Verify by running:

```
kubectl get ns
kubectl get pod -A
```

At this point, the "solar-system" namespace and its resources should not be present.

## Synchronizing the Application

To deploy the application:

1.  Click the **Sync** button in the ArgoCD UI.
2.  ArgoCD will detect two Kubernetes resources from your Git repository: the deployment and the service.

!!! warning "Missing Namespace Alert" If the target namespace ("solar-system") does not exist during sync, the process may fail. Ensure you have either created the namespace manually or enabled the **Auto-create namespace** option.

![The image shows a dashboard interface indicating a failed sync operation due to a missing "solar-system" namespace. It lists details such as the operation status, message, and result.](https://kodekloud.com/kk-media/image/upload/v1752877521/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/failed-sync-solar-system-dashboard.jpg)

Once the namespace is available, ArgoCD will deploy the resources. The application health changes to "Healthy" and the sync status updates to "Synced".

![The image shows a dashboard interface for managing an application called "solar-system-app-1," displaying its health and sync status as "Healthy" and "Synced." It includes a visual representation of the application's components and their relationships.](https://kodekloud.com/kk-media/image/upload/v1752877522/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/solar-system-app-dashboard-health-sync.jpg)

Verify the deployment by inspecting the namespace:

```
kubectl get ns
kubectl -n solar-system get all
```

You can also inspect the live manifest details in ArgoCD by clicking on the service resource. A typical service manifest will resemble the following:

```
apiVersion: v1
kind: Service
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >-
      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app":"solar-system","app.kubernetes.io/instance":"solar-system-app-1"},"name":"solar-system-service","namespace":"solar-system"}}
  labels:
    app: solar-system
  name: solar-system-service
  namespace: solar-system
spec:
  clusterIP: 10.108.211.169
  ports:
    - nodePort: 30280
      port: 80
      protocol: TCP
      targetPort: 80
  selector:
    app: solar-system
  type: NodePort
```

Access the service via the NodePort (for example, 30280) to view a PHP application representing the solar system. With the v3 image, the UI displays a limited set of planets (the Sun, Mercury, Venus, and Earth).

## Updating the Application Image

To simulate an update, modify the deployment manifest in your Git repository to change the image version from v3 to v6 (which displays six planets). Edit the deployment manifest as follows:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: solar-system
  name: solar-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: solar-system
  strategy: {}
  template:
    metadata:
      labels:
        app: solar-system
    spec:
      containers:
        - image: siddharth67/solar-system:v6
          name: solar-system
          imagePullPolicy: Always
          ports:
            - containerPort: 80
```

Commit your changes with a message like "Updated the image to v6".

![The image shows a code repository interface where a user is committing changes with the message "updated the image to v6" on the main branch.](https://kodekloud.com/kk-media/image/upload/v1752877523/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/code-repository-commit-v6-main.jpg)

After committing, ArgoCD automatically checks the repository at regular intervals. To expedite the update, perform a hard refresh in the UI so that ArgoCD detects the changes. The sync status will once again be marked as "OutOfSync".

Click the **Synchronize** button. ArgoCD then deploys the updated resources, creates a new replica set, and starts a new pod with the updated image.

![The image shows a dashboard interface for managing applications, displaying the health and sync status of a "solar-system-app-1" with a visual representation of its components and their statuses.](https://kodekloud.com/kk-media/image/upload/v1752877524/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/dashboard-solar-system-app-status.jpg)

If the update results in unexpected behavior—such as an incorrect display of planets—you can roll back to a previous version. In the ArgoCD UI, click **History and Rollbacks**, select a previous revision (for example, the one deployed five minutes ago), and confirm the rollback.

![The image shows a dashboard interface of a deployment application, displaying details about deployment times, revisions, and sync status. The app health is marked as "Healthy" and the current sync status is "Synced."](https://kodekloud.com/kk-media/image/upload/v1752877525/notes-assets/images/GitOps-with-ArgoCD-Create-Application-using-UI/deployment-dashboard-interface-health-status.jpg)

After the rollback, the application status updates accordingly and the original display of planets is restored.

## Deleting the Application

To delete the application in ArgoCD:

1.  Delete the application via the ArgoCD UI.
2.  All the associated Kubernetes resources (deployment, replica set, pod, and service) are automatically removed from the cluster.
3.  Note that the target namespace (e.g., "solar-system") remains intact.

Verify the deletion by running the following commands:

```
kubectl get ns
kubectl -n solar-system get all
```

Expected output before deletion:

```
kubectl -n solar-system get all
NAME                                        READY   STATUS    RESTARTS   AGE
pod/solar-system-556d76fc6-mxk6z           1/1     Running   0          34s
service/solar-system-service                NodePort    10.108.211.169  <none>       80:30280/TCP     34s
deployment.apps/solar-system                1/1     1            1           34s
replicaset.apps/solar-system-556dd76fc6      1         1         1       34s
```

And after deletion:

```
kubectl -n solar-system get all
No resources found in solar-system namespace.
```

Listing namespaces will confirm that "solar-system" still exists:

```
kubectl get ns
NAME             STATUS   AGE
argocd           Active   71m
default          Active   19h
kube-node-lease  Active   19h
kube-public      Active   19h
kube-system      Active   19h
solar-system     Active   6m40s
```

In upcoming lessons, you will explore creating the same application using the ArgoCD CLI and further automating the continuous deployment process.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/546d7ffa-8e6e-4197-9dff-443bb15dcdf6/lesson/2b937591-e6dc-4f8e-af27-042d0fd8c4b0)**
>
> Watch video content
