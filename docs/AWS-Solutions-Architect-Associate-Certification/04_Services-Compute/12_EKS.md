# EKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/EKS)

---

## Table of Contents

- EKS
  - Worker Node Options in EKS
  - Creating an EKS Cluster
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# EKS

In this lesson, we dive into AWS Elastic Kubernetes Service (EKS), a fully managed Kubernetes service by AWS that simplifies the deployment, management, and scaling of containerized applications.

EKS takes care of the provisioning, scaling, and management of the Kubernetes control plane components—including the API server, scheduler, controller manager, and etcd. These critical components are complex to configure manually, especially when it comes to scaling and backups. With AWS managing these tasks, you can focus on developing your applications and managing worker nodes.

![The image explains Amazon EKS, a managed Kubernetes service, highlighting AWS's role in managing the control plane, provisioning master nodes, and handling scaling and backups. It includes a diagram of the Kubernetes architecture with control plane components and worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752864915/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/amazon-eks-kubernetes-architecture-diagram.jpg)

While AWS maintains the control plane, the responsibility for managing the worker nodes still lies with you. The advantages of using EKS include simplified cluster operations, enhanced security through AWS best practices, and seamless integrations with AWS services such as IAM, Secrets Manager, and Load Balancer.

![The image is a comparison chart highlighting the benefits of using Amazon EKS for Kubernetes, focusing on ease of scaling, security, and integration with AWS services like S3 and IAM.](https://kodekloud.com/kk-media/image/upload/v1752864916/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/amazon-eks-kubernetes-comparison-chart.jpg)

## Worker Node Options in EKS

When configuring your EKS cluster, you need to decide how to manage the worker nodes. AWS provides three main options:

1.  **Self-Managed Nodes**  
    With self-managed nodes, you manually provision EC2 instances and install all necessary components such as kubelet, kube-proxy, and the container runtime. You are responsible for handling routine updates, security patches, and ensuring that each node properly registers with the Kubernetes control plane. This approach gives you full control over your nodes, similar to managing instances in ECS.

    ![The image is a diagram explaining self-managed Kubernetes nodes, highlighting user responsibilities such as provisioning EC2 instances, installing processes, applying updates, and registering nodes with the control plane. It also shows components like kubelet, kube-proxy, and c-runtime.](https://kodekloud.com/kk-media/image/upload/v1752864917/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/kubernetes-nodes-diagram-user-responsibilities.jpg)

2.  **Managed Node Groups**  
    Managed node groups automate the lifecycle management of EC2 instances for worker nodes. With managed node groups, AWS deploys EKS-optimized images and simplifies operations such as node creation, updates, and termination via API calls. Nodes are configured within an auto-scaling group, reducing manual overhead while still giving you the flexibility to manage the underlying instances.

    ![The image is an infographic about Managed Node Groups in EKS, highlighting features like automated provisioning, EKS-optimized images, lifecycle management, and auto-scaling. It includes a diagram showing the worker node lifecycle stages: create, update, and terminate.](https://kodekloud.com/kk-media/image/upload/v1752864919/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/managed-node-groups-eks-infographic.jpg)

3.  **Fargate**  
    Fargate offers a serverless computing model for Kubernetes pods, eliminating the need to manage EC2 instances altogether. When you deploy an application, Fargate automatically provisions the necessary compute resources based on your container specifications. This model ensures you pay only for the resources you use, while AWS handles all aspects of resource management.

    ![The image is a diagram explaining AWS Fargate, highlighting its serverless architecture and ability to create worker nodes on demand, with references to EKS and Fargate.](https://kodekloud.com/kk-media/image/upload/v1752864920/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/aws-fargate-serverless-diagram.jpg)

> [!important]
> **Tip**
>
> Consider your operational requirements carefully when selecting a worker node option. Self-managed nodes offer complete control, managed node groups balance automation with flexibility, and Fargate provides a hassle-free, serverless experience.

## Creating an EKS Cluster

Setting up an EKS cluster involves several key steps:

- **Cluster Creation:** Specify the desired Kubernetes version and create the cluster.
- **IAM Role Configuration:** Provide an IAM role necessary for cluster operations.
- **Networking Setup:** Define the VPC, subnets, and security groups to guarantee appropriate network and security configurations.
- **Worker Node Provisioning:** Choose one of the aforementioned options to deploy worker nodes.

For example, when opting for managed node groups, you define the instance type, specify the minimum and maximum node count, and associate the node group with your EKS cluster.

![The image is a diagram for creating an EKS cluster, detailing steps like setting the cluster name, IAM roles, and selecting VPC and subnets. It includes icons representing components like storage, networking, and security within a VPC across two availability zones.](https://kodekloud.com/kk-media/image/upload/v1752864921/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/eks-cluster-creation-diagram.jpg)

![The image is a diagram titled "Creating Worker Nodes," showing steps to create a node group, select an instance type, and define the number of nodes, with an illustration of a worker node group containing two chip icons.](https://kodekloud.com/kk-media/image/upload/v1752864922/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-EKS/creating-worker-nodes-diagram.jpg)

After creating the cluster, connect to it using kubectl by updating your kubeconfig file with the cluster's endpoint and authentication details. There are several methods to manage an EKS cluster:

- **AWS Management Console:** A user-friendly interface to create and configure your EKS cluster and worker nodes, as well as auto-configure kubectl.
- **eksctl CLI:** A dedicated command-line tool that simplifies cluster creation. For instance:

  ```
  $ eksctl create cluster
  ```

- **Infrastructure as Code:** Use tools like Terraform or Pulumi to define and deploy your EKS cluster and associated resources programmatically.

> [!important]
> **Pro Tip**
>
> Leveraging Infrastructure as Code not only streamlines the deployment process but also ensures consistency and version control for your EKS configurations.

By choosing the right combination of worker node management and cluster creation methods, you can efficiently manage your Kubernetes environment while focusing on application development and innovation.

For further reading, check out:

- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes Official Site](https://kubernetes.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/a5d25396-8112-4500-96d7-1028972a8db1)**
>
> Watch video content
