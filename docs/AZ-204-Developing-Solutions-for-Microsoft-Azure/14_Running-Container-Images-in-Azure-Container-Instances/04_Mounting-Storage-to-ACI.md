# Mounting Storage to ACI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Running-Container-Images-in-Azure-Container-Instances/Mounting-Storage-to-ACI)

---

## Table of Contents

- Mounting Storage to ACI
  - Understanding the Need for Persistent Storage
  - Mounting Volumes for Persistent Storage
  - Deploying Multiple Volumes Using Deployment Templates
  - Configuring Storage in the Azure Portal
  - Creating the YAML Deployment File
  - Deploying the Container Instance
  - Verifying the Mount
  - Conclusion
  - Watch Video
    - Key Considerations for Azure File Shares

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Running Container Images in Azure Container Instances

# Mounting Storage to ACI

In this lesson, you will learn how to mount external storage to Azure Container Instances (ACI) for persistent data storage. By the end, you’ll understand how to configure an Azure File Share and use deployment templates to safeguard your container data.

---

## Understanding the Need for Persistent Storage

Azure Container Instances are stateless by default. This means that any data generated within a container will be lost once the container stops or crashes. To overcome this challenge, mounting an external volume—such as an Azure File Share—ensures that your application data persists beyond the container's lifecycle.

![The image provides an overview of mounting an Azure File Share in Azure Container Instances, highlighting that containers are stateless by default and require external storage to persist data.](https://kodekloud.com/kk-media/image/upload/v1752866733/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-file-share-container-instances.jpg)

---

## Mounting Volumes for Persistent Storage

By mounting a volume from an Azure File Share into your container, you can ensure that your data remains safe even if the container stops or encounters an issue.

### Key Considerations for Azure File Shares

- **Linux Containers Only:** Azure File Share mounting is supported exclusively on Linux containers.
- **Root Permissions Required:** The container must run as root in order to set the correct file permissions needed for the File Share.
- **CIFS Protocol:** The Common Internet File System (CIFS) protocol is used for sharing files over the network.

![The image outlines limitations of mounting an Azure File Share in Azure Container Instances, highlighting that it can only be mounted to Linux containers, requires root access, and is limited to CIFS support.](https://kodekloud.com/kk-media/image/upload/v1752866735/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-file-share-limitations-linux-containers.jpg)

---

## Deploying Multiple Volumes Using Deployment Templates

When you need to deploy multiple volumes, you can utilize Azure Resource Manager (ARM) templates or YAML files. These deployment templates enable you to define shared configurations and list multiple volumes for mounting in your container environment, making it easier to manage complex storage scenarios.

![The image provides instructions on mounting multiple volumes in Azure Container Instances using an Azure Resource Manager template or a YAML file. It includes two sections with icons and text explaining the process.](https://kodekloud.com/kk-media/image/upload/v1752866737/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-container-instances-mount-volumes.jpg)

> [!important]
> **Note**
>
> Using deployment templates not only streamlines the process but also ensures consistent configuration across your deployments.

---

## Configuring Storage in the Azure Portal

Follow these steps to configure your storage in the Azure Portal:

1.  **Check or Create a Storage Account:**  
    Navigate to your storage accounts. If one isn’t available, create a new storage account.
2.  **Create a File Share:**  
    In your storage account, select "File Shares" and then create a new file share (for example, "ACI mount").

    ![The image shows the Microsoft Azure portal with a focus on container instances, displaying a search bar and a dropdown menu with recent services and resources. Two container instances, "aci-01" and "aci-02," are listed with their statuses and details.](https://kodekloud.com/kk-media/image/upload/v1752866738/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-portal-container-instances.jpg)

3.  **Deploy Using YAML:**  
    Open your Cloud Shell to deploy your container instance using a YAML file.

    ![The image shows a Microsoft Azure portal interface for creating a new file share, displaying details such as file share name, access tier, protocol, and backup settings.](https://kodekloud.com/kk-media/image/upload/v1752866739/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-portal-file-share-creation.jpg)

---

## Creating the YAML Deployment File

Create a file named `ACI.yaml` in Cloud Shell with the following content:

```
cpu: 1.0
memoryInGB: 1.5
volumeMounts:
  - mountPath: /aci/logs/
    name: filesharevolume
osType: Linux
restartPolicy: Always
ipAddress:
  type: Public
  ports:
    - port: 80
      dnsNameLabel: aci-demo-unique
volumes:
  - name: filesharevolume
    azureFile:
      shareName: acimount
      storageAccountName: <StorageAccountName>
      storageAccountKey: <StorageAccountKey>
tags: {}
```

> [!important]
> **Configuration Tip**
>
> Replace `<StorageAccountName>` with your actual storage account name and `<StorageAccountKey>` with the key available in the Access Keys section within your storage account. Ensure that the DNS name label (`aci-demo-unique` in this example) is unique to avoid conflicts.

If you encounter an error similar to the example below, update the DNS label accordingly:

```
az container create -g rg-az204-containers --file aci.yaml
(DnsNameLabelAlreadyTaken) The DNS name label 'aci-demo' in container group 'file-share-demo' is not available. Try using a different label.
```

---

## Deploying the Container Instance

With the YAML file prepared, deploy the container by running the command:

```
az container create -g rg-az204-containers --file aci.yaml
```

Monitor the deployment in the Azure Portal under Container Instances. When the deployment state changes from "Pending" to "Succeeded," your container is up and running. An example JSON output looks like this:

```
{
    "type": "Public",
    "osType": "Linux",
    "provisioningState": "Succeeded",
    "restartPolicy": "Always",
    "volumes": [
        {
            "azureFile": {
                "shareName": "acimount",
                "storageAccountName": "az204st8890"
            },
            "name": "filesharevolume"
        }
    ]
}
```

---

## Verifying the Mount

After deploying the container instance, follow these steps to verify that the Azure File Share is correctly mounted:

1.  **Access the Container Terminal:**  
    In the Azure Portal, go to your running container instance and click on "Connect" to open the terminal.
2.  **Verify the Mount Point:**  
    Change to the mounted directory and list its contents with the following commands:

    ```
    cd /aci/logs/
    ls
    ```

3.  **Create a Test File:**  
    Ensure that the volume is writable by adding a test file:

    ```
    echo "Hello World" > sample.txt
    ```

4.  **Cross-Check via the Storage Account:**  
    Return to your storage account, navigate to the "ACI mount" file share, and ensure that the file `sample.txt` exists with the correct content.

    ![The image shows a Microsoft Azure portal interface displaying details of a container instance named "file-share-demo," including its status, resource group, and performance metrics like CPU and memory usage.](https://kodekloud.com/kk-media/image/upload/v1752866740/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Mounting-Storage-to-ACI/azure-portal-container-instance-file-share-demo.jpg)

---

## Conclusion

In this lesson, you learned how to mount an Azure File Share to Azure Container Instances. By leveraging deployment templates and the Azure Portal, you can ensure that your container data remains persistent even in a stateless environment. For further details on Azure Container Instances and storage configuration, explore the official [Azure Documentation](https://docs.microsoft.com/en-us/azure/container-instances/).

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/67965add-95a2-4ec5-9b09-251429678a13/lesson/f196c01e-00a2-4daf-ae98-a29b60d10623)**
>
> Watch video content
