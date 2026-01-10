# Prometheus Installation systemd - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Prometheus-Installation-systemd)

---

## Table of Contents

- Prometheus Installation systemd
  - Running Prometheus Manually
  - Creating a Dedicated Prometheus User
  - Setting Up Directories for Configuration and Data
  - Downloading and Installing Prometheus
  - Configuring Prometheus Files
  - Running Prometheus with Custom Parameters
  - Creating a systemd Unit File for Prometheus
  - Enabling and Starting the Prometheus Service
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Prometheus Installation systemd

In this guide, we will demonstrate how to configure Prometheus to run as a background service managed by systemd. Running Prometheus directly from the terminal presents two primary challenges:

1.  Prometheus runs in the foreground, meaning that closing the terminal also terminates the process.
2.  It does not start automatically on boot, requiring manual intervention after each reboot.

Our objective is to set up a systemd unit for Prometheus so you can easily manage it using commands like "systemctl start prometheus" and ensure it launches on system startup.

---

## Running Prometheus Manually

Initially, you might run Prometheus using:

```
$ ./prometheus
```

However, to integrate it with system services, you will want to use:

```
$ systemctl start prometheus
```

To enable this functionality, we will create a systemd unit file for Prometheus.

---

## Creating a Dedicated Prometheus User

For security purposes, create a dedicated system user for running Prometheus. Since this account is not intended for interactive login, run the following command:

```
$ sudo useradd --no-create-home --shell /bin/false prometheus
```

> [!important]
> **Note**
>
> Running Prometheus under its own user limits potential security breaches and improves overall system safety.

---

## Setting Up Directories for Configuration and Data

Create the necessary directories for Prometheus configuration and data storage. The convention is to store configuration files in `/etc` and persistent data in `/var/lib`.

```
$ sudo mkdir /etc/prometheus
$ sudo mkdir /var/lib/prometheus
```

After the directories are created, update their ownership to the Prometheus user and group.

---

## Downloading and Installing Prometheus

Before proceeding, download the Prometheus binary from the official release repository. For example:

```
$ wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linu
```

Once downloaded, extract the tarball. Then, transfer the Prometheus executable and the Promtool CLI utility to `/usr/local/bin`, which is the standard location for executables. Ensure these files are assigned to the Prometheus user for proper access control.

---

## Configuring Prometheus Files

Next, copy the dashboard-related directories into the configuration directory. This includes the consoles and console libraries, which are essential for the Prometheus web interface:

```
$ sudo cp -r consoles /etc/prometheus
$ sudo cp -r console_libraries /etc/prometheus
```

Update the ownership of these copied directories:

```
$ sudo chown -R prometheus:prometheus /etc/prometheus/consoles
$ sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries
```

Then, copy the main configuration file (`prometheus.yaml`) to `/etc/prometheus` and rename it as `prometheus.yml`:

```
$ sudo cp prometheus.yaml /etc/prometheus/prometheus.yml
```

Again, ensure that the configuration file has the proper ownership by the Prometheus user.

---

## Running Prometheus with Custom Parameters

With the directories and configuration files in place, you can test the Prometheus binary with custom parameters. This command specifies the configuration file location, data storage path, and web console directories:

```
$ sudo -u prometheus /usr/local/bin/prometheus \
  --config.file /etc/prometheus/prometheus.yml \
  --storage.tsdb.path /var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries
```

> [!important]
> **Tip**
>
> Testing Prometheus with the proper parameters ensures that it can locate all necessary resources for a successful startup.

---

## Creating a systemd Unit File for Prometheus

To integrate Prometheus with systemd, create a new unit file:

```
$ sudo vi /etc/systemd/system/prometheus.service
```

Insert the following content into the file:

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target


[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/var/lib/prometheus/ \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries


[Install]
WantedBy=multi-user.target
```

Explanation:

- The \[Unit\] section ensures that Prometheus starts only after the network is online.
- In the \[Service\] section, Prometheus is assigned to run with the dedicated user and group, and the execution command is clearly defined.
- The \[Install\] section specifies that the service should be activated as part of the standard multi-user system startup.

---

## Enabling and Starting the Prometheus Service

After saving the systemd unit file, reload systemd to register the new service:

```
$ sudo systemctl daemon-reload
```

Start the Prometheus service with the following command:

```
$ sudo systemctl start prometheus
```

Verify that Prometheus is running:

```
$ sudo systemctl status prometheus
```

Finally, enable the service to launch automatically upon system boot:

```
$ sudo systemctl enable prometheus
```

> [!important]
> **Summary**
>
> By following these steps, Prometheus will run as a managed background service and automatically start during system boot, ensuring continuous monitoring without manual intervention.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/9f512f96-05d4-420d-b643-4ab94a9b5c20)**
>
> Watch video content
