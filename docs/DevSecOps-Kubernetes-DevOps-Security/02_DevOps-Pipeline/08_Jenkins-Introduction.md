# Jenkins Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Jenkins-Introduction)

---

## Table of Contents

- Jenkins Introduction
  - What is Jenkins?
  - 1. Verifying the Jenkins Service
  - 2. Accessing the Jenkins Web UI
  - 3. Installing Suggested Plugins
  - 4. Creating the First Admin User
  - 5. Configuring the Jenkins Instance URL
  - 6. Completing the Setup
  - 7. Exploring the Jenkins Dashboard
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Jenkins Introduction

In this lesson, we’ll dive into Jenkins—an open-source automation server—and walk through the post-installation setup. You’ll learn how to verify the service, retrieve the initial admin password, unlock Jenkins, install plugins, and complete the setup wizard.

## What is Jenkins?

Jenkins is a leading open-source automation server for continuous integration and delivery (CI/CD). It leverages a rich plugin ecosystem to build, test, and deploy your applications automatically. Jenkins supports multiple project types:

- **Freestyle**: Classic build jobs
- **Multi-configuration**: Matrix builds across multiple environments
- **Multibranch Pipeline**: Auto-discovers branches with `Jenkinsfile`
- **Simple Pipeline**: Defines build steps in code

Throughout this course, we’ll focus on a _Simple Pipeline_, which uses a collection of scripted jobs to automate software delivery from version control to production.

Jenkins plugins can be installed via:

| Installation Method          | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| Plugin Manager (UI)          | Browse and install from the Jenkins dashboard      |
| Jenkins CLI                  | Use `java -jar jenkins-cli.jar` to install plugins |
| Remote REST API (Automation) | Script plugin installation using REST calls        |

> [!important]
> **Why Remote REST API?**
>
> Automating plugin installation with the Remote REST API ensures consistent environments, especially in Infrastructure as Code workflows.

![The image is a presentation slide about Jenkins, an open-source automation tool, explaining its use of plugins for continuous integration and listing some plugins with their versions.](https://kodekloud.com/kk-media/image/upload/v1752873594/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-automation-plugins-continuous-integration.jpg)

---

## 1\. Verifying the Jenkins Service

On your VM, Jenkins runs on port 8080 by default. Verify the service status:

```
sudo systemctl status jenkins
```

Expected output:

```
● jenkins.service - LSB: Start Jenkins at boot time
   Loaded: loaded (/etc/init.d/jenkins; generated)
   Active: active (exited) since Tue 2021-06-15 05:07:43 UTC; 1h 39min ago
```

---

## 2\. Accessing the Jenkins Web UI

Open your browser and navigate to:

```
http://<your-vm-dns-name>:8080
```

> [!important]
> **Default Port**
>
> If you changed the default port in your install script, adjust the URL accordingly.

On first access, Jenkins prompts for the initial admin password. Retrieve it from the VM:

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Copy the output and paste it into the **Unlock Jenkins** screen.

---

## 3\. Installing Suggested Plugins

After unlocking Jenkins, select **Install suggested plugins** to set up common integrations such as Git, Pipeline, and folders. This bulk installation simplifies your initial configuration.

> [!important]
> **Plugin Installation Time**
>
> Depending on your network and VM resources, this step may take several minutes.

![The image shows a Jenkins setup wizard screen with options to "Install suggested plugins" or "Select plugins to install." It is displayed on a computer screen with a browser and taskbar visible.](https://kodekloud.com/kk-media/image/upload/v1752873595/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-setup-wizard-install-plugins.jpg)

![The image shows a computer screen displaying a "Getting Started" setup wizard for Jenkins, with various plugins and options listed. There is also a small video call window in the top right corner showing a person.](https://kodekloud.com/kk-media/image/upload/v1752873596/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-setup-wizard-screen-plugins.jpg)

---

## 4\. Creating the First Admin User

Once the plugins are in place, Jenkins prompts you to create an admin account. Provide:

- **Username**
- **Password**
- **Full name**
- **Email address**

Save your new credentials to proceed.

![The image shows a setup wizard for creating the first admin user in Jenkins, with fields for username, password, full name, and email address. A person is visible in a small circular video feed in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873598/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-setup-wizard-admin-user.jpg)

---

## 5\. Configuring the Jenkins Instance URL

Set the Jenkins URL used by external systems (e.g., Git webhooks). Enter your VM’s DNS name or static IP, then save.

![The image shows a Jenkins setup wizard screen for instance configuration, with a URL field and options to save or skip the setup. A person is visible in a small video call window at the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873599/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-setup-wizard-instance-configuration.jpg)

---

## 6\. Completing the Setup

With the URL configured, click **Start using Jenkins** to finish the wizard.

![The image shows a browser window with a Jenkins setup completion message, indicating that Jenkins is ready to use. There is a button labeled "Start using Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752873600/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-setup-completion-browser-window.jpg)

---

## 7\. Exploring the Jenkins Dashboard

You’ve arrived at the Jenkins dashboard (version 2.289.1). From here, you can:

- Create and configure new pipelines
- Manage credentials and plugins
- Set up distributed builds

Later in this course, we’ll automate the installation of nine essential plugins using the Remote REST API script.

![The image shows a Jenkins dashboard interface with options to start building a software project and set up a distributed build. There is also a small video call overlay in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873601/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Jenkins-Introduction/jenkins-dashboard-build-options-video-call.jpg)

---

## Links and References

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins REST API](https://www.jenkins.io/doc/book/using/remote-access-api/)
- [CI/CD with Jenkins](https://www.jenkins.io/solutions/cicd/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/4d93f993-de0f-4ae3-bfb2-f0738c3907d9)**
>
> Watch video content
