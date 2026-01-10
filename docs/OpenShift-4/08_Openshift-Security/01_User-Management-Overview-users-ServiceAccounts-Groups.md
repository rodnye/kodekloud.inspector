# User Management Overview users ServiceAccounts Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/User-Management-Overview-users-ServiceAccounts-Groups)

---

## Table of Contents

- User Management Overview users ServiceAccounts Groups
  - Users
  - Service Accounts
  - Groups
  - Watch Video
    - Creating a User
    - Creating and Managing Service Accounts
    - Creating a Group

---

## Content

OpenShift 4

Openshift Security

# User Management Overview users ServiceAccounts Groups

In this lesson, we explore how OpenShift manages users, service accounts, and groups. Like Kubernetes and many other platforms, OpenShift employs robust authentication methods, identity grouping, and dedicated service accounts to execute automated tasks securely and efficiently.

---

## Users

In OpenShift, a user is typically an individual who logs into the system. Examples include administrators, developers, or operators who manage resources on the platform. In addition to individual users, system users—often created and managed by the infrastructure—serve as cluster administrators with extensive privileges. It is important to note that system users should be used sparingly in day-to-day operations to mitigate the risk of unintended system-wide changes.

Below is a diagram illustrating the structure of regular users and system users along with their permission levels:

![The image outlines two types of users, "Regular User" and "System User," who can have granular permissions such as "Read Only," "Read and Write," and "Literally Everything."](https://kodekloud.com/kk-media/image/upload/v1752882754/notes-assets/images/OpenShift-4-User-Management-Overview-users-ServiceAccounts-Groups/user-permissions-regular-system-users.jpg)

### Creating a User

To create a new user via the OpenShift CLI, use the following command (for example, creating a user named "mike"):

```
oc create user mike
```

After creating the user, you must map an identity to associate the predefined policy with the user. Although an "allow all" rule exists by default in the cluster, mapping the identity ensures that the appropriate permissions are bound to the new user:

```
oc create useridentitymapping allow_all:mike
```

If you need to remove the user later, execute:

```
oc delete user mike
```

---

## Service Accounts

Service accounts are special accounts designed for automated tasks and direct API access. For security reasons, it is best practice to create dedicated service accounts rather than using the default one, which, if compromised, may pose a significant security risk.

![The image shows a section titled "Service Accounts" with a red button labeled "Direct Access to API" and an icon of a hand clicking on a red "API" button.](https://kodekloud.com/kk-media/image/upload/v1752882754/notes-assets/images/OpenShift-4-User-Management-Overview-users-ServiceAccounts-Groups/service-accounts-direct-access-api.jpg)

Service accounts are treated as API resources similar to Deployments, Services, or Ingresses in Kubernetes.

![The image is a diagram showing "Service Accounts" as an API resource/object related to Kubernetes, with red arrow icons.](https://kodekloud.com/kk-media/image/upload/v1752882755/notes-assets/images/OpenShift-4-User-Management-Overview-users-ServiceAccounts-Groups/service-accounts-kubernetes-diagram.jpg)

### Creating and Managing Service Accounts

Create a service account using the following command (e.g., creating a service account named "mikesa"):

```
oc create sa mikesa
```

To verify that the service account has been successfully created, list all service accounts:

```
oc get sa
```

Service accounts are instrumental in interacting with the Kubernetes API. For instance, to grant the service account `mikesa` in the `sockshop` namespace view-only access, assign the corresponding role with:

```
oc policy add-role-to-user view system:serviceaccount:sockshop:mikesa
```

You can also apply roles to a service account via a group command if necessary:

```
oc policy add-role-to-group view system:serviceaccount:sockshop:mikesa
```

> [!important]
> **Security Best Practice**
>
> Always create dedicated service accounts for each application or task to minimize the risk of exposing critical credentials and to adhere to the principle of least privilege.

---

## Groups

Groups in OpenShift allow you to manage permissions for multiple users collectively. This approach simplifies role assignment, as you can target a group rather than assigning permissions individually. For example, if an engineering team requires "view" access across various projects, adding all team members to a group and binding a role to that group is more efficient and manageable.

![The image shows a user interface with options for managing groups, including adding roles or role bindings, and viewing access for engineers. There are icons representing users and a clickable option to view all.](https://kodekloud.com/kk-media/image/upload/v1752882756/notes-assets/images/OpenShift-4-User-Management-Overview-users-ServiceAccounts-Groups/user-interface-managing-groups-access.jpg)

Groups can also be scoped to specific namespaces. If a particular team needs read/write access only within a designated namespace, create the group and bind the role accordingly.

### Creating a Group

To create a new group that includes specific users, use the administrative command. For example, to create a group named "mikesgroup" comprising users "mike" and "michelle", run:

```
oc adm groups new mikesgroup mike michelle
```

To retrieve a list of groups and review their details, execute:

```
oc get groups
```

---

With this overview, you now have a solid understanding of how to create and manage users, service accounts, and groups in OpenShift. In the upcoming demo, we will demonstrate how these components are applied in real-world scenarios, solidifying your grasp of OpenShift's security and access control mechanisms.

For more information, refer to the [OpenShift Documentation](https://docs.openshift.com) and explore related topics such as [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/0dc2055f-bb3d-4716-ab6f-6fa60ed2daac)**
>
> Watch video content
