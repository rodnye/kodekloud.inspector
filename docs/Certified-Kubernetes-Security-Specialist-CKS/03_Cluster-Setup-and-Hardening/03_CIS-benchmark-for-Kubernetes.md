# CIS benchmark for Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/CIS-benchmark-for-Kubernetes)

---

## Table of Contents

- CIS benchmark for Kubernetes
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# CIS benchmark for Kubernetes

In this lesson, we explore the CIS Benchmarks for Kubernetes. The CIS website provides cybersecurity benchmarks for various vendors—including operating systems, public cloud platforms, network devices, and server software. Here, we focus specifically on Kubernetes.

To begin, register on the CIS website and download the latest CIS Benchmarks for Kubernetes. The most current version covered in this lesson addresses best practices for Kubernetes versions 1.16 through 1.18. This document is invaluable for system administrators, application administrators, security specialists, auditors, and anyone involved in developing, deploying, assessing, or securing Kubernetes environments.

![The image is an excerpt from the CIS Kubernetes Benchmark v1.6.0, providing security guidance for Kubernetes versions 1.16 to 1.18.](https://kodekloud.com/kk-media/image/upload/v1752871341/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-CIS-benchmark-for-Kubernetes/frame_40.jpg)

The benchmark document includes hundreds of recommendations that address both control plane and worker node components. For example, it provides detailed guidance on securing master node files. One recommendation mandates that the file permissions for the API server pod specification file should be set to 644, ensuring that only administrators can modify the file.

![The image shows a list of security recommendations for Kubernetes master node configuration files from the CIS Kubernetes Benchmark v1.6.0.](https://kodekloud.com/kk-media/image/upload/v1752871343/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-CIS-benchmark-for-Kubernetes/frame_60.jpg)

Additionally, the document explains how to verify current file permissions and provides the necessary commands to correct any discrepancies. Consider using the following commands:

```
stat -c %a /etc/kubernetes/manifests/kube-apiserver.yaml
```

```
chmod 644 /etc/kubernetes/manifests/kube-apiserver.yaml
```

Other important recommendations address the command-line arguments for deploying the Kube API server. The guidelines specify the following:

- Disable anonymous authentication.
- Ensure that basic and token authentication files are not specified.
- Require HTTPS and the proper configuration of certificates.

![The image shows a list of security configuration guidelines for Kubernetes API Server from the CIS Kubernetes Benchmark v1.6.0.](https://kodekloud.com/kk-media/image/upload/v1752871344/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-CIS-benchmark-for-Kubernetes/frame_100.jpg)

> [!important]
> **Note**
>
> Upcoming sections will provide a deeper examination of these recommendations.

At this stage, we present a high-level overview of the CIS Benchmark Assessment Tool. Previously, the CIS CAT tool was discussed. This tool facilitates automated assessments and generates reports in HTML format. However, note that the free lite version of CIS CAT supports only selected benchmarks (e.g., Windows, Ubuntu, Google Chrome, and macOS) and does not include Kubernetes.

For Kubernetes, an alternate open-source tool—available free of charge—will be introduced later in this course. This tool is designed to perform a CIS Benchmark assessment specifically for Kubernetes, ensuring you can check your configuration against established best practices.

This concludes our overview of the CIS Benchmarks for Kubernetes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/bf3a22c7-9a9b-44b9-8924-5428c4483728)**
>
> Watch video content
