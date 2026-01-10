# Solution KubeConfig - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-KubeConfig)

---

## Table of Contents

- Solution KubeConfig
  - Inspecting the Default KubeConfig File
  - Creating a Custom KubeConfig File
  - Switching Contexts Securely
  - Reviewing the Updated Configuration
  - Troubleshooting Certificate File Errors
  - Conclusion
  - Watch Video
    - Key Observations

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution KubeConfig

This lab demonstrates how to manage the kubeconfig file to securely configure your Kubernetes context. You will learn how to inspect the default kubeconfig file, create and switch between multiple contexts, and troubleshoot certificate issues effectively.

## Inspecting the Default KubeConfig File

Begin by verifying your HOME environment variable and listing the contents of the .kube directory to locate the default kubeconfig file:

```
root@controlplane ~ ➜ echo $HOME
/root
root@controlplane ~ ➜ pwd
/root
root@controlplane ~ ➜ ls .kube/
cache  config
root@controlplane ~ ➜ ls .kube/config
.kube/config
```

Next, open the file to inspect its contents:

```
root@controlplane ~ ➜ cat .kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBid...
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDR...
```

> [!important]
> **Note**
>
> The default kubeconfig typically includes a single cluster, user, and context, providing a simple setup for initial interactions.

## Creating a Custom KubeConfig File

Next, create a new kubeconfig file—named "my kubeconfig"—in the root directory. This file extends configurations to include multiple clusters, contexts, and users.

After creating the file, verify its existence and inspect its contents:

```
root@controlplane ~ ➜ ls .kube/config
.kube/config


root@controlplane ~ ➜ cat .kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tL...WlBzJQ==
  ...
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  ...
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tL....==
  ...
```

The custom configuration file might include multiple contexts and user setups. For example, here is an excerpt from the file that demonstrates this:

```
contexts:
- name: test-user@development
  context:
    cluster: development
    user: test-user


- name: aws-user@kubernetes-on-aws
  context:
    cluster: kubernetes-on-aws
    user: aws-user


- name: test-user@production
  context:
    cluster: production
    user: test-user


- name: research
  context:
    cluster: test-cluster-1
    user: dev-user


users:
- name: test-user
  user:
    client-certificate: /etc/kubernetes/pki/users/test-user/test-user.crt
    client-key: /etc/kubernetes/pki/users/test-user/test-user.key
- name: dev-user
  user:
    client-certificate: /etc/kubernetes/pki/users/dev-user/developer-user.crt
    client-key: /etc/kubernetes/pki/users/dev-user/dev-user.key
- name: aws-user
  user:
    client-certificate: /etc/kubernetes/pki/users/aws-user/aws-user.crt
    client-key: /etc/kubernetes/pki/users/aws-user/aws-user.key


current-context: test-user@development
preferences: {}
```

### Key Observations

- Four clusters and contexts are defined.
- The context named "research" uses the user "dev-user".
- For the AWS user, the certificate is defined as "aws-user.crt".
- The default current context is set to "test-user@development".

## Switching Contexts Securely

Suppose you need to switch the current context to use the "dev-user" for accessing "test-cluster-1". Since the "research" context is already configured for this purpose, execute the following command:

```
root@controlplane ~ ✗ kubectl config use-context research --kubeconfig /root/my-kube-config
Switched to context "research".
root@controlplane ~ ✗
```

Once switched, the current context in the file updates to "research". To utilize this configuration without specifying the --kubeconfig option every time, move the file to the default location.

## Reviewing the Updated Configuration

Before moving, refer to the current configuration:

```
clusters:
- cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
    server: https://controlplane:6443
    name: test-cluster-1
contexts:
- context:
    cluster: kubernetes-on-aws
    user: aws-user
  name: aws-user@kubernetes-on-aws
- context:
    cluster: test-cluster-1
    user: dev-user
  name: research
- context:
    cluster: development
    user: test-user
  name: test-user@development
- context:
    cluster: production
    user: test-user
  name: test-user@production
current-context: research
kind: Config
preferences: {}
users:
- name: aws-user
  user:
    client-certificate: /etc/kubernetes/pki/users/aws-user/aws-user.crt
    client-key: /etc/kubernetes/pki/users/aws-user/aws-user.key
- name: dev-user
  user:
    client-certificate: /etc/kubernetes/pki/users/dev-user/developer-user.crt
    client-key: /etc/kubernetes/pki/users/dev-user/dev-user.key
- name: test-user
  user:
    client-certificate: /etc/kubernetes/pki/users/test-user/test-user.crt
    client-key: /etc/kubernetes/pki/users/test-user/test-user.key
```

Now, move the custom kubeconfig file to the default directory:

```
root@controlplane ~ # mv /root/my-kube-config /root/.kube/config
root@controlplane ~ #
```

## Troubleshooting Certificate File Errors

After setting the new kubeconfig as the default, running Kubernetes commands may result in an error if certificate paths are misconfigured. For example:

```
root@controlplane ~ ➜ kubectl get nodes
error: unable to read client-cert /etc/kubernetes/pki/users/dev-user/developer-user.crt for dev-user due to open /etc/kubernetes/pki/users/dev-user/developer-user.crt: no such file or directory
```

This error implies that the dev-user's client certificate is incorrectly referenced. Check the actual certificate file in the directory:

```
root@controlPlane ~ ➜ ls /etc/kubernetes/pki/users
aws-user  dev-user  test-user
root@controlPlane ~ ➜ ls /etc/kubernetes/pki/users/dev-user/
dev-user.crt  dev-user.csr  dev-user.key
```

> [!important]
> **Warning**
>
> The error is due to a typo: the kubeconfig references "developer-user.crt" whereas the correct file name is "dev-user.crt". Ensure your file paths are accurate to avoid authentication issues.

To fix this, update your kubeconfig file by replacing:

```
client-certificate: /etc/kubernetes/pki/users/dev-user/developer-user.crt
```

with:

```
client-certificate: /etc/kubernetes/pki/users/dev-user/dev-user.crt
```

After making this correction, re-run your command to verify access:

```
root@controlplane ~ ➜ kubectl get nodes
```

The cluster should now be accessible without certificate errors.

## Conclusion

By following this lab, you have learned how to manage multiple contexts and users within your kubeconfig file, switch contexts efficiently, and troubleshoot common certificate issues. This practical approach ensures secure and seamless interaction with your Kubernetes clusters.

For further reading on Kubernetes configurations, consider exploring the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/679350d3-27a0-442f-a11f-30ec89525764)**
>
> Watch video content
