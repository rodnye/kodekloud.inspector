# Demo Jenkins Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Demo-Jenkins-Environment-Variables)

---

## Table of Contents

- Demo Jenkins Environment Variables
  - 1. Global Environment Variables in the Pipeline
  - 2. Defining Environment Variables Within a Stage
  - 3. Utilizing Built-In Jenkins Environment Variables
  - Summary
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Demo Jenkins Environment Variables

In this lesson, we demonstrate how to work with environment variables in a Jenkins pipeline. You will learn how to define environment variables globally for all stages, set them locally within a specific stage, and leverage built-in Jenkins environment variables. These techniques are essential for building flexible, maintainable, and well-configured pipelines in Jenkins.

---

## 1\. Global Environment Variables in the Pipeline

Defining environment variables at the top level of your pipeline makes them accessible in every stage. In the example below, three key–value pairs are defined: the database host, username, and password. You can reference these variables in any stage using the syntax `${VARIABLE_NAME}`.

```
pipeline {
    agent any


    environment {
        DB_HOST = '192.168.12.1'
        USERNAME = 'user1'
        PASSWORD = 'password123'
    }


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
                echo "The DB username is: ${USERNAME} and the password is: ${PASSWORD}"
            }
        }
    }
}
```

After committing and pushing these changes (using commands such as `git add`, `git commit`, and `git push origin main`), review the Jenkins console output to verify that the environment variables have been correctly injected. For example, the output might include:

```
Requirement already satisfied: packaging==23.2 in /var/lib/jenkins/.local/lib/python3.9/site-packages (from -r requirements.txt (line 21)) (23.2)
...
[Pipeline] echo
The Database IP is: 192.168.12.1
...
============================= test session starts ==============================
platform linux -- Python 3.9.16, pytest-7.4.4, pluggy-1.3.0
rootdir: /var/lib/jenkins/workspace/flaskpipeline
collected 3 items


test_app.py ... [100%]


============================== 3 passed in 0.14s ===============================
```

> [!important]
> **Note**
>
> In the "Test" stage, the pipeline echoes the username and password after running the tests with `pytest`. Make sure your sensitive information is managed carefully when echoing details in production environments.

---

## 2\. Defining Environment Variables Within a Stage

You might also define environment variables within a specific stage. However, note that these variables are local to the stage and are not accessible in other stages. The example below shows environment variables defined in the "Setup" stage. Attempting to access them in a different stage (such as "Test") will result in an error.

```
pipeline {
    agent any


    stages {
        stage('Setup') {
            environment {
                DB_HOST = '192.168.1.1'
                USERNAME = 'user1'
                PASSWORD = 'password123'
            }
            steps {
                sh "pip install -r requirements.txt"
                echo "The Database IP is: ${DB_HOST}"
            }
        }
        stage('Test') {
            steps {
                // Attempting to access USERNAME or PASSWORD here will fail.
                sh "pytest"
            }
        }
    }
}
```

After pushing these changes, you might see output similar to:

```
Writing objects: 100% (3/3), 505 bytes | 505.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
...
```

And then an error in the "Test" stage similar to:

```
[Pipelines] { (Test)
[Pipelines] sh
+ pytest
...
groovy.lang.MissingPropertyException: No such property: USERNAME for class: groovy.lang.Binding
...
```

This error confirms that the variables defined within the "Setup" stage are not visible in the "Test" stage. To ensure these values are available throughout the pipeline, define them in the global environment block.

---

## 3\. Utilizing Built-In Jenkins Environment Variables

Jenkins comes with several built-in environment variables that can be extremely useful. One common variable is `env.GIT_COMMIT`, which provides the Git commit hash that triggered the build. This information is particularly useful for tracking builds and deployments.

```
pipeline {
    agent any


    environment {
        // Global environment variables can be defined here as needed.
    }


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

After committing and pushing these changes, your push logs might appear as follows:

```
Writing objects: 100% (3/3), 306 bytes | 306.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
remote:
remote: GitHub found 7 vulnerabilities on kodekloudhub/course-jenkins-project's default branch (1 high, 4 moderate, 2 low).
remote: For more details, visit:
remote: https://github.com/kodekloudhub/course-jenkins-project/security/dependabot
remote:
To https://github.com/kodekloudhub/course-jenkins-project
   5255e5e..93d8363  main -> main
Jenkins-demo on main via v3.9.0 on (us-east-1)
```

Reviewing the Jenkins build console output should show that the commit hash is correctly echoed:

```
[Pipeline] echo
Commit: 3c0f60195600d27092d173381dd5d7285b5c6668
[Pipeline] }
[Pipeline] // stage
[Pipeline] End of Pipeline
Finished: SUCCESS
```

> [!important]
> **Note**
>
> By leveraging both custom-defined and built-in environment variables, you can manage configuration settings and capture important build metadata seamlessly in your Jenkins pipelines.

---

## Summary

In this lesson, we covered the following key points:

- How to define global environment variables to make them accessible in all pipeline stages.
- The limitations of defining environment variables within a specific stage and ensuring proper scope.
- Utilizing built-in Jenkins variables, such as `env.GIT_COMMIT`, to obtain valuable build-related information.

By applying these practices, you can build more reliable and maintainable Jenkins pipelines. For more detailed insights and further reading, consider visiting the [Jenkins Documentation](https://www.jenkins.io/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/cb96dd4d-081a-495e-9659-477a388e324f)**
>
> Watch video content
