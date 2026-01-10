# Interns can see our secrets - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Interns-can-see-our-secrets)

---

## Table of Contents

- Interns can see our secrets
  - Step 1. Reviewing the Staging Namespace Role
  - Step 2. Reviewing the Role Binding for Interns
  - Step 3. Validating Intern Permissions
  - Step 4. Identifying the RBAC Leak
  - Step 5. Remediating the RBAC Misconfiguration
  - Step 6. Diagnosing with Verbose Output
  - Watch Video
  - Practice Lab
    - Verifying Pod Access in Staging
    - Testing Access to Secrets in a Sensitive Namespace
    - Verification Steps

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Interns can see our secrets

In this guide, we simulate a scenario where summer interns have been granted limited access to a staging cluster but can unexpectedly view sensitive information in other namespaces. We will review the Role-Based Access Control (RBAC) configuration, identify the misconfiguration leak, and demonstrate how to remediate it.

---

## Step 1. Reviewing the Staging Namespace Role

The staging cluster employs a role named **intern-role** that allows interns to get, watch, and list pods exclusively within the staging namespace. You can list the defined roles by running:

```
kubectl get roles -n staging
```

Below is the definition of **intern-role**:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"Role","metadata":{"annotations":{},"name":"intern-role","namespace":"staging"},"rules":[{"apiGroups":[""],"resources":["pods"],"verbs":["get","watch","list"]}]}
  creationTimestamp: "2024-07-06T19:18:16Z"
  name: intern-role
  namespace: staging
  resourceVersion: "7085"
  uid: abe79c42-946d-4c3a-a269-11e853be92b0
rules:
- apiGroups:
  - ""
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
> The **intern-role** is strictly limited to pod operations within the staging namespace.

---

## Step 2. Reviewing the Role Binding for Interns

The **intern-role** is assigned to the **interns** group using a role binding in the staging namespace. List the role bindings with the command:

```
kubectl get rolebindings.rbac.authorization.k8s.io -n staging
```

Here is the **interns-rolebinding** configuration:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"RoleBinding","metadata":{"annotations":{},"name":"interns-rolebinding","namespace":"staging"},"roleRef":{"apiGroup":"rbac.authorization.k8s.io","kind":"Group","name":"interns"}},"subjects":[{"apiGroup":"rbac.authorization.k8s.io","kind":"Group","name":"interns"}]}
  creationTimestamp: "2024-07-06T19:18:16Z"
  name: interns-rolebinding
  namespace: staging
  resourceVersion: "7086"
  uid: 6000bd89-e0f8-48fe-b052-202be4e61e69
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: intern-role
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: Group
    name: interns
```

This binding restricts the actions of any user in the **interns** group to listing, watching, and getting pods in the staging namespace.

---

## Step 3. Validating Intern Permissions

To validate the configuration, we can impersonate an intern user (e.g., Bob) and verify his permissions.

### Verifying Pod Access in Staging

Confirm that Bob can list pods in the staging namespace:

```
kubectl auth can-i get pods -n staging --as-group=interns --as=Bob
```

Expected output:

```
yes
```

### Testing Access to Secrets in a Sensitive Namespace

Intern Bob should not have access to secrets in the **top-secret** namespace. First, note that running an incomplete command (without specifying a verb) returns an error:

```
kubectl auth can-i -n top-secret secrets --as-group=interns --as=Bob
```

Output:

```
error: you must specify two arguments: verb resource/resourceName.
See 'kubectl auth can-i -h' for help and examples.
```

Now, check the correct command:

```
kubectl auth can-i get secrets -n top-secret --as-group=interns --as=Bob
```

Output:

```
yes
```

> [!important]
> **Warning**
>
> The result is concerning because an intern (Bob) should not be allowed to retrieve secrets in the **top-secret** namespace.

---

## Step 4. Identifying the RBAC Leak

The misconfiguration stems from an unintended higher-privileged ClusterRoleBinding. The **developers-binding** binds a powerful ClusterRole named **developer-role** (which grants full cluster-wide permissions) to both the **developers** and **interns** groups.

To inspect the **developers-binding**, run:

```
kubectl get clusterrolebindings.rbac.authorization.k8s.io developers-binding -o yaml
```

The output is similar to:

```
name: developers-binding
resourceVersion: "7088"
uid: 21c263b0-74bf-4061-adf5-64be27f29ecc
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: developer-role
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: developers
- apiGroup: rbac.authorization.k8s.io
  kind: Group
  name: interns
```

For further verification, you can examine the effective permissions by impersonating Bob using a self-subject access review:

```
curl -v -XPOST -H "Accept: application/json, */*" \
     -H "Impersonate-User: Bob" \
     -H "Impersonate-Group: interns" \
     -H "Content-Type: application/json" \
     https://controlplane.k8s.io/v1/selfsubjectaccessreviews
```

Review the **developer-role** configuration:

```
kubectl get clusterrole developer-role -o yaml
```

Expected definition:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"rbac.authorization.k8s.io/v1","kind":"ClusterRole","metadata":{"annotations":{},"name":"developer-role"},"rules":[{"apiGroups":["*"],"resources":["*"],"verbs":["*"]}]}
  creationTimestamp: "2024-07-06T19:18:16Z"
  name: developer-role
  resourceVersion: "7087"
  uid: ab81ded6-a490-424d-b67a-0053f2131ce4
rules:
- apiGroups:
  - "*"
  resources:
  - "*"
  verbs:
  - "*"
```

Because the **interns** group is included in the **developers-binding**, interns unintentionally receive cluster-wide privileges.

---

## Step 5. Remediating the RBAC Misconfiguration

To remediate the issue, remove the **interns** group from the **developers-binding**:

1.  Edit the ClusterRoleBinding:

    ```
    kubectl edit clusterrolebinding developers-binding
    ```

2.  Remove the **interns** entry from the **subjects** list.

After saving the changes, validate that Bob no longer has access to secrets in sensitive namespaces.

### Verification Steps

- Check access to secrets in **top-secret**:

  ```
  kubectl auth can-i get secrets -n top-secret --as-group=interns --as=Bob
  ```

  Expected output:

  ```
  no
  ```

- Confirm that Bob cannot access secrets in the staging namespace:

  ```
  kubectl auth can-i get secrets -n staging --as-group=interns --as=Bob
  ```

  Expected output:

  ```
  no
  ```

- Ensure that Bob still can get pods in the staging namespace:

  ```
  kubectl auth can-i get pods -n staging --as-group=interns --as=Bob
  ```

  Expected output:

  ```
  yes
  ```

---

## Step 6. Diagnosing with Verbose Output

If further RBAC issues arise or you suspect additional permission leaks, increase the verbosity of the command to glean more details about the source of the permissions:

```
kubectl auth can-i get secrets -n top-secret --as-group=interns --as=Bob -v=10
```

The verbose output can assist in pinpointing which role or binding is granting the unexpected access.

---

By following these steps, you can effectively diagnose and remediate RBAC misconfigurations within your Kubernetes clusters, ensuring that each user group has only the permissions intended for their roles. This not only bolsters security but also adheres to the principle of least privilege.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/f9ea629b-174f-46a0-a098-ba5912259497)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/bdb42aa7-bdae-4d46-9454-891e05404507)**
>
> Practice lab
