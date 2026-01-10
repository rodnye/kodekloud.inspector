# Worker Node Failure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Troubleshooting/Worker-Node-Failure)

---

## Table of Contents

- Worker Node Failure
  - 1. Check Node Status
  - 2. Validate Node Operation and Kubelet Health
  - 3. Verify Kubelet Certificates
  - Conclusion
  - Watch Video
  - Practice Lab
    - Check the Kubelet Service Status
    - Inspect Kubelet Logs

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Troubleshooting

# Worker Node Failure

In this article, we explore various techniques to troubleshoot worker node failures within a Kubernetes cluster. Effective troubleshooting involves checking node status, examining detailed node conditions, and diagnosing issues with the kubelet service and its certificates.

## 1\. Check Node Status

Begin by verifying the status of the nodes in your cluster. Use the following command to determine if nodes are reporting as Ready or NotReady:

```
kubectl get nodes
NAME       STATUS     ROLES     AGE   VERSION
worker-1   Ready      <none>    8d    v1.13.0
worker-2   NotReady   <none>    8d    v1.13.0
```

If a node is listed as NotReady, inspect its details using:

```
kubectl describe node worker-1
```

This command produces an output with various conditions, such as OutOfDisk, MemoryPressure, DiskPressure, PIDPressure, and Ready. Each condition will have a status of true or false that helps pinpoint issues. For example, if disk space is insufficient, the OutOfDisk flag will be set to true; if there is low memory, the MemoryPressure flag will reflect that.

> [!important]
> **Tip**
>
> Always review the "LastHeartbeatTime" field. It indicates when a node last communicated with the master, which can provide insights if a node has unexpectedly gone down.

## 2\. Validate Node Operation and Kubelet Health

After confirming any node issues, verify if the node itself is operational. Check the node’s CPU, memory, and disk usage, review the kubelet status, inspect its logs, and ensure that the kubelet certificates are valid and correctly issued by the proper Certificate Authority (CA).

### Check the Kubelet Service Status

Run the following command to check the status of the kubelet service:

```
service kubelet status
```

Example output:

```
● kubelet.service - Kubernetes Kubelet
   Loaded: loaded (/etc/systemd/system/kubelet.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2019-03-20 14:22:06 UTC; 1 weeks 1 days ago
   Docs: https://github.com/kubernetes/kubernetes
 Main PID: 1281 (kubelet)
   Tasks: 24 (limit: 1152)
```

### Inspect Kubelet Logs

For further diagnosis, view the kubelet logs with:

```
sudo journalctl -u kubelet
```

An example segment of the logs may look like:

```
-- Logs begin at Wed 2019-03-20 05:30:37 UTC, end at Mon 2019-04-01 14:42:42 UTC. --
Mar 20 08:12:59 worker-1 systemd[1]: Started Kubernetes Kubelet.
Mar 20 08:12:59 worker-1 kubelet[18926]: Flag --tls-cert-file has been deprecated, This parameter should be set via the config file specified by the Kubelet
Mar 20 08:12:59 worker-1 kubelet[18926]: Flag --tls-private-key-file has been deprecated, This parameter should be set via the config file specified by the
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.915179   18926 flags.go:33] FLAG: --address="0.0.0.0"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.918149   18926 flags.go:33] FLAG: --allow-privileged="true"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.918339   18926 flags.go:33] FLAG: --allowed-unsafe-sysctls="[]"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.918520   18926 flags.go:33] FLAG: --alsologtostderr="false"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.918621   18926 flags.go:33] FLAG: --anonymous-auth="true"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.918740   18926 flags.go:33] FLAG: --application-metrics-count-limit="100"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919874   18926 flags.go:33] FLAG: --authentication-token-webhook="false"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919929   18926 flags.go:33] FLAG: --authentication-token-webhook-cache-ttl="2m0s"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919946   18926 flags.go:33] FLAG: --authorization-mode="AlwaysAllow"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919948   18926 flags.go:33] FLAG: --authorization-webhook-cache-authorized-ttl="5m0s"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919950   18926 flags.go:33] FLAG: --authorization-webhook-cache-unauthorized-ttl="30s"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.919958   18926 flags.go:33] FLAG: --azure-container-registry-config=""
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.920160   18926 flags.go:33] FLAG: --boot-id-file="/proc/sys/kernel/random/boot_id"
Mar 20 08:12:59 worker-1 kubelet[18926]: I0320 08:12:59.920172   18926 flags.go:33] FLAG: --bootstrap-checkpoint-path=""
```

## 3\. Verify Kubelet Certificates

Ensuring that the kubelet certificates are valid and correctly issued is crucial. Use the following command to inspect a kubelet certificate:

```
openssl x509 -in /var/lib/kubelet/worker-1.crt -text
```

A valid certificate should display details such as:

```
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            ff:e0:23:9d:fc:78:03:35
    Signature Algorithm: sha256WithRSAEncryption
    Issuer: CN = KUBERNETES-CA
    Validity
        Not Before: Mar 20 08:09:29 2019 GMT
        Not After : Apr 19 08:09:29 2019 GMT
    Subject: CN = system:node:worker-1, O = system:nodes
    Subject Public Key Info:
        Public Key Algorithm: rsaEncryption
        Public-Key: (2048 bit)
        ...
```

> [!important]
> **Attention**
>
> Be sure that the certificate is issued by the correct CA and that none of the certificate parameters (e.g., validity period) indicate an impending or current issue.

## Conclusion

By following the steps outlined above, you can efficiently troubleshoot worker node failures in your Kubernetes cluster. Regularly monitoring node conditions, validating the health of the kubelet service, and ensuring certificate integrity will help maintain a stable and robust cluster operation.

For further learning, consider exploring additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

Happy troubleshooting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/aff99955-65fd-443e-950f-3b25d3311bc2/lesson/b7dfc80e-01ff-4084-9047-9ab2b697df5e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/aff99955-65fd-443e-950f-3b25d3311bc2/lesson/f692788a-6a6b-4ecd-b66a-85653e18f3dc)**
>
> Practice lab
