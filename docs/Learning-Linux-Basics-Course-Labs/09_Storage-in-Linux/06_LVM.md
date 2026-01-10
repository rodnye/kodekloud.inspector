# LVM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Storage-in-Linux/LVM)

---

## Table of Contents

- LVM
  - Prerequisites
  - Step 1: Create a Physical Volume
  - Step 2: Create a Volume Group
  - Step 3: Create a Logical Volume
  - Step 4: Create and Mount a Filesystem
  - Step 5: Resize the Logical Volume and Filesystem
  - Access Paths for the Logical Volume
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Learning Linux Basics Course & Labs

Storage in Linux

# LVM

In this lesson, we explore the Logical Volume Manager (LVM), a powerful tool that enables you to group multiple physical volumes (disks or partitions) into a single volume group (VG). From the volume group, you can then allocate one or more logical volumes (LVs). While our example uses three partitions, LVM is flexible enough to work with a single disk, multiple disks, or even an unlimited number of partitions grouped under a single VG.

> [!important]
> **Dynamic Resizing**
>
> One of LVM’s most significant advantages is its ability to resize logical volumes dynamically, provided there is sufficient free space in the volume group. This feature is especially useful for systems with changing storage requirements.

## Prerequisites

Before you begin, ensure that the LVM2 package is installed on your system. Use the command below to install LVM2:

```
apt-get install lvm2
```

## Step 1: Create a Physical Volume

The initial step in configuring LVM is to identify available disks or partitions and create physical volumes (PVs) from them. A physical volume represents the disk or partition in LVM.

For example, to create a physical volume on the device path `/dev/sdb`, execute:

```
pvcreate /dev/sdb
```

Expected output:

```
Physical volume "/dev/sdb" successfully created
```

## Step 2: Create a Volume Group

Once the physical volume is established, create a volume group (VG) that will host your logical volumes. In this example, the VG is named `caleston_vg` and includes `/dev/sdb`:

```
vgcreate caleston_vg /dev/sdb
```

Expected output:

```
Volume group "caleston_vg" successfully created
```

To display details about the physical volume, run:

```
pvdisplay
```

Sample output:

```
--- Physical volume ---
PV Name               /dev/sdb
VG Name               caleston_vg
PV Size               20.00 GiB / not usable 3.00 MiB
Allocatable           yes
PE Size               4.00 MiB
Total PE              5119
Free PE               5119
Allocated PE          0
PV UUID               iDCXIN-En2h-5IlJ-Yjqv-GcsR-gDfV-zaf66E
```

For further information about the volume group, use:

```
vgdisplay
```

Sample output:

```
--- Volume group ---
VG Name               caleston_vg
System ID             LVM2-XXXXXX
Format                lvm2
Metadata Areas        1
Metadata Sequence No  1
VG Access             read/write
VG Status             resizable
MAX LV                0
Cur LV                0
Open LV               0
Max PV                0
Cur PV                1
Act PV                1
VG Size               20.00 GiB
PE Size               4.00 MiB
Total PE              5119
Alloc PE / Size       0 / 0
Free PE / Size        5119 / 20.00 GiB
VG UUID               VzmIAn-9cEl5bA-lVtm-wHKX-KQaObR
```

## Step 3: Create a Logical Volume

After establishing the volume group, create a logical volume (LV). In this example, we create a 1GB LV named `vol1` within the `caleston_vg` volume group:

```
lvcreate -L 1G -n vol1 caleston_vg
```

Expected output:

```
Logical volume "vol1" created.
```

To verify that the LV was created successfully, list all logical volumes:

```
lvs
```

Sample output:

```
LV      VG          Attr       LSize   Pool
vol1    caleston_vg -wi-a----- 1.00g
```

## Step 4: Create and Mount a Filesystem

With your logical volume in place, the next step is to create a filesystem on it. In this example, we create an ext4 filesystem on `/dev/caleston_vg/vol1`:

```
mkfs.ext4 /dev/caleston_vg/vol1
```

After the filesystem is created, mount it to a directory (e.g., `/mnt/vol1`) to make it accessible:

```
mount -t ext4 /dev/caleston_vg/vol1 /mnt/vol1
```

## Step 5: Resize the Logical Volume and Filesystem

Sometimes you may need to expand the logical volume while it remains mounted. Begin by verifying that there is sufficient free space in the volume group:

```
vgs
```

Sample output:

```
 VG           #PV #LV #SN Attr   VSize  VFree
 caleston_vg   1  1   1   0 wz--n- 20.00g 19.00g
```

If there is enough free space, extend the logical volume by an additional 1GB:

```
lvresize -L +1G /dev/caleston_vg/vol1
```

Expected output:

```
Logical volume vol1 successfully resized.
```

> [!important]
> **Important**
>
> At this stage, even after resizing the logical volume, the filesystem will still report its original size (1GB) when using the `df` command because only the LV has been extended. It is essential to also resize the filesystem with the `resize2fs` command.

Resize the filesystem using:

```
resize2fs /dev/caleston_vg/vol1
```

The output will indicate that the filesystem has been resized. Finally, verify the new filesystem size:

```
df -hP /mnt/vol1
```

Sample output:

```
Filesystem                      Size  Used Avail Use% Mounted on
/dev/mapper/caleston_vg-vol1     2.0G  1.6M  1.9G   1% /mnt/vol1
```

## Access Paths for the Logical Volume

It’s important to note that the logical volume can be accessed through two different paths:

- /dev/caleston_vg/vol1
- /dev/mapper/caleston_vg-vol1

Both paths refer to the same logical volume, so you can use either interchangeably in your commands and configurations.

## Conclusion

This lesson has walked you through the fundamental steps of setting up and managing LVM—from creating physical volumes and volume groups to creating, mounting, and resizing logical volumes and filesystems. Regular practice of these operations will help solidify your understanding of LVM's flexibility and scalability.

For further reading and advanced concepts, consider exploring additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/f6fac38a-495f-42a6-b4a1-3fcc2f8375ac)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/edd2515f-a32d-41b2-9299-eedfa62eb676)**
>
> Practice lab
