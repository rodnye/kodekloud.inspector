# Jenkins Steps and Plugin - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Jenkins-Plugins-and-Integrations/Jenkins-Steps-and-Plugin)

---

## Table of Contents

- Jenkins Steps and Plugin
  - Creating a Pipeline
  - Explicitly Declaring Tools
  - Managing Plugins in Jenkins
  - Checkout Example Using the Git Plugin
  - Creating a Pipeline with Additional Plugins
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Jenkins Plugins and Integrations

# Jenkins Steps and Plugin

In this article, we explore various Jenkins pipeline keywords such as echo, Git, and others. We will guide you through detailed examples that demonstrate how these keywords—provided by several plugins—integrate seamlessly into your pipeline scripts.

## Creating a Pipeline

Begin by creating a new pipeline. For example, name the pipeline "git test" and select the Pipeline option. After clicking OK and scrolling down, choose one of the sample pipelines like "GitHub plus Maven". Pay special attention to the commands within the pipeline stage, particularly around line 13 and line 16:

```
pipeline {
    // Install the Maven version configured as "M3" and add it to the path.
    agent {
        maven "M3"
    }

    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository.
                git 'https://github.com/jglick/simple-maven-project-with-tests.git'

                // Run Maven on a Unix agent.
                sh "mvn -Dmaven.test.failure.ignore=true clean package"

                // To run Maven on a Windows agent, use the appropriate command.
            }
        }
    }
}
```

In the script above, commands like `git` and `sh` represent keywords provided by plugins that integrate external tools such as Git and Maven into your pipeline.

## Explicitly Declaring Tools

You can also explicitly declare the tools used in your pipeline to improve clarity. Consider the following example:

```
pipeline {
    agent any
    tools {
        maven "M3"
    }
    stages {
        stage('Build') {
            steps {
                git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                sh "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
}
```

In this version, the `git` step clones a repository while the `sh` step runs a shell command to execute Maven.

## Managing Plugins in Jenkins

To understand how these plugins work, navigate to Jenkins and go to Manage Jenkins → Manage Plugins.

> [!important]
> **Jenkins Plugin Management**
>
> The Jenkins dashboard offers various options, including managing the system, configuring plugins, security, and nodes. The build queue may appear empty if no builds are scheduled.

Below is an image showing the Jenkins dashboard with options for managing Jenkins, configuring the system, plugins, security, and nodes:

![The image shows a Jenkins dashboard with options for managing Jenkins, configuring the system, plugins, security, and nodes. The build queue is empty.](https://kodekloud.com/kk-media/image/upload/v1752880078/notes-assets/images/Jenkins-Jenkins-Steps-and-Plugin/frame_60.jpg)

To verify the installation of plugins, click the Installed tab and search for "Git". If the search results display correctly, you will see the Git plugin installed—this plugin enables the use of the `git` keyword for repository cloning.

![The image shows a Jenkins plugin page for Git, detailing its version, features, and links for further information and support.](https://kodekloud.com/kk-media/image/upload/v1752880079/notes-assets/images/Jenkins-Jenkins-Steps-and-Plugin/frame_80.jpg)

## Checkout Example Using the Git Plugin

The Git plugin simplifies repository cloning. The following code snippet demonstrates a checkout step using the Git plugin with both default options and customizable settings:

```
checkout({
    class: 'GitSCM',
    branches: [[name: '*/*master']],
    userRemoteConfigs: [[url: 'http://git-server/user/repository.git']]
})
```

This snippet demonstrates how to clone a repository from a specified URL using the Git plugin.

## Creating a Pipeline with Additional Plugins

To illustrate further plugin integration, create another pipeline that utilizes additional plugins like JUnit for processing test results. Go to Jenkins, create a new item, select Pipeline, and name it (for example, "sh-test"). Choose a Scripted Pipeline and include the following script:

```
// Run the Maven build inside an environment with the MVN_HOME set.
withEnv(["MVN_HOME=$mvnHome"]) {
    if (isUnix()) {
        sh "'$MVN_HOME/bin/mvn' -Dmaven.test.failure.ignore clean package"
    } else {
        bat("\"%MVN_HOME%\\bin\\mvn\" -Dmaven.test.failure.ignore clean package")
    }
}


stage('Results') {
    junit '**/target/surefire-reports/TEST-*.xml'
    archiveArtifacts 'target/*.jar'
}
```

In this script, the Maven build is executed, and then the JUnit plugin is used to archive test results. Verify the installation of the JUnit plugin by navigating to Manage Jenkins → Manage Plugins and searching for "JUnit".

> [!important]
> **Plugin Verification**
>
> Refer to the plugin documentation for detailed behavior and configuration options to fully leverage these tools in your pipelines.

## Conclusion

Keywords like `git`, `sh`, and `junit` within your pipeline scripts represent functionalities provided by the respective plugins. These plugins are installed during the basic Jenkins setup or can be added later through the plugin manager. Regular practice and exploration of these plugins will help solidify your understanding of Jenkins pipeline steps and plugin integrations.

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/34e95998-38e2-4735-a378-b466e6a5851c/lesson/bb3eb718-7fc9-4b77-a436-26b2ead74f98)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/34e95998-38e2-4735-a378-b466e6a5851c/lesson/5d213d43-af76-453f-b03a-65e796751b22)**
>
> Practice lab
