# Solution Explore CNI optional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Networking/Solution-Explore-CNI-optional)

---

## Table of Contents

- Solution Explore CNI optional
  - 1. Inspecting the Kubelet Service
  - 2. Locating the CNI Plugin Binaries
  - 3. Identifying the Missing CNI Plugin
  - 4. Determining the Configured CNI Plugin
  - 5. Verifying the CNI Plugin Configuration
  - 6. Summary
  - Watch Video
  - Practice Lab

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Networking

# Solution Explore CNI optional

In this guide, we explore how to inspect your Kubernetes cluster configuration to answer key questions about the container runtime endpoint and the CNI (Container Network Interface) plugins in use. By following these steps, you'll gain detailed insights into your cluster's networking setup and plugin configuration.

---

## 1\. Inspecting the Kubelet Service

To determine the container runtime endpoint configured for your Kubernetes cluster, start by inspecting the Kubelet service. Run the following command to view the running Kubelet processes:

```
ps aux | grep -i kubelet
```

Since this command returns multiple lines, narrow down the output by filtering for the "container-runtime" flag:

```
ps aux | grep -i kubelet | grep container-runtime
```

The output should reveal a flag like:

```
--container-runtime-endpoint=unix:///var/run/containerd/containerd.sock
```

> > [!important]
> > **Note**
> >
> > This output confirms that your cluster is using Containerd as the container runtime.

---

## 2\. Locating the CNI Plugin Binaries

Next, identify where the CNI-supported plugin binaries are stored. The default location is:

```
/opt/cni/bin
```

List the contents of this directory to see the available plugins:

```
ls /opt/cni/bin
```

You should see an output similar to:

```
bandwidth  dhcp       firewall   host-device   ipvlan   macvlan   ptp      static   vlan
bridge     dummy      flannel    host-local    loopback portmap   sbr      tuning   vrf
```

---

## 3\. Identifying the Missing CNI Plugin

Review the listed plugins to identify which CNI plugin is not available on the host. Although "vlan" is present, a closer look reveals that the Cisco plugin is missing. Verification against common plugins like "bridge" and "dhcp" confirms this.

---

## 4\. Determining the Configured CNI Plugin

To discover which CNI plugin is configured for your Kubernetes cluster, examine the CNI configuration directory:

```
ls /etc/cni/net.d/
```

The output should list:

```
10-flannel.conflist
```

This confirms that the Flannel CNI plugin is set up as the network provider.

---

## 5\. Verifying the CNI Plugin Configuration

After a container and its associated namespaces are created, the Kubelet runs the executable defined in the CNI configuration file. To review the Flannel configuration, navigate to the configuration directory and display the file content:

```
cd /etc/cni/net.d/
cat 10-flannel.conflist
```

The contents of `10-flannel.conflist` will be similar to:

```
{
  "name": "cbr0",
  "cniVersion": "0.3.1",
  "plugins": [
    {
      "type": "flannel",
      "delegate": {
        "hairpinMode": true,
        "isDefaultGateway": true
      }
    },
    {
      "type": "portmap",
      "capabilities": {
        "portMappings": true
      }
    }
  ]
}
```

This confirms that the Flannel plugin is used for the primary CNI overlay, supplemented by the Portmap plugin to handle container port mappings.

---

## 6\. Summary

Below is a concise summary of the key points covered:

- The container runtime endpoint is set to:  
  `unix:///var/run/containerd/containerd.sock`
- CNI plugin binaries are located in `/opt/cni/bin`, with the Cisco plugin missing.
- The active network configuration in `/etc/cni/net.d/10-flannel.conflist` indicates that the Flannel CNI plugin is in use alongside the Portmap plugin.

> > [!important]
> > **Note**
> >
> > Always ensure that your cluster's configuration is verified in staging environments before applying changes to production.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/e407aade-4765-44a3-a873-e44b25b5864d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/44bc9a9f-319c-40ee-babd-0f7b53a70de7/lesson/fac1f6a4-f946-4300-82e2-2bb5ca0f5a60)**
>
> Practice lab
