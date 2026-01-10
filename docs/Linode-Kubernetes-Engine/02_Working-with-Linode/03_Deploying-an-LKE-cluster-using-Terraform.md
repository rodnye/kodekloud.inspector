# Deploying an LKE cluster using Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Working-with-Linode/Deploying-an-LKE-cluster-using-Terraform)

---

## Table of Contents

- Deploying an LKE cluster using Terraform
  - Prerequisites
  - 1. Terraform Configuration
  - 2. Deploying the Cluster
  - 3. Monitoring Provisioning
  - 4. Explore the Code on GitHub
  - References
  - Watch Video
    - 1.1 Required Provider
    - 1.2 Provider & Variables
    - 1.3 LKE Cluster Resource
    - 1.4 Output Kubernetes Configuration

---

## Content

Linode : Kubernetes Engine

Working with Linode

# Deploying an LKE cluster using Terraform

Learn how to automate the provisioning of a Linode Kubernetes Engine (LKE) cluster using Terraform. By defining your infrastructure as code, you gain repeatable, version-controlled deployments.

## Prerequisites

- Terraform v1.0+ installed
- A valid Linode API token
- `kubectl` installed and configured

> [!important]
> **Note**
>
> Store your Linode API token securely. We recommend using environment variables (`TF_VAR_token`) or a protected `.tfvars` file instead of hard-coding credentials.

---

## 1\. Terraform Configuration

### 1.1 Required Provider

Specify the Linode provider and lock its version:

```
terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.27.1"
    }
  }
  required_version = ">= 1.0"
}
```

### 1.2 Provider & Variables

Configure the provider to use your API token:

```
provider "linode" {
  token = var.token
}


variable "token" {
  description = "Linode API token"
  type        = string
  sensitive   = true
}
```

### 1.3 LKE Cluster Resource

Create an LKE cluster named **my-cluster** in `us-central`, using Kubernetes v1.23 and a three-node pool:

```
resource "linode_lke_cluster" "my_cluster" {
  label       = "my-cluster"
  k8s_version = "1.23"
  region      = "us-central"
  tags        = ["prod"]


  pool {
    type  = "g6-standard-2"
    count = 3


    # To enable auto-scaling, uncomment the block below:
    # autoscaler {
    #   min = 3
    #   max = 10
    # }
  }
}
```

> [!important]
> **Warning**
>
> If you enable the `autoscaler`, ensure your account has sufficient quota for scaling nodes.

### 1.4 Output Kubernetes Configuration

Expose the generated kubeconfig for use with `kubectl`:

```
output "kubeconfig" {
  value     = linode_lke_cluster.my_cluster.kubeconfig
  sensitive = true
}
```

---

## 2\. Deploying the Cluster

Initialize, plan, and apply your configuration:

| Command                         | Description                       |
| ------------------------------- | --------------------------------- |
| `terraform init`                | Download provider plugins         |
| `terraform plan`                | Preview changes                   |
| `terraform apply -auto-approve` | Provision resources automatically |

```
cd Linode
terraform init
terraform plan
terraform apply -auto-approve
```

Expected output:

```
Plan: 1 to add, 0 to change, 0 to destroy.


Changes to Outputs:
  + kubeconfig = (sensitive value)
```

---

## 3\. Monitoring Provisioning

You can track cluster creation progress in the Linode Cloud Manager. Provisioning typically takes 5–15 minutes.

![The image shows a Kubernetes cluster management interface with details about a cluster named "my-cluster," including its version, location, resources, and node pool status. It also displays options for managing nodes and accessing the Kubernetes API endpoint.](https://kodekloud.com/kk-media/image/upload/v1752881208/notes-assets/images/Linode-Kubernetes-Engine-Deploying-an-LKE-cluster-using-Terraform/kubernetes-cluster-management-interface.jpg)

Once the status reads **Running**, your LKE cluster is ready for workloads.

---

## 4\. Explore the Code on GitHub

View the full Terraform configuration in the [`Linode`](https://github.com/linode/kubernetes-quickstart-environments/tree/main/Linode) folder of the Kubernetes-Quickstart-Environments repo.

![The image shows a GitHub repository page titled "Kubernetes-Quickstart-Environments," featuring folders and files related to Kubernetes setup, with a README section and language usage statistics.](https://kodekloud.com/kk-media/image/upload/v1752881209/notes-assets/images/Linode-Kubernetes-Engine-Deploying-an-LKE-cluster-using-Terraform/kubernetes-quickstart-repo-overview.jpg)

Clone the repo to discover additional examples and automate your Kubernetes infrastructure on Linode:

```
git clone https://github.com/linode/kubernetes-quickstart-environments.git
cd kubernetes-quickstart-environments/Linode
```

---

## References

- [Linode Kubernetes Engine (LKE)](https://www.linode.com/products/kubernetes/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [kubectl Overview](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Linode Cloud Manager](https://cloud.linode.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/9702fbe2-4321-41c5-87e8-8ea364da097d/lesson/4c048e60-bf77-44a5-b614-9f0545b9a712)**
>
> Watch video content
