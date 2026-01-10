# KubeConfig - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/KubeConfig)

---

## Table of Contents

- KubeConfig
  - Certificate Authentication with curl and kubectl
  - Understanding the Kubeconfig File
  - Viewing and Customizing Your Kubeconfig
  - Configuring Default Namespaces
  - Managing Certificates in Kubeconfig Files
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# KubeConfig

Welcome to this lesson on kubeconfig files in Kubernetes. In this session, we will dive into certificate-based authentication using both curl and kubectl, and demonstrate how a kubeconfig file simplifies access management across multiple clusters.

## Certificate Authentication with curl and kubectl

Previously, we generated a certificate for a user and utilized the certificate along with a key to query the Kubernetes REST API for a list of pods. For instance, if your cluster is named "my kube playground," you can make a curl request to the API server as follows:

```
curl https://my-kube-playground:6443/api/v1/pods \
  --key admin.key \
  --cert admin.crt \
  --cacert ca.crt
```

The API server then returns a response similar to this:

```
{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "selfLink": "/api/v1/pods"
  },
  "items": []
}
```

Likewise, when using the kubectl command-line tool, you can supply the same parameters:

```
kubectl get pods \
  --server https://my-kube-playground:6443 \
  --client-key admin.key \
  --client-certificate admin.crt \
  --certificate-authority ca.crt
```

The response in this case might be:

```
No resources found.
```

> [!important]
> **Tip**
>
> Instead of typing these options each time, streamline your workflow by moving them into a kubeconfig file.

## Understanding the Kubeconfig File

By default, kubectl searches for a kubeconfig file named "config" in the ~/.kube directory. Once properly set up, you can simply execute:

```
kubectl get pods
```

and kubectl will automatically use the configurations defined within the file.

The kubeconfig file is organized into three key sections:

- **Clusters:** Define the Kubernetes clusters you need access to (e.g., development, production, or clusters hosted by different cloud providers).
- **Users:** Specify the user accounts and associated credentials (such as admin, dev, or prod users) that have permissions on the clusters.
- **Contexts:** Link a cluster with a user by specifying which user should access which cluster. A context can also define a default namespace.

Below is an example of a basic kubeconfig file in YAML format:

```
apiVersion: v1
kind: Config
clusters:
- name: my-kube-playground  # values hidden…
- name: development
- name: production
- name: google
contexts:
- name: my-kube-admin@my-kube-playground
- name: dev-user@google
- name: prod-user@production
users:
- name: my-kube-admin
- name: admin
- name: dev-user
- name: prod-user
```

In this configuration, the server specification for the "my kube playground" cluster is defined in the clusters section, the admin user’s credentials are listed in the users section, and the context named `my-kube-admin@my-kube-playground` ties them together. Multiple contexts can be created for different clusters and users, and you can set a default context using the `current-context` field.

## Viewing and Customizing Your Kubeconfig

To view the current kubeconfig settings, run:

```
kubectl config view
```

This command outputs details about clusters, users, contexts, and the active context. An example output might look like:

```
apiVersion: v1
kind: Config
current-context: kubernetes-admin@kubernetes
clusters:
- cluster:
    certificate-authority-data: REDACTED
    server: https://172.17.0.5:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

If you want to view a custom kubeconfig file, use the `--kubeconfig` option:

```
kubectl config view --kubeconfig=my-custom-config
```

A sample custom configuration may appear as follows:

```
apiVersion: v1
kind: Config
current-context: my-kube-admin@my-kube-playground
clusters:
- name: my-kube-playground
- name: development
- name: production
contexts:
- name: my-kube-admin@my-kube-playground
- name: prod-user@production
users:
- name: my-kube-admin
- name: prod-user
```

To change the active context—for example, switching from the admin user to the production user—execute:

```
kubectl config use-context prod-user@production
```

After running this command, the kubeconfig is updated accordingly. The new configuration might look like this:

```
apiVersion: v1
kind: Config
current-context: prod-user@production
clusters:
- name: my-kube-playground
- name: development
- name: production
contexts:
- name: my-kube-admin@my-kube-playground
- name: prod-user@production
users:
- name: my-kube-admin
- name: prod-user
```

Additional kubectl config commands can be used to update or delete entries as needed.

## Configuring Default Namespaces

Namespaces in Kubernetes help segment clusters into multiple virtual clusters. You can configure a context to automatically use a specific namespace. Consider the following kubeconfig snippet without a default namespace:

```
apiVersion: v1
kind: Config
clusters:
- name: production
  cluster:
    certificate-authority: ca.crt
    server: https://172.17.0.51:6443
contexts:
- name: admin@production
  context:
    cluster: production
    user: admin
users:
- name: admin
  user:
    client-certificate: admin.crt
    client-key: admin.key
```

To specify a default namespace (for example, "finance"), simply add the `namespace` field:

```
apiVersion: v1
kind: Config
clusters:
- name: production
  cluster:
    certificate-authority: ca.crt
    server: https://172.17.0.51:6443
contexts:
- name: admin@production
  context:
    cluster: production
    user: admin
    namespace: finance
users:
- name: admin
  user:
    client-certificate: admin.crt
    client-key: admin.key
```

When you switch to this context, kubectl will automatically operate within the specified namespace.

## Managing Certificates in Kubeconfig Files

> [!important]
> **Certificate Management**
>
> For best practices, use full paths for certificate files in your kubeconfig file. Alternatively, you can embed the certificate data directly using the `certificate-authority-data` field.

For instance, specifying a full path looks like this:

```
apiVersion: v1
kind: Config
clusters:
- name: production
  cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
```

Alternatively, you may embed the certificate data directly:

```
apiVersion: v1
kind: Config
clusters:
- name: production
  cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
    certificate-authority-data: LS0tLS1CRUdJTiBD...
```

To decode base64 encoded certificate data, use the following command:

```
echo "LS0...bnJ" | base64 --decode
```

The decoded output will resemble:

```
-----BEGIN CERTIFICATE-----
MIICDCCAuCAQAwE...
-----END CERTIFICATE-----
```

## Conclusion

This concludes our detailed exploration of kubeconfig files in Kubernetes. Use these best practices and examples to manage your clusters efficiently and troubleshoot any configuration issues you may encounter.

For further learning, explore the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Transcribed by https://otter.ai

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/61730ba4-e480-4089-a0d1-931d98cd3dff)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/7963ce63-6a50-4f9c-b197-7d23ab860144)**
>
> Practice lab
