# Network Policy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Network-Policy)

---

## Table of Contents

- Network Policy
  - Understanding Traffic Flow
  - Network Security in Kubernetes
  - Conclusion
  - Watch Video
    - Traffic Details for Each Component
    - Applying Network Policies

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Network Policy

Welcome to this article on network policies. In this guide, you'll learn the fundamentals of network traffic management and security within a Kubernetes environment. We start by reviewing basic networking and security concepts before diving into a real-world example.

## Understanding Traffic Flow

Let's begin with a simple example that illustrates the traffic flow between a web application and its associated database server. In this scenario, we have the following components:

- A **web server** that delivers the frontend to users.
- An **API server** that handles backend processing.
- A **database server** that stores application data.

The typical flow of traffic is:

1.  A user sends a request to the web server on port 80.
2.  The web server forwards the request to the API server on port 5000.
3.  The API server queries the database server on port 3306 and then returns the response back to the user.

This example highlights two types of traffic:

- **Ingress**: Incoming traffic (e.g., user requests to the web server).
- **Egress**: Outgoing traffic (e.g., web server calling the API server).

> [!important]
> **Understanding Traffic Definitions**
>
> Note that when defining ingress and egress traffic, we focus solely on the direction in which the traffic originates. The response traffic (typically represented by dotted lines in diagrams) is not considered in these definitions.

![The image illustrates a network flow diagram showing ingress and egress processes involving a user, web, API, and database with specific ports.](https://kodekloud.com/kk-media/image/upload/v1752871380/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Network-Policy/frame_80.jpg)

### Traffic Details for Each Component

- **API Server**:
  - Receives ingress traffic from the web server on port 5000.
  - Sends out egress traffic to the database server on port 3306.

- **Database Server**:
  - Only receives ingress traffic on port 3306 from the API server.

Based on this setup, the necessary rules are:

1.  Ingress rule on the web server to accept HTTP traffic on port 80.
2.  Egress rule on the web server to allow traffic to the API server on port 5000.
3.  Ingress rule on the API server to accept traffic on port 5000.
4.  Egress rule on the API server to allow traffic to the database server on port 3306.
5.  Ingress rule on the database server to accept traffic on port 3306.

![The image illustrates IT traffic flow with ingress and egress ports, showing connections to web, API, and database services using ports 80, 5000, and 3306.](https://kodekloud.com/kk-media/image/upload/v1752871381/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Network-Policy/frame_120.jpg)

## Network Security in Kubernetes

In a Kubernetes cluster, nodes host a set of pods and services, each assigned an IP address. One of the key prerequisites for Kubernetes networking is that pods can communicate with one another without needing additional configuration such as custom routes. Typically, all pods reside on a shared virtual private network spanning across multiple nodes, and by default, a Kubernetes cluster allows unrestricted communication between pods through their IP addresses, pod names, or associated services. This is due to a default “allow all” rule that permits traffic between any pods or services within the cluster.

![The image illustrates a network security concept labeled "All Allow," showing interconnected nodes with various IP addresses within a cloud-like structure.](https://kodekloud.com/kk-media/image/upload/v1752871382/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Network-Policy/frame_210.jpg)

### Applying Network Policies

In our example, each component—the web server, the API server, and the database server—is deployed as a separate pod with its own service to manage both intra-cluster and external communications. Under default settings, these pods can communicate freely. However, consider a scenario where security requirements dictate that the frontend web server should not directly access the database server. In this case, you can implement a network policy to restrict such traffic so that the database server only accepts traffic from the API server.

A network policy in Kubernetes is an object that defines how pods communicate with each other. By adding labels and selectors to pods, similar to associating pods with services or replica sets, you create targeted rules. For example, you might label the database pod and define a policy permitting only ingress traffic on port 3306 coming from the API pod.

![The image illustrates a network traffic flow diagram with a user accessing a Web Pod on port 80, which connects to an API Pod on port 5000 and a DB Pod on port 3306.](https://kodekloud.com/kk-media/image/upload/v1752871383/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Network-Policy/frame_250.jpg)

Below is an example of a network policy definition that restricts access to the database pod:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          name: api-pod
    ports:
    - protocol: TCP
      port: 3306
```

In this YAML example:

- The policy applies to pods labeled with `role: db`.
- Only ingress traffic is restricted, as specified by the `policyTypes` field. (Egress traffic from the pod is not limited.)
- The ingress rule allows traffic exclusively from pods labeled with `name: api-pod` on TCP port 3306.

Remember that for ingress or egress isolation to take effect, they must be explicitly defined under `policyTypes`. Without this specification, the pod's corresponding traffic is not isolated.

To apply this policy, run the following command:

```
kubectl create -f db-policy.yaml
```

> [!important]
> **Network Policy Enforcement**
>
> Keep in mind that network policies are enforced only by network solutions that support them. Network solutions such as Kube-router, Calico, Romana, and Weave Net support network policies, whereas Flannel does not. If you are using a solution that doesn’t support policies, you may still create them without any error, but they won’t be enforced.

![The image lists network solutions: Kube-router, Calico, Romana, and Weave-net support network policies, while Flannel does not.](https://kodekloud.com/kk-media/image/upload/v1752871385/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Network-Policy/frame_450.jpg)

## Conclusion

This article has outlined the basics of network policies, detailing how to manage ingress and egress traffic both in a general network environment and within a Kubernetes cluster. By employing network policies, you can enhance your cluster's security by ensuring that only authorized traffic is allowed between application components.

For further details, please consult the [Kubernetes Documentation](https://kubernetes.io/docs/) and explore practical coding challenges to gain hands-on experience with network policies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/c1a23222-3b06-466a-a19c-f605565424e2)**
>
> Watch video content
