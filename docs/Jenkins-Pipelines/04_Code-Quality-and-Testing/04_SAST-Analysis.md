# SAST Analysis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Code-Quality-and-Testing/SAST-Analysis)

---

## Table of Contents

- SAST Analysis
  - Creating a New Project in SonarQube
  - Updating the Jenkinsfile for SonarQube
  - Installing and Configuring SonarQube Scanner in Jenkins
  - Verifying Analysis on the SonarQube Dashboard
  - Passing the Coverage Report to SonarQube
  - Watch Video

---

## Content

Jenkins Pipelines

Code Quality and Testing

# SAST Analysis

In this lesson, we perform Static Application Security Testing (SAST) using SonarQube. The SonarQube instance is already set up on a virtual machine and is accessible via port 9000. Initially, the SonarQube interface shows that there are no projects, and the default "Dasher" quality gate is active. This quality gate enforces conditions such as requiring at least 90% code coverage—any project falling below this threshold will fail.

![The image shows a SonarQube interface displaying a quality gate configuration named "Dasher-Quality-Gate," with conditions for code coverage, duplicated lines, maintainability, reliability, and security ratings.](https://kodekloud.com/kk-media/image/upload/v1752879604/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-dasher-quality-gate-config.jpg)

## Creating a New Project in SonarQube

We begin by manually creating a new project. For this demonstration, the project is named "Solar System Project" with the main branch named "main." Although integration with various CI/CD tools is available, we will use a local setup for this demo.

![The image shows a SonarQube interface for creating a new project, with fields for project display name, project key, and main branch name being filled out.](https://kodekloud.com/kk-media/image/upload/v1752879605/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-new-project-interface.jpg)

After entering the project details, SonarQube offers several integration options for popular CI tools.

![The image shows a SonarQube dashboard for a project named "Solar-System-Project," offering options to integrate with various CI tools like Jenkins, GitHub Actions, Bitbucket Pipelines, GitLab CI, and Azure Pipelines. There's also a note about using an embedded database for evaluation purposes only.](https://kodekloud.com/kk-media/image/upload/v1752879606/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-dashboard-solar-system-project.jpg)

For this demo, we use a local setup. SonarQube generates an authentication token for project analysis. Although the token in our demonstration is set to never expire, it is advisable to configure a short expiration period in production environments. This token is required for uploading analysis results.

![The image shows a SonarQube dashboard for a project named "Solar-System-Project," where a token is being generated for project analysis with options for expiration.](https://kodekloud.com/kk-media/image/upload/v1752879608/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-dashboard-solar-system-token.jpg)

After detecting that our project type is Node.js, SonarQube provides a command similar to the following for a Node.js project running on Linux:

```
sonar-scanner \
 -Dsonar.projectKey=Solar-System-Project \
 -Dsonar.sources= \
 -Dsonar.host.url=http://64.227.187.25:9000 \
 -Dsonar.login=asp_54484bdbe3a53b308c54e43bbeba3fd6
```

You can run this command directly on your Linux machine or use it within your Jenkins pipeline. In our Jenkinsfile, we incorporate a new stage to perform SAST analysis.

Below is an example snippet of the SonarQube CLI command as integrated within a Jenkins pipeline:

```
sonar-scanner \
  -Dsonar.projectKey=Solar-System-Project \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://64.227.187.25:9000 \
  -Dsonar.login=sqp_54484dbbe23b53b308c734c5e4c3beba3fd6
```

## Updating the Jenkinsfile for SonarQube

To integrate SonarQube analysis into the Jenkins pipeline, we add a new stage named "SAST - SonarQube" after the Code Coverage stage. Below is a simplified section of the Jenkinsfile with all stages included:

```
environment {
    MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS = credentials('mongo-db-credentials')
    MONGO_USERNAME = credentials('mongo-db-username')
    MONGO_PASSWORD = credentials('mongo-db-password')
}

options {
    // Other options can be placed here
}

stages {
    stage('Installing Dependencies') {
        // Steps to install dependencies
    }
    stage('Dependency Scanning') {
        // Steps for dependency scanning
    }
    stage('Unit Testing') {
        // Steps for unit testing
    }
    stage('Code Coverage') {
        // Steps for code coverage calculation
    }
    stage('SAST - SonarQube') {
        steps {
            sh '''
                sonar-scanner \
                -Dsonar.projectKey=Solar-System-Project \
                -Dsonar.sources=app.js \
                -Dsonar.host.url=http://64.227.187.25:9000 \
                -Dsonar.login=sqp_54484dbbe3a5b3b3088c734cf5e4c3beba3fd6
            '''
        }
    }
}

post {
    // Post-build actions can be specified here
}
```

The above command uses the SonarScanner CLI to analyze the specified source code (in this case, app.js). Once the analysis is complete, the results are uploaded to SonarQube with the provided token and project key.

> [!important]
> **Prerequisite**
>
> Ensure that the SonarScanner CLI is installed on your virtual machine or available in your Jenkins tools.

## Installing and Configuring SonarQube Scanner in Jenkins

If SonarScanner is not installed, follow these steps:

1.  Open the Jenkins Plugin Manager and search for "SonarQube Scanner."
2.  Install the plugin and restart Jenkins.
3.  Configure the scanner through "Manage Jenkins" > "Global Tool Configuration" by adding a new SonarQube Scanner installation. For this demo, we use version 6.1.0.

![The image shows the Jenkins plugin management interface, specifically the "Available plugins" section, with a search for "sonar" displaying plugins like SonarQube Scanner and Sonar Quality Gates.](https://kodekloud.com/kk-media/image/upload/v1752879609/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/jenkins-plugin-management-sonar-search.jpg)

![The image shows a Jenkins interface where a SonarQube Scanner is being configured, with options to install automatically and select a version from Maven Central.](https://kodekloud.com/kk-media/image/upload/v1752879610/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/jenkins-sonarqube-scanner-configuration.jpg)

After installation, update your Jenkinsfile to reference the tool using an environment variable, for example:

```
environment {
    MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS = credentials('mongo-db-credentials')
    MONGO_USERNAME = credentials('mongo-db-username')
    MONGO_PASSWORD = credentials('mongo-db-password')
    SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
}
```

Then, update the SAST stage in the Jenkinsfile to utilize this tool:

```
stages {
    stage('Installing Dependencies') { ... }
    stage('Dependency Scanning') { ... }
    stage('Unit Testing') { ... }
    stage('Code Coverage') { ... }

    stage('SAST - SonarQube') {
        steps {
            sh 'echo $SONAR_SCANNER_HOME'
            sh '''
                $SONAR_SCANNER_HOME/bin/sonar-scanner \
                -Dsonar.projectKey=Solar-System-Project \
                -Dsonar.sources=app.js \
                -Dsonar.host.url=http://64.227.187.25:9000 \
                -Dsonar.login=sqp_54484dbbe3a5b3b3088c734cf5e4c3beba3fd6
            '''
        }
    }
}
```

This stage echoes the path of the SonarScanner tool for debugging and then runs the analysis using the full CLI path. Once committed, the pipeline will trigger a new build and upload the analysis result to SonarQube.

During the build, logs similar to the snippet below will confirm the successful analysis:

```
echo $SONAR_SCANNER_HOME
$SONAR_SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=Solar-System-Project -Dsonar.sources=app.js -Dsonar.host.url=http://64.227.187.25:9000 -Dsonar.login=sqp_54484dbbe3a5b3b...
...
17:51:48.784 INFO ANALYSIS SUCCESSFUL, you can access the results at: http://64.227.187.25:9000/dashboard?id=Solar-System-Project
```

## Verifying Analysis on the SonarQube Dashboard

After a successful build, refresh the SonarQube dashboard for the "Solar System Project" to view the code status, which includes security hotspots, code smells, and code coverage metrics.

![The image shows a SonarQube dashboard for a project named "Solar-System-Project," indicating a failed quality gate due to low code coverage and security review issues.](https://kodekloud.com/kk-media/image/upload/v1752879612/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-dashboard-solar-system-failed.jpg)

Currently, the project shows 0% coverage because the coverage report was not passed to SonarQube. Before SAST analysis, the Jenkins pipeline generated a coverage report of approximately 79% for the app.js file. However, SonarQube does not process this report unless you explicitly specify its location.

## Passing the Coverage Report to SonarQube

For Node.js projects, SonarQube requires the coverage report to be specified using the sonar.javascript.lcov.reportPaths parameter. After running your coverage command (typically via npm scripts), the report is generated in the coverage directory using a command such as:

```
+ npm run coverage
> Solar System@6.7.6 coverage
> nyc --reporter cobertura --reporter lcov --reporter text --timeout 10000 --exit mocha app-test.js

Server successfully running on port - 3000
```

To provide full details on configuring a Node.js project with SonarQube, refer to the [SonarQube documentation](https://docs.sonarqube.org/latest/analysis/lcov/). Add the following property to your scanner command:

```
sonar.projectKey=<project-key>
sonar.javascript.lcov.reportPaths=./coverage/lcov.info
```

Ensure that the file `coverage/lcov.info` exists in your workspace as it contains the code coverage data required by SonarQube.

Update the Jenkinsfile stage for SonarQube analysis to include the coverage report path:

```
stage('SAST - SonarQube') {
    steps {
        sh 'echo $SONAR_SCANNER_HOME'
        sh '''
            $SONAR_SCANNER_HOME/bin/sonar-scanner \
            -Dsonar.projectKey=Solar-System-Project \
            -Dsonar.sources=app.js \
            -Dsonar.host.url=http://64.227.187.25:9000 \
            -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info \
            -Dsonar.login=sqp_54484dbbe3a5b3b3088c734cf5e4c3beba3fd6
        '''
    }
}
```

After committing and pushing these changes, trigger a new pipeline build. With the updated configuration, the SonarQube dashboard will display the updated code coverage (for example, an update from 0% to 73%).

![The image shows a SonarQube dashboard for a project named "Solar-System-Project," displaying metrics such as bugs, vulnerabilities, security hotspots, code smells, and code coverage. The project has 73.5% code coverage, with no bugs or vulnerabilities, but two security hotspots and three code smells.](https://kodekloud.com/kk-media/image/upload/v1752879613/notes-assets/images/Jenkins-Pipelines-SAST-Analysis/sonarqube-solar-system-dashboard.jpg)

Although the coverage meets the reported percentage, it still remains below the required 90% threshold, causing the quality gate to fail. However, note that the Jenkins pipeline stage for SonarQube is marked as successful because it only checks whether the analysis was uploaded—and does not validate the quality gate status.

> [!important]
> **Next Steps**
>
> In a future demonstration, we will explore how to retrieve the quality gate status from SonarQube to ensure that the Jenkins pipeline can fail the build if the quality gate conditions are not met.

That's all for now. Thank you for following along.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/bcd4711c-8a69-4218-a65c-113fd7a7a88d/lesson/140a9960-24f4-4db0-bfb8-7ed560392637)**
>
> Watch video content
