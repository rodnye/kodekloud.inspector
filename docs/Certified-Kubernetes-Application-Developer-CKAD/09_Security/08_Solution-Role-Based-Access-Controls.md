# Solution Role Based Access Controls - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Security/Solution-Role-Based-Access-Controls)

---

## Table of Contents

- Solution Role Based Access Controls
  - Inspecting the API Server Configuration
  - Reviewing Roles in the Cluster
  - Examining the kube-proxy Role
  - Checking Role Bindings for kube-proxy
  - Inspecting the kubeconfig and User Permissions
  - Creating Roles and Role Bindings for the dev-user
  - Troubleshooting Access in the Blue Namespace
  - Conclusion
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Security

# Solution Role Based Access Controls

In this lab, we explore role-based access controls (RBAC) in Kubernetes. The tutorial covers inspecting the API server configuration, reviewing roles and permissions, and creating the necessary roles and bindings for a development user. Follow along to gain hands-on experience with securing your Kubernetes cluster.

──────────────────────────────

## Inspecting the API Server Configuration

Start by inspecting the kube-apiserver manifest to identify the configured authorization modes. In the manifest snippet below, note the use of "Node,RBAC" for the authorization mode:

```
creationTimestamp: null
labels:
  component: kube-apiserver
  tier: control-plane
name: kube-apiserver
namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --advertise-address=10.48.174.6
    - --allow-privileged=true
    - --authorization-mode=Node,RBAC
    - --client-ca-file=/etc/kubernetes/pki/ca.crt
    - --enable-admission-plugins=NodeRestriction
    - --enable-bootstrap-token-auth=true
    - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
    - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
    - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
    - --etcd-servers=https://127.0.0.1:2379
    - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
    - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
    - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
    - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
    - --requestheader-allowed-names=front-proxy-client
    - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
    - --requestheader-extra-headers-prefix=X-Remote-Extra-
    - --requestheader-group-headers=X-Remote-Group
    - --requestheader-username-headers=X-Remote-User
    - --secure-port=6443
    - --service-account-issuer=https://kubernetes.default.svc.cluster.local
    - --service-account-key-file=/etc/kubernetes/pki/sa.pub
    - --service-account-signing-key-file=/etc/kubernetes/pki/sa.key
    - --tls-cert-file=/etc/kubernetes/pki/apiserver.crt
    - --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
  image: k8s.gcr.io/kube-apiserver:v1.23.0
  imagePullPolicy: IfNotPresent
  livenessProbe:
```

An alternative verification method is to inspect the running processes on the control plane. For instance, execute the following command:

```
root@controlplane ~ ps aux | grep authorization
root      3403  0.0  0.0  830588 115420 ?        Ssl  22:54   0:55 kube-controller-manager --allocate-node-authorization-kubeconfig=/etc/kubernetes/controller-manager.conf --authorization-kubeconfig=/etc/kubernetes/controller-manager.conf --bind-address=127.0.0.1 --client-ca-file=/etc/kubernetes/pki/ca.crt --cluster-cidr=10.244.0.0/16 --kubelet-client-certificate=/etc/kubernetes/pki/ca.key --controllers=*,bootstrapsigner,tokens --kubelet-client-key=/etc/kubernetes/pki/front-proxy-client.key --service-account-privileged=false --service-cluster-ip-range=10.96.0.0/12 --use-service-account-credentials=true
root      3614  0.0  0.0  759136  55292 ?        Ssl  22:55   0:10 kube-scheduler --authentication-kubeconfig=/etc/kubernetes/scheduler.conf --bind-address=127.0.0.1 --kubeconfig=/etc/kubernetes/scheduler.conf --leader-elect=true
root      3630  0.0  0.1 111896  316984 ?        S    22:55   2:07 kube-apiserver --advertise-address=10.4.8.174.6 --allow-privileged=true --authorization-mode=Node,RBAC --client-ca-file=/etc/kubernetes/pki/ca.crt --enable-admission-plugins=NodeRestriction --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key --requestheader-allowed-names=X-Remote-Group --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-client-ca.crt --requestheader-headers-prefix=X-Remote-Extra --requestheader-group-headers=X-Remote-Group --requestheader-username-headers=X-Remote-User --secure-port=6443 --service-account-issuer=https://kubernetes.default.svc.cluster.local --service-account-key-file=/etc/kubernetes/pki/sa.key --service-cluster-ip-range=10.96.0.0/12 --tls-cert-file=/etc/kubernetes/pki/apiserver.crt --tls-private-key-file=/etc/kubernetes/pki/apiserver.key
root      25283  0.0  0.0  13444  1068 pts/0    S+   23:40   0:00 grep --color=auto authorization
```

The output confirms that the kube-apiserver is running with the "Node,RBAC" authorization mode.

──────────────────────────────

## Reviewing Roles in the Cluster

Begin by identifying the existing roles within the default namespace. The output below shows that no roles exist in that namespace:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/kube-apiserver.advertise-address.endpoint: 10.48.174.6:6443
  creationTimestamp: null
  labels:
    component: kube-apiserver
    tier: control-plane
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --advertise-address=10.48.174.6
    - --allow-privileged=true
    - --authorization-mode=Node,RBAC
    - --client-ca-file=/etc/kubernetes/pki/ca.crt
    - --enable-admission-plugins=NodeRestriction
    - --enable-bootstrap-token-auth=true
    - --etcd-cafile=/etc/kubernetes/pki/etcd/ca.crt
    - --etcd-certfile=/etc/kubernetes/pki/apiserver-etcd-client.crt
    - --etcd-keyfile=/etc/kubernetes/pki/apiserver-etcd-client.key
    - --etcd-servers=https://127.0.0.1:2379
    - --kubelet-client-certificate=/etc/kubernetes/pki/apiserver-kubelet-client.crt
    - --kubelet-client-key=/etc/kubernetes/pki/apiserver-kubelet-client.key
    - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
    - --proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.crt
    - --proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client.key
    - --request-header-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
    - --requestheader-extra-headers-prefix=X-Remote-Extra-
    - --requestheader-group-headers=X-Remote-Group
```

To count the roles across all namespaces, use this command:

```
root@controlplane ~ k get roles -A --no-headers | wc -l
12
```

There are 12 roles configured cluster-wide.

──────────────────────────────

## Examining the kube-proxy Role

Next, examine the permissions assigned to the kube-proxy role in the kube-system namespace. Run the following command to display its details:

```
root@controlplane ~ ✗ k describe role kube-proxy -n kube-system
Name:         kube-proxy
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources           Non-Resource URLs  Resource Names  Verbs
  ---------           -----------------  ---------------  -----
  configmaps          []                                   [get]
```

From the output, the kube-proxy role is limited to performing the "get" action on ConfigMap resources only. It cannot delete or update ConfigMaps.

──────────────────────────────

## Checking Role Bindings for kube-proxy

Identify which service account is bound to the kube-proxy role by examining the role bindings in the kube-system namespace:

```
root@controlplane ~ ✗ k describe role kube-proxy -n kube-system
Name:         kube-proxy
Labels:       <none>
Annotations:  <none>
PolicyRules:
  Resources      Non-Resource URLs  Resource Names  Verbs
  -----------    -----------------  --------------  -----
  configmaps     []                  [kube-proxy]    [get]
```

List the role bindings in the kube-system namespace:

```
root@controlplane ~ ✗ k get rolebindings -n kube-system
NAME                                              AGE
kube-proxy                                        48m
kubeadm:kubelet-config-1.23                       48m
kubeadm:nodes-kubeadm-config                      48m
system:extension-apiserver-authentication-reader  48m
system:leader-locking-kube-controller-manager     48m
system:leader-locking-kube-scheduler               48m
system:controller:bootstrap-signer               48m
system:controller:cloud-provider                  48m
system:controller:token-cleaner                   48m
```

Then, inspect the kube-proxy role binding:

```
root@controlplane ~ ◦ k describe rolebindings kube-proxy -n kube-system
Name:         kube-proxy
Labels:       <none>
Annotations:  <none>
Role:
  Kind: Role
  Name: kube-proxy
Subjects:
  Kind   Name
  ----   ----
  Group  system:bootstrappers:kubeadm:default-node-token
```

This confirms that the kube-proxy role is associated with the group "system:bootstrappers:kubeadm:default-node-token".

──────────────────────────────

## Inspecting the kubeconfig and User Permissions

Review the kubeconfig file to verify the configured users on the cluster:

```
root@controlplane ~ ⮀ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://controlplane:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: dev-user
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

Test the permissions for the "dev-user" by listing pods in the default namespace:

```
root@controlplane ~ ⮀ k get pods --as dev-user
Error from server (Forbidden): pods is forbidden: User "dev-user" cannot list resource "pods" in API group "" in the namespace "default"
```

This error confirms that the "dev-user" currently lacks permission to list pods in the default namespace.

──────────────────────────────

## Creating Roles and Role Bindings for the dev-user

Before proceeding, review how to create a role in Kubernetes. The following command creates a role named "developer" granting list, create, and delete permissions on pods. Notice that the correct flag is --resource (singular):

```
root@controlplane ~ ➜ k create role developer --verb=list,create,delete --resource=pods
role.rbac.authorization.k8s.io/developer created
```

You can verify the created role by describing it:

```
root@controlplane ~ ➜ k describe role developer
Name:         developer
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources  Non-Resource URLs  Resource Names  Verbs
  ---------  -----------------  --------------  --------------
  pods       []                 []              [list create delete]
```

Next, assign the "developer" role to "dev-user" by creating a role binding:

```
root@controlplane ~ ⟩ k create rolebinding dev-user-binding --role=developer --user=dev-user
rolebinding.rbac.authorization.k8s.io/dev-user-binding created
```

Verify the role binding:

```
root@controlplane ~ ⟩ k describe rolebinding dev-user-binding
Name:         dev-user-binding
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  Role
  Name:  developer
Subjects:
  Kind   Name
  ----   ----
  User   dev-user
```

──────────────────────────────

## Troubleshooting Access in the Blue Namespace

Suppose the dev-user tries to retrieve details of a pod named "dark-blue-app" in the blue namespace:

```
k --as dev-user get pod dark-blue-app -n blue
```

The error received is:

```
Error from server (Forbidden): pods "dark-blue-app" is forbidden: User "dev-user" cannot get resource "pods" in API group "" in the namespace "blue"
```

Upon inspection, the blue namespace has an existing "developer" role and the "dev-user-binding" role binding:

```
root@controlplane ~ ✗ k get roles -n blue
NAME        CREATED AT
developer   2022-04-17T23:25:04Z

root@controlplane ~ ✗ k get rolebindings -n blue
NAME              ROLE             AGE
dev-user-binding  Role/developer   24m
```

Currently, the "developer" role in the blue namespace grants permission only for the pod "dark-blue-app." To provide the dev-user with the ability to manage that pod and to create new deployments, update the role to include rules for handling deployments in the "apps" API group. Below is an example of the updated role:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  creationTimestamp: "2022-04-17T23:25:04Z"
  name: developer
  namespace: blue
  resourceVersion: "4534"
  uid: b1424ab8-9776-43b0-bddf-433dfff73c1e
rules:
- apiGroups:
  - ""
  resourceNames:
  - dark-blue-app
  resources:
  - pods
  verbs:
  - get
  - watch
  - create
  - delete
- apiGroups:
  - "apps"
  resources:
  - deployments
  verbs:
  - get
  - watch
  - create
  - delete
```

Save the changes, then test the configuration by creating a deployment as the dev-user:

```
root@controlplane ~ ⟫ k --as dev-user create deployment nginx --image=nginx -n blue
deployment.apps/nginx created
```

The successful creation of the deployment confirms that the necessary permissions have been granted.

> [!important]
> **Note**
>
> Always verify RBAC changes by testing user permissions in the designated namespace to ensure that the intended access is provided while maintaining security.

──────────────────────────────

## Conclusion

In this lab, you have:

- Inspected the kube-apiserver configuration to confirm the use of Node,RBAC authorization mode.
- Reviewed the roles across namespaces and counted the total number of roles.
- Examined the kube-proxy role’s permissions and its corresponding role binding.
- Inspected the kubeconfig to determine that the dev-user initially lacked permission to list pods.
- Created a role and role binding for the dev-user to grant appropriate pod access in the default namespace.
- Troubleshooted a permission issue in the blue namespace by updating the "developer" role to allow managing deployments.

This concludes the Kubernetes RBAC lab. For more details on Kubernetes security and RBAC best practices, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/ee404020-8c94-4f3b-a69a-240984b9553e/lesson/6442a8c6-ae86-4072-938a-c3e59d3916c8)**
>
> Watch video content
