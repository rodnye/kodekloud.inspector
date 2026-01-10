# Role Based Access Controls - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Role-Based-Access-Controls)

---

## Table of Contents

- Role Based Access Controls
  - Creating a Role
  - Binding a User to the Role
  - Verifying Roles and Role Bindings
  - Testing Access Permissions
  - Granting Access to Specific Resources
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Role Based Access Controls

In this lesson, we dive into Kubernetes Role-Based Access Control (RBAC), providing step-by-step instructions on how to create and manage roles and role bindings within a namespace. You'll learn how to define specific permissions for users, bind these permissions to users, and verify their access using kubectl commands.

## Creating a Role

To start, you need to define a Role object. Create a YAML file (e.g., developer-role.yaml) and set the API version to `rbac.authorization.k8s.io/v1` and the kind to `Role`. In this example, we define a role named "developer" with permissions that allow developers to manage pods and create configmaps. Each permission rule contains three key sections: API groups, resources, and verbs. For resources in the core API group, leave the API group field blank.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["list", "get", "create", "update", "delete"]
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["create"]
```

Create the role using the following command:

```
kubectl create -f developer-role.yaml
```

> [!important]
> **Note**
>
> Remember that roles in Kubernetes are namespace-specific. Ensure the YAML definition targets the correct namespace if needed.

## Binding a User to the Role

Once the role is defined, you need to link a user to this role by creating a RoleBinding. A RoleBinding associates a user with the specified role within a given namespace. In this example, we'll create a role binding named `devuser-developer-binding` that assigns the "developer" role to the user `dev-user` in the default namespace.

Below is the YAML definition for the role binding (e.g., devuser-developer-binding.yaml):

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: devuser-developer-binding
subjects:
- kind: User
  name: dev-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
```

Create the role binding with the command:

```
kubectl create -f devuser-developer-binding.yaml
```

## Verifying Roles and Role Bindings

After creating the role and role binding, you can verify them using the following kubectl commands:

- To list roles:

  ```
  kubectl get roles
  ```

  Example output:

  ```
  NAME         AGE
  developer    4s
  ```

- To list role bindings:

  ```
  kubectl get rolebindings
  ```

  Example output:

  ```
  NAME                        AGE
  devuser-developer-binding   24s
  ```

To get detailed information about the role, run:

```
kubectl describe role developer
```

Sample output:

```
Name:         developer
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources      Non-Resource URLs  Resource Names  Verbs
  --------       ------------------  ---------------  ----
  configmaps    []                  []               [create]
  pods          []                  []               [get watch list create delete]
```

Similarly, to examine the role binding details, use:

```
kubectl describe rolebinding devuser-developer-binding
```

Expected output:

```
Name:                   devuser-developer-binding
Labels:                 <none>
Annotations:            <none>
Role:
  Kind:                Role
  Name:                developer
Subjects:
  Kind   Name       Namespace
  ----   ----       ---------
  User   dev-user
```

## Testing Access Permissions

You can test whether a user has access to specific Kubernetes resources using the `kubectl auth can-i` command:

```
kubectl auth can-i create deployments
```

Expected output:

```
yes
```

And if you test deleting nodes:

```
kubectl auth can-i delete nodes
```

Expected output:

```
no
```

If you need to simulate actions as another user, use the `--as` flag. Even though the developer role does not have permission to create deployments, it can create pods:

```
kubectl auth can-i create deployments --as dev-user
```

Expected output:

```
no
```

```
kubectl auth can-i create pods --as dev-user
```

Expected output:

```
yes
```

You can also specify a particular namespace using the `--namespace` flag if the permissions are scoped accordingly.

## Granting Access to Specific Resources

In some cases, you might want to restrict a user's permissions to specific resources. For instance, if you need to allow a user to manage only two pods named "blue" and "orange" within a namespace, refine the role rule by including the `resourceNames` field:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "create", "update"]
  resourceNames: ["blue", "orange"]
```

> [!important]
> **Warning**
>
> Be cautious when specifying resource names. Only include the exact resources you intend to allow access to, as this will restrict access to other resources of the same type.

## Conclusion

This lesson has demonstrated how to set up and manage RBAC in Kubernetes. By creating roles and role bindings, you can control user permissions precisely within a namespace. For further practice, refer to Kubernetes' official documentation and experiment with real RBAC configurations in your environment.

For additional resources, consider these links:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes RBAC Concepts](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

Happy coding and secure your Kubernetes clusters with effective RBAC management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/585c7ebe-dfca-4838-8150-e3eabf711941)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/3e098e78-e040-4af7-babd-e21a95eb668f)**
>
> Practice lab
