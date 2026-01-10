# Solution Cluster Roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Solution-Cluster-Roles)

---

## Table of Contents

- Solution Cluster Roles
  - Inspecting Existing Cluster Roles
  - Inspecting Cluster Role Bindings
  - Reviewing Cluster Admin Role Bindings
  - Granting Node Access to a New User (Michelle)
  - Expanding Michelle's Responsibilities to Storage
  - Watch Video
    - Create the Cluster Role for Node Access
    - Bind the Cluster Role to Michelle
    - Create a Cluster Role for Storage Administration
    - Bind the Storage Admin Role to Michelle

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Solution Cluster Roles

In this lesson, we will explore the concepts of cluster roles and cluster role bindings. We will inspect the existing cluster roles and their bindings, count them, and review their permissions before creating new roles and bindings for a new team member named Michelle.

---

## Inspecting Existing Cluster Roles

Begin by examining the currently defined cluster roles in your cluster. These roles include `cluster-admin`, system-specific roles, and others. Run the following command to list them:

```
system:volume-scheduler
system:certificates.k8s.io:legacy-unknown-approver
system:certificates.k8s.io:kubelet-serving-approver
system:certificates.k8s.io:kube-apiserver-client-approver
system:certificates.k8s.io:kube-apiserver-client-kubelet-approver
system:service-account-issuer-discovery
system:node-proxier
system:kube-scheduler
system:controller:attacheddetach-controller
system:controller:clusteroverlay-aggregation-controller
system:controller:cronjob-controller
system:controller:daemon-set-controller
system:controller:deployment-controller
system:controller:endpoint-controller
system:controller:endpointslice-mirroring-controller
system:controller:expand-controller
system:controller:ephemeral-volume-controller
system:controller:generic-garbage-collector
system:controller:job-controller
system:controller:namespace-controller
system:controller:node-controller
system:controller:persistent-volume-binder
system:controller:garbage-collector
system:controller:replicaset-controller
system:controller:replication-controller
system:controller:resourcequota-controller
system:controller:service-account-controller
system:controller:service-controller
system:controller:statefulset-controller
system:controller:ttl-controller
system:controller:vertical-pod-autoscaler
system:controller:volume-protection-controller
system:controller:ttl-after-finished-controller
system:controller:root-ca-cert-publisher
k3s-cloud-controller-manager
```

You can count these roles manually by piping the output to `wc -l`. For example:

```
k get clusterroles --no-headers | wc -l
```

On one system, this command produced an output of 6, but keep in mind that this example shows a truncated list. In another instance, a total of 69 roles might be expected using a different counting method.

> [!important]
> **Note**
>
> Cluster roles are cluster-scoped and are not limited to any namespace.

---

## Inspecting Cluster Role Bindings

Next, verify the cluster role bindings by counting them with the following command:

```
k get clusterrolebindings --no-headers | wc -l
```

This command returned 54 on the system in question, indicating that there are 54 cluster role bindings.

To illustrate further, here is an excerpt displaying some cluster roles and their creation times:

```
k get clusterroles
NAME                                                                  CREATED AT
cluster-admin                                                       2022-04-18T00:01:23Z
system:discovery                                                   2022-04-18T00:01:23Z
system:monitoring                                                  2022-04-18T00:01:23Z
system:basic-user                                                  2022-04-18T00:01:23Z
system:public-info-viewer                                          2022-04-18T00:01:23Z
system:aggregate-to-admin                                          2022-04-18T00:01:23Z
system:aggregate-to-edit                                           2022-04-18T00:01:23Z
system:aggregate-to-view                                           2022-04-18T00:01:23Z
system:heapster                                                    2022-04-18T00:01:23Z
system:node                                                       2022-04-18T00:01:23Z
...
```

> [!important]
> **Note**
>
> Both cluster roles and cluster role bindings are applied across the entire cluster and are not namespace-specific.

---

## Reviewing Cluster Admin Role Bindings

The `cluster-admin` role represents the highest permission level and is bound to specific user groups via a ClusterRoleBinding. To identify the binding for the `cluster-admin` role, run:

```
k get clusterrolebindings | grep cluster-admin
```

The output may appear as follows:

```
cluster-admin                    12m   ClusterRole/cluster-admin
helm-kube-system-traefik         12m   ClusterRole/cluster-admin
helm-kube-system-traefik-crd     12m   ClusterRole/cluster-admin
```

You can then inspect the details of the cluster-admin binding with:

```
k describe clusterrolebindings cluster-admin
```

This command produces output similar to:

```
Name:         cluster-admin
Labels:       kubernetes.io/bootstraping=rbac-defaults
Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
Role:
  Kind:  ClusterRole
  Name:  cluster-admin
Subjects:
  Kind  Name                 Namespace
  ----- ------------------- -----------
  Group system:masters
```

This confirms that the `cluster-admin` role is bound by default to the `system:masters` group, thereby granting all possible operations (denoted by `[*]` for all actions on all resources).

> [!important]
> **Warning**
>
> Exercise caution when modifying cluster roles as they affect permissions across the entire cluster.

---

## Granting Node Access to a New User (Michelle)

Michelle, a new team member, requires access to manage nodes. Initially, when Michelle runs:

```
k get nodes --as michelle
```

she encounters the following error:

```
Error from server (Forbidden): nodes is forbidden: User "michelle" cannot list resource "nodes" in API group "" at the cluster scope
```

To resolve this issue, follow these steps:

### Create the Cluster Role for Node Access

Create a cluster role named `michelle-role` that allows Michelle to get, list, and watch nodes:

```
k create clusterrole michelle-role --verb=get,list,watch --resource=nodes
```

Verify the new role by describing it:

```
k describe clusterrole michelle-role
```

Expected output:

```
Name:         michelle-role
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources   Non-Resource URLs   Resource Names   Verbs
  ---------   -----------------   ---------------  ---------
  nodes       []                  []               [get list watch]
```

### Bind the Cluster Role to Michelle

Bind the role to Michelle’s user account with:

```
k create clusterrolebinding michelle-role-binding --clusterrole=michelle-role --user=michelle
```

Verify this binding with:

```
k describe clusterrolebinding michelle-role-binding
```

Expected output:

```
Name:         michelle-role-binding
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  ClusterRole
  Name:  michelle-role
Subjects:
  Kind   Name      Namespace
  ----   ----      ---------
  User   michelle
```

Finally, test Michelle’s access again:

```
k get nodes --as michelle
```

A successful command execution will display a list of nodes similar to:

```
NAME         STATUS   ROLES                 AGE   VERSION
controlplane Ready    control-plane,master  16m   v1.23.3+k3s1
```

---

## Expanding Michelle's Responsibilities to Storage

Michelle’s roles are expanding to include storage management. To grant her access to storage-related resources, first verify the available API resources by running:

```
kubectl api-resources
```

This command lists resources along with their short names, API versions, and scope. For storage management, the key resources are persistent volumes and storage classes.

### Create a Cluster Role for Storage Administration

Create a cluster role named `storage-admin` that allows listing, creating, getting, and watching persistent volumes and storage classes:

```
k create clusterrole storage-admin --resource=persistentvolumes,storageclasses --verb=list,create,get,watch
```

Verify the role in YAML format using:

```
k get clusterrole storage-admin -o yaml
```

An expected YAML output is as follows:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  creationTimestamp: "2022-04-18T00:20:48Z"
  name: storage-admin
  resourceVersion: "921"
  uid: e0ee52a7-b32c-4a42-bb7a-a783b040cd4e
rules:
- apiGroups:
  - ""
  resources:
  - persistentvolumes
  verbs:
  - list
  - create
  - get
  - watch
- apiGroups:
  - storage.k8s.io
  resources:
  - storageclasses
  verbs:
  - list
  - create
  - get
  - watch
```

### Bind the Storage Admin Role to Michelle

Bind the `storage-admin` role to Michelle with the following command:

```
k create clusterrolebinding michelle-storage-admin --user=michelle --clusterrole=storage-admin
```

Verify this binding:

```
k describe clusterrolebinding michelle-storage-admin
```

Expected output:

```
Name:         michelle-storage-admin
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  ClusterRole
  Name:  storage-admin
Subjects:
  Kind   Name      Namespace
  ----   ----      ---------
  User   michelle
```

Michelle should now have the necessary permissions to manage storage resources such as persistent volumes and storage classes.

---

This concludes the lesson on inspecting, creating, and binding cluster roles and cluster role bindings. By following these steps, you learned how to review existing roles, grant specific permissions to a user, and expand those permissions as job responsibilities change.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/a8218f37-cb6f-4c1a-a28b-e6299542ddee)**
>
> Watch video content
