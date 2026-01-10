# Managing Revisions and Secrets in Azure Container Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Implementing-Azure-Container-Apps/Managing-Revisions-and-Secrets-in-Azure-Container-Apps)

---

## Table of Contents

- Managing Revisions and Secrets in Azure Container Apps
  - Managing Secrets
  - Configuring Revisions
  - Updating Containers
  - Further Revision Customizations
  - Managing Traffic Distribution
  - Creating and Managing Secrets Directly
  - Dapr Integration
  - References
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Implementing Azure Container Apps

# Managing Revisions and Secrets in Azure Container Apps

Azure Container Apps supports versioning through revisions. Each revision represents a distinct version of your application and works similarly to deployment slots in Azure App Service. Whether you update environment variables, adjust compute settings, or deploy a new container image, every update creates a new revision. This design enables efficient tracking of changes, management of different versions, and control over which revisions handle external traffic—ideal for A/B testing or gradual feature rollouts.

For example, you can update parameters such as environment variables, scaling settings, or container images using the Azure Container Apps update command.

![The image is an infographic about Azure Container Apps, focusing on revisions and secrets. It highlights three points: implementing app versioning, controlling active revisions and traffic, and using the AZ containerapp update command for modifications.](https://kodekloud.com/kk-media/image/upload/v1752866616/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-container-apps-infographic.jpg)

If an update includes a revision scope change, the system automatically generates a new revision.

> [!important]
> **Note**
>
> When planning updates, always consider the impact of generating new revisions on your operational workflow.

## Managing Secrets

Managing secrets is essential for protecting sensitive data such as API keys and connection strings. In Azure Container Apps, secrets are defined at the application level and are accessible by all app revisions. This centralized approach enhances security by ensuring that sensitive data is not hardcoded into the application or its configuration files.

When creating a Container App, you can define secrets using the `--secrets` parameter in the command line, ensuring that secrets are securely handled during deployment.

![The image explains how secrets are managed in Azure Container Apps, highlighting that secrets are defined at the application level, can be referenced by application revisions, and are set using the --secrets parameter.](https://kodekloud.com/kk-media/image/upload/v1752866618/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-container-apps-secrets-management.jpg)

## Configuring Revisions

To enable multiple revisions, first switch your app's revision mode to multi-revision mode. This mode allows you to manage several revisions simultaneously by assigning labels, controlling traffic distribution, and monitoring individual replicas.

For example, when using the Microsoft Azure portal, you might encounter an interface like this:

![The image shows the Microsoft Azure portal interface, specifically the "Revisions and replicas" section for a container app named "airportcodeaiapp," with an active revision that has a failed activation status.](https://kodekloud.com/kk-media/image/upload/v1752866619/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-revisions-airportcodeaiapp.jpg)

Notice that inspecting another app (e.g., one functioning properly) might display a single node. Converting an app to multi-revision mode allows you to perform actions such as configuring labels, directing traffic flows, and monitoring replicas. You can also deactivate and reactivate revisions—for instance, unchecking a revision deactivates it, while reactivating it returns it to service.

> [!important]
> **Additional Detail**
>
> Detailed inspection may reveal configuration differences, such as a target port set to 80 and a service mesh link port set to 8080.

## Updating Containers

When it comes to updating containers, you have two primary options: using the `kubectl update` command or the Azure CLI update command. Both methods offer various parameters that allow you to tailor your deployment. You can:

- Create a new revision
- Set a termination grace period
- Specify a new container image
- Configure scale sizes
- Add volumes
- Attach secret or service bindings

Consider this portal view for creating a new container app revision:

![The image shows a Microsoft Azure portal interface for creating and deploying a new container app revision. It includes fields for revision details and a list of container images with specifications like CPU cores and memory.](https://kodekloud.com/kk-media/image/upload/v1752866621/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-container-app-revision.jpg)

You can update a Container App using the following command:

```
az containerapp update [--args]
                       [--command]
                       [--container-name]
                       [--cpu]
                       [--ids]
                       [--image]
                       [--max-replicas]
                       [--memory]
                       [--min-replicas]
                       [--name]
                       [--no-wait]
                       [--remove-all-env-vars]
                       [--remove-env-vars]
                       [--replace-env-vars]
                       [--resource-group]
                       [--revision-suffix]
                       [--scale-rule-auth]
                       [--scale-rule-http-concurrency]
                       [--scale-rule-metadata]
                       [--scale-rule-name]
                       [--scale-rule-type]
                       [--secret-volume-mount]
                       [--set-env-vars]
                       [--subscription]
                       [--tags]
                       [--termination-grace-period]
                       [--workload-profile-name]
                       [--yaml]
```

For example, to update the container image, execute:

```
az containerapp update -n my-containerapp -g MyResourceGroup \
    --image myregistry.azurecr.io/my-app:v2.0
```

## Further Revision Customizations

When creating a new revision, you can further customize various aspects of your container app, including:

- Adding sidecar containers for extra processes
- Specifying a termination grace period
- Adjusting scaling options such as the minimum and maximum number of replicas

The Microsoft Azure portal provides an intuitive interface to configure these settings:

![The image shows a Microsoft Azure portal interface for creating and deploying a new container app revision. It includes options for adding app or init containers, with details like name, tag, CPU cores, and memory.](https://kodekloud.com/kk-media/image/upload/v1752866622/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-container-app-revision-2.jpg)

You can define autoscaling rules by specifying replica counts:

![The image shows a Microsoft Azure portal interface for creating and deploying a new revision of a container app, focusing on setting scale rules for automatic scaling. It includes fields for minimum and maximum replicas, with options to add scale rules.](https://kodekloud.com/kk-media/image/upload/v1752866623/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-container-app-scaling.jpg)

Additionally, you can configure persistent storage by mounting volumes from Azure File Storage:

![The image shows a Microsoft Azure portal interface for creating and deploying a new revision of a container app, specifically focusing on adding a volume. The "Add volume" panel is open, with options for volume type, name, and file share.](https://kodekloud.com/kk-media/image/upload/v1752866624/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-container-app-volume.jpg)

You can also securely mount secrets into your container and add service bindings for popular add-ons like Redis, MariaDB, PostgreSQL, or Kafka:

![The image shows a Microsoft Azure portal interface for creating and deploying a new revision of a container app, with a focus on adding a binding. A dropdown menu is open, displaying options for different add-on types like Redis, MariaDB, and PostgreSQL.](https://kodekloud.com/kk-media/image/upload/v1752866626/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-container-app-binding.jpg)

## Managing Traffic Distribution

After creating new revisions, you can manage external traffic distribution between them. For example, you might allocate 50% of the traffic to a new demo revision while keeping 50% on the current active revision. This gradual rollout approach allows continuous monitoring and quick rollback if issues arise.

![The image shows the Microsoft Azure portal displaying the "Revisions and replicas" section for a container app, with details about active revisions, their creation dates, running status, traffic, and replicas.](https://kodekloud.com/kk-media/image/upload/v1752866628/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Managing-Revisions-and-Secrets-in-Azure-Container-Apps/azure-portal-revisions-replicas-container-app.jpg)

## Creating and Managing Secrets Directly

In addition to defining secrets via command-line deployments, you can also create and manage secrets directly from the Azure portal. This interface allows you to add key/value pairs manually or link to a Key Vault, ensuring sensitive information is managed securely.

## Dapr Integration

Azure Container Apps can be integrated with Dapr, simplifying microservices development by enabling seamless inter-service communication. This integration enhances the overall architecture and accelerates application development.

With this comprehensive overview, you now understand how to manage revisions and secrets in Azure Container Apps. Whether you use the Azure CLI or the Microsoft Azure portal, these features provide a robust framework for deploying and managing containerized applications securely and efficiently.

## References

- [Azure Container Apps Documentation](https://docs.microsoft.com/azure/container-apps/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/8ecdad92-d6a0-4292-9798-efa24d97f567/lesson/605b9206-7cbb-4599-9bbc-8e68c7defe16)**
>
> Watch video content
