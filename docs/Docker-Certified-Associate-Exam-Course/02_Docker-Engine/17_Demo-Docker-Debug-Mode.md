# Demo Docker Debug Mode - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Demo-Docker-Debug-Mode)

---

## Table of Contents

- Demo Docker Debug Mode
  - 1. Check Current Debug Status
  - 2. Create a Test Container & Inspect Default Logs
  - 3. Enable Docker Debug Mode
  - 4. Confirm Debug Mode Is Active
  - 5. Generate and View Verbose Logs
  - 6. Reload Docker with SIGHUP & Disable Debug
  - Command Reference
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Demo Docker Debug Mode

In this demo, you’ll learn how to turn on Docker daemon debug mode, verify that it’s active, and inspect verbose logs during container operations.

## 1\. Check Current Debug Status

Start by viewing your Docker daemon’s current settings:

```
docker system info
```

Look for the `Debug Mode` line in the output:

```
Debug Mode: false
```

## 2\. Create a Test Container & Inspect Default Logs

Launch a simple HTTPD container:

```
docker run -d --name test httpd:latest
```

Then review your system log (e.g., `/var/log/messages` or `journalctl -u docker.service`). You should only see high-level entries about container creation:

```
tail -n 20 /var/log/messages
```

## 3\. Enable Docker Debug Mode

To capture detailed debug output, edit the Docker daemon configuration:

1.  Open `/etc/docker/daemon.json` (create it if missing) and add:

    ```
    {
      "debug": true
    }
    ```

    > [!important]
    > **Note**
    >
    > If the file doesn’t exist, you can create it. Make sure the JSON remains valid—use a JSON linter if needed.

2.  Reload the Docker daemon:

```
sudo systemctl reload docker
```

## 4\. Confirm Debug Mode Is Active

Run the inspect command again:

```
docker system info
```

Now you should see `Debug Mode: true` along with extra metrics:

```
Debug Mode: true
File Descriptors: 23
Goroutines: 36
System Time: 2020-05-21T11:38:33.79317432Z
EventsListeners: 0
```

## 5\. Generate and View Verbose Logs

Create a new container called `test_debug`:

```
docker run -d --name test_debug httpd:latest
```

Then tail your logs to see debug-level details:

```
tail -n 20 /var/log/messages
```

You’ll notice granular messages describing each step of the container lifecycle.

## 6\. Reload Docker with SIGHUP & Disable Debug

If you prefer a manual reload instead of `systemctl`:

1.  Update `/etc/docker/daemon.json` to disable debug mode:

    ```
    {
      "debug": false
    }
    ```

2.  Identify the Docker daemon PID and send `SIGHUP`:

    ```
    pid=$(pgrep dockerd)
    sudo kill -SIGHUP $pid
    ```

    > [!important]
    > **Warning**
    >
    > Always verify you have the correct PID before sending signals. Killing the wrong process can disrupt your system.

3.  Check that debug is now off:

```
docker system info | grep "Debug Mode"
```

---

## Command Reference

| Action                       | Command                                              |
| ---------------------------- | ---------------------------------------------------- |
| Check debug status           | `docker system info`                                 |
| Launch a container           | `docker run -d --name <name> httpd:latest`           |
| View system logs             | `tail -n 20 /var/log/messages`                       |
| Enable debug in daemon.json  | Add `"debug": true` to `/etc/docker/daemon.json`     |
| Reload Docker via systemd    | `sudo systemctl reload docker`                       |
| Reload Docker via SIGHUP     | `sudo kill -SIGHUP $(pgrep dockerd)`                 |
| Disable debug in daemon.json | Change `"debug": false` in `/etc/docker/daemon.json` |
| Verify debug flag only       | \\`docker system info                                |

---

## Links and References

- [Docker Daemon Configuration](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file)
- [Understanding the Docker Logging Driver](https://docs.docker.com/config/containers/logging/configure/)
- [Docker System Commands](https://docs.docker.com/engine/reference/commandline/system/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/dcebf7a4-f936-41e8-8c5e-930f34cb5b53)**
>
> Watch video content
