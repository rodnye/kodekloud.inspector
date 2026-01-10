# Create and configure encrypted storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Configure-Local-Storage/Create-and-configure-encrypted-storage)

---

## Table of Contents

- Create and configure encrypted storage
  - Setting Up Plain Mode Encryption
  - Configuring LUKS Encryption
  - Encrypting a Specific Partition
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Configure Local Storage

# Create and configure encrypted storage

In this guide, you will learn how to create and configure encrypted storage on a Linux system. Encrypting storage is essential when managing sensitive data, such as credit card numbers. Even if unauthorized users cannot access your files through the operating system, physical theft of the disk can expose unencrypted data.

Encryption transforms readable data into an unreadable format. For example, without the proper password or key, an attacker cannot decipher data such as:

1-2-3-4-5-6-7-8, 1-2-3-4-5-6-7-8

After encryption, the data might appear as a series of random characters:

![The image shows a digital representation of encrypted storage, featuring an icon of a gift box with a sequence of numbers below it, set against a dark background.](https://kodekloud.com/kk-media/image/upload/v1752883542/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Create-and-configure-encrypted-storage/encrypted-storage-gift-box-icon.jpg)

> [!important]
> **Why Encrypt Storage?**
>
> Encryption not only protects data from unauthorized access if the disk is stolen but also ensures that sensitive information remains safe even in environments with high-security requirements.

To implement encryption on a Linux storage device, we utilize Cryptsetup. Cryptsetup offers two primary encryption modes:

- Plain mode
- LUKS (Linux Unified Key Setup)

Plain mode encrypts data directly with a password, whereas LUKS provides enhanced features such as header metadata and simplified key management.

Below, we explain how to set up each encryption mode.

---

## Setting Up Plain Mode Encryption

Suppose you want to encrypt the device `/dev/vde` using plain mode. Run the following command to open the device with password verification. The flag `--verify-passphrase` prompts you to enter the password twice, which helps to avoid typing errors that might lead to data corruption:

```
$ sudo cryptsetup --verify-passphrase open --type plain /dev/vde mysecuredisk
```

In this command:

- `open` instructs Cryptsetup to prepare the device for encrypted read and write operations.
- `--type plain` specifies the plain encryption mode.
- `/dev/vde` represents the physical device to be encrypted.
- `mysecuredisk` names the mapped device, which becomes accessible as `/dev/mapper/mysecuredisk`.

Once the device is mapped, you can create a filesystem on it. For instance, to format it with an XFS filesystem and mount it, execute:

```
$ sudo mkfs.xfs /dev/mapper/mysecuredisk
$ sudo mount /dev/mapper/mysecuredisk /mnt
```

When data is written using `mkfs.xfs`, the Linux kernel automatically encrypts it before saving it to the physical device. Similarly, data is decrypted on the fly when reading from `/dev/mapper/mysecuredisk`.

> [!important]
> **Security Reminder**
>
> Always unmount and close the mapped device when it is not in use. Failing to do so may expose the encrypted data to unauthorized access.

To close the mapped device after use, unmount the filesystem and run:

```
$ sudo umount /mnt
$ sudo cryptsetup close mysecuredisk
```

Closing the device ensures that the data on `/dev/vde` remains fully encrypted and inaccessible without the proper credentials.

---

## Configuring LUKS Encryption

LUKS is generally preferred over plain mode due to its additional features, such as efficient key management and header metadata support. To format a disk or partition with LUKS encryption, use the following command. Note that you must capitalize the "F" in `luksFormat`:

```
$ sudo cryptsetup luksFormat /dev/vde
```

When prompted, type YES in uppercase to confirm formatting. LUKS will ask for the password twice by default, eliminating the need for `--verify-passphrase`.

To change the encryption key on a LUKS-encrypted device later, run:

```
$ sudo cryptsetup luksChangeKey /dev/vde
```

This is much more straightforward than re-encrypting the entire device as required by plain mode.

After formatting with LUKS, open the encrypted device by running:

```
$ sudo cryptsetup open /dev/vde mysecuredisk
```

With LUKS, Cryptsetup automatically detects the encryption method from the header, so there is no need to manually specify the type.

Proceed to create an XFS filesystem and mount it as you would with plain mode:

```
$ sudo mkfs.xfs /dev/mapper/mysecuredisk
$ sudo mount /dev/mapper/mysecuredisk /mnt
```

When finished, unmount and close the device with:

```
$ sudo umount /mnt
$ sudo cryptsetup close mysecuredisk
```

---

## Encrypting a Specific Partition

In some cases, you might want to encrypt only a specific partition rather than an entire disk. For instance, a system could boot from an unencrypted partition (e.g., `/dev/vde1`), while a second partition (`/dev/vde2`) is encrypted to protect personal data. The process remains the same—simply target the desired partition:

For LUKS encryption:

```
$ sudo cryptsetup luksFormat /dev/vde2
```

For plain mode encryption, specify `/dev/vde2` accordingly.

---

## Summary

Both plain mode and LUKS encryption methods can effectively secure data on Linux storage devices. LUKS is typically favored due to its enhanced features and ease of key management. This guide has demonstrated how to:

- Encrypt storage devices using Cryptsetup.
- Create and manage mapped devices.
- Format, mount, and access encrypted filesystems.
- Safeguard data against unauthorized access, even if the physical disk is compromised.

Now, put these techniques into practice to ensure your sensitive data remains secure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/207496ef-0e82-42c8-aa9d-7996cfb968a6/lesson/79677ecb-3e36-44d3-820c-31857ce3a1af)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/207496ef-0e82-42c8-aa9d-7996cfb968a6/lesson/22b6de66-9ae8-41d9-b73f-7efba5271255)**
>
> Practice lab
