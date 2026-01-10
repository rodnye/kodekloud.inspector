# Demo User Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Demo-User-Management)

---

## Table of Contents

- Demo User Management
  - Creating a User
  - Mapping an Identity to the User
  - Managing Service Accounts
  - Adding Roles to a Service Account
  - Configuring Groups and Role Bindings
  - Watch Video
    - Creating a Service Account Using YAML
    - Creating a Service Account Using the Command Line
    - Creating a Group
    - Creating a Role Binding

---

## Content

OpenShift 4

Openshift Security

# Demo User Management

In this lesson, we explore essential user management tasks in OpenShift. You will learn how to create users, map identities, manage service accounts, and configure groups and role bindings. This comprehensive guide is designed to help you seamlessly manage access and permissions within your OpenShift cluster.

---

## Creating a User

Start by opening your terminal and creating a new user named "miketest" with the following command:

```
PS C:\Users\mike> oc create user miketest
user.user.openshift.io/miketest created
PS C:\Users\mike>
```

After creating the user, verify its creation by listing all users:

```
PS C:\Users\mike> oc get user
NAME          UID                                   FULL NAME          IDENTITIES
developer     577f362a-643f-456b-903d-1ccbfc0eb5f5   developer:dev
kubeadmin     3348c0e2-1e47-41c9-8548-ed8450ffbca2   developer:kubeadmin
miketest      e22c031c-5a37-4e10-90ec-5301379f451e
PS C:\Users\mike>
```

---

## Mapping an Identity to the User

Next, create an identity that permits all operations for "miketest" by executing:

```
PS C:\Users\mike> oc create identity allow_all:miketest
```

Then, map this identity to the user using the following command:

```
PS C:\Users\mike> oc create useridentitymapping user.openshift.io/allow_all:miketest miketest
useridentitymapping.user.openshift.io/allow_all:miketest created
PS C:\Users\mike> oc get user
NAME        UID                                   FULL NAME          IDENTITIES
developer   577f362a-643f-456b-903d-1ccbfc0eb5f5   developer:dev
kubeadmin   3348c0e2-1e47-41c9-8548-ed8450ffbca2   developer:kubeadmin
miketest    e22c031c-5a37-4e10-90ec-5301379f451e   allow_all:miketest
PS C:\Users\mike>
```

This confirms that the "allow_all" identity is now successfully mapped to "miketest".

---

## Managing Service Accounts

Service accounts in OpenShift allow you to manage automated processes and application access. You can create them either through YAML definitions or directly via the command line.

### Creating a Service Account Using YAML

To create a service account using a YAML definition in the `limittester` namespace, use the following configuration:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: example
  namespace: limittester
```

Alternatively, if you need a service account specific to the "limittester" namespace called "MikeSA" with permissions to manage Pods, you can easily create it using the OpenShift UI. Simply enter the desired parameters and click "Create."

### Creating a Service Account Using the Command Line

For those who prefer the command line, create a service account named "mikesa" by running:

```
PS C:\Users\mike> oc create serviceaccount mikesa
```

> [!important]
> **Note**
>
> If no namespace is specified, the service account will be created in the default namespace.

After creation, verify the existence of the service account by listing service accounts in the specified namespace.

---

## Adding Roles to a Service Account

Grant view access permissions to the service account "mikesa" in the default namespace using a role binding. Execute the following command:

```
PS C:\Users\mike> oc policy add-role-to-user view system:serviceaccount:default:mikesa
clusterrole.rbac.authorization.k8s.io/view added: "system:serviceaccount:default:mikesa"
PS C:\Users\mike>
```

To inspect the service account details, use the YAML output which provides information such as the namespace, labels, and associated secrets:

```
kind: ServiceAccount
apiVersion: v1
metadata:
  name: mikesa
  namespace: default
  uid: 83d6f8fd-b6db-4528-8210-167dc4b6aa18
  resourceVersion: "60308"
  creationTimestamp: "2022-09-20T10:55:51Z"
secrets:
  - name: mikesa-dockercfg-hwc22
imagePullSecrets:
  - name: mikesa-dockercfg-hwc22
```

---

## Configuring Groups and Role Bindings

Managing groups and their role bindings is crucial for organizing user permissions. This section explains how to create a group and assign roles to it.

### Creating a Group

Begin by creating a new user named "tester":

```
PS C:\Users\mike> oc create user tester
```

Next, using the OpenShift UI, navigate to the user management section and then to groups. Create a new group by applying a YAML similar to the example below. This group, called "testroles", includes the user "tester":

```
apiVersion: user.openshift.io/v1
kind: Group
metadata:
  name: testroles
users:
  - tester
```

Once the group is created, confirm that it appears in the groups list.

### Creating a Role Binding

To grant the "admin" role to the "testroles" group, perform the following steps within the OpenShift UI:

1.  Navigate to the group's detail view and select Role Bindings.
2.  Click "Create Binding."
3.  Provide a binding name (e.g., "testbinding"), choose the appropriate namespace (such as "default"), and select the role name (e.g., "admin").
4.  Confirm the creation.

After completing these steps, all members of the "testroles" group, including the "tester", will have admin permissions for the designated namespace.

> [!important]
> **Note**
>
> A detailed discussion on roles, role bindings, cluster roles, and cluster role bindings is available in subsequent lessons.

---

This concludes our demonstration of user management in OpenShift. In this lesson, we have covered the following key topics:

- Creating users
- Mapping identities to users
- Managing service accounts via YAML and the command line
- Assigning roles using role bindings
- Configuring groups for streamlined permission management

For further details on these topics, explore the [OpenShift Documentation](https://docs.openshift.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/bc94c571-46ba-4880-a6a0-3e1766194e1a)**
>
> Watch video content
