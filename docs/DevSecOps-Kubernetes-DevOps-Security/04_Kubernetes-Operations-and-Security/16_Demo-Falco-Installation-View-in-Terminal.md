# Demo Falco Installation View in Terminal - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Falco-Installation-View-in-Terminal)

---

## Table of Contents

- Demo Falco Installation View in Terminal
  - Prerequisites
  - 1. Install Falco on Ubuntu
  - 2. Verify the Installation
  - 3. Generate a Kubernetes Alert
  - 4. Inspect the Alert Rule
  - 5. Next Steps
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Falco Installation View in Terminal

In this hands-on guide, you’ll learn how to install Falco on an Ubuntu VM running a Kubernetes cluster, generate security alerts, and view them directly in your terminal. Falco is a runtime security tool for detecting anomalous activity in your containers and hosts.

## Prerequisites

- Ubuntu-based virtual machine (18.04+).
- Kubernetes cluster up and running.
- `kubectl` configured to talk to your cluster.
- Root or sudo privileges.

## 1\. Install Falco on Ubuntu

First, add the Falco repository, import its GPG key, update package lists, install kernel headers, and then install Falco:

```
# Add Falco GPG key and repository
curl -s https://falco.org/repo/falcosecurity-36728A8F.asc | apt-key add -
echo "deb https://download.falco.org/packages/deb stable main" \
  | tee /etc/apt/sources.list.d/falcosecurity.list


# Update and install dependencies
apt-get update -y
apt-get install -y linux-headers-$(uname -r)


# Install Falco
apt-get install -y falco
```

> [!important]
> **Note**
>
> Installing kernel headers is required for the Falco DKMS module to build against your running kernel.

After installation, you should see output similar to:

```
Unpacking falco (0.29.0) ...
Setting up falco (0.29.0) ...
Loading new falco-… DKMS files...
Building initial module for <your-kernel-version>
Installing to /lib/modules/<your-kernel-version>/updates/dkms/
depmod...
DKMS: install completed.
```

## 2\. Verify the Installation

1.  **Check Falco service status**

    ```
    systemctl status falco
    ```

    Falco may run as a daemon or via a container, depending on your setup.

2.  **Inspect the configuration directory**

    ```
    ls -l /etc/falco
    ```

    You should see:

    | File/Directory             | Description                           |
    | -------------------------- | ------------------------------------- |
    | falco\\\_rules.yaml        | Default rule definitions              |
    | falco\\\_rules.local.yaml  | Local overrides for custom rules      |
    | k8s\\\_audit\\\_rules.yaml | Kubernetes audit-event rules          |
    | rules.available/           | Available community-contributed rules |
    | rules.d/                   | Custom rule fragments                 |

3.  **Stream Falco logs**

    ```
    journalctl -u falco -f
    ```

## 3\. Generate a Kubernetes Alert

Open two terminal windows:

- **Terminal A**: Stream Falco logs

  ```
  journalctl -u falco -f
  ```

- **Terminal B**: Trigger an alert

  ```
  # Create an nginx pod named 'n1'
  kubectl run n1 --image=nginx


  # Confirm the pod is running
  kubectl get pod n1


  # Exec into the container to spawn a shell
  kubectl exec -it n1 -- bash


  # Inside the container, exit to complete the session
  root@n1:/# exit
  ```

As soon as the shell spawns inside the container, Falco will emit a notice:

```
20:15:32.123456 Notice A shell was spawned in a container with an attached terminal (command="bash" user=root container=n1 pod=n1 namespace=default image="nginx:latest")
```

This alert output references dynamic fields such as `%proc.cmdline`, `%user.name`, `%container.name`, `%k8s.pod.name`, `%k8s.ns.name`, and `%container.image`.

## 4\. Inspect the Alert Rule

Falco’s built-in rules are defined in `falco_rules.yaml`. To view the rule that detects terminal shells in containers:

```
grep -A15 -i "A shell was spawned in a container with an attached terminal" /etc/falco/falco_rules.yaml
```

Example snippet:

```
- rule: Terminal shell in container
  desc: Detect when a shell is spawned in a container with an attached terminal
  condition: spawned_process and container.id != host
    and proc.name in (bash, sh, csh, ksh, tcsh, zsh, dash)
    and fd.is_tty=true
  output: >
    A shell was spawned in a container with an attached terminal
    (command=%proc.cmdline user=%user.name container=%container.name
     pod=%k8s.pod.name namespace=%k8s.ns.name image=%container.image)
  priority: NOTICE
  tags: [container, shell]
```

Macros like `in_container` and lists such as `shell_binaries` are defined elsewhere in the configuration. For full details on writing and customizing rules, see the [Falco documentation](https://falco.org/docs/).

## 5\. Next Steps

We recommend integrating Falco with a centralized dashboard or SIEM to manage alerts at scale. In the next tutorial, we’ll cover:

- Deploying Falco Manager and Falco Plugins.
- Sending alerts to a web UI (e.g., Grafana, Kibana).
- Custom rule authoring for advanced threat detection.

---

## Links and References

- [Falco Official Website](https://falco.org/)
- [Falco Quickstart Guide](https://falco.org/docs/quickstart/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [DKMS Kernel Module Guide](https://wiki.ubuntu.com/Kernel/ModuleBuild)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/3564410e-9c54-47f0-8c1b-d2bcf3ca454b)**
>
> Watch video content
