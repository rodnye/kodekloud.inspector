# Solution Ingress Networking 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Solution-Ingress-Networking-1)

---

## Table of Contents

- Solution Ingress Networking 1
  - Environment Overview
  - Ingress Controller Details
  - Application and Ingress Resource
  - Updating the Ingress Resource
  - Adding a Path for the Food Delivery Application
  - Integrating a New Payment Service in a Separate Namespace
  - Conclusion
  - Watch Video
  - Practice Lab
    - Redirecting Video Streaming to "/stream"

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Solution Ingress Networking 1

In this lab, we will walk through configuring an Ingress Controller, examining deployed resources, and updating Ingress paths to route traffic appropriately across multiple applications and namespaces.

---

## Environment Overview

Begin by reviewing your cluster environment. Verify the nodes, namespaces, deployments, and pods. In this setup, there is one node with various namespaces hosting different components. For instance, run the following command to list all pods across all namespaces:

```
root@controlplane ~ ➜ k get pods -A
NAMESPACE      NAME                                       READY   STATUS      RESTARTS   AGE
app-space      default-backend-7f8f4c484-zw8kb           1/1     Running     0          103s
app-space      webapp-video-d54b764b6-d5rnd              1/1     Running     0          104s
app-space      webapp-wear-5b84c4f565-djh5m               1/1     Running     0          101s
ingress-nginx  ingress-nginx-admission-create-wbssr      0/1     Completed   0          101s
ingress-nginx  ingress-nginx-admission-patch-2pmxg       0/1     Completed   0          101s
kube-system    corends-648979b5d-mwkh8                    1/1     Running     0          11m
kube-system    etcd-controlplane                          1/1     Running     0          12m
kube-system    kube-apiserver-controlplane                1/1     Running     0          12m
kube-system    kube-controller-manager-controlplane       1/1     Running     0          12m
kube-system    kube-flannel-ds-xtsxv                      1/1     Running     0          11m
kube-system    kube-proxy-m26kb                           1/1     Running     0          11m
kube-system    kube-scheduler-controlplane                1/1     Running     0          12m
root@controlplane ~ ➜
```

From the output, you can see pods running in several namespaces (such as _app-space_, _ingress-nginx_, and _kube-system_). The Ingress Controller is specifically deployed in the **ingress-nginx** namespace.

---

## Ingress Controller Details

To verify the Ingress Controller deployment, execute the command below:

```
root@controlplane ~ ⟩ k get pods -A
NAMESPACE         NAME                                                READY   STATUS    RESTARTS   AGE
app-space         default-backend-7f8f4c484-zw8kb                    1/1     Running   0          103s
app-space         webapp-video-d54b764b6-d5rn5                        1/1     Running   0          104s
app-space         webapp-wear-5b44cf565-5hjmj                         1/1     Running   0          101s
ingress-nginx     ingress-nginx-admission-create-wbssr                0/1     Completed 0          101s
ingress-nginx     ingress-nginx-admission-patch-2pmxg                 0/1     Completed 0          101s
ingress-nginx     ingress-nginx-controller-546d8cf744-4hz72            1/1     Running   0          101s
kube-system       coredns-64897985d-mwkh8                            1/1     Running   0          11m
kube-system       etcd-controlplane                                   1/1     Running   0          12m
kube-system       kube-apiserver-controlplane                          1/1     Running   0          12m
kube-system       kube-controller-manager-controlplane                 1/1     Running   0          12m
kube-system       kube-flannel-ds-xtsxv                               1/1     Running   0          11m
kube-system       kube-proxy-m26kb                                    1/1     Running   0          11m
kube-system       kube-scheduler-controlplane                          1/1     Running   0          12m
root@controlplane ~ ⟩
```

Notice that the Ingress Controller resource is named `ingress-nginx-controller` and operates within the **ingress-nginx** namespace.

---

## Application and Ingress Resource

Applications are deployed within the **app-space** namespace. In our scenario, three application pods are running:

- A default backend
- A web application for video streaming
- A web application for wear services

To view the Ingress resource, run:

```
k get ingress -A
```

The output will display an Ingress resource from the **app-space** namespace:

```
NAMESPACE   NAME                   CLASS    HOSTS   ADDRESS       PORTS   AGE
app-space   ingress-wear-watch    <none>   *       10.96.152.118 80      3m1s
```

To gather more details, describe the Ingress resource:

```
k describe ingress ingress-wear-watch -n app-space
```

The description reveals:

- Two paths:  
  • `/wear` routes to `wear-service` on port 8080.  
  • `/watch` routes to `video-service` on port 8080.
- A default backend (`default-http-backend`) is configured to handle unmatched requests.
- The host is set to `*`, meaning the rules apply across all hosts.

A request made to the Ingress without a matching path results in a 404 error as the default backend is invoked. For example:

- Accessing `.../wear` opens the wear application.
- Accessing `.../watch` (which will later be changed to `.../stream`) serves the video streaming application.

---

## Updating the Ingress Resource

### Redirecting Video Streaming to "/stream"

To expose the video streaming application under the new URL path `/stream`:

1.  Edit the Ingress resource for the **app-space** namespace.
2.  Change the path from `/watch` to `/stream`.

Below is the updated Ingress YAML specification:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-watch
  namespace: app-space
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
    - http:
        paths:
          - path: /wear
            pathType: Prefix
            backend:
              service:
                name: wear-service
                port:
                  number: 8080
          - path: /stream
            pathType: Prefix
            backend:
              service:
                name: video-service
                port:
                  number: 8080
status:
  loadBalancer:
    ingress:
      - ip: 10.96.152.118
```

After applying these modifications:

- Navigating to `/watch` now results in a 404 error.
- Accessing `/stream` correctly displays the video streaming application.

> [!important]
> **Testing Changes**
>
> After updating the Ingress resource, always verify the configuration using:
>
> - `k get ingress -A`
> - `k describe ingress ingress-wear-watch -n app-space` This ensures the new path registrations are active.

---

## Adding a Path for the Food Delivery Application

The business has expanded by incorporating a food delivery service, now deployed in the **app-space** namespace. First, verify the deployments:

```
k get deploy -n app-space
```

Example output:

```
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
default-backend     1/1     1            1           7m53s
webapp-food         1/1     1            1           20s
webapp-video        1/1     1            1           7m54s
webapp-wear         1/1     1            1           7m54s
```

Then, check the services:

```
k get svc -n app-space
```

Example output:

```
NAME                    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
default-http-backend    ClusterIP   10.102.190.18  <none>        80/TCP     8m22s
food-service            ClusterIP   10.108.9.190   <none>        8080/TCP   49s
video-service           ClusterIP   10.107.118.120 <none>        8080/TCP   8m22s
wear-service            ClusterIP   10.110.195.79  <none>        8080/TCP   8m23s
```

To expose the food delivery application, update the Ingress in the **app-space** namespace by adding an `/eat` path. For example:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-watch
  namespace: app-space
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
    - http:
        paths:
          - path: /wear
            pathType: Prefix
            backend:
              service:
                name: wear-service
                port:
                  number: 8080
          - path: /stream
            pathType: Prefix
            backend:
              service:
                name: video-service
                port:
                  number: 8080
          - path: /eat
            pathType: Prefix
            backend:
              service:
                name: food-service
                port:
                  number: 8080
status:
  loadBalancer:
    ingress:
      - ip: 10.96.152.118
```

Once applied:

- Accessing `.../eat` displays the food delivery application.
- All paths will be correctly routed to their respective services.

---

## Integrating a New Payment Service in a Separate Namespace

A new critical payment service is deployed in its own namespace, **critical-space**. To verify the payment pods, run:

```
k get pods -A
```

A sample output should include:

```
NAMESPACE          NAME                                           READY   STATUS      RESTARTS   AGE
app-space          webapp-food-...                                1/1     Running     0          ...
critical-space     webapp-pay-67888454d4b-wl8ks                     1/1     Running     0          13s
```

Now, check the payment deployment:

```
k get deploy -n critical-space
```

Example output:

```
NAME          READY   UP-TO-DATE   AVAILABLE   AGE
webapp-pay    1/1     1            1           22s
```

Then, inspect the payment service details:

```
k get svc -n critical-space
```

Example output:

```
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
pay-service     ClusterIP   10.107.31.180   <none>        8282/TCP   119s
```

Following best practices, each namespace should manage its own Ingress. Create a new Ingress resource in **critical-space** to expose the payment service at the `/pay` path. Use the imperative command:

```
kubectl create ingress ingress-pay -n critical-space --rule="/pay=pay-service:8282"
```

Verify the new Ingress:

```
k get ingress -n critical-space
```

Expected output:

```
NAME         CLASS   HOSTS   ADDRESS   PORTS   AGE
ingress-pay  <none>  *       <none>    80      10s
```

Describing the Ingress provides further details:

```
k describe ingress ingress-pay -n critical-space
```

Output shows:

- The rule routes `/pay` to `pay-service` on port 8282.
- A default backend is present.

> [!important]
> **Path Rewrite Consideration**
>
> By default, the Ingress does not modify the URL path. If the payment application expects requests at `/` rather than `/pay`, add a rewrite annotation.

To add the path rewrite, update the payment Ingress with the following YAML:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-pay
  namespace: critical-space
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - http:
        paths:
          - path: /pay
            pathType: Exact
            backend:
              service:
                name: pay-service
                port:
                  number: 8282
status:
  loadBalancer:
    ingress:
      - ip: 10.96.152.118
```

After applying this change, requests to `/pay` will be rewritten to `/` before reaching the payment service, ensuring proper application functionality.

---

## Conclusion

This lab demonstrated how to configure and update an Ingress Controller across multiple namespaces and applications. We:

- Examined the cluster environment.
- Verified and detailed the Ingress Controller deployment.
- Updated the Ingress resource to change a URL path.
- Added a new path for a food delivery application.
- Created a separate Ingress for a critical payment service with proper path rewrite.

Each modification was verified by inspecting the Ingress resources and testing the endpoints to ensure a smooth transition.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/67d31e9e-2070-461b-bc9b-cec61146d644)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/2b70023b-27c4-494d-96a0-be396ba45a23)**
>
> Practice lab
