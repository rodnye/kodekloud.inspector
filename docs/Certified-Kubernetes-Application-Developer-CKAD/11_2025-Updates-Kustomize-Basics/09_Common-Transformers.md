# Common Transformers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Common-Transformers)

---

## Table of Contents

- Common Transformers
  - Common Label Transformation
  - Namespace Transformation
  - Prefix and Suffix Transformation
  - Common Annotations Transformation
  - Summary of Common Transformers
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Common Transformers

In this lesson, you'll learn how to efficiently modify and manage your Kubernetes manifests using Kustomize. Kustomize streamlines the process of updating common configurations across multiple YAML files by leveraging built-in transformers. This article focuses on a subgroup known as Common Transformers, which help you apply consistent changes such as labels, namespaces, prefixes/suffixes, and annotations without manually updating each resource.

Consider an example where you have a basic Deployment and Service defined in separate YAML files:

```
# db-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: api
  template:
    metadata:
      labels:
        component: api
    spec:
      containers:
      - name: nginx
        image: nginx

# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: db-service
spec:
  selector:
    component: db-depl
  ports:
  - protocol: "TCP"
    port: 27017
    targetPort: 27017
  type: LoadBalancer
```

Suppose you want to add a common configuration—such as a label identifying your organization—to all your Kubernetes resources. Manually editing each YAML file is not scalable, particularly in environments with dozens of resources. Instead, Kustomize applies these common changes automatically using transformers.

For example, to add the label "org: KodeKloud" to every resource, you might update your files as follows:

```
# db-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      component: api
      org: KodeKloud
  template:
    metadata:
      labels:
        component: api
        org: KodeKloud
    spec:
      containers:
      - name: nginx
        image: nginx

# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  labels:
    org: KodeKloud
spec:
  selector:
    component: api
  ports:
  - protocol: "TCP"
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

Or, if you need to append a suffix (e.g., "-dev") to resource names, your Deployment could be modified like this:

```
# db-depl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment-dev
spec:
  replicas: 1
  selector:
    matchLabels:
      component: api
      org: KodeKloud
  template:
    metadata:
      labels:
        component: api
        org: KodeKloud
    spec:
      containers:
      - name: nginx
        image: nginx
```

Rather than editing each file manually, Kustomize uses transformers to automate these updates. Below are several common transformers you can leverage:

---

## Common Label Transformation

The common label transformer automatically adds a specified label to every resource included in your kustomization.yaml file. For instance, to ensure every resource includes the label "org: KodeKloud", add the following to your configuration:

```
commonLabels:
  org: KodeKloud
```

When applied, this transformer injects the label into the metadata of every resource, streamlining updates and reducing human error.

---

## Namespace Transformation

Assigning resources to a specific namespace is simplified with the namespace transformer. By specifying the namespace in your kustomization.yaml, you ensure that all resources are deployed into that namespace. For example, consider the following Service definition:

```
# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  annotations:
    branch: master
  labels:
    org: KodeKloud
spec:
  selector:
    component: api
  ports:
  - port: 80
    protocol: TCP
    targetPort: 3000
  type: LoadBalancer
```

And in your configuration file, include:

```
namespace: lab
```

> [!important]
> **Note**
>
> This setting ensures that the Service, along with all other defined resources, will be deployed to the "lab" namespace.

---

## Prefix and Suffix Transformation

With the prefix/suffix transformer, you can automatically alter the names of your resources without manually editing every file. For example, to add the prefix "KodeKLOUD-" and suffix "-dev" to a Service name, use the following configuration:

```
namePrefix: KodeKLOUD-
nameSuffix: -dev
```

After transformation, the Service's name will be updated to "KodeKLOUD-api-service-dev". Here’s an example of the transformed Service resource:

```
# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: KodeKLOUD-api-service-dev
spec:
  selector:
    component: api
  ports:
  - port: 80
    protocol: TCP
    targetPort: 3000
  type: LoadBalancer
```

---

## Common Annotations Transformation

If you need to add common annotations to all Kubernetes objects, you can define these in your kustomization.yaml file. For example, to add the annotation "branch: master" everywhere, your configuration might look like this:

```
# db-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
  annotations:
    branch: master
  labels:
    org: KodeKloud
  namespace: auth
spec:
  selector:
    component: api
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
  type: LoadBalancer

# Kustomization.yaml
commonAnnotations:
  branch: master
```

This setup guarantees that the annotation is consistently applied across all resources, eliminating the need for repetitive edits.

---

## Summary of Common Transformers

Below is a table summarizing the common transformers available in Kustomize and their use cases:

| Transformer        | Use Case                                      | Example Configuration                           |
| ------------------ | --------------------------------------------- | ----------------------------------------------- |
| Common Label       | Add a label to all resources                  | `commonLabels: { org: KodeKloud }`              |
| Namespace          | Assign resources to a specific namespace      | `namespace: lab`                                |
| Prefix/Suffix      | Modify resource names with a prefix or suffix | `namePrefix: KodeKLOUD-` and `nameSuffix: -dev` |
| Common Annotations | Apply consistent annotations to resources     | `commonAnnotations: { branch: master }`         |

Using these transformers can greatly simplify deployment and maintenance processes, especially when managing a large suite of Kubernetes manifests.

For more details on Kubernetes and managing configurations, check out the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/f5d9be8b-990f-40eb-bfc2-6594c0cb8a3b)**
>
> Watch video content
