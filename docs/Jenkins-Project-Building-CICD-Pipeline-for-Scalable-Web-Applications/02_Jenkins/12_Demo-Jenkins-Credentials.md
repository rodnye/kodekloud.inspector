# Demo Jenkins Credentials - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Demo-Jenkins-Credentials)

---

## Table of Contents

- Demo Jenkins Credentials
  - Method 1: Using Environment Variables for Credentials
  - Method 2: Using the withCredentials Step
  - Summary
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Demo Jenkins Credentials

In this lesson, we demonstrate how to work with Jenkins credentials to securely manage access within your pipelines.

First, navigate to the main dashboard and select **Manage Jenkins**. Then, scroll down to the **Credentials** section.

![The image shows the "Manage Jenkins" page of a Jenkins dashboard, displaying system configuration options and a warning about security vulnerabilities in a plugin.](https://kodekloud.com/kk-media/image/upload/v1752879885/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Jenkins-Credentials/manage-jenkins-dashboard-security-warning.jpg)

Within the Credentials section, you will see different domains such as System and Global. For our purposes, we will create a global credential to be used within the Jenkins Pipeline.

![The image shows a Jenkins dashboard on the "Credentials" page, displaying a section for "Stores scoped to Jenkins" with a "System" store and a global domain.](https://kodekloud.com/kk-media/image/upload/v1752879886/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Jenkins-Credentials/jenkins-dashboard-credentials-page.jpg)

Click **Add credentials**. You will be presented with several types of credentials, including:

- Username and password
- GitHub app integration
- OpenShift username and password
- SSH key
- Secret file or secret text (key-value pair)
- Certificates (including self-signed certificates)

For this demonstration, we will use the **username and password** type. Set the scope to **Global** and input the values for the username and password to simulate connecting to a server (for example, using "ec2-user" as the username and "password123" as the password on an AWS Linux AMI).

![The image shows a Jenkins interface for creating new credentials, with fields for kind, scope, username, password, ID, and description.](https://kodekloud.com/kk-media/image/upload/v1752879886/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Jenkins-Credentials/jenkins-create-credentials-interface.jpg)

Assign an ID to this credential (e.g., "server-creds") and optionally add a description. By default, the password is treated as secret. If you would also like the username to be hidden, check the corresponding option. Finally, click **Create**.

![The image shows a Jenkins interface displaying global credentials, with one entry labeled "server-creds" for an "ec2-user" using a username and password. There's an option to add more credentials.](https://kodekloud.com/kk-media/image/upload/v1752879887/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Jenkins-Credentials/jenkins-global-credentials-server-creds.jpg)

Once the credential is created, you can integrate it into your Jenkins Pipeline. Below is an example Pipeline script that clears any previously defined environment variables.

> [!important]
> **Basic Pipeline Example**
>
> This script demonstrates a basic pipeline with separate stages for setup and testing.

```
pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                sh "pip install -r requirements.txt"
                echo "The Database IP is: ${DB_HOST}"
            }
        }
        stage('Test') {
            steps {
                sh "pytest"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }
    }
}
```

## Method 1: Using Environment Variables for Credentials

To use the credentials in your Pipeline, you can store them as an environment variable. The following example demonstrates how to assign the global credential ("server-creds") to an environment variable:

```
pipeline {
    agent any


    environment {
        SERVER_CREDS = credentials('server-creds')
    }


    stages {
        stage('Setup') {
            steps {
                echo "my creds: ${SERVER_CREDS}"
                sh "pip install -r requirements.txt"
            }
        }
        stage('Test') {
            steps {
                sh "pytest"
            }
        }
    }
}
```

In this configuration, the credential (username and password) is stored as a single string separated by a colon. To access the individual components (username and password), you can update your Pipeline as follows:

```
pipeline {
    agent any


    environment {
        SERVER_CREDS = credentials('server-creds')
    }


    stages {
        stage('Setup') {
            steps {
                echo "my creds: ${SERVER_CREDS}"
                echo "Username: ${SERVER_CREDS_USR}"
                echo "Password: ${SERVER_CREDS_PSW}"
                sh "pip install -r requirements.txt"
            }
        }
        stage('Test') {
            steps {
                sh "pytest"
            }
        }
    }
}
```

After saving and pushing these changes to Git, you might see an output similar to this:

```
1 file changed, 8 insertions(+), 8 deletions(-)
C:\Users\sanje\Documents\Jenkins-demo>git push origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 394 bytes | 394.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
remote: GitHub found 7 vulnerabilities on kodekloudhub/course-jenkins-project's default branch (1 high, 4 moderate, 2 low). To find out more, visit:
remote: https://github.com/kodekloudhub/course-jenkins-project/security/dependency
To https://github.com/kodekloudhub/course-jenkins-project
   3cf0601..47228f9  main -> main
```

When reviewing the Jenkins build console output, note that:

- The credential string is masked.
- The username is visible in plain text (unless configured as secret).
- The password remains hidden.

## Method 2: Using the withCredentials Step

Alternatively, you can use the `withCredentials` block to limit the exposure of your credentials. Remove the global environment variable and wrap only the steps that need access to the credential within a `withCredentials` block. This is particularly useful for username and password credentials.

```
pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'server-creds', usernameVariable: "myuser", passwordVariable: "mypassword")
                ]) {
                    sh "pip install -r requirements.txt"
                }
            }
        }
        stage('Test') {
            steps {
                sh "pytest"
            }
        }
    }
}
```

Within the `withCredentials` block, you can access the username and password using the variables "myuser" and "mypassword." For example, you might want to echo these values (keeping in mind that the password will be masked in the logs):

```
pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'server-creds', usernameVariable: "myuser", passwordVariable: "mypassword")
                ]) {
                    sh '''
                        echo ${myuser}
                        echo ${mypassword}
                    '''
                }
                sh "pip install -r requirements.txt"
            }
        }
        stage('Test') {
            steps {
                sh "pytest"
            }
        }
    }
}
```

> [!important]
> **Scope Limitation**
>
> Variables defined within the `withCredentials` block are only available within that block. This practice helps keep sensitive information secure by ensuring that credentials are not exposed outside their intended scope.

After testing the configuration, commit and push your changes:

```
C:\Users\sanje\Documents\Jenkins-demo>git add .
C:\Users\sanje\Documents\Jenkins-demo>git commit -m "withcredentials"
[main 92a5490] withcredentials
 1 file changed, 9 insertions(+), 6 deletions(-)
C:\Users\sanje\Documents\Jenkins-demo>git push origin main
```

The console output will confirm that while the username is printed (since it is not treated as secret), the password remains masked.

## Summary

There are two primary methods for incorporating credentials into your Jenkins Pipeline:

1.  Using environment variables to store the credential.
2.  Using the `withCredentials` block to scope access to sensitive data.

Both approaches help manage sensitive data securely within your pipeline.

For more information on managing Jenkins credentials, check out the [Jenkins Documentation](https://www.jenkins.io/doc/).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/03fe649a-f7f5-4252-87b1-9140abbf85b8)**
>
> Watch video content
