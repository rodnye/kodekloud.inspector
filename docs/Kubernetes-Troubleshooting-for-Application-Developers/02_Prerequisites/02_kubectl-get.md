# kubectl get - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-get)

---

## Table of Contents

- kubectl get
  - Listing Cluster Resources
  - Exploring Namespaces and Deployments
  - Inspecting a Deployment Manifest
  - Filtering Specific Information
  - Extracting Container Specifications
  - Summary
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl get

In this article, we explore how to use the `kubectl get` command to inspect your Kubernetes cluster resources. For convenience, an alias (`k`) for `kubectl` is used in the examples below. If you haven't already, [enable shell autocompletion](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion) for a smoother workflow.

Below you'll find a detailed walkthrough of various commands and options to inspect your cluster effectively.

──────────────────────────────────────────────

## Listing Cluster Resources

If your Kubernetes cluster has multiple resources deployed, simply running:

```
kubectl get
```

will list the available resources. Using the alias, you can list all resources with:

```
controlplane ~ ➜ alias k=kubectl
controlplane ~ ➜ k get all
NAME                      READY   STATUS      RESTARTS   AGE
pod/logs-generator       1/1     Running     4          40m


NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/kubernetes       ClusterIP   10.96.0.1      <none>        443/TCP        136m
controlplane ~ ➜
```

To list resources across all namespaces, add the `-A` flag. This command displays pods, services, daemon sets, deployments, replica sets, jobs, and more:

```
controlplane ~ ➜ k get all -A
kube-system   pod/metrics-server-7ccf778fc5-m52nw                 1/1     Running   0          40m
kube-system   pod/weave-net-fblw4                                  2/2     Running   0          136m
uat           pod/notes-app-deployment-6c564d459fb-rjsk2            1/1     Running   0          40m
uat           pod/notes-app-deployment-6c564d459fb-s57sn            1/1     Running   0          40m


NAMESPACE      NAME                                                      TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                   AGE
default        service/kubernetes                                         ClusterIP      10.96.0.1      <none>          443/TCP                   136m
dev            service/nginx-service                                      NodePort       10.108.97.113  <none>          80:31000/TCP              40m
ingress-nginx  service/ingress-nginx-controller                           NodePort       10.104.104.166 <none>          80:31669/TCP,443:31498/TCP   40m
kube-system    service/kube-dns                                           ClusterIP      10.96.0.10     <none>          53/UDP,53/TCP,9153/TCP     136m
kube-system    service/metrics-server                                     ClusterIP      10.97.234.143  <none>          443/TCP                   40m
uat           service/notes-app-deployment                               ClusterIP      10.111.226.142 <none>          80/TCP                    40m


NAMESPACE      NAME                                                         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR              AGE
kube-system    daemonset.apps/kube-proxy                                    2         2         2       2            2           kubernetes.io/os-linux     136m
kube-system    daemonset.apps/weave-net                                     2         2         2       2            2           <none>                   136m


NAMESPACE      NAME                                                       READY   UP-TO-DATE   AVAILABLE   AGE
ingress-nginx  deployment.apps/ingress-nginx-controller                    1/1     1            1           40m
kube-system    deployment.apps/coredns                                     2/2     2            2           136m
kube-system    deployment.apps/metrics-server                              1/1     1            1           40m
kube-system    deployment.apps/notes-app-deployment                        2/2     2            2           40m


NAMESPACE      NAME                                                         DESIRED   CURRENT   READY   AGE
ingress-nginx  replicaset.apps/ingress-nginx-controller-55dbd56cfb         1         1         1       40m
kube-system    replicaset.apps/coredns-77d6f4654                            2         2         2       136m
kube-system    replicaset.apps/metrics-server-7ccf778fc5                   2         2         2       40m
kube-system    replicaset.apps/notes-app-deployment-6c564d459fb            2         2         2       40m


NAMESPACE      NAME                                                     STATUS      COMPLETIONS   DURATION   AGE
ingress-nginx  job.batch/ingress-nginx-admission-create                   Complete    1/1         17s       40m
ingress-nginx  job.batch/ingress-nginx-admission-patch                    Complete    1/1         20s       40m


controlplane ~ ➜
```

──────────────────────────────────────────────

## Exploring Namespaces and Deployments

First, list all namespaces in your cluster with:

```
controlplane ~ ➜ k get ns
NAME              STATUS   AGE
default           Active   137m
dev               Active   40m
ingress-nginx     Active   40m
kube-node-lease   Active   137m
kube-public       Active   137m
kube-system       Active   137m
monitoring        Active   40m
qa                Active   40m
staging           Active   40m
test              Active   40m
uat               Active   40m
```

To inspect the deployments in the User Acceptance Testing (uat) namespace, run:

```
controlplane ~ ➜ k get -n uat deployments.apps
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
notes-app-deployment    2/2     2            2           41m
```

──────────────────────────────────────────────

## Inspecting a Deployment Manifest

To review a detailed deployment configuration (for example, "notes-app-deployment"), output the full manifest in YAML format. This manifest mirrors the original configuration file that created the Deployment:

```
creationTimestamp: "2024-10-20T18:46:54Z"
generation: 1
labels:
  app: notes-app
name: notes-app-deployment
namespace: uat
resourceVersion: "8757"
uid: 7e486af6-f24e-4136-b259-f5e1513dac5f
spec:
  progressDeadlineSeconds: 600
  replicas: 2
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: notes-app
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: notes-app
    spec:
      containers:
        - image: pavnasa/notes-app
          imagePullPolicy: IfNotPresent
          name: notes-app-deployment
          ports:
            - containerPort: 3000
              protocol: TCP
          resources:
            requests:
              cpu: 100m
```

This YAML output includes all key details such as metadata, specifications, and container configurations.

> [!important]
> **Note**
>
> The manifest output closely resembles the original file used for deployment creation, making it an excellent reference for understanding the resource structure.

──────────────────────────────────────────────

## Filtering Specific Information

Sometimes you only need to extract specific information from the manifest, such as the number of replicas. You have two options:

1.  **Using grep:**  
    This method filters the YAML output for occurrences of the `replicas` field.

    ```
    controlplane ~ ➜ k get -n uat deployments.apps notes-app-deployment -o yaml | grep replicas
      replicas: 2
      replicas: 2
    ```

2.  **Using JSONPath:**  
    For a cleaner output, use the JSONPath flag to extract just the value of replicas.

    ```
    controlplane ~ ➜ k get -n uat deployments.apps notes-app-deployment -o jsonpath="{.spec.replicas}"
    2
    ```

──────────────────────────────────────────────

## Extracting Container Specifications

To delve deeper into a deployment’s container specifications (such as image, ports, and resource requests), use JSONPath. Since the container configurations are nested under `spec.template.spec.containers`, running the command below will provide the necessary details:

```
controlplane ~ ➜ k get -n uat deployments.apps notes-app-deployment -o jsonpath="{.spec.template.spec.containers}"
[{"image": "pavnasa/notes-app", "imagePullPolicy": "IfNotPresent", "name": "notes-app-deployment", "ports": [{"containerPort":3000, "protocol": "TCP"}], "resources": {"requests": {"cpu": "100m"}}}]
```

This output displays all container configuration details defined in the Deployment.

──────────────────────────────────────────────

## Summary

In summary, this article covered:

- How to list cluster resources using `kubectl get` with or without namespaces.
- Exploring namespaces and specific deployments in the cluster.
- Inspecting detailed deployment manifests in YAML format.
- Extracting specific information (like the number of replicas) using grep or JSONPath.
- Retrieving container specifications directly from the deployment definition.

> [!important]
> **Further Reading**
>
> For more detailed information and advanced use cases, make sure to visit the [official Kubernetes documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/03d75733-68c9-4385-878c-d4462fb8d59f)**
>
> Watch video content
