# Promtail installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-1/Promtail-installation)

---

## Table of Contents

- Promtail installation
  - Downloading and Unpacking Promtail
  - Obtaining the Promtail Configuration File
  - Running Promtail
  - Conclusion
  - Watch Video
    - On Node One
    - On Node Two
    - Customizing the Configuration

---

## Content

Grafana Loki

Grafana Loki Essentials Part 1

# Promtail installation

In this guide, we assume your Loki server is already running. Now it’s time to set up Promtail—the dedicated log collection agent—to forward logs from your nodes (node one and node two) to your Loki instance.

Begin by exploring the documentation under the Clients section. Here, you will discover several supported clients such as Promtail, Fluent Bit, Fluentd, and Logstash. For this lesson, our focus is on Promtail.

![The image shows a webpage from Grafana Labs documentation, specifically about Grafana Loki clients for sending logs, with a navigation menu on the left and a Grafana Cloud advertisement on the right.](https://kodekloud.com/kk-media/image/upload/v1752877760/notes-assets/images/Grafana-Loki-Promtail-installation/grafana-loki-clients-documentation.jpg)

The documentation offers various example configurations (Docker, Helm on Kubernetes, etc.). However, we are interested in downloading a precompiled binary that corresponds to your system architecture (e.g., Promtail Linux AMD64).

![The image shows a GitHub releases page for Grafana Loki, listing various downloadable files with their sizes and release dates.](https://kodekloud.com/kk-media/image/upload/v1752877762/notes-assets/images/Grafana-Loki-Promtail-installation/github-releases-grafana-loki.jpg)

## Downloading and Unpacking Promtail

Follow these steps on each node to download and extract the Promtail binary:

### On Node One

1.  **Download the Promtail zip file using `wget`:**

    ```
    vagrant@node-1:~$ wget https://github.com/grafana/loki/releases/download/v2.8.2/promtail-linux-amd64.zip
    ```

2.  **List the directory to verify the download:**

    ```
    vagrant@node-1:~$ ls
    LICENSE  README.md  app  flog  flog_0.4.3_linux_amd64.tar.gz  generated.log  log.gz  promtail-linux-amd64.zip
    ```

3.  **Unzip the downloaded file:**

    ```
    vagrant@node-1:~$ unzip promtail-linux-amd64.zip
    Archive:  promtail-linux-amd64.zip
    inflating: promtail-linux-amd64
    ```

4.  **Verify the extraction:**

    ```
    vagrant@node-1:~$ ls
    LICENSE  app  flog_0.4.3_linux_amd64.tar.gz  log.gz  promtail-linux-amd64.zip  promtail-linux-amd64  generated.log
    ```

### On Node Two

Repeat the download and extraction process:

1.  **Download the Promtail zip file:**

    ```
    vagrant@node-2:~$ wget https://github.com/grafana/loki/releases/download/v2.8.2/promtail-linux-amd64.zip
    ```

2.  **Verify the download with a directory listing:**

    ```
    vagrant@node-2:~$ ls
    LICENSE  README.md  app  flog  flog_0.4.3_linux_amd64.tar.gz  generated.log  log.gz  promtail-linux-amd64.zip
    ```

3.  **Extract the archive:**

    ```
    vagrant@node-2:~$ unzip promtail-linux-amd64.zip
    Archive:  promtail-linux-amd64.zip
    inflating: promtail-linux-amd64
    ```

4.  **Confirm the extraction:**

    ```
    vagrant@node-2:~$ ls
    app  promtail-linux-amd64  promtail-linux-amd64.zip
    ```

> [!important]
> **Note**
>
> If you encounter an error on node two regarding the absence of the `unzip` command, install it using:
>
> ```
> vagrant@node-2:~$ sudo apt install unzip
> ```
>
> Then, rerun the unzip command.

## Obtaining the Promtail Configuration File

Promtail requires a configuration file to determine how logs are collected and where to send them. Follow these steps on your node:

1.  **Download the example configuration file from GitHub:**

    ```
    vagrant@node-2:~$ wget https://raw.githubusercontent.com/grafana/loki/main/clients/cmd/promtail/promtail-local-config.yaml
    ```

2.  **Open the configuration file for review:**

    ```
    vagrant@node-2:~$ vi promtail-local-config.yaml
    ```

A typical configuration looks like this:

```
server:
  http_listen_port: 9080
  grpc_listen_port: 0


positions:
  filename: /tmp/positions.yaml


clients:
  - url: http://localhost:3100/loki/api/v1/push


scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
    labels:
      job: varlogs
      __path__: /var/log/*log
```

### Customizing the Configuration

Review the key sections of the configuration:

- **Server:** Sets Promtail’s HTTP listening port.
- **Positions:** Specifies the file to store the last read positions of logs.
- **Clients:** Defines the Loki server endpoint. Change `localhost` to the actual IP address or hostname of your Loki server.
- **Scrape Configs:** Determines which log files are monitored. In the example, all files in `/var/log` ending with `"log"` are collected.

For example, after updating with your Loki server's IP address, your configuration might be:

```
server:
  http_listen_port: 9080
  grpc_listen_port: 0


positions:
  filename: /tmp/positions.yaml


clients:
  - url: http://<LOKI_IP_ADDRESS>:3100/loki/api/v1/push


scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
    labels:
      job: varlogs
      __path__: /var/log/*log
```

You can add more scrape jobs as needed to monitor and label additional log files.

## Running Promtail

To start Promtail using your configuration file, execute the following command on each node. Make sure you are in the directory containing both the Promtail binary and the configuration file.

1.  **Run Promtail:**

    ```
    vagrant@node-2:~$ ./promtail-linux-amd64 -config.file=promtail-local-config.yaml
    ```

You should see output indicating that Promtail has started, similar to this:

```
level=info ts=2023-07-18T06:07:02.851962462Z caller=promtail.go:133 msg="Reloading configuration file" md5sum=533f93bcf05063...
level=info ts=2023-07-18T06:07:02.852876099Z caller=main.go:174 msg="Starting Promtail" version="(version=2.8.2, branch=HEAD, revision=9f809eda7)"
level=warn ts=2023-07-18T06:07:02.852991175Z caller=promtail.go:265 msg="enable watchConfig"
```

> [!important]
> **Warning**
>
> If Promtail fails to access certain log files due to permission issues (common for system logs), run Promtail with `sudo`:
>
> ```
> vagrant@node-1:~$ sudo ./promtail-linux-amd64 -config.file=promtail-local-config.yaml
> ```

Here’s an example snippet of Promtail output confirming that log files like `/var/log/kern.log` and `/var/log/syslog` are being tailed:

```
level=info ts=2023-07-18T06:07:58.460604359Z caller=tailer.go:143 component=tailer msg="tail routine: started" path=/var/log/kern.log
ts=2023-07-18T06:07:58.460785504Z caller=log.go:168 level=info msg="Seeked /var/log/syslog - &{Offset:3449718 Whence:0}"
```

This output confirms that Promtail is correctly reading and forwarding logs to your Loki server.

## Conclusion

Once Promtail is installed and configured on both nodes, your logs will be continuously collected and pushed to your Loki server for centralized monitoring and analysis. For additional configuration options and troubleshooting tips, refer to the [Grafana Loki Documentation](https://grafana.com/docs/loki/latest/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/99ea0065-ea43-4058-9fef-46fbe62292ee/lesson/cc21d8e4-53c6-4e5d-8e3c-66e601572a1a)**
>
> Watch video content
