# AppArmor in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/AppArmor-in-Kubernetes)

---

## Table of Contents

- AppArmor in Kubernetes
  - Example: Ubuntu Sleeper Pod with AppArmor Profile
  - Watch Video
    - Verify the AppArmor Profile
    - Basic Pod Definition
    - AppArmor Deny Write Profile
    - Applying the AppArmor Profile to the Pod
    - Creating and Testing the Pod

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# AppArmor in Kubernetes

In this lesson, we explain how to secure your container deployments in Kubernetes using AppArmor profiles. AppArmor enforces security policies at the kernel level by limiting file system writes and other potentially risky operations within containers.

AppArmor support was introduced in Kubernetes v1.4 and, although it remained in beta until version 1.20, it has proven to be an effective tool for hardening container security. To enable AppArmor on Kubernetes pods, ensure that each node in your cluster meets the following requirements:

– The AppArmor kernel module must be enabled.  
– The desired AppArmor profile must be loaded on each node.  
– The container runtime (e.g., Docker, CRI-O, Containerd) must support AppArmor.

> [!important]
> **Prerequisites**
>
> Before proceeding, verify that all nodes have the AppArmor kernel module enabled and the required profile loaded.

![The image outlines requirements for using AppArmor in Kubernetes: version above 1.4, enabled kernel module, loaded profile, and supported container runtime.](https://kodekloud.com/kk-media/image/upload/v1752871728/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-AppArmor-in-Kubernetes/frame_50.jpg)

## Example: Ubuntu Sleeper Pod with AppArmor Profile

Below is an example where an Ubuntu container is configured as a Sleeper pod. The container prints a message and sleeps for one hour. Because the container's command does not require file system write access, the pod is secured with an AppArmor profile that denies write operations.

### Verify the AppArmor Profile

Before deploying your pod, ensure the AppArmor profile is loaded on all nodes. Run the following command on each worker node:

```
aa-status
apparmor module is loaded.
13 profiles are loaded.
13 profiles are in enforce mode.
    apparmor-deny-write
    /sbin/dhclient
    /usr/bin/man
    /usr/lib/NetworkManager/mn-dhcp-client.action
    /usr/lib/NetworkManager/mn-dhcp-helper
    ...
    /usr/sbin/tcpdump
    docker-default
    man_filter
    man_groff
0 profiles are in complain mode.
11 processes have profiles defined.
11 processes are in enforce mode.
    /sbin/dhclient (621)
    docker-default (3970)
    docker-default (4025)
    docker-default (9853)
    docker-default (9964)
0 processes are in complain mode.
2 processes are unconfined but have a profile defined.
```

### Basic Pod Definition

Here is the basic YAML specification for creating the Ubuntu Sleeper pod:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper
spec:
  containers:
    - name: hello
      image: ubuntu
      command: [ "sh", "-c", "echo 'Sleeping for an hour!' && sleep 1h" ]
```

### AppArmor Deny Write Profile

The following is an example of an AppArmor profile (`apparmor-deny-write`) designed to deny all file write operations:

```
profile apparmor-deny-write flags=(attach_disconnected) {
    file,
    # Deny all file writes.
    deny /** w,
}
```

> [!important]
> **Profile Deployment**
>
> Make sure the above profile is loaded on every worker node where your pod might run.

### Applying the AppArmor Profile to the Pod

Previously, when AppArmor was in beta, it was necessary to annotate the pod's metadata to specify the AppArmor profile. The annotation used was `container.apparmor.security.beta.kubernetes.io` with the container name as the key and a value formatted as `localhost/<profile-name>`.

Legacy configuration example:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper
  annotations:
    container.apparmor.security.beta.kubernetes.io/ubuntu-sleeper: localhost/apparmor-deny-write
spec:
  containers:
    - name: ubuntu-sleeper
      image: ubuntu
      command: [ "sh", "-c", "echo 'Sleeping for an hour!' && sleep 1h" ]
```

Starting from newer Kubernetes versions, you can specify an AppArmor profile using the `securityContext` within the pod specification. The updated configuration is shown below:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper
spec:
  securityContext:
    appArmorProfile:
      type: Localhost
      localhostProfile: apparmor-deny-write
  containers:
    - name: ubuntu-sleeper
      image: ubuntu
      command: [ "sh", "-c", "echo 'Sleeping for an hour!' && sleep 1h" ]
```

### Creating and Testing the Pod

1.  **Create the Pod:** Save the YAML configuration (e.g., as `ubuntu-sleeper.yaml`) and run:

    ```
    kubectl create -f ubuntu-sleeper.yaml
    pod/ubuntu-sleeper created
    ```

2.  **Verify Pod Logs:** Check the container's logs to ensure that the message has been printed:

    ```
    kubectl logs ubuntu-sleeper
    Sleeping for an hour!
    ```

3.  **Test the AppArmor Profile:** Attempt to create a file inside the container to test the deny write rule. Run:

    ```
    kubectl exec -ti ubuntu-sleeper -- touch /tmp/test
    ```

    The operation should fail with a permission denied error:

    ```
    touch: cannot touch '/tmp/test': Permission denied
    command terminated with exit code 1
    ```

> [!important]
> **Security Enforcement**
>
> If the file creation attempt fails as shown above, it confirms that the AppArmor profile is enforcing the security restrictions correctly.

This concludes the lesson on using AppArmor profiles in Kubernetes. For further practice and deeper understanding, explore additional hands-on labs and documentation on Kubernetes security.

For more information, refer to:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/overview/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/b469e2e2-7a6b-468d-ab12-ddd4eac35057)**
>
> Watch video content
