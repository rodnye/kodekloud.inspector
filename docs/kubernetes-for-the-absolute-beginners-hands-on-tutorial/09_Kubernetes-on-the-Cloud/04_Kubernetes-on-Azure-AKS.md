# Kubernetes on Azure AKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Kubernetes-on-the-Cloud/Kubernetes-on-Azure-AKS)

---

## Table of Contents

- Kubernetes on Azure AKS
  - Accessing the Azure Dashboard
  - Creating Your Kubernetes Cluster
  - Connecting to Your Cluster with Azure Cloud Shell
  - Deploying the Voting Application
  - Testing Your Deployment
  - Clean Up
  - Watch Video
    - Configuring kubectl in Cloud Shell

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Kubernetes on the Cloud

# Kubernetes on Azure AKS

In this guide, you'll learn how to provision a Kubernetes cluster using Azure Kubernetes Service (AKS) on Microsoft Azure. This step-by-step tutorial is designed for beginners and includes detailed instructions to help you get started quickly.

> [!important]
> **Prerequisites**
>
> Before you begin, ensure you have an active [Azure account](https://azure.microsoft.com/free/). If you’re new to Azure, take advantage of the 12-month free access and familiarize yourself with basic Azure configurations.

![The image lists prerequisites for Azure, including an Azure account, active subscription, and Azure basics, with a link to Azure's free account FAQ.](https://kodekloud.com/kk-media/image/upload/v1752884932/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_20.jpg)

## Accessing the Azure Dashboard

Once logged into your Azure account, you will be greeted with a dashboard displaying various services. In this demonstration, we are using the free "KodeKloud free account." To find the Azure Kubernetes Service (AKS), either search for "AKS" or select it directly from the available services list.

![The image shows the Microsoft Azure portal homepage, displaying various services, recent resources, navigation options, tools, useful links, and mobile app download buttons.](https://kodekloud.com/kk-media/image/upload/v1752884934/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_40.jpg)

## Creating Your Kubernetes Cluster

Since no cluster exists yet, you'll need to add a new cluster. This will take you to the "Create Kubernetes cluster" screen. Make sure that the appropriate subscription is selected, especially if you are using a free-tier subscription.

1.  **Resource Group**: Create a new resource group. For demonstration purposes, name it "voting app resource group".
2.  **Cluster Name**: Choose an identifiable name such as "example voting app".
3.  **Kubernetes Version**: Leave the default version (e.g., 1.16).
4.  **Node Configuration**: Considering this is a free-tier demonstration, select one node for the node size and leave the remaining options at their default values.

Under **Authentication settings**, select the option to create a new service principal. This service principal allows AKS to manage associated cloud resources seamlessly.

![The image shows the "Create Kubernetes cluster" page on Microsoft Azure, focusing on authentication settings, including service principal, RBAC, and node pool OS disk encryption options.](https://kodekloud.com/kk-media/image/upload/v1752884935/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_110.jpg)

After verifying your configuration, click on **Review and create**. Once the **Create** button becomes available, click it to initiate the deployment. The process starts with provisioning your resource groups, followed by the creation of your Kubernetes cluster. Please be patient, as the full deployment might take some time.

Upon successful deployment, Azure will display a confirmation message.

![The image shows a Microsoft Azure portal indicating a successful deployment completion for a resource group named "votingapp-resourcegroup."](https://kodekloud.com/kk-media/image/upload/v1752884936/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_150.jpg)

## Connecting to Your Cluster with Azure Cloud Shell

To locate your newly created resources, enter "voting app" in the Azure search bar. You should see both the Kubernetes service and your cluster. Next, access your cluster using the Azure Cloud Shell, which appears at the bottom portion of the screen. If prompted, follow the steps to create storage for Cloud Shell.

While the Cloud Shell initializes, review these essential commands to connect to your AKS cluster:

```
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster

kubectl get nodes
```

```
# Expected Output
NAME                        STATUS   ROLES   AGE    VERSION
aks-agentpool-14693408-0    Ready    agent   15m    v1.11.5
```

Additionally, you might encounter a snippet in a Kubernetes configuration file like:

```
apiVersion: apps/v1
```

Scroll to the bottom of the documentation (if referenced) for further instructions on connecting to your cluster. The Azure Cloud Shell comes pre-installed with the kubectl client, so you can quickly grant access to your cluster.

![The image shows a Microsoft Azure documentation page about connecting to a Kubernetes cluster using the Azure portal, featuring a screenshot of the Azure interface.](https://kodekloud.com/kk-media/image/upload/v1752884937/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_210.jpg)

### Configuring kubectl in Cloud Shell

In the Cloud Shell window, execute the following command to configure kubectl. Replace "myResourceGroup" and "myAKSCluster" with your actual resource group and cluster names:

```
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster
```

After running the command, you will see messages similar to:

```
Your cloud drive has been created in:
Subscription ID: a9415065-9776-4bf1-9708-80832eb4365d
Resource group: cloud-shell-storage-eus
Storage account: cs21032002001aa74
File share: cs-vpalazhica-gmail-com-10032002001aa74

Initializing your account for Cloud Shell...
Requesting a Cloud Shell...Succeeded.
Connecting terminal...

Welcome to Azure Cloud Shell
Type "az" to use Azure CLI
Type "help" to learn about Cloud Shell

aed2c8b3-0ba6-4e8f-b3b3-630db5d6Azure:~$
```

After configuring, verify connectivity by running:

```
kubectl get nodes
```

For example, the output may appear as follows:

```
NAME                            STATUS   ROLES   AGE     VERSION
aks-agentpool-29238863-vms00000   Ready    agent   6m12s   v1.16.10
```

## Deploying the Voting Application

With your single-node cluster up and running, it’s time to deploy the voting application. Follow these steps:

1.  **Clone the Repository**: Clone the GitHub repository containing the application's YAML files.

    ```
    git clone https://github.com/kodekloudhub/example-voting-app.git
    cd example-voting-app/k8s-specifications/
    ```

2.  **Deploy the Application Components**: Execute the commands below in the order listed to deploy all necessary services and deployments:

    ```
    kubectl create -f voting-app-deploy.yaml
    kubectl create -f voting-app-service.yaml
    kubectl create -f redis-deploy.yaml
    kubectl create -f redis-service.yaml
    kubectl create -f postgres-deploy.yaml
    kubectl create -f postgres-service.yaml
    kubectl create -f result-app-deploy.yaml   # Deploys the result app if provided.
    ```

3.  **Verify Deployments**: Check the status of your deployments and services using:

    ```
    kubectl get deployments,svc
    ```

    A typical output might be:

    ```
    NAME                              READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/postgres-deploy   1/1     1            1           96s
    deployment.apps/redis-deploy      1/1     1            1           104s
    deployment.apps/result-app-deploy 1/1     1            1           83s
    deployment.apps/voting-app-deploy 1/1     1            1           112s
    deployment.apps/worker-app-deploy 1/1     1            1           88s

    NAME                     TYPE         CLUSTER-IP      EXTERNAL-IP      PORT(S)           AGE
    service/db               ClusterIP    10.0.43.213     <none>           5432/TCP          93s
    service/kubernetes       ClusterIP    10.0.0.1        <none>           443/TCP           11m
    service/redis            ClusterIP    10.0.180.53     <none>           6379/TCP          101s
    service/result-service   LoadBalancer 10.1.1.176      52.152.245.94    80:30219/TCP       79s
    service/voting-service   LoadBalancer 10.0.100.120    52.152.240.186   80:32245/TCP       109s
    ```

    > [!important]
    > **Load Balancer Notice**
    >
    > In some cases, the result app service may initially show a pending state while the load balancer is being provisioned. Give it a few minutes to complete this process.

## Testing Your Deployment

Once all deployments are confirmed (each showing one out of one pod ready) and the load balancers for both the voting and result services have been provisioned, you can test the applications:

- Open your browser in a new tab to access the voting application using the external IP provided for the "voting-service".
- Similarly, open another tab to access the results application using the external IP of the "result-service".

![The image shows a split screen with equal blue and teal sections, labeled "CATS 50.0%" and "DOGS 50.0%".](https://kodekloud.com/kk-media/image/upload/v1752884938/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Kubernetes-on-Azure-AKS/frame_370.jpg)

Vote on the application and watch the result update in real time. This confirms that the applications are functioning correctly.

## Clean Up

After finishing your demonstration and learning session, remember to delete the cluster and clean up your resources to prevent any unexpected charges.

That concludes this Kubernetes on Azure AKS tutorial. Happy learning, and see you in the next guide!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/2f291cbc-acc2-4250-b96c-2094daff556d/lesson/87c36f17-1717-4060-9d0a-a02377d17196)**
>
> Watch video content
