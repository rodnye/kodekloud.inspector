# Solution Network Policies optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Solution-Network-Policies-optional)

---

## Table of Contents

- Solution Network Policies optional
  - Step 1: Inspecting the Pods
  - Step 2: Checking the Associated Services
  - Step 3: Identifying Network Policies
  - Step 4: Reviewing the Payroll Network Policy
  - Step 5: Connectivity Tests
  - Step 6: Creating a New Network Policy for Internal Pod Egress
  - Additional Resources
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Solution Network Policies optional

In this lesson, we review a practical test on network policies within a Kubernetes environment. The lab deploys several web applications, services, and network policies. Your objective is to inspect the environment and answer questions related to the applied network policies.

![The image shows a computer interface with a terminal and a task asking about network policies in a deployed environment, featuring a diagram of pods.](https://kodekloud.com/kk-media/image/upload/v1752869963/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Network-Policies-optional/frame_10.jpg)

## Step 1: Inspecting the Pods

First, verify the running applications by listing the pods. In this environment, four pods are running: external, internal, mysql (the database), and payroll. Execute the following command:

```
root@controlplane:~# kubectl get pods
NAME      READY   STATUS    RESTARTS   AGE
external  1/1     Running   0          2m20s
internal  1/1     Running   0          2m19s
mysql     1/1     Running   0          2m19s
payroll   1/1     Running   0          2m19s
```

## Step 2: Checking the Associated Services

Next, inspect the services that expose these pods on different ports. Note that:

- The payroll service is exposed on port 8080.
- Both the external and internal services also use port 8080.
- The MySQL (DB) service is available on port 3306.

Run this command to list the services:

```
root@controlplane:~# kubectl get service
NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)           AGE
db-service          ClusterIP   10.109.89.42    <none>        3306/TCP          2m42s
external-service    NodePort    10.108.170.44   <none>        8080:30000/TCP    2m42s
internal-service    NodePort    10.98.11.243    <none>        8080:30082/TCP    2m42s
kubernetes          ClusterIP   10.96.0.1       <none>        443/TCP           39m
payroll-service     NodePort    10.110.165.31   <none>        8080:30083/TCP    2m42s
```

## Step 3: Identifying Network Policies

The next step is to check the applied network policies. Initially, running:

```
root@controlplane:~# kubectl get networkpolicies
error: the server doesn't have a resource type "networkpolicies"
```

Then, using the shorthand command:

```
root@controlplane:~# kubectl get netpol
NAME            POD-SELECTOR    AGE
payroll-policy  name=payroll    3m31s
```

The output shows a single network policy, **payroll-policy**, which applies to the pod labeled `name=payroll`.

> [!important]
> **Policy Details**
>
> The payroll network policy allows ingress TCP traffic on port 8080 to the payroll pod, but only from pods with the `name=internal` label. Outbound traffic (egress) is not restricted.

## Step 4: Reviewing the Payroll Network Policy

Inspect the details of the network policy with the following command:

```
root@controlplane:~# kubectl describe netpol payroll-policy
Name:         payroll-policy
Namespace:    default
Created on:   2022-04-18 20:35:54 +0000 UTC
Labels:       <none>
Annotations:  <none>
Spec:
  PodSelector:      name=payroll
  Allowing ingress traffic:
    To Port:      8080/TCP
    From:
      PodSelector:  name=internal
  Not affecting egress traffic
  Policy Types:   Ingress
```

This confirms that only traffic from pods labeled `name=internal` is permitted to access the payroll pod on TCP port 8080.

## Step 5: Connectivity Tests

Connectivity tests via the provided application interfaces validate that:

- The internal-facing application successfully accesses the payroll service on port 8080.
- The external-facing application times out when attempting to access the same service.

![The image shows a red interface for an "External Facing Application" connectivity test, with fields for "Host Name" and "Host Port," and a "TEST" button.](https://kodekloud.com/kk-media/image/upload/v1752869963/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Solution-Network-Policies-optional/frame_430.jpg)

This behavior verifies that the network policy is correctly enforcing restricted access based on the pod labels.

## Step 6: Creating a New Network Policy for Internal Pod Egress

The next task is to create a network policy that further restricts the internal pod's egress traffic. The goal is to allow the internal pod only to access:

- The payroll pod on port 8080.
- The MySQL (DB) pod on port 3306.

Create a file named `internal-policy.yaml` with the following content:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: internal-policy
  namespace: default
spec:
  # This policy applies to the internal pod.
  podSelector:
    matchLabels:
      name: internal
  policyTypes:
  - Ingress
  - Egress
  # Ingress traffic remains unrestricted.
  egress:
  # Allow egress traffic to the payroll pod on TCP port 8080.
  - to:
      podSelector:
        matchLabels:
          name: payroll
    ports:
    - protocol: TCP
      port: 8080
  # Allow egress traffic to the MySQL (DB) pod on TCP port 3306.
  - to:
      podSelector:
        matchLabels:
          name: mysql
    ports:
    - protocol: TCP
      port: 3306
```

Apply this network policy with the following command:

```
root@controlplane:~# kubectl create -f internal-policy.yaml
networkpolicy.networking.k8s.io/internal-policy created
```

Verify the applied policy:

```
root@controlplane:~# kubectl describe netpol internal-policy
Name:          internal-policy
Namespace:     default
Created on:    2022-04-18 20:53:13 +0000 UTC
Labels:        <none>
Annotations:   <none>
Spec:
  PodSelector:    name=internal
  Not affecting ingress traffic
  Allowing egress traffic:
    To:
      PodSelector:  name=payroll
      To Port:      8080/TCP
    To:
      PodSelector:  name=mysql
      To Port:      3306/TCP
  Policy Types:   Egress
```

> [!important]
> **Final Outcome**
>
> The internal policy ensures that the internal pod can only send egress traffic to the payroll pod on port 8080 and the MySQL pod on port 3306, effectively blocking any other outbound connections.

This configuration confirms that the network policies enforce the intended connectivity restrictions, completing the lab exercise.

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Networking Concepts in Kubernetes](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/bc63e8eb-dddc-4b87-a4ef-b04ac9532504)**
>
> Watch video content
