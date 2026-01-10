# Demo Pre requisite to Deploy Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Introduction-to-Real-life-Application/Demo-Pre-requisite-to-Deploy-Application)

---

## Table of Contents

- Demo Pre requisite to Deploy Application
  - 1. Create an IAM Role for EC2
  - 2. Launch an EC2 Instance
  - 3. Connect and Prepare the EC2 Environment
  - 4. Clone the AWS FIS Workshop
  - 5. Configure AWS Environment Variables
  - 6. Deploy the Application with AWS CDK
  - 7. Final Deployment Steps
  - Links and References
  - Watch Video

---

## Content

Chaos Engineering

Introduction to Real life Application

# Demo Pre requisite to Deploy Application

In this lesson, you will perform the manual steps required to install and configure an EC2 environment when [Cloud9 IDE](https://aws.amazon.com/cloud9/) is not available. You’ll create an IAM role, launch and prepare an EC2 instance, clone repositories, configure your AWS environment, and deploy with AWS CDK.

> [!important]
> **Note**
>
> These steps mimic the Cloud9 IDE setup by granting the EC2 instance permissions via an IAM role and installing all required CLI tools, Docker, Kubernetes clients, and CDK.

---

## 1\. Create an IAM Role for EC2

1.  Open the IAM console, choose **Roles** → **Create role**.
2.  Select **AWS service** and **EC2** use case, then **Next**.

![The image shows an AWS IAM console screen where a user is selecting a trusted entity type for creating a role, with options like AWS service, AWS account, and Web identity. The "AWS service" option is selected, and the use case is set to EC2.](https://kodekloud.com/kk-media/image/upload/v1752871925/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-iam-console-trusted-entity-role.jpg)

3.  Attach these AWS managed policies:

| Policy Name                  | Description                               |
| ---------------------------- | ----------------------------------------- |
| AdministratorAccess          | Full administrative access                |
| AmazonSSMManagedInstanceCore | Systems Manager permissions for instances |

![The image shows an AWS IAM console screen where a user is adding permissions to a role, with various AWS managed policies listed.](https://kodekloud.com/kk-media/image/upload/v1752871927/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-iam-console-adding-permissions-role.jpg)

4.  Use the exact trust policy and name from the GitHub repo (e.g., `fisworkshop-admin`):

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

5.  Complete the role creation.

![The image shows the AWS Identity and Access Management (IAM) console, specifically the "Roles" section, with a notification indicating that a role named "fisworkshop-admin" has been created.](https://kodekloud.com/kk-media/image/upload/v1752871928/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-iam-console-roles-fisworkshop-admin.jpg)

6.  (Optional) Verify the role’s summary and trust relationships.

![The image shows an AWS Identity and Access Management (IAM) console screen for the role "fisworkshop-admin," displaying its summary details and trust relationships.](https://kodekloud.com/kk-media/image/upload/v1752871929/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-iam-console-fisworkshop-admin-summary.jpg)

---

## 2\. Launch an EC2 Instance

1.  In the EC2 console, click **Launch instance**.

![The image shows an AWS EC2 management console with two running instances listed, both of type "t3.micro" and located in the "ap-southeast-1" region.](https://kodekloud.com/kk-media/image/upload/v1752871930/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-management-console-t3-micro-instances.jpg)

2.  Name the instance, choose **Amazon Linux** AMI, and select an instance type (e.g., `m5.xlarge` for CDK deployments).

![The image shows an AWS EC2 instance launch configuration screen, where a user is selecting an Amazon Machine Image (AMI) and instance type, with details about pricing and free tier eligibility.](https://kodekloud.com/kk-media/image/upload/v1752871932/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-instance-launch-configuration.jpg)

3.  (Optional) Create or choose an SSH key pair for shell access.

![The image shows a dialog box for creating a key pair in AWS, with options to select the key pair type and private key file format.](https://kodekloud.com/kk-media/image/upload/v1752871933/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-key-pair-creation-dialog-box.jpg)

> [!important]
> **Warning**
>
> Opening SSH (port 22) to `0.0.0.0/0` is insecure. Restrict to your IP range where possible.

4.  Keep default VPC/subnet and allow SSH access.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings and a summary of the instance specifications.](https://kodekloud.com/kk-media/image/upload/v1752871934/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-instance-launch-configuration-2.jpg)

5.  Under **Storage**, increase the root volume size to meet lab requirements.

![The image shows an AWS EC2 instance launch configuration screen, detailing security group settings, storage configuration, and free tier information.](https://kodekloud.com/kk-media/image/upload/v1752871935/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-instance-launch-configuration-3.jpg)

6.  In **Advanced Details**, select the IAM instance profile you created (`fisworkshop-admin`) to grant AWS API permissions.

![The image shows an AWS EC2 instance launch configuration screen, detailing options for storage, instance type, and advanced settings. The summary section on the right provides an overview of the selected configurations.](https://kodekloud.com/kk-media/image/upload/v1752871937/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-instance-launch-configuration-4.jpg)

7.  Launch and confirm success.

![The image shows an AWS EC2 console with a success message indicating the launch of an instance. It also displays various next steps and options for managing the instance, such as creating billing alerts and connecting to the instance.](https://kodekloud.com/kk-media/image/upload/v1752871938/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-console-instance-launch-success.jpg)

8.  Wait until your instance is **running** & passes **2/2 status checks**.

![The image shows an AWS EC2 dashboard with a list of running instances, displaying details like instance ID, state, type, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752871939/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-dashboard-running-instances.jpg)

---

## 3\. Connect and Prepare the EC2 Environment

1.  Select your instance, click **Connect** → **EC2 Instance Connect**.

![The image shows an AWS EC2 console screen for connecting to an instance, with options for EC2 Instance Connect and a warning about Port 22 (SSH) being open to all IPv4 addresses.](https://kodekloud.com/kk-media/image/upload/v1752871941/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-ec2-console-instance-connect-warning.jpg)

> [!important]
> **Note**
>
> If EC2 Instance Connect isn’t available, use your SSH key pair and `ssh -i <key.pem> ec2-user@<public-ip>`.

2.  Switch to root:

```
sudo su -
clear
```

3.  Install Git and clone the repository:

```
yum install -y git
git clone https://github.com/nasiauallas/FaultInjectionSimulator-KodeKloud.git
```

4.  Run the prerequisites script:

```
cd FaultInjectionSimulator-KodeKloud/Manual_IDE
chmod +x pre-req-manual-ide.sh
./pre-req-manual-ide.sh
```

This installs Docker, `kubectl`, Helm, `eksctl`, Node.js, AWS CDK, and more. You should see versions such as:

```
Git version: 2.40.1
Docker version: 25.0.6
AWS CDK version: 2.6.0
kubectl version: v1.29.0
Helm version: v3.13.0
eksctl version: 0.180.0
Node.js version: v22.6.0
```

---

## 4\. Clone the AWS FIS Workshop

Create a workspace and clone the official AWS Fault Injection Simulator workshop:

```
mkdir -p ~/environment/workshopfiles
git clone https://github.com/aws-samples/aws-fault-injection-simulator-workshop-v2.git ~/environment/workshopfiles/fis-workshop
```

---

## 5\. Configure AWS Environment Variables

Set your account ID and region for all CLI calls:

```
export AWS_PAGER=""
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
export AWS_REGION=$(aws ec2 describe-availability-zones --output text --query 'AvailabilityZones[0].RegionName')

echo "export ACCOUNT_ID=${ACCOUNT_ID}" >> ~/.bash_profile
echo "export AWS_REGION=${AWS_REGION}" >> ~/.bash_profile

aws configure set default.region "${AWS_REGION}"
aws configure get default.region
```

Validate your IAM role assignment:

```
aws sts get-caller-identity --query Arn \
  | grep fisworkshop-admin -q \
  && echo "You're good. IAM role IS valid." \
  || echo "IAM role NOT valid. DO NOT PROCEED."
```

---

## 6\. Deploy the Application with AWS CDK

1.  Navigate to your CDK project (e.g., `pet_stack`), install dependencies, and fix audits:

```
cd pet_stack
npm install
npm audit fix
```

2.  Bootstrap the CDK environment:

```
cdk bootstrap
```

You should see output like:

```
Bootstrapping environment aws://123456789012/us-east-1...
Building Docker image for AWS Lambda...
Deploying CDKToolkit stack...
CREATE_COMPLETE CloudFormationStack CDKToolkit
```

3.  Confirm in CloudFormation that **CDKToolkit** is in `CREATE_COMPLETE`.

![The image shows an AWS CloudFormation dashboard with a stack named "CDKToolkit" that has a status of "CREATE_COMPLETE." The stack was created on August 15, 2024, and includes resources for deploying AWS CDK apps.](https://kodekloud.com/kk-media/image/upload/v1752871942/notes-assets/images/Chaos-Engineering-Demo-Pre-requisite-to-Deploy-Application/aws-cloudformation-cdktoolkit-dashboard.jpg)

---

## 7\. Final Deployment Steps

1.  Export your current role ARN and deploy the full stack (may take ~30 minutes):

```
export CONSOLE_ROLE_ARN=$(aws sts get-caller-identity --query Arn --output text)
echo $CONSOLE_ROLE_ARN

cd pet_stack
cdk deploy --require-approval never
```

2.  After deployment completes, explore the next experiments in: `~/environment/workshopfiles/fis-workshop`.

---

## Links and References

- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/latest/UserGuide/introduction.html)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [AWS CDK Developer Guide](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- [AWS Fault Injection Simulator Workshop](https://github.com/aws-samples/aws-fault-injection-simulator-workshop-v2)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/a6b84b48-a401-48a4-8278-0be5a8bb0d38/lesson/a9406933-645b-4538-b248-81cd433c1ab4)**
>
> Watch video content
