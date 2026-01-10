# Configure a container to start automatically as a systemd service and attach persistent storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Containers/Configure-a-container-to-start-automatically-as-a-systemd-service-and-attach-persistent-storage)

---

## Table of Contents

- Configure a container to start automatically as a systemd service and attach persistent storage
  - Step 1. Update the container-tools Module Stream
  - Step 2. Prepare Directories for systemd Service and Persistent Storage
  - Step 3. Create and Test the Container
  - Step 4. Generate a Systemd Unit File for the Container
  - Step 5. Enable and Manage the Systemd Service
  - Conclusion
  - Watch Video
  - Practice Lab
    - Command Breakdown

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Containers

# Configure a container to start automatically as a systemd service and attach persistent storage

In this guide, you'll learn how to configure a container to start automatically as a rootless systemd service while attaching persistent storage for serving static content from your local machine.

> [!important]
> **Note**
>
> Ensure that your system's container-tools module stream is updated to use at least Podman version 2.0. RHEL 8’s default module stream includes Podman version 1.6, which is insufficient for this demonstration.

## Step 1. Update the container-tools Module Stream

Before you begin, change the container-tools module stream. Follow these steps:

1.  **Reset the container-tools module:**

    ```
    sudo yum module reset container-tools
    # Output:
    # Updating Subscription Management repositories.
    # Last metadata expiration check: 0:01:46 ago on Wed 07 Sep 2022 12:25:22 AM CDT.
    ```

2.  **Install the updated container-tools stream (version 3.0 includes Podman 2.0):**

    ```
    sudo yum module install container-tools:3.0
    # Output (partial):
    # Updating Subscription Management repositories.
    # Last metadata expiration check: 0:02:07 ago on Wed 07 Sep 2022 12:25:22 AM CDT.
    # ... [installation progress and package details] ...
    # Complete!
    ```

Once the installation completes, clear your screen and proceed with the following steps.

---

## Step 2. Prepare Directories for systemd Service and Persistent Storage

Configure your environment to run the container as a non-root user. First, create the necessary directories in your home directory:

1.  **Create the systemd user configuration directory and a directory for your container's persistent storage:**

    ```
    mkdir -p ~/.config/systemd/user
    mkdir ~/container_storage
    ```

2.  **Verify that the directories have been created by listing your home directory:**

    ```
    ls
    # Expected output:
    # container_storage  Documents  Music  Public  Videos
    # Desktop            Downloads  Pictures  Templates
    ```

3.  **Confirm the systemd configuration directory exists:**

    ```
    ls ~/.config/systemd/
    # Expected output:
    # user
    ```

4.  **Populate the storage directory with initial content. For example, create a file named `kodekloud.html`:**

    ```
    echo "KodeKloud" > ~/container_storage/kodekloud.html
    ```

You can later use the `cat` command to verify the file’s content.

---

## Step 3. Create and Test the Container

Next, create a container that will run a web server by pulling a web server image from Red Hat's registry. Run the container in detached mode with the following command:

```
podman run -d --name container_service -p 1025:8080 -v ~/container_storage:/var/www/html:Z registry.access.redhat.com/rhsc1/httpd-24-rhel
```

### Command Breakdown

- `-d`: Runs the container in detached mode.
- `--name container_service`: Assigns a custom name to the container.
- `-p 1025:8080`: Maps container port 8080 to host port 1025. Non-root users must use ports above 1024.
- `-v ~/container_storage:/var/www/html:Z`: Mounts your local `container_storage` directory to `/var/www/html` inside the container with SELinux context adjustment.
- The image is pulled from `registry.access.redhat.com/rhsc1/httpd-24-rhel`.

After the command executes, you should see an output similar to:

```
85dda4e2b19510c15a5393c664702850dbe8c56dd745142221a170295341d2b40
```

5.  **Confirm the container is running:**

    ```
    podman ps -a
    # Expected output (partial):
    # CONTAINER ID  IMAGE                                                   STATUS   PORTS                     NAMES
    # 85dda4e2b195  registry.access.redhat.com/rhsc1/httpd-24-rhel  Up ...  0.0.0.0:1025->8080/tcp  container_service
    ```

6.  **Test the web server using curl:**

    ```
    curl 127.0.0.1:1025/kodekloud.html
    # Expected output:
    # KodeKloud
    ```

---

## Step 4. Generate a Systemd Unit File for the Container

Now that your container is running correctly, generate a systemd unit file for it. Follow these steps:

1.  **Change directory to your user-level systemd configuration directory:**

    ```
    cd ~/.config/systemd/user
    ```

2.  **Generate the systemd unit file using Podman:**

    ```
    podman generate systemd --name container_service --new
    ```

    This command creates a unit file named similarly to `container-container_service.service`. You can inspect the generated file using:

    ```
    less container-container_service.service
    ```

    The file includes details such as:
    - `ExecStart`: Command to launch the container with proper options.
    - `ExecStop` and `ExecStopPost`: Instructions for a clean shutdown and removal of the container.

---

## Step 5. Enable and Manage the Systemd Service

Before enabling the systemd service to manage the container, stop and remove the currently running container:

1.  **Stop and remove the container:**

    ```
    podman kill container_service
    podman rm container_service
    ```

2.  **Allow the user to run services even when not logged in (enable user linger):**

    ```
    loginctl enable-linger
    ```

3.  **Reload the systemd user daemon and enable the service to start immediately and on boot:**

    ```
    systemctl --user daemon-reload
    systemctl --user enable --now container-container_service.service
    ```

    You should see output indicating the creation of symbolic links, such as:

    ```
    # Sample output:
    # Created symlink /home/aaron/.config/systemd/user/multi-user.target.wants/container-container_service.service → /home/aaron/.config/systemd/user/container-container_service.service.
    # Created symlink /home/aaron/.config/systemd/user/default.target.wants/container-container_service.service → /home/aaron/.config/systemd/user/container-container_service.service.
    ```

4.  **Reboot your system to verify that the container starts automatically. Once rebooted, test the web server again:**

    ```
    curl 127.0.0.1:1025/kodekloud.html
    # Expected output:
    # KodeKloud
    ```

5.  **Confirm that the container is running under systemd management:**

    ```
    podman ps -a
    # Expected output (partial):
    # CONTAINER ID   IMAGE                                                   COMMAND               CREATED             STATUS                PORTS                      NAMES
    # d5809ff87261   registry.access.redhat.com/rhsc1/httpd-24-rhel  /usr/bin/run-httpd  ...  Up ...    0.0.0.0:1025->8080/tcp  container_service
    ```

---

## Conclusion

This guide demonstrated how to configure a container for automatic startup as a rootless systemd service with attached persistent storage. With these steps, you can streamline container management and serve static content efficiently on your system. For further details on container management, refer to the [Podman documentation](https://podman.io/getting-started/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/141c7a78-21ef-4dd8-86a3-fb0ef5037a8d/lesson/455bbe6b-c1e5-4ad0-938e-a33b601584de)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/141c7a78-21ef-4dd8-86a3-fb0ef5037a8d/lesson/50b9b8f3-5fd9-4363-9a14-f2958ff73d68)**
>
> Practice lab
