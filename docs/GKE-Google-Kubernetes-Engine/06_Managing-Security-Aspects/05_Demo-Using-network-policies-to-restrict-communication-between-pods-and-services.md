# Demo Using network policies to restrict communication between pods and services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Managing-Security-Aspects/Demo-Using-network-policies-to-restrict-communication-between-pods-and-services)

---

## Table of Contents

- Demo Using network policies to restrict communication between pods and services
  - Table of Contents
  - 1. Prerequisites
  - 2. Create a GKE Cluster
  - 3. Deploy the Hello World App
  - 4. Define NetworkPolicy Manifests
  - 5. Launch Test Pods
  - 6. Verify Connectivity (Pre-Policy)
  - 7. Apply Ingress Policy
  - 8. Apply Egress Policy
  - 9. Cleanup
  - 10. References
  - Watch Video
    - 4.1 Ingress Policy (ingress.yaml)
    - 4.2 Egress Policy (egress.yaml)
    - 8.1 Blocking DNS

---

## Content

GKE - Google Kubernetes Engine

Managing Security Aspects

# Demo Using network policies to restrict communication between pods and services

In this tutorial, you’ll learn how to use Kubernetes Network Policies to control traffic between pods and services on Google Kubernetes Engine (GKE). We’ll walk through creating a GKE cluster with network policy support, deploying a sample application, and crafting both ingress and egress policies to enforce communication rules.

> [!important]
> **Note**
>
> Ensure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs) installed and authenticated before proceeding.

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Create a GKE Cluster](#2-create-a-gke-cluster)
3.  [Deploy the Hello World App](#3-deploy-the-hello-world-app)
4.  [Define NetworkPolicy Manifests](#4-define-networkpolicy-manifests)
5.  [Launch Test Pods](#5-launch-test-pods)
6.  [Verify Connectivity (Pre-Policy)](#6-verify-connectivity-pre-policy)
7.  [Apply Ingress Policy](#7-apply-ingress-policy)
8.  [Apply Egress Policy](#8-apply-egress-policy)
9.  [Cleanup](#9-cleanup)
10. [References](#10-references)

## 1\. Prerequisites

- `gcloud` CLI installed and configured
- A GKE cluster with **NetworkPolicy** enabled
- `kubectl` configured to talk to your GKE cluster

## 2\. Create a GKE Cluster

1.  Set your compute zone:

    ```
    gcloud config set compute/zone us-west1-a
    ```

2.  Create a cluster named `gke-deep-dive` with NetworkPolicy enabled:

    ```
    gcloud container clusters create gke-deep-dive \
      --num-nodes=1 \
      --disk-type=pd-standard \
      --disk-size=10 \
      --enable-network-policy
    ```

3.  Verify the cluster status:

    ```
    gcloud container clusters list
    ```

    You should see output similar to:

    ```
    NAME            LOCATION     MASTER_VERSION    MACHINE_TYPE  NUM_NODES  STATUS
    gke-deep-dive   us-west1-a   1.27.3-gke.100    e2-medium       1       RUNNING
    ```

## 3\. Deploy the Hello World App

Deploy a sample “Hello World” service (`app=web-hello-world`) on port 8080:

```
kubectl run web-hello-world \
  --image=gcr.io/google-samples/hello-app:2.0 \
  --labels app=web-hello-world \
  --port=8080 \
  --expose
```

Confirm the pod and service are up:

```
kubectl get pods
kubectl get svc
```

Expected service entry:

```
NAME              TYPE        CLUSTER-IP     PORT(S)    AGE
web-hello-world   ClusterIP   10.68.xxx.xxx  8080/TCP   1m
```

## 4\. Define NetworkPolicy Manifests

We will create two YAML files:

| Policy File    | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| `ingress.yaml` | Allow only selected pods to send traffic **to** the app |
| `egress.yaml`  | Restrict outbound traffic **from** selected pods        |

### 4.1 Ingress Policy (`ingress.yaml`)

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-hello-world-ingress
spec:
  podSelector:
    matchLabels:
      app: web-hello-world
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
```

This policy ensures only pods labeled `frontend` can reach the `web-hello-world` service.

### 4.2 Egress Policy (`egress.yaml`)

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-hello-world-egress
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: web-hello-world
    ports:
    - port: 8080
      protocol: TCP
  - ports:
    - port: 53
      protocol: TCP
    - port: 53
      protocol: UDP
```

With this egress policy, `frontend` pods can:

- Connect to `web-hello-world` on port 8080
- Perform DNS lookups over port 53 (TCP/UDP)

## 5\. Launch Test Pods

Create two interactive test pods for validating connectivity:

**Frontend Pod**

```
kubectl run frontend-pod \
  --image=redhat/ubi8 \
  --labels app=frontend \
  --restart=Never \
  --rm \
  --stdin \
  --tty
```

**Backend Pod**

```
kubectl run backend-pod \
  --image=redhat/ubi8 \
  --labels app=backend \
  --restart=Never \
  --rm \
  --stdin \
  --tty
```

## 6\. Verify Connectivity (Pre-Policy)

From **both** pods, run:

```
curl http://web-hello-world:8080
```

Expected result: both succeed, as no policies are enforced yet.

## 7\. Apply Ingress Policy

```
kubectl apply -f ingress.yaml
kubectl get networkpolicy
```

- In **backend-pod**, `curl http://web-hello-world:8080` should now **fail** or **timeout**.
- In **frontend-pod**, `curl http://web-hello-world:8080` should still **succeed**.

## 8\. Apply Egress Policy

1.  Exit and recreate **frontend-pod** to pick up new policies.
2.  Apply egress policy:

    ```
    kubectl apply -f egress.yaml
    kubectl get networkpolicy
    ```

- **frontend-pod** should still resolve DNS and reach the Hello World service.
- `curl http://google.com` works (DNS allowed).

### 8.1 Blocking DNS

To simulate a DNS block, remove the port-53 entries from `egress.yaml` under `egress:` → second item, then reapply:

```
kubectl apply -f egress.yaml
```

- `curl http://web-hello-world:8080` by **hostname** now **fails**.
- `curl http://<CLUSTER-IP>:8080` still **succeeds**.
- External lookups like `curl http://google.com` **fail** due to DNS being blocked.

## 9\. Cleanup

> [!important]
> **Warning**
>
> This action **deletes** your entire GKE cluster and cannot be undone.

```
gcloud container clusters delete gke-deep-dive \
  --zone=us-west1-a \
  --quiet
```

## 10\. References

- [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [GKE Networking Overview](https://cloud.google.com/kubernetes-engine/docs/concepts/network-overview)
- [kubectl run](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/225743c4-eb6e-4393-a51e-4ed7d41dbe51/lesson/f4fb84f3-d34f-4da3-87be-b80ecae717fa)**
>
> Watch video content
