# Querying Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-1/Querying-Logs)

---

## Table of Contents

- Querying Logs
  - Running Loki Locally
  - Configuring Grafana
  - Querying Logs in Grafana
  - Watch Video
    - Filtering Logs by Label
    - Querying Logs by Specific File
    - Querying Logs from Multiple Files

---

## Content

Grafana Loki

Grafana Loki Essentials Part 1

# Querying Logs

In this guide, we'll verify that our Loki server is successfully receiving log messages and demonstrate how to query these logs using Grafana.

Below is an excerpt from the Loki log output, confirming that various log files (e.g., auth.log, cloud-init-output.log, kern.log, etc.) have been processed:

```
ts=2023-07-18T06:07:58.458611347 caller=log.go:168 level=info msg="Seeked /var/log/auth.log - &{Offset:23746 Whence:0}"
ts=2023-07-18T06:07:58.458751304 caller=log.go:168 level=info msg="Seeked /var/log/cloud-init-output.log - &{Offset:4852 Whence:0}"
ts=2023-07-18T06:07:58.458780852Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/cloud-init.log
ts=2023-07-18T06:07:58.460360926Z caller=log.go:168 level=info msg="Seeked /var/log/lastlog - &{Offset:0 Whence:0}"
ts=2023-07-18T06:07:58.460497992 caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/dpkg.log
ts=2023-07-18T06:07:58.460527873Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/kern.log
ts=2023-07-18T06:07:58.460583932 caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/lastlog
ts=2023-07-18T06:07:58.460626882 caller=log.go:168 level=info msg="Seeked /var/log/mylog - &{Offset:104805 Whence:0}"
ts=2023-07-18T06:07:58.460775584 caller=log.go:168 level=info msg="Seeked /var/log/syslog - &{Offset:344971918 Whence:0}"
ts=2023-07-18T06:07:58.460792556Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/syslog
ts=2023-07-18T06:07:58.460826825Z caller=log.go:168 level=info msg="Seeked /var/log/ubuntu-advantage.log - &{Offset:14290 Whence:0}"
ts=2023-07-18T06:07:58.461101327Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/mylog
ts=2023-07-18T06:07:58.461320265Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/ubuntu-advantage.log
```

> [!important]
> **Note**
>
> If you're running Loki locally for testing, you can use several commands based on your operating system.

## Running Loki Locally

To run Loki on your local machine, choose the appropriate command:

```
.\loki-windows-amd64.exe --config.file=loki-local-config.yaml
./loki-linux-amd64 --config.file=loki-local-config.yaml
sudo zypper ref
sudo zypper in loki
systemctl start loki && systemctl enable loki
systemctl start promtail && systemctl enable promtail
```

## Configuring Grafana

Open a new browser tab and navigate to your Grafana server (typically available at [http://localhost:3000](http://localhost:3000)). In Grafana, follow these steps:

1.  Open the dropdown menu and select “Connections”.
2.  Add a new data source.
3.  Choose Loki from the available options.
4.  Name the data source “Loki”.
5.  Provide the URL to your Loki server (e.g., [http://localhost:3100](http://localhost:3100)).
6.  Click **Save & Test** to verify the connection.

![The image shows a Grafana interface for configuring a data source connection, specifically for Loki, with options for HTTP settings, authentication, and alerting. The interface indicates that the data source is successfully connected.](https://kodekloud.com/kk-media/image/upload/v1752877763/notes-assets/images/Grafana-Loki-Querying-Logs/grafana-loki-data-source-connection.jpg)

## Querying Logs in Grafana

Switch to the **Explore** section in Grafana and ensure that Loki is selected as your data source. Grafana will automatically display various labels such as job names and file names from which the logs originated. These labels are useful for filtering the logs you wish to view.

### Filtering Logs by Label

To filter logs by a specific label—such as logs where the label `job` is set to "varlogs"—use the following query:

```
{job="varlogs"}
```

To further narrow down the search for logs containing a keyword (e.g., "docker"), you can append a filter operator:

```
{job="varlogs"} |= "docker"
```

This refined query will return only the logs that contain the word "docker". The log entries might resemble:

```
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: sda: failed to get sgio uid: No data available
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: sdb: failed to get sysfs uid: No data available
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: add missing path
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: sda: failed to get udev uid: Invalid argument
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: sdb: failed to get sysfs uid: No data available
2023-07-18 02:11:19.683 Jul 18 06:11:19 ubuntu-focal multipathd[488]: failed to get udev uid: Invalid argument
```

Selecting an individual log entry within Grafana will also reveal its associated labels, such as job and filename, providing additional context for deeper troubleshooting.

### Querying Logs by Specific File

If you need to query logs from a specific file, such as `/var/log/kern.log`, adjust your query by filtering with the `filename` label. For example, to display logs from `/var/log/kern.log` that contain the term "docker", use:

```
{filename="/var/log/kern.log"} |= "docker"
```

To view all logs from the same file without any additional keyword filter, simply use:

```
{filename="/var/log/kern.log"}
```

### Querying Logs from Multiple Files

You can also query logs from multiple files by using a regular expression. For instance, to retrieve logs from either `/var/log/kern.log` or `/var/log/syslog`, use:

```
{filename=~"/var/log/kern.log|/var/log/syslog"} |= ""
```

If you prefer to fetch all logs from the matched files without filtering based on text, use:

```
{filename=~"/var/log/kern.log|/var/log/syslog"}
```

![The image shows a Grafana Loki interface with a query being set up to filter logs from a specific file path. A graph and log output area are visible below the query builder.](https://kodekloud.com/kk-media/image/upload/v1752877764/notes-assets/images/Grafana-Loki-Querying-Logs/grafana-loki-query-setup-logs.jpg)

> [!important]
> **Key Takeaways**
>
> These examples illustrate how you can leverage Loki’s powerful LogQL to filter logs using labels and search within log messages. Grafana's intuitive query builder further simplifies the process, enabling you to quickly locate the logs relevant to your operations and troubleshooting needs.

By following this guide, you'll gain confidence in using Loki and Grafana to manage and query your logs efficiently. For additional details, explore the [Loki Documentation](https://grafana.com/docs/loki/latest/) and the [Grafana Documentation](https://grafana.com/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/99ea0065-ea43-4058-9fef-46fbe62292ee/lesson/6b042439-5cfc-4a11-9992-8ffb1db15004)**
>
> Watch video content
