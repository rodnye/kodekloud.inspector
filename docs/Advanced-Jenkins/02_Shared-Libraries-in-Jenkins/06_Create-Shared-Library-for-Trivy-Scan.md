# Create Shared Library for Trivy Scan - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Shared-Libraries-in-Jenkins/Create-Shared-Library-for-Trivy-Scan)

---

## Table of Contents

- Create Shared Library for Trivy Scan
  - Objectives
  - 1. Clone the Shared Libraries Repository
  - 2. Create a Feature Branch
  - 3. Review the Existing Jenkinsfile Stage
  - 4. Create vars/TrivyScan.groovy
  - 5. Commit and Push Your Changes
  - Next Steps
  - Links and References
  - Watch Video
    - Shared Library Methods at a Glance

---

## Content

Advanced Jenkins

Shared Libraries in Jenkins

# Create Shared Library for Trivy Scan

In this guide, you’ll learn how to extract Trivy vulnerability scanning logic into a reusable Jenkins Shared Library. By the end, you will be able to:

- Version and maintain your scanning scripts centrally
- Simplify your Jenkinsfiles across multiple repositories
- Generate HTML and JUnit XML reports for scan results

## Objectives

1.  Clone the `shared-libraries` repository
2.  Create a new feature branch
3.  Review the existing Trivy stage in your Jenkinsfile
4.  Implement `vars/TrivyScan.groovy` with two methods
5.  Commit and push your changes

---

## 1\. Clone the Shared Libraries Repository

First, clone the central library repository where your custom steps live.

```
git clone http://64.227.187.25:5555/dasher-org/shared-libraries.git
cd shared-libraries
ls
# → vars
```

> [!important]
> **Note**
>
> Make sure you have the necessary Git credentials set up or an SSH key configured to avoid authentication errors.

---

## 2\. Create a Feature Branch

Branch off `main` (or your default branch) to implement the Trivy scan logic.

```
git checkout -b feature/TrivyScan
```

---

## 3\. Review the Existing Jenkinsfile Stage

Here’s the current `Trivy Vulnerability Scanner` stage in the Solar System project’s `Jenkinsfile`:

```
stage('Trivy Vulnerability Scanner') {
    steps {
        sh '''
            trivy image siddharth67/solar-system:$GIT_COMMIT \
                --severity LOW,MEDIUM,HIGH \
                --exit-code 0 \
                --quiet \
                --format json -o trivy-image-MEDIUM-results.json


            trivy image siddharth67/solar-system:$GIT_COMMIT \
                --severity CRITICAL \
                --exit-code 1 \
                --quiet \
                --format json -o trivy-image-CRITICAL-results.json
        '''
    }
    post {
        // conversions and reports go here
    }
}
```

We want to remove this inlined logic and replace it with calls to our Shared Library.

---

## 4\. Create `vars/TrivyScan.groovy`

Under `shared-libraries/vars`, add a new file named `TrivyScan.groovy` with two methods: one for scanning vulnerabilities, and one for converting the JSON output into HTML and JUnit XML.

```
// vars/TrivyScan.groovy


def vulnerability(String imageName) {
    sh """
        echo "🔍 Scanning image: ${imageName}"


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
    sh """
        # Generate HTML reports
        trivy convert \
            --format template \
            --template "/usr/local/share/trivy/templates/html.tpl" \
            --output trivy-image-MEDIUM-results.html \
            trivy-image-MEDIUM-results.json


        trivy convert \
            --format template \
            --template "/usr/local/share/trivy/templates/html.tpl" \
            --output trivy-image-CRITICAL-results.html \
            trivy-image-CRITICAL-results.json


        # Generate JUnit XML reports
        trivy convert \
            --format template \
            --template "/usr/local/share/trivy/templates/junit.tpl" \
            --output trivy-image-MEDIUM-results.xml \
            trivy-image-MEDIUM-results.json


        trivy convert \
            --format template \
            --template "/usr/local/share/trivy/templates/junit.tpl" \
            --output trivy-image-CRITICAL-results.xml \
            trivy-image-CRITICAL-results.json
    """
}
```

### Shared Library Methods at a Glance

| Method               | Purpose                                            | Output Files                                                              |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| `vulnerability()`    | Runs HIGH, MEDIUM, LOW & CRITICAL scans            | `trivy-image-MEDIUM-results.json`,<br>`trivy-image-CRITICAL-results.json` |
| `reportsConverter()` | Converts JSON to HTML & JUnit XML report templates | `.html` and `.xml` reports for both severity levels                       |

> [!important]
> **Warning**
>
> Ensure your Jenkins agents have Trivy installed and the template files are accessible at `/usr/local/share/trivy/templates/`. Otherwise, the conversion step will fail.

---

## 5\. Commit and Push Your Changes

Once your library file is in place:

```
git add vars/TrivyScan.groovy
git commit -m "feat(shared-library): add TrivyScan with vulnerability and reportsConverter methods"
git push -u origin feature/TrivyScan
```

---

## Next Steps

1.  **Integrate** `TrivyScan.vulnerability(imageName)` and `TrivyScan.reportsConverter()` into your project’s `Jenkinsfile`.
2.  **Tag** or **merge** your branch when you’re ready to release the Shared Library.
3.  **Monitor** the generated reports in your CI/CD pipeline and enforce policies based on exit codes.

---

## Links and References

- [Jenkins Shared Library Documentation](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Trivy: A Simple and Comprehensive Vulnerability Scanner](https://aquasecurity.github.io/trivy/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/7e7be52f-69f5-496b-8a46-322d6b8df0ce/lesson/8e36e1f3-ba16-4970-b9b4-dad58add4cf4)**
>
> Watch video content
