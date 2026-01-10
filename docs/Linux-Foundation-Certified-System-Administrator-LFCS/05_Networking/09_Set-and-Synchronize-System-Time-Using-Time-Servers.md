# Set and Synchronize System Time Using Time Servers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Networking/Set-and-Synchronize-System-Time-Using-Time-Servers)

---

## Table of Contents

- Set and Synchronize System Time Using Time Servers
  - Configure Time Zone Settings
  - Manage NTP Synchronization
  - Configure Custom NTP Servers
  - Conclusion
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Networking

# Set and Synchronize System Time Using Time Servers

Accurate timekeeping is critical for server operations. Hardware clocks in computers are not perfect and may gradually drift from the actual time. For instance, if the real time is 12:00:05, a server might display 12:00:06—a one-second drift ahead. Fortunately, most devices today automatically synchronize their clocks over the Internet using the Network Time Protocol (NTP).

Most modern operating systems include time synchronization software by default. In Ubuntu, the default utility is systemd-timesyncd, which is part of the systemd suite.

![The image illustrates the concept of setting and synchronizing system time using time servers, highlighting the role of Network Time Protocol (NTP) in ensuring accurate clocks for servers.](https://kodekloud.com/kk-media/image/upload/v1752881323/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Set-and-Synchronize-System-Time-Using-Time-Servers/ntp-system-time-synchronization-illustration.jpg)

## Configure Time Zone Settings

In addition to time synchronization, it is important to correctly set the time zone. Incorrect time zones can lead to confusion, especially when managing logs from servers located in different regions. For example, when it is 1:47 in Germany, it is 7:47 in Singapore. It is advisable to set your server’s time zone to your local zone or to that of your company’s main office.

![The image compares time synchronization methods in modern operating systems, highlighting Windows and Ubuntu's use of system utilities like "Systemd-timesyncd."](https://kodekloud.com/kk-media/image/upload/v1752881324/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Set-and-Synchronize-System-Time-Using-Time-Servers/time-synchronization-windows-ubuntu.jpg)

Time-related operations can be managed using the `timedatectl` utility. To view the list of available time zones, run:

```
timedatectl list-timezones
```

The output will look similar to this:

```
America/Araguaina
America/Argentina/Buenos_Aires
America/Argentina/Catamarca
America/Argentina/ComodRivadavia
America/Argentina/Cordoba
America/Argentina/Jujuy
America/Argentina/La_Rioja
America/Argentina/Mendoza
America/Argentina/Rio_Gallegos
America/Argentina/Salta
America/Argentina/San_Juan
America/Argentina/San_Luis
America/Argentina/Tucuman
America/Argentina/Ushuaia
America/Aruba
America/Asuncion
America/Atikokan
America/Atka
America/Bahia
America/Bahia_Banderas
America/Barbados
America/Belem
America/Belize
America/Blanc-Sablon
America/Boa_Vista
America/Bogota
America/Boise
America/Buenos_Aires
lines 59-86
```

Time zones are formatted with the continent first, followed by a slash, and then the city. To set your time zone to Los Angeles, use the command:

```
sudo timedatectl set-timezone America/Los_Angeles
```

Remember to use an underscore for cities with multiple words. Verify the change by executing:

```
timedatectl
```

A sample output might look like:

```
Local time: Wed 2024-05-22 18:45:48 PDT
Universal time: Thu 2024-05-23 01:45:48 UTC
RTC time: Thu 2024-05-23 01:45:48
Time zone: America/Los_Angeles (PDT, -0700)
System clock synchronized: yes
NTP service: active
RTC in local TZ: no
```

This output also indicates whether an NTP service is active.

## Manage NTP Synchronization

If you find that the NTP service is not active, follow these steps to ensure proper time synchronization:

1.  **Install systemd-timesyncd (if not already installed):**

    ```
    sudo apt install systemd-timesyncd
    ```

2.  **Enable synchronization with NTP servers:**

    ```
    sudo timedatectl set-ntp true
    ```

3.  **Verify the status:**

    ```
    timedatectl
    ```

To check the status of the systemd-timesyncd service, run:

```
systemctl status systemd-timesyncd.service
```

A typical output is:

```
● systemd-timesyncd.service - Network Time Synchronization
   Loaded: loaded (/usr/lib/systemd/system/systemd-timesyncd.service; enabled; preset: enabled)
   Active: active (running) since Wed 2024-05-22 17:23:17 PDT; 1h 24min ago
     Docs: man:systemd-timesyncd.service(8)
 Main PID: 809 (systemd-timesyncd)
   Status: "Contacted time server 91.189.91.157:123 (ntp.ubuntu.com)."
    Tasks: 2 (limit: 9442)
   Memory: 1.4M (peak: 2.2M)
      CPU: 198ms
   CGroup: /system.slice/systemd-timesyncd.service
           └─809 /usr/lib/systemd/systemd-timesyncd


May 22 17:23:21 kodekloud systemd-timesyncd[809]: Network configuration changed, trying to establish connection...
May 22 17:23:22 kodekloud systemd-timesyncd[809]: Network configuration changed, trying to establish connection...
May 22 17:24:25 kodekloud systemd-timesyncd[809]: Contacted time server 91.189.91.157:123 (ntp.ubuntu.com).
May 22 17:24:25 kodekloud systemd-timesyncd[809]: Initial clock synchronization to Thu 2024-05-23 00:2...
```

![The image illustrates the synchronization of system time using time servers in different locations, specifically Germany and Singapore, highlighting time zone differences and adjustments.](https://kodekloud.com/kk-media/image/upload/v1752881325/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Set-and-Synchronize-System-Time-Using-Time-Servers/time-synchronization-germany-singapore.jpg)

> [!important]
> **Tip**
>
> Use tab completion in your terminal by typing `timedatectl` and then pressing tab twice to explore additional commands such as `show-timesync` and `timesync-status`.

## Configure Custom NTP Servers

To change the default settings for systemd-timesyncd and specify custom NTP servers, you need to edit the configuration file:

```
sudo vim /etc/systemd/timesyncd.conf
```

Within the file, locate the following block and modify it as desired by uncommenting and updating the NTP server list:

```
[Time]
NTP=0.us.pool.ntp.org 1.us.pool.ntp.org 2.us.pool.ntp.org 3.us.pool.ntp.org
#FallbackNTP=ntp.ubuntu.com
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048
#ConnectionRetrySec=30
#SaveIntervalSec=60
```

This configuration sets four NTP servers from the US pool. Notice that underscores are used in city names or when naming a server with multiple words.

After saving your changes, restart the service to apply the new configuration:

```
sudo systemctl restart systemd-timesyncd
```

To verify that the newly specified NTP servers are in use, run:

```
timedatectl show-timesync
```

A sample output may look like:

```
jeremy@kodekloud:~$ timedatectl show-timesync
FallbackNTPServers=ntp.ubuntu.com
ServerName=0.us.pool.ntp.org
ServerAddress=198.30.92.2
RootDistanceMaxUSec=5s
PollIntervalMinUSec=32s
PollIntervalMaxUSec=34min 8s
PollIntervalUSec=2min 8s
NTPMessage={ Leap=0, Version=4, Mode=4, Stratum=2, Precision=-20, RootDelay=21.499ms, RootDispersion=28.747ms, Reference=82CF74F0, OriginateTimestamp=Wed 2024-05-22 18:53:17 PDT, TransmitTimestamp=Wed 2024-05-22 18:53:17 PDT, ReceiveTimestamp=Wed 2024-05-22 18:53:17 PDT, DestinationTimestamp=Wed 2024-05-22 18:53:17 PDT, Ignored=no, PacketCount=2, Jitter=99us }
```

You can also check the detailed time synchronization status using:

```
timedatectl timesync-status
```

This command provides comprehensive information including the poll interval, root distance, offset, delay, and other relevant NTP details. A sample output might be:

```
jeremy@kodekloud:~$ timedatectl timesync-status
    Server: 198.30.92.2 (0.us.pool.ntp.org)
    Poll interval: 2min 8s (min: 32s; max: 34min 8s)
    Leap: normal
    Version: 4
    Stratum: 2
    Reference: 82CFF4F0
    Precision: 1us (−20)
    Root distance: 39.496ms (max: 5s)
    Offset: -262us
    Delay: 79.540ms
    Jitter: 99us
    Packet count: 2
    Frequency: +11.919ppm
jeremy@kodekloud:~$
```

> [!important]
> **Warning**
>
> Ensure that your network configuration allows NTP traffic. If synchronization fails, check your firewall and network settings.

## Conclusion

This guide covered how to configure both the time zone and NTP synchronization on Ubuntu using systemd-timesyncd. You learned how to view available time zones, set the correct zone, enable time synchronization, modify NTP settings, and verify the synchronization status. Maintaining accurate system time is essential for log management and other time-sensitive operations.

See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/2ba92913-296b-481d-af2d-6710bf3f7cdd/lesson/46c64e6e-5833-4e4f-b749-08f41f9a9f85)**
>
> Watch video content
