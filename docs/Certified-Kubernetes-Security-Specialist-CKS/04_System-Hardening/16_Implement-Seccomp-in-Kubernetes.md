# Implement Seccomp in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Implement-Seccomp-in-Kubernetes)

---

## Table of Contents

- Implement Seccomp in Kubernetes
  - Default Seccomp Profile in Docker
  - Running the Container as a Kubernetes Pod
  - Enabling Seccomp in a Kubernetes Pod
  - Using the Unconfined Seccomp Profile
  - Using Custom Seccomp Profiles
  - Conclusion
  - Watch Video
  - Practice Lab
    - Creating a Pod with a Custom Profile
    - Creating a Profile That Rejects All Syscalls
    - Customizing and Using a Tailored Seccomp Profile

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Implement Seccomp in Kubernetes

In this article, we explore how to implement Seccomp profiles in Kubernetes to bolster container security by filtering system calls (syscalls). We start by reviewing how Docker and Kubernetes apply Seccomp by default and then demonstrate how to enable and customize Seccomp profiles within Kubernetes pods.

> [!important]
> **Overview**
>
> By restricting syscalls, Seccomp helps reduce the attack surface in containerized environments. This guide outlines both default behaviors and custom configurations for running secure Kubernetes workloads.

---

## Default Seccomp Profile in Docker

Docker uses a built-in Seccomp profile to block approximately 60 syscalls by default. To inspect Docker’s default Seccomp configuration, we can use the open-source container introspection tool called amicontained.

Run the following command to launch amicontained as a Docker container:

```
docker run r.j3ss.co/amicontained amicontained
```

The command output indicates that 64 syscalls are blocked due to Docker's default Seccomp profile. Notice that the Seccomp mode is set to filtering (mode 2):

```
Container Runtime: docker
Has Namespaces:
    pid: true
    user: false
AppArmor Profile: docker-default (enforce)
Capabilities:
    BOUNDING -> chown dac_override fowner fsetid kill setgid setuid setpcap net_bind_service net_raw sys_chroot mknod audit_write setcap
Seccomp: filtering
Blocked Syscalls (64):
    MSGRCV SYSCFG SETPGID SETSID USELIB USTAT SYSFS VHAVGUP PIVOT_ROOT _SYSCTL ACCT SETTIMEOFDAY MOUNT UMOUNT2 SWAPON SWAPOFF REBOOT SETHOSTNAME SETDOMAINNAME IOPL IOPEM CREATE_MODULE INIT_MODULE DELETE_MODULE GET_KERNEL_SYMS QUERY_MODULE QUOTACLI NESSERVCTL GETPMSG PUTMSG AFS_SYSCALL TUXCALL SECURITY LOOKUP_DCOOKIE CLOCK_SETTIME VSERVER MBIND SET_MEMPOLICY GET_MEMPOLICY KEXEC_LOAD ADD_KEY REQUEST_KEY KEYCTL MIGRATE_PAGES UNSHARE MOVE_PAGES PERF_EVENT_OPEN FANOTIFY_INIT NAME_TO_HANDLE_AT OPEN_BY_HANDLE_AT CLOCK_ADJTIME SETNS PROCESS_VM_READV PROCESS_VM_WRITEV KCMP FINIT_MODULE KEXEC_FILE_LOAD
Looking for Docker.sock
```

---

## Running the Container as a Kubernetes Pod

Deploying the same image as a Kubernetes pod yields a different outcome. In Kubernetes (version 1.20 during this recording), Seccomp is not enabled by default.

Create a pod with the following command:

```
kubectl run amicontained --image=r.j3ss.co/amicontained amicontained -- amicontained
```

You should see:

```
pod/test created
```

Next, inspect the pod logs:

```
kubectl logs amicontained
```

The log output will display Seccomp as disabled along with only 21 syscalls being blocked:

```
Container Runtime: docker
Has Namespaces:
  pid: true
  user: false
AppArmor Profile: docker-default (enforce)
Capabilities:
  BOUNDING -> chown dac_override fowner fsetid kill setgid setuid setpcap
  net_bind_service net_raw sys_chroot mknod audit_write setcap
Seccomp: disabled


Blocked Syscalls (21):
  SYSCLOG SETGID SETSID VHANGUP PIVOT_ROOT ACCT SETTIMEOFDAY UMOUNT2 SWAPON
  SWAPOFF REBOOT SETHOSTNAME SETDOMAINNAME INIT_MODULE DELETE_MODULE LOOKUP_DCOOKIE
  KEXEC_LOAD FANOTIFY_INIT OPEN_BY_HANDLE_AT FINIT_MODULE KEXEC_FILE_LOAD


Looking for Docker.sock
```

> [!important]
> **Key Point**
>
> By default, Kubernetes pods do not enforce Seccomp filtering; hence, fewer syscalls are blocked.

---

## Enabling Seccomp in a Kubernetes Pod

To enable Seccomp filtering in a pod, specify a Seccomp profile in the pod (or container) manifest. The example below demonstrates using the default Docker profile via the `seccompProfile` field under the pod-level security context:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: amicontained
  name: amicontained
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
  containers:
    - args:
        - amicontained
      image: r.j3ss.co/amicontained
      name: amicontained
      securityContext:
        allowPrivilegeEscalation: false
```

Setting `allowPrivilegeEscalation: false` restricts the container process from gaining additional privileges beyond what is needed.

Apply the pod definition:

```
kubectl apply -f pod-definition.yaml
```

Then verify the pod logs:

```
kubectl logs amicontained
```

The logs should now show that Seccomp filtering is active with additional syscalls being blocked:

```
Container Runtime: docker
Has Namespaces:
  pid: true
  user: false
AppArmor Profile: docker-default (enforce)
Capabilities:
  BOUNDING -> chown dac_override fowner fsetid kill setgid setuid setpcap net_bind_service net_raw
Seccomp: filtering


Blocked Syscalls (64):
  SYSCLOG SETPGID SETSID USELIB USTAT SYSFS Vhangup PIVOT_ROOT _SYSCtl ACCT SETTIMEOFDAY MOUNT
  UMOUNT2 SWAPON SWAPOFF REBOOT SETHOSTNAME SETDOMAINNAME IOPL CREATE_MODULE INIT_MODULE DELETE_MODULE
  GET_KERNEL_SYMS QUERY_MODULE QUOTACTL NFS_SERVERCTL GETMSG PUTMSG AFS_SYSCALL TUXCALL SECURITY
  LOOKUP_DCOOKIE CLOCK_SETTIME VSERVER MBIND SET_MPOLICY GET_MEMPOLICY KEXEC_LOAD ADD_KEY REQUEST_KEY
  KEYCTL MIGRATE_PAGES UNSHARE MOVE_PAGES PERF_EVENT_OPEN FANotify_INIT NAME_TO_HANDLE_AT OPEN_BY_HANDLE_AT
  CLOCK_ADJTIME SETNS PROCESS_VM_READV PROCESS_VM_WRITEV KCMP FINIT_MODULE KEXEC_FILE_LOAD BPF USERFAULTFD
Looking for Docker.soc
```

---

## Using the Unconfined Seccomp Profile

If you prefer to run a pod without any Seccomp restrictions (which is the default behavior), explicitly set the Seccomp profile to Unconfined in your pod manifest:

```
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: amicontained
  name: amicontained
spec:
  securityContext:
    seccompProfile:
      type: Unconfined
  containers:
    - args:
        - amicontained
      image: r.j3ss.co/amicontained
      name: amicontained
      securityContext:
        allowPrivilegeEscalation: false
```

---

## Using Custom Seccomp Profiles

Custom Seccomp profiles offer granular security control based on your application's syscall needs. The following sections detail how to create a pod with a custom Seccomp profile, enforce strict policies, and tailor profiles for your specific requirements.

### Creating a Pod with a Custom Profile

In this example, we create a pod using the Ubuntu image. The container prints a message and then sleeps for 100 seconds. The pod manifest below applies a custom Seccomp profile from a file on the node.

```
apiVersion: v1
kind: Pod
metadata:
  name: test-audit
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: <path to the custom JSON file>
  containers:
    - command: ["bash", "-c", "echo 'I just made some syscalls' && sleep 100"]
      image: ubuntu
      name: ubuntu
      securityContext:
        allowPrivilegeEscalation: false
```

> [!important]
> **Custom Profile Tip**
>
> The `localhostProfile` path is relative to the default Seccomp profile directory (typically `/var/lib/kubelet/seccomp`). For example, if you place your custom profile in `/var/lib/kubelet/seccomp/profiles/`, the path might be `profiles/audit.json`.

Inside your custom profile (e.g., `audit.json`), you could set the default action to log syscalls:

```
{
  "defaultAction": "SCMP_ACT_LOG"
}
```

Once the pod is running, all container syscalls are logged to the node’s syslog (commonly `/var/log/syslog`). You can check the logs with:

```
grep syscall /var/log/syslog
```

A sample audit log might look like:

```
grep syscall /var/log/syslog
Mar 19 23:53:45 node01 kernel: [ 264.340952] audit: type=1326 audit(1616198025.076:14):  auid=4294967295 uid=0 gid=0 ses=4294967295 pid=8816 comm="runc:[2:INIT]" exe="/" sig=0 arch=c000003e syscall=257 compat=0 ip=0x5642801010aa code=0x7ffc0000
Mar 19 23:53:45 node01 kernel: [ 264.340954] audit: type=1326 audit(1616198025.076:15):  auid=4294967295 uid=0 gid=0 ses=4294967295 pid=8816 comm="runc:[2:INIT]" exe="/" sig=0 arch=c000003e syscall=35 compat=0 ip=0x564280fcc662d code=0x7ffc0000
...
```

Additionally, tools like [Tracee](https://github.com/aquasecurity/tracee) can be useful for analyzing syscalls. For instance, run the Tracee container to monitor new container syscalls:

```
sudo docker run --name tracee --rm --privileged --pid=host \
  -v /lib/modules/:/lib/modules:ro -v /usr/src:/usr/src:ro \
  -v /tmp/tracee:/tmp/tracee aquasec/tracee:0.4.0 --trace container=new
```

### Creating a Profile That Rejects All Syscalls

To enforce a stricter security posture, you can create a profile that denies any syscall by default. Create a JSON file (e.g., `violation.json`) with the following content:

```
{
  "defaultAction": "SCMP_ACT_ERRNO"
}
```

Apply this profile in your pod's security context. When created, the pod status will be "ContainerCannotRun" because even essential syscalls are blocked. For example:

Apply the pod definition:

```
kubectl apply -f test-violation.yaml
```

Then check the pod status:

```
kubectl get pods
```

Expected output:

```
NAME             READY   STATUS                RESTARTS   AGE
test-violation   0/1     ContainerCannotRun    0          2m2s
```

> [!important]
> **Warning**
>
> While a strict Seccomp profile can improve security, it may render the pod non-functional if critical syscalls are blocked.

### Customizing and Using a Tailored Seccomp Profile

After analyzing your application’s syscall requirements—by inspecting audit logs or using tools like Tracee—you can craft a custom Seccomp profile that allows only the required syscalls.

Create a custom profile JSON file (for example, `custom.json`) with specific rules and place it in the node’s Seccomp profile directory (typically in a `profiles` folder under `/var/lib/kubelet/seccomp`).

Then reference your custom profile in a pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  name: test-custom
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/custom.json
  containers:
    - command: ["bash", "-c", "echo 'I just made some syscalls' && sleep 100"]
      image: ubuntu
      name: ubuntu
  restartPolicy: Never
```

Verify that the pod starts successfully:

```
kubectl get pods
```

Expected output:

```
NAME         READY   STATUS    RESTARTS   AGE
test-custom  1/1     Running   0          2m2s
```

Once your custom profile is applied, only the required syscalls will be allowed, enhancing container isolation and security.

---

## Conclusion

Implementing and customizing Seccomp profiles in Kubernetes enhances container security by limiting unnecessary syscalls. Although creating a custom profile can be time-consuming, mastering existing profiles and tailoring them to your application's needs is essential for a secure container environment.

For further details, refer to the official [Kubernetes Seccomp Documentation](https://kubernetes.io/docs/concepts/containers/seccomp-profiles/).

Now is the time to experiment with Seccomp profiles in your environment. By leveraging these security measures, you can achieve a more robust and secure Kubernetes deployment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/4bc6526e-316d-44f8-90f4-3ff132fa1b11)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/c6466fea-8065-407e-8971-b3e857d2227c)**
>
> Practice lab
