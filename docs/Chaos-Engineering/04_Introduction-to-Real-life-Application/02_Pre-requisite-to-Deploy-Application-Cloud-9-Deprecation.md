# Pre requisite to Deploy Application Cloud 9 Deprecation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Introduction-to-Real-life-Application/Pre-requisite-to-Deploy-Application-Cloud-9-Deprecation)

---

## Table of Contents

- Pre requisite to Deploy Application Cloud 9 Deprecation
  - 1. Create the IAM Role
  - 2. Launch and Configure the EC2 Instance
  - 3. Connect & Prepare Your Environment
  - 4. Automate with CloudFormation (Optional)
  - Cloud9 Deprecation & Alternative IDEs
  - References
  - Watch Video

---

## Content

Chaos Engineering

Introduction to Real life Application

# Pre requisite to Deploy Application Cloud 9 Deprecation

In this lesson, you’ll provision an EC2-based development environment with all the tools required to deploy our pet adoption website using the AWS Cloud Development Kit (CDK). We’ll cover:

1.  Manual setup of an EC2 instance
2.  Automating that setup with a CloudFormation template
3.  Alternatives to the deprecated AWS Cloud9 environment

![The image outlines the prerequisites for setting up architecture and deploying an application, including choosing your environment, deploying an EC2 instance, and deploying the application with CDK.](https://kodekloud.com/kk-media/image/upload/v1752871953/notes-assets/images/Chaos-Engineering-Pre-requisite-to-Deploy-Application-Cloud-9-Deprecation/prerequisites-architecture-deploying-application.jpg)

## 1\. Create the IAM Role

First, create an IAM role named **FIS-workshop-admin** with the following managed policies:

| Policy Name                  | Purpose                                     |
| ---------------------------- | ------------------------------------------- |
| AmazonEC2FullAccess          | Full control of EC2 resources               |
| AmazonSSMManagedInstanceCore | Systems Manager Session Manager permissions |

> [!important]
> **Warning**
>
> The role name **must** be exactly `FIS-workshop-admin`. All subsequent CDK and CloudFormation scripts expect this exact name.

## 2\. Launch and Configure the EC2 Instance

When launching your EC2 instance:

1.  Attach the **FIS-workshop-admin** IAM role
2.  Choose an instance type (e.g., `t3.medium`)
3.  Select your VPC and subnets
4.  Enable SSH access **or** plan to use AWS Systems Manager Session Manager

## 3\. Connect & Prepare Your Environment

Once your instance is up:

```
# Update the OS
sudo yum update -y


# Install Git
sudo yum install -y git
```

Clone the workshop repository and bootstrap the environment:

```
git clone https://github.com/aws-samples/fis-workshop-experiments.git
cd fis-workshop-experiments


# Install Docker, kubectl, Node.js, AWS CDK, and other dependencies
bash bootstrap.sh
```

This script installs:

- Docker Engine
- Kubernetes CLI tools (`kubectl`, `eksctl`)
- Node.js and npm
- AWS CDK Toolkit (`npm install -g aws-cdk`)

## 4\. Automate with CloudFormation (Optional)

Skip steps 1–2 by deploying our CloudFormation template. It creates both the IAM role and EC2 instance in one stack:

```
aws cloudformation deploy \
  --template-file infrastructure/dev-environment.yaml \
  --stack-name fis-workshop-dev \
  --capabilities CAPABILITY_NAMED_IAM
```

---

## Cloud9 Deprecation & Alternative IDEs

AWS no longer provides preconfigured Cloud9 environments for new accounts as of July 2024. You can continue with your custom Cloud9 IDE, or choose one of these alternatives:

- [AWS Toolkit for VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
- [AWS Toolkit for JetBrains IDEs](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
- [AWS CloudShell](https://aws.amazon.com/cloudshell/)

![The image announces the deprecation of Cloud 9 IDE as of July 2024 and informs that the account does not have access to the Cloud9 service, suggesting alternatives like AWS Toolkits and AWS CloudShell.](https://kodekloud.com/kk-media/image/upload/v1752871954/notes-assets/images/Chaos-Engineering-Pre-requisite-to-Deploy-Application-Cloud-9-Deprecation/cloud9-ide-deprecation-notice-alternatives.jpg)

All scripts and detailed instructions are available in the [fis-workshop-experiments GitHub repository](https://github.com/aws-samples/fis-workshop-experiments).

---

## References

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- [AWS CloudFormation User Guide](https://docs.aws.amazon.com/cloudformation/index.html)
- [AWS Systems Manager Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/a6b84b48-a401-48a4-8278-0be5a8bb0d38/lesson/fccf590b-0c4f-44ee-b45a-aacea604f18c)**
>
> Watch video content
