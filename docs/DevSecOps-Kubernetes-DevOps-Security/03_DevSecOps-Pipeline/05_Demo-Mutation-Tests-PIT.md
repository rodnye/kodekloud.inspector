# Demo Mutation Tests PIT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Mutation-Tests-PIT)

---

## Table of Contents

- Demo Mutation Tests PIT
  - Table of Contents
  - 1. Configure Maven POM
  - 2. Update Jenkinsfile for Mutation Tests
  - 3. Install PIT Plugin in Jenkins
  - 4. Run Pipeline & Analyze Failures
  - 5. Inspect Coverage & Mutation Reports
  - 6. Understanding PIT Mutators
  - 7. Improve Tests to Kill Mutations
  - 8. Re-Run Mutation Tests
  - 9. Access Reports on Jenkins Agent
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Mutation Tests PIT

In this tutorial, you’ll learn how to integrate [PIT Mutation Testing](https://pitest.org/) into a Spring Boot project, execute mutation tests, and publish the HTML report in Jenkins. We’ll walk through:

1.  Configuring the Maven POM
2.  Updating the Jenkinsfile
3.  Installing and configuring the PIT plugin in Jenkins
4.  Running the pipeline and diagnosing failures
5.  Inspecting coverage and mutation results
6.  Strengthening unit tests to kill mutations
7.  Re-running tests and accessing reports

---

## Table of Contents

1.  [Configure Maven POM](#configure-maven-pom)
2.  [Update Jenkinsfile for Mutation Tests](#update-jenkinsfile-for-mutation-tests)
3.  [Install PIT Plugin in Jenkins](#install-pit-plugin-in-jenkins)
4.  [Run Pipeline & Analyze Failures](#run-pipeline--analyze-failures)
5.  [Inspect Coverage & Mutation Reports](#inspect-coverage--mutation-reports)
6.  [Understanding PIT Mutators](#understanding-pit-mutators)
7.  [Improve Tests to Kill Mutations](#improve-tests-to-kill-mutations)
8.  [Re-Run Mutation Tests](#re-run-mutation-tests)
9.  [Access Reports on Jenkins Agent](#access-reports-on-jenkins-agent)

---

## 1\. Configure Maven POM

Open your `pom.xml` and ensure you have Spring Boot and JaCoCo configured. Then add the PIT plugin:

```
<build>
  <plugins>
    <!-- 1. Spring Boot Maven Plugin -->
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>


    <!-- 2. JaCoCo for Code Coverage -->
    <plugin>
      <groupId>org.jacoco</groupId>
      <artifactId>jacoco-maven-plugin</artifactId>
      <version>0.8.5</version>
      <goals>
        <goal>prepare-agent</goal>
      </goals>
      <executions>
        <execution>
          <id>report</id>
          <phase>test</phase>
          <goals>
            <goal>report</goal>
          </goals>
        </execution>
      </executions>
    </plugin>


    <!-- 3. PIT Mutation Testing Plugin -->
    <plugin>
      <groupId>org.pitest</groupId>
      <artifactId>pitest-maven</artifactId>
      <version>1.5.0</version>
      <dependencies>
        <dependency>
          <groupId>org.pitest</groupId>
          <artifactId>pitest-junit5-plugin</artifactId>
          <version>0.12</version>
        </dependency>
      </dependencies>
      <configuration>
        <mutationThreshold>70</mutationThreshold>
        <outputFormats>
          <outputFormat>XML</outputFormat>
          <outputFormat>HTML</outputFormat>
        </outputFormats>
      </configuration>
    </plugin>
  </plugins>
</build>
```

> [!important]
> **Note**
>
> The `<mutationThreshold>` of 70% fails the build if the mutation score is below 70%. Reports are generated under `target/pit-reports`.

---

## 2\. Update Jenkinsfile for Mutation Tests

Add a dedicated stage for PIT after unit tests. Use this example pipeline:

```
pipeline {
  agent any
  stages {
    stage('Unit Tests - JUnit & JaCoCo') {
      steps {
        sh 'mvn clean package -DskipTests=true'
        archive 'target/*.jar'
      }
    }
    stage('Mutation Tests - PIT') {
      steps {
        sh 'mvn org.pitest:pitest-maven:mutationCoverage'
      }
      post {
        always {
          pitmutation mutationStatsFile: '**/target/pit-reports/**/mutations.xml'
        }
      }
    }
    stage('Docker Build & Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t myorg/app:"$GIT_COMMIT" .'
          sh 'docker push myorg/app:"$GIT_COMMIT"'
        }
      }
    }
    stage('Kubernetes Deployment - DEV') {
      steps {
        // Deployment steps
      }
    }
  }
}
```

| Stage                       | Description                        | Command                                        |
| --------------------------- | ---------------------------------- | ---------------------------------------------- |
| Unit Tests - JUnit & JaCoCo | Compile and generate coverage data | `mvn clean package -DskipTests=true`           |
| Mutation Tests - PIT        | Run mutation testing               | `mvn org.pitest:pitest-maven:mutationCoverage` |
| Docker Build & Push         | Build and push Docker image        | `docker build` / `docker push`                 |
| Kubernetes Deployment - DEV | Deploy to development cluster      | Custom kubectl or Helm commands                |

---

## 3\. Install PIT Plugin in Jenkins

1.  Go to **Manage Jenkins → Manage Plugins**
2.  Search for **PIT Mutation Plugin** and install
3.  Configure the report path:

    ```
    target/pit-reports/**/mutations.xml
    ```

![The image shows the "Manage Jenkins" dashboard, displaying various configuration and management options for Jenkins, a popular automation server.](https://kodekloud.com/kk-media/image/upload/v1752873627/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Mutation-Tests-PIT/manage-jenkins-dashboard-configuration-options.jpg)

---

## 4\. Run Pipeline & Analyze Failures

Trigger the Jenkins pipeline. If the mutation score is below threshold, the stage will fail:

![The image shows a Jenkins pipeline dashboard with a stage view, indicating a failed build due to a shell script error. It includes build history, average stage times, and a code coverage trend graph.](https://kodekloud.com/kk-media/image/upload/v1752873629/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Mutation-Tests-PIT/jenkins-pipeline-dashboard-failed-build.jpg)

```
>>> Mutators
Generated 2 Killed 1 (50%)
KILLED 1 SURVIVED 1
[ERROR] Mutation score of 40 is below threshold of 70
```

> [!important]
> **Warning**
>
> A low mutation score indicates untested code paths. Strengthen your tests to catch mutated behavior.

---

## 5\. Inspect Coverage & Mutation Reports

Even on failure, Jenkins archives test reports. View the JaCoCo summary:

![The image shows a Jenkins build page for "Build #14" with details such as build artifacts, changes, and a Jacoco coverage summary. The coverage summary includes metrics like instruction, branch, complexity, line, method, and class coverage.](https://kodekloud.com/kk-media/image/upload/v1752873630/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Mutation-Tests-PIT/jenkins-build-page-build-14-summary.jpg)

Click **PIT Mutation Report** for detailed mutation stats:

![The image shows a Jenkins dashboard with details of a mutation testing report, including active mutators and tests examined. It also displays a list of mutators like BOOLEAN_FALSE_RETURN and CONDITIONALS_BOUNDARY_MUTATOR.](https://kodekloud.com/kk-media/image/upload/v1752873631/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Mutation-Tests-PIT/jenkins-dashboard-mutation-testing-report.jpg)

---

## 6\. Understanding PIT Mutators

PIT applies _mutators_ that change your code to test the effectiveness of your tests.

Example: Conditional boundary mutator

```
// Original
if (a < b) { … }


// Mutated
if (a <= b) { … }
```

Example: Return values mutator

```
// Original
public Object foo() {
  return new Object();
}


// Mutated
public Object foo() {
  new Object();
  return null;
}
```

Surviving mutations imply missing assertions in your tests.

---

## 7\. Improve Tests to Kill Mutations

Consider this REST controller:

![The image shows a screenshot of a code editor with Java code, including REST controller methods and mutation testing results. There is also a browser window with multiple tabs open at the top.](https://kodekloud.com/kk-media/image/upload/v1752873632/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Mutation-Tests-PIT/java-code-editor-rest-controller-screenshot.jpg)

```
@RestController
public class NumericController {
  @GetMapping("/")
  public String welcome() {
    return "Kubernetes DevSecOps";
  }


  @GetMapping("/compare/{value}")
  public String compareToFifty(@PathVariable int value) {
    if (value > 50) {
      return "Greater than 50";
    } else {
      return "Smaller than or equal to 50";
    }
  }
}
```

Existing tests only checked status codes, allowing some mutations to survive.

Update your tests to assert response content:

```
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class NumericApplicationTests {


  @Autowired
  private MockMvc mockMvc;


  @Test
  public void smallerThanOrEqualToFiftyMessage() throws Exception {
    mockMvc.perform(get("/compare/50"))
      .andExpect(status().isOk())
      .andExpect(content().string("Smaller than or equal to 50"));
  }


  @Test
  public void greaterThanFiftyMessage() throws Exception {
    mockMvc.perform(get("/compare/51"))
      .andExpect(status().isOk())
      .andExpect(content().string("Greater than 50"));
  }


  @Test
  public void welcomeMessage() throws Exception {
    mockMvc.perform(get("/"))
      .andExpect(status().isOk())
      .andExpect(content().string("Kubernetes DevSecOps"));
  }
}
```

---

## 8\. Re-Run Mutation Tests

Re-trigger the pipeline. A successful mutation stage should look like:

```
> Generated 5 mutations Killed 4 (80%)
> Ran 4 tests (2.0 tests per mutation)
[INFO] BUILD SUCCESSFUL
```

You’ll see an 80% mutation score and full HTML reports.

---

## 9\. Access Reports on Jenkins Agent

On your Jenkins server:

```
sudo -i
cd /var/lib/jenkins/workspace/devsecops-numeric-application/target/pit-reports
ls
# index.html  mutations.xml
```

Open `index.html` in a browser to explore the complete mutation report.

---

Congratulations! You’ve successfully integrated PIT mutation testing, configured Jenkins for automated reporting, identified weak spots, and enhanced your tests for robust coverage.

---

## Links and References

- [PIT Mutation Testing Documentation](https://pitest.org/)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [JaCoCo Maven Plugin](https://www.eclemma.org/jacoco/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/459e5ec4-c88f-47eb-95ff-948eb4c4d414)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/c5e42e3e-37b1-4f76-a064-543b98e74c67)**
>
> Practice lab
