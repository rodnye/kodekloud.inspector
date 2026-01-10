# Cleanup Process - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Conclusion/Cleanup-Process)

---

## Table of Contents

- Cleanup Process
  - 1. Empty Amazon S3 Buckets
  - 2. Delete RDS Snapshots
  - 3. Destroy CDK Stacks
  - 4. Remove Manual Auto Scaling Resources
  - 5. Delete CloudWatch Log Group
  - References
  - Watch Video

---

## Content

Chaos Engineering

Conclusion

# Cleanup Process

After completing the workshop, it’s important to remove all AWS resources to prevent unexpected charges. Follow these steps in sequence:

| Step | Resource Type                        | Action                                          |
| ---- | ------------------------------------ | ----------------------------------------------- |
| 1    | Amazon S3 Buckets                    | Empty buckets before deletion                   |
| 2    | Amazon RDS Snapshots                 | Delete manual Aurora snapshots                  |
| 3    | AWS CDK Stacks                       | Run `cdk destroy` for all CDK-managed resources |
| 4    | Auto Scaling Group & Launch Template | Delete the group and associated launch template |
| 5    | CloudWatch Log Groups                | Delete the log group in CloudWatch              |

## 1\. Empty Amazon S3 Buckets

Before tearing down your CloudFormation stacks or CDK apps, you must empty every S3 bucket. AWS will not delete buckets that contain objects.

![The image shows an Amazon S3 console with a list of general-purpose buckets, displaying their names, AWS regions, IAM access analyzers, and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752871916/notes-assets/images/Chaos-Engineering-Cleanup-Process/amazon-s3-console-buckets-list.jpg)

> [!important]
> **Warning**
>
> Buckets with existing objects will block stack deletion. Ensure all objects are removed first.

1.  Open the [Amazon S3 console](https://console.aws.amazon.com/s3/).
2.  Select each workshop bucket.
3.  Click **Empty**.
4.  Type **permanently delete** and confirm.

![The image shows an AWS S3 console screen where a user is prompted to confirm the permanent deletion of all objects in a bucket by typing "permanently delete."](https://kodekloud.com/kk-media/image/upload/v1752871917/notes-assets/images/Chaos-Engineering-Cleanup-Process/aws-s3-console-permanent-deletion-confirmation.jpg)

Repeat for all seven buckets.

## 2\. Delete RDS Snapshots

Remove any manual snapshots of your Aurora database. Retained snapshots prevent the CloudFormation stack from deleting the database instances.

![The image shows the Amazon RDS console, specifically the "Snapshots" section, where manual snapshots are listed and can be managed.](https://kodekloud.com/kk-media/image/upload/v1752871918/notes-assets/images/Chaos-Engineering-Cleanup-Process/amazon-rds-snapshots-console-image.jpg)

1.  Go to the [Amazon RDS console](https://console.aws.amazon.com/rds/).
2.  Choose **Snapshots** in the navigation pane.
3.  Select each manual snapshot and delete.

> [!important]
> **Note**
>
> Automated snapshots created by RDS are cleaned up when you delete the database instance.

## 3\. Destroy CDK Stacks

With buckets and snapshots removed, destroy your CDK-managed stacks:

```
cd ~/environment/workshopfiles/fis-workshop/intro-experiment/cdk
cdk destroy --all \
  --context admin_role_arn=$KS_ADMIN_ARN \
  --context dashboard_role_arn=$CONSOLE_ROLE_ARN \
  --require-approval never
```

When prompted, type `y` to confirm. For more details, see the [AWS CDK CLI Reference](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-destroy).

## 4\. Remove Manual Auto Scaling Resources

If you created an Auto Scaling group and launch template manually, delete them now.

1.  Navigate to the [Auto Scaling Groups console](https://console.aws.amazon.com/ec2autoscaling/).
2.  Select the group (e.g., in the Tokyo region).
3.  Click **Delete**, then type **delete** to confirm.

![The image shows a confirmation dialog in the AWS console for deleting an Auto Scaling group, warning that this action will terminate all instances in the group. The user is prompted to type "delete" to confirm the action.](https://kodekloud.com/kk-media/image/upload/v1752871919/notes-assets/images/Chaos-Engineering-Cleanup-Process/aws-console-delete-auto-scaling-confirmation.jpg)

4.  Finally, delete the associated launch template to terminate any remaining EC2 instances.

## 5\. Delete CloudWatch Log Group

Remove the CloudWatch Logs group created during the workshop.

1.  Open the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/).
2.  Click **Log groups**.
3.  Select your log group, then choose **Actions → Delete log group**.

![The image shows an AWS CloudWatch interface with a dropdown menu under "Actions" for managing log groups, including options like deleting log groups and creating metric filters.](https://kodekloud.com/kk-media/image/upload/v1752871920/notes-assets/images/Chaos-Engineering-Cleanup-Process/aws-cloudwatch-log-groups-interface.jpg)

With these steps complete, all workshop resources are cleaned up.

## References

- [Deleting Amazon S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/userguide/delete-bucket.html)
- [Deleting Amazon RDS Snapshots](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteSnapshot.html)
- [AWS CDK CLI Reference](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-destroy)
- [Deleting Auto Scaling Groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/deleting-asg.html)
- [Deleting CloudWatch Log Groups](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#delete-log-group)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/141fe614-4e37-4e09-901b-dd914d7cd6e1/lesson/2a31854b-9ab2-410b-a718-a8cf188274d9)**
>
> Watch video content
