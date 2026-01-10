# Pipeline Script from SCM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Pipeline-Script-from-SCM)

---

## Table of Contents

- Pipeline Script from SCM
  - Creating a Jenkinsfile
  - Pipeline Script from SCM Configuration
  - Understanding the Build Process
  - Exploring the Jenkins Workspace
  - Conclusion
  - Watch Video
    - Accessing the Workspace via Terminal

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Pipeline Script from SCM

In this lesson, you’ll learn how to obtain a Jenkins pipeline script directly from a Source Control Management (SCM) system like GitHub. Traditionally, the pipeline script was defined directly in the Jenkins UI. For example, a typical script defined in the Jenkins UI looked like this:

```
pipeline {
    agent any


    tools {
        // Install the Maven version configured as "M398" and add it to the path.
        maven "M398"
    }


    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }

        stage('Build') {
            steps {
                // Get some code from a Git repo
                git 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'

                // Run Maven Package CMD
                sh 'mvn clean package -DskipTests=true'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

> [!important]
> **Tip**
>
> Defining your pipeline script in SCM allows you to maintain version control over your build configuration, making it easier to track changes over time.

## Creating a Jenkinsfile

Instead of embedding the pipeline script in Jenkins, you can add it to your GitHub (or Git repository) to keep it version-controlled. In your repository, create a new file (typically named **Jenkinsfile**) at the root level and paste the pipeline script. Note that Jenkins automatically looks for a file named "Jenkinsfile" unless you specify a different script path.

Below is an updated example of a Jenkinsfile saved in the repository. Notice that the Maven tool is now referenced as "M3":

```
pipeline {
    agent any


    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "M3"
    }


    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                // Get some code from a Gitea repository
                git 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'

                // Run Maven Package CMD
                sh "mvn clean package -DskipTests=true"
            }
        }
        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

## Pipeline Script from SCM Configuration

When you configure your Jenkins pipeline job with the **Pipeline Script from SCM** option, Jenkins automatically checks out your repository. This means you can remove or comment out explicit Git commands in your pipeline. For example, the modified Jenkinsfile using SCM looks like this:

```
pipeline {
    agent any


    tools {
        // Install the Maven version configured as "M398" and add it to the path.
        maven "M398"
    }


    stages {
        stage('Echo Version') {
            steps {
                sh "echo Print Maven Version"
                sh "mvn -version"
            }
        }
        stage('Build') {
            steps {
                // No explicit Git checkout required since SCM performs the checkout automatically
                sh "mvn clean package -DskipTests=true"
            }
        }
    }
}
```

To set up your pipeline to retrieve the script from SCM:

1.  **Select the SCM Option:** Choose "Pipeline Script from SCM" as the definition.
2.  **Choose Your SCM:** Select Git as the SCM provider.
3.  **Provide Details:** Enter the repository URL, specify the branch (e.g., 'main'), and if needed, set the script path if your Jenkinsfile resides in a subdirectory.

An example configuration using a GitLab repository might include the following script:

```
pipeline {
    agent any


    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "M3"
    }

    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        stage('Build') {
            steps {
                // Get some code from a GitLab repository
                git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'
            }
        }
    }
}
```

> [!important]
> **Warning**
>
> If you receive an error message indicating that the repository URL is not valid, double-check that the URL is correct and that no credentials are needed for a public repository.

During configuration, you might encounter an error message similar to the one shown below:

![The image shows a Jenkins configuration screen for a pipeline project, where a Git repository URL is being entered, but there's an error message indicating that a valid Git repository is required.](https://kodekloud.com/kk-media/image/upload/v1752879509/notes-assets/images/Jenkins-For-Beginners-Pipeline-Script-from-SCM/jenkins-pipeline-git-repo-error.jpg)

Since the repository is public, credentials are not required. In the advanced settings, ensure the correct branch name (such as 'main') is specified. Jenkins will search for the Jenkinsfile in the repository root by default unless a different path is defined.

## Understanding the Build Process

After the configuration is complete, Jenkins checks out your repository and executes the defined stages. The build log will include details like fetching the repository, commit messages, and more. An excerpt from a typical build log might look like this:

```
> git rev-parse --resolve-git-dir /var/lib/jenkins/workspace/hello-world-pipeline/.git # timeout=10
> git config remote.origin.url http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git # timeout=10
> git fetch upstream changes from http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git
> git --version # timeout=10
> git version 2.43.0
> git fetch --tags --force --progress -- https://139.84.159.194:5555/dasher-org/jenkins-hello-world.git +refs/heads/*:refs/remotes/origin/*
> git rev-parse refs/remotes/origin/main^{commit} # timeout=10
Checking out Revision 6b4e37284084c62a896135672cac165263406b25 (refs/remotes/origin/main)
> git config core.sparsecheckout # timeout=10
> git checkout -f 6b4e37284084c62a896135672cac165263406b25 # timeout=10
Commit message: "Add Jenkinsfile"
> git rev-list --no-walk a05dbf36e7307e735bac28687c6464cb3ef6 # timeout=10
```

After the checkout, the pipeline moves on to subsequent stages. For instance, the output of the "Echo Version" stage may look like this:

```
+ echo Print Maven Version
Print Maven Version
+ mvn -version
Apache Maven 3.9.8 (36645f6c9b5079805ea5009217e36f2cffd34256)
Maven home: /var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/M398
Java version: 17.0.12, vendor: Ubuntu, runtime: /usr/lib/jvm/java-17-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-39-generic", arch: "amd64", family: "unix"
```

## Exploring the Jenkins Workspace

After a successful build, you can review the workspace files via the Jenkins UI. The workspace includes both the repository files and the build outputs (such as the generated Maven target folder, test reports, and packaged application files).

For example, here is an interface displaying the workspace files for the project:

![The image shows a Jenkins workspace interface displaying a list of directories and files related to a project build, including JAR files and generated sources.](https://kodekloud.com/kk-media/image/upload/v1752879511/notes-assets/images/Jenkins-For-Beginners-Pipeline-Script-from-SCM/jenkins-workspace-project-build-files.jpg)

You can also inspect detailed build stages in the pipeline interface:

![The image shows a Jenkins build pipeline interface for "hello-world-pipeline," displaying the successful completion of build #7 with various stages like "Checkout SCM," "Tool Install," and "Unit Test." It includes details about changes, build duration, and repository information.](https://kodekloud.com/kk-media/image/upload/v1752879512/notes-assets/images/Jenkins-For-Beginners-Pipeline-Script-from-SCM/jenkins-build-pipeline-hello-world.jpg)

### Accessing the Workspace via Terminal

You can also access the Jenkins master to review the workspace directly. For example, using the terminal:

```
root@jenkins-controller-1 in /var/lib/jenkins
$ cd workspace/


root@jenkins-controller-1 in lib/jenkins/workspace
$ ll
total 32
drwxr-xr-x  8 jenkins jenkins 4096 Aug 19 11:07 ./
drwxr-xr-x 18 jenkins jenkins 4096 Aug 19 12:29 ../
drwxr-xr-x  2 jenkins jenkins 4096 Aug 19 10:12 ascii-build-job/
drwxr-xr-x  2 jenkins jenkins 4096 Aug 19 10:37 ascii-deploy-job/
drwxr-xr-x  2 jenkins jenkins 4096 Aug 19 10:32 ascii-test-job/
drwxr-xr-x  5 jenkins jenkins 4096 Aug 19 09:23 'Generate ASCII Artwork'/
drwxr-xr-x  2 jenkins jenkins 4096 Aug 19 12:28 hello-world-pipeline/
drwxr-xr-x  2 jenkins jenkins 4096 Aug 19 12:28 'hello-world-pipeline@tmp'/
```

Then, to examine the "hello-world-pipeline" workspace:

```
root@jenkins-controller-1 in lib/jenkins/workspace
$ cd hello-world-pipeline


root@jenkins-controller-1 in hello-world-pipeline on @ HEAD (6b4e372) via v17.0.12
$ ll
total 56
drwxr-xr-x 5 jenkins jenkins 4096 Aug 19 12:28 ./
drwxr-xr-x 8 jenkins jenkins 4096 Aug 19 11:07 ../
drwxr-xr-x 2 jenkins jenkins 4096 Aug 19 12:28 .git/
-rw-r--r-- 1 jenkins jenkins  383 Aug 19 12:14 .gitignore
-rw-r--r-- 1 jenkins jenkins  758 Aug 19 12:14 Jenkinsfile
-rw-r--r-- 1 jenkins jenkins 10606 Aug 19 12:14 mvnw
-rw-r--r-- 1 jenkins jenkins  6913 Aug 19 12:14 mvnw.cmd
-rw-r--r-- 1 jenkins jenkins 1755 Aug 19 12:14 pom.xml
-rw-r--r-- 1 jenkins jenkins  445 Aug 19 12:14 README.md
drwxr-xr-x 1 jenkins jenkins  512 Aug 19 12:14 src/
drwxr-xr-x 9 jenkins jenkins 4096 Aug 19 12:28 target/
```

This workspace houses all repository files along with build outputs such as Maven targets and test reports.

## Conclusion

By following this lesson, you now understand how to retrieve a pipeline script from SCM, version control your build configurations, and streamline the pipeline setup in Jenkins. This approach offers better maintainability and traceability for your continuous integration workflows.

Thank you for exploring how to integrate SCM with Jenkins pipeline scripts. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/d17b04b7-fc59-47ae-b895-c41c988644b6)**
>
> Watch video content
