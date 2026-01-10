# Mutation Tests PIT Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Mutation-Tests-PIT-Basics)

---

## Table of Contents

- Mutation Tests PIT Basics
  - What Is Mutation Testing?
  - Why Use Mutation Testing Over Line Coverage?
  - Getting Started with PIT
  - Reviewing the PIT HTML Report
  - Next Steps
  - Links and References
  - Watch Video
    - Common Mutation Operators

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Mutation Tests PIT Basics

Before diving into code, let’s understand how mutation testing can reveal gaps in your Spring Boot unit tests. Unlike simple coverage metrics, mutation testing actively modifies your code to verify that tests catch real faults.

## What Is Mutation Testing?

Mutation testing introduces small, deliberate changes—_mutations_—into your application code to validate the effectiveness of your tests. After each mutation, the code is recompiled and your existing tests are run against these altered versions. Two outcomes are possible:

- **Mutation killed**: A test fails, indicating it caught the mutation.
- **Mutation survived**: All tests pass, highlighting a potential blind spot.

The **mutation score** quantifies your test suite’s fault-detection ability:

```
mutation score = (number of killed mutations) / (total number of mutations)
```

A higher score means your tests are sensitive to code changes and more likely to catch bugs before they reach production.

> [!important]
> **Note**
>
> Mutation testing doesn’t replace unit testing—it complements it. Use mutation score alongside line coverage for a fuller picture of test quality.

## Why Use Mutation Testing Over Line Coverage?

Traditional tools report which lines were executed during tests, but they can't tell if tests actually validate the logic. Mutation testing fills that gap by ensuring that tests fail when the code is faulty.

- Line coverage checks _execution_.
- Mutation testing checks _verification_.

## Getting Started with PIT

[PIT](https://pitest.org/) (Pitest) is a leading mutation testing tool for Java. To integrate PIT into your Maven-based Spring Boot project:

1.  Add the PIT plugin to your `pom.xml`:

    ```
    <build>
      <plugins>
        <plugin>
          <groupId>org.pitest</groupId>
          <artifactId>pitest-maven</artifactId>
          <version>1.10.2</version>
          <configuration>
            <targetClasses>
              <param>com.example.*</param>
            </targetClasses>
          </configuration>
        </plugin>
      </plugins>
    </build>
    ```

2.  Run PIT:

    ```
    mvn clean test org.pitest:pitest-maven:mutationCoverage
    ```

3.  Inspect the HTML report in `target/pit-reports/YYYYMMDDHHMM/index.html`.

### Common Mutation Operators

| Operator               | Description                                   | Example                          |
| ---------------------- | --------------------------------------------- | -------------------------------- |
| Arithmetic Replacement | Replaces `+`, `-`, `*`, `/` with alternatives | `a + b` → `a - b`                |
| Conditional Boundary   | Flips relational operators                    | `if (x > y)` → `if (x <= y)`     |
| Return Value           | Changes method return values                  | `return true;` → `return false;` |
| Negate Conditional     | Inverts boolean conditions                    | `if (flag)` → `if (!flag)`       |

## Reviewing the PIT HTML Report

After running mutation testing, open the generated HTML report:

![The image is an informational slide about Mutation Tests, specifically PIT tests, explaining what they are, why they are used, and how they work, with a code snippet illustrating line and mutation coverage.](https://kodekloud.com/kk-media/image/upload/v1752873723/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Mutation-Tests-PIT-Basics/mutation-tests-pit-explained-code-snippet.jpg)

Key sections in the report:

- **Overview**: Killed vs. survived mutations and overall score.
- **Source view**: Mutated code highlighted inline.
- **Test results**: Failing tests for each surviving mutant.

> [!important]
> **Warning**
>
> Mutation testing can significantly increase build time. For large codebases, run PIT in incremental mode or focus on key modules first.

## Next Steps

In the upcoming demo, we’ll:

1.  Integrate PIT into a live Spring Boot application.
2.  Execute mutation tests via Maven.
3.  Analyze surviving mutations to improve test cases.

Stay tuned for hands-on examples showing how to elevate your test suite with mutation testing!

---

## Links and References

- [PIT (Pitest) Documentation](https://pitest.org/)
- [Mutation Testing (Wikipedia)](https://en.wikipedia.org/wiki/Mutation_testing)
- [Spring Boot Official Site](https://spring.io/projects/spring-boot)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/18a4c568-e6ad-481b-a32f-3fa8646303d2)**
>
> Watch video content
