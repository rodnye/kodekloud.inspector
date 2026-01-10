# Global Resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Configuration/Global-Resources)

---

## Table of Contents

- Global Resources
  - Common AWS Global Services
  - Directory Structure for Global Resources
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Configuration

# Global Resources

In Terragrunt-based Terraform repositories, certain AWS services are global—they’re not bound to a specific region and are deployed once per account. To keep your directory structure clean and intuitive, isolate these global services at the top level of your project, separate from any region-specific folders.

![The image is an infographic titled "Global Resources," outlining four points: services not in traditional regions, deployment per account, isolating global services, and maintaining clear hierarchy and structure.](https://kodekloud.com/kk-media/image/upload/v1752884342/notes-assets/images/Terragrunt-for-Beginners-Global-Resources/global-resources-infographic-deployment-services.jpg)

> [!important]
> **Note**
>
> Global AWS services deploy once per account, so housing them in a dedicated `global` folder prevents accidental duplication and clarifies their scope.

## Common AWS Global Services

Below are some frequently used AWS services that should live in your top-level `global` directory:

| Global Service | Purpose                                    |
| -------------- | ------------------------------------------ |
| IAM            | Users, Groups, Roles, Policies             |
| Route 53       | DNS Zones and Record Management            |
| CloudFront     | Content Delivery Network (CDN)             |
| AWS WAF        | Web Application Firewall Rules             |
| ACM            | SSL/TLS Certificate Provisioning & Renewal |

> Note: Depending on your architecture, you may have additional global components (e.g., AWS Organizations, SSO, or Artifact).

## Directory Structure for Global Resources

Create a `global` folder alongside your environment and region directories (e.g., `prod`, `dev`, `region-us-east-1`, `region-eu-west-1`). Inside `global`, add individual `terragrunt.hcl` files for each service:

![The image shows a directory structure diagram for global services, with folders and files like "terragrunt.hcl" organized under categories such as "prod," "global," "region-A," and "region-B."](https://kodekloud.com/kk-media/image/upload/v1752884343/notes-assets/images/Terragrunt-for-Beginners-Global-Resources/directory-structure-global-services-diagram.jpg)

Example layout:

```
├── dev
│   └── region-us-east-1
│       └── terraform.tfvars
├── prod
│   └── region-us-west-2
│       └── terraform.tfvars
└── global
    ├── iam
    │   └── terragrunt.hcl
    ├── route53
    │   └── terragrunt.hcl
    ├── cloudfront
    │   └── terragrunt.hcl
    ├── waf
    │   └── terragrunt.hcl
    └── acm
        └── terragrunt.hcl
```

This setup ensures:

- Clear separation between account-wide and region-specific resources
- Single source of truth for global configurations
- Easier navigation and maintenance across environments

## Next Steps

With global services neatly isolated, you can extend your Terragrunt repository to include shared modules, environment overrides, and DRY patterns. This foundation streamlines updates and fosters collaboration across teams.

---

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Global Services Overview](https://docs.aws.amazon.com/general/latest/gr/aws_service_discovery.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/52cf8076-030b-430e-9a8b-273697ad3399/lesson/414a2c75-16ee-452b-b713-d6ffe9cfc4f2)**
>
> Watch video content
