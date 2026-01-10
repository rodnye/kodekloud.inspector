# Manage layered storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-and-Configure-File-Systems/Manage-layered-storage)

---

## Table of Contents

- Manage layered storage
  - Installing and Starting Stratis
  - Creating a Storage Pool
  - Creating a Filesystem
  - Mounting the Filesystem
  - Expanding the Storage Pool
  - Creating and Restoring Filesystem Snapshots
  - Watch Video
  - Practice Lab
    - Using Snapshots for Data Recovery

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create and Configure File Systems

# Manage layered storage

In this lesson, you will learn how to manage layered storage using Stratis—an advanced storage management tool for Linux. Stratis simplifies working with pools of physical storage, making it easier to configure, deploy, and manage complex storage scenarios.

![The image is a slide with the text "What Is Stratis?" and describes it as a "storage-management tool for Linux."](https://kodekloud.com/kk-media/image/upload/v1752883575/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-layered-storage/what-is-stratis-storage-tool.jpg)

Stratis efficiently handles pools of disks or partitions (block devices) and allows you to create volumes within those pools. These pools enable powerful features such as filesystem snapshots, thin provisioning, and tiering.

![The image is a diagram illustrating a network of servers connected to databases, labeled "What Is Stratis?" at the top. It shows three servers linked to two databases, suggesting a storage or data management system.](https://kodekloud.com/kk-media/image/upload/v1752883576/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-layered-storage/what-is-stratis-network-diagram.jpg)

![The image is a presentation slide titled "What Is Stratis?" featuring three icons with labels: "Filesystem Snapshots," "Thin Provisioning," and "Tiering."](https://kodekloud.com/kk-media/image/upload/v1752883576/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-layered-storage/what-is-stratis-filesystem-snapshots.jpg)

While similar to LVM, Stratis offers a simpler and more straightforward approach. It utilizes the XFS filesystem for managing file systems.

> [!important]
> **Warning**
>
> Do not use traditional XFS command-line tools on filesystems managed by Stratis, as this may lead to unexpected behavior.

![The image is a diagram explaining "What Is Stratis?" with sections labeled "Configure," "Deploy," "Manage," and "XFS File System." It includes a warning not to use XFS tools to manage the Stratis filesystem.](https://kodekloud.com/kk-media/image/upload/v1752883578/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Manage-layered-storage/what-is-stratis-diagram.jpg)

## Installing and Starting Stratis

If Stratis is not yet installed on your machine, you can easily add it using YUM. Install both the `stratisd` daemon and the `stratis-cli` command-line interface. Then, start and enable the Stratis service to run automatically at boot time:

```
sudo yum install stratisd stratis-cli
sudo systemctl enable --now stratisd.service
```

## Creating a Storage Pool

After installation, verify that you have one or more available block devices (unmounted and not in use) for creating a storage pool. Use the commands below to create a pool.

To create a pool from a single block device:

```
sudo stratis pool create my-pool /dev/vdc
```

To create a pool using multiple block devices (for example, `/dev/vdc` and `/dev/vdd`), list them on the same command line:

```
sudo stratis pool create my-pool /dev/vdc /dev/vdd
```

Verify your pool and review its properties:

```
sudo stratis pool list
```

## Creating a Filesystem

Before storing data, you need to create a filesystem within the pool. In the example below, a filesystem named `myfs1` is created in the pool `my-pool`:

```
sudo stratis fs create my-pool myfs1
```

After creation, inspect the filesystem details:

```
sudo stratis fs
```

This command displays useful information such as the pool name, filesystem name, space usage, creation timestamp, and the device path (commonly in the format `/dev/stratis/<pool>/<filesystem>`).

## Mounting the Filesystem

To access and use the new filesystem, follow these steps:

1.  Create a mount directory:

    ```
    sudo mkdir /mnt/mystratis
    ```

2.  Open the `/etc/fstab` file with a text editor (for example, vi):

    ```
    sudo vi /etc/fstab
    ```

3.  Add the following line to ensure the filesystem mounts automatically at boot time:

    ```
    /dev/stratis/my-pool/myfs1 /mnt/mystratis xfs x-systemd.requires=stratisd.service 0 0
    ```

4.  Mount all filesystems defined in `/etc/fstab`:

    ```
    sudo mount -a
    ```

You can now use your mounted Stratis filesystem. For instance, to copy a file (`/home/aaron/mydata.txt`) to the mounted location:

```
sudo cp /home/aaron/mydata.txt /mnt/mystratis
```

## Expanding the Storage Pool

When you need additional space, Stratis allows you to add new block devices to an existing pool easily. For example, to add the block device `/dev/vdd` to the pool `my-pool`, execute:

```
sudo stratis pool add-data my-pool /dev/vdd
```

Check the updated pool information after adding the new data device:

```
sudo stratis pool list
```

Stratis automatically manages filesystem size adjustments when new storage is incorporated.

## Creating and Restoring Filesystem Snapshots

Stratis supports the creation of snapshots for filesystems, providing an effective method for backups and recovery. To create a snapshot of `myfs1` in the pool `my-pool`, run:

```
sudo stratis fs snapshot my-pool myfs1 myfs1-snapshot
```

Verify the snapshot creation by listing the filesystem details:

```
sudo stratis fs
```

Both the original filesystem (`myfs1`) and its snapshot (`myfs1-snapshot`) should appear.

### Using Snapshots for Data Recovery

> [!important]
> **Note**
>
> Filesystem snapshots are a powerful tool for quickly recovering lost or accidentally deleted data.

If you accidentally delete data (for example, `/mnt/mystratis/mydata.txt`), follow these steps to restore from the snapshot:

1.  Remove the deleted file (if not already deleted):

    ```
    rm /mnt/mystratis/mydata.txt
    ```

2.  Rename the current filesystem (e.g., to `myfs1-old`):

    ```
    sudo stratis fs rename my-pool myfs1 myfs1-old
    ```

3.  Rename the snapshot to use the original filesystem name:

    ```
    sudo stratis fs rename my-pool myfs1-snapshot myfs1
    ```

4.  Unmount and then remount the filesystem:

    ```
    sudo umount /mnt/mystratis
    sudo mount /mnt/mystratis
    ```

5.  Verify the recovery:

    ```
    sudo stratis fs
    ls /mnt/mystratis
    ```

You should now see that `mydata.txt` has been restored as part of the recovered filesystem. Stratis snapshots offer an efficient method to back up data and ensure swift recovery in critical situations.

This concludes our lesson on managing layered storage with Stratis. For more detailed information and advanced usage, consider reviewing the Stratis documentation and additional Linux storage management resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/eb65d854-5137-4776-8ff8-73e274c43a0c/lesson/6f4d3101-8933-491c-a888-3a4c799de6ec)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/eb65d854-5137-4776-8ff8-73e274c43a0c/lesson/999010c5-2e07-46ad-a331-cceb9a0e14b0)**
>
> Practice lab
