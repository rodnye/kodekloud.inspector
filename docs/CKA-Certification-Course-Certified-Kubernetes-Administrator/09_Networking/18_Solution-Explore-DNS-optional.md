# Solution Explore DNS optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Explore-DNS-optional)

---

## Table of Contents

- Solution Explore DNS optional
  - Identifying the Cluster DNS Solution
  - Counting the DNS Server Pods
  - Discovering the DNS Service
  - Configuring CoreDNS and the Corefile
  - Exploring Pod and Service Connectivity
  - Deploying a Web App That Connects to a MySQL Database
  - Verifying DNS Resolution with nslookup
  - Watch Video
    - File Location and Mounting
    - Name of the ConfigMap
    - Configured Root Domain
    - In the Default Namespace
    - In the Payroll Namespace
    - Accessing the HR Web Server
    - Accessing the Payroll Service
    - Checking an Incorrect Hostname
    - Checking the Correct Hostname

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Explore DNS optional

In this lab, we examine how CoreDNS integrates with a Kubernetes cluster while exploring various DNS and service connectivity scenarios. Follow along with the steps and command outputs provided below.

---

## Identifying the Cluster DNS Solution

Begin by setting an alias for kubectl:

```
alias k='kubectl'
```

Then, list all pods in the kube-system namespace to identify the DNS solution in use:

```
root@controlplane:~# k get pods -n kube-system
NAME                                      READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-91cxv                   1/1     Running   0          14m
coredns-74ff55c5b-kgtwz                   1/1     Running   0          14m
etcd-controlplane                         1/1     Running   0          14m
kube-apiserver-controlplane               1/1     Running   0          14m
kube-controller-manager-controlplane      1/1     Running   0          14m
kube-flannel-ds-ztb5d                      1/1     Running   0          14m
kube-proxy-wq29p                          1/1     Running   0          14m
kube-scheduler-controlplane               1/1     Running   0          14m
root@controlplane:~#
```

From the output, it is clear that **CoreDNS** is the DNS solution running in this cluster.

---

## Counting the DNS Server Pods

To determine the number of DNS server pods deployed, run:

```
root@controlplane:~# k get pods -n kube-system
NAME                                   READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-91cxv               1/1     Running   0          14m
coredns-74ff55c5b-kgtwz               1/1     Running   0          14m
etcd-controlplane                      1/1     Running   0          14m
kube-apiserver-controlplane            1/1     Running   0          14m
kube-controller-manager-controlplane   1/1     Running   0          14m
kube-flannel-ds-ztb5d                  1/1     Running   0          14m
kube-proxy-wq2p9                       1/1     Running   0          14m
kube-scheduler-controlplane            1/1     Running   0          14m
root@controlplane:~#
```

There are **two** CoreDNS pods deployed within the cluster.

---

## Discovering the DNS Service

Identify the service used to access CoreDNS by listing services in the kube-system namespace:

```
root@controlplane:~# k get svc -n kube-system
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                 AGE
kube-dns     ClusterIP   10.96.0.10     <none>        53/UDP,53/TCP,9153/TCP   16m
root@controlplane:~#
```

The service is named **kube-dns** and its Cluster IP is **10.96.0.10**. This IP address must be configured on all pods for proper service resolution:

```
root@controlplane:~# k get svc -n kube-system
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)                  AGE
kube-dns     ClusterIP   10.96.0.10    <none>        53/UDP,53/TCP,9153/TCP    16m
root@controlplane:~#
```

---

## Configuring CoreDNS and the Corefile

### File Location and Mounting

The CoreDNS container is initiated with an argument that points to its configuration file located at:

```
/etc/coredns/Corefile
```

The pod specification reveals that the Corefile is mounted into the container via a volume configured by a ConfigMap:

```
containers:
  - args:
      - --conf
      - /etc/coredns/Corefile
    image: k8s.gcr.io/coredns:1.7.0
    ...
```

### Name of the ConfigMap

Inspect the volume configuration to see how the Corefile is provided:

```
volumes:
  - configMap:
      defaultMode: 420
      items:
        - key: Corefile
          path: Corefile
      name: corends
  - name: corends-token-8scbd
    secret:
      defaultMode: 420
      secretName: corends-token-8scbd
```

When describing the ConfigMap, you might notice slight inconsistencies in naming as seen in the outputs:

```
root@controlplane:~# k describe configmap corends -n kube-system
Name:           corenods
...
```

```
root@controlplane:~# k describe configmap corenets -n kube-system
Name:           corenets
...
```

> [!important]
> **Naming Inconsistency**
>
> Note that the ConfigMap names in the outputs differ slightly. Despite this inconsistency, both refer to the ConfigMap used for CoreDNS configuration.

### Configured Root Domain

The Corefile provided by the ConfigMap includes the DNS configuration block for Kubernetes:

```
kubernetes cluster.local in-addr.arpa ip6.arpa {
    pods insecure
    fallthrough in-addr.arpa ip6.arpa
    ttl 30
}
```

This indicates that the default domain (zone) configured in the cluster is **cluster.local**.

---

## Exploring Pod and Service Connectivity

Multiple applications have been deployed in various namespaces. In the default namespace, you have pods like HR, simple-webapp, and test. In the payroll namespace, a pod named web is running. Verify their statuses:

### In the Default Namespace

```
root@controlplane:~# k get pods
NAME               READY   STATUS    RESTARTS   AGE
hr                 1/1     Running   0          7m10s
simple-webapp-1    1/1     Running   0          6m58s
simple-webapp-122  1/1     Running   0          6m58s
test               1/1     Running   0          7m10s
root@controlplane:~#
```

### In the Payroll Namespace

```
root@controlplane:~# k get pods -n payroll
NAME   READY   STATUS    RESTARTS   AGE
web    1/1     Running   0          7m26s
root@controlplane:~#
```

---

### Accessing the HR Web Server

Inspect the services in the default namespace to determine how the test pod can reach the HR web server:

```
root@controlplane:~# k get svc
NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1       <none>        443/TCP          22m
test-service    NodePort    10.98.135.178   <none>        80:30000/TCP     8m29s
web-service     ClusterIP   10.103.201.20   <none>        80/TCP           8m29s
root@controlplane:~#
```

Describing the **web-service** reveals its selector that directs traffic to pods labeled `name=hr`:

```
root@controlplane:~# k describe svc web-service
Name:              web-service
Namespace:         default
Labels:            <none>
Annotations:       <none>
Selector:          name=hr
Type:              ClusterIP
IPs:               10.103.201.20
Port:              80/TCP
Endpoints:         10.244.0.5:80
Events:            <none>
root@controlplane:~#
```

From within the test pod, you can resolve the HR web server using the service name **web-service** (or its fully qualified domain name in the default namespace). Remember that an intentionally incorrect name, such as **web-service.default.pod**, will not resolve.

---

### Accessing the Payroll Service

For services deployed in a non-default namespace, you must use the fully qualified domain name that includes the namespace. In the payroll namespace, the web service is defined as:

```
root@controlplane:~# k get svc -n payroll
NAME          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
web-service   ClusterIP   10.97.196.21   <none>        80/TCP     10m
root@controlplane:~#
```

Describing the payroll web service further confirms the configuration:

```
root@controlplane:~# k describe svc web-service -n payroll
Name:              web-service
Namespace:         payroll
Labels:            <none>
Annotations:       <none>
Selector:          name=web
Type:              ClusterIP
IPs:               10.97.196.21
Port:              80/TCP
TargetPort:        80/TCP
Endpoints:         10.244.0.4:80
Events:            <none>
root@controlplane:~#
```

From the test pod in the default namespace, access the payroll service using its fully qualified domain name. Valid addresses include **web-service.payroll** or **web-service.payroll.svc.cluster.local**. Using an incorrect or incomplete name—for instance, **web-service.payroll.svc.cluster** (omitting the final “.local”)—will result in a resolution error.

---

## Deploying a Web App That Connects to a MySQL Database

A web application is deployed that accesses a MySQL database. Inspect the current deployment:

```
root@controlplane:~# k get deploy
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
webapp  1/1     1            1           15s
root@controlplane:~#
```

When describing the deployment (e.g., using `kubectl describe deploy webapp`), you’ll notice the container’s environment variables:

- DB_Host: mysql
- DB_User: root
- DB_Password: paswrd

> [!important]
> **Important**
>
> If the MySQL service is running in the payroll namespace, using just "mysql" as the hostname will not resolve from a pod in the default namespace. Use the fully qualified domain name instead.

To correct this, update the deployment so the DB host includes the namespace. For example, change it to **mysql.payroll** (or **mysql.payroll.svc.cluster.local**). Edit the deployment with:

```
root@controlplane:~# k edit deploy webapp
```

Then update the environment variables in the container specification:

```
env:
  - name: DB_Host
    value: mysql.payroll
  - name: DB_User
    value: root
  - name: DB_Password
    value: paswrd
```

After saving, Kubernetes will update the deployment, ensuring that new pods correctly resolve the MySQL service.

---

## Verifying DNS Resolution with nslookup

From the HR pod, verify DNS resolution using nslookup.

### Checking an Incorrect Hostname

First, run nslookup for the incorrect hostname:

```
root@controlplane:~# k exec hr -- nslookup mysql
Server:         10.96.0.10
Address:        10.96.0.10#53


** server can't find mysql: NXDOMAIN
command terminated with exit code 1
root@controlplane:~#
```

Since the MySQL service is in the payroll namespace, this lookup fails.

### Checking the Correct Hostname

Run nslookup for the fully qualified hostname:

```
root@controlplane:~# k exec hr -- nslookup mysql.payroll
Server:         10.96.0.10
Address:        10.96.0.10#53


Name:   mysql.payroll.svc.cluster.local
Address: 10.98.149.84
```

To save the output to a file, execute:

```
root@controlplane:~# k exec hr -- nslookup mysql.payroll > /root/CKA/nslookup.out
```

Verify the file contents:

```
root@controlplane:~# cat /root/CKA/nslookup.out
Server:         10.96.0.10
Address:        10.96.0.10#53


Name:   mysql.payroll.svc.cluster.local
Address: 10.98.149.84
```

---

That concludes this lab. By following these steps, you have verified CoreDNS settings, confirmed service connectivity across namespaces, and ensured proper service name resolution so that your web application can connect to its MySQL database.

Thank you for following along.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/57bcd734-dacc-4c1d-80a2-ea0ba7dea323)**
>
> Watch video content
