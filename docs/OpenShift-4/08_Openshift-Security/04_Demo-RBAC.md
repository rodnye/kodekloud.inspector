# Demo RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Demo-RBAC)

---

## Table of Contents

- Demo RBAC
  - Understanding Default Cluster Roles
  - Creating a New Role
  - A Detailed Role Example
  - Creating a Service Account
  - Binding the Role to the Service Account
  - Watch Video
    - Example: Namespaced Role

---

## Content

OpenShift 4

Openshift Security

# Demo RBAC

In this lesson, we will explore how to set up roles and role bindings effectively. Previously, we discussed how to add roles to specific users, groups, and service accounts. Now, we'll focus on configuring roles and binding them appropriately.

## Understanding Default Cluster Roles

Before diving into role creation, familiarize yourself with the default cluster roles and their descriptions:

- **admin:** Acts as a project manager.
- **basic user:** A read-only user who can access basic project details and user information.
- **cluster admin:** Has full access—akin to a root user—and can monitor overall cluster health.
- **cluster reader:** Holds comprehensive read permissions across the cluster.
- **edit:** Allows editing of objects and resources, though not typically done on the fly.
- **self-provisioner:** Permitted to create their own projects.
- **view:** Enables modifications while maintaining view permissions.

At the console under user management (located just above Administration), options for users, groups, service accounts, roles, and role bindings are available. Let's start with roles.

![The image shows a Red Hat OpenShift web interface displaying a list of roles and their associated namespaces. The interface includes a sidebar with various management options.](https://kodekloud.com/kk-media/image/upload/v1752882721/notes-assets/images/OpenShift-4-Demo-RBAC/red-hat-openshift-roles-namespaces.jpg)

## Creating a New Role

These pre-populated roles are available in all projects. To create a new role, click **Create Role**. You can choose to create a namespaced role or a cluster-wide role.

### Example: Namespaced Role

A namespaced role is defined as follows:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: example
  namespace: default
rules:
  - apiGroups:
      - ''
    resources:
      - pods
    verbs:
      - get
      - watch
      - list
```

If you remove the `namespace` field, the resource becomes a cluster-wide role. For example:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: example
rules:
  - apiGroups:
      - ''
    resources:
      - pods
    verbs:
      - get
      - watch
      - list
```

> [!important]
> **Note**
>
> Include the `namespace` field when you want the role to be restricted to that particular namespace.

## A Detailed Role Example

Assume we create a role named **viewpods** in the `default` namespace to allow read-only access to pods. Below is the configuration:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: viewpods
  namespace: default
rules:
  - apiGroups:
      - ''
    resources:
      - pods
    verbs:
      - get
      - watch
      - list
```

This setup specifies that the **viewpods** role strictly grants permissions for pod-related operations (get, watch, and list) within the default namespace.

## Creating a Service Account

Next, create a service account to bind with the role. The following example creates a service account named **podviewer** in the default namespace:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: podviewer
  namespace: default
```

## Binding the Role to the Service Account

After the service account is created, bind it to the **viewpods** role through a role binding. Here’s how you proceed:

1.  Choose the `default` namespace.
2.  Select the **viewpods** role.
3.  Set the subject type as a service account and assign the name **podviewer**.
4.  Click **Create** to finalize the binding.

![The image shows a Red Hat OpenShift interface for creating a RoleBinding, allowing users to define access types and resources. It includes options for namespace or cluster-wide role binding and fields for specifying the role name and namespace.](https://kodekloud.com/kk-media/image/upload/v1752882722/notes-assets/images/OpenShift-4-Demo-RBAC/red-hat-openshift-rolebinding-interface.jpg)

If you opt for a cluster-wide role binding, the binding can be specified across the entire cluster. However, in this example, we focus on a namespace-scoped binding.

![The image shows a Red Hat OpenShift interface for creating a role binding, with fields for role name, subject type, namespace, and subject name. The role name is set to "viewpods," and the subject name is "podviewer."](https://kodekloud.com/kk-media/image/upload/v1752882723/notes-assets/images/OpenShift-4-Demo-RBAC/openshift-role-binding-viewpods-podviewer.jpg)

Once completed, you can search for the role binding using keywords like "viewer". You should find a role binding, such as **pod view for viewer**, linked to the **viewpods** role and associated with the **podviewer** service account.

![The image shows a Red Hat OpenShift interface displaying a list of role bindings filtered by the name "viewer." It includes details such as role references, subject kinds, subject names, and namespaces.](https://kodekloud.com/kk-media/image/upload/v1752882724/notes-assets/images/OpenShift-4-Demo-RBAC/openshift-role-bindings-viewer-list.jpg)

> [!important]
> **Quick Recap**
>
> This lesson demonstrated how to:
>
> 1.  Create a namespaced role with specific permissions (e.g., view pods).
> 2.  Set up a service account in the designated namespace.
> 3.  Bind the service account to the role with a role binding.

By following these steps, you ensure that a service account like **podviewer** is accurately associated with a role that defines its permissions, thereby streamlining access control within your cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/88ef9cc2-5faa-41a3-9841-570f7b14a0a5)**
>
> Watch video content
