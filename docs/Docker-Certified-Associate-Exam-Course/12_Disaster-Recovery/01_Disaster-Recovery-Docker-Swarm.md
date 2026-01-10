# Disaster Recovery Docker Swarm - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Disaster-Recovery/Disaster-Recovery-Docker-Swarm)

---

## Table of Contents

- Disaster Recovery Docker Swarm
  - 1. Worker Node Failure
  - 2. Manager Node Quorum
  - 3. Swarm State Storage and Backup
  - 4. Restoring a Swarm from Backup
  - Links and References
  - Watch Video
    - 2.1 Scenarios
    - 3.1 Backup Procedure

---

## Content

Docker Certified Associate Exam Course

Disaster Recovery

# Disaster Recovery Docker Swarm

In this guide, we’ll cover best practices for planning and executing disaster recovery in a Docker Swarm cluster. We assume you already have a Swarm setup alongside Universal Control Plane (UCP), Docker Trusted Registry (DTR), and a web application. Here, our focus is on:

1.  Recovering from worker node failures
2.  Maintaining manager node quorum
3.  Backing up and restoring Swarm state

---

## 1\. Worker Node Failure

When a worker node goes offline, Swarm automatically reschedules its tasks to healthy workers. Returning the failed node simply makes it eligible for new tasks; it does **not** rebalance existing ones by default.

To force a rebalance for a specific service:

```
docker service update --force web
```

This command restarts all tasks in the `web` service, distributing them evenly across available nodes.

---

## 2\. Manager Node Quorum

Swarm managers rely on Raft consensus. A majority of managers (quorum) must be active to perform administrative tasks. Use the table below to understand different setups:

| Cluster Setup  | Quorum Required | Impact When a Manager Fails                               |
| -------------- | --------------- | --------------------------------------------------------- |
| Single-manager | 1               | Admin operations stop. Worker tasks keep running.         |
| Three-manager  | 2               | One failure tolerated. Full functionality remains intact. |

### 2.1 Scenarios

1.  **Single manager fails**
    - Admin operations (adding nodes, updating services) are blocked.
    - Worker containers continue serving traffic.
    - Recovery: restart the manager or promote a worker:

      ```
      docker node promote <worker-node>
      ```

2.  **One of three managers fails**
    - Quorum (2 of 3) remains.
    - Cluster stays fully functional.
    - On recovery, the failed manager rejoins automatically if Docker was intact.

3.  **Two managers fail (no quorum)**
    - Administrative operations halt completely.
    - Options:
      - Restore the failed managers.
      - If restoration is impossible, bootstrap a new cluster on the remaining node:

        ```
        docker swarm init --force-new-cluster
        ```

    This preserves service definitions, networks, configs, secrets, and worker registrations. Afterwards, add new managers or promote workers to rebuild quorum.

---

## 3\. Swarm State Storage and Backup

Swarm stores its state in the Raft database at `/var/lib/docker/swarm` on each manager. Regular backups ensure you can recover from total manager loss.

### 3.1 Backup Procedure

1.  On a **non-leader** manager (to avoid Raft re-election), stop Docker Engine:

    ```
    sudo systemctl stop docker
    ```

2.  Archive the Swarm data:

    ```
    sudo tar czf /tmp/swarm-backup.tgz /var/lib/docker/swarm
    ```

3.  Restart Docker:

    ```
    sudo systemctl start docker
    ```

> [!important]
> **Warning**
>
> While Docker is stopped, the Swarm API is unavailable. Worker containers continue running, but no changes can be made until the engine restarts.

![The image illustrates a Docker Swarm backup setup, showing a manager node with a RAFT database and two worker nodes, each with specific directory paths.](https://kodekloud.com/kk-media/image/upload/v1752873831/notes-assets/images/Docker-Certified-Associate-Exam-Course-Disaster-Recovery-Docker-Swarm/docker-swarm-backup-setup-diagram.jpg)

During backup, you capture:

- Raft database (cluster membership, service definitions, overlay networks, configs, secrets)
- Cluster metadata

> [!important]
> **Note**
>
> If auto-locking (Swarm encryption) is enabled, the Raft database is encrypted with an unlock key stored outside `/var/lib/docker/swarm`. Securely back up this key in a password manager.

![The image is a diagram titled "Docker Swarm - Backup," showing components like Raft keys, cluster membership, services, networks, configs, secrets, and swarm unlock keys, with a focus on the RAFT DB and file paths on a manager node.](https://kodekloud.com/kk-media/image/upload/v1752873832/notes-assets/images/Docker-Certified-Associate-Exam-Course-Disaster-Recovery-Docker-Swarm/docker-swarm-backup-diagram.jpg)

---

## 4\. Restoring a Swarm from Backup

If all manager nodes are lost, recover your cluster state on a new host:

1.  Install Docker on the new node and stop the engine:

    ```
    sudo systemctl stop docker
    ```

2.  Ensure `/var/lib/docker/swarm` is empty, then extract the backup:

    ```
    sudo tar xzvf /tmp/swarm-backup.tgz -C /
    ```

3.  Start Docker:

    ```
    sudo systemctl start docker
    ```

4.  Reinitialize Swarm with your restored state:

    ```
    docker swarm init --force-new-cluster
    ```

You now have a single-manager Swarm with the previous state. Finally, add or promote additional managers to restore full high availability:

```
docker node promote <worker-node>
```

---

That completes the Docker Swarm disaster recovery workflow. Strategies for UCP and DTR will be covered in separate articles.

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Docker UCP Documentation](https://docs.docker.com/ee/ucp/)
- [Docker DTR Documentation](https://docs.docker.com/ee/dtr/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/7ed75cc0-06ef-4c35-8926-245d04e8fbd3/lesson/dce09219-a2dc-43e8-a88a-3537dc7af885)**
>
> Watch video content
