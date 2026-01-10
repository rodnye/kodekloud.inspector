# Pipeline Durability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Backup-and-Configuration-Management/Pipeline-Durability)

---

## Table of Contents

- Pipeline Durability
  - What Is Pipeline Durability?
  - Where to Configure Durability
  - Demonstration: Durability in Action
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab
    - 1. Global Configuration
    - 2. Multibranch Project Configuration
    - 3. Single Pipeline Job Configuration
    - Pipeline Definition
    - MAX_SURVIVABILITY Test
    - PERFORMANCE_OPTIMIZED Test

---

## Content

Advanced Jenkins

Backup and Configuration Management

# Pipeline Durability

Learn how to configure and optimize **Jenkins Pipeline Durability** to balance performance, disk I/O, and recoverability. This guide covers durability levels, configuration scopes, and a hands-on demonstration.

## What Is Pipeline Durability?

Pipeline durability determines how frequently Jenkins writes the pipeline state to disk. Frequent writes ensure resumability after crashes but can introduce latency. Jenkins offers three levels:

| Durability Level                | Description                                                      | Resume After Crash |
| ------------------------------- | ---------------------------------------------------------------- | ------------------ |
| **MAX\\\_SURVIVABILITY**        | Always writes state to disk; slowest but fully recoverable.      | Yes                |
| **SURVIVABLE\\\_NON\\\_ATOMIC** | Reduces atomicity guarantees for fewer disk writes; recoverable. | Yes                |
| **PERFORMANCE\\\_OPTIMIZED**    | Minimizes disk I/O for maximum speed; not recoverable.           | No                 |

> [!important]
> **Warning**
>
> Choosing `PERFORMANCE_OPTIMIZED` can improve throughput but **pipeline progress is lost** if Jenkins shuts down uncleanly.

![The image shows a webpage from the Jenkins documentation, specifically discussing durability settings and best practices for scaling pipelines. It includes a navigation menu on the left and detailed text about performance optimization and other scaling suggestions on the right.](https://kodekloud.com/kk-media/image/upload/v1752868830/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-durability-settings-scaling-pipelines.jpg)

## Where to Configure Durability

You can apply durability settings at three levels:

1.  **Global** – Default for all jobs.
2.  **Multibranch project** – Per-branch overrides.
3.  **Single pipeline job** – Specific to one Declarative Pipeline.

### 1\. Global Configuration

1.  Go to **Manage Jenkins** → **Configure System**.
2.  Search for **Pipeline Speed and Durability**.
3.  Select your default level.

![The image shows a webpage from the Jenkins documentation, specifically focusing on pipeline speed and durability settings. It includes a navigation menu on the left and detailed instructions on configuring these settings on the right.](https://kodekloud.com/kk-media/image/upload/v1752868832/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-pipeline-speed-durability-settings.jpg)

In newer Jenkins releases, you may also see a dedicated dropdown:

![The image shows a Jenkins system configuration screen with options for setting pipeline speed and durability levels. There is a dropdown menu for selecting the default speed/durability level, with options like "Maximum survivability/durability but slowest."](https://kodekloud.com/kk-media/image/upload/v1752868832/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-system-configuration-pipeline-settings.jpg)

### 2\. Multibranch Project Configuration

For GitHub Organization or Multibranch Pipelines, set durability per branch:

1.  Open your project and click **Configure**.
2.  Under **Branch Sources**, expand **Property strategy**.
3.  Add **Pipeline durability** and define rules.

Example:

- `main` → **MAX_SURVIVABILITY**
- All other branches → **PERFORMANCE_OPTIMIZED**

![The image shows a configuration screen for a Jenkins pipeline, with options for setting the script path and selecting a custom branch speed/durability level.](https://kodekloud.com/kk-media/image/upload/v1752868833/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-pipeline-configuration-screen.jpg)

### 3\. Single Pipeline Job Configuration

In any Declarative Pipeline job:

1.  Scroll to **Pipeline Speed and Durability**.
2.  Choose the desired level:

![The image shows a configuration screen from Jenkins, displaying various pipeline settings and options for a project.](https://kodekloud.com/kk-media/image/upload/v1752868835/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-pipeline-settings-screen.jpg)

## Demonstration: Durability in Action

Create a simple pipeline that appends numbers every second. Kill Jenkins mid-run to observe each durability mode.

### Pipeline Definition

```
pipeline {
    agent any
    stages {
        stage('For Loop - Durability Test') {
            steps {
                script {
                    sh 'touch numbers.txt'
                    for (int i = 0; i < 600; i++) {
                        sh "echo ${i} >> numbers.txt"
                        sleep 1
                    }
                }
            }
        }
    }
}
```

### MAX_SURVIVABILITY Test

1.  Set **Pipeline Speed and Durability** to **Maximum survivability**.
2.  Start the build and note the output.
3.  Identify and kill the Jenkins process:

    ```
    ps aux | grep -i jenkins.war
    kill -9 <PID>
    systemctl status jenkins
    ```

4.  After restart, open the build console. The pipeline resumes at the last completed step:

    ```
    [Pipeline] sleep
    Sleeping for 1 sec
    [Pipeline] sh
    + echo 41
    ```

### PERFORMANCE_OPTIMIZED Test

1.  Switch durability to **Performance optimized** and rebuild.
2.  Kill Jenkins mid-run as before.
3.  After restart, the build fails with:

    ```
    ERROR: Cannot resume build because FlowNode 42 for FlowHead 1 could not be loaded.
    This is expected when using PERFORMANCE_OPTIMIZED and an unclean shutdown occurred.
    Finished: FAILURE
    ```

> > [!important]
> > **Note**
> >
> > The Jenkins dashboard will show the failed run under your project’s history.

![The image shows a Jenkins dashboard for a project named "durability-test," displaying build options, pipeline status, and build history.](https://kodekloud.com/kk-media/image/upload/v1752868836/notes-assets/images/Advanced-Jenkins-Pipeline-Durability/jenkins-dashboard-durability-test.jpg)

## Conclusion

- Use **MAX_SURVIVABILITY** for mission-critical or production pipelines requiring **resumability**.
- Use **PERFORMANCE_OPTIMIZED** when **throughput** is the priority and occasional rebuilds are acceptable.
- Adjust the scope—global, per-branch, or per-job—to match your workflow.

## Links and References

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Managing Jenkins](https://www.jenkins.io/doc/book/managing/)
- [Jenkins Configuration as Code](https://github.com/jenkinsci/configuration-as-code-plugin)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/924187c9-803d-49ab-bcb3-3efac19fca28)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/6f55f1ac-064a-4aec-a91a-450caaf82d63/lesson/c86f887d-7907-409f-9d79-9e057abda40c)**
>
> Practice lab
