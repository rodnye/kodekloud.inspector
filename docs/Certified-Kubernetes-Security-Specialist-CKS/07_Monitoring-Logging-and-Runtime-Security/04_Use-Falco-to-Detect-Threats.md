# Use Falco to Detect Threats - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Monitoring-Logging-and-Runtime-Security/Use-Falco-to-Detect-Threats)

---

## Table of Contents

- Use Falco to Detect Threats
  - Verifying Falco is Running
  - Creating an NGINX Pod
  - Monitoring Falco Logs
  - Interacting with the NGINX Container
  - Understanding Falco Rules
  - Conclusion
  - Watch Video
    - Rule Breakdown

---

## Content

Certified Kubernetes Security Specialist (CKS)

Monitoring Logging and Runtime Security

# Use Falco to Detect Threats

In this lesson, we demonstrate how to use Falco—a powerful cloud-native runtime security tool—to detect and alert on suspicious activity within your Kubernetes cluster. We start by verifying that Falco is actively monitoring your nodes, then deploy an NGINX pod to generate events, and finally, customize Falco rules to enhance detection capabilities.

## Verifying Falco is Running

First, ensure that Falco has been installed on your host system as a package. You can verify its status by running:

```
systemctl status falco
```

> [!important]
> **Note**
>
> Ensure that Falco is installed and properly configured on your nodes before proceeding.

## Creating an NGINX Pod

To generate events for Falco to monitor, deploy an NGINX pod with the following command:

```
kubectl run nginx --image=nginx
```

Next, confirm that the pod is scheduled on a specific node (e.g., node 01) by listing all pods with detailed information:

```
kubectl get pods -o wide
```

## Monitoring Falco Logs

Open a new terminal session and SSH into node 01. Begin streaming Falco logs in real time to monitor security events:

```
journalctl -fu falco
```

You may notice numerous log entries; focus on the new events as they occur since older log messages can be ignored.

## Interacting with the NGINX Container

In your initial terminal session, access the NGINX container's shell by executing:

```
kubectl exec -ti nginx -- bash
```

Shortly after opening the shell, you will receive an alert in the Falco logs indicating that a shell has been spawned inside the container. This log entry will include important details such as the container ID, image name, and namespace.

To illustrate Falco's capability in detecting sensitive file accesses, execute the following command inside the container to view the contents of the /etc/shadow file:

```
cat /etc/shadow
```

As soon as you run this command, Falco generates another alert noting that a sensitive file was accessed.

## Understanding Falco Rules

Falco uses a set of rules defined in a YAML configuration file to determine which events should trigger alerts. Each rule comprises five mandatory keys:

- **rule:** A unique name for the rule.
- **desc:** A detailed description explaining the purpose of the rule.
- **condition:** A filtering expression applied to incoming events.
- **output:** The log message generated when the rule is triggered.
- **priority:** The severity level associated with the event.

Below is an example of a custom Falco rule designed to detect the opening of a shell within a container:

```
- rule: Detect Shell inside a container
  desc: Alert if a shell such as bash is open inside a container
  condition: container and proc.name in (linux_shells)
  output: Bash Opened (user=%user.name container=%container.id)
  priority: WARNING


- list: linux_shells
  items: [bash, zsh, ksh, sh, csh]


- macro: container
  condition: container.id != host
```

### Rule Breakdown

1.  **Rule & Description:**  
    The rule "Detect Shell inside a container" is designed to trigger an alert when a shell (such as bash) is initiated within a container environment.
2.  **Condition:**  
    The condition uses a macro named "container" to ensure the event originates from within a container and checks if the process name belongs to one of the pre-defined Linux shells (bash, zsh, ksh, sh, or csh).
3.  **Output:**  
    The output message incorporates dynamic filters to include the username (`user=%user.name`) and container ID (`container=%container.id`) in the alert.
4.  **Priority:**  
    The severity level for this alert is set to WARNING. Falco supports multiple priority levels ranging from debug (lowest) to emergency (highest).
5.  **Lists and Macros:**
    - The "linux_shells" list consolidates common shell names to simplify the condition.
    - The "container" macro verifies that the event originates from a container (i.e., `container.id != host`), improving the readability and maintainability of the rule.

For further details on syscall filters and additional macros, please visit the [Falco reference documentation](https://falco.org/docs/).

> [!important]
> **Security Warning**
>
> Always ensure that your security rules are tested in a non-production environment before applying them to production systems.

## Conclusion

This lesson covered the key steps to verify Falco's operation, interact with a running container, and implement a custom rule to detect when a shell is spawned inside a container. In the next installment, we will dive into configuring Falco’s settings and explore how to fine-tune custom rules for broader threat detection.

For more insights and in-depth tutorials on container security, continue exploring our documentation and related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/c0d849e1-54be-4d78-8936-6ce49434b88d/lesson/b14718bb-dd48-495a-be04-05ed8d110ac7)**
>
> Watch video content
