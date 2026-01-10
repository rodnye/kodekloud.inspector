# Demo Unit Test and JaCoCo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Demo-Unit-Test-and-JaCoCo)

---

## Table of Contents

- Demo Unit Test and JaCoCo
  - Prerequisites
  - 1. Review the Unit Test Cases
  - 2. Update Your Jenkinsfile to Run Unit Tests
  - 3. Configure JaCoCo in pom.xml
  - 4. Publish JUnit and JaCoCo Reports in Jenkins
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Demo Unit Test and JaCoCo

In this hands-on guide, you'll learn how to configure a Jenkins Pipeline to run unit tests on a Spring Boot application and generate code coverage reports using the JaCoCo plugin. By visualizing test results and coverage metrics directly in Jenkins, you can maintain quality gates and improve code reliability.

## Prerequisites

- A running [Jenkins](https://www.jenkins.io/) server (version 2.x or later)
- Jenkins plugins: **Pipeline**, **JUnit**, **JaCoCo** (v3.2.0+)
- A Spring Boot project with Maven build (`pom.xml`)
- Git repository with sample tests under `src/test/java`

## 1\. Review the Unit Test Cases

Navigate to `src/test/java` and inspect the `NumericApplicationTests` class. It uses MockMvc to validate HTTP endpoints:

| Test Method                        | Endpoint          | Expected Response             |
| ---------------------------------- | ----------------- | ----------------------------- |
| `smallerThanOrEqualToFiftyMessage` | GET `/compare/49` | "Smaller than or equal to 50" |
| `greaterThanFiftyMessage`          | GET `/compare/51` | "Greater than 50"             |
| `welcomeMessage`                   | GET `/`           | HTTP 200 OK                   |

```
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class NumericApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void smallerThanOrEqualToFiftyMessage() throws Exception {
        this.mockMvc.perform(get("/compare/49"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string("Smaller than or equal to 50"));
    }

    @Test
    public void greaterThanFiftyMessage() throws Exception {
        this.mockMvc.perform(get("/compare/51"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(content().string("Greater than 50"));
    }

    @Test
    public void welcomeMessage() throws Exception {
        this.mockMvc.perform(get("/"))
            .andDo(print())
            .andExpect(status().isOk());
    }
}
```

## 2\. Update Your Jenkinsfile to Run Unit Tests

Open the root `Jenkinsfile`. If you only build the artifact, insert a dedicated **Unit Tests** stage to execute `mvn test`:

```
pipeline {
    agent any

    stages {
        stage('Build - Maven') {
            steps {
                sh 'mvn clean package -DskipTests=true'
                archive 'target/*.jar'
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

Commit and push your changes to trigger a new build in Jenkins. Once the pipeline runs, you’ll see a stage summary:

![The image shows a Jenkins dashboard displaying the pipeline status for "devsecops-numeric-application," with a stage view indicating the time taken for each step: "Declarative: Checkout SCM," "Build Artifact - Maven," and "Unit Tests."](https://kodekloud.com/kk-media/image/upload/v1752873590/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Unit-Test-and-JaCoCo/jenkins-dashboard-devsecops-pipeline-status.jpg)

The console logs will confirm all tests passed:

```
[INFO] Results:
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

## 3\. Configure JaCoCo in `pom.xml`

To collect coverage data, add the JaCoCo Maven plugin under the `<build><plugins>` section:

```
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.5</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

> [!important]
> **Note**
>
> The `prepare-agent` goal instruments bytecode before tests, while the `report` goal generates HTML/XML coverage reports in `target/site/jacoco`.

## 4\. Publish JUnit and JaCoCo Reports in Jenkins

Ensure the Jenkins **JaCoCo** plugin (v3.2.0+) is installed under **Manage Jenkins → Installed Plugins**:

![The image shows the Jenkins Plugin Manager interface with the "Installed" tab open, displaying the JaCoCo and Struts plugins. The browser window has multiple tabs open, and a user is visible in a small video overlay.](https://kodekloud.com/kk-media/image/upload/v1752873591/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Unit-Test-and-JaCoCo/jenkins-plugin-manager-installed-tab.jpg)

Then, refine the **Unit Tests** stage to archive JUnit results and publish coverage:

```
pipeline {
    agent any

    stages {
        stage('Build - Maven') {
            steps {
                sh 'mvn clean package -DskipTests=true'
                archive 'target/*.jar'
            }
        }
        stage('Unit Tests & Coverage') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    // Publish JUnit results
                    junit 'target/surefire-reports/*.xml'
                    // Publish JaCoCo coverage
                    jacoco execPattern: 'target/jacoco.exec'
                }
            }
        }
    }
}
```

Commit and push again. After the build, Jenkins will display JaCoCo metrics in the console:

```
[jacoco plugin] Collecting JaCoCo coverage data...
[jacoco plugin] Overall coverage: class: 100.0, method: 71.43, line: 61.11, branch: 100.0, instruction: 40.91, complexity: 75.0
```

Navigate to the build’s **Code Coverage Report** for a breakdown by package and file:

![The image shows a Jenkins dashboard displaying a code coverage report for the package "com.devsecops," with metrics like instruction, branch, complexity, line, method, and class coverage. The report includes a coverage summary and a breakdown by source file, highlighting areas covered and missed.](https://kodekloud.com/kk-media/image/upload/v1752873593/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Unit-Test-and-JaCoCo/jenkins-dashboard-code-coverage-report.jpg)

> [!important]
> **Warning**
>
> Any untested code (e.g., methods without assertions) will show 0% coverage. Add test cases to improve your coverage metrics.

## Next Steps

With your unit tests and coverage reports in place, you can now build a Docker image for this Spring Boot application and push it to Docker Hub.

---

## Links and References

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [JaCoCo Maven Plugin](https://www.jacoco.org/jacoco/trunk/doc/maven.html)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/d50050e0-697b-41f8-85ea-20c148b0046a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/5539df88-5094-4b67-9a4d-ca81159ac2c5)**
>
> Practice lab
