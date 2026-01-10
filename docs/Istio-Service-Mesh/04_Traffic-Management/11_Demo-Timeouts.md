# Demo Timeouts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Demo-Timeouts)

---

## Table of Contents

- Demo Timeouts
  - Step 1: Introducing a Delay
  - Step 2: Applying the Configuration
  - Step 3: Adjusting the Delay Percentage
  - Understanding Timeouts
  - Watch Video
  - Practice Lab

---

## Content

Istio Service Mesh

Traffic Management

# Demo Timeouts

In this lesson, you'll learn how to configure timeouts by artificially delaying one of your services. By introducing a controlled delay in our service mesh, we can simulate slow responses and observe how timeouts are handled. This approach ensures that even if a service takes too long to respond, the overall system maintains its responsiveness by not waiting indefinitely.

## Step 1: Introducing a Delay

To begin, we force one of our services to respond slower by injecting a delay into the service mesh. This delay is configured on the detailed service so that 100% of the incoming traffic experiences a **5-second delay**. This configuration is useful for testing the behavior of your product page when the backend service is slow.

Below is the virtual service configuration used to introduce the delay:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
spec:
  hosts:
  - details
  http:
  - fault:
      delay:
        percent: 100
        fixedDelay: 5s
    route:
    - destination:
        host: details
        subset: v1
```

After applying this configuration, accessing the service via your browser will result in an error due to the induced delay.

## Step 2: Applying the Configuration

Use the following commands to edit and apply the configuration:

```
istio-training@local istio-1.10.3 $ vi virtual-service-details.yaml
istio-training@local istio-1.10.3 $ kubectl apply -f virtual-service-details.yaml
```

Be sure to verify that the configuration has been applied successfully.

> [!important]
> **Note**
>
> When testing delays, errors might occur on the product page, which is expected. These errors help you observe how timeouts and fallback mechanisms are triggered.

## Step 3: Adjusting the Delay Percentage

Next, we reduce the delay percentage to 70%. With this update, the detailed service will sometimes respond correctly, but will typically return an error due to the delay. This modification simulates a less severe fault injection scenario.

Here is the updated virtual service configuration:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
  namespace: default
  uid: c868593f-303e-42d5-e63f-e185d289d51
  resourceVersion: '37829'
  generation: 2
  creationTimestamp: '2021-08-08T00:52:02Z'
annotations:
  kubectl.kubernetes.io/last-applied-configuration: >
    {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"details","namespace":"default"},"spec":{"hosts":["details"],"http":[{"fault":{"fixedDelay":"5s","percent":100},"route":[{"destination":{"host":"details","subset":"v1"}}]}]}}
managedFields:
- apiVersion: networking.istio.io/v1alpha3
  time: '2021-08-08T00:52:02Z'
  fieldPath: metadata
spec:
  hosts:
  - details
  http:
  - fault:
      fixedDelay: 5s
      percent: 70
    route:
    - destination:
        host: details
        subset: v1
```

With this configuration, if the details application takes longer than 3 seconds to load, the product page will trigger a timeout. You can further adjust the fault injection percentage from 70% to 50% as required to fine-tune the behavior of your system.

> [!important]
> **Warning**
>
> Timeouts are an essential tool in microservices architectures. However, improper configuration can lead to degraded performance or unexpected system behavior. Always test changes in a controlled environment.

## Understanding Timeouts

Timeouts help establish clear boundaries between interdependent services. They ensure that a slow or non-responsive service does not negatively impact the overall system performance. This strategy is especially critical in microservices architectures where services rely on one another to complete transactions.

Below is an example of what might be observed during an upstream request timeout:

```
upstream request timeout
```

For more detailed information on managing timeouts and fault injection, consider reviewing the [Istio documentation](https://istio.io/latest/docs/ops/configuration/traffic-management/fault-injection/) and the [Kubernetes documentation](https://kubernetes.io/docs/).

By following these steps, you can effectively simulate delays and timeouts in your service mesh, ensuring that your system gracefully handles slow responses while maintaining overall performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/26c86e18-0cd2-407f-8caa-ca5b307446ac)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/81ec6f57-20b5-42b8-a193-306da91e3e5d)**
>
> Practice lab
