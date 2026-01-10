# Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Authentication)

---

## Table of Contents

- Authentication
  - Static Password and Token Files
  - Watch Video
    - Static Password File Example
    - Static Token File Example

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Authentication

Welcome to this detailed lesson on authentication within a Kubernetes cluster. In a typical Kubernetes environment, multiple nodes—either physical or virtual—operate together, supporting various components that provide a robust and scalable system. Users interact with the cluster in different roles: administrators and developers manage the cluster, while end users access deployed applications and third-party services integrate with the system.

![The image illustrates a network diagram showing interactions between admins, developers, end users, and bots through a series of connected nodes.](https://kodekloud.com/kk-media/image/upload/v1752871332/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authentication/frame_30.jpg)

In this lesson, we focus on securing cluster management access by implementing secure communication and robust authentication mechanisms. Although end user security for applications is managed internally by the applications themselves, our discussion centers on authenticating access to the Kubernetes cluster for administrative and automated purposes. This includes human users—such as administrators and developers—and service accounts used by bots or automated processes.

Kubernetes does not manage local user accounts natively. Instead, it depends on external sources like files containing user details, certificate-based authentication, or third-party identity services such as LDAP or Kerberos. While you cannot list or create user accounts directly in Kubernetes, the system handles service accounts natively via the Kubernetes API.

![The image categorizes accounts into "User" (Admins, Developers) and "Service Accounts" (Bots) with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752871333/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authentication/frame_90.jpg)

All requests—whether initiated by the kubectl tool or directly sent to the API—are processed by the kube-apiserver. This critical server authenticates each request using various methods, including:

- Static password files
- Static token files
- Certificates
- Integration with third-party authentication protocols such as LDAP and Kerberos

Below, we introduce static password and token file mechanisms, which are among the simplest methods to understand and implement basic authentication in Kubernetes.

## Static Password and Token Files

The most straightforward authentication method involves creating a CSV file that lists users along with their credentials, usernames, and user IDs. Optionally, a fourth column can specify group information. This CSV file is then provided to the kube-apiserver as an authentication option.

### Static Password File Example

To use a static password file, create a CSV file (e.g., `user-details.csv`) with the following format:

```
password123,user1,u0001,group1
password123,user2,u0002,group1
password123,user3,u0003,group2
password123,user4,u0004,group2
password123,user5,u0005,group2
```

Next, configure the kube-apiserver to utilize this file by including the option:

```
kube-apiserver --basic-auth-file=user-details.csv
```

If you are using a tool such as kubeadm, modify the kube-apiserver pod definition file accordingly. kubeadm will automatically restart the kube-apiserver after these changes. An example of a modified kube-apiserver startup command might look like this:

```
ExecStart=/usr/local/bin/kube-apiserver \
  --advertise-address=${INTERNAL_IP} \
  --allow-privileged=true \
  --apiserver-count=3 \
  --authorization-mode=Node,RBAC \
  --bind-address=0.0.0.0 \
  --enable-swagger-ui=true \
  --etcd-servers=https://127.0.0.1:2379 \
  --event-ttl=1h \
  --runtime-config=api/all \
  --service-cluster-ip-range=10.32.0.0/24 \
  --service-node-port-range=30000-32767 \
  -v=2 \
  --basic-auth-file=user-details.csv
```

Below is a sample Kubernetes pod manifest for the kube-apiserver:

```
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - name: kube-apiserver
    image: k8s.gcr.io/kube-apiserver-amd64:v1.11.3
    command:
      - kube-apiserver
      - --authorization-mode=Node,RBAC
      - --advertise-address=172.17.0.107
      - --allow-privileged=true
      - --enable-admission-plugins=NodeRestriction
      - --enable-bootstrap-token-auth=true
      - --basic-auth-file=user-details.csv
```

### Static Token File Example

Similarly, authentication can be performed using a static token file. The CSV format is nearly identical, except that the password is replaced with a token. For instance, your `user-token-details.csv` might contain:

```
KpjCVbI7cFAHYPkByTIzRb7gulcUc4B,user10,u0010,group1
rJjncHmvtXHc6MlWQddhtvNyvhgTdXSC,user11,u0011,group1
mjpOFTEiF0kL9toikaRNTt59ePtczZSq,user12,u0012,group2
PG41IXhs7QjqWkmBkgvGT9gIoyUqZiJ,user13,u0013,group2
```

Start the kube-apiserver with the token file option:

```
kube-apiserver --token-auth-file=user-token-details.csv
```

When sending requests with token authentication, include the token in the header. For example:

```
curl -v -k https://master-node-ip:6443/api/v1/pods --header "Authorization: Bearer KpjCVbI7cFAHYPkByTIzRb7gulcUc4B"
```

![The image illustrates Kubernetes authentication mechanisms, including static password files, static token files, certificates, and identity services, related to the kube-apiserver.](https://kodekloud.com/kk-media/image/upload/v1752871334/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authentication/frame_180.jpg)

> [!important]
> **Note**
>
> Storing usernames, passwords, and tokens in plain text is inherently insecure. In production environments, consider using certificate-based authentication or integrating with trusted third-party identity providers.

![The image contains a note advising against a certain authentication mechanism, suggesting volume mount consideration, and setting up role-based authorization for new users in kubeadm.](https://kodekloud.com/kk-media/image/upload/v1752871335/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Authentication/frame_290.jpg)

> [!important]
> **Warning**
>
> When configuring your cluster using kubeadm, ensure that authentication files are securely mounted as volumes, and deploy appropriate authorization policies for any new users to protect your cluster from unauthorized access.

This lesson covered the use of static password and token file mechanisms to authenticate requests made to Kubernetes. In upcoming sections, we will explore certificate-based authentication in detail and discuss how Kubernetes leverages certificates to secure communication between its components.

For additional information on Kubernetes authentication and security best practices, please visit the following resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/6008a4f2-b1c3-4739-b9d4-4a112e75db86)**
>
> Watch video content
