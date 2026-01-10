# Commands and Arguments in Docker Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Commands-and-Arguments-in-Docker-Recap)

---

## Table of Contents

- Commands and Arguments in Docker Recap
  - 1. Why docker run ubuntu Exits Immediately
  - 2. How Images Define Default Commands (CMD)
  - 3. Overriding the Default Command at Runtime
  - 4. Baking Your Custom Command into a New Image
  - 5. ENTRYPOINT vs. CMD
  - 6. Combining ENTRYPOINT with Default CMD Arguments
  - 7. Replacing the Entrypoint at Runtime
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Commands and Arguments in Docker Recap

In this guide, we’ll dive into how Docker handles **commands**, **arguments**, and **entrypoints**. You’ll learn to:

- Understand why `docker run ubuntu` exits immediately
- See how Docker images set a default process with `CMD`
- Override the default command at runtime
- Bake custom commands into your own image
- Differentiate between `CMD` and `ENTRYPOINT`
- Combine `CMD` and `ENTRYPOINT` for flexible defaults
- Replace an entrypoint on the fly

---

## 1\. Why `docker run ubuntu` Exits Immediately

First, run the following:

```
docker run ubuntu
docker ps
docker ps -a
```

You’ll observe:

- `docker run ubuntu` starts a container, then it exits right away.
- `docker ps` shows no active containers.
- `docker ps -a` lists your Ubuntu container with an **Exited** status.

Containers are designed to run a single process. When that process ends, the container stops.

> [!important]
> **Warning**
>
> Without an interactive shell or long-running process, the default `/bin/bash` has no TTY and quits immediately—so does the container.

---

## 2\. How Images Define Default Commands (`CMD`)

Docker images declare a default executable in their `Dockerfile` using `CMD`. For example:

```
# Nginx official image
CMD ["nginx"]

# MySQL official image
ENTRYPOINT ["/entrypoint.sh"]
CMD ["mysqld"]
```

A combined snippet illustrating both setups:

```
# ───── Nginx Setup ─────
RUN add-apt-repository -y ppa:nginx/stable \
  && apt-get update \
  && apt-get install -y nginx \
  && rm -rf /var/lib/apt/lists/* \
  && echo "\ndaemon off;" >> /etc/nginx/nginx.conf \
  && chown -R www-data:www-data /var/lib/nginx

VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs"]
WORKDIR /etc/nginx
CMD ["nginx"]

# ───── MySQL Setup ─────
RUN rpmkeys --import https://repo.mysql.com/RPM-GPG-KEY-mysql \
  && yum install -y $MYSQL_SERVER_PACKAGE_URL $MYSQL_SHELL_PACKAGE_URL libpwquality \
  && yum clean all \
  && mkdir /docker-entrypoint-initdb.d

VOLUME /var/lib/mysql
COPY docker-entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh
ENTRYPOINT ["/entrypoint.sh"]
HEALTHCHECK CMD /healthcheck.sh
EXPOSE 3306 33060
CMD ["mysqld"]
```

> [!important]
> **Note**
>
> Use the JSON array form for `CMD` and `ENTRYPOINT` to avoid shell string parsing.

---

## 3\. Overriding the Default Command at Runtime

Append a new command to `docker run` to replace the `CMD` entirely:

```
docker run ubuntu sleep 5
```

Here, the container runs `sleep 5` instead of Bash, pauses for 5 seconds, then exits.

---

## 4\. Baking Your Custom Command into a New Image

To make the override permanent, author a custom `Dockerfile`:

```
FROM ubuntu
# Shell form
CMD sleep 5

# Or JSON form
# CMD ["sleep", "5"]
```

Build and run:

```
docker build -t ubuntu-sleeper .
docker run ubuntu-sleeper   # sleeps for 5 seconds
```

---

## 5\. ENTRYPOINT vs. CMD

| Instruction | Purpose                              | Runtime Override     |
| ----------- | ------------------------------------ | -------------------- |
| CMD         | Sets a default command and arguments | Fully replaceable    |
| ENTRYPOINT  | Configures the primary executable    | Appends runtime args |

- **CMD**: default command, easily swapped by arguments you supply.
- **ENTRYPOINT**: fixed executable; any extra args in `docker run` are appended.

---

## 6\. Combining `ENTRYPOINT` with Default `CMD` Arguments

Define both to set defaults that users can override:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

- `docker run ubuntu-sleeper` → runs `sleep 5`
- `docker run ubuntu-sleeper 10` → runs `sleep 10`

---

## 7\. Replacing the Entrypoint at Runtime

Use `--entrypoint` to swap out the image’s entrypoint completely:

```
docker run --entrypoint sleep ubuntu-sleeper 2.0 10
# Executes: sleep 2.0 10
```

---

## Links and References

- [Dockerfile reference: CMD](https://docs.docker.com/engine/reference/builder/#cmd)
- [Dockerfile reference: ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)
- [docker run reference](https://docs.docker.com/engine/reference/commandline/run/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/15bcc1fb-cee6-46ac-89e7-549dbab427a2)**
>
> Watch video content
