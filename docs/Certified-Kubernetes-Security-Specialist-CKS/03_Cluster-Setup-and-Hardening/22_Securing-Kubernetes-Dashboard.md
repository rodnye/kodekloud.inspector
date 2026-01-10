# Securing Kubernetes Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Securing-Kubernetes-Dashboard)

---

## Table of Contents

- Securing Kubernetes Dashboard
  - Configuring Token-Based Authentication
  - Alternative Authentication with KubeConfig
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Securing Kubernetes Dashboard

This guide explains the authentication mechanisms available for the Kubernetes Dashboard. You can log in using either a token or a KubeConfig file.

When using a token, you need to create a dedicated user and grant it the necessary permissions via role-based access control (RBAC). For detailed instructions on creating a sample user, refer to the [Kubernetes Dashboard documentation](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/). However, note that the documentation instructions often grant cluster-admin access. It is essential to assign only the permissions required for your use case, which might be restricted to a specific namespace or particular resources.

> [!important]
> **Best Practice**
>
> When assigning permissions, always follow the principle of least privilege. This minimizes security risks by limiting the access scope.

## Configuring Token-Based Authentication

To set up token-based authentication, use the consolidated configuration below to create a service account and a corresponding ClusterRoleBinding. This configuration grants the necessary permissions for accessing the dashboard:

```
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
EOF


cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```

After creating the user and role binding, you need to retrieve the secret that holds the token. This token is used for authenticating to the dashboard interface.

To view the details of the token secret, execute the following command:

```
kubectl describe secret kubernetes-dashboard-token-fc2fq
```

The command output will include critical information such as:

- Certificate authority data
- Namespace
- The token itself

Example output:

```
Name:         kubernetes-dashboard-token-fc2fq
Namespace:    default
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: kubernetes-dashboard
              kubernetes.io/service-account.uid: 635c208a-6752-43f7-9ca4-e43665df1353


Type:  kubernetes.io/service-account-token


Data
====
ca.crt: 1066 bytes
namespace: 7 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjxSgwiMAtMXdmbHkydEdOdXVhcjM2FFR3hqOVpkR0lEYlpxM3MiOiJrdWJcm5l...
```

## Alternative Authentication with KubeConfig

Alternatively, you can authenticate using a KubeConfig file. This method is useful if you want to avoid using tokens. Throughout this course, you will learn more about creating users, configuring roles and role bindings, and effectively using both authentication methods with the Kubernetes Dashboard.

Continue exploring this guide to master these techniques, and see you in the next article.

For further reading, check out:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/7b23a60f-32a5-47f1-a6c5-f44276880bf4)**
>
> Watch video content
