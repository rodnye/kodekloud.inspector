# Datasources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Datasources)

---

## Table of Contents

- Datasources
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Working with Terraform

# Datasources

In this lesson, we explore how Terraform utilizes data sources to read information from resources that are managed externally. Terraform leverages configuration files and a state file to provision infrastructure resources, but it can also interact with resources that are created manually, by other tools (such as Puppet, CloudFormation, SaltStack, Ansible, etc.), ad-hoc scripts, or even resources provisioned by another Terraform configuration.

For instance, consider a database instance that was manually provisioned in the AWS cloud. Even though Terraform does not manage this resource, it can still read attributes—such as the database name, host address, or DB user details—and use that information to provision an application resource managed by Terraform.

![The image illustrates infrastructure management tools, highlighting Terraform's role in managing real-world infrastructure and state files, alongside other tools like CloudFormation and Ansible.](https://kodekloud.com/kk-media/image/upload/v1752884244/notes-assets/images/Terraform-Basics-Training-Course-Datasources/frame_50.jpg)

Now, consider a simpler scenario with a local file resource named "pet" containing the text "We love pets!" When Terraform creates this resource, it generates the file `/root/pets.txt` and stores its information in the state file. Meanwhile, another file—created by an external shell script—is located at `/root/dog.txt` and contains "Dogs are awesome!" Because `dog.txt` is not managed by Terraform, we can use it as a data source to supply content for our managed resource `pets.txt`.

> [!important]
> **Understanding Data Sources**
>
> Data sources in Terraform enable you to use attributes from external resources, integrating them into your Terraform-managed infrastructure.

Data sources are defined using the `data` block in your configuration. Although these blocks resemble resource blocks, they start with the keyword `data` instead of `resource`. Below is an example configuration that demonstrates this process:

```
$ cat /root/dog.txt
Dogs are awesome!
```

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = data.local_file.dog.content
}


data "local_file" "dog" {
  filename = "/root/dog.txt"
}
```

In the configuration above:

- The resource block creates a file called `/root/pets.txt` with its content dynamically populated using data from `dog.txt`.
- The data block reads from the local file located at `/root/dog.txt` and makes its content available via the expression `data.local_file.dog.content`.

According to the Terraform documentation on the [Terraform Registry](https://registry.terraform.io/), the local file data source exports two attributes:

- The raw content of the file.
- The base64-encoded version of the file's content.

This feature allows you to easily integrate external data into your Terraform configurations.

![The image shows a documentation page for a local provider, detailing argument references and exported attributes for reading a file, including filename, content, and base64 encoding.](https://kodekloud.com/kk-media/image/upload/v1752884245/notes-assets/images/Terraform-Basics-Training-Course-Datasources/frame_210.jpg)

To clearly distinguish between resources and data sources in Terraform:

| Type        | Purpose                                                 | Management by Terraform                          |
| ----------- | ------------------------------------------------------- | ------------------------------------------------ |
| Resource    | Create, update, and destroy infrastructure elements     | Managed; stored in the state file                |
| Data Source | Read and reference information from unmanaged resources | Not managed; used for reference within Terraform |

This distinction is further illustrated in the following comparison diagram:

![The image compares Terraform resources and data sources, highlighting their keywords, functions, and alternative names, alongside a "terraform.tfstate" file icon.](https://kodekloud.com/kk-media/image/upload/v1752884246/notes-assets/images/Terraform-Basics-Training-Course-Datasources/frame_240.jpg)

That concludes this article on data sources in Terraform. For further information on utilizing Terraform with external resources, refer to the official [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/891baedf-ffb0-4f4c-969f-c9ac9668fedf)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/0a7ce33b-d179-4a84-ad51-665242858993)**
>
> Practice lab
