# Programmatic Access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/Programmatic-Access)

---

## Table of Contents

- Programmatic Access
  - Installing the AWS CLI
  - Configuring the AWS CLI
  - Using the AWS CLI
  - Accessing Help
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform with AWS

# Programmatic Access

In this lesson, you will learn how to interact with the AWS Cloud programmatically using the AWS Command Line Interface (CLI). This approach provides a powerful way to manage your AWS resources through scripts and command-line operations.

Previously, we explored two methods for accessing AWS when creating an IAM user:

1.  Logging in to the Management Console using a username and password.
2.  Programmatic access using access keys.

For example, you can create an S3 bucket using the AWS CLI with the following command:

```
aws s3api create-bucket --bucket my-bucket --region us-east-1
```

The AWS CLI is an open-source tool that enables you to interact with AWS services from various command-line environments, including Linux shells, command-line prompts, and PowerShell on Windows. Currently, the AWS CLI is in its second major version and can be installed on all major operating systems. Detailed instructions for downloading, installing, and configuring the AWS CLI are provided in the sections below.

## Installing the AWS CLI

Installing the AWS CLI is straightforward regardless of your operating system. You can either download the package via a graphical interface or use the command line.

For Linux users, run the following commands:

```
$ curl "https://awscli.amazonaws.com/awscli-exe-linux_x86_64-2.0.30.zip" -o "awscliv2.zip"
$ unzip awscliv2.zip
$ sudo ./aws/install
```

After the installation, verify the version specific to your operating system using:

```
$ aws --version
aws-cli/2.0.47 Python/3.7.4 Linux/4.14.133-113.105.amzn2.x86_64 botocore/2.0.0


C:\> aws --version
aws-cli/2.0.47 Python/3.7.4 Windows/10 botocore/2.0.0


$ aws --version
aws-cli/2.0.47 Python/3.7.4 Darwin/18.7.0 botocore/2.0.0
```

Once downloaded, run or launch the installer on your platform and follow the on-screen instructions.

> [!important]
> **Installation Tip**
>
> After installing the AWS CLI, it's a good idea to add it to your system's PATH to simplify command execution from any directory.

## Configuring the AWS CLI

After installation, you must configure the AWS CLI with your AWS account credentials. The configuration process includes providing your:

- AWS Access Key ID
- AWS Secret Access Key
- Default region for your resources
- Preferred output format (e.g., JSON, YAML, text, or table)

Initiate the configuration by running:

```
$ aws configure
AWS Access Key ID [None]: AKIAI44QH8DHBEXAMPLE
AWS Secret Access Key [None]: je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

The credentials and settings will be stored in the hidden `.aws` directory in your home folder. You can review your configuration files with the following commands:

```
$ cat ~/.aws/config
[default]
region = us-west-2
output = text
```

```
$ cat ~/.aws/credentials
[default]
aws_access_key_id = AKIAI44QH8DHBEXAMPLE
aws_secret_access_key = je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

> [!important]
> **Security Reminder**
>
> Ensure that you keep your AWS credentials secure and never share them publicly.

## Using the AWS CLI

The AWS CLI follows a standard command syntax:

Base Command → Service Name → Sub-Command → Options/Parameters

For instance, to create an IAM user named Lucy, execute:

```
$ aws iam create-user --user-name lucy
```

This command utilizes the IAM service with the `create-user` sub-command, specifying the username `lucy`. The output will include details such as the username, creation date, user ID, and the ARN (Amazon Resource Name) that uniquely identifies the user:

```
$ aws iam create-user --user-name lucy
{
    "User": {
        "UserName": "lucy",
        "Tags": [],
        "CreateDate": "2020-09-15T23:40:11.168Z",
        "UserId": "h9r2sc5br8ss7uzhs2qm",
        "Path": "/",
        "Arn": "arn:aws:iam::000000000000:user/lucy"
    }
}
```

You can similarly create and manage other AWS resources using the CLI.

## Accessing Help

The AWS CLI offers extensive help to guide you through commands, sub-commands, and options. To access the general help documentation, run:

```
$ aws help
```

For service-specific help, such as for IAM, execute:

```
$ aws iam help
```

To get detailed assistance with a specific sub-command (e.g., `create-user`), append `help` to the command:

```
$ aws iam create-user help
```

This will display comprehensive documentation on the command's usage and available parameters.

> [!important]
> **Pro Tip**
>
> Regularly check the AWS CLI help documentation to stay updated with any changes or new functionalities.

This concludes the lesson. You are now ready to practice using the AWS CLI in your labs and further explore the extensive capabilities of the AWS Cloud.

For additional AWS resources and documentation, visit the following links:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [AWS CLI Official Guide](https://aws.amazon.com/cli/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/bf623a25-428f-44a2-a7ad-77908444636e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/6c12463e-1db0-4959-9761-1337db3060cd)**
>
> Practice lab
