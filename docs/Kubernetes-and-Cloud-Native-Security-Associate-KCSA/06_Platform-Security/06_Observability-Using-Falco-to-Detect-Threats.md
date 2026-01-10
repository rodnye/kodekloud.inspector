# Observability Using Falco to Detect Threats - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Observability-Using-Falco-to-Detect-Threats)

---

## Table of Contents

- Observability Using Falco to Detect Threats
  - Prerequisites
  - 1. Verifying Falco Installation
  - 2. Deploying and Testing with nginx
  - 3. Falco Architecture
  - 4. Falco Rules Overview
  - 5. Creating a Custom Rule
  - 6. Sysdig Filters Reference
  - 7. Extending Detection with Lists
  - 8. Simplifying with Macros
  - Links and References
  - Watch Video
  - Practice Lab
    - 4.1 Anatomy of a Rule

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Observability Using Falco to Detect Threats

Now that Falco is installed on your cluster nodes, you can detect and alert on suspicious behavior. This guide walks you through verifying the installation, testing Falco with an nginx pod, and writing custom rules.

## Prerequisites

- A running Kubernetes cluster
- Falco installed on each node (via systemd or DaemonSet)
- `kubectl` configured to communicate with your cluster

---

## 1\. Verifying Falco Installation

First, ensure Falco is active on each node.

If you installed Falco directly on the host:

```
sudo systemctl status falco
```

You should see output similar to:

```
● falco.service - Falco: Container Native Runtime Security
   Loaded: loaded (/usr/lib/systemd/system/falco.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-04-13 20:42:45 UTC; 1min 2s ago
     Docs: https://falco.org/docs/
 Main PID: 17994 (falco)
    Tasks: 6 (limit: 4678)
   CGroup: /system.slice/falco.service
           └─17994 /usr/bin/falco --pidfile=/var/run/falco.pid -c /etc/falco/falco.yaml
```

> [!important]
> **Tip**
>
> If Falco is deployed as a DaemonSet, use `kubectl get pods -n falco-driver-loader` to verify all Falco pods are running.

---

## 2\. Deploying and Testing with nginx

1.  **Deploy an nginx pod**

    ```
    kubectl run nginx --image=nginx
    ```

    Expected response:

    ```
    pod/nginx created
    ```

2.  **Check pod status and its node**

    ```
    kubectl get pods -o wide
    ```

3.  **Stream Falco logs**  
    In a separate terminal, SSH into the node running the nginx pod:

    ```
    ssh user@<node-ip>
    sudo journalctl -fu falco
    ```

4.  **Trigger an alert**  
    Back in your first terminal, open a shell inside the nginx container:

    ```
    kubectl exec -ti nginx -- bash
    ```

    Inside the container, read a sensitive file:

    ```
    cat /etc/shadow
    ```

Falco will immediately log alerts for the shell spawn and file access events.

---

## 3\. Falco Architecture

![The image is a diagram illustrating the architecture of Falco, showing the interaction between applications, system calls, the Falco kernel module, eBPF, libraries, policy engine, and Falco rules, leading to various outputs.](https://kodekloud.com/kk-media/image/upload/v1752880898/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Observability-Using-Falco-to-Detect-Threats/falco-architecture-diagram-interaction.jpg)

This diagram shows:

- Applications generate system calls
- Falco’s kernel module/eBPF captures events
- Libraries forward events to the policy engine
- Rules define alert conditions
- Outputs include stdout, alerts, notifications

---

## 4\. Falco Rules Overview

Falco rules are defined in a YAML file. Each file can include:

- `rules`: Alert definitions
- `lists`: Named collections of values
- `macros`: Reusable filter expressions

### 4.1 Anatomy of a Rule

Every rule requires these five keys:

```
- rule:      # Unique rule name
  desc:      # Human-readable description
  condition: # Boolean expression against event fields
  output:    # Alert message template
  priority:  # Severity (e.g., DEBUG, INFO, WARNING, CRITICAL)
```

**Example**  
Built-in rule that detects a shell inside a container:

```
- rule: OpenShellInContainer
  desc: Alert when a shell (e.g., bash) is spawned inside a container
  condition: container.id != host and proc.name = bash
  output: Shell opened in container (user=%user.name container=%container.id)
  priority: WARNING
```

---

## 5\. Creating a Custom Rule

Let’s write a simple rule to catch any shell launched in a container:

```
- rule: DetectShellInsideContainer
  desc: Alert if a shell such as bash is opened inside any container
  condition: container.id != host and proc.name = bash
  output: Bash shell opened (user=%user.name container=%container.id)
  priority: WARNING
```

---

## 6\. Sysdig Filters Reference

| Filter                     | Description                                |
| -------------------------- | ------------------------------------------ |
| container.id               | Unique container identifier                |
| proc.name                  | Name of the process                        |
| user.name                  | Username that initiated the event          |
| container.image.repository | Container image name                       |
| fd.name                    | File descriptor path (e.g., `/etc/shadow`) |
| evt.type                   | System call name (e.g., `execve`, `open`)  |

Falco evaluates these filters against each captured system event.

---

## 7\. Extending Detection with Lists

To monitor multiple shell types, define a list:

```
- list: linux_shells
  items: [bash, zsh, ksh, sh, csh]
```

Update the rule to reference the list:

```
- rule: DetectShellInsideContainer
  desc: Alert if any common shell is opened inside a container
  condition: container.id != host and proc.name in (linux_shells)
  output: Shell opened (user=%user.name container=%container.id proc=%proc.name)
  priority: WARNING


- list: linux_shells
  items: [bash, zsh, ksh, sh, csh]
```

---

## 8\. Simplifying with Macros

Falco’s built-in macro `container` is shorthand for `container.id != host`. Use it to make rules more concise:

```
- rule: DetectShellInsideContainer
  desc: Alert if any common shell is opened inside a container
  condition: container and proc.name in (linux_shells)
  output: Shell opened (user=%user.name container=%container.id proc=%proc.name)
  priority: WARNING


- list: linux_shells
  items: [bash, zsh, ksh, sh, csh]
```

For a complete list of macros and filters, see the [Falco documentation](https://falco.org/docs/).

---

## Links and References

- [Falco Documentation](https://falco.org/docs/)
- [Kubernetes Concepts: What Is Kubernetes?](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Sysdig Filters Reference](https://github.com/falcosecurity/falco/blob/master/rules/falco_rules.yaml)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/9c2272fe-13a0-45a0-acbe-5f6e392e3a69)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/295d91f3-8651-447b-9e51-91913cfc0638)**
>
> Practice lab
