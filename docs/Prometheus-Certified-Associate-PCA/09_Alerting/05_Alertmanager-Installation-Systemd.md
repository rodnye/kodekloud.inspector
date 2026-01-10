# Alertmanager Installation Systemd - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Alerting/Alertmanager-Installation-Systemd)

---

## Table of Contents

- Alertmanager Installation Systemd
  - Step 1: Download and Extract Alertmanager
  - Step 2: Create the Alertmanager User
  - Step 3: Configure Alertmanager Files
  - Step 4: Install the Executables
  - Step 5: Create the Systemd Service File
  - Step 6: Reload systemd and Start Alertmanager
  - Verification and Troubleshooting
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

Alerting

# Alertmanager Installation Systemd

This guide explains how to set up Alertmanager to be managed by systemd. The instructions are similar to the setups for Prometheus and Node Exporter. Follow the steps below to download Alertmanager, configure the necessary files and permissions, and finally run Alertmanager as a systemd service.

---

## Step 1: Download and Extract Alertmanager

Download the Alertmanager package, extract its contents, and switch to the extracted directory:

```
wget https://github.com/prometheus/alertmanager/releases/download/v0.24.0/alertmanager-0.24.0.linux-amd64.tar.gz
# Note: You might encounter an SSL certificate issue:
tar xzf alertmanager-0.24.0.linux-amd64.tar.gz
cd alertmanager-0.24.0.linux-amd64
```

---

## Step 2: Create the Alertmanager User

Create a dedicated user named `alertmanager` to run the application. This user does not require a home directory and should have a disabled login shell:

```
sudo useradd --no-create-home --shell /bin/false alertmanager
```

> [!important]
> **Note**
>
> Creating a dedicated user helps isolate Alertmanager from other system processes and improves security.

---

## Step 3: Configure Alertmanager Files

Set up the configuration and data directories for Alertmanager, then change ownership to the new user.

1.  Create the configuration directory, move the configuration file, and update its permissions:

    ```
    sudo mkdir /etc/alertmanager
    sudo mv alertmanager.yml /etc/alertmanager
    sudo chown -R alertmanager:alertmanager /etc/alertmanager
    ```

2.  Create the data directory for runtime data storage and update its ownership:

    ```
    sudo mkdir /var/lib/alertmanager
    sudo chown -R alertmanager:alertmanager /var/lib/alertmanager
    ```

---

## Step 4: Install the Executables

Copy the Alertmanager executable into `/usr/local/bin` so it is available system-wide:

```
sudo cp alertmanager /usr/local/bin
```

After copying, update the ownership of the executable:

```
sudo chown alertmanager:alertmanager /usr/local/bin/alertmanager
```

If you choose to manage `amtool` similarly, adjust its ownership likewise:

```
sudo chown alertmanager:alertmanager /usr/local/bin/amtool
```

---

## Step 5: Create the Systemd Service File

Create and configure a new systemd service file for Alertmanager:

1.  Open a new service file for editing:

    ```
    sudo vi /etc/systemd/system/alertmanager.service
    ```

2.  Insert the following content into the file:

    ```
    [Unit]
    Description=Alert Manager
    Wants=network-online.target
    After=network-online.target


    [Service]
    Type=simple
    User=alertmanager
    Group=alertmanager
    ExecStart=/usr/local/bin/alertmanager \
      --config.file=/etc/alertmanager/alertmanager.yml \
      --storage.path=/var/lib/alertmanager
    Restart=always


    [Install]
    WantedBy=multi-user.target
    ```

Ensure the `ExecStart` command correctly points to the configuration file and data storage directory.

> [!important]
> **Note**
>
> Double-check the paths in the service file to verify they match your actual configuration locations.

---

## Step 6: Reload systemd and Start Alertmanager

After setting up the service file, reload systemd to register the new service, then start and enable Alertmanager:

```
sudo systemctl daemon-reload
sudo systemctl start alertmanager
sudo systemctl enable alertmanager
```

> [!important]
> **Note**
>
> Enabling the service ensures that Alertmanager starts automatically on system boot.

---

## Verification and Troubleshooting

Verify the extracted Alertmanager directory's contents to ensure all necessary files are present:

```
ls -la
total 55752
drwxr-xr-x 2 user1 user1  4096 Mar 25  2022 .
drwxr-xr-x 19 user1 user1  4096 Nov 14 15:34 ..
-rwxr-xr-x 1 user1 user1 31988661 Mar 25  2022 alertmanager
-rw-r--r-- 1 user1 user1    356 Mar 25  2022 alertmanager.yml
-rw-r--r-- 1 user1 user1  11357 Mar 25  2022 amtool
-rw-r--r-- 1 user1 user1    457 Mar 25  2022 LICENSE
-rw-r--r-- 1 user1 user1    197 Mar 25  2022 NOTICE
```

If you receive an error while setting ownership (e.g., `chown: invalid user: 'alertmanager:alertmanager'`), ensure the user was created correctly. Then repeat the command:

```
sudo chown alertmanager:alertmanager /usr/local/bin/alertmanager
```

Repeat ownership changes for `amtool` if necessary:

```
sudo chown alertmanager:alertmanager /usr/local/bin/amtool
```

Finally, reload systemd and re-start the service:

```
sudo systemctl daemon-reload
sudo systemctl start alertmanager
sudo systemctl enable alertmanager
```

> [!important]
> **Warning**
>
> If you experience issues restarting the service, verify the service file paths and permissions of the Alertmanager executable and configuration files.

---

At this point, Alertmanager has been successfully installed and managed by systemd. For additional details on configuring and using Alertmanager, consult the [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/eb7ae2f0-0d55-4789-af61-fdf337265d10)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/499d9ac5-c2e0-43fe-b000-f08f33fbf2dc/lesson/fbd1026a-cd0c-4ebf-89bb-4182630754ba)**
>
> Practice lab
