# Use Audit Logs to monitor access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Use-Audit-Logs-to-monitor-access)

---

## Table of Contents

- Use Audit Logs to monitor access
  - Request Lifecycle Stages
  - Creating an Audit Policy
  - Enabling Audit Logging in kube-apiserver
  - Testing the Audit Policy
  - Watch Video
  - Practice Lab

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Use Audit Logs to monitor access

In this lesson, you will learn how to audit events in a Kubernetes cluster, providing insight into what happens inside the cluster. Previously, we explored Falco’s ability to detect suspicious activities—such as when a shell is spawned inside a container or sensitive files are accessed. Now, we focus on auditing and monitoring Kubernetes events to track cluster operations effectively.

Consider the following example output from Falco while monitoring the Kubernetes cluster:

```
kubectl logs -f falco-6t2dd
22:57:09.163982780: Notice A shell was spawned in a container with an attached terminal (user=root user_loginuid=-1 k8s.ns=default k8s.pod=nginx container=c73d9fc1a75d shell=bash parent=runc cmdline=bash terminal=34816 container_id=c73d9fc1a75d image=nginx) k8s.ns=default k8s.pod=nginx
23:09:03.279503809: Warning Sensitive file opened for reading by non-trusted program (user=root user_loginuid=-1 program=cat command=cat /etc/shadow file=/etc/shadow parent=bash gparent=runc ggrandparent=containerd-shim gggparent=containerd-shim container_id=c73d9fc1a75d image=nginx) k8s.ns=default k8s.pod=nginx container=c73d9fc1a75d
```

The logs include key details such as the objects created or modified, the identity of the requester, the namespace involved, and the entry point of the request. In Kubernetes, these details are known as events. Auditing these events is crucial for detecting abnormal or potentially suspicious operations. While Kubernetes supports auditing by default through the kube-apiserver, this feature is disabled until you explicitly enable it via proper configuration.

> [!important]
> **Key Concept**
>
> Each stage of the request lifecycle in Kubernetes generates events, allowing you to track operations in detail.

## Request Lifecycle Stages

Before enabling auditing, it is important to understand the stages that a request undergoes in Kubernetes:

1.  **Request Received:**  
    When you send a request (for example, creating a new Nginx pod), it first reaches the kube-apiserver.  
    Example:

    ```
    kubectl run nginx --image nginx
    ```

2.  **Request Recorded:**  
    As soon as the kube-apiserver receives the request, it enters the "request received" stage and an event is generated, irrespective of the request’s validity.
3.  **Response Started:**  
    If the request passes authentication, validation, and authorization successfully, a "response started" event is generated. This is particularly useful for long-running requests, such as when using the `--watch` flag to continuously observe object states.
4.  **Response Complete:**  
    Once the request is successfully processed, the response body is sent and a "response complete" event is generated.
5.  **Panic Stage:**  
    If an error occurs or the request is invalid, it enters a "panic" stage.

While each of these stages generates events, saving every event might lead to an overwhelming number of logs. In practice, you may only choose to record specific events, such as logging pod deletions in the production namespace.

## Creating an Audit Policy

Selective auditing is achieved by defining an audit policy that contains rules for the kube-apiserver. The audit policy configuration file uses the API version `audit.k8s.io/v1` and is structured into two main sections: `omitStages` and `rules`. The `omitStages` section is optional and specifies which stages should not generate audit events.

Below is an example of an audit policy file that captures only the deletion of a specific pod in the production namespace:

```
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages: ["RequestReceived"]
rules:
  - level: RequestResponse
    namespaces: ["prod-namespace"]
    verbs: ["delete"]
    resources:
      - group: ""
        resources: ["pods"]
        resourceNames: ["webapp-pod"]
```

In this policy:

- The `omitStages` section excludes events generated during the `RequestReceived` stage.
- Under `rules`, only the `delete` operation for the pod named "webapp-pod" in the `prod-namespace` will be logged.
- The logging `level` is set to `RequestResponse`, meaning both the request and response bodies are included in the audit log. Other levels include `None` (no logging) and `Metadata` (logging only select metadata such as timestamps and operation details).

To audit all actions on a resource—for example, monitoring all operations on secrets across all namespaces—omit the `verbs` or `namespaces` fields so that the policy applies broadly.

## Enabling Audit Logging in kube-apiserver

By default, audit logging is disabled. To enable it, configure an audit backend. For Kubernetes version 1.20 and later, two audit backends are supported:

1.  **Log Backend:** Writes audit events to a file on the master node.
2.  **Webhook Backend:** Sends audit events to a remote service (for example, a Falco service).

This lesson covers the configuration of the log audit backend. To enable it, pass several flags to the kube-apiserver:

- `--audit-log-path`: Specifies the file path for storing audit logs (e.g., `/var/log/k8-audit.log`).
- `--audit-policy-file`: Specifies the absolute path to your audit policy file.
- `--audit-log-maxage`: Defines the maximum number of days to retain old audit logs.
- `--audit-log-maxbackup`: Sets the maximum number of audit log files to retain.
- `--audit-log-maxsize`: Determines the maximum size (in megabytes) of the audit log file before rotation.

For a kubeadm-based setup, update the static pod definition of the kube-apiserver as shown below:

```
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  name: kube-apiserver
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-apiserver
    - --authorization-mode=Node,RBAC
    - --advertise-address=172.17.0.107
    - --allow-privileged=true
    - --enable-bootstrap-token-auth=true
    - --audit-log-path=/var/log/k8-audit.log
    - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
    - --audit-log-maxage=10
    - --audit-log-maxbackup=5
```

If your kube-apiserver is deployed as a service, add these flags to the service unit file on the host. An example of an ExecStart command with these flags is shown below:

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
    --audit-log-path=/var/log/k8-audit.log \
    --audit-policy-file=/etc/kubernetes/audit-policy.yaml \
    --audit-log-maxage=10 \
    --audit-log-maxbackup=5
```

After updating the configuration, save the pod definition or restart the kube-apiserver service to enable audit logging in your Kubernetes cluster.

## Testing the Audit Policy

Once audit logging is enabled and your audit policy is configured, test it by deleting the specified pod (if it exists) in the production namespace. For instance, deleting the pod "webapp-pod" should generate an audit event, which will be recorded in the audit log.

Below is an example of a minimal audit policy that logs `Metadata` for the delete operation on pods in the production namespace:

```
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
rules:
  - level: Metadata
    namespaces: ["prod-namespace"]
    verbs: ["delete"]
    resources:
      - group: ""
        resources: ["pods"]
```

A sample audit log event captured as JSON might look like this:

```
{"kind":"Event","apiVersion":"audit.k8s.io/v1","level":"Metadata","auditID":"da2ad1a3-df15-4b10-a44d-79e73d7ec3c0","stage":"ResponseComplete","requestURI":"/api/v1/namespaces/prod-namespace/pods/webapp-pod","verb":"delete","user":{"username":"kubernetes-admin","groups":["system:masters","system:authenticated"]},"sourceIPs":["172.17.0.36"],"userAgent":"kubectl/v1.19.0 (linux/amd64) kubernetes/e199641","objectRef":{"resource":"pods","namespace":"prod-namespace","name":"webapp-pod","apiVersion":"v1"},"responseStatus":{"metadata":{},"code":200},"requestReceivedTimestamp":"2021-04-12T05:15:24.182178Z","stageTimestamp":""}
```

This confirms that your audit policies are working as expected and that only the specified events are being recorded.

> [!important]
> **Next Steps**
>
> To further reinforce your understanding, try practicing with exercises on auditing Kubernetes clusters and explore [Kubernetes Documentation](https://kubernetes.io/docs/) for additional insights.

That concludes this lesson on using audit logs to monitor access in your Kubernetes clusters. Happy auditing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/08491b99-62f6-47dd-be0a-034e935c961f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/b1d71742-71c2-48d8-850b-d0e5625c990e)**
>
> Practice lab
