# Configure network services to start automatically at boot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Basic-Networking/Configure-network-services-to-start-automatically-at-boot)

---

## Table of Contents

- Configure network services to start automatically at boot
  - Check the NetworkManager Service Status
  - Installing NetworkManager (if necessary)
  - Enable Autoconnect on a Specific Network Connection
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Basic Networking

# Configure network services to start automatically at boot

In this lesson, you will learn how to configure Linux systems to start network services automatically during boot. Ensuring that these services are enabled is critical for the network devices to obtain an IP address, gateway, routes, and other necessary settings.

A crucial program for managing network connectivity is NetworkManager. If NetworkManager does not start automatically, your network configuration may fail, preventing essential services from initializing correctly.

> [!important]
> **Important**
>
> Ensure you use an uppercase "N" and "M" when referencing NetworkManager.

## Check the NetworkManager Service Status

To verify that NetworkManager is running, execute the following command:

```
$ systemctl status NetworkManager.service
NetworkManager.service - Network Manager
Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled; vendor preset: enabled)
Active: active (running) since Mon 2021-12-20 00:57:02 CST; 2h 31min ago
Docs: man:NetworkManager(8)
Main PID: 1024 (NetworkManager)
Tasks: 3 (limit: 23555)
Memory: 8.1M
CGroup: /system.slice/NetworkManager.service
        └─1024 /usr/sbin/NetworkManager --no-daemon
```

If the output confirms that the service is active, running, and enabled, then NetworkManager is properly configured to start at boot.

## Installing NetworkManager (if necessary)

In some cases, NetworkManager may not be pre-installed on your system. To install it, run the following command:

```
$ sudo dnf install NetworkManager
```

Once installed, start the service with:

```
$ sudo systemctl start NetworkManager.service
```

## Enable Autoconnect on a Specific Network Connection

To ensure that a specific network connection is initialized at boot, you need to modify its autoconnect settings:

1.  **List all configured connections:**  
    Run the command below to view all connections. Identify the connection you wish to modify (in this example, it is "enp0s3").

    ```
    $ nmcli connection show
    NAME     UUID                                  TYPE      DEVICE
    enp0s3  fafdf03a-8b55-4b81-b582-3e84b50fa8f5  ethernet  enp0s3
    ```

2.  **Enable autoconnect:**  
    Modify the autoconnect setting for the desired connection with:

    ```
    $ sudo nmcli connection modify enp0s3 autoconnect yes
    ```

This configuration ensures that the specified network connection automatically initializes when the system boots.

This concludes the lesson on configuring network services to start automatically at boot. For further details, consider exploring [NetworkManager Documentation](https://developer.gnome.org/NetworkManager/stable/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/a192226e-efe0-46aa-b980-82293ae90ff3)**
>
> Watch video content
