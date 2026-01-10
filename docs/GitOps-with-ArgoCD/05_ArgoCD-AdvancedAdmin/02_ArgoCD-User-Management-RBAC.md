# ArgoCD User Management RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-ArgoCD/ArgoCD-AdvancedAdmin/ArgoCD-User-Management-RBAC)

---

## Table of Contents

- ArgoCD User Management RBAC
  - Configuring Local Users
  - Updating User Passwords
  - Customizing Roles
  - Watch Video

---

## Content

GitOps with ArgoCD

ArgoCD AdvancedAdmin

# ArgoCD User Management RBAC

This article explains how to manage users in ArgoCD, with a focus on local user management. By default, ArgoCD includes a built-in admin user with full super-user access. For better security practices, it is recommended that you use the admin account only for the initial configuration, then disable it once all required users have been added.

ArgoCD supports two types of user accounts:

- Local users
- Users authenticated via Single Sign-On (SSO) (for example, through Okta or similar products)

In this guide, we focus on configuring local users.

> [!important]
> **Important**
>
> It is best practice to disable the default admin user after setting up additional accounts to minimize security risks.

## Configuring Local Users

Local users in ArgoCD are managed by updating the ConfigMap. Each user is defined with associated capabilities, such as API key generation and UI login access. The API key capability allows a user to create a JSON Web Token (JWT) for API interactions, while the login capability grants access to the user interface.

After editing the ConfigMap, your user list might appear as shown below:

```
$ argocd account list
NAME   ENABLED  CAPABILITIES
admin  true     login
jai    true     apiKey, login
ali    true     apiKey, login
```

To add or update user accounts, patch the ConfigMap with the appropriate commands:

```
$ kubectl -n argocd patch configmap argocd-cm --patch='{"data":{"accounts.jai": "apiKey,login"}}'
configmap/argocd-cm patched

$ kubectl -n argocd patch configmap argocd-cm --patch='{"data":{"accounts.ali": "apiKey,login"}}'
configmap/argocd-cm patched
```

## Updating User Passwords

ArgoCD provides CLI commands to set or update user passwords. When logged in as the admin, you must enter the current admin password to change another user's password. Note that new users do not have access until their password is configured.

ArgoCD comes with two predefined roles:

- **Read-only**: Grants users access solely to view resources.
- **Admin**: Grants users full, unrestricted access.

By default, the admin account is assigned the admin role; however, you can modify this assignment or create custom roles by editing the ArgoCD RBAC ConfigMap.

For example, to update the password for the user "jai", use the following command:

```
$ argocd account update-password --account jai
*** Enter password of currently logged in user (admin):
*** Enter new password for user jai:
*** Confirm new password for user jai:
Password updated
```

Alternatively, you can execute the update in a single command:

```
$ argocd account update-password \
--account jai \
--new-password j€i_p@ssw0rd \
--current-password @dmin_p@$sword
Password updated
```

## Customizing Roles

The default read-only role enables users to view all resources without making modifications. To assign custom roles or modify role assignments, you must edit the ArgoCD RBAC ConfigMap. By configuring these settings, you can ensure that users without explicit role mappings are automatically granted a default read-only role.

For a more comprehensive understanding of role-based access control (RBAC) in ArgoCD and to explore detailed configurations, refer to the official [ArgoCD documentation](https://argo-cd.readthedocs.io/en/stable/).

> [!important]
> **Further Reading**
>
> For more insights into secure user management and RBAC configuration in ArgoCD, consider exploring additional resources on [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) and cloud-native security best practices.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-argocd/module/ef6b6fef-0bd5-4fab-b437-b6d613fa74b4/lesson/cbfbdb90-53e3-49f7-b5ad-e1b13476c16d)**
>
> Watch video content
