# Demo Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Istio-Service-Mesh/Security/Demo-Authorization)

---

## Table of Contents

- Demo Authorization
  - Step 1: Deny All Traffic in the Default Namespace
  - Step 2: Enable Traffic for the Product Page
  - Step 3: Sequentially Enable Additional Components
  - Step 4: Review the Istio Configuration
  - Conclusion
  - Watch Video
    - 3.1 Create the Details Viewer Policy
    - 3.2 Enable the Reviews Service
    - 3.3 Create the Ratings Viewer Policy

---

## Content

Istio Service Mesh

Security

# Demo Authorization

In this lesson, we demonstrate how to apply authorization policies at both the namespace and workload levels in an Istio service mesh. These policies are essential for securing your applications by explicitly allowing or denying traffic.

![The image shows a Kiali Console dashboard displaying an overview of namespaces with details about applications, Istio configurations, and traffic status.](https://kodekloud.com/kk-media/image/upload/v1752879378/notes-assets/images/Istio-Service-Mesh-Demo-Authorization/kiali-console-dashboard-overview-namespaces.jpg)

## Step 1: Deny All Traffic in the Default Namespace

First, verify that your application is running. Then, apply an authorization policy to the default namespace. This policy, which contains no selectors and an empty spec, denies all traffic to all workloads within the namespace.

```
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-nothing
  namespace: default
spec:
  {}
EOF
```

The output should confirm that the policy was created:

```
authorizationpolicy.security.istio.io/allow-nothing created
```

It may take a few moments for the new policy to propagate. When you access your application using a browser, you should see an "RBAC: access denied" message because Istio lacks any rules that allow traffic:

```
RBAC: access denied
```

To further test the effect of this policy, generate continuous traffic with this command:

```
while sleep 0.01; do curl -s "http://${INGRESS_HOST}:${INGRESS_PORT}/productpage" &> /dev/null; done
```

Check your product page application both in the browser and on the Kiali dashboard. You will observe that no traffic passes through and error messages related to RBAC access denial appear in the pod logs.

![The image shows a Kiali console interface displaying a service graph for a "productpage-v1" workload, with traffic metrics and pod status. The graph illustrates the flow of requests between different services, including "istio-ingressgateway," "reviews," and "details."](https://kodekloud.com/kk-media/image/upload/v1752879380/notes-assets/images/Istio-Service-Mesh-Demo-Authorization/kiali-service-graph-productpage-v1.jpg)

> [!important]
> **Tip**
>
> Examine the distributed traces in your tracing system; a dark red grouping of traces often highlights problematic traffic.

## Step 2: Enable Traffic for the Product Page

To allow HTTP GET requests to the product page, create a policy that selects workloads with the label `app: productpage` in the default namespace:

```
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: "productpage-viewer"
  namespace: default
spec:
  selector:
    matchLabels:
      app: productpage
  action: ALLOW
  rules:
  - to:
    - operation:
        methods: ["GET"]
EOF
```

After applying this policy, refresh your browser. The product page should now load correctly, while other services remain inaccessible. The Kiali dashboard will show a green connection from the ingress to the product page, confirming that allowed traffic flows as expected.

## Step 3: Sequentially Enable Additional Components

Next, add further authorization policies to enable full application functionality.

![The image shows a Kiali Console interface displaying a versioned app graph for a microservices architecture, with nodes representing services and edges indicating HTTP traffic flow. On the right, there are traffic statistics and error rates for the services.](https://kodekloud.com/kk-media/image/upload/v1752879381/notes-assets/images/Istio-Service-Mesh-Demo-Authorization/kiali-console-microservices-graph.jpg)

### 3.1 Create the Details Viewer Policy

This policy applies to workloads with the label `app: details` and permits HTTP GET requests from the product page service account (`bookinfo-productpage`):

```
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: "details-viewer"
  namespace: default
spec:
  selector:
    matchLabels:
      app: details
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/bookinfo-productpage"]
    to:
    - operation:
        methods: ["GET"]
EOF
```

Once active, the details component becomes accessible, as reflected by changes in the Kiali graph.

### 3.2 Enable the Reviews Service

Create a policy for the reviews service. This policy selects workloads labeled with `app: reviews` and allows GET requests from the product page service account:

```
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: "reviews-viewer"
  namespace: default
spec:
  selector:
    matchLabels:
      app: reviews
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/bookinfo-productpage"]
    to:
    - operation:
        methods: ["GET"]
EOF
```

After applying this policy, the reviews component should become accessible. However, if ratings are still generating errors (with red indications in the Kiali graph), further action is needed.

### 3.3 Create the Ratings Viewer Policy

Address the issues with the ratings service by creating a policy that selects workloads with the label `app: ratings` and permits GET requests from the reviews service account (`bookinfo-reviews`):

```
kubectl apply -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: "ratings-viewer"
  namespace: default
spec:
  selector:
    matchLabels:
      app: ratings
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/bookinfo-reviews"]
    to:
    - operation:
        methods: ["GET"]
EOF
```

Once enabled, the entire application should operate as expected. The full product page will be displayed in the browser and the Kiali graph will indicate a green status, confirming allowed traffic flows.

## Step 4: Review the Istio Configuration

Take a moment to review the overall Istio configuration. In the configuration section, you will see the global "allow nothing" policy applied across the mesh along with the specific viewer policies for each component.

![The image shows a Kiali console interface displaying a list of Istio configuration policies, specifically AuthorizationPolicies, within the default namespace. Each policy is listed with its name and configuration status.](https://kodekloud.com/kk-media/image/upload/v1752879383/notes-assets/images/Istio-Service-Mesh-Demo-Authorization/kiali-istio-authorization-policies.jpg)

> [!important]
> **Security Reminder**
>
> Any traffic not explicitly allowed by the defined policies (such as POST requests or traffic from unrecognized sources) will be denied. This strict approach is critical for maintaining a robust security posture.

## Conclusion

By sequentially applying targeted authorization policies, you can effectively secure your Istio service mesh while selectively enabling access to critical components of your application. For more details, consult the [Istio Documentation](https://istio.io/latest/docs/).

---

For further reading on securing microservices, see:

- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/)
- [Istio Security Concepts](https://istio.io/latest/docs/concepts/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/istio-service-mesh/module/e4a2171d-d190-4dc9-873e-a0dad6d3cb62/lesson/d6d220f1-dc39-4aff-b906-958afc319034)**
>
> Watch video content
