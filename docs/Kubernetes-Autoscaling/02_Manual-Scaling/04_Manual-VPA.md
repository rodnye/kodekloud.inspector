# Manual VPA - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Manual-Scaling/Manual-VPA)

---

## Table of Contents

- Manual VPA
  - Prerequisites
  - 1. Deploy the Flask Application
  - 2. Observe Pod Initialization
  - 3. Monitor the Pod Resize
  - 4. How Vertical Pod Autoscaler Works
  - References
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Autoscaling

Manual Scaling

# Manual VPA

In this guide, you’ll learn how to use the Vertical Pod Autoscaler (VPA) to adjust CPU and memory for a simple Flask application running on Kubernetes. We’ll deploy a single-replica Deployment, observe pod initialization, and manually trigger a resource resize to see VPA in action.

## Prerequisites

- A Kubernetes cluster (v1.16+)
- [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler) installed
- `kubectl` configured against your cluster

## 1\. Deploy the Flask Application

Apply the Deployment and Service manifests:

```
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

Expected output:

```
deployment.apps/flask-web-app configured
service/flask-web-app-service unchanged
```

| Resource   | Purpose                        | Manifest         |
| ---------- | ------------------------------ | ---------------- |
| Deployment | Runs the Flask web application | `deployment.yml` |
| Service    | Exposes the Flask application  | `service.yml`    |

## 2\. Observe Pod Initialization

Immediately list the pods to see the initialization phase:

```
kubectl get pods
```

Example output:

```
NAME                                  READY   STATUS     RESTARTS   AGE
flask-web-app-5d9dbb9d44-spjmk        0/1     Init:0/1   0          4s
```

The new pod will appear in `Init:0/1` while it pulls the image and runs init containers.

## 3\. Monitor the Pod Resize

After a moment, check the pods again:

```
kubectl get pods
```

Example output:

```
NAME                                  READY   STATUS        RESTARTS   AGE
flask-web-app-5d9dbb9d44-spjmk        1/1     Running       0          65s
flask-web-app-78689f449c-kq8xs        1/1     Terminating   0          3m13s
```

Here, VPA has created a new pod with updated (larger) resource requests and is terminating the old one.

> [!important]
> **Note**
>
> Manual updates to resource requests take effect immediately, but in production VPA performs these adjustments automatically based on real-time metrics.

## 4\. How Vertical Pod Autoscaler Works

The Vertical Pod Autoscaler continuously monitors pod metrics and updates their `requests` and `limits` to match actual usage. In this exercise, updating the Deployment triggered a scale-up. In a production environment, VPA would automate these changes without manual intervention.

> [!important]
> **Warning**
>
> Manual resizing can cause brief downtime as pods restart. Always test resource changes in a staging environment before applying to production.

## References

- [Vertical Pod Autoscaler Overview](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#vertical-pod-autoscaling)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Flask Official Documentation](https://flask.palletsprojects.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/ea9c96ec-aedc-4153-9033-4cd302458f7c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/66710f67-c094-4a4c-b718-4a031d1ddebe/lesson/9a0afaa7-9937-49ec-aa31-6f2a03b6fab0)**
>
> Practice lab
