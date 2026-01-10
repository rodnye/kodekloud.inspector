# Lambda Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Advanced-Topics/Lambda-Networking)

---

## Table of Contents

- Lambda Networking
  - Default Lambda Service VPC
  - Connecting to Private VPC Resources
  - Links and References
  - Watch Video
    - Option 1: Run Lambda in Your Private VPC
    - Option 2: Use an Interface VPC Endpoint

---

## Content

AWS Lambda

Advanced Topics

# Lambda Networking

Learn how AWS Lambda connects by default and explore strategies for accessing private VPC resources or enforcing stricter controls.

## Default Lambda Service VPC

When you create a Lambda function, AWS places it into a managed Virtual Private Cloud (VPC) called the Lambda service VPC. This isolated environment lets Lambda scale automatically without requiring your own VPC infrastructure.

![The image is a diagram illustrating AWS Lambda networking within a cloud environment, showing connections between Lambda functions, EC2 instances, and databases within Virtual Private Clouds (VPCs).](https://kodekloud.com/kk-media/image/upload/v1752863091/notes-assets/images/AWS-Lambda-Lambda-Networking/aws-lambda-networking-diagram-vpcs.jpg)

Key features of the default Lambda service VPC:

| Feature                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| Outbound Internet Access | Enabled by default for calling public endpoints.        |
| AWS Service Connectivity | Direct access to AWS APIs, governed by IAM permissions. |

> [!important]
> **Note**
>
> The default Lambda service VPC cannot communicate with resources in your private VPCs. Use one of the options below to reach EC2 instances, private databases, or to lock down internet access.

## Connecting to Private VPC Resources

To access private VPC resources or remove default internet access, choose one of these methods:

1.  Deploy Lambda inside your VPC.
2.  Use an interface VPC endpoint to bridge the AWS-managed VPC and your private VPC.

![The image illustrates a Lambda networking setup with two Virtual Private Clouds (VPCs) connected via an interface endpoint.](https://kodekloud.com/kk-media/image/upload/v1752863093/notes-assets/images/AWS-Lambda-Lambda-Networking/lambda-networking-vpcs-interface-endpoint.jpg)

### Option 1: Run Lambda in Your Private VPC

Attach your function to a custom VPC via the Lambda console:

1.  Open your function and scroll to **Advanced settings**.
2.  Choose your VPC, select subnets across Availability Zones, and assign security groups.
3.  Save to deploy the function inside your VPC.

![The image shows a screenshot of the "Advanced settings" section for configuring AWS Lambda networking options, including code signing, function URL, tags, and VPC settings.](https://kodekloud.com/kk-media/image/upload/v1752863094/notes-assets/images/AWS-Lambda-Lambda-Networking/aws-lambda-advanced-settings-screenshot.jpg)

Consider these trade-offs when running Lambda in a private VPC:

| Consideration         | Details                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| High Availability     | Use subnets in multiple AZs. A failure in one AZ affects only functions in that AZ.                             |
| Internet Connectivity | Private VPC functions lose default internet access. Deploy NAT gateways per AZ to restore outbound traffic.     |
| AWS Service Access    | VPC-deployed functions cannot reach AWS services without VPC endpoints.                                         |
| Additional Costs      | Expect charges for NAT gateways, interface endpoints, and Elastic Network Interfaces (ENIs).                    |
| ENI Limits            | Each concurrent execution creates an ENI. Reaching the ENI quota in your VPC or region caps Lambda concurrency. |

> [!important]
> **Warning**
>
> Be mindful of ENI limits: exceeding the Elastic Network Interface quota in your VPC will throttle new concurrent executions. Request a limit increase if necessary.

### Option 2: Use an Interface VPC Endpoint

Keep Lambda in the AWS-managed VPC and create an AWS Lambda interface endpoint in your private VPC. This approach offers:

- Secure, private connectivity to your VPC resources
- Continued internet and AWS service access managed by AWS
- No ENI-based concurrency constraints in your VPC
- A minimal hourly cost for the interface endpoint

To configure:

1.  Open the VPC console.
2.  Select **Endpoints** > **Create Endpoint**.
3.  Choose **AWS services** and pick **com.amazonaws.<region>.lambda**.
4.  Associate with your private subnets and security groups.
5.  Create the endpoint.

Once configured, Lambda functions can securely reach private resources without sacrificing internet access or hitting ENI concurrency limits.

## Links and References

- [AWS Lambda Networking Guide](https://docs.aws.amazon.com/lambda/latest/dg/configuration-network.html)
- [VPC Endpoints Overview](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)
- [NAT Gateway Setup](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/71600a46-a390-4f40-884f-7588445b5976/lesson/ce99a5c6-abd9-4ab2-8a00-26eca4eb595f)**
>
> Watch video content
