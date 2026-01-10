# Virtual Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Virtual-Services)

---

## Table of Contents

- Virtual Services
  - Configuring a Virtual Service for the Product Page
  - Routing Between Service Versions
  - Watch Video
    - Traffic Routing Without Istio
    - Traffic Routing With Istio Virtual Services

---

## Content

Istio Service Mesh

Traffic Management

# Virtual Services

In this guide, we explore Virtual Services in Istio and demonstrate how they enable advanced traffic management for microservices. Virtual Services allow you to configure routing rules, directing incoming traffic through the Ingress Gateway to the appropriate service in your service mesh.

When a user visits http://bookinfo.app, the request first reaches the bookinfo.app Gateway. From there, Istio routes the traffic based on defined rules. For example, you can direct all traffic for the URL bookinfo.app/productpage—including static resources under /static, as well as login, logout, and API paths—specifically to the productPage service.

Virtual Services offer flexibility by allowing you to specify hostnames, manage traffic among different service versions, and use both standard and regex URI paths. Once a Virtual Service is created, the Istio control plane disseminates the configuration to all Envoy sidecars in the mesh.

> [!important]
> **Key Information**
>
> Creating a Virtual Service decouples your traffic routing policies from the actual service implementations, enabling granular control over how your application's requests are handled.

## Configuring a Virtual Service for the Product Page

Below is an example Virtual Service configuration that routes traffic matching specific URL patterns to the productPage service:

```
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
    - "bookinfo.app"
  gateways:
    - bookinfo-gateway
  http:
    - match:
        - uri:
            exact: /productpage
        - uri:
            prefix: /static
        - uri:
            exact: /login
        - uri:
            exact: /logout
        - uri:
            prefix: /api/v1/products
      route:
        - destination:
            host: productpage
            port:
              number: 9080
```

This configuration instructs Istio to forward any traffic passing through the bookinfo-gateway with the host bookinfo.app and matching the specified URL patterns to the productPage service on port 9080.

![The image is a diagram showing a microservices architecture with an Istio ingress gateway, virtual service, and components like Product Page, Details, Reviews (v1, v2, v3), and Ratings.](https://kodekloud.com/kk-media/image/upload/v1752879395/notes-assets/images/Istio-Service-Mesh-Virtual-Services/microservices-architecture-istio-diagram.jpg)

## Routing Between Service Versions

Once traffic is directed to the product page, it often needs to communicate with additional backend services—for example, the reviews service. Initially, the productPage might only interact with reviews version 1 (v1). However, as you deploy newer versions (such as v2 and v3), you can gradually roll out these changes. This incremental rollout allows you to test new features (e.g., v2 showing black stars or v3 displaying red stars) without affecting all users.

### Traffic Routing Without Istio

In a standard Kubernetes cluster, the productPage communicates with the reviews service via a Kubernetes Service. For instance, consider the following deployment for reviews v1:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v1
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: reviews
        version: v1
---
apiVersion: v1
kind: Service
metadata:
  name: reviews
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: reviews
```

In this setup, the "reviews" Service selects pods with the label "app: reviews" from the reviews-v1 Deployment. With three replicas, all incoming traffic is evenly distributed among these pods, meaning 100% of the traffic goes to v1.

When deploying a new version (such as reviews v2), you might create a separate Deployment with a smaller number of replicas. For example:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v2
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: reviews
        version: v1
```

The same Service is used:

```
apiVersion: v1
kind: Service
metadata:
  name: reviews
spec:
  ports:
    - port: 9080
      name: http
  selector:
    app: reviews
```

With four pods in total, approximately 75% of the traffic will reach v1 and 25% will be directed to v2. When a third version (v3) is deployed similarly:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: reviews-v3
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: reviews
        version: v1
```

and added to the same Service, the traffic distribution might adjust to 60% for v1, 20% for v2, and 20% for v3. If v3 proves to be the superior version (e.g., due to its new star feature), you could scale the deployments to migrate all traffic to v3 using:

```
$ kubectl scale deployment reviews-v3 --replicas=3
deployment.apps/reviews-v3 scaled
$ kubectl scale deployment reviews-v2 --replicas=0
deployment.apps/reviews-v2 scaled
$ kubectl scale deployment reviews-v1 --replicas=0
deployment.apps/reviews-v1 scaled
```

This approach exposes a limitation of native Kubernetes traffic management: it requires manual pod scaling to achieve granular routing, which may not be ideal if you need to direct only 1% of traffic to a new version.

![The image is a flowchart showing a product page directing reviews to different versions (v1, v2, v3) with 99% going to v1 and 1% to v2.](https://kodekloud.com/kk-media/image/upload/v1752879396/notes-assets/images/Istio-Service-Mesh-Virtual-Services/product-page-reviews-flowchart.jpg)

### Traffic Routing With Istio Virtual Services

Istio overcomes these limitations by decoupling traffic routing from pod count. Using Virtual Services in conjunction with destination rules (which define subsets like v1 and v2), you can precisely control traffic percentages. For example, the following Virtual Service configuration directs 99% of traffic to subset v1 and 1% to subset v2:

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
          weight: 99
        - destination:
            host: reviews
            subset: v2
          weight: 1
```

Even if the reviews v2 deployment scales up with more pods, the Virtual Service configuration continues to manage the traffic distribution independently. In this scenario, "subset" groups your pods based on specific labels, offering an additional layer of granularity beyond what standard Kubernetes Services provide.

> [!important]
> **Important**
>
> Ensure that your destination rules are correctly configured to define each subset, otherwise the intended traffic routing may not be achieved.

In the upcoming sections, we will discuss how to configure destination rules to define these subsets and further enhance your traffic management strategy with Istio.

For more details on Istio traffic management and advanced routing, visit the [Istio Documentation](https://istio.io/latest/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/55c4c945-6dcf-4f58-ba82-1b1c95397adb)**
>
> Watch video content
