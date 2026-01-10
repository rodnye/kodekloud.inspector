# Launch template - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/EC2-Advanced/Launch-template)

---

## Table of Contents

- Launch template
  - Why Launch Templates?
  - Core Features of Launch Templates
  - Additional Capabilities
  - Examples
  - Links and References
  - Watch Video
  - Practice Lab
    - Versioning and Updates
    - Parameterization and Overrides

---

## Content

Amazon Elastic Compute Cloud (EC2)

EC2 Advanced

# Launch template

In this lesson, we’ll explore how AWS EC2 launch templates bring standardization and efficiency to instance provisioning. By defining reusable configuration blocks—such as AMIs, security groups, and IAM roles—you’ll accelerate deployments and enforce governance across your environment.

## Why Launch Templates?

When building multiple websites, you wouldn’t recreate your homepage layout from scratch each time. You’d use a template with common elements: header, footer, and content blocks.

![The image shows a laptop screen displaying a website layout with sections labeled "Product," "Contact," "Blog," "Image," and "Text Content," under the question "Why Do We Need Launch Template?"](https://kodekloud.com/kk-media/image/upload/v1752869047/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Launch-template/laptop-website-layout-launch-template.jpg)

Similarly, EC2 instances often share recurring settings:

![The image lists common features of an EC2 launch template, including IAM Role, Security Group, Network Configuration, Instance Type, AMI, and more.](https://kodekloud.com/kk-media/image/upload/v1752869048/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Launch-template/ec2-launch-template-features-list.jpg)

Using a launch template ensures repeatability, compliance, and faster provisioning across teams.

## Core Features of Launch Templates

Launch templates let you bundle a wide range of EC2 settings:

![The image outlines the features of a launch template, including instance configuration, versioning and update, and customization. It lists specific components like AMI, EBS volume, and security group under instance configuration.](https://kodekloud.com/kk-media/image/upload/v1752869050/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Launch-template/launch-template-features-instance-configuration.jpg)

| Feature                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| AMI ID & Block Device Mappings | Specify the OS image and EBS volumes           |
| Security Groups & Network      | Control traffic using SGs, VPC, and subnets    |
| IAM Role & Instance Profile    | Define permissions through assigned roles      |
| Tags & Metadata                | Automate billing, monitoring, and organization |
| EBS Volume Configuration       | Configure size, type, and encryption settings  |

### Versioning and Updates

Launch templates support versioning, so you can evolve settings without impacting running instances. Create new versions to roll out changes seamlessly.

> [!important]
> **Note**
>
> Each version is immutable—once created, you cannot modify it. Instead, create a new version to apply updates.

### Parameterization and Overrides

Define default values in your base template, then override specific parameters—like subnet IDs, user data, or instance type—at launch time. This keeps templates DRY while still flexible.

```
aws ec2 run-instances \
  --launch-template LaunchTemplateName=MyTemplate,Version=2 \
  --overrides '{
      "InstanceType":"t3.small",
      "NetworkInterfaces":[{"DeviceIndex":0,"SubnetId":"subnet-0abcd1234"}]
  }'
```

## Additional Capabilities

Beyond core settings, launch templates can:

- Mix purchase options (On-Demand, Reserved, Spot) in one template
- Automate with AWS SDKs, CLI, CloudFormation, Terraform
- Enable termination protection to prevent accidental shutdowns
- Pass user data scripts for automated bootstrapping
- Choose different AMIs per launch for diverse OS or stacks

> [!important]
> **Warning**
>
> Launching too many template versions can lead to clutter. Regularly clean up unused versions to stay organized.

## Examples

Here’s how to create a simple launch template via the AWS CLI:

```
aws ec2 create-launch-template \
  --launch-template-name MyAppTemplate \
  --version-description "v1" \
  --launch-template-data '{
    "ImageId":"ami-0123456789abcdef0",
    "InstanceType":"t3.micro",
    "SecurityGroupIds":["sg-0123456789abcdef0"],
    "UserData":"IyEvYmluL2Jhc2gKZWNobyAiSGVsbG8sIEFTVycgQ0wiCg=="
  }'
```

## Links and References

- [AWS EC2 Launch Templates Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html)
- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/ec2/index.html)
- [Terraform AWS Launch Template Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/launch_template)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/fe995ae2-a50f-4c70-9d50-3f2e017bd207/lesson/4d276c58-8a42-428a-945c-5c827448f45a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/fe995ae2-a50f-4c70-9d50-3f2e017bd207/lesson/960b7f8f-e3a8-4f50-bc65-42603bbfd88b)**
>
> Practice lab
