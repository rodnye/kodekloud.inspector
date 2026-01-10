# Demo Deploying Our First Application on Istio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Istio-Introduction/Demo-Deploying-Our-First-Application-on-Istio)

---

## Table of Contents

- Demo Deploying Our First Application on Istio
  - Step 1: Deploy the Bookinfo Application
  - Step 2: Enable Istio Sidecar Injection
  - Step 3: Recreate Pods to Inject Sidecars
  - Watch Video
  - Practice Lab

---

## Content

Istio Service Mesh

Istio Introduction

# Demo Deploying Our First Application on Istio

In this guide, we will deploy the Bookinfo application on a Kubernetes cluster, enable Istio sidecar injection, and set up our service mesh for traffic management. The Bookinfo application's manifests can be found under the samples folder that comes with Istio.

## Step 1: Deploy the Bookinfo Application

First, navigate to the `platform` directory where the application manifests are stored and deploy the application with the following command:

```
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

When executing this command, Kubernetes creates service, service account, and deployment objects corresponding to each component of the Bookinfo application. Notably, multiple versions of the Reviews service are deployed.

After applying the configuration, verify that all pods are running:

```
kubectl get pods
```

You should see an output similar to:

```
NAME                                    READY   STATUS    RESTARTS   AGE
details-v1-79f774bd9-5gqjb             1/1     Running   0          22s
productpage-v1-6b746f74dc-k486v        1/1     Running   0          21s
ratings-v1-b6994bb9-ds6gk               1/1     Running   0          22s
reviews-v1-546db7b795-spvl6             1/1     Running   0          21s
reviews-v2-7bf8c964f-h9php              1/1     Running   0          22s
reviews-v3-84779c7bbc-df51c             1/1     Running   0          22s
```

At this stage, every pod runs a single container because Istio sidecar injection has not been enabled yet. Consequently, the Envoy proxies are not present alongside your application containers.

## Step 2: Enable Istio Sidecar Injection

Before re-deploying the pods, you should verify potential issues with sidecar injection using the Istioctl tool:

```
istioctl analyze
```

You might see an informational message mentioning that the default namespace is not enabled for Istio injection. This occurs because enabling sidecar injection requires explicitly labeling the namespace.

Label the default namespace to enable Istio injection:

```
kubectl label namespace default istio-injection=enabled
```

## Step 3: Recreate Pods to Inject Sidecars

After labeling the namespace, the pods must be recreated so that the Envoy sidecars are injected. A simple method is to delete the current deployments and apply the YAML configuration again. This ensures that only the pods missing the sidecars are recreated.

Reapply the manifests using:

```
istioctl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

Then, check the pods’ status:

```
kubectl get pods
```

You should now notice that each pod has an additional container, indicating that the Istio sidecar has been successfully injected. If you see some pods marked as terminating, they will disappear after a short period.

> [!important]
> **Tip**
>
> You can always verify successful sidecar injection by ensuring that each pod reports two containers as ready.

Finally, run Istioctl analyze one more time to ensure that there are no issues:

```
istioctl analyze
```

The output should confirm that the default namespace was analyzed without reporting any issues with Istio objects, for example:

```
✓ No validation issues found when analyzing namespace: default.
```

An example of the pod status after injection might look like this:

```
kubectl get pods
NAME                                   READY   STATUS        RESTARTS   AGE
details-v1-79f774bd9b-9qvrh             2/2     Running       0          14s
productpage-v1-6b746f74dc-8q972         2/2     Running       0          14s
ratings-v1-b6994bb9-ds6gk               1/1     Terminating   0          97s
ratings-v1-b6994bb9-w2bk               2/2     Running       0          14s
reviews-v1-545db7b79s-md68             2/2     Running       0          14s
reviews-v1-7bf8c9648f-jnn4r            2/2     Running       0          14s
reviews-v1-84779c7bbc-6dxkv            2/2     Running       0          14s
```

And a subsequent status check might display:

```
kubectl get pods
NAME                                   READY   STATUS        RESTARTS   AGE
details-v1-79f774bd9b-9qvrh             2/2     Running       0          20s
productpage-v1-6b746f74dc-8q972         2/2     Running       0          20s
ratings-v1-b6994bb9-ds6gk               1/1     Terminating   0          103s
ratings-v1-b6994bb9-w2bk               2/2     Running       0          20s
reviews-v1-545db7b79s-md68             2/2     Running       0          20s
reviews-v1-7bf8c9648f-jnn4r            2/2     Running       0          20s
reviews-v1-84779c7bbc-6dxkv            2/2     Running       0          20s
```

> [!important]
> **Reminder**
>
> If you observe pods stuck in a terminating state for an extended period, wait a short while and perform the status check again.

Congratulations! Your service mesh is now correctly configured with Istio sidecar injection, and you are ready to begin building and testing your service mesh interactions.

For more information on Istio and service meshes in Kubernetes, explore the following resources:

- [Istio Documentation](https://istio.io/latest/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/da65d53d-91d7-4d4f-904e-9b292b657401)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/dc0a9efc-09ce-4310-86e9-1c7aaab6a7d8/lesson/ae4b770b-d01a-44b6-991b-342e359c16e8)**
>
> Practice lab
