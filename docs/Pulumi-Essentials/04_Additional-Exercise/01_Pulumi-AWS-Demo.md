# Pulumi AWS Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Pulumi-Essentials/Additional-Exercise/Pulumi-AWS-Demo)

---

## Table of Contents

- Pulumi AWS Demo
  - Install Pulumi
  - Configure AWS Credentials
  - Initialize a New Pulumi Project
  - Pulumi YAML Configuration
  - Detailed Deployment Log
  - Deploy a Simple HTML Page to S3
  - Redeploy the Updated Project
  - Watch Video

---

## Content

Pulumi Essentials

Additional Exercise

# Pulumi AWS Demo

Welcome to the Pulumi AWS demo guide. This documentation provides step-by-step instructions on installing Pulumi, configuring AWS credentials, initializing a new Pulumi project using YAML, and deploying a simple HTML page via an S3 bucket. If you have any questions regarding various configurations, please note that reply lengths might be limited.

---

## Install Pulumi

To install Pulumi on your system, open your terminal and run the following command:

```
$ curl -fsSL https://get.pulumi.com | sh
```

Below is an example of the installation output you may see:

```
controlplane ~ curl -fsSL https://get.pulumi.com | sh
+ Upgrading Pulumi v3.72.2 to v3.72.2
+ Downloading https://get.pulumi.com/releases/sdk/pulumi-v3.72.2-linux-x64.tar.gz...
+ Total    * Received    % Xferd  Average Speed  Time      Time     Time  Current
                         Dload   Upload   Total   Spent    Left Speed
100 136M  100 136M    0     0   197M      0 --:--:-- --:--:-- --:--:-- 197M
+ Extracting to /root/pulumi/bin
=== Pulumi is now installed! ===
+ Get started with Pulumi: https://www.pulumi.com/docs/quickstart
controlplane ~ export AWS_ACCESS_KEY_ID=
```

---

## Configure AWS Credentials

Set your AWS credentials by exporting your AWS access key and secret key in your terminal:

```
export AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
```

Below is another complete sample session illustrating the Pulumi installation along with AWS credential export:

```
controlplane ~ % curl -fsSL https://get.pulumi.com | sh
+ Upgrading Pulumi to v3.72.2
+ Downloading https://get.pulumi.com/releases/sdk/pulumi-v3.72.2-linux-x64.tar.gz...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                  Dload   Upload   Total   Spent   Left  Speed
100  136M  100  136M    0     0  197M      0 --:--:-- --:--:-- --:--:-- 197M
+ Extracting to /root/.pulumi/bin


=== Pulumi is now installed! ===
+ Get started with Pulumi: https://www.pulumi.com/docs/quickstart
controlplane ~ % export AWS_ACCESS_KEY_ID=AKIAUKDIID0FAHDLZUQR
controlplane ~ % export AWS_SECRET_ACCESS_KEY=/AdLO962uQaA56sSYaelVLSXNRyWhxti+IdErin
controlplane ~ % export
```

---

## Initialize a New Pulumi Project

To begin your Pulumi project, create a new directory and initialize your project using the AWS YAML template:

```
$ mkdir quickstart && cd quickstart
$ pulumi new aws-yaml
```

The session below demonstrates environment variable exports and project initialization:

```
controlplane ~ export AWS_ACCESS_KEY_ID=AKIAUKDIIOFAAHDLZQR
controlplane ~ export AWS_SECRET_ACCESS_KEY=/Ad+LO962uQkA56sSYaleVLSXNRyWhxti+idEri
controlplane ~ export PULUMI_ACCESS_TOKEN=pul-c471c52451fb2638f64f6bbc8d8a9ffef1394c2
controlplane ~ mkdir quickstart && cd quickstart && pulumi new aws-yaml
Login using access token from PULUMI_ACCESS_TOKEN
Enter a value or press <ENTER> to accept the default.


project name: yaml_project
project description: (a minimal AWS Pulumi YAML program)
Created project 'yaml_project'


Please enter your desired stack.
To create a stack in an organization, use the format <org-name>/<stack-name> (e.g. 'acme/prod').
stack name: (dev)
Created stack 'dev'


aws:region: The AWS region to deploy into: (us-east-1)
Saved config


Your new project is ready to go!
To perform an initial deployment, run 'pulumi up'
```

---

## Pulumi YAML Configuration

Below is the Pulumi YAML configuration for the minimal AWS project. This configuration creates an S3 bucket and exports its name.

```
name: quickstart
runtime: yaml
description: A minimal AWS Pulumi YAML program


resources:
  # Create an AWS resource (S3 Bucket)
  my-bucket:
    type: aws:s3:Bucket


outputs:
  # Export the name of the bucket
  bucketName: ${my-bucket.id}
```

When running `pulumi up`, you will see a preview similar to the following:

```
$ pulumi up


Previewing update (dev):
    Type                              Name                 Plan
 +  pulumi:pulumi:Stack              quickstart-dev       create
 +  └─ aws:s3:Bucket                my-bucket           create


Resources:
    + 2 to create


Do you want to perform this update?
> yes
    no
    details
```

---

## Detailed Deployment Log

Below is an extended log from an update operation:

```
controlplane --> /quickstart > pulumi up
Previewing update (dev)


Downloading plugin: 161.68 MiB / 161.68 MiB [==============================] 100.00% 0s [resolution]
Installing plugin: aws-5.41.0
> pulumi:pulumi:Stack yaml_project-dev
  +  aws:s3:Bucket my-bucket
Outputs:
  bucketName: output<string>


Resources:
    + 2 to create


Do you want to perform this update? yes
View in Browser (Ctrl+0): https://app.pulumi.com/trungkodekloud/yaml_project-dev/updates/1/
Type   Name                      Status
pulumi:pulumi:Stack yaml_project-dev creating (0s)
```

And here is the final output once the update is complete:

```
Previewing update (dev):
    Type                                    Name                 Plan
 *  pulumi:pulumi:Stack                    quickstart-dev      create
 *  └─ aws:s3:Bucket                       my-bucket          create


Resources:
    + 2 to create


Do you want to perform this update?
> yes
    no
    details


Do you want to perform this update? yes
Updating (dev):
    Type                                    Name                 Status
 *  pulumi:pulumi:Stack                    quickstart-dev      created (4s)
 *  └─ aws:s3:Bucket                       my-bucket          created (2s)


Outputs:
    bucketName: "my-bucket-58ec361"
```

After deployment, you might see a summary similar to:

```
pulumi:Stack       yaml_project-dev
aws:s3:Bucket     my-bucket     create


Outputs:
    bucketName: "my-bucket-25423dc"


controlplane ~/quickstart ➔ clear
```

---

## Deploy a Simple HTML Page to S3

To serve a simple HTML page from S3, first create an HTML file:

```
echo '<html>
<body>
<h1>Hello, Pulumi!</h1>
</body>
</html>' > index.html
```

Next, update your Pulumi YAML configuration to include an S3 BucketObject for the HTML file. Here is the updated configuration:

```
name: quickstart
runtime: yaml
description: A minimal AWS Pulumi YAML program


resources:
  # Create an AWS resource (S3 Bucket)
  my-bucket:
    type: aws:s3:Bucket

  # Create an S3 Bucket object for index.html
  index.html:
    type: aws:s3:BucketObject
    properties:
      bucket: ${my-bucket.id}
      source: fn:fileAsset('./index.html')


outputs:
  # Export the name of the bucket
  bucketName: ${my-bucket.id}
```

You can verify the bucket deployment and the HTML file with the following commands:

```
controlPlane ~/quickstart * pulumi stack output bucketName
my-bucket-25423dc
```

To create or inspect your `index.html`, use these commands:

```
controlPlane ~/quickstart * echo '<html>
<body>
    <h1>Hello, Pulumi!</h1>
</body>
</html>' > index.html


controlPlane ~/quickstart * ls
index.html  Pulumi.dev.yaml  Pulumi.yaml


controlPlane ~/quickstart * cat index.html
<html>
<body>
    <h1>Hello, Pulumi!</h1>
</body>
</html>
```

If you need to modify the configuration, your `Pulumi.yaml` might look like one of the following:

Without the HTML object:

```
# Export the name of the bucket
bucketName: ${my-bucket.id}
resources:
  # Create an AWS resource (S3 Bucket)
  my-bucket:
    type: aws:s3:Bucket
```

Or, with the HTML bucket object:

```
resources:
  # Create an AWS resource (S3 Bucket)
  my-bucket:
    type: aws:s3:Bucket


  # Create an S3 Bucket object for index.html
  index.html:
    type: aws:s3:BucketObject
    properties:
      bucket: ${my-bucket.id}
      source: fn:fileAsset("./index.html")


outputs:
  # Export the name of the bucket
  bucketName: ${my-bucket.id}
```

---

## Redeploy the Updated Project

After updating your configuration and HTML file, redeploy your project with the following commands:

```
controlplane ~/quickstart $ cat index.html
<html>
<body>Hello, Pulumi!</body>
</html>


controlplane ~/quickstart $ vi Pulumi.yaml
controlplane ~/quickstart $ pulumi up
Please choose a stack, or create a new one: dev
Previewing update (dev)


View in Browser (Ctrl+L): https://app.pulumi.com/trungkodekloud/quickstart/dev/preview
Type                 Name                   Plan
pulumi:pulumi:Stack  quickstart-dev        create
aws:s3:Bucket      my-bucket             create
aws:s3:BucketObject index.html            create


Outputs:
    bucketName: output<string>


Resources:
    + 3 to create


Do you want to perform this update? yes
View in Browser (Ctrl+L): https://app.pulumi.com/trungkodekloud/quickstart/dev/updates/1
type                 name                   status
pulumi:pulumi:Stack  quickstart-dev        creating (0s)
```

Once the deployment is complete, verify the contents of the S3 bucket by running:

```
$ aws s3 ls $(pulumi stack output bucketName)
```

A potential output might be:

```
2023-04-20 17:01:86      118 index.html
```

Finally, list all S3 buckets to confirm the deployment:

```
controlplane ~/quickstart * aws s3 ls
```

---

> [!important]
> **Additional Information**
>
> For more details on Pulumi and AWS integration, visit the [Pulumi Documentation](https://www.pulumi.com/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pulumi-essentials/module/ea00d2be-be1c-4d36-8ac2-e76b0438de84/lesson/3dbe612a-a69c-4459-aeb1-43bc2219cb0d)**
>
> Watch video content
