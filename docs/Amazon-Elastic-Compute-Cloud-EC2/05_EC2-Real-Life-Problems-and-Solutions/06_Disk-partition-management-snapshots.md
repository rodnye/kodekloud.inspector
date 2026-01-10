# Disk partition management snapshots - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Compute-Cloud-EC2/EC2-Real-Life-Problems-and-Solutions/Disk-partition-management-snapshots)

---

## Table of Contents

- Disk partition management snapshots
  - Choosing the Right EBS Volume Type
  - Scheduling Point-in-Time Recovery with EBS Snapshots
  - References
  - Watch Video
  - Practice Lab
    - Automating Snapshot Creation
    - Restoring from a Snapshot

---

## Content

Amazon Elastic Compute Cloud (EC2)

EC2 Real Life Problems and Solutions

# Disk partition management snapshots

In this article, we explore how to manage disk partitions on [AWS EC2](https://aws.amazon.com/ec2/) instances. By separating the operating system (OS) from application data into distinct partitions—and, crucially, onto separate [EBS volumes](https://aws.amazon.com/ebs/)—you minimize the risk of data loss if the OS partition becomes corrupted, and you simplify recovery.

> [!important]
> **Warning**
>
> Always ensure you have proper backups before resizing or modifying partitions. Unexpected interruptions can lead to data loss.

## Choosing the Right EBS Volume Type

Selecting the appropriate EBS volume type is critical for meeting your performance requirements. AWS offers SSD-backed volumes with varying baseline throughput and IOPS:

| Volume Type | Use Case                      | Baseline IOPS |
| ----------- | ----------------------------- | ------------- |
| gp3         | Balanced cost and performance | Up to 16,000  |
| gp2         | General-purpose workloads     | 3 IOPS/GiB    |
| io1         | High-performance databases    | Up to 64,000  |
| io2         | Mission-critical applications | Up to 64,000  |

![The image illustrates EBS disk partitioning, showing a pie chart with sections for OS and data volumes, and lists volume types such as gp3, gp2, io2, and io1.](https://kodekloud.com/kk-media/image/upload/v1752869074/notes-assets/images/Amazon-Elastic-Compute-Cloud-EC2-Disk-partition-management-snapshots/ebc-disk-partitioning-pie-chart.jpg)

> [!important]
> **Note**
>
> gp3 volumes let you provision IOPS and throughput independently, often yielding cost savings for variable workloads.

## Scheduling Point-in-Time Recovery with EBS Snapshots

To guarantee point-in-time recovery of your data, schedule regular [EBS snapshots](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html). A snapshot captures the exact state of a volume at the moment it’s taken, enabling you to restore data to that precise point.

### Automating Snapshot Creation

Use Amazon Data Lifecycle Manager (DLM) or AWS Backup to automate snapshot schedules:

```
# Create a lifecycle policy for daily snapshots
aws dlm create-lifecycle-policy \
  --description "Daily snapshot policy for critical volumes" \
  --state ENABLED \
  --resource-types VOLUME \
  --schedules "Name=DailySchedule,CopyTags=true,TagsToAdd=[{Key=Backup,Value=Daily}],CreateRule={Interval=24,IntervalUnit=HOURS}"
```

### Restoring from a Snapshot

```
# Restore a volume from a snapshot
aws ec2 create-volume \
  --availability-zone us-west-2a \
  --snapshot-id snap-1234567890abcdef0 \
  --volume-type gp3 \
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=RestoredVolume}]'
```

## References

- [Amazon EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [AWS Backup Documentation](https://docs.aws.amazon.com/backup/)
- [Amazon Data Lifecycle Manager](https://docs.aws.amazon.com/dlm/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/1132ee02-eae9-44e0-a8a5-8f325254ba92/lesson/a82025fe-d813-43e6-b14c-cdb6d77029c8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2/module/abe7fd58-449e-4102-b73c-b0f2e63b1c3f/lesson/5d472900-44c3-4355-9ffd-4ff4822bc5ac)**
>
> Practice lab
