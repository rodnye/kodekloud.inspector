# Backing upRestoring Jenkins Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Backing-upRestoring-Jenkins-Demo)

---

## Table of Contents

- Backing upRestoring Jenkins Demo
  - Table of Contents
  - 1. Install and Configure Thin Backup
  - 2. Perform a Manual Backup
  - 3. Restore from Backup
  - 4. Exclude Build Results
  - Links and References
  - Watch Video
    - Configure Backup Settings

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Backing upRestoring Jenkins Demo

In this tutorial, you’ll learn how to **backup** and **restore** Jenkins using the Thin Backup plugin. With Thin Backup, you can schedule automated backups, keep only the most recent snapshots, and exclude unnecessary files to optimize storage.

## Table of Contents

1.  [Install and Configure Thin Backup](#install-and-configure-thin-backup)
2.  [Perform a Manual Backup](#perform-a-manual-backup)
3.  [Restore from Backup](#restore-from-backup)
4.  [Exclude Build Results](#exclude-build-results)

---

## 1\. Install and Configure Thin Backup

1.  Navigate to **Manage Jenkins > Manage Plugins**, switch to the **Available** tab, and install **Thin Backup**.
2.  Once installed, go to **Manage Jenkins > Configure System** and scroll to the **ThinBackup** section.

![The image shows a webpage for the Jenkins plugin "ThinBackup," detailing its features, version information, and documentation links. It includes statistics on installations and links to related resources.](https://kodekloud.com/kk-media/image/upload/v1752868796/notes-assets/images/Advanced-Jenkins-Backing-upRestoring-Jenkins-Demo/jenkins-thinbackup-plugin-webpage.jpg)

### Configure Backup Settings

| Setting                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| Backup Directory       | `/var/lib/jenkins/JENKINS_BACKUP` (created automatically if missing) |
| Schedule               | Cron expressions for periodic backups                                |
| Differential Backup    | Enable to back up only changed data                                  |
| Max Backup Sets        | Retain the latest N backups                                          |
| Exclude Patterns       | Regex for files/folders to skip                                      |
| Archive as ZIP         | Compress backup folders                                              |
| Include Build Archives | Optionally include full build artifacts                              |

> [!important]
> **Note**
>
> The `Backup Directory` path must be writable by the Jenkins user. Ensure adequate disk space before scheduling large backups.

![The image shows a Jenkins system configuration page with options for backup settings and Git plugin configurations. Various checkboxes and input fields are available for customizing backup and Git settings.](https://kodekloud.com/kk-media/image/upload/v1752868797/notes-assets/images/Advanced-Jenkins-Backing-upRestoring-Jenkins-Demo/jenkins-system-configuration-backup-git.jpg)

Click **Apply** to save your configuration.

---

## 2\. Perform a Manual Backup

1.  Go to **Manage Jenkins > ThinBackup**.
2.  Click **Backup Now**.

To monitor progress, open **Manage Jenkins > System Log > All Jenkins Logs**. You should see entries like:

```
Nov 10, 2024 2:26:50 PM INFO jenkins.WebAppMain contextInitialized
Jenkins home directory: /var/lib/jenkins
Nov 10, 2024 2:26:51 PM INFO jenkins.InitReactorRunner$1 onAttained
Starting manual backup...
Nov 10, 2024 2:26:51 PM INFO jenkins.plugin.ThinBackup doBackup
No previous full backup found. Creating new full backup.
Found 16 jobs to backup.
Backing up job: example-job
Backing up folder job: org-folder/jobType
Backup process completed successfully.
```

![The image shows a Jenkins system log with details about plugin initialization and a backup process, indicating successful completion.](https://kodekloud.com/kk-media/image/upload/v1752868798/notes-assets/images/Advanced-Jenkins-Backing-upRestoring-Jenkins-Demo/jenkins-system-log-plugin-backup.jpg)

Verify the backup files on your server:

```
ssh root@jenkins-controller-1
cd /var/lib/jenkins/JENKINS_BACKUP
ls
cd FULL-2024-11-10_16-37
ls
# audit-trail.xml
# backup-completed.info
# com.cloudbees.hudson.plugins.folder.config.AbstractFolderConfiguration.xml
# …
# jenkins.model.JenkinsLocationConfiguration.xml
```

---

## 3\. Restore from Backup

1.  **Delete** a test job (e.g., **Monitor Jenkins**) to simulate data loss.
2.  In **Manage Jenkins > ThinBackup**, click **Restore**.
3.  Select the desired backup set (e.g., `FULL-2024-11-10_16-37`) and confirm **Restore**.
4.  **Restart Jenkins** to apply restored configurations.

After restart, the deleted job and its build history will reappear on the dashboard.

```
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

> [!important]
> **Warning**
>
> Restoring a backup overwrites your current Jenkins configuration. Always confirm you’re using the correct backup set.

---

## 4\. Exclude Build Results

If you only need job configurations (not build artifacts), disable **Include build results** in the Thin Backup settings. This reduces backup size and speeds up the process.

![The image shows a Jenkins system configuration page, specifically focusing on the "Global Untrusted Pipeline Libraries" and "ThinBackup Configuration" sections, where backup directories and schedules can be set.](https://kodekloud.com/kk-media/image/upload/v1752868799/notes-assets/images/Advanced-Jenkins-Backing-upRestoring-Jenkins-Demo/jenkins-global-untrusted-pipeline-backup.jpg)

---

## Links and References

- [Thin Backup Plugin Documentation](https://plugins.jenkins.io/thinBackup)
- [Jenkins Backup Best Practices](https://www.jenkins.io/doc/book/system-administration/backing-up/)
- [Jenkins Cron Syntax](https://en.wikipedia.org/wiki/Cron)

That’s it! You now know how to back up and restore your Jenkins instance efficiently using the Thin Backup plugin.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/931c35a2-7bf6-4a4d-96e3-8af677cb0149)**
>
> Watch video content
