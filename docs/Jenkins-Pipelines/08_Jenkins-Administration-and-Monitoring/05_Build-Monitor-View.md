# Build Monitor View - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Build-Monitor-View)

---

## Table of Contents

- Build Monitor View
  - Plugin Installation and Configuration
  - Testing the Build Monitor View with a Pipeline Job
  - Watch Video

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Build Monitor View

This lesson explores the Build Monitor View plugin for Jenkins, a powerful tool that offers a clear view of the status and progress of selected Jenkins jobs. The view refreshes automatically every few seconds, even displaying the user responsible for each job when applicable.

## Plugin Installation and Configuration

Before you begin, ensure that the Build Monitor View plugin is installed and that your Jenkins controller has been restarted.

Follow these steps to set up a new view:

1.  Navigate to the Jenkins dashboard and click "New View."
2.  Enter a unique view name (for example, "Build Monitor View" or "Dashboard CI Build Monitor View").
3.  Select the appropriate view type and click "Create."

![The image shows a Jenkins interface where a new view is being created, named "Dasher CI Build Monitor View," with options for different view types like Build Monitor View, Dashboard, and List View.](https://kodekloud.com/kk-media/image/upload/v1752879653/notes-assets/images/Jenkins-Pipelines-Build-Monitor-View/jenkins-dasher-ci-build-monitor-view.jpg)

Next, provide a description and define filters. You can choose to display all jobs or use a regex pattern to dynamically monitor a specific subset of jobs.

![The image shows a Jenkins configuration page for editing a view named "Dasher CI Build Monitor View," with options for filtering build queues and executors. The interface includes navigation options on the left and buttons for applying changes.](https://kodekloud.com/kk-media/image/upload/v1752879655/notes-assets/images/Jenkins-Pipelines-Build-Monitor-View/jenkins-dasher-ci-build-monitor.jpg)

After configuring the filter options, click "Apply" to save your settings. The view will now showcase your selected jobs. You can adjust the display settings directly through the user interface—for example:

- Increasing text scale
- Changing the number of columns (from one up to four)
- Enabling colorblind mode
- Reducing motion
- Displaying badges
- Resetting to the default settings

Additionally, when a job is running, the view integrates with the Pipeline plugin to display the current stage name and the elapsed time (for example, during a sleep stage).

![The image shows a dashboard from a CI build monitor with various job statuses, including successful (green), failed (red), and pending (gray) builds. Each tile displays the job name, status, and time since the last update.](https://kodekloud.com/kk-media/image/upload/v1752879656/notes-assets/images/Jenkins-Pipelines-Build-Monitor-View/ci-build-monitor-dashboard-statuses.jpg)

Green tiles indicate successful builds, while red signifies failures.

## Testing the Build Monitor View with a Pipeline Job

To see the Build Monitor View in action, create a new Jenkins pipeline job to simulate a build process.

1.  Create a new job by clicking "New Item" and selecting "Pipeline."
2.  In the pipeline script, define a simple "Hello World" stage along with another stage that pauses for 60 seconds.

Below is an initial pipeline script example:

```
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Hello') {  // Duplicate stage name; will be corrected below.
            steps {
                sh 'sleep'
            }
        }
    }
}
```

After noticing the duplicate stage name, update the script to assign unique names to each stage. For example, rename the second stage from "Hello" to "Sleep for" as shown below:

```
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Sleep for') {
            steps {
                sh 'sleep 60'
            }
        }
    }
}
```

Save and build the job. This triggers the pipeline to run both stages. As the "Sleep for" stage executes, the Build Monitor View updates automatically to show the current stage name, stage ID, and elapsed time. When the stage completes successfully, the corresponding tile turns green.

Below is a sample snippet of the console output during the build:

```
Started by user siddharth
[Pipeline] Start of Pipeline
[Pipeline] node
Running on Jenkins in /var/lib/jenkins/workspace/Testing_Build_Monitor_plugin
[Pipeline] {
[Pipeline] stage
[Pipeline] { (Hello)
[Pipeline] echo
Hello World
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (Sleep for 60s)
[Pipeline] sh
+ sleep 60
```

After approximately 60 seconds, when the pipeline completes, the monitor view updates the job status to green. The view also provides additional details such as the build cause (e.g., "Started by user siddharth") and branch information.

![The image shows a dashboard from a CI build monitor with various job statuses, including successful, failed, and pending builds, indicated by different colors.](https://kodekloud.com/kk-media/image/upload/v1752879657/notes-assets/images/Jenkins-Pipelines-Build-Monitor-View/ci-build-monitor-dashboard-statuses-2.jpg)

> [!important]
> **Note**
>
> This plugin streamlines monitoring by aggregating the status and details of multiple Jenkins jobs on a single screen.

Thank you for reading this article. For further information, refer to the [Jenkins Documentation](https://www.jenkins.io/doc/) for more details on advanced configurations and usage scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/140bcf7a-a393-4920-aa16-f23217e4ac36)**
>
> Watch video content
