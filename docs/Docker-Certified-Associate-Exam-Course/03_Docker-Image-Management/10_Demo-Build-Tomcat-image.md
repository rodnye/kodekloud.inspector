# Demo Build Tomcat image - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Demo-Build-Tomcat-image)

---

## Table of Contents

- Demo Build Tomcat image
  - Table of Contents
  - Prerequisites
  - Clone the Repository
  - Reviewing the Dockerfile
  - Dockerfile Instruction Reference
  - Building and Running the Default Image
  - Building with a Custom Tomcat Version
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Demo Build Tomcat image

In this tutorial, you’ll learn how to create a Docker image for Apache Tomcat on a CentOS 7 base. We’ll introduce a build-time argument (`ARG`) for Tomcat versioning, and demonstrate how to override it at build time.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Clone the Repository](#clone-the-repository)
- [Reviewing the Dockerfile](#reviewing-the-dockerfile)
- [Dockerfile Instruction Reference](#dockerfile-instruction-reference)
- [Building and Running the Default Image](#building-and-running-the-default-image)
- [Building with a Custom Tomcat Version](#building-with-a-custom-tomcat-version)
- [Links and References](#links-and-references)

---

## Prerequisites

- Docker Engine installed (≥ 19.03)
- Basic familiarity with Docker commands
- Internet access to download Tomcat and sample WAR

> [!important]
> **Note**
>
> Ensure you have enough disk space (~500 MB) and proper network connectivity to Apache archives.

---

## Clone the Repository

Get the sample project containing our `Dockerfile`:

```
cd /tmp
git clone https://github.com/yogeshraheja/dockertomcat.git
cd dockertomcat
ls -ltr
# README.md  Dockerfile
```

---

## Reviewing the Dockerfile

Below is the complete `Dockerfile`. It installs OpenJDK 8, downloads Tomcat into `/opt/tomcat`, sets permissions, and deploys a sample WAR file.

```
FROM centos:7


# Define a build-time variable for Tomcat version
ARG tomcat_version=8.5.6


# Install prerequisites
RUN yum install -y epel-release java-1.8.0-openjdk.x86_64 wget


# Create tomcat group and home directory
RUN groupadd tomcat && mkdir -p /opt/tomcat


# Create non-interactive tomcat user
RUN useradd -s /bin/nologin -g tomcat -d /opt/tomcat tomcat


# Download and extract Tomcat
WORKDIR /
RUN wget https://archive.apache.org/dist/tomcat/tomcat-8/v${tomcat_version}/bin/apache-tomcat-${tomcat_version}.tar.gz \
 && tar -zxvf apache-tomcat-${tomcat_version}.tar.gz -C /opt/tomcat --strip-components=1


# Set ownership and permissions
RUN cd /opt/tomcat \
 && chgrp -R tomcat conf bin lib logs temp webapps work \
 && chmod g+rx conf \
 && chmod g+r conf/* \
 && chown -R tomcat tomcat logs temp webapps work \
 && chmod g+r bin/*


# Deploy sample application
WORKDIR /opt/tomcat/webapps
RUN wget https://tomcat.apache.org/tomcat-7.0-doc/appdev/sample/sample.war


# Expose port and define startup command
EXPOSE 8080
CMD ["/opt/tomcat/bin/catalina.sh","run"]
```

---

## Dockerfile Instruction Reference

| Instruction | Description                                        | Example                                  |
| ----------- | -------------------------------------------------- | ---------------------------------------- |
| `FROM`      | Base image                                         | `centos:7`                               |
| `ARG`       | Build-time variable; default Tomcat version        | `ARG tomcat_version=8.5.6`               |
| `RUN`       | Execute shell commands (install, create, download) | `yum install -y java-1.8.0-openjdk wget` |
| `WORKDIR`   | Set working directory                              | `/opt/tomcat/webapps`                    |
| `EXPOSE`    | Document container port                            | `8080`                                   |
| `CMD`       | Default command when container starts              | `["/opt/tomcat/bin/catalina.sh","run"]`  |

---

## Building and Running the Default Image

Build with the default Tomcat version (`8.5.6`):

```
docker build -t yogeshraheja/tomcatone:v1 .
```

Expected output:

```
Successfully built <IMAGE_ID>
Successfully tagged yogeshraheja/tomcatone:v1
```

Run the container, mapping host port 84 to container port 8080:

```
docker run -d --name tomcat_default -p 84:8080 yogeshraheja/tomcatone:v1
```

Now visit `http://<host>:84` in your browser. You should see the Tomcat welcome page for version 8.5.6.

---

## Building with a Custom Tomcat Version

You can override `tomcat_version` at build time to use any release from the [Apache Tomcat Archive](https://archive.apache.org/dist/tomcat/):

```
docker build \
  --build-arg tomcat_version=8.5.8 \
  -t yogeshraheja/tomcatone:v2 .
```

Sample output:

```
Successfully built <NEW_IMAGE_ID>
Successfully tagged yogeshraheja/tomcatone:v2
```

Verify both images:

```
docker image ls yogeshraheja/tomcatone
# REPOSITORY             TAG    IMAGE ID       SIZE
# yogeshraheja/tomcatone  v2     <NEW_IMAGE_ID> 497MB
# yogeshraheja/tomcatone  v1     <OLD_IMAGE_ID> 497MB
```

Run the new container on port 86:

```
docker run -d --name tomcat_custom -p 86:8080 yogeshraheja/tomcatone:v2
```

Now open `http://<host>:86` to confirm you’re running Tomcat version 8.5.8.

> [!important]
> **Warning**
>
> Always verify that the Tomcat version you specify in `--build-arg` exists in the archive. Incorrect versions will cause the build to fail.

---

## Links and References

- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Apache Tomcat Archive](https://archive.apache.org/dist/tomcat/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub: dockertomcat](https://github.com/yogeshraheja/dockertomcat)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/d931f184-8e2f-4ad6-8108-5f32da353b5d)**
>
> Watch video content
