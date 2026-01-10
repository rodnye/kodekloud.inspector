# Solutions Worker Node Failure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Troubleshooting/Solutions-Worker-Node-Failure)

---

## Table of Contents

- Solutions Worker Node Failure
  - Step 1: Verify Node Status from the Control Plane
  - Step 2: Examine Detailed Node Information
  - Step 3: Check the Kubelet Service on node01
  - Step 4: Simulate the Next Failure and Investigate Further
  - Step 5: Correct the Kubelet Configuration
  - Step 6: Fix the Incorrect Control Plane Port in kubelet.conf
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Troubleshooting

# Solutions Worker Node Failure

In this guide, we walk through troubleshooting and resolving worker node failures in a Kubernetes cluster. Before you begin, ensure that your lab environment is properly set up.

Below is a step-by-step procedure to diagnose and fix issues on a worker node (node01).

---

## Step 1: Verify Node Status from the Control Plane

Start by checking the status of all the nodes in the cluster. Run the following command on the control plane:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS     ROLES                     AGE   VERSION
controlplane   Ready      control-plane,master      36m   v1.20.0
node01         NotReady   <none>                    36m   v1.20.0
```

In this output, you can clearly see that `node01` is in a **NotReady** state.

> [!important]
> **Tip**
>
> A quick look at the node status can help you identify which node is experiencing issues before diving into detailed troubleshooting.

---

## Step 2: Examine Detailed Node Information

Investigate further by describing the details and events related to the problematic node:

```
root@controlplane:~# kubectl describe node node01
```

Review the output carefully. Look for information such as:

- **Kubelet Version:** v1.20.0
- **PodCIDR:** 10.244.1.0/24

Even though many components are functioning correctly, the node remains in a NotReady state, indicating that the root cause might lie elsewhere.

---

## Step 3: Check the Kubelet Service on node01

Next, SSH into the worker node to examine the status of the kubelet service:

```
root@controlplane:~# ssh node01
Last login: Fri Apr 22 20:18:16 2022 from 10.54.130.4
root@node01:~# service kubelet status
```

You might see output similar to this:

```
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enabled)
   Drop-In: /etc/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: inactive (dead) since Fri 2022-04-22 22:58:51 UTC; 1min 58s ago
     Docs: https://kubernetes.io/docs/home/
  Process: 1770 ExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_CONFIG_ARGS $KUBEADM_ARGS $KUBELET_EXTRA_ARGS (code=exited, status=0/SUCCESS)
 Main PID: 1770 (code=exited, status=0/SUCCESS)
```

Since the kubelet service is not active, start it by executing:

```
root@node01:~# service kubelet start
```

Then, verify that it is running:

```
root@node01:~# service kubelet status
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enabled)
   Drop-In: /etc/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: active (running) since Fri 2022-04-22 23:01:07 UTC; 2s ago
     Docs: https://kubernetes.io/docs/home/
 Main PID: 18420 (kubelet)
    Tasks: 29 (limit: 5529)
   CGroup: /system.slice/kubelet.service
           └─18420 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/va...
```

Return to the control plane and run:

```
root@controlplane:~# kubectl get nodes
```

You should now see both nodes reported with a **Ready** status.

---

## Step 4: Simulate the Next Failure and Investigate Further

After the initial fix, the cluster shows issues again with `node01` reverting to a **NotReady** state. Verify the node status:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS     ROLES                    AGE   VERSION
controlplane   Ready      control-plane,master     39m   v1.20.0
node01         NotReady   <none>                   39m   v1.20.0
```

SSH into node01 once more and inspect the kubelet service status:

```
root@node01:~# service kubelet status
```

You may now observe that the service is in an "activating (auto-restart)" state, repeatedly exiting with code 255:

```
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enabled)
   Drop-In: /etc/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: activating (auto-restart) (Result: exit-code) since Fri 2022-04-22 23:02:58 UTC; 461ms ago
     Docs: https://kubernetes.io/docs/home/
  Process: 19364 ExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_CONFIG_ARGS $KUBELET_KUBEADM_ARGS $KUBELET_EXTRA_ARGS (code=exited, status=255)
 Main PID: 19364 (code=exited, status=255)
```

Check the logs to understand the problem:

```
root@node01:~# journalctl -u kubelet
```

Look for error messages such as:

```
failed to load Kubelet config file /var/lib/kubelet/config.yaml, error: ...
```

The logs suggest the kubelet is failing to load its configuration due to an incorrect certificate authority (CA) file.

---

## Step 5: Correct the Kubelet Configuration

Examine the kubelet configuration file by executing:

```
root@node01:~# cat /var/lib/kubelet/config.yaml
```

You might see an entry like this:

```
authentication:
  x509:
    clientCAFile: /etc/kubernetes/pki/WONG-CA-FILE.crt
```

This file points to the wrong CA certificate. Identify the correct CA file (for example, `/etc/kubernetes/pki/ca.cert`) and update the configuration accordingly.

After making the change, restart the kubelet service:

```
root@node01:~# service kubelet restart
```

Then, confirm the service is active:

```
root@node01:~# service kubelet status
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enabled)
   Drop-In: /etc/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: active (running) since Fri 2022-04-22 23:06:14 UTC; 5s ago
     Docs: https://kubernetes.io/docs/home/
 Main PID: 20357 (kubelet)
```

Return to the control plane and check that both nodes are now **Ready**:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS   ROLES                    AGE   VERSION
controlplane   Ready    control-plane,master     43m   v1.20.0
node01         Ready    <none>                   43m   v1.20.0
```

> [!important]
> **Reminder**
>
> Always back up configuration files before making any changes.

---

## Step 6: Fix the Incorrect Control Plane Port in kubelet.conf

Even after the configuration fix, if `node01` goes NotReady again, inspect the logs on node01. You might see an error like:

```
failed to ensure lease exists, will retry in 7s, error: Get "http://10.54.130.2:6553/api/v1/namespaces/kube-node-lease/leases/node01?...": dial tcp 10.54.130.2:6553: connect: connection refused
```

This indicates that the kubelet is attempting to connect to the control plane on an incorrect port (6553). To resolve this, inspect the kubelet configuration file:

```
root@node01:~# ls /etc/kubernetes/kubelet.conf
root@node01:~# cat /etc/kubernetes/kubelet.conf
```

You might see:

```
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBD...
    server: https://controlplane:6533
```

Update the port from 6533 to 6443 (the correct control plane port):

```
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBD...
    server: https://controlplane:6443
```

After saving the changes, restart the kubelet service:

```
root@node01:~# service kubelet restart
```

Monitor its status to ensure that it is actively running:

```
root@node01:~# service kubelet status
```

Finally, verify from the control plane that both nodes are in a **Ready** state:

```
root@controlplane:~# kubectl get nodes
NAME           STATUS   ROLES                   AGE     VERSION
controlplane   Ready    control-plane,master    51m     v1.20.0
node01         Ready    <none>                  50m     v1.20.0
```

---

## Conclusion

When troubleshooting worker node failures in a Kubernetes cluster, follow these steps:

1.  Check the node status using `kubectl get nodes`.
2.  SSH into the affected worker node and verify that the kubelet service is running.
3.  If the kubelet service fails, review the logs using `journalctl -u kubelet` to identify any misconfigurations.
4.  In this example, the issues included:
    - An incorrect client CA file in `/var/lib/kubelet/config.yaml`
    - An incorrect control plane port in `/etc/kubernetes/kubelet.conf`
5.  Correct the misconfigurations and restart the kubelet service, then verify that the node status returns to **Ready**.

Following this systematic approach will help you quickly pinpoint and resolve issues during daily operations in your Kubernetes cluster. Happy troubleshooting!

For further reading:

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Troubleshooting Kubernetes](https://kubernetes.io/docs/tasks/debug-application-cluster/troubleshooting/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/aff99955-65fd-443e-950f-3b25d3311bc2/lesson/02a49efd-57fb-40fb-853e-da05e4f30eee)**
>
> Watch video content
