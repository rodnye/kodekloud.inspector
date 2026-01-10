# Solution KubeConfig - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Solution-KubeConfig)

---

## Table of Contents

- Solution KubeConfig
  - Locating the Default kubeconfig File
  - Examining kubeconfig Details
  - Creating and Inspecting a New kubeconfig File
  - Switching Context to Use the Dev User
  - Setting the New kubeconfig File as Default
  - Troubleshooting a Certificate Error
  - Watch Video
    - Key Details in the New Configuration
    - Fixing the Issue

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Solution KubeConfig

In this guide, we'll walk through a comprehensive lab exercise focused on exploring the kubeconfig file and switching contexts for kubectl. We'll inspect the default kubeconfig file’s clusters, users, and contexts, troubleshoot a certificate issue, and finally apply changes to set a new kubeconfig file as the default configuration.

---

## Locating the Default kubeconfig File

First, determine the location of your default kubeconfig file by leveraging the HOME environment variable. The default file is stored in the hidden `.kube` directory:

```
root@controlplane ~ # echo $HOME
/root
root@controlplane ~ # pwd
/root
root@controlplane ~ # ls .kube/
cache  config
root@controlplane ~ # ls .kube/config
.kube/config
```

Viewing the file reveals that it contains one cluster, one user, and one context:

```
root@controlplane ~ # cat .kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0t... (truncated for brevity)
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
```

Thus, the default kubeconfig file located at `/root/.kube/config` defines:

- A single cluster named "kubernetes"
- One context named "kubernetes-admin@kubernetes"
- One user named "kubernetes-admin"

---

## Examining kubeconfig Details

Review the kubeconfig file to answer the following:

1.  **Number of Clusters:**
    - The kubeconfig defines one cluster.

2.  **Number of Users:**
    - Only one user is configured, which includes certificate information.

3.  **Number of Contexts:**
    - There is a single context defined.

4.  **User Configured in the Current Context:**
    - The current context "kubernetes-admin@kubernetes" specifies the user "kubernetes-admin."> [!important]
      > **Note**
      >
      > Although the context name might suggest a naming convention, always inspect the actual `user` field.

5.  **Name of the Cluster in the Default Config:**
    - The cluster is named "kubernetes."

For clarity, here is a more detailed excerpt from the default kubeconfig file:

```
root@controlplane ~ # cat .kube/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: L0tSL1CRDJtiBRDVSUJZQ0FURS0tL0tSL0tCkt1SJmVakNDQWhZ0F3SUJBZ0lCQURBTkJn...
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
```

---

## Creating and Inspecting a New kubeconfig File

A new kubeconfig file named "my kube config" has been created in the root directory. This configuration file contains multiple clusters, contexts, and users. Below is the complete configuration:

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

### Key Details in the New Configuration

- **Clusters:**  
  The file defines a total of 4 clusters.
- **Contexts:**  
  There are 4 contexts configured.
- **User in the "research" Context:**  
  The "research" context uses the "dev-user."
- **AWS User’s Client Certificate:**  
  The AWS user’s client certificate is sourced from `aws-user.crt`.
- **Current Context:**  
  Initially set to "test-user@development."

---

## Switching Context to Use the Dev User

To access "test-cluster-1" using the "research" context (which utilizes the dev user), run the following command. Be sure to specify the kubeconfig file containing the desired configuration:

```
root@controlplane ~ ⟶ kubectl config use-context research --kubeconfig /root/my-kube-config
Switched to context "research".
root@controlplane ~ ⟶
```

Running `kubectl config view` should now indicate that the current context is "research."

---

## Setting the New kubeconfig File as Default

To avoid specifying the kubeconfig file with each command, move the new configuration file to the default location (`/root/.kube/config`). The updated file appears as follows:

```
name: production
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

Open the file in your preferred editor to confirm that all changes are in place and that the current context is correctly set to "research."

---

## Troubleshooting a Certificate Error

With the current context set to "research," you might run into a certificate error when trying to access the cluster:

```
root@controlplane ~ ➜  kubectl get nodes
error: unable to read client-cert /etc/kubernetes/pki/users/dev-user/developer-user.crt for dev-user due to open /etc/kubernetes/pki/users/dev-user/developer-user.crt: no such file or directory
```

Inspect the certificate directory to verify file names:

```
root@controlplane ~ ⟶ ls /etc/kubernetes/pki/users/
aws-user  dev-user  test-user
root@controlplane ~ ⟶ ls /etc/kubernetes/pki/users/dev-user/
dev-user.crt  dev-user.csr  dev-user.key
```

The error is due to the configuration mistakenly referring to the certificate as `developer-user.crt` instead of the correct `dev-user.crt`.

### Fixing the Issue

Update the "dev-user" entry in your kubeconfig file by changing:

```
client-certificate: /etc/kubernetes/pki/users/dev-user/developer-user.crt
```

to:

```
client-certificate: /etc/kubernetes/pki/users/dev-user/dev-user.crt
```

After saving, verify the fix by running:

```
root@controlplane ~  # kubectl get nodes
NAME           STATUS   ROLES                    AGE   VERSION
controlplane   Ready    control-plane,master     25m   v1.23.0
root@controlplane ~  #
```

The command should now list the nodes, confirming that the configuration is successful.

---

This completes the lab exercise for configuring and troubleshooting the kubeconfig file. For more detailed Kubernetes documentation and troubleshooting guides, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/b537a52a-ab07-4df8-a866-4f067f581b90)**
>
> Watch video content
