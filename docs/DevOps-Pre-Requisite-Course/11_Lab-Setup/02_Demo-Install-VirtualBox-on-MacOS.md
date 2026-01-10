# Demo Install VirtualBox on MacOS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Lab-Setup/Demo-Install-VirtualBox-on-MacOS)

---

## Table of Contents

- Demo Install VirtualBox on MacOS
  - Step 1: Downloading and Installing VirtualBox
  - Step 2: Deploying Virtual Machines
  - Step 3: Extracting the Virtual Disk
  - Step 4: Creating the Virtual Machine in VirtualBox
  - Step 5: Adjusting Settings and Starting the Virtual Machine
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Lab Setup

# Demo Install VirtualBox on MacOS

Welcome to this guide. In this tutorial, you will learn how to set up a lab environment by installing VirtualBox on macOS, deploying virtual machines (VMs), and configuring a pre-built CentOS VM.

─────────────────────────────

## Step 1: Downloading and Installing VirtualBox

Start by visiting the [VirtualBox website](https://www.virtualbox.org). On the download page, select the macOS version and download the installer. After the download is complete, run the executable and follow the installation wizard instructions.

Once the installation finishes, launch the Oracle VM VirtualBox interface. You should see a screen similar to the image below:

![The image shows the Oracle VM VirtualBox Manager interface on a Mac, displaying a welcome message and toolbar options for managing virtual machines.](https://kodekloud.com/kk-media/image/upload/v1752873450/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Install-VirtualBox-on-MacOS/frame_50.jpg)

─────────────────────────────

## Step 2: Deploying Virtual Machines

There are two primary methods to deploy virtual machines:

- **Option A:** Create a new VM and install an operating system by attaching a CD (or ISO image) and following the installation instructions.
- **Option B:** Use pre-configured VM images available online, which can save time if you need to deploy multiple VMs. One reliable source is [osboxes.org](https://www.osboxes.org). Simply click on the "VM images, VirtualBox images" link, then browse the available operating systems and select CentOS. You will be directed to a CentOS page containing download details.

![The image shows download options for CentOS virtual machine images for VMware and VirtualBox, with details like version, size, and SHA256 checksums.](https://kodekloud.com/kk-media/image/upload/v1752873452/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Install-VirtualBox-on-MacOS/frame_110.jpg)

─────────────────────────────

## Step 3: Extracting the Virtual Disk

Download the VirtualBox image for CentOS 7 (64-bit version). The file is distributed as a .7z archive. Using your preferred extraction tool, uncompress the file. Once extraction is complete, locate the folder named "64-bit" and find the file with a .vdi extension—this is your virtual disk image.

─────────────────────────────

## Step 4: Creating the Virtual Machine in VirtualBox

1.  Return to the Oracle VM VirtualBox interface.
2.  Click the **New** button to start creating a new virtual machine.
3.  Enter a name for your VM, select **Linux** as the type, and click **Next**.

On the next screen:

- Assign the desired memory (RAM) size (for example, 1024 MB).
- When prompted to create a virtual hard disk, choose **Use an existing virtual hard disk file** instead of creating a new one. Click **Browse** and navigate to the extracted CentOS 7 .vdi file.

The following images illustrate key steps during VM creation:

![The image shows Oracle VM VirtualBox Manager's memory allocation screen, suggesting 1024 MB RAM for a virtual machine, with options to adjust and continue.](https://kodekloud.com/kk-media/image/upload/v1752873453/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Install-VirtualBox-on-MacOS/frame_160.jpg)

![The image shows the Oracle VM VirtualBox Manager interface, specifically the "Hard disk" setup window, with options to add or use a virtual hard disk.](https://kodekloud.com/kk-media/image/upload/v1752873455/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Install-VirtualBox-on-MacOS/frame_180.jpg)

─────────────────────────────

## Step 5: Adjusting Settings and Starting the Virtual Machine

Before launching your virtual machine, click on **Settings** to fine-tune its configuration:

- Under the **System** tab, increase the CPU allocation to at least 2 cores (adjust as needed based on your hardware capabilities).

![The image shows the Oracle VM VirtualBox Manager interface, displaying settings for a CentOS virtual machine, including processor and execution cap configurations.](https://kodekloud.com/kk-media/image/upload/v1752873456/notes-assets/images/DevOps-Pre-Requisite-Course-Demo-Install-VirtualBox-on-MacOS/frame_210.jpg)

Once your settings are configured, power on the virtual machine to begin booting into CentOS.

─────────────────────────────

> [!important]
> **Note**
>
> Remember to adjust your VM settings according to your system's hardware specifications to ensure optimal performance.

This article has guided you through the process of downloading, installing, and configuring VirtualBox on macOS, as well as deploying a pre-configured CentOS virtual machine. Enjoy exploring and experimenting in your new lab environment!

For further information and troubleshooting, consider visiting the [VirtualBox Documentation](https://www.virtualbox.org/manual/UserManual.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/9c8f26c1-90d7-488f-a675-1b77e777c173/lesson/bea8f627-1583-48b5-87b6-f15818008754)**
>
> Watch video content
