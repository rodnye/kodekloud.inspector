# AWS CloudFormation Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/AWS-CloudFormation-Demo)

---

## Table of Contents

- AWS CloudFormation Demo
  - Defining Resources
  - Adding a Security Group
  - Associating the Security Group with the EC2 Instance
  - Introducing Parameters
  - Defining Outputs
  - Deploying the CloudFormation Stack
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# AWS CloudFormation Demo

In this lesson, you'll learn how to work with AWS CloudFormation by deploying an EC2 instance using a YAML template. CloudFormation supports both YAML and JSON formats, but we will use YAML for this example.

We will create a file named "stack.yaml" to define a CloudFormation stack that deploys an EC2 instance along with a security group. The template is organized into several sections: Parameters, Resources, and Outputs.

---

## Defining Resources

Under the Resources section, you define all the resources to be deployed by CloudFormation. In our example, we create an EC2 instance named "Ec2Instance." The resource type is specified using the AWS resource type identifier, in this case `AWS::EC2::Instance`.

Below is an example snippet that demonstrates how to define an EC2 instance resource:

```
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
```

For the correct resource type and its properties, refer to the [AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-instance.html) under the EC2 Basics section. Below is a portion of the documentation example for an EC2 instance:

```
Type: AWS::EC2::Instance
Properties:
  AdditionalInfo: String
  Affinity: String
  AvailabilityZone: String
  BlockDeviceMappings:
    - BlockDeviceMapping
  CpuOptions:
    CpuOptions:
  CreditSpecification:
    CreditSpecification:
  DisableApiTermination: Boolean
  EbsOptimized: Boolean
  ElasticGpuSpecifications:
    - ElasticGpuSpecification:
  ElasticInferenceAccelerators:
    - ElasticInferenceAccelerator:
  EnclaveOptions:
    EnclaveOptions:
  HibernationOptions:
    HibernationOptions:
  IamInstanceProfile: String
  ImageId: String
  InstanceInitiatedShutdownBehavior: String
  InstanceType: String
  KeyName: String
  Monitoring: Boolean
  NetworkInterfaces:
    - NetworkInterface:
  PlacementTenancy: String
  PrivateIpAddress: String
  SecurityGroupIds:
    - String
  SecurityGroups:
    - String
  SsmAssociations:
    - SsmAssociation:
  Tags:
    - Tag
  Tenancy: String
  UserData: String
  Volumes:
    - Volume
```

After defining the resource type, specify its configuration in the Properties field. For example, to set the Amazon Machine Image (AMI) ID and key pair, you can use the following configuration:

```
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-041feb57c611358bd
      KeyName: main
      Tags:
        - Key: Name
          Value: myEc2Instance
```

> [!important]
> **Note**
>
> When choosing an AMI, navigate to the EC2 console, launch a new instance, select the desired image, and then copy its AMI ID.

![The image shows a webpage from the AWS documentation, specifically detailing the properties and syntax for an EC2 instance. The page includes a list of attributes such as `ImageId`, `InstanceType`, and `KeyName`.](https://kodekloud.com/kk-media/image/upload/v1752858114/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-ec2-instance-properties-syntax.jpg)

![The image shows the AWS EC2 console interface for launching a new instance, with options to select the instance name, Amazon Machine Image (AMI), and instance type. The summary section on the right provides details about the selected configuration.](https://kodekloud.com/kk-media/image/upload/v1752858115/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-ec2-launch-instance-console.jpg)

---

## Adding a Security Group

Next, add a security group resource to control access to your EC2 instance. Under the Resources section, create a new resource called "InstanceSecurityGroup" with the type `AWS::EC2::SecurityGroup`. Configure the Properties with a group description and ingress rules. For example, to allow SSH access on TCP port 22:

```
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-041feb57c611358bd
      KeyName: main
      Tags:
        - Key: Name
          Value: myEc2Instance
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
```

If you need to allow a range of ports (for example, from 1009 to 2000), adjust the FromPort and ToPort values accordingly.

---

## Associating the Security Group with the EC2 Instance

To automatically associate the security group with your EC2 instance, include the SecurityGroups property in the EC2 instance configuration. Use CloudFormation's intrinsic function `!Ref` to reference the security group defined in the same template:

```
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      ImageId: ami-041feb57c611358bd
      KeyName: main
      Tags:
        - Key: Name
          Value: myEc2Instance
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
```

---

## Introducing Parameters

CloudFormation allows you to make the template dynamic by using input parameters. For instance, if you want the user to specify a name for the EC2 instance, define a Parameters section:

```
Parameters:
  Ec2Name:
    Type: String
```

Then modify the EC2 instance to use this parameter for its tag:

```
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      ImageId: ami-041feb57c611358bd
      KeyName: main
      Tags:
        - Key: Name
          Value: !Ref Ec2Name
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
```

Similarly, you can add a parameter for the key pair. Use the following configuration to define a parameter with a dropdown populated by available key pairs:

```
Parameters:
  KeyName:
    Description: The EC2 key pair
    Type: AWS::EC2::KeyPair::KeyName
  Ec2Name:
    Type: String
Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      ImageId: ami-041feb57c611358bd
      KeyName: !Ref KeyName
      Tags:
        - Key: Name
          Value: !Ref Ec2Name
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
```

---

## Defining Outputs

Outputs enable you to extract data from your deployed resources. In this example, the public IP address of the EC2 instance is output so you can easily reference it after deployment:

```
Outputs:
  PublicIp:
    Description: Server Public IP
    Value: !GetAtt Ec2Instance.PublicIp
```

The `!GetAtt` function retrieves attributes—for example, the PublicIp—from the specified resource.

Below is the complete CloudFormation template that combines all the elements discussed:

```
Parameters:
  KeyName:
    Description: The EC2 key pair
    Type: AWS::EC2::KeyPair::KeyName
  Ec2Name:
    Type: String

Resources:
  Ec2Instance:
    Type: AWS::EC2::Instance
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      ImageId: ami-041feb57c611358bd
      KeyName: !Ref KeyName
      Tags:
        - Key: Name
          Value: !Ref Ec2Name
  InstanceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0

Outputs:
  PublicIp:
    Description: Server Public IP
    Value: !GetAtt Ec2Instance.PublicIp
```

---

## Deploying the CloudFormation Stack

Once your template is ready, follow these steps to deploy it using the AWS CloudFormation console:

1.  Open the CloudFormation service in the AWS console.
2.  Click on "Create stack" and select "Upload a template file."
3.  Choose your "stack.yaml" file and click "Next."

![The image shows the AWS CloudFormation interface for creating a stack, where users can prepare and specify a template by uploading a file or using an Amazon S3 URL.](https://kodekloud.com/kk-media/image/upload/v1752858116/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-cloudformation-stack-template-interface.jpg)

4.  Enter a stack name (e.g., "my-deployment"). The template’s parameters will be displayed. Provide the EC2 instance name (for example, "this is the server") and select your key pair from the dropdown.
5.  Click "Next" to configure stack options such as tags, permissions, and rollback options. You can leave these options blank if they are not required.

![The image shows the AWS CloudFormation console, specifically the "Configure stack options" page, where users can add tags, set permissions, and choose stack failure options.](https://kodekloud.com/kk-media/image/upload/v1752858118/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-cloudformation-configure-stack-options.jpg)

6.  Review your configuration and click "Submit" to deploy the stack.

After deployment, the CloudFormation console will display a "CREATE_COMPLETE" status along with a series of events that detail the creation of resources, such as the EC2 instance and security group.

![The image shows an AWS CloudFormation console with a list of stack events for "my-deployment," indicating various statuses like "CREATE_COMPLETE" and "CREATE_IN_PROGRESS."](https://kodekloud.com/kk-media/image/upload/v1752858119/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-cloudformation-my-deployment-events.jpg)

Once the stack is created, you can inspect the deployed resources by clicking on them. The Outputs section will display the public IP address of your EC2 instance, which you can use to access your server.

If you need to update the stack, select the stack in the CloudFormation console and choose the "Update" option. The console allows you to upload a modified template or select an alternative source.

![The image shows an AWS CloudFormation interface for updating a stack, with options to prepare and specify a template using an Amazon S3 URL or by uploading a file.](https://kodekloud.com/kk-media/image/upload/v1752858120/notes-assets/images/AWS-Certified-Developer-Associate-AWS-CloudFormation-Demo/aws-cloudformation-update-stack-interface.jpg)

To delete the stack, simply select it in the CloudFormation console and choose "Delete."

---

This concludes the demo on working with AWS CloudFormation. By leveraging CloudFormation, you can automate the provisioning of AWS infrastructure consistently and efficiently. Happy deploying, and explore additional configurations and features to further enhance your AWS environment!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/af7d1a60-221d-47d4-a1fe-ac6e1fd7758a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/36f6cfdf-3c01-4b39-b78e-dfae926c5420)**
>
> Practice lab
