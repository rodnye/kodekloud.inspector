# Managing Directories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Managing-Directories)

---

## Table of Contents

- Managing Directories
  - Traditional Organization and Its Limitations
  - Simplifying with Kustomize
  - Scaling with Additional Directories
  - A Cleaner Approach with Subdirectory kustomization.yaml Files
  - Watch Video
    - Setting Up Your Root kustomization.yaml

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Managing Directories

Up to this point, we've only covered the absolute basics of a kustomization.yaml file. While we haven't explored every feature of Kustomize, you already have the tools to perform some powerful operations. One common requirement is managing Kubernetes manifests distributed across multiple directories. In this guide, you'll learn how to organize and apply configurations efficiently using Kustomize.

---

## Traditional Organization and Its Limitations

Imagine a directory named "k8s" that contains four YAML files:

- An API deployment manifest
- An API service manifest
- A database deployment manifest
- A database service manifest

With this simple setup, you might navigate to the "k8s" directory and run:

```
$ kubectl apply -f .
```

This approach works based on standard Kubernetes behavior without requiring Kustomize. However, as the number of YAML files increases—perhaps to 20, 30, 50, or more—the directory can quickly become cluttered. To better manage the files, you might group related manifests into subdirectories. For example:

- Move the API deployment and service YAML files into an `api` subdirectory.
- Move the database deployment and service YAML files into a `db` subdirectory.

After reorganizing, you can no longer apply the configuration files from the root directory using one command. Instead, you must apply each group with separate commands like:

```
$ kubectl apply -f k8s/api/
$ kubectl apply -f k8s/db/
```

This approach soon becomes cumbersome, especially when updating configurations or automating deployments with CI/CD pipelines.

---

## Simplifying with Kustomize

Kustomize can significantly streamline the process by allowing you to manage multiple directories from a single kustomization.yaml file.

> [!important]
> **Tip**
>
> With Kustomize, you can maintain a single command to deploy resources, reducing manual steps and potential errors.

### Setting Up Your Root kustomization.yaml

1.  In the root of your "k8s" directory, create a `kustomization.yaml` file.
2.  List all individual resource files using their relative paths.

For example:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


# Kubernetes resources to be managed by Kustomize
resources:
  - api/api-depl.yaml
  - api/api-service.yaml
  - db/db-depl.yaml
  - db/db-service.yaml
```

Now, instead of applying each subdirectory manually, you can deploy all the resources with a single command. There are two primary options:

1.  Build the complete configuration and pipe it to kubectl:

    ```
    $ kustomize build k8s/ | kubectl apply -f -
    ```

2.  Apply directly using kubectl’s built-in Kustomize support:

    ```
    $ kubectl apply -k k8s/
    ```

Both commands process the `kustomization.yaml` file and deploy the defined resources automatically.

---

## Scaling with Additional Directories

Over time, your application may bring in new components—such as a cache for Redis or a Kafka service. In that case, your root kustomization.yaml might expand to list many individual resources:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


# Kubernetes resources to be managed by Kustomize
resources:
  - api/api-depl.yaml
  - api/api-service.yaml
  - db/db-depl.yaml
  - db/db-service.yaml
  - cache/redis-depl.yaml
  - cache/redis-service.yaml
  - cache/redis-config.yaml
  - kafka/kafka-depl.yaml
  - kafka/kafka-service.yaml
  - kafka/kafka-config.yaml
```

While this configuration is entirely valid, the root file can become cluttered as the number of resources grows.

---

## A Cleaner Approach with Subdirectory kustomization.yaml Files

A more elegant solution delegates resource management to the individual subdirectories. In each subdirectory (e.g., `api`, `db`, `cache`, and `kafka`), create a separate `kustomization.yaml` file that lists only the YAML files contained within that directory.

For example, the `db` directory might have the following kustomization.yaml file:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - db-depl.yaml
  - db-service.yaml
```

Repeat a similar configuration for the other subdirectories.

Next, update the root kustomization.yaml file to reference these directories:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api/
  - db/
  - cache/
  - kafka/
```

Now, when you run either:

```
$ kustomize build k8s/ | kubectl apply -f -
```

or

```
$ kubectl apply -k k8s/
```

Kustomize will traverse each subdirectory, process the individual kustomization.yaml files, and aggregate all the specified resources into one cohesive deployment. This approach keeps your root configuration clean, scalable, and easier to maintain.

---

By organizing your configurations with subdirectory kustomization.yaml files, you not only simplify the management of Kubernetes manifests but also streamline your deployment processes—ideal for continuous integration and continuous delivery (CI/CD) pipelines.

For more details on deploying and managing Kubernetes applications, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

Happy Kustomizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/2ce4f9d0-46e1-4fb3-bd7d-1d44669edd64)**
>
> Watch video content
