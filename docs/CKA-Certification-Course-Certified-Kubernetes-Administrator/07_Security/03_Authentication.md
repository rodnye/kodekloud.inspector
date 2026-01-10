# Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Authentication)

---

## Table of Contents

- Authentication
  - Basic Authentication Using Static Password Files
  - Token-Based Authentication Using Static Token Files
  - Security Considerations
  - Next Steps
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Authentication

Welcome to this detailed guide on authentication within a Kubernetes cluster. In this article, we explain how to secure cluster access using various authentication mechanisms. Within a Kubernetes environment, there are different types of users:

- Human Users: Administrators and developers who perform administrative tasks and deploy applications.
- Service Accounts: Robot users that represent processes, services, or third-party applications.

> > [!important]
> > **Important Note**
> >
> > End-user application security is managed internally by the deployed applications. The focus here is solely on administrative access to the cluster.

Kubernetes does not manage human user accounts natively. Instead, it relies on external systems such as static files containing user credentials, certificates, or third-party identity services (e.g., LDAP, Kerberos) for authentication. Every request—whether from the kubectl command-line tool or direct API calls—is processed by the Kubernetes API server, which authenticates the incoming requests using one or more available authentication mechanisms.

---

## Basic Authentication Using Static Password Files

One simple method for authentication is using a static password file. This CSV file contains user details and is structured with three columns: password, username, and user ID. An optional fourth column can be added to assign users to specific groups.

Start the API server with the following parameter:

```
kube-apiserver --basic-auth-file=user-details.csv
```

Below is an example of a basic authentication CSV file (`user-details.csv`):

```
password123,user1,u0001
password123,user2,u0002
password123,user3,u0003
password123,user4,u0004
password123,user5,u0005
```

![The image illustrates authentication mechanisms for "kube-apiserver," including static password files, static token files, certificates, and identity services.](https://kodekloud.com/kk-media/image/upload/v1752869925/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Authentication/frame_180.jpg)

---

## Token-Based Authentication Using Static Token Files

Alternatively, you can authenticate using a static token file. This file includes a token, username, user ID, and an optional group assignment. Once created, you can start the API server by passing the token file with the `--token-auth-file` option:

Example token authentication CSV file (`user-token-details.csv`):

```
KpjCVbI7cFAHYPkByTIzRb7gulcUc4B,user10,u0010,group1
rJjncHmvtXHc6MlWQddhtvNyyhgTdxSC,user11,u0011,group1
mjpoFTEiFOkL9toikaRNTt59ePtczZSq,user12,u0012,group2
PG41IXhs7QjqWkmBkvGT9gclOyUqZj,user13,u0013,group2
```

Start the API server with the token file:

```
kube-apiserver --token-auth-file=user-token-details.csv
```

When making API requests, include the token as an authorization bearer token. For example:

```
curl -v -k https://master-node-ip:6443/api/v1/pods --header "Authorization: Bearer KpjCVbI7cFAHYPkByTIzRb7gulcUc4B"
```

---

## Security Considerations

> > [!important]
> > **Security Warning**
> >
> > It is not recommended to use static files to store usernames, passwords, and tokens in plain text in production environments. Consider certificate-based authentication or integrating with external identity providers for enhanced security.

If you are configuring your cluster using kubeadm, ensure that you update the API server pod definition to mount the authentication file as a volume and then restart the API server. After authentication is in place, implement authorization (e.g., role-based access control) to ensure correct user permissions within the cluster.

![The image contains a note advising against a certain authentication mechanism, suggesting volume mount consideration, and setting up role-based authorization for new users in kubeadm.](https://kodekloud.com/kk-media/image/upload/v1752869926/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Authentication/frame_300.jpg)

---

## Next Steps

In upcoming articles, we will discuss certificate-based authentication and additional methods to secure communication within your Kubernetes cluster.

For further reading and more detailed documentation, consider visiting the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

With these authentication mechanisms in mind, you can make more informed decisions when securing your Kubernetes environment. Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/011ca8e1-16dc-443b-9501-a2b68d92501e)**
>
> Watch video content
