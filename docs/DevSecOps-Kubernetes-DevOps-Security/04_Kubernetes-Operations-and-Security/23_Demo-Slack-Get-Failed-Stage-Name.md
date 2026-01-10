# Demo Slack Get Failed Stage Name - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Slack-Get-Failed-Stage-Name)

---

## Table of Contents

- Demo Slack Get Failed Stage Name
  - Why Avoid Manual Post-Failure Blocks?
  - Programmatic Stage Discovery with Groovy
  - Example Declarative Jenkinsfile
  - Handling Jenkins Script Approval
  - Verifying Failed Stages in Jenkins UI
  - Slack Notifications on Failure
  - Confirming Success Notifications
  - Conclusion
  - References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Slack Get Failed Stage Name

In this lesson, you'll learn how to programmatically determine which stage failed in a Jenkins Pipeline and send that stage name to Slack—all without adding redundant `post { failure { … } }` blocks to every stage.

## Why Avoid Manual Post-Failure Blocks?

Adding `post { failure { … } }` to each stage quickly becomes unmanageable as pipelines grow. Instead, we'll use the Jenkins Blue Ocean Plugin API at the end of the build to discover failed stages automatically.

## Programmatic Stage Discovery with Groovy

Define two Groovy helper methods—`getStageResults` to collect stage data and `getFailedStages` to extract failures. Place these in a [Shared Library](https://www.jenkins.io/doc/book/pipeline/shared-libraries/) or at the top of your `Jenkinsfile`.

> [!important]
> **Note**
>
> The methods are annotated with `@NonCPS` to ensure they run outside the Pipeline CPS engine.

```
import io.jenkins.blueocean.rest.impl.pipeline.PipelineNodeGraphVisitor
import io.jenkins.blueocean.rest.impl.pipeline.FlowNodeWrapper
import org.jenkinsci.plugins.workflow.steps.build.RunWrapper
import org.jenkinsci.plugins.workflow.actions.ErrorAction


@NonCPS
List<Map> getStageResults(RunWrapper build) {
    def visitor = new PipelineNodeGraphVisitor(build.rawBuild)
    def stages  = visitor.pipelineNodes.findAll { it.type == FlowNodeWrapper.NodeType.STAGE }


    return stages.collect { stage ->
        def errorActions = stage.getPipelineActions(ErrorAction)
        def errors       = errorActions.collect { it.error }.unique()
        [
            id              : stage.id,
            failedStageName : stage.displayName,
            result          : stage.status.result,
            errors          : errors
        ]
    }
}


@NonCPS
List<Map> getFailedStages(RunWrapper build) {
    getStageResults(build).findAll { it.result == 'FAILURE' }
}
```

You can summarize these helper functions:

| Method Name     | Purpose                                             |
| --------------- | --------------------------------------------------- |
| getStageResults | Collects every stage's ID, name, result, and errors |
| getFailedStages | Filters the list to only include failures           |

## Example Declarative `Jenkinsfile`

Below is a sample pipeline illustrating how to use these methods in the `post` section. On failure, we extract the first failed stage name and embed it in a Slack alert.

```
pipeline {
    agent any


    // Shared library or top of file:
    // getStageResults and getFailedStages


    stages {
        stage('Ok') {
            steps {
                echo 'This stage passes'
            }
        }
        stage('NotOK') {
            steps {
                sh 'exit 1'
            }
        }
    }


    post {
        always {
            publishHTML(
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'owasp.zap.report',
                reportFile: 'index.html'
            )
        }
        success {
            script {
                env.failedStage = 'none'
                env.emoji       = ":white_check_mark: :tada: :thumbsup_all:"
                sendNotification(currentBuild.result)
            }
        }
        failure {
            script {
                def failedStages = getFailedStages(currentBuild)
                env.failedStage   = failedStages[0]?.failedStageName
                env.emoji         = ":x: :red_circle: :sos:"
                sendNotification(currentBuild.result)
            }
        }
    }
}
```

## Handling Jenkins Script Approval

When running these API calls for the first time, Jenkins may block unapproved methods. Approve them via **Manage Jenkins → In-process Script Approval**.

> [!important]
> **Warning**
>
> Ensure you only approve trusted methods. Unrestricted script approval can introduce security risks.

![The image shows a Jenkins console output with an error message indicating that scripts are not permitted to use a specific method due to security restrictions. The error details and stack trace are visible, suggesting a script approval issue.](https://kodekloud.com/kk-media/image/upload/v1752873789/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/jenkins-console-output-error-message.jpg)

![The image shows a Jenkins Script Approval page with options to approve or deny script permissions. It includes a list of methods and a warning about potential security vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752873790/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/jenkins-script-approval-page-options.jpg)

You may need to approve several entries until the build completes successfully.

## Verifying Failed Stages in Jenkins UI

After granting approvals, rerun the pipeline. In the Classic UI's Stage View, failed stages are highlighted in red:

![The image shows a Jenkins pipeline dashboard with a stage view, displaying build history and stage times for a project. Some stages have failed, indicated by red highlights.](https://kodekloud.com/kk-media/image/upload/v1752873791/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/jenkins-pipeline-dashboard-stage-view.jpg)

If additional methods are blocked, another console error will appear:

![The image shows a Jenkins console output with an error message indicating that scripts are not permitted to use a specific method due to security restrictions. There is also a stack trace detailing the error.](https://kodekloud.com/kk-media/image/upload/v1752873792/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/jenkins-console-output-error-message-2.jpg)

Once all approvals are in place, check the overall pipeline view:

![The image shows a Jenkins pipeline dashboard for a project named "devsecops-numeric-application," displaying the stage view with build history and status of various stages, including some failed tests.](https://kodekloud.com/kk-media/image/upload/v1752873793/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/jenkins-pipeline-dashboard-devsecops-numeric.jpg)

## Slack Notifications on Failure

When a stage fails, the Slack app will receive a message identifying the failed stage:

![The image shows a Slack interface with a Jenkins Slack App notification about a failed Kubernetes deployment in the "devsecops" pipeline. It includes details like job name, build number, failed stage, and Git information.](https://kodekloud.com/kk-media/image/upload/v1752873794/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/slack-jenkins-notification-kubernetes-failure.jpg)

## Confirming Success Notifications

Use a simple two-stage pipeline to validate success notifications. Observe that `failedStage` is set to `none` on successful builds:

```
pipeline {
    agent any
    stages {
        stage('Testing Slack - 1')            { steps { sh 'exit 0' } }
        stage('Testing Slack - Error Stage')  { steps { sh 'exit 1' } }
    }
    post {
        always {
            junit 'target/surefire-reports/*.xml'
            jacoco execPattern: 'target/jacoco.exec'
            dependencyCheckPublisher pattern: 'target/dependency-check-report.xml'
        }
        success {
            script {
                env.failedStage = 'none'
                env.emoji       = ':white_check_mark: :tada: :thumbsup_all:'
                sendNotification(currentBuild.result)
            }
        }
        failure {
            script {
                def failedStages = getFailedStages(currentBuild)
                env.failedStage   = failedStages[0]?.failedStageName
                env.emoji         = ':x: :red_circle:'
                sendNotification(currentBuild.result)
            }
        }
    }
}
```

A successful run will look like this in Slack:

![The image shows a Slack interface with a notification from the Jenkins Slack App about a successful Kubernetes deployment in the "devsecops" pipeline. It includes details like job name, build number, and links to Jenkins and GitHub.](https://kodekloud.com/kk-media/image/upload/v1752873795/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Slack-Get-Failed-Stage-Name/slack-notification-jenkins-kubernetes-deployment.jpg)

## Conclusion

Leveraging the Jenkins Blue Ocean API to detect failed stages keeps your pipeline concise and scalable. You’ll get accurate Slack alerts pinpointing the exact stage that failed—no repetitive `post { failure { … } }` blocks required.

## References

- [Jenkins Pipeline Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Blue Ocean Plugin API](https://github.com/jenkinsci/blueocean-plugin)
- [Jenkins In-process Script Approval](https://www.jenkins.io/doc/book/managing/script-approval/)
- [Slack Notification Plugin](https://plugins.jenkins.io/slack/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/ba7dd07d-2138-457f-a096-b0ba7addb042)**
>
> Watch video content
