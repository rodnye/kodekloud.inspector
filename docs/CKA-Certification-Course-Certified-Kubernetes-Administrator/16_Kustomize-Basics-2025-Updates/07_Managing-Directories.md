# Managing Directories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Managing-Directories)

---

## Table of Contents

- Managing Directories
  - Basic Directory Structure Without Kustomize
  - Organizing YAML Files into Subdirectories
  - Simplifying Deployment with Kustomize
  - Scaling with Multiple Directories
  - Deploying the Configurations
  - Conclusion
  - Watch Video
    - Using Individual kustomization.yaml Files in Subdirectories

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Managing Directories

Organizing and managing your Kubernetes manifests across multiple directories can be streamlined with Kustomize. This guide explains how to structure your YAML files effectively, simplify deployment workflows, and maintain a clean configuration hierarchy for your clusters.

## Basic Directory Structure Without Kustomize

Initially, you might store all your Kubernetes YAML files in a single directory (e.g., a directory named "k8s"). In this simple setup, you could have files such as:

- API deployment YAML file
- API service YAML file
- Database deployment YAML file
- Database service YAML file

To deploy these configurations, navigate to your "k8s" directory and run:

```
kubectl apply -f .
```

This method works well for a small number of files. However, as your application scales, you'll likely end up with dozens of manifests, which can clutter your directory and complicate maintenance.

## Organizing YAML Files into Subdirectories

A more structured approach is to organize your manifests into subdirectories. For instance, you can place API-related configurations in an "api" subdirectory and database-related configurations in a "db" subdirectory. Deployment commands for each subdirectory would look like this:

```
kubectl apply -f k8s/api/
```

```
kubectl apply -f k8s/db/
```

While this method is functional, it may become cumbersome when dealing with numerous subdirectories, especially when managing repetitive commands in CI/CD pipelines.

## Simplifying Deployment with Kustomize

Kustomize simplifies this process by letting you define a single `kustomization.yaml` file that aggregates resources from multiple directories. Create a `kustomization.yaml` file in the root of your "k8s" directory with a list of resources and their relative paths. For example:

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

With this configuration, deploy all resources from the root directory using one of the following commands:

```
kustomize build k8s/ | kubectl apply -f -
```

Or leverage kubectl's native Kustomize support:

```
kubectl apply -k k8s/
```

These commands aggregate the YAML files specified in `kustomization.yaml` and deploy them simultaneously, eliminating the need to apply individual directories manually.

## Scaling with Multiple Directories

As your Kubernetes project grows, you might add more subdirectories for additional services like caches or messaging systems (e.g., Redis or Kafka). For instance, your root `kustomization.yaml` file might expand to include these new resources:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


# Kubernetes resources across multiple subdirectories
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

> [!important]
> **Tip**
>
> Consider breaking down the configurations into subdirectories with their own `kustomization.yaml` files. This not only simplifies maintenance but also enhances scalability.

### Using Individual kustomization.yaml Files in Subdirectories

For improved maintainability, create a separate `kustomization.yaml` file within each subdirectory (such as "api", "db", "cache", and "kafka"). For example, in the "db" directory, create a file with the following content:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - db-depl.yaml
  - db-service.yaml
```

Then, update the root `kustomization.yaml` file to reference each subdirectory:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api/
  - db/
  - cache/
  - kafka/
```

Kustomize will recursively process each subdirectory's `kustomization.yaml`, aggregating all the resources for deployment. This modular approach makes your configuration more manageable over time.

## Deploying the Configurations

After setting up both the root and subdirectory-specific `kustomization.yaml` files, deployment becomes effortless. Simply run one of the following commands to deploy all configurations:

```
kustomize build k8s/ | kubectl apply -f -
```

Or, using kubectl’s built-in Kustomize support:

```
kubectl apply -k k8s/
```

Both methods compile all the manifests from your subdirectories and apply them in a single, efficient deployment process.

## Conclusion

By organizing your Kubernetes YAML files into dedicated subdirectories and leveraging Kustomize with individual `kustomization.yaml` files, you can manage complex deployments more effectively. This approach not only cleans up your configuration hierarchy but also streamlines CI/CD pipelines by reducing repetitive commands.

For more insights on Kubernetes configuration management, consider exploring the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kustomize Overview](https://kubectl.docs.kubernetes.io/references/kustomize/)

> [!important]
> **Warning**
>
> Always test your Kustomize configurations in a staging environment before deploying to production. This practice helps ensure that your aggregated manifests work as expected across your Kubernetes clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/2ce4f9d0-46e1-4fb3-bd7d-1d44669edd64)**
>
> Watch video content
