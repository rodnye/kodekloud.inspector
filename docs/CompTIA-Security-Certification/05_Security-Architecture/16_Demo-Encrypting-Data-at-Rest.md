# Demo Encrypting Data at Rest - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Architecture/Demo-Encrypting-Data-at-Rest)

---

## Table of Contents

- Demo Encrypting Data at Rest
  - Step 1: Setting Up an Encrypted Disk Using Plain Encryption
  - Step 2: Creating an XFS File System on the Mapped Device
  - Step 3: Closing the Mapped Device
  - Step 4: Formatting a Device with LUKS Encryption
  - Step 5: Verifying the LUKS Encrypted Device
  - Watch Video
  - Practice Lab

---

## Content

CompTIA Security+ Certification

Security Architecture

# Demo Encrypting Data at Rest

Welcome to this demo from the KodeKloud [CompTIA Security+ Certification Preparation Course](https://learn.kodekloud.com/user/courses/comptia-security-certification). In this guide, we explain how to secure data at rest by configuring full-disk encryption on a Linux host. Full-disk encryption is essential for protecting confidential data and preventing unauthorized access in scenarios such as server theft, compromise, or repurposing.

Below, you will find a step-by-step process to set up an encrypted disk, create an XFS file system on the encrypted device, close the device mapping, and format another device with LUKS encryption.

---

## Step 1: Setting Up an Encrypted Disk Using Plain Encryption

Begin by setting up an encrypted disk with plain encryption. In this example, the mapped device is named "secretdisk". Run the following command:

```
sudo cryptsetup open --type plain /dev/vdb secretdisk
```

Enter the passphrase when prompted (for example, "s3" or the one specified in your lab instructions).

---

## Step 2: Creating an XFS File System on the Mapped Device

With the encrypted device activated, create an XFS file system on it by executing:

```
sudo mkfs.xfs /dev/mapper/secretdisk
```

This command outputs confirmation details, including metadata such as block size and inode size.

---

## Step 3: Closing the Mapped Device

After verifying that the file system has been created successfully, remove the encryption mapping to secure your configuration with:

```
sudo cryptsetup close secretdisk
```

This action finalizes the plain encryption setup for the device.

---

## Step 4: Formatting a Device with LUKS Encryption

Next, transition to formatting a device using LUKS encryption, which offers enhanced security features. The process involves the following steps:

1.  Open and initialize the encrypted device with plain encryption.
2.  Create the XFS file system.
3.  Close the mapped device.
4.  Format the target device with LUKS encryption.

Execute the combined commands below:

```
# Open the encrypted device (using plain encryption) and create a file system
sudo cryptsetup open --type plain /dev/vdb secretdisk
sudo mkfs.xfs /dev/mapper/secretdisk
sudo cryptsetup close secretdisk


# Format the device using LUKS encryption (this will irreversibly overwrite data)
sudo cryptsetup luksFormat /dev/vdc
```

> [!important]
> **Warning**
>
> Executing the luksFormat command will erase all data on /dev/vdc permanently. Confirm by typing "YES" in capital letters, and then enter and verify the passphrase when prompted.

---

## Step 5: Verifying the LUKS Encrypted Device

To verify that the LUKS encryption is operational, unlock the encrypted device with:

```
sudo cryptsetup luksOpen /dev/vdc securedisk
```

Enter the correct passphrase when requested. After successfully opening the device, you may proceed to create a file system or perform additional checks. For example, to create an XFS file system and then close the device, run:

```
sudo mkfs.xfs /dev/mapper/securedisk
sudo cryptsetup close securedisk
```

---

With these steps, you have successfully implemented full-disk encryption using both plain and LUKS methods on a Linux host. This encryption strategy safeguards your data even if the server is physically compromised.

> [!important]
> **Next Steps**
>
> In our upcoming article, we will explore advanced security features to further assist you in your journey towards CompTIA Security+ certification.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/f2757634-6347-4186-a981-c205389f227e/lesson/376fe84d-cd1c-413d-b394-61f93ec1d01b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/f2757634-6347-4186-a981-c205389f227e/lesson/9514c3ac-f2ba-47c8-844c-46cfc88171fc)**
>
> Practice lab
