# DAST Ignore Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Kubernetes-and-GitOps/DAST-Ignore-Rules)

---

## Table of Contents

- DAST Ignore Rules
  - Example DAST Output
  - Ignoring Warnings During the Scan
  - Creating the ZAP Ignore Configuration File
  - Integrating with Jenkins Pipeline
  - Front-End Visual Elements
  - Pipeline Execution and Final Verification
  - Final Docker Command (Demo)
  - Watch Video

---

## Content

Jenkins Pipelines

Kubernetes and GitOps

# DAST Ignore Rules

In this article, we explain how to bypass specific warnings during dynamic application security testing (DAST) with OWASP ZAP. Previously, a DAST run terminated because of an unexpected content type warning. While the ideal approach is to resolve the issue in your application code, this guide demonstrates how you can ignore such warnings for testing purposes.

## Example DAST Output

Below is an example output from a DAST run that logged one warning:

```
#### REPLACE below with Kubernetes http://IP_Address:30000/api-docs/
#### chmod 777 $(pwd)
docker run -v $(pwd):/zap/wrk/:/zapproxy zap-api-scan.py -t http://134.209.155.222:30000/
PASS: .intaccess Information Leak [40032]
PASS: Hidden File Finder [40035]
PASS: Spring Actuator Information Leak [40024]
PASS: Log4Shell [40034]
PASS: SpringShell [40045]
PASS: Script Active Scan Rules [5000]
PASS: Script Passive Scan Rules [5001]
PASS: Path Traversal [6]
PASS: Remote File Inclusion [7]
PASS: Java Serialization Object [90023]
PASS: HTTP Request Smuggling [90031]
PASS: Insufficient Site Isolation Against Spectre Vulnerability [90004]
PASS: XSLT Injection [9001]
PASS: Server Side Code Injection [9006]
PASS: Unauthorized Command Execution [9005]
PASS: Application Error Disclosure [90082]
PASS: External Entity Attack [90043]
PASS: Generic Padding Oracle [90025]
PASS: WSDL File Detection [90080]
PASS: Security Scoped Cookie Protection [9006]
PASS: Server Metadata Potentially Exposed [90053]
WARN-NEW: Unexpected Content-Type was returned [10001] x 5
http://134.209.155.222:30000/ [200 OK]
http://134.209.155.222:30000/1684169206451124338 [404 Not Found]
http://134.209.155.222:30000/latest/version [404 Not Found]
FAIL-NEW: 0  WARN-INPROG: 0  INFO: 0 IGNORE: 0  PASS: 112
script returned exit code 2
```

> [!important]
> **Note**
>
> For demonstration purposes, this guide explains how to bypass errors. In production, always address the underlying vulnerabilities.

## Ignoring Warnings During the Scan

To ignore specific warnings during a scan, create a configuration file that uses the "ignore" tag for designated warnings. The following command runs the scan while ignoring errors:

```
#### REPLACE below with Kubernetes http://IP_Address:30000/api-docs/ ######
chmod 777 $(pwd)
docker run -v $(pwd):/zap/wrk ghcr.io/zaproxy/zap-api-scan.py -t http://134.209.155.222:8080/
```

> Remember: Always consult the OWASP ZAP documentation to decide which findings can be safely ignored.

## Creating the ZAP Ignore Configuration File

You must create a configuration file to specify the warnings you wish to ignore. When executing the Docker command, pass the configuration file using the `-c` option. You can generate a default configuration file using the `-g` option. Below is an excerpt from a sample configuration file:

```
# zap-api-scan rule configuration file
# Change WARN to IGNORE to ignore a rule or FAIL to fail if the rule matches.
# Active scan rules set to IGNORE will not run, which speeds up the scan.
# Only the rule identifiers are used—the names are provided for informational purposes.
# You can append your custom messages after a tab on each line.
0       WARN (Directory Browsing - Active/release)
10010   WARN (Cookie No HttpOnly Flag - Passive/release)
10011   WARN (Cookie Without Secure Flag - Passive/release)
10012   WARN (Password Autocomplete in Browser - Passive/release)
10015   WARN (Incomplete or No Cache-control and Pragma HTTP Header Set - Passive/release)
10016   WARN (Web Browser XSS Protection Not Enabled - Passive/release)
10017   WARN (Cross-Domain JavaScript Source File Inclusion - Passive/release)
10020   WARN (Content-Type Header Missing - Passive/release)
10030   WARN (X-Frame-Options Header Scanner - Passive/release)
10031   WARN (X-Content-Type-Options Header Missing - Passive/release)
10032   WARN (Information Disclosure - Debug Error Messages - Passive/beta)
10033   WARN (Information Disclosure - Sensitive Informations in URL - Passive/beta)
10034   WARN (Information Disclosure - Sensitive Information in HTTP Referrer Header - Passive/beta)
10035   WARN (HTTP Parameter Override - Suspicious Comments - Passive/beta)
10036   WARN (Information Disclosure - Passive/beta)
10037   WARN (Viewstate Scanner - Passive/beta)
10038   WARN (Secure Pages Include Mixed Content - Passive/release)
10040   WARN (Source Code Disclosure - /WEB-INF folder - Active/beta)
10041   WARN (Remote Code Execution - Shell Shock - Active/beta)
10042   WARN (Backup File Disclosure - Passive/beta)
10043   WARN (Weak Authentication Method - Passive/beta)
10044   WARN (Presence of Anti-CSRF Tokens - Passive/beta)
```

Each line in the file consists of:

- Rule ID
- Action (`IGNORE`, `WARN`, or `FAIL`)
- Additional informational text (optional)

Save this file (e.g., as `zap_ignore_rules`) and reference it in your Jenkins pipeline.

## Integrating with Jenkins Pipeline

Below is an example snippet from a Jenkinsfile which shows different pipeline stages. Notice the use of the configuration file in the "DAST - OWASP ZAP" stage:

```
stage('Integration Testing - [AWS EC2](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2)') {
    // Integration testing steps...
}


stage('K8S - Update Image Tag') {
    // Kubernetes image update steps...
}


stage('K8S - Raise PR') {
    // Steps to raise a pull request...
}


stage('App Deployed?') {
    when {
        branch 'PR*'
    }
    steps {
        timeout(time: 1, unit: 'DAYS') {
            input message: 'Is the PR merged and ArgoCD Synced?', ok: 'YES! PR is Merged and ArgoCD Applied'
        }
    }
}


stage('DAST - OWASP ZAP') {
    // DAST steps using ZAP
}


post {
    always {
        // Cleanup actions...
    }
}
```

After creating the configuration file, update the Docker command in your pipeline as shown below:

```
chmod 777 $(pwd)
docker run -v $(pwd):/zap/wrk/:rw ghcr.io/zaproxy/zaproxy zap-api-scan.py \
-t http://134.209.155.222:30000/api-docs/ \
-f openapi \
-r zap_report.html \
-w zap_report.md \
-J zap_json_report.json \
-x zap_xml_report.xml \
-c zap_ignore_rules
```

This command executes the ZAP scan and generates several reports (HTML, Markdown, JSON, and XML). The HTML report is eventually published in the pipeline, as illustrated below:

```
post {
    always {
        script {
            if (fileExists('solar-system-gitops-argocd')) {
                sh 'rm -rf solar-system-gitops-argocd'
            }
        }
    }
    junit allowEmptyResults: true, stdioRetention: '', testResults: 'test-results.xml'
    junit allowEmptyResults: true, stdioRetention: '', testResults: 'dependency-check-junit.xml'
    junit allowEmptyResults: true, stdioRetention: '', testResults: 'trivy-image-CRITICAL-results.xml'
    junit allowEmptyResults: true, stdioRetention: '', testResults: 'trivy-image-MEDIUM-results.xml'
    publishHTML([allowMissing: true,
                 alwaysLinkToLastBuild: true,
                 keepAll: true,
                 reportDir: './',
                 reportFiles: 'zap_report.html',
                 reportName: 'DAST - OWASP ZAP Report',
                 reportTitles: '',
                 useWrapperFileDirectly: true])
    publishHTML([allowMissing: true,
                 alwaysLinkToLastBuild: true,
                 keepAll: true,
                 reportDir: './',
                 reportFiles: 'trivy-image-CRITICAL-results.html',
                 reportName: 'Trivy Image Critical Vul Report',
                 reportTitles: '',
                 useWrapperFileDirectly: true])
    publishHTML([allowMissing: true,
                 alwaysLinkToLastBuild: true,
                 keepAll: true,
                 reportDir: './',
                 reportFiles: 'trivy-image-MEDIUM-results.html',
                 reportName: 'Trivy Image Medium Vul Report',
                 reportTitles: '',
                 useWrapperFileDirectly: true])
}
```

## Front-End Visual Elements

In your front-end application, you can add visual cues to indicate status updates. For instance, the index page includes a button with rocket icons representing the application's status:

```
<body>
  <div>
    <div>
      <a href="index.html">
        <button style="font-size: 40px; background: rgb(50,43,167); background: linear-gradient(90deg, rgba(50,43,167,1) 0%, rgba(82,41,124,1) 0%, rgba(137,37,142,1) 0%); color: white; font-family: 'Orbitron', sans-serif; border-radius: 25px; border: 2px solid rgb(35,34,36); width: 600px; height: 70px; text-align: center; line-height: initial; border-width: 1px 1px 3px;">
          <i class="fa fa-rocket"></i> $OLAR <i class="fa fa-rocket"></i> SY:
        </button>
      </a>
    </div>
    <br>
    <input type="submit" id="submit" value="Search the Planet" style="float: right; background-color: rgb(187,75,243); color: white; font-family: 'Ubuntu';">
  </div>
</body>
```

This design feature visually distinguishes important sections of the solar system application.

## Pipeline Execution and Final Verification

Once the pipeline is triggered, it pauses at the "App Deployed?" stage for manual confirmation. After merging the pull request and synchronizing ArgoCD, the pipeline resumes and deploys the updated application. You should see console messages similar to the following:

```
chmod 777 $(pwd)
docker run -v $(pwd):/zap/wrk/:rw ghcr.io/zaproxy/zap-api-scan.py -t http://134.209.155.222:30000/api-docs/ -f openapi -r zap_report.html -w zap_report.md -J zap_json_report.json -x zap_xml_report.xml -c zap_ignore_rules
```

If executed correctly, the output confirms that 112 tests passed while ignoring the designated warning. For example:

```
PASS: Cross Site Scripting (Persistent) [40016]
PASS: SQL Injection [40018]
...
IGNORE-NEW: Unexpected Content-Type was returned [100001] x 83
HTTP/134.209.155.82:8080 (200 OK)
...
FAIL-NEW: @ INFO: 0 | WARN-INPROG: @ INFO: 0 | IGNORE: 1 | PASS: 112
```

> [!important]
> **Warning**
>
> If you encounter an error like:
>
> Failed to load config file /zap/wrk/zap_ignore_rules Unexpected number of tokens on line - there should be at least 3, tab separated: 100001 IGNORE
>
> it indicates that your ignore file does not follow the proper format. Edit the file with a reliable text editor (e.g., vi) to ensure each line has at least three tab-separated tokens.

For example, use the following commands in your terminal:

```
cd solar-system/
vi zap_ignore_rules
```

After updating and committing the corrected file, re-run the pipeline build. When successful, the DAST stage generates the expected reports, and the OWASP ZAP scan completes without errors.

## Final Docker Command (Demo)

Below is a reminder of the Docker command used for the demo:

```
chmod 777 $(pwd) && docker run -v $(pwd):/zap/wrk/:rw ghcr.io/zaproxy/zap-api-scan.py -t http://134.209.155.222:30000/api-docs/ -f openapi -r zap_report.html -w zap_report.json -x zap_xml_report.xml -c zap_ignore_rules
```

By following this configuration, you can integrate OWASP ZAP into your CI/CD pipeline, effectively ignore specific warnings during DAST, and generate comprehensive security scanning reports.

---

![The image shows an Argo CD dashboard with two applications listed: "bitnami-sealed-secrets" and "solar-system-argo-app," displaying their status, repository information, and sync details.](https://kodekloud.com/kk-media/image/upload/v1752879706/notes-assets/images/Jenkins-Pipelines-DAST-Ignore-Rules/argo-cd-dashboard-bitnami-solar-system.jpg)

After synchronizing Argo CD, you should see a new replica set and multiple pods being created as the application is updated. The deployment dashboard may resemble the following:

![The image shows an Argo CD application dashboard displaying the status and details of a Kubernetes deployment, including health and sync status, with a visual representation of the application's components and their relationships.](https://kodekloud.com/kk-media/image/upload/v1752879708/notes-assets/images/Jenkins-Pipelines-DAST-Ignore-Rules/argo-cd-kubernetes-deployment-dashboard.jpg)

Finally, the Jenkins pipeline interface presents various build stages and includes a prompt to confirm that the pull request has been merged and ArgoCD is synchronized:

![The image shows a Jenkins pipeline interface for a project named "solar-system" with various stages like dependency scanning, unit testing, and deployment. It includes a prompt asking if the pull request is merged and ArgoCD is synced, with an option to confirm.](https://kodekloud.com/kk-media/image/upload/v1752879708/notes-assets/images/Jenkins-Pipelines-DAST-Ignore-Rules/jenkins-pipeline-solar-system-stages.jpg)

Upon successful pipeline completion, you can review the OWASP ZAP security scanning report:

![The image shows a ZAP Scanning Report detailing security alerts for various websites, with a summary of risk levels and specific alert details.](https://kodekloud.com/kk-media/image/upload/v1752879709/notes-assets/images/Jenkins-Pipelines-DAST-Ignore-Rules/zap-scanning-report-security-alerts.jpg)

This concludes the demonstration on how to configure OWASP ZAP to ignore specific warnings and integrate it into a CI/CD pipeline for Kubernetes deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/fb6b2c83-178c-4962-b4e6-ca5528721170/lesson/2c26bfe9-bdc1-4932-8c6b-605489ccc3d4)**
>
> Watch video content
