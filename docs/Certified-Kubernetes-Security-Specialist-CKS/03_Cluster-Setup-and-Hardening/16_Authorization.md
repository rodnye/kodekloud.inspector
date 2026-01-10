# Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Authorization)

---

## Table of Contents

- Authorization
  - Node Authorization
  - Attribute-Based Authorization
  - Role-Based Access Control (RBAC)
  - Webhook-Based Authorization
  - Simple Authorization Modes: AlwaysAllow and AlwaysDeny
  - Watch Video
    - AlwaysAllow Mode Configuration
    - Configuring Multiple Authorization Modes

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Authorization

In this article, we explain how Kubernetes handles authorization. After establishing access to a cluster through authentication (as discussed in our previous article), authorization determines which operations a user—whether human or machine—can perform within the cluster.

For example, a cluster administrator can view, create, or delete objects such as pods, nodes, and deployments. However, when granting access to additional users (e.g., developers, testers, other administrators, or external applications like [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) and monitoring tools), it is best practice to restrict their privileges. Developers might be allowed to view pods and deploy applications but should not modify cluster configurations or delete nodes. Similarly, when sharing a cluster among multiple organizations or teams using namespaces, each user’s access should be confined to their designated namespace.

> [!important]
> **Remember**
>
> Adjust user privileges using authorization policies to ensure cluster security and maintain operational integrity.

Below are some example commands demonstrating typical administrative operations:

```
kubectl get pods
# Output:
# NAME    READY   STATUS    RESTARTS   AGE
kubectl get nodes
# Output:
# NAME        STATUS   ROLES     AGE     VERSION
# worker-1    Ready    <none>    5d21h   v1.13.0
kubectl delete node worker-2
# Output:
# Node worker-2 Deleted!
```

When non-admin users attempt similar operations, they may encounter authorization errors:

```
kubectl get pods
kubectl get nodes
kubectl delete node worker-2
# Error from server (Forbidden): nodes "worker-2" is forbidden: User "developer" cannot delete resource "nodes"
```

Kubernetes supports a variety of authorization mechanisms, including:

- Node Authorization
- Attribute-Based Authorization
- Role-Based Access Control (RBAC)
- Webhook-Based Authorization

## Node Authorization

When the Kube API server handles requests from internal components, such as kubelets, it utilizes node authorization. The kubelet is responsible for tasks like reading service and pod information and reporting node status. These requests are authenticated by confirming that they originate from users with a name prefixed by "system:node" who belong to the "system:nodes" group.

![The image illustrates a Kubernetes architecture, showing interactions between a user, Kube API, and kubelet, with read/write operations for services, endpoints, nodes, and pods.](https://kodekloud.com/kk-media/image/upload/v1752871337/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authorization/frame_150.jpg)

Once a kubelet makes a request with the appropriate credentials, the node authorizer grants the necessary privileges.

![The image illustrates a Node Authorizer process involving a user, Kube API, kubelet, and a certificate, detailing read and write permissions.](https://kodekloud.com/kk-media/image/upload/v1752871338/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authorization/frame_180.jpg)

## Attribute-Based Authorization

For external API access, attribute-based authorization enables you to associate specific users or user groups with sets of permissions. For instance, you can define a JSON policy to allow a particular developer user to view, create, and delete pods. Below is an example policy file:

```
{"kind": "Policy", "spec": {"user": "dev-user", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
{"kind": "Policy", "spec": {"user": "dev-user-2", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
{"kind": "Policy", "spec": {"group": "dev-users", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
{"kind": "Policy", "spec": {"user": "security-1", "namespace": "*", "resource": "csr", "apiGroup": "*"}}
```

Every time you need to update security settings, modify this policy file and restart the kube-apiserver. However, as the number of users and policies increases, these attribute-based configurations can become difficult to manage.

## Role-Based Access Control (RBAC)

RBAC offers a more scalable approach compared to directly binding permissions to each user. With RBAC, you define roles that encapsulate necessary permissions (for example, one role for developers and another for security users). When users are assigned to roles, any updates made to a role are immediately reflected for all associated users.

![The image illustrates RBAC roles, showing user permissions for developers and security, including actions like viewing, creating, and deleting PODs, and approving CSRs.](https://kodekloud.com/kk-media/image/upload/v1752871340/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authorization/frame_290.jpg)

## Webhook-Based Authorization

If you prefer to manage authorization externally, third-party tools like [Open Policy Agent](https://www.openpolicyagent.org/) can be used. In this scenario, Kubernetes sends an API call containing user details and request information to the external system. Based on the external decision, the API server either grants or denies access.

## Simple Authorization Modes: AlwaysAllow and AlwaysDeny

Kubernetes also includes two straightforward authorization modes: AlwaysAllow and AlwaysDeny. As their names imply, AlwaysAllow permits all requests without checks, while AlwaysDeny blocks all requests. These modes are configured in the kube-apiserver using the authorization mode option. If not specified, the default mode is AlwaysAllow.

### AlwaysAllow Mode Configuration

Below is an example configuration for the kube-apiserver using the AlwaysAllow mode:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=AlwaysAllow \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-cafile=/var/lib/kubernetes/ca.pem \
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/apiserver-etcd-client.key \
  --service-node-port-range=30000-32767 \
  --client-ca-file=/var/lib/kubernetes/ca.pem \
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \
  -v=2
```

### Configuring Multiple Authorization Modes

It is also possible to enable multiple authorization modes simultaneously by providing a comma-separated list. For example, to enable node authorization, RBAC, and webhook authorization in that order, configure the kube-apiserver as follows:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC,Webhook \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-cafile=/var/lib/kubernetes/ca.pem \
  --etcd-certfile=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --etcd-keyfile=/var/lib/kubernetes/apiserver-etcd-client.key \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \
  --kubelet-client-certificate=/var/lib/kubernetes/apiserver-etcd-client.crt \
  --kubelet-client-key=/var/lib/kubernetes/apiserver-etcd-client.key \
  --service-node-port-range=30000-32767 \
  --client-ca-file=/var/lib/kubernetes/ca.crt \
  --tls-cert-file=/var/lib/kubernetes/apiserver.crt \
  --tls-private-key-file=/var/lib/kubernetes/apiserver.key \
  --v=2
```

When multiple modes are configured, the API server processes each request through the specified modules in the provided order:

1.  The node authorizer first examines the request (applicable only for node-related operations). If it denies the request, the process proceeds to the next module.
2.  The RBAC controller evaluates the request. If it approves, no additional checks occur.
3.  If necessary, the webhook authorizer issues the final decision.

Once any module approves the request, remaining checks are skipped, and the user is granted access to the requested object.

> [!important]
> **Further Reading**
>
> More details on RBAC and additional Kubernetes security mechanisms will be provided in upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/693206c3-db65-4efc-9e0c-f58671a5818a)**
>
> Watch video content
