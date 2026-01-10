# Transformers Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Transformers-Demo)

---

## Table of Contents

- Transformers Demo
  - Directory Structure Overview
  - Applying a Common Label
  - Label Application in Subdirectories
  - Setting a Specific Namespace
  - Adding Name Prefixes and Suffixes
  - Adding a Common Annotation
  - Image Transformation
  - Wrapping Up
  - Watch Video
  - Practice Lab
    - Adding a Global Name Prefix
    - Adding Folder-Specific Name Suffixes

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Transformers Demo

In this guide, we demonstrate how to use common transformation techniques with Kustomize, including the image transformer. We also review the directory structure used in this demonstration to help you manage and organize Kubernetes configurations efficiently.

## Directory Structure Overview

Assume you have a directory named "K8s" containing two subdirectories: "API" and "database".

- In the **API** directory, you will find:
  - API deployment YAML file (e.g., `api-depl.yaml`)
  - API service YAML file (e.g., `api-service.yaml`)
  - `kustomization.yaml`

- In the **database** directory, you will find:
  - Database deployment YAML file (e.g., `db-depl.yaml`)
  - Database service YAML file (e.g., `db-service.yaml`)
  - Config YAML file (e.g., `db-config.yaml`)
  - `kustomization.yaml`

Each subdirectory’s `kustomization.yaml` is configured to import and manage all resources within that directory. For instance, the **API** directory’s `kustomization.yaml` might look like this:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
```

And the **database** directory’s `kustomization.yaml` imports the database configurations:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
```

At the root level, the `kustomization.yaml` aggregates the API and database configurations:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api/
  - db/
```

## Applying a Common Label

To add a common label to all resources, modify the root `kustomization.yaml` file. For example, to add the label `department: engineering` to every resource:

1.  Open the root `kustomization.yaml`.
2.  Add the common label configuration.
3.  Save the file and run the Kustomize build command.

When you run:

```
kustomize build k8s/
```

the output will include all the resources with the label `department: engineering`. For example, a ConfigMap might appear as follows:

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

All resources in both the API and database directories now include the `department: engineering` label.

## Label Application in Subdirectories

When you add a common label within a subdirectory's `kustomization.yaml` rather than in the root file, the label will only affect resources within that subdirectory. For example, if you apply a label in the API directory like so:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - api-depl.yaml
  - api-service.yaml
commonLabels:
  feature: api
```

the `feature: api` label is applied only to the resources listed in that file. This means that the API service will have both the root label (`department: engineering`) and the subdirectory-specific label (`feature: api`), while resources in the database directory will only have the global label.

A snippet of the resulting output could look like:

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
    feature: api
  name: api-service
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 3000
```

To differentiate between API and database resources further, you can add common labels specific to the database environment in the database directory’s `kustomization.yaml`. For example:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - db-config.yaml
  - db-depl.yaml
  - db-service.yaml
commonLabels:
  feature: db
```

After building the configuration, database resources will include:

```
metadata:
  labels:
    department: engineering
    feature: db
```

## Setting a Specific Namespace

To place all resources into a specific namespace, such as a debugging environment, add the `namespace` field to your root `kustomization.yaml`. For example:

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

After running the build, all resources from both API and database directories will be assigned the namespace `debugging`.

## Adding Name Prefixes and Suffixes

If you want every object name to have a common prefix (e.g., "KodeKloud-") with folder-specific suffixes (like `-web` for API resources and `-storage` for database resources), follow these steps:

### Adding a Global Name Prefix

Edit the root `kustomization.yaml` to include the prefix:

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

After this change, the API deployment name might appear as `KodeKloud-api-deployment` (with an additional suffix appended later).

### Adding Folder-Specific Name Suffixes

For the API subdirectory, add a name suffix in its `kustomization.yaml`:

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

For the database subdirectory, add a different name suffix:

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

After rebuilding, you will see that API resource names end with `-web` while database resource names end with `-storage`, all prefixed by "KodeKloud-". For example, the API service might be named:

```
name: KodeKloud-api-deployment-web
```

and the database deployment might be:

```
name: KodeKloud-db-deployment-storage
```

## Adding a Common Annotation

To apply a common annotation across every resource, add the following to your root `kustomization.yaml`:

```
commonAnnotations:
  logging: verbose
```

After rebuilding, every resource will include the annotation `logging: verbose`.

## Image Transformation

Finally, let’s look at how to update container images using the image transformer. Consider a scenario where a database deployment is set to use the Mongo image, but you want to replace it with Postgres using a specific tag.

In the database directory’s `kustomization.yaml` (or in another appropriate configuration file), add an image transformer configuration like this:

```
images:
  - name: mongo
    newName: postgres
    newTag: "4.2"
```

This configuration instructs Kustomize to search for any container image named "mongo" and update it to "postgres:4.2". Note that only the image is updated; the container’s name remains unchanged.

> [!important]
> **Tip**
>
> Ensure you enclose the new tag in quotes to avoid type conversion issues (e.g., `newTag: "4.2"`). This prevents errors such as:
>
> Error: accumulating resources: ... json: cannot unmarshal number into Go struct field Image.images.newTag of type string

After applying this transformer and running:

```
kustomize build k8s/
```

the database deployment’s container image should update to:

```
image: postgres:4.2
```

while all other image configurations remain untouched.

## Wrapping Up

This guide demonstrated how to:

- Organize Kubernetes configuration files into modular directories.
- Apply common labels, name prefixes, and suffixes globally or specifically in each subdirectory.
- Configure a namespace and common annotations.
- Use an image transformer to update container images seamlessly.

In the next section, try the lab exercises to gain hands-on experience with customizing Kustomize configurations and transformers.

Happy customizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/263d84a1-1c9d-40e7-afa3-9a7457c499cd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/2b58089b-bdb2-49bb-ac98-e1a8799c5526)**
>
> Practice lab
