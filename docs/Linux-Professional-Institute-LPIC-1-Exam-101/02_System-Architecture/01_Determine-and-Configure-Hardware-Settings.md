# Determine and Configure Hardware Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/System-Architecture/Determine-and-Configure-Hardware-Settings)

---

## Table of Contents

- Determine and Configure Hardware Settings
  - 1. Firmware Configuration: BIOS vs UEFI
  - 2. Detecting Hardware in Linux
  - 3. Managing Kernel Modules
  - 4. Kernel Information Files (/proc and /sys)
  - Watch Video
    - 2.1 Inspecting PCI Devices with lspci
    - 2.2 Inspecting USB Devices with lsusb
    - 3.1 Persistent Module Configuration

---

## Content

Linux Professional Institute LPIC-1 Exam 101

System Architecture

# Determine and Configure Hardware Settings

Modern hardware requires proper configuration before and after installing an operating system. In this guide, you’ll learn how to configure firmware settings (BIOS/UEFI), detect hardware in Linux, inspect devices on PCI and USB buses, manage kernel modules, and explore kernel information in `/proc` and `/sys`.

## 1\. Firmware Configuration: BIOS vs UEFI

Computers use firmware interfaces to initialize hardware and start the boot process. Legacy systems rely on BIOS (Basic Input/Output System), while most modern machines use UEFI (Unified Extensible Firmware Interface).

| Feature                   | BIOS                                | UEFI                                                |
| ------------------------- | ----------------------------------- | --------------------------------------------------- |
| Initialization            | Legacy MBR boot                     | GPT support, faster boot                            |
| Configuration interface   | Text-based menu                     | Graphical menu, mouse support                       |
| Firmware updates          | Manufacturer-specific flasher tools | Built-in update utilities                           |
| Hardware testing & config | Basic POST (Power-On Self-Test)     | Extended diagnostics, secure boot, variable storage |

![The image is a diagram explaining the acronyms BIOS, UEFI, and POST, with their full forms: Basic Input/Output System, Unified Extensible Firmware Interface, and Power-On Self-Test.](https://kodekloud.com/kk-media/image/upload/v1752881459/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Determine-and-Configure-Hardware-Settings/bios-uefi-post-acronyms-diagram.jpg)

During POST, your firmware checks CPU, memory, and motherboard health. To enter the setup utility, press the key shown on-screen (often **F2**, **Delete**, or **F12**). Inside you can:

- Set the hardware clock’s date and time
- Enable/disable onboard peripherals (LAN, audio)
- Configure RAM error protection (ECC)
- Adjust IRQ and DMA channels
- Define boot device priority
- Enable performance features (XMP, virtualization)
- Disable unused hardware for security or power saving

> [!important]
> **Warning**
>
> Changing firmware settings can affect system stability. Always document original values before modifying.

## 2\. Detecting Hardware in Linux

Once Linux boots, it discovers and initializes hardware. Missing devices usually indicate a faulty component or port; detected but non-functional devices often need the correct kernel module (driver).  
Here are the primary inspection tools:

| Tool    | Purpose                    | Example       |
| ------- | -------------------------- | ------------- |
| lspci   | List PCI/PCIe devices      | `sudo lspci`  |
| lsusb   | List USB devices           | `sudo lsusb`  |
| lsmod   | Show loaded kernel modules | `lsmod`       |
| modinfo | Display module details     | `modinfo snd` |

### 2.1 Inspecting PCI Devices with lspci

The `lspci` utility enumerates PCI/PCIe devices:

```
sudo lspci
```

Sample output:

```
00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma] (rev 02)
00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller (rev 02)
00:0c.0 USB controller: Intel Corporation 7 Series/C210 Series Chipset Family USB xHCI
```

To get verbose details for a specific device (e.g., `00:03.0`):

```
sudo lspci -s 00:03.0 -v
```

Show only kernel driver info:

```
sudo lspci -s 00:03.0 -k
```

### 2.2 Inspecting USB Devices with lsusb

List all USB devices:

```
sudo lsusb
```

For a tree-view with drivers and speeds:

```
sudo lsusb -t
```

Query a specific device by bus and device number:

```
sudo lsusb -s 01:20
```

## 3\. Managing Kernel Modules

Kernel modules enable Linux to communicate with hardware.

```
# List loaded modules
lsmod


# Filter for sound-related modules
lsmod | fgrep -i snd
```

Unload (remove) a module:

```
sudo modprobe -r snd_hda_intel
```

> [!important]
> **Warning**
>
> Unloading critical modules (e.g., storage or network drivers) can render your system unbootable. Proceed with caution.

View detailed information about a module:

```
modinfo snd
```

List only parameters:

```
modinfo snd -p
```

### 3.1 Persistent Module Configuration

To apply module parameters at boot or blacklist unwanted modules, use files in `/etc/modprobe.d/`:

| Config File                      | Purpose                      |
| -------------------------------- | ---------------------------- |
| `/etc/modprobe.d/<module>.conf`  | Set parameters for a module  |
| `/etc/modprobe.d/blacklist.conf` | Prevent modules from loading |
| `/etc/modprobe.conf`             | Legacy configuration file    |

Example: blacklisting the `snd` driver:

```
blacklist snd
```

## 4\. Kernel Information Files (/proc and /sys)

Linux exposes hardware and process information via two virtual filesystems:

- `/proc`: Process and kernel data (e.g., `/proc/cpuinfo`)
- `/sys`: Device and driver attributes (e.g., `/sys/class/net`)

![The image is a slide titled "Information and Device Files," describing the `/proc` and `/sys` directories as special directories in RAM used by the kernel to store information on running processes.](https://kodekloud.com/kk-media/image/upload/v1752881460/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Determine-and-Configure-Hardware-Settings/information-device-files-proc-sys-slide.jpg)

> [!important]
> **Note**
>
> Since `/proc` and `/sys` reside in volatile memory, their contents reset on reboot.

---

Continue to the quiz to test your understanding of Linux hardware configuration and inspection.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/55c2d118-3a85-4da1-8a7f-e9f8671cc818/lesson/5985cc6f-eacb-4c02-bc57-2317e64ce94f)**
>
> Watch video content
