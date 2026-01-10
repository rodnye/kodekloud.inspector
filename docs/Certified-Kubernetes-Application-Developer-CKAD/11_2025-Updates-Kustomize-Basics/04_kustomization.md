# kustomization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/kustomization)

---

## Table of Contents

- kustomization
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# kustomization

Now that you have installed and configured the Kustomize tool, let's dive into how to work with it using the kustomization.yaml file. In this lesson, you'll learn what the kustomization.yaml file is, why it's essential, and how to set it up for your projects.

Consider a directory named "K8s" containing your Kubernetes configurations. In this example, the directory includes two YAML files: one for the nginx deployment and one for the nginx service. Keep in mind that Kustomize does not automatically read all YAML files in a directory—it specifically searches for a file named kustomization.yaml. You must create this file manually and ensure it is named exactly as kustomization.yaml.

Inside the kustomization.yaml file, there are two primary sections:

1.  A list of Kubernetes resources that Kustomize will manage.
2.  A section for customizations or transformations that will be applied to those resources.

For example, the following kustomization.yaml file manages both the nginx deployment and service, while applying a common label to all resources:

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

- The `resources` list enumerates the YAML files that Kustomize should process.
- The `commonLabels` transformation adds an extra label with the key `company` and the value `KodeKloud` to every resource.

Once your kustomization.yaml file is ready, run the Kustomize build command by pointing it to the directory containing the file:

```
$ kustomize build k8s/
```

This command imports the defined resources, applies the specified transformations, and outputs the final configuration. Below is an example of the output after executing the command:

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
---
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

As shown in the output, both the nginx service and deployment now include the `company: KodeKloud` label as defined by the common label transformation.

> [!important]
> **Note**
>
> The `kustomize build` command generates the final configuration but does not deploy the resources to your cluster. To apply these configurations, you can redirect the output to kubectl using a command like `kustomize build k8s/ | kubectl apply -f -`.

In summary, this lesson covered the following key points:

- Kustomize searches for a kustomization.yaml file in the target directory.
- The file lists the Kubernetes resources (manifests) to manage and specifies a set of transformations.
- Running the command `kustomize build k8s/` processes these resources and outputs the finalized configuration.

Happy customizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/c0dec2bd-e98d-49ce-acce-f7e419016593)**
>
> Watch video content
