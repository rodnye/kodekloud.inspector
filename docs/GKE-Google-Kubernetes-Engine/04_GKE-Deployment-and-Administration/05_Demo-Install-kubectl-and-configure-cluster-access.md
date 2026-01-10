# Demo Install kubectl and configure cluster access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/GKE-Deployment-and-Administration/Demo-Install-kubectl-and-configure-cluster-access)

---

## Table of Contents

- Demo Install kubectl and configure cluster access
  - Prerequisites
  - 1. Install or Verify kubectl
  - 2. Install the GKE Authentication Plugin
  - 3. Configure GKE Cluster Credentials
  - 4. Verify kubectl Configuration
  - 5. Deploy a Sample Nginx Application
  - Links and References
  - Watch Video
    - 4.1 List All Namespaces
    - 4.2 Inspect Full Kubeconfig

---

## Content

GKE - Google Kubernetes Engine

GKE Deployment and Administration

# Demo Install kubectl and configure cluster access

In this guide, you’ll learn how to install the Kubernetes CLI (`kubectl`), set up the GKE authentication plugin, and configure access to your Google Kubernetes Engine (GKE) cluster. By the end, you’ll verify your setup and deploy a sample Nginx application.

---

## Prerequisites

- A Google Cloud project with [GKE API enabled](https://console.cloud.google.com/apis/library/container.googleapis.com).
- `gcloud` CLI installed and authenticated (`gcloud init`).
- A GKE cluster created (e.g., name: `gke-deep-dive`, region/zone: `us-west1`).

---

## 1\. Install or Verify kubectl

> [!important]
> **Note**
>
> If you’re using **Google Cloud Shell**, `kubectl` comes pre-installed. You can skip directly to verifying its version.

Update your package list and install `kubectl`:

```
sudo apt-get update
sudo apt-get install -y kubectl
```

Confirm the installation:

```
kubectl version --client --short
```

Example output:

```
Client Version: v1.27.4
Kustomize Version: v5.0.1
```

---

## 2\. Install the GKE Authentication Plugin

GKE clusters require `gke-gcloud-auth-plugin` to retrieve authentication tokens for `kubectl`. Choose one of the methods below:

| Method               | Command                                                           | When to Use                                               |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| A. gcloud Components | `gcloud components install gke-gcloud-auth-plugin`                | Default if component manager is enabled in Cloud SDK.     |
| B. apt-get           | `sudo apt-get install -y google-cloud-sdk-gke-gcloud-auth-plugin` | Use if component manager is disabled or on Linux distros. |

> [!important]
> **Warning**
>
> If you see
>
> ```
> ERROR: You cannot perform this action because the Google Cloud CLI component manager is disabled
> ```
>
> switch to **Method B**.

Verify the plugin installation:

```
gke-gcloud-auth-plugin --version
```

Sample output:

```
Kubernetes v1.27.1-alpha+06fe8a86d471...
```

---

## 3\. Configure GKE Cluster Credentials

Fetch and merge your cluster’s credentials into your local kubeconfig:

```
gcloud container clusters get-credentials gke-deep-dive --region us-west1
```

This updates `~/.kube/config` with the cluster’s API endpoint, certificates, and user context.

---

## 4\. Verify kubectl Configuration

### 4.1 List All Namespaces

```
kubectl get namespaces
```

Expected output:

```
NAME              STATUS   AGE
default           Active   10m
kube-system       Active   10m
kube-public       Active   10m
...
```

### 4.2 Inspect Full Kubeconfig

```
kubectl config view
```

A typical snippet:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://34.83.189.58
  name: gke_myproject_us-west1_a_gke-deep-dive
contexts:
- context:
    cluster: gke_myproject_us-west1_a_gke-deep-dive
    user: gke_myproject_us-west1_a_gke-deep-dive
  name: gke_myproject_us-west1_a_gke-deep-dive
current-context: gke_myproject_us-west1_a_gke-deep-dive
kind: Config
users:
- name: gke_myproject_us-west1_a_gke-deep-dive
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: gke-gcloud-auth-plugin
      interactiveMode: IfAvailable
      provideClusterInfo: true
```

> [!important]
> **Tip**
>
> Your context and cluster names are prefixed with your project and location. Use these exact identifiers with flags like `--cluster` or `--context`.

---

## 5\. Deploy a Sample Nginx Application

Run an Nginx pod using the Google Cloud Marketplace image:

```
kubectl run my-sample-app \
  --image=gcr.io/cloud-marketplace/google/nginx1:latest \
  --restart=Never
```

Check the pod status:

```
kubectl get pods
```

You should see:

```
NAME            READY   STATUS    RESTARTS   AGE
my-sample-app   1/1     Running   0          30s
```

Congratulations! You’ve successfully installed `kubectl`, configured GKE authentication, and deployed your first application.

---

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Google Cloud CLI Documentation](https://cloud.google.com/sdk/docs)
- [GKE Authentication Plugin](https://cloud.google.com/kubernetes-engine/docs/how-to/gke-auth#installing_gcp_cli)
- [Deploying Applications in GKE](https://cloud.google.com/kubernetes-engine/docs/deploy-app)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/897349c1-bf57-4c08-82fb-0aa0ce0e0f6b/lesson/9290f613-1eb2-4408-a23d-e50cc36f4d07)**
>
> Watch video content
