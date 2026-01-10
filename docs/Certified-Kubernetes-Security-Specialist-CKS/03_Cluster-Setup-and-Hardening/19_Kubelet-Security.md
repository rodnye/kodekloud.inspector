# Kubelet Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Kubelet-Security)

---

## Table of Contents

- Kubelet Security
  - Installing the Kubelet
  - Kubelet Security
  - Summary
  - Watch Video
  - Practice Lab
    - Securing the Kubelet
      - 1. Disabling Anonymous Authentication
      - 2. Certificate-Based Authentication
      - 3. Authorization
      - 4. Managing the Read-Only Port (10255)

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Kubelet Security

In this lesson, we revisit the Kubelet and examine multiple approaches for its configuration and hardening on Kubernetes nodes. In the [CKA Certification Course - Certified Kubernetes Administrator](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator), the Kubelet is compared to a ship’s captain. Much like a captain, it handles onboard operations, manages paperwork to join the cluster, and communicates regularly with the master control. It also loads or unloads containers as instructed by the scheduler and sends continuous status reports.

However, a significant security risk arises if an impersonator masquerades as the master, potentially exposing sensitive information about cargo such as its quantity, content, and destination. Therefore, protecting all communications between the master (kube-apiserver) and the Kubelet is essential.

The Kubelet registers its node with the Kubernetes cluster and, upon receiving commands to deploy a container or pod, delegates tasks to the container runtime (for example, Docker). It then continuously monitors the pod and container states, reporting their status back to the kube-apiserver.

---

## Installing the Kubelet

Traditionally, installing the Kubelet involved manually downloading its binary and configuring it as a service. When using the `kubeadm` tool for cluster deployment, the necessary binaries are downloaded automatically, and the cluster is bootstrapped for you. However, you must still install the Kubelet on each worker node manually.

Below is an example of installing the Kubelet and setting up its service:

```
wget https://storage.googleapis.com/kubernetes-release/release/v1.20.0/bin/linux/amd64/kubelet
```

```
# kubelet.service file snippet
ExecStart=/usr/local/bin/kubelet \\
  --container-runtime=docker \\
  --image-pull-progress-deadline=2m \\
  --kubeconfig=/var/lib/kubelet/kubeconfig \\
  --network-plugin=cni \\
  --register-node=true \\
  --v=2 \\
  --cluster-domain=cluster.local \\
  --file-check-frequency=0s \\
  --healthz-port=10248 \\
  --cluster-dns=10.96.0.10 \\
  --http-check-frequency=0s \\
  --sync-frequency=0s \\
```

Starting with version 1.10, many parameters previously passed via command-line flags have been migrated into a dedicated Kubelet configuration file. This file, known as the Kubelet configuration, simplifies deployment and management.

Below is an updated example demonstrating how to configure the Kubelet service to use a remote container runtime:

```
wget https://storage.googleapis.com/kubernetes-release/release/v1.20.0/bin/linux/amd64/kubelet
```

```
# kubelet.service file snippet
[Unit]
Description=kubelet


[Service]
ExecStart=/usr/local/bin/kubelet \\
  --container-runtime=remote \\
  --image-pull-progress-deadline=2m \\
  --kubeconfig=/var/lib/kubelet/kubeconfig \\
  --network-plugin=cni \\
  --register-node=true \\
  -v=2 \\
  --cluster-domain=cluster.local \\
  --file-check-frequency=0s \\
  --healthz-port=10248 \\
  --cluster-dns=10.96.0.10 \\
  --http-check-frequency=0s \\
  --sync-frequency=0s
```

```
# kubelet-config.yaml file snippet
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
clusterDomain: cluster.local
fileCheckFrequency: 0s
healthzPort: 10248
clusterDNS:
  - 10.96.0.10
httpCheckFrequency: 0s
syncFrequency: 0s
```

When initiating the Kubelet service, specify the path to the configuration file using the `--config` flag. Notice that parameters are defined using camel case (e.g., `httpCheckFrequency`) rather than the command-line flag style (`http-check-frequency`). Also, note that if the same parameter is set in both the command line and the configuration file, the command-line value takes precedence.

> [!important]
> **Note**
>
> Although `kubeadm` does not install the Kubelet, it can manage Kubelet configuration files across worker nodes during the `kubeadm join` process.

To inspect the running Kubelet process and view its configuration settings, check the process details and the configuration file contents. For example:

```
ps -aux | grep kubelet
```

```
# Example output of /var/lib/kubelet/config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
clusterDNS:
- 10.96.0.10
clusterDomain: cluster.local
cpuManagerReconcilePeriod: 0s
evictionPressureTransitionPeriod: 0s
fileCheckFrequency: 0s
healthzBindAddress: 127.0.0.1
healthzPort: 10248
httpCheckFrequency: 0s
imageMinimumGCAge: 0s
kind: KubeletConfiguration
nodeStatusReportFrequency: 0s
nodeStatusUpdateFrequency: 0s
rotateCertificates: true
runtimeRequestTimeout: 0s
staticPodPath: /etc/kubernetes/manifests
streamingConnectionIdleTimeout: 0s
```

---

## Kubelet Security

Ensuring that the Kubelet only responds to authenticated requests from the kube-apiserver is critical for the security of your cluster. By default, the Kubelet serves on two distinct ports:

1.  **Port 10250:** Provides full API access.
2.  **Port 10255:** Offers a read-only API for metrics and system data.

By default, anonymous access is permitted to these APIs. For example, running the following command returns a list of pods running on a node:

![The image shows a table listing Kubelet ports 10250 and 10255, describing their API access levels: full access and unauthenticated read-only access, respectively.](https://kodekloud.com/kk-media/image/upload/v1752871367/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubelet-Security/frame_370.jpg)

```
curl -sk http://localhost:10250/pods
```

You can also access additional endpoints (e.g., `/logs/syslog`) for node system log inspection. The Kubelet API exposes multiple functions, including node health checks, metrics, port forwarding, and command execution in containers.

The service running on port 10255, however, provides unauthenticated, read-only access. This poses a security risk because anyone with network access could potentially view sensitive data.

---

### Securing the Kubelet

To enhance security, every request to the Kubelet must be properly authenticated and authorized before being processed.

#### 1\. Disabling Anonymous Authentication

By default, the Kubelet treats unauthenticated requests as anonymous, using the credentials `system:anonymous` and group `system:unauthenticated`. To disable anonymous access, update the Kubelet service configuration using the `--anonymous-auth=false` flag:

```
# kubelet.service snippet
ExecStart=/usr/local/bin/kubelet \\
...
--anonymous-auth=false \\
...
```

Alternatively, you can configure this setting within the Kubelet configuration YAML file:

```
# kubelet-config.yaml snippet
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
```

Disabling anonymous authentication is best practice. Once disabled, ensure you enable a supported authentication mechanism.

#### 2\. Certificate-Based Authentication

Certificate-based authentication provides secure access by using a pair of certificates. Configure the Kubelet to use the CA certificate with the `--client-ca-file` parameter in the service file or within the Kubelet configuration:

```
# kubelet.service snippet
ExecStart=/usr/local/bin/kubelet \\
    --client-ca-file=/path/to/ca.crt \\
```

```
# kubelet-config.yaml snippet
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  x509:
    clientCAFile: /path/to/ca.crt
```

When performing API calls (for example, with curl), include the client certificate and key since the kube-apiserver is treated as a client from the Kubelet’s perspective. Below is an example configuration for the kube-apiserver service:

```
# Example command lines and configuration snippets
ExecStart=/usr/local/bin/kubelet \\
    --client-ca-file=/path/to/ca.crt \\


curl -sk https://localhost:10250/pods/ --key kubelet-key.pem --cert kubelet-cert.pem


# Example kube-apiserver.service snippet
[Service]
ExecStart=/usr/local/bin/kube-apiserver \\
    --kubelet-client-certificate=/path/to/kubelet-cert.pem \\
    --kubelet-client-key=/path/to/kubelet-key.pem \\
```

> [!important]
> **Warning**
>
> If neither certificate-based nor token-based authentication explicitly rejects a request, the Kubelet will fallback to treating it as anonymous. Always ensure your authentication mechanisms are correctly configured.

#### 3\. Authorization

After authenticating requests, the Kubelet determines what actions or API resources a user can access. By default, the authorization mode is set to `AlwaysAllow`, meaning all requests are permitted. To secure the Kubelet, configure the authorization mode to `Webhook` so the Kubelet consults the API server to determine if a request should be allowed:

```
# kubelet.service snippet
ExecStart=/usr/local/bin/kubelet \\
  ...
  --authorization-mode=Webhook \\
  ...
```

```
# kubelet-config.yaml snippet
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authorization:
  mode: Webhook
```

#### 4\. Managing the Read-Only Port (10255)

The read-only port (10255) can expose sensitive metrics without authentication. It is advisable to disable this port if not explicitly needed. You can disable it by setting the port value to zero in either the service file or configuration file:

```
curl -sk http://localhost:10255/metrics
```

```
# kubelet.service snippet
ExecStart=/usr/local/bin/kubelet \\
  ...
  --read-only-port=10255 \\
  ...
```

```
# kubelet-config.yaml snippet
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
readOnlyPort: 0
```

Disabling the read-only port enhances security by preventing unauthorized access to node metrics and other system data.

---

## Summary

In this lesson, we reviewed critical aspects of securing the Kubelet:

- Disable anonymous authentication by setting `--anonymous-auth=false` or configuring it within the YAML file.
- Implement a secure authentication mechanism with certificate-based authentication by setting the `clientCAFile` parameter.
- Configure authorization using the `Webhook` mode so that the API server validates requests.
- Disable the read-only port (10255) by setting it to zero if unauthenticated access is not desired.

By applying these security measures, your Kubelet will be significantly more resilient to unauthorized access. Now, proceed to the labs and practice implementing Kubelet security in your Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/da297ecd-2762-48ed-9eb7-c6556bb9658d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/3d54f860-f552-48a2-8ac2-886bacd00893)**
>
> Practice lab
