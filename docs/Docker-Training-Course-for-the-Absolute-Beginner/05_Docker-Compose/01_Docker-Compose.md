# Docker Compose - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Compose/Docker-Compose)

---

## Table of Contents

- Docker Compose
  - Running Individual Containers with Docker Run
  - Sample Application: Voting App Architecture
  - Deploying the Application Using Docker Run
  - Linking Containers
  - Transitioning to Docker Compose
  - Understanding Docker Compose File Versions
  - Configuring Networks in Docker Compose
  - Conclusion
  - Watch Video
    - Example: Basic Docker Compose Configuration
    - Voting Application Components
    - Accessing Linked Containers in Code
    - Docker Run Commands Recap
    - Equivalent Docker Compose File
    - Version 1
    - Version 2
    - Version 3
    - Example: Defining Separate Networks

---

## Content

Docker Training Course for the Absolute Beginner

Docker Compose

# Docker Compose

Welcome to this comprehensive guide on Docker Compose. In this article, you'll learn how to configure and run multi-container Docker applications using YAML configuration files. A solid understanding of YAML is essential since Compose files are entirely written in this format.

## Running Individual Containers with Docker Run

Before diving into Docker Compose, let's review how to run individual Docker containers using the `docker run` command. For simple containers, you may execute commands like the following:

```
docker run mmunshad/simple-webapp
docker run mongodb
docker run redis:alpine
docker run ansible
```

When your application consists of multiple services, managing each container separately can become cumbersome. Docker Compose streamlines this process by allowing you to define all required services in a single YAML file (commonly named `docker-compose.yml`). You can then launch the complete stack with the `docker-compose up` command.

### Example: Basic Docker Compose Configuration

Below is an example Docker Compose file that defines multiple services:

```
# docker-compose.yml
services:
  web:
    image: "mmunshad/simple-webapp"
  database:
    image: "mongodb"
  messaging:
    image: "redis:alpine"
  orchestration:
    image: "ansible"
```

Start your multi-container application with:

```
docker-compose up
```

> [!important]
> **Note**
>
> These instructions assume that you are running containers on a single Docker host. We'll explore more details about YAML file structures further in this guide.

---

## Sample Application: Voting App Architecture

To illustrate Docker Compose in practice, consider a sample voting application. This application demonstrates how Docker can integrate services built with different programming languages and frameworks.

### Voting Application Components

- **Python Front-End:** A web interface that lets users vote between options (e.g., cat or dog). Votes are stored in a Redis instance, serving as an in-memory database.
- **.NET Worker:** A background service that processes votes and updates a PostgreSQL database with the vote counts.
- **Node.js Back-End:** A web application that displays voting results by reading data from PostgreSQL.

Below is the diagram that outlines the voting application's architecture and data flow:

![The image shows a sample voting application architecture with components using Python, Redis, .NET, and PostgreSQL, displaying a vote count for cats and dogs.](https://kodekloud.com/kk-media/image/upload/v1752874136/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Compose/frame_170.jpg)

This architecture clearly demonstrates Docker's versatility in handling services developed in languages such as Python, Node.js, and .NET.

---

## Deploying the Application Using Docker Run

To get started, let’s deploy each layer of the voting application using individual Docker run commands. This example assumes that all necessary images are available in your Docker repository.

1.  **Start a Redis Container:**

    ```
    docker run -d --name=redis redis
    ```

2.  **Deploy the PostgreSQL Database:**

    ```
    docker run -d --name=db postgres
    ```

3.  **Deploy the Voting Application (Front-End):**

    Map the container's port 80 to host port 5000.

    ```
    docker run -d --name=vote -p 5000:80 voting-app
    ```

4.  **Deploy the Results Web Application (Back-End):**

    Map the container's port 80 to host port 5001.

    ```
    docker run -d --name=result -p 5001:80 result-app
    ```

5.  **Deploy the Worker Container:**

    ```
    docker run -d --name=worker worker
    ```

At this point, all containers are running. However, they are isolated—meaning the voting app does not know where to locate the associated Redis or PostgreSQL service.

---

## Linking Containers

To enable communication between containers, use the `--link` option. This option creates an entry in the container's `/etc/hosts` file for resolving the linked service by name.

For example, link the voting app container to Redis as follows:

```
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
```

Similarly, link the results app to PostgreSQL:

```
docker run -d --name=result -p 5001:80 --link db:db result-app
```

For the worker container that requires access to both Redis and PostgreSQL, run:

```
docker run -d --name=worker --link redis:redis --link db:db worker
```

### Accessing Linked Containers in Code

Below is an example of how the voting application might access Redis:

```
def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis
```

And here's how the worker application might connect to PostgreSQL:

```
pg.connect('postgres://postgres@db/postgres', function(err, client, done) {
  if (err) {
    console.error("Waiting for db");
  }
  callback(err, client);
});
```

> [!important]
> **Deprecated Feature**
>
> Linking containers using the `--link` option is deprecated. Modern Docker networking features, like those in Docker Swarm, provide more robust solutions.

---

## Transitioning to Docker Compose

After verifying the Docker run commands, it’s straightforward to transition to a Docker Compose configuration. By combining all container definitions into a single YAML file, you can simplify multi-container deployments.

### Docker Run Commands Recap

```
docker run -d --name=redis redis
docker run -d --name=db postgres:9.4
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
docker run -d --name=result -p 5001:80 --link db:db result-app
docker run -d --name=worker --link db:db --link redis:redis worker


docker-compose up
```

### Equivalent Docker Compose File

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

For services that have not yet been built, you can use the `build` option. For example, if the voting app source code resides in a folder named `vote`, update your Compose file like this:

```
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  build: ./vote
  ports:
    - 5000:80
  links:
    - redis
result:
  image: result
  build: ./result
  ports:
    - 5001:80
  links:
    - db
worker:
  image: worker
  build: ./worker
  links:
    - db
    - redis
```

---

## Understanding Docker Compose File Versions

Docker Compose file formats have evolved from version 1 to version 3, each introducing new features and improvements.

### Version 1

Version 1 files define services at the root level and rely on links for networking:

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

### Version 2

Version 2 introduces a `services` section and improvements such as `depends_on` for defining container dependencies:

```
# version: 2
version: 2
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

### Version 3

Version 3 retains a similar structure to version 2 but adds support for Docker Swarm along with enhanced networking capabilities:

```
# version: 3
version: 3
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

For more details, consult the [Docker Documentation](https://docs.docker.com/compose/compose-file/).

---

## Configuring Networks in Docker Compose

Docker Compose lets you define custom networks to control traffic between services. For instance, you might separate external (user-facing) traffic from internal (service-to-service) communication.

### Example: Defining Separate Networks

This example configuration connects the voting and results applications to both the `front-end` (user traffic) and `back-end` (internal services) networks, while Redis and PostgreSQL are only accessible on the `back-end` network.

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
    ports:
      - 5000:80
    networks:
      - front-end
      - back-end
  result:
    image: result
    ports:
      - 5001:80
    networks:
      - front-end
      - back-end
networks:
  front-end:
  back-end:
```

This configuration ensures that internal data remains secure while still allowing user access to essential services.

---

## Conclusion

Now that you have a comprehensive understanding of Docker Compose, it's time to put this knowledge into practice. Whether you're managing simple multi-container applications or complex microservices architectures, Docker Compose empowers you to streamline deployments and manage configurations efficiently.

Happy coding and containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/e4f7711c-d82a-4953-ab4c-bce10b901ed9/lesson/244ac680-2542-48d8-b9f7-c8657ebdc29f)**
>
> Watch video content
