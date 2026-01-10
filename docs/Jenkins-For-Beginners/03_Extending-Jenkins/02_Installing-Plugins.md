# Installing Plugins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Extending-Jenkins/Installing-Plugins)

---

## Table of Contents

- Installing Plugins
  - Navigating the Jenkins Plugin Manager
  - Installing the Copy Artifact Plugin
  - Configuring the Build Job
  - Updating the Test Job Configuration
  - Configuring the Deploy Job
  - Installing Plugins via HPI Files
  - Conclusion
  - Watch Video

---

## Content

Jenkins For Beginners

Extending Jenkins

# Installing Plugins

In this tutorial, you will learn how to install several Jenkins plugins and configure jobs to incorporate their functionalities. In our previous lesson, the ASCII build job executed successfully while the ASCII test job failed because it could not access a file generated during the build. To fix this issue, we will install the Copy Artifact plugin using the Jenkins plugin system.

---

## Navigating the Jenkins Plugin Manager

Start by clicking on "Manage Jenkins" and then "Plugins." In this section, you can add, remove, disable, or enable plugins. If updates are available for your installed plugins, they will be listed in the updates section. To view all installed plugins, click on the "Installed" tab. This interface makes it very simple to manage plugins using toggles or by clicking the corresponding icons.

![The image shows the Jenkins dashboard for a project named "ascii-build-job," displaying build status, downstream projects, and permalinks to recent builds. The sidebar includes options like "Build Now" and "Configure," with a build history section at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752879444/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-dashboard-ascii-build-job.jpg)

![The image shows the Jenkins interface displaying a list of installed plugins, with options to manage them. The sidebar includes options like updates, available plugins, and advanced settings.](https://kodekloud.com/kk-media/image/upload/v1752879445/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-plugins-interface-management.jpg)

---

## Installing the Copy Artifact Plugin

To install a new plugin, switch to the "Available" plugins tab and search for "Copy Artifact."

1.  Find the plugin and check its box.
2.  Click on "Install."
3.  Optionally, review the plugin's documentation to learn more about its functionality.

There are two installation methods:

- Install immediately.
- Install after Jenkins restarts.

For this guide, choose to install the plugin immediately.

![The image shows the Jenkins interface displaying a list of available plugins, with options to install them. The "Copy Artifact" plugin is highlighted, and there are search and navigation options visible.](https://kodekloud.com/kk-media/image/upload/v1752879446/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-plugins-interface-copy-artifact.jpg)

After scrolling down, you will see that the Copy Artifact plugin installation completes successfully. Some plugins require a Jenkins restart after installation. Always review the documentation to understand its options, including usage in declarative pipelines. For example, define the plugin in a pipeline using this Groovy snippet:

```
pipeline {
    agent any
    options {
        copyArtifactPermission('job1,job2,...')
    }
    stages {
        // Your pipeline stages here
    }
}

properties {
    copyArtifactPermission('job1,job2,...'),
}

node {
    // Your node code here
}
```

The plugin documentation also details releases, installation via CLI, download options, dependencies, known issues, and the health score. To install the plugin using the CLI tool, run:

```
jenkins-plugin-cli --plugins copyartifact:749.vfb_dca_a_9b_6549
```

![The image shows a webpage for the "Copy Artifact" plugin on the Jenkins website, displaying a health score of 83% and various details about adoption, deprecation, documentation, and security.](https://kodekloud.com/kk-media/image/upload/v1752879447/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/copy-artifact-plugin-jenkins.jpg)

---

## Configuring the Build Job

Now that the Copy Artifact plugin is installed, update the build job configuration:

1.  Open the ASCII build job and click "Configure."
2.  Scroll down to locate the new option "Permission to Copy Artifact."> [!important]
    > **Note**
    >
    > Set the permission to restrict artifact copying only for specific projects. For this example, enter "ASCII test job" so that only this job is allowed to copy artifacts from the build job.
3.  Next, configure the post-build action to archive artifacts (such as the generated advice.json file). To share the file with other jobs, use a simple script like:

```
curl -s https://api.adviceslip.com/advice > advice.json
cat advice.json
```

4.  Then, configure the post-build action to archive the advice.json file. You also have options to include or exclude specific files and set the post-build action to run only on successful builds. Click "Save" to update the configuration.

![The image shows a Jenkins configuration screen for a build job, with options for managing source code, build triggers, and post-build actions. A warning indicates that a project named "asc" cannot be found.](https://kodekloud.com/kk-media/image/upload/v1752879448/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-build-job-configuration.jpg)

![The image shows a Jenkins configuration screen for a build job, focusing on post-build actions where artifacts are being archived, specifically a file named "advice.json".](https://kodekloud.com/kk-media/image/upload/v1752879450/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-build-job-post-build-artifacts.jpg)

---

## Updating the Test Job Configuration

To ensure the test job functions correctly:

1.  Update the test job configuration.
2.  Before executing any shell commands, add a build step that uses the Copy Artifact plugin to copy the artifact from the build job. Configure it to fetch the latest successful build artifact from the build job and specify "advice.json" as the artifact.
3.  Add the following shell script as a new build step to process the copied file:

```
# Test to ensure the advice message contains more than 5 words.
ls advice.json
cat advice.json | jq -r '.slip.advice' > advice.message
[ $(wc -w < advice.message) -gt 5 ] && echo "Advice - $(cat advice.message) has more than 5 words" || (echo "Advice - $(cat advice.message)")
```

Ensure that the Copy Artifact step is the first executed in the test job since subsequent steps depend on the advice.json file. Click "Save" after updating the configuration.

![The image shows a Jenkins configuration screen for a job named "ascii-test-job," specifically focusing on the "Build Steps" section where options for copying artifacts from another project are being selected.](https://kodekloud.com/kk-media/image/upload/v1752879450/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-ascii-test-job-build-steps.jpg)

After saving, the test job's configuration will correctly reference the build job as its upstream project.

![The image shows a Jenkins workspace interface for a job named "ascii-test-job" with two files, "advice.json" and "advice.message," listed along with their details. The interface includes options for managing the job and viewing build history.](https://kodekloud.com/kk-media/image/upload/v1752879451/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-dashboard-ascii-test-job.jpg)

---

## Configuring the Deploy Job

Next, configure the deploy job to utilize the advice message:

1.  Create a new Freestyle Project called "ASCII deploy job."
2.  Add an "Execute Shell" build step with the following commands to install the cowsay command and generate ASCII artwork:

```
# Deploy
sudo apt-get install cowsay -y
export PATH="$PATH:/usr/games:/usr/local/games"
cat advice.message | cowsay -f $(ls /usr/share/cowsay/cows | shuf -n 1)
```

> [!important]
> **Reminder**
>
> Ensure that the advice.message file is archived as a post-build artifact in the test job, so the deploy job can access it.

3.  Optionally, configure the deploy job to be triggered automatically after the test job completes by using the "Build after other projects are built" option, specifying "ASCII test job" as the upstream project and triggering only on stable upstream builds.

![The image shows a Jenkins dashboard displaying a list of jobs with their statuses, last success, last failure, and duration. The sidebar includes options like "Build History" and "Manage Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752879452/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-dashboard-job-statuses.jpg)

![The image shows a Jenkins configuration screen for a project named "ascii-deploy-job," where build steps are being set to copy artifacts from another project called "ascii-test-job."](https://kodekloud.com/kk-media/image/upload/v1752879454/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-ascii-deploy-job-config.jpg)

![The image shows a Jenkins configuration screen for build triggers, where a project named "ascii-test-job" is being set to trigger builds after other projects are built. An error message indicates that there is no such project as "asc," suggesting "ascii-test-job" instead.](https://kodekloud.com/kk-media/image/upload/v1752879455/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-build-triggers-ascii-test-job.jpg)

When you run the build job, it will trigger the test job which, in turn, will automatically trigger the deploy job upon a successful build.

Review the deploy job console output; you should see messages indicating that:

- The deploy job was started by the test job.
- The artifact (advice.json) was copied successfully.
- The deploy job installed cowsay, read the advice message, and generated ASCII art using a randomly selected cow file.

Example console output excerpt:

```
Started by upstream project "ascii-test-job" build number 3
originally caused by:
    Started by upstream project "ascii-build-job" build number 4
    originally caused by:
        Started by user Dasher Admin
Running as SYSTEM
Building in workspace /var/lib/jenkins/workspace/ascii-deploy-job
Copied 1 artifact from "ascii-test-job" build number 3
[ascii-deploy-job] $ /bin/sh -xe /tmp/jenkins8625965086975148801.sh
+ sudo apt-get install cowsay -y
Reading package lists...
Building dependency tree...
Reading state information...
cowsay is already the newest version (3.03+dfsg-8).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
+ export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/snap/bin:/usr/games:/usr/local/games
+ cat advice.message
+ ls /usr/share/cowsay/cows
+ shuf -n 1
+ cowsay -f elephant-in-snake.cow
...
```

---

## Installing Plugins via HPI Files

Another method for installing Jenkins plugins is by using an HPI file. This may be particularly useful when installing plugins such as "Yet Another Build Visualizer," which provides clear visual representations of chained projects.

To install a plugin using an HPI file:

1.  Navigate to the plugin's documentation page.
2.  Click the "Download direct link" to save the HPI file (for example, yet-another-build-visualizer.hpi).
3.  In the "Advanced" tab of the plugin manager, upload the HPI file and click "Deploy."

Alternatively, install via the CLI using:

```
jenkins-plugin-cli --plugins yet-another-build-visualizer:1.16
```

Once installed, navigate to any chained project (for example, the build job) and view the visualized job relationships, including build numbers, statuses, and full build histories.

![The image shows the Jenkins interface displaying a list of available plugins, including details like name, version, and release date. The interface allows users to search for and install plugins.](https://kodekloud.com/kk-media/image/upload/v1752879456/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-plugins-interface-list.jpg)

![The image shows a webpage for the "Yet Another Build Visualizer" Jenkins plugin, featuring build flow diagrams and details about the plugin's features, version, and installation.](https://kodekloud.com/kk-media/image/upload/v1752879457/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/yet-another-build-visualizer-plugin.jpg)

![The image shows a Jenkins plugin management page with a list of plugins and their installation statuses, including "Success" and "Pending." The sidebar includes options like updates, available plugins, and download progress.](https://kodekloud.com/kk-media/image/upload/v1752879458/notes-assets/images/Jenkins-For-Beginners-Installing-Plugins/jenkins-plugin-management-page.jpg)

---

## Conclusion

By following these detailed steps, you can install and configure Jenkins plugins to enable artifact sharing between jobs and create visual job chains. This setup enhances your continuous integration process and simplifies troubleshooting across interconnected jobs.

Happy building with Jenkins!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/6a945431-1040-4467-b874-ef7d24d5a6a0/lesson/000db1db-5dde-42e9-802a-0be4b0a0361f)**
>
> Watch video content
