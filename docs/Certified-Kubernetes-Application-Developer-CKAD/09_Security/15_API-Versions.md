# API Versions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/API-Versions)

---

## Table of Contents

- API Versions
  - Overview of API Organization
  - API Version Stages
  - Supporting Multiple Versions in an API Group
  - Determining the Preferred and Storage Versions
  - Enabling or Disabling Specific API Versions
  - Conclusion
  - Watch Video
    - Alpha
    - Beta
    - GA (Stable)

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# API Versions

In this lesson, we explore API versions in Kubernetes—a topic that builds upon core concepts such as APIs, API groups, resources, and verbs. Understanding the evolution of these API versions—from experimental to stable—is key to effectively managing your Kubernetes configurations.

## Overview of API Organization

Kubernetes organizes everything under its API into API groups (e.g., apps, extensions, networking). Each API group can support multiple versions. A version labeled as "v1" typically indicates a generally available (GA) and stable release. Other labels like v1beta1 or v1alpha1 denote beta or alpha stages respectively. Let’s break down what each of these stages means.

## API Version Stages

### Alpha

An alpha version represents the initial development stage of an API. Once an API is added to the Kubernetes code base and included in a release for the first time, it is marked as alpha (for example, v1alpha1, v1alpha2). At this stage, the API is not enabled by default, may lack comprehensive end-to-end tests, and could contain bugs. For instance, at the time of recording, the API group `internal.apiserver.k8s.io` (which includes the StorageVersion resource) exists only in its alpha form.

If you attempt to create an object using the following YAML:

```
apiVersion: internal.apiserver.k8s.io/v1alpha1
kind: StorageVersion
metadata:
  name: sv-1
spec:
```

the API server will reject the creation because the alpha version is not enabled by default. This version is intended for expert users who want to test and provide early feedback.

### Beta

After addressing major bugs in the alpha API and adding comprehensive tests, the API advances to beta (e.g., v1beta1, v1beta2). Beta APIs are enabled by default and include end-to-end tests. While minor bugs might still exist, there is a commitment from the community to advance these APIs to GA. For example, the flow-control group is currently in the beta stage.

### GA (Stable)

An API promoted to GA has successfully navigated the beta phase, undergone multiple releases, and received numerous bug fixes. The version number drops any alpha or beta suffix, appearing simply as "v1." GA APIs are reliably enabled by default and become part of conformance tests. Most API groups, such as apps, authentication, authorization, certificates, and coordination, are now available in their GA versions.

![The image outlines API versioning stages: Alpha, Beta, and GA (Stable), detailing their version names, enablement, testing, reliability, support, and target audience.](https://kodekloud.com/kk-media/image/upload/v1752871272/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-API-Versions/frame_210.jpg)

> [!important]
> **Note**
>
> For production environments, always ensure you use GA versions of the APIs to maintain a stable and supported deployment.

## Supporting Multiple Versions in an API Group

An API group can support several versions simultaneously. For example, the apps group might offer v1, v1beta1, and v1alpha1, allowing you to reference any of these versions in your YAML file. Below are examples of a Deployment resource defined using different API versions:

```
# Example using apps/v1alpha1:
apiVersion: apps/v1alpha1
kind: Deployment
metadata:
  name: nginx
spec:
  # Deployment spec fields go here
---
# Example using apps/v1beta1:
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: nginx
spec:
  # Deployment spec fields go here
---
# Example using apps/v1 (the preferred and storage version):
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  # Deployment spec fields go here
```

While you can create an object with any supported API version, only one version is designated as the _preferred_ version. This is the version used by default with commands like `kubectl get deployment` or `kubectl explain deployment`. Furthermore, only one version—the _storage version_—is used to persist objects in etcd. If you create an object using a non-preferred version (like apps/v1alpha1 or apps/v1beta1), Kubernetes will automatically convert it to the storage version (typically apps/v1) before saving.

For example, after creating a Deployment using any API version, running these commands will show that it is stored as apps/v1:

```
kubectl get deployment
```

```
kubectl explain deployment
```

```
KIND:     Deployment
VERSION:  apps/v1
```

## Determining the Preferred and Storage Versions

When multiple API versions are available within a group, the preferred version is listed in the API group details. For example, querying the batch API group might return:

```
{
  "kind": "APIGroup",
  "apiVersion": "v1",
  "name": "batch",
  "versions": [
    {
      "groupVersion": "batch/v1",
      "version": "v1"
    },
    {
      "groupVersion": "batch/v1beta1",
      "version": "v1beta1"
    }
  ],
  "preferredVersion": {
    "groupVersion": "batch/v1",
    "version": "v1"
  }
}
```

While you can determine the preferred version via the API, the storage version remains hidden. To reveal the storage version, you can query the etcd database directly. For instance, using the etcdctl utility with the following command:

```
ETCDCTL_API=3 etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  get "/registry/deployments/default/blue" --print-value-only
```

You might receive output similar to:

```
apps/v1
Deployment


bluedefault"*${cf8dcd55-8819-4be2-85e7-bb71665c2ddf2ZB
successfully progressed8"2
```

This output confirms that the object is stored as apps/v1.

## Enabling or Disabling Specific API Versions

To modify which API versions are enabled, adjust the `--runtime-config` parameter of the kube-apiserver. For instance, if you need to enable alpha APIs that aren’t enabled by default, update the kube-apiserver's service configuration. Below is an example ExecStart configuration for kube-apiserver:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-cafile=/var/lib/kubernetes/ca.pem \
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/apiserver-etcd-client.key \
  --kubelet-https=true \
  --runtime-config=api/all \
  --service-account-key-file=/var/lib/kubernetes/service-account.pem \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  --client-ca-file=/var/lib/kubernetes/ca.pem \
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \
  --v=2
```

After updating the configuration to enable the desired API versions (specified as comma-separated values in the `--runtime-config` parameter), restart the kube-apiserver service for the changes to take effect.

> [!important]
> **Warning**
>
> Always back up your configuration and validate your changes in a non-production environment before applying them to production.

## Conclusion

This lesson provided an in-depth look at Kubernetes API versions, the significance of each version stage (Alpha, Beta, and GA), and how Kubernetes handles multiple API versions within a single API group. By understanding preferred and storage versions along with how to enable or disable specific API versions, you are better equipped to manage your Kubernetes infrastructure effectively.

Happy learning and stay tuned for more in-depth explorations of the Kubernetes API components!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/bdd9e106-7045-47ec-bb66-c4fd169999b9)**
>
> Watch video content
