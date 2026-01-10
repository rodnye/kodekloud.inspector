# Backup Jenkins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Systems-Administration-with-Jenkins/Backup-Jenkins)

---

## Table of Contents

- Backup Jenkins
  - Backup Options
  - Installing a Backup Plugin
  - Configuring a Backup Directory
  - Conclusion
  - Watch Video

---

## Content

Jenkins

Systems Administration with Jenkins

# Backup Jenkins

In this article, we explore various strategies for backing up your Jenkins instance. Since Jenkins does not include a dedicated backup solution, it's essential to choose an approach that aligns with your operational requirements—whether it's through file system snapshots, backup plugins, or custom shell scripts.

## Backup Options

One method is to use file system snapshots. Although snapshots can provide daily or incremental protection, they are not true backups and should not be relied upon as a long-term solution.

![The image shows a Jenkins documentation page about creating backups, highlighting filesystem snapshots, backup plugins, and shell scripts for Jenkins instance backup.](https://kodekloud.com/kk-media/image/upload/v1752880139/notes-assets/images/Jenkins-Backup-Jenkins/frame_20.jpg)

Another option is to leverage backup plugins. Git-backed for flexibility, Jenkins supports a wide variety of plugins to extend its functionality. Alternatively, you might consider crafting a shell script to automate your backup process.

> [!important]
> **Tip**
>
> Both plugin-based and script-based backups offer unique benefits. Choose the approach that best suits your environment and backup objectives.

Below is an excerpt from a custom Jenkins backup shell script available on GitHub:

```
#!/bin/bash -xe
# Jenkins backup script
readonly JENKINS_HOME="$1"
readonly DEST_FILE="$2"
readonly CUR_DIR=$(cd $(dirname "$BASH_SOURCE-$0") && pwd)
readonly TMP_DIR="${CUR_DIR}/tmp"
readonly ARC_NAME=jenkins-backup
readonly ARC_DIR="${TMP_DIR}/${ARC_NAME}"
readonly TMP_TAR_NAME="${TMP_DIR}/${ARC_NAME}.tar.gz"


function usage() {
  echo "usage: $(basename $0) /path/to/jenkins_home archive.tar.gz"
}
```

While this script is a valuable resource for those who prefer custom solutions, utilizing a backup plugin often provides a more integrated and streamlined experience.

## Installing a Backup Plugin

To set up a Jenkins backup plugin, follow these steps:

1.  Log in to the Jenkins portal.
2.  Click on **Manage Jenkins**.
3.  Select **Manage Plugins**.

![The image shows the "Manage Jenkins" dashboard, featuring options for system configuration, plugin management, and node/cloud management, with security setup suggestions.](https://kodekloud.com/kk-media/image/upload/v1752880140/notes-assets/images/Jenkins-Backup-Jenkins/frame_80.jpg)

Next, navigate to the **Available** tab and search for "Backup". While the Thin Backup plugin is widely used, you might also consider alternatives like the Google Cloud Backup plugin.

![The image shows a list of backup plugins for Jenkins, including their versions, descriptions, and update information. Options to install or download are available.](https://kodekloud.com/kk-media/image/upload/v1752880141/notes-assets/images/Jenkins-Backup-Jenkins/frame_100.jpg)

After selecting Thin Backup, click **Install Without Restart**. Once installation is complete, return to **Manage Jenkins** and locate the Thin Backup section.

Within Thin Backup, you can configure settings to back up global configurations as well as job-specific settings. Key configuration options include:

- **Backup Directory:** Set the directory where backups will be stored (ensure Jenkins has write access).
- **Backup Schedules:** Define schedules for differential and full backups.
- **Number of Backup Sets:** Specify how many backup sets to retain.
- **Files Excluded:** List files to be ignored during the backup.
- **Backup Scope:** Choose which files are to be included in the backup.

> [!important]
> **Warning**
>
> A valid backup directory is critical. If no backup directory is configured correctly, the backup process will fail.

After adjusting the settings, click **Backup Now**. If the backup directory is not correctly specified, you will need to configure a proper directory before retrying.

## Configuring a Backup Directory

SSH into your server with the following command:

```
ssh mike@20.127.77.19
mike@20.127.77.19's password:
```

Once logged in, create and verify a backup directory with these commands:

```
mike@jenkins01:~$ pwd
/home/mike
mike@jenkins01:~$ mkdir jenkinsbackup
mike@jenkins01:~$ cd jenkinsbackup/
mike@jenkins01:~/jenkinsbackup$ pwd
/home/mike/jenkinsbackup
```

If the directory exists but lacks the required permissions, adjust them—temporarily, you might set permissive permissions for testing:

```
mike@jenkins01:~$ chmod 777 jenkinsbackup/
```

> [!important]
> **Security Warning**
>
> Avoid using 777 permissions in production environments. Always adjust permissions in accordance with your organization’s security policies.

Once the directory is properly configured, return to Jenkins and click **Backup Now**. Verify the backup file by checking your backup directory once the process completes.

![The image shows a Jenkins backup configuration screen with options for backing up build results, user content, and plugins, among others.](https://kodekloud.com/kk-media/image/upload/v1752880143/notes-assets/images/Jenkins-Backup-Jenkins/frame_250.jpg)

## Conclusion

This article has provided a detailed overview of various backup strategies for Jenkins. Whether you opt for a plugin-based solution or a custom shell script, ensuring that your backup method aligns with your operational and security requirements is paramount.

For further details on Jenkins and its capabilities, visit the [Jenkins Documentation](https://www.jenkins.io/doc/). Happy backing up!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/3fa36943-55fe-48d9-a4b8-b1a170a0cc3d)**
>
> Watch video content
