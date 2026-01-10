# Troubleshooting Docker Daemon - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Troubleshooting-Docker-Daemon)

---

## Table of Contents

- Troubleshooting Docker Daemon
  - 1. “Cannot connect to the Docker daemon” Error
  - 2. Checking the Docker Service Status
  - 3. Inspecting Service Logs
  - 4. Verifying Daemon Configuration
  - 5. Ensuring Sufficient Disk Space
  - 6. Examining System Information and Events
  - Further Reading
  - Watch Video
    - a. Remote Access via DOCKER_HOST

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Troubleshooting Docker Daemon

When Docker commands fail to communicate with the Docker daemon, follow these steps to diagnose and resolve the issue.

## 1\. “Cannot connect to the Docker daemon” Error

If you encounter:

```
$ docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

the Docker Engine service (daemon) isn’t reachable. Determine if you’re targeting a local socket or a remote host.

### a. Remote Access via `DOCKER_HOST`

Set the `DOCKER_HOST` environment variable to point at your remote Docker endpoint:

```
export DOCKER_HOST="tcp://192.168.1.10:2376"
docker ps
```

| Port | Encryption | Description         |
| ---- | ---------- | ------------------- |
| 2375 | None       | Unencrypted traffic |
| 2376 | TLS        | Secure, encrypted   |

> [!important]
> **Note**
>
> When using port 2376, ensure you have valid certificates configured on both client and server.

If the error persists, SSH into the remote host and check the Docker service status.

## 2\. Checking the Docker Service Status

On most Linux distributions with `systemd`, Docker runs as a service. Verify its state:

```
sudo systemctl status docker
```

A healthy daemon appears as:

```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; preset: enabled)
   Active: active (running) since Wed 2020-10-21 04:21:01 UTC; 3 days ago
     Docs: https://docs.docker.com
 Main PID: 4197 (dockerd)
    Tasks: 13
   Memory: 130M
     CPU: 9min 6.980s
 CGroup: /system.slice/docker.service
         └─4197 /usr/bin/dockerd -H fd:// -H tcp://0.0.0.0 --containerd=/run/containerd/containerd.sock
```

If you see **inactive** or **dead**:

```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; preset: enabled)
   Active: inactive (dead) since Sat 2020-10-24 07:42:08 UTC; 21s ago
     Docs: https://docs.docker.com
  Process: 4197 ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0 --containerd=/run/containerd/containerd.sock (code=exited, status=0/SUCCESS)
```

Start or restart the service:

```
sudo systemctl start docker
```

## 3\. Inspecting Service Logs

Use `journalctl` to pinpoint errors and warnings:

```
sudo journalctl -u docker.service --since "1 hour ago"
```

Example log excerpt:

```
Oct 21 04:05:42 ubuntu-xenial systemd[1]: Starting Docker Application Container Engine...
Oct 21 04:05:42 time="2020-10-21T04:05:42.565Z" level=info msg="parsed scheme: \"unix\""
Oct 21 04:05:42 time="2020-10-21T04:05:42.847Z" level=warning msg="Your kernel does not support cgroup cfs"
Oct 21 04:05:43 time="2020-10-21T04:05:43.873Z" level=error msg="Error (Unable to complete operation)"
```

> [!important]
> **Note**
>
> Adjust the `--since` flag to narrow down log entries for faster troubleshooting.

## 4\. Verifying Daemon Configuration

Inspect `/etc/docker/daemon.json` for JSON syntax errors or conflicting settings:

```
{
  "debug": true,
  "hosts": ["tcp://192.168.1.10:2376"],
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/serverkey.pem"
}
```

> [!important]
> **Warning**
>
> A conflict between daemon flags (in `daemon.json`) and CLI or systemd overrides can prevent Docker from starting. Remove duplicate host or TLS settings.

After any change, reload and restart:

```
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 5\. Ensuring Sufficient Disk Space

Docker stores images, containers, and volumes under `/var/lib/docker`. A full filesystem can crash the daemon.

1.  Check disk usage:

    ```
    df -h
    ```

    Example:

    ```
    Filesystem     Size  Used Avail Use% Mounted on
    /dev/sda1       19G   14.7G   15M  99% /
    tmpfs          369M     0  369M   0% /dev/shm
    ```

2.  Clean up unused resources:

    ```
    docker container prune   # remove all stopped containers
    docker image prune       # remove dangling images
    ```

| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| `docker container prune` | Delete stopped containers        |
| `docker image prune`     | Remove dangling or unused images |
| `docker volume prune`    | Clean up unused volumes          |

> [!important]
> **Warning**
>
> Pruning operations are irreversible. Use `docker system df` to preview reclaimable space.

## 6\. Examining System Information and Events

Once the daemon is running, validate your environment:

```
docker system info
```

Sample output:

```
Client:
 Debug Mode: false


Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 0
 Server Version: 19.03.5
 Storage Driver: overlay2
 Backing Filesystem: xfs
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false
```

To view real-time Docker events (container lifecycle, network changes, etc.):

```
docker system events
```

## Further Reading

- [Docker Engine overview](https://docs.docker.com/engine/)
- [Docker daemon.json reference](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file)
- [Docker CLI commands](https://docs.docker.com/engine/reference/commandline/cli/)
- [Managing Docker storage](https://docs.docker.com/config/pruning/)

With these steps—verifying connection methods, service status, logs, configuration, disk space, and system information—you can reliably troubleshoot Docker daemon issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/0052c859-4035-409c-aff8-f1e4d35d59f9)**
>
> Watch video content
