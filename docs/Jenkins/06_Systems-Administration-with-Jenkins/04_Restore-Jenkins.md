# Restore Jenkins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Systems-Administration-with-Jenkins/Restore-Jenkins)

---

## Table of Contents

- Restore Jenkins
  - Verifying Your Jenkins Backup
  - Initiating the Restore Process
  - Creating an Additional Backup
  - Selecting the Backup to Restore
  - Conclusion
  - Related Resources
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Systems Administration with Jenkins

# Restore Jenkins

After creating a backup of your Jenkins server, you may need to restore it from a previous backup. In this guide, we will walk you through the restoration process using the Thin Backup plugin.

## Verifying Your Jenkins Backup

Before you begin the restoration, ensure that your Jenkins backup exists. For example, run the following command to list the backups:

```
mike@jenkins01:~/jenkinsbackup$ ls
FULL-2022-01-03_19-52
mike@jenkins01:~/jenkinsbackup$
```

## Initiating the Restore Process

1.  Open the Thin Backup plugin interface in your Jenkins dashboard.
2.  Click on the **Restore** button.
3.  You should see an option labeled **Restore from this backup**.

> [!important]
> **Important Step**
>
> Before proceeding with the restoration process, it is recommended that you create an additional backup.

## Creating an Additional Backup

1.  Navigate to the **Settings** menu.
2.  Scroll down to the backup options.
3.  Ensure that all necessary components are selected for backup.
4.  Click **Save**.
5.  Click **Backup** to create a new backup.

Once completed, you will notice that the interface lists three backups available for restoration.

## Selecting the Backup to Restore

1.  Click on the **Restore** button again.
2.  The interface will display all three backups along with their respective timestamps.
3.  For this demonstration, select the latest backup.

![The image shows a "Restore Configuration" interface with options to select a backup date and time for restoration.](https://kodekloud.com/kk-media/image/upload/v1752880154/notes-assets/images/Jenkins-Restore-Jenkins/frame_60.jpg)

4.  Click **Restore** to initiate the restoration process.

Jenkins will then be restored to its previous state. Since this server does not have an extensive configuration, the restoration completes quickly.

## Conclusion

Congratulations! You have successfully restored your Jenkins server. This guide demonstrated how to verify your backup, create an additional backup as a precaution, and restore Jenkins using the Thin Backup plugin.

We hope this step-by-step guide helps ease your Jenkins maintenance routines. Look out for our next article covering more advanced Jenkins topics.

---

## Related Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Thin Backup Plugin Information](https://plugins.jenkins.io/thin-backup/)
- [Jenkins Community Forums](https://www.jenkins.io/community/)

Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/a7a0109d-d799-4892-ab7e-c3a76b8b535e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/ae200556-c3aa-46e9-b14f-9d261cfae24b)**
>
> Practice lab
