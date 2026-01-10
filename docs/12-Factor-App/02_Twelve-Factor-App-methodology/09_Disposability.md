# Disposability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Disposability)

---

## Table of Contents

- Disposability
  - Graceful Shutdown in Docker Containers
  - Practical Application
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Disposability

In this lesson, we explore the essential principle of disposability as outlined in the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology. Disposability means that application processes should be designed to be disposable—they can be started or stopped at a moment's notice. This ability is critical for dynamic scaling, where additional instances can be quickly provisioned as application load increases, and unnecessary processes can be terminated just as rapidly when the load decreases.

> [!important]
> **Key Insight**
>
> Disposability is not just about fast startups; it also emphasizes graceful shutdowns to handle ongoing work seamlessly.

A core aspect of disposability is the process of graceful shutdown. When a process receives a termination signal (SIGTERM) from the process manager, it must not immediately exit but rather conclude its active operations to prevent abrupt disruption. This approach ensures users experience minimal interruption, even when scaling down resources.

![The image explains the disposability principle of twelve-factor apps, highlighting their ability to start or stop quickly and shut down gracefully on receiving a SIGTERM signal.](https://kodekloud.com/kk-media/image/upload/v1752856835/notes-assets/images/12-Factor-App-Disposability/frame_40.jpg)

## Graceful Shutdown in Docker Containers

A practical example of disposability can be observed in Docker’s handling of container shutdowns. When executing the `docker stop` command, Docker sends a SIGTERM signal to the container to initiate a graceful shutdown. If the container does not respond within a certain grace period, Docker then sends a SIGKILL signal to forcefully terminate the process. This two-step mechanism ensures that the container has ample time to complete processing any active requests before termination.

```
$ docker stop <container_id>
```

The graceful shutdown process is especially crucial for applications handling multiple requests concurrently. By allowing the application to finish processing existing requests while stopping further intake, the risk of data loss or resource leaks is minimized.

## Practical Application

For instance, consider a Flask application. It should be engineered to intercept the SIGTERM signal and begin a controlled shutdown process. This design ensures that any ongoing tasks are completed before the application terminates, thereby maintaining service continuity and protecting data integrity.

> [!important]
> **Implementation Tip**
>
> Ensure your application handles SIGTERM signals properly to prevent abrupt terminations that might lead to data loss or resource leaks. Design your termination routines to complete current transactions before shutting down completely.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/5085c8e6-cb71-47d6-ab3b-cfc85ec40392)**
>
> Watch video content
