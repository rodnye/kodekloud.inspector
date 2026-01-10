# Demo Migrating an EBS Volumes from Unencrypted to Encrypted - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted)

---

## Table of Contents

- Demo Migrating an EBS Volumes from Unencrypted to Encrypted
  - Step 1: Creating an Unencrypted EBS Volume
  - Step 2: Creating a Snapshot of the Unencrypted Volume
  - Step 3: Creating a New Encrypted Volume from the Snapshot
  - Step 4: Verifying the Encrypted Volume
  - Step 5: Creating an Encrypted Snapshot for Future Use
  - Process Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# Demo Migrating an EBS Volumes from Unencrypted to Encrypted

Welcome to this step-by-step demonstration on migrating an unencrypted AWS Elastic Block Store (EBS) volume to an encrypted one. In this guide, you will learn how to:

1.  Create an unencrypted EBS volume.
2.  Create a snapshot of the unencrypted volume.
3.  Create a new volume from this snapshot with encryption enabled.
4.  Verify the new encrypted volume.
5.  Create an encrypted snapshot from the encrypted volume for future use.

This process preserves your data while ensuring that your volume is secured with encryption.

## Step 1: Creating an Unencrypted EBS Volume

Begin by creating a simple, general-purpose 100 GB EBS volume without encryption. At this stage, no tags are applied, and the volume remains unencrypted. The AWS console below shows the configuration options for this volume:

![The image shows an AWS console screen for configuring an EBS volume, with options for volume type, size, IOPS, throughput, availability zone, snapshot ID, and encryption.](https://kodekloud.com/kk-media/image/upload/v1752860451/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted/aws-console-ebs-volume-configuration.jpg)

Once the volume is successfully created, verify that its status is set to "okay" (using GP3 with 100 GB and configured IOPS). The key detail to note is that the volume label indicates it is unencrypted.

## Step 2: Creating a Snapshot of the Unencrypted Volume

Since AWS does not provide a direct mechanism for converting an unencrypted volume to an encrypted one, the solution is to create a snapshot from the unencrypted volume. Remember that the snapshot will inherit the encryption state of the original volume, meaning it will also be unencrypted.

![The image shows an AWS interface for creating a snapshot of an unencrypted EBS volume, with fields for volume ID, availability zone, and description.](https://kodekloud.com/kk-media/image/upload/v1752860452/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted/aws-ebs-snapshot-interface.jpg)

For clarity and easier management, consider renaming or tagging the snapshot as “unencrypted volume snapshot” after its creation.

## Step 3: Creating a New Encrypted Volume from the Snapshot

Navigate back to the volumes section and choose the option to create a new volume based on the snapshot you just created. Here are the key points during configuration:

- The new volume is created from the unencrypted snapshot.
- Enable the encryption option by selecting the default EBS encryption key (typically, the account default).
- Ensure that other volume settings (e.g., size, IOPS) remain unchanged.

Be sure to correctly specify the snapshot ID before proceeding. Check out the following diagram that illustrates the encryption settings screen during this process:

![The image shows an AWS console screen for configuring encryption settings for EBS volumes, including options for selecting a KMS key and related details.](https://kodekloud.com/kk-media/image/upload/v1752860454/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted/aws-ebs-encryption-settings-console.jpg)

After the new volume is created, refresh the console to ensure that the volume now appears as encrypted, while maintaining the characteristics of the original GP3 configuration.

## Step 4: Verifying the Encrypted Volume

To confirm the successful migration, check the volume details on the EC2 dashboard. The dashboard should display the encrypted volume along with its unique attributes (volume ID, type, size, IOPS, and more).

![The image shows an AWS EC2 dashboard displaying a list of Elastic Block Store (EBS) volumes, including details like volume ID, type, size, IOPS, and throughput. The selected volume is an encrypted one with specific attributes highlighted.](https://kodekloud.com/kk-media/image/upload/v1752860455/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted/aws-ec2-ebs-volumes-dashboard.jpg)

## Step 5: Creating an Encrypted Snapshot for Future Use

With the encrypted volume in place, the next step is to create an encrypted snapshot. This snapshot, by virtue of inheriting the volume's encryption state, will be encrypted. Verify its presence in the snapshots console and, if necessary, update its details for consistency.

![The image shows an AWS EC2 console displaying a list of snapshots, including an encrypted snapshot with details such as snapshot ID, volume size, and status. The interface includes options for managing instances and storage.](https://kodekloud.com/kk-media/image/upload/v1752860456/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Demo-Migrating-an-EBS-Volumes-from-Unencrypted-to-Encrypted/aws-ec2-snapshots-console-diagram.jpg)

> [!important]
> **Note**
>
> If you ever need to create a volume from an encrypted snapshot, the resulting volume will automatically be encrypted.> [!important]
> **Warning**
>
> It is not possible to directly convert an encrypted volume back to an unencrypted volume. To revert to an unencrypted state, a data migration process must be performed.

## Process Summary

The migration process can be summarized in three simple steps:

| Step | Description                                                   | Key Activity                                    |
| ---- | ------------------------------------------------------------- | ----------------------------------------------- |
| 1    | Create an unencrypted EBS volume                              | Initial volume configuration without encryption |
| 2    | Create a snapshot of the unencrypted volume                   | Snapshot inherits unencrypted state             |
| 3    | Create a new volume from the snapshot with encryption enabled | New volume is secured by enabling encryption    |

This demonstration clearly outlines how to transition an existing EBS volume from unencrypted to encrypted while preserving the underlying data. For more detailed information, consider reviewing additional [AWS Documentation](https://aws.amazon.com/documentation/) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

Happy learning and secure your data effectively!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/9affa897-a9bd-4985-8388-3b838d26c147)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/e4e9296b-605b-4645-ab77-c827b407d66e)**
>
> Practice lab
