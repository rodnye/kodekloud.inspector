# Demo Kube bench - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Kube-bench)

---

## Table of Contents

- Demo Kube bench
  - CIS Kubernetes Benchmark PDF
  - Manual Check: Kubelet Anonymous Auth
  - Installing kube-bench
  - Running kube-bench
  - JSON Output and Filtering
  - Jenkins Integration
  - Conclusion
  - References
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Kube bench

In this lesson, we’ll use **kube-bench** to run the [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) tests against your cluster. We’ll cover:

- Overview of the CIS Benchmark PDF
- Manual Kubelet anonymous-auth check
- Installing and running kube-bench
- Parsing JSON output with `jq`
- CI/CD integration with Jenkins

## CIS Kubernetes Benchmark PDF

Download the official CIS Kubernetes Benchmark from the CIS website:  
[CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) requires an email to access the PDF.

> [!important]
> **Note**
>
> The PDF contains ~270 pages of guidelines, organized by test IDs per component. For instance, **4.2.1** in _Worker Node Security Configuration_ verifies `--anonymous-auth=false`.

![The image shows a webpage for CIS Benchmarks focused on securing Kubernetes, offering a download link for the latest security guidelines. It includes a brief description and links to additional resources and community information.](https://kodekloud.com/kk-media/image/upload/v1752873756/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/cis-benchmarks-kubernetes-security-guidelines.jpg)

After downloading, open the PDF to review sections such as Terms of Use, Overview, and Recommendations.

![The image shows a computer screen displaying a PDF document titled "CIS Kubernetes Benchmark v1.6.0" with a table of contents visible. The document appears to be open in a PDF viewer, and the table of contents lists sections such as Terms of Use, Overview, and Recommendations.](https://kodekloud.com/kk-media/image/upload/v1752873757/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/cis-kubernetes-benchmark-pdf-viewer.jpg)

## Manual Check: Kubelet Anonymous Auth

On a kubeadm-provisioned node, verify the running Kubelet process and its config file:

```
# Identify the kubelet process
ps -ef | grep kubelet

# Display the Kubelet configuration
cat /var/lib/kubelet/config.yaml
```

In `config.yaml`, confirm `anonymous` auth is disabled:

```
authentication:
  anonymous:
    enabled: false
```

> [!important]
> **Warning**
>
> If anonymous auth is set to `true`, update the YAML, then reload and restart the service:
>
> ```
> sudo systemctl daemon-reload
> sudo systemctl restart kubelet
> ```

## Installing kube-bench

[kube-bench on GitHub](https://github.com/aquasecurity/kube-bench) is a Go-based tool from Aqua Security that automates CIS checks. To install on Ubuntu:

![The image shows a GitHub page for the "kube-bench" project, which is a Go application for checking Kubernetes security compliance. It includes details like release version, downloads, and a brief description of the tool.](https://kodekloud.com/kk-media/image/upload/v1752873758/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/kube-bench-github-page-security-compliance.jpg)

```
# Download the latest .deb package (version may vary)
curl -L -O https://github.com/aquasecurity/kube-bench/releases/download/v0.3.1/kube-bench_0.3.1_linux_amd64.deb

# Install kube-bench
sudo apt install ./kube-bench_0.3.1_linux_amd64.deb -y
```

## Running kube-bench

Execute all CIS checks (master, node, etcd, control plane):

```
kube-bench
```

Example summary:

```
== Summary ==
   42 checks PASS
    3 checks FAIL
   24 checks WARN
    0 checks INFO
```

![The image shows a terminal window displaying a security configuration summary for a Kubernetes worker node, with various checks marked as PASS, FAIL, or WARN. The interface appears to be from a remote connection tool, with a sidebar listing files and directories.](https://kodekloud.com/kk-media/image/upload/v1752873760/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/kubernetes-worker-node-security-summary.jpg)

You can target specific components:

| Component | Command             | Description                           |
| --------- | ------------------- | ------------------------------------- |
| All       | `kube-bench`        | Run all CIS checks                    |
| Master    | `kube-bench master` | Validate control plane configurations |
| Node      | `kube-bench node`   | Inspect worker node settings          |
| Etcd      | `kube-bench etcd`   | Check etcd data store security        |

```
# Run checks on the master node
kube-bench master

# Run checks on worker nodes
kube-bench node
```

![The image shows a terminal window with instructions for editing Kubernetes configuration files, including encryption and pod specifications. It also displays a summary of checks with pass, fail, and warning statuses.](https://kodekloud.com/kk-media/image/upload/v1752873761/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/kubernetes-configuration-terminal-instructions.jpg)

## JSON Output and Filtering

For CI automation, output results in JSON and use `jq` to filter:

```
kube-bench node --check 4.2.1 --json | jq
```

```
{
  "id": "4",
  "version": "1.5",
  "text": "Worker Node Security Configuration",
  "node_type": "node",
  "tests": [
    {
      "section": "4.2",
      "pass": 1,
      "fail": 0,
      "info": 0,
      "desc": "Kubelet",
      "results": [
        {
          "test_number": "4.2.1",
          "test_desc": "Ensure that the --anonymous-auth argument is set to false (Scored)",
          "status": "PASS",
          "remediation": "If using a Kubelet config file, edit the file to set authentication: anonymous: enabled to false..."
        }
      ]
    }
  ]
}
```

To extract failure count:

```
total_fail=$(kube-bench node --check 4.2.1 --json | jq '.[].total_fail')
echo "Total fails: $total_fail"
```

![The image shows a terminal window with a list of security checks for a Kubernetes environment, indicating pass, warn, and fail statuses for each check. The interface appears to be part of a remote monitoring tool.](https://kodekloud.com/kk-media/image/upload/v1752873762/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Kube-bench/kubernetes-security-checks-terminal-window.jpg)

> [!important]
> **Note**
>
> Ensure `jq` is installed (`sudo apt install jq`) to parse JSON output.

## Jenkins Integration

Integrate kube-bench into a Jenkins pipeline to enforce CIS compliance:

```
stage('K8S CIS Benchmark') {
  steps {
    script {
      parallel(
        'Master': {
          sh 'bash cis-master.sh'
        },
        'Etcd': {
          sh 'bash cis-etcd.sh'
        },
        'Kubelet': {
          sh 'bash cis-kubelet.sh'
        }
      )
    }
  }
}
```

Each script runs targeted checks, parses JSON, and exits with code `1` on failures. Example `cis-kubelet.sh`:

```
#!/bin/bash

# Run specific Kubelet tests
total_fail=$(kube-bench node \
  --version 1.15 \
  --check 4.2.1,4.2.2 \
  --json | jq -r '.[].total_fail')

if [[ "$total_fail" -ne 0 ]]; then
  echo "CIS Benchmark Failed: Kubelet checks 4.2.1,4.2.2"
  exit 1
else
  echo "CIS Benchmark Passed: Kubelet checks 4.2.1,4.2.2"
fi
```

Repeat similar scripts for `cis-master.sh` (e.g., checks 1.1.12, 1.2.1) and `cis-etcd.sh` (e.g., check 2.2).

> [!important]
> **Warning**
>
> Failing any CIS test will mark the Jenkins stage as failed. Adjust thresholds as needed.

## Conclusion

By combining **kube-bench** with JSON output and `jq` filters, you can automate CIS Kubernetes Benchmark checks in your CI/CD pipeline. These scans help ensure your cluster adheres to security best practices before production deployment.

## References

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/abe4709d-7317-4c53-8877-e77595764adb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/84f7a4ea-c8cf-4dac-b055-42d05495eb52)**
>
> Practice lab
