# Demo Service Types - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Demo-Service-Types)

---

## Table of Contents

- Demo Service Types
  - Overview of Service Types
  - 1. ClusterIP (Default)
  - 2. NodePort
  - 3. Headless Service
  - 4. ExternalName
  - Further Reading & References
  - Watch Video
  - Practice Lab
    - 1.1 Service Definition
    - 1.2 Testing Internal Access
    - 2.1 Service Definition
    - 2.2 Access via Node IP
    - 2.3 Internal DNS Resolution
    - 3.1 Service Definition
    - 3.2 DNS and Direct Pod Access
    - 4.1 Service Definition
    - 4.2 Testing ExternalName

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Demo Service Types

In this guide, you’ll learn about the four primary Kubernetes Service types—ClusterIP, NodePort, Headless, and ExternalName—using a sample NGINX deployment. Understanding these service types will help you expose applications both inside and outside your cluster.

## Overview of Service Types

| Service Type | Scope                    | Use Case                               | Example Port |
| ------------ | ------------------------ | -------------------------------------- | ------------ |
| ClusterIP    | Internal cluster traffic | Internal load-balancing                | `80`         |
| NodePort     | Node’s IP + port         | External access via node IP and port   | `30000`      |
| Headless     | Pod IPs directly         | Direct per-pod connectivity (no LB)    | `80`         |
| ExternalName | DNS CNAME mapping        | Map service to external DNS (no proxy) | N/A          |

Before diving in, we’ve deployed three NGINX pods with the label `role=nginx` in the `default` namespace:

```
kubectl get pods
# OUTPUT
# NAME                                  READY   STATUS    RESTARTS   AGE
# nginx-deployment-7ff69d756-8qdv8      1/1     Running   0          3m
# nginx-deployment-7ff69d756-hccjn      1/1     Running   0          3m
# nginx-deployment-7ff69d756-stpmz      1/1     Running   0          3m
```

---

## 1\. ClusterIP (Default)

ClusterIP is the Kubernetes default service type. It allocates a virtual IP reachable only within the cluster.

### 1.1 Service Definition

```
apiVersion: v1
kind: Service
metadata:
  name: clusterip-svc
  namespace: default
spec:
  type: ClusterIP
  selector:
    role: nginx
  ports:
    - name: http
      port: 80
      targetPort: 80
```

```
kubectl apply -f clusterip-svc.yaml
kubectl get svc clusterip-svc
# OUTPUT
# NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
# clusterip-svc    ClusterIP   10.102.157.139   <none>        80/TCP    5m
```

### 1.2 Testing Internal Access

Launch a temporary pod to test DNS and HTTP:

```
kubectl run -i --tty --rm debug --image=curlimages/curl --restart=Never -- sh
```

Inside the debug pod:

```
nslookup clusterip-svc.default.svc.cluster.local
curl http://clusterip-svc.default.svc.cluster.local
# Should return the NGINX welcome page
```

> [!important]
> **Note**
>
> ClusterIP services are only reachable from within the Kubernetes cluster. Use them for internal microservice communication.

---

## 2\. NodePort

NodePort exposes a Service on each Node’s IP at a static port, allowing external traffic.

### 2.1 Service Definition

```
apiVersion: v1
kind: Service
metadata:
  name: nodeport-svc
  namespace: default
spec:
  type: NodePort
  selector:
    role: nginx
  ports:
    - name: http
      port: 80
      targetPort: 80
      nodePort: 30000
```

```
kubectl apply -f nodeport-svc.yaml
kubectl get svc nodeport-svc
# OUTPUT
# NAME             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)         AGE
# nodeport-svc     NodePort    10.98.229.84     <none>        80:30000/TCP    5m
```

### 2.2 Access via Node IP

1.  Find a node’s IP address:

    ```
    kubectl get node node01 -o jsonpath='{.status.addresses[?(@.type=="InternalIP")].address}'
    # e.g., 192.168.121.156
    ```

2.  From outside the cluster:

    ```
    curl http://192.168.121.156:30000
    ```

    This should return the NGINX welcome page.

> [!important]
> **Warning**
>
> Ensure that your cloud provider’s firewall or on-premise network allows traffic to the `nodePort` range (default 30000–32767).

### 2.3 Internal DNS Resolution

Within the cluster, you can still resolve the service by DNS:

```
kubectl run -i --tty --rm debug --image=curlimages/curl --restart=Never -- sh
# Inside the pod:
nslookup nodeport-svc.default.svc.cluster.local
curl http://nodeport-svc.default.svc.cluster.local
```

---

## 3\. Headless Service

A headless Service omits the cluster IP (`clusterIP: None`) and returns the IPs of individual pods directly.

### 3.1 Service Definition

```
apiVersion: v1
kind: Service
metadata:
  name: headless-svc
  namespace: default
spec:
  clusterIP: None
  selector:
    role: nginx
  ports:
    - name: http
      port: 80
      targetPort: 80
```

```
kubectl apply -f headless-svc.yaml
kubectl get svc headless-svc
# OUTPUT
# NAME            TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
# headless-svc    ClusterIP   None         <none>        80/TCP    5m
```

### 3.2 DNS and Direct Pod Access

```
kubectl run -i --tty --rm debug --image=curlimages/curl --restart=Never -- sh
```

Inside the debug pod:

```
nslookup headless-svc.default.svc.cluster.local
for ip in $(nslookup headless-svc.default.svc.cluster.local | grep Address | awk '{print $2}'); do
  curl http://$ip
done
```

> [!important]
> **Note**
>
> Headless Services are ideal for stateful applications (e.g., databases) where you need direct pod access for persistent storage or custom load balancing.

---

## 4\. ExternalName

ExternalName maps a Service to an external DNS name by returning a CNAME record.

### 4.1 Service Definition

```
apiVersion: v1
kind: Service
metadata:
  name: externalname-svc
  namespace: default
spec:
  type: ExternalName
  externalName: httpbin.org
```

```
kubectl apply -f externalname-svc.yaml
kubectl get svc externalname-svc
# OUTPUT
# NAME                 TYPE           CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
# externalname-svc     ExternalName   <none>       <none>        <none>    5m
```

### 4.2 Testing ExternalName

```
kubectl run -i --tty --rm debug --image=curlimages/curl --restart=Never -- sh
# Inside the pod:
curl http://externalname-svc.default.svc.cluster.local/get
# This request is forwarded to httpbin.org/get
```

> [!important]
> **Note**
>
> ExternalName does not proxy traffic through the cluster—it simply performs a DNS CNAME lookup. Use this to reference external APIs or services.

---

## Further Reading & References

- [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)
- [Service Types](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)
- [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/a007ca25-61da-47e0-bd8c-d81bd96cfc86)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/a3dadd51-f6ef-4e99-aa01-2f84e56582b4)**
>
> Practice lab
