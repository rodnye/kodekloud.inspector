# Demo Docker Stack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Docker-Stack)

---

## Table of Contents

- Demo Docker Stack
  - 1. Prepare the Docker Compose File (Version 3)
  - 2. Deploy the Stack
  - 3. Inspect Running Tasks
  - 4. Access the Voting Application
  - 5. Scale the Voting Service
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Docker Stack

In this lesson, we'll deploy the Example Voting App using Docker Stacks on a Swarm cluster. We start by upgrading our Compose file to version 3, deploy it as a stack, verify running services, and then scale the voting service.

## 1\. Prepare the Docker Compose File (Version 3)

Below is the upgraded Compose file in version 3 format. Save this as `docker-stack.yml` on your Swarm manager:

```
version: '3'
services:
  redis:
    image: redis
  db:
    image: postgres:9.4
  vote:
    image: dockersamples/examplevotingapp_vote
    ports:
      - "5000:80"
  worker:
    image: dockersamples/examplevotingapp_worker
  result:
    image: dockersamples/examplevotingapp_result
    ports:
      - "5001:80"
```

The `dockersamples` images are available on Docker Hub.

![The image shows a Docker Hub profile page for "dockersamples," displaying a list of public repositories with details such as stars and pull counts.](https://kodekloud.com/kk-media/image/upload/v1752873922/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Stack/dockersamples-docker-hub-profile.jpg)

> [!important]
> **Prerequisite**
>
> Make sure Docker Swarm is initialized on your manager node:
>
> ```
> docker swarm init
> ```

## 2\. Deploy the Stack

1.  SSH into your Swarm manager and create a project directory:

    ```
    mkdir ~/voting-app-stack && cd ~/voting-app-stack
    ```

2.  Place the `docker-stack.yml` file in this directory.
3.  Deploy the stack:

    ```
    docker stack deploy voting-app-stack --compose-file docker-stack.yml
    ```

    You should see output similar to:

    ```
    Creating network voting-app-stack_default
    Creating service voting-app-stack_redis
    Creating service voting-app-stack_db
    Creating service voting-app-stack_vote
    Creating service voting-app-stack_worker
    Creating service voting-app-stack_result
    ```

Verify all services are up:

```
docker service ls
```

| Service Name               | Replicas | Image                                           |
| -------------------------- | -------- | ----------------------------------------------- |
| voting-app-stack\\\_redis  | 1/1      | redis:latest                                    |
| voting-app-stack\\\_db     | 1/1      | postgres:9.4                                    |
| voting-app-stack\\\_vote   | 1/1      | dockersamples/examplevotingapp\\\_vote:latest   |
| voting-app-stack\\\_worker | 0/1      | dockersamples/examplevotingapp\\\_worker:latest |
| voting-app-stack\\\_result | 1/1      | dockersamples/examplevotingapp\\\_result:latest |

## 3\. Inspect Running Tasks

On any manager or worker node, list the active containers to ensure tasks are distributed:

```
docker ps
```

Example output:

```
CONTAINER ID  IMAGE                                           NAMES
3940e228ce02  dockersamples/examplevotingapp_result:latest    voting-app-stack_result.1.abcde
9348d1d3d7f5  postgres:9.4                                    voting-app-stack_db.1.fghij
```

## 4\. Access the Voting Application

Open a browser and navigate to:

- Voting interface: http://<manager-ip>:5000
- Results dashboard: http://<manager-ip>:5001

![The image shows a web page titled "Cats vs Dogs!" with options to vote for either "CATS" or "DOGS," and the "CATS" option is selected.](https://kodekloud.com/kk-media/image/upload/v1752873923/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Stack/cats-vs-dogs-vote-selected.jpg)

## 5\. Scale the Voting Service

To handle higher traffic, update `docker-stack.yml` by adding the `deploy.replicas` setting under the `vote` service:

```
services:
  vote:
    image: dockersamples/examplevotingapp_vote
    ports:
      - "5000:80"
    deploy:
      replicas: 2
```

Redeploy the updated stack:

```
docker stack deploy voting-app-stack --compose-file docker-stack.yml
```

Confirm that the voting service now has two replicas:

```
docker service ls
```

| Service Name               | Replicas | Image                                           |
| -------------------------- | -------- | ----------------------------------------------- |
| voting-app-stack\\\_vote   | 2/2      | dockersamples/examplevotingapp\\\_vote:latest   |
| voting-app-stack\\\_db     | 1/1      | postgres:9.4                                    |
| voting-app-stack\\\_redis  | 1/1      | redis:latest                                    |
| voting-app-stack\\\_result | 1/1      | dockersamples/examplevotingapp\\\_result:latest |
| voting-app-stack\\\_worker | 1/1      | dockersamples/examplevotingapp\\\_worker:latest |

Inspect each task:

```
docker service ps voting-app-stack_vote
```

## Links and References

- [Docker Stack Deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/)
- [Docker Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)

This demonstrates how to deploy, verify, and scale services using Docker Stacks in a Swarm cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/65cecae8-f1e5-437c-9264-83be7864212e)**
>
> Watch video content
