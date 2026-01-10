# CICD Pipeline Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Application-Delivery/CICD-Pipeline-Demo)

---

## Table of Contents

- CICD Pipeline Demo
  - Verifying the Default Namespace
  - Updating the Kubernetes Manifest
  - Observing Changes in the Argo CD UI
  - Watch Video
    - Original YAML File

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Application Delivery

# CICD Pipeline Demo

In this article, we demonstrate how Argo CD automatically provisions resources in a Kubernetes cluster by continuously monitoring a Git repository for changes.

## Verifying the Default Namespace

First, verify that no pods are running in the default namespace. Execute the following command:

```
nimeshajinarajadasa@Nimeshas-MacBook-Air ~ % kubectl get po
No resources found in default namespace.
nimeshajinarajadasa@Nimeshas-MacBook-Air ~ %
```

This confirms that the namespace is initially empty.

After waiting briefly, run the command again and notice that a pod is now being created:

```
nimeshajinarajadasa@Nimeshas-MacBook-Air ~ % kubectl get po
NAME                                 READY   STATUS              RESTARTS   AGE
nginx-deployment-6b7f675859-hx95j    0/1     ContainerCreating   0          18s
nimeshajinarajadasa@Nimeshas-MacBook-Air ~ %
```

This output indicates that the deployment YAML file has been successfully applied by Argo CD. Once the pod is fully operational, you can verify its healthy state with:

```
kubectl get po
NAME                                     READY   STATUS    RESTARTS   AGE
nginx-deployment-6b76765859-hx95j         1/1     Running   0          55s
```

> [!important]
> **Note**
>
> Argo CD monitors the Git repository, and upon detecting new resource definitions, it automatically provisions them in the default namespace.

## Updating the Kubernetes Manifest

Next, update the Kubernetes manifest by increasing the number of replicas from one to three.

### Original YAML File

Below is the original deployment YAML file:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

After updating the replica count to three, save the file and commit the changes to your Git repository hosting the Kubernetes manifest. Argo CD will detect the update and provision the additional pods accordingly.

## Observing Changes in the Argo CD UI

You can verify these changes in the Argo CD UI. The dashboard provides a visual representation of the application’s state, including the updated replica count:

![The image shows an Argo CD interface displaying application deployment details, including a visual workflow of a "cd-with-argo" application and an "nginx-deployment."](https://kodekloud.com/kk-media/image/upload/v1752880455/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-CICD-Pipeline-Demo/frame_110.jpg)

By clicking on the application instance in the UI, you will observe that the number of replicas has increased from one to three.

> [!important]
> **Learn More**
>
> For additional insights into Argo CD and GitOps best practices, consider exploring our [GitOps with Argo CD](https://learn.kodekloud.com/user/courses/gitops-with-argocd) course on KodeKloud.

Thank you for reading, and stay tuned for our next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/7221af3a-169a-4c55-bc00-b7b40e1dceda/lesson/aa2efc08-e34c-4b6e-8ffe-25dad4936ead)**
>
> Watch video content
