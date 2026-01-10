# SonarQube SAST - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/SonarQube-SAST)

---

## Table of Contents

- SonarQube SAST
  - Why SonarQube for SAST?
  - Installing SonarQube with Docker
  - Next Steps
  - Links and References
  - Watch Video
    - Defining Quality Gates

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# SonarQube SAST

In this lesson, we’ll explore Static Application Security Testing (SAST), also known as static analysis. SAST examines your source code to identify security vulnerabilities before runtime, scanning the application code and reporting potential issues. By contrast, Dynamic Application Security Testing (DAST) runs tests against a deployed application.

For our SAST examples, we’ll use [SonarQube](https://docs.sonarqube.org/).

## Why SonarQube for SAST?

SonarQube is an open-source platform by SonarSource that performs continuous inspection of code quality through automatic static analysis. It gives you visibility into your code by pinpointing specific lines where issues occur and offering remediation guidance. You can also enforce **quality gates**—thresholds on code metrics—to ensure that every commit meets your organization’s standards.

| Feature                   | Benefit                                                     |
| ------------------------- | ----------------------------------------------------------- |
| Code Smells Detection     | Identify code areas that need refactoring or simplification |
| Early Bug Discovery       | Catch bugs during development to reduce fix costs           |
| Quality Gates Enforcement | Prevent merges until code meets defined metrics             |

![The image is an informational slide about SonarQube, an open-source platform for code quality inspection, highlighting its benefits, problems it addresses, and solutions like quality gates. It includes a screenshot of a code analysis and a table of conditions on code metrics.](https://kodekloud.com/kk-media/image/upload/v1752873727/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-SonarQube-SAST/sonarqube-code-quality-inspection-slide.jpg)

### Defining Quality Gates

With quality gates, you can set conditions such as:

- Number of **code smells**
- Number of **security hotspots**
- **Code coverage** percentage

If any condition fails, the build is marked as failed—blocking merges until all checks pass.

## Installing SonarQube with Docker

A quick way to get SonarQube up and running is via the official Docker image. Run:

```
docker run -d \
  --name sonarqube \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  -p 9000:9000 \
  sonarqube:latest
```

> [!important]
> **Note**
>
> The environment variable `SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true` disables Elasticsearch bootstrap checks for development environments. Do **not** use this in production.

Once the container launches, tail the logs:

```
docker logs -f sonarqube
```

Sample output:

```
2021.06.17 07:13:55 INFO  web[][o.s.s.i.AsyncIssueIndexingImpl] 0 completed indexation task found to be deleted...
2021.06.17 07:13:55 INFO  web[][o.s.s.e.IndexerStartupTask] Indexing of types [components/auth],[projectmeasures/auth],[issues/auth] done | time=91ms
2021.06.17 07:13:56 INFO  app[][o.s.p.PlatformLevelStartup] Running Community Edition
2021.06.17 07:13:56 INFO  app[][o.s.a.SchedulerImpl] Process[web] is up
2021.06.17 07:13:58 INFO  ce[][o.s.ce.app.CeServer] Compute Engine is starting up...
2021.06.17 07:13:59 INFO  ce[][o.s.ce.app.Database] Create JDBC task for local Elasticsearch: [http://localhost:9001]
2021.06.17 07:13:59 INFO  app[][o.s.a.SchedulerImpl] SonarQube is up
```

After SonarQube starts, open your browser to `http://<your-host>:9000`. The default credentials are `admin`/`admin`.

## Next Steps

We will now integrate SonarQube into a Jenkins pipeline to automate static security analysis on every build.

---

## Links and References

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/0d627e92-97b1-4698-9df5-6537860d9859)**
>
> Watch video content
