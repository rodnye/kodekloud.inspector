# Demo Example Voting App using Docker Compose - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Compose/Demo-Example-Voting-App-using-Docker-Compose)

---

## Table of Contents

- Demo Example Voting App using Docker Compose
  - Creating the Docker Compose File
  - Starting the Application
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Compose

# Demo Example Voting App using Docker Compose

Welcome to this comprehensive guide on deploying a multi-container voting application stack with Docker Compose. In this tutorial, you’ll learn how to set up and run various interconnected services that form a complete voting app ecosystem.

![The image shows a webpage from Docker Docs detailing the installation process for Docker Compose, including prerequisites and installation instructions for various operating systems.](https://kodekloud.com/kk-media/image/upload/v1752874064/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Example-Voting-App-using-Docker-Compose/frame_20.jpg)

> [!important]
> **Important**
>
> Docker Compose is not included by default when Docker is installed. You need to install it separately. For instructions tailored to your operating system (Mac, Windows, or Linux), please refer to the Docker documentation.

Since this demo runs on Linux, follow these steps to install Docker Compose:

1.  Download the Docker Compose binary using `curl`.
2.  Set executable permissions.
3.  Verify the installation with the version command.

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.16.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
# Output:
# docker-compose version 1.16.1, build 1719ceb
```

Before we proceed, ensure that any previously running containers are stopped. Confirm no containers are active using:

```
docker ps
```

## Creating the Docker Compose File

Next, create a `docker-compose.yml` file that defines the required services for the voting application architecture. The stack includes:

- **Redis** – Key-value store used by various services.
- **DB** – PostgreSQL database (image version `9.4`).
- **Vote** – The voting web application.
- **Worker** – Processes voting logic and communicates with both Redis and DB.
- **Result** – Displays the voting results.

Start by using the `cat` command to create the file:

```
root@Docker_Host_2:/root# cat > docker-compose.yml
```

Then, add the following service definitions with the necessary images, port mappings, and service linkages:

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
    links:
      - redis


  worker:
    image: worker-app
    links:
      - redis
      - db


  result:
    image: result-app
    ports:
      - "5001:80"
    links:
      - db
```

In this configuration:

- The **vote** service maps container port 80 to host port 5000.
- The **result** service maps container port 80 to host port 5001.
- The `links` attribute creates communication channels among the containers (e.g., vote connects to Redis, and worker connects to both Redis and DB).

Save the file once the configuration is complete.

## Starting the Application

Launch the application stack by running:

```
root@Docker_Host_2:/root# docker-compose up
```

The output should confirm that the containers are being created, similar to:

```
Creating root_redis_1 ... done
Creating root_db_1 ... done
Creating root_vote_1 ...
Creating root_result_1 ...
Creating root_worker_1 ...
```

Note that the container names are prefixed with the current directory name (in this case, "root")—a standard behavior of Docker Compose.

As the containers initialize, you will see logs indicating the startup process. Here is an example snippet of the logs:

```
waiting for server to start...
LOG:  could not bind IPv6 socket: Cannot assign requested address
HINT:  Is another postmaster already running on port 5432? If not, wait a few seconds and retry.
LOG:  database system was shut down at 2017-08-20 21:56:07 UTC
LOG:  MultiXact member wraparound protections are now enabled
LOG:  autovacuum launcher started
Waiting for db
done
server started
ALTER ROLE


/usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*


LOG:  received fast shutdown request
LOG:  aborting any active transactions
LOG:  autovacuum launcher shutting down
LOG:  shutting down
waiting for server to shut down...
LOG:  database system is shut down
Waiting for db
done
server stopped
PostgreSQL init process complete; ready for start up.


LOG:  database system was shut down at 2017-08-20 21:56:09 UTC
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
Connected to db
ERROR:  relation "votes" does not exist at character 38
STATEMENT:  SELECT vote, count(id) FROM votes GROUP BY vote
Error performing query: error: relation "votes" does not exist
Connected to db
Found redis at 172.17.0.2
Connecting to redis
```

Once all containers are running, you can access the voting application to cast votes and view the results.

![A webpage titled "Cats vs Dogs!" with voting options for "CATS" and "DOGS," showing "DOGS" selected. It includes a container ID and a tip about changing votes.](https://kodekloud.com/kk-media/image/upload/v1752874065/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Example-Voting-App-using-Docker-Compose/frame_320.jpg)

Thank you for following along in this guide. We hope this tutorial has enhanced your understanding of deploying multi-container applications with Docker Compose. Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/43e8db99-9bc6-4277-88b0-a6f699d2fd76/lesson/397ded1a-f9bc-4dea-acbb-ba192d128044)**
>
> Watch video content
