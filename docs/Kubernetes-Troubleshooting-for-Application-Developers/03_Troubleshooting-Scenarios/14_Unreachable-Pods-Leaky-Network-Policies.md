# Unreachable Pods Leaky Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Unreachable-Pods-Leaky-Network-Policies)

---

## Table of Contents

- Unreachable Pods Leaky Network Policies
  - Testing Connectivity in the QA Namespace
  - Investigating and Refining QA Namespace Policies
  - Controlling API-to-Frontend Traffic
  - Troubleshooting the Staging Namespace
  - Recap
  - Watch Video
  - Practice Lab

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Unreachable Pods Leaky Network Policies

In this article, we troubleshoot network policy issues across two Kubernetes namespaces—"qa-test" and "staging". Both namespaces deploy the same applications with identical network policies. In our expected design, the frontend application should only communicate with the API, and the API should solely interact with the database. No other connections (for example, from the frontend directly to the database or API to frontend) should be allowed.

![The image shows two flow diagrams labeled "qa-test" and "staging," each depicting a sequence of components: DB, API, and Frontend, with arrows indicating data flow. The "qa-test" diagram includes additional red arrows.](https://kodekloud.com/kk-media/image/upload/v1752880444/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Unreachable-Pods-Leaky-Network-Policies/qa-test-staging-flow-diagrams.jpg)

However, the observed behavior deviates from this design. Unintended connections occur—such as the frontend directly connecting to the database—while some legitimate connections (like those between pods in the staging namespace) are failing. Let’s dive in and troubleshoot these discrepancies.

---

## Testing Connectivity in the QA Namespace

Start by verifying that permitted connections in the "qa-test" namespace work correctly. First, list all services across namespaces:

```
root@controlplane ~ ➜ k get svc -A
NAMESPACE     NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                     AGE
default       kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP                     47m
kube-system   hubble-peer     ClusterIP   10.104.101.115   <none>        443/TCP                     4m10s
kube-system   kube-dns        ClusterIP   10.96.0.10       <none>        53/UDP,53/TCP,9153/TCP       47m
qa-test       api-test        ClusterIP   10.100.100.29    <none>        80/TCP                     4m9s
qa-test       db-svc          ClusterIP   10.98.176.91     <none>        3306/TCP                   4m9s
staging       frontend-svc    <none>      10.101.158.44    <none>        80/TCP                     4m9s
staging       api-svc         <none>      10.107.96.36     <none>        80/TCP                     4m9s
staging       db-svc          <none>      10.99.57.125     <none>        3306/TCP                   4m9s
staging       frontend-svc    <none>      10.100.102.222   <none>        80/TCP                     4m9s
```

Then, inspect the network policies across the namespaces:

```
root@controlplane ~ ➜ k get networkpolicies.networking.k8s.io -A
NAMESPACE   NAME                POD-SELECTOR   AGE
qa-test     db-np                              4m13s
qa-test     frontend-api-np      app=api       4m13s
staging     db-np              app=db         4m13s
staging     frontend-api-np      app=api       4m13s
staging     test-np                            4m13s
```

Next, access the frontend pod in the QA namespace to verify connectivity to the API:

```
root@controlplane ~ ➜ k exec -n qa-test frontend-866dd56986-62mv2 -it -- sh
/opt/webapp-contest # curl -I api-svc
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 3249
Server: Werkzeug/0.14.1 Python/3.6.8
Date: Sat, 27 Jul 2020 04:26:47 GMT
/opt/webapp-contest #
```

Now, test an unintended connection attempt by using telnet from the same pod to reach the database:

```
root@controlplane ~ ➜ k exec -n qa-test frontend-866dd56986-62mv2 -it -- sh
/opt/webapp-contest # telnet db-svc 3306
I
Nj.1  @=<6'8k?U@caching_sha2_password
^C
Console escape. Commands are:
  1 go to line mode
  2 go to character mode
  z suspend telnet
  x exit telnet
/opt/webapp-contest #
```

The gibberish output indicates that a connection to the MySQL server has been established, which should not be allowed from the frontend.

---

## Investigating and Refining QA Namespace Policies

Examine the network policies in the "qa-test" namespace:

```
root@controlplane ~ ➜ k get networkpolicies.networking.k8s.io -n qa-test
NAME                POD-SELECTOR   AGE
db-np               app=db         10m
frontend-api-np     app=api        10m
```

Review the YAML configuration of the database network policy:

```
root@controlplane ~ ➜ k get netpol -n qa-test db-np -o yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-np
  namespace: qa-test
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"name":"db-np","namespace":"qa-test"},"spec":{"podSelector":{"matchLabels":{"app":"db"}},"ingress":[{"from":[{"namespaceSelector":{"matchLabels":{"env":"qa"}}},{"podSelector":{"matchLabels":{"app":"api"}}}]}],"policyTypes":["Ingress"]}}
  creationTimestamp: "2024-07-27T00:16:57Z"
  generation: 2
  resourceVersion: "5525"
  uid: eb5921a0-34b4-4584-b615-b5b64bf9f303
spec:
  podSelector:
    matchLabels:
      app: db
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          env: qa
    - podSelector:
        matchLabels:
          app: api
  policyTypes:
  - Ingress
```

!!! note "Important" In this configuration, the policy allows ingress to pods labeled "app=db" from pods that either reside in any namespace with the label "env: qa" OR have the label "app=api". As a consequence, even the frontend pod in "qa-test" meets the namespace condition and can access the database.

To restrict access solely to API pods within the QA namespace, combine the conditions (logical AND) into a single ingress rule. After making this change, verify that a telnet attempt to the database times out.

---

## Controlling API-to-Frontend Traffic

The "frontend-api-np" network policy is designed to permit only frontend pods to connect to API pods. Below is its YAML configuration:

```
root@controlplane ~ ➜ k get -n qa-test networkpolicies.networking.k8s.io frontend-api-np -o yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-api-np
  namespace: qa-test
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"name":"frontend-api-np","namespace":"qa-test"},"spec":{"podSelector":{"matchLabels":{"app":"api"}},"ingress":[{"from":[{"podSelector":{"matchLabels":{"app":"frontend"}}}]}],"policyTypes":["Ingress"]}}
  creationTimestamp: "2024-07-27T00:16:55Z"
  generation: 1
  resourceVersion: "4370"
  uid: f99ebb78-4cbc-4ad8-94ff-7770c3d84506
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
  policyTypes:
  - Ingress
```

Note that no network policy restricts ingress to the frontend pods. By default, traffic is allowed if no explicit policy is defined. However, for enhanced security, it is best practice to implement a default-deny policy for ingress traffic. Use the following configuration:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

Apply the policy with:

```
root@controlplane ~ ➜ k apply -f default-deny.yaml -n qa-test
networkpolicy.networking.k8s.io/default-deny-ingress created
```

After applying, test connectivity from the API pod to the frontend service to ensure that the connection is blocked as expected.

---

## Troubleshooting the Staging Namespace

In the staging namespace, both frontend and API pods are unable to connect as required. Additionally, pods from the QA namespace are mistakenly able to access the staging database if they use the unqualified service name (e.g., "db-svc" resolves within the QA namespace). To avoid this, the fully qualified domain name (FQDN) must be used.

First, list the network policies in the staging namespace:

```
root@controlplane ~ ➜ k get networkpolicies.networking.k8s.io -n staging
NAME               POD-SELECTOR   AGE
db-np             app=db         32m
frontend-api-np   app=api        32m
test-np           <none>         32m
```

Inspect the "test-np" policy, which applies both ingress and egress restrictions:

```
root@controlplane ~ ➜ k get networkpolicies.networking.k8s.io -n staging test-np -o yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-np
  namespace: staging
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"name":"test-np","namespace":"staging"},"spec":{"podSelector":{},"policyTypes":["Ingress","Egress"]}}
  creationTimestamp: "2024-07-27T06:16:55Z"
  resourceVersion: "5527"
  uid: 8f5de73a-fc58-4389-89a5-65cdeaef91ff
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

Because the empty pod selector matches all pods and no explicit egress rules are defined, all outbound traffic is denied. For example, attempting to ping google.com from an API pod fails. To resolve this, remove the Egress restriction from the "test-np" policy so that only default-deny for ingress remains. Edit the policy with:

```
root@controlplane ~ ➜ k edit networkpolicies.networking.k8s.io -n staging test-np
```

After editing, verify connectivity from an API pod:

```
root@controlplane ~ ➜ k exec -n staging api-5565fbd6b8-xh8kz -it -- sh
/opt/webapp-contest # ping google.com
64 bytes from 74.125.201.139: seq=0 ttl=111 time=1.916 ms
...
```

Now, test cross-namespace access. From the QA namespace, accessing the staging database using just the service name ("db-svc") resolves within QA. Instead, use the fully qualified domain name:

```
k exec -n qa-test frontend-866dd56986-62mv2 -it -- sh
/opt/webapp-contest # telnet db-svc.staging.svc.cluster.local 3306
```

This connection should be blocked if the network policies are correctly enforced.

Next, examine the staging "db-np" policy, which currently permits ingress to pods labeled "app=db" from any namespace:

```
root@controlplane ~ ➜ k get networkpolicies.networking.k8s.io -n staging db-np -o yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-np
  namespace: staging
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"networking.k8s.io/v1","kind":"NetworkPolicy","metadata":{"name":"db-np","namespace":"staging"},"spec":{"podSelector":{"matchLabels":{"app":"db"}},"ingress":[{"from":[{"namespaceSelector":{},"podSelector":{"matchLabels":{"app":"api"}}}]}],"policyTypes":["Ingress"]}}
  creationTimestamp: "2024-07-27T00:16:55Z"
  generation: 2
  resourceVersion: "5526"
  uid: cd2889d-b0fc-4037-ba59-f64f092772a2
spec:
  podSelector:
    matchLabels:
      app: db
  ingress:
  - from:
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          app: api
  policyTypes:
  - Ingress
```

The empty namespace selector matches all namespaces, allowing API pods from any namespace. To restrict access exclusively to pods within the staging namespace, update the policy by adding a match label (for example, "env: staging") to the namespace selector:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-np
  namespace: staging
spec:
  podSelector:
    matchLabels:
      app: db
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          env: staging
      podSelector:
        matchLabels:
          app: api
  policyTypes:
  - Ingress
```

After applying this updated policy, confirm that a pod in the QA namespace cannot access the staging database through its FQDN, as intended.

---

## Recap

Key takeaways from this troubleshooting exercise include:

| Topic                         | Explanation                                                                                                                                                     | Example Configuration                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| AND vs OR in Network Policies | Using a single ingress rule with combined selectors applies an AND condition. Separating the selectors into multiple rules applies an OR condition.             | Combined rule: See YAML snippet under "Investigating and Refining QA Namespace Policies" |
| Network Policies are Additive | Specific allow rules can override default-deny policies. When creating a default deny for ingress or egress, ensure the desired allow rules are still in place. | Default-deny policy YAML snippet above                                                   |
| Default Behavior              | Without explicit deny rules, Kubernetes allows traffic by default. Enforcing explicit default-deny policies helps secure your network traffic.                  | Example default-deny policy                                                              |

!!! note "Reminder" Always test your network policies after applying changes by simulating both allowed and disallowed traffic. This ensures that the intended security boundaries are effectively enforced.

![The image is a recap of network policies, highlighting three points: "AND vs OR," "NetworkPolicies are additive," and "Be mindful of default behaviors."](https://kodekloud.com/kk-media/image/upload/v1752880445/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Unreachable-Pods-Leaky-Network-Policies/network-policies-recap-and-or.jpg)

This article walked you through troubleshooting and refining network policies to ensure that only authorized connections occur between your Kubernetes namespaces. For further reading, explore [Kubernetes Documentation](https://kubernetes.io/docs/), which provides additional insights on concepts such as network policies and best practices in securing your clusters.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/0d7bf96c-d49c-452c-9816-8bd1c4c49207)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/3d4c9842-ef89-4e4f-bebd-d19bde3b0ef9)**
>
> Practice lab
