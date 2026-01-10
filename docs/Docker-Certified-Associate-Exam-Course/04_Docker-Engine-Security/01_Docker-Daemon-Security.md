# Docker Daemon Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Security/Docker-Daemon-Security)

---

## Table of Contents

- Docker Daemon Security
  - Exposing the Docker API Over TCP
  - Encrypting the Docker Remote API with TLS
  - Enabling Mutual TLS Authentication (mTLS)
  - Security Modes Overview
  - References
  - Watch Video
    - Client Configuration for Encryption Only
    - Client Usage with mTLS

---

## Content

Docker Certified Associate Exam Course

Docker Engine Security

# Docker Daemon Security

Securing the Docker daemon is critical to protecting your containers, data, and host. If an attacker gains access to the Docker API, they could:

- Stop or delete running containers, impacting applications and users
- Remove volumes, causing irreversible data loss
- Launch malicious containers (e.g., crypto miners)
- Escalate to root on the host via privileged containers

Docker’s default socket (`/var/run/docker.sock`) restricts access to local users. Before exposing the daemon over TCP, ensure your host follows standard hardening best practices:

- Disable direct root SSH logins
- Enforce SSH key–based authentication; disable passwords
- Close unused ports; restrict firewall rules
- Limit user accounts on the host

---

## Exposing the Docker API Over TCP

To manage Docker remotely (from a CI server or management host), you can bind the daemon to a TCP endpoint. Edit `/etc/docker/daemon.json` and add a `hosts` entry:

```
{
  "hosts": [
    "unix:///var/run/docker.sock",
    "tcp://192.168.1.10:2375"
  ]
}
```

Restart the daemon:

```
sudo systemctl restart docker
```

> [!important]
> **Warning**
>
> Never expose `2375` (unencrypted) on a public interface. Always bind to a private network or VPN.

---

## Encrypting the Docker Remote API with TLS

Unencrypted TCP traffic can be intercepted. To enable TLS:

1.  Create your own Certificate Authority (CA)
2.  Generate a server key (`server-key.pem`) and certificate (`server.pem`)
3.  Place them on the Docker host (e.g., `/var/docker/`)

Update `/etc/docker/daemon.json`:

```
{
  "hosts": ["tcp://192.168.1.10:2376"],
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/server-key.pem"
}
```

Restart Docker:

```
sudo systemctl restart docker
```

### Client Configuration for Encryption Only

On the client machine:

```
export DOCKER_HOST="tcp://192.168.1.10:2376"
export DOCKER_TLS=true
docker ps
```

> [!important]
> **Warning**
>
> This setup **encrypts** traffic but does _not_ verify client identity. Anyone with `DOCKER_TLS=true` and the host address can connect.

---

## Enabling Mutual TLS Authentication (mTLS)

To ensure only authorized clients connect, enable client cert verification:

1.  Generate a client key (`client-key.pem`) and certificate signing request (CSR).
2.  Sign the CSR with your CA to create `client.pem`.
3.  Distribute `client.pem`, `client-key.pem`, and `cacert.pem` to each client securely.

Update `/etc/docker/daemon.json`:

```
{
  "hosts": ["tcp://192.168.1.10:2376"],
  "tls": true,
  "tlsverify": true,
  "tlscacert": "/var/docker/cacert.pem",
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/server-key.pem"
}
```

Restart Docker:

```
sudo systemctl restart docker
```

### Client Usage with mTLS

Option 1: Place certificates in `~/.docker/` and use environment variables:

```
export DOCKER_HOST="tcp://192.168.1.10:2376"
export DOCKER_TLS_VERIFY=true
docker ps
```

> [!important]
> **Note**
>
> By default, Docker looks in `~/.docker/` for `ca.pem`, `cert.pem`, and `key.pem`. Rename your files accordingly for automatic discovery.

Option 2: Specify paths explicitly:

```
docker --tlscacert=/path/to/cacert.pem \
       --tlscert=/path/to/client.pem \
       --tlskey=/path/to/client-key.pem \
       --tlsverify \
       -H tcp://192.168.1.10:2376 ps
```

---

## Security Modes Overview

| Mode                     | Encryption | Client Auth | Use Case                       |
| ------------------------ | ---------- | ----------- | ------------------------------ |
| Default (Unix socket)    | No         | N/A         | Local development              |
| TCP without TLS          | No         | N/A         | **Not recommended**            |
| TLS only                 | Yes        | No          | Encrypt traffic                |
| Mutual TLS (`tlsverify`) | Yes        | Yes         | Production, CI/CD environments |

---

## References

- [Docker Engine Security](https://docs.docker.com/engine/security/)
- [Docker Daemon CLI options](https://docs.docker.com/engine/reference/commandline/dockerd/)
- [OpenSSL Tutorial](https://www.openssl.org/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/59a97752-06d2-4cac-a4d0-ad4240730912/lesson/a6d684db-6e01-40d4-b8cf-63f6c0cd6fde)**
>
> Watch video content
