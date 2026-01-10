# Service Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Service-Account)

---

## Table of Contents

- Service Account
  - Example: Kubernetes Dashboard Application
  - Creating a Service Account
  - Automatic Token Mounting in Pods
  - Using a Custom Service Account in Pods
  - Changes in Kubernetes Versions 1.22 and 1.24
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Service Account

Welcome to this lesson on Kubernetes service accounts. In this article, we explore how service accounts serve as the backbone for authenticating and authorizing machine-to-cluster interactions. While closely related to authentication, authorization, and role-based access control topics, this guide specifically focuses on creating and managing service accounts as part of our Kubernetes curriculum.

There are two primary account types in Kubernetes:

- **User Accounts:** For human users such as administrators and developers.
- **Service Accounts:** For machine users, such as monitoring tools (e.g., Prometheus) or CI/CD systems like [Jenkins](https://learn.kodekloud.com/user/courses/jenkins).

## Example: Kubernetes Dashboard Application

Consider a simple dashboard application, “my Kubernetes dashboard,” built in Python. When deployed, it queries the Kubernetes API to retrieve the list of Pods and displays them on a web page. For secure communication with the Kubernetes API, the application uses a service account to authenticate.

![The image shows a Kubernetes dashboard interface connected to a Kubernetes cluster with three nodes via the kube-api.](https://kodekloud.com/kk-media/image/upload/v1752871148/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Service-Account/frame_110.jpg)

## Creating a Service Account

To create a service account for your application, run the following command. In this example, we create a service account named `dashboard-sa`:

```
kubectl create serviceaccount dashboard-sa
```

After creation, list all service accounts with:

```
kubectl get serviceaccount
```

The output might look similar to:

```
NAME          SECRETS   AGE
default       1         218d
dashboard-sa  1         4d
```

Inspect the newly created service account along with its token by executing:

```
kubectl describe serviceaccount dashboard-sa
```

This command will show details including the associated token (stored as a secret), such as:

```
Name:                dashboard-sa
Namespace:           default
Labels:              <none>
Annotations:         <none>
Image pull secrets:  <none>
Mountable secrets:   dashboard-sa-token-kbbdm
Tokens:              dashboard-sa-token-kbbdm
Events:              <none>
```

The token is stored in a Secret object. To view the token, describe the corresponding secret:

```
kubectl describe secret dashboard-sa-token-kbbdm
```

Use the token as a bearer authentication token when accessing the Kubernetes API. For example:

```
curl https://192.168.56.70:6443/api --insecure --header "Authorization: Bearer eyJhbgG…"
```

## Automatic Token Mounting in Pods

When a third-party application is deployed on a Kubernetes cluster, the service account token is automatically mounted as a volume inside the Pod. This allows your application to read the token from a well-known location rather than providing it manually.

![The image shows a Kubernetes dashboard interface with icons representing security and data, illustrating a secure connection to a pod.](https://kodekloud.com/kk-media/image/upload/v1752871149/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Service-Account/frame_270.jpg)

By default, each namespace in Kubernetes includes a service account named `default`. When a Pod is created without specifying a service account, Kubernetes mounts the default service account’s token into the Pod. Consider the following minimal Pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: my-kubernetes-dashboard
spec:
  containers:
    - name: my-kubernetes-dashboard
      image: my-kubernetes-dashboard
```

To inspect the Pod, run:

```
kubectl describe pod my-kubernetes-dashboard
```

A typical output displays that a secret (e.g., `default-token-j4hkv`) is mounted at `/var/run/secrets/kubernetes.io/serviceaccount`:

```
Name:         my-kubernetes-dashboard
Namespace:    default
Status:       Running
IP:           10.244.0.15
Containers:
  my-kubernetes-dashboard:
    Image:      my-kubernetes-dashboard
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from default-token-j4hkv (ro)
Volumes:
  default-token-j4hkv:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-j4hkv
    Optional:    false
```

Inside the Pod, you can list the mounted secret files:

```
kubectl exec -it my-kubernetes-dashboard -- ls /var/run/secrets/kubernetes.io/serviceaccount
```

And to view the token:

```
kubectl exec -it my-kubernetes-dashboard -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
```

The file named `token` contains the bearer token used for accessing the Kubernetes API. Keep in mind that the default service account has limited permissions geared towards basic API queries.

## Using a Custom Service Account in Pods

To use a service account other than the default (for example, `dashboard-sa`), update your Pod definition by specifying the `serviceAccountName` field:

```
apiVersion: v1
kind: Pod
metadata:
  name: my-kubernetes-dashboard
spec:
  containers:
    - name: my-kubernetes-dashboard
      image: my-kubernetes-dashboard
  serviceAccountName: dashboard-sa
```

After recreating the Pod (since you cannot change the service account for an existing Pod), inspect it with:

```
kubectl describe pod my-kubernetes-dashboard
```

You should notice that the volume now mounts the token belonging to `dashboard-sa`:

```
Mounts:
  /var/run/secrets/kubernetes.io/serviceaccount from dashboard-sa-token-kbbdm (ro)
```

If you prefer to disable the automatic mounting of the service account token, set the `automountServiceAccountToken` field to `false`:

```
apiVersion: v1
kind: Pod
metadata:
  name: my-kubernetes-dashboard
spec:
  automountServiceAccountToken: false
  containers:
    - name: my-kubernetes-dashboard
      image: my-kubernetes-dashboard
```

## Changes in Kubernetes Versions 1.22 and 1.24

Starting with Kubernetes 1.22, enhancements were made to how service account tokens are handled. Previously, creating a service account automatically produced a Secret with a non-expiring token. Now, tokens are generated via the token request API and mounted as projected volumes with a defined lifetime.

The following is an example Pod manifest that reflects the new token provisioning method:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  namespace: default
spec:
  containers:
    - image: nginx
      name: nginx
      volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-6mtg8
          readOnly: true
  volumes:
    - name: kube-api-access-6mtg8
      projected:
        defaultMode: 420
        sources:
          - serviceAccountToken:
              expirationSeconds: 3607
              path: token
          - configMap:
              name: kube-root-ca.crt
              items:
                - key: ca.crt
                  path: ca.crt
          - downwardAPI:
              items:
                - fieldRef:
                    apiVersion: v1
                    fieldPath: metadata.namespace
```

In this configuration, the token is automatically requested with a specified validity (e.g., 3607 seconds) and is mounted through a projected volume rather than a pre-created secret.

With Kubernetes version 1.24, further improvements (as detailed in Kubernetes Enhancement Proposal 2799) have minimized the use of secret-based service account tokens. Now, when a service account is created, a token is not automatically generated. Instead, explicitly generate a token using this command if needed:

```
kubectl create token dashboard-sa
```

This command produces a token that is both audience-bound and time-limited. You can adjust the expiration using additional options. If you prefer the legacy behavior of creating non-expiring tokens stored in Secrets (though this method is less secure), manually create a Secret object with the proper annotation:

```
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: mysecretname
  annotations:
    kubernetes.io/service-account.name: dashboard-sa
```

Ensure that the service account (`dashboard-sa`) already exists before creating this Secret.

> [!important]
> **Tip**
>
> Decoding the token using tools like `jq` or services such as [jwt.io](https://jwt.io) can help verify token details. Note that earlier tokens did not have an expiry date, but the new token request API provides tokens with a bounded lifetime for enhanced security.

![The image discusses Kubernetes v1.22's KEP 1205, highlighting security and scalability issues with JWTs in service account tokens.](https://kodekloud.com/kk-media/image/upload/v1752871151/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Service-Account/frame_580.jpg)

![The image is a slide about Kubernetes v1.22, focusing on KEP 1205 for Bound Service Account Tokens, featuring TokenRequestAPI with audience and time-bound features.](https://kodekloud.com/kk-media/image/upload/v1752871152/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Service-Account/frame_620.jpg)

## Summary

In this lesson, you learned how to:

- Create a service account and retrieve its token (either stored as a Secret or generated via the token request API).
- Automatically mount the service account token into Pods for in-cluster applications.
- Customize Pod definitions to use a specific service account or disable automatic token mounting.
- Understand the improvements in Kubernetes versions 1.22 and 1.24 regarding bound, time-limited tokens using the token request API.

For further reading, refer to the official Kubernetes documentation and relevant enhancement proposals.

![The image lists references related to Kubernetes service account tokens, including links to GitHub and Kubernetes documentation.](https://kodekloud.com/kk-media/image/upload/v1752871153/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Service-Account/frame_870.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/3cac267b-8c3c-4fe5-bfc7-572667d63596)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/82dfcb70-c85a-4e96-843c-2c9a46c5abfb)**
>
> Practice lab
