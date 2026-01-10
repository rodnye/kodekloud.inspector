# Node Exporter systemd - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Prometheus-Fundamentals/Node-Exporter-systemd)

---

## Table of Contents

- Node Exporter systemd
  - Step 1: Copy the Node Exporter Binary and Create a Dedicated User
  - Step 2: Create the systemd Service File
  - Step 3: Reload systemd and Enable the Service
  - Step 4: Verify the Service
  - Step 5: Download and Prepare the Node Exporter Binary
  - Step 6: Check Node Exporter Metrics
  - Next Steps
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Prometheus Fundamentals

# Node Exporter systemd

This guide demonstrates how to set up Node Exporter as a systemd service. By following these steps, Node Exporter will run in the background and automatically start at boot. This setup is very similar to the Prometheus configuration but involves fewer files.

──────────────────────────────

## Step 1: Copy the Node Exporter Binary and Create a Dedicated User

Begin by copying the Node Exporter binary to `/usr/local/bin`. Next, create a non-login user called `node_exporter` to run the service securely, and update the binary’s ownership to this user:

```
sudo cp node_exporter /usr/local/bin
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

> [!important]
> **Note**
>
> Using a dedicated user enhances security by limiting the permissions available to the Node Exporter process.

──────────────────────────────

## Step 2: Create the systemd Service File

Create the service file at `/etc/systemd/system/node_exporter.service` with the following content. This configuration ensures that systemd waits until the network is online prior to starting Node Exporter, and that the process runs under the `node_exporter` user:

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target


[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter


[Install]
WantedBy=multi-user.target
```

──────────────────────────────

## Step 3: Reload systemd and Enable the Service

After creating the service file, reload the systemd daemon to recognize the new service. Then, start and enable the service to ensure it launches automatically on boot:

```
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
```

──────────────────────────────

## Step 4: Verify the Service

Check the status of Node Exporter to confirm it is active and running:

```
sudo systemctl status node_exporter
```

The output should resemble the following, verifying that the service is running:

```
● node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Sat 2022-11-12 23:54:25 EST; 4s ago
 Main PID: 5837 (node_exporter)
    Tasks: 3 (limit: 8247)
   Memory: 2.1M
   CPU: 12ms
   CGroup: /system.slice/node_exporter.service
           └─5837 /usr/local/bin/node_exporter


Nov 12 23:54:25 user2 node_exporter[5837]: ts=2022-11-13T04:54:25.200Z caller=node_exporter.go:115 level=info collector=thermal_zone
Nov 12 23:54:25 user2 node_exporter[5837]: ts=2022-11-13T04:54:25.200Z caller=node_exporter.go:115 level=info collector=time
...
Nov 12 23:54:25 user2 node_exporter[5837]: ts=2022-11-13T04:54:25.200Z caller=tls_config.go:195 level=info msg="TLS is disabled." http2=false
```

──────────────────────────────

## Step 5: Download and Prepare the Node Exporter Binary

If you have not already obtained the Node Exporter binary, follow these steps:

1.  Download and extract the Node Exporter package.
2.  Navigate into the extracted directory.

For example:

```
# List files to locate the Node Exporter package
ls
# Change directory to the extracted folder
cd node_exporter-1.4.0.linux-amd64
```

Inside the directory, you should see files such as:

```
ls
# LICENSE  node_exporter  NOTICE
```

Then, copy the executable to `/usr/local/bin` and set up the dedicated user if you haven't already:

```
sudo cp node_exporter /usr/local/bin
sudo useradd --no-create-home --shell /bin/false node_exporter
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

──────────────────────────────

## Step 6: Check Node Exporter Metrics

Once Node Exporter is running, verify that it is serving metrics by sending an HTTP request to its metrics endpoint:

```
curl localhost:9100/metrics
```

The output should include metric information similar to this snippet:

```
node_vstat_pswpout 0
# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 0
# HELP process_max_fds Maximum number of open file descriptors.
# TYPE process_max_fds gauge
process_max_fds 524288
...
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
promhttp_metric_handler_requests_total{status="200"} 0
promhttp_metric_handler_requests_total{status="500"} 0
promhttp_metric_handler_requests_total{status="503"} 0
```

This confirms that your monitoring system (such as Prometheus) can successfully scrape metrics from Node Exporter.

──────────────────────────────

## Next Steps

The final step involves configuring your monitoring solution to scrape Node Exporter metrics. In the following section, we will explain how to set up Prometheus to effectively monitor Node Exporter.

Happy Monitoring!

For more details on setting up and maintaining Prometheus, refer to the [Prometheus documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/e03e8702-ef6c-4402-b626-4437fc40b513/lesson/73d167e2-f9bc-4d37-97b6-897fdb184b85)**
>
> Watch video content
