# Microservices Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/kubernetes-for-the-absolute-beginners-hands-on-tutorial/Microservices-Architecture/Microservices-Architecture)

---

## Table of Contents

- Microservices Architecture
  - Application Overview
  - Deploying the Application Stack Using Docker
  - Watch Video
    - Step 1: Starting the Data Layer
    - Step 2: Deploying the Application Services
    - Step 3: Linking Containers for Intercommunication
      - Sample Code for Service Connectivity

---

## Content

Kubernetes for the Absolute Beginners - Hands-on Tutorial

Microservices Architecture

# Microservices Architecture

Welcome to this comprehensive guide on microservices architecture. In this article, we explore a sample voting web application to demonstrate how to deploy microservices on Kubernetes platforms like Google Cloud. The example uses Docker to run multiple containers, each implemented in different languages such as Python, Node.js, and .NET, showcasing how diverse components can be orchestrated to build a resilient, containerized application.

## Application Overview

The sample voting application provides two main functions:

- A user interface for casting a vote (choosing between cats or dogs).
- A results interface that displays vote counts.

The architecture consists of four primary components:

- **Voting Application (Python):** Presents voting options and sends votes.
- **Redis In-Memory Database:** Temporarily stores votes.
- **Worker Service (.NET):** Processes votes and updates the database.
- **Results Application (Node.js):** Retrieves the vote count from PostgreSQL and displays the results.

The diagram below illustrates the overall architecture and data flow of the voting application:

![The image shows a diagram of a sample voting application architecture with components: voting-app, result-app, in-memory DB, db, and worker.](https://kodekloud.com/kk-media/image/upload/v1752884958/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Microservices-Architecture/frame_60.jpg)

When a user casts a vote (for example, choosing "cat"), the flow is as follows:

1.  The voting application sends the vote to Redis.
2.  The worker service processes the vote and updates the PostgreSQL database by incrementing the count for cats.
3.  The results application fetches the updated count from PostgreSQL and displays it to the user.

For further clarity on component interactions, refer to the second diagram:

![The image shows a diagram of a sample voting application architecture, featuring components like a voting app, result app, in-memory database, and worker, using Python, Redis, and .NET.](https://kodekloud.com/kk-media/image/upload/v1752884959/notes-assets/images/Kubernetes-for-the-Absolute-Beginners-Hands-on-Tutorial-Microservices-Architecture/frame_90.jpg)

## Deploying the Application Stack Using Docker

Assuming that Docker images are already built and available in a repository, the deployment process involves starting the data layer followed by application services.

### Step 1: Starting the Data Layer

First, launch the Redis container in the background to serve as an in-memory data store. The container is given a name for easy reference:

```
docker run -d --name=redis redis
```

Next, deploy the PostgreSQL container for persistent data storage:

```
docker run -d --name=db postgres:9.4
```

### Step 2: Deploying the Application Services

Start by launching the front-end voting application. This container runs a web server on port 80, which is published to port 5000 on the host machine:

```
docker run -d --name=vote -p 5000:80 voting-app
```

Deploy the results application, mapping its port 80 to port 5001 on the host:

```
docker run -d --name=result -p 5001:80 result-app
```

Finally, launch the worker service responsible for processing the votes:

```
docker run -d --name=worker worker
```

At this stage, all containers are actively running. However, these containers do not have intrinsic knowledge of each other’s existence. For example, the voting application isn’t aware of which Redis instance it should communicate with, and the worker along with the results application are not automatically connected to the PostgreSQL database.

> [!important]
> **Note**
>
> For smooth inter-container communication, explicit linking is necessary. Docker's linking mechanism helps containers discover and communicate with each other.

### Step 3: Linking Containers for Intercommunication

Docker’s linking mechanism updates each container’s `/etc/hosts` file, enabling hostname resolution between containers. Modify the Docker run commands to include the link options as follows:

```
docker run -d --name=redis redis
docker run -d --name=db postgres:9.4
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
docker run -d --name=result -p 5001:80 --link db:db result-app
docker run -d --name=worker --link db:db worker
```

In this setup:

- The voting application is linked to the Redis container using `--link redis:redis`, allowing it to resolve the hostname "redis".
- The results application is linked to the PostgreSQL container via `--link db:db`.
- The worker service is similarly linked to the PostgreSQL container.

#### Sample Code for Service Connectivity

Below are examples of how each service connects to its corresponding dependencies:

**Python Voting Application (Connecting to Redis):**

```
def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

**Node.js Results Application (Connecting to PostgreSQL):**

```
pg.connect('postgres://postgres@db/postgres', function(err, client, done) {
    if (err) {
        console.error("Waiting for db");
    }
    callback(err, client);
});
```

**Java Worker Service (Connecting to Redis and PostgreSQL):**

```
try {
    Jedis redis = connectToRedis("redis");
    Connection dbConn = connectToDB("db");
    System.err.println("Watching vote queue");
} catch (Exception e) {
    System.err.println("Error connecting to services: " + e.getMessage());
}
```

The name-based linking provided by Docker creates entries in the container’s `/etc/hosts` file, ensuring that services can resolve hostnames (like "redis" or "db") to the corresponding container IP addresses.

> [!important]
> **Deprecated Linking**
>
> While linking demonstrates the basic concepts of service intercommunication, the `--link` option is deprecated. It is recommended to use modern Docker networking solutions such as Docker Swarm or user-defined networks for more robust and scalable container management.

This Docker deployment approach illustrates the fundamental principles of microservices intercommunication and the orchestration of diverse containers within a Docker environment.

For more detailed information on Docker networking and microservices architecture, consider exploring these additional resources:

- [Docker Networking Overview](https://docs.docker.com/network/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Microservices Architecture](https://microservices.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-for-the-absolute-beginners-hands-on-tutorial/module/a603e70d-8473-4de4-aec9-7cc76c396ad3/lesson/4252e876-ff83-4915-95b1-a42c4f67f5ad)**
>
> Watch video content
