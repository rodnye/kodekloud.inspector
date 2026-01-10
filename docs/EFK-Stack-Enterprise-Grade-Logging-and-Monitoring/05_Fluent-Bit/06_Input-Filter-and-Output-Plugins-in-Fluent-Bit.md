# Input Filter and Output Plugins in Fluent Bit - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Fluent-Bit/Input-Filter-and-Output-Plugins-in-Fluent-Bit)

---

## Table of Contents

- Input Filter and Output Plugins in Fluent Bit
  - Input Plugins
  - Filter Plugins
  - Output Plugins
  - Real-World Configuration Example
  - Conclusion
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Fluent Bit

# Input Filter and Output Plugins in Fluent Bit

Welcome! In this article, we will walk through the key components of Fluent Bit—input plugins, filter plugins, and output plugins. Fluent Bit efficiently collects, processes, and publishes log data, making it an essential tool for modern log management and analysis.

![The image is a flowchart illustrating the sequence of input, filter, and output plugins in Fluent Bit, with a bird logo on the right.](https://kodekloud.com/kk-media/image/upload/v1752874212/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Input-Filter-and-Output-Plugins-in-Fluent-Bit/fluent-bit-flowchart-input-filter-output.jpg)

By understanding each component, you can configure Fluent Bit to best meet your system requirements. Let’s dive into the details.

## Input Plugins

Input plugins are the starting point for data collection in Fluent Bit. They interface with various data sources, ensuring that logs are correctly captured for further processing. Here are some common input plugins:

1.  **Tail Plugin**  
    The Tail plugin reads data from log files as new entries are written. It is particularly useful for monitoring application logs, such as those from Nginx.

    ```
    [INPUT]
      Name   tail
      Path   /var/log/nginx/access.log
      Tag    nginx.access
      Parser nginx
    ```

2.  **Systemd Plugin**  
    Use the Systemd plugin to collect logs from the system journal. This is ideal for systems managed by Systemd, capturing both application and service logs.
3.  **TCP Plugin**  
    The TCP plugin listens for logs sent over TCP connections, making it versatile for capturing network-based logging data.

    ```
    [INPUT]
      Name   tcp
      Listen 0.0.0.0
      Port   5170
      Tag    tcp.input
    ```

> [!important]
> **Note**
>
> For most deployments, you will often work with the Tail or Systemd plugins, as they cover the majority of log collection scenarios.

## Filter Plugins

Once the logs are collected, they often need processing before reaching their final destination. Fluent Bit’s filter plugins facilitate this by transforming, enriching, or screening the raw log data.

1.  **Grep Plugin**  
    The Grep plugin filters log records by using regular expressions. For instance, to capture only logs that contain error messages:

    ```
    [FILTER]
      Name   grep
      Match  nginx.access
      Regex  message error
    ```

2.  **Modify Plugin**  
    With the Modify plugin, you can add, remove, or alter fields in your log entries. This is useful for including extra context, such as the service name.

    ```
    [FILTER]
      Name  modify
      Match *
      Add   service nginx
    ```

3.  **Parser Plugin**  
    The Parser plugin converts unstructured log data (e.g., JSON strings) into a more organized structure for easier analysis.

    ```
    [FILTER]
      Name      parser
      Match     nginx.access
      Key_Name  message
      Parser    json
    ```

> [!important]
> **Tip**
>
> Filter plugins are essential for cleaning and enriching log data before it reaches the storage or analysis stage.

## Output Plugins

After processing, log data is transmitted to designated destinations through output plugins. These plugins ensure that logs are stored in systems where they can be queried and analyzed.

1.  **Elasticsearch (ES) Plugin**  
    The Elasticsearch output plugin sends logs directly to an Elasticsearch instance, offering a centralized solution for log management.

    ```
    [OUTPUT]
      Name  es
      Match *
      Host  127.0.0.1
      Port  9200
      Index fluentbit
      Type  _doc
    ```

2.  **HTTP Plugin**  
    For more flexibility, the HTTP plugin forwards log data to any HTTP endpoint. This is useful if you have custom endpoints or need to integrate with other systems.

    ```
    [OUTPUT]
      Name   http
      Match  *
      Host   example.com
      Port   80
      URI    /data
      Format json
    ```

## Real-World Configuration Example

Consider a scenario where you need to capture Nginx logs, filter out only error messages, and send the results to Elasticsearch. The configuration below demonstrates how to set up this logging pipeline:

```
# Input section: Collect Nginx logs from the access log file
[INPUT]
  Name   tail
  Path   /var/log/nginx/access.log
  Tag    nginx.access
  Parser nginx


# Filter section: Filter only the logs that include error messages
[FILTER]
  Name  grep
  Match nginx.access
  Regex message error


# Output section: Send the filtered logs to Elasticsearch for analysis
[OUTPUT]
  Name  es
  Match *
  Host  127.0.0.1
  Port  9200
  Index fluentbit
  Type  _doc
```

This configuration instructs Fluent Bit to continuously collect logs with the Tail plugin, process them with the Grep plugin by filtering error messages, and finally send the output to Elasticsearch using the ES plugin.

## Conclusion

Fluent Bit’s powerful architecture based on input, filter, and output plugins provides a scalable and flexible solution for log collection and processing. Mastering these components will enable you to build efficient logging pipelines tailored to your environment. For more details on log management solutions and best practices, explore the resources below:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
- [Fluent Bit Documentation](https://docs.fluentbit.io/)

Thank you for reading this article. Stay tuned for more deep dives into advanced log processing and monitoring solutions!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/fde8c25d-412a-4b83-95dd-b2a21ea186f3/lesson/0614c267-ecec-47e3-9f30-bf9102236569)**
>
> Watch video content
