# Build Cache - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Build-Cache)

---

## Table of Contents

- Build Cache
  - How Docker’s Build Cache Works
  - Cache Busting with Combined Instructions
  - Optimizing Instruction Order
  - Further Reading
  - Watch Video
    - Cache Invalidation Example
    - Version Pinning
    - Example: Optimal Order

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Build Cache

Efficient use of Docker’s build cache can dramatically speed up your image builds. Docker creates a cache layer for each instruction in your Dockerfile. When you rebuild the image, Docker reuses layers whose instructions and contexts haven’t changed, avoiding redundant work.

## How Docker’s Build Cache Works

```
FROM ubuntu
RUN apt-get update
RUN apt-get install -y python python3-pip
RUN pip3 install flask
COPY app.py /opt/source-code
ENTRYPOINT ["flask", "run"]
```

- Each `RUN`, `COPY`, or `ADD` instruction produces a layer.
- After a successful build, layers are stored in the local cache.
- On subsequent builds, Docker compares:
  1.  The instruction itself.
  2.  Any files referenced by `COPY`/`ADD`.
- If both match the cached layer, Docker reuses it.
- Any change invalidates that layer **and all subsequent layers**, triggering a rebuild from that point.

### Cache Invalidation Example

Changing the pip install command:

```
RUN pip3 install flask flask-mysql
```

Invalidates the `pip3 install` layer and everything that follows—earlier layers remain cached. Similarly, updating `app.py` in:

```
COPY app.py /opt/source-code
```

busts the cache from that layer onward.

---

## Cache Busting with Combined Instructions

Separating `apt-get update` and `apt-get install` can lead to stale package lists:

```
RUN apt-get update
RUN apt-get install -y python python3-pip python-dev
```

> [!important]
> **Warning**
>
> Stale package lists may cause installation of outdated or missing packages.

Instead, combine them:

```
RUN apt-get update && \
    apt-get install -y \
      python \
      python-dev \
      python3-pip
```

- Forces an update immediately before installation.
- Lists packages alphabetically and on separate lines for readability.

> [!important]
> **Note**
>
> Always include `&& rm -rf /var/lib/apt/lists/*` if you want to reduce image size.

### Version Pinning

Pinning package versions ensures consistent builds across environments:

```
RUN apt-get update && \
    apt-get install -y \
      python \
      python-dev \
      python3-pip=20.0.2
```

---

## Optimizing Instruction Order

Place instructions that change least frequently at the top of your Dockerfile. This maximizes cache reuse.

| Instruction Type         | Change Frequency | Caching Benefit                          |
| ------------------------ | ---------------- | ---------------------------------------- |
| Base Image & System      | Low              | Cached once unless you change the base   |
| Package Installation     | Low–Medium       | Reused until you add or remove packages  |
| Application Dependencies | Medium           | Rebuilt when dependencies change         |
| Application Code         | High             | Only this layer rebuilds on code changes |

### Example: Optimal Order

```
FROM ubuntu


# 1. Infrequently changed – cached once
RUN apt-get update && \
    apt-get install -y \
      python \
      python-dev \
      python3-pip=20.0.2


# 2. Dependencies – rebuild when you add/remove libs
RUN pip3 install flask flask-mysql


# 3. Code – fastest iteration on changes
COPY app.py /opt/source-code


ENTRYPOINT ["flask", "run"]
```

By contrast, placing `COPY app.py` first forces Docker to rerun all subsequent layers on every code update, significantly slowing builds.

---

## Further Reading

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Build Cache Documentation](https://docs.docker.com/engine/reference/commandline/build/#use-build-cache)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/33eeb774-1540-49e9-b5ee-dc051102a116)**
>
> Watch video content
