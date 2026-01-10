# InstallSetup NodeJS Build Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/InstallSetup-NodeJS-Build-Tool)

---

## Table of Contents

- InstallSetup NodeJS Build Tool
  - Verifying Node.js and npm on the Host
  - Testing Node.js Availability with a Freestyle Project
  - Configuring a Dedicated Node.js Installation in Jenkins
  - Using the Node.js Tool in a Jenkins Job
  - Watch Video
    - Installing the Node.js Plugin
    - Configuring the Node.js Tool

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# InstallSetup NodeJS Build Tool

In this lesson, we will explore how to set up and use Node.js within Jenkins. We begin by verifying that Node.js is available on the Jenkins host and then configure Jenkins to utilize a dedicated Node.js installation via the Node.js plugin.

---

## Verifying Node.js and npm on the Host

Assuming Jenkins is already installed, log into the Jenkins host. In an earlier configuration from the [Jenkins For Beginners](https://learn.kodekloud.com/user/courses/jenkins-for-beginners) course, a repository was present. Since the repository is no longer needed, remove it with the following commands:

```
root@jenkins-controller-1 in solar-system-gitea on 📦 main (!) via 🦕 v20.16.0
> ls
Dockerfile  README.md  app-controller.js  app-test.js  app.js  coverage  index.html  node_modules  oas.json  package-lock.json  package.json  test-results.xml
root@jenkins-controller-1 in solar-system-gitea on 📦 main (!) via 🦕 v20.16.0
> cd ..
root@jenkins-controller-1 in ~
> rm -rf solar-system-gitea/
```

After removing the repository, verify the Node.js and npm versions installed on the host:

```
root@jenkins-controller-1 in ~
> node -v
v20.16.0
root@jenkins-controller-1 in ~
> npm -v
10.8.1
```

Jenkins is running on the same virtual machine. To confirm the Jenkins service status, use:

```
root@jenkins-controller-1 in ~
> systemctl status jenkins
● jenkins.service - Jenkins Continuous Integration Server
   Loaded: loaded (/usr/lib/systemd/system/jenkins.service; disabled; preset: enabled)
   Active: active (running) since Sat 2024-09-21 20:03:51 UTC; 1 day 10h ago
 Main PID: 60100 (java)
    Tasks: 52 (limit: 4658)
   Memory: 832.1M (peak: 880.0M)
      CPU: 4min 55.594s
   CGroup: /system.slice/jenkins.service
           └─60100 /usr/bin/java -Djava.awt.headless=true -jar /usr/share/java/jenkins.war --webroot=/var/cache/jenkins/war --httpPort=8080
```

Since Node.js and npm are available on the host, Jenkins jobs can execute Node.js commands (such as `node -v` and `npm -v`) without any additional configuration.

---

## Testing Node.js Availability with a Freestyle Project

To test the Node.js installation, create a new Freestyle project in Jenkins. For demonstration, we will name the project "npm-version-test" (alternatively, "Node.js-version-test" is acceptable).

1.  In Jenkins, click on **New Item** and select **Freestyle project**.
2.  Name the project "npm-version-test" and click **OK**.

![The image shows a Jenkins interface for creating a new item, with options like Freestyle project, Pipeline, and Multi-configuration project. The item name "npm-version-test" is being entered.](https://kodekloud.com/kk-media/image/upload/v1752879789/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/jenkins-new-item-npm-version-test.jpg)

3.  In the project configuration, add a build step of type **Execute shell** and enter the following commands:

    ```
    node -v
    npm -v
    ```

4.  Save the configuration and trigger the build. A successful build will output the Node.js and npm versions as obtained from the host installation.

![The image shows a configuration screen for a Jenkins job, with options for source code management, build triggers, and build environment. The "Execute shell" section is open, displaying a command input field with "node" typed in.](https://kodekloud.com/kk-media/image/upload/v1752879791/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/jenkins-job-configuration-screen.jpg)

The build output should display:

```
+ node -v
v20.16.0
+ npm -v
10.8.1
Finished: SUCCESS
```

Note that because Jenkins is running on the same host where Node.js is installed, it uses the host-installed versions. In many environments, however, your Jenkins pipeline or jobs might run on an agent that does not have Node.js pre-installed.

---

## Configuring a Dedicated Node.js Installation in Jenkins

To accommodate scenarios where the agent lacks Node.js, you can configure a dedicated Node.js build tool within Jenkins.

### Installing the Node.js Plugin

1.  Navigate to **Manage Jenkins** → **Manage Plugins**.
2.  Under the **Available** tab, search for "NodeJS". Locate the NodeJS plugin (version 1.6.2 at the time of recording) and install it.

![The image shows the Jenkins plugin management interface, specifically the "Available plugins" section, with a search for "NodeJS" displaying the NodeJS plugin version 1.6.2.](https://kodekloud.com/kk-media/image/upload/v1752879792/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/jenkins-plugin-management-nodejs-1-6-2.jpg)

Be patient as Jenkins installs the plugin and reloads the plugin extension.

### Configuring the Node.js Tool

After installing the plugin, a new option for Node.js installations appears under **Manage Jenkins** → **Global Tool Configuration** (or **Manage Jenkins Tools**). To configure a Node.js installation, follow these steps:

1.  Locate the Node.js installations section.
2.  Click to add a new Node.js installation; for example, name it "Node.js 22.6.0" to represent the intended version.
3.  Select the installation method (typically "Install automatically" from Node.js.org) and leave the default settings intact.
4.  Save the configuration.

![The image shows a Jenkins configuration screen where different versions of NodeJS are being selected from a dropdown menu. The interface includes options to force 32-bit architecture and install global npm packages.](https://kodekloud.com/kk-media/image/upload/v1752879794/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/jenkins-nodejs-configuration-dropdown.jpg)

---

## Using the Node.js Tool in a Jenkins Job

Return to your "npm-version-test" Freestyle project to update its configuration to use the newly configured Node.js tool:

1.  In the project configuration, scroll down to the **Build Environment** section.
2.  Check the option labeled "Provide Node & npm bin/ folder to PATH" (or a similarly named option, depending on your Jenkins version).
3.  Select the Node.js installation you just configured.
4.  Retain the build step containing the commands:

    ```
    node -v
    npm -v
    ```

5.  Save the configuration and rebuild the project.

During the build, Jenkins will first download and install the specified Node.js version—if it isn’t already installed—and then use that installation. The build log might display the following messages:

```
Unpacking https://nodejs.org/dist/v22.6.0/node-v22.6.0-linux-x64.tar.gz to /var/lib/jenkins/tools/hudson.plugins.nodejs.tools.NodeJSInstallation/nodejs-22-6-0 on Jenkins
[npm-version-test] $ /bin/sh -xe /tmp/jenkins11644918605421431225.sh
+ node -v
v22.6.0
+ npm -v
10.8.2
Finished: SUCCESS
```

> [!important]
> **Note**
>
> The first build used the host-installed Node.js (version 20.16.0), while the second build used the Jenkins-provided installation (version 22.6.0). This flexibility allows you to choose between using the system environment or a dedicated Node.js tool installation.

![The image shows a configuration screen for a build environment, likely in a CI/CD tool, with options for Node.js installation and build steps.](https://kodekloud.com/kk-media/image/upload/v1752879796/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/ci-cd-build-environment-nodejs.jpg)

Finally, monitor the Jenkins dashboard for build history and project status:

![The image shows a Jenkins dashboard for a project named "npm-version-test," displaying build status and history with options to build, configure, and manage the project.](https://kodekloud.com/kk-media/image/upload/v1752879798/notes-assets/images/Jenkins-Pipelines-InstallSetup-NodeJS-Build-Tool/jenkins-dashboard-npm-version-test.jpg)

---

This lesson demonstrated how to verify that Node.js is installed on the Jenkins host and how to configure a dedicated Node.js installation using the Node.js plugin. This approach provides the flexibility needed in environments where the agent might not have Node.js pre-installed. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/22ca3475-c387-4612-9d7b-3ab21e413be9)**
>
> Watch video content
