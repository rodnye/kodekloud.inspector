# Pulumi Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Pulumi-Essentials/Pulumi-Essentials/Pulumi-Installation)

---

## Table of Contents

- Pulumi Installation
  - Installation
  - Configuring AWS Credentials for Pulumi
  - Additional Resources
  - Watch Video
    - Windows
    - macOS
    - Option 1: Using Environment Variables
    - Option 2: Using the AWS CLI

---

## Content

Pulumi Essentials

Pulumi Essentials

# Pulumi Installation

Pulumi is a powerful infrastructure as code tool that simplifies cloud deployments. In this guide, you'll learn how to install Pulumi on various operating systems and configure it to work with AWS.

## Installation

### Windows

For Windows users, you have two options:

1.  Download the installer directly from the [Pulumi website](https://www.pulumi.com/docs/get-started/install/).
2.  Install via Chocolatey by running the following command:

```
choco install pulumi
```

### macOS

macOS users can easily install Pulumi using Homebrew. Run the command below in your terminal:

```
brew install pulumi/tap/pulumi
```

## Configuring AWS Credentials for Pulumi

After installing Pulumi, the next step is to set up your AWS credentials. Pulumi leverages the same AWS credentials used by the AWS CLI. You can configure your credentials using one of the following methods:

### Option 1: Using Environment Variables

Set up your AWS credentials and region by executing these commands in your terminal:

```
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
export AWS_REGION=<YOUR_AWS_REGION>  # e.g., ap-south-1
```

Then, configure Pulumi to use your AWS region:

```
pulumi config set aws:region <your-region>  # e.g., 'ap-south-1'
```

### Option 2: Using the AWS CLI

Alternatively, if you prefer using the interactive configuration provided by the AWS CLI, run:

```
aws configure
```

You'll be prompted to enter your AWS credentials:

```
AWS Access Key ID [None]: <YOUR_ACCESS_KEY_ID>
AWS Secret Access Key [None]: <YOUR_SECRET_ACCESS_KEY>
Default region name [None]: <YOUR_AWS_REGION>
Default output format [None]:
```

After completing this, the credentials will be stored in the `.aws/credentials` file, which typically looks like this:

```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```

Pulumi will automatically use this configuration to authenticate with AWS.

> [!important]
> **Note**
>
> Choose the configuration method that best fits your workflow. Environment variables offer quick setup for temporary sessions, while the AWS CLI configuration provides a persistent setup across sessions.

Happy deploying with Pulumi!

## Additional Resources

- [Pulumi Documentation](https://www.pulumi.com/docs/)
- [AWS CLI Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pulumi-essentials/module/883d8d6f-c8be-44af-ac4d-ba0835d32f5d/lesson/8ab53585-2454-4046-ba5a-3c5ca780c8f7)**
>
> Watch video content
