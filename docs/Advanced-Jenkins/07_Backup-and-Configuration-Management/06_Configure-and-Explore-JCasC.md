# Configure and Explore JCasC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Configure-and-Explore-JCasC)

---

## Table of Contents

- Configure and Explore JCasC
  - Why Use Jenkins Configuration as Code?
  - 1. Install the Configuration as Code Plugin
  - 2. Exploring Your Current Configuration
  - 3. Editing and Applying Your YAML Configuration
  - 4. Configuration Actions
  - Resources and References
  - Watch Video
    - Sample JSON Schema Snippet

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Configure and Explore JCasC

Managing Jenkins through its UI can be time-consuming and error-prone. The **Configuration as Code (JCasC)** plugin enables you to define your entire Jenkins setup using human-readable YAML files. In this guide, you’ll learn how to install the plugin, inspect your current configuration, and apply updates—all in a reproducible way.

## Why Use Jenkins Configuration as Code?

- Automate Jenkins setup and reduce manual steps
- Store your Jenkins configuration in version control
- Easily replicate environments across teams or clusters

## 1\. Install the Configuration as Code Plugin

1.  Navigate to **Manage Jenkins** → **Manage Plugins**.
2.  Under the **Available** tab, search for **Configuration as Code**.
3.  Select the plugin, click **Install without restart**, then restart Jenkins when prompted.
4.  Log back in and verify the plugin is active.

Once installed, open **Manage Jenkins** → **Configuration as Code**. You will see options to replace, reload, download, or view your YAML configuration.

![The image shows a Jenkins “Configuration as Code” interface, where users can replace configuration sources and perform actions like reloading, downloading, or viewing configurations. There is a warning about the export not being directly usable for a Jenkins YAML configuration.](https://kodekloud.com/kk-media/image/upload/v1752868800/notes-assets/images/Advanced-Jenkins-Configure-and-Explore-JCasC/jenkins-configuration-as-code-interface.jpg)

## 2\. Exploring Your Current Configuration

Click **View Configuration** to export the entire Jenkins setup in YAML format. This includes credentials, tool installations, security settings, and more.

```
# System credentials example
credentials:
  system:
    domainCredentials:
      - usernamePassword:
          id: "gitea-server-creds"
          description: "Gitea Server Credentials"
          username: "gitea-admin"
          password: "{AAABAAAAAQ4e7wFYLRuoyZLN9NsLqahoKhKpJfItDGTyKusxQCu}"
          scope: GLOBAL
```

```
# Maven and Node.js tool installations
maven:
  installations:
    - name: "M3"
      properties:
        - installSource:
            installers:
              - maven:
                  id: "3.9.8"


nodejs:
  installations:
    - name: "nodejs-22-6-0"
      properties:
        - installSource:
            installers:
              - nodeJSInstaller:
                  id: "22.6.0"
      npmPackagesRefreshHours: 72
```

```
# Remoting security and welcome message
remotingSecurity:
  enabled: true
  slaveAgentPort: 0
  systemMessage: "Welcome to our Jenkins CI Controller"
```

> [!important]
> **Note**
>
> The exported YAML may contain sensitive data (credentials, tokens). Secure it appropriately in your version control or store it behind an access-controlled vault.

For a complete reference, visit the [Jenkins Configuration as Code plugin on GitHub](https://github.com/jenkinsci/configuration-as-code-plugin).

## 3\. Editing and Applying Your YAML Configuration

Store your YAML file on the Jenkins controller. For example:

```
cd /var/lib/jenkins/JENKINS_BACKUP
vi jenkins-casc.yaml
```

Here’s a sample configuration that updates the system message and defines a custom view:

```
remotingSecurity:
  enabled: true
  slaveAgentPort: 0
  systemMessage: |
    <h2>Maintenance Notice</h2>
    <ul>
      <li>Every Sunday at 11:45 PM ET</li>
      <li>Contact <a href="mailto:admin@dasher.com">admin@dasher.com</a></li>
    </ul>


updateCenter:
  sites:
    - id: "default"
      url: "https://updates.jenkins.io/update-center.json"


views:
  - name: "Build Monitor"
    config:
      displayBadgesFrom: "getLastBuild"
    jobNames:
      - "ascii-build-job"
      - "ascii-test-job"
```

1.  Save the file (`jenkins-casc.yaml`).
2.  Go to **Manage Jenkins** → **Configuration as Code**, set **Path** to `/var/lib/jenkins/JENKINS_BACKUP/jenkins-casc.yaml`.
3.  Click **Apply New Configuration**. Jenkins will validate the YAML and reload the setup automatically.

> [!important]
> **Warning**
>
> Ensure the YAML file is owned by the Jenkins user and has correct permissions (`chmod 600`) to prevent unauthorized access.

## 4\. Configuration Actions

On the **Configuration as Code** page, you can perform the following actions:

| Action   | Description                                                 |
| -------- | ----------------------------------------------------------- |
| Replace  | Load configuration from a local file or Git repository      |
| Reload   | Re-apply the last loaded YAML without specifying a new file |
| Download | Export the current Jenkins configuration as a YAML file     |
| View     | Display the full Jenkins configuration in YAML format       |

After applying changes, you can verify your jobs and views on the Jenkins dashboard.

![The image shows a Jenkins dashboard displaying a list of build jobs with their statuses, last success, last failure, and duration. The interface includes options for managing Jenkins and viewing build history.](https://kodekloud.com/kk-media/image/upload/v1752868801/notes-assets/images/Advanced-Jenkins-Configure-and-Explore-JCasC/jenkins-dashboard-build-jobs-statuses.jpg)

### Sample JSON Schema Snippet

Use the JSON Schema for YAML validation or to generate documentation:

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Jenkins Configuration as Code",
  "type": "object",
  "properties": {
    "remotingSecurity": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean" },
        "slaveAgentPort": { "type": "integer" },
        "systemMessage": { "type": "string" }
      }
    }
  }
}
```

![The image shows a Jenkins “Configuration as Code” interface, displaying options to replace, reload, download, or view configuration, with a warning about export limitations.](https://kodekloud.com/kk-media/image/upload/v1752868802/notes-assets/images/Advanced-Jenkins-Configure-and-Explore-JCasC/jenkins-configuration-as-code-interface-2.jpg)

## Resources and References

- [Jenkins Configuration as Code Plugin](https://github.com/jenkinsci/configuration-as-code-plugin)
- [Official Jenkins Documentation](https://www.jenkins.io/doc/)
- [JSON Schema Draft 7](https://json-schema.org/specification-links.html#draft-7)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/d36dbd91-0d4b-4bfe-adc7-778bf431a362)**
>
> Watch video content
