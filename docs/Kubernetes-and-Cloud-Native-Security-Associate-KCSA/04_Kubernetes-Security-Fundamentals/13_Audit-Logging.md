# Audit Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Audit-Logging)

---

## Table of Contents

- Audit Logging
  - Why Audit Logging Matters
  - Viewing Falco Alerts
  - Kubernetes API Server Request Stages
  - Defining an Audit Policy
  - Enabling Audit Logging
  - Verifying Audit Logs
  - References
  - Watch Video
  - Practice Lab
    - Audit Levels
    - Example: Log Pod Deletions in Production
    - kubeadm-based Clusters
    - systemd-based API Server

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Audit Logging

Audit logging in Kubernetes captures detailed records of all API server requests, helping you detect suspicious or unauthorized activities within your cluster. By defining audit policies, you can control which events to log, reducing noise and focusing on critical operations.

> [!important]
> **Note**
>
> Audit logging is disabled by default in Kubernetes. Enabling it requires configuring the API server to use an audit policy and log backend.

## Why Audit Logging Matters

- **Security:** Track changes and identify unauthorized access.
- **Compliance:** Maintain an immutable record of user actions.
- **Troubleshooting:** Correlate events with incidents for diagnostics.

## Viewing Falco Alerts

Before diving into Kubernetes-native auditing, you might already be using Falco to detect suspicious container activities. For example:

```
kubectl logs -f falco-6t2dd
# Sample Falco output:
22:57:09.163982780: Notice A shell was spawned in a container ...
23:09:03.279503809: Warning Sensitive file opened for reading ...
```

These alerts complement Kubernetes audit logs by surfacing container-level anomalies.

## Kubernetes API Server Request Stages

Every API request flows through the server in four logical stages. You can choose to log specific stages via your audit policy:

| Stage            | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| RequestReceived  | Recorded immediately upon receipt, before authn/authz.                           |
| ResponseStarted  | Emitted when the server begins processing long-running requests (e.g., `watch`). |
| ResponseComplete | Logged after the response is sent to the client.                                 |
| Panic            | Captures internal server errors or panics during request handling.               |

## Defining an Audit Policy

An audit policy is a YAML file that specifies which events to include or omit. Start with a minimal policy:

```
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
rules:
  # Define your rules here
```

- `omitStages`: Skip logging for specified stages (optional).
- `rules`: A list of match conditions and the `level` of logging.

### Audit Levels

| Level           | Captured Data                            |
| --------------- | ---------------------------------------- |
| None            | Do not log the event.                    |
| Metadata        | Timestamps, user, verb, resource, etc.   |
| Request         | Metadata + request body.                 |
| RequestResponse | Metadata + request body + response body. |

### Example: Log Pod Deletions in Production

This policy logs only DELETE operations on the Pod `webapp-pod` in `prod-namespace` at the full request/response level:

```
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
rules:
  - level: RequestResponse
    verbs:
      - delete
    namespaces:
      - prod-namespace
    resources:
      - groups: ""
        resources:
          - pods
        resourceNames:
          - webapp-pod
```

You can add another rule to capture all secret-related operations at the Metadata level:

```
  - level: Metadata
    resources:
      - groups: ""
        resources:
          - secrets
```

## Enabling Audit Logging

To activate auditing, point your API server to the audit policy and log file:

### kubeadm-based Clusters

Edit the static pod manifest `/etc/kubernetes/manifests/kube-apiserver.yaml`:

```
spec:
  containers:
    - name: kube-apiserver
      command:
        - kube-apiserver
        # ...
        - --audit-policy-file=/etc/kubernetes/audit-policy.yaml
        - --audit-log-path=/var/log/k8s-audit.log
        - --audit-log-maxage=10
        - --audit-log-maxbackup=5
        - --audit-log-maxsize=100
```

### systemd-based API Server

Add the same flags to the service unit file under the `ExecStart` section.

- `--audit-policy-file`: Path to your YAML policy
- `--audit-log-path`: Destination for audit logs
- `--audit-log-maxage`: Retention days for old logs
- `--audit-log-maxbackup`: Number of rotated files to keep
- `--audit-log-maxsize`: Max size (MB) before rotation

After updating, restart the API server to apply changes.

## Verifying Audit Logs

Delete the target Pod to generate an audit entry:

```
kubectl delete pod webapp-pod -n prod-namespace
```

Inspect the logs:

```
tail /var/log/k8s-audit.log
```

You should see a `delete` event for `webapp-pod` in `prod-namespace`.

> [!important]
> **Tip**
>
> Use `kubectl apply -f audit-policy.yaml` to update your policy dynamically and trigger events for testing.

---

## References

- [Kubernetes Audit Documentation](https://kubernetes.io/docs/tasks/debug-application-cluster/audit/)
- [Falco Security Monitoring](https://falco.org/docs/)
- [API Server Command-Line Flags](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/c3b4f553-f11b-4575-9326-5181c4ad914e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/b2419d37-95cc-40d0-9fa4-54400aacf84f)**
>
> Practice lab
