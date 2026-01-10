# Linux as a Virtualization Guest VIrtual Machines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Linux-as-a-Virtualization-Guest-VIrtual-Machines)

---

## Table of Contents

- Linux as a Virtualization Guest VIrtual Machines
  - 1. Installing Dependencies
  - 2. Defining a Virtual Machine Domain
  - 3. Defining and Listing Domains
  - 4. VM Lifecycle Management
  - 5. Deleting a Domain
  - 6. Autostart Configuration
  - 7. Inspecting VM Details
  - 8. Modifying VM Resources
  - 9. Starting and Verifying Changes
  - Quick Reference: Common virsh Commands
  - References
  - Watch Video
    - Adjusting vCPUs
    - Adjusting Memory

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Linux as a Virtualization Guest VIrtual Machines

In this guide, you’ll learn how to manage virtual machines (VMs) on Linux using QEMU-KVM and Libvirt’s `virsh` CLI. By the end, you will be able to install dependencies, define VM domains via XML, control VM lifecycle, adjust resources, and clean up definitions—all from the command line. This workflow is fundamental for self-hosted virtualization and supports major cloud platforms like [AWS](https://aws.amazon.com), [DigitalOcean](https://www.digitalocean.com), and [Google Cloud](https://cloud.google.com).

Example: A single Linux server with 64 CPU cores and 1 TiB RAM can host dozens of isolated VMs, each with its own dedicated vCPU and memory allocation.

---

## 1\. Installing Dependencies

Install QEMU, KVM, and Libvirt tools:

```
sudo dnf install -y qemu-kvm libvirt
```

- **qemu-kvm**: Hardware-accelerated virtualization
- **libvirt**: API and utilities for managing VMs

> [!important]
> **Note**
>
> You may also need to start and enable the libvirtd service:
>
> ```
> sudo systemctl enable --now libvirtd
> ```

---

## 2\. Defining a Virtual Machine Domain

Libvirt uses XML to describe VM configurations (called _domains_). Create a file named `testmachine.xml`:

```
vim testmachine.xml
```

Paste this minimal configuration:

```
<domain type="kvm">
  <name>TestMachine</name>
  <memory unit="GiB">1</memory>
  <vcpu>1</vcpu>
  <os>
    <type arch="x86_64">hvm</type>
  </os>
</domain>
```

This sets:

- **Name**: TestMachine
- **Memory**: 1 GiB
- **vCPUs**: 1
- **OS**: Hardware VM on x86_64

Save and exit.

---

## 3\. Defining and Listing Domains

Register the domain with Libvirt:

```
virsh define testmachine.xml
```

Expected output:

```
Domain 'TestMachine' defined from testmachine.xml
```

List all domains, including inactive:

```
virsh list --all
```

Sample:

| Id  | Name        | State    |
| --- | ----------- | -------- |
| \\- | TestMachine | shut off |

> [!important]
> **Note**
>
> Omit `--all` to list only running domains.

---

## 4\. VM Lifecycle Management

Use the following commands to control the VM. See the quick reference table below.

| Action            | Command                      |
| ----------------- | ---------------------------- |
| Start             | `virsh start TestMachine`    |
| Graceful reboot   | `virsh reboot TestMachine`   |
| Forced reset      | `virsh reset TestMachine`    |
| Graceful shutdown | `virsh shutdown TestMachine` |
| Forced power-off  | `virsh destroy TestMachine`  |

```
# Example: Start the VM
virsh start TestMachine

# Verify running VMs
virsh list
```

> `reset` simulates pressing the reset button.  
> `destroy` cuts power immediately—like unplugging the VM.

---

## 5\. Deleting a Domain

Remove the domain definition only:

```
virsh undefine TestMachine
```

> [!important]
> **Warning**
>
> `--remove-all-storage` will also delete associated disk images:
>
> ```
> virsh undefine TestMachine --remove-all-storage
> ```

---

## 6\. Autostart Configuration

Enable the VM to start on host boot:

```
virsh autostart TestMachine
```

Disable autostart:

```
virsh autostart --disable TestMachine
```

---

## 7\. Inspecting VM Details

Retrieve detailed VM information:

```
virsh dominfo TestMachine
```

Sample output:

```
Id:             -
Name:           TestMachine
UUID:           01a57937-3fbb-4191-9cec-a73383456fa8
OS Type:        hvm
State:          shut off
CPU(s):         1
Max memory:     1048576 KiB
Used memory:    1048576 KiB
Persistent:     yes
Autostart:      disable
```

---

## 8\. Modifying VM Resources

### Adjusting vCPUs

Increase maximum vCPUs:

```
virsh setvcpus TestMachine 2 --config --maximum
```

Set vCPUs for next boot:

```
virsh setvcpus TestMachine 2 --config
```

### Adjusting Memory

Set maximum memory:

```
virsh setmaxmem TestMachine 2048M --config
```

Verify changes:

```
virsh dominfo TestMachine
```

---

## 9\. Starting and Verifying Changes

Start the VM with updated resources:

```
virsh start TestMachine
```

Confirm the running state:

```
virsh dominfo TestMachine
```

Expected fields:

```
State:        running
CPU(s):       2
Max memory:   2097152 KiB
Used memory:  2097152 KiB
```

---

## Quick Reference: Common `virsh` Commands

| Command                                                        | Description                |
| -------------------------------------------------------------- | -------------------------- |
| virsh define <file>.xml                                        | Define a new VM domain     |
| virsh start <domain>                                           | Start a VM                 |
| virsh shutdown <domain>                                        | Graceful shutdown          |
| virsh destroy <domain>                                         | Forced power off           |
| virsh reboot <domain>                                          | Reboot VM                  |
| virsh reset <domain>                                           | Forced reset               |
| virsh list \\[--all\\]                                         | List VMs (active/inactive) |
| virsh undefine <domain> \\[--remove-all-storage\\]             | Remove VM definition       |
| virsh autostart <domain> \\[--disable\\]                       | Enable/disable autostart   |
| virsh dominfo <domain>                                         | Show domain information    |
| virsh setvcpus <domain> <count> \\[--config\\] \\[--maximum\\] | Adjust vCPUs               |
| virsh setmaxmem <domain> <size> \\[--config\\]                 | Adjust max memory          |

---

## References

- [Libvirt Documentation](https://libvirt.org/docs.html)
- [QEMU Official Website](https://www.qemu.org/)
- [KVM on Linux](https://www.linux-kvm.org/)
- [Cloud Providers Comparison](https://aws.amazon.com/compare/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/6cd15bbf-73f8-4fee-9bfb-c6923d53698e)**
>
> Watch video content
