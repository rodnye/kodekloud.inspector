# Docker Compose - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Compose/Docker-Compose)

---

## Table of Contents

- Docker Compose
  - 1. Recap: Running Multiple Containers with docker run
  - 2. Defining Services in Compose
  - 3. Sample Voting Application Architecture
  - 4. Manual Stack Deployment with docker run
  - 5. From docker run to docker-compose.yaml
  - 6. Building Local Images in Compose
  - 7. Compose File Versions Compared
  - 8. Defining Custom Networks
  - Next Steps
  - Links and References
  - Watch Video
    - 4.1 Linking Containers (Deprecated)
    - Examples
      - Version 1
      - Version 2
      - Version 3

---

## Content

Docker Certified Associate Exam Course

Docker Compose

# Docker Compose

Docker Compose lets you define and run multi‐container applications from a single YAML file. Instead of managing each `docker run` command manually, you declare services, networks, and volumes in `docker-compose.yaml` and launch the entire stack with one command:

```
docker-compose up
```

---

## 1\. Recap: Running Multiple Containers with `docker run`

To illustrate the complexity of manual container orchestration, imagine starting four services individually:

```
docker run -d --name web mmumshad/simple-webapp
docker run -d --name database mongo
docker run -d --name messaging redis:alpine
docker run -d --name orchestration ansible
```

Each container runs, but wiring them together (networking, links, ports) quickly becomes tedious.

---

## 2\. Defining Services in Compose

In `docker-compose.yaml`, all services and their options live under the `services:` key:

```
version: '3'
services:
  web:
    image: mmumshad/simple-webapp


  database:
    image: mongo


  messaging:
    image: redis:alpine


  orchestration:
    image: ansible
```

Then bring the entire stack up:

```
docker-compose up
```

> [!important]
> **Note**
>
> Every configuration change is version‐controlled in your Compose file—no more hunting down individual CLI commands.

---

## 3\. Sample Voting Application Architecture

We’ll demonstrate Compose using Docker’s sample voting app, composed of:

- **Voting app** (Python web UI): records “cats” or “dogs” votes in Redis.
- **Worker** (.NET): reads votes from Redis and updates PostgreSQL.
- **PostgreSQL**: stores persistent vote counts.
- **Result app** (Node.js web UI): displays tallied results from PostgreSQL.

![The image is a diagram of a sample voting application architecture, showing components like a voting app in Python, an in-memory database using Redis, a worker in .NET, and a result app connected to a PostgreSQL database. It also includes a simple voting result table for cats and dogs.](https://kodekloud.com/kk-media/image/upload/v1752873837/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Compose/voting-app-architecture-diagram.jpg)

---

## 4\. Manual Stack Deployment with `docker run`

If images already exist on Docker Hub, you might start containers like this:

```
# Data layer
docker run -d --name redis redis
docker run -d --name db postgres


# Services
docker run -d --name vote   -p 5000:80 voting-app
docker run -d --name result -p 5001:80 result-app
docker run -d --name worker worker
```

However, without networking configuration, containers cannot communicate.

### 4.1 Linking Containers (Deprecated)

The `--link` flag creates `/etc/hosts` entries for cross-container DNS:

```
docker run -d --name redis redis
docker run -d --name db postgres


docker run -d --name vote -p 5000:80 --link redis:redis voting-app
docker run -d --name result -p 5001:80 --link db:db result-app
docker run -d --name worker --link redis:redis --link db:db worker
```

In your Node.js code, you’d connect via the hostname `db`:

```
pg.connect('postgres://postgres@db/postgres', (err, client, done) => {
  if (err) console.error("Waiting for db");
  callback(err, client);
});
```

> [!important]
> **Warning**
>
> Container links are **deprecated**. Instead, use user‐defined networks as shown in the next sections.

---

## 5\. From `docker run` to `docker-compose.yaml`

Convert your verified `docker run` commands into a Compose file:

```
# Working commands for reference
docker run -d --name redis redis
docker run -d --name db postgres:9.4
docker run -d --name vote   -p 5000:80 --link redis:redis voting-app
docker run -d --name result -p 5001:80 --link db:db result-app
docker run -d --name worker --link db:db --link redis:redis worker
```

**Compose definition**:

```
version: '2'
services:
  redis:
    image: redis


  db:
    image: postgres:9.4


  vote:
    image: voting-app
    ports:
      - "5000:80"
    links:
      - redis


  result:
    image: result-app
    ports:
      - "5001:80"
    links:
      - db


  worker:
    image: worker
    links:
      - redis
      - db
```

Launch with:

```
docker-compose up
```

---

## 6\. Building Local Images in Compose

If your service images are built locally, specify a `build:` context instead of `image:`:

```
version: '2'
services:
  vote:
    build: ./vote
    ports:
      - "5000:80"
    links:
      - redis


  result:
    build: ./result
    ports:
      - "5001:80"
    links:
      - db


  worker:
    build: ./worker
    links:
      - redis
      - db


  redis:
    image: redis


  db:
    image: postgres:9.4
```

Compose will build these images from each directory’s Dockerfile before starting the containers.

---

## 7\. Compose File Versions Compared

Different Compose versions introduce new features and schemas. Refer to this summary:

| Version | Structure      | Highlights                             |
| ------- | -------------- | -------------------------------------- |
| v1      | No `services:` | Legacy; no networks or `depends_on`    |
| v2      | `services:`    | Built‐in network, `depends_on` support |
| v3      | Same as v2     | Adds Swarm deployment settings         |

### Examples

#### Version 1

```
version: '1'
redis:
  image: redis
db:
  image: postgres:9.4
vote:
  image: voting-app
  ports:
    - "5000:80"
  links:
    - redis
```

#### Version 2

```
version: '2'
services:
  redis:
    image: redis


  db:
    image: postgres:9.4


  vote:
    image: voting-app
    ports:
      - "5000:80"
    depends_on:
      - redis
```

#### Version 3

```
version: '3'
services:
  redis:
    image: redis


  db:
    image: postgres:9.4


  vote:
    image: voting-app
    ports:
      - "5000:80"
```

For full details, see the [Docker Compose file reference](https://docs.docker.com/compose/compose-file/).

---

## 8\. Defining Custom Networks

By default, Compose creates a single bridge network. You can isolate traffic with multiple networks:

![The image is a diagram illustrating a Docker Compose setup with components like a voting app, result app, Redis, database, and worker, connected to represent a system architecture.](https://kodekloud.com/kk-media/image/upload/v1752873839/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Compose/docker-compose-setup-diagram.jpg)

```
version: '2'
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
    image: result-app
    networks:
      - front-end
      - back-end


  worker:
    image: worker
    networks:
      - back-end


networks:
  front-end: {}
  back-end: {}
```

Containers on **front-end** can only communicate with those also on **back-end**.

---

## Next Steps

Now that you’ve mastered service definitions, version schemas, and custom networks, try creating and running your own `docker-compose.yaml` configurations in the exercises below.

---

## Links and References

- [Docker Compose Overview](https://docs.docker.com/compose/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a2906902-2117-467c-90e3-4cdd032599f8/lesson/40c23529-3b71-41f0-9309-d310e3f31234)**
>
> Watch video content
