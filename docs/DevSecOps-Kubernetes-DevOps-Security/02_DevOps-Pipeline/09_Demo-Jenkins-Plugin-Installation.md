# Demo Jenkins Plugin Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Demo-Jenkins-Plugin-Installation)

---

## Table of Contents

- Demo Jenkins Plugin Installation
  - 1. Verify Jenkins Is Running
  - 2. Explore the Plugin Installer Script
  - 3. Run the Installer
  - 4. Verify Plugin Installation
  - 5. Next Steps
  - Links and References
  - Watch Video
    - 2.1 plugins.txt
    - 2.2 plugin-installer.sh

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Demo Jenkins Plugin Installation

In this guide, you’ll learn how to install multiple Jenkins plugins automatically by leveraging the Jenkins Remote API. This approach avoids manual UI steps under **Manage Jenkins → Manage Plugins**, speeding up your CI/CD setup.

## 1\. Verify Jenkins Is Running

First, confirm that the Jenkins service is active:

```
sudo systemctl status jenkins
```

Example output:

```
● jenkins.service - LSB: Start Jenkins at boot time
   Loaded: loaded (/etc/init.d/jenkins; generated)
   Active: active (exited) since Tue 2021-06-15 05:07:43 UTC; 1h 39min ago
     Docs: man:systemd-sysv-generator(8)
```

Next, retrieve the initial admin password for API authentication:

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
# e.g. 14f8cea6ad4b0a883997e96d4a6a7
```

> [!important]
> **Note**
>
> Save this initial password—you’ll use it to generate an API token in the installer script.

## 2\. Explore the Plugin Installer Script

Assuming you cloned the `devsecops-k8s-demo` repository, navigate to the Jenkins plugins directory:

```
cd devsecops-k8s-demo/setup/jenkins-plugins/
ls -l
```

| File                  | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| `plugins.txt`         | Lists each plugin and its version                              |
| `plugin-installer.sh` | Bash script to call the Jenkins Remote API for plugin installs |

### 2.1 plugins.txt

Here’s how the file lists desired plugins:

| Plugin                          | Version |
| ------------------------------- | ------- |
| performance                     | 3.18    |
| docker-workflow                 | 1.26    |
| dependency-check-jenkins-plugin | 5.1.1   |
| blueocean                       | 2.24.7  |
| jacoco                          | 2.0.7   |
| slack                           | 2.4.8   |
| sonar                           | 2.13.1  |
| pitmutation                     | 1.0.2   |
| kubernetes-cli                  | 1.10.2  |

### 2.2 plugin-installer.sh

This Bash script automates plugin installation using the Jenkins Remote API and `jq` for JSON parsing:

```
#!/bin/bash
set -e


JENKINS_URL="http://localhost:8080"
ADMIN_USER="admin"
ADMIN_PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)


# Fetch CRSF protection crumb
JENKINS_CRUMB=$(
  curl -s --cookie-jar /tmp/cookies \
       -u ${ADMIN_USER}:${ADMIN_PASSWORD} \
       "${JENKINS_URL}/crumbIssuer/api/json" \
  | jq -r .crumb
)


# Generate a new API token for 'admin'
JENKINS_TOKEN=$(
  curl -s -X POST \
       -H "Jenkins-Crumb:${JENKINS_CRUMB}" \
       --cookie /tmp/cookies \
       -u ${ADMIN_USER}:${ADMIN_PASSWORD} \
       "${JENKINS_URL}/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken?newTokenName=plugin-installer" \
  | jq -r .data.tokenValue
)


echo "Jenkins URL: ${JENKINS_URL}"
echo "API Token: ${JENKINS_TOKEN}"


# Install each plugin from plugins.txt
while read -r plugin; do
  echo "Installing ${plugin}..."
  curl -s --user "${ADMIN_USER}:${JENKINS_TOKEN}" \
       -H "Content-Type: text/xml" \
       --data "<jenkins><install plugin='${plugin}' /></jenkins>" \
       "${JENKINS_URL}/pluginManager/installNecessaryPlugins"
done < plugins.txt


echo "Plugin installation requests sent."
echo "Some plugins may require a safe restart:"
echo "  ${JENKINS_URL}/safeRestart"
```

> [!important]
> **Warning**
>
> Ensure `jq` is installed (`sudo apt-get install -y jq`) and Jenkins is accessible at `localhost:8080` before running the script.

## 3\. Run the Installer

Execute the installer script:

```
bash plugin-installer.sh
```

Sample output:

```
Jenkins URL: http://localhost:8080
API Token: 8f2a...
Installing performance@3.18...
Installing docker-workflow@1.26...
…
Installing kubernetes-cli@1.10.2...
Plugin installation requests sent.
Some plugins may require a safe restart:
  http://localhost:8080/safeRestart
```

## 4\. Verify Plugin Installation

1.  Open **Manage Jenkins → Manage Plugins → Installed** in the Jenkins UI.
2.  If any plugin is missing, switch to **Available**, search for it (e.g., “Kubernetes CLI”), select the version, and click **Install without restart**.

## 5\. Next Steps

With your plugins in place, create a Jenkins pipeline that integrates Maven, Docker, and Kubernetes to validate the new capabilities.

---

## Links and References

- [Jenkins Remote API](https://www.jenkins.io/doc/book/using/remote-access-api/)
- [jq Manual](https://stedolan.github.io/jq/manual/)
- [Manage Jenkins Plugins](https://www.jenkins.io/doc/book/managing/plugins/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/a0b190ab-bc14-456a-a160-8c04e292849d)**
>
> Watch video content
