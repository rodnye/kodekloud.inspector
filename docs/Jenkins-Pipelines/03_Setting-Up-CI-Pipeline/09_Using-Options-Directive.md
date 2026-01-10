# Using Options Directive - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/Using-Options-Directive)

---

## Table of Contents

- Using Options Directive
  - Understanding Available Options
  - Adding a Timestamp Option
  - Applying Options at the Stage Level
  - Global Options for Pipeline Behavior
  - Reviewing Pipeline Execution
  - Final Pipeline Example
  - Conclusion
  - Watch Video

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# Using Options Directive

This article explains how to leverage the options directive in a Jenkins pipeline to configure various behaviors at both the global and stage levels. With options such as timestamps, timeouts, retry logic, and concurrent build management, you can optimize your continuous integration workflows effectively.

---

## Understanding Available Options

To explore the available options for your pipeline, refer to the Jenkins Declarative Directive Generator. Simply search for “options” and generate the corresponding code block. Initially, the configuration may be empty as shown below:

```
options {
}
```

You can click on the online documentation from the generator to obtain detailed descriptions on how to integrate and customize these options within your pipeline. Options can be applied globally or within individual stages as required.

![The image shows a webpage from the Jenkins documentation, specifically detailing the "Pipeline Syntax" options, with a sidebar menu for navigation.](https://kodekloud.com/kk-media/image/upload/v1752879820/notes-assets/images/Jenkins-Pipelines-Using-Options-Directive/jenkins-pipeline-syntax-documentation.jpg)

---

## Adding a Timestamp Option

Enhance your pipeline's logging by adding timestamps. To do this, choose the "timestamp" option from the generator and update your directive as follows:

```
options {
    timestamps()
}
```

Keep in mind that when using options like timestamps, you must use the method syntax (with parentheses), even if the generator output omits them.

Below is an example of a pipeline that sets a global timeout option:

```
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage('Example') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

---

## Applying Options at the Stage Level

Apply options to specific stages to tailor behaviors per stage. In the example below, the "Installing Dependencies" stage uses the timestamps option, while the "Unit Testing" stage applies a retry option to handle potential intermittent failures.

```
pipeline {
    agent any


    tools {
        // Define any required tools here.
    }


    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    }


    stages {
        stage('Installing Dependencies') {
            options {
                timestamps()
            }
            steps {
                sh 'npm install --no-audit'
            }
        }


        stage('Dependency Scanning') {
            // Stage implementation here...
        }

        stage('Unit Testing') {
            options {
                retry(2)
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO')]) {
                    sh 'npm test'
                }
            }
            junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
        }
    }
}
```

> [!important]
> **Tip**
>
> If the "Unit Testing" stage depends on external parameters (such as a Mongo URI), ensure that they are provided; otherwise, the stage may fail. The retry option is especially useful in these cases.

Another example demonstrating the use of a retry option at the stage level is shown below:

```
pipeline {
    agent any
    stages {
        stage('Example') {
            options {
                timeout(time: 1, unit: 'HOURS')
                retry(3)
            }
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

Similarly, you can directly generate the retry option using:

```
options {
  retry(2)
}
```

Here’s how incorporating retry logic might look in a comprehensive pipeline:

```
pipeline {
    agent any


    environment {
        // MONGO_URI is commented out for demonstration purposes.
        // MONGO_URI = "mongodb+srv://superCluster.d83jj.mongodb.net/superData"
    }


    stages {
        stage('Installing Dependencies') {
            options { timestamps() }
            steps {
                sh 'npm install --no-audit'
            }
        }


        stage('Dependency Scanning') {
            // Additional stage configuration here...
        }


        stage('Unit Testing') {
            options { retry(2) }
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO')]) {
                    sh 'npm test'
                }
                junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
            }
        }
    }
}
```

After saving and pushing these changes, a new pipeline run is initiated. You may encounter log messages like the following when the retry option is activated:

```
ERROR: script returned exit code 1
Retrying
```

This indicates that the unit testing stage failed initially and was retried as per the configuration.

---

## Global Options for Pipeline Behavior

Global options can control the overall pipeline behavior. For example, you might choose to disable resume on controller restart and prevent concurrent builds by aborting any previous running builds when new ones are triggered.

Consider the following example that incorporates these global options:

```
pipeline {
    agent any


    tools {
        // Define required tools.
    }


    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    }

    options {
        disableResume()
        disableConcurrentBuilds abortPrevious: true
    }

    stages {
        stage('Installing Dependencies') {
            options {
                timestamps()
            }
            steps {
                sh 'npm install --no-audit'
            }
        }


        stage('Dependency Scanning') {
            // Stage implementation here...
        }

        stage('Unit Testing') {
            options {
                retry(2)
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO_PASSWORD')]) {
                    sh 'npm test'
                }
            }
        }
    }
}
```

In one scenario, a sleep command is added to simulate long-running processes:

```
sh 'sleep 100s'
```

When a new build is triggered during an ongoing build, the global option `disableConcurrentBuilds abortPrevious: true` ensures that the previous build is aborted. Log outputs might indicate:

```
16:06:57  + sleep 100s
16:07:25  Sending interrupt signal to process
Superseded by #16
16:07:29  Terminated
16:07:29  script returned exit code 143
```

> [!important]
> **Attention**
>
> Ensure that critical processes are not unexpectedly terminated when using concurrent build management options.

---

## Reviewing Pipeline Execution

After triggering your pipeline, reviewing the Jenkins UI console output can provide insights into how the options are impacting the run. For instance, if the Mongo URI is missing in the "Unit Testing" stage, the stage will fail and the retry option will trigger, leading to log entries similar to:

```
+ npm test


> Solar System@6.7.6 test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


MongooseError: The `uri` parameter to `openUri()` must be a string, got `undefined`. Make sure the first parameter to `mongoose.connect()` or `mongoose.createConnection()` is a string.
    at Connection.openUri (/var/lib/jenkins/workspace/lar-system_feature_enabling-cicd/node_modules/mongoose/lib/connection.js:694:11)
    ...
```

In a successful run, you might observe:

```
+ npm test


> Solar System@6.7.6 test
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


Server successfully running on port - 3000
{ node:94408 } [DEP0170] DeprecationWarning: The URL mongodb://... is invalid. Future versions of Node.js will throw an error.
```

Notice that timestamps are only active for the "Installing Dependencies" stage, which improves log visibility for that particular phase of the pipeline.

---

## Final Pipeline Example

Below is the final refined pipeline configuration that utilizes both global and stage-level options:

```
pipeline {
    agent any


    environment {
        MONGO_URI = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    }

    options {
        disableResume()
        disableConcurrentBuilds abortPrevious: true
    }

    stages {
        stage('Installing Dependencies') {
            options {
                timestamps()
            }
            steps {
                sh 'npm install --no-audit'
            }
        }

        stage('Dependency Scanning') {
            // Additional configurations...
        }

        stage('Unit Testing') {
            options {
                retry(2)
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-db-credentials', passwordVariable: 'MONGO_PASSWORD')]) {
                    sh 'npm test'
                }
                junit allowEmptyResults: true, stdoutRetention: '', testResults: 'test-results.xml'
            }
        }
    }
}
```

This configuration improves log visibility during dependency installation, implements a robust retry mechanism for unit tests, and ensures that concurrent builds are managed effectively.

---

## Conclusion

The options directive in Jenkins pipelines provides a powerful way to manage pipeline behavior, enhance debuggability with timestamps, handle transient failures through retries, and control build concurrency. Experiment with various options to fine-tune your continuous integration workflows within Jenkins.

Thank you for reading this article. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/bed18be5-6c46-4e93-bd6d-895bff40a884)**
>
> Watch video content
