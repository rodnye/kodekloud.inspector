# KEDA Scaling With Redis List - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Kubernetes-Event-Driven-Autoscaling-KEDA/KEDA-Scaling-With-Redis-List)

---

## Table of Contents

- KEDA Scaling With Redis List
  - Why Redis List Scaling?
  - Architecture and Flow
  - 1. Create the Redis Password Secret
  - 2. Define TriggerAuthentication
  - 3. Configure the ScaledObject
  - References
  - Watch Video
  - Practice Lab
    - KEDA Resources Overview

---

## Content

Kubernetes Autoscaling

Kubernetes Event Driven Autoscaling KEDA

# KEDA Scaling With Redis List

In this guide, you’ll learn how to automatically scale a Kubernetes worker service by monitoring a Redis list backlog with [KEDA](https://keda.sh/). This approach is perfect for scenarios like an online store during a flash sale, where incoming orders outpace your processing capacity.

![The image illustrates an e-commerce scenario during a big sale or holiday season, showing a laptop with multiple shopping cart icons and a connection to a worker service.](https://kodekloud.com/kk-media/image/upload/v1752880222/notes-assets/images/Kubernetes-Autoscaling-KEDA-Scaling-With-Redis-List/ecommerce-sale-laptop-shopping-carts.jpg)

## Why Redis List Scaling?

Traditional CPU- or memory-based scaling won’t address a growing Redis queue. By using KEDA’s Redis List scaler, you can dynamically adjust pod replicas based on the number of pending items:

- Scale out when the backlog grows.
- Scale in when work completes.
- Avoid overprovisioning during low traffic.

## Architecture and Flow

Below is a high-level diagram showing how Redis, KEDA, and your worker deployment interact:

![The image is a diagram showing a flow from Redis to KEDA, with two intermediary icons representing data and users.](https://kodekloud.com/kk-media/image/upload/v1752880223/notes-assets/images/Kubernetes-Autoscaling-KEDA-Scaling-With-Redis-List/redis-keda-flow-diagram.jpg)

KEDA monitors the length of the Redis list and drives the Horizontal Pod Autoscaler (HPA) for your target deployment.

![The image illustrates "KEDA Scaling With 'redis' List" and features three components: Secret, TriggerAuthentication, and ScaledObject, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752880224/notes-assets/images/Kubernetes-Autoscaling-KEDA-Scaling-With-Redis-List/keda-scaling-redis-list-diagram.jpg)

### KEDA Resources Overview

| Resource              | Purpose                                             | Documentation                                                                   |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| Secret                | Stores the Redis password (Base64-encoded)          | [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) |
| TriggerAuthentication | References the secret to authenticate KEDA to Redis | [KEDA Auth Concepts](https://keda.sh/docs/2.0/concepts/authentication/)         |
| ScaledObject          | Defines how to scale your worker based on the list  | [KEDA ScaledObject](https://keda.sh/docs/2.0/concepts/scaling-deployments/)     |

## 1\. Create the Redis Password Secret

Encode your Redis password in Base64 and store it in a Kubernetes Secret:

```
apiVersion: v1
kind: Secret
metadata:
  name: auth-redis-secret
type: Opaque
data:
  redis_password: amhibm9pdWhramo=
```

> [!important]
> **Note**
>
> Ensure you encode the plaintext password with `base64`.
> For example: `echo -n 'yourRedisPassword' | base64`

## 2\. Define TriggerAuthentication

Create a `TriggerAuthentication` so that KEDA can retrieve the password from the secret:

```
apiVersion: keda.sh/v1alpha1
kind: TriggerAuthentication
metadata:
  name: keda-trigger-auth-redis-secret
spec:
  secretTargetRef:
    - parameter: password
      name: auth-redis-secret
      key: redis_password
```

## 3\. Configure the ScaledObject

Finally, define the `ScaledObject` to tie everything together:

```
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: redis-scaledobject
spec:
  scaleTargetRef:
    name: nginx
  minReplicaCount: 1
  triggers:
    - type: redis
      metadata:
        address: redis.default.svc.cluster.local:6379
        listName: myList
        listLength: "10"
      authenticationRef:
        name: keda-trigger-auth-redis-secret
  advanced:
    horizontalPodAutoscalerConfig:
      behavior:
        scaleDown:
          stabilizationWindowSeconds: 20
          policies:
            - type: Percent
              value: 50
              periodSeconds: 20
        scaleUp:
          stabilizationWindowSeconds: 0
          policies:
            - type: Percent
              value: 100
              periodSeconds: 15
```

> [!important]
> **Warning**
>
> Review your HPA policies carefully. Aggressive scaling (100% every 15 s) can lead to resource spikes. Adjust thresholds to match your cluster capacity.

With this setup, KEDA will watch the `myList` backlog in Redis and automatically scale the `nginx` worker pods—scaling out under heavy load and scaling in as the queue drains.

## References

- [KEDA Documentation](https://keda.sh/docs/)
- [Redis List Scaler](https://keda.sh/docs/2.0/scalers/redis-list/)
- [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/)
- [TriggerAuthentication (KEDA)](https://keda.sh/docs/2.0/concepts/authentication/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/98ed3d60-da87-4a6c-8707-4cafeaa438bc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/c218f836-7d7e-425b-a8b7-0148914eb040/lesson/0d8d4bf3-7106-4fbe-ad85-e38e8d7a8902)**
>
> Practice lab
