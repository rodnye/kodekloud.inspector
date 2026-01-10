# Creating EC2 Instance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Pulumi-Essentials/Pulumi-Essentials/Creating-EC2-Instance)

---

## Table of Contents

- Creating EC2 Instance
  - Code Example
  - EC2 Instance Properties
  - Expected Terminal Output
  - AMI and Instance Type Details
  - Connecting to the EC2 Instance via SSH
  - Conclusion
  - Watch Video

---

## Content

Pulumi Essentials

Pulumi Essentials

# Creating EC2 Instance

Enhance your project by adding an EC2 instance alongside your existing AWS resources. In this lesson, we import the Pulumi AWS package to create both an S3 bucket and an EC2 instance, demonstrating how to export the bucket name and the instance's public IP address.

## Code Example

The following code snippet shows how to define an S3 bucket and an EC2 instance with the necessary properties:

```
from pulumi_aws import s3, ec2

# Create an AWS S3 Bucket resource
bucket = s3.Bucket('my-bucket')

# Export the name of the bucket
pulumi.export('bucket_name', bucket.id)

# Create an EC2 instance with the specified properties
ec2_instance = ec2.Instance('web-server',
    ami="ami-053b0d53c279acc90",    # Ubuntu AMI ID obtained from the AWS console
    instance_type="t3.nano",         # Lightweight instance type for demonstration
    key_name="test1",                # Pre-existing key for SSH authentication
    tags={
        "Name": "web"
    }
)

# Export the public IP address of the EC2 instance
pulumi.export('public_ip', ec2_instance.public_ip)
```

## EC2 Instance Properties

When creating the EC2 instance, you need to set the following properties:

| Property      | Description                                                                                 | Example Value           |
| ------------- | ------------------------------------------------------------------------------------------- | ----------------------- |
| AMI           | The Amazon Machine Image ID obtained from your AWS console. In this example, we use Ubuntu. | "ami-053b0d53c279acc90" |
| Instance Type | Defines the type of instance. Here, we have chosen a lightweight instance (`t3.nano`).      | "t3.nano"               |
| Key Name      | The pre-configured key in your AWS console used for SSH authentication.                     | "test1"                 |
| Tags          | Metadata to help identify or group resources. Here, the instance is tagged as "web".        | { "Name": "web" }       |

> [!important]
> **Note**
>
> Ensure that you have already created the key named "test1" in your AWS console to avoid SSH connection issues.

## Expected Terminal Output

Once you update your Pulumi stack, you might see terminal output similar to the following before confirming the update:

```
Type: pulumi:pulumi:Stack pulumi-demo-dev

Resources:
  2 unchanged

Do you want to perform this update? no
confirmation declined, not proceeding with the update
C:\Users\sanje\Documents\scratch\pulumi-demo
```

After correcting any issues (for example, typos in the `tags` property) and running the update again, a successful deployment will display output similar to:

```
Outputs:
  + public_ip : "34.205.89.1"

Resources:
  + 1 created
  2 unchanged

Duration: 15s
```

## AMI and Instance Type Details

When launching an instance via the AWS console:

- Copy the AMI ID corresponding to the desired Ubuntu image. The console displays all the details, including the selected AMI.
- Pulumi’s auto-completion (IntelliSense) simplifies finding properties like `instance_type`, ensuring you choose the correct one (e.g., `t3.nano`).

![The image shows an AWS EC2 console screen for launching an instance, featuring Ubuntu Server 22.04 LTS as the selected Amazon Machine Image (AMI).](https://kodekloud.com/kk-media/image/upload/v1752883103/notes-assets/images/Pulumi-Essentials-Creating-EC2-Instance/frame_90.jpg)

## Connecting to the EC2 Instance via SSH

After deployment, you can retrieve the public IP address from the exported output. The default user for an Ubuntu AMI is "ubuntu." To connect via SSH, use:

```
ssh -i test1.pem ubuntu@34.205.89.1
```

> [!important]
> **Warning**
>
> If you encounter connectivity issues when attempting to SSH, verify the security group settings in the AWS console. Ensure that SSH (port 22) traffic is permitted from your IP address or a trusted range.

![The image shows an AWS EC2 instance details page, displaying information like IP address, instance type, AMI ID, platform, and launch time.](https://kodekloud.com/kk-media/image/upload/v1752883104/notes-assets/images/Pulumi-Essentials-Creating-EC2-Instance/frame_260.jpg)

## Conclusion

This lesson demonstrated how to add an EC2 instance with Pulumi while exporting useful outputs such as the bucket name and the instance's public IP address. With the correct security group configurations in place, you can now easily connect to your EC2 instance and proceed with further configurations.

For additional AWS and Pulumi resources, be sure to check out the [Pulumi Documentation](https://www.pulumi.com/docs/) and [AWS Documentation](https://docs.aws.amazon.com/). Enjoy building your infrastructure!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pulumi-essentials/module/883d8d6f-c8be-44af-ac4d-ba0835d32f5d/lesson/84cfaf53-946e-4164-943e-82555a2374d6)**
>
> Watch video content
