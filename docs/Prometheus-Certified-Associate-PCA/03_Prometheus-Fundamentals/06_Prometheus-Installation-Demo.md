# Prometheus Installation Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Prometheus-Installation-Demo)

---

## Table of Contents

- Prometheus Installation Demo
  - 1. Create the Prometheus User
  - 2. Create Necessary Directories and Set Permissions
  - 3. Copy Prometheus Binaries
  - 4. Move Console Directories and Update Ownership
  - 5. Create the Prometheus Systemd Service File
  - 6. Reload Systemd and Start Prometheus
  - 7. Verify the Prometheus Web UI
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Prometheus Installation Demo

In this guide, you will learn how to set up Prometheus with a dedicated Systemd unit. We cover creating a dedicated user, configuring directories and permissions, copying binaries, adding console assets, and configuring the Prometheus service to run automatically. Follow these steps to ensure your Prometheus installation is secure and optimized.

---

## 1\. Create the Prometheus User

Start by creating a system user named "prometheus" without a home directory and with the shell set to `/bin/false`:

```
sudo useradd --no-create-home --shell /bin/false prometheus
[sudo] password for user1:
```

> [!important]
> **User Creation Note**
>
> Creating a dedicated user increases security by isolating Prometheus processes from other system users.

---

## 2\. Create Necessary Directories and Set Permissions

Create the configuration and data directories required by Prometheus and assign them to the prometheus user:

```
sudo mkdir /etc/prometheus/
sudo mkdir /var/lib/prometheus/
sudo chown prometheus:prometheus /etc/prometheus/
sudo chown prometheus:prometheus /var/lib/prometheus/
```

If you have not already downloaded and extracted the Prometheus binaries, download them using `wget` and extract the archive. Verify your working directory by listing its contents:

```
ls
```

For example, your output may look like:

```
Desktop    Documents    Downloads    Music    Pictures    prometheus-2.37.2.linux-amd64    prometheus-2.37.2.linux-amd64.tar.gz    Public    snap    Templates    Videos
```

Change into the extracted directory and check its contents:

```
cd prometheus-2.37.2.linux-amd64
ls -l
```

A typical output should be similar to:

```
total 206288
drwxr-xr-x 2 user1 user1   4096 Nov  4 07:24 console_libraries
drwxr-xr-x 9 user1 user1   4096 Nov  4 07:15 consoles
drwxr-xr-x 9 user1 user1   4096 Nov  4 07:15 data
-rw-r--r-- 1 user1 user1   2245 Nov  4 07:24 LICENSE
-rw-r--r-- 1 user1 user1    3773 Nov  4 07:24 NOTICE
drwxr-xr-x 2 user1 user1   4096 Nov  4 07:09 prometheus
-rw-r--r-- 1 user1 user1    2001 Nov  4 07:24 prometheus.yml
-rw-r--r-- 1 user1 user1 101509240 Nov  4 07:11 promtool
```

---

## 3\. Copy Prometheus Binaries

Transfer the Prometheus and promtool binaries to `/usr/local/bin` and adjust their ownership:

```
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo chown prometheus:prometheus /usr/local/bin/prometheus
```

> [!important]
> **Binary Location**
>
> Placing binaries in `/usr/local/bin` ensures they are in the system's PATH, making it easier to execute Prometheus commands.

---

## 4\. Move Console Directories and Update Ownership

Prometheus uses console templates and libraries for its web UI. Copy the `consoles` and `console_libraries` directories to `/etc/prometheus` and update their permissions:

```
sudo cp -r consoles/ /etc/prometheus/
sudo cp -r console_libraries/ /etc/prometheus/


sudo chown -R prometheus:prometheus /etc/prometheus/consoles/
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries/
```

Next, copy the `prometheus.yml` configuration file into `/etc/prometheus` and adjust its ownership:

```
sudo cp prometheus.yml /etc/prometheus/
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml
```

---

## 5\. Create the Prometheus Systemd Service File

Create a new Systemd service file located at `/etc/systemd/system/prometheus.service` with the following configuration:

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
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries


[Install]
WantedBy=multi-user.target
```

Save and exit your editor once you've added the above content.

> [!important]
> **Service Configuration Tip**
>
> Ensure the paths in the service file match the locations you used during the installation process to avoid startup issues.

---

## 6\. Reload Systemd and Start Prometheus

Reload the Systemd daemon to incorporate the new service file, then start the Prometheus service:

```
sudo systemctl daemon-reload
sudo systemctl start prometheus
```

Verify that Prometheus is active by checking its status:

```
systemctl status prometheus
```

The expected output should include details such as:

```
● prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; disabled; vendor preset: enabled)
   Active: active (running) since Sat 2022-11-12 23:22:54 EST; 4s ago
 Main PID: 13407 (prometheus)
    Tasks: 6 (limit: 9457)
   Memory: 16.5M
      CPU: 50ms
   CGroup: /system.slice/prometheus.service
           └─13407 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Here are some typical log entries you might observe:

```
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.203Z caller=head.go:542 level=info component=tsdb msg="Replaying WAL, this may take a while"
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.204Z caller=tls_config.go:195 level=info component=web msg="TLS is disabled." http2=false
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.613Z caller=main.go:613 level=info component=tsdb msg="WAL segment loaded" segment=0 maxSegment=0
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.613Z caller=ceph.go:370 level=info component=tsdb msg="WAL replay completed" checkpoint_replay_duration=40.715µs
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.615Z caller=main.go:957 level=info component=tsdb msg="TSDB started"
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.206Z caller=main.go:96 level=info msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.206Z caller=main.go:96 level=info msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.206Z caller=main.go:957 level=info msg="Server is ready to receive web requests."
Nov 12 23:22:54 user1 prometheus[13407]: ts=2022-11-13T04:22:54.206Z caller=manager.go:941 level=info component=rule manager="Starting rule manager..."
```

Finally, enable Prometheus to start automatically on boot:

```
sudo systemctl enable prometheus
```

The confirmation output should be similar to:

```
Created symlink /etc/systemd/system/multi-user.target.wants/prometheus.service → /etc/systemd/system/prometheus.service.
```

---

## 7\. Verify the Prometheus Web UI

Open your web browser and navigate to [http://localhost:9090](http://localhost:9090) to access the Prometheus UI. This confirms that the service is up and running and that you can start monitoring your systems.

---

This completes the Prometheus installation and configuration process. For additional information, refer to the official [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/597bc552-f9de-4d23-b908-5a4148626197)**
>
> Watch video content
