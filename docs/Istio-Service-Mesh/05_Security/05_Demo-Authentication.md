# Demo Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Security/Demo-Authentication)

---

## Table of Contents

- Demo Authentication
  - Step 1: Cleaning Up the Default Namespace
  - Step 2: Setting Up the Bar Namespace and Deploying HTTP Bin
  - Step 3: Testing Connectivity with cURL
  - Step 4: Enforcing Mutual TLS with a Peer Authentication Policy
  - Step 5: Verifying Connectivity After Enforcing Mutual TLS
  - Watch Video

---

## Content

Istio Service Mesh

Security

# Demo Authentication

In this demonstration, we explore the differences between having no Peer Authentication Policy and enforcing Mutual TLS (mTLS) in an Istio-enabled environment. You will see how applying a STRICT mTLS policy to the default namespace prevents services from unauthorized access by workloads from other namespaces.

## Step 1: Cleaning Up the Default Namespace

Before proceeding, remove any existing Bookinfo components from the default namespace. Execute the following cleanup script:

```
istiotraining@local istio-1.10.3 $ ./samples/bookinfo/platform/kube/cleanup.sh
namespace ? [default]
using NAMESPACE=default
Application cleanup may take up to one minute
service "details" deleted
serviceaccount "bookinfo-details" deleted
deployment "details-v1" deleted
service "ratings" deleted
serviceaccount "bookinfo-ratings" deleted
deployment "ratings-v1" deleted
service "reviews" deleted
serviceaccount "bookinfo-reviews" deleted
deployment.apps "reviews-v1" deleted
deployment.apps "reviews-v2" deleted
deployment.apps "reviews-v3" deleted
service "productpage" deleted
serviceaccount "bookinfo-productpage" deleted
deployment.apps "productpage-v1" deleted
Application cleanup successful
istiotraining@local istio-1.10.3 $
```

> [!important]
> **Note**
>
> Cleaning up the default namespace ensures a clean environment before you apply new configurations.

## Step 2: Setting Up the Bar Namespace and Deploying HTTP Bin

Create a separate namespace named "Bar" to deploy the HTTP Bin application. This application will allow you to perform curl requests between namespaces. If Istio auto-injection is disabled in your environment, manually inject the Istio sidecar using this command:

```
kubectl apply -f <(istioctl kube-inject -f samples/httpbin/httpbin.yaml) -n bar
```

This command ensures that the Istio proxy is properly injected into the HTTP Bin deployment. The output should be similar to:

```
serviceaccount/httpbin created
service/httpbin created
deployment.apps/httpbin created
```

## Step 3: Testing Connectivity with cURL

With HTTP Bin deployed in the Bar namespace, you can now test connectivity to the product page in the default namespace. Initially, you might encounter an error if the Istio proxy container is still initializing. Once the container is ready, execute the following command:

```
kubectl exec -it "$(kubectl get pod -l app=httpbin -n bar -o jsonpath={.items[0].metadata.name})" -c istio -- curl "http://productpage.default:9080" -s -o /dev/null -w "%{http_code}\n"
```

A response with an HTTP status code of 200 confirms that the Bar namespace can successfully access the product page in the default namespace.

## Step 4: Enforcing Mutual TLS with a Peer Authentication Policy

To secure communications, apply a Peer Authentication Policy to enforce STRICT Mutual TLS in the default namespace. This configuration ensures that only workloads with valid mTLS certificates can communicate within the namespace.

Apply the policy with the following command:

```
kubectl apply -n default -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: "default"
spec:
  mtls:
    mode: STRICT
EOF
```

The output should confirm that the policy was successfully created:

```
peerauthentication.security.istio.io/default created
```

> [!important]
> **Note**
>
> Enforcing STRICT mTLS means that any workload without the proper mTLS configuration will be unable to communicate with services in the default namespace.

## Step 5: Verifying Connectivity After Enforcing Mutual TLS

After enforcing STRICT mTLS, test the connectivity from the Bar namespace again by running:

```
kubectl exec -it --proxy -n bar -- curl "http://productpage.default:9080" -s -o /dev/null -w "%{http_code}\n"
```

This command should now fail with exit code 56, indicating that the communication attempt was blocked because the workload in the Bar namespace is not secured with mTLS.

> [!important]
> **Warning**
>
> Before enforcing STRICT mTLS, ensure that all relevant workloads are properly configured with mTLS to prevent unintended service disruptions.

This demonstration highlights how enabling STRICT Mutual TLS via Istio’s Peer Authentication Policy can help secure your environment by ensuring that only authorized, mTLS-enabled traffic is allowed between namespaces.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/e4a2171d-d190-4dc9-873e-a0dad6d3cb62/lesson/7fb2ee58-28dd-404f-92f8-6de5be062731)**
>
> Watch video content
