# Restart Policies and Environmental Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Running-Container-Images-in-Azure-Container-Instances/Restart-Policies-and-Environmental-Variables)

---

## Table of Contents

- Restart Policies and Environmental Variables
  - Restart Policies in Azure Container Instances
  - Configuring Environment Variables via YAML
  - Passing Environment Variables via the CLI
  - Deploying a Container Instance with Registry Credentials in Azure Portal
  - Mounting Storage to Azure Container Instances
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Running Container Images in Azure Container Instances

# Restart Policies and Environmental Variables

Azure Container Instances (ACI) provide flexible configuration options through restart policies and environment variables. These features enable you to manage container lifecycles and dynamically adjust application settings without the need to rebuild container images.

---

## Restart Policies in Azure Container Instances

Restart policies control the behavior of a container once its task completes. There are three options available:

1.  **Always**  
    The container restarts automatically after completion. This option is ideal for processes that need to run continuously.
2.  **Never**  
    Once the container completes its task, it stops permanently. Use this policy for one-off tasks where no further execution is required.
3.  **On-Failure**  
    The container restarts only if its process fails. This policy ensures fault tolerance while preventing unnecessary restarts after successful executions.

![The image explains the restart policy settings for containerized tasks in Azure Container Instances, showing three options: "Always," "Never," and "On-Failure." Each option is represented with a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752866741/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Restart-Policies-and-Environmental-Variables/azure-container-instances-restart-policy.jpg)

Understanding these settings helps you manage container operations effectively and optimize resource usage.

---

## Configuring Environment Variables via YAML

You can pass configuration values such as connection strings and secrets to your containers using environment variables, eliminating the need to rebuild container images for configuration changes. This configuration is typically done by supplying a YAML file during container group creation.

Below is an example YAML file that creates a container group with a single container using the "Always" restart policy. In this example, an environment variable for an Azure Storage account connection string is set and marked as secure:

```
apiVersion: 2018-10-01
name: aci-web-app
location: eastus
type: Microsoft.ContainerInstance/containerGroups
properties:
  osType: Linux
  restartPolicy: Always
  containers:
    - name: nginx
      properties:
        image: nginx:latest
        resources:
          requests:
            cpu: 2.0
            memoryInGB: 2.0
        environmentVariables:
          - name: 'AzureStorageAccountConnectionString'
            secureValue: 'YOUR_CONNECTION_STRING'
```

> [!important]
> **Tip**
>
> You can define multiple containers in the 'containers' array, each configured with its own resource requests and environment variables.

---

## Passing Environment Variables via the CLI

If you prefer using the Azure CLI, you can set environment variables during container creation. This method is particularly useful for dynamically adjusting application logic without modifying the container image. For example, the following command creates a container with two environment variables (`NumWords` and `MinLength`):

```
az container create \
  --resource-group myResourceGroup \
  --name mycontainer2 \
  --image mcr.microsoft.com/azuredocs/aci-wordcount:latest \
  --restart-policy OnFailure \
  --environment-variables 'NumWords'='5' 'MinLength'='8'
```

This approach allows you to update key configuration parameters—such as URLs or application settings—at the time of deployment.

---

## Deploying a Container Instance with Registry Credentials in Azure Portal

You can also deploy container instances via the Azure portal using Cloud Shell. When using a private registry, providing the appropriate registry credentials is essential. The following command shows how to create a container instance with registry credentials, specify the port, and assign a public IP address:

```
az container create \
  --resource-group rg-az204-containers \
  --name aci-02 \
  --image acraz204kodekloud.azurecr.io/webapp:v1 \
  --registry-login-server acraz204kodekloud.azurecr.io \
  --registry-username acraz204kodekloud \
  --registry-password 'Mazs80JYjET0+Giu34oNe3LrjnrqWxSn860nQ+ACRCPDNYh' \
  --ports 8080 \
  --ip-address Public
```

After executing this command, verify the container's status in the Azure portal. Once the container is running, access the public IP on port 8080 in your browser to view your deployed application.

![The image shows the Microsoft Azure portal displaying details of a container instance named "aci-02," including its status, events, and timestamps related to its operation.](https://kodekloud.com/kk-media/image/upload/v1752866743/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Restart-Policies-and-Environmental-Variables/azure-portal-container-instance-aci-02.jpg)

---

## Mounting Storage to Azure Container Instances

In addition to environment variables, Azure Container Instances support storage mounting. The following command demonstrates how to create a container instance with environment variables; this pattern can be extended to include storage mounting configurations as needed:

```
az container create -g MyResourceGroup --name myapp --image myimage:latest --environment-variables key1=value1 key2=value2
```

This flexible approach enables efficient deployment and updates, ensuring that containerized applications are both scalable and easily configurable.

---

By leveraging restart policies and environment variables, you can manage container lifecycles dynamically and securely update configurations in Azure Container Instances. These techniques empower you to optimize resource utilization and adapt your containerized applications to evolving requirements.

> [!important]
> **Additional Resources**
>
> - [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
> - [Azure CLI Documentation](https://docs.microsoft.com/en-us/cli/azure/container)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/67965add-95a2-4ec5-9b09-251429678a13/lesson/4e3c1356-1cc3-4f2c-bdad-ebaf9f63192e)**
>
> Watch video content
