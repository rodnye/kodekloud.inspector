# Install and Configure Audit Trail - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Install-and-Configure-Audit-Trail)

---

## Table of Contents

- Install and Configure Audit Trail
  - 1. Install the Audit Trail Plugin
  - 2. Configure an Audit Trail Logger
  - 3. Verify Audit Logging
  - 4. Adjust Log Rotation Settings
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Install and Configure Audit Trail

Capture and persist key system events in Jenkins—such as job configurations, builds, and security changes—by installing the Audit Trail plugin. This setup writes audit logs to a rotating file on your Jenkins controller, helping you meet compliance and troubleshooting needs.

## 1\. Install the Audit Trail Plugin

The Audit Trail plugin supports multiple destinations for logging: local files, console, syslog, or Elasticsearch.

| Logger Destination        | Use Case                                | Configuration Example                      |
| ------------------------- | --------------------------------------- | ------------------------------------------ |
| Log File (Daily Rotation) | Store events in timestamped files       | `/var/log/jenkins/audit-%g.log`            |
| Console                   | Quick debugging via Jenkins system logs | —                                          |
| Syslog                    | Centralized log management              | Configure host and port in plugin settings |
| Elasticsearch             | Analytics and long-term retention       | Provide cluster URL and index name         |

> [!important]
> **Note**
>
> You must have **Jenkins Administrator** privileges to install plugins and modify system configurations.

1.  Navigate to **Manage Jenkins** → **Manage Plugins**.
2.  Select the **Available** tab, search for **Audit Trail**, check the box, and click **Install without restart**.
3.  When installation finishes, go to **Manage Jenkins** → **Configure System** to set up your first logger.

![The image shows a webpage from the Jenkins website, detailing the configuration of an Audit Trail plugin, including logger settings and related links.](https://kodekloud.com/kk-media/image/upload/v1752868849/notes-assets/images/Advanced-Jenkins-Install-and-Configure-Audit-Trail/jenkins-audit-trail-plugin-configuration.jpg)

## 2\. Configure an Audit Trail Logger

Scroll to the **Audit Trail** section and add a new logger for daily-rotated log files.

1.  Click **Add** → **Log File (Daily Rotation)**.
2.  In **Log File Pattern**, enter:

    ```
    /var/log/jenkins/custom-audit-%g.log
    ```

3.  Keep other options at their default values, then click **Apply** and **Save**.

![The image shows a Jenkins system configuration page with options for adding loggers and configuring audit trails. There are dropdown options for different logging methods and checkboxes for logging build triggers and credential usage.](https://kodekloud.com/kk-media/image/upload/v1752868850/notes-assets/images/Advanced-Jenkins-Install-and-Configure-Audit-Trail/jenkins-system-configuration-loggers.jpg)

> [!important]
> **Warning**
>
> Ensure the Jenkins user has write permissions to `/var/log/jenkins`. Otherwise, audit entries will fail silently.

## 3\. Verify Audit Logging

Trigger actions in Jenkins and inspect the generated log files:

1.  Open an existing job (e.g., **Monitor Jenkins**), click **Configure**, make a trivial change, then **Apply** & **Save**.
2.  Click **Build Now** to start a new build.

On the controller host, list and inspect the audit logs:

```
# List rotated files
ls -l /var/log/jenkins
```

Example output:

```
total 12
-rw-r--r-- 1 jenkins jenkins 2016 Nov 10 14:10 custom-audit-0.log-2024-11-10
-rw-r--r-- 1 jenkins jenkins   24 Nov 10 14:10 custom-audit-0.log-0.lck
```

View recent entries:

```
cat /var/log/jenkins/custom-audit-0.log-2024-11-10
```

Sample log lines:

```
Nov 10, 2024 14:29:36.662 /job/monitor-jenkins/configSubmit by siddharth from 124.123.186.17
#29 Started by user siddharth, Parameters:[]
Nov 10, 2024 14:29:39.049 /job/monitor-jenkins #29 Started by user siddharth … completed in 4361ms
```

These entries confirm both configuration changes and build executions are being audited.

## 4\. Adjust Log Rotation Settings

To control retention, modify the **Max History** for your daily rotation:

1.  Return to **Manage Jenkins** → **Configure System**.
2.  In **Audit Trail**, click **Edit** on your log-file entry.
3.  Set **Max History** (for example, `10` files).
4.  Click **Apply** and **Save**.

![The image shows a Jenkins system configuration page with options for setting log file parameters and URL patterns to log. There are buttons for adding a logger, saving, and applying changes.](https://kodekloud.com/kk-media/image/upload/v1752868852/notes-assets/images/Advanced-Jenkins-Install-and-Configure-Audit-Trail/jenkins-system-configuration-log-settings.jpg)

After saving, perform another job configuration or build and verify the new entries:

```
tail -n 5 /var/log/jenkins/custom-audit-0.log-2024-11-10
```

## Conclusion

You have successfully installed and configured the Jenkins Audit Trail plugin to record all vital operations in daily-rotated log files. Extend this setup to syslog or Elasticsearch for centralized analysis and long-term storage.

## Links and References

- [Jenkins Audit Trail Plugin](https://plugins.jenkins.io/audit-trail/)
- [Jenkins Configuration as Code](https://www.jenkins.io/projects/jcasc/)
- [Managing Jenkins](https://www.jenkins.io/doc/book/managing/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/736f1b50-aaac-4b7f-92a5-e478bdc7b9d9)**
>
> Watch video content
