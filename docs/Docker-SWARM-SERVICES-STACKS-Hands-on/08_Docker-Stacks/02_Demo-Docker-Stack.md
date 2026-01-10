# Demo Docker Stack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Stacks/Demo-Docker-Stack)

---

## Table of Contents

- Demo Docker Stack
  - Converting the Compose File
  - Preparing the Application for Deployment
  - Scaling the Voting Application
  - Conclusion
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Stacks

# Demo Docker Stack

Welcome to this comprehensive lesson on Docker Stacks. Previously, you learned how to run the Voting Application using Docker run and Docker Compose. In this lesson, we will enhance your deployment strategy by using Docker Stack to deploy the Voting Application across multiple nodes in a cluster.

## Converting the Compose File

Begin by modifying your Docker Compose file to be compatible with Docker Stack. Update the file format to version 3 by specifying the version at the top and organizing the configuration under a services section. Below is the updated Compose file:

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
      - 5000:80
  worker:
    image: dockersamples/examplevotingapp_worker
  result:
    image: dockersamples/examplevotingapp_result
    ports:
      - 5001:80
```

This file defines the following services:

- Redis for caching.
- PostgreSQL database (db).
- Voting interface (vote) exposed on port 5000.
- Backend worker to process votes.
- Result service exposed on port 5001.

The images for vote, worker, and result are maintained in the Docker Samples repository on Docker Hub.

![The image shows a Docker Hub profile page for "dockersamples," listing public repositories with their stars and pull counts.](https://kodekloud.com/kk-media/image/upload/v1752874074/notes-assets/images/Docker-SWARM-SERVICES-STACKS-Hands-on-Demo-Docker-Stack/frame_70.jpg)

## Preparing the Application for Deployment

To prepare the application:

1.  Create a new directory (e.g., "voting-app-stack") on your Docker host.
2.  Copy the updated Compose file into this directory and save it as `docker-stack.yaml`.

Once you have the file ready, deploy the stack with the following command, ensuring you use the same stack name ("voting-app-stack"):

```
root@docker-master:/root/voting-app-stack # docker stack deploy voting-app-stack --compose-file docker-stack.yml
Creating network voting-app-stack_default
Creating service voting-app-stack_worker
Creating service voting-app-stack_result
Creating service voting-app-stack_redis
Creating service voting-app-stack_db
Creating service voting-app-stack_vote
root@docker-master:/root/voting-app-stack # docker service ls
ID             NAME                     MODE         REPLICAS  IMAGE                                      PORTS
3jkedpmwa9vu   voting-app-stack_worker  replicated   0/1      dockersamples/examplevotingapp_worker:latest
dxiwtn4ersh7   voting-app-stack_db      replicated   1/1      postgres:9.4
pc268n3july4   voting-app-stack_result  replicated   1/1      dockersamples/examplevotingapp_result:latest   *:5001->80/tcp
qwhi4xn67d7   voting-app-stack_redis   replicated   1/1      redis:latest
z7jywvrse2lr   voting-app-stack_vote    replicated   0/1      dockersamples/examplevotingapp_vote:latest   *:5000->80/tcp
root@docker-master:/root/voting-app-stack #
root@docker-node2:/root #
```

When you deploy the stack, Docker creates a default network named `voting-app-stack_default` where all containers connect. Use the following command to verify the status of your services:

```
root@docker-master:/root/voting-app-stack # docker service ls
```

> [!important]
> **Note**
>
> Initially, you may notice that the worker and vote services are missing one instance. This is normal as the deployment process scales up based on resource availability.

To inspect the status of a particular service, such as the vote service, run:

```
docker service ps voting-app-stack_vote
```

Once deployed, open your web browser and navigate to port 5000 to view the voting interface. Each vote is captured and processed, with results displayed through the result service.

## Scaling the Voting Application

By default, each service starts with a single instance. For increased availability, you can scale the voting interface by deploying multiple replicas. To scale the vote service, update the Compose file to include a deploy parameter with the replicas setting under the vote service:

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
      - 5000:80
    deploy:
      replicas: 2
  worker:
    image: dockersamples/examplevotingapp_worker
  result:
    image: dockersamples/examplevotingapp_result
```

Save the changes and redeploy the stack using the same command. Docker Stack updates existing services rather than creating new ones:

```
root@docker-master:/root/voting-app-stack # docker stack deploy voting-app-stack --compose-file docker-stack.yml
Updating service voting-app-stack_result (id: hhyb4vw7h64al9117aq66nfq)
Updating service voting-app-stack_redis (id: myheg84g4y44mnhlp2tsxqupl)
Updating service voting-app-stack_db (id: jozj233cv0a195rck9lf7h7ej)
Updating service voting-app-stack_vote (id: gc9ocknrcohmm7ty8n804hxut)
Updating service voting-app-stack_worker (id: dw5yqfgygriosomlnljmevylx)
```

Next, check the updated service list and replica counts:

```
root@docker-master:/root/voting-app-stack # docker service ls
ID                  NAME                    MODE                REPLICAS            IMAGE
dw5yqfgygrio       voting-app-stack_worker  replicated          1/1                 dockersamples/examplevotingapp_worker
gc9ocknrcohm       voting-app-stack_vote    replicated          1/2                 dockersamples/examplevotingapp_vote
hhyb4vw7h64a       voting-app-stack_result  replicated          1/1                 dockersamples/examplevotingapp_result
jozj233cv0ai       voting-app-stack_db      replicated          1/1                 postgres:9.4
myheg8ag4y44       voting-app-stack_redis   replicated          1/1                 redis:latest
```

To view detailed information about the vote service's tasks, execute:

```
root@docker-master:/root/voting-app-stack # docker service ps voting-app-stack_vote
ID            NAME                         IMAGE                                         NODE          DESIRED STATE  CURRENT STATE
31c0km6qgomw   voting-app-stack_vote.1      dockersamples/examplevotingapp_vote:latest    docker-node2  Running      Running
x5lsrm5maoa9   voting-app-stack_vote.1      dockersamples/examplevotingapp_vote:latest    docker-master Shutdown   Shutdown
qtosngwa5zog   voting-app-stack_vote.2      dockersamples/examplevotingapp_vote:latest    docker-node1  Running      Running
```

In this output, one task is running on node two while the other begins processing on node one.

## Conclusion

The Voting Application is now successfully deployed using Docker Stack. This configuration not only simplifies deployment across multiple nodes but also provides an easy pathway for scaling services. Keep experimenting with Docker Stack to enhance your container orchestration skills.

Happy Dockering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/9c0c70f2-8fd8-459d-b5fb-6c70585ad4a7/lesson/baa41e6e-25ee-4c66-a9fc-5965ec6a0ecb)**
>
> Watch video content
