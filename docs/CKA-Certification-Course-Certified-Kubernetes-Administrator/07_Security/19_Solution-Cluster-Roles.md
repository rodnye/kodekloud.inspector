# Solution Cluster Roles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-Cluster-Roles)

---

## Table of Contents

- Solution Cluster Roles
  - Inspecting Cluster Roles and Cluster Role Bindings
  - Examining the Cluster Admin Role Binding
  - Granting Node Access to Michelle
  - Extending Michelle’s Permissions to Storage
  - Kubernetes API Resources Overview
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution Cluster Roles

In this lab article, we explore Kubernetes cluster roles and cluster role bindings. You will learn how to inspect existing roles and bindings, then create custom roles and bindings for a team member named Michelle. Follow along for step-by-step commands and detailed explanations.

---

## Inspecting Cluster Roles and Cluster Role Bindings

Begin by counting the defined cluster roles. Since these objects are cluster-wide (not namespaced), run the command:

```
k get clusterroles --no-headers | wc -l
```

For example, you might see an output of 69 cluster roles.

Next, determine the number of cluster role bindings with a similar command:

```
k get clusterrolebindings --no-headers | wc -l
```

This command returns 54. Note that although the `cluster-admin` role will appear in the list, both cluster roles and their bindings apply across the entire cluster.

---

## Examining the Cluster Admin Role Binding

To view the user groups associated with the `cluster-admin` role, filter the cluster role bindings with:

```
k get clusterrolebindings | grep cluster-admin
```

The output may look like this:

```
cluster-admin                       12m   ClusterRole/cluster-admin
helm-kube-system-traefik           12m   ClusterRole/cluster-admin
helm-kube-system-traefik-crd       12m   ClusterRole/cluster-admin
```

Now, inspect the `cluster-admin` binding in detail:

```
k describe clusterrolebindings cluster-admin
```

You should see a section similar to this:

```
Name:         cluster-admin
Labels:       kubernetes.io/bootstrapping=rbac-defaults
Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
Role:
  Kind:    ClusterRole
  Name:    cluster-admin
Subjects:
  Kind    Name              Namespace
  ----    ----              ---------
  Group   system:masters
```

This output confirms that the `cluster-admin` role is bound to the `system:masters` group.

To understand the full range of permissions granted, describe the cluster role itself:

```
k describe clusterrole cluster-admin
```

The result includes a policy rule with wildcards:

```
Name:         cluster-admin
Labels:       kubernetes.io/bootstrapping=rbac-defaults
Annotations:  rbac.authorization.kubernetes.io/autoupdate: true
PolicyRule:
  Resources        Non-Resource URLs  Resource Names  Verbs
  ___________      _________________  ______________  _____
  **               []                 []              [*]
```

This rule signifies that the `cluster-admin` role can perform any action on any resource within the cluster.

---

## Granting Node Access to Michelle

Suppose Michelle, a new team member, requires access to view nodes. Even though the `cluster-admin` role grants full privileges, creating a custom role for node-specific operations can enforce a principle of least privilege.

Create a cluster role named `michelle-role` with the permissions `get`, `list`, and `watch` on nodes:

```
kubectl create clusterrole michelle-role --verb=get,list,watch --resource=nodes
```

Bind this role to Michelle by creating a cluster role binding:

```
kubectl create clusterrolebinding michelle-role-binding --clusterrole=michelle-role --user=michelle
```

Confirm the binding details with:

```
k describe clusterrolebinding michelle-role-binding
```

Finally, test Michelle’s node access:

```
k get nodes --as michelle
```

This should display the list of nodes accessible to her.

> [!important]
> **Tip**
>
> Creating targeted roles ensures that team members have only the permissions needed for their current responsibilities.

---

## Extending Michelle’s Permissions to Storage

As Michelle’s responsibilities expand, she now requires access to storage resources, such as persistent volumes and storage classes.

First, review available API resources to verify the exact resource names and versions:

```
kubectl api-resources
```

This command lists all available resources along with their short names, API groups, and versions.

Create a new cluster role called `storage-admin` with permissions to `list`, `create`, `get`, and `watch` on persistent volumes and storage classes:

```
k create clusterrole storage-admin --resource=persistentvolumes,storageclasses --verb=list,create,get,watch
```

Verify the role with:

```
k describe clusterrole storage-admin
```

You should see output similar to:

```
Name: storage-admin
PolicyRule:
  Resources                             Non-Resource URLs  Resource Names  Verbs
  persistentvolumes                     []                 []              [list create get watch]
  storageclasses.storage.k8s.io         []                 []              [list create get watch]
```

Finally, bind the new role to Michelle:

```
k create clusterrolebinding michelle-storage-admin --user=michelle --clusterrole=storage-admin
```

Check the binding details using:

```
k describe clusterrolebinding michelle-storage-admin
```

This confirms that Michelle now has the necessary permissions to manage storage resources.

---

## Kubernetes API Resources Overview

For a complete overview of Kubernetes resources, including their short names and API versions, use the following command:

```
kubectl api-resources
```

This command outputs a detailed list, including items such as:

- nodes (no) with API version v1
- persistentvolumeclaims (pvc) with API version v1
- pods (po) with API version v1
- … and many more resources

This overview is invaluable when you create resource definitions and need to know whether a resource is namespaced or available cluster-wide.

![The image shows a terminal output listing Kubernetes resources, their API versions, availability status, and descriptions, likely from a `kubectl api-resources` command.](https://kodekloud.com/kk-media/image/upload/v1752869962/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Cluster-Roles/frame_480.jpg)

---

## Conclusion

In summary, this article guided you through inspecting cluster roles and cluster role bindings in Kubernetes. You examined the `cluster-admin` role and its binding to the `system:masters` group, then created a tailored role and binding for Michelle to access nodes. Finally, you extended her permissions to cover storage resources by setting up a `storage-admin` role and the corresponding binding. These steps illustrate how Kubernetes RBAC can be efficiently adapted to meet evolving team responsibilities.

> [!important]
> **Summary**
>
> Leveraging custom roles and bindings not only enhances security by enforcing the principle of least privilege but also simplifies management as responsibilities within the team evolve.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/cee9fef5-f409-40d3-949f-91efa928cb5b)**
>
> Watch video content
