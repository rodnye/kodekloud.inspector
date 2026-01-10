# Deploying Our First Application on Istio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Deploying-Our-First-Application-on-Istio)

---

## Table of Contents

- Deploying Our First Application on Istio
  - Step 1: Deploy the Bookinfo Application
  - Step 2: Verify Istio Sidecar Injection
  - Step 3: Enable Istio Sidecar Injection
  - Step 4: Re-deploy the Application
  - Step 5: Confirm All Pods
  - Watch Video

---

## Content

Istio Service Mesh

Istio Introduction

# Deploying Our First Application on Istio

This guide demonstrates how to deploy the Bookinfo application with Istio to explore its service mesh capabilities. The Bookinfo sample application is available in the Samples folder you downloaded.

## Step 1: Deploy the Bookinfo Application

Run the following command from the directory containing your Istio samples. Adjust the directory path if your Istio samples are located elsewhere on your computer:

```
$ kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

After executing the command, several deployments and services are created. To verify the installation, check the status of the pods. You should see pods for the ProductPage, Details, Ratings microservices, and three versions of the Reviews microservice—all deployed in the default namespace.

## Step 2: Verify Istio Sidecar Injection

At this point, with Istio installed, you might expect every pod to include an additional Envoy proxy container. However, the output under the "READY" column indicates that each pod has only a single container. This suggests that the Envoy sidecar is not present.

The issue lies in the namespace configuration. Execute the following command for a detailed analysis:

```
$ istioctl analyze
Info [IST0102] (Namespace default) The namespace is not enabled for Istio injection.
Run 'kubectl label namespace default istio-injection=enabled' to enable it, or
'kubectl label namespace default istio-injection=disabled' to explicitly mark it as
not needing injection.
```

> [!important]
> **Sidecar Injection Insight**
>
> The analysis reveals that sidecar injection is not active for the default namespace. In Kubernetes environments with multiple namespaces (e.g., kube-system for core services and default for user applications), you must explicitly enable Istio sidecar injection where required.

## Step 3: Enable Istio Sidecar Injection

To activate sidecar injection in the default namespace, execute:

```
$ kubectl label namespace default istio-injection=enabled
namespace/default labeled
```

## Step 4: Re-deploy the Application

Before re-deploying the application, delete the existing deployment:

```
$ kubectl delete -f samples/bookinfo/platform/kube/bookinfo.yaml
service "details" deleted
serviceaccount "bookinfo-details" deleted
service "ratings" deleted
serviceaccount "bookinfo-ratings" deleted
serviceaccount "bookinfo-reviews" deleted
service "productpage" deleted
serviceaccount "bookinfo-productpage" deleted
```

Now, deploy the Bookinfo application again:

```
$ kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

Once re-deployed, verify that the Envoy sidecar proxies have been successfully injected by checking the pods:

```
$ kubectl get pods
NAME                         READY   STATUS    RESTARTS   AGE
details-v1-5f449d8bb9-vgzrh   2/2     Running   0          26s
```

## Step 5: Confirm All Pods

For further confirmation, list all the pods to see that each contains both the main application container and its corresponding Envoy sidecar:

```
$ kubectl get pods
NAME                                      READY   STATUS    RESTARTS   AGE
details-v1-5f449bdba9-vrgzh               2/2     Running   0          26s
productpage-v1-6f9df695b7-cx259             2/2     Running   0          26s
ratings-v1-857bb87c57-hmpfd                 2/2     Running   0          26s
reviews-v1-68f9c47f69-cbj7c                 2/2     Running   0          26s
reviews-v2-5d56c4885f-wb4v7                 2/2     Running   0          26s
reviews-v3-869ff44845-h5pfp                 2/2     Running   0          26s
```

This output confirms that Istio has successfully injected the Envoy proxies into every pod.

> [!important]
> **Next Steps**
>
> In upcoming lessons, you'll explore how these Envoy sidecar proxies manage traffic, enforce policies, and enhance the overall security within the Istio service mesh.

That's it for now—happy exploring, and see you in the demo!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/0a72340f-23b9-4864-b1c0-427b529e2005)**
>
> Watch video content
