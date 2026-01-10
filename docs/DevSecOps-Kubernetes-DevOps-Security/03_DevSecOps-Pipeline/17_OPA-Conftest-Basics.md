# OPA Conftest Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/OPA-Conftest-Basics)

---

## Table of Contents

- OPA Conftest Basics
  - What Are OPA and Conftest?
  - Sample Dockerfile
  - Writing a Rego Policy for Dockerfiles
  - Common Dockerfile Best Practices
  - Running Conftest
  - Further Reading & References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# OPA Conftest Basics

When it comes to container security and vulnerability management, linting your Dockerfiles against policy-as-code rules is essential. In this guide, we’ll show you how to use [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) and [Conftest](https://github.com/open-policy-agent/conftest) to enforce Docker best practices automatically.

## What Are OPA and Conftest?

**Open Policy Agent (OPA)**  
OPA is a versatile, open-source policy engine that lets you define and enforce policies across your stack. You express rules in the Rego language and integrate OPA with your CI/CD pipelines or CLI tools.

**Conftest**  
Conftest is a command-line utility that uses OPA under the hood to test structured configuration files. It supports Dockerfiles, Kubernetes manifests, Terraform code, JSON, YAML, and more. You write Rego policies and run `conftest test` to verify compliance.

## Sample Dockerfile

Below is a simple Java application Dockerfile. Notice it uses the `latest` tag, which we’ll target in our policy:

```
FROM openjdk:latest
EXPOSE 8080
ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

> [!important]
> **Warning**
>
> Using the `latest` tag in production images can lead to unpredictable builds and security risks. Always pin to a specific, immutable version.

## Writing a Rego Policy for Dockerfiles

Create a file named `docker.rego` in your workspace:

```
package main


deny[msg] {
  input[i].Cmd == "from"
  val := split(input[i].Value[0], ":")
  contains(lower(val[1]), "latest")
  msg := sprintf("Line %d: do not use 'latest' tag for base images", [i])
}
```

How it works:

- `input[i].Cmd == "from"` locates every `FROM` instruction.
- `split(input[i].Value[0], ":")` separates the image name from its tag.
- `contains(lower(val[1]), "latest")` checks for the forbidden tag.
- When matched, it emits a denial message with the line number.

## Common Dockerfile Best Practices

| Best Practice      | Rule Identifier  | Description                                                 |
| ------------------ | ---------------- | ----------------------------------------------------------- |
| Pin Base Image Tag | `base_image_tag` | Prevent use of `latest` for consistent, reproducible builds |
| Use Minimal Images | `minimal_image`  | Encourage slim or distroless variants                       |
| Avoid Root User    | `no_root_user`   | Enforce a non-root `USER` for improved container security   |

> [!important]
> **Note**
>
> You can extend your Rego file to cover these additional rules or write new policies for other Dockerfile instructions.

## Running Conftest

Run the policy against your Dockerfile using the official Conftest Docker image:

```
docker run --rm -v "$PWD":/workspace -w /workspace openpolicyagent/conftest test \
  --policy docker.rego Dockerfile
```

On failure, you’ll see output like this:

```
FAIL - Dockerfile - main - Line 0: do not use 'latest' tag for base images


1 tests, 0 passed, 0 warnings, 1 failures, 0 exceptions
```

To fix the failure, update the `FROM` line:

```
FROM openjdk:11-jre-slim
```

Re-run the test, and you should see no failures.

## Further Reading & References

- [Open Policy Agent Documentation](https://www.openpolicyagent.org/docs/latest/)
- [Conftest GitHub Repository](https://github.com/open-policy-agent/conftest)
- [Dockerfile Best Practices Guide](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Rego Policy Language Overview](https://www.openpolicyagent.org/docs/latest/policy-language/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/c91dcacf-71d8-4ddb-91eb-192d59f1a313)**
>
> Watch video content
