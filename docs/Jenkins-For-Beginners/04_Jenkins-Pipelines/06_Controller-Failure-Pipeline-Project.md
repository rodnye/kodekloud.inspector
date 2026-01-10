# Controller Failure Pipeline Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Pipelines/Controller-Failure-Pipeline-Project)

---

## Table of Contents

- Controller Failure Pipeline Project
  - Modifying the Pipeline
  - Simulating a Controller Failure
  - Configuring Pipeline Resume Behavior
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Pipelines

# Controller Failure Pipeline Project

In this article, we explore the impact of a Jenkins controller failure on a Pipeline Project compared to a Freestyle Project. You'll learn how to modify a Hello World Pipeline to simulate a long-running stage and observe how the pipeline resumes execution after a controller restart.

## Modifying the Pipeline

To simulate a delay during the unit test stage, open your GitHub repository and edit the pipeline script. The goal is to introduce a 60-second pause using a for loop before executing the Maven test command.

![The image shows a Jenkins dashboard displaying the status of a "hello-world-pipeline" with several build stages, including "Checkout SCM," "Tool Install," "Echo Version," "Build," and "Unit Test." The pipeline history shows different build attempts with their respective statuses.](https://kodekloud.com/kk-media/image/upload/v1752879484/notes-assets/images/Jenkins-For-Beginners-Controller-Failure-Pipeline-Project/jenkins-dashboard-hello-world-pipeline.jpg)

Initially, you might attempt to insert the for loop directly into the steps block as shown below:

```
// Get some code from a Gitea repository
// git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'


// Run Maven Package command
sh "mvn clean package -DskipTests=true"


stage('Unit Test') {
    steps {
        for (int i = 0; i < 60; i++) {
            echo "${i + 1}"
            sleep 1
        }
    }
    sh "mvn test"
}
```

> [!important]
> **Warning**
>
> In a Declarative Pipeline, complex Groovy logic (like loops) must be wrapped inside a `script` block. Failing to do so will cause the pipeline to fail.

The corrected version of the pipeline stage places the for loop within a `script` block:

```
stage('Build') {
    // Get some code from a Gitea repository
    // git branch: 'main', url: 'http://139.84.159.194:5555/dasher-org/jenkins-hello-world.git'

    // Run Maven Package command
    sh "mvn clean package -DskipTests=true"
}


stage('Unit Test') {
    steps {
        script {
            for (int i = 0; i < 60; i++) {
                echo "${i + 1}"
                sleep 1
            }
            sh "mvn test"
        }
    }
}
```

After committing these changes to the main branch, trigger a new pipeline build. Initially, if the for loop is outside the `script` block, the build may fail. Once corrected, the pipeline will correctly pause for 60 seconds before executing the Maven test command.

## Simulating a Controller Failure

With the revised pipeline in place, start a new build. As the unit test stage runs, the for loop begins echoing numbers every second. To simulate a controller failure, follow these steps:

1.  While the pipeline is running (e.g., displaying output like below):

    ```
    [Pipeline] sleep
    Sleeping for 1 sec
    [Pipeline] echo
    14
    [Pipeline] sleep
    Sleeping for 1 sec
    [Pipeline] echo
    15
    …
    [Pipeline] echo
    38
    ```

2.  Open a terminal connected to your Jenkins controller and execute the commands to stop the Jenkins service:

    ![The image shows a Visual Studio Code window with an open terminal connected via SSH to a remote server named "jenkins-controller-1." The terminal prompt is ready for input.](https://kodekloud.com/kk-media/image/upload/v1752879485/notes-assets/images/Jenkins-For-Beginners-Controller-Failure-Pipeline-Project/vscode-ssh-terminal-jenkins-controller.jpg)

    ```
    systemctl stop jenkins
    systemctl status jenkins
    ```

The command output confirms that Jenkins has been stopped:

```
● jenkins.service - Jenkins Continuous Integration Server
   Loaded: loaded (/usr/lib/systemd/system/jenkins.service; enabled; preset: enabled)
   Active: inactive (dead) since Mon 2024-08-19 17:59:24 UTC; 7s ago
     Duration: 7h 7min 58.180s
   Process: 37656 ExecStart=/usr/bin/jenkins (code=exited, status=143)
   Main PID: 37656 (code=exited, status=143)
   Status: "Jenkins stopped"
   CPU: 4min 23.428s


Aug 19 17:59:23 jenkins-controller-1 jenkins[37656]: 2024-08-19 17:59:23.962+0000 [id=26]  INFO  jenkins.model.Jenk...
Aug 19 17:59:24 jenkins-controller-1 jenkins[37656]: 2024-08-19 17:59:24.007+0000 [id=26]  INFO  jenkins.model.Jenk...
```

After confirming the controller has stopped, restart Jenkins with the following command:

```
systemctl restart jenkins
```

Once Jenkins is back online, refresh the Jenkins UI and log in again.

![The image shows a Jenkins dashboard with the "Console Output" section open for a pipeline job. The interface displays various options like "Edit Build Information," "Pipeline Overview," and "Replay."](https://kodekloud.com/kk-media/image/upload/v1752879486/notes-assets/images/Jenkins-For-Beginners-Controller-Failure-Pipeline-Project/jenkins-dashboard-console-output-pipeline.jpg)

The pipeline resumes from where it halted, and the output continues:

```
* mvn test
[INFO] Scanning for projects...
[INFO] -----------------------< com.kodekloud:hello-demo >-----------------------
[INFO] Building hello-demo 0.0.1-SNAPSHOT
[INFO] from pom.xml
[INFO] -------------------------------[ jar ]--------------------------------
[INFO]
[INFO] --- resources:3.3.1:resources (default-resources) @ hello-demo ---
[INFO] Copying 1 resource from src/main/resources to target/classes
…
[INFO] --- surefire:2.3.2:test (default-test) @ hello-demo ---
```

This behavior demonstrates that, unlike a Freestyle Project—which terminates upon a controller failure—a Pipeline Project resumes execution after Jenkins is restarted.

## Configuring Pipeline Resume Behavior

It is important to note that the resume behavior of your pipeline is configurable. Within the pipeline configuration settings, you can choose whether the job should resume after a controller restart. Disabling this feature causes the job to fail immediately upon a restart instead of resuming.

> [!important]
> **Note**
>
> Review your pipeline configuration settings in Jenkins to ensure the desired resume behavior is enabled or disabled based on your project requirements.

![The image shows a Jenkins configuration page for a pipeline project, with various options like discarding old builds and GitHub project settings. There are buttons for saving and applying changes.](https://kodekloud.com/kk-media/image/upload/v1752879487/notes-assets/images/Jenkins-For-Beginners-Controller-Failure-Pipeline-Project/jenkins-pipeline-configuration-page.jpg)

Thank you for reading this article. Enjoy exploring the resilience of Jenkins Pipeline Projects in handling controller failures.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/b4f582ef-4bf9-4cb9-8a31-6d580a94000c/lesson/c857088a-4f90-45a5-8036-00bb991e3339)**
>
> Watch video content
