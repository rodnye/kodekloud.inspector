# Deploying our sample application to AKS Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Working-with-AKS/Deploying-our-sample-application-to-AKS-Cluster)

---

## Table of Contents

- Deploying our sample application to AKS Cluster
  - 1. Connecting to Your AKS Cluster
  - 2. Inspecting the Cluster State
  - 3. Deploying the Sample Application
  - 4. Exposing the Deployment via Load Balancer
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Working with AKS

# Deploying our sample application to AKS Cluster

After provisioning your AKS cluster (including the resource group, virtual network, and other prerequisites), the next step is to connect via Azure CLI and deploy a Dockerized sample application. This guide will walk you through each step—from authentication to exposing your service—using PowerShell examples that apply equally to macOS and Linux terminals.

> [!important]
> **Note**
>
> All Azure CLI commands shown here work in [Azure Cloud Shell](https://shell.azure.com), Windows PowerShell, macOS, and Linux terminals. Replace any Windows-specific paths or syntax as needed on other platforms.

## 1\. Connecting to Your AKS Cluster

You can authenticate and configure `kubectl` in multiple environments:

| Connection Method | Platform      | Pre-installed Tools                    |
| ----------------- | ------------- | -------------------------------------- |
| Azure Cloud Shell | Web Browser   | kubectl, Azure CLI, PowerShell modules |
| Local PowerShell  | Windows       | kubectl, Azure CLI                     |
| Terminal          | macOS / Linux | kubectl, Azure CLI                     |

1.  **Log in to Azure CLI**

    ```
    PS C:\Users\msadmin> az login
    ```

2.  **Verify your active subscription**

    ```
    PS C:\Users\msadmin> az account show
    {
      "environmentName": "AzureCloud",
      "homeTenantId": "...",
      "id": "36b0e8a-2743-4be7-891c-1e2b3a83ad1b",
      "isDefault": true,
      "name": "Sub_global",
      "state": "Enabled",
      "tenantId": "...",
      "user": {
        "name": "pranav@cloudandedge.com.au",
        "type": "user"
      }
    }
    ```

3.  **Set a default resource group**

    ```
    PS C:\Users\msadmin> az configure --defaults group=RG1-KodeKloud-AKS
    ```

4.  **Download and merge AKS credentials**

    ```
    PS C:\Users\msadmin> az aks get-credentials --name AKS1-KodeKloudApp
    Merged "AKS1-KodeKloudApp" as current context in C:\Users\msadmin\.kube\config
    ```

5.  **Confirm the current Kubernetes context**

    ```
    PS C:\Users\msadmin> kubectl config current-context
    AKS1-KodeKloudApp
    ```

## 2\. Inspecting the Cluster State

Before deploying, it’s good practice to confirm that your cluster has no existing workloads:

| Command                   | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `kubectl get nodes`       | List all nodes and their status         |
| `kubectl get deployments` | Show existing deployments in default ns |
| `kubectl get pods`        | Display running pods in default ns      |

```
PS C:\Users\msadmin> kubectl get nodes
NAME                              STATUS   ROLES   AGE   VERSION
aks-agentpool-18097611-vmss000000 Ready    agent   45m   v1.24.10


PS C:\Users\msadmin> kubectl get deployments
No resources found in default namespace.


PS C:\Users\msadmin> kubectl get pods
No resources found in default namespace.
```

As expected, there are no deployments or pods at this point.

## 3\. Deploying the Sample Application

We previously built and pushed the Docker image `hpranav/kodekloudappcs:v1` to [Docker Hub](https://hub.docker.com/). Deploy it to AKS with a single replica:

```
PS C:\Users\msadmin> kubectl create deployment kodekloudapp `
   --image=hpranav/kodekloudappcs:v1 `
   --replicas=1
deployment.apps/kodekloudapp created
```

Verify that the deployment and pod are running:

```
PS C:\Users\msadmin> kubectl get deployments
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
kodekloudapp    1/1     1            1           2m


PS C:\Users\msadmin> kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
kodekloudapp-67ff275c85-mm42w     1/1     Running   0          2m
```

You can also view the pod status in the [Azure portal](https://portal.azure.com) under your AKS resource.

## 4\. Exposing the Deployment via Load Balancer

To allow external access, create a Service of type `LoadBalancer`. Azure will provision a cloud load balancer and assign a public IP:

```
PS C:\Users\msadmin> kubectl expose deployment kodekloudapp `
   --type=LoadBalancer `
   --port=80 `
   --target-port=80
service/kodekloudapp exposed
```

Retrieve the service details and public IP:

```
PS C:\Users\msadmin> kubectl get service kodekloudapp
NAME            TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
kodekloudapp    LoadBalancer   10.0.152.169   20.50.123.456   80:30541/TCP   1m
```

> [!important]
> **Warning**
>
> Replace `20.50.123.456` with your actual `EXTERNAL-IP`. It can take a minute for Azure to provision the public IP.

Open your browser to `http://20.50.123.456` to verify that the sample application is running on your AKS cluster.

## Links and References

- [Azure Kubernetes Service (AKS) Overview](https://learn.microsoft.com/azure/aks/overview)
- [Azure CLI Documentation](https://learn.microsoft.com/cli/azure)
- [Docker Hub](https://hub.docker.com/)
- [kubectl Cheat Sheet](https://learn.microsoft.com/cli/azure/kubectl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/2e4891fe-2f53-4239-9ab9-8b15ba4c6369/lesson/09a7667f-db3f-43f3-941e-df4b622c87c1)**
>
> Watch video content
