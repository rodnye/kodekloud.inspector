# EC2 User data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/Basics-of-EC2/EC2-User-data)

---

## Table of Contents

- EC2 User data
  - Common Initialization Tasks
  - How EC2 User Data Works
  - Key Considerations
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Amazon Elastic Compute Cloud (EC2)

Basics of EC2

# EC2 User data

Amazon EC2 user data enables you to automate instance initialization by passing scripts or cloud-init directives that run when an instance first launches. This ensures your servers are pre-configured and ready to serve traffic immediately.

## Common Initialization Tasks

Use user data to automate repetitive setup tasks:

| Task                  | Description                                      |
| --------------------- | ------------------------------------------------ |
| Download Remote Files | Fetch and extract archives from S3 or HTTP URLs  |
| Validate API Health   | Check service endpoints before application start |
| Install Packages      | Install OS packages or application dependencies  |
| Bootstrap             | Configure the instance to its desired state      |

![The image is a diagram illustrating the flow of EC2 user data, featuring icons representing a user, a computer, a document, and cloud computing elements. It shows a sequence of steps or components related to EC2 user data processing.](https://kodekloud.com/kk-media/image/upload/v1752868981/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-EC2-User-data/ec2-user-data-flow-diagram.jpg)

## How EC2 User Data Works

1.  **Provide Script**  
    You supply a shell script, cloud-init config, or other executable content as user data when launching the instance (via Console, CLI, SDK, or Terraform).
2.  **Bootstrapping**  
    During the first boot, the EC2 service downloads and executes your user data. This can install software, configure services, or fetch application code.
3.  **Instance Ready**  
    Once the script completes, your instance is fully configured and ready to handle workload.

## Key Considerations

- User data runs **only once**, during the initial launch of an instance.> [!important]
  > **Warning**
  >
  > Modifying user data after launch and then restarting or stopping the instance **will not** rerun the script.
- Input must be Base64 encoded. The AWS Management Console handles encoding automatically; CLI or SDK users must encode manually.> [!important]
  > **Note**
  >
  > Raw user data is limited to 16 KB before Base64 encoding. Keep scripts concise to avoid boot-time delays.
- When retrieved via instance metadata or the console, EC2 returns the **decoded** version of your user data.
- EC2 treats user data as opaque; the operating system or cloud-init on the instance interprets the content.
- Very large or complex scripts can increase boot time—consider breaking logic into smaller segments or leveraging configuration management.

## Conclusion

By embedding initialization logic into EC2 user data, you automate environment provisioning and reduce manual setup errors. Your instances will launch fully configured, secure, and production-ready.

## Links and References

- [AWS EC2 User Data Documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)
- [cloud-init Official Guide](https://cloudinit.readthedocs.io/)
- [Terraform AWS Provider: user_data](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#user_data)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/82b1483c-fccc-4f06-923b-dcfe0bd428a9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/6b1df5fc-e1d3-4e1d-9dd1-035d0c2737d4/lesson/61664800-7049-4ae2-ae54-b59b61fdf4ce)**
>
> Practice lab
