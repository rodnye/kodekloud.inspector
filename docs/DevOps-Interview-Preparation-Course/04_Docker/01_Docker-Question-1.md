# Docker Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Docker/Docker-Question-1)

---

## Table of Contents

- Docker Question 1
  - Viewing Container Logs
  - Filtering Logs to the Last 200 Lines
  - Useful Links and References
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Docker

# Docker Question 1

In this article, you'll learn how to view logs from a Docker container and filter the output to display only the last 200 lines. This technique is essential for debugging, routine maintenance, or preparing for DevOps and containerization interviews.

When working with Docker on a daily basis, getting accustomed to frequently used commands is crucial. One of the most common tasks is checking container logs. While the base command is straightforward, you can fine-tune it with additional arguments to display only a specific portion of the output—like the last 200 lines. This approach eliminates the need to scroll through a large number of log entries unnecessarily.

> [!important]
> **Tip**
>
> Using the `--tail` flag is very effective in focusing on recent events in the container log, which can be particularly useful when troubleshooting issues.

## Viewing Container Logs

To display the logs of a specific container, use the following command:

```
docker container logs <container_name>
```

Replace `<container_name>` with the appropriate name or identifier of your container. For example, if you're investigating the logs for a container named "webapp," substitute it accordingly.

## Filtering Logs to the Last 200 Lines

To refine your log output and display just the last 200 lines, append the `--tail` flag as shown below:

```
docker container logs --tail 200 <container_name>
```

This modified command ensures that you only see the most recent portion of the logs, which streamlines troubleshooting and debugging processes.

## Useful Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)

By mastering these commands, you can efficiently navigate Docker logs in both routine and high-pressure troubleshooting scenarios.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/955d2fcf-4c92-4480-b86e-081d67d83e88/lesson/0a74b90c-33d9-4499-ac9b-ae4acbcf2a34)**
>
> Watch video content
