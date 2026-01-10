# Solution Ingress Networking 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Solution-Ingress-Networking-2)

---

## Table of Contents

- Solution Ingress Networking 2
  - Step 1: Create the Ingress Namespace
  - Step 2: Deploy the Ingress Controller
  - Step 3: Expose the Ingress Controller
  - Step 4: Create the Ingress Resource
  - Step 5: Debugging and Resolving Redirect Issues
  - Final Verification
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Solution Ingress Networking 2

In this lesson, we explore Kubernetes Ingress Networking by deploying an Ingress Controller and configuring it to route traffic to two applications located in different namespaces. We will deploy a "video" app and a "wear" app within the app-space namespace while managing the Ingress Controller in its own namespace.

![The image shows a terminal interface with a task description about exploring two deployed applications in different namespaces.](https://kodekloud.com/kk-media/image/upload/v1752871310/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Solution-Ingress-Networking-2/frame_0.jpg)

---

## Step 1: Create the Ingress Namespace

Begin by creating a dedicated namespace for the Ingress Controller. Open your terminal and list all pods across all namespaces to confirm your setup:

```
root@controlplane:~# k get pod -A
NAMESPACE     NAME                                        READY   STATUS              RESTARTS   AGE
app-space     default-backend-5cf9fb9d-jqcp2               1/1     Running             0          50s
app-space     webapp-video-84f8655bd8-qpb5n                1/1     Running             0          50s
app-space     webapp-wear-6f19449555-mmtqh                 1/1     Running             0          49s
kube-system   coredns-74ff55c5b-4zg8j                      1/1     Running             0          20m
kube-system   coredns-74ff55c5b-gffzq                      1/1     Running             0          20m
kube-system   etcd-controlplane                            1/1     Running             0          20m
kube-system   kube-apiserver-controlplane                  1/1     Running             0          20m
kube-system   kube-controller-manager-controlplane         1/1     Running             0          20m
kube-system   kube-flannel-ds-ks7d7                        1/1     Running             0          20m
kube-system   kube-proxy-4929b                             1/1     Running             0          20m
kube-system   kube-scheduler-controlplane                  1/1     Running             0          20m
root@controlplane:~# k create namespace ingress-space
namespace/ingress-space created
root@controlplane:~#
```

Next, within the `ingress-space` namespace, create a ConfigMap (which may contain Nginx configuration data) and a Service Account. The related Roles and RoleBindings for the service account `ingress-serviceaccount` are pre-configured. Verify the roles and role bindings with:

```
root@controlplane:~# k get roles -n ingress-space
NAME           CREATED AT
ingress-role   2022-04-19T21:05:42Z


root@controlplane:~# k get rolebindings -n ingress-space
NAME                  ROLE              AGE
ingress-role-binding  Role/ingress-role  20s


root@controlplane:~# k describe role ingress-role -n ingress-space
Name:         ingress-role
Labels:       app.kubernetes.io/name=ingress-nginx
              app.kubernetes.io/part-of=ingress-nginx
Annotations:  <none>
PolicyRule:
  Resources                 Non-Resource URLs  Resource Names                         Verbs
  ---------                 ------------------  --------------                         -----
  configmaps                []                []
  configmaps                []                [ingress-controller-leader-nginx]
  endpoints                 []                []
  namespaces                []                []
  pods                      []                []
  secrets                   []                []
```

---

## Step 2: Deploy the Ingress Controller

Deploy the Ingress Controller using the following manifest. This YAML configuration ensures that the controller runs within the `ingress-space` namespace and uses the pre-created service account. Note the proper indentation, namespace specification, and container arguments:

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
            - --default-backend-service=app-space/default-http-backend
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

Deploy the Ingress Controller by running:

```
root@controlplane:~# k create -f ingress-controller.yaml
deployment.apps/ingress-controller created
```

Monitor the pod status (optionally using `--watch`), and wait for the pod to transition from ContainerCreating to Running:

```
root@controlplane:~# k get pods -n ingress-space
NAME                                  READY   STATUS              RESTARTS   AGE
ingress-controller-5857685bf-qd8jz      0/1     ContainerCreating   0          10s
```

> [!important]
> **Note**
>
> After a short wait, the status should update to Running. This confirms that the Ingress Controller has been successfully deployed.

---

## Step 3: Expose the Ingress Controller

To allow external access to your Ingress Controller, expose it using a Service of type NodePort. Execute the following command to expose the deployment:

```
root@controlplane:~# k expose deploy ingress-controller -n ingress-space --name ingress --port=80 --target-port=80 --type NodePort
service/ingress exposed
```

Verify the details of the newly created service:

```
root@controlplane:~# k get svc -n ingress-space
NAME      TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
ingress   NodePort   10.109.33.190  <none>        80:32741/TCP     9s
```

If you prefer a specific NodePort (for example, port 30080), edit the service accordingly:

```
root@controlplane:~# k edit svc ingress -n ingress-space
```

Change the `nodePort` value to 30080 and save the changes.

---

## Step 4: Create the Ingress Resource

Now, create an Ingress resource to route traffic to the applications deployed in the `app-space` namespace. The Ingress rules will direct:

- Requests to `/wear` to the `wear-service` on port 8080.
- Requests to `/watch` to the `video-service` on port 8080.

Run the following command to create the Ingress:

```
root@controlplane:~# k create ingress ingress-wear-watch -n app-space --rule="/wear=wear-service:8080" --rule="/watch=video-service:8080"
ingress.networking.k8s.io/ingress-wear-watch created
```

Verify the Ingress resource with:

```
root@controlplane:~# k get ingress -n app-space
NAME                CLASS   HOSTS   ADDRESS   PORTS   AGE
ingress-wear-watch  <none>  *       <none>    80      8s
```

---

## Step 5: Debugging and Resolving Redirect Issues

If you observe that requests to the `/watch` path are not reaching the intended video service, and the logs remain inactive, review the Ingress Controller logs. You might see repeated HTTP 308 redirects indicating SSL redirection is enforced:

```
121.6.144.181 - - [19/Apr/2022:21:15:38 +0000] "GET /watch HTTP/1.1" 308 171 "-" "Mozilla/5.0 ..." ... [app-space-video-service-8080] ...
```

To resolve this, disable SSL redirection for this Ingress resource by adding the appropriate annotations. Edit the Ingress manifest to include:

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
status:
  loadBalancer:
    ingress: []
```

Apply the changes by editing the existing Ingress:

```
root@controlplane:~# k edit ingress ingress-wear-watch -n app-space
```

> [!important]
> **Note**
>
> After saving these changes, the SSL redirect issue should be resolved, ensuring proper routing of traffic to both applications.

---

## Final Verification

Perform a final check of the service and Ingress statuses to confirm that everything is functioning as expected:

```
root@controlplane:~# k get svc -n app-space
NAME                  TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
default-http-backend  ClusterIP   10.109.67.66    <none>        80/TCP    10m
video-service         ClusterIP   10.99.96.249    <none>        8080/TCP  10m
wear-service          ClusterIP   10.105.104.69   <none>        8080/TCP  10m


root@controlplane:~# k get ingress -n app-space
NAME                CLASS   HOSTS   ADDRESS   PORTS   AGE
ingress-wear-watch  <none>  *       80      3m24s
```

This confirms that the Ingress Controller is properly deployed, exposed, and routing traffic correctly with SSL redirection disabled.

---

That concludes the lab on Kubernetes Ingress Networking. For further reading on Ingress configurations and best practices, consider exploring the following resources:

- [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [NGINX Ingress Controller GitHub Repository](https://github.com/nginxinc/kubernetes-ingress)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/7bcbd7d2-503a-4ded-9d40-01b88e6ed80e)**
>
> Watch video content
