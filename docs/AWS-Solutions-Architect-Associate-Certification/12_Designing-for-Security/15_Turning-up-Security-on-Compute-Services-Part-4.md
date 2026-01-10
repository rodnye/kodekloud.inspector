# Turning up Security on Compute Services Part 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-4)

---

## Table of Contents

- Turning up Security on Compute Services Part 4
  - Access and IAM Integration in EKS
  - OIDC Integration with IAM
  - IAM Integration and Role Assignments in EKS
  - Node Types and Security Responsibilities
  - Logging, Monitoring, and Data Protection
  - Multi-Tenancy in EKS
  - Network Security and Policies
  - In-Transit Data Encryption with Service Mesh
  - CSI Drivers and Storage Encryption
  - Comprehensive Cluster Architecture
  - Conclusion
  - Watch Video
    - Cluster IAM Roles
    - Node IAM Roles
    - Pod Execution Roles
    - IAM Connector Role
    - Logging and Auditing
    - Data Protection
    - Persistent Storage with CSI Drivers

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 4

In this lesson, we continue our exploration of container security on AWS by focusing on the Elastic Kubernetes Service (EKS). In this article, we discuss secure access and management of EKS, covering key mechanisms for identity, access, and network security within your cluster.

---

## Access and IAM Integration in EKS

Establishing a trust relationship between your Kubernetes cluster and AWS IAM is a critical challenge when accessing EKS. Historically, pods acquired permissions via service accounts annotated with roles. Today, emerging pod identity services allow you to assign an IAM role directly to a pod, eliminating the need to manage separate service roles for each containerized application. Although this new approach may eventually appear on certification exams, we focus on the established method for now.

For secure interactions with AWS, the entire cluster must trust IAM. To achieve this, you create a trust policy between the cluster and AWS IAM and assign specific permissions to the cluster (often with administrative privileges for infrastructure tasks) as well as to individual pods (with the minimum required privileges). When a pod needs to access AWS services (for example, S3), it presents a JSON Web Token (JWT) along with its role information. The Secure Token Service (STS), an integral component of IAM, validates the pod’s credentials before issuing temporary access keys.

Consider the flow below that illustrates how a pod uses its JWT and role information to acquire temporary credentials from STS:

![The image is a flowchart explaining how to access AWS Elastic Kubernetes Service (EKS) using IAM roles and JWT tokens. It outlines the process of authenticating and issuing temporary credentials for accessing S3 buckets.](https://kodekloud.com/kk-media/image/upload/v1752864091/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/aws-eks-access-flowchart.jpg)

Once the cluster establishes trust with IAM, the pod (using its service account and JWT token) sends its credentials to STS. After validation against IAM policies, temporary credentials are issued to grant access to the required AWS resource.

---

## OIDC Integration with IAM

Global retail companies deploying applications on EKS can enhance security and simplify role management by integrating an OpenID Connect (OIDC) identity provider with AWS IAM. By registering your Kubernetes cluster as an OIDC identity provider in IAM, you can associate specific IAM roles with service accounts, which in turn are attached to pods and other Kubernetes resources.

The typical process involves:

- Enabling OIDC for the EKS cluster.
- Providing the cluster’s URL during IAM OIDC provider creation, which allows automatic discovery of necessary details.

![The image presents a scenario where a global retail company is integrating OpenID Connect (OIDC) with IAM for their Amazon EKS cluster, listing four potential steps for successful integration. The options include creating an OIDC provider, enabling OIDC for the cluster, using AWS SSO, and directly associating IAM roles.](https://kodekloud.com/kk-media/image/upload/v1752864092/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/oidc-integration-amazon-eks-steps.jpg)

Other alternatives, such as AWS Single Sign-On (SSO) or directly associating IAM roles with nodes, may not be as secure. While AWS is moving toward direct pod-level IAM associations with the Pod Identity Service, the current best practice is to use Kubernetes service accounts to map roles.

---

## IAM Integration and Role Assignments in EKS

Proper IAM integration involves several distinct role assignments that work collectively to secure your EKS environment. Below is a summary of the key roles and their responsibilities:

| Role Type           | Description                                                                                                                  | Example Use Case                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Cluster IAM Roles   | Grant the control plane permissions for managing AWS resources like EC2 instances and ELBs.                                  | Enabling the control plane to manage auto-scaling and network tasks.  |
| Node IAM Roles      | Allow worker nodes (typically EC2 instances) to register with the control plane and access services like ECR and CloudWatch. | Pulling container images and logging activities.                      |
| Pod Execution Roles | Enable individual pods to assume IAM roles independently from the worker node’s role.                                        | Providing limited AWS access for specific containerized applications. |
| IAM Connector Role  | Bridge Kubernetes RBAC and AWS IAM to allow management of the cluster through the AWS Management Console.                    | Integrated visual management from the AWS Console.                    |

### Cluster IAM Roles

Before creating an EKS cluster, assign an IAM role that includes the Amazon EKS cluster policy. This role enables the control plane (e.g., cloud controllers) to interact with AWS resources such as EC2 instances and Elastic Load Balancers. For instance, if new EC2 instances are launched to host additional containers, the cluster role must have the appropriate permissions to manage these resources.

![The image is a question about essential permissions for an Amazon EKS cluster IAM role, with four options related to managing AWS resources and user access.](https://kodekloud.com/kk-media/image/upload/v1752864093/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/eks-cluster-iam-role-permissions.jpg)

### Node IAM Roles

Worker nodes (typically EC2 instances in your EKS cluster) require an IAM role for registration with the control plane as well as to access other AWS services—such as ECR for pulling container images and CloudWatch for logging. These roles should be precisely scoped to allow only the required permissions.

![The image describes a scenario where a retail company is deploying a microservices application on Amazon EKS, requiring an IAM role for worker nodes. It lists four potential permissions for the Amazon EKS node IAM role to function correctly.](https://kodekloud.com/kk-media/image/upload/v1752864095/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/retail-microservices-eks-iam-role.jpg)

### Pod Execution Roles

The pod execution role allows individual pods to assume an IAM role and access AWS services independently of the worker node’s role. Even though advances such as the Pod Identity Service are changing the landscape, understanding pod execution roles remains important.

![The image presents a scenario about a healthcare company deploying an application on Amazon EKS, focusing on the Pod Execution Role. It lists four statements to determine which best describes the role's use in an EKS environment.](https://kodekloud.com/kk-media/image/upload/v1752864096/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/healthcare-application-amazon-eks-pod-role.jpg)

### IAM Connector Role

The IAM connector role integrates the Kubernetes RBAC system with AWS IAM, allowing the Kubernetes cluster to be managed and monitored via the AWS Management Console. This role is essential for achieving seamless visual management.

![The image presents a scenario about a global retail company using Amazon EKS and explores the purpose of the IAM connector role, offering four options for its use in an EKS environment.](https://kodekloud.com/kk-media/image/upload/v1752864098/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/global-retail-amazon-eks-iam-role.jpg)

> [!important]
> **Note**
>
> These distinct roles—cluster, node, pod execution, and connector—work together to ensure your Kubernetes workloads have necessary permissions while maintaining robust security boundaries.

---

## Node Types and Security Responsibilities

When deploying EKS, you must choose the appropriate type of worker nodes depending on your administrative preferences and security requirements:

- **Self-Managed Nodes:** You have full control over compliance, patching, and security updates, but this control increases administrative overhead.
- **Managed Node Groups:** AWS automatically applies operating system security patches and supports features like auto-scaling, reducing management effort.
- **Fargate Pods:** AWS manages the underlying operating system entirely, further reducing your security responsibilities.

![The image is a diagram comparing responsibilities between AWS and customers for self-managed workers and managed node groups in a Kubernetes environment. It uses color coding to differentiate between AWS and customer responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752864099/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/aws-customers-kubernetes-responsibilities-diagram.jpg)

For most deployments—especially those focused on reducing management overhead while maintaining security—managed node groups offer an attractive option.

Consider a scenario where a healthcare company opts for managed node groups to benefit from automated security patching and compliance alignment—a key advantage in highly regulated environments.

Conversely, self-managed nodes offer the flexibility needed for applications that require custom compliance configurations, albeit at the cost of increased management.

![The image outlines considerations for using self-managed nodes with Amazon EKS, highlighting aspects like automatic registration, control over EC2 instances, integration limitations, and AWS backup solutions.](https://kodekloud.com/kk-media/image/upload/v1752864100/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/self-managed-nodes-amazon-eks-considerations.jpg)

---

## Logging, Monitoring, and Data Protection

### Logging and Auditing

Regulatory compliance and security best practices require detailed logging of all control plane activities. For EKS environments, consider the following steps:

- Enable logging for the API server, controller manager, and scheduler.
- Configure CloudWatch Logs to capture these events, simplifying auditing and monitoring.

![The image outlines steps for a financial institution to ensure detailed logging in an Amazon EKS cluster, including enabling CloudWatch Logs, AWS X-Ray, configuring AWS Lambda, and using Amazon Kinesis with QuickSight.](https://kodekloud.com/kk-media/image/upload/v1752864102/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/financial-institution-eks-logging-steps.jpg)

### Data Protection

To secure data both in transit and at rest:

- Integrate with AWS Key Management Service (KMS) to encrypt Kubernetes secrets.
- Configure your storage class with the encrypted parameter set to true for EBS volumes.
- Use encrypted EFS configurations for secure shared file storage.

![The image presents a scenario where an e-commerce company plans to deploy microservices on Amazon EKS and seeks to ensure data encryption. It lists four steps for encrypting data within EKS, including using AWS KMS, manual encryption, AWS Certificate Manager, and enabling EC2 instance encryption.](https://kodekloud.com/kk-media/image/upload/v1752864103/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/ecommerce-microservices-eks-encryption.jpg)

> [!important]
> **Warning**
>
> Without KMS integration, Kubernetes secrets are simply base64 encoded and do not provide true encryption—ensuring proper encryption is critical for protecting sensitive data.

### Persistent Storage with CSI Drivers

For containerized storage:

- **EBS Volumes:** Use the EBS CSI driver with your Storage Class defined to enable encryption by default when persistent volumes are dynamically provisioned.

  ![The image presents a scenario where a global finance company is deploying an application on Amazon EKS and needs to ensure data-at-rest encryption on EBS volumes. It lists four steps the company could take to achieve this encryption.](https://kodekloud.com/kk-media/image/upload/v1752864104/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864104/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-eks-ebs-encryption-steps.jpg)

- **EFS:** Ensure storage classes or PersistentVolume definitions are configured to enforce data encryption.
- **FSx for Lustre or OpenZFS:** Although many FSx solutions are encrypted by default, review the CSI driver configuration to confirm proper encryption parameters.

![The image is a diagram illustrating the integration of Amazon EMR on EKS with FSx for Lustre, showing the workflow from a developer submitting a Spark job to the dynamic provisioning of a Lustre filesystem, with components like Kubernetes Scheduler and Persistent Volume Claims.](https://kodekloud.com/kk-media/image/upload/v1752864105/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864105/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-emr-eks-fsx-lustre-diagram.jpg)

---

## Multi-Tenancy in EKS

Kubernetes is not inherently multi-tenant because its control plane is shared by all workloads. However, you can simulate a multi-tenant environment by:

- Separating workloads using Kubernetes namespaces.
- Implementing role-based access control (RBAC) to isolate tenant resources.
- Applying resource quotas and limit ranges to manage resource consumption effectively.

![The image is a diagram illustrating a multi-tenancy architecture using Elastic Kubernetes Service, showing how different tenants interact with a SaaS application through namespaces, microservices, and DynamoDB tables. It includes components like IAM roles, ingress resources, and AWS deployment tools.](https://kodekloud.com/kk-media/image/upload/v1752864106/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/multi-tenancy-architecture-eks-diagram.jpg)

For enhanced security in multi-tenancy, it is recommended to use a single cluster with logically isolated namespaces combined with strict RBAC controls rather than operating multiple clusters or segregating by instance type.

![The image presents a scenario where a software company is considering different approaches to achieve secure multi-tenancy in Amazon EKS clusters, listing four options for implementation.](https://kodekloud.com/kk-media/image/upload/v1752864108/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/secure-multi-tenancy-amazon-eks-options.jpg)

---

## Network Security and Policies

By default, Kubernetes allows all pod-to-pod communication within the cluster. To enforce restricted network boundaries, consider the following best practices:

- Leverage the Amazon VPC Container Network Interface (CNI) plugin that assigns each pod its own IP address.
- Implement Kubernetes Network Policies to limit both inbound and outbound communications between pods.

![The image shows a configuration screen for Amazon VPC CNI within the Elastic Kubernetes Service, focusing on network security and policy settings. It includes options for selecting versions, IAM roles, and configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752864109/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-vpc-cni-eks-configuration.jpg)

For example, if fine-grained pod-level network restrictions are required, use the VPC CNI integration which allows security groups to be associated with pod ENIs:

![The image is a diagram illustrating network security groups within an Elastic Kubernetes Service (EKS) setup, showing IP addresses and ENI configurations.](https://kodekloud.com/kk-media/image/upload/v1752864110/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/network-security-groups-eks-diagram.jpg)

When designing your network controls:

- Avoid assigning individual security groups directly to each pod (this is not yet the norm).
- Instead, group pods by namespace and combine Kubernetes Network Policies with VPC-level security groups.

![The image presents a scenario where an e-commerce company is deploying a microservices-based application on Amazon EKS and is considering using Security Groups for pod-level network policies. It lists four approaches for implementing these policies.](https://kodekloud.com/kk-media/image/upload/v1752864112/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/ecommerce-microservices-eks-security-groups.jpg)

---

## In-Transit Data Encryption with Service Mesh

To secure data in transit between services, many organizations deploy a service mesh. AWS App Mesh is one solution that implements mutual TLS (mTLS) for secure service-to-service communication within EKS. Sidecar proxies, such as Envoy, handle encryption seamlessly and protect all intra-cluster traffic without requiring significant changes to your application configurations.

![The image is a diagram illustrating an Elastic Kubernetes Service setup with a service mesh for encryption, showing two VPCs (A and B) connected via VPC peering, each containing various components like envoy, yelb-ui, yelb-appserver, redis, and postgres.](https://kodekloud.com/kk-media/image/upload/v1752864113/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/elastic-kubernetes-service-diagram.jpg)

When configuring a service mesh:

- Enable AWS App Mesh and set up mTLS across all services.
- Avoid deploying without TLS support; relying solely on EKS-level encryption may not offer comprehensive protection.

![The image presents a scenario where a financial institution is considering service mesh solutions for end-to-end encryption on Amazon EKS. It lists four options, including using AWS App Mesh with mTLS and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752864114/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/service-mesh-encryption-aws-eks.jpg)

For applications with high throughput and low latency requirements:

- Use an Application Load Balancer (ALB) with the ALB Ingress Controller for standard HTTP/HTTPS traffic with intelligent routing.
- For ultra-high throughput and minimal overhead, consider a Network Load Balancer (NLB), though ALB is generally recommended for its advanced routing capabilities.

![The image is a diagram illustrating the architecture of an Elastic Kubernetes Service (EKS) with encryption, ingress controllers, and load balancers. It shows the flow from an API server to nodes and pods, detailing the use of application load balancers and target groups.](https://kodekloud.com/kk-media/image/upload/v1752864115/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/eks-architecture-diagram-encryption-load-balancers.jpg)

For example, a global retail company using ALB can benefit from the automatic provisioning of the ALB Ingress Controller, which directs traffic efficiently to the correct pods.

---

## CSI Drivers and Storage Encryption

When working with Container Storage Interface (CSI) drivers for persistent storage, consider the following best practices:

- **EBS Volumes:**  
  Ensure your Storage Class is defined with encryption enabled. The EBS CSI driver will provision encrypted volumes when the encrypted parameter is set to true.

  ![The image presents a scenario where a global finance company is deploying an application on Amazon EKS and needs to ensure data-at-rest encryption on EBS volumes. It lists four steps the company could take to achieve this encryption.](https://kodekloud.com/kk-media/image/upload/v1752864104/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864104/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-eks-ebs-encryption-steps.jpg)

- **EFS:**  
  Configure the Storage Class or PersistentVolume definitions to require encryption for shared file systems.
- **FSx for Lustre or OpenZFS:**  
  Although many FSx solutions are encrypted by default, verify the CSI driver configuration to ensure encryption settings are correctly specified.

![The image is a diagram illustrating the integration of Amazon EMR on EKS with FSx for Lustre, showing the workflow from a developer submitting a Spark job to the dynamic provisioning of a Lustre filesystem, with components like Kubernetes Scheduler and Persistent Volume Claims.](https://kodekloud.com/kk-media/image/upload/v1752864105/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864105/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-emr-eks-fsx-lustre-diagram.jpg)

---

## Comprehensive Cluster Architecture

Review the following comprehensive diagram that combines all of the discussed components—EKS, its control plane, worker nodes, associated AWS services (like load balancers, databases, and storage), and various security and networking configurations. Key aspects include:

- Deployment across multiple Availability Zones with both public and private subnets.
- An EKS control plane and nodes with designated IAM roles.
- Integration with essential components like load balancers, NAT gateways, endpoints, and AWS services such as S3, SES, and CloudTrail.
- Inclusion of security services like AWS Config, Systems Manager, and Certificate Manager.

![The image is a diagram illustrating the architecture of an AWS Elastic Kubernetes Service (EKS) setup, showing the interaction between on-premises networks, the internet, and AWS components like EC2 instances and Fargate pods. It highlights how node options in EKS affect security responsibilities.](https://kodekloud.com/kk-media/image/upload/v1752864117/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/amazon-eks-architecture-diagram.jpg)

This integrated architecture demonstrates the layered security and scalability provided by EKS. A multinational corporation evaluating EKS versus self-hosted Kubernetes will note several advantages:

1.  Automatic patching and management of the control plane.
2.  Native integrations with CloudWatch, IAM, and VPCs for enhanced security and operational simplicity.

![The image presents a scenario where a corporation is evaluating Amazon Elastic Kubernetes Service (EKS) against self-hosted Kubernetes, highlighting potential advantages in security, scalability, and management. It lists five statements, asking which two are primary advantages of using EKS.](https://kodekloud.com/kk-media/image/upload/v1752864118/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-4/eks-vs-self-hosted-kubernetes.jpg)

---

## Conclusion

In this lesson, we covered the following key topics:

- The evolution of pod identity in EKS and the role of Secure Token Service (STS).
- Best practices for IAM integration for clusters, nodes, pods, and the connector role.
- Options for managing worker nodes: self-managed nodes, managed node groups, and Fargate pods—and their impact on security responsibilities.
- Techniques to secure data at rest and in transit using CSI drivers, encryption strategies, and service meshes.
- Methods to enforce network segmentation and secure multi-tenancy in an EKS environment.
- Logging, monitoring, and architectural best practices to ensure your EKS cluster meets security and compliance requirements.

By understanding these components and their interactions, you can design a secure, scalable, and compliant solution on EKS that not only meets your current needs but also accommodates future enhancements.

For more detailed configuration guidance, be sure to consult the [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).

Happy securing and deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/c4df65a9-8c7a-4f89-a4c5-4a3747f0aa3d)**
>
> Watch video content
