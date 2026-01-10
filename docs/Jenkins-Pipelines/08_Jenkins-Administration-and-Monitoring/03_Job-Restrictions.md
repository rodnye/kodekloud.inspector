# Job Restrictions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Job-Restrictions)

---

## Table of Contents

- Job Restrictions
  - Installing the Plugin
  - Configuring Job Restrictions on a Node
  - Testing the Restriction
  - Creating a Job That Meets the Restriction
  - Watch Video

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Job Restrictions

In this lesson, we explore the Jenkins Job Restrictions plugin, a powerful tool for enhancing your security and streamlining job execution. With this plugin, you can restrict job execution to specific nodes, enforce naming conventions, and even block triggers based on particular user IDs.

## Installing the Plugin

To install the Job Restrictions plugin:

1.  Navigate to **Manage Jenkins**.
2.  Click on **Manage Plugins**.
3.  Find and install the **Job Restrictions** plugin.
4.  Restart Jenkins after the installation is complete.

![The image shows a Jenkins interface displaying the download progress of plugins, with some tasks marked as successful and others pending. The sidebar includes options like updates, available plugins, and advanced settings.](https://kodekloud.com/kk-media/image/upload/v1752879665/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-plugin-download-progress-interface.jpg)

## Configuring Job Restrictions on a Node

After installing the plugin, you can apply restrictions to your Jenkins nodes. Follow these steps to configure a restriction on a node:

1.  Go to **Nodes**.
2.  Select **Built-In Nodes** (or choose the specific node to configure).
3.  Click **Configure**.
4.  Enable the “Restrict job executions at node” option.

At this point, there are no restrictions set. To add one, let’s enforce a regular expression rule where the job name must start with "Dasher\_". Enter the following regular expression:

```
Dasher_.*
```

This pattern ensures that only jobs beginning with "Dasher\_" are permitted on the node. Save the configuration after adding this restriction.

> [!important]
> **Customizing Restrictions**
>
> You can combine conditions using AND, OR, or NOT operators for finer control. For instance, you might require that a job name follows a certain pattern or is triggered by a specific user.

![The image shows a Jenkins configuration screen with options for setting the number of executors and usage restrictions. A dropdown menu is open, displaying various job restriction options.](https://kodekloud.com/kk-media/image/upload/v1752879667/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-configuration-executors-dropdown.jpg)

![The image shows a Jenkins configuration screen for a node, with options for build executor status, node properties, and job restrictions using a regular expression.](https://kodekloud.com/kk-media/image/upload/v1752879668/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-node-configuration-screen.jpg)

## Testing the Restriction

Once configured, return to the Jenkins dashboard to test the plugin by triggering one of your projects. For example, try building the "NPM version test" job with the following steps:

1.  Click **Build Now** on the job.
2.  Refresh the dashboard.

Since the job name does not start with "Dasher\_", it will remain in a pending state and will not start automatically.

![The image shows a Jenkins dashboard for a project named "npm-version-test," displaying build history and permalinks for recent builds. The sidebar includes options like Workspace, Build Now, and Configure.](https://kodekloud.com/kk-media/image/upload/v1752879669/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-dashboard-npm-version-test.jpg)

## Creating a Job That Meets the Restriction

Next, create a new freestyle job that complies with the defined restrictions:

1.  Name the job `Dasher_test_job`.
2.  Add a simple build step that executes a command like `echo "hello"`.

After saving the job, trigger the build. Because the job name starts with "Dasher\_", it should run successfully.

Once verified, you might consider adding further conditions, such as restricting execution by user ID. For example, you can configure the node to also require that the job is triggered by a user with the ID "Emma".

![The image shows a Jenkins configuration screen for a built-in node, with options for usage, node properties, and job restrictions using a regular expression. The "Restrict jobs execution at node" option is checked, and a regular expression is being entered.](https://kodekloud.com/kk-media/image/upload/v1752879671/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-node-configuration-screen-2.jpg)

To enforce multiple conditions:

| Condition Type                 | Example                         | Description                                             |
| ------------------------------ | ------------------------------- | ------------------------------------------------------- |
| Job Name Restriction           | Regular Expression: `Dasher_.*` | Ensures job names start with "Dasher\\\_"               |
| User ID Restriction (Optional) | Specific User: "Emma"           | Only allows jobs triggered by "Emma" to run on the node |

![The image shows a Jenkins configuration screen for a built-in node, with options for restricting job execution and a dropdown menu for job restrictions.](https://kodekloud.com/kk-media/image/upload/v1752879672/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-configuration-built-in-node.jpg)

Save your configurations. Now, if you trigger a job that does not satisfy at least one of these conditions—for example, a job not initiated by "Emma" or having an incorrect name—it will remain in a pending state. When logged in as "Emma", the job should execute as expected.

Finally, verify the setup using the OR condition by revisiting **Manage Jenkins** > **Nodes** > **Configure**.

![The image shows a Jenkins configuration screen for a built-in node, with options for restricting job execution using regular expressions and user IDs.](https://kodekloud.com/kk-media/image/upload/v1752879673/notes-assets/images/Jenkins-Pipelines-Job-Restrictions/jenkins-configuration-built-in-node-2.jpg)

This configuration demonstrates how the Job Restrictions plugin can secure your Jenkins environment by combining multiple conditions to control job execution.

> [!important]
> **Summary**
>
> The Job Restrictions plugin empowers you to enforce stringent execution conditions, allowing only jobs that meet specific criteria to run on designated nodes. This enhances both workflow control and overall security in your Jenkins setup.

That concludes our lesson on using the Job Restrictions plugin in Jenkins. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/1fba91c5-e806-4227-9c47-b4758b7902c8)**
>
> Watch video content
