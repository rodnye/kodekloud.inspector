# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Network-Policies)

---

## Table of Contents

- Network Policies
  - Traffic Flow Example
  - Network Security in Kubernetes
  - Enabling Network Policies in Kubernetes
  - Conclusion
  - Additional Resources
  - Watch Video
    - Restricting Communication with Network Policies
    - Implementing a Network Policy

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Network Policies

Welcome to this lesson on network policies. This guide will review essential networking and security concepts before diving into how network policies function within a Kubernetes environment.

## Traffic Flow Example

Consider a simple application configuration consisting of a web server, an API server, and a database server. The traffic flow is as follows:

1.  A user sends a request to the web server on port 80.
2.  The web server forwards this request to the API server on port 5000.
3.  The API server retrieves data from the database server on port 3306, then sends the response back to the user.

There are two main types of network traffic involved:

- **Ingress traffic:** Incoming traffic. For example, user requests arriving at the web server on port 80.
- **Egress traffic:** Outgoing traffic. For example, requests sent from the web server to the API server.

In our diagrams, a solid arrow indicates the direction of the originating traffic (either ingress or egress), while a dotted arrow represents the response flow, which is typically not controlled by network policies.

For clarity:

- The **API server** receives ingress traffic from the web server (port 5000) and sends out egress traffic to the database server (port 3306).
- The **database server** receives ingress traffic on port 3306 from the API server.

To support this traffic flow, the following rules must be established:

- An ingress rule for the web server to allow HTTP traffic on port 80.
- An egress rule for the web server to permit traffic to port 5000 on the API server.
- An ingress rule for the API server to accept traffic on port 5000.
- An egress rule for the API server to allow traffic to port 3306 on the database server.
- An ingress rule for the database server to allow traffic on port 3306.

![The image illustrates network traffic flow, showing ingress and egress ports (80, 5000, 3306) associated with web, API, and database icons.](https://kodekloud.com/kk-media/image/upload/v1752869942/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Network-Policies/frame_120.jpg)

## Network Security in Kubernetes

In a Kubernetes cluster, nodes host pods and services, each assigned a unique IP address. A crucial capability of Kubernetes is that pods can communicate with one another without extra configuration—such as setting up custom routes. Typically, all pods reside in a virtual private network (VPN) that spans the entire cluster, allowing them to interact using pod IPs, pod names, or configured services.

By default, Kubernetes employs an "all-allow" rule permitting any pod to communicate with every other pod or service within the cluster.

![The image illustrates a network security concept labeled "All Allow," showing interconnected nodes with various shapes and colors within a cloud-like structure.](https://kodekloud.com/kk-media/image/upload/v1752869943/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Network-Policies/frame_210.jpg)

Now, consider the earlier scenario with three pods: one for the front-end web server, one for the API server, and one for the database server. Services facilitate communication between these pods and external users, while the default configuration allows free communication across the cluster.

### Restricting Communication with Network Policies

If your security requirements dictate that the front-end web server should not communicate directly with the database server, you can enforce this by implementing a network policy. For example, you might create a policy that only permits the API server to interact with the database server.

A network policy in Kubernetes is defined as an object, which you attach to one or more pods using labels and selectors. In this scenario, the policy would only allow ingress traffic from the API pod on port 3306 while blocking all other sources from accessing the database pod.

![The image illustrates a network policy diagram showing connections between a user, Web Pod, API Pod, and DB Pod with specific port numbers and policies.](https://kodekloud.com/kk-media/image/upload/v1752869944/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Network-Policies/frame_290.jpg)

### Implementing a Network Policy

To apply a network policy, you assign labels to pods and define matching selectors in the network policy object. For example, consider this snippet used to select the database pod:

```
podSelector:
  matchLabels:
    role: db
```

This configuration ensures the network policy only applies to pods labeled with `role: db`. Next, you define policy rules to allow only ingress traffic from the API pod on port 3306.

![The image illustrates a network policy allowing ingress traffic from an API pod to a DB pod on port 3306, depicted with directional lines and labels.](https://kodekloud.com/kk-media/image/upload/v1752869946/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Network-Policies/frame_320.jpg)

Below is the complete network policy configuration:

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

> [!important]
> **Note**
>
> In this configuration:
>
> - The `podSelector` targets the database pod through its label.
> - The `policyTypes` field specifies that only ingress traffic is affected.
> - The ingress rule allows traffic specifically from pods with the label `name: api-pod` on TCP port 3306.

Keep in mind that isolation only applies to the traffic explicitly defined under `policyTypes`. Unspecified traffic is automatically allowed by default.

## Enabling Network Policies in Kubernetes

To enforce the network policy, execute the following command:

```
kubectl create -f db-policy.yaml
```

> [!important]
> **Warning**
>
> Network policies are enforced by the cluster's networking solution. While solutions like Kube-router, Calico, Romana, and Weave Net support network policies, Flannel does not enforce them. Creating policies with Flannel will not produce an error, but they won’t be applied. Always consult your network solution’s documentation to verify its support for network policies.

## Conclusion

This lesson provided an overview of network policies by demonstrating a basic application setup and illustrating how to restrict pod communication within a Kubernetes cluster. For further practice, be sure to review the Kubernetes documentation and engage in coding challenges to deepen your understanding of network policies.

## Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/3abf3df9-f133-4286-8c20-db0576641946)**
>
> Watch video content
