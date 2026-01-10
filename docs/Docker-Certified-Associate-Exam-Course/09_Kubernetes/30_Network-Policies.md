# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Network-Policies)

---

## Table of Contents

- Network Policies
  - Table of Contents
  - Traffic Flow Fundamentals
  - Kubernetes Networking Basics
  - Default Behavior vs. Intentional Isolation
  - Defining a NetworkPolicy
  - CNI Plugin Support
  - Further Reading
  - Watch Video
    - Example: Restrict DB Pod Ingress

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Network Policies

Kubernetes Network Policies enable you to enforce fine-grained traffic rules between pods. In this guide, we’ll review networking fundamentals, explore the default “allow all” model, and walk through creating an ingress policy to restrict access to your database pod.

## Table of Contents

- [Traffic Flow Fundamentals](#traffic-flow-fundamentals)
- [Kubernetes Networking Basics](#kubernetes-networking-basics)
- [Default Behavior vs. Intentional Isolation](#default-behavior-vs-intentional-isolation)
- [Defining a NetworkPolicy](#defining-a-networkpolicy)
- [CNI Plugin Support](#cni-plugin-support)
- [Further Reading](#further-reading)

---

## Traffic Flow Fundamentals

Consider a three-tier application:

1.  **Web Server**: Receives HTTP requests (port 80).
2.  **API Server**: Processes logic (port 5000).
3.  **Database Server**: Stores data (port 3306).

Incoming traffic to a pod is called **ingress**, and outgoing traffic is **egress**. For example:

- User → Web server on port 80: **ingress** to the web server
- Web server → API server on port 5000: **egress** from web, **ingress** to API
- API server → Database on port 3306: **egress** from API, **ingress** to database

> [!important]
> **Note**
>
> Response packets for established connections are automatically allowed. You only need to define rules for the initial traffic direction.

![The image illustrates a network flow diagram showing ingress and egress processes, with a user accessing a web service on port 80, an API on port 5000, and a database on port 3306.](https://kodekloud.com/kk-media/image/upload/v1752874005/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-flow-diagram-ingress-egress.jpg)

Below is a simplified view of the same flow:

![The image is a diagram showing network traffic flow with ingress and egress ports, represented by arrows pointing to icons labeled with a globe, "API," and a database symbol.](https://kodekloud.com/kk-media/image/upload/v1752874006/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-traffic-flow-diagram.jpg)

**Required rules for this flow**

- **Web Server**
  - Ingress: TCP port 80
  - Egress: TCP port 5000 to API
- **API Server**
  - Ingress: TCP port 5000
  - Egress: TCP port 3306 to Database
- **Database Server**
  - Ingress: TCP port 3306

---

## Kubernetes Networking Basics

In a Kubernetes cluster with a compliant CNI plugin:

- All pods share a flat virtual network.
- Pods reach each other via IP or DNS.
- Services provide stable endpoints (`ClusterIP`, `NodePort`, `LoadBalancer`).
- Default behavior: **allow all** pod-to-pod traffic.

![The image is a network security diagram labeled "All Allow," showing interconnected nodes represented by various colored shapes within a cloud-like structure.](https://kodekloud.com/kk-media/image/upload/v1752874007/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-security-all-allow-diagram.jpg)

---

## Default Behavior vs. Intentional Isolation

Deploying our three tiers on Kubernetes:

- **Web Pod** exposed on port 80 via a Service.
- **API Pod** exposed on port 5000 via a ClusterIP Service.
- **DB Pod** exposed on port 3306 via a ClusterIP Service.

Without NetworkPolicies, every pod can talk to every other pod on any port. For instance, the Web Pod could directly reach the Database Pod on port 3306.

![The image is a network diagram showing traffic flow between a user, a web pod, an API, and a database, with ports 80, 5000, and 3306 indicated.](https://kodekloud.com/kk-media/image/upload/v1752874008/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-diagram-traffic-flow-user-api-database.jpg)

If you need to enforce separation—e.g., **only** the API Pod can query the database—you define a NetworkPolicy:

![The image illustrates a network policy diagram showing connections between a user, a Web Pod, an API Pod, and a DB Pod, with specific ports and network policies indicated. The Web Pod connects to the API Pod and DB Pod, while the API Pod also connects to the DB Pod.](https://kodekloud.com/kk-media/image/upload/v1752874009/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-policy-diagram-user-web-api-db.jpg)

---

## Defining a NetworkPolicy

A `NetworkPolicy`:

- Resides in a namespace and selects pods via `podSelector`.
- Specifies `policyTypes`: `Ingress`, `Egress`, or both.
- Lists allowed traffic rules; any unspecified traffic is denied.

### Example: Restrict DB Pod Ingress

1.  **Label the DB pod**  
    Add a label to your Pod manifest:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: db-pod
      labels:
        role: db
    spec:
      containers:
        - name: mysql
          image: mysql:5.7
    ```

2.  **Create the NetworkPolicy**  
    Only allow pods labeled `name: api-pod` to connect on port 3306:

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

3.  **Apply the policy**

    ```
    kubectl apply -f db-policy.yaml
    ```

After applying, only pods with `name=api-pod` may reach the DB Pod on TCP port 3306. All other ingress is denied, while egress from the DB Pod remains unrestricted.

---

## CNI Plugin Support

Not all CNI plugins enforce NetworkPolicies. Below is an overview:

| CNI Plugin  | NetworkPolicy Support |
| ----------- | --------------------- |
| Kube-router | Yes                   |
| Calico      | Yes                   |
| Romana      | Yes                   |
| Weave Net   | Yes                   |
| Flannel     | No                    |

> [!important]
> **Warning**
>
> Flannel does **not** enforce NetworkPolicies by default. You may still create policy objects, but they won’t take effect. Always verify your CNI’s capabilities in its documentation.

![The image lists network solutions, with "Kube-router," "Calico," "Romana," and "Weave-net" supporting network policies, while "Flannel" does not.](https://kodekloud.com/kk-media/image/upload/v1752874010/notes-assets/images/Docker-Certified-Associate-Exam-Course-Network-Policies/network-solutions-kube-router-calico-romana-weave-net.jpg)

---

## Further Reading

- [Kubernetes NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Calico NetworkPolicy](https://docs.projectcalico.org/)
- [Weave Net Documentation](https://www.weave.works/docs/net/latest/kubernetes/kube-addon/)

Practice these examples in your own cluster to gain confidence in securing pod-to-pod traffic.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/30201aa9-7361-491b-afbe-f1d49008dfe4)**
>
> Watch video content
