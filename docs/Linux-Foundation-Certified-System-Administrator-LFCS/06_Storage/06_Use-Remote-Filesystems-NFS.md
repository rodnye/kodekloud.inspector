# Use Remote Filesystems NFS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Storage/Use-Remote-Filesystems-NFS)

---

## Table of Contents

- Use Remote Filesystems NFS
  - Configuring the NFS Server
  - Configuring the NFS Client
  - Summary
  - Watch Video
  - Practice Lab
    - Step 1: Install the NFS Server Package
    - Step 2: Define File System Shares
    - Understanding Export Options
    - Adding an Export Example
    - Mounting an NFS Share
    - Auto-Mounting at Boot

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Storage

# Use Remote Filesystems NFS

In previous lessons, we explored working with local file systems and local block storage devices—data stored on the same system where you are logged in. In this lesson, we focus on using remote file systems by leveraging the Network File System (NFS) protocol, a popular method for sharing data between Linux computers.

![The image illustrates the Network Filesystem Protocol (NFS) with two computers running Linux, connected by a file-sharing icon, emphasizing that protocols act as a "language."](https://kodekloud.com/kk-media/image/upload/v1752881369/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Use-Remote-Filesystems-NFS/nfs-network-filesystem-protocol.jpg)

NFS operates based on a two-step process:

1.  Configuring an NFS server to share a file system with remote machines.
2.  Setting up an NFS client to mount the remote file system.

![The image illustrates the Network Filesystem Protocol (NFS) with a diagram showing an NFS server and NFS clients connected through the protocol.](https://kodekloud.com/kk-media/image/upload/v1752881369/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Use-Remote-Filesystems-NFS/nfs-protocol-server-clients-diagram.jpg)

> [!important]
> **Overview**
>
> The NFS protocol simplifies remote file sharing by standardizing communication between the server and client. This allows Linux systems to seamlessly share and access files over the network.

## Configuring the NFS Server

Begin by setting up the NFS server—the system that shares data with clients.

### Step 1: Install the NFS Server Package

Install the necessary package using the following command:

```
sudo apt install nfs-kernel-server
```

### Step 2: Define File System Shares

Specify which directories to share by editing the `/etc/exports` file. Open the file with your preferred text editor:

```
sudo vim /etc/exports
```

Inside this file, you will see commented examples that illustrate the basic syntax. The general format for an export declaration is:

1.  The directory to be shared (e.g., `/nfs/disk1/backups` or `/srv/homes`).
2.  One or more allowed NFS clients (specified as hostnames, fully qualified domain names, or IP addresses).
3.  Optionally, a range of IP addresses can be allowed using CIDR notation (e.g., `10.0.16.0/24`).
4.  Export options enclosed in parentheses, such as `(rw,sync,no_subtree_check)` for read/write access or `(ro,sync,no_subtree_check)` for read-only access.

Here’s an example configuration in `/etc/exports`:

```
# Example export configuration:
"/nfs/disk1/backups"  hostname1(rw,sync,no_subtree_check) hostname2(ro,sync,no_subtree_check)
# You can replace 'hostname1' with an IP like "10.0.0.9", or use a CIDR range like "10.0.16.0/24"
```

### Understanding Export Options

- **rw**: Permits both read and write operations.
- **ro**: Restricts the share to read-only access.
- **sync**: Ensures data is written to the storage device before confirming the operation.
- **async**: Allows asynchronous writes, which can boost performance but might risk data loss in sudden reboots.
- **no_subtree_check**: Disables subtree checking, which avoids potential issues when files are moved or renamed.
- **no_root_squash**: By default, NFS remaps client root users to a lesser privileged user (`nobody`). This option lets the client's root user retain root privileges on the remote share.

For additional details and options, refer to the manual page:

```
man exports
```

### Adding an Export Example

To share the `/etc` directory with a computer having IP address `127.0.0.1` (read-only), add the following line to `/etc/exports`:

```
/etc 127.0.0.1(ro,sync,no_subtree_check)
```

After modifying the file, re-export the directories to update the NFS server's configuration:

```
sudo exportfs -r
```

The `-r` flag forces the server to refresh its list of shared directories. To confirm the current exports and their settings, run:

```
sudo exportfs -v
```

> [!important]
> **Export Options Usage**
>
> When using wildcards in client specifications, ensure there are no additional spaces between the hostname (or wildcard) and the opening parenthesis. For example:
>
> ```
> /etc *.example.com(ro,sync,no_subtree_check)
> ```

## Configuring the NFS Client

Configuring the client side is straightforward. First, install the necessary NFS utilities:

```
sudo apt install nfs-common
```

### Mounting an NFS Share

Assuming an NFS server is sharing the `/etc` directory, you can mount it using:

```
sudo mount IP_or_hostname_of_server:/path/to/remote/directory /path/to/local/directory
```

For example, to mount the `/etc` directory from an NFS server at `127.0.0.1` to your local `/mnt` directory, run:

```
sudo mount 127.0.0.1:/etc /mnt
```

Similarly, if using a hostname such as `server1`, the command becomes:

```
sudo mount server1:/etc /mnt
```

To unmount the NFS share later, execute:

```
sudo umount /mnt
```

### Auto-Mounting at Boot

To mount the NFS share automatically during system boot, edit the `/etc/fstab` file:

```
sudo vim /etc/fstab
```

Then add a line similar to the following:

```
127.0.0.1:/etc /mnt nfs defaults 0 0
```

This entry includes:

- **Source:** `127.0.0.1:/etc`
- **Mount Point:** `/mnt`
- **File System Type:** `nfs`
- **Mount Options:** `defaults` (modifiable based on requirements)
- **Dump and Pass Fields:** Both set to `0` for a network-mounted file system

An example snippet from your `/etc/fstab` might look like:

```
# /etc/fstab: static file system information.
#
# <file system>                    <mount point>    <type>    <options>         <dump>  <pass>
/       ext4    defaults        0       1
/dev/disk/by-uuid/ec83bbc6-458e-490c-9188-2d5cc97a0e20 /boot ext4 defaults 0 1
127.0.0.1:/etc                     /mnt            nfs       defaults          0       0
```

> [!important]
> **Caution**
>
> Ensure that your NFS server and client firewall settings allow NFS traffic. Any network restrictions might prevent proper communication between the systems.

## Summary

This lesson covered the essential steps for setting up an NFS server and configuring NFS clients to mount remote file systems. You learned how to:

- Install and configure the NFS server package.
- Define shared directories using the `/etc/exports` file and understand key export options.
- Verify and manage the shared directories with `exportfs`.
- Install NFS utilities on the client side, mount and unmount the NFS share, and configure automatic mounting using the `/etc/fstab` file.

With this knowledge, you can efficiently share file systems between Linux systems using NFS.

Let's move on to the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/5b495aba-191e-4ec2-b602-1f876e44e8c4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cfd9ce0f-72d4-40ec-97cd-875899512ff2/lesson/424ed662-87a9-455b-b936-56daef503d87)**
>
> Practice lab
