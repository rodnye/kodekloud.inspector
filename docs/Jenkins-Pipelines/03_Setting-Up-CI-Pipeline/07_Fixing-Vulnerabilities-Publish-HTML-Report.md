# Fixing Vulnerabilities Publish HTML Report - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Setting-Up-CI-Pipeline/Fixing-Vulnerabilities-Publish-HTML-Report)

---

## Table of Contents

- Fixing Vulnerabilities Publish HTML Report
  - Fixing Vulnerabilities Locally
  - Updating the Jenkins Pipeline to Publish Reports
  - Additional Configuration: Content Security Policy
  - Viewing Test Results
  - Conclusion
  - Watch Video
    - Publishing the HTML Report
    - Publishing JUnit Test Reports
    - Combined Pipeline Snippet

---

## Content

Jenkins Pipelines

Setting Up CI Pipeline

# Fixing Vulnerabilities Publish HTML Report

In this guide, we address how to fix detected vulnerabilities and publish HTML reports within Jenkins. Both the npm dependency audit and the OWASP Dependency-Check stages may fail if critical vulnerabilities are found. Developers should update the affected dependencies to secure versions, ensuring your CI/CD pipeline remains stable and secure.

---

## Fixing Vulnerabilities Locally

When running the audit command, you might see output that lists critical, high, and low vulnerabilities. For example:

```
npm audit --audit-level=critical
@babel/traverse <7.23.2>
Severity: critical
Babel vulnerable to arbitrary code execution
fix available via "npm audit fix"
node_modules/@babel/traverse

body-parser <1.20.3>
Severity: high
Prototype pollution vulnerable to denial-of-service via "npm audit audit"
node_modules/body-parser

express <4.19.1>
Severity: low
Denial of service
node_modules/express
```

Test the results locally and commit the updated changes to your Git repository to re-trigger the CI/CD pipeline.

In this example, we are working on a feature branch (`feature/enabling-cicd`) addressing the vulnerabilities. Start by running the audit with the critical level:

```
npm audit --audit-level=critical
```

The audit output might indicate several vulnerabilities. For instance, you may see a report similar to:

```
node_modules/path-to-regexp
send <0.19.0>
Severity: moderate
send vulnerable to template injection that can lead to XSS - https://github.com/advisories/GHSA-m6fv-jmcg-4jfg
fix available via 'npm audit fix'
node_modules/send
serve-static <1.16.0>
Depends on vulnerable versions of send
node_modules/serve-static

8 vulnerabilities (2 moderate, 5 high, 1 critical)

To address all issues, run:
npm audit fix
```

A quick check using `echo $?` will return a non-zero code (1) after the audit if a critical vulnerability exists.

To fix the issues, you have two options:

1.  Run `npm audit fix` to automatically correct all vulnerabilities.
2.  Update dependencies manually. For example, to fix the critical vulnerability in `@babel/traverse`, install version 7.23.2 or greater:

```
npm install @babel/traverse@7.23.2
```

After installation, the audit should run automatically and remove the critical issue. The updated audit output should then only list remaining moderate and high vulnerabilities. Re-run the audit to verify:

```
npm audit --audit-level=critical
echo $?
```

At this point, the changes are reflected in the updated `package.json` and `package-lock.json` files. For example, your `package.json` may now include:

```
{
  "nyc": {
    "check-coverage": true,
    "lines": 90
  },
  "dependencies": {
    "@babel/traverse": "^7.23.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mocha-junit-reporter": "^2.2.1",
    "mongoose": "5.13.20",
    "nyc": "^15.1.0"
  }
}
```

Once the audit returns an exit code of 0, commit your changes with a message such as "fix critical vulnerability" and push them.

---

## Updating the Jenkins Pipeline to Publish Reports

After committing the fixes, a new build is triggered in Jenkins. Next, configure your Jenkins pipeline to publish both HTML and JUnit reports, ensuring that developers have easy access to detailed vulnerability information from the Jenkins UI.

### Publishing the HTML Report

In your project workspace, locate the HTML report file (e.g., `dependency-check-jenkins.html`). For example, the following screenshot shows where the file is located:

![The image shows a Jenkins workspace interface displaying a list of files and directories with their sizes and timestamps. The interface includes options like "Console Output" and "Open Blue Ocean" on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752879780/notes-assets/images/Jenkins-Pipelines-Fixing-Vulnerabilities-Publish-HTML-Report/jenkins-workspace-interface-files-list.jpg)

Using the Pipeline Syntax Generator, create a publish HTML step. The configuration parameters include:

- Directory containing the report (e.g., the root directory `./`).
- The report file name (`dependency-check-jenkins.html`).
- An optional report title if multiple reports exist.

Include the following snippet in your Jenkinsfile:

```
publishHTML(
    allowMissing: true,
    alwaysLinkToLastBuild: true,
    keepAll: true,
    reportDir: '.',
    reportFiles: 'dependency-check-jenkins.html',
    reportName: 'Dependency Check HTML',
    reportTitles: '',
    useWrapperFileDirectly: true
)
```

The screenshot below illustrates the HTML report configuration:

![The image shows a Jenkins Pipeline Syntax configuration screen, specifically for generating a script to publish HTML reports. It includes fields for specifying the HTML directory, index page, and report title.](https://kodekloud.com/kk-media/image/upload/v1752879782/notes-assets/images/Jenkins-Pipelines-Fixing-Vulnerabilities-Publish-HTML-Report/jenkins-pipeline-html-report-config.jpg)

### Publishing JUnit Test Reports

Additionally, publish JUnit XML reports to display test results in Jenkins. For example, if you generate a file like `dependency-check-junit.xml`, configure the JUnit publisher step as follows:

```
junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-junit.xml'
```

An example configuration page for test result settings is shown below:

![The image shows a Jenkins Pipeline Syntax configuration page with options for test report XMLs, test output retention, and health report settings. Various checkboxes and input fields are visible for customizing the pipeline behavior.](https://kodekloud.com/kk-media/image/upload/v1752879783/notes-assets/images/Jenkins-Pipelines-Fixing-Vulnerabilities-Publish-HTML-Report/jenkins-pipeline-syntax-configuration.jpg)

### Combined Pipeline Snippet

Below is a consolidated snippet from the Jenkinsfile that includes the npm audit step, OWASP Dependency-Check, and both report publishing configurations:

```
steps {
    sh '''
        npm audit --audit-level=critical
        echo $?
    '''
}

stage('OWASP Dependency Check') {
    steps {
        dependencyCheck additionalArguments: '''
            --scan ./
            --out ./
            --format 'ALL'
            --prettyPrint
        ''', odcInstallation: 'OWASP-DepCheck-10'

        dependencyCheckPublisher(
            failedTotalCritical: 1,
            pattern: 'dependency-check-report.xml',
            stopBuild: true
        )

        junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-junit.xml'

        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: './',
            reportFiles: 'dependency-check-jenkins.html',
            reportName: 'Dependency Check HTML Report',
            reportTitles: '',
            useWrapperFileDirectly: true
        ])
    }
}
```

When the build finishes, Jenkins archives the HTML report. You can verify the archiving process by reviewing the console logs:

```
[htmPublisher] Archiving HTML reports...
[htmPublisher] Archiving at BUILD level /var/lib/jenkins/workspace/your-project to /var/lib/jenkins/jobs/.../htmlReports/Dependency_20Check_20HTML_20Report
[htmPublisher] Copying recursive using current thread
```

The artifact view will include the HTML dependency check report:

![The image shows a Jenkins interface displaying artifacts for a project named "solar-system" under the "Gitea-Organization." It lists a pipeline log and a dependency check HTML report.](https://kodekloud.com/kk-media/image/upload/v1752879784/notes-assets/images/Jenkins-Pipelines-Fixing-Vulnerabilities-Publish-HTML-Report/jenkins-solar-system-artifacts.jpg)

---

## Additional Configuration: Content Security Policy

> [!important]
> **Note**
>
> By default, the published HTML report may lack CSS styling due to strict Content Security Policies (CSP) in Jenkins. To ensure the report is correctly styled, update the system property accordingly.

To view the report with full styling, you can relax the CSP by updating the system property, for example:

```
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "sandbox allow-same-origin; default-src 'self';")
```

Alternatively, you can clear the property if needed:

```
System.clearProperty("hudson.model.DirectoryBrowserSupport.CSP")
```

These commands can be executed from the Jenkins script console on the desired node. Adjusting the CSP settings will affect newly generated builds.

Additional useful commands in the script console include:

```
println System.getenv("PATH")
println "uname -a".execute().text
System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
```

After updating the CSP settings, trigger a new build to observe the report with the correct styling.

---

## Viewing Test Results

After the build completes, view the JUnit test results by navigating to the Test Results tab in Jenkins. The reports will present detailed information on vulnerabilities such as severity, CVSS scores, impacts, available patches, and workarounds. For example, a snapshot of the test results might display:

```
Passed - 2974
✔ @eslintcjs - dependency-check
✔ @babel/code-frame:7.24.7 - dependency-check
...
```

The screenshot below shows a Jenkins test results page listing several failures with details related to npm packages and CVE identifiers:

![The image shows a Jenkins test results page indicating that 18 tests have failed, with a list of existing failures related to various npm packages and CVE identifiers.](https://kodekloud.com/kk-media/image/upload/v1752879785/notes-assets/images/Jenkins-Pipelines-Fixing-Vulnerabilities-Publish-HTML-Report/jenkins-test-results-failed-npm-cves.jpg)

Clicking on an individual test entry provides more detailed information, including CVSS scores, patch recommendations, and links to commit patches (e.g., for Express.js redirection issues).

---

## Conclusion

This guide demonstrated how to:

- Run the `npm audit` command and update vulnerable dependencies.
- Commit changes to trigger a new CI/CD build.
- Configure your Jenkins pipeline to publish both HTML and JUnit reports.
- Update the Content Security Policy (CSP) in Jenkins to correctly display the HTML reports.

Following this workflow ensures that vulnerabilities are addressed promptly and that comprehensive reporting is available directly within the Jenkins UI, enhancing the overall security posture and efficiency of your development pipeline.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/7e239b62-2dfd-4594-85cf-e51c0707121c/lesson/8ad9f70b-8f1b-49da-996c-171c51006ed2)**
>
> Watch video content
