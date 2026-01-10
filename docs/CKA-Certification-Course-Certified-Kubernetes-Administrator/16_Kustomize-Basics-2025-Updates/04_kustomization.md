# kustomization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/kustomization)

---

## Table of Contents

- kustomization
  - Understanding the kustomization.yaml File
  - Building the Final Configuration
  - Deploying the Final Configuration
  - Key Takeaways
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# kustomization

Now that you have the Kustomize tool installed and configured, let's explore the kustomization.yaml file in detail. This file is crucial for directing Kustomize on which Kubernetes configuration files to process and how to transform them.

## Understanding the kustomization.yaml File

Imagine you have a Kubernetes directory (K8s) containing several configuration files, such as one for the nginx deployment and another for the nginx service. Instead of processing every YAML file in the directory, Kustomize looks for a specifically named file: kustomization.yaml. This file must be manually created, and its presence is essential for Kustomize to function properly.

Within the kustomization.yaml file, there are two primary sections:

1.  A list of Kubernetes resource files to be managed.
2.  Custom transformations to be applied across those resources.

For instance, consider the following example of a kustomization.yaml file:

```
# Kubernetes resources to be managed by Kustomize
resources:
  - nginx-deployment.yaml
  - nginx-service.yaml


# Customizations to be applied
commonLabels:
  company: KodeKloud
```

In this configuration:

- The **resources** section specifies the YAML files that Kustomize should process.
- The **commonLabels** transformation adds a label, with the key "company" and value "KodeKloud", to every resource listed in the included YAML files.

> [!important]
> **Note**
>
> This is just one example of the many transformations available in Kustomize. There are several other customization techniques that you can apply to tailor your deployments.

## Building the Final Configuration

After configuring your kustomization.yaml file, you can generate the final configuration by running the following command:

```
$ kustomize build k8s/
```

When you execute this command, Kustomize performs the following steps:

- It locates the kustomization.yaml file in the specified K8s directory.
- It reads the list of resources defined within the file.
- It applies all configured transformations (in this case, adding the common label).

The output generated from this process might resemble the following:

```
apiVersion: v1
kind: Service
metadata:
  labels:
    company: KodeKloud
  name: nginx-loadbalancer-service
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
  selector:
    company: KodeKloud
    component: nginx
  type: LoadBalancer


apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    company: KodeKloud
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      company: KodeKloud
      component: nginx
  template:
    metadata:
      labels:
        company: KodeKloud
        component: nginx
    spec:
      containers:
        - image: nginx
          name: nginx
```

This output shows both the nginx service and deployment configurations with the applied transformation—adding the common label "company: KodeKloud". Note that running the `kustomize build` command only outputs the final configuration and does not deploy these resources to your Kubernetes cluster.

![The image is a slide explaining the use of Kustomize in Kubernetes, detailing how it looks for a customization file and the function of the `kustomize build` command. It notes that the command combines manifests but does not deploy resources to a cluster.](https://kodekloud.com/kk-media/image/upload/v1752869810/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-kustomization/kustomize-kubernetes-customization-slide.jpg)

## Deploying the Final Configuration

To deploy the final configuration to your Kubernetes cluster, you can redirect the output of the `kustomize build` command to `kubectl apply`. This deployment process will be explained in a subsequent lesson.

## Key Takeaways

- Kustomize requires a kustomization.yaml file that lists the resources to manage and the transformations to apply.
- The `kustomize build` command processes these resource files and outputs the final configuration without deploying it.
- Additional steps, such as piping the output to `kubectl apply`, are necessary to deploy the resources to your Kubernetes cluster.

By understanding and using the kustomization.yaml file properly, you can efficiently manage and transform your Kubernetes resources using Kustomize.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/c0dec2bd-e98d-49ce-acce-f7e419016593)**
>
> Watch video content
