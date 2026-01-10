# Demo Docker Container Operations Continued - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Demo-Docker-Container-Operations-Continued)

---

## Table of Contents

- Demo Docker Container Operations Continued
  - Automatically Remove Ephemeral Containers with --rm
  - Setting Container Name vs. Hostname
  - Restart Policies
  - Inspecting Docker Events
  - Copying Files Between Host and Container (docker cp)
  - Publishing Ports
  - References
  - Watch Video
    - 1. --restart=no (Default)
    - 2. --restart=on-failure
    - 3. --restart=always
    - 4. --restart=unless-stopped
    - Host → Container
    - Container → Host
    - No Port Mapping
    - Random Port Mapping (-P)
    - Static Port Mapping (-p)
    - Port Mapping on Restart

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Demo Docker Container Operations Continued

In this lesson, we’ll explore advanced Docker flags and best practices for managing containers. You’ll learn how to:

- Automatically clean up ephemeral containers
- Customize container hostnames
- Control container restarts with various policies
- Inspect Docker events for troubleshooting
- Copy files between host and containers
- Expose ports using random and static mappings

---

## Automatically Remove Ephemeral Containers with `--rm`

When running short-lived or CI/CD containers, you can use `--rm` to automatically delete them upon exit. This helps keep your environment clean and free of stale containers.

```
docker container run -itd --name=kodekloud --rm ubuntu
docker container ls -l   # Lists only the most recent container
```

Stop and watch it disappear:

```
docker container stop kodekloud
```

> [!important]
> **Note**
>
> Using `--rm` is ideal for one-off or CI tasks. Remember that you won’t be able to inspect logs or the filesystem after the container exits.

---

## Setting Container Name vs. Hostname

Docker allows you to assign both a unique container name and an internal hostname:

```
docker container run -itd \
  --name=yogesh \
  --hostname=kodekloud \
  --rm ubuntu


docker container ls -l
docker exec -it yogesh hostname
```

> Container names must be unique per host, but you can reuse the same internal hostname across multiple containers.

---

## Restart Policies

Docker’s `--restart` flag offers fine-grained control over container uptime. Below is a summary of each policy:

| Policy           | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `no`             | (default) Container will **not** restart after exit.                            |
| `on-failure[:N]` | Restart only on non-zero exit status. Optionally limit retries to `N`.          |
| `always`         | Always restart the container regardless of exit code or Docker daemon restarts. |
| `unless-stopped` | Like `always`, but the container won’t restart if you manually stopped it.      |

### 1\. `--restart=no` (Default)

```
docker container run -itd --name=caseone --restart=no ubuntu
docker container stop caseone
docker container ls -l
```

The container will remain stopped until you manually start it again.

### 2\. `--restart=on-failure`

```
docker container run -itd --name=casetwo --restart=on-failure ubuntu
docker container kill casetwo   # Simulate a failure
sleep 2
docker container ls -l
```

The container automatically restarts if it exits with a non-zero status.

### 3\. `--restart=always`

```
docker container run -itd --name=casethree --restart=always ubuntu
docker container stop casethree
docker container ls -l
```

Regardless of exit reason or daemon restart, the container will be restarted.

### 4\. `--restart=unless-stopped`

```
docker container run -itd --name=casefour --restart=unless-stopped ubuntu
docker container stop casefour
docker container ls -l
```

Even if Docker restarts, `casefour` stays down after a manual stop.

> [!important]
> **Warning**
>
> Use `always` or `unless-stopped` for critical services. Excessive restart loops on failure can degrade performance—consider `on-failure` with a retry limit.

---

## Inspecting Docker Events

To diagnose restart loops or networking events, view real-time Docker system events:

```
docker system events --since 60m
```

Sample output:

2020-05-04T08:38:43.747Z network connect cf10… (container=2daf…, name=bridge) 2020-05-04T08:38:43.976Z container start … (image=ubuntu, name=casethree) 2020-05-04T08:39:43.633Z network connect cf10… (container=74b0…, name=bridge) 2020-05-04T08:39:43.890Z container start … (image=ubuntu, name=casefour)

---

## Copying Files Between Host and Container (`docker cp`)

You don’t need an interactive shell to move files; `docker cp` handles it directly.

### Host → Container

```
mkdir -p /var/temp
echo "hello for KodeKloud" > /var/temp/yogishtest


docker container run -itd --name=copytest --rm ubuntu
docker container exec copytest mkdir -p /root
docker container cp /var/temp/yogishtest copytest:/root/
docker container exec -it copytest cat /root/yogishtest
```

### Container → Host

```
docker container exec copytest bash -c "mkdir -p /var/temp && echo 'container to host' > /var/temp/docker-host"
docker container cp copytest:/var/temp/docker-host /var/temp/
ls -l /var/temp/docker-host
cat /var/temp/docker-host
```

---

## Publishing Ports

By default, containers don’t expose ports to the host. You can use random or static port mappings:

| Option | Description                                         | Access URL                  |
| ------ | --------------------------------------------------- | --------------------------- |
| none   | No mapping; container ports are isolated            | Unreachable from host       |
| `-P`   | Random high host port mapped to container’s port    | `http://<host-ip>:<random>` |
| `-p`   | Static host-to-container port mapping (e.g., 82:80) | `http://<host-ip>:82`       |

### No Port Mapping

```
docker container run -itd --name=case1 httpd
docker container ls -l
```

Accessing via host IP will fail.

### Random Port Mapping (`-P`)

```
docker container run -itd -P --name=case2 httpd
docker container ls -l
```

Docker picks a random port (e.g., 32768) for container port 80.

### Static Port Mapping (`-p`)

```
docker container run -itd --name=case3 -p 82:80 httpd
docker container ls -l
```

Now host port 82 forwards to container port 80.

### Port Mapping on Restart

```
docker container restart case2
docker container restart case3
docker container ls -l
```

- With `-P`, Docker may assign a different random port after restart.
- With `-p`, the mapping remains consistent.

> [!important]
> **Best Practice**
>
> For production services, always use `-p` for predictable port assignments and easier firewall configuration.

---

## References

- [Docker Run Reference](https://docs.docker.com/engine/reference/commandline/run/)
- [Docker Container CP](https://docs.docker.com/engine/reference/commandline/cp/)
- [Docker Restart Policies](https://docs.docker.com/config/containers/start-containers-automatically/)

We hope this lesson helps you master advanced Docker container operations!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/f49ea610-4499-4600-a2aa-2668a2320505)**
>
> Watch video content
