# Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Linux-Basics/Services)

---

## Table of Contents

- Services
  - Managing Services
  - Configuring a Custom Application as a Service
  - Creating a Systemd Unit File
  - Example: The Docker Service
  - Watch Video
  - Practice Lab
    - Explanation of the Unit File Sections
    - Breakdown of Docker’s Service Unit File

---

## Content

DevOps Pre-Requisite Course

Linux Basics

# Services

Linux services are background processes that are essential for running software such as web servers, database servers, and DevOps tools like Docker. They ensure critical applications continue running after a server restart, start in the correct order when multiple services are present, and manage dependencies effectively.

When you install a software package that runs in the background, it is automatically set up as a service. For example, installing the Apache web server creates an HTTPD service. You can manage it using the legacy service command or the modern systemctl command:

> [!important]
> **Legacy vs Modern Commands**
>
> Both commands achieve the same goal, but it is recommended to use systemctl for managing services on modern Linux distributions.

## Managing Services

Start the HTTPD service with the legacy command:

```
service httpd start
```

Or, use the preferred systemctl command:

```
systemctl start httpd
systemctl stop httpd
systemctl status httpd
systemctl enable httpd
systemctl disable httpd
```

---

## Configuring a Custom Application as a Service

Imagine you have a simple Python-based web server located at `/opt/code/my_app.py`. When executed with the Python interpreter, it starts a web server listening on port 5000. Running the command:

```
/usr/bin/python3 /opt/code/my_app.py
```

produces output similar to this:

```
 * Serving Flask app "my_app" (lazy loading)
 * Environment: production
WARNING: This is a development server. Do not use it in a production deployment.
Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

You can verify that the server is working by issuing:

```
curl http://localhost:5000
```

which should return:

```
Hello, World!
```

By configuring your Python application as a service, you abstract away the need to manually handle the command line and file paths each time. Start and stop the service simply with:

```
systemctl start my_app
systemctl stop my_app
```

This approach simplifies service management and minimizes manual intervention.

---

## Creating a Systemd Unit File

To ensure your application starts automatically on boot or restarts if it crashes, you need to create a systemd unit file. These files are typically stored in `/etc/systemd/system`. Create a file named `my_app.service` with the following content:

```
[Unit]
Description=My Python Web Application


[Service]
ExecStart=/usr/bin/python3 /opt/code/my_app.py
ExecStartPre=/opt/code/configure_db.sh
ExecStartPost=/opt/code/email_status.sh
Restart=always


[Install]
WantedBy=multi-user.target
```

### Explanation of the Unit File Sections

- **\[Unit\]**: Provides metadata and a short description of the service.
- **\[Service\]**: Contains the command to start your application (`ExecStart`), optional commands that run before or after starting the service (`ExecStartPre` and `ExecStartPost`), and a restart policy (`Restart=always`).
- **\[Install\]**: Configures the service to begin when the system reaches the multi-user target during the boot sequence.

After saving the file, reload systemd to register your new service:

```
systemctl daemon-reload
```

Then, start the service:

```
systemctl start my_app
```

Check its status using:

```
systemctl status my_app
```

A successful status output might look like:

```
my_app.service
   Loaded: loaded (/etc/systemd/system/my_app.service; static; vendor preset: disabled)
   Active: active (running) since Tue 2020-04-07 09:01:39 UTC; 2s ago
 Main PID: 5038 (python3)
   CGroup: /system.slice/my_app.service
           └─5038 /usr/bin/python3 /opt/code/my_app.py


Apr 07 09:01:39 systemd[1]: Started my_app.service.
Apr 07 09:01:39 python3[5038]: * Serving Flask app "my_app" (lazy loading)
Apr 07 09:01:39 python3[5038]: * Environment: production
Apr 07 09:01:39 python3[5038]: WARNING: This is a development server. Do not use it in a production deployment.
Apr 07 09:01:39 python3[5038]: * Debug mode: off
Apr 07 09:01:39 python3[5038]: * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
Hint: Some lines were ellipsized, use -l to show in full.
```

Test the service again with:

```
curl http://localhost:5000
```

which should return:

```
Hello, World!
```

This configuration ensures that your service starts automatically on boot and restarts if it crashes.

---

## Example: The Docker Service

For a more complex example, consider the Docker daemon. After installing Docker, an executable named `docker` is available at `/usr/bin/docker`, and it is configured as a service using a unit file typically located at `/lib/systemd/system/docker.service`. Below is a typical Docker service configuration:

```
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
BindsTo=containerd.service
After=network-online.target firewalld.service containerd.service
Wants=network-online.target
Requires=docker.socket


[Service]
Type=notify
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always
StartLimitBurst=3
StartLimitInterval=60s
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity


[Install]
WantedBy=multi-user.target
```

### Breakdown of Docker’s Service Unit File

- **\[Unit\]**: Sets a description and lists dependency requirements.
- **\[Service\]**: Defines how Docker is started, how to reload its configuration, and its restart behavior. It also sets resource limits.
- **\[Install\]**: Specifies that Docker should start when the system reaches the multi-user target.

After installation, the Docker daemon automatically runs in the background and listens for Docker commands. This configuration serves as a model for setting up any custom application as a service.

---

In practice, applying these configurations allows you to efficiently manage services on your Linux system, ensuring reliability and ease of maintenance. For more details on managing services, consider exploring resources such as [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and the [Docker Documentation](https://docs.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/f9aed83e-a703-49dd-a2ca-1f532a2163e4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/c990b480-a646-4321-89b4-a6fbc217f4e2/lesson/0a7c8acf-aa82-4c19-93f2-d7a34aec6f61)**
>
> Practice lab
