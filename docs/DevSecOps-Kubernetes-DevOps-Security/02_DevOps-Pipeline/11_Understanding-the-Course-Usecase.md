# Understanding the Course Usecase - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Understanding-the-Course-Usecase)

---

## Table of Contents

- Understanding the Course Usecase
  - Node.js Microservice (Port 5000)
  - Spring Boot Microservice (Port 8080)
  - Course Roadmap
  - Links and References
  - Watch Video
    - 1. GET /
    - 2. GET /increment/{number}
    - 3. GET /compare/{number}

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Understanding the Course Usecase

In this lesson, we’ll walk through our example architecture and the HTTP endpoints each service exposes. We have two simple Dockerized microservices:

1.  A Node.js service (runs on port 5000)
2.  A Spring Boot service (runs on port 8080)

Both services communicate via REST APIs, demonstrating best practices for containerization and orchestration.

---

## Node.js Microservice (Port 5000)

This lightweight Node.js application is packaged in Docker and listens on port 5000. It offers a single endpoint:

**GET /plusone/{number}**

- **Function**: Takes an integer and returns its value plus one.
- **Example Request**:

  ```
  curl http://localhost:5000/plusone/41
  # 42
  ```

> [!important]
> **Note**
>
> Ensure Docker is running and the container is listening on port 5000 before invoking this endpoint.

---

## Spring Boot Microservice (Port 8080)

The Spring Boot application exposes three REST endpoints on port 8080. It illustrates service-to-service calls and conditional logic.

| Endpoint                | Description                                                                           | Example                                                             |
| ----------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| GET /                   | Returns a welcome message                                                             | `curl http://localhost:8080/`                                       |
| GET /increment/{number} | Forwards `{number}` to Node.js `/plusone` endpoint and returns the incremented result | `curl http://localhost:8080/increment/41` → `42`                    |
| GET /compare/{number}   | Compares `{number}` against 50 and returns a descriptive message                      | `curl http://localhost:8080/compare/77` → `"77 is greater than 50"` |

### 1\. GET /

Returns a simple greeting from the Spring Boot service:

```
curl http://localhost:8080/
# "Welcome to the Spring Boot service!"
```

### 2\. GET /increment/{number}

This endpoint demonstrates inter-service communication. It sends the provided number to the Node.js `/plusone` service and returns the incremented result.

```
curl http://localhost:8080/increment/41
# 42
```

### 3\. GET /compare/{number}

Performs a conditional check on the input number:

- If `number` ≤ 50: returns `"{number} is less than or equal to 50"`.
- If `number` > 50: returns `"{number} is greater than 50"`.

```
curl http://localhost:8080/compare/50
curl http://localhost:8080/compare/77
# "77 is greater than 50"
```

> [!important]
> **Warning**
>
> Port conflicts can occur if other services use ports 5000 or 8080. Always verify available ports before starting the containers.

---

## Course Roadmap

Throughout this course, you will:

- Containerize and Dockerize the Spring Boot application.
- Deploy Spring Boot securely on Kubernetes with best practices.
- Leverage an existing Docker image for the Node.js service.
- Explore service-to-service REST communication and error handling.

By the end, you’ll have a fully functioning microservices demo running on Kubernetes, complete with automated builds and deployments. Let’s dive in!

---

## Links and References

- [Node.js Official Site](https://nodejs.org/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/be616027-6bb3-4575-bbf7-4561ffe87d44)**
>
> Watch video content
