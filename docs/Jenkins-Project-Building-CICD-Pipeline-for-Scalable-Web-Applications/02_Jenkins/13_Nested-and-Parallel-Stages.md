# Nested and Parallel Stages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Nested-and-Parallel-Stages)

---

## Table of Contents

- Nested and Parallel Stages
  - Nested Stages
  - Parallel Stages
  - Nested Stages with Additional Examples
  - Demonstrating Parallel Execution with Sleep Commands
  - Pipeline Output Overview
  - Watch Video
    - Sequential Execution
    - Parallel Execution

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Nested and Parallel Stages

This guide explains how to implement nested and parallel stages in your Jenkins pipelines. It covers the benefits and configurations of each method, allowing you to organize your tasks for improved readability and faster execution.

## Nested Stages

Nested stages help group related tasks into a parent stage, making your pipeline more organized and easier to understand. For instance, a "lint and Test" stage can contain separate sub-stages for linting and unit testing. Although these nested stages execute sequentially, grouping them clarifies the pipeline's logical structure.

Consider the following example that demonstrates nested stages:

```
pipeline {
    agent any
    stages {
        stage('lint and Test') {
            stages {
                stage('Lint') {
                    steps {
                        // Lint steps
                    }
                }
                stage('Unit Tests') {
                    steps {
                        // Unit testing steps
                    }
                }
            }
        }
    }
}
```

In this scenario, the "lint and Test" stage comprises two sub-stages: "Lint" and "Unit Tests". If you then add a separate "Deploy" stage, the pipeline runs the linting and testing stages first, followed by the deployment stage:

```
pipeline {
    agent any
    stages {
        stage('lint and Test') {
            stages {
                stage('Lint') {
                    steps {
                        // Lint steps
                    }
                }
                stage('Unit Tests') {
                    steps {
                        // Unit testing steps
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                // Deploy steps
            }
        }
    }
}
```

> [!important]
> **Note**
>
> Grouping related steps into nested stages does not alter the execution order but improves the overall readability of the pipeline.

## Parallel Stages

Parallel stages enable concurrent execution of multiple stages, which can greatly reduce the total build time. In the previous example, "Lint" and "Unit Tests" executed one after the other. To have them run simultaneously, replace the `stages` block with a `parallel` block.

Here’s a modified pipeline that runs linting and unit testing concurrently:

```
pipeline {
    agent any
    stages {
        stage('lint and Test') {
            parallel {
                stage('Lint') {
                    steps {
                        // Lint steps
                    }
                }
                stage('Unit Tests') {
                    steps {
                        // Unit testing steps
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                // Deploy steps
            }
        }
    }
}
```

> [!important]
> **Note**
>
> When using parallel stages, both "Lint" and "Unit Tests" begin at the same time. The pipeline waits for both to complete before proceeding to the "Deploy" stage.

## Nested Stages with Additional Examples

Below is another example where a nested stage called "lint and format" is introduced. Initially, it contains only a linting stage, but later a formatting stage may be added. Additionally, a "Setup" stage is defined outside the nested stages:

```
pipeline {
    agent any


    stages {
        stage('lint and format') {
            stages {
                stage('linting') {
                    steps {
                        // Linting steps
                    }
                }
            }
        }
    }


    stage('Setup') {
        steps {
            withCredentials([usernamePassword(credentialsId: 'server-creds',
                 usernameVariable: 'myuser', passwordVariable: 'mypassword')]) {
                sh '''
                    echo ${myuser}
                    echo ${mypassword}
                '''
            }
        }
    }
}
```

After pushing the changes to Git and building the pipeline, the output shows entry into the "lint and format" stage, where the nested stages handle linting and formatting tasks separately. Later, the formatting stage can be added to run concurrently with linting by modifying the configuration:

```
pipeline {
    agent any
    stages {
        stage('lint and format') {
            parallel {
                stage('linting') {
                    steps {
                        echo "linting code in nested stage"
                    }
                }
                stage('formatting') {
                    steps {
                        echo "formatting code in nested stage"
                    }
                }
            }
        }
    }
}
```

Running these nested stages in parallel is especially useful in CI/CD pipelines where independent tasks can execute simultaneously to save time.

## Demonstrating Parallel Execution with Sleep Commands

To clearly demonstrate the advantage of parallel execution, consider the example below where each nested stage executes a `sleep` command for 30 seconds. If executed sequentially, the total wait time would be 60 seconds; however, in parallel execution, the overall delay is only 30 seconds.

### Sequential Execution

```
pipeline {
    agent any
    stages {
        stage('lint and format') {
            stages {
                stage('linting') {
                    steps {
                        sh "sleep 30"
                    }
                }
                stage('formatting') {
                    steps {
                        sh "sleep 30"
                    }
                }
            }
        }
    }
}
```

### Parallel Execution

```
pipeline {
    agent any
    stages {
        stage('lint and format') {
            parallel {
                stage('linting') {
                    steps {
                        sh "sleep 30"
                    }
                }
                stage('formatting') {
                    steps {
                        sh "sleep 30"
                    }
                }
            }
        }
    }
}
```

The parallel configuration triggers both sleep commands concurrently, effectively halving the total delay.

## Pipeline Output Overview

A sample Jenkins pipeline console output might include the following steps:

- Checking out code from the Git repository.
- Entering the "lint and format" stage.
- Concurrently executing the "linting" and "formatting" stages.
- Proceeding to further stages such as "Setup" after the parallel stages completion.

Example console output excerpt:

```
Fetching changes from the remote Git repository
/usr/bin/git config remote.origin.url https://github.com/kodkoudhub/course-jenkins-project # timeout=10
Fetching upstream changes from https://github.com/kodkoudhub/course-jenkins-project
> /usr/bin/git --version # timeout=10
> /usr/bin/git fetch --tags --force --progress https://github.com/kodkoudhub/course-jenkins-project +refs/heads/*:refs/remotes/origin/* # timeout=10
Checking out Revision ...
Commit message: "parallel"
...
[Pipeline] stage (lint and format)
[Pipeline] parallel
[Pipeline] { (Branch: linting)
[Pipeline] {
[Pipeline] stage (formatting)
[Pipeline] sh
[linting] + sleep 30
[formatting] + sleep 30
...
```

This output confirms that both stages start simultaneously, enhancing the overall efficiency of the build process.

Both nested and parallel staging techniques offer valuable ways to organize and optimize Jenkins pipelines. Nested stages improve the clarity and maintenance of your pipeline, while parallel stages can dramatically reduce execution times by running independent tasks concurrently.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/78265832-d979-432a-954d-1bfc3099ca0f)**
>
> Watch video content
