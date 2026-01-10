# Importing Pulumi S3 bucket - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Pulumi-Essentials/Pulumi-Essentials/Importing-Pulumi-S3-bucket)

---

## Table of Contents

- Importing Pulumi S3 bucket
  - Example: Creating an S3 Bucket with Pulumi
  - Deploying the Pulumi Configuration
  - Re-running the Deployment
  - Summary
  - Watch Video
    - Deployment Output

---

## Content

Pulumi Essentials

Pulumi Essentials

# Importing Pulumi S3 bucket

In this lesson, you'll learn how to create and manage an AWS S3 bucket using Pulumi's AWS library with Python. The example below demonstrates the basic structure of a Pulumi program that imports necessary libraries, creates an S3 bucket, and exports its identifier.

> [!important]
> **Overview**
>
> This guide covers the process of defining, deploying, and managing an S3 bucket using Pulumi's Infrastructure as Code approach.

## Example: Creating an S3 Bucket with Pulumi

Below is the initial Python code that imports Pulumi alongside the AWS S3 library, creates an S3 bucket (named internally as "my-bucket"), and exports the bucket's ID:

```
"""An AWS Python Pulumi program"""

import pulumi
from pulumi_aws import s3

# Create an AWS resource (S3 Bucket)
bucket = s3.Bucket('my-bucket')

# Export the name of the bucket
pulumi.export('bucket_name', bucket.id)
```

When you run this program, Pulumi deploys an S3 bucket with a name based on the internal identifier "my-bucket". AWS will append a unique suffix to ensure the bucket name's uniqueness.

## Deploying the Pulumi Configuration

To deploy the infrastructure defined in your Python code, run the following command in your terminal:

```
pulumi up
```

During the deployment process, Pulumi inspects your configuration and provides a preview of the changes. The output might look similar to this:

```
Using cached attrs-23.1.0-py3-none-any.whl (61 kB)
Collecting typing-extensions (from parver>=0.2.1->pulumi-aws<6.0.0,>=5.0.0->-r requirements.txt (line 2))
Using cached typing_extensions-4.6.2-py3-none-any.whl (31 kB)
Installing collected packages: arpeggio, typing-extensions, six, semver, pyyaml, protobuf, grpcio, dill, attrs, pulumi, parver, pulumi-aws
Successfully installed arpeggio-2.0.0 attrs-23.1.0 dill-0.3.6 grpcio-1.51.3 parver-0.4 protobuf-4.23.2 pulumi-3.68.0 pulumi-aws-5.41.0 pyyaml-6.0 semver-2.13.0 six-1.16.0 typing-extensions-4.6.2
Finished installing dependencies
Finished installing dependencies

Your new project is ready to go!

To perform an initial deployment, run `pulumi up`
```

When prompted, Pulumi will display the resources that are about to be created. For a new project, it will show that two resources are scheduled for creation, as demonstrated below:

```
C:\Users\sanje\Documents\scratch\pulumi-demo>pulumi up
Previewing update (dev)

View in Browser (Ctrl+O): https://app.pulumi.com/YourUserName/pulumi-demo/dev/previews/1132dcb8-db60
Type:          pulumi:pulumi:Stack  pulumi-demo-dev
               └── aws:s3:Bucket   my-bucket
Outputs:
  bucket_name: output<string>

Resources:
    + 2 to create

Do you want to perform this update? [Use arrows to move, type to filter]
 yes
> no
```

Upon confirming by selecting "yes," Pulumi proceeds to create the stack and deploy the specified resources. The S3 bucket is assigned a unique name (e.g., "my-bucket-5d138fe") during creation.

### Deployment Output

After deploying, your terminal will display detailed output similar to the snippet below:

```
[urn=urn:pulumi:dev:pulumi-demo:aws:s3/bucket:Bucket::my-bucket]
[provider=urn:pulumi:dev:pulumi-demo:pulumi:providers:aws::default_5_41_0::04ada6b54-80e4-46f7-96ec-b56ff0331ba9]
acl            : "private"
bucket         : "my-bucket-a45f21d"
forceDestroy   : false
--outputs--
bucket_name    : output<string>
Do you want to perform this update? yes
Updating (dev)
View in Browser (Ctrl+O): https://app.pulumi.com/YourUserName/pulumi-demo/dev/updates/1
Type:
+ pulumi:pulumi:Stack      pulumi-demo-dev
  └─ aws:s3:Bucket        my-bucket
Outputs:
  bucket_name: "my-bucket-5d138fe"
Resources:
  + 2 created
Duration: 4s
C:\Users\sanje\Documents\scratch\pulumi-demo>
```

You can verify the creation of the S3 bucket directly in the AWS console. Although the Pulumi configuration uses the internal name "my-bucket," AWS assigns the bucket a unique name that includes an automatically generated suffix.

## Re-running the Deployment

If you run `pulumi up` with the identical configuration:

```
import pulumi
from pulumi_aws import s3

# Create an AWS resource (S3 Bucket)
bucket = s3.Bucket('my-bucket')

# Export the name of the bucket
pulumi.export('bucket_name', bucket.id)
```

and then execute:

```
pulumi up
```

Pulumi compares the current configuration with the deployed infrastructure. If no changes are detected, you will see output indicating that the resources are unchanged:

```
Type                  Name                Plan
pulumi:pulumi:Stack   pulumi-demo-dev     2 unchanged

Do you want to perform this update? no
confirmation declined, not proceeding with the update
```

> [!important]
> **Key Takeaway**
>
> Pulumi enforces that the deployed infrastructure always aligns with the configuration declared in your code, updating resources only when discrepancies occur.

## Summary

This lesson demonstrated the process of creating, deploying, and managing an AWS S3 bucket using Pulumi and Python. By continuously running `pulumi up`, you ensure that your infrastructure remains consistent with the defined configuration. This approach provides a robust example of Infrastructure as Code, helping prevent the accidental creation of duplicate resources.

For further reading on managing cloud infrastructure with Pulumi, be sure to explore the [Pulumi Documentation](https://www.pulumi.com/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pulumi-essentials/module/883d8d6f-c8be-44af-ac4d-ba0835d32f5d/lesson/4e991c27-8737-48e5-a28c-85adc8f1f8df)**
>
> Watch video content
