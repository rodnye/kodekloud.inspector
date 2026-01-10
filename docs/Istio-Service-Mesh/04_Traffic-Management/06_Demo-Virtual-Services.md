# Demo Virtual Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Demo-Virtual-Services)

---

## Table of Contents

- Demo Virtual Services
  - 1. Define Destination Rules
  - 2. Create a Virtual Service with Traffic Weight Distribution
  - 3. Verify Configuration via Kiali
  - 4. Testing and Adjusting Traffic Distribution
  - 5. Routing Requests Based on Headers
  - Conclusion
  - Watch Video
  - Practice Lab
    - Adjusting Weight Distribution
    - Example 1: Routing KodeKloud Users to v2
    - Example 2: Introducing a Test Group for a New Version

---

## Content

Istio Service Mesh

Traffic Management

# Demo Virtual Services

In this lesson, you will learn how to adjust traffic weight distribution between different versions of the reviews application and implement header-based routing rules. This guide details how to define application versions with Destination Rules, create a Virtual Service to manage traffic distribution, and apply advanced routing policies based on request headers.

──────────────────────────────

## 1\. Define Destination Rules

Before modifying traffic distribution, you must define the different versions of your application using Destination Rules. Apply the default Destination Rules from the Samples directory with the following command:

```
kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
```

Expected output:

```
destinationrule.networking.istio.io/productpage created
destinationrule.networking.istio.io/reviews created
destinationrule.networking.istio.io/ratings created
destinationrule.networking.istio.io/details created
```

> [!important]
> **Tip**
>
> Destination Rules allow Istio to control traffic policies for different versions (or subsets) of an application.

──────────────────────────────

## 2\. Create a Virtual Service with Traffic Weight Distribution

Create a Virtual Service for the reviews application to split traffic between two subsets (v1 and v2) with a 75-25% distribution. Ensure that the total weight equals 100.

The YAML configuration below sets up the Virtual Service:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 75
        - destination:
            host: reviews
            subset: v2
          weight: 25
```

Apply the Virtual Service and verify its configuration with the commands below:

```
kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
vi virtual-service1.yaml  # Edit the file if necessary
kubectl apply -f virtual-service1.yaml
istioctl analyze
```

You should see output similar to:

```
destinationrule.networking.istio.io/productpage created
destinationrule.networking.istio.io/reviews created
destinationrule.networking.istio.io/ratings created
destinationrule.networking.istio.io/details created
virtualservice.networking.istio.io/reviews created
✓ No validation issues found when analyzing namespace: default.
```

──────────────────────────────

## 3\. Verify Configuration via Kiali

Switch to Kiali to inspect your Istio configurations. In Kiali, you will see that the Destination Rule for the reviews service defines three subsets (v1, v2, and v3):

```
kind: DestinationRule
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: c6c8b84c-b264-40fe-bb25-61cf563ba0bf
  resourceVersion: "9596"
  generation: 1
  creationTimestamp: '2021-08-14T00:46:09Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"DestinationRule","metadata":{"annotations":{},"name":"reviews"},"namespace":"default","spec":{"host":"reviews","subsets":[{"labels":{"version":"v1"},"name":"v1"},{"labels":{"version":"v2"},"name":"v2"},{"labels":{"version":"v3"},"name":"v3"}}]}
spec:
  host: reviews
  subsets:
  - labels:
      version: v1
    name: v1
  - labels:
      version: v2
    name: v2
  - labels:
      version: v3
    name: v3
```

The Virtual Service confirms the weight distribution as follows:

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: d8d3b172-395e-47fe-8f2f-a8e9f03e015e
  resourceVersion: "9666"
  generation: 1
  creationTimestamp: "2021-08-14T00:49:11Z"
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"route":[{"destination":{"host":"reviews","subset":"v1"},"weight":75},{"destination":{"host":"reviews","subset":"v2"},"weight":25}]}]}}
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 75
    - destination:
        host: reviews
        subset: v2
      weight: 25
```

In Kiali's visual graph, you will observe that traffic is split between v1 and v2 based on the specified weights.

──────────────────────────────

## 4\. Testing and Adjusting Traffic Distribution

When you access the reviews application, version v1 should be more frequent than version v2, reflecting the 75-25 traffic split. This difference becomes more apparent as traffic increases.

### Adjusting Weight Distribution

To modify the split—for instance, routing 99% of traffic to v1 and only 1% to v2—update the configuration as shown below:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
  namespace: default
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"route":[{"destination":{"host":"reviews","subset":"v1"},"weight":99},{"destination":{"host":"reviews","subset":"v2"},"weight":1}]}]}}
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 99
    - destination:
        host: reviews
        subset: v2
      weight: 1
```

After applying this change, monitor the application to notice the significant traffic shift toward version v1.

> [!important]
> **Testing Tip**
>
> Consider using load testing tools to generate sufficient traffic. This helps in accurately observing the effects of different weight distributions.

──────────────────────────────

## 5\. Routing Requests Based on Headers

In addition to traffic splitting, Virtual Services allow you to create advanced routing policies based on request headers. This feature is particularly useful if you want to serve different application versions based on user attributes.

### Example 1: Routing KodeKloud Users to v2

This configuration directs requests with an "end-user" header value of "kodekloud" to subset v2, while all other requests are routed to subset v1:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
  namespace: default
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"route":[{"destination":{"host":"reviews","subset":"v1"},"weight":75},{"destination":{"host":"reviews","subset":"v2"},"weight":25}]}]}}
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: kodekloud
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1
```

When a KodeKloud user signs in, the "end-user" header is set to "kodekloud", and the user sees the version v2 experience (represented with a black star).

### Example 2: Introducing a Test Group for a New Version

To gradually roll out a new version (v3) for test users, extend the Virtual Service with an additional match rule. In this approach:

- Requests with "end-user: kodekloud" continue to use v2.
- Requests with "end-user: testuser" are directed to v3.
- All other requests default to v1.

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
  namespace: default
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews"},"spec":{"hosts":["reviews"],"http":[{"route":[{"destination":{"host":"reviews","subset":"v1"},"weight":75},{"destination":{"host":"reviews","subset":"v2"},"weight":25}]}}}
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: kodekloud
    route:
    - destination:
        host: reviews
        subset: v2
  - match:
    - headers:
        end-user:
          exact: testuser
    route:
    - destination:
        host: reviews
        subset: v3
  - route:
    - destination:
        host: reviews
        subset: v1
```

With this configuration:

- Requests with "end-user: kodekloud" are routed to version v2.
- Requests with "end-user: testuser" go to the new version v3.
- All other requests default to version v1.

When users sign in with their respective usernames, these routing rules take effect without interfering with the predefined traffic weights.

──────────────────────────────

## Conclusion

Virtual Services empower you to control and manage traffic flow between different application versions seamlessly. In this lesson, you learned how to:

- Define application versions using Destination Rules.
- Configure weight-based traffic splitting through a Virtual Service.
- Validate the configuration with Istio analysis tools and Kiali.
- Implement header-based routing to tailor the user experience based on request attributes.

These strategies enable safe feature rollouts, A/B testing, and dynamic production traffic management.

For more detailed information, refer to the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Istio Documentation](https://istio.io/latest/docs/)
- [Kiali Documentation](https://kiali.io/documentation/)

Happy routing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/d9b98caf-dee7-4478-939f-fb0304979832)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/9d5eeb1f-0f3f-4ae1-b4c9-9331cf619163)**
>
> Practice lab
