# Migrating Jenkins to Another Node - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Migrating-Jenkins-to-Another-Node)

---

## Table of Contents

- Migrating Jenkins to Another Node
  - 1. Scenario
  - 2. Pre-migration Checklist
  - 3. Back Up Jenkins Home on Source Node
  - 4. Transfer Backup to Target Node
  - 5. Prepare the Target Node
  - 6. Restore Backup on Target Node
  - 7. Start Jenkins on Target Node
  - Links and References
  - Watch Video
    - Optional: Backup Current Jenkins on Target

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Migrating Jenkins to Another Node

In this guide, you will learn how to migrate a Jenkins controller from one virtual machine (Node) to another. We’ll walk through stopping the service, backing up the Jenkins home directory, transferring it to the new Node, and bringing Jenkins back online—preserving all jobs, plugins, and configurations.

## 1\. Scenario

- **Source Jenkins controller**  
  IP: `64.227.x.x`  
  Fully configured and running jobs.
- **Target VM**  
  IP: `165.232.x.x`  
  Fresh Jenkins install on Ubuntu with Docker & JDK 17.

![The image shows a Jenkins dashboard with a list of build jobs, their statuses, last success and failure times, and durations. The interface includes navigation options on the left and a notification about server maintenance.](https://kodekloud.com/kk-media/image/upload/v1752868862/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-to-Another-Node/jenkins-dashboard-build-jobs-statuses.jpg)

## 2\. Pre-migration Checklist

Before you begin, make sure both Nodes meet these requirements:

| Requirement      | Source Node           | Target Node           |
| ---------------- | --------------------- | --------------------- |
| Jenkins version  | Match source & target | Match source & target |
| JDK version      | 17                    | 17                    |
| SSH connectivity | Enabled               | Enabled               |

> [!important]
> **Note**
>
> Ensure both Nodes run the _same_ Jenkins and JDK versions. Version mismatches can lead to plugin or configuration issues.

---

## 3\. Back Up Jenkins Home on Source Node

On the **source Node**, `$JENKINS_HOME` is typically `/var/lib/jenkins`. Follow these steps:

1.  Stop and disable Jenkins:

    ```
    sudo systemctl stop jenkins
    sudo systemctl disable jenkins
    ```

2.  Verify it’s inactive:

    ```
    sudo systemctl status jenkins
    # Should show: Active: inactive (dead)
    ```

3.  Create a compressed backup:

    ```
    cd /var/lib
    sudo tar -zcvf jenkins-backup.tar.gz jenkins
    ```

![The image shows a terminal window in Visual Studio Code displaying a directory listing with file permissions, ownership, and timestamps. A specific file or directory is highlighted in pink.](https://kodekloud.com/kk-media/image/upload/v1752868863/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-to-Another-Node/vscode-terminal-directory-listing.jpg)

Once `jenkins-backup.tar.gz` is ready, transfer it to the target Node.

## 4\. Transfer Backup to Target Node

From the **source Node**, use `scp` to copy the archive:

```
scp /var/lib/jenkins-backup.tar.gz root@165.232.x.x:/tmp/
```

Enter the root password when prompted. Then SSH into the **target Node** to proceed.

## 5\. Prepare the Target Node

1.  Stop and disable the existing Jenkins service:

    ```
    sudo systemctl stop jenkins
    sudo systemctl disable jenkins
    ```

2.  Confirm it’s stopped:

    ```
    sudo systemctl status jenkins
    # Active: inactive (dead)
    ```

If you browse to Jenkins now, you may see the setup screen:

![The image shows a Jenkins setup screen prompting for an administrator password to unlock Jenkins. The background displays a terminal with directory listings.](https://kodekloud.com/kk-media/image/upload/v1752868864/notes-assets/images/Advanced-Jenkins-Migrating-Jenkins-to-Another-Node/jenkins-setup-admin-password-terminal.jpg)

### Optional: Backup Current Jenkins on Target

If you want to keep the default install:

```
cd /var/lib
sudo tar -zcvf jenkins-original-backup.tar.gz jenkins
sudo rm -rf jenkins
```

## 6\. Restore Backup on Target Node

1.  Move and extract the backup:

    ```
    sudo mv /tmp/jenkins-backup.tar.gz /var/lib/
    cd /var/lib
    sudo tar -zxvf jenkins-backup.tar.gz
    ```

2.  Fix ownership:

    ```
    sudo chown -R jenkins:jenkins jenkins
    ```

## 7\. Start Jenkins on Target Node

Re-enable and launch Jenkins:

```
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
# Should show: Active: active (running)
```

Refresh your browser on `http://165.232.x.x:8080/`. All your jobs, plugins, and settings will appear exactly as before.

> [!important]
> **Warning**
>
> Do **not** run the same Jenkins instance on two Nodes at once. Always stop the source Jenkins before bringing up the target.

---

## Links and References

- [Jenkins Official Documentation](https://www.jenkins.io/doc/)
- [Backing Up and Restoring Jenkins](https://www.jenkins.io/doc/book/system-administration/backing-up/)
- [Using SSH for Secure Connections](https://www.ssh.com/academy/ssh)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/e0ca97b0-e495-4bd3-b38e-7cd8859c58e4)**
>
> Watch video content
