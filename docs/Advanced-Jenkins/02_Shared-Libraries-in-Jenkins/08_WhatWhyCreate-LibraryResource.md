# WhatWhyCreate LibraryResource - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/WhatWhyCreate-LibraryResource)

---

## Table of Contents

- WhatWhyCreate LibraryResource
  - 1. The Hardcoded Approach
  - 2. Extracting a Parameterized Shell Script
  - 3. Creating a Generic Loader: loadScript.groovy
  - 4. Wiring It Together: TrivyScanScript.groovy
  - 5. Invoking from a Jenkinsfile
  - 6. Summary
  - Links and References
  - Watch Video
    - File Structure
    - resources/scripts/trivy.sh

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# WhatWhyCreate LibraryResource

Library Resources let you bundle non-Groovy static assets—such as shell scripts, YAML files, or configuration templates—inside your shared library’s `resources` directory. By using the `libraryResource` step in Jenkins pipelines, you can load these files at runtime, write them to the workspace, and execute or parse them as needed.

In this guide, we’ll replace multiple hard-coded Trivy scan invocations with a single parameterized shell script (`trivy.sh`) stored under `resources/scripts`. You’ll learn how to load it dynamically from your shared library, keeping your pipeline code DRY and maintainable.

---

## 1\. The Hardcoded Approach

Here’s a typical `vars/TrivyScan.groovy` with duplicated logic for different severities:

```
// vars/TrivyScan.groovy
def vulnerability(String imageName) {
    sh """
    trivy image ${imageName} \
        --severity LOW,MEDIUM,HIGH \
        --exit-code 0 \
        --quiet \
        --format json -o trivy-image-MEDIUM-results.json

    trivy image ${imageName} \
        --severity CRITICAL \
        --exit-code 1 \
        --quiet \
        --format json -o trivy-image-CRITICAL-results.json
    """
}

def reportsConverter() {
    sh '''
    trivy convert \
        --format template --template "@/usr/local/share/trivy/templates/html.tpl"
    '''
}
```

Each variation (severity, exit code, output) requires its own method or string interpolation—leading to code duplication and maintenance headaches.

---

## 2\. Extracting a Parameterized Shell Script

Instead of embedding multiple commands in Groovy, create a flexible Bash script that accepts arguments:

### File Structure

| Path                          | Description                                |
| ----------------------------- | ------------------------------------------ |
| `resources/scripts/trivy.sh`  | Parameterized Trivy scan script            |
| `vars/loadScript.groovy`      | Generic loader for any script in resources |
| `vars/TrivyScanScript.groovy` | Entry point for vulnerability scans        |

### resources/scripts/trivy.sh

```
#!/bin/bash
#
# Usage:
#   trivy.sh <imageName> <severity> <exitCode>
#

echo "imageName  = $1"
echo "severity   = $2"
echo "exitCode   = $3"

trivy image "$1" \
  --severity "$2" \
  --exit-code "$3" \
  --quiet \
  --format json \
  -o "trivy-image-$2-results.json"
```

> [!important]
> **Warning**
>
> Ensure you commit `trivy.sh` with executable permissions (`chmod +x trivy.sh`). Otherwise, Jenkins won’t be able to run it.

---

## 3\. Creating a Generic Loader: `loadScript.groovy`

Place the following in `vars/loadScript.groovy`. This step reads any file from `resources/scripts` and writes it to the workspace:

```
// vars/loadScript.groovy
def call(Map config = [:]) {
    // config.name: filename under resources/scripts (e.g. "trivy.sh")
    def scriptData = libraryResource "scripts/${config.name}"
    writeFile file: config.name, text: scriptData
    sh "chmod +x ./${config.name}"
}
```

- `libraryResource`: Reads the script content as a string.
- `writeFile`: Persists it to the workspace.
- `chmod +x`: Makes it executable.

For more details, see [Jenkins libraryResource documentation](https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#libraryresource-read-a-resource-file-from-a-shared-library).

---

## 4\. Wiring It Together: `TrivyScanScript.groovy`

Use your generic loader and invoke the script with parameters:

```
// vars/TrivyScanScript.groovy
def vulnerability(Map config = [:]) {
    // Load trivy.sh from resources/scripts
    loadScript(name: 'trivy.sh')

    // Execute the script with user-supplied arguments
    sh "./trivy.sh ${config.imageName} ${config.severity} ${config.exitCode}"
}
```

- `config.imageName`, `config.severity`, `config.exitCode` are passed from the Jenkinsfile.
- Omitting any required key triggers a clear Groovy map-handling error.

> [!important]
> **Note**
>
> You can extend this pattern to other scripts or configuration files without changing your library code.

---

## 5\. Invoking from a Jenkinsfile

Here’s how to call your new step in a declarative pipeline:

```
@Library('shared-libraries') _
pipeline {
    agent any

    stages {
        stage('Vulnerability Scan') {
            steps {
                TrivyScanScript.vulnerability(
                    imageName: 'nginx:latest',
                    severity: 'HIGH',
                    exitCode: 1
                )
            }
        }
    }
}
```

---

## 6\. Summary

1.  **Extract** repeated shell logic into `resources/scripts/trivy.sh`.
2.  **Load** it via a generic `loadScript` step using `libraryResource`.
3.  **Invoke** it parametrically in your Groovy entrypoint (`TrivyScanScript.groovy`).
4.  **Customize** severity levels, exit codes, and image names without editing library code.

By following this pattern, your shared library remains DRY, maintainable, and flexible for future scan configurations.

---

## Links and References

- [Jenkins libraryResource Step](https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#libraryresource)
- [Trivy Official Documentation](https://aquasecurity.github.io/trivy/)
- [Jenkins Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/dd173275-f464-4683-8c25-25d686512181)**
>
> Watch video content
