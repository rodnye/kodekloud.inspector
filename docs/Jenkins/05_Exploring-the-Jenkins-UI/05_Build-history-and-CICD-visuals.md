# Build history and CICD visuals - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Exploring-the-Jenkins-UI/Build-history-and-CICD-visuals)

---

## Table of Contents

- Build history and CICD visuals
  - Dashboard Overview
  - Initiating a Pipeline Build
  - Pipeline Code Example
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Exploring the Jenkins UI

# Build history and CICD visuals

In this lesson, we will examine the Jenkins dashboard and explore key aspects of our CI/CD pipeline builds. This walkthrough demonstrates how to interpret the dashboard details and highlights the fundamental components of a basic pipeline build.

## Dashboard Overview

When you first access the dashboard, you might notice differences compared to previous layouts. After running several tests on the CI/CD pipeline, the updated dashboard now displays these test builds. For instance, click on **"test one"** to review its details.

Upon selecting **"test one"**, you will observe that:

- The pipeline is named "test one".
- It consists of a single stage.
- That stage executed and completed successfully.

This basic pipeline is essentially a "Hello World" sample provided by Jenkins.

![The image shows a pipeline test interface with stage view details, including average stage times and a "Hello" stage taking 376ms.](https://kodekloud.com/kk-media/image/upload/v1752880016/notes-assets/images/Jenkins-Build-history-and-CICD-visuals/frame_40.jpg)

> [!important]
> **Note**
>
> This simple pipeline run is used to quickly demonstrate how the Jenkins UI displays critical information such as build duration, failure status, and overall build history.

The dashboard presents several key pieces of information:

- **Last Duration:** Indicates how long the pipeline ran.
- **Recent Failures:** Displays the most recent failure, if any.
- **Last Successful Build Timestamp:** Shows when the last successful build occurred.
- **Build Names and Aggregated Status:** Offers an at-a-glance status report of recent builds, where a green checkmark marks a successful build and "not built" indicates a run that was skipped.

Clicking on the pipeline reveals additional details such as permalinks for the last build, the last stable build, and more. For example, you can view the initiator's identity and find options to preserve the build history indefinitely.

## Initiating a Pipeline Build

When you click on **"Build Now"**, a new pipeline run is triggered immediately. Notice how the dashboard reflects this change instantly:

![The image shows a Jenkins dashboard displaying a successful build (#1) started by a user named Mike on January 1, 2022.](https://kodekloud.com/kk-media/image/upload/v1752880017/notes-assets/images/Jenkins-Build-history-and-CICD-visuals/frame_100.jpg)

The dashboard confirms that the pipeline started at 15:12 (or 3:12 PM) and completed successfully, providing clear timestamps and status metrics.

![The image shows a Jenkins dashboard with options like "Build Now" and "Configure," displaying build history and stage view with average stage times.](https://kodekloud.com/kk-media/image/upload/v1752880018/notes-assets/images/Jenkins-Build-history-and-CICD-visuals/frame_120.jpg)

Clicking on the logs brings up detailed execution records where you can verify that the pipeline executed a simple "Hello World" print statement. The logs clearly display the execution details, confirming the pipeline's expected behavior.

## Pipeline Code Example

Below is the Groovy script used to define this simple pipeline:

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

This script illustrates the basic pipeline syntax as seen on the dashboard. You have the flexibility to modify, rename, or delete pipelines as needed. Whether you deploy a "build-only" process or a "build-and-deploy" workflow, the dashboard output will display:

- What was executed.
- The current status.
- Any recent changes.
- Options to disable the job if necessary.

![The image shows a Jenkins pipeline dashboard with build options, stage view, and build history, displaying average stage times and recent changes.](https://kodekloud.com/kk-media/image/upload/v1752880019/notes-assets/images/Jenkins-Build-history-and-CICD-visuals/frame_190.jpg)

## Conclusion

This lesson provided an overview of what your CI/CD pipelines will look like in Jenkins. You learned how to navigate the build dashboard, interpret vital details, and review the execution logs. Now, try some hands-on practice exercises to apply what you've learned and deepen your understanding of Jenkins pipelines.

> [!important]
> **Next Steps**
>
> Explore additional resources such as [Jenkins Documentation](https://www.jenkins.io/doc/) and [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd) to further enhance your skills.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/a04dd614-ac4a-452f-b42a-c7f7086c5897/lesson/7acc94d2-3f8f-40a1-9756-2c7152795faf)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/a04dd614-ac4a-452f-b42a-c7f7086c5897/lesson/5a0f0bb1-f72d-4f60-afef-7b5af858fb9a)**
>
> Practice lab
