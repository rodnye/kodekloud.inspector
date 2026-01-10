# Demo Docker Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Service/Demo-Docker-Service)

---

## Table of Contents

- Demo Docker Service
  - Verifying the Swarm Cluster
  - Creating an NGINX Service
  - Inspecting the Service
  - Publishing a Port
  - Removing and Scaling the Service
  - Draining the Manager Node
  - Simulating a Node Failure
  - Watch Video
  - Practice Lab

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Service

# Demo Docker Service

Welcome to this guide on managing Docker services within a Swarm cluster. In this lesson, you'll learn how to create, update, scale, and monitor Docker services. We'll also highlight how running multiple containers as part of a service increases resilience against node failures.

## Verifying the Swarm Cluster

First, ensure your Swarm cluster is properly configured. In this example, our cluster consists of three nodes: one manager (master) node and two worker nodes. Run the following command on the manager node to list all nodes within the cluster:

```
root@docker-master:/root # docker node ls
ID                         HOSTNAME       STATUS  AVAILABILITY  MANAGER STATUS
qp9scmbhf3cz13rxy342pywc   docker-node2   Ready   Active        Reachable
uildwhelph5pjt6vi197tsn5s   docker-master  Ready   Active        Leader
zycf5u8yudke6nfzo74grysx   docker-node1   Ready   Active        Reachable
root@docker-master:/root #
```

## Creating an NGINX Service

Next, create an NGINX service. Because the `--detach=false` flag was not specified, Docker creates the service tasks in the background:

```
root@docker-master:/root # docker service create nginx
0vehhuvumc1r82u3eijwecl
Since --detach=false was not specified, tasks will be created in the background.
In a future release, --detach=false will become the default.
root@docker-master:/root #
```

> [!important]
> **Note**
>
> Docker automatically assigns a random name to the service if no name is provided.

## Inspecting the Service

After creating the service, list all services to see the assigned name (in this example, "hopeful_jones"):

```
root@docker-master:/root # docker service ls
ID            NAME             MODE         REPLICAS
0vehhuvumci0  hopeful_jones    replicated   0/1
```

To inspect the tasks of the service, run:

```
root@docker-master:/root # docker service ps 0v
ID            NAME               IMAGE         NODE         DESIRED STATE   CURRENT STATE
v3c6kgq7sbwr  hopeful_jones.1    nginx:latest  docker-node2  Running         Running
```

If the container is still pulling the NGINX image from Docker Hub, its state might temporarily display as "Preparing":

```
root@docker-master:/root # docker service ps 0v
ID            NAME               IMAGE         NODE         DESIRED STATE   CURRENT STATE
v3c6kgq7sbwr  hopeful_jones.1    nginx:latest  docker-node2  Running         Preparing about a minute ago
root@docker-master:/root #
```

You can further verify that the container is running by checking with the `docker ps` command:

```
root@docker-master:/root # docker ps
CONTAINER ID      IMAGE               COMMAND                  CREATED             STATUS              PORTS    NAMES
6c4b985af166      nginx:latest        "nginx -g 'daemon …'"   10 seconds ago      Up 10 seconds       80/tcp   hopeful_jones
```

Each service receives a random name, and each task is suffixed with an incremental identifier (e.g., "hopeful_jones.1"). The container's name is derived from the task name along with a unique task ID.

## Publishing a Port

Since NGINX serves web content, you might wish to access it via a web browser. To publish a port so that requests on the host are forwarded to the container, update the service as follows. The command below maps port 5000 on the host to port 80 on the NGINX container:

```
root@docker-master:/root # docker service update --publish-add 5000:80
```

After the update, confirm the published port with:

```
root@docker-master:/root # docker service ls
ID            NAME          MODE         REPLICAS  IMAGE         PORTS
0vehhuvumci0  hopeful_jones  replicated  1/1      nginx:latest  *:5000->80/tcp
```

Now, open a web browser and navigate to the host address at port 5000 to view the NGINX welcome page.

## Removing and Scaling the Service

When you’re done with the service, you can remove it by executing:

```
root@docker-master:/root # docker service rm 0v
```

After removal, the service list will no longer display any active services.

To demonstrate scaling, recreate a similar service this time with multiple replicas. This showcases how Docker Swarm distributes containers across available nodes for enhanced availability:

```
root@docker-master:/root # docker service create --replicas 2 --name nginx nginx
Since --detach=false was not specified, tasks will be created in the background.
In a future release, --detach=false will become the default.
root@docker-master:/root #
```

Check the status of the newly created service:

```
root@docker-master:/root # docker service ls
ID                  NAME    MODE        REPLICAS  IMAGE          PORTS
fuwei5oh8r24       nginx   replicated  1/2       nginx:latest
```

Inspect the tasks to see their distribution across nodes:

```
root@docker-master:/root # docker service ps nginx
ID              NAME         IMAGE          NODE            DESIRED STATE   CURRENT STATE
0949ij67fe78h  nginx.1     nginx:latest   docker-master   Running         Running 29 seconds ago
oyv6thzu1ldt   nginx.2     nginx:latest   docker-node2    Running         Running 19 seconds ago
```

Over time, both replicas should be running and accessible. Initially, one replica might start running before the other is fully up.

## Draining the Manager Node

By default, manager nodes in Docker Swarm can run service tasks. However, if you want the manager node to focus solely on control-plane activities, you can drain it so that no tasks are scheduled on it. Execute the following command on the manager node:

```
root@docker-master:/root # docker node update --availability drain docker-master
```

Draining the manager node causes any tasks running on it to be shut down and redeployed on other nodes. For example, after draining, the service tasks might appear as follows:

```
root@docker-master:/root # docker service ps nginx
ID                  NAME         IMAGE          NODE            DESIRED STATE   CURRENT STATE         ERROR   PORTS
blv43kjwaj7        nginx.1      nginx:latest   docker-node1    Running         Preparing 5 seconds ago         80/tcp
0949ij67fe78h      nginx.1      nginx:latest   docker-master   Shutdown        Shutdown 2 seconds ago         80/tcp
oyw6thzulldt       nginx.2      nginx:latest   docker-node2    Running         Running 3 minutes ago
```

After a short period, Docker Swarm automatically migrates tasks away from the drained manager node.

## Simulating a Node Failure

To demonstrate Docker Swarm’s self-healing capabilities, simulate a node failure by shutting down one of the worker nodes. On docker-node1, run the following command:

```
root@docker-node1:/root # shutdown now
```

Once the node is shut down, Docker Swarm will automatically redeploy the affected tasks onto the other available nodes—even if this means placing both replicas on a single node. You can check the current status of running containers on the manager node with:

```
root@docker-master:/root # docker ps
```

> [!important]
> **Resilience**
>
> This self-healing feature ensures your service remains available even if individual nodes fail.

---

Thank you for reading this guide on managing Docker services in a Swarm cluster. We hope you found the walkthrough helpful. Stay tuned for more advanced topics and best practices in managing containerized applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/438444ef-50af-45e0-87e2-cdba1492962f/lesson/ee60240e-5aac-4254-ad9b-9f9ba2327260)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/438444ef-50af-45e0-87e2-cdba1492962f/lesson/feef5517-50da-4d8f-8992-5183a6493afa)**
>
> Practice lab
