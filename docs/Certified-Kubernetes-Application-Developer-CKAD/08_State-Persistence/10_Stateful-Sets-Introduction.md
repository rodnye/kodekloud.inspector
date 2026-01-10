# Stateful Sets Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Stateful-Sets-Introduction)

---

## Table of Contents

- Stateful Sets Introduction
  - Converting a Deployment to a StatefulSet
  - Creating and Managing a StatefulSet
  - Customizing Pod Deployment Strategy
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Stateful Sets Introduction

In this lesson, we explore StatefulSets in Kubernetes and explain when to use them instead of Deployments. StatefulSets are ideal for applications that require:

- Ordered startup and shutdown
- Stable network identities
- Consistent storage provisioning

When your application instances need to start in a specific order or require persistent identities between restarts, opting for a StatefulSet is the right choice.

> [!important]
> **Key Difference from Deployments**
>
> A StatefulSet is similar to a Deployment in that you define it via a YAML file with a Pod template. The main differences are:
>
> - Change the kind from Deployment to StatefulSet (note the uppercase “S”).
> - Include the additional field 'serviceName' to specify a headless service.

## Converting a Deployment to a StatefulSet

Consider the following example of a MySQL Deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql
```

To convert this Deployment into a StatefulSet, modify the YAML file by updating the kind and adding the `serviceName` field:

```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  serviceName: mysql-h
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql
```

When you create a StatefulSet using this file, Kubernetes will:

- Deploy Pods one at a time in an ordered, graceful manner.
- Assign a stable, unique DNS record to each Pod, allowing other applications to refer to them reliably.
- Scale Pods sequentially, where each new Pod starts only after the previous one is ready.

This ordered behavior is particularly beneficial for applications like MySQL databases, where preserving state and order is critical.

## Creating and Managing a StatefulSet

You can use standard Kubernetes commands to create and scale your StatefulSet. For example:

```
kubectl create -f statefulset-definition.yml
kubectl scale statefulset mysql --replicas=5
# Output: statefulset.apps/mysql scaled
```

When scaling down, Kubernetes terminates the Pods in reverse order: the last Pod is removed first, followed by earlier ones. Likewise, when deleting the StatefulSet, Pods are terminated in reverse order.

## Customizing Pod Deployment Strategy

By default, StatefulSets follow an ordered approach for both deployment and termination. However, you can override this behavior by setting the `podManagementPolicy` to `Parallel`. This instructs Kubernetes to deploy and terminate all Pods simultaneously while still providing them with stable network identities.

Below is an example StatefulSet configuration that uses the `Parallel` pod management policy:

```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
  labels:
    app: mysql
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  serviceName: mysql-h
  podManagementPolicy: Parallel
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql
```

You can manage this StatefulSet with the following commands:

```
kubectl create -f statefulset-definition.yml
kubectl scale statefulset mysql --replicas=5
kubectl scale statefulset mysql --replicas=3
kubectl delete statefulset mysql
# Output: statefulset.apps/mysql deleted
```

This configuration allows Pods to be launched or terminated in parallel, which can be advantageous when the order of operations is not a strict requirement for your application.

> [!important]
> **Remember**
>
> While the `Parallel` management policy offers faster scaling, it does so at the cost of ordered deployment. Choose the appropriate policy based on your application's initialization and shutdown needs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/c80a8c28-80bf-4f79-8d4a-0368caf88f2b)**
>
> Watch video content
