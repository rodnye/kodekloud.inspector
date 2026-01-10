# Simple Pipeline Job - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Simple-Pipeline-Job)

---

## Table of Contents

- Simple Pipeline Job
  - Creating the Pipeline Job
  - Defining the Pipeline Script
  - Extending the Pipeline: GitHub and Maven Integration
  - Configuring Maven in Jenkins
  - Conclusion
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Simple Pipeline Job

In this guide, you'll learn how to create a simple Pipeline Job in Jenkins. Follow along as we walk through configuring a basic pipeline, inspecting its stages, and later integrating additional build steps with Maven.

---

## Creating the Pipeline Job

Begin by opening the Jenkins UI and clicking on **New Item**. Select the **Pipeline** option and assign a name to your job (for example, "Hello World Pipeline"). Finally, click **OK**.

![The image shows a Jenkins interface where a new item is being created, with the name "hello-world-pipeline" and the "Pipeline" item type selected. Various project types like Freestyle, Multi-configuration, and Folder are also listed.](https://kodekloud.com/kk-media/image/upload/v1752879518/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-hello-world-pipeline-creation.jpg)

On the job configuration page, you'll encounter several sections including **General**, **Advanced**, **Project Options**, and **Pipeline**. Here, you can add a description and configure project-specific options. One useful configuration is preventing the pipeline from resuming after a controller restart—a feature that was previously discussed with Freestyle Projects.

![The image shows a configuration page for a pipeline project, likely in a CI/CD tool, with various options like discarding old builds, GitHub project integration, and build triggers.](https://kodekloud.com/kk-media/image/upload/v1752879519/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/pipeline-project-configuration-ci-cd.jpg)

---

## Defining the Pipeline Script

You can define the pipeline script in two ways:

- Directly inline on the configuration page.
- Automatically sourced from a Version Control System like Git or Subversion.

For this tutorial, we'll use the **Pipeline Script** option to create a simple "Hello World" pipeline. In later sections, we will explore scripted pipelines in more detail.

Enter the following pipeline script:

```
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

Within this script:

- The `agent any` directive indicates that the job can run on any available node (commonly the Jenkins controller in basic setups).
- The pipeline contains one stage named "Hello" that executes a step to display the message "Hello World" using the `echo` command.
- Optionally, you can enable the Groovy sandbox for restricted execution. Disabling it without proper administrative approval may cause the job to wait for authorization.

After configuring the pipeline, click **Build Now**. When the build starts, you'll see a visual representation of the pipeline execution. Clicking on the "Hello" stage displays the console logs, where you can observe the "Hello World" output. The raw logs can also be reviewed by clicking on the success icon.

![The image shows a Jenkins dashboard for a "hello-world-pipeline" with build status and history details. It includes options for configuring and managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752879520/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-dashboard-hello-world-pipeline.jpg)

![The image shows a Jenkins pipeline console with a successful build labeled "Build #1" for a "hello-world-pipeline." The stage "Hello" completed successfully, displaying a "Hello World" message.](https://kodekloud.com/kk-media/image/upload/v1752879521/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-pipeline-build-hello-world.jpg)

Additionally, the build log provides detailed execution output similar to the example below:

```
Started by user Dasher Admin
[Pipeline] Start of Pipeline
[Pipeline] node
Running on Jenkins in /var/lib/jenkins/workspace/hello-world-pipeline
[Pipeline] {
[Pipeline] stage
[Pipeline] { (Hello)
[Pipeline] echo
Hello World
[Pipeline] }
[Pipeline] // stage
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```

This log includes the execution timings, the pipeline overview, and the individual step logs. The interface also supports restarting from a specific stage or replaying the pipeline if necessary.

![The image shows a Jenkins build interface for "hello-world-pipeline," displaying build #1 with details such as the start time, duration, and user who initiated it. The build status is successful, and various options like console output and pipeline overview are available.](https://kodekloud.com/kk-media/image/upload/v1752879522/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-hello-world-pipeline-build1.jpg)

![The image shows a Jenkins pipeline interface displaying the steps of a "hello-world-pipeline" with their execution times and statuses. Each step, such as "node" and "stage," is marked as successful.](https://kodekloud.com/kk-media/image/upload/v1752879523/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-hello-world-pipeline-interface.jpg)

---

## Extending the Pipeline: GitHub and Maven Integration

Next, we'll extend the pipeline by adding stages that integrate with GitHub and use Maven for project builds.

The example below demonstrates a pipeline that:

1.  Configures a Maven tool installation.
2.  Creates a stage named "Echo Version" to output a message along with the Maven version.
3.  Includes a stage named "Build" that checks out code from a GitHub repository.

Here is the enhanced pipeline script:

```
pipeline {
    agent any
    tools {
        // Installs the Maven version configured as "M3" and adds it to the environment PATH.
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
                // Clone code from a GitHub repository.
                git 'https://github.com/jglick/simple-maven-project-with-tests.git'
            }
        }
    }
}
```

When you trigger the build, you might encounter an error message similar to the following if Maven is not correctly configured:

```
Started by user Dasher Admin
org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
WorkflowScript: 6: Tool type "maven" does not have an install of "M3" configured - did you mean "null"? @ line 6, column 15.
   maven "M3"
         ^
1 error
...
Finished: FAILURE
```

This error indicates that Jenkins could not find a Maven installation named "M3".

---

## Configuring Maven in Jenkins

To resolve this Maven configuration issue, follow these steps:

1.  Open the Jenkins **Dashboard** and navigate to **Manage Jenkins**.
2.  Click on **Global Tool Configuration** (or simply **Tools** in some Jenkins versions).
3.  Scroll down to the Maven section. Since no Maven installation is currently configured, add a new installation.

If you have Maven installed on your node, provide its installation path. Otherwise, you can configure Jenkins to automatically install Maven from Apache. For example, set up Maven version 3.9.8 and assign it a unique name such as **M398**—this naming makes it clear which version is in use.

![The image shows the "Manage Jenkins" dashboard, displaying various configuration options like System, Tools, Plugins, and Security settings. It includes a warning about security issues related to building on the built-in node.](https://kodekloud.com/kk-media/image/upload/v1752879525/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/manage-jenkins-dashboard-settings.jpg)

![The image shows a Jenkins configuration page for managing Maven installations, with options to install specific versions automatically.](https://kodekloud.com/kk-media/image/upload/v1752879526/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-maven-installation-config.jpg)

After configuring Maven, go back to your pipeline configuration and update the `tools` section to reference the newly named installation:

```
pipeline {
    agent any
    tools {
        // Installs the Maven version configured as "M398" and adds it to the environment PATH.
        maven "M398"
    }
    stages {
        stage('Echo Version') {
            steps {
                sh 'echo Print Maven Version'
                sh 'mvn -version'
            }
        }
        // Uncomment the Build stage once tool configuration is verified.
        // stage('Build') {
        //     steps {
        //         git 'https://github.com/jglick/simple-maven-project-with-tests.git'
        //     }
        // }
    }
}
```

Triggering the build now should succeed. In the console output, you will first observe Maven being installed (if necessary) and unpacked. The "Echo Version" stage will then run, printing "Print Maven Version" followed by details about the Maven version installed. An example output might look like this:

```
+ echo Print Maven Version
Print Maven Version
+ mvn --version
Apache Maven 3.9.8 (36645f6c9b5079805ea5009217e36f2cff34256)
Maven home: /var/lib/jenkins/tools/hudson.tasks.Maven_MavenInstallation/M398
Java version: 17.0.12, vendor: Ubuntu, runtime: /usr/lib/jvm/java-17-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-39-generic", arch: "amd64", family: "unix"
```

![The image shows a Jenkins dashboard displaying the status of a "hello-world-pipeline" with a visual representation of pipeline stages and build history.](https://kodekloud.com/kk-media/image/upload/v1752879527/notes-assets/images/Jenkins-For-Beginners-Simple-Pipeline-Job/jenkins-dashboard-hello-world-pipeline-2.jpg)

This confirms that Maven has been correctly configured in Jenkins and the pipeline is executing using the Groovy sandbox.

---

## Conclusion

In this article, we demonstrated how to create a simple Pipeline Job in Jenkins, from setting up a basic "Hello World" pipeline to extending it with GitHub integration and Maven build steps. We also addressed Maven configuration issues and provided steps to resolve them, ensuring smooth pipeline execution.

> [!important]
> **Note**
>
> For further insights, explore other Jenkins documentation such as the [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/) to deepen your understanding of more advanced pipeline features.

Thank you for reading, and happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/30a834be-b0d9-4147-9f09-f7dc55b9a0de)**
>
> Watch video content
