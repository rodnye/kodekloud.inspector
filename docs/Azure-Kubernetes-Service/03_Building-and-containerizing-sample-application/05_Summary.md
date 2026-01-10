# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/Building-and-containerizing-sample-application/Summary)

---

## Table of Contents

- Summary
  - Environment Comparison
  - Links and References
  - Watch Video

---

## Content

Azure Kubernetes Service

Building and containerizing sample application

# Summary

In this lesson, you’ve successfully:

- Scaffolded and built a C# ASP.NET Core web application
- Wrote a Dockerfile to containerize the app
- Ran and tested the image locally on Docker

You’re now ready to take the next step: deploy your container image to Azure Kubernetes Service (AKS) for a production-grade, highly available environment.

> [!important]
> **Next Steps**
>
> Before deploying to AKS, ensure you have the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed and are logged into your Azure subscription:
>
> ```
> az login
> az account set --subscription "<your-subscription-id>"
> ```

## Environment Comparison

| Environment                    | Deployment Tool               | Use Case                     |
| ------------------------------ | ----------------------------- | ---------------------------- |
| Local Docker                   | `docker build` / `docker run` | Development and testing      |
| Azure Kubernetes Service (AKS) | `az aks` / `kubectl`          | Production-grade scalability |

## Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Azure Kubernetes Service (AKS) Overview](https://learn.microsoft.com/azure/aks/)
- [ASP.NET Core Documentation](https://learn.microsoft.com/aspnet/core/)
- [Azure CLI Reference](https://learn.microsoft.com/cli/azure/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/20789863-851c-44c5-a251-8cb7f78f60b5/lesson/6f0b1375-ac16-43ba-b707-85e951de48ba)**
>
> Watch video content
