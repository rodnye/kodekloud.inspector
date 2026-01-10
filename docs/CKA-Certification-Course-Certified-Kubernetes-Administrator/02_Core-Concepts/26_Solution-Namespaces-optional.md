# Solution Namespaces optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Namespaces-optional)

---

## Table of Contents

- Solution Namespaces optional
  - Identifying the Number of Namespaces
  - Counting Pods in the Research Namespace
  - Creating a Pod in the Finance Namespace
  - Locating the Blue Pod's Namespace
  - Accessing the Database Service from the Blue Application
  - Watch Video
    - Accessing the DB Service in the Same Namespace (Marketing)
    - Accessing the DB Service in the dev Namespace

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Solution Namespaces optional

This article provides a comprehensive lab walkthrough on namespaces in Kubernetes, addressing questions related to namespaces, pods, and services. Follow the steps below to learn how to manage namespaces effectively.

---

## Identifying the Number of Namespaces

To determine the number of namespaces in your cluster, you can run either of the following commands:

```
kubectl get namespaces
```

or its shorthand:

```
kubectl get ns
```

The sample output below shows a list of namespaces:

```
controlplane ~ ✗ kubectl get namespaces
NAME                 STATUS    AGE
default              Active    6m50s
kube-system          Active    6m49s
kube-public          Active    6m49s
kube-node-lease      Active    6m49s
finance              Active    27s
marketing            Active    27s
dev                  Active    27s
prod                 Active    27s
manufacturing        Active    27s
research             Active    27s
```

And using the shorthand command:

```
controlplane ~ ✗ kubectl get ns
NAME                 STATUS    AGE
default              Active    6m55s
kube-system          Active    6m54s
kube-public          Active    6m54s
kube-node-lease      Active    6m54s
finance              Active    32s
marketing            Active    32s
dev                  Active    32s
prod                 Active    32s
manufacturing        Active    32s
research             Active    32s
```

In this example, there are a total of 10 namespaces.

---

## Counting Pods in the Research Namespace

To determine the number of pods running in the research namespace, execute the following command:

```
kubectl get pods --namespace=research
```

The output might look like this:

```
controlplane ~ ⟶ kubectl get pods --namespace=research
NAME      READY   STATUS             RESTARTS   AGE
dna-2     0/1     CrashLoopBackOff   3 (14s ago)   76s
dna-1     0/1     CrashLoopBackOff   3 (16s ago)   76s
```

Alternatively, you can use the shorthand option:

```
kubectl get pods -n research
```

Both commands confirm that there are 2 pods in the research namespace.

---

## Creating a Pod in the Finance Namespace

Before creating a pod in the finance namespace, ensure that the namespace exists by running:

```
kubectl get namespaces
```

You should see output similar to:

```
controlplane ~ ❯ kubectl get namespaces
NAME                 STATUS   AGE
default              Active   6m50s
kube-system          Active   6m49s
kube-public          Active   6m49s
kube-node-lease      Active   6m49s
finance              Active   32s
marketing            Active   32s
dev                  Active   32s
prod                 Active   32s
manufacturing        Active   32s
research             Active   32s
```

Next, create a Redis pod named "redis" in the finance namespace with the following command:

```
kubectl run redis --image=redis -n finance
```

After successfully executing this command, you will see a confirmation message:

```
pod/redis created
```

You can verify the pod creation by listing the pods in the finance namespace:

```
kubectl get pods -n finance
```

Sample output:

```
NAME      READY   STATUS            RESTARTS   AGE
payroll   1/1     Running           0          2m20s
redis     0/1     ContainerCreating 0          8s
```

---

## Locating the Blue Pod's Namespace

To find out which namespace the blue pod is running in, you have two options:

1.  Manually inspect each namespace using:

    ```
    kubectl get pods -n <namespace>
    ```

2.  List all pods across every namespace with:

    ```
    kubectl get pods --all-namespaces
    ```

The sample output below illustrates pods across namespaces:

```
NAMESPACE         NAME                                                         READY   STATUS              RESTARTS   AGE
kube-system       local-path-provisioner-6c796847f7-j5sqx                        1/1     Running             0          9m5s
kube-system       coredns-57889956d-bkj56                                       1/1     Running             0          9m5s
kube-system       helm-install-traefik-crd-d2fg7                                0/1     Completed           0          9m
kube-system       metrics-server-7cd5fcbb67-kdgzb                                1/1     Running             1          9m5s
kube-system       helm-install-traefik-c987s                                     2/2     Running             0          8m30s
kube-system       svclb-traefik-jptsh                                           1/1     Running             0          9m5s
marketing         redis-db                                                     1/1     Running             0          3m
dev               redis-db                                                     1/1     Running             0          3m
manufacturing     red-app                                                      1/1     Running             0          3m
finance           payroll                                                      1/1     Running             0          3m
marketing         blue                                                         1/1     CrashLoopBackOff    4 (80s ago)  3m3s
research          dna-1                                                        0/1     CrashLoopBackOff    4 (70s ago)  3m3s
finance           redis                                                        1/1     Running             0          51s
```

From the output, it is clear that the blue pod is located in the **marketing** namespace.

---

## Accessing the Database Service from the Blue Application

The blue application, a simple web application for connectivity tests, interacts with a database service. Depending on where the DB service is running, the access method varies.

### Accessing the DB Service in the Same Namespace (Marketing)

In the marketing namespace, the blue application and its associated DB service coexist. To check the pods in this namespace, run:

```
kubectl get pods -n marketing
```

Expected output:

```
NAME       READY   STATUS    RESTARTS   AGE
redis-db   1/1     Running   0          4m14s
blue       1/1     Running   0          4m14s
```

Next, list the services in the marketing namespace:

```
kubectl get svc -n marketing
```

This yields an output similar to:

```
NAME            TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)            AGE
blue-service    NodePort   10.43.82.162   <none>        8080:30082/TCP     4m27s
db-service      NodePort   10.43.134.33   <none>        6379:30758/TCP     4m27s
```

Since both the blue application and the DB service are in the same namespace, the application can reach the DB service simply by using its DNS name, which is:

db-service

and connecting via port 6379.

---

### Accessing the DB Service in the dev Namespace

Another DB service is running in the dev namespace. To view it, execute:

```
kubectl get svc -n dev
```

The output might be as follows:

```
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
db-service      ClusterIP   10.43.252.9     <none>        6379/TCP         5m22s
```

To access the DB service in the dev namespace from the blue application located in the marketing namespace, you must use the fully qualified DNS name. The DNS naming convention is:

<service-name>.<namespace>.svc.cluster.local

In this case, the DNS name is:

db-service.dev.svc.cluster.local

Using this fully qualified domain name ensures traffic is correctly directed to the DB service in the dev namespace on port 6379.

> [!important]
> **Connectivity Test Tip**
>
> When performing connectivity tests from the blue application, the console output should verify that the connection to the DB service is successfully established.

![The image shows a "Connectivity Test" interface with a host name and port, indicating a successful connection.](https://kodekloud.com/kk-media/image/upload/v1752869752/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Namespaces-optional/frame_350.jpg)

---

This concludes the lab solution for namespaces. Each step demonstrates how to manage and interact with namespaces, pods, and services in a Kubernetes cluster.

For more details on Kubernetes concepts, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/19e44a33-f77a-4b34-bfde-19fdce6fd8a7)**
>
> Watch video content
