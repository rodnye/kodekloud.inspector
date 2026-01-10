# Transformers Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Transformers-Demo)

---

## Table of Contents

- Transformers Demo
  - Adding a Common Label to All Resources
  - Applying Labels in Subdirectories Versus the Root
  - Adding a Namespace to All Configurations
  - Configuring Name Prefixes and Suffixes
  - Adding a Common Annotation
  - Using the Image Transformer
  - Summary of Kustomize Transformations
  - Conclusion
  - Watch Video
  - Practice Lab
    - Global Name Prefix
    - Folder-Specific Name Suffixes

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Transformers Demo

In this lesson, you will learn how to leverage various common Kustomize transformations—including the image transformer—in a Kubernetes configuration demo. We will walk you through using global and folder-specific settings for labels, namespaces, name prefixes/suffixes, annotations, and image updates to simplify and standardize your configurations.

The demo project is organized with a clear directory structure:

- A top-level "k8s" directory containing two subdirectories:
  - An "API" folder with:
    - An API deployment YAML file (e.g., api-depl.yaml)
    - An API service YAML file (e.g., api-service.yaml)
    - A kustomization.yaml file that imports these resources
  - A "database" folder with:
    - A database deployment YAML file (e.g., db-depl.yaml)
    - A database service YAML file (e.g., db-service.yaml)
    - A config YAML file (e.g., db-config.yaml)
    - Its own kustomization.yaml file that imports these resources

Both subdirectories use a kustomization.yaml file configured to import all relevant YAML files. For example, the API directory’s kustomization.yaml is defined as:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
```

Likewise, the database directory’s kustomization.yaml is set up as follows:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
```

At the root level, the main kustomization.yaml imports both subdirectories:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - db/
```

---

## Adding a Common Label to All Resources

To ensure every Kubernetes resource is marked with a common label such as `department: engineering`, update the root kustomization.yaml. This change propagates the label to both the API and database configurations.

After adding the label, run the following command in your terminal (from the correct directory):

```
kustomize build k8s/
```

The built output will show every resource containing the label. For example, a ConfigMap might appear as:

```
apiVersion: v1
data:
  password: example
  username: root
kind: ConfigMap
metadata:
  labels:
    department: engineering
  name: db-credentials
---
apiVersion: v1
kind: Service
metadata:
  labels:
    department: engineering
  name: api-service
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
```

> [!important]
> **Note**
>
> Review the configuration output to verify that resources from both the API and database directories now include the `department: engineering` label.

---

## Applying Labels in Subdirectories Versus the Root

If you need to add an additional label only for a specific group of resources, add the extra label in the corresponding subdirectory’s kustomization.yaml. For instance, to assign the label `feature: api` only to API resources, update the API folder’s kustomization.yaml as follows:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api-depl.yaml
  - api-service.yaml


commonLabels:
  feature: api
```

When you rebuild the configuration, resources in the API folder will inherit both the global `department: engineering` label and the subdirectory-specific `feature: api` label. In contrast, the database folder resources will retain only the global labels.

---

## Adding a Namespace to All Configurations

To assign a uniform namespace (such as `debugging`) for all resources, the root kustomization.yaml must be updated. For example:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - db/
commonLabels:
  department: engineering
namespace: debugging
```

Executing `kustomize build k8s/` will produce YAML with every resource set to the `debugging` namespace.

---

## Configuring Name Prefixes and Suffixes

To modify resource names for easier identification and organization, you can define a common name prefix as well as folder-specific name suffixes.

### Global Name Prefix

Apply a common prefix (e.g., "KodeKloud-") in the root kustomization.yaml:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - db/
commonLabels:
  department: engineering
namespace: debugging
namePrefix: KodeKloud-
```

### Folder-Specific Name Suffixes

For the API folder, include a suffix (e.g., `-web`) by updating its kustomization.yaml:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
commonLabels:
  feature: api
nameSuffix: -web
```

Similarly, for the database folder, set a suffix (e.g., `-storage`):

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
commonLabels:
  feature: db
nameSuffix: -storage
```

After rebuilding the configuration, you will see resource names like `KodeKloud-api-deployment-web` for API resources and `KodeKloud-db-deployment-storage` for database resources.

> [!important]
> **Pro Tip**
>
> Using both global name prefixes and folder-specific suffixes helps maintain a consistent naming convention across your deployments, making management and identification much easier.

---

## Adding a Common Annotation

To add the same annotation to every resource, include the `commonAnnotations` field in the root kustomization.yaml. For example, to add `logging: verbose`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - db/
commonLabels:
  department: engineering
namespace: debugging
namePrefix: KodeKloud-
commonAnnotations:
  logging: verbose
```

After running the build process, every resource will have the `logging: verbose` annotation in its metadata.

---

## Using the Image Transformer

The image transformer allows you to update container images in your deployment configuration. Suppose your database deployment currently uses MongoDB, and you need to change it to PostgreSQL. In the database folder’s kustomization.yaml, define an `images` block:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
commonLabels:
  feature: db
nameSuffix: -storage
namespace: debugging
images:
  - name: mongo
    newName: postgres
    newTag: "4.2"
```

A few key points:

- The transformer only updates the image in the deployment spec, leaving the container name unchanged.
- Always enclose the image tag in quotes (e.g., `"4.2"`) to prevent type conversion issues.
- Apply the transformer specifically to a subdirectory if you want to limit the scope of the change.

After running `kustomize build k8s/`, the database deployment will reference the image `postgres:4.2` while retaining the original container name ("mongo"). An excerpt from the output might look like this:

```
...
spec:
  containers:
    - name: mongo
      image: postgres:4.2
      env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            configMapKeyRef:
              key: username
              name: KodeKloud-db-credentials-storage
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            configMapKeyRef:
              key: password
              name: KodeKloud-db-credentials-storage
...
```

> [!important]
> **Important**
>
> If you encounter an error indicating a type conversion issue, ensure that the image tag value is provided as a string using quotes.

---

## Summary of Kustomize Transformations

Below is a summary table of the transformations we covered in this lesson:

| Transformation Type  | Purpose                                   | Example Configuration               |
| -------------------- | ----------------------------------------- | ----------------------------------- |
| Common Labels        | Apply a label across all resources        | `department: engineering`           |
| Subdirectory Labels  | Apply a label to specific resource groups | `feature: api` or `feature: db`     |
| Namespace Assignment | Set a common namespace for all resources  | `namespace: debugging`              |
| Name Prefix/Suffix   | Standardize resource names                | `KodeKloud-` / `-web` or `-storage` |
| Common Annotations   | Add a common annotation to all resources  | `logging: verbose`                  |
| Image Transformation | Update container images in deployments    | Change `mongo` to `postgres:4.2`    |

---

## Conclusion

In this lesson, we demonstrated how to:

- Organize your Kubernetes configurations using multiple kustomization.yaml files.
- Apply both global and folder-specific labels, namespaces, name prefixes/suffixes, and annotations.
- Use the image transformer to update container images seamlessly.

With these techniques, Kustomize streamlines Kubernetes configuration management by allowing transformations at both the global and granular levels. In the next lab, you'll get hands-on experience modifying these transformers to further enhance your cluster configurations.

For more information on Kubernetes and configuration management, check out these helpful resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/263d84a1-1c9d-40e7-afa3-9a7457c499cd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/2b58089b-bdb2-49bb-ac98-e1a8799c5526)**
>
> Practice lab
