# Working with Freestyle Job - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Setup-and-Interface/Working-with-Freestyle-Job)

---

## Table of Contents

- Working with Freestyle Job
  - Creating the Jenkins Project
  - Configuring the Job
  - Adding the Build Steps
  - Understanding the Shell Script
  - Build Execution and Diagnostics
  - Reviewing the Workspace
  - Summary
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Setup and Interface

# Working with Freestyle Job

In this guide, you'll learn how to create your very first Jenkins project using the Freestyle Job option. We will walk you through creating a new job, configuring it with various options, and adding a shell script that fetches advice from a REST API. The script then validates the output and uses the cowsay library to display the advice as creative ASCII artwork.

---

## Creating the Jenkins Project

Begin by logging in to your Jenkins instance and navigating to the dashboard. Click on “New Item” (or the plus icon) to create a new job. You will be prompted to enter a name for your project and choose the type of job. The available options depend on the plugins installed on your Jenkins server. For this tutorial, select the Freestyle Project and name it “generate ASCII artwork.”

![The image shows a Jenkins interface where a user is creating a new item, with options to select different project types like Freestyle project, Pipeline, and Multi-configuration project.](https://kodekloud.com/kk-media/image/upload/v1752879563/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-new-item-project-types.jpg)

---

## Configuring the Job

After selecting the Freestyle Project, you will see several configuration sections:

- General
- Source Control Management (SCM)
- Build Triggers
- Build Environment
- Build Steps
- Post-build Actions

Under the **General** section, add the following description:

"Generate ASCII artwork using the cowsay library and the AdviceSlip REST API."

![The image shows a Jenkins configuration screen for a project titled "Generate ASCII Artwork," with options for build settings and a description mentioning the Cowsay library and AdviceSlip Rest API.](https://kodekloud.com/kk-media/image/upload/v1752879564/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-configuration-generate-ascii-artwork.jpg)

You can leave the Source Code Management as “none” (unless you would like to connect a GitHub repository) and skip adding automated build triggers. In the **Build Environment** section, consider enabling the "Add timestamps to the console output" option—this feature is provided by the Timestamp Plugin.

![The image shows a configuration screen for a software project, with options for setting parameters, managing source code, and configuring build triggers and environments. It includes checkboxes and descriptive text explaining parameterization and build settings.](https://kodekloud.com/kk-media/image/upload/v1752879566/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/software-project-configuration-screen.jpg)

---

## Adding the Build Steps

Within the **Build Steps** section, add a new build step by selecting the shell script execution option. Depending on your environment, you can choose either a Windows batch command or a shell script. In this example, we are using shell commands.

![The image shows a Jenkins configuration screen for a job titled "Generate ASCII Artwork." It includes options for build triggers, environment settings, and build steps, with a dropdown menu for adding build steps.](https://kodekloud.com/kk-media/image/upload/v1752879567/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-job-generate-ascii-artwork.jpg)

Below is the complete shell script added as a build step. This script performs the following operations:

1.  Fetches advice from the AdviceSlip REST API and saves it as a JSON file.
2.  Uses the jq tool to extract the advice text and verifies if it contains more than five words.
3.  Installs the cowsay library if it is not already installed.
4.  Updates the PATH variable so that Jenkins can locate the cowsay command.
5.  Pipes the advice text through cowsay to generate the ASCII artwork output.

![The image shows a configuration screen for a software build environment, with options to execute shell commands and add build steps. It includes settings for using secret text, adding timestamps, and accessing environment variables.](https://kodekloud.com/kk-media/image/upload/v1752879568/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/build-environment-configuration-screen.jpg)

```
# Call the AdviceSlip API and save output as JSON
curl -s https://api.adviceslip.com/advice > advice.json
cat advice.json | jq -r '.slip.advice' > advice.message


# Ensure the advice has more than 5 words
[ $(wc -w < advice.message) -gt 5 ] && echo "Advice has more than 5 words" || (echo "Advice - $(cat advice.message) has 5 words or less")


# Install cowsay (if not already installed) and generate ASCII artwork
sudo apt-get install cowsay -y
echo $PATH
export PATH="$PATH:/usr/games:/usr/local/games"
cat advice.message | cowsay -f $(ls /usr/share/cowsay/cows | shuf -n 1)
```

> [!important]
> **Note**
>
> Ensure that your Jenkins instance has the necessary plugins installed, such as the Timestamp Plugin, and that the system has access to both the jq tool and curl command.

---

## Understanding the Shell Script

When the build is triggered, the following steps occur:

1.  The script uses `curl` to fetch a piece of advice from the API, saving the JSON output to `advice.json`. A typical JSON response looks like this:

    ```
    {
      "slip": {
        "id": 135,
        "advice": "If you want to be happily married, marry a happy person."
      }
    }
    ```

2.  The jq command extracts the advice (`.slip.advice`) from the JSON file and stores it in `advice.message`.
3.  A word count check is performed on the extracted advice. If the advice contains more than five words, a confirmation message is printed; otherwise, an error message is output, potentially marking the build as failed.
4.  The script installs the cowsay library using `apt-get` (if it is not already installed) and updates the PATH variable to include directories where the cowsay command is located. This update is necessary because the Jenkins environment might not include `/usr/games` or `/usr/local/games` in its PATH.
5.  Finally, the advice is piped through cowsay, which randomly selects a cow file from `/usr/share/cowsay/cows` (using `shuf`) to generate ASCII artwork in the Jenkins console output.

---

## Build Execution and Diagnostics

Once you save the configuration, the project dashboard will display the project description, build status, and workspace details. The workspace is created under the Jenkins home directory, storing any generated files like `advice.json` and `advice.message`.

![The image shows a Jenkins dashboard with an error message stating "Error: no workspace," indicating that a project needs a build to create a workspace. Options like "Build Now" and "Configure" are visible on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752879569/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-dashboard-error-workspace.jpg)

Click “Build Now” to trigger the build. The build progress can be monitored in real time, and selecting the build number provides detailed logs, including the user who started the build, build duration, and console output with timestamps.

![The image shows a Jenkins dashboard displaying the status of a build job named "Generate ASCII Artwork." It includes details such as the start time, user, and duration of the build.](https://kodekloud.com/kk-media/image/upload/v1752879570/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-dashboard-generate-ascii-artwork.jpg)

In the event of a build failure, you might encounter console output similar to the example below:

```
+ cat advice.message
+ ls /usr/share/cowsay/cows
+ shuf -n 1
+ cowsay -f unipony-smaller.cow
/tmp/jenkins...: 14: cowsay: not found
Build step 'Execute shell' marked build as failure
Finished: FAILURE
```

This error indicates that the `cowsay` command was not found. The solution is to update the PATH variable inside your job configuration (as shown in the script above) or configure the global environment variables in Jenkins to include the required directories.

![The image shows a Jenkins system configuration page where environment variables are being set, with a focus on the "PATH" variable.](https://kodekloud.com/kk-media/image/upload/v1752879572/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-system-configuration-path-variable.jpg)

---

## Reviewing the Workspace

After a successful build, the workspace will include the generated files (`advice.json` and `advice.message`). These files can be reviewed on the Jenkins workspace page or accessed directly via SSH/terminal on the Jenkins server. Below is an example of a sample `advice.json`:

```
{
  "slip": {
    "id": 148,
    "advice": "Some people would be better off if they took their own advice."
  }
}
```

![The image shows a Jenkins workspace interface for a project called "Generate ASCII Artwork," displaying two files: "advice.json" and "advice.message," along with build history details.](https://kodekloud.com/kk-media/image/upload/v1752879573/notes-assets/images/Jenkins-For-Beginners-Working-with-Freestyle-Job/jenkins-workspace-generate-ascii-artwork.jpg)

---

## Summary

In this article, you learned how to set up a Jenkins Freestyle Job that:

- Fetches dynamic data from a REST API.
- Processes JSON data using the jq tool.
- Validates the advice message to ensure it meets a minimum word count.
- Installs and utilizes the cowsay library to render the advice as ASCII artwork.

By understanding each step—from job creation and build configuration to troubleshooting environment variables—you can apply these practices to various Jenkins projects and build pipelines.

For more in-depth knowledge, consider exploring the [Jenkins Documentation](https://www.jenkins.io/doc/).

Thank you for reading our guide on working with Freestyle jobs in Jenkins.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/3c1739a1-ee72-4285-a832-4ce3c95b784d/lesson/a0827f66-dfb3-4e34-a723-5bc7c82e88fc)**
>
> Watch video content
