# Prometheus - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Systems-Administration-with-Jenkins/Prometheus)

---

## Table of Contents

- Prometheus
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Systems Administration with Jenkins

# Prometheus

In this lesson, we explore how the Jenkins Prometheus Metrics Plugin automatically exposes Jenkins metrics on a dedicated endpoint. By accessing the URL http://<jenkins_server_ip>:8080/Prometheus, you can view metrics output similar to the sample below:

```
# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 32.15
# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1.64579412765559
# HELP process_open_fds Number of open file descriptors.
# TYPE process_open_fds gauge
process_open_fds 347.0
# HELP process_max_fds Maximum number of open file descriptors.
# TYPE process_max_fds gauge
process_max_fds 1048576.0
# HELP process_virtual_memory_bytes Virtual memory size in bytes.
# TYPE process_virtual_memory_bytes gauge
process_virtual_memory_bytes 2.71161149449E9
# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 3.969925128E8
# HELP default_jenkins_up Is Jenkins ready to receive requests
# TYPE default_jenkins_up gauge
default_jenkins_up 1.0
# HELP default_jenkins_uptime Time since Jenkins machine was initialized
# TYPE default_jenkins_uptime gauge
default_jenkins_uptime 182986.0
# HELP jvm_classes_loaded The number of classes that are currently loaded in the JVM
# TYPE jvm_classes_loaded gauge
jvm_classes_loaded 14283.0
# HELP jvm_classes_loaded_total The total number of classes that have been loaded since the JVM has started execution
# TYPE jvm_classes_loaded_total counter
jvm_classes_loaded_total 128484.0
# HELP jvm_classes_unloaded_total The total number of classes that have been unloaded since the JVM has started execution
# TYPE jvm_classes_unloaded_total counter
jvm_classes_unloaded_total 143.0
# HELP default_jenkins_build_duration_milliseconds_summary Summary of Jenkins build times in milliseconds by Job
# TYPE default_jenkins_build_duration_milliseconds_summary summary
default_jenkins_build_duration_milliseconds_summary_count{jenkins_job="test1",repo="NA"} 1.0
default_jenkins_build_duration_milliseconds_summary_sum{jenkins_job="test1",repo="NA"} 5634.0
default_jenkins_build_duration_milliseconds_summary_count{jenkins_job="test2",repo="NA"} 1.0
default_jenkins_build_duration_milliseconds_summary_sum{jenkins_job="test2",repo="NA"} 951.0
default_jenkins_build_duration_milliseconds_summary_count{jenkins_job="go-full-pipeline",repo="NA"} 18.0
default_jenkins_build_duration_milliseconds_summary_sum{jenkins_job="go-full-pipeline",repo="NA"} 501911.0
```

The Prometheus plugin installed on your Jenkins server automatically generates this output. The plugin configures the /Prometheus endpoint to expose metrics in a format that Prometheus can seamlessly scrape.

![The image shows the Jenkins Prometheus Metrics Plugin page, detailing its version, installation count, and features like metrics exposure and environment variables.](https://kodekloud.com/kk-media/image/upload/v1752880151/notes-assets/images/Jenkins-Prometheus/frame_40.jpg)

The metrics output follows a structured format that is similar to JSON or key-value pairs. Consistent formatting ensures that Prometheus understands and properly ingests the data. Although subsequent scrapes might reflect updated values or minor variations in metric names—such as differences in build duration or class loading statistics—the overall structure remains unchanged.

Once Prometheus scrapes the /Prometheus endpoint, you can explore these metrics directly within the Prometheus dashboard. For example, entering a query like “Jenkins” in the Prometheus expression browser retrieves various Jenkins-specific metrics, including build success counts. Consider the following query output:

```
default_jenkins_builds_success_build_count{instance="20.127.124.114:8080", jenkins_job="go-full-pipeline", job="Jenkins", repo="NA"}
default_jenkins_builds_success_build_count{instance="20.127.124.114:8080", jenkins_job="test1", job="Jenkins", repo="NA"}
default_jenkins_builds_success_build_count{instance="20.127.124.114:8080", jenkins_job="test2", job="Jenkins", repo="NA"}
```

This output confirms that your Jenkins jobs—specifically "go-full-pipeline," "test1," and "test2"—have successfully completed builds. Jobs that have not been triggered, such as "Git test build pipeline" or "SH test build pipeline," will not appear in these metrics.

![The image shows a Prometheus monitoring dashboard with two targets, Jenkins and Prometheus, both in "UP" state, displaying endpoint details and scrape metrics.](https://kodekloud.com/kk-media/image/upload/v1752880152/notes-assets/images/Jenkins-Prometheus/frame_110.jpg)

You can further analyze your Jenkins data by experimenting with different queries in the Prometheus web interface. Typing "Jenkins" in the expression field displays all available metrics, including task durations and build counts, to help you better understand your CI/CD performance.

![The image shows a Prometheus interface displaying various Jenkins metrics, such as task durations and build counts, with options for query history and autocomplete enabled.](https://kodekloud.com/kk-media/image/upload/v1752880153/notes-assets/images/Jenkins-Prometheus/frame_150.jpg)

> [!important]
> **Note**
>
> Keep in mind that the IP address shown in the examples might differ from your actual setup, as it reflects the specific instance or runtime conditions of your Jenkins server.

This lesson has provided an overview of how Prometheus scrapes and displays Jenkins metrics. We hope this helps you effectively monitor and analyze your Jenkins environment. See you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/3ef58d56-5d32-4bd6-8222-40baaf41f995)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/22de6dac-d594-40dc-a3fb-1cc8d20b8a61/lesson/4891b2af-2b54-482e-84d8-3d833702834c)**
>
> Practice lab
