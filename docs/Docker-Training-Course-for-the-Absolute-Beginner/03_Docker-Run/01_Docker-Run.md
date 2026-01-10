# Docker Run - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Run/Docker-Run)

---

## Table of Contents

- Docker Run
  - Running a Redis Container
  - Interacting with a Containerized Application
  - Port Mapping for Containerized Web Applications
  - Data Persistence with Docker Volumes
  - Inspecting Running Containers
  - Viewing Container Logs
  - Conclusion
  - Watch Video
    - Expected Output

---

## Content

Docker Training Course for the Absolute Beginner

Docker Run

# Docker Run

In this guide, we explore various Docker run commands and options, providing clear examples and practical challenges to solidify your understanding. By the end of this article, you'll be well-equipped to execute and experiment with these commands.

## Running a Redis Container

Previously, we used the following command to run a Redis container:

```
docker run redis
```

By default, Docker pulls the image tagged as “latest” (currently corresponding to version 5.0.5). If you prefer to run a different version—say, version 4.0—you must specify the tag after a colon:

```
docker run redis:4.0
```

In this example, Docker retrieves Redis version 4.0. Remember, when no tag is indicated, Docker assumes "latest." For a complete list of supported tags, refer to the image's Docker Hub page, where both short and long tags are documented. Notably, version 5.0.5 is also identified by the “latest” tag.

### Expected Output

Running these commands might yield outputs similar to the following:

```
docker run redis
Using default tag: latest
latest: Pulling from library/redis
f5d23c7fed46: Pull complete
Status: Downloaded newer image for redis:latest
1:C 31 Jul 2019 09:02:32.624 # 0000oo0000oo Redis is starting 0000oo0000oo
1:C 31 Jul 2019 09:02:32.624 # Redis version=5.0.5, bits=64, commit=00000000, modified=0, pid=1, just started
1:M 31 Jul 2019 09:02:32.626 # Server initialized
```

```
docker run redis:4.0
Unable to find image 'redis:4.0' locally
4.0: Pulling from library/redis
e44f086c03a2: Pull complete
Status: Downloaded newer image for redis:4.0
1:C 31 Jul 2019 09:02:56.527 # 0000oo0000oo Redis is starting 0000oo0000oo
1:C 31 Jul 2019 09:02:56.527 # Redis version=4.0.14, bits=64, commit=00000000, modified=0, pid=1, just started
1:M 31 Jul 2019 09:02:56.530 # Server initialized
```

## Interacting with a Containerized Application

Consider an application that asks the user for their name and then displays a welcome message. Running the application locally produces:

```
~/prompt-application$ ./app.sh
Welcome! Please enter your name: Mumshad
Hello and Welcome Mumshad!
```

If you dockerize this application and run it without additional options, it won’t wait for input because Docker containers run in non-interactive mode by default:

```
docker run kodekloud/simple-prompt-docker
Hello and Welcome !
```

Even specifying the `-i` flag (interactive mode) alone does not display the prompt, as the container isn’t attached to a terminal:

```
docker run -i kodekloud/simple-prompt-docker
Mumshad
Hello and Welcome Mumshad!
```

> [!important]
> **Interactive & Terminal Mode**
>
> For applications requiring user input, always combine the `-i` (interactive) and `-t` (pseudo terminal allocation) options:

Using both flags ensures that the application properly prompts for input and displays output as if running in a standard terminal:

```
docker run -it kodekloud/simple-prompt-docker
Welcome! Please enter your name: Mumshad
Hello and Welcome Mumshad!
```

## Port Mapping for Containerized Web Applications

When running a containerized web application that listens on port 5000, the container’s internal IP (e.g., 172.17.0.2) is only accessible within the Docker host. To expose the application externally, you must map a free host port to the container’s port using the `-p` parameter.

For instance, to route traffic from port 80 on your Docker host to port 5000 in the container, run:

```
docker run kodekloud/webapp
* Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)


docker run -p 80:5000 kodekloud/webapp
```

Now, users can access your web application via http://192.168.1.5:80 (assuming 192.168.1.5 is the Docker host IP). You can also run multiple instances of your application by mapping different host ports:

```
docker run -p 80:5000 kodekloud/webapp
docker run -p 8000:5000 kodekloud/webapp
docker run -p 8001:5000 kodekloud/webapp
```

For services like MySQL, you may choose to map its default port (3306) or an alternate host port (e.g., 8306) to allow multiple instances to operate concurrently without conflict.

## Data Persistence with Docker Volumes

By default, a MySQL container stores its data in `/var/lib/mysql` inside the container. However, since container filesystems are ephemeral, all data is lost when the container is removed. Consider the following example:

```
docker run mysql
docker stop mysql
docker rm mysql
```

All stored data is removed along with the container. To persist the data, mount a directory from your Docker host into the container. For example, create a directory `/opt/datadir` on your host and run:

```
docker run -v /opt/datadir:/var/lib/mysql mysql
```

This volume mapping ensures that the data in `/opt/datadir` remains intact even if the container is deleted.

## Inspecting Running Containers

To retrieve basic information about your running containers, use the `docker ps` command, which lists container names and IDs. For detailed information about a particular container, the `docker inspect` command provides comprehensive configuration details in JSON format. For example:

```
[
    {
        "Id": "35505f7810d17291261a43391d4b6c0846594d415ce4f4da6ffbf9cc5109048",
        "Name": "/blissful_hopper",
        "Path": "python",
        "Args": [
            "app.py"
        ],
        "State": {
            "Status": "running",
            "Running": true
        },
        "Mounts": [],
        "Config": {
            "Entrypoint": [
                "python",
                "app.py"
            ]
        },
        "NetworkSettings": { ... }
    }
]
```

Use `docker inspect` when you need to review the complete state and configuration of a container.

## Viewing Container Logs

If you launch a container in detached mode using the `-d` flag, you may want to view its logs later. The `docker logs` command displays the standard output of a container. To view logs from a container named “blissful_hopper,” run:

```
docker logs blissful_hopper
```

An example output might be:

```
No command line argument or environment variable. Picking a Random Color = blue
* Serving Flask app "app" (lazy loading)
* Environment: production
WARNING: Do not use the development server in a production environment.
Use a production WSGI server instead.
* Debug mode: off
* Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
```

## Conclusion

This guide has provided a comprehensive overview of key Docker run commands, covering container image versions, interactive mode, port mapping, data persistence, container inspection, and log viewing. Practice these commands to reinforce your Docker skills and enhance your container management strategy.

For further learning, refer to [Docker Documentation](https://docs.docker.com/) and explore additional tutorials on containerization best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/a1c8a6ee-e49e-4f0d-9a21-0195826caedc/lesson/76b61747-e233-435c-af11-004b7065369e)**
>
> Watch video content
