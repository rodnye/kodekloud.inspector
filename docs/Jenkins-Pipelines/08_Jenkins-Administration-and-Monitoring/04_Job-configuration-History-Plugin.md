# Job configuration History Plugin - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Job-configuration-History-Plugin)

---

## Table of Contents

- Job configuration History Plugin
  - Installation and Initial Setup
  - Navigating the Configuration History
  - Demonstration: Modifying a Test Job
  - Reviewing and Restoring Configuration Versions
  - Managing Deleted Jobs
  - Configuring the Storage Directory
  - Conclusion
  - Watch Video
    - 1. Update Job Restrictions
    - 2. Modify the Build Steps
    - 3. Add an Additional Build Step
    - Restoring a Previous Version

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Job configuration History Plugin

In this guide, you will learn how to leverage the Job Configuration History plugin for Jenkins to automatically back up your job and system configurations. The plugin captures every modification to your configuration files, allows side-by-side diff comparisons, and even facilitates restoration of previous versions. This is especially useful when recovering accidentally deleted jobs or unintended changes.

> [!important]
> **Important**
>
> Before you begin, install the plugin and restart Jenkins manually to ensure all features are active.

## Installation and Initial Setup

1.  Install the Job Configuration History plugin.
2.  Manually restart Jenkins after installation.
3.  On the Jenkins dashboard, locate the new "Job Config History" option.

![The image shows a webpage from Jenkins, displaying a "Job Config History Revision Overview" with a table of job configuration changes, and a "Job Diff Side-By-Side View" section.](https://kodekloud.com/kk-media/image/upload/v1752879675/notes-assets/images/Jenkins-Pipelines-Job-configuration-History-Plugin/jenkins-job-config-history-overview.jpg)

## Navigating the Configuration History

Once you click the "Job Config History" link, you will be directed to a page that lists all configuration changes. Use the filters on the left to sort through system configurations, job configurations, created jobs, or deleted jobs.

## Demonstration: Modifying a Test Job

Follow the steps below to see how configuration changes are tracked:

### 1\. Update Job Restrictions

- From the dashboard, select your test job.
- Update the job restriction settings by disabling previously defined rules.
- Save the changes.

### 2\. Modify the Build Steps

Edit the build steps for your test job by adding a shell command:

```
echo Hello Testing a new Plugin
```

Save the configuration and run the job. The console log should display an output similar to:

```
Started by user siddharth
Running as SYSTEM
Building in workspace /var/lib/jenkins/workspace/Dasher_testJob
[Dasher_testJob] $ /bin/sh -xe /tmp/jenkins5147897380265973327.sh
+ echo Hello Testing a new Plugin
Hello Testing a new Plugin
[Gitea] do not publish assets due to source being no GiteaCMSource
Finished: SUCCESS
```

### 3\. Add an Additional Build Step

Further refine the job configuration by including an extra shell command to pause execution:

```
sleep 5
```

Save the updated configuration and run the job again. Now, both the echo command and the sleep command are executed, and the plugin records all these changes.

## Reviewing and Restoring Configuration Versions

Return to the "Job Config History" page and click "Show All Configs" to review the tracked changes. You will now see the configuration files displayed in XML format.

For example:

- **First build configuration:**

  ```
  <command>echo Hello Testing a new Plugin!</command>
  ```

- **Second build configuration:**

  ```
  <command>echo Hello Testing a new Plugin!</command>
  <command>sleep 5</command>
  ```

The history log captures details such as the timestamp, job name, type of operation, and the user responsible for the change.

### Restoring a Previous Version

If you need to revert to an earlier configuration:

1.  Locate the job’s configuration history.
2.  Click "Show Difference" to compare the two versions.
3.  Choose the correct version (for example, the one with only the echo command) and click "Restore".

After confirmation, the job will revert to its previous state. You can verify this by running the job again; the console log should now only display the echo command:

```
Started by user siddharth
Running as SYSTEM
Building in workspace /var/lib/jenkins/workspace/Dasher_testJob
[Dasher_testJob] $ /bin/sh -xe /tmp/jenkins126000273998578306.sh
+ echo Hello Testing a new Plugin
Hello Testing a new Plugin
[Gitea] do not publish assets due to source being no GiteaCMSource
Finished: SUCCESS
```

When you inspect the job configuration, it will now contain:

```
echo Hello Testing a new Plugin
```

> [!important]
> **Restoration Tip**
>
> The restore feature allows you to quickly recover from any unintended configuration changes by reverting to a known good state.

## Managing Deleted Jobs

The plugin also tracks deleted jobs. If you accidentally remove a job, you can filter the history to display only deleted jobs and restore them as necessary.

![The image shows a Jenkins interface displaying the job configuration history for "Dasher_testJob," listing changes made by a user with options to view, restore, or delete entries.](https://kodekloud.com/kk-media/image/upload/v1752879676/notes-assets/images/Jenkins-Pipelines-Job-configuration-History-Plugin/jenkins-job-configuration-history-dasher.jpg)

To restore a deleted job, simply:

1.  Filter by deleted jobs.
2.  Click on the restore option.
3.  Confirm the restoration, and the job will reappear on the dashboard.

![The image shows a Jenkins dashboard displaying the job deletion history for a specific job, with details such as date, operation, user, and file options.](https://kodekloud.com/kk-media/image/upload/v1752879676/notes-assets/images/Jenkins-Pipelines-Job-configuration-History-Plugin/jenkins-job-deletion-history-dashboard.jpg)

## Configuring the Storage Directory

By default, the configuration history is stored in the Jenkins home directory under "/var/lib/jenkins/config-history". You can inspect this directory directly from your VM.

For example, listing the contents shows:

```
drwxr-xr-x  4 jenkins jenkins  4096 Oct  2 09:52 config-his/
...
```

Change into the config history directory:

```
root@jenkins-controller-1 in /var/lib/jenkins> cd config-history/
root@jenkins-controller-1 in /var/lib/jenkins/config-history> ll
total 16
drwxr-xr-x  4 jenkins jenkins  4096 Oct  2 09:52 .
drwxr-xr-x  3 jenkins jenkins  4096 Oct  2 09:56 ..
drwxr-xr-x  3 jenkins jenkins  4096 Oct  2 09:56 ./
drwxr-xr-x  3 jenkins jenkins  4096 Oct  2 09:56 jobs/
```

Each job has its own subdirectory within the "jobs" folder. For instance, to inspect "Dasher_testJob":

```
root@jenkins-controller-1 in /var/lib/jenkins/config-history/jobs> cd Dasher_testJob/
root@jenkins-controller-1 in /var/lib/jenkins/config-history/jobs/Dasher_testJob> ll
total 32
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09:55 ./
drwxr-xr-x  3 jenkins jenkins 4096 Oct  2 09:56 ../
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09-52-27/
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09-52-49/
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09-54-55/
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09-54-56/
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09:52 2024-10-02_09-56-37/
drwxr-xr-x  2 jenkins jenkins 4096 Oct  2 09:56 2024-10-02_09-56-17/
```

To inspect a particular change log file (e.g., history.xml):

```
<?xml version="1.1" encoding="UTF-8"?>
<hudson.plugins.jobConfigHistory.HistoryDescr plugin="jobConfigHistory@1268.V75ce751da_g11">
  <user>siddharth</user>
  <userId>siddharth</userId>
  <operation>Changed</operation>
  <timestamp>2024-10-02_09-52-27</timestamp>
  <currentName></currentName>
  <oldName></oldName>
</hudson.plugins.jobConfigHistory.HistoryDescr>
```

This log provides detailed insights into the changes, including the user, operation type, and timestamp.

## Conclusion

The Job Configuration History plugin is an essential tool for managing and tracking changes in your Jenkins job configurations. Its ability to display side-by-side differences, restore previous configurations, and manage deleted jobs makes it invaluable for maintaining a stable and reliable CI/CD environment.

For further reading and related resources:

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Job Configuration History Plugin Repository](https://github.com/jenkinsci/jobConfigHistory-plugin)

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/b0b8a649-f5fc-4bcc-8644-2ab0c0db5ab9)**
>
> Watch video content
