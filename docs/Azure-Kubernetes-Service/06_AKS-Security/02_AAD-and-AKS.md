# AAD and AKS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Azure-Kubernetes-Service/AKS-Security/AAD-and-AKS)

---

## Table of Contents

- AAD and AKS
  - Azure AD Identity Types
  - Kubernetes Role-Based Access Control (RBAC)
  - AKS Authentication and Authorization Options
  - Links and References
  - Watch Video
    - Service Principal vs. Managed Identity
    - Example ClusterRole
    - Example ClusterRoleBinding

---

## Content

Azure Kubernetes Service

AKS Security

# AAD and AKS

Before diving into AKS authentication and authorization, it’s essential to understand the core Azure Active Directory (AAD) identity types. AAD identities establish trust, authenticate users and applications, and control access across Azure services.

## Azure AD Identity Types

At a high level, Azure AD supports four identity types:

1.  **User Identity**  
    An individual AAD account used for interactive sign-ins and access control.
2.  **Application Identity**  
    A registered app in AAD that can authenticate and access resources on behalf of a user or itself.
3.  **Service Principal**  
    A non-interactive app identity for automation, CI/CD pipelines, or service-to-service scenarios. It authenticates with a client ID and secret (or certificate).

    > [!important]
    > **Warning**
    >
    > Service principals require regular secret or certificate rotations. If credentials expire, any AKS operations using that principal will fail.

    ![The image is an infographic about "Identity in Azure AD," highlighting "Application Identity" and its role in enabling applications to authenticate and access resources. It also mentions "User Identity," "Service Principal Identity," and "Managed Identity."](https://kodekloud.com/kk-media/image/upload/v1752869411/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/identity-in-azure-ad-infographic.jpg)

    ![The image is a diagram about "Identity in Azure AD," focusing on Service Principal Identity, which is used for application authentication and accessing Azure resources. It also mentions User Identity, Application Identity, and Managed Identity.](https://kodekloud.com/kk-media/image/upload/v1752869412/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/identity-in-azure-ad-diagram.jpg)

4.  **Managed Identity**  
    A system-assigned or user-assigned identity created and managed by Azure. Eliminates manual secret management by obtaining tokens directly from AAD.

    ![The image is about "Identity in Azure AD," highlighting how managed identity simplifies the authentication process for resources, with icons for user, application, and service principal identities.](https://kodekloud.com/kk-media/image/upload/v1752869414/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/identity-azure-ad-managed-authentication.jpg)

> [!important]
> **Note**
>
> If you’re familiar with on-premises Active Directory, managed identities behave like built-in system accounts that Azure handles automatically.

### Service Principal vs. Managed Identity

| Feature               | Service Principal                  | Managed Identity                              |
| --------------------- | ---------------------------------- | --------------------------------------------- |
| Credential Management | Secrets or certificates to rotate  | No secrets; tokens issued transparently       |
| Lifecycle             | Provisioned manually               | Auto-provisioned with Azure resources         |
| Use Cases             | Custom automation, CI/CD pipelines | AKS control plane, VM-to-Azure service access |

![The image explains identity management in Azure AD, highlighting Service Principal Identity and Managed Identity, with a note on using client ID, client secret, or certificates for authentication.](https://kodekloud.com/kk-media/image/upload/v1752869416/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/azure-ad-identity-management-diagram.jpg)

When you create an AKS cluster with default settings, Azure provisions:

- A managed identity for the cluster control plane
- Two service principals in the same resource group
- The managed identity appears under **Enterprise Applications** in AAD

![The image shows the Microsoft Azure portal interface for managing an enterprise application named "kodecloud-aks." It includes sections for properties, getting started steps, and updates on features.](https://kodekloud.com/kk-media/image/upload/v1752869417/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/azure-portal-kodecloud-aks-interface.jpg)

---

## Kubernetes Role-Based Access Control (RBAC)

Kubernetes RBAC lets you define fine-grained permissions via **Roles** and **RoleBindings**:

- **Roles** (namespace-scoped) or **ClusterRoles** (cluster-wide) specify allowed `verbs` on resources.
- **RoleBindings** or **ClusterRoleBindings** assign these roles to subjects (users, groups, or service accounts).

![The image is an infographic about Kubernetes RBAC, showing components of identities (providers, users/groups, service accounts) and access control (namespace scoped roles, role bindings, cluster roles, and cluster role bindings).](https://kodekloud.com/kk-media/image/upload/v1752869418/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/kubernetes-rbac-infographic-access-control.jpg)

Kubernetes supports multiple identity providers out-of-the-box:

![The image outlines Kubernetes identity providers, including X509 Certificates, Kubernetes Service Accounts, and OpenID Connect (OAuth2), with brief descriptions of each.](https://kodekloud.com/kk-media/image/upload/v1752869420/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/kubernetes-identity-providers-diagram.jpg)

1.  **X.509 Certificates**
2.  **Service Accounts** (in-cluster)
3.  **OpenID Connect** (e.g., Azure AD)

### Example ClusterRole

Grants `get` and `patch` on `daemonsets` and `deployments` (in the `apps` API group), and `get` on `configmaps` (in the core API group):

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kodekloud-clusterrole
rules:
  - apiGroups: ["apps"]
    resources: ["daemonsets", "deployments"]
    verbs: ["get", "patch"]
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get"]
```

### Example ClusterRoleBinding

Binds the above `ClusterRole` to an Azure AD group by its object ID:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-reader-rolebinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kodekloud-clusterrole
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: Group
    name: 8e9a4227-0e29-4d2a-9fd3-cacae5a6821e
```

---

## AKS Authentication and Authorization Options

![The image illustrates the progression of authentication and authorization methods in AKS, from local accounts with Kubernetes RBAC to Azure AD authentication with Kubernetes and Azure RBAC.](https://kodekloud.com/kk-media/image/upload/v1752869421/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/aks-authentication-authorization-progression.jpg)

You can choose between three authentication and authorization modes when deploying AKS:

| Method                                     | Authentication               | Authorization          | Key Benefit                               |
| ------------------------------------------ | ---------------------------- | ---------------------- | ----------------------------------------- |
| Local Accounts + Kubernetes RBAC (Default) | K8s service accounts, tokens | Kubernetes RBAC        | Quick start with built-in K8s controls    |
| Azure AD Auth + Kubernetes RBAC            | Azure AD users/groups        | Kubernetes RBAC        | Leverage MFA, conditional access policies |
| Azure AD Auth + Azure RBAC                 | Azure AD users/groups        | Azure role assignments | Centralized IAM across Azure resources    |

1.  Local Accounts with Kubernetes RBAC (Default)
    - Native service accounts, roles, and bindings stored in the cluster
    - Auth via certificates, tokens, or basic auth

2.  Azure AD Authentication with Kubernetes RBAC
    - Users sign in with Azure AD credentials
    - K8s RBAC enforces permissions
    - Supports Azure AD features like MFA

    ![The image shows a Microsoft Azure interface for creating a Kubernetes cluster, specifically focusing on the "Access" settings for authentication and authorization. It includes options for Azure AD authentication with Kubernetes RBAC and a warning about assigning Azure Active Directory groups.](https://kodekloud.com/kk-media/image/upload/v1752869422/notes-assets/images/Azure-Kubernetes-Service-AAD-and-AKS/azure-kubernetes-cluster-access-settings.jpg)

3.  Azure AD Authentication and Azure RBAC
    - Azure AD handles both authentication and authorization
    - Use Azure role assignments to grant AKS permissions
    - Provides a seamless IAM experience across Azure

Feel free to experiment with these modes in your environment. Next up: [Azure Defender for AKS](https://learn.microsoft.com/azure/defender-for-kubernetes/overview).

## Links and References

- [Azure AD Documentation](https://learn.microsoft.com/azure/active-directory/)
- [AKS Authentication Concepts](https://learn.microsoft.com/azure/aks/azure-ad-integration)
- [Kubernetes RBAC Guide](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/azure-kubernetes-service/module/d229c32e-4ff2-47ce-8be7-3dd99d62753f/lesson/d3a0004f-84a8-426e-a667-b291343cc03d)**
>
> Watch video content
