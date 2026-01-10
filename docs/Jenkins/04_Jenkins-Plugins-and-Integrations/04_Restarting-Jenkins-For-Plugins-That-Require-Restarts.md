# Restarting Jenkins For Plugins That Require Restarts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Jenkins-Plugins-and-Integrations/Restarting-Jenkins-For-Plugins-That-Require-Restarts)

---

## Table of Contents

- Restarting Jenkins For Plugins That Require Restarts
  - Restarting Jenkins
  - Verifying Jenkins Status
  - Watch Video

---

## Content

Jenkins

Jenkins Plugins and Integrations

# Restarting Jenkins For Plugins That Require Restarts

When working with Jenkins, some plugins can be installed seamlessly, while others might require the Jenkins instance to be restarted to apply changes. This guide explains how to effectively restart Jenkins on a systemd-based Linux system.

## Restarting Jenkins

To restart the Jenkins service, execute the following command in your terminal:

```
sudo systemctl restart jenkins
```

This command stops the current Jenkins process and immediately starts a new one, ensuring that any plugin requiring a restart will be properly initialized.

## Verifying Jenkins Status

After restarting Jenkins, it's essential to verify that the service is running correctly. Use this command to check the status of Jenkins:

```
systemctl status jenkins
```

If the status output confirms that Jenkins is running, you can refresh your browser, log back in, and continue using Jenkins without interruption.

> **Tip:** Refreshing your browser after the restart ensures that you are connected to the current running instance of Jenkins.

This restart process is particularly important when installing plugins that require a restart or when making significant configuration changes.

Let's continue with some hands-on practice to reinforce this process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/34e95998-38e2-4735-a378-b466e6a5851c/lesson/f9d10d4b-c77f-4674-86a1-7a5bfe187857)**
>
> Watch video content
