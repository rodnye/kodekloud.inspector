# Docker Service Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Docker-Service-Configuration)

---

## Table of Contents

- Docker Service Configuration
  - Table of Contents
  - Managing Docker with systemd
  - Running the Daemon in Foreground
  - Default Unix Socket
  - Exposing the Daemon on TCP
  - Securing the Daemon with TLS
  - Persisting Configuration in daemon.json
  - Flag vs Configuration File Conflicts
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Docker Service Configuration

Master the essentials of configuring the Docker daemon (`dockerd`) on Linux. This guide covers systemd management, foreground debugging, socket tuning, remote access, TLS security, and persistent configuration.

## Table of Contents

1.  [Managing Docker with systemd](#managing-docker-with-systemd)
2.  [Running the Daemon in Foreground](#running-the-daemon-in-foreground)
3.  [Default Unix Socket](#default-unix-socket)
4.  [Exposing the Daemon on TCP](#exposing-the-daemon-on-tcp)
5.  [Securing the Daemon with TLS](#securing-the-daemon-with-tls)
6.  [Persisting Configuration in daemon.json](#persisting-configuration-in-daemonjson)
7.  [Flag vs Configuration File Conflicts](#flag-vs-configuration-file-conflicts)
8.  [References](#references)

---

## Managing Docker with systemd

Use systemd to start, stop, and inspect the Docker service. By default, Docker is enabled to launch on boot.

| Command                         | Description                  |
| ------------------------------- | ---------------------------- |
| `sudo systemctl start docker`   | Start the Docker service     |
| `sudo systemctl stop docker`    | Stop the Docker service      |
| `sudo systemctl restart docker` | Restart the service          |
| `sudo systemctl status docker`  | Show current status and logs |
| `sudo systemctl enable docker`  | Enable docker at startup     |
| `sudo systemctl disable docker` | Disable automatic startup    |

Example status output:

```
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2020-10-21 04:21:01 UTC; 3 days ago
     Docs: https://docs.docker.com
 Main PID: 4197 (dockerd)
    Tasks: 13
   Memory: 129.7M
      CPU: 9min 6.980s
   CGroup: /system.slice/docker.service
           └─4197 /usr/bin/dockerd -H fd:// -H tcp://0.0.0.0 --containerd=/run/containerd/containerd.sock
```

> [!important]
> **Note**
>
> If you make changes to `/etc/docker/daemon.json`, restart Docker with `sudo systemctl restart docker` to apply them.

---

## Running the Daemon in Foreground

Troubleshoot or capture real-time logs by launching `dockerd` interactively.

```
# Launch daemon in foreground
dockerd


# Enable debug logging
dockerd --debug
```

Sample debug output:

```
INFO[2020-10-24T08:29:00.331Z] Starting up
DEBU[2020-10-24T08:29:00.332Z] Listener created for HTTP on unix (/var/run/docker.sock)
DEBU[2020-10-24T08:29:00.333Z] Golang's threads limit set to 6930
WARN[2020-10-24T08:29:00.364Z] Your kernel does not support cgroup runtime
```

> [!important]
> **Note**
>
> Foreground mode is ideal for capturing logs in CI pipelines or debugging startup failures.

---

## Default Unix Socket

By default, Docker listens on a Unix domain socket. This restricts access to local clients only:

- Socket path: `/var/run/docker.sock`
- Access: Local IPC (no remote connections)

The Docker CLI uses this socket unless `DOCKER_HOST` is overridden.

---

## Exposing the Daemon on TCP

To allow remote management, bind `dockerd` to both the Unix socket and a TCP port:

```
dockerd \
  --host=unix:///var/run/docker.sock \
  --host=tcp://192.168.1.10:2375
```

On a remote client:

```
export DOCKER_HOST="tcp://192.168.1.10:2375"
docker ps
```

> [!important]
> **Warning**
>
> Port 2375 is unencrypted and unauthenticated. Exposing it publicly invites unauthorized access and potential malicious use. Only enable on secured networks or for testing.

---

## Securing the Daemon with TLS

Encrypt and authenticate connections on port 2376 by enabling TLS:

1.  Generate CA, server, and client certificates.
2.  Place `server.pem` and `serverkey.pem` in a secure directory.
3.  Start `dockerd` with TLS options:

```
dockerd \
  --host=unix:///var/run/docker.sock \
  --host=tcp://192.168.1.10:2376 \
  --tls=true \
  --tlscert=/var/docker/server.pem \
  --tlskey=/var/docker/serverkey.pem
```

Clients must reference the CA and their own certs:

```
docker --tlsverify \
  --tlscacert=ca.pem \
  --tlscert=client.pem \
  --tlskey=client-key.pem \
  -H=tcp://192.168.1.10:2376 info
```

> [!important]
> **Note**
>
> Using TLS ensures confidentiality, integrity, and authentication for remote Docker API calls.

---

## Persisting Configuration in daemon.json

Avoid long startup flags by defining options in `/etc/docker/daemon.json`:

```
{
  "debug": true,
  "hosts": [
    "unix:///var/run/docker.sock",
    "tcp://192.168.1.10:2376"
  ],
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/serverkey.pem"
}
```

Then reload Docker:

```
sudo systemctl restart docker
```

---

## Flag vs Configuration File Conflicts

Mixing CLI flags and `daemon.json` entries can lead to startup errors:

```
# Conflicting debug settings
dockerd --debug=false
```

Error:

```
unable to configure the Docker daemon with file /etc/docker/daemon.json:
the following directives are specified both as a flag and in the configuration file:
 debug: (from flag: false, from file: true)
```

**Resolution:** Keep all overrides in one place—either CLI flags or the JSON file.

---

## References

- [Docker Daemon Configuration](https://docs.docker.com/engine/reference/commandline/dockerd/)
- [Docker CLI Environment Variables](https://docs.docker.com/engine/reference/commandline/cli/#environment-variables)
- [Systemd Service Files](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/989d70f4-a69f-4b52-a8b9-61adde7bcf24)**
>
> Watch video content
