# Solution Validating and Mutating Admission Controllers 2025 Updates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Scheduling/Solution-Validating-and-Mutating-Admission-Controllers-2025-Updates)

---

## Table of Contents

- Solution Validating and Mutating Admission Controllers 2025 Updates
  - Determining the Correct Controller Actions
  - Creating the Namespace
  - Creating the TLS Secret
  - Deploying the Webhook Deployment
  - Deploying the Webhook Service
  - Deploying the Mutating Webhook Configuration
  - Testing the Default Pod Security Context
  - Deploying a Pod with an Explicit Security Context
  - Deploying a Pod with a Conflicting Security Context
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Scheduling

# Solution Validating and Mutating Admission Controllers 2025 Updates

In this lesson, we will explore the lab on validating and mutating admission controllers. You will learn how these controllers work together, create a namespace and TLS secret, deploy the webhook server with corresponding configurations, and test pod security contexts.

## Determining the Correct Controller Actions

The first step in this lab is to understand which admission controller action is mutating and which one is validating. Consider the following:

- The "namespace auto-provision" admission controller is mutating because it automatically creates and modifies a namespace's configuration.
- The "namespace exists" admission controller is validating as it solely checks for the existence of a namespace.

Thus, the correct pairing is:

- Mutating: Namespace auto-provision
- Validating: Namespace exists

Remember, the admission controller invocation sequence always applies mutations first and then validations.

## Creating the Namespace

Next, create a namespace called `webhook-demo` by running:

```
root@controlplane ~ ➜ kubectl create ns webhook-demo
```

Verify the creation of the namespace with:

```
root@controlplane ~ ➜ kubectl get ns
NAME              STATUS   AGE
default           Active   37m
kube-node-lease   Active   37m
kube-public       Active   37m
kube-system       Active   37m
webhook-demo      Active   3s
```

## Creating the TLS Secret

For secure webhook communication, you need to create a TLS secret named `webhook-server-tls` in the `webhook-demo` namespace. This secret uses a certificate and key from specific file paths:

```
root@controlplane ~ ➜ kubectl -n webhook-demo create secret tls webhook-server-tls \
  --cert "/root/keys/webhook-server-tls.crt" \
  --key "/root/keys/webhook-server-tls.key"
```

You should see the confirmation:

```
secret/webhook-server-tls created
```

## Deploying the Webhook Deployment

Deploy the webhook server next using the provided deployment definition in `webhook-deployment.yaml`. First, you can inspect the file with:

```
cat webhook-deployment.yaml
```

Then, apply the configuration:

```
root@controlplane ~ ➜ kubectl apply -f webhook-deployment.yaml
```

The expected output should be similar to:

```
deployment.apps/webhook-server created
```

## Deploying the Webhook Service

A service definition for the webhook server is provided in the `webhook-service.yaml` file. Deploy it by running:

```
root@controlplane ~ ➜ kubectl apply -f webhook-service.yaml
```

This command creates the service necessary for the webhook server to operate.

## Deploying the Mutating Webhook Configuration

Next, configure the mutating webhook with the settings provided in `webhook-configuration.yaml`. This file defines a webhook that intercepts pod creation events. For instance, it uses the following rule to match create operations for pods:

```
webhooks:
- name: webhook-server.webhook-demo.svc
  clientConfig:
    service:
      name: webhook-server
      namespace: webhook-demo
      path: "/mutate"
    caBundle: L0s0tLS0tcj1jSURqekNDQ1Z0F3SUJBZ0lTmt1QW5SxkbkhmU3o1SctFU3g5Z1lDQ2Nnd0RRNUp1b1pJaHzjkFRRUWkQ1FBDx6XRNRQ3NHQTFVRUF3d2tRV1JvYh0emF0XYUJR2Ym5SeWlY...
  rules:
    - operations: [ "CREATE" ]
      apiGroups: [ "" ]
      apiVersions: [ "v1" ]
      resources: [ "pods" ]
```

Apply this configuration using:

```
root@controlplane ~ ➜ kubectl apply -f webhook-configuration.yaml
```

You might receive a deprecation warning:

> [!important]
> **Warning**
>
> Warning: admissionregistration.k8s.io/v1beta1 MutatingWebhookConfiguration is deprecated in v1.16+ and will be unavailable in v1.22+. Please use admissionregistration.k8s.io/v1 MutatingWebhookConfiguration.

The webhook is designed to reject any pod request that attempts to run as root without a proper security context. If no `runAsNonRoot` value is specified, the webhook mutates the pod by setting `runAsNonRoot` to true and defaults the user ID to 1234. However, if the security context explicitly sets `runAsNonRoot` to false, the webhook will not override it.

## Testing the Default Pod Security Context

First, test the webhook by deploying a pod without a security context. The file `pod-with-defaults.yaml` contains a pod definition that, by default, would run as root. However, the webhook mutates it:

```
# A pod with no securityContext specified.
# Without the webhook, it would run as user root (0). The webhook mutates it.
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-defaults
  labels:
    app: pod-with-defaults
spec:
  restartPolicy: OnFailure
  containers:
    - name: busybox
      image: busybox
      command: ["sh", "-c", "echo I am running as user $(id -u)"]
```

Apply the configuration:

```
root@controlplane ~ ➜ kubectl apply -f pod-with-defaults.yaml
```

After deployment, inspect the pod configuration (or use `kubectl describe pod pod-with-defaults`) to confirm that the security context has been mutated — `runAsNonRoot` should be true and `runAsUser` should be set to 1234.

## Deploying a Pod with an Explicit Security Context

Now, deploy a pod that explicitly permits running as root. The file `pod-with-override.yaml` contains the configuration that sets `runAsNonRoot` to false, preventing the webhook from applying its defaults:

```
# A pod with a securityContext explicitly allowing it to run as root.
# The effect of deploying this with and without the webhook is the same.
# The explicit setting prevents the webhook from applying more secure defaults.
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-override
  labels:
    app: pod-with-override
spec:
  restartPolicy: OnFailure
  securityContext:
    runAsNonRoot: false
  containers:
    - name: busybox
      image: busybox
      command: ["sh", "-c", "echo I am running as user $(id -u)"]
```

Deploy the pod with:

```
root@controlplane ~ ➜ kubectl apply -f pod-with-override.yaml
```

For further reference, you can view the content of `pod-with-conflict.yaml` with:

```
cat pod-with-conflict.yaml
```

## Deploying a Pod with a Conflicting Security Context

The final test involves deploying a pod with a conflicting security context. In this scenario, the pod configuration requires the container to run as a non-root user by setting `runAsNonRoot` to true while explicitly requesting a user ID of 0 (root). Without the webhook, this could lead to a `CreateContainerConfigError`. With the webhook enabled, the pod creation is rejected:

```
# A pod with a conflicting securityContext setting:
# It has to run as a non-root user, but we explicitly request a user id of 0 (root).
# Without the webhook, the pod could be created but would fail to launch due to an unenforceable
# security context, leading to a 'CreateContainerConfigError' status.
# With the webhook, the creation of this pod is outright rejected.
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-conflict
  labels:
    app: pod-with-conflict
spec:
  restartPolicy: OnFailure
  securityContext:
    runAsNonRoot: true
    runAsUser: 0
  containers:
    - name: busybox
      image: busybox
      command: ["sh", "-c", "echo I am running as user $(id -u)"]
```

Attempt to deploy the conflicting pod:

```
root@controlplane ~ ➜ kubectl apply -f pod-with-conflict.yaml
```

The expected error message should be similar to:

```
Error from server: error when creating "pod-with-conflict.yaml": admission webhook "webhook-server.webhook-demo.svc" denied the request: runAsNonRoot specified, but runAsUser set to 0 (the root user)
```

This confirms that the webhook correctly rejected the pod due to the conflicting security settings.

## Conclusion

In this lab, you learned how to:

- Distinguish between mutating and validating admission controllers.
- Create a namespace and configure TLS for secure webhook communication.
- Deploy a webhook server along with its service and webhook configurations.
- Test the webhook behavior by deploying pods with default, overridden, and conflicting security contexts.

By following these steps, you ensure that your Kubernetes resources adhere to the required security policies enforced by admission controllers.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/cd124bdf-9911-4cc1-8177-f2d8b6dfd2a0/lesson/4e981330-0036-4e90-b32d-379759ea3910)**
>
> Watch video content
