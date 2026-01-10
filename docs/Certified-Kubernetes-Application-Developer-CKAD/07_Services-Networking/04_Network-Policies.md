# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Services-Networking/Network-Policies)

---

## Table of Contents

- Network Policies
  - Network Security in Kubernetes
  - What Are Network Policies?
  - Creating a Network Policy
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Services Networking

# Network Policies

Welcome to this comprehensive lesson on network policies. My name is Mumshad Mannambeth, and in this guide, we will explore fundamental networking and security concepts through practical examples. We’ll illustrate how traffic flows between a web server, an API server, and a database server and explain how Kubernetes network policies help enforce security.

Imagine a scenario where:

- A web server serves the front-end to users,
- An API server handles backend logic and communication, and
- A database server stores persistent data.

The traffic flow works as follows:

1.  A user sends a request to the web server on port 80.
2.  The web server forwards the request to the API server on port 5000.
3.  The API server retrieves the required data from the database server on port 3306 and sends the response back to the user.

There are two key types of traffic in this scenario:

- **Ingress Traffic:** Incoming traffic to a server (e.g., user requests reaching the web server).
- **Egress Traffic:** Outgoing traffic from a server (e.g., the web server forwarding a request to the API server).

Note that when referring to ingress or egress traffic, only the direction in which the traffic originates is considered. Response traffic (often illustrated as dotted lines) is not directly controlled by these rules.

For our setup, consider these traffic rules:

| Component       | Traffic Type | Port | Description                            |
| --------------- | ------------ | ---- | -------------------------------------- |
| Web Server      | Ingress      | 80   | Accepts HTTP requests from users.      |
| Web Server      | Egress       | 5000 | Forwards requests to the API server.   |
| API Server      | Ingress      | 5000 | Receives traffic from the web server.  |
| API Server      | Egress       | 3306 | Sends requests to the database server. |
| Database Server | Ingress      | 3306 | Accepts traffic from the API server.   |

![The image illustrates IT traffic flow with ingress and egress ports, showing connections to web, API, and database services.](https://kodekloud.com/kk-media/image/upload/v1752871303/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Network-Policies/frame_140.jpg)

## Network Security in Kubernetes

In a Kubernetes cluster, nodes host Pods and services, with each node, Pod, and service possessing its own IP address. A core principle of Kubernetes networking is that Pods can communicate with one another without additional routing configurations. Typically, all Pods reside on a virtual private network, enabling direct communication using IP addresses, Pod names, or service definitions. By default, Kubernetes allows all intra-cluster communication with an "all-allow" rule.

In our application deployment within Kubernetes:

- The web server, API server, and database server each run in their own Pod.
- Services facilitate communication between these Pods and provide external access.
- Without additional restrictions, all Pods can freely communicate with one another.

However, there may be security or compliance requirements that necessitate restricting direct communication (for example, preventing the web server from directly accessing the database server). This is where network policies come into play.

## What Are Network Policies?

A network policy is a Kubernetes object that controls the traffic flow to and from Pods. Using labels and selectors, you can bind a network policy to one or more Pods, thereby restricting access to them. For example, you can set up a policy that only permits ingress traffic to the database Pod from the API Pod on port 3306.

![The image illustrates a network policy diagram showing connections between a user, web pod, API pod, and DB pod with specific ports and a network policy restriction.](https://kodekloud.com/kk-media/image/upload/v1752871304/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Network-Policies/frame_290.jpg)

Once a network policy is applied, any traffic not matching the defined rules is blocked. If a policy only allows API Pod traffic to the database Pod on port 3306, then any traffic from a different source will be denied.

![The image illustrates a network policy allowing ingress traffic from an API pod to a database pod on port 3306.](https://kodekloud.com/kk-media/image/upload/v1752871305/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Network-Policies/frame_310.jpg)

## Creating a Network Policy

To enforce a network policy, you use labels and selectors, much like linking ReplicaSets or Services to Pods. In our example, we want to allow only ingress traffic to the database Pod from the API Pod on port 3306. Here is the complete YAML definition for our network policy:

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

In this configuration:

- The `podSelector` targets Pods labeled with `role: db`.
- The `policyTypes` declaration specifies that this network policy controls ingress traffic.
- The `ingress` rule restricts access, allowing traffic only from Pods labeled with `name: api-pod` on TCP port 3306.

> [!important]
> **Note**
>
> To apply this network policy, run the appropriate `kubectl create` command. Remember that network policies are enforced by the underlying network solution in your Kubernetes cluster.

Not all network solutions support network policies. For instance, as of the time of this lesson, Flannel does not support them. Supported solutions include KubeRouter, Calico, Romana, and Weave Net. Always review your network solution's documentation to confirm support for network policies.

![The image lists network solutions: Kube-router, Calico, Romana, and Weave-net support network policies, while Flannel does not.](https://kodekloud.com/kk-media/image/upload/v1752871306/notes-assets/images/Certified-Kubernetes-Application-Developer-CKAD-Network-Policies/frame_430.jpg)

> [!important]
> **Warning**
>
> Even if your cluster’s network solution does not support network policies, you can define them. However, these policies will not be enforced unless supported.

## Conclusion

This lesson provided an in-depth understanding of network policies in Kubernetes, covering:

- Basic traffic flow between services.
- How ingress and egress rules are defined.
- The application of network policies to restrict communication between Pods.

For more practice, review the official documentation and try out related coding challenges to solidify your understanding of Kubernetes network policies.

Learn more from the [Kubernetes Documentation](https://kubernetes.io/docs/) and explore additional resources on network security to further enhance your skills.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/58deb166-bc85-48c7-98d0-696f1f536fb6/lesson/b144a16d-f2fa-4d3a-8073-aec5f2d3192d)**
>
> Watch video content
