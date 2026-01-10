# Use JCasC create jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Use-JCasC-create-jobs)

---

## Table of Contents

- Use JCasC create jobs
  - Examples in the demos Directory
  - Defining Pipeline Jobs
  - Verifying Tool Configuration
  - Links and References
  - Watch Video
    - 1. Global Matrix Authorization Strategy
    - 2. Kubernetes Cloud Integration
    - 3. Node.js Tool Installation
    - 4. Git and Maven Tool Installation
    - Plugin Requirements

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Use JCasC create jobs

In this lesson, we’ll explore how to leverage the [Jenkins Configuration as Code (JCasC) plugin](https://github.com/jenkinsci/configuration-as-code-plugin) to define your Jenkins tools and pipeline jobs declaratively. You’ll learn:

- Where to store your YAML configurations
- How to configure authorization, clouds, and tools
- How to automate pipeline job creation with the Job DSL plugin

![The image shows a GitHub repository page for the "configuration-as-code-plugin" with a list of folders and files in the "demos" directory, along with commit messages and dates.](https://kodekloud.com/kk-media/image/upload/v1752868837/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/github-repo-configuration-as-code-demos.jpg)

## Examples in the `demos` Directory

Inside the plugin’s `demos` folder, you’ll find YAML samples for common Jenkins configurations.

### 1\. Global Matrix Authorization Strategy

```
jenkins:
  authorizationStrategy:
    globalMatrix:
      permissions:
        - "USER:Overall/Read:anonymous"
        - "GROUP:Overall/Administer:authenticated"
        - "USER:Overall/Administer:admin"
```

### 2\. Kubernetes Cloud Integration

![The image shows a GitHub repository page for a Jenkins configuration-as-code plugin, specifically in the "kubernetes" directory, with a list of YAML files and a README.md file. The README section provides instructions for configuring a Kubernetes plugin.](https://kodekloud.com/kk-media/image/upload/v1752868838/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/github-jenkins-kubernetes-plugin-yaml.jpg)

```
jenkins:
  clouds:
    - kubernetes:
        name: "advanced-k8s-config"
        serverUrl: "https://advanced-k8s-config:443"
        serverCertificate: "serverCertificate"
        skipTlsVerify: true
        credentialsId: "advanced-k8s-credentials"
        namespace: "default"
        jenkinsUrl: "http://jenkins/"
        jenkinsTunnel: "jenkinsTunnel"
        containerCapStr: 42
        maxRequestsPerHostStr: 64
        retentionTimeout: 5
        connectTimeout: 10
```

### 3\. Node.js Tool Installation

```
tool:
  nodejs:
    installations:
      - name: "NodeJS Latest"
        home: "" # required until nodejs-1.3.4 release (JENKINS-57508)
        properties:
          - installSource:
              installers:
                - nodeJSInstaller:
                    id: "12.11.1"
    npmPackagesRefreshHours: 48 # default is 72
```

### 4\. Git and Maven Tool Installation

```
git:
  installations:
    - home: "git"
      name: "Default"

maven:
  installations:
    - name: "M398"
      properties:
        - installSource:
            installers:
              - maven:
                  id: "3.9.8"
mavenGlobalConfig:
  globalSettingsProvider: "standard"
  settingsProvider: "standard"
```

Save your consolidated YAML (e.g., `/var/lib/jenkins/JENKINS_BACKUP/jenkins.yaml`) and apply it via **Manage Jenkins > Configuration as Code**. After reloading, you should see your Kubernetes cloud and tools under **Global Tool Configuration**.

---

## Defining Pipeline Jobs

The `demos/jobs` folder demonstrates how to create folders and pipeline jobs using the [Job DSL plugin](https://plugins.jenkins.io/job-dsl).

![The image shows a GitHub repository page for the "configuration-as-code-plugin" with a focus on the "jobs" directory, displaying several YAML files and a README file. The README section below provides instructions on configuring seed jobs using the Job DSL plugin.](https://kodekloud.com/kk-media/image/upload/v1752868839/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/github-repo-configuration-as-code.jpg)

```
jobs:
  - script: >
      folder('testjobs')
  - script: >
      pipelineJob('testjobs/default-agent') {
        definition {
          cps {
            script("""
              pipeline {
                agent any
                stages {
                  stage('test') {
                    steps {
                      echo "hello"
                    }
                  }
                }
              }
            """.stripIndent())
          }
        }
      }
```

> [!important]
> **Warning**
>
> If the **Job DSL plugin** is not installed, you will see this exception:

![The image shows a webpage with documentation related to Jenkins configuration, specifically focusing on Kubernetes integration settings. Various configuration options and descriptions are listed, such as server certificates and proxy settings.](https://kodekloud.com/kk-media/image/upload/v1752868840/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/jenkins-kubernetes-configuration-docs.jpg)

```
io.jenkins.plugins.casc.UnknownConfiguratorException: No configurator for the following root elements: jobs
```

### Plugin Requirements

| Plugin                | Purpose                                    | Install Location                |
| --------------------- | ------------------------------------------ | ------------------------------- |
| Configuration as Code | Declarative Jenkins configuration via YAML | Manage Jenkins > Manage Plugins |
| Job DSL               | Define jobs using Domain Specific Language | Manage Jenkins > Manage Plugins |

1.  Go to **Manage Jenkins > Manage Plugins**.
2.  Search for **Job DSL** and install it.
3.  Reload your JCasC configuration.

After installation, refresh your Jenkins Dashboard. You will now see a new folder **testjobs** containing the **default-agent** pipeline:

![The image shows a Jenkins dashboard with a job named "default-agent" under the "testjobs" folder, displaying options for configuration and build history.](https://kodekloud.com/kk-media/image/upload/v1752868841/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/jenkins-dashboard-default-agent-testjobs.jpg)

Inside **default-agent**, the pipeline script is:

```
pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo "hello"
      }
    }
  }
}
```

---

## Verifying Tool Configuration

1.  Navigate to **Manage Jenkins > Global Tool Configuration**.
2.  Confirm your Node.js installation under **NodeJS**.

![The image shows a Jenkins configuration interface with dropdown menus for managing system settings, plugins, and other configurations. The interface is dark-themed and includes options like "Manage Jenkins" and "Configuration as Code."](https://kodekloud.com/kk-media/image/upload/v1752868843/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/jenkins-configuration-interface-dropdowns.jpg)

3.  Inspect the NodeJS details:

![The image shows a Jenkins configuration screen for managing tools, specifically for setting up NodeJS. It includes options for version selection, architecture settings, and global npm package installation.](https://kodekloud.com/kk-media/image/upload/v1752868844/notes-assets/images/Advanced-Jenkins-Use-JCasC-create-jobs/jenkins-nodejs-configuration-screen.jpg)

You’ve now automated both your toolchain and pipeline jobs entirely with JCasC!

---

## Links and References

- [Jenkins Configuration as Code Plugin (GitHub)](https://github.com/jenkinsci/configuration-as-code-plugin)
- [JCasC Plugin Documentation](https://plugins.jenkins.io/configuration-as-code)
- [Job DSL Plugin](https://plugins.jenkins.io/job-dsl)
- [Jenkins Official Documentation](https://www.jenkins.io/doc/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/a393ebf1-51c1-4a3f-bfd1-605a5d8b31a0)**
>
> Watch video content
