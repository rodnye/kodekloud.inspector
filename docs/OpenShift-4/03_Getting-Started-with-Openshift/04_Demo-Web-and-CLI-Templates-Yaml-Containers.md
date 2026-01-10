# Demo Web and CLI Templates Yaml Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Getting-Started-with-Openshift/Demo-Web-and-CLI-Templates-Yaml-Containers)

---

## Table of Contents

- Demo Web and CLI Templates Yaml Containers
  - Accessing the OpenShift Console
  - Cloud Options for OpenShift
  - Creating an Azure Red Hat OpenShift Cluster
  - Managing Resource Quotas
  - Accessing the OpenShift Cluster Console
  - Watch Video

---

## Content

OpenShift 4

Getting Started with Openshift

# Demo Web and CLI Templates Yaml Containers

In this article, we provide a step-by-step guide to installing a production-ready Kubernetes cluster using OpenShift. Although earlier documentation may reference CodeReady Containers, the current product name is OpenShift Local. This guide focuses on setting up a production cluster rather than a local development environment.

---

## Accessing the OpenShift Console

Begin by logging into [Red Hat’s Cloud Console](https://console.redhat.com) and navigating to the OpenShift section under "Manage Infrastructure." Here, you will find options such as Assisted Installer Clusters, Archives, and Register Cluster (if you have an existing OpenShift cluster). Click on **Create Cluster**.

For production environments, all options except the local installation are production-ready. If your subscription is active, your console may appear as follows:

![The image shows a Red Hat Hybrid Cloud Console interface for creating an OpenShift cluster, with options for active subscriptions and managed services. The sidebar includes navigation options like Clusters, Overview, and Subscriptions.](https://kodekloud.com/kk-media/image/upload/v1752882646/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/red-hat-hybrid-cloud-openshift-console.jpg)

If an OpenShift trial is in progress on your account, you might see a dedicated trial interface similar to managed services like ROSA, but it represents a trial version of OpenShift:

![The image shows a Red Hat Hybrid Cloud Console interface, displaying options for creating clusters using managed services on platforms like Microsoft Azure, IBM Cloud, and AWS. The sidebar includes navigation options such as Clusters, Overview, and Developer Sandbox.](https://kodekloud.com/kk-media/image/upload/v1752882648/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/red-hat-hybrid-cloud-console.jpg)

> [!important]
> **Warning**
>
> Even though the trial version appears free, you are still liable for paying for the cluster configuration and any related cloud services. Trials used for learning purposes should be deleted promptly to avoid unexpected charges.

---

## Cloud Options for OpenShift

Under the cloud category, you can choose from several deployment options:

- **OpenShift on Azure**
- **OpenShift on IBM Cloud**
- **OpenShift on AWS**
- **Self-managed installation on cloud instances or virtual machines**

These environments are preconfigured for automation. For example, the AWS option provides two deployment choices:

- **User Provisioned Infrastructure:** You manage the infrastructure.
- **Installer Provisioned Infrastructure:** Deployment is automated.

If you are already hosted on a cloud provider such as Azure or AWS, opting for a managed service can simplify operations. For instance, on Azure, you can take advantage of Azure Red Hat OpenShift as demonstrated below:

![The image shows a Microsoft Azure portal interface with a search for "OpenShift," displaying services, marketplace options, and documentation related to Azure Red Hat OpenShift.](https://kodekloud.com/kk-media/image/upload/v1752882649/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-portal-openshift-search.jpg)

Selecting the service leads you to create an Azure Red Hat OpenShift cluster—a fully managed solution:

![The image shows an Azure Red Hat OpenShift dashboard with no clusters displayed, suggesting to change filters or create a new cluster.](https://kodekloud.com/kk-media/image/upload/v1752882651/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-red-hat-openshift-dashboard.jpg)

For users desiring more control, installation on a cloud instance, virtual machine, or even on bare metal in a data center is also supported. However, most users choose the cloud-managed options for ease of use.

---

## Creating an Azure Red Hat OpenShift Cluster

Follow these steps to create your Azure Red Hat OpenShift cluster:

1.  **Initiate Cluster Creation:**  
    From the OpenShift service in Azure, click **Create Azure Red Hat OpenShift**.
2.  **Configure the Cluster:**
    - **Resource Group:** Select a resource group (for example, "CodeCloud").
    - **Region:** Choose your desired region (e.g., East US for New Jersey).
    - **Cluster Name & Domain:** Provide a suitable name such as "CodeCloud Test Cluster" for both fields.

    ![The image shows a Microsoft Azure interface for creating an Azure Red Hat OpenShift cluster. It includes fields for project and instance details, such as subscription, resource group, region, and VM sizes.](https://kodekloud.com/kk-media/image/upload/v1752882652/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-red-hat-openshift-cluster.jpg)

3.  **Select Machine Sizes:**  
    Configure the master (control plane) and worker nodes by selecting the appropriate virtual machine sizes. A typical configuration might include three to four worker nodes for high availability and two control plane nodes.

    ![The image shows a Microsoft Azure interface for selecting a virtual machine size, displaying options like VM size, type, vCPUs, RAM, and other specifications.](https://kodekloud.com/kk-media/image/upload/v1752882653/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-virtual-machine-size-selection.jpg)

4.  **Authentication Setup:**  
    To set up authentication, specify a service principal from Azure Active Directory (AAD):
    - Open a new tab to access Azure Active Directory.
    - Create an app registration (for example, "CodeCloud OpenShift") using default settings for a single tenant.
    - Copy the Client ID from the app registration.

    ![The image shows a Microsoft Azure portal interface displaying details of an application named "kodekloudopenshift," including its IDs and configuration options. The sidebar includes navigation options like Overview, Quickstart, and Integration Assistant.](https://kodekloud.com/kk-media/image/upload/v1752882654/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-portal-kodekloudopenshift-interface.jpg)
    - Next, generate a new client secret in the app registration and save its value.

    ![The image shows a Microsoft Azure portal interface for managing certificates and secrets for an application named "kodekloudopenshift." It displays details about client secrets, including a description, expiration date, and secret ID.](https://kodekloud.com/kk-media/image/upload/v1752882656/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-portal-kodekloudopenshift-certificates.jpg)

5.  **Red Hat Pull Secret:**  
    Retrieve your OpenShift pull secret from [Red Hat’s Console](https://console.redhat.com) at the following path:  
    console.redhat.com/OpenShift/install/Azure/ARO-provisioned  
    Paste the pull secret into the Azure configuration.

    ![The image shows a webpage for Azure Red Hat OpenShift, focusing on downloading or copying a pull secret for cluster access. It includes navigation options on the left and a notification about connecting to the OpenShift Cluster Manager.](https://kodekloud.com/kk-media/image/upload/v1752882657/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-red-hat-openshift-pull-secret.jpg)

6.  **Network Configuration:**  
    Setup networking by creating two subnets—one for the master (control plane) and one for the worker nodes.
    - **API Server Visibility:** Choose between a public API server accessible via a public IP or a private one. A public API is acceptable if your RBAC permissions are secure.
    - **Ingress Visibility:** Select public if external access to front-end applications is required, or private for internal access.

7.  **Tags and Review:**  
    Add relevant tags (for instance, "cluster OpenShift") and click **Review + Create**.

    If you encounter a validation error regarding the object ID, revisit your app registration to modify API permissions:
    - Click **Add a permission**
    - Select **Azure Service Management**
    - Ensure the required permission for user impersonation is checked.

    ![The image shows a Microsoft Azure interface for creating an Azure Red Hat OpenShift cluster, with a "Review + create" tab displaying terms and basic configuration details. A "Validation Passed" message is highlighted in green.](https://kodekloud.com/kk-media/image/upload/v1752882658/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-red-hat-openshift-cluster-2.jpg)

8.  **Create the Cluster:**  
    Click **Create**. The cluster creation process may take some time; feel free to take a break while you wait.

---

## Managing Resource Quotas

The installation requires a total of 36 virtual CPU cores. If your current Azure account lacks this quota, follow these steps:

1.  Navigate to **Help and Support** and select **Create a support request**.
2.  Describe your issue and choose **Service and Subscription Limits, Quotas**.
3.  For the quota type, select **Compute VM Cores vCPUs**.
4.  Click **Manage Quota** to adjust the limit for the standard DSv3 family in your selected region.

![The image shows a Microsoft Azure dashboard for a resource named "kodekloudtest" under Azure Red Hat OpenShift, displaying details like resource group, location, subscription, and OpenShift console information.](https://kodekloud.com/kk-media/image/upload/v1752882659/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-dashboard-kodekloudtest-openshift.jpg)

![The image shows a Microsoft Azure interface for creating a new support request, with a dropdown menu listing various issue types such as Azure Healthcare APIs and Azure Lab Services.](https://kodekloud.com/kk-media/image/upload/v1752882660/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/azure-support-request-interface.jpg)

---

## Accessing the OpenShift Cluster Console

After the cluster is created, click **OpenShift** to access the cluster console. You will need to use the default credentials, which you can retrieve using the command below:

```
az aro list-credentials \
  --name kodekldoutest \
  --resource-group Kodecloud
```

The command output will resemble:

```
{
  "kubeadminPassword": "TGDMM-Q85fj-4X2wx-kKNaK",
  "kubeadminUsername": "kubeadmin"
}
```

Copy the password and log in using the username "kubeadmin." Once logged in, you will be presented with the OpenShift dashboard:

![The image shows a Red Hat OpenShift dashboard with an overview of cluster details, status, and activity. It includes sections for getting started resources, admin features, and cluster utilization metrics.](https://kodekloud.com/kk-media/image/upload/v1752882662/notes-assets/images/OpenShift-4-Demo-Web-and-CLI-Templates-Yaml-Containers/red-hat-openshift-dashboard-overview.jpg)

You have now successfully set up a production-ready OpenShift cluster.

---

This guide has taken you through the comprehensive process of provisioning an OpenShift cluster on Azure Red Hat OpenShift, covering important aspects such as authentication, networking, and resource quota configuration. Enjoy managing your production Kubernetes environment!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/7ba3dd10-68d9-414d-b26b-8e9109a4a3d3/lesson/8c198969-616b-4a85-8335-5d9bc1cacf6c)**
>
> Watch video content
