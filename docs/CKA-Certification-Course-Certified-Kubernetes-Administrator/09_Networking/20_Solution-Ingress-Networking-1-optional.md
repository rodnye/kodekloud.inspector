# Solution Ingress Networking 1 optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Ingress-Networking-1-optional)

---

## Table of Contents

- Solution Ingress Networking 1 optional
  - Environment Overview
  - Verifying the Ingress Controller
  - Inspecting Applications and Ingress Resources in app-space
  - Modifying Ingress Paths: Changing the Video Service Path
  - Adding a New Path for the Food Delivery Application
  - Exposing a New Payment Service from a Separate Namespace
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Ingress Networking 1 optional

In this lab, we explore setting up an Ingress Controller within a Kubernetes cluster and configuring it to route traffic to multiple applications across different namespaces. We will review the cluster environment, inspect namespaces and resources, and modify Ingress routes to suit evolving application requirements.

![The image shows a terminal interface with a prompt and a task description about exploring an Ingress Controller setup in different namespaces.](https://kodekloud.com/kk-media/image/upload/v1752869873/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Ingress-Networking-1-optional/frame_0.jpg)

---

## Environment Overview

Begin by verifying the cluster nodes. In this setup, there is only one node present:

```
root@controlplane ~  k get nodes
NAME          STATUS   ROLES                  AGE    VERSION
controlplane  Ready    control-plane,master   11m    v1.23.0
```

Next, check for deployments within the default namespace. The output shows no deployments:

```
root@controlplane ~  k get deploy
No resources found in default namespace.
```

Listing deployments across all namespaces reveals resources in `app-space`, `ingress-nginx`, and `kube-system`:

```
root@controlplane ~  k get deploy -A
NAMESPACE       NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
app-space       default-backend            1/1     1            1           49s
app-space       webapp-video               1/1     1            1           50s
app-space       webapp-wear                1/1     1            1           50s
ingress-nginx   ingress-nginx-controller   1/1     1            0           47s
kube-system     coresdns                 2/2     2            2           11m
```

---

## Verifying the Ingress Controller

Although Ingress Controllers are often deployed in the `kube-system` namespace, here it is installed in the `ingress-nginx` namespace. View all pods across namespaces with:

```
root@controlplane ~ ⤑ k get pods -A
NAMESPACE       NAME                                          READY   STATUS      RESTARTS   AGE
app-space       default-backend-7f874c484-zw8kb              1/1     Running     0          103s
app-space       webapp-video-d54b764b6-d5rn5                 1/1     Running     0          104s
app-space       webapp-wear-5b84c4f565-5hjm                  0/1     Completed   0          101s
ingress-nginx   ingress-nginx-admission-create-wbsr          0/1     Completed   0          101s
ingress-nginx   ingress-nginx-controller-546d8c744-4hz72     1/1     Running     0          101s
kube-system     coredns-64897985d-mwkh8                      1/1     Running     0          11m
kube-system     etcd-controlplane                           1/1     Running     0          12m
kube-system     kube-apiserver-controlplane                 1/1     Running     0          12m
kube-system     kube-controller-manager-controlplane        1/1     Running     0          12m
kube-system     kube-flannel-ds-xtsxv                        1/1     Running     0          11m
kube-system     kube-proxy-m26kb                             1/1     Running     0          11m
kube-system     kube-scheduler-controlplane                 1/1     Running     0          12m
```

To confirm the Ingress Controller deployment in the `ingress-nginx` namespace, run:

```
root@controlplane ~ ⮀ k get deploy -n ingress-nginx
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
ingress-nginx-controller  1/1     1            1           2m9s
```

---

## Inspecting Applications and Ingress Resources in app-space

The applications reside in the `app-space` namespace. Listing pods demonstrates three deployed applications:

```
root@controlplane ~ ⮀ k get pods -A
NAMESPACE        NAME                              READY   STATUS      RESTARTS   AGE
app-space        default-backend-7f87f4c484-zw8kb    1/1     Running     0          103s
app-space        webapp-video-d54b764b6-d5rnd       1/1     Running     0          103s
app-space        webapp-wear-5b44cf565-9hjm          0/1     Completed   0          101s
ingress-nginx    ingress-nginx-admission-create-wbssr  0/1     Completed   0          101s
ingress-nginx    ingress-nginx-ingress-patch-2pmxq      1/1     Running     0          101s
ingress-nginx    ingress-nginx-controller-546d8cf744-4hz72 1/1   Running     0          101s
kube-system      cores-648079805d-pf6j              1/1     Running     0          11m
...
```

Now check the Ingress resource deployed in `app-space`:

```
root@controlplane ~ ➜  k get ingress -A
NAMESPACE   NAME                  CLASS   HOSTS   ADDRESS         PORTS   AGE
app-space   ingress-wear-watch    <none>  *       10.96.152.118   80      3m1s
```

Describing the Ingress resource gives further insights:

```
root@controlplane ~ ⮞ k describe ingress ingress-wear-watch -n app-space
Name:             ingress-wear-watch
Namespace:        app-space
Address:          10.96.152.118
Default backend:  default-http-backend:80 (<error: endpoints "default-http-backend" not found>)
Rules:
  Host        Path      Backends
  ----        ----      --------
  *           /wear     wear-service:8080 (10.244.0.4:8080)
              /watch    video-service:8080 (10.244.0.6:8080)
Annotations:  nginx.ingress.kubernetes.io/rewrite-target: /
              nginx.ingress.kubernetes.io/ssl-redirect: false
Events:
  Type    Reason   Age    From                          Message
  ----    ------   ----   ----                          -------
  Normal  Sync     3m3s  (x2 over 3m3s)  nginx-ingress-controller  Scheduled for sync
```

Key details from this configuration:

- Requests to `/wear` are routed to the `wear-service`.
- Requests to `/watch` are handled by the `video-service`.
- Traffic not matching these paths is sent to the `default-http-backend`, resulting in a 404 error.

When accessing the Ingress’s external address, you initially see a 404 error. However, appending `/watch` or `/wear` to the URL correctly routes traffic to the respective applications.

---

## Modifying Ingress Paths: Changing the Video Service Path

To change the video streaming endpoint from `/watch` to `/stream`, edit the Ingress resource in the `app-space` namespace. The original configuration is:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  creationTimestamp: "2022-04-19T20:28:19Z"
  generation: 1
  name: ingress-wear-watch
  namespace: app-space
  resourceVersion: "1527"
  uid: 744fee2c-c712-458b-a7f6-e43e3d403dac
spec:
  rules:
  - http:
      paths:
      - backend:
          service:
            name: wear-service
            port:
              number: 8080
        path: /wear
        pathType: Prefix
      - backend:
          service:
            name: video-service
            port:
              number: 8080
        path: /watch
        pathType: Prefix
status:
  loadBalancer:
    ingress:
    - ip: 10.96.152.118
```

After editing, update the path so that the video service is available at `/stream`:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  creationTimestamp: "2022-04-19T20:28:19Z"
  generation: 1
  name: ingress-wear-watch
  namespace: app-space
  resourceVersion: "1527"
  uid: 744fafee2-c712-458b-a7f6-e43e3d403dac
spec:
  rules:
  - http:
      paths:
      - backend:
          service:
            name: wear-service
            port:
              number: 8080
        path: /wear
        pathType: Prefix
      - backend:
          service:
            name: video-service
            port:
              number: 8080
        path: /stream
        pathType: Prefix
status:
  loadBalancer:
    ingress:
    - ip: 10.96.152.118
```

After applying this change, accessing the previous `/watch` route will now result in a 404 error, while navigating to `/stream` displays the video streaming application as expected.

---

## Adding a New Path for the Food Delivery Application

A recently acquired food delivery application (`webapp-food`) is now running in the `app-space` namespace. Verify its deployment along with other applications:

```
root@controlplane ~ ➜ k get deploy -n app-space
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
default-backend     1/1     1            1           7m53s
webapp-food         1/1     1            1           20s
webapp-video        1/1     1            1           7m54s
webapp-wear         1/1     1            1           7m54s
```

Also review the corresponding services:

```
root@controlplane ~ ➜ k get svc -n app-space
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
default-http-backend   ClusterIP   10.102.190.18   <none>        80/TCP    8m22s
food-service           ClusterIP   10.108.9.190    <none>        8080/TCP  49s
video-service          ClusterIP   10.107.118.120  <none>        8080/TCP  8m22s
wear-service           ClusterIP   10.110.195.79   <none>        8080/TCP  8m23s
```

To expose the food delivery application at `/eat`, update the Ingress resource to include a new path:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
  creationTimestamp: "2022-04-19T20:28:19Z"
  generation: 2
  name: ingress-wear-watch
  namespace: app-space
  resourceVersion: "19993"
  uid: 74f4fee2-c712-458b-a7f6-e43e3d403dac
spec:
  rules:
  - http:
      paths:
      - backend:
          service:
            name: wear-service
            port:
              number: 8080
        path: /wear
        pathType: Prefix
      - backend:
          service:
            name: video-service
            port:
              number: 8080
        path: /stream
        pathType: Prefix
      - backend:
          service:
            name: food-service
            port:
              number: 8080
        path: /eat
        pathType: Prefix
status:
  loadBalancer:
    ingress:
      - ip: 10.96.152.118
```

After saving these changes, navigating to `/eat` will display the food delivery application.

---

## Exposing a New Payment Service from a Separate Namespace

A critical payment service is deployed in a dedicated namespace called `critical-space`. Verify its deployment and service details:

```
root@controlplane ~ ❯ k get deploy -n critical-space
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
webapp-pay   1/1     1            1           22s
```

```
root@controlplane ~ ❯ k get svc -n critical-space
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)      AGE
pay-service   ClusterIP   10.107.31.180   <none>        8282/TCP    119s
```

> [!important]
> **Best Practice**
>
> It is recommended to create Ingress resources within the same namespace as the underlying application for better access control and management.

Create an Ingress to expose the payment service at `/pay` using the following imperative command:

```
kubectl create ingress ingress-pay -n critical-space --rule="/pay=pay-service:8282"
```

After creation, check the Ingress:

```
k get ingress -n critical-space
NAME         CLASS   HOSTS   ADDRESS   PORTS   AGE
ingress-pay  <none>  *       <none>    80      10s
```

A description of the Ingress reveals:

```
k describe ingress ingress-pay -n critical-space
Name:             ingress-pay
Namespace:        critical-space
Default backend:  default-http-backend:80 (<error: endpoints "default-http-backend" not found>)
Rules:
  Host   Path   Backends
  ----   ----   --------
  *      /pay   pay-service:8282 (10.244.0.11:8080)
Annotations:  <none>
Events:
  Normal  Sync   19s   nginx-ingress-controller  Scheduled for sync
```

However, accessing `/pay` returns a 404 error because the Flask application is serving content only at the root URL `/`. Check the application logs to confirm:

```
root@controlplane ~ ᐅ k logs webapp-pay-6788845d4b-wl8ks -n critical-space
...
10.244.0.9 - - [13/May/2022 05:30:31] "GET /pay HTTP/1.1" 404 -
```

To resolve this, add an annotation to rewrite the URL by removing the `/pay` prefix before forwarding requests to the backend. Update the Ingress resource as shown:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-pay
  namespace: critical-space
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  creationTimestamp: "2022-04-19T20:41:43Z"
  generation: 1
  resourceVersion: "2641"
  uid: 0df91193-6100-4bcf-b28a-1f4840aa630
spec:
  rules:
  - http:
      paths:
      - backend:
          service:
            name: pay-service
            port:
              number: 8282
        path: /pay
        pathType: Exact
status:
  loadBalancer:
    ingress:
    - ip: 10.96.152.118
```

With this rewrite annotation, when accessing `/pay`, the prefix is stripped and the payment service receives the request at its root path. Verification via logs and browser confirms the service now responds correctly.

![The image shows a tutorial on configuring Ingress for URL path forwarding in Kubernetes, explaining how to use rewrite-target options for proper routing to backend services.](https://kodekloud.com/kk-media/image/upload/v1752869874/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Ingress-Networking-1-optional/frame_870.jpg)

This concludes the lab article on configuring Ingress for multiple applications across different namespaces, demonstrating best practices for routing and resource management in Kubernetes clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/e5b80056-93b7-4f11-97ee-5f7035d933fd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/c6c8e285-f25f-4d57-b641-030e6ab5a61c)**
>
> Practice lab
