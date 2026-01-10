# Auto Lock - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Auto-Lock)

---

## Table of Contents

- Auto Lock
  - Enable Auto-Lock
  - Manager Restart and Unlocking
  - Quick Reference
  - Further Reading
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Auto Lock

Docker Swarm automatically stores two critical keys in the manager’s in-memory keystore by default:

- **Raft Encryption Key**: Encrypts on-disk Raft logs
- **TLS Key**: Secures communication between Swarm nodes

Enabling **auto-lock** moves key management out of the daemon’s memory. This lets you store keys in a hardware security module (HSM) or a dedicated key management service (KMS).

> [!important]
> **Warning**
>
> When you enable auto-lock, Swarm generates a one-time unlock key. Store it in a secure password manager—without it, you cannot unlock your manager after a restart.

## Enable Auto-Lock

You can turn on auto-lock either during cluster initialization or on an existing Swarm:

```
# Initialize a new Swarm with auto-lock enabled
docker swarm init --autolock=true


# Enable auto-lock on an existing Swarm
docker swarm update --autolock=true
```

Example output:

```
Swarm updated.
To unlock a swarm manager after it restarts, run the `docker swarm unlock` command and provide the following key:
SWMKEY-1-7K9wg5n85QeC4Zh7rZ0vSV0b5MteDsUvpVhG/lQnbl0
Please remember to store this key in a password manager, since without it you will not be able to restart the manager.
```

## Manager Restart and Unlocking

After a manager restart, the Swarm remains **locked**. Any attempt to run Swarm commands will result in an error:

```
$ docker node ls
Error response from daemon: Swarm is encrypted and needs to be unlocked before it can be used.
Please use "docker swarm unlock" to unlock it.
```

To resume normal operation, unlock the manager:

```
$ docker swarm unlock
Enter unlock key: SWMKEY-1-7K9wg5n85QeC4Zh7rZ0vSV0b5MteDsUvpVhG/lQnbl0
```

Once the manager is unlocked, it will rejoin disconnected nodes automatically.

## Quick Reference

| Command                               | Description                                   |
| ------------------------------------- | --------------------------------------------- |
| `docker swarm init --autolock=true`   | Initialize a new Swarm with auto-lock enabled |
| `docker swarm update --autolock=true` | Turn on auto-lock for an existing Swarm       |
| `docker swarm unlock`                 | Unlock a locked Swarm manager after restart   |

## Further Reading

- [Docker Swarm Security Overview](https://docs.docker.com/engine/swarm/)
- [High Availability in Docker Swarm](https://docs.docker.com/engine/swarm/swarm-mode/manager/README/)
- [Docker Swarm Autolock Deep Dive](https://docs.docker.com/engine/swarm/autolock/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/c17d7f98-d4b0-4b73-a1cc-4aa7c6e31015)**
>
> Watch video content
