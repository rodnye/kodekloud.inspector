# Gateways - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Gateways)

---

## Table of Contents

- Gateways
  - Traditional Kubernetes Ingress
  - Istio Gateways for Advanced Traffic Management
  - Creating a Gateway Object
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Gateways

In this article, we explore how to expose services in Istio using Gateways. After deploying your application and setting up the service mesh, you might wonder how external users can access your services. Our example demonstrates how to allow users to view the product page when they navigate to the URL http://bookinfo.app.

## Traditional Kubernetes Ingress

In a traditional Kubernetes setup, an Ingress resource manages incoming traffic by defining specific routing rules. For instance, any traffic arriving with the hostname "bookinfo.app" can be directed to the product service. Below is an example of a Kubernetes Ingress configuration:

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress
spec:
  rules:
  - host: bookinfo.app
    http:
      paths:
      - path: /
        backend:
          serviceName: productpage
          servicePort: 8000
```

![The image is a diagram illustrating a Kubernetes Ingress setup for a web application, showing the flow from an NGINX ingress to various services like Product Page, Details, Reviews, and Ratings.](https://kodekloud.com/kk-media/image/upload/v1752879390/notes-assets/images/Istio-Service-Mesh-Gateways/kubernetes-ingress-setup-diagram.jpg)

> [!important]
> **Note**
>
> Kubernetes Ingress is an effective way to manage incoming traffic. However, Istio enhances monitoring and provides advanced routing capabilities by leveraging its native Gateway features.

## Istio Gateways for Advanced Traffic Management

Istio Gateways function as load balancers at the edge of the mesh, handling both inbound and outbound traffic. When Istio is deployed on a cluster, it automatically installs both the Istio Ingress Gateway and Istio Egress Gateway.

![The image is a diagram of an Istio Gateway, showing components like istio-ingressgateway, istiod, and istio-egressgateway within the istio-system.](https://kodekloud.com/kk-media/image/upload/v1752879391/notes-assets/images/Istio-Service-Mesh-Gateways/istio-gateway-diagram-components.jpg)

Unlike Kubernetes Ingress controllers that might use NGINX, the Istio Ingress Gateway intercepts all inbound traffic using Envoy proxies. Every service in the mesh is paired with an Envoy sidecar proxy, while the gateways themselves are standalone proxies positioned at the edge of the mesh.

![The image is a diagram of an Istio Gateway setup, showing components like "Product Page," "Details," "Reviews" (v1, v2, v3), and "Ratings" connected between an istio-ingress gateway and an istio-egress gateway.](https://kodekloud.com/kk-media/image/upload/v1752879393/notes-assets/images/Istio-Service-Mesh-Gateways/istio-gateway-setup-diagram.jpg)

Our objective is to capture all traffic arriving at the Istio Ingress Gateway for the hostname "bookinfo.app" and forward it to the product page service.

## Creating a Gateway Object

To achieve this, you first create a Gateway object that accepts HTTP traffic on port 80 for the specified hostname. Use the following configuration as a starting point:

```
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "bookinfo.app"
```

To ensure that this configuration applies to the default Istio Ingress Gateway (and not any custom gateways), add a selector that targets the default controller label. The updated configuration is as follows:

```
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway # uses Istio's default ingress gateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "bookinfo.app"
```

Save this configuration in a file (for example, `bookinfo-gateway.yaml`) and create the Gateway in your cluster with the following command:

```
$ kubectl apply -f bookinfo-gateway.yaml
gateway.networking.istio.io/bookinfo-gateway created
```

To verify that the Gateway has been successfully created, run:

```
$ kubectl get gateway
NAME                AGE
bookinfo-gateway    9d
```

For more detailed information about the Gateway, use the describe command:

```
$ kubectl describe gateway bookinfo-gateway
Name:         bookinfo-gateway
Namespace:    default
Labels:       <none>
Annotations:  API Version: networking.istio.io/v1beta1
Kind:         Gateway
...
Spec:
  Selector:
    istio: ingressgateway
  Servers:
  - Port:
      Name:     http
      Number:   80
      Protocol: HTTP
    Hosts:
    - "bookinfo.app"
Events: <none>
```

> [!important]
> **Next Steps**
>
> At this point, the bookinfo Gateway is configured to capture traffic coming through the default Istio Ingress Gateway for the URL "bookinfo.app". The following step is to define Virtual Services to correctly route this traffic to the product page service, which will be covered in a subsequent article.

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/fecd9b1d-3368-43d2-b880-72b7fbd0e0a8)**
>
> Watch video content
