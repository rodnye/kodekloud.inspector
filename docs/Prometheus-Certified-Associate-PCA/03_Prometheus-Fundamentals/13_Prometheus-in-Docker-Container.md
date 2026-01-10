# Prometheus in Docker Container - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Prometheus-in-Docker-Container)

---

## Table of Contents

- Prometheus in Docker Container
  - Step 1: Configure Prometheus
  - Step 2: Run Prometheus in a Docker Container
  - Watch Video
    - Command Breakdown

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Prometheus in Docker Container

In previous guides, we demonstrated how to install Prometheus on a virtual machine or bare-metal server. This article explains how to run Prometheus inside a Docker container, making it easier to manage in a containerized environment.

## Step 1: Configure Prometheus

Start by creating and editing your Prometheus configuration file (prometheus.yml) just as you would for a bare-metal setup. The configuration remains identical. For example:

```
global:
  scrape_configs:
    - job_name: "prometheus"
      static_configs:
        - targets: ["localhost:9090"]
```

> [!important]
> **Note**
>
> Ensure that your configuration file is correctly formatted to avoid any issues during startup.

## Step 2: Run Prometheus in a Docker Container

Next, pull the official Prometheus image from Docker Hub and run it. You will expose the default port (9090) and bind mount your configuration file to ensure that changes made on the host are immediately reflected in the container.

Below is the command to launch the Prometheus container:

```
$ vi prometheus.yml
$ docker run -d -v /path-to/prometheus.yml:/etc/prometheus/prometheus.yml -p 9090:9090 prom/prometheus
```

### Command Breakdown

- `vi prometheus.yml`: Opens your configuration file for editing.
- `docker run -d`: Runs the container in detached mode.
- `-v`: Creates a bind mount, mapping the local configuration file to the container’s `/etc/prometheus/prometheus.yml` path.
- `-p 9090:9090`: Maps the container's port 9090 to the host, allowing you to access Prometheus.

With these steps completed, your Prometheus instance running inside a Docker container will listen on port 9090. Any modifications to the prometheus.yml file on your host will be automatically applied within the container.

> [!important]
> **Quick Tip**
>
> For additional security and performance improvements, consider reviewing the [Prometheus documentation](https://prometheus.io/docs/introduction/overview/) for best practices on configuration and resource management.

That’s all you need to dockerize your Prometheus server in a containerized environment. Enjoy the benefits of a flexible and portable monitoring solution!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/3ab9bea4-bfdd-474e-849b-ed7446b550d4)**
>
> Watch video content
