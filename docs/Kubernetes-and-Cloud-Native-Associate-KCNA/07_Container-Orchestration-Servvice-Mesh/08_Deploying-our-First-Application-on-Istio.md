# Deploying our First Application on Istio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Container-Orchestration-Servvice-Mesh/Deploying-our-First-Application-on-Istio)

---

## Table of Contents

- Deploying our First Application on Istio
  - Verifying the Initial Deployment
  - Diagnosing Missing Sidecar Injection
  - Enabling Automatic Injection
  - Redeploying and Verifying Sidecar Injection
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Container Orchestration Service Mesh

# Deploying our First Application on Istio

This lesson demonstrates how to deploy the Bookinfo application on Istio, using the sample application provided in the downloaded samples folder. If your Istio samples are stored in a different directory, navigate to that folder before proceeding.

## Verifying the Initial Deployment

After deploying the application, several Kubernetes Deployments and Services are created. To verify this, check the status of the Pods in the default namespace by running:

```
kubectl get pods -A
```

The output should look similar to this:

```
NAMESPACE   NAME                                  READY   STATUS    RESTARTS   AGE
default     details-v1-66b695595-zgrd8             1/1     Running   0          6m57s
default     productpage-v1-5d9b4c9849-dckrt        1/1     Running   0          6m57s
default     ratings-v1-fd78f799f-s94cc              1/1     Running   0          6m58s
default     reviews-v1-6549dccc5-bxv4n              1/1     Running   0          6m58s
default     reviews-v2-76c4865449-2qmhj             1/1     Running   0          6m58s
default     reviews-v3-6b554c875-vbf8v              1/1     Running   0          6m58s
```

From this output, you see pods for the product page, details, ratings, and three versions of the review service—all deployed in the default namespace.

> [!important]
> **Note**
>
> Since Istio is installed, you would expect each pod to contain an additional proxy container (sidecar). However, the output indicates that each pod lists only a single container.

## Diagnosing Missing Sidecar Injection

To investigate why the sidecar is missing, use the Istio CLI analyze command:

```
istioctl analyze
```

You will receive output similar to:

```
Info [IST0102] (Namespace default) The namespace is not enabled for Istio injection.
Run 'kubectl label namespace default istio-injection=enabled' to enable it, or
'kubectl label namespace default istio-injection=disabled' to explicitly mark it as not needing injection.
```

This diagnostic message reveals that automatic sidecar injection is not enabled for the default namespace. In Kubernetes clusters with multiple namespaces—such as kube-system, HR, or Payroll—you must explicitly enable Istio sidecar injection for the namespace where your applications are deployed.

## Enabling Automatic Injection

To enable automatic sidecar injection for the default namespace, run the following command:

```
kubectl label namespace default istio-injection=enabled
```

Once executed, every new application deployed in the default namespace will automatically receive an injected Istio proxy.

## Redeploying and Verifying Sidecar Injection

After enabling injection, redeploy the Bookinfo application. Then, verify the pod statuses again by running:

```
kubectl get pods
```

Now, you should see output like this:

```
NAME                                    READY   STATUS      RESTARTS   AGE
details-v1-5f449bdb9-vrgzh              2/2     Running     0          26s
productpage-v1-6f9df695b7-cx259           2/2     Running     0          26s
ratings-v1-857b7b87c57-hmpfd             2/2     Running     0          26s
reviews-v1-68f9c47f69-cbj7c              2/2     Running     0          26s
reviews-v2-5d56c488f5-wb4v7              2/2     Running     0          26s
reviews-v3-869ff44845-h5pfp              2/2     Running     0          26s
```

The READY column now shows "2/2" for each pod, confirming that Istio has successfully injected sidecar proxies into every pod.

> [!important]
> **Deployment Successful**
>
> You have successfully configured Istio on your Kubernetes cluster with automatic sidecar injection. For further details on deploying applications on Istio, refer to the [Istio Documentation](https://istio.io/latest/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/aeecda11-7f2e-48c5-9c54-5409f2d9d8d8/lesson/c4314805-bc44-4627-a948-b00e1b189e94)**
>
> Watch video content
