# File - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Service-Discovery/File)

---

## Table of Contents

- File
  - Configuring File Service Discovery in Prometheus
  - Viewing Discovered Targets
  - Summary
  - Watch Video
    - Example JSON Configuration
    - Example Prometheus YAML Configuration

---

## Content

Prometheus Certified Associate (PCA)

Service Discovery

# File

In this lesson, we'll explore file service discovery—a straightforward yet flexible mechanism to import jobs and target configurations into Prometheus from an external file. Although this method is less dynamic compared to other alternatives, it proves especially useful when integrating with service discovery systems that Prometheus does not directly support.

File service discovery supports both JSON and YAML file formats, allowing you to manage configurations in multiple files. This approach provides the flexibility to use any file containing valid configuration data, and you can even leverage glob patterns (e.g., `*.json`) to include multiple files at once.

> [!important]
> **Tip**
>
> When using glob patterns, ensure the pattern correctly matches all intended files to avoid missing any configurations.

## Configuring File Service Discovery in Prometheus

To enable file service discovery, add a `file_sd_configs` block to your Prometheus configuration file (typically named `prometheus.yaml`). Within this block, specify the file or files holding your configuration details. For example, you can list files individually or use a glob pattern to import all JSON files.

### Example JSON Configuration

Below is an example configuration file in JSON format defining three job setups:

```
[
  {
    "targets": ["node1:9100", "node2:9100"],
    "labels": {
      "team": "dev",
      "job": "node"
    }
  },
  {
    "targets": ["localhost:9090"],
    "labels": {
      "team": "monitoring",
      "job": "prometheus"
    }
  },
  {
    "targets": ["db1:9090"],
    "labels": {
      "team": "db",
      "job": "database"
    }
  }
]
```

### Example Prometheus YAML Configuration

Here is how you can reference the JSON configuration in your Prometheus YAML file:

```
scrape_configs:
  - job_name: file-example
    file_sd_configs:
      - files:
          - 'file-sd.json'
          - '*.json'
```

In this setup, Prometheus imports labels and targets defined in the JSON file. For instance:

- A job with the label `job: node` targets specific nodes.
- Another job is dedicated to Prometheus monitoring.
- A third job is defined for database monitoring.

After configuring file service discovery in your `prometheus.yaml`, restart Prometheus. On restart, you should see all endpoints appear as if they were defined directly in the configuration file.

> [!important]
> **Restart Prometheus**
>
> Remember to restart Prometheus after updating the configuration to ensure that all new targets are properly detected.

## Viewing Discovered Targets

Once Prometheus restarts, navigate to the **Status** section and then to **Service Discovery** in the Prometheus dashboard. Here, you can review detailed information about how Prometheus has discovered the endpoints. The interface displays both the original target labels and any additional labels from your file configuration which are used to annotate the scraped metrics.

The following figures illustrate key aspects of file service discovery:

![The image explains file service discovery, highlighting that jobs/targets can be imported from files, supporting JSON and YAML formats, and mentions Prometheus integration. It includes an icon of a document and a flame symbol connected by a dashed arrow.](https://kodekloud.com/kk-media/image/upload/v1752883095/notes-assets/images/Prometheus-Certified-Associate-PCA-File/file-service-discovery-json-yaml.jpg)

![The image shows a "File Service Discovery" interface with a table listing discovered and target labels for file examples. It includes a search bar for filtering by labels.](https://kodekloud.com/kk-media/image/upload/v1752883096/notes-assets/images/Prometheus-Certified-Associate-PCA-File/file-service-discovery-interface.jpg)

## Summary

File service discovery offers a simple and flexible way to integrate external configuration data into Prometheus. By using external files (JSON or YAML) and incorporating glob patterns, you can easily manage a dynamic set of targets without modifying the Prometheus configuration directly. For additional details, consider reviewing the [Prometheus Documentation](https://prometheus.io/docs/).

This approach is particularly helpful when working with service discovery systems that are not natively supported by Prometheus, providing a seamless bridge that enhances your monitoring capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/20a3a57d-ee2d-4096-888e-de1166cf7e3a/lesson/96ec38a8-4de5-4064-8c6a-2a9edbd22fac)**
>
> Watch video content
