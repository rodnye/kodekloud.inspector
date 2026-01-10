# Deploying Virtual Machine Scale Sets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Azure-Virtual-Machines/Deploying-Virtual-Machine-Scale-Sets)

---

## Table of Contents

- Deploying Virtual Machine Scale Sets
  - Scaling in Azure
  - Overview of Virtual Machine Scale Sets
  - Deploying a Virtual Machine Scale Set via the Azure Portal
  - Verifying the Deployment and Testing Autoscaling
  - Conclusion
  - Watch Video
    - Connecting to an Instance for Stress Testing
    - Installing and Running Stress on the Instance

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Azure Virtual Machines

# Deploying Virtual Machine Scale Sets

In this guide, we explore how to deploy Virtual Machine Scale Sets (VMSS) in Azure and understand how scaling works in the cloud. You'll learn the differences between vertical and horizontal scaling and see how VMSS leverages horizontal scaling to manage a group of load-balanced VMs.

## Scaling in Azure

Azure supports two primary scaling strategies:

• Vertical scaling involves adjusting the capacity of an individual resource. For example, you might upgrade a virtual machine (VM) to a more powerful configuration (scale up) or downgrade it (scale down). Note that vertical scaling is subject to the maximum instance sizes available (hypothetically 96 vCPUs and 96 GB of RAM) and may require downtime during resizing.

• Horizontal scaling means adding or removing instances rather than modifying individual resource capacity. Adding instances is known as scale out, while removing instances is called scale in.

![The image illustrates the concept of deploying VM scale sets, showing vertical and horizontal scaling, with a diagram of server instances scaling out and in.](https://kodekloud.com/kk-media/image/upload/v1752884443/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/vm-scale-sets-deployment-diagram.jpg)

VM Scale Sets in Azure use horizontal scaling to distribute the load across a group of VMs automatically.

## Overview of Virtual Machine Scale Sets

Azure Virtual Machine Scale Sets (VMSS) enable you to create and manage a group of load-balanced VMs with identical configurations or, with recent updates, mixed OS images. VMSS supports scaling based on schedules, performance metrics, or on-demand requirements. Additionally, by distributing instances across availability zones, VMSS ensures high availability.

Key details about VMSS:

- Up to 1,000 instances can be deployed using marketplace or custom images.
- The limit is 600 instances when deploying with a managed image.

![The image is a screenshot of a user interface for deploying VM scale sets in Azure, highlighting features like dynamic instance adjustment and shared configuration. It includes project and scale set details such as subscription, resource group, and region.](https://kodekloud.com/kk-media/image/upload/v1752884443/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-vm-scale-sets-ui-screenshot.jpg)

![The image shows a guide for deploying VM scale sets in Azure, highlighting features like distribution across zones, high availability, and access via other VMs. It includes a form for creating a virtual machine scale set with options for subscription, resource group, and region.](https://kodekloud.com/kk-media/image/upload/v1752884444/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-vm-scale-sets-guide.jpg)

## Deploying a Virtual Machine Scale Set via the Azure Portal

Deploying a VMSS resembles deploying a single VM, with additional scaling-specific options. Follow these steps:

1.  In the Azure portal, search for "VMSS" or "Virtual Machine Scale Set" and select it.

    ![The image shows the Microsoft Azure portal with a search bar where "vms" is typed, displaying a dropdown list of related services and resources. The background lists various Azure resources with their names and types.](https://kodekloud.com/kk-media/image/upload/v1752884445/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-vms-search-dropdown.jpg)

2.  Click on the option to create a new Virtual Machine Scale Set. For instance, you might choose a resource group named "RGHA" and name your scale set "VMSS HA01". When configuring, select the availability zones to ensure that instances are spread across different zones.
3.  Choose an orchestration mode based on your needs:
    - Select **Flexible** if you need to run varied VM types or mix configurations.
    - Select **Uniform** if you prefer all instances to be identical.

    In this example, we choose **Uniform** and select a Standard VM image.

4.  Set your admin credentials and configure network options. You can also configure settings related to scaling. For load balancing, you may opt for the Azure Load Balancer or Application Gateway. In our demonstration, we choose not to use either option.

![The image shows a Microsoft Azure portal page for creating a virtual machine scale set. It includes options for availability zones, orchestration mode, security type, and instance details like image and size.](https://kodekloud.com/kk-media/image/upload/v1752884447/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-scale-set.jpg)

5.  Configure the scaling settings:
    - Set the initial number of instances.
    - Define the scaling policy by specifying the minimum and maximum instance counts.
    - Configure thresholds; for example, add one instance (scale out) if CPU utilization exceeds 75% for 10 minutes, or remove one instance (scale in) if it drops to 25% after a cooldown period.

    ![The image shows a Microsoft Azure portal page for creating a virtual machine scale set, with options for configuring scaling policies and instance counts. A pop-up in the top right corner prompts to update a saved password in Microsoft Edge.](https://kodekloud.com/kk-media/image/upload/v1752884448/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-scale-set-3.jpg)

6.  On the Management tab, review the default settings for health monitoring and additional options. In the Advanced tab, you can enable the option to scale beyond 100 instances and enforce an even distribution of instances across availability zones.

    ![The image shows a Microsoft Azure portal page for creating a virtual machine scale set, specifically on the "Advanced" tab, with options for allocation policy and extensions.](https://kodekloud.com/kk-media/image/upload/v1752884450/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-scale-set-advanced.jpg)

7.  Finally, click **Review and Create** to deploy your scale set.

![The image is a screenshot of a guide for deploying VM scale sets in Azure, showing project details and instance limits for marketplace and managed images.](https://kodekloud.com/kk-media/image/upload/v1752884451/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-vm-scale-sets-deployment-guide.jpg)

## Verifying the Deployment and Testing Autoscaling

After deployment, navigate to the VMSS resource page and verify the running instances. Depending on your configuration, you might initially see one or two instances. The activity log can also provide details about scaling operations, such as scaling down from two instances to one.

![The image shows a Microsoft Azure portal interface displaying a virtual machine scale set instance named "vmss-ha-01" with one running instance. The status and other details of the instance are visible, such as computer name, protection policy, and provisioning state.](https://kodekloud.com/kk-media/image/upload/v1752884452/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-vmss-ha-01-instance.jpg)

![The image shows the activity log of a virtual machine scale set in Microsoft Azure, displaying various operations with their status, time, and initiator details.](https://kodekloud.com/kk-media/image/upload/v1752884453/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-virtual-machine-scale-set-log.jpg)

### Connecting to an Instance for Stress Testing

Since scale set instances do not receive public IP addresses by default, a jumpbox—a VM within the same virtual network that has a public IP—is required to connect to them.

1.  Identify a jumpbox VM from the list of connected devices within your virtual network.

    ![The image shows a Microsoft Azure portal interface displaying connected devices within a virtual network, listing a network interface and a scale set instance with their respective IP addresses and subnet information.](https://kodekloud.com/kk-media/image/upload/v1752884454/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-virtual-network-devices.jpg)

2.  Connect to the jumpbox VM via SSH using its public IP address. For example, in your terminal:

    ```
    ssh kodekloud@20.124.250.11
    ```

    After entering the password and being authenticated, use this jumpbox to connect to your scale set instance. Identify the internal IP of the scale set instance (e.g., 10.0.0.6) and connect via SSH or Bastion.

    ![The image shows a Microsoft Azure portal interface displaying details of a virtual machine scale set instance, including options for connecting via SSH, RDP, or Bastion, and monitoring CPU usage.](https://kodekloud.com/kk-media/image/upload/v1752884455/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-virtual-machine-scale-set-5.jpg)

### Installing and Running Stress on the Instance

Once connected to your scale set instance, update the package list and install the stress testing tool:

```
sudo apt update
sudo apt install stress -y
```

Below is an example of the installation process:

```
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following NEW packages will be installed:
  stress
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 18.4 kB of archives.
After this operation, 55.3 kB of additional disk space will be used.
Fetched 18.4 kB in 0s (533 kB/s)
Selecting previously unselected package stress.
(Reading database ... 58930 files and directories currently installed.)
Preparing to unpack .../stress_1.0.4-6_amd64.deb ...
Unpacking stress (1.0.4-6) ...
Setting up stress (1.0.4-6) ...
Processing triggers for install-info (6.7.0.dfsg.2-5) ...
Processing triggers for man-db (2.9.1-1) ...
```

Before running tests, refer to the manual page of the stress tool:

```
man stress
```

A common usage example is:

```
stress -c 2 -t 600 -v
```

In this command:

- `-c 2` spawns two CPU stress workers.
- `-t 600` sets the test duration to 600 seconds.
- `-v` enables verbose output.

To monitor the impact on CPU usage, open another terminal session (via the jumpbox) and run:

```
htop
```

You should observe CPU usage rising significantly, nearing 100% due to the stress test.

![The image shows a Microsoft Azure portal interface displaying CPU usage metrics for a virtual machine scale set instance over the past hour. The graph indicates a fluctuation in CPU usage, with a notable increase towards the end.](https://kodekloud.com/kk-media/image/upload/v1752884456/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-cpu-usage-graph.jpg)

As the CPU usage climbs, the autoscale policy initiates the creation of additional instances. Monitor these scaling activities in the activity log:

![The image shows a Microsoft Azure portal interface with an activity log for a virtual machine scale set, indicating that an autoscale operation was initiated to increase the instance count from 1 to 2.](https://kodekloud.com/kk-media/image/upload/v1752884457/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-Deploying-Virtual-Machine-Scale-Sets/azure-portal-activity-log-autoscale.jpg)

If the load remains high, additional instances will be added until the maximum limit defined during configuration (e.g., 10 instances) is reached.

## Conclusion

In this article, you learned how to deploy and configure Virtual Machine Scale Sets in Azure. By leveraging VMSS with a load balancer, your application can automatically scale based on CPU utilization thresholds, ensuring resources are dynamically allocated to meet demand.

> [!important]
> **Note**
>
> Autoscaling is a powerful feature of Azure that helps maintain performance and availability under varying load conditions. Always monitor the resource usage and adjust your scaling rules as needed.

This concludes our deep dive into administering virtual machine scale sets. For more insights on Azure solutions, please refer to the [Azure Documentation](https://docs.microsoft.com/azure/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/34d9af06-fc33-4556-a3f2-2e7a5c5db484/lesson/2f383198-f908-4af5-b7a7-f6b00e60ed69)**
>
> Watch video content
