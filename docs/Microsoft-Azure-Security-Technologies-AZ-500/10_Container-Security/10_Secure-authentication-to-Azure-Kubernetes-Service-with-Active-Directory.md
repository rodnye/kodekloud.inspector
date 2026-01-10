# Secure authentication to Azure Kubernetes Service with Active Directory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Container-Security/Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory)

---

## Table of Contents

- Secure authentication to Azure Kubernetes Service with Active Directory
  - AKS Authentication and Authorization
  - AKS Network Security
  - Authenticating to AKS with Azure Active Directory
  - Creating an AKS Cluster with Integrated Azure AD
  - Connecting to the AKS Cluster
  - Integrating with Azure Container Registry (ACR) and Deploying an Application
  - Container and Key Vault Security
  - Conclusion
  - Watch Video
    - Step 1: Cluster Configuration
    - Step 2: Node Pools
    - Step 3: Networking
    - Step 4: Additional Integrations
    - Reviewing ACR Role Assignments
    - Creating a Deployment with a Load Balancer
    - Scaling and Managing the Deployment

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Container Security

# Secure authentication to Azure Kubernetes Service with Active Directory

In this guide, we explore Azure Kubernetes Service (AKS) security features with a focus on secure authentication, authorization, and network security. We'll discuss how AKS integrates with Azure Active Directory (Azure AD) and how to configure robust network settings to keep your clusters safe.

The security aspects covered in this guide include:

1.  Authentication and Authorization
2.  Network Security

---

## AKS Authentication and Authorization

AKS offers seamless integration with Azure Active Directory (Azure AD), empowering users and applications to authenticate securely. This integration enhances security by combining Azure Role-Based Access Control (RBAC) with Kubernetes native RBAC, allowing you to enforce granular access policies.

Key features include:

- **Azure AD Integration:** Leverages Azure’s robust identity management.
- **Azure RBAC and Kubernetes RBAC:** Define fine-grained access controls.
- **Managed Identities:** Utilize service principals or managed identities so your applications can securely access other Azure resources.
- **Pod-Managed Identities:** Assign specific identities to pods for enhanced permission control.

> [!important]
> **Note**
>
> For improved security, consider using pod-managed identities to limit access permissions on a per-pod basis.

---

## AKS Network Security

Protecting network traffic is critical for your cluster’s integrity. AKS supports private clusters, enabling the API server to have a private IP address that reduces exposure to external threats. Here are the key components:

- **Private API Server:** Limits public access by assigning a private IP.
- **Network Security Groups (NSGs) and Firewalls:** Tightly manage traffic flow.
- **Kubernetes Network Policies:** Define specific ingress and egress rules between pods.
- **Azure Key Vault Integration:** Securely store sensitive data such as connection strings.

The combination of Azure AD, managed identities, and NSGs/Network Policies provides a comprehensive security posture for your AKS deployment.

---

## Authenticating to AKS with Azure Active Directory

When authenticating to your AKS cluster, both Azure RBAC and Kubernetes RBAC are available. Upon interaction (for example, using the `kubectl` command to create a pod), you'll be prompted to enter your Azure AD credentials. Once authenticated, a token is issued to authorize the requested action.

The process is as follows:

1.  A user requests an operation via the API server.
2.  The user is prompted for Azure AD credentials.
3.  Azure AD validates the credentials and issues a token.
4.  The token authorizes the operation via the configured RBAC policies.

This method ensures secure and controlled access to your Kubernetes cluster.

---

## Creating an AKS Cluster with Integrated Azure AD

Follow these steps to deploy an AKS cluster with Azure AD integration using the Azure portal:

### Step 1: Cluster Configuration

Configure your cluster with the following details:

- **Resource Group:** Create a new group (e.g., _app AKS-01_).
- **Cluster Name:** Example: _app AKS cluster_.
- **Region:** Select your preferred region (e.g., East US) and distribute nodes for high availability.
- **Pricing Tier and Version:** For demo purposes, select the free control plane with version 1.26.6.
- **Authentication and Authorization:** Choose "Azure AD with Azure RBAC" for enhanced security.

![The image shows a Microsoft Azure portal interface for creating a Kubernetes cluster, with options for project and cluster details such as subscription, resource group, and region.](https://kodekloud.com/kk-media/image/upload/v1752881758/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-portal-kubernetes-cluster.jpg)

### Step 2: Node Pools

Configure your node pools as follows:

- **OS Type:** Choose Linux by default.
- **Zone Distribution and Size:** Distribute nodes across zones and choose a cost-effective size (e.g., B2S).
- **Scaling:** Enable autoscaling with a default pool of five nodes.

![The image shows a Microsoft Azure interface for updating a Kubernetes node pool, with options for node pool name, mode, OS type, availability zones, node size, and scaling method.](https://kodekloud.com/kk-media/image/upload/v1752881759/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-kubernetes-node-pool-update.jpg)

### Step 3: Networking

For networking, configure these settings:

- **Private Cluster:** Optionally enable a private API server.
- **Authorized IP Ranges:** Limit public access where applicable.
- **Network Configuration:** Choose Azure CNI and select a network policy. For demonstration purposes, opting for "none" simplifies setup (in production, consider Calico or the native Azure solution).

![The image shows a Microsoft Azure portal interface for creating a Kubernetes cluster, specifically on the "Integrations" tab, with options for Microsoft Defender for Cloud, Azure Container Registry, and Azure Monitor.](https://kodekloud.com/kk-media/image/upload/v1752881760/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-portal-kubernetes-integrations.jpg)

### Step 4: Additional Integrations

Additional integrations include:

- **Container Registry:** Connect to your existing Azure Container Registry (ACR).
- **Monitoring and Defender for Cloud:** Enable integrations as required.
- **Infrastructure Resource Group:** AKS will create a managed resource group to host supporting resources, such as virtual machine scale sets.

Finally, review your settings and click "Review and Create." Once validation passes, create your cluster.

![The image shows a Microsoft Azure portal page for creating a Kubernetes cluster, detailing settings for node pools, access, networking, and integrations. The validation has passed, and options like Azure AD authentication and network configuration are highlighted.](https://kodekloud.com/kk-media/image/upload/v1752881761/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-portal-kubernetes-cluster-settings.jpg)

---

## Connecting to the AKS Cluster

After deploying your cluster, access the resource page and select "Go to Resource" to view cluster details. To connect:

- Use the Cloud Shell (with kubectl pre-installed) or install kubectl locally.
- Run the following commands to integrate your local configuration with the new cluster:

```
az aks get-credentials -n app-aks-cluster -g app-aks-01
az aks show -n app-aks-cluster -g app-aks-01 --query "aadProfile"
```

The output confirms Azure AD integration:

```
ritin [ ~ ]$ az aks get-credentials -n app-aks-cluster -g app-aks-01
Merged "app-aks-cluster" as current context in "/home/ritin/.kube/config"
ritin [ ~ ]$ az aks show -n app-aks-cluster -g app-aks-01 --query "aadProfile"
{
  "adminGroupObjectIDs": null,
  "adminUsers": null,
  "clientAppId": null,
  "enableAzureRbac": true,
  "managed": true,
  "serverAppId": null,
  "serverAppSecret": null,
  "tenantId": "1e0fa212-37dc-45f5-bb0f-b60687cacc64"
}
```

When retrieving nodes, you will be prompted to sign in via a web browser:

```
ritin [ ~ ]$ kubectl get nodes
To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code AJSM4G937 to authenticate.
```

Follow the instructions at [https://aka.ms/devicelogin](https://aka.ms/devicelogin) to complete the authentication process. After that, your kubectl commands will proceed seamlessly.

---

## Integrating with Azure Container Registry (ACR) and Deploying an Application

Now that your cluster is running, let's deploy an application using an image from an Azure Container Registry (ACR).

### Reviewing ACR Role Assignments

In the Azure portal, navigate to your Container Registry and check the Access Control (IAM) settings. Ensure the AKS cluster's managed identity has the ACR Pull role assigned.

![The image shows the Microsoft Azure portal, specifically the Access Control (IAM) section for a container registry, displaying a list of role assignments and permissions.](https://kodekloud.com/kk-media/image/upload/v1752881763/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-portal-access-control-iam.jpg)

### Creating a Deployment with a Load Balancer

Below is a sample YAML configuration to deploy an application (named "bootstrap") from your ACR:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bootstrap-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: bootstrap
  template:
    metadata:
      labels:
        app: bootstrap
    spec:
      containers:
        - name: bootstrap
          image: acr56652.azurecr.io/bootstrap:v1
---
apiVersion: v1
kind: Service
metadata:
  name: bootstrap-service
spec:
  selector:
    app: bootstrap
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

Save the configuration to a file (e.g., `deploy.yml`) using the Cloud Shell editor:

```
rithin [ ~ ]$ code deploy.yml
```

Deploy the configuration with:

```
kubectl apply -f deploy.yml
```

Expected output:

```
deployment.apps/bootstrap-deployment created
service/bootstrap-service created
```

Retrieve the public IP address of your service:

```
kubectl get svc bootstrap-service
```

Open the IP address in your browser to verify the application is running.

![The image shows a Microsoft Azure portal page indicating that a deployment is complete, with options for next steps such as creating a Kubernetes deployment and connecting to a cluster.](https://kodekloud.com/kk-media/image/upload/v1752881764/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Secure-authentication-to-Azure-Kubernetes-Service-with-Active-Directory/azure-portal-deployment-complete.jpg)

### Scaling and Managing the Deployment

To scale the deployment, edit the number of replicas. For instance, to increase replicas to five:

```
kubectl edit deployment bootstrap-deployment
```

Modify the `replicas` value to `5`, save your changes, and then run:

```
kubectl get pods
```

You should see five pods running. You can also delete individual pods to observe Kubernetes' self-healing capability:

```
kubectl delete pod <pod-name>
```

A sample output may look like:

```
rithin [ ~ ]$ kubectl get pods
NAME                                        READY   STATUS    RESTARTS   AGE
bootstrap-deployment-6b5f8fd69-jh5r6         0/1     Running   0          6s
bootstrap-deployment-6b5f8fd69-zdndw         1/1     Running   0          2m32s
```

This demonstrates Kubernetes' dynamic scaling and self-recovery features.

---

## Container and Key Vault Security

AKS not only secures container orchestration but also integrates with Azure Key Vault to safeguard sensitive information such as secrets and connection strings.

Integrations include:

- **Defender for Cloud:** Provides advanced threat protection.
- **Azure Key Vault:** Stores sensitive data securely. Your application can authenticate to Azure AD, retrieve an access token, and fetch secrets such as SQL connection strings from Key Vault.

> [!important]
> **Security Best Practices**
>
> It is highly recommended to pair your container deployments with Azure Key Vault to manage secrets securely and minimize the risk of exposing sensitive information.

Example of managing pods with improved security:

```
rithin [ ~ ]$ kubectl delete pod bootstrap-deployment-6b5ff8df69-ss22m
pod "bootstrap-deployment-6b5ff8df69-ss22m" deleted
rithin [ ~ ]$ kubectl get pods
NAME                                         READY   STATUS    RESTARTS   AGE
bootstrap-deployment-6b5ff8df69-ss22m         0/1     Completed 0          6s
bootstrap-deployment-6b5ff8df69-zdndw         1/1     Running   0          2m32s
```

Follow similar procedures to update deployments and manage pods while keeping security configurations intact.

---

## Conclusion

This guide has demonstrated how to secure your AKS cluster by integrating Azure Active Directory with Azure RBAC and Kubernetes RBAC. We covered configuring private clusters, managing network traffic via NSGs and network policies, and integrating with Azure Container Registry and Azure Key Vault.

By employing these security measures—system-assigned managed identities, encrypted data at rest, and strict network policies—you can ensure your AKS cluster is robustly protected. In upcoming modules, we will delve deeper into using Azure Key Vault for even tighter security on your applications.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/146650b0-63f9-4c4b-b452-716a780e5fc7/lesson/dea33873-2064-4190-bd54-34d31014ffc6)**
>
> Watch video content
