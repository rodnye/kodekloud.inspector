# Configure time service clients - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Basic-Networking/Configure-time-service-clients)

---

## Table of Contents

- Configure time service clients
  - Verify Chrony Service
  - Checking System Time Settings
  - Configuring Time Zone
  - Installing and Enabling Chrony
  - Verifying Time Synchronization
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Basic Networking

# Configure time service clients

Maintaining an accurate system clock is essential for many server operations. Hardware clocks can drift over time, causing discrepancies that might affect scheduling, logging, and security operations. In this guide, you'll learn how to synchronize time on Linux systems using network peers and the Chrony daemon.

Chrony is the default time synchronization tool in modern CentOS systems. It regularly updates the system clock by retrieving time data from trusted internet servers. For example, even a small drift—where your server shows 6 seconds past midnight while the actual time is 5 seconds—can result in noticeable inaccuracies over prolonged periods.

## Verify Chrony Service

To confirm that Chrony is running correctly, execute the following command:

```
$ systemctl status chronyd.service
Selected source 185.82.232.254 (2.centos.pool.ntp.org)
System clock was stepped by -0.000844 seconds
```

Ensure that the Chrony service is active, enabled, and free from errors. If the service appears inactive or displays errors, refer to the troubleshooting steps in the official [Chrony documentation](https://chrony.tuxfamily.org/).

## Checking System Time Settings

You can inspect the current system time configuration with the `timedatectl` command:

```
$ timedatectl
Local time: Mon 2021-12-20 01:02:20 CST
Universal time: Mon 2021-12-20 07:02:20 UTC
RTC time: Mon 2021-12-20 07:02:20
Time zone: America/Chicago (CST, -0600)
System clock synchronized: no
NTP service: inactive
RTC in local TZ: no
```

> [!important]
> **Note**
>
> An unsynchronized clock can lead to issues in log management and automated tasks. Always verify that the system time is accurate.

## Configuring Time Zone

Before setting up Chrony, it's important to configure the correct time zone for your server. For instance, to set your server's time zone to New York time, use:

```
$ sudo timedatectl set-timezone America/New_York
```

To view a list of all available time zones, run:

```
$ timedatectl list-timezones
America/Adak
America/Anchorage
America/Anguilla
America/Antigua
America/Araguaina
America/Argentina/Buenos_Aires
America/Argentina/Catamarca
America/Argentina/Cordoba
```

## Installing and Enabling Chrony

If Chrony is not already installed on your system, follow these steps:

1.  **Install Chrony using the package manager:**

    ```
    $ sudo dnf install chrony
    ```

2.  **Start the Chrony service:**

    ```
    $ sudo systemctl start chronyd.service
    ```

3.  **Enable Chrony to start automatically at boot:**

    ```
    $ sudo systemctl enable chronyd.service
    Created symlink /etc/systemd/system/multi-user.target.wants/chronyd.service → /usr/lib/systemd/system/chronyd.service.
    ```

## Verifying Time Synchronization

After installing Chrony, check again using `timedatectl`:

```
$ timedatectl
Local time: Mon 2021-12-20 01:22:49 CST
Universal time: Mon 2021-12-20 07:22:49 UTC
RTC time: Mon 2021-12-20 07:22:46
Time zone: America/Chicago (CST, -0600)
System clock synchronized: yes
NTP service: active
RTC in local TZ: no
```

If you find that the system clock is still not synchronized, force synchronization by running:

```
$ sudo systemctl set-ntp true
```

> [!important]
> **Note**
>
> For additional details on troubleshooting time synchronization issues, please refer to the [Chrony Troubleshooting Guide](https://chrony.tuxfamily.org/documentation.html).

## Conclusion

By following the aforementioned steps, your server will maintain the correct time automatically, enhancing the reliability of server processes. Accurate timekeeping is crucial for server security, logging, and overall performance.

Now, let's get started with some hands-on labs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/75246eb4-0b66-4d9e-abb8-6dceb2f8b4c0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/5f16da06-6c71-4058-bfc5-6f4dd8754e9f/lesson/56e15344-ad6d-47f3-aaa4-2e905001fd44)**
>
> Practice lab
