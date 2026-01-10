# Cluster Access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-EKS/Redundancy-Resiliency/Cluster-Access)

---

## Table of Contents

- Cluster Access
  - EKS Cluster Components
  - Authentication Flow
  - Bridging AWS IAM and Kubernetes RBAC
  - aws-auth ConfigMap
  - EKS Cluster Access APIs
  - Benefits of Native IAM Integration
  - Summary
  - Links and References
  - Watch Video
    - Drawbacks of the aws-auth ConfigMap

---

## Content

AWS EKS

Redundancy Resiliency

# Cluster Access

In this guide, we’ll examine how Amazon EKS secures its control plane, the evolution of authentication and authorization in EKS, and best practices for managing cluster access.

## EKS Cluster Components

An EKS cluster has two primary parts:

| Component     | Ownership        | Role                                                               |
| ------------- | ---------------- | ------------------------------------------------------------------ |
| Control Plane | AWS-managed      | API server and etcd—with an AWS-managed load balancer endpoint.    |
| Nodes & Pods  | Your AWS account | Worker nodes (EC2) and pods, communicating via an ENI in your VPC. |

Both administrators and nodes use API calls (for example, `kubectl get nodes`) against the public control plane endpoint. Nodes assume IAM roles to authenticate to the API server.

## Authentication Flow

When you run `kubectl get nodes`, EKS performs:

1.  Invocation of the AWS IAM Authenticator plugin to fetch a token.
2.  `kubectl` sends that token to the public API server endpoint.
3.  The AWS-managed load balancer forwards the request to the API server.
4.  The API server verifies the token with AWS IAM and executes the request.

![The image illustrates an authentication process flow for an EKS cluster, showing interactions between an administrator, ALB, API server, AWS IAM, and a node with a pod.](https://kodekloud.com/kk-media/image/upload/v1752862877/notes-assets/images/AWS-EKS-Cluster-Access/eks-authentication-process-flow-diagram.jpg)

> [!important]
> **Note**
>
> Although the endpoint is publicly reachable, AWS IAM verification ensures only valid IAM principals and node roles can access the API.

## Bridging AWS IAM and Kubernetes RBAC

Inside Kubernetes, Role-Based Access Control (RBAC) controls permissions. EKS originally bridged IAM identities to RBAC roles via the `aws-auth` ConfigMap:

![The image is a diagram illustrating the authentication process between AWS and Kubernetes, showing components like an administrator, ALB, EKS cluster, API server, AWS IAM, and RBAC.](https://kodekloud.com/kk-media/image/upload/v1752862879/notes-assets/images/AWS-EKS-Cluster-Access/aws-kubernetes-authentication-diagram.jpg)

## aws-auth ConfigMap

Below is a sample `aws-auth` ConfigMap used to map IAM roles and users to Kubernetes groups:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: arn:aws:iam::123456789012:role/EKSNodeRole
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
  mapUsers: |
    - userarn: arn:aws:iam::123456789012:user/admin
      username: admin
      groups:
        - system:masters
```

![The image is a diagram illustrating AWS Auth Configuration, showing the flow from an administrator through an ALB to an EKS Cluster, involving components like API Server, RBAC, AWS IAM, and a Node.](https://kodekloud.com/kk-media/image/upload/v1752862880/notes-assets/images/AWS-EKS-Cluster-Access/aws-auth-configuration-diagram-eks.jpg)

### Drawbacks of the aws-auth ConfigMap

| Drawback                | Impact                                                                           |
| ----------------------- | -------------------------------------------------------------------------------- |
| Permanent Creator Admin | The cluster creator gains unrevokable `system:masters` privileges.               |
| Deleted IAM Identity    | Removing the IAM user/role locks out admin access unless AWS Support intervenes. |
| ConfigMap Syntax Errors | A malformed YAML can prevent any admin from modifying access.                    |
| Manual Automation       | Scripts or CI/CD pipelines must validate changes to avoid downtime.              |

> [!important]
> **Warning**
>
> Relying on a free-form ConfigMap for critical access control can lead to accidental lockouts and complex recovery procedures.

![The image is a diagram illustrating the drawbacks of AWS Auth, showing the flow between an administrator, ALB, EKS Cluster, AWS IAM, and a node with components like API Server, RBAC, and aws-auth ConfigMap.](https://kodekloud.com/kk-media/image/upload/v1752862882/notes-assets/images/AWS-EKS-Cluster-Access/aws-auth-drawbacks-diagram-flow.jpg)

## EKS Cluster Access APIs

AWS now offers native Cluster Access APIs, which deprecate the in-cluster `aws-auth` ConfigMap in favor of declarative IAM-to-RBAC mappings via the EKS control plane API:

- Manage IAM identity mappings directly through the EKS API.
- Offload access control logic from your cluster into the EKS service.
- Assign multiple IAM roles/users as cluster administrators without recreating the cluster.

![The image is a diagram illustrating the flow of cluster access APIs in an EKS (Elastic Kubernetes Service) cluster, showing components like API Server, RBAC, AWS IAM, and user mappings. It depicts how users access the cluster through an Application Load Balancer (ALB) and interact with nodes and pods.](https://kodekloud.com/kk-media/image/upload/v1752862884/notes-assets/images/AWS-EKS-Cluster-Access/eks-cluster-access-api-flow-diagram.jpg)

## Benefits of Native IAM Integration

- Centralizes IAM and RBAC management within the EKS API.
- Separates cluster provisioning from administration responsibilities.
- Eliminates risk of lockouts caused by invalid ConfigMap edits.
- Enables safer automation and declarative access controls.

![The image is a diagram illustrating the advantages of native IAM integration with an EKS cluster, showing components like API Server, RBAC, AWS IAM, and user mappings. It highlights the flow of authentication and authorization processes within the system.](https://kodekloud.com/kk-media/image/upload/v1752862885/notes-assets/images/AWS-EKS-Cluster-Access/native-iam-integration-eks-diagram.jpg)

## Summary

- EKS control plane exposes a public API endpoint, protected by AWS IAM authentication.
- Kubernetes RBAC enforces fine-grained permissions inside the cluster.
- The `aws-auth` ConfigMap is legacy; new clusters should use the Cluster Access APIs.
- Upgrade your tooling (Terraform, AWS SDKs, [eksctl](https://eksctl.io/)) to manage access declaratively.

![The image is a conclusion slide summarizing four key points about managing cluster access, AWS API access, authentication linking IAM with Kubernetes roles, and new cluster access APIs.](https://kodekloud.com/kk-media/image/upload/v1752862887/notes-assets/images/AWS-EKS-Cluster-Access/cluster-access-management-summary-slide.jpg)

---

## Links and References

- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS SDKs & Tools](https://aws.amazon.com/tools/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-eks/module/1bbca08a-6f11-4fbe-89db-aeee53fccb0d/lesson/0e17db1e-8b20-45e4-a0f4-f5dc84ad077e)**
>
> Watch video content
