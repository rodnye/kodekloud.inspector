# Demo Templates with Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Templates/Demo-Templates-with-Infrastructure)

---

## Table of Contents

- Demo Templates with Infrastructure
  - Architecture and Team Workflow
  - Backstage UI: Creating “Node.JS App on EC2”
  - Resulting Entities in Backstage
  - Repository Overviews
  - The nodejs-ec2-template.yaml Definition
  - End-to-End Demo
  - Links and References
  - Watch Video
  - Practice Lab
    - backstage-express-api-blueprint
    - infrastructure-iac (Core Terraform)
    - ec2-infra-blueprint (Terraform Module Skeleton)

---

## Content

Certified Backstage Associate (CBA)

Templates

# Demo Templates with Infrastructure

In this guide, you’ll learn how to build a Backstage scaffolder template that generates a Node.js/Express boilerplate and provisions an AWS EC2 instance via Terraform. We’ll cover:

- Team workflows and repository breakdown
- Terraform configurations for shared infrastructure and EC2 module
- The `nodejs-ec2-template.yaml` scaffolder definition
- Live demo: creating a new service from the Backstage UI

---

## Architecture and Team Workflow

Below are the three repositories involved in this workflow:

| Repository                      | Maintainer             | Purpose                                          |
| ------------------------------- | ---------------------- | ------------------------------------------------ |
| infrastructure-iac              | Infra Team             | Core Terraform (VPCs, subnets, security groups)  |
| ec2-infra-blueprint             | Infra + Platform Teams | Terraform module skeleton to create a single EC2 |
| backstage-express-api-blueprint | Platform Team          | Node.js/Express API boilerplate for Backstage    |

Developers invoke the template in Backstage, enter project details and EC2 size, and Backstage will:

1.  Fetch and customize the EC2 module, publish to GitHub, and register it as a Resource
2.  Fetch the Express API blueprint, publish to GitHub, and register it as a Component

![The image illustrates a workflow involving an infrastructure team, platform team, and developer, with a form for project details and connections to a GitHub repository and YAML templates.](https://kodekloud.com/kk-media/image/upload/v1752870226/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/infrastructure-platform-developer-workflow.jpg)

---

## Backstage UI: Creating “Node.JS App on EC2”

1.  Open your Backstage catalog and select **Node.JS App on EC2**
2.  Fill in **Project Name**, **Owner**, and **GitHub Repo Location**
3.  Choose an **EC2 Instance Type** (`t2.micro`, `t2.small`, or `t2.medium`)
4.  Click **Create** to trigger scaffolding

![The image shows a web interface for creating a new software component, specifically a Node.js app on EC2, with fields for entering project information like name and owner.](https://kodekloud.com/kk-media/image/upload/v1752870227/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-software-component-interface.jpg)

![The image shows a web interface for creating a new software component, specifically a Node.js app on EC2, with options to choose a repository location on GitHub.](https://kodekloud.com/kk-media/image/upload/v1752870229/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-software-component-interface-2.jpg)

![The image shows a web interface for creating a new software component, specifically a Node.js app on EC2, with a dropdown menu for selecting an instance type.](https://kodekloud.com/kk-media/image/upload/v1752870230/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-software-component-interface-3.jpg)

![The image shows a web interface for creating a new software component, specifically a Node.js app on EC2, with project information such as name, owner, repository location, and instance type.](https://kodekloud.com/kk-media/image/upload/v1752870231/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-software-component-interface-4.jpg)

After clicking **Create**, you’ll see progress for both infrastructure and application scaffolding:

![The image shows a progress screen for running a "nodejs-ec2-template" task, with steps like fetching infrastructure, publishing, and registering, all marked as completed. There are options to view the repository and open the catalog.](https://kodekloud.com/kk-media/image/upload/v1752870232/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-template-progress-screen.jpg)

---

## Resulting Entities in Backstage

Once scaffolding completes, Backstage will display:

- A **Component** (e.g., `user-service`)
- A **Resource** (e.g., `user-service-ec2`)
- A dependency relationship linking the Component to its EC2 Resource

![The image shows a dashboard interface for a "user-service" component, displaying details like owner, lifecycle, and system relations. It includes sections for overview, CI/CD, API, dependencies, and documentation, with a graph illustrating relationships.](https://kodekloud.com/kk-media/image/upload/v1752870233/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/user-service-dashboard-interface-overview.jpg)

![The image shows a dashboard interface for a resource named "user-service-ec2," detailing its description, owner, and system type, along with a relations graph illustrating dependencies and ownership.](https://kodekloud.com/kk-media/image/upload/v1752870235/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/user-service-ec2-dashboard-interface.jpg)

---

## Repository Overviews

### backstage-express-api-blueprint

A Node.js/Express API skeleton with `catalog-info.yaml` and starter code.

![This image shows a GitHub repository page named "backstage-express-api-blueprint" with a list of files and folders, including `.github/workflows`, `src`, and `tests`. The repository is public and primarily uses JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870236/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/github-repo-backstage-express-api.jpg)

### infrastructure-iac (Core Terraform)

Defines shared VPC, subnets, and other organization-wide resources.

```
terraform {
  required_version = ">= 1.2.0"
}


required_providers {
  aws = {
    source  = "hashicorp/aws"
    version = "~> 4.16"
  }
}


provider "aws" {
  region = "us-east-1"
}


data "terraform_remote_state" "core" {
  backend = "remote"
  config = {
    organization = "sanjeevkt720"
    workspaces   = { name = "infrastructure-iac" }
  }
}


resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  # ...
}
```

> [!important]
> **Note**
>
> Ensure your Terraform Cloud workspace `infrastructure-iac` is configured and accessible to your service account.

### ec2-infra-blueprint (Terraform Module Skeleton)

Provisions a single EC2 instance using shared infra outputs.

```
terraform {
  required_version = ">= 1.2.0"
}


required_providers {
  aws = {
    source  = "hashicorp/aws"
    version = "~> 4.16"
  }
}


provider "aws" {
  region = "us-east-1"
}


data "terraform_remote_state" "core" {
  backend = "remote"
  config = {
    organization = "sanjeevkt720"
    workspaces   = { name = "infrastructure-iac" }
  }
}


module "my_ec2" {
  source        = "app.terraform.io/sanjeevkt720/ec2-infra/aws"
  version       = "1.0.0"
  name          = var.name
  instance_type = var.instance_type
  subnet        = data.terraform_remote_state.core.outputs.subnet3_id
}
```

`variables.tf`:

```
variable "name" {
  type        = string
  description = "Name of the EC2 instance"
}


variable "instance_type" {
  type        = string
  description = "EC2 instance type (e.g., t2.micro)"
}
```

`resource.yaml`:

```
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: "${{ values.name }}-ec2"
  description: EC2 instance for "${{ values.name }}"
spec:
  type: compute
  owner: infra
```

---

## The `nodejs-ec2-template.yaml` Definition

This scaffolder template fetches both blueprints, applies your inputs, publishes to GitHub, and registers entities in Backstage.

```
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: nodejs-ec2-template
  title: Node.JS App on EC2
  description: Generate a Node.js API and provision an EC2 instance via Terraform
spec:
  owner: user:guest
  type: service


  parameters:
    - title: Project Info
      required: [name, owner]
      properties:
        name:
          title: Name
          type: string
          description: Unique component name
          ui:
            autofocus: true
        owner:
          title: Owner
          type: string
          description: Owning team or user
          ui:
            field: OwnerPicker
            options:
              catalogFilter: [{ kind: [User, Group] }]


    - title: Repository Location
      required: [repoUrl]
      properties:
        repoUrl:
          title: Repo URL
          type: string
          ui:
            field: RepoUrlPicker
            options:
              allowedHosts: ["github.com"]


    - title: EC2 Deployment
      properties:
        instanceType:
          title: Instance Type
          type: string
          description: EC2 size for the service
          default: "t2.micro"
          enum: ["t2.micro", "t2.small", "t2.medium"]


  steps:
    - id: fetch-infra
      name: Fetch EC2 Infra Blueprint
      action: fetch:template
      input:
        url: https://github.com/Sanjeev-Thiyagarajan/ec2-infra-blueprint
      targetPath: ./infra
      values:
        name: ${{ parameters.name }}
        instance_type: ${{ parameters.instanceType }}


    - id: publish-infra
      name: Publish Infra to GitHub
      action: publish:github
      input:
        sourcePath: ./infra
        allowedHosts: ["github.com"]
        repoUrl: ${{ parameters.repoUrl }}-infra
        description: Infra for ${{ parameters.name }}


    - id: register-infra
      name: Register EC2 Resource
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish-infra.output.repoContentsUrl }}
        catalogInfoPath: /resource.yaml


    - id: fetch-app
      name: Fetch Express API Blueprint
      action: fetch:template
      input:
        url: https://github.com/Sanjeev-Thiyagarajan/backstage-express-api-blueprint
      targetPath: ./code
      values:
        name: ${{ parameters.name }}
        owner: ${{ parameters.owner }}


    - id: publish-app
      name: Publish App to GitHub
      action: publish:github
      input:
        sourcePath: ./code
        allowedHosts: ["github.com"]
        repoUrl: ${{ parameters.repoUrl }}
        description: App code for ${{ parameters.name }}


    - id: register-app
      name: Register App Component
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish-app.output.repoContentsUrl }}
        catalogInfoPath: /catalog-info.yaml


  output:
    links:
      - title: Infra Repository
        url: ${{ steps.publish-infra.output.remoteUrl }}
      - title: App Repository
        url: ${{ steps.publish-app.output.remoteUrl }}
      - title: Open App in Catalog
        icon: catalog
        entityRef: ${{ steps.register-app.output.entityRef }}
      - title: Open Infra in Catalog
        icon: catalog
        entityRef: ${{ steps.register-infra.output.entityRef }}
```

---

## End-to-End Demo

Use the template in Backstage to create a service:

- **Name**: `file-manager-service`
- **Owner**: `group:default/dev`
- **Repo URL**: `github.com/you/file-manager-service`
- **Instance Type**: `t2.micro`

![The image shows a web interface for creating a new software component, specifically a Node.js app on EC2, with options to set the repository location on GitHub.](https://kodekloud.com/kk-media/image/upload/v1752870237/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-software-component-interface-5.jpg)

All steps complete successfully:

![The image shows a progress screen for a task titled "Run of nodejs-ec2-template," with several completed steps such as fetching infrastructure and publishing the app. There are options to view the repository or open the catalog.](https://kodekloud.com/kk-media/image/upload/v1752870238/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/nodejs-ec2-template-progress-screen-2.jpg)

Two GitHub repositories are created:

- **file-manager-service** (application code)
- **file-manager-service-infra** (Terraform code)

```
# file-manager-service-infra/main.tf
module "my_ec2" {
  source        = "app.terraform.io/sanjeevkt720/ec2-infra/aws"
  version       = "1.0.0"
  name          = "file-manager-service"
  instance_type = "t2.micro"
  subnet        = data.terraform_remote_state.core.outputs.subnet3_id
}
```

```
# file-manager-service-infra/resource.yaml
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: "file-manager-service-ec2"
  description: EC2 instance for "file-manager-service"
spec:
  type: compute
  owner: infra
```

In Backstage, you’ll see the new component linked to its EC2 resource:

![The image shows a dashboard interface for a service called "file-manager-service," displaying details like owner, lifecycle, and relations with other components. It includes sections for viewing source, tech docs, and a graph of relationships.](https://kodekloud.com/kk-media/image/upload/v1752870239/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/file-manager-service-dashboard-interface.jpg)

Finally, verify your EC2 instance in AWS:

![The image shows an AWS EC2 console with one running instance named "file-manager-service" of type "t2.micro" in the "us-east-1c" availability zone. The instance has passed its status checks.](https://kodekloud.com/kk-media/image/upload/v1752870240/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Templates-with-Infrastructure/aws-ec2-console-file-manager-service.jpg)

---

With this scaffolder template, teams can rapidly spin up Node.js services alongside their AWS infrastructure, all managed via standard Terraform modules.

## Links and References

- [Backstage Documentation](https://backstage.io/docs/)
- [Terraform Registry](https://registry.terraform.io/)
- [AWS Provider for Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [GitHub Scaffolder Action](https://github.com/backstage/backstage/tree/master/plugins/scaffolder)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/1c7142e3-0cb6-40ae-b5b6-77252f8c85b2/lesson/5cb603dc-208b-45f1-911b-2a7c443208f1)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/1c7142e3-0cb6-40ae-b5b6-77252f8c85b2/lesson/ef1d61cc-154f-43f3-ada0-3f6c1df79970)**
>
> Practice lab
