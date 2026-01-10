# Demo Build Triggers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Demo-Build-Triggers)

---

## Table of Contents

- Demo Build Triggers
  - Triggering Builds After Other Projects
  - Build Periodically
  - Poll SCM
  - Quiet Period
  - Triggering Builds Remotely
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Demo Build Triggers

In this lesson, we explore various Jenkins build triggers that can optimize your CI/CD pipelines by reducing resource usage and streamlining the build process. Instead of relying on continuous polling for code changes, Jenkins can be configured to react to notifications and scheduled events, ensuring efficient use of resources.

## Triggering Builds After Other Projects

One effective trigger is to initiate a build once another project has completed its build process. This feature is particularly beneficial in multi-project environments where the successful completion of one project automatically triggers another. By configuring your Jenkins pipeline, you can set it up so that when a specified project, such as the "Hello World" pipeline, completes its build, the current project build is automatically started.

For example, the Jenkins pipeline configuration page displays a range of build trigger options to achieve this behavior:

![The image shows a configuration page for a Jenkins pipeline, with options for build triggers and other settings.](https://kodekloud.com/kk-media/image/upload/v1752879879/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Build-Triggers/jenkins-pipeline-configuration-page.jpg)

After setting your preferred option (for instance, "Always trigger"), simply click Save. Note that the configuration screen may alert you if a required project is missing:

![The image shows a Jenkins configuration screen for a project pipeline, with options for build triggers and a warning about a missing project.](https://kodekloud.com/kk-media/image/upload/v1752879880/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Build-Triggers/jenkins-project-pipeline-configuration.jpg)

> [!important]
> **Tip**
>
> Configuring downstream triggers can help maintain sequential builds and ensure that all dependent projects are built only after successful completions.

## Build Periodically

Another useful trigger is scheduling builds at fixed intervals. By setting up a cron expression, Jenkins can automatically build your project at predetermined times, regardless of recent code changes. This setup is ideal for projects where on-demand builds are less critical than regular updates.

For example, the cron expression:

```
* * * * *
```

triggers a build every minute. If you require a less frequent schedule—say, once an hour—you can adjust the cron expression accordingly. Once you configure and click Save, the Jenkins dashboard will update with the new build schedule and history:

![The image shows a Jenkins dashboard for a project named "flaskpipeline," displaying build status and history with permalinks to recent builds.](https://kodekloud.com/kk-media/image/upload/v1752879882/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Build-Triggers/jenkins-dashboard-flaskpipeline-builds.jpg)

> [!important]
> **Warning**
>
> Be sure to configure your cron expressions carefully to avoid excessive build triggers which could overload your Jenkins server.

## Poll SCM

Polling the Source Code Management (SCM) system is similar to periodic builds but includes a change detection mechanism. Jenkins routinely checks your SCM repository—using a cron expression like:

```
* * * * *
```

—and initiates a build only if it detects new commits or modifications. This method is more efficient as it prevents unnecessary builds when no changes are present.

## Quiet Period

Jenkins offers a quiet period feature to mitigate the issue of multiple triggers in rapid succession. When changes are detected, Jenkins waits for a specified period before starting the build. This pause allows time for additional commits to accumulate, which can then be bundled into a single build process.

For example, setting a quiet period of five seconds can reduce redundant builds when developers push several commits in a short timeframe. The configuration page for this feature displays related build trigger and scheduling options, and might include warnings about the effects of frequent polling:

![The image shows a Jenkins configuration page for a project, with options for build triggers and scheduling, including a warning about frequent polling.](https://kodekloud.com/kk-media/image/upload/v1752879883/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Build-Triggers/jenkins-configuration-build-triggers.jpg)

## Triggering Builds Remotely

Remote triggering enables you to start builds via an HTTP request, which is particularly useful when webhook functionality is not available or when your Jenkins server is behind a firewall. To configure this:

1.  Set up a token (for example, "KodeKloud") within Jenkins.
2.  Use the following endpoints to trigger a build:

    For a standard build:

    ```
    JENKINS_URL/job/flaskpipeline/build?token=KodeKloud
    ```

    For builds with parameters:

    ```
    JENKINS_URL/job/flaskpipeline/buildWithParameters?token=KodeKloud
    ```

After saving your configuration, any application capable of making HTTP requests can trigger a Jenkins build using these URLs. The configuration screen typically displays the URL details, which may include information about the hosting environment, such as an AWS EC2 instance:

![The image shows a configuration screen for a Jenkins pipeline with a text editor open, displaying a URL related to an AWS EC2 instance.](https://kodekloud.com/kk-media/image/upload/v1752879884/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Demo-Build-Triggers/jenkins-pipeline-configuration-aws-ec2.jpg)

Once you click Save and access the appropriate URL in your browser, you should see the build count increase, confirming that external triggering is operational.

---

These Jenkins build triggers—sequential builds, periodic scheduling, SCM polling, quiet periods, and remote triggers—offer flexible options to optimize your CI/CD workflows. Choose the trigger that best fits your project requirements to improve resource usage and maintain efficient, reliable builds.

For more detailed information on Jenkins and CI/CD processes, consider visiting the [Jenkins Documentation](https://www.jenkins.io/doc/). Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/c7f09c29-4433-4cd8-91a9-6367b5a672ba)**
>
> Watch video content
