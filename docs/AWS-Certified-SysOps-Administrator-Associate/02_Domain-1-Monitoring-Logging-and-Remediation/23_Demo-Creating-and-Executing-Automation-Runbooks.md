# Demo Creating and Executing Automation Runbooks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Demo-Creating-and-Executing-Automation-Runbooks)

---

## Table of Contents

- Demo Creating and Executing Automation Runbooks
  - CloudFormation Template Overview
  - IAM Role Configurations
  - Navigating to AWS Systems Manager
  - Designing the Automation Runbook
  - Executing the Automation Runbook
  - Complete YAML for the Automation Document
  - Watch Video
    - Automation Steps Overview

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Demo Creating and Executing Automation Runbooks

Welcome to our SSM Automation tutorial. In this lesson, Michael Forrester demonstrates how to use a CloudFormation template to launch a T2 micro EC2 instance and configure SSM automation documents. These documents later create snapshots and restart the instance. Follow along as we explore the details of the CloudFormation template, IAM role configuration, and runbook creation.

## CloudFormation Template Overview

The CloudFormation template provisions several key resources, including the EC2 instance, the instance profile, and the necessary IAM roles. The instance is configured to run the latest Amazon Linux 2 AMI and ensures that the SSM agent is properly installed and running.

![The image shows an AWS CloudFormation dashboard displaying stack details and events for "SSM-Automation-Demo," with various statuses like "CREATE_COMPLETE" and "CREATE_IN_PROGRESS."](https://kodekloud.com/kk-media/image/upload/v1752859897/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-cloudformation-ssm-automation-dashboard.jpg)

Below is an excerpt of the CloudFormation template:

```
Type: String
Default: t2.micro
Description: EC2 instance type
AllowedValues:
  - t2.small
  - t3.micro
  - t3.small
Resources:
  DemoEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: '{{resolve:ssm:/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2}}'
      InstanceType: !Ref InstanceType
      IamInstanceProfile: !Ref DemoInstanceProfile
      UserData:
        Fn::Base64: |
          #!/bin/bash
          # Ensure the SSM agent is installed and running
          sudo systemctl status amazon-ssm-agent
          if [ $? -ne 0 ]; then
              sudo yum install -y amazon-ssm-agent
              sudo systemctl enable amazon-ssm-agent
              sudo systemctl start amazon-ssm-agent
          fi
          # Log installation status for verification
          echo "SSM Agent installation status:" > /tmp/ssm-install-log.txt
          sudo systemctl status amazon-ssm-agent >> /tmp/ssm-install-log.txt
Tags:
  - Key: Name
    Value: SSM-Automation-Demo-Instance


DemoInstanceProfile:
  Type: AWS::IAM::InstanceProfile
  Properties:
    Roles: !Ref DemoEC2Role
```

> [!important]
> **Note**
>
> The template includes a user data script to validate that the SSM agent is running on the instance, ensuring seamless automation execution.

## IAM Role Configurations

The template defines two critical IAM roles. One is for the EC2 instance (DemoEC2Role) to enable SSM managed instance functionality, and the other is the Automation Service Role, which allows the automation document to perform a series of EC2 actions.

```
AssumeRolePolicyDocument:
  Version: '2012-10-17'
  Statement:
    - Effect: Allow
      Principal:
        Service: ec2.amazonaws.com
      Action: sts:AssumeRole
ManagedPolicyArns:
  - arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore


AutomationServiceRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: ssm.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/service-role/AmazonSSMAutomationRole
    Policies:
      - PolicyName: EC2ManagementPermissions
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - ec2:DescribeInstances
                - ec2:DescribeInstanceStatus
                - ec2:StartInstances
                - ec2:StopInstances
                - ec2:CreateSnapshot
                - ec2:DescribeSnapshots
                - ec2:CreateTags
              Resource: '*'
Outputs:
  InstanceId:
    Description: ID of the EC2 instance.
```

The CloudFormation template reiterates the tags and instance profile configuration to ensure consistency:

```
Tags:
  Key: Name
  Value: SSM-Automation-Demo-Instance
DemoInstanceProfile:
  Type: AWS::IAM::InstanceProfile
  Properties:
    Roles:
      - !Ref DemoEC2Role
DemoEC2Role:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: ec2.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
AutomationServiceRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: ssm.amazonaws.com
```

## Navigating to AWS Systems Manager

Once the instance and IAM roles are provisioned through CloudFormation, the next step is to work within AWS Systems Manager. Navigate to the Documents section under Change Management Tools to create a custom automation document.

![The image shows a webpage for AWS Systems Manager, highlighting features and benefits for managing nodes at scale. It includes navigation options on the left and sections for benefits, use cases, and resources.](https://kodekloud.com/kk-media/image/upload/v1752859898/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-systems-manager-webpage-features.jpg)

Click on Documents and choose to create a new document with the Automation type. Follow the on-screen guide to start with automation runbooks.

![The image shows an AWS interface for creating automation runbooks, featuring a "Getting started" guide with options to learn about components, review Amazon samples, and create custom runbooks.](https://kodekloud.com/kk-media/image/upload/v1752859899/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-automation-runbooks-interface.jpg)

## Designing the Automation Runbook

For this runbook, name it **StopSnapshotStartEC2Instance**. This document performs the following tasks:

- Stops the EC2 instance.
- Creates a snapshot of its root volume.
- Starts the instance.
- Verifies that the instance is in a running state.

The automation flow is visually represented using a flowchart interface.

![The image shows an AWS Management Console interface for creating a runbook in AWS Systems Manager. It features a flowchart with "Start" and "End" nodes and a sidebar with various actions and scripting options.](https://kodekloud.com/kk-media/image/upload/v1752859901/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-systems-manager-runbook-flowchart.jpg)

Switch to the code view to review and customize the runbook. A pre-configured runbook using schema version 3 is provided:

```
schemaVersion: '0.3'
description: |
  *Replace this default text with instructions or other information about your runbook.*
----
### What is Markdown?
Markdown is a lightweight markup language that converts your content with plain text formatting to structure.
## You can add headings
You can add *italics* or make the font **bold**
1. Create numbered lists
2. Add bullet points
   * Indent code samples
You can create a [link to another webpage](https://aws.amazon.com),
```

### Automation Steps Overview

The runbook includes the following automation steps:

- **Check the Instance State:** Pause to verify the current state.
- **Stop the Instance:** Initiate stopping the instance.
- **Wait for Instance Stop:** Ensure the instance has stopped.
- **Retrieve the Root Volume ID:** Identify the root volume for creating a snapshot.
- **Create the Snapshot:** Capture the snapshot of the root volume.
- **Start the Instance:** Restart the instance.
- **Verify Instance Running:** Confirm the instance is running post-automation.

Below is an excerpt that illustrates the snapshot creation step:

```
inputs:
  Service: ec2
  Api: CreateSnapshot
  VolumeId: "{{GetRootVolumeId.RootVolumeId}}"
  Description: "{{SnapshotDescription}}"
  TagSpecifications:
    - ResourceType: snapshot
      Tags:
        - Key: Name
          Value: AutoSnapshot-{{InstanceId}}
        - Key: CreatedBy
          Value: SystemsManagerAutomation
outputs:
  Name: SnapshotId
  Selector: $.SnapshotId
  Type: String
- name: StartInstance
  action: aws:changeInstanceState
  inputs:
    InstanceIds: ['{{InstanceId}}']
    DesiredState: running
- name: VerifyInstanceRunning
  inputs:
    Service: ec2
    Api: DescribeInstances
    PropertySelector: '$.Reservations[0].Instances[0].State.Name'
  outputs:
    - InstanceId
```

Additional steps manage the instance state before and after creating the snapshot:

```
InstanceIds: '{{InstanceId}}'
IncludedAllInstances: true
outputs:
  InstanceState:
    Selector: $.InstanceState[0].InstanceState.Name
    Type: String


name: StopInstance
action: aws:changeInstanceState
inputs:
  InstanceIds:
    - '{{InstanceId}}'
  DesiredState: stopped
  isEnd: false


name: WaitForInstanceStop
action: aws:waitForAwsResourceProperty
inputs:
  Service: ec2
  Api: DescribeInstances
  InstanceIds:
    - '{{InstanceId}}'
  PropertySelector: $.Reservations[0].Instances[0].State.Name
  DesiredValues:
    - stopped


name: GetRootVolumeId
action: aws:executeAwsApi
inputs:
  Service: ec2
  Api: DescribeInstances
  InstanceIds:
    - '{{InstanceId}}'
outputs:
  RootVolumeId:
    Selector: $.Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId
    Type: String


name: CreateSnapshot
action: aws:executeAwsApi
```

The user data section on the EC2 instance reinforces that the SSM agent is running:

```
sudo systemctl start amazon-ssm-agent
else
    sudo systemctl restart amazon-ssm-agent
fi
# Log the result for verification
sudo echo "SSM Agent_installation_status:" >> /tmp/ssm-install-log.txt
sudo systemctl status amazon-ssm-agent >> /tmp/ssm-install-log.txt
```

After finalizing the runbook, click **Create Runbook**. The document will appear under the "Owned by Me" tab in Systems Manager Documents.

![The image shows the AWS Systems Manager Documents interface, displaying a list of documents owned by Amazon, categorized by type and platform compatibility.](https://kodekloud.com/kk-media/image/upload/v1752859903/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-systems-manager-documents-interface.jpg)

## Executing the Automation Runbook

To execute the runbook, select **Execute Automation**. When prompted, provide the instance ID for the automation demo instance. The execution process includes:

- Verifying the current instance state.
- Stopping the instance.
- Waiting for the stop confirmation.
- Retrieving the root volume ID.
- Creating the snapshot.
- Restarting and verifying the instance.

![The image shows an AWS console interface displaying a list of EC2 instances with details such as instance ID, state, availability zone, and platform. One instance, labeled "SSM-Automation-Demo-Instance," is highlighted and marked as running.](https://kodekloud.com/kk-media/image/upload/v1752859904/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-ec2-instances-console-interface.jpg)

Monitor the automation's progress through the execution detail page:

![The image shows an AWS Systems Manager Automation execution detail page for a process named "StopSnapshotStartEC2Instance," displaying the execution status and steps, with all steps marked as successful except the last one, which is in progress.](https://kodekloud.com/kk-media/image/upload/v1752859905/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-systems-manager-automation-execution.jpg)

> [!important]
> **Note**
>
> This automation document showcases how to chain multiple steps—even calling additional documents—to efficiently manage EC2 instances. For complex workflows, advanced features like concurrency control and input parameter variations are available.

After successful execution, you can verify that the instance is running and a snapshot has been created for the EC2 root volume. In this demo, the snapshot for the 8 GB volume is approximately 1.65 GB and shows a completed status.

![The image shows an AWS EC2 dashboard displaying a list of snapshots, with one snapshot named "AutoSnapshot" highlighted. The snapshot details include its ID, size, and status.](https://kodekloud.com/kk-media/image/upload/v1752859906/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Creating-and-Executing-Automation-Runbooks/aws-ec2-dashboard-snapshots-autosnapshot.jpg)

## Complete YAML for the Automation Document

Below is the full YAML version of the automation document used in this lesson:

```
description: Stop an EC2 instance, create a snapshot, and start it again
schemaVersion: '0.3'
assumeRole: '{{AutomationAssumeRole}}'
parameters:
  instanceId:
    type: String
    description: The ID of the EC2 instance
    default: 'i-0a1b2c3d4e5f6g7h8'
  snapshotDescription:
    type: String
    description: A description for the snapshot
    default: ''
mainSteps:
  - action: CheckInstanceState
    name: CheckInstanceState
    inputs:
      InstanceId: '{{instanceId}}'
      Api: DescribeInstanceStatus
      IncludeAllInstances: true
  - action: StopInstance
    name: StopInstance
    inputs:
      InstanceId: '{{instanceId}}'
  - action: CreateSnapshot
    name: CreateSnapshot
    inputs:
      InstanceId: '{{instanceId}}'
      Description: '{{snapshotDescription}}'
  - action: WaitForInstanceStop
    name: WaitForInstanceStop
    inputs:
      InstanceId: '{{instanceId}}'
```

This lesson provides a detailed overview of using SSM Automation to manage EC2 configurations and snapshots. Though simple in this demo, automation documents can be extended to handle far more intricate scenarios.

Happy automating, and stay tuned for more lessons on advanced AWS management techniques!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/56881bdd-3a89-4506-8d9c-d59b9a22e303)**
>
> Watch video content
