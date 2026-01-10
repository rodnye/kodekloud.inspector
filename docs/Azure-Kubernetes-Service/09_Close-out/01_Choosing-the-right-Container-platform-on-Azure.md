# Choosing the right Container platform on Azure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Close-out/Choosing-the-right-Container-platform-on-Azure)

---

## Table of Contents

- Choosing the right Container platform on Azure
  - Fully Managed Kubernetes and OpenShift
  - Serverless & Microservices-Focused Container Platforms
  - PaaS Web Hosting & Serverless Functions
  - Platform Comparison
  - How to Choose
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Close out

# Choosing the right Container platform on Azure

Containerized workloads power modern applications, but picking the optimal Azure service depends on your control requirements, orchestration needs, and architectural goals. This guide compares Azure’s container hosting options—from fully managed Kubernetes to serverless functions—so you can select the best fit.

## Fully Managed Kubernetes and OpenShift

When you need end-to-end control over orchestration, networking, scaling, and custom images:

- **Azure Kubernetes Service (AKS)**  
  A fully managed Kubernetes control plane. You’re responsible for node pools, networking, and add-ons; Azure handles the control plane. Supports both Linux and Windows containers.

  > [!important]
  > **Note**
  >
  > Windows container support in AKS requires a Windows node pool and additional [configuration steps](https://learn.microsoft.com/azure/aks/windows-container-cli).

- **Azure Red Hat OpenShift (ARO)**  
  A jointly managed OpenShift cluster with full API and CLI access, backed by enterprise support from Red Hat.
- **Kubernetes on Azure Virtual Machines**  
  Deploy upstream Kubernetes yourself on VMs for root-level host access. You manage upgrades, scaling, and high availability.

## Serverless & Microservices-Focused Container Platforms

If you want to focus on code instead of infrastructure:

- **Azure Container Apps**  
  Serverless hosting for microservices and event-driven workloads. Built on Kubernetes and [KEDA](https://keda.sh/), it automates scaling, ingress, and service discovery without exposing the Kubernetes control plane.
- **Azure Container Instances (ACI)**  
  Lightweight compute for individual containers with hypervisor isolation (Windows) or process isolation (Linux). Ideal for burst jobs, CI/CD pipelines, or virtual nodes in AKS. ACI is not a full orchestrator.

## PaaS Web Hosting & Serverless Functions

When your workload is a web app or event-driven function rather than a container cluster:

- **Azure App Service**  
  Fully managed platform for web apps, APIs, and mobile back ends. Includes built-in CI/CD, custom domains, SSL, and preconfigured base images.
- **Azure Functions**  
  Execute event-driven code in a serverless model. Deploy from code or containers, but you must use the Functions programming model and SDK or base image.

![The image is a diagram showing Azure container hosting options, divided into infrastructure management and serverless applications, with examples like Azure Kubernetes Service and Azure Functions. It categorizes containers as unopinionated or opinionated based on restrictions and programming models.](https://kodekloud.com/kk-media/image/upload/v1752869469/notes-assets/images/Azure-Kubernetes-Service-Choosing-the-right-Container-platform-on-Azure/azure-container-hosting-options-diagram.jpg)

## Platform Comparison

| Platform                        | Type                    | Use Case                                  | Control Level |
| ------------------------------- | ----------------------- | ----------------------------------------- | ------------- |
| Azure Kubernetes Service (AKS)  | Managed Kubernetes      | Production clusters, hybrid workloads     | High          |
| Azure Red Hat OpenShift (ARO)   | Managed OpenShift       | Enterprise OpenShift with Red Hat support | High          |
| Kubernetes on Azure VMs         | Self-managed Kubernetes | Custom infrastructure, special networking | Maximum       |
| Azure Container Apps            | Serverless Containers   | Microservices, event-driven scaling       | Medium        |
| Azure Container Instances (ACI) | Standalone Containers   | Burst jobs, CI/CD, lightweight tasks      | Low           |
| Azure App Service               | PaaS Web Apps           | Web apps, REST APIs, mobile back ends     | Low           |
| Azure Functions                 | Serverless Functions    | Event-driven code, short-lived workloads  | Low           |

## How to Choose

1.  **Full cluster control & customization**  
    AKS, ARO, or Kubernetes on VMs
2.  **Event-driven microservices without Kubernetes ops**  
    Azure Container Apps
3.  **Single-container workloads or burst scaling**  
    Azure Container Instances
4.  **Web apps or APIs without containers**  
    Azure App Service
5.  **Small units of serverless code**  
    Azure Functions

Review your application’s orchestration complexity, scaling requirements, and desired operational overhead to determine the best Azure container platform.

## Links and References

- [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/)
- [Azure Red Hat OpenShift (ARO)](https://learn.microsoft.com/azure/openshift/)
- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [Azure Container Instances (ACI)](https://learn.microsoft.com/azure/container-instances/)
- [Azure App Service](https://learn.microsoft.com/azure/app-service/)
- [Azure Functions](https://learn.microsoft.com/azure/azure-functions/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/ee946e5f-161f-4c37-acff-b9a805538288/lesson/52ebb1ee-01c4-4468-950f-4cea4ef6852d)**
>
> Watch video content
