# Installation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Push-Gateway/Installation)

---

## Table of Contents

- Installation
  - Step 1: Download and Extract the Binary
  - Step 2: Configure Systemd for Push Gateway
  - Step 3: Verify the Push Gateway Metrics Endpoint
  - Step 4: Configure Prometheus to Scrape Metrics
  - Conclusion
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Push Gateway

# Installation

In this guide, we'll walk through the process of installing and configuring a Prometheus Push Gateway instance. By following these detailed steps, you'll ensure a smooth deployment and seamless integration with Prometheus for metrics collection.

> [!important]
> **Important Note**
>
> You can install Push Gateway on any server, including the one running your Prometheus instance.

## Step 1: Download and Extract the Binary

First, visit the [Prometheus website](https://prometheus.io) and navigate to the downloads page to obtain the correct binary for Push Gateway. Once downloaded, run the following commands to download, extract, and navigate into the Push Gateway directory:

```
wget https://github.com/prometheus/pushgateway/releases/download/v1.4.3/pushgateway-1.4.3.linux-amd64.tar.gz
tar xvf pushgateway-1.4.3.linux-amd64.tar.gz
cd pushgateway-1.4.3.linux-amd64
```

The default port for Push Gateway is 9091.

## Step 2: Configure Systemd for Push Gateway

To ensure consistent service management, we will configure Push Gateway to be managed by Systemd.

1.  **Create a Dedicated User and Move the Executable**

    Create a system user for Push Gateway and copy the executable to `/usr/local/bin`:

    ```
    sudo useradd --no-create-home --shell /bin/false pushgateway
    sudo cp pushgateway /usr/local/bin/
    ```

    Ensure the executable is owned by the `pushgateway` user to maintain proper permissions.

2.  **Create a Systemd Service File**

    Open your preferred text editor to create the service file:

    ```
    sudo vi /etc/systemd/system/pushgateway.service
    ```

    Insert the following configuration:

    ```
    [Unit]
    Description=Prometheus Pushgateway
    Wants=network-online.target
    After=network-online.target


    [Service]
    User=pushgateway
    Group=pushgateway
    Type=simple
    ExecStart=/usr/local/bin/pushgateway


    [Install]
    WantedBy=multi-user.target
    ```

3.  **Start and Enable the Service**

    Reload the Systemd daemon and enable the Push Gateway service to start on boot:

    ```
    sudo systemctl daemon-reload
    sudo systemctl restart pushgateway
    sudo systemctl enable pushgateway
    systemctl status pushgateway
    ```

    A typical status output might look like:

    ```
    ● pushgateway.service - Prometheus Pushgateway
       Loaded: loaded (/etc/systemd/system/pushgateway.service; enabled; vendor preset: enabled)
       Active: active (running) since Fri 2022-10-14 00:19:52 EDT; 5s ago
         Main PID: 536942 (pushgateway)
          Tasks: 5 (limit: 8247)
         Memory: 3.8M
            CPU: 7ms
         CGroup: /system.slice/pushgateway.service
                 └─536942 /usr/local/bin/pushgateway
    ```

## Step 3: Verify the Push Gateway Metrics Endpoint

Once the Push Gateway is up and running, confirm that it correctly exposes the metrics endpoint. Run the following command:

```
curl localhost:9091/metrics
```

You should see output similar to this:

```
# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1.665721119292e+09
# HELP process_virtual_memory_bytes Virtual memory size in bytes.
# TYPE process_virtual_memory_bytes gauge
process_virtual_memory_bytes 7.3271296e+08
# HELP process_virtual_memory_max_bytes Maximum amount of virtual memory available in bytes.
# TYPE process_virtual_memory_max_bytes gauge
process_virtual_memory_max_bytes 1.8446744073709552e+19
# HELP pushgateway_build_info A metric with a constant '1' value labeled by version, revision, branch, and goversion from which pushgateway was built.
# TYPE pushgateway_build_info gauge
pushgateway_build_info{branch="HEAD",goversion="go1.18.2",revision="f9dc1c8664050edbc75916c3664be1d559a1958",version="1.4.3"} 1
```

## Step 4: Configure Prometheus to Scrape Metrics

To integrate the Push Gateway with Prometheus, update your Prometheus configuration file (typically `prometheus.yml`) to add a new scrape job. This configuration is crucial to ensure that custom instance and job labels are preserved by setting the `honor_labels` flag to `true`.

1.  Edit your Prometheus configuration:

    ```
    sudo vi prometheus.yml
    ```

2.  Add or update the `scrape_configs` section as follows:

    ```
    scrape_configs:
      - job_name: pushgateway
        honor_labels: true
        static_configs:
          - targets: ["192.168.1.168:9091"]
    ```

This configuration allows Prometheus to correctly attribute metrics from multiple jobs (e.g., job1, job2) by preserving their custom labels rather than defaulting to Push Gateway's labels.

## Conclusion

By following these steps, you have successfully installed and configured the Prometheus Push Gateway. Your Prometheus instance is now set up to scrape metrics from the Push Gateway, ensuring accurate and reliable monitoring.

For more detailed information on Prometheus and related monitoring solutions, please visit the [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/18b41166-411a-42a8-91c2-18a5b49bc189/lesson/cb8d5619-8e53-43e4-9e06-ecb93580e52c)**
>
> Watch video content
