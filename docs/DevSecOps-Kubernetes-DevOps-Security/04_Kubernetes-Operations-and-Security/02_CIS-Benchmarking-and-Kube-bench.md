# CIS Benchmarking and Kube bench - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/CIS-Benchmarking-and-Kube-bench)

---

## Table of Contents

- CIS Benchmarking and Kube bench
  - What Is the CIS Benchmark?
  - Introducing Kube-bench
  - 1. Running Kube-bench with Docker
  - 2. Installing and Running the Standalone Binary
  - 3. Filtering Checks & JSON Output
  - Comparison: Docker vs Standalone Binary
  - Links and References
  - Watch Video
    - Sample Output
    - Docker Example
    - Binary Example

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# CIS Benchmarking and Kube bench

In this guide, we’ll dive into **CIS Benchmarking** for Kubernetes and demonstrate how to use **Kube-bench** to validate your cluster’s security posture. You’ll learn:

- What the CIS Kubernetes Benchmark covers
- How to run Kube-bench via **Docker** or as a **standalone binary**
- Techniques for filtering checks and producing JSON output for CI/CD

## What Is the CIS Benchmark?

The Center for Internet Security (CIS) publishes **CIS Benchmarks**, which are consensus-driven best practices for securing various platforms. The [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) offers detailed recommendations for locking down a Kubernetes cluster by release version.

For fully managed offerings like GKE or EKS, use the cloud provider–specific benchmarks:

| Managed Service | Benchmark Link                                                                               |
| --------------- | -------------------------------------------------------------------------------------------- |
| GKE             | [CIS GKE Benchmark](https://www.cisecurity.org/benchmark/google_kubernetes_engine/)          |
| EKS             | [CIS EKS Benchmark](https://www.cisecurity.org/benchmark/amazon_elastic_kubernetes_service/) |

These child benchmarks inherit controls from the upstream CIS Kubernetes Benchmark, removing checks you can’t configure and adding provider-specific rules.

In this article, we focus on a **kubeadm**\-provisioned cluster using the upstream [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/).

## Introducing Kube-bench

[Kube-bench](https://github.com/aquasecurity/kube-bench) is an open-source tool written in Go that scans your Kubernetes nodes against the CIS Benchmark controls. It will output `PASS` or `FAIL` for each test, so you can quickly identify misconfigurations.

You can execute Kube-bench in two primary ways:

1.  **Docker container**
2.  **Standalone binary**

> [!important]
> **Note**
>
> Always match the `--version` flag to your Kubernetes release. Mismatched versions may yield incorrect results.

---

## 1\. Running Kube-bench with Docker

Using Docker is the quickest method since it requires no local installation. Mount your host’s `/etc` and `/var` directories so Kube-bench inside the container can read necessary config files.

```
docker run --rm \
  --pid host \
  -v /etc:/etc:ro \
  -v /var:/var:ro \
  -t aquasec/kube-bench:latest master --version 1.19
```

| Option            | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `--pid host`      | Grants the container access to host process information.                                                    |
| `-v /etc:/etc:ro` | Mounts host `/etc` in read-only mode (for kubelet and control plane configs).                               |
| `-v /var:/var:ro` | Mounts host `/var` in read-only mode (for runtime data).                                                    |
| `master`          | Runs checks for the master node. You can also specify `node`, `etcd`, `scheduler`, or `controller-manager`. |
| `--version 1.19`  | Targets the CIS Benchmark for Kubernetes v1.19.                                                             |

> [!important]
> **Warning**
>
> Ensure your Docker user has permission to mount `/etc` and `/var`. Running as root or with `sudo` may be required.

### Sample Output

```
1 Master Node Security Configuration
[INFO] 1.1 API Server
[FAIL] 1.1.1 Ensure that the --allow-privileged argument is set to false (Scored)
[FAIL] 1.1.2 Ensure that the --anonymous-auth argument is set to false (Scored)
[PASS] 1.1.4 Ensure that the --insecure-allow-any-token argument is not set (Scored)
…
[FAIL] 1.1.21 Ensure that the --kubelet-certificate-authority argument is set as appropriate (Scored)
```

---

## 2\. Installing and Running the Standalone Binary

If you prefer not to use Docker, download the latest Kube-bench release, extract it, and place the binary in your `PATH`:

```
# Download and extract for Linux (amd64)
curl -L https://github.com/aquasecurity/kube-bench/releases/latest/download/kube-bench_$(uname -s)_amd64.tar.gz | tar xz

# Move the executable into your PATH
sudo mv kube-bench /usr/local/bin/
```

Then run:

```
kube-bench master --version 1.15
```

---

## 3\. Filtering Checks & JSON Output

To focus on specific controls or integrate results into CI/CD workflows, use the `--check` and `--json` flags.

### Docker Example

```
docker run --rm \
  --pid host \
  -v /etc:/etc:ro \
  -v /var:/var:ro \
  -t aquasec/kube-bench:latest master \
  --version 1.19 \
  --check 1.2.7,1.2.8,1.2.9 \
  --json
```

### Binary Example

```
kube-bench master \
  --version 1.15 \
  --check 1.2.7,1.2.8,1.2.9 \
  --json
```

The resulting JSON can be parsed to enforce compliance gates in your automation pipelines.

---

## Comparison: Docker vs Standalone Binary

| Aspect     | Docker                        | Standalone Binary                     |
| ---------- | ----------------------------- | ------------------------------------- |
| Setup      | No installation required      | Requires download and `mv` to `PATH`  |
| Isolation  | Fully containerized           | Runs directly on host                 |
| Versioning | Image tag (e.g., `latest`)    | Explicit download of specific release |
| Use Case   | Quick audits, ephemeral scans | Persistent, on-host integrations      |

---

## Links and References

- [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/)
- [CIS GKE Benchmark](https://www.cisecurity.org/benchmark/google_kubernetes_engine/)
- [CIS EKS Benchmark](https://www.cisecurity.org/benchmark/amazon_elastic_kubernetes_service/)
- [Kube-bench on GitHub](https://github.com/aquasecurity/kube-bench)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/4f92306b-dac3-4d34-acda-abcaad1ddbfc)**
>
> Watch video content
