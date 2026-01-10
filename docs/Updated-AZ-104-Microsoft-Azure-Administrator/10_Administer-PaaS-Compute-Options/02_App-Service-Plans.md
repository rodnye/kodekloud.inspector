# App Service Plans - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-PaaS-Compute-Options/App-Service-Plans)

---

## Table of Contents

- App Service Plans
  - App Service Plan Tiers
  - Compute Options in App Service Plans
  - Scaling in Azure App Service Plans
  - Deploying an App Service Plan in the Azure Portal
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer PaaS Compute Options

# App Service Plans

In this article, we explore how App Service Plans work, compare them with deploying an application on a virtual machine (VM), and guide you on selecting the best option for your needs.

Deploying an application on a VM involves Microsoft providing the underlying storage, network, and compute resources. You start by creating a VM, selecting the desired operating system, and installing the required runtime (for example, Python for a Python application). In this setup, you are responsible for managing the operating system, runtime, and your application data.

In contrast, an App Service Plan abstracts much of the infrastructure management for you. The cloud provider manages the underlying resources (such as VMs and the operating system), while you choose the appropriate runtime—like ASP.NET Core or Python—and deploy your application along with its data. Essentially, an App Service Plan defines a collection of compute resources that power your App Service (or application).

Multiple applications can run on a single App Service Plan, similar to how different VM types—General Purpose, Memory Optimized, or CPU Optimized—serve different workloads. For example, you might host both ASP.NET Core and Python applications on a Linux App Service Plan.

There are scenarios where creating a new App Service Plan is advantageous:

- Deploying applications in separate regions (for instance, an existing plan in North Europe versus a new app in West Europe).
- Switching operating systems (e.g., moving from Linux to Windows).
- Meeting high-performance demands when your application requires more memory or processing power than your current plan supports.

> [!important]
> **Billing Notice**
>
> Even if no applications are deployed, you are billed for the App Service Plan. Unlike VMs, stopping the service does not stop billing, so choosing the right plan is critical for cost optimization.

![The image is a diagram of app service plans, showing components like data access, applications, runtime, and operating systems, with specific mentions of .NET Core, Python, and Linux App Service Plan. It also includes considerations like compute, performance tier, and hosting multiple apps.](https://kodekloud.com/kk-media/image/upload/v1752884736/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/app-service-plans-diagram-dotnet-python-linux.jpg)

## App Service Plan Tiers

Azure provides multiple tiers of App Service Plans to accommodate projects ranging from small experiments to large-scale enterprise applications. Each tier offers varying levels of performance, features, capacity, and pricing:

- **Free Tier:**  
  Ideal for learning and small-scale projects.  
  • 1 GB of disk space  
  • Up to 10 web apps, mobile apps, or APIs  
  • No autoscaling, deployment slots, or scale-out capability  
  • Limited to 60 minutes of runtime per day
- **Shared Tier:**  
  Similar to the Free tier, but runs on shared Azure VM infrastructure, making it suitable for small websites with modest traffic.  
  • Limited runtime of 240 minutes per day
- **Basic Tier:**  
  Provides increased storage (10 GB) and supports up to 3 instances; however, autoscaling is not available.
- **Standard Tier:**  
  Designed for business-grade applications.  
  • 50 GB of disk space  
  • Autoscaling support  
  • 5 deployment slots  
  • Scale-out capability up to 10 instances
- **Premium Tier:**  
  Meant for more demanding applications.  
  • 250 GB of disk space  
  • 20 deployment slots  
  • Autoscaling support  
  • Scale-out capability up to 30 instances
- **Isolated Tier:**  
  The highest level for applications that require secure network access and complete isolation.  
  • 1 TB of disk space  
  • Autoscaling support  
  • 20 deployment slots  
  • Scale-out capability up to 100 instances  
  • Virtual Network support (deployed as an App Service Environment)

![The image shows a comparison table of app service plans, detailing features like web apps, disk space, auto scale, deployment slots, and max instances across different tiers (Free, Shared, Basic, Standard, Premium, Isolated). It also describes the compute options: Shared, Dedicated, and Isolated.](https://kodekloud.com/kk-media/image/upload/v1752884738/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/app-service-plans-comparison-table.jpg)

Choosing the right tier depends on your application's requirements, anticipated traffic, and budget.

## Compute Options in App Service Plans

Azure App Service Plans cater to diverse compute needs with three primary compute options:

- **Shared Compute:**  
  Utilized by the Free and Shared tiers, where resources are shared with other customers.
- **Dedicated Compute:**  
  Available in the Basic through Premium tiers, this option allocates dedicated VMs to your applications, ensuring that resources are not shared with others.
- **Isolated Compute:**  
  Exclusive to the Isolated tier, VMs run within a dedicated Virtual Network, providing the highest level of isolation and scaling.

![The image shows a comparison of app service plans with different pricing tiers for Dev/Test, Production, and Isolated environments, highlighting features like memory and compute time. It also includes a note about scaling up by adding more CPU, memory, disk, and features.](https://kodekloud.com/kk-media/image/upload/v1752884739/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/app-service-plans-comparison.jpg)

## Scaling in Azure App Service Plans

Azure App Service Plans support two types of scaling to ensure your application can handle variable workloads effectively:

- **Scale Up (Vertical Scaling):**  
  Upgrade your service plan to a higher tier with enhanced CPU, RAM, or disk resources without increasing the number of instances. This is ideal for applications that require more power on a single server.
- **Scale Out (Horizontal Scaling):**  
  Increase the number of running instances to distribute the load across multiple servers. Autoscaling—available from the Standard tier onward—automatically adjusts instances based on metrics like CPU usage or request queues, while manual scaling is an option in the Basic tier.

![The image shows a user interface for configuring app service plans, with options for manual scaling and custom autoscaling. It includes a sidebar menu and a description of scaling methods.](https://kodekloud.com/kk-media/image/upload/v1752884740/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/app-service-plans-ui-scaling.jpg)

## Deploying an App Service Plan in the Azure Portal

Follow these steps to deploy an App Service Plan using the Azure Portal:

1.  In the Azure Portal, search for "App Service Plans."
2.  Click on "Create a new App Service Plan."
3.  Select your subscription and create a new resource group (for example, "RG apps 01").
4.  Name your plan (e.g., "ASP 01 App Service Plan 01").

![The image shows a Microsoft Azure portal page for creating an App Service Plan, with fields for project details, app service plan details, and pricing tier options.](https://kodekloud.com/kk-media/image/upload/v1752884741/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/azure-portal-app-service-plan.jpg)

5.  Choose the operating system (select Windows in this example) and click on "Explore Pricing Plans" to view available options. Two views will be presented:
    - A hardware view detailing the underlying infrastructure.
    - A feature view listing capabilities such as custom domains, autoscaling, backups, staging slots, and zone redundancy.

![The image shows a Microsoft Azure portal page displaying various App Service pricing plans, including details like custom domain, auto scale, daily backups, and costs per hour and month.](https://kodekloud.com/kk-media/image/upload/v1752884742/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/azure-portal-app-service-pricing.jpg)

6.  Select the Free tier (or another tier based on your requirements) and create the App Service Plan.

Once deployed, click "Go to resource" to view an overview of your App Service Plan. At this stage, you will notice that no apps or deployment slots are configured. (Deployment slots will be discussed later.) Auto scaling options are also visible; remember that the Free tier does not support autoscaling—upgrading to the Standard tier or above will unlock autoscaling features.

> [!important]
> **Isolated Plan Information**
>
> For the Isolated plan, note that it is deployed as an App Service Environment and requires native integration with a Virtual Network. During deployment, you must select a Virtual Network.

![The image shows an overview of an App Service plan in Microsoft Azure, displaying details like resource group, status, location, and performance metrics such as CPU and memory percentage.](https://kodekloud.com/kk-media/image/upload/v1752884744/notes-assets/images/Updated-AZ-104-Microsoft-Azure-Administrator-App-Service-Plans/azure-app-service-plan-overview.jpg)

With your App Service Plan up and running, you can now start deploying your applications. Later on, you may scale out or upgrade the plan to meet increased traffic or take advantage of advanced features.

Next, we will explore how to add applications to your App Service Plan.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/c1871647-c1ec-478a-beab-b21781cec58f/lesson/17b5b4de-3570-4b78-bfb3-a3fd79ab6883)**
>
> Watch video content
