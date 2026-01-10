# Solution Ingress Networking 2 optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Ingress-Networking-2-optional)

---

## Table of Contents

- Solution Ingress Networking 2 optional
  - 1. Verify the Existing Deployment
  - 2. Setup: Ingress Namespace and Required Resources
  - 3. Deploy the NGINX Ingress Controller
  - 4. Expose the Ingress Controller via a Service
  - 5. Create the Ingress Resource to Route Traffic
  - 6. Troubleshooting: Resolving Excessive Redirects
  - 7. Validate the Complete Setup
  - Watch Video
    - a. Create the Ingress Namespace
    - b. Create a ConfigMap
    - c. Create a Service Account
    - d. Set Up Roles and RoleBindings

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Ingress Networking 2 optional

In this guide, we dive deeper into Ingress networking by deploying an Ingress controller and configuring traffic routing for your applications. We currently have two applications running in the "app-space" namespace: a video application and a wear application. Follow the steps below for a comprehensive setup and troubleshooting.

---

## 1\. Verify the Existing Deployment

Before proceeding, ensure all your pods are running across all namespaces. Execute the command:

```
root@controlplane:~# kubectl get pod -A
NAMESPACE     NAME                                      READY   STATUS    RESTARTS   AGE
app-space     default-backend-5cf9fb9d-jqcp2              1/1     Running   0          50s
app-space     webapp-video-486f855bd8-qpn5                 1/1     Running   0          49s
app-space     webapp-wear-6ff4945955-mmtqh                 1/1     Running   0          20m
kube-system   coredns-74ff55c5b-gffzq                      1/1     Running   0          20m
kube-system   etcd-controlplane                           1/1     Running   0          20m
kube-system   kube-apiserver-controlplane                 1/1     Running   0          20m
kube-system   kube-controller-manager-controlplane        1/1     Running   0          20m
kube-system   kube-flannel-ds-ks7d7                       1/1     Running   0          20m
kube-system   kube-proxy-49z9b                            1/1     Running   0          20m
kube-system   kube-scheduler-controlplane                 1/1     Running   0          20m
root@controlplane:~#
```

---

## 2\. Setup: Ingress Namespace and Required Resources

### a. Create the Ingress Namespace

Create a dedicated namespace for the Ingress controller:

```
root@controlplane:~# kubectl create namespace ingress-space
namespace/ingress-space created
```

### b. Create a ConfigMap

The NGINX Ingress Controller requires a specific ConfigMap. Create it using the command below (replace the literal configuration with your actual settings if needed):

```
root@controlplane:~# kubectl create configmap nginx-configuration -n ingress-space --from-literal=key=value
```

### c. Create a Service Account

Deploy a service account named `ingress-serviceaccount` in the `ingress-space` namespace:

```
root@controlplane:~# kubectl create serviceaccount ingress-serviceaccount -n ingress-space
```

### d. Set Up Roles and RoleBindings

Assign the required roles to ensure proper permissions for the Ingress controller. Verify the roles:

```
root@controlplane:~# kubectl get roles -n ingress-space
NAME             CREATED AT
ingress-role     2022-04-19T21:05:42Z
```

Inspect the role bindings:

```
root@controlplane:~# kubectl get rolebindings -n ingress-space
NAME                    ROLE                  AGE
ingress-role-binding    Role/ingress-role     20s
```

For detailed role information, use:

```
root@controlplane:~# kubectl describe role ingress-role -n ingress-space
Name:         ingress-role
Labels:
  app.kubernetes.io/name=ingress-nginx
  app.kubernetes.io/part-of=ingress-nginx
Annotations: <none>
PolicyRule:
  Resources: [configmaps, endpoints, namespaces, pods, secrets]
  Resource Names: (specific names if applicable, e.g., ingress-controller-leader-nginx)
  Verbs: [get, create, update]
```

---

## 3\. Deploy the NGINX Ingress Controller

Deploy the Ingress controller by creating a deployment in the `ingress-space` namespace. Use the YAML configuration below (ensure proper spacing and namespace specifications):

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingress-controller
  namespace: ingress-space
spec:
  replicas: 1
  selector:
    matchLabels:
      name: nginx-ingress
  template:
    metadata:
      labels:
        name: nginx-ingress
    spec:
      serviceAccountName: ingress-serviceaccount
      containers:
      - name: nginx-ingress-controller
        image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
        args:
          - /nginx-ingress-controller
          - --configmap=$(POD_NAMESPACE)/nginx-configuration
          - --default-backend-service=$(POD_NAMESPACE)/default-http-backend
        env:
          - name: POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: POD_NAMESPACE
            valueFrom:
              fieldRef:
                fieldPath: metadata.namespace
        ports:
          - name: http
            containerPort: 80
          - name: https
            containerPort: 443
```

Apply the deployment configuration:

```
root@controlplane:~# kubectl create -f ingress-controller.yaml
deployment.apps/ingress-controller created
```

Monitor the Ingress controller pods:

```
root@controlplane:~# kubectl get pods -n ingress-space --watch
NAME                                    READY   STATUS              RESTARTS   AGE
ingress-controller-5857685bf-qd8jz      0/1     ContainerCreating   0          16s
...
ingress-controller-5857685bf-qd8jz      1/1     Running             0          32s
```

---

## 4\. Expose the Ingress Controller via a Service

To make the Ingress controller accessible externally, expose it using a NodePort.

1.  Expose the deployment:

    ```
    root@controlplane:~# kubectl expose deploy ingress-controller -n ingress-space --name ingress --port=80 --target-port=80 --type NodePort
    service/ingress exposed
    ```

2.  Verify the service details:

    ```
    root@controlplane:~# kubectl get svc -n ingress-space
    NAME      TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
    ingress   NodePort   10.109.33.190   <none>        80:32741/TCP      9s
    ```

If you prefer a different NodePort (e.g., 30080 instead of the default allocation), edit the service:

```
root@controlplane:~# kubectl edit svc ingress -n ingress-space
```

Change the `nodePort` field under the port configuration to `30080` and save.

---

## 5\. Create the Ingress Resource to Route Traffic

Now configure routing rules to forward traffic from specified paths to your applications located in the `app-space` namespace. In this example:

- Requests to `/wear` route to the `wear-service` on port 8080.
- Requests to `/watch` route to the `video-service` on port 8080.

Create the Ingress resource with the following command:

```
root@controlplane:~# kubectl create ingress ingress-wear-watch -n app-space --rule="/wear=wear-service:8080" --rule="/watch=video-service:8080"
```

Verify the Ingress resource:

```
root@controlplane:~# kubectl get ingress -n app-space
NAME                 CLASS    HOSTS   ADDRESS   PORTS   AGE
ingress-wear-watch   <none>   *       <none>    80      3m24s
```

---

## 6\. Troubleshooting: Resolving Excessive Redirects

If you experience continuous HTTP 308 redirects when accessing the `/watch` path, inspect the Ingress controller logs:

```
root@controlplane:~# kubectl logs ingress-controller-5857685bf-qd8jz -n ingress-space
```

You might find lines similar to:

```
121.6.144.181 - [19/Apr/2022:21:15:38 +0000] "GET /watch HTTP/1.1" 308 171 "-" "Mozilla/5.0 ..." 3179 0.000 [app-space-video-service-8080]
```

These redirects are usually due to SSL redirection being enabled by default.

::: note "Note" To disable SSL redirection, update your Ingress resource with the following annotation: :::

Update your Ingress manifest to include the annotation:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-wear-watch
  namespace: app-space
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
    - http:
        paths:
          - path: /wear
            pathType: Exact
            backend:
              service:
                name: wear-service
                port:
                  number: 8080
          - path: /watch
            pathType: Exact
            backend:
              service:
                name: video-service
                port:
                  number: 8080
```

Apply the changes by editing the Ingress resource:

```
root@controlplane:~# kubectl edit ingress ingress-wear-watch -n app-space
```

After saving, retest your endpoints to confirm that the redirect issue is resolved.

---

## 7\. Validate the Complete Setup

Ensure that the Ingress routes traffic correctly to your services:

1.  Validate that the backend pods are running in the `app-space` namespace:

    ```
    root@controlplane:~# kubectl get pods -n app-space
    NAME                                 READY   STATUS    RESTARTS   AGE
    default-backend-5cf9b7d-jqcp2         1/1     Running   0          12m
    webapp-video-84f865bd-qpbn5           1/1     Running   0          12m
    webapp-wear-6ff944955-mmtqh           1/1     Running   0          12m
    ```

2.  Check the logs of the video and wear applications to ensure new requests are reaching them:

    ```
    root@controlplane:~# kubectl logs webapp-video-84f865bd-qpbn5 -n app-space
    ```

    ```
    root@controlplane:~# kubectl logs webapp-wear-6ff944955-mmtqh -n app-space
    ```

This confirms that your applications are functioning correctly on port 8080.

::: note "Additional Information" The terminal outputs and log details provided above help verify correct operation. The supplementary image below offers an additional illustration but is not required for successfully following these instructions. :::

![The image shows a terminal with logs and a task panel instructing to create an ingress resource for paths "/wear" and "/watch" in the "app-space" namespace.](https://kodekloud.com/kk-media/image/upload/v1752869876/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Ingress-Networking-2-optional/frame_750.jpg)

---

Congratulations! You have successfully deployed an Ingress controller, exposed it via a NodePort service, configured the Ingress resource to route traffic to two distinct services, and resolved an SSL redirection issue.

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/3a0d8c31-5f4e-4503-9009-f183b34dfa66)**
>
> Watch video content
