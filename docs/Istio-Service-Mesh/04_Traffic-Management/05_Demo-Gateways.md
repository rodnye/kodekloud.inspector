# Demo Gateways - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Traffic-Management/Demo-Gateways)

---

## Table of Contents

- Demo Gateways
  - Reviewing the Preconfigured Gateway
  - Deploying the Bookinfo Application
  - Creating a Gateway with a Specific Hostname
  - Configuring the Virtual Service
  - Testing the Configuration
  - Verifying in Kiali
  - Accessing the Application via a Browser
  - Reverting Back to Wildcard Hostname
  - Watch Video

---

## Content

Istio Service Mesh

Traffic Management

# Demo Gateways

In this guide, we demonstrate how to work with Istio Gateways—starting with a preconfigured Gateway and then creating one that listens for a specific hostname. This article is designed to be SEO friendly and provides a step-by-step explanation, including configuration, deployment, and testing processes.

## Reviewing the Preconfigured Gateway

First, let’s examine the existing Gateway configuration from our samples folder. Notice that this configuration uses a wildcard "\*" for the host value. This allows the Gateway to accept traffic from any host.

```
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"Gateway","metadata":{"annotations":{},"name":"bookinfo-gateway","namespace":"default"},"spec":{"selector":{"istio":"ingressgateway"},"servers":[{"hosts":["*"],"port":{"name":"http","number":80,"protocol":"HTTP"}}]}}
  generation: 7
  name: bookinfo-gateway
  namespace: default
  resourceVersion: "18550"
  uid: 4686ab5f-31f8-463c-940f-72577c65364a
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    - "*"
    port:
      name: http
      number: 80
      protocol: HTTP
```

> [!important]
> **Note**
>
> Ensure that you understand how wildcard hosts affect traffic routing in Istio before proceeding.

## Deploying the Bookinfo Application

Before configuring a new Gateway with a specific hostname, verify that all required applications are running. Deploy the Bookinfo application using the provided YAML configuration:

```
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```

You should see output similar to the following:

```
service/details unchanged
serviceaccount/bookinfo-details unchanged
deployment.apps/details-v1 unchanged
service/account/bookinfo-ratings unchanged
deployment.apps/ratings-v1 unchanged
service/reviews unchanged
serviceaccount/bookinfo-reviews unchanged
deployment.apps/reviews-v1 unchanged
deployment.apps/reviews-v2 unchanged
deployment.apps/reviews-v3 unchanged
service/productpage unchanged
serviceaccount/bookinfo-productpage unchanged
deployment.apps/productpage-v1 created
kubectl get gawv
```

## Creating a Gateway with a Specific Hostname

Next, we create a Gateway that listens specifically for requests targeting the hostname "bookinfo.app". This configuration accepts HTTP traffic on port 80 directed to that host.

```
kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "bookinfo.app"
EOF
```

After running the command, the output should confirm the creation similar to:

```
gateway.networking.istio.io/bookinfo-gateway created
istiotraining@local istio-1.10.3 $
```

## Configuring the Virtual Service

For the Gateway configuration to work as intended, you need to define a Virtual Service that routes incoming requests to the correct service based on specific URI match rules. It is crucial that the hosts defined in the Virtual Service match those in the Gateway.

Apply the Virtual Service configuration with the command below:

```
kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
    - bookinfo.app
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
EOF
```

The command should output:

```
virtualservice.networking.istio.io/bookinfo configured
```

> [!important]
> **Note**
>
> Ensure that the hosts in your Gateway and Virtual Service configurations match exactly for proper routing.

## Testing the Configuration

To confirm the Gateway correctly handles traffic, include the header "Host: bookinfo.app" when sending your requests. For example, to test the configuration using curl, run:

```
curl -s -H "Host: bookinfo.app" http://$INGRESS_HOST:$INGRESS_PORT/
```

Next, test accessing the product page:

```
curl -s -H "Host: bookinfo.app" http://$INGRESS_HOST:$INGRESS_PORT/productpage
```

The expected output should display HTML content similar to:

```
<title>Simple Bookstore App</title>
```

> [!important]
> **Warning**
>
> Always include the appropriate Host header in your requests to ensure they are routed correctly through the Istio Gateway.

## Verifying in Kiali

Kiali provides a graphical view of your Istio configuration. You can confirm your Gateway settings by checking the Istio config section in Kiali. Below is an example of how your Gateway configuration might appear in Kiali:

```
kind: Gateway
apiVersion: networking.istio.io/v1alpha3
metadata:
  name: bookinfo-gateway
  namespace: default
  uid: 9dacb2c2-acd1-471f-8797-70b607d1f45a
  resourceVersion: "15671"
  generation: 1
  creationTimestamp: "2021-08-05T00:07:40Z"
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"Gateway","metadata":{"annotations":{},"name":"bookinfo-gateway","namespace":"default"},"spec":{"selector":{"istio":"ingressgateway"},"servers":[{"hosts":["bookinfo.app"],"port":{"name":"http","number":80,"protocol":"HTTP"}}]}}
managedFields: null
spec:
  servers:
    - hosts:
        - bookinfo.app
      port:
        name: http
        number: 80
        protocol: HTTP
  selector:
    istio: ingressgateway
```

## Accessing the Application via a Browser

To test your configuration in a web browser, update your local hosts file so that "bookinfo.app" resolves to your cluster's IP address. For example, if you are using Minikube, execute:

```
echo -e "$(minikube ip)\tbookinfo.app" | sudo tee -a /etc/hosts
```

Next, open your browser and navigate to:

```
http://bookinfo.app:<PORT>/productpage
```

Replace `<PORT>` with your actual ingress port. You should see the Bookinfo product page load correctly.

## Reverting Back to Wildcard Hostname

If you need to revert to the default gateway configuration using a wildcard hostname (especially during training), update your Gateway configuration. First, ensure your hosts file is correct:

```
echo -e "$(minikube ip) bookinfo.app" | sudo tee -a /etc/hosts
```

Then, update the Gateway to use the wildcard "\*" for hosts:

```
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"Gateway","metadata":{},"name":"bookinfo-gateway","namespace":"default","spec":{"selector":{"istio":"ingressgateway"},"servers":[{"hosts":["*"],"port":{"name":"http","number":80,"protocol":"HTTP"}}]}}
  generation: 10
  name: bookinfo-gateway
  namespace: default
  resourceVersion: "20541"
  uid: 4686ab5f-31f8-463c-940f-72577c65364a
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    - "*"
    port:
      name: http
      number: 80
      protocol: HTTP
```

If your Virtual Service configuration also needs to revert to a wildcard hostname, update it accordingly:

```
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.istio.io/v1alpha3","kind":"Gateway","metadata":{},"name":"bookinfo-gateway","namespace":"default","spec":{"selector":{"istio":"ingressgateway"},"servers":[{"hosts":["*"],"port":{"name":"http","number":80,"protocol":"HTTP"}}]}}
  creationTimestamp: "2021-10-09T22:19:31Z"
  generation: 10
  name: bookinfo-gateway
  namespace: default
  resourceVersion: "20541"
  uid: 4686ab5f-31f8-463c-940f-72577c65364a
spec:
  selector:
    istio: ingressgateway
  servers:
  - hosts:
    - "*"
    port:
      name: http
      number: 80
      protocol: HTTP
```

Using these steps, you can easily switch between a specific hostname and a wildcard configuration, ensuring that the Bookinfo application remains accessible under both scenarios.

Happy configuring and exploring the powerful routing capabilities of Istio!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/fe135c6a-440a-4e97-b1b5-6a2b032689bd/lesson/ab601819-b451-4ac6-b641-29d84d350f13)**
>
> Watch video content
