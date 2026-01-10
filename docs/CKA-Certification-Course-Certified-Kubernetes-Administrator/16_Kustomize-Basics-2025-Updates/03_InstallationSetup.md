# InstallationSetup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/InstallationSetup)

---

## Table of Contents

- InstallationSetup
  - Installation Steps
  - Troubleshooting
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# InstallationSetup

In this guide, you'll learn how to install and set up Kustomize—a powerful tool for customizing Kubernetes resource configurations. Before proceeding, ensure that you have a running Kubernetes cluster and that [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) is installed and configured on your local machine. Kustomize supports Linux, Windows, and macOS.

## Installation Steps

The Kustomize team provides a convenient installation script that automatically detects your operating system and installs the appropriate version. To download and run this script, execute the following command in your terminal:

```
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
```

After the script completes, verify the installation by checking the version of Kustomize with:

```
kustomize version --short
```

You should see an output resembling the following:

```
{kustomize/v4.4.1  2021-11-11T23:36:27Z }
```

> [!important]
> **Note**
>
> If you do not see the expected version output, it may indicate an installation issue or that your current terminal session has not updated the necessary environment variables.

## Troubleshooting

If you encounter any issues during installation, try the following steps:

1.  Close your current terminal session and reopen it.
2.  Rerun the installation script to ensure that all components are set up correctly.

For more detailed troubleshooting and advanced configuration options, refer to the [Kustomize Documentation](https://kubectl.docs.kubernetes.io/).

With Kustomize properly installed, you are now ready to explore its powerful features for managing Kubernetes configurations. Enjoy customizing your Kubernetes deployments!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/14461618-374d-4ca2-983d-5ef86944661d)**
>
> Watch video content
