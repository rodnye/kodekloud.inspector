# End of Section 3 and Promote to PROD namespace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/End-of-Section-3-and-Promote-to-PROD-namespace)

---

## Table of Contents

- End of Section 3 and Promote to PROD namespace
  - Adding a Manual Approval Stage
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# End of Section 3 and Promote to PROD namespace

Welcome to the wrap-up of our DevSecOps pipeline. We have:

- Secured the developer workstation with [Talisman Git Hooks](https://github.com/thoughtworks/talisman)
- Run mutation tests, unit tests, and integration tests
- Performed static analysis (SAST) and dynamic analysis (DAST) using [OWASP ZAP](https://www.zaproxy.org/)
- Scanned dependencies with [Dependency Check](https://owasp.org/www-project-dependency-check/) and [Trivy](https://github.com/aquasecurity/trivy)
- Validated manifests via [OPA Conftest](https://www.conftest.dev/) and [Kubesec](https://kubesec.io/)
- Configured automatic rollbacks in Kubernetes deployments
- Sent build notifications to Slack for real-time visibility

> [!important]
> **Security Measures Summary**
>
> Below is a quick overview of the tools and their purposes:

| Security Measure             | Tool                    | Purpose                                        |
| ---------------------------- | ----------------------- | ---------------------------------------------- |
| Git pre-commit Hook          | Talisman                | Prevents accidental secrets or high-risk files |
| Static Application Security  | SAST                    | Detects code vulnerabilities early             |
| Dynamic Application Security | DAST (OWASP ZAP)        | Scans running applications for flaws           |
| Dependency Scanning          | Dependency Check, Trivy | Identifies vulnerable or outdated libraries    |
| Policy as Code               | OPA Conftest            | Ensures infrastructure policies compliance     |
| Manifest Linting             | Kubesec                 | Validates Kubernetes manifest best practices   |

## Adding a Manual Approval Stage

To ensure an architect or manager authorizes production deployments, we introduce a **Promote to PROD** stage with a two-day timeout. The snippet below shows how to integrate this into your `Jenkinsfile`:

```
stage('OWASP ZAP - DAST') {
    steps {
        withKubeConfig([credentialsId: 'kubeconfig']) {
            sh 'bash zap.sh'
        }
    }
}


stage('Promote to PROD') {
    steps {
        timeout(time: 2, unit: 'DAYS') {
            input message: 'Approve deployment to Production Environment/Namespace?'
        }
    }
}


stage('Testing Slack') {
    steps {
        // This intentional failure triggers our Slack notification
        sh 'exit 1'
    }
}


post {
    always {
        junit 'target/surefire-reports/*.xml'
        jacoco execPattern: 'target/jacoco.exec'
        mutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
        dependencyCheckPublisher pattern: 'target/dependency-check-report.xml'
        publishHTML allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true,
                    reportDir: 'owasp-zap-report', reportFiles: 'zap_report'
        // Send a Slack notification with the current build result
        sendNotification currentBuild.result
    }
}
```

> [!important]
> **Manual Approval Gate**
>
> The pipeline will pause at the **Promote to PROD** stage until an approver selects **Proceed** or **Abort**. Aborting will stop the pipeline and notify the team via Slack.

Once committed and pushed, the pipeline executes all stages and halts at our manual approval gate:

![The image shows a Jenkins pipeline for a "devsecops-numeric-application" with various stages like build, tests, scans, and deployment. It includes a prompt asking for approval to deploy to the production environment.](https://kodekloud.com/kk-media/image/upload/v1752873717/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-End-of-Section-3-and-Promote-to-PROD-namespace/jenkins-pipeline-devsecops-application.jpg)

At this point, the designated approver clicks **Proceed** to deploy or **Abort** to cancel. If aborted, the stage turns gray, the pipeline stops, and a Slack alert is sent.

The screenshot below shows the completed pipeline with all checks passing and the approval prompt still active:

![The image shows a Jenkins pipeline for a "devsecops-numeric-application," detailing various stages such as build, testing, scanning, deployment, and integration. Each stage is marked with a green check, indicating successful completion, and there's a prompt for production deployment.](https://kodekloud.com/kk-media/image/upload/v1752873719/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-End-of-Section-3-and-Promote-to-PROD-namespace/jenkins-pipeline-devsecops-application-2.jpg)

In the next section, we'll add cluster benchmarking with Kubebench, enforce pod-to-pod security using KubeScan, perform a Kubernetes cluster vulnerability audit, and then finalize the production rollout.

## Links and References

- [Talisman Git Hooks](https://github.com/thoughtworks/talisman)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Dependency Check](https://owasp.org/www-project-dependency-check/)
- [Trivy](https://github.com/aquasecurity/trivy)
- [OPA Conftest](https://www.conftest.dev/)
- [Kubesec](https://kubesec.io/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/c8977415-ebda-44d4-bd79-2959fc8bb3e7)**
>
> Watch video content
