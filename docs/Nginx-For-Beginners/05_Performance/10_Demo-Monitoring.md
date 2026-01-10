# Demo Monitoring - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Nginx-For-Beginners/Performance/Demo-Monitoring)

---

## Table of Contents

- Demo Monitoring
  - 1. Install the Datadog Agent
  - 2. Configure the Nginx Integration
  - Links and References
  - Watch Video
    - Next Steps

---

## Content

Nginx For Beginners

Performance

# Demo Monitoring

In this lesson, you’ll learn how to install the Datadog Agent on an AWS EC2 Ubuntu/Debian instance to collect critical system metrics (CPU, memory, disk I/O, network, etc.) and then configure the Nginx integration for deep visibility into your web server’s performance.

![The image shows a dashboard of Data Dog System Metrics, displaying various system performance graphs such as CPU usage, memory usage, disk latency, load averages, network traffic, and available swap.](https://kodekloud.com/kk-media/image/upload/v1752882410/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/data-dog-system-metrics-dashboard.jpg)

Below is a quick reference of the main metric categories the Datadog Agent collects:

| Metric Category | Key Metrics                                         |
| --------------- | --------------------------------------------------- |
| CPU             | system.cpu.user, system.cpu.idle, system.cpu.system |
| Memory          | system.mem.used, system.mem.free, system.mem.cached |
| Disk I/O        | system.io.read\\\_time, system.io.write\\\_time     |
| Network         | system.net.bytes\\\_sent, system.net.bytes\\\_rcvd  |

---

## 1\. Install the Datadog Agent

Follow these steps to get the Agent up and running:

1.  Sign up for a [Datadog trial](https://www.datadoghq.com/) (14-day free) and skip optional steps until you reach the Agent installer.
2.  Select **Ubuntu/Debian** as your platform.
3.  Copy and run the installer command, replacing `<YOUR_API_KEY>` with your API key:

    ```
    DD_API_KEY="<YOUR_API_KEY>" DD_SITE="datadoghq.eu" \
      bash -c "$(curl -L https://install.datadoghq.eu/scripts/install_script_agent7.sh)"
    ```

    > [!important]
    > **Note**
    >
    > If you’re in the US region, set `DD_SITE="datadoghq.com"`. For other regions, refer to [Datadog Sites](https://docs.datadoghq.com/getting_started/site/).

4.  Watch the installer fetch and set up packages:

    ```
    gpg: imported: 1
    Get:1 https://apt.datadoghq.com stable Release [26.0 kB]
    Get:2 https://apt.datadoghq.com stable/7 amd64 Packages [92.1 kB]
    Fetched 120 kB in 0s (651 kB/s)
    Reading package lists...
    Installing package(s): datadog-agent datadog-signing-keys
    ...
    Unpacking datadog-agent (1:7.62.3-1) ...
    Setting up datadog-agent (1:7.62.3-1) ...
    Starting Datadog Agent
    ```

5.  Verify the Agent status:

    ```
    sudo datadog-agent status
    ```

6.  In the Datadog UI, click **Finish**, then after ~2 minutes navigate to **Dashboards → Hosts** to confirm your host is reporting.

![The image shows a Datadog dashboard displaying host counts from various cloud providers, including AWS, Azure, GCP, and Alibaba Cloud, with graphs indicating the reporting status.](https://kodekloud.com/kk-media/image/upload/v1752882413/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/datadog-dashboard-host-counts-clouds.jpg)

You can also drill into disk I/O analytics:

![The image shows a Datadog dashboard displaying various system disk I/O metrics, including I/O wait, disk latency, read/write rates, and CPU utilization over the past hour.](https://kodekloud.com/kk-media/image/upload/v1752882415/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/datadog-dashboard-disk-io-metrics.jpg)

---

## 2\. Configure the Nginx Integration

Once the Agent is collecting system metrics, enable the Nginx integration to capture request rates, active connections, and more.

1.  In the Datadog UI, go to **Integrations → Integrations**, search for **Nginx**, then click **Configure**.

    ![The image shows a Datadog integrations dashboard with autodetected integrations for Nginx and SSH, and a list of available integrations like .NET, 1Password, and Ably.](https://kodekloud.com/kk-media/image/upload/v1752882416/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/datadog-integrations-dashboard-nginx-ssh.jpg)

2.  Ensure the `http_stub_status_module` is compiled into your Nginx binary:

    ```
    nginx -V 2>&1 | grep -o http_stub_status_module
    ```

    > [!important]
    > **Warning**
    >
    > Exposing the stub status endpoint to the public internet is a security risk. Restrict access to `localhost` or your private network.

3.  Update your site configuration to expose the status endpoint on `localhost:80`. For example, in `/etc/nginx/sites-available/example.conf`:

    ```
    server {
        listen 80;
        server_name localhost;


        access_log off;
        allow 127.0.0.1;
        deny all;


        location /nginx_status {
            stub_status;
            server_tokens on;
        }
    }
    ```

4.  Reload Nginx and verify the endpoint:

    ```
    sudo nginx -t
    sudo nginx -s reload
    curl http://127.0.0.1/nginx_status
    ```

    Expected response:

    ```
    Active connections: 1
    server accepts handled requests
     11 11 15
    Reading: 0 Writing: 1 Waiting: 0
    ```

5.  Back in Datadog, under **Nginx Integration → Configuration**, set:
    - **Host**: your EC2 instance
    - **Endpoint**: `http://localhost/nginx_status`

After a few minutes, open the built-in Nginx Metrics dashboard to visualize traffic, latency, error rates, and more:

![The image shows a Datadog dashboard for NGINX, displaying an overview of metrics and activity summaries, with sections for anomaly detection and watchdog alerts.](https://kodekloud.com/kk-media/image/upload/v1752882420/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/datadog-nginx-dashboard-metrics.jpg)

For per-host details, use the Host Map:

![The image shows a Datadog host map interface displaying information about an Nginx host, including CPU utilization and system metrics. The interface includes a hexagonal diagram and detailed metrics in a sidebar.](https://kodekloud.com/kk-media/image/upload/v1752882422/notes-assets/images/Nginx-For-Beginners-Demo-Monitoring/datadog-nginx-host-map-metrics.jpg)

---

### Next Steps

With system-level metrics and Nginx integration in place, you can:

- Configure [Datadog Alerts](https://docs.datadoghq.com/monitors/) on key thresholds (e.g., high request latency).
- Build custom dashboards for error rates and traffic patterns.
- Apply [APM](https://docs.datadoghq.com/tracing/) for detailed request tracing.

## Links and References

- [Datadog Agent Installation](https://docs.datadoghq.com/agent/)
- [Nginx Stub Status Module](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html)
- [Datadog Nginx Integration](https://docs.datadoghq.com/integrations/nginx/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/nginx-for-beginners/module/4a5db5c4-df5f-4291-84f0-013d1c4ce235/lesson/c2a5f613-208c-4bab-b4b7-201c76dc566a)**
>
> Watch video content
