# RBAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/RBAC)

---

## Table of Contents

- RBAC
  - Creating a Role
  - Binding the Role to a User
  - Verifying Roles and Bindings
  - Checking Permissions
  - Restricting Access to Specific Resources
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# RBAC

In this lesson, you'll learn about role-based access control (RBAC) in Kubernetes. RBAC enables you to define roles with specific permissions and bind those roles to users or groups, ensuring secure and controlled access within your cluster. We'll walk through creating a role, binding it to a user, verifying configurations, and restricting access to specific resources.

## Creating a Role

A role in Kubernetes is defined in a YAML file that outlines the permitted actions under the following key elements:

- **apiVersion:** Must be set to `rbac.authorization.k8s.io/v1`.
- **kind:** Should be `Role`.
- **metadata.name:** The name of your role (e.g., "developer").
- **rules:** A list describing the API groups, resources, and verbs (actions) that are allowed.

For example, to create a role that allows developers to manage pods and create ConfigMaps, use the following YAML:

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
  resources: ["ConfigMap"]
  verbs: ["create"]
```

After saving the YAML file (for instance, as `developer-role.yaml`), create the role with:

```
kubectl create -f developer-role.yaml
```

> [!important]
> **Note**
>
> Roles and role bindings are namespaced. In the example above, the role is created in the default namespace unless you specify otherwise within the metadata.

## Binding the Role to a User

To grant the permissions defined in the role to a user, you need to create a role binding. A role binding links a user (or group) to a role. The YAML for a role binding includes:

- **metadata.name:** A unique name for the role binding (e.g., "devuser-developer-binding").
- **subjects:** The user, group, or service account to which permissions are granted.
- **roleRef:** A reference to the role created previously.

Below is an example that binds the "developer" role to the user "dev-user":

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

Create the role binding by running:

```
kubectl create -f devuser-developer-binding.yaml
```

## Verifying Roles and Bindings

To confirm that the role and its binding have been created successfully, you can list them using the following commands:

List all roles in the current namespace:

```
kubectl get roles
```

Example output:

```
NAME         AGE
developer    4s
```

List all role bindings:

```
kubectl get rolebindings
```

Example output:

```
NAME                      AGE
devuser-developer-binding  24s
```

To view detailed information about a specific role, use:

```
kubectl describe role developer
```

This command displays details such as allowed resources and permissions, for example:

```
Name:         developer
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources  Non-Resource URLs  Resource Names  Verbs
  --------  ------------------  --------------  -----
  ConfigMap  []                  []              [create]
  pods       []                  []              [list, get, create, update, delete]
```

Similarly, inspect the details of the role binding with:

```
kubectl describe rolebinding devuser-developer-binding
```

The output might look like this:

```
Name:                     devuser-developer-binding
Labels:                   <none>
Annotations:              <none>
Role:
  Kind:       Role
  Name:       developer
Subjects:
  Kind  Name      Namespace
  ----  ----      ---------
  User  dev-user
```

## Checking Permissions

You can verify if you or another user have access to particular resources using the `kubectl auth can-i` command. For example:

To check if you can create deployments:

```
kubectl auth can-i create deployments
```

Example output:

```
yes
```

To check if you have permissions to delete nodes:

```
kubectl auth can-i delete nodes
```

Example output:

```
no
```

If you want to check permissions for a different user (like "dev-user") without switching accounts, use the `--as` flag. For example, if the dev user has permission to create pods but not deployments, these commands will reflect that:

```
kubectl auth can-i create deployments
yes
kubectl auth can-i delete nodes
no
kubectl auth can-i create deployments --as=dev-user
no
kubectl auth can-i create pods --as=dev-user
yes
```

Remember, you can also specify the namespace with the `--namespace` flag if needed.

## Restricting Access to Specific Resources

RBAC in Kubernetes allows you to fine-tune permissions at a granular level. Instead of granting permissions universally to a resource type, you can restrict them to specific resources using the `resourceNames` field. For example, to allow a user to interact only with pods named "blue" and "orange", define the role as follows:

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

This configuration limits actions strictly to the specified pods.

## Conclusion

In this lesson, we covered how to configure RBAC in Kubernetes by:

- Creating a role with defined permissions.
- Binding a user to that role using a role binding.
- Verifying roles and permissions through `kubectl` commands.
- Checking and testing user permissions.
- Restricting access to specific resources for enhanced security.

For additional information on Kubernetes RBAC, consider reviewing the [Kubernetes Documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/). Continue practicing by applying these concepts to secure your cluster effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/250ed868-3d01-4c71-bd30-ec82841a7538)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/3a9a1cb3-c889-472b-9fc2-48bff380c595)**
>
> Practice lab
