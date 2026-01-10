# Demo Configure a backend service based external load balancer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/Demo-Configure-a-backend-service-based-external-load-balancer)

---

## Table of Contents

- Demo Configure a backend service based external load balancer
  - Table of Contents
  - 1. Set the Default Region and Zone
  - 2. Create the GKE Cluster
  - 3. Prepare the Deployment Manifest
  - 4. Prepare the Service Manifest
  - 5. Deploy the Application and Service
  - 6. Verify the External Load Balancer
  - 7. Inspect the Service Configuration
  - 8. Links and References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Networking for GKE clusters

# Demo Configure a backend service based external load balancer

In this guide, you will learn how to set up a backend service–based external (Layer 4) load balancer on Google Kubernetes Engine (GKE). We’ll walk through configuring your gcloud defaults, creating a GKE cluster with HTTP load balancing, deploying an echo server, exposing it via an annotated Service, and verifying traffic distribution across Pods.

## Table of Contents

1.  [Set the Default Region and Zone](#1-set-the-default-region-and-zone)
2.  [Create the GKE Cluster](#2-create-the-gke-cluster)
3.  [Prepare the Deployment Manifest](#3-prepare-the-deployment-manifest)
4.  [Prepare the Service Manifest](#4-prepare-the-service-manifest)
5.  [Deploy the Application and Service](#5-deploy-the-application-and-service)
6.  [Verify the External Load Balancer](#6-verify-the-external-load-balancer)
7.  [Inspect the Service Configuration](#7-inspect-the-service-configuration)
8.  [Links and References](#8-links-and-references)

---

## 1\. Set the Default Region and Zone

Configure your default compute zone so that all subsequent gcloud commands target **us-west1-a**:

```
gcloud config set compute/zone us-west1-a
```

## 2\. Create the GKE Cluster

Create a cluster named `gke-deep-dive` with HTTP load balancing enabled:

```
gcloud container clusters create gke-deep-dive \
  --num-nodes=1 \
  --disk-type=pd-standard \
  --disk-size=10 \
  --enable-ip-alias \
  --addons=HttpLoadBalancing
```

This step can take several minutes. Once complete, verify the HTTP load balancing add-on:

```
gcloud container clusters describe gke-deep-dive \
  --format="yaml(addonsConfig.httpLoadBalancing)"
```

Expected output snippet:

```
addonsConfig:
  httpLoadBalancing: {}
```

> [!important]
> **Warning**
>
> Creating clusters and load balancers may incur charges on your GCP account. Monitor your billing dashboard or delete resources when you’re done.

## 3\. Prepare the Deployment Manifest

Save the following Deployment in `gke-deep-dive-app.yaml`. It launches two replicas of an echo server on port 8080 and configures a readiness probe.

```
# gke-deep-dive-app.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gke-deep-dive-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: online
  template:
    metadata:
      labels:
        app: online
    spec:
      containers:
      - name: gke-deep-dive-app
        image: gcr.io/google-containers/echoserver:1.10
        ports:
        - name: http
          containerPort: 8080
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          scheme: HTTP
```

> [!important]
> **Note**
>
> The readiness probe ensures that traffic is only routed to Pods that have successfully started.

## 4\. Prepare the Service Manifest

Save the following Service definition in `gke-deep-dive-svc.yaml`. The annotation `cloud.google.com/l4-rbs: "true"` requests a backend service–based external L4 load balancer.

```
# gke-deep-dive-svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: gke-deep-dive-svc
  annotations:
    cloud.google.com/l4-rbs: "true"
spec:
  type: LoadBalancer
  externalTrafficPolicy: Cluster
  selector:
    app: online
  ports:
    - name: tcp-port
      protocol: TCP
      port: 1729
      targetPort: 8080
```

## 5\. Deploy the Application and Service

Apply both manifests and verify resources:

```
kubectl apply -f gke-deep-dive-app.yaml
kubectl apply -f gke-deep-dive-svc.yaml
```

Check Pods and Services:

```
kubectl get pods
kubectl get svc
```

Example output:

| Resource | NAME                  | READY | STATUS  | PORT(S)        |
| -------- | --------------------- | ----- | ------- | -------------- |
| Pod      | gke-deep-dive-app-xxx | 1/1   | Running |                |
| Service  | gke-deep-dive-svc     |       |         | 1729:31546/TCP |

Wait for the Service’s `EXTERNAL-IP` to appear (this may take a few minutes).

## 6\. Verify the External Load Balancer

Retrieve the external IP and test connectivity:

```
EXTERNAL_IP=$(kubectl get svc gke-deep-dive-svc \
  --output=jsonpath='{.status.loadBalancer.ingress[0].ip}')


curl ${EXTERNAL_IP}:1729
```

A successful response looks like:

```
Hostname: gke-deep-dive-app-xxx
...
client_address=10.64.0.1
...
```

Multiple `curl` requests should alternate between Pod backends.

## 7\. Inspect the Service Configuration

Describe the Service to confirm load balancer details:

```
kubectl describe svc gke-deep-dive-svc
```

Key fields:

- **Type:** LoadBalancer
- **Annotations:** cloud.google.com/l4-rbs: "true"
- **Port Mapping:** 1729/TCP → 8080/TCP
- **Endpoints:** Pod IPs on port 8080
- **External Traffic Policy:** Cluster

Sample excerpt:

```
Name:                     gke-deep-dive-svc
Type:                     LoadBalancer
LoadBalancer Ingress:     35.227.179.152
Port:                     tcp-port 1729/TCP → 8080/TCP
Endpoints:                10.68.132.199:8080,10.68.132.200:8080
```

Your backend service–based external load balancer is now active and distributing traffic across your GKE Pods.

## 8\. Links and References

- [Google Kubernetes Engine Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [kubectl Reference](https://kubernetes.io/docs/reference/kubectl/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/e39613e2-4771-4eaa-a8cf-6360f282895a/lesson/881d39ae-85b5-466a-81cf-00024d5626ad)**
>
> Watch video content
