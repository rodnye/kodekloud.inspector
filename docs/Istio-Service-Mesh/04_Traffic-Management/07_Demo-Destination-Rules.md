# Demo Destination Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Demo-Destination-Rules)

---

## Table of Contents

- Demo Destination Rules
  - Overview
  - Updating the Reviews Service
  - Modifying the Istio Configuration
  - Managing Traffic Distribution
  - Updating the Destination Rule's Traffic Policy
  - Reverting to Round-Robin Load Balancing
  - Conclusion
  - Watch Video
  - Practice Lab
    - Step 1: Open the File
    - Step 2: Add the New Label
    - Step 3: Apply Changes
    - Updating the Destination Rule
    - Updating the Virtual Service
    - Destination Rule Update
    - Virtual Service Update

---

## Content

Istio Service Mesh

Traffic Management

# Demo Destination Rules

In this tutorial, we will create new subsets using Destination Rules and route traffic to grouped service endpoints. You will learn how to update your Istio configuration with custom labels, modify the Virtual Services, and manage traffic distribution between different versions of the reviews service.

## Overview

Initially, the reviews service has three subsets defined by version labels: V1, V2, and V3. The corresponding Virtual Service configuration routes traffic based on these subsets. However, there may be scenarios when you need to group different deployments under a new rule or label. In our example, we introduce a new label (`test: beta`) to group deployments and update the existing configurations accordingly.

> [!important]
> **Tip**
>
> Ensure that any changes to labels also reflect in the corresponding Destination Rule and Virtual Service configurations to avoid routing mismatches.

## Updating the Reviews Service

First, we add the new label to our application. The new label (`test: beta`) allows us to create additional subsets without affecting the initial routing for Version V1. In this example, we copy `reviews.yml` from the samples directory and proceed to update it.

### Step 1: Open the File

Use your terminal to open the `reviews.yml` file:

```
istio-training@local istio-1.10.3 $ vi reviews.yml
```

### Step 2: Add the New Label

For the reviews service, add the label `test: beta` and ensure Version V1 is skipped for the new grouping:

```
# Reviews service
apiVersion: v1
kind: Service
metadata:
  name: reviews
  labels:
    app: reviews
    service: reviews
    test: beta
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: reviews
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-reviews
  labels:
    app: reviews
    account: reviews
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v1
  labels:
    app: reviews
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: reviews
```

After updating the reviews service, add the same label to the Version V2 and Version V3 deployments. For instance, the deployment for Version V3 with the updated label is as follows:

```
selector:
  matchLabels:
    app: reviews
    version: v3
    test: beta
template:
  metadata:
    labels:
      app: reviews
      version: v3
      test: beta
  spec:
    serviceAccountName: bookinfo-reviews
    containers:
      - name: reviews
        image: docker.io/istio/examples-bookinfo-reviews-v3:1.16.2
        imagePullPolicy: IfNotPresent
        env:
          - name: LOG_DIR
            value: "/tmp/logs"
        ports:
          - containerPort: 9080
        volumeMounts:
          - name: tmp
            mountPath: /tmp
          - name: wlp-output
            mountPath: /opt/ibm/wlp/output
        securityContext:
          runAsUser: 1000
    volumes:
      - name: wlp-output
        emptyDir: {}
      - name: tmp
        emptyDir: {}
```

### Step 3: Apply Changes

After modifying the YAML file, delete the existing configuration and reapply the updated changes:

```
istiotraining@local istio-1.10.3 $ vi reviews.yaml
istiotraining@local istio-1.10.3 $ kubectl delete -f reviews.yaml
service "reviews" deleted
serviceaccount "bookinfo-reviews" deleted
deployment.apps "reviews-v1" deleted
deployment.apps "reviews-v2" deleted
deployment.apps "reviews-v3" deleted
istiotraining@local istio-1.10.3 $ kube
```

![The image shows a Kiali Console interface displaying a list of workloads in the "default" namespace, each labeled with its name, type, and version. The sidebar includes options like Overview, Graph, Applications, Workloads, Services, and Istio Config.](https://kodekloud.com/kk-media/image/upload/v1752879387/notes-assets/images/Istio-Service-Mesh-Demo-Destination-Rules/kiali-console-workloads-default-namespace.jpg)

Notice that the new `test: beta` label appears only in Version V2 and Version V3, while Version V1 remains unchanged. In the Applications page, you can now observe the service reflecting the new label.

## Modifying the Istio Configuration

To leverage the new grouping label, update the Istio configuration by modifying both the Destination Rule and the Virtual Service.

### Updating the Destination Rule

The original Destination Rule for the reviews service defines subsets for V1, V2, and V3. Here is the original configuration:

```
kind: DestinationRule
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7a20a15c-416b-4948-a331-1ac49c64fc4
  resourceVersion: '26753'
  generation: 7
  creationTimestamp: '2021-08-15T22:17:54Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"DestinationRule","metadata":{"annotations":{},"name":"reviews"},"spec":{"host":"reviews","subsets":[{"labels":{"version":"v1"},"name":"v1"},{"labels":{"version":"v2"},"name":"v2"},{"labels":{"version":"v3"},"name":"v3"}]}}
spec:
  host: reviews
  subsets:
    - labels:
        version: v1
      name: v1
    - labels:
        version: v2
      name: v2
```

Update the configuration to incorporate the new grouping label by preserving the V1 subset and adding a new subset for `test: beta`:

```
kind: DestinationRule
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7a2031c5-416b-4948-a331-1cda49c64fc4
  resourceVersion: '26753'
  generation: 7
  creationTimestamp: '2021-08-15T22:17:54Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"DestinationRule","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"host":"reviews","subsets":[{"labels":{"version":"v1"},"name":"v1"},{"labels":{"version":"v2"},"name":"v2"},{"labels":{"version":"v3"},"name":"v3"}}]}}
spec:
  host: reviews
  subsets:
    - labels:
        version: v1
      name: v1
    - labels:
        test: beta
      name: v2
```

This change allows you to test different versions of the application. You can even enable customers to choose their preferred version.

### Updating the Virtual Service

When you update the Virtual Service, the subset references must match the updated Destination Rule. The original Virtual Service configuration is as follows:

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7bc87fe-169a-45a2-ad2d-8bae6f02009e
  resourceVersion: '27541'
  generation: 9
  creationTimestamp: '2021-08-15T22:18:03Z'
annotations: {}
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
              exact: versionest
      route:
        - destination:
            host: reviews
            subset: v3
```

To eliminate warnings on Kiali regarding mismatched subsets, update the Virtual Service to use only the V1 subset along with the new test-beta subset:

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7bc87de-169a-4f32-a2ad-8bae6f02090e
  resourceVersion: '27541'
  generation: 9
  creationTimestamp: '2021-08-15T22:18:03Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >-
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v2"}}]},{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v3"}}]},{"route":[{"destination":{"host":"reviews","subset":"beta"}}]}]}}
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
        - destination:
            host: reviews
            subset: beta
```

## Managing Traffic Distribution

Now that the configurations have been updated, you can control the percentage of traffic routed to each subset. For a scenario where the new subset receives only 10% of the traffic, use this configuration:

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7bc87de-169a-4f32-a2ad-8bae6f02009e
  resourceVersion: '27341'
  generation: 9
  creationTimestamp: '2021-08-15T22:18:03Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v2"}}]},{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v3"}}]},{"route":[{"destination":{"host":"reviews","subset":"beta"}}]}]}}
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
        - destination:
            host: reviews
            subset: beta
          weight: 10
```

After testing, you might observe that Reviews V1 handles most of the traffic while the new subset appears less frequently. To experiment with dynamic traffic distribution, adjust the weights—for example, giving V1 and the `test` subset equal distribution:

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7bc87fe-169a-4f32-a2ad-8baeef02009e
  resourceVersion: '28322'
  generation: 11
  creationTimestamp: '2021-08-01T22:18:03Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews"},"namespace":"default","spec":{"hosts":["reviews"],"http":[{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v2"}}]},{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v3"}}]}]}}
managedFields:
  - apiVersion: networking.istio.io/v1alpha3
    kind: VirtualService
    metadata:{"annotations":{},"name":"reviews"}
    namespace: default
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 10
        - destination:
            host: reviews
            subset: test
          weight: 10
```

## Updating the Destination Rule's Traffic Policy

Next, update the Destination Rule to include a traffic policy for the new test subset. Specify the label for the test group and apply a random load balancing strategy:

```
kind: DestinationRule
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7da03f52-416b-4948-a331-14ca49c64fc4
  resourceVersion: '28120'
  generation: 8
  creationTimestamp: '2021-08-15T22:17:54Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"DestinationRule","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"host":"reviews","subsets":[{"labels":{"version":"v1"},"name":"v1"},{"labels":{"version":"v2"},"name":"v2"},{"labels":{"version":"v3"},"name":"v3"}]}}
managedFields:
  ...
spec:
  host: reviews
  subsets:
    - labels:
        version: v1
      name: v1
    - labels:
        test: beta
      name: test
  trafficPolicy:
    loadBalancer:
      simple: RANDOM
```

With this configuration, Reviews V2 and V3 are randomly selected based on the load balancing strategy.

## Reverting to Round-Robin Load Balancing

If you need to revert to a round-robin load balancing policy, remove the subsets from the Virtual Service and update the Destination Rule accordingly:

### Destination Rule Update

```
kind: DestinationRule
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7a20a15c-416b-4948-a331-14c49c64fc4
  resourceVersion: '28566'
  generation: 10
  creationTimestamp: '2021-08-15T22:17:54Z'
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"DestinationRule","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"host":"reviews","subsets":[{"labels":{"version":"v1"}},{"labels":{"version":"v2"}},{"labels":{"version":"v3"}},{"name":"v3"}]}}
managedFields: []
spec:
  host: reviews
  trafficPolicy:
    loadBalancer:
      simple: ROUND
```

### Virtual Service Update

```
kind: VirtualService
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: reviews
  namespace: default
  uid: 7bc87fe-169a-4f32-a2ad-8bae6f02090e
  resourceVersion: '28616'
  generation: 13
  creationTimestamp: '2021-08-15T22:18:03Z'
annotations:
  kubectl.kubernetes.io/last-applied-configuration: >
    {"apiVersion":"networking.istio.io/v1alpha3","kind":"VirtualService","metadata":{"annotations":{},"name":"reviews","namespace":"default"},"spec":{"hosts":["reviews"],"http":[{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v2"}}]},{"match":[{"headers":{"end-user":{"exact":"kodekloud"}}}],"route":[{"destination":{"host":"reviews","subset":"v3"}}]}]}}
managedFields: []
spec:
  hosts:
    - reviews
  http:
    - route:
        - destination:
            host: reviews
```

With these modifications, the reviews service will now utilize a round-robin strategy, cycling through available endpoints.

## Conclusion

By leveraging Destination Rules and Virtual Services, Istio provides a powerful mechanism to manage and control traffic routing in your microservices architecture. This tutorial demonstrated how to add a new grouping label, update the relevant configurations, and control traffic distribution between different versions of the reviews service. With these techniques, you can enhance your service mesh architecture and experiment with advanced traffic management strategies.

For additional details on Istio and traffic management strategies, refer to the [Istio Documentation](https://istio.io/latest/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/4bedbf0b-5f51-4021-8161-4332380b8fcb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/09363f9a-0751-42b6-9238-a5c7401de8c1)**
>
> Practice lab
