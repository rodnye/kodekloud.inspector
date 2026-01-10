# Unit Tests Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Unit-Tests-Basics)

---

## Table of Contents

- Unit Tests Basics
  - Running Unit Tests with Maven
  - Measuring Code Coverage with JaCoCo
  - Links and References
  - Watch Video
    - 1. Add the JaCoCo Plugin
    - 2. Generate the Report

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Unit Tests Basics

Unit testing is a software development practice where individual units—such as functions, methods, or classes—are tested in isolation to ensure they behave as expected. By adopting unit tests early, teams can:

| Benefit                        | Description                                                           |
| ------------------------------ | --------------------------------------------------------------------- |
| Early Defect Detection         | Identify bugs at the development stage before they propagate.         |
| Faster Feedback Loop           | Run tests quickly and fix issues immediately.                         |
| Lower Maintenance Costs        | Catching issues early reduces expensive, late-stage fixes.            |
| Improved Code Quality & Design | Writing tests encourages cleaner, modular code and better API design. |

## Running Unit Tests with Maven

In a Maven-based project, execute all unit tests with:

```
mvn test
```

Maven automatically scans `src/test/java` (and any additional test directories you’ve configured), runs tests, and fails the build if any test does not pass:

```
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[ERROR] Tests run: 3, Failures: 1, Errors: 0, Skipped: 0
[INFO] -------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] -------------------------------------------------------
[INFO] Total time:  30.123 s
[INFO] Finished at: 2024-06-15T14:22:10+00:00
[INFO] -------------------------------------------------------
```

> [!important]
> **Note**
>
> By default, Maven looks for test classes matching `**/*Test.java` under `src/test/java`. You can customize this in the `<build><plugins>` section of your `pom.xml`.> [!important]
> **Warning**
>
> A failing test will stop the Maven build. Ensure you fix or temporarily disable flaky tests to keep CI pipelines green.

## Measuring Code Coverage with JaCoCo

[JaCoCo](https://www.eclemma.org/jacoco/) is the de facto tool for generating Java code coverage reports. When integrated into Maven, it produces detailed HTML reports showing line and branch coverage.

### 1\. Add the JaCoCo Plugin

Include the following snippet in your `pom.xml` under `<build><plugins>`:

```
<plugin>
  <groupId>org.jacoco</groupId>
  <artifactId>jacoco-maven-plugin</artifactId>
  <version>0.8.10</version>
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
> You can configure coverage thresholds to enforce minimum percentages. If thresholds are not met, the build will fail.

### 2\. Generate the Report

Run your tests and generate the coverage report:

```
mvn clean test
```

After completion, open:

```
target/site/jacoco/index.html
```

to view:

- **Overall Coverage:** Total percentage of covered code.
- **Per-Package/Class Breakdown:** Drill down into modules.
- **Covered vs. Uncovered Lines:** Visual indicators in source code.

| Report Section | Description                               |
| -------------- | ----------------------------------------- |
| Summary        | High-level percentages for lines/branches |
| Packages       | Coverage grouped by Java packages         |
| Classes        | Detailed per-class metrics                |
| Source Code    | Color-coded, line-by-line coverage view   |

## Links and References

- [JaCoCo Official Site](https://www.eclemma.org/jacoco/)
- [Maven Surefire Plugin](https://maven.apache.org/surefire/maven-surefire-plugin/)
- [JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/aba08a1a-e011-499a-b5ab-eb79a2e21d47)**
>
> Watch video content
