# Logging Driver - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Logging-Driver)

---

## Table of Contents

- Logging Driver
  - What Is the Default json-file Logging Driver?
  - Supported Docker Logging Drivers
  - Changing the Daemon’s Default Logging Driver
  - Overriding the Logging Driver Per Container
  - Inspecting a Container’s Logging Configuration
  - Links and References
  - Watch Video
    - Where Are json-file Logs Stored?

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Logging Driver

In Docker, logging drivers determine how container and service logs are captured, formatted, and stored. By choosing the right logging driver, you can centralize logs, integrate with external systems, and manage log retention efficiently. You can always view a container’s output with:

```
docker logs <container-name>
```

but behind the scenes the logging driver dictates where and how those logs are persisted.

![The image features the text "Logging Drivers" on a dark background with abstract circular shapes and a wavy purple and blue design at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752873910/notes-assets/images/Docker-Certified-Associate-Exam-Course-Logging-Driver/logging-drivers-abstract-background.jpg)

## What Is the Default json-file Logging Driver?

Docker’s default logging driver is `json-file`. It collects container output and writes it as JSON objects on the host filesystem.

To confirm your daemon’s default driver:

```
docker system info
```

Look for:

```
Server:
  ...
  Logging Driver: json-file
  Cgroup Driver: cgroupfs
Plugins:
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
```

Run and inspect logs under `json-file`:

```
docker run -d --name nginx nginx
docker logs nginx
```

Sample output:

```
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
```

### Where Are json-file Logs Stored?

By default, log files are stored under `/var/lib/docker/containers/<container-id>`. Each container directory contains a file named `<container-id>-json.log`:

```
docker ps
cd /var/lib/docker/containers
ls
cat f3997637c0df66becf4dd4662d3c172bf16f916a3b9289b95f0994675102de17-json.log
```

> [!important]
> **Note**
>
> Rotating or cleaning up old JSON logs prevents disk exhaustion. Consider using Docker’s `log-opts` settings like `max-size` and `max-file`.

## Supported Docker Logging Drivers

Beyond `json-file`, Docker integrates with multiple logging backends. Choose the one that matches your infrastructure for centralized log aggregation:

| Driver   | Use Case                            | More Info                                                                                                 |
| -------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| awslogs  | Send logs to Amazon CloudWatch Logs | [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html) |
| fluentd  | Forward logs to a Fluentd collector | [Fluentd](https://www.fluentd.org/)                                                                       |
| gcplogs  | Ship logs to Google Cloud Logging   | [Google Cloud Logging](https://cloud.google.com/logging)                                                  |
| gelf     | Graylog Extended Log Format         | [GELF Specs](https://docs.graylog.org/docs/gelf)                                                          |
| journald | Use systemd’s journald              | [journald](https://www.freedesktop.org/wiki/Software/systemd/journald/)                                   |
| splunk   | Forward to Splunk                   | [Splunk Docs](https://docs.splunk.com/)                                                                   |
| syslog   | Standard syslog protocol            | —                                                                                                         |
| local    | Fast, built-in local driver         | —                                                                                                         |
| none     | Disable logging (no `docker logs`)  | —                                                                                                         |

> [!important]
> **Warning**
>
> Using the `none` driver disables all logs for the container. Only use this when you intentionally want zero log output.

## Changing the Daemon’s Default Logging Driver

To set a different default logging driver, modify (or create) `/etc/docker/daemon.json`:

```
{
  "log-driver": "awslogs",
  "log-opts": {
    "awslogs-region": "us-east-1"
  }
}
```

If you need TLS, custom hosts, or debug mode, include those settings alongside:

```
{
  "debug": true,
  "hosts": ["tcp://0.0.0.0:2376"],
  "tls": true,
  "tlscert": "/var/docker/server.pem",
  "tlskey": "/var/docker/serverkey.pem",
  "log-driver": "awslogs",
  "log-opts": {
    "awslogs-region": "us-east-1"
  }
}
```

Restart Docker to apply changes:

```
sudo systemctl restart docker
```

## Overriding the Logging Driver Per Container

You can override the daemon default for individual containers with the `--log-driver` flag:

```
docker run -d \
  --name myapp \
  --log-driver=fluentd \
  nginx
```

Add driver-specific options via `--log-opt`:

```
docker run -d \
  --name myapp \
  --log-driver=fluentd \
  --log-opt fluentd-address=localhost:24224 \
  nginx
```

## Inspecting a Container’s Logging Configuration

To verify which logging driver a container is using:

```
docker container inspect nginx
```

Search for the `HostConfig.LogConfig` section:

```
"HostConfig": {
  "LogConfig": {
    "Type": "json-file",
    "Config": {}
  }
}
```

For a concise output with a Go template:

```
docker container inspect -f '{{.HostConfig.LogConfig.Type}}' nginx
```

This prints only the driver name.

## Links and References

- [Docker Logging Drivers](https://docs.docker.com/config/containers/logging/configure/)
- [Kubernetes Logging with json-file](https://kubernetes.io/docs/concepts/cluster-administration/logging/#json-file)
- [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
- [Fluentd Official Website](https://www.fluentd.org/)
- [Google Cloud Logging Overview](https://cloud.google.com/logging)
- [Splunk Container Logging](https://docs.splunk.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/b1f59718-4ebf-419e-81d4-d8a6d53f4cf5)**
>
> Watch video content
