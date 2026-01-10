# Endlessly Terminating Pods - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Endlessly-Terminating-Pods)

---

## Table of Contents

- Endlessly Terminating Pods
  - Example: Pod Stuck in Termination
  - Using the --force Flag
  - Removing Finalizers
  - Handling Stuck Namespaces
  - Verifying Resource Deletion
  - Final Thoughts
  - Watch Video

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Endlessly Terminating Pods

When managing Kubernetes clusters, you may need to delete resources such as pods, deployments, or namespaces. In many cases, you can remove a pod using a simple command:

```
kubectl delete pod NAME
```

For example:

```
controlplane ~ ➜ k delete pod NAME
```

This command typically works as expected. However, sometimes a resource may not terminate correctly. In this article, we will explore the reasons behind such issues and provide methods to resolve them.

## Example: Pod Stuck in Termination

Consider a pod named `shipping-api-57cdd984bc-grq7g`. Deleting it might initially return:

```
controlplane ~ ➜ k delete pod shipping-api-57cdd984bc-grq7g
pod "shipping-api-57cdd984bc-grq7g" deleted
```

Yet, when you inspect the pod list:

```
controlplane ~ ⚠ k get pods
NAME                                READY   STATUS      RESTARTS   AGE
api                                 1/1     Terminating 0          19m
shipping-api-57cdd984bc-grq7g      1/1     Terminating 0          19m
```

Some pods remain in the **Terminating** state. This behavior is often due to background operations or cleanup tasks (similar to garbage collection) that must complete before the resource is fully removed.

## Using the --force Flag

One approach to handle this issue is to force delete the resource using the `--force` flag. Note that force deletion does not wait for confirmation that the underlying resource has been terminated:

```
controlplane ~ ➜ k delete pod shipping-api-57cdd984bc-grq7g --force
Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
pod "shipping-api-57cdd984bc-grq7g" force deleted
```

After executing the forced deletion, if you check for remaining pods, there is a possibility that the resource may still be present or continue running if the underlying dependencies have not been cleaned up.

> [!important]
> **Warning**
>
> Using the `--force` flag can lead to unintended side effects. Use this option sparingly and only when necessary.

## Removing Finalizers

Another effective method involves removing finalizers manually. Finalizers ensure that specific cleanup tasks—such as persistent volume or namespace protection actions—are completed before the resource is deleted.

When editing a pod stuck in termination, you might notice a finalizer in its configuration. For example:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"finalizers":["example.com/block-deletion"],"name":"api","namespace":"default"},"spec":{"containers":[{"image":"httpd","name":"pod-with-finalizer"}]}}
  creationTimestamp: "2024-07-07T22:01:14Z"
  deletionGracePeriodSeconds: 30
  deletionTimestamp: "2024-07-07T22:05:05Z"
  finalizers:
    - example.com/block-deletion
  name: api
  namespace: default
  resourceVersion: "2265"
  uid: 2a4a592c-7bd2-4a17-a123-1337c8fc1bff
spec:
  containers:
    - image: httpd
      imagePullPolicy: Always
      name: pod-with-finalizer
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
          name: kube-api-access-4bxj
          readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: node01
```

To allow the pod to be fully deleted, remove or set the finalizers to `null` and save the changes. This method is not just limited to pods; it can also be applied to other Kubernetes resources such as PersistentVolumeClaims (PVCs) and namespaces.

## Handling Stuck Namespaces

Sometimes, the issue isn’t limited to pods. Entire namespaces may get stuck in the terminating state. For example, you might have a namespace called `stable` that does not delete as expected.

You could try force deletion:

```
controlplane ~ ➜ k delete ns stable --force
Warning: Immediate deletion does not wait for confirmation that the running resource has been terminated. The resource may continue to run on the cluster indefinitely.
namespace "stable" force deleted
```

If the namespace remains stuck, remove the finalizers from its manifest. An edited namespace manifest might appear as follows:

```
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Namespace","metadata":{"annotations":{},"finalizers":["example.com/finalizer"],"name":"stable"}}
  deletionGracePeriodSeconds: 0
  deletionTimestamp: "2024-07-07T22:04:35Z"
  labels:
    kubernetes.io/metadata.name: stable
  name: stable
  resourceVersion: "3669"
  uid: 40848036-5014-47eb-9c75-25c4847f8b03
spec: {}
status:
  conditions:
    - lastTransitionTime: "2024-07-07T22:04:40Z"
      message: All resources successfully discovered
      reason: ResourcesDiscovered
      status: "False"
      type: NamespaceDeletionDiscoveryFailure
    - lastTransitionTime: "2024-07-07T22:04:40Z"
      message: All legacy kube types successfully parsed
      reason: ParsedGroupVersions
      status: "False"
      type: NamespaceDeletionGroupVersionParsingFailure
    - lastTransitionTime: "2024-07-07T22:04:40Z"
      message: All content successfully deleted, may be waiting on finalization
      reason: ContentDeleted
```

After removing (or nullifying) the finalizers and saving your changes, re-check the namespaces. The `stable` namespace should be successfully deleted once Kubernetes completes the finalization step.

## Verifying Resource Deletion

After using either forced deletion or manually removing finalizers, it is important to verify that the resource is no longer present. For example, check the status of pods with:

```
controlplane ~ ➜ k get pods
```

Similarly, verify namespace deletion:

```
controlplane ~ ➜ k get ns
```

> [!important]
> **Note**
>
> Always investigate further if resources remain stuck in the terminating state. Relying solely on forced deletion or removal of finalizers can mask underlying issues that require a deeper investigation.

## Final Thoughts

Managing resources in Kubernetes can sometimes lead to challenges such as lingering terminating pods or namespaces. By understanding the role of finalizers and the implications of force deletion, you can better troubleshoot and resolve these issues.

For more information on Kubernetes resource management, consider exploring the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/d579e5e5-da72-4ab9-baba-9a56918ad4ef)**
>
> Watch video content
