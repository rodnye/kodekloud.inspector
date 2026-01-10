# Jenkins Credentials - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Jenkins-Credentials)

---

## Table of Contents

- Jenkins Credentials
  - Benefits of Using Jenkins Credentials
  - Creating a Credential in Jenkins
  - Accessing Credentials in a Pipeline
  - Using the Credentials Binding Plugin
  - Binding an SSH Key Credential
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Jenkins Credentials

A common practice in Jenkins pipelines is avoiding hardcoding sensitive environment variables such as database IP addresses, usernames, and passwords directly into the script. Hardcoding these values can expose sensitive data to anyone with repository access. Instead, using Jenkins credentials allows for a secure storage mechanism for secrets like database passwords, API tokens, SSH keys, and SSL certificates. This functionality ensures that only the Jenkins pipeline can access these secrets while keeping them hidden from unauthorized users.

## Benefits of Using Jenkins Credentials

Using Jenkins credentials provides several key advantages:

- **Enhanced Security:** Sensitive data is stored securely, reducing the risk of exposure.
- **Regulatory Compliance:** Keeps your organization in line with regulatory requirements that prohibit storing sensitive information in plain text.
- **Process Efficiency:** Automating secure access to secrets improves overall pipeline reliability.

Before creating a Jenkins credential, it is important to choose the appropriate scope:

- **Global:** The credential can be used by all jobs in the pipeline.
- **System:** Access is restricted to the Jenkins system and background tasks; jobs and pipelines cannot access these credentials.
- **User:** The credential is specific to an individual Jenkins user, used for personal access.

> [!important]
> **Best Practice**
>
> Always adhere to the principle of least privilege. Grant only the necessary permissions to the users, jobs, or plugins that require access to a credential. Regular audits and credential rotations are also recommended for maintaining security.

## Creating a Credential in Jenkins

To add a new credential, navigate to the Jenkins dashboard, click on **Manage Jenkins**, then access the credentials section. The image below illustrates the Jenkins dashboard interface where you can configure credentials:

![The image shows a Jenkins dashboard interface focused on configuring credentials, with options for system configuration, security, and credential management.](https://kodekloud.com/kk-media/image/upload/v1752879903/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Jenkins-Credentials/jenkins-dashboard-credentials-config.jpg)

## Accessing Credentials in a Pipeline

One effective method for using Jenkins credentials is by binding them to environment variables. For example, after creating a credential (named "prod-server") via the GUI, you can reference it in your pipeline script with the following approach:

```
pipeline {
    agent any
    environment {
        PROD_SERVER = credentials('prod-server')
    }
    stages {
        stage('Build') {
            steps {
                echo "${PROD_SERVER}"     // Prints username:password
                echo "${PROD_SERVER_USR}" // Prints username
                echo "${PROD_SERVER_PSW}" // Prints password
            }
        }
    }
}
```

> [!important]
> **Sensitive Data Warning**
>
> Avoid printing sensitive information using commands like `echo`. Although Jenkins masks secret values in the console output, displaying sensitive data can be risky. For more details, refer to [Jenkins Groovy String Interpolation](https://jenkins.io/redirect/groovy-string-interpolation).

## Using the Credentials Binding Plugin

For a more secure alternative, utilize the credentials binding plugin. This method restricts the exposure of credentials to a specific block of code. The following example shows how to use a username/password credential securely with the plugin:

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'prod-server', passwordVariable: 'mypassword', usernameVariable: 'myusername')]) {
                    sh '''
                        echo $mypassword
                        echo $myusername
                    '''
                }
            }
        }
    }
}
```

Within the `withCredentials` block, the environment variables `mypassword` and `myusername` are available for secure use within your shell commands.

## Binding an SSH Key Credential

Jenkins credentials also support SSH keys. By configuring an SSH key credential, you can bind it to an environment variable and use it in your SSH commands. Consider the following example:

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-key', keyFileVariable: 'MY_SSH_KEY', usernameVariable: 'username')]) {
                    sh '''
                        ssh -i $MY_SSH_KEY -o StrictHostKeyChecking=no ${username}@18.207.192.10 "Run your command"
                    '''
                }
            }
        }
    }
}
```

In this scenario, the SSH key is securely stored and bound to the environment variable `MY_SSH_KEY`, while the username is retrieved from the corresponding credential.

By implementing these techniques and examples, you can securely manage and utilize credentials in your Jenkins pipelines, improving both security and efficiency.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/3a2df169-03af-42fd-adf1-cf0e080242d7)**
>
> Watch video content
