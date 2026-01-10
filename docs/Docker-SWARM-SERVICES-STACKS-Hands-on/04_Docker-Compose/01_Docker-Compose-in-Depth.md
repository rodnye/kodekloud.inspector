# Docker Compose in Depth - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Compose/Docker-Compose-in-Depth)

---

## Table of Contents

- Docker Compose in Depth
  - Recap: Docker Run vs Docker Compose
  - The Sample Voting Application
  - Deploying the Application on a Single Docker Host
  - Converting Docker Run Commands to a Docker Compose File
  - Evolving Compose File Versions
  - Docker Compose Networking
  - Conclusion
  - Watch Video
    - Application Overview
    - The Linking Problem

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Compose

# Docker Compose in Depth

Welcome to this comprehensive guide on Docker Compose. I'm Mumshad Mannambeth, and in this lesson, we'll take a deep dive into advanced Docker concepts using Docker Compose. Previously, you were introduced to a high-level view of Docker Compose; now we’ll explore its intricacies and practical applications.

Before proceeding, ensure you have a good understanding of YAML—our configuration files will be written in YAML. If you need a refresher, consider reviewing YAML fundamentals through detailed tutorials and coding exercises.

## Recap: Docker Run vs Docker Compose

Earlier lessons covered how to launch a Docker container using the `docker run` command. For more complex applications involving multiple services, Docker Compose simplifies orchestration by allowing you to define all the required services and configurations in a single YAML file (commonly named `docker-compose.yml`). You can then start the entire stack with:

```
docker-compose up
```

Consider this basic example of running a multi-container application with separate Docker run commands:

```
docker
docker run mmumshad/simple-webapp
docker run mongodb
docker run redis:alpine
docker run ansible
```

Using Docker Compose, the equivalent setup is defined as:

```
# docker-compose.yml
services:
  web:
    image: "mmumshad/simple-webapp"
  database:
    image: "mongodb"
  messaging:
    image: "redis:alpine"
  orchestration:
    image: "ansible"
```

Then, simply start the stack with:

```
docker-compose up
```

Let’s now examine a more comprehensive example.

## The Sample Voting Application

We will use a popular voting application to illustrate a multi-service Docker setup. This sample architecture demonstrates various Docker features and best practices.

![A person stands beside a diagram of a sample voting application architecture, showing components like voting-app, result-app, in-memory DB, db, and worker.](https://kodekloud.com/kk-media/image/upload/v1752874070/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Compose-in-Depth/frame_140.jpg)

### Application Overview

The voting application comprises the following primary components:

- **Voting App:** A Python-based web application that lets users vote (e.g., select between cat or dog). Votes are temporarily stored in Redis.
- **Redis:** Acts as an in-memory database to hold votes temporarily.
- **Worker:** A .NET application that processes votes from Redis and updates a persistent PostgreSQL database.
- **PostgreSQL:** Stores vote counts permanently.
- **Result App:** A Node.js-based web application that reads vote data from PostgreSQL and displays the results.

![Diagram of a voting application architecture using Python, Redis, .NET, and PostgreSQL, showing components and data flow with a voting result for cats and dogs.](https://kodekloud.com/kk-media/image/upload/v1752874071/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Compose-in-Depth/frame_210.jpg)

This architecture clearly illustrates Docker’s versatility—enabling multi-service applications across various languages and platforms.

## Deploying the Application on a Single Docker Host

First, deploy each service using individual Docker run commands. Assume that all images have been built and are available on Docker Hub or your private registry. We will start with the data layer:

1.  **Redis Instance:** Run the Redis container in detached mode and name it "redis".
2.  **PostgreSQL Instance:** Run the PostgreSQL container (version 9.4) in detached mode and name it "db".

Next, launch the application services:

- **Voting App:** Run the voting app container, name it "vote", and map container port 80 to host port 5000.
- **Result App:** Run the result-app container, name it "result", and map container port 80 to host port 5001.
- **Worker Service:** Run the worker container and name it "worker".

The commands are as follows:

```
docker run -d --name=redis redis
docker run -d --name=db postgres:9.4
docker run -d --name=vote -p 5000:80 voting-app
```

```
docker run -d --name=result -p 5001:80 result-app
docker run -d --name=worker worker
```

### The Linking Problem

Even though all containers are running, they cannot communicate by default. For example, the voting app does not know which Redis instance to connect to, and similarly, other containers remain isolated. Container linking solves this issue.

To link the voting app to the Redis container, modify the vote container’s command to include the `--link` option:

```
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
```

This command updates the `/etc/hosts` file inside the voting app container to map the hostname "redis" to the Redis container’s internal IP address. Similarly, link containers for the result app and worker:

```
docker run -d --name=redis redis
docker run -d --name=db postgres:9.4
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
docker run -d --name=result -p 5001:80 --link db:db result-app
docker run -d --name=worker --link db:db --link redis:redis worker
```

In the voting app’s source code, the Redis connection might be handled like this:

```
def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

And in the worker code, linking is used as follows:

```
try {
    Jedis redis = connectToRedis("redis");
    Connection dbConn = connectToDB("db");
    System.err.println("Watching vote queue");
}
```

> [!important]
> **Deprecated Linking**
>
> Note that container linking is now deprecated. Modern Docker networking and Swarm features provide more robust and flexible ways for container communication.

## Converting Docker Run Commands to a Docker Compose File

Once you are comfortable with the Docker run commands, the next step is to translate them into a Docker Compose file. This involves:

1.  Defining entries for each service with the same container names as used in your Docker run commands.
2.  Specifying the Docker images or build instructions.
3.  Configuring port mapping using the `ports` property.
4.  Including the `links` option where necessary.

Here’s a sample Compose file using images directly:

```
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
    - 5000:80
  links:
    - redis
result:
  image: result-app
  ports:
    - 5001:80
  links:
    - db
worker:
  image: worker
  links:
    - redis
    - db
```

To build images from local Dockerfiles rather than pulling from a registry, replace the `image` key with a `build` key as follows:

```
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  build: ./vote
  ports:
    - 5000:80
  links:
    - redis
result:
  build: ./result
  ports:
    - 5001:80
  links:
    - db
worker:
  build: ./worker
  links:
    - redis
    - db
```

Running `docker-compose up` with this file will build the images (if required) and start the containers with the defined configurations.

## Evolving Compose File Versions

Docker Compose file formats have evolved through three primary versions:

- **Version 1:** Had limitations such as no support for custom networks and no control over container startup order.
- **Version 2:** Introduced several improvements, including a dedicated `services` section, explicit version declaration (e.g., `version: '2'`), enhanced networking features, and the `depends_on` option to control the order in which services start.
- **Version 3:** Builds upon version 2 while adding support for Docker Swarm. In version 3, you declare the version at the top (e.g., `version: '3'`) and define services under the `services` section. Some options have been modified or removed; please refer to the official documentation for a detailed comparison.

Below are examples of all three versions:

```
# version: 1
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
    - 5000:80
  links:
    - redis
```

```
# version: 2
version: '2'
services:
  redis:
    image: redis
  db:
    image: postgres:9.4
  vote:
    image: voting-app
    ports:
      - 5000:80
    depends_on:
      - redis
```

```
# version: 3
version: '3'
services:
  redis:
    image: redis
  db:
    image: postgres:9.4
  vote:
    image: voting-app
    ports:
      - 5000:80
```

## Docker Compose Networking

Enhance your Docker Compose setup by segregating external user traffic from internal service communication. For this scenario, we will define two distinct networks:

- **Front End Network:** Dedicated to external (user-generated) traffic.
- **Back End Network:** Facilitates internal communication between services.

In this configuration, the voting app and result app are connected to both networks, whereas Redis and PostgreSQL are attached only to the back end network.

Below is an example Compose file demonstrating this network setup (port mappings are omitted for clarity):

```
version: 2
services:
  redis:
    image: redis
    networks:
      - back-end
  db:
    image: postgres:9.4
    networks:
      - back-end
  vote:
    image: voting-app
    networks:
      - front-end
      - back-end
  result:
    image: result
    networks:
      - front-end
      - back-end
networks:
  front-end:
  back-end:
```

If additional services (such as the worker) are part of your architecture, ensure you assign them to the appropriate networks.

## Conclusion

You now have a detailed overview of Docker Compose—from using basic container linking to translating Docker run commands into a Compose file, and from exploring Compose file versions to implementing advanced networking. Put this knowledge into practice, and try building your own Compose files and networking configurations.

![A person stands beside a presentation slide titled "Coding Exercises," listing tasks related to Docker compose files and networking.](https://kodekloud.com/kk-media/image/upload/v1752874072/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Docker-Compose-in-Depth/frame_1130.jpg)

Happy learning, and I look forward to seeing you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/43e8db99-9bc6-4277-88b0-a6f699d2fd76/lesson/66928578-103f-4752-84d7-ecac9a33e95c)**
>
> Watch video content
