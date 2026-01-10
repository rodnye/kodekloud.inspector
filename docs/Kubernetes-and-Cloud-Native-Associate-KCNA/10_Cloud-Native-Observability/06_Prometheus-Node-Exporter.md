# Prometheus Node Exporter - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Observability/Prometheus-Node-Exporter)

---

## Table of Contents

- Prometheus Node Exporter
  - Step 1: Downloading the Node Exporter
  - Step 2: Extracting the Archive
  - Step 3: Running the Node Exporter
  - Step 4: Verifying the Installation
  - Example with a Different Version
  - Conclusion
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Observability

# Prometheus Node Exporter

This guide details how to set up the Prometheus Node Exporter on a Linux host. The Node Exporter collects system-level metrics and provides them in a format that Prometheus can scrape for monitoring.

## Step 1: Downloading the Node Exporter

Begin by visiting the official [Prometheus downloads page](https://prometheus.io/download) and selecting the Node Exporter. Choose the desired version and either download the binary directly or copy the URL for use with wget.

![The image shows instructions for downloading Node Exporter binaries, including file names, OS, architecture, size, and SHA256 checksums.](https://kodekloud.com/kk-media/image/upload/v1752880553/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Prometheus-Node-Exporter/frame_40.jpg)

Once you have the URL, download the tarred file using wget. For example:

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
```

The output should resemble:

```
$ wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
HTTP request sent, awaiting response... 200 OK
Length: 9033415 (8.6M) [application/octet-stream]
Saving to: ‘node_exporter-1.3.1.linux-amd64.tar.gz’

node_exporter-1.3.1.linux-amd64.tar.gz   100%[==============================================================>]   8.61M  12.4MB/s    in 0.7s

2022-09-02 15:04:10 (12.4 MB/s) - ‘node_exporter-1.3.1.linux-amd64.tar.gz’ saved [9033415/9033415]
```

> [!important]
> **Tip**
>
> Verify the file's integrity by comparing its SHA256 checksum with the one provided on the download page.

## Step 2: Extracting the Archive

Extract the downloaded tar file using the tar command:

```
tar -xvf node_exporter-1.3.1.linux-amd64.tar.gz
```

This command creates a directory named `node_exporter-1.3.1.linux-amd64` containing the executable and additional files (LICENSE and NOTICE). Change to the directory with:

```
cd node_exporter-1.3.1.linux-amd64
```

## Step 3: Running the Node Exporter

Inside the directory, start the Node Exporter by running its executable:

```
./node_exporter
```

You should see output indicating that the exporter is listening on the default port 9100:

```
ts=2022-09-05T16:51:59.947Z caller=node_exporter.go:115 level=info collector=vmstat
ts=2022-09-05T16:51:59.947Z caller=node_exporter.go:199 level=info msg="listening on" address=:9100
ts=2022-09-05T16:51:59.947Z caller=tls_config.go:195 level=info msg="TLS is disabled." http2=false
```

> [!important]
> **Firewall Configuration**
>
> Make sure that port 9100 is open in your firewall settings to allow Prometheus to scrape the metrics.

## Step 4: Verifying the Installation

To confirm that the Node Exporter is running correctly, use curl to request the metrics endpoint:

```
curl localhost:9100/metrics
```

A typical response includes Prometheus-formatted metrics such as:

```
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 0
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```

Alternatively, open your web browser and navigate to:  
http://localhost:9100/metrics

## Example with a Different Version

The process remains the same if you are using a different version, such as `node_exporter-1.4.0.linux-amd64`. Your working directory may resemble:

```
user2 in ~
> ls
Desktop    Downloads    node_exporter-1.4.0.linux-amd64    Pictures    pushgateway-1.4.3.linux-amd64    snap    Videos    Documents    Music    Public    pushgateway-1.4.3.linux-amd64.tar.gz    Templates
```

Change into the specific directory:

```
cd node_exporter-1.4.0.linux-amd64
```

Verify the contents:

```
ls -la
```

Sample output:

```
total 19208
drwxr-xr-x 2 user2 user2     4096 Sep 26 08:39 .
drwxr-xr-x 17 user2 user2     4096 Nov 12 23:43 ..
-rw-r--r-- 1 user2 user2    11357 Sep 26 20:39 LICENSE
-rwxr-xr-x 1 user2 19640886 Sep 26 08:33 node_exporter
-rw-r--r-- 1 user2 user2      463 Sep 26 08:39 NOTICE
```

Run the exporter:

```
./node_exporter
```

Verify the metrics with:

```
curl localhost:9100/metrics
```

A sample output provides various system metrics, including CPU, memory, and network statistics:

```
# TYPE node_timex_tick_seconds gauge
node_timex_tick_seconds 0.01
# HELP node_udp_queues Number of allocated memory in the kernel for UDP datagrams in bytes.
# TYPE node_udp_queues gauge
node_udp_queues{ip="v4",queue="rx"} 0
node_udp_queues{ip="v4",queue="tx"} 0
node_udp_queues{ip="v6",queue="rx"} 0
node_udp_queues{ip="v6",queue="tx"} 0
# HELP node_uname_info Labeled system information as provided by the uname system call.
node_uname_info{domainname="(none)",machine="x86_64",nodename="user2",release="5.15.0-52-generic",sysname="Linux",version="#58-Ubuntu SMP Thu Oct 13 08:03:55 UTC 2022"} 1
...
```

## Conclusion

With these steps, the Prometheus Node Exporter is now set up to collect host metrics, allowing Prometheus to scrape them from the /metrics endpoint. This installation is a key component for monitoring system performance and reliability.

> [!important]
> **Next Steps**
>
> For further customization and enhancements, explore additional Prometheus exporters and check out the [Prometheus Documentation](https://prometheus.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/70e17eea-7e9b-4f65-87a4-1cdb5631e0dc/lesson/9d9bdd41-a5a2-4531-88a6-9bed011d6e32)**
>
> Watch video content
