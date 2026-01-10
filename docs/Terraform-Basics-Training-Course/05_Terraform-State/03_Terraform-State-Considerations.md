# Terraform State Considerations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-State/Terraform-State-Considerations)

---

## Table of Contents

- Terraform State Considerations
  - Sensitive Information in the State File
  - Terraform Configuration Files vs. State File
  - Editing the State File
  - Watch Video
    - File Comparison

---

## Content

Terraform Basics Training Course

Terraform State

# Terraform State Considerations

Terraform State is the single source of truth for Terraform, enabling it to accurately synchronize with your deployed infrastructure. In this guide, we explore important considerations when managing your Terraform state file, emphasizing security best practices and the differences between configuration files and the state file.

## Sensitive Information in the State File

Terraform state files contain detailed information about your infrastructure, including sensitive data. For example, an [AWS EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) state file stores attributes such as allocated CPUs, memory, the operating system image, disk specifications, network details (IP addresses), and even SSH key pairs. In the case of database resources, initial passwords may also be present.

When using local state, this sensitive information is stored in plaintext JSON files. Therefore, it is imperative to secure these files to prevent unauthorized access.

Below is an example JSON snippet representing the state file of an AWS EC2 instance:

```
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "dev-ec2",
  "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "ami": "ami-0a634ae95e11c6f91",
        // ... other attributes ...
        "primary_network_interface_id": "eni-0ccd57b1597e633e0",
        "private_dns": "ip-172-31-7-21.us-west-2.compute.internal",
        "private_ip": "172.31.7.21",
        "public_dns": "ec2-54-71-34-19.us-west-2.compute.amazonaws.com",
        "public_ip": "54.71.34.19"
      },
      "root_block_device": [
        {
          "delete_on_termination": true,
          "device_name": "/dev/sda1",
          "encrypted": false,
          "iops": 100,
          "kms_key_id": "",
          "volume_id": "vol-070720a3636979c22"
        }
      ]
    }
  ]
}
```

> [!important]
> **Note**
>
> Always ensure your state files are stored in a secure location, especially when using local storage.

## Terraform Configuration Files vs. State File

Your working directory typically contains two types of files:

1.  **Terraform Configuration Files (HCL):** These are written in HashiCorp Configuration Language and are used to provision and manage your infrastructure.
2.  **Terraform State File:** This JSON file records the current state of your deployed infrastructure.

For team collaboration, store your Terraform configuration files in version-controlled repositories such as GitHub, GitLab, or Bitbucket. However, because the state file contains sensitive data, avoid storing it in Git repositories. Instead, leverage secure remote backend systems such as AWS S3, Google Cloud Storage, Azure Storage, or Terraform Cloud.

Below is an example of Terraform configuration files written in HCL:

```
resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "My favorite pet is Mr.Whiskers!"
}


resource "random_pet" "my-pet" {
  length = 1
}


resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "I like cats too!"
}
```

### File Comparison

| File Type                     | Description                                                | Storage Recommendation                                         |
| ----------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| Terraform Configuration Files | Infrastructure code in HCL                                 | Use distributed version control systems (e.g., GitHub, GitLab) |
| Terraform State File          | JSON file storing the current state of your infrastructure | Use secure remote backends (e.g., AWS S3, Terraform Cloud)     |

> [!important]
> **Warning**
>
> Never store your Terraform state file in an unsecured or public repository. Always use secure, remote backends for state storage.

## Editing the State File

The Terraform state file is a JSON data structure intended exclusively for internal use by Terraform. Manual editing of this file is strongly discouraged. Instead, use Terraform's built-in state commands to safely modify the state.

For instance, if you need to modify the state of managed resources, use commands such as `terraform state mv` or `terraform state rm` rather than editing the JSON file manually. This approach reduces the risk of state corruption and ensures that Terraform's state remains consistent with your infrastructure.

---

Maintaining the integrity and security of your Terraform state file is critical. By following these best practices and leveraging remote state backends, you can enhance the security and reliability of your infrastructure management process. For additional details, refer to the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/153d021a-b7cd-48bb-8249-2de4b55cb6df/lesson/b1ffe7f6-03b3-4672-9030-041e9978d828)**
>
> Watch video content
