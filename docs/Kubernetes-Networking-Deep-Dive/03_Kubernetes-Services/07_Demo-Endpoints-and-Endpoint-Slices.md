# Demo Endpoints and Endpoint Slices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Demo-Endpoints-and-Endpoint-Slices)

---

## Table of Contents

- Demo Endpoints and Endpoint Slices
  - 1. Deploy Nginx and Inspect Endpoints
  - 2. Scaling and Endpoint Updates
  - 3. Exploring Endpoint Slices
  - 4. Comparison and Conclusion
  - Links and References
  - Watch Video
    - 1.1 Verify Deployment and Service
    - 1.2 List Endpoints
    - 1.3 Inspect the Endpoints Resource
    - 3.1 List Endpoint Slices
    - 3.2 Inspect a Single EndpointSlice
    - 3.3 EndpointSlice Updates on Scaling

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Demo Endpoints and Endpoint Slices

In this tutorial, we’ll explore how Kubernetes manages Endpoints and Endpoint Slices by deploying a simple Nginx application. You’ll learn how to inspect the Endpoints resource, watch automatic updates as you scale Pods, and examine the more scalable Endpoint Slices feature introduced in Kubernetes 1.17.

## 1\. Deploy Nginx and Inspect Endpoints

### 1.1 Verify Deployment and Service

First, create an Nginx Deployment and a ClusterIP Service (assumed already applied). Then confirm they’re up and running:

```
kubectl get deployments.apps
```

```
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment    1/1     1            1           5m
```

```
kubectl get services
```

```
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP    40m
nginx-service   ClusterIP   10.98.220.254    <none>        80/TCP     5m
```

### 1.2 List Endpoints

Kubernetes automatically creates an Endpoints object that tracks the Pod IPs behind a Service:

```
kubectl get endpoints
```

```
NAME            ENDPOINTS            AGE
kubernetes      192.168.121.182:6443 40m
nginx-service   10.0.0.55:80         5m
```

> [!important]
> **Note**
>
> The `nginx-service` Endpoints resource shows the Pod’s IP (`10.0.0.55`) and port (`80`).

### 1.3 Inspect the Endpoints Resource

View the full Endpoints object:

```
kubectl get endpoints nginx-service -o yaml
```

```
apiVersion: v1
kind: Endpoints
metadata:
  name: nginx-service
  namespace: default
subsets:
- addresses:
  - ip: 10.0.0.55
    nodeName: node01
    targetRef:
      kind: Pod
      name: nginx-deployment-7c79c4bf97-z79j4
      namespace: default
  ports:
  - name: nginx
    port: 80
    protocol: TCP
```

Alternatively, use `describe` for a concise summary:

```
kubectl describe endpoints nginx-service
```

```
Name:         nginx-service
Namespace:    default
Subset:
  Addresses:  10.0.0.55
  Ports:
    Name   Port  Protocol
    nginx  80    TCP
```

## 2\. Scaling and Endpoint Updates

Kubernetes updates the Endpoints list automatically when Pods are added or removed.

1.  Scale to two replicas:

    ```
    kubectl scale deployment nginx-deployment --replicas=2
    ```

2.  Wait for both Pods to be `Running`:

    ```
    kubectl get pods
    ```

3.  Describe Endpoints again:

    ```
    kubectl describe endpoints nginx-service
    ```

    ```
    Subset:
      Addresses: 10.0.0.55,10.0.1.248
      Ports:
        Name   Port  Protocol
        nginx  80    TCP
    ```

4.  Delete one Pod and observe the update:

    ```
    kubectl delete pod nginx-deployment-7c79c4bf97-xd2mw
    kubectl describe endpoints nginx-service
    ```

5.  Scale back to one replica:

    ```
    kubectl scale deployment nginx-deployment --replicas=1
    kubectl describe endpoints nginx-service
    ```

## 3\. Exploring Endpoint Slices

Endpoint Slices improve scalability by splitting Service backends into multiple slice objects.

### 3.1 List Endpoint Slices

```
kubectl get endpointslices
```

```
NAME                         ADDRESSTYPE   PORTS  ENDPOINTS       AGE
kubernetes                   IPv4          6443   192.168.121.182 42m
nginx-service-87c5j          IPv4          80     10.0.0.55       7m
```

### 3.2 Inspect a Single EndpointSlice

```
kubectl get endpointslice nginx-service-87c5j -o yaml
```

```
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: nginx-service-87c5j
  namespace: default
  labels:
    kubernetes.io/service-name: nginx-service
    endpointslice.kubernetes.io/managed-by: endpointslice-controller.k8s.io
ports:
- name: nginx
  port: 80
  protocol: TCP
endpoints:
- addresses:
  - 10.0.0.55
  conditions:
    ready: true
  targetRef:
    kind: Pod
    name: nginx-deployment-7c79c4bf97-z79j4
  nodeName: node01
```

Or use:

```
kubectl describe endpointslice nginx-service-87c5j
```

```
Name:         nginx-service-87c5j
AddressType:  IPv4
Ports:
  Name   Port  Protocol
  nginx  80    TCP
Endpoints:
  - Addresses:   10.0.0.55
    Conditions:
      Ready:     true
    TargetRef:   Pod/nginx-deployment-7c79c4bf97-z79j4
    NodeName:    node01
```

> [!important]
> **Warning**
>
> Endpoint Slices are created by default in Kubernetes v1.21+. Make sure your cluster version supports discovery.k8s.io/v1.

### 3.3 EndpointSlice Updates on Scaling

Scale to two replicas:

```
kubectl scale deployment nginx-deployment --replicas=2
kubectl describe endpointslice nginx-service-87c5j
```

```
Endpoints:
  - Addresses: 10.0.0.55
    Conditions:
      Ready: true
    TargetRef: Pod/nginx-deployment-7c79c4bf97-z79j4
  - Addresses: 10.1.0.202
    Conditions:
      Ready: true
    TargetRef: Pod/nginx-deployment-7c79c4bf97-gsc44
```

Scale back to one replica and verify:

```
kubectl scale deployment nginx-deployment --replicas=1
kubectl describe endpointslice nginx-service-87c5j
```

```
Endpoints:
  - Addresses: 10.0.0.55
    Conditions:
      Ready: true
    TargetRef: Pod/nginx-deployment-7c79c4bf97-z79j4
```

## 4\. Comparison and Conclusion

| Resource Type | Description                                                 | Use Case                                 |
| ------------- | ----------------------------------------------------------- | ---------------------------------------- |
| Endpoints     | Lists Pod IPs and ports for a Service                       | Simple clusters with few backends        |
| EndpointSlice | Splits backends into scalable slices of up to 100 endpoints | Large clusters, high-service cardinality |

Kubernetes manages both Endpoints and Endpoint Slices automatically. Use Endpoints for small clusters and Endpoint Slices to handle large-scale Service connectivity efficiently.

## Links and References

- [Kubernetes Endpoints Concept](https://kubernetes.io/docs/concepts/services-networking/service/#endpoints)
- [Endpoint Slice Documentation](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/)
- [Nginx on Kubernetes](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/3de266e9-fb99-489c-81fd-28cc192cf606)**
>
> Watch video content
