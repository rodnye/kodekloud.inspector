# Demo Setting up user contexts projectwise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Demo-Setting-up-user-contexts-projectwise)

---

## Table of Contents

- Demo Setting up user contexts projectwise
  - Step 1: Create a New User
  - Step 2: Define a ClusterRole for Read-Only Access
  - Step 3: Bind the ClusterRole to the User
  - Step 4: Verify the Configuration
  - Watch Video

---

## Content

OpenShift 4

Openshift Security

# Demo Setting up user contexts projectwise

In this demo, we’ll walk through setting up user contexts by defining a user with read-only access. This approach is particularly useful when a user needs to monitor and review resources—such as drafting reports—without having permissions to modify them.

## Step 1: Create a New User

Begin by creating a new user named MikeUser. Run the following command:

```
PS C:\Users\mike\Desktop> oc create user mikeuser
user.user.openshift.io/mikeuser created
PS C:\Users\mike\Desktop> oc get user mikeuser
NAME       UID
mikeuser   eaf722-de5b-4c0e-8a25-3b205a24167c
PS C:\Users\mike\Desktop> oc describe user mikeuser
Name:         mikeuser
Created:      13 seconds ago
Labels:       <none>
Annotations:  <none>
Identities:   <none>
```

## Step 2: Define a ClusterRole for Read-Only Access

Next, create a ClusterRole that grants read-only permissions to Pods. The YAML snippet below defines a ClusterRole named `mikesreaduser` that allows the user to "get," "watch," and "list" Pods:

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: mikesreaduser
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

## Step 3: Bind the ClusterRole to the User

After defining the ClusterRole, bind it to MikeUser using a ClusterRoleBinding. Remember, the RBAC API is case sensitive, so ensure that the subject's kind is capitalized as "User." The complete YAML configuration, including both the ClusterRole and the ClusterRoleBinding, is provided below:

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: mikesreaduser
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: mike-can-read-pods
subjects:
- kind: User
  name: mikeuser
  apiGroup: ""
roleRef:
  kind: ClusterRole
  name: mikesreaduser
  apiGroup: rbac.authorization.k8s.io
```

Save the above configuration to a file (e.g., `role.yaml`) and apply it by running:

```
PS C:\Users\mike\Desktop> oc apply -f .\role.yaml
```

> [!important]
> **Warning**
>
> If you encounter an error similar to:
>
> ```
> clusterrole.rbac.authorization.k8s.io/mikesreaduser created
> The ClusterRoleBinding "mike-can-read-pods" is invalid: subjects[0].kind: Unsupported value: "user": supported values: "ServiceAccount", "User", "Group"
> PS C:\Users\mike\Desktop>
> ```
>
> This indicates a case sensitivity issue. Make sure to use "User" (capitalized) as the subject's kind in the ClusterRoleBinding.

## Step 4: Verify the Configuration

After applying the YAML configuration, verify the setup by inspecting the ClusterRoleBinding. The sample output below confirms that MikeUser has an attached role binding, granting read-only access to Pods cluster-wide:

```
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: mike-can-read-pods
  uid: f6951a98-d8f2-4f4d-80de-74c66f7206e
  resourceVersion: '72095'
  creationTimestamp: '2022-09-20T11:53:02Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >-
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRoleBinding","metadata":{"annotations":{},"creationTimestamp":"2022-09-20T11:53:02Z","name":"mike-can-read-pods","resourceVersion":"72095","uid":"f6951a98-d8f2-4f4d-80de-74c66f7206e"},"roleRef":{"apiGroup":"rbac.authorization.k8s.io","kind":"ClusterRole","name":"mikesreaduser"},"subjects":[{"kind":"User","apiGroup":"rbac.authorization.k8s.io","name":"mikeuser"}]}
managedFields: ...
subjects:
  - kind: User
    apiGroup: rbac.authorization.k8s.io
```

After refreshing your cluster view, you should see that MikeUser now has the appropriate role binding to view Pods across the entire cluster.

> [!important]
> **Note**
>
> This configuration is ideal for monitoring purposes, ensuring that users can review resources without risking unintended modifications.

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/ba7c6578-dee2-4e2c-937d-5466cad10b43)**
>
> Watch video content
