# kubectl auth can i - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Prerequisites/kubectl-auth-can-i)

---

## Table of Contents

- kubectl auth can i
  - Analyzing Role and RoleBinding Permissions
  - Increasing Verbosity for Detailed Debugging
  - Summary Table
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Prerequisites

# kubectl auth can i

In this lesson, we explore how to troubleshoot Kubernetes RBAC permissions using the "kubectl auth can-i" command. Previously, we discussed commands for troubleshooting common resources such as pods, deployments, and services. Now, we'll shift our focus to analyzing permissions around roles, role bindings, and service accounts within the RBAC framework.

The basic command structure is:

```
kubectl auth can-i
```

![The image shows a terminal window with a command prompt labeled "controlplane" and a blinking cursor, ready for input.](https://kodekloud.com/kk-media/image/upload/v1752880429/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-kubectl-auth-can-i/controlplane-terminal-command-prompt.jpg)

This command is used to determine whether a given subject is permitted to perform a specific action on a cluster resource. The command follows this sequence:

1.  Specify the verb (e.g., list, get, update, patch, delete).
2.  Specify the target resource.
3.  Optionally, specify the namespace.

For example, to verify if you can list pods in the "monitoring" namespace, run:

```
kubectl auth can-i list pods -n monitoring
```

If the output is "yes," it indicates that the current user has the required permission.

> [!important]
> **Note**
>
> By default, if no user or service account is explicitly mentioned, the command checks permissions for the current authenticated user.

To confirm your current user, execute:

```
kubectl auth whoami
```

The output might look like this:

```
controlplane ~ ➜  kubectl auth can-i list pods -n monitoring
yes
controlplane ~ ➜  kubectl auth whoami
ATTRIBUTE  VALUE
Username   kubernetes-admin
Groups     [kubeadm:cluster-admins system:authenticated]
controlplane ~ ➜
```

In the example above, the current user is "kubernetes-admin," which typically has full authorization within the cluster.

## Analyzing Role and RoleBinding Permissions

To examine the permissions assigned to subjects other than the current user, begin by listing the roles in a specific namespace. For instance, if you have a role named "pod-reader" in the default namespace, fetch its details using:

```
kubectl get role pod-reader -n default -o yaml
```

This output will show that the "pod-reader" role is permitted to perform verbs such as "get," "watch," and "list" on the "pods" resource.

Next, inspect the role bindings with:

```
kubectl get rolebindings -n default
```

The output might appear as follows:

```
NAME       ROLE            AGE
read-pods  Role/pod-reader 47m
```

To view detailed information for the "read-pods" role binding, run:

```
kubectl get rolebinding read-pods -n default -o yaml
```

This YAML output confirms that the "read-pods" role binding associates the "pod-reader" role with a user named Jane and with the default service account. As a result, Jane is allowed to get, watch, and list pods in the default namespace.

You can use the "kubectl auth can-i" command to verify these permissions. For example, to check if Jane can get pods:

```
kubectl auth can-i get pods --as=jane -n default
```

A response of "yes" confirms the permission. Conversely, if you attempt a verb that Jane is not authorized for, such as delete:

```
kubectl auth can-i delete pods --as=jane -n default
```

The output will be "no".

Similarly, when verifying permissions for service accounts, include the "system:serviceaccount" prefix with the namespace. To check if the default service account can delete pods, use:

```
kubectl auth can-i delete pods --as=system:serviceaccount:default:default -n default
```

The response will indicate that deleting pods is not allowed.

The "kubectl auth can-i" command is incredibly useful when managing multiple service accounts, roles, and role bindings. It helps clarify why a particular subject can or cannot perform specific actions on a resource.

## Increasing Verbosity for Detailed Debugging

For advanced troubleshooting, you can augment the "kubectl auth can-i" command with increased verbosity using the "--v=10" flag. This provides a detailed breakdown of the RBAC evaluation process. For instance:

```
controlplane ~ ➜  kubectl auth can-i get pods --as=jane -n default
yes
controlplane ~ ➜  kubectl auth can-i delete pods --as=jane -n default
no
controlplane ~ ➜  kubectl auth can-i get pods --as=jane --v=10 -n default
```

The verbose output includes detailed messages, explaining why the action is permitted or denied. You might see log entries that look like this for an allowed action:

```
I0427 21:41:36.690738  18393 request.go:12121] Rejected Request Body: {"kind":"SelfSubjectAccessReview","apiVersion":"authorization.k8s.io/v1", ...}
I0427 21:41:36.690805  18393 round_trippers.go:567] POST https://controlplane:6443/apis/authorization.k8s.io/v1/selfsubjectaccessreviews 201 Created in 1 ms
I0427 21:41:36.692449  18393 round_trippers.go:572] HTTP Statistics: GetConnection 0 ms ServerProcessing 1 ms Duration 1 ms
```

And for a denied "delete" action:

```
I0427 21:42:20.668202   18650 request.go:1212] Request Body: {"kind":"SelfSubjectAccessReview","apiVersion":"authorization.k8s.io/v1", ...}
I0427 21:42:20.668909   18650 round_trippers.go:466] curl -k -XPOST -H "Accept: application/json" ...
I0427 21:42:20.669841   18650 round_trippers.go:553] POST https://controlplane:6443/apis/authorization.k8s.io/v1/selfsubjectaccessreviews 201 Created in 1 ms
I0427 21:42:20.669870   18650 round_trippers.go:580] HTTP Statistics: GetConnection 0 ms ServerProcessing 1 ms Duration 1 ms
```

> [!important]
> **Important**
>
> Remember that Kubernetes RBAC is allow-only: any action is implicitly denied unless a role or role binding explicitly grants permission.

Using increased verbosity with "--v=10" can be a potent tool for debugging complex RBAC configurations and ensuring that your cluster's authorization rules are correctly enforced.

## Summary Table

| Command                 | Use Case                        | Example                                          |
| ----------------------- | ------------------------------- | ------------------------------------------------ |
| kubectl auth can-i      | Check if an action is permitted | `kubectl auth can-i list pods -n monitoring`     |
| kubectl auth whoami     | Identify the current user       | `kubectl auth whoami`                            |
| kubectl get role        | View role details               | `kubectl get role pod-reader -n default -o yaml` |
| kubectl get rolebinding | List role bindings              | `kubectl get rolebindings -n default`            |

This guide should help you effectively troubleshoot and understand your Kubernetes RBAC permission settings using the "kubectl auth can-i" command. For further details, refer to the official [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/09c2c8a6-ba29-4d55-bea1-cd8584be9107/lesson/69b73fee-3b03-4b93-8e60-4131f3f91e67)**
>
> Watch video content
