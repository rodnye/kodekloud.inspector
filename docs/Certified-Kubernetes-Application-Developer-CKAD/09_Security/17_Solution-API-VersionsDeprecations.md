# Solution API VersionsDeprecations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Solution-API-VersionsDeprecations)

---

## Table of Contents

- Solution API VersionsDeprecations
  - Short Names for Resources
  - Determining the API Group for a Resource
  - Finding the Preferred Version for a Specific API Group
  - Enabling the v1alpha1 Version for RBAC.authorization.k8s.io
  - Installing the kubectl-convert Plugin
  - Converting an Ingress Manifest
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Solution API VersionsDeprecations

In this lesson, you'll learn how to address API versioning and deprecation issues in Kubernetes. We'll cover how to find resource short names, determine API groups, discover preferred API versions, and enable deprecated API endpoints. Follow along with the steps and code blocks below.

## Short Names for Resources

First, identify the short names for key resources such as Deployments, ReplicaSets, CronJobs, and Custom Resource Definitions (CRDs). Run the following command:

```
kubectl api-resources
```

Review the output to locate the following mappings:

- Deployments: **deploy**
- ReplicaSets: **rs**
- CronJobs: **cj**
- Custom Resource Definitions: **crd** (or **crds**)

An excerpt from the command output may look like this:

```
deployments                deploy
replicasets                rs
cronjobs                   cj
customresourcedefinitions  crd, crds
```

> [!important]
> **Quick Tip**
>
> Use the output of `kubectl api-resources` to quickly reference the abbreviated names in your commands.

## Determining the API Group for a Resource

To determine which API group a resource belongs to—for example, the Job resource—execute:

```
kubectl explain job
```

At the top of the output, you'll find details similar to:

```
KIND: Job
VERSION: batch/v1
```

This indicates that the Job belongs to the **batch** API group (the section before the slash) and is using version **v1**.

## Finding the Preferred Version for a Specific API Group

Next, find the preferred version for the `authorization.k8s.io` API group by following these steps:

1.  **Start a Local API Proxy:**  
    Run the following command to create a local proxy to the Kubernetes API server:

    ```
    kubectl proxy --port=8001 &
    ```

2.  **Query the API Group Details:**  
    With the proxy running in the background, use `curl` to fetch the API group's details:

    ```
    curl localhost:8001/apis/authorization.k8s.io
    ```

The JSON response will include a section for the preferred version:

```
{
   "kind": "APIGroup",
   "apiVersion": "v1",
   "name": "authorization.k8s.io",
   "versions": [
      {
         "groupVersion": "authorization.k8s.io/v1",
         "version": "v1"
      }
   ],
   "preferredVersion": {
      "groupVersion": "authorization.k8s.io/v1",
      "version": "v1"
   }
}
```

This confirms that the preferred version for `authorization.k8s.io` is **v1**.

## Enabling the v1alpha1 Version for RBAC.authorization.k8s.io

To enable the `v1alpha1` version for the `RBAC.authorization.k8s.io` API group on the control plane node, perform the following steps:

1.  **Backup the Current Manifest:**  
    The kube-apiserver manifest is located at `/etc/kubernetes/manifests/kube-apiserver.yaml`. Back it up with:

    ```
    cp /etc/kubernetes/manifests/kube-apiserver.yaml /root/kube-apiserver.yaml.backup
    ```

2.  **Modify the Manifest:**  
    Open the manifest file in your preferred text editor. Scroll down to the section containing command-line arguments and add the following flag at the bottom of the list:

    ```
    --runtime-config=rbac.authorization.k8s.io/v1alpha1
    ```

    Below is an excerpt from the modified section:

    ```
    --etcd-key-file=/etc/kubernetes/pki/apiserver-etcd-client.key
    --etcd-servers=https://127.0.0.1:2379
    --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
    --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
    --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
    --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
    --requestheader-allowed-names=front-proxy-client
    --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
    --requestheader-extra-headers-prefix=X-Remote-Extra-
    --requestheader-group-headers=X-Remote-Group
    --requestheader-username-headers=X-Remote-User
    --secure-port=6443
    --service-account-issuer=https://kubernetes.default.svc.cluster.local
    --service-account-signing-key-file=/etc/kubernetes/pki/sa.pub
    --service-cluster-ip-range=10.96.0.0/12
    --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
    --runtime-config=rbac.authorization.k8s.io/v1alpha1
    image: k8s.gcr.io/kube-apiserver:v1.23.0
    imagePullPolicy: IfNotPresent
    livenessProbe:
      failureThreshold: 8
      httpGet:
        host: 10.69.230.9
        path: /livez
        port: 6443
        scheme: HTTPS
      initialDelaySeconds: 10
    ```

3.  **Verify the Update:**  
    After saving the changes, the kube-apiserver pod will automatically restart. Confirm its status by running:

    ```
    kubectl get pod -n kube-system
    ```

    Initially, the API server pod might display as **Pending**, but it should soon change to **Running**.

> [!important]
> **Caution**
>
> Always back up your kube-apiserver manifest before making any modifications to ensure you can revert changes if needed.

## Installing the kubectl-convert Plugin

The kubectl-convert plugin is a versatile tool to convert manifest files between different API versions. Follow these steps to install it on the control plane node:

1.  **Download the Plugin:**  
    Retrieve the binary using the commands below:

    ```
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl-convert"
    curl -LO "https://dl.k8s.io/release/stable.txt" | sha256sum --check
    ```

2.  **Make the Binary Executable and Move It:**  
    Change its permissions and move it to `/usr/local/bin` with these commands:

    ```
    chmod +x kubectl-convert
    mv kubectl-convert /usr/local/bin/
    ```

3.  **Verify the Installation:**  
    Execute the help command to ensure the plugin is installed correctly:

    ```
    kubectl convert --help
    ```

The help output confirms the successful installation of the kubectl-convert plugin.

## Converting an Ingress Manifest

Finally, update an existing Ingress manifest from the deprecated API version (`v1beta1`) to the current `networking.k8s.io/v1`. Follow these steps:

1.  **Convert the Manifest:**  
    The old ingress manifest is located at `/root/ingress-old.yaml`. Convert the API version using the following command:

    ```
    kubectl convert -f ingress-old.yaml --output-version networking.k8s.io/v1 > ingress-new.yaml
    ```

    This command creates a new file named `ingress-new.yaml` with the updated API version.

2.  **Apply the New Manifest:**  
    Deploy the updated Ingress configuration by running:

    ```
    kubectl apply -f ingress-new.yaml
    ```

If successful, you should see an output similar to:

```
ingress.networking.k8s.io/ingress-space created
```

Congratulations! You have successfully updated your Kubernetes resources and managed API deprecations.

For further reading, check out [Kubernetes Documentation](https://kubernetes.io/docs/) and explore related topics such as [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/). Enjoy your journey with Kubernetes!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/38ec330b-0357-4977-a9f1-eb428506ee9d)**
>
> Watch video content
