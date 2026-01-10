# COPY vs ADD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/COPY-vs-ADD)

---

## Table of Contents

- COPY vs ADD
  - Why It Matters
  - Feature Comparison
  - Simple Usage Examples
  - Consolidating Steps with RUN
  - When You Need ADD for Remote Files
  - Best Practices
  - Links and References
  - Watch Video
    - 1. Using COPY
    - 2. Using ADD for a Local Directory
    - 3. ADD to Extract a Local Archive

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# COPY vs ADD

In this guide, we’ll compare the `COPY` and `ADD` directives in a Dockerfile, highlight their differences, and share best practices for keeping your images predictable and lean.

## Why It Matters

Both `COPY` and `ADD` bring files and directories from your build context into the container’s filesystem. However, `ADD` has two extra behaviors that can be surprising:

- Automatic extraction of local archives
- Remote URL download at build time

By understanding these differences, you can write clearer Dockerfiles and avoid unintended side effects.

## Feature Comparison

| Directive | Copies Local Files/Dirs | Extracts Local Archives | Downloads Remote URLs |
| --------- | ----------------------- | ----------------------- | --------------------- |
| `COPY`    | ✔️                      | ❌                      | ❌                    |
| `ADD`     | ✔️                      | ✔️                      | ✔️                    |

> [!important]
> **Warning**
>
> Overusing `ADD` can introduce unexpected files or extra layers. If you only need to transfer files, prefer `COPY`.

---

## Simple Usage Examples

### 1\. Using COPY

A straightforward copy of `testdir` from your context into the image:

```
FROM centos:7
COPY testdir /testdir
```

### 2\. Using ADD for a Local Directory

Functionally identical to `COPY` when the source is a directory:

```
FROM centos:7
ADD testdir /testdir
```

### 3\. ADD to Extract a Local Archive

Automatically unpack `app.tar.xz` into `/testdir`:

```
FROM centos:7
ADD app.tar.xz /testdir
```

---

## Consolidating Steps with RUN

Multiple `RUN` instructions add layers. Combine download, extraction, build, and cleanup in one `RUN` to keep images small:

```
FROM centos:7

RUN curl -fsSL http://example.com/app.tar.xz \
    | tar -xJ -C /testdir \
    && cd /testdir \
    && yarn build
```

This single-layer approach removes the archive stream in-flight, leaving no temporary files behind.

---

## When You Need ADD for Remote Files

If you prefer `ADD` to fetch a URL, then extract manually:

```
FROM centos:7

# Downloads to /testdir/app.tar.xz
ADD http://example.com/app.tar.xz /testdir

# Extract & build in a separate step
RUN tar -xJf /testdir/app.tar.xz -C /tmp/app \
    && make -C /tmp/app
```

> [!important]
> **Note**
>
> For clarity and layer reduction, consider using a single `RUN` with `curl` and `tar` instead of `ADD`.

---

## Best Practices

- Use `COPY` for straightforward file and directory transfers.
- Reserve `ADD` for:
  - Local archive auto-extraction (`.tar`, `.tar.gz`, etc.).
  - Quick remote downloads without further processing.
- Combine commands in a single `RUN` to minimize image layers and overall size.

---

## Links and References

- [Dockerfile reference: COPY](https://docs.docker.com/engine/reference/builder/#copy)
- [Dockerfile reference: ADD](https://docs.docker.com/engine/reference/builder/#add)
- [Docker best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/d919e735-ad69-48d7-9186-bd69290c4c7f)**
>
> Watch video content
