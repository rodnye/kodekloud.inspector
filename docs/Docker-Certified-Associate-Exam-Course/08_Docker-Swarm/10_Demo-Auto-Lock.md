# Demo Auto Lock - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Swarm/Demo-Auto-Lock)

---

## Table of Contents

- Demo Auto Lock
  - 1. Enable Auto-Lock on Your Swarm
  - 2. Store the Unlock Key Securely
  - 3. Quick Reference: Swarm Auto-Lock Commands
  - 4. Verify Cluster Health on Manager 1
  - 5. Test Auto-Lock on Manager 2
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Swarm

# Demo Auto Lock

In this walkthrough, you’ll learn how to enable Docker Swarm’s **Auto-Lock** feature to encrypt Raft logs and TLS keys on disk. With Auto-Lock enabled, any manager restarting or rejoining the cluster must provide the unlock key—adding a robust layer of security.

## 1\. Enable Auto-Lock on Your Swarm

For an **existing** Swarm cluster, run:

```
docker swarm update --autolock=true
```

This outputs a one-time unlock key, for example:

```
SWMKEY-1-izfTZG1yXBjIOY3VBkIHFDI+WcnpqeJKYV6daZW3o
```

> [!important]
> **Note**
>
> To enable Auto-Lock during cluster creation, use:
>
> ```
> docker swarm init --autolock=true
> ```

## 2\. Store the Unlock Key Securely

Save the key in a safe location. For demo purposes we’ll use `/tmp/swarm-unlock.key`. In production, consider a secrets manager or vault.

```
echo "SWMKEY-1-izfTZG1yXBjIOY3VBkIHFDI+WcnpqeJKYV6daZW3o" > /tmp/swarm-unlock.key
chmod 600 /tmp/swarm-unlock.key
```

> [!important]
> **Warning**
>
> Losing this key means you cannot unlock your Swarm managers. Always back it up securely.

## 3\. Quick Reference: Swarm Auto-Lock Commands

| Command                               | Description                                   |
| ------------------------------------- | --------------------------------------------- |
| `docker swarm init --autolock=true`   | Initialize a new Swarm with Auto-Lock enabled |
| `docker swarm update --autolock=true` | Turn on Auto-Lock for an existing Swarm       |
| `docker swarm unlock`                 | Unlock a manager node after restart or rejoin |

## 4\. Verify Cluster Health on Manager 1

Even with Auto-Lock active, **manager1** can query node status without unlocking:

```
[root@manager1 ~]# docker node ls
ID                        HOSTNAME       STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
kvbht486wmj881wp5vqxp53 * manager1       Ready   Active        Leader          19.03.8
u8imabedhzsu4cawtoz6jh32   manager3       Ready   Active        Reachable       19.03.8
s2ymqdbtfal661imydx31rlno  manager2       Ready   Active        Reachable       19.03.8
38oehhk79ss5rk2coejcavha   worker1        Ready   Active                        19.03.8
k4gc50oc0n8k6jm3f6bm2bph   worker3        Ready   Active                        19.03.8
1pqddmh2fcoy79vq9najr841d  worker2        Ready   Active                        19.03.8
```

## 5\. Test Auto-Lock on Manager 2

1.  **Restart Docker** on manager2:

    ```
    [root@manager2 ~]# systemctl stop docker
    [root@manager2 ~]# systemctl start docker
    ```

2.  **Attempt a Swarm command** (should fail):

    ```
    [root@manager2 ~]# docker node ls
    Error response from daemon: Swarm is encrypted and needs to be unlocked...
    ```

3.  **Unlock the Swarm** with your saved key:

    ```
    [root@manager2 ~]# docker swarm unlock
    Please enter unlock key: [paste contents of /tmp/swarm-unlock.key]
    ```

4.  **Confirm** the node list again:

    ```
    [root@manager2 ~]# docker node ls
    ID                        HOSTNAME       STATUS  AVAILABILITY  MANAGER STATUS  ENGINE VERSION
    xbvhtg486wmj881wp5vkqx53 * manager1       Ready   Active        Leader          19.03.8
    u8imabedhzsu4cawtoz6jh32   manager3       Ready   Active        Reachable       19.03.8
    s2ymqdbtfal661imydx31rlno * manager2       Ready   Active        Reachable       19.03.8
    38oehhth79bsfs7kco2jcvah   worker1        Ready   Active                        19.03.8
    k4gcc5ooc0nm8xgl36fmb2pd   worker3        Ready   Active                        19.03.8
    1pqddmhd2f0y7vq9najr841d   worker2        Ready   Active                        19.03.8
    ```

Congratulations! Manager 2 has rejoined securely with Auto-Lock enabled.

---

## Links and References

- [Docker Swarm Overview](https://docs.docker.com/engine/swarm/)
- [Swarm Mode Commands](https://docs.docker.com/engine/reference/commandline/swarm/)
- [Managing Docker Secrets](https://docs.docker.com/engine/swarm/secrets/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/16b8b1e1-1e1f-4e11-976f-8d5c1223c53d/lesson/01429753-687d-491e-a109-e2148054d338)**
>
> Watch video content
