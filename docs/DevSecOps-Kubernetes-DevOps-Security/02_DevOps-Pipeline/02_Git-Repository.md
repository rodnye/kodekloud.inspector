# Git Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Git-Repository)

---

## Table of Contents

- Git Repository
  - Repository Structure
  - 1. Fork or Import the Repository
  - 2. Clone the Repository Locally
  - 3. Explore VM Templates
  - Links and References
  - Watch Video
    - 2.1 Using GitHub Desktop
    - 2.2 Using the Command Line

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Git Repository

In this guide, you’ll access the GitHub repository that houses:

- A Spring Boot microservice
- VM configuration templates for Azure and GCP
- Automated setup scripts for software installation

Follow these steps to fork or import the repo, then clone it to your local machine or a VM.

## Repository Structure

| Directory/File  | Description                                         | Path           |
| --------------- | --------------------------------------------------- | -------------- |
| Spring Boot app | Java source code and `pom.xml` for Maven build      | `/`            |
| setup/azure     | ARM templates and scripts for provisioning on Azure | `/setup/azure` |
| setup/gcp       | Deployment Manager files for GCP VM configuration   | `/setup/gcp`   |
| scripts         | Shell scripts for software installation and setup   | `/scripts`     |

> [!important]
> **Note**
>
> Use the `setup` templates to standardize VM provisioning across Azure and GCP, ensuring consistent security policies.

## 1\. Fork or Import the Repository

The upstream repository is named `kubernetes-devops-security`. Forking creates a personal copy under your account:

1.  Navigate to the original repo:  
    `https://github.com/<original-username>/kubernetes-devops-security`
2.  Click **Fork** (top-right corner) to duplicate under your account.

Alternatively, import it as a new repository:

1.  On GitHub, go to **Your repositories > Import repository**.
2.  Paste the source URL:

    ```
    https://github.com/<original-username>/kubernetes-devops-security.git
    ```

3.  Name your repo, e.g., `devsecops-k8s-demo`.
4.  Click **Begin import** and wait for completion.

> [!important]
> **Warning**
>
> Ensure you have a GitHub account and proper permissions to fork or import repositories.

## 2\. Clone the Repository Locally

After forking or importing, clone to your development environment. First, verify Git is installed:

```
git --version
```

### 2.1 Using GitHub Desktop

1.  Open **GitHub Desktop**.
2.  Select **File > Clone Repository**.
3.  Under the **URL** tab, enter:

    ```
    https://github.com/<your-username>/devsecops-k8s-demo.git
    ```

4.  Choose a local folder and click **Clone**.

### 2.2 Using the Command Line

```
git clone https://github.com/<your-username>/devsecops-k8s-demo.git
cd devsecops-k8s-demo
```

## 3\. Explore VM Templates

Review and customize the VM provisioning templates:

- Azure: `setup/azure/`
- GCP: `setup/gcp/`

Integrate with [Azure Resource Manager](https://docs.microsoft.com/azure/azure-resource-manager/templates/) and [Google Cloud Deployment Manager](https://cloud.google.com/deployment-manager).

## Links and References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/)
- [GCP Deployment Manager](https://cloud.google.com/deployment-manager/docs)
- [GitHub Fork a Repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Git CLI Documentation](https://git-scm.com/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/e3585b26-9eae-4a27-8595-9712f56db013)**
>
> Watch video content
