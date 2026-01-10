# kubectl logs label - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-logs-label)

---

## Table of Contents

- kubectl logs label
  - Retrieving Pod Logs by Label
  - Examining the Deployment's Labels
  - Retrieving Logs from Multiple Pods
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl logs label

In this guide, you'll learn how to efficiently retrieve logs from multiple pods simultaneously by leveraging labels with the kubectl command. This method is especially useful when managing pods within the same deployment or across different deployments that share a common label.

## Retrieving Pod Logs by Label

Instead of specifying individual pod names, you can filter pods by their labels. For instance, if your pods are labeled with `app=notes-app`, you can fetch their logs using:

```
kubectl logs -l app=notes-app
```

The command above demonstrates how to retrieve logs from all pods associated with the given label.

> [!important]
> **Note**
>
> Using labels to filter pods simplifies log retrieval and enhances troubleshooting by aggregating logs from multiple pods in one command.

## Examining the Deployment's Labels

Before querying logs, it's important to verify the labels assigned to your deployment. For the Notes app deployment, you can inspect the labels with the following command:

```
kubectl get deployments.apps -n uat notes-app-deployment -o yaml | grep labels -A5
```

This command outputs a snippet similar to:

```
labels:
  app: notes-app
  name: notes-app-deployment
  namespace: uat
  resourceVersion: "855"
  uid: b2689ebc-8064-4662-813c-14ff7c1be5e8
--
labels:
  app: notes-app
spec:
  containers:
  - image: pavansa/notes-app
    imagePullPolicy: IfNotPresent
```

The output confirms that the deployment is correctly labeled with `app: notes-app`.

## Retrieving Logs from Multiple Pods

Since the Notes app deployment is configured with two replicas, there are two pods running with the same label. To retrieve logs from both pods simultaneously, you need to specify the namespace and use the label selector with the `-l` flag:

```
kubectl logs -n uat -l app=notes-app
```

This command aggregates logs from all pods with the `app=notes-app` label. A typical terminal session might look like this:

```
controlplane ~ ➜ kubectl get deployments.apps -n uat notes-app-deployment -o yaml | grep labels -A5
  labels:
    app: notes-app
    name: notes-app-deployment
    namespace: uat
    resourceVersion: "855"
    uid: b26898ee-8642-4662-813c-14ff71cbe58d
---
labels:
  app: notes-app
spec:
  containers:
  - image: pavansa/notes-app
    imagePullPolicy: IfNotPresent


controlplane ~ ➜ kubectl logs -n uat -l app=notes-app
> notes-app@1.0.0 start /app
> node app.js


App is running on port 3000
> notes-app@1.0.0 start /app
> node app.js


App is running on port 3000


controlplane ~ ➜
```

Because the pods share the same label (`app=notes-app`), the command returns logs from both pods seamlessly.

> [!important]
> **Tip**
>
> Using label selectors for logging is an efficient technique for monitoring real-time application behavior across multiple pods. This can significantly reduce the overhead of troubleshooting individual pod issues.

This approach streamlines the process of monitoring and debugging, as you no longer need to specify each pod name individually. For further insights into Kubernetes log management and best practices, consider exploring the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy logging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/64f81c41-dbec-4e60-b96e-d50d7394202a)**
>
> Watch video content
