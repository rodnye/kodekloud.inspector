# Jenkins Supervision - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Jenkins-Supervision)

---

## Table of Contents

- Jenkins Supervision
  - 1. Logs: The Foundation of Jenkins Insights
  - 2. Performance and Resource Monitoring
  - 3. Auditing and Configuration Changes
  - References
  - Watch Video
    - Key Plugins for Jenkins Monitoring
    - Integrating with External Systems

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Jenkins Supervision

Effective CI/CD workflows depend on proactive Jenkins supervision. By monitoring your Jenkins server, you can catch system errors, plugin failures, or pipeline issues before they impact your testing and deployments.

![The image is an infographic titled "Jenkins Supervision," highlighting common monitoring areas like system errors, plugin malfunctions, and pipeline code issues, along with key benefits such as preventing disruptions, reducing delays, and maintaining efficiency.](https://kodekloud.com/kk-media/image/upload/v1752868853/notes-assets/images/Advanced-Jenkins-Jenkins-Supervision/jenkins-supervision-infographic.jpg)

In this guide, we’ll cover three critical facets of Jenkins supervision:

1.  Logs and their insights
2.  Performance and resource monitoring
3.  Auditing user activity and configuration changes

---

## 1\. Logs: The Foundation of Jenkins Insights

Jenkins logs reveal crucial details about server operations and pipeline executions. Depending on your setup, log locations vary:

```
# Running Jenkins directly
java -jar jenkins.war


# Linux system logs
cat /var/log/jenkins/jenkins.log


# Windows installer
cat %JENKINS_HOME%/jenkins.out


# Docker container
docker logs <containerId>


# Configure custom log paths
# Debian-based systems
sudo vi /etc/default/jenkins
# Red Hat-based systems
sudo vi /etc/sysconfig/jenkins
```

You can also view and filter logs in the Jenkins UI under **Manage Jenkins → System Log**.

> [!important]
> **Tip**
>
> Rotate and compress your logs regularly to prevent disk overload. Adjust the `maxFileSize` and `maxBackupIndex` settings in your logging configuration.

---

## 2\. Performance and Resource Monitoring

Jenkins offers built-in dashboards to track server health:

- **Available executors**: Idle workers ready for builds
- **Busy executors**: Currently running jobs
- **Pending jobs**: Queued builds
- **Overall server load**: Aggregate workload metric

![The image shows a Jenkins supervision monitoring interface with a graph displaying load statistics for a Linux system, alongside a flowchart highlighting logs, monitoring, and auditing.](https://kodekloud.com/kk-media/image/upload/v1752868854/notes-assets/images/Advanced-Jenkins-Jenkins-Supervision/jenkins-monitoring-interface-graph.jpg)

### Key Plugins for Jenkins Monitoring

| Plugin               | Purpose              | Major Features                                               |
| -------------------- | -------------------- | ------------------------------------------------------------ |
| Monitoring Plugin    | JVM & system metrics | CPU, memory, load, response times, HTTP sessions, GC details |
| Disk Usage Plugin    | Disk space analysis  | Job/workspace usage breakdown, historical trends             |
| Build Monitor Plugin | Visual job status    | Customizable job view, failure highlights                    |

![The image shows a Jenkins supervision monitoring dashboard with various performance metrics displayed in graphs, such as memory usage, CPU usage, and active threads. It also includes a flowchart with sections labeled "Logs," "Monitoring," and "Auditing."](https://kodekloud.com/kk-media/image/upload/v1752868855/notes-assets/images/Advanced-Jenkins-Jenkins-Supervision/jenkins-monitoring-dashboard-performance-metrics.jpg)

### Integrating with External Systems

For centralized dashboards, use:

- **Datadog Plugin** + [Datadog](https://plugins.jenkins.io/datadog/)
- **New Relic Plugin** + [New Relic](https://plugins.jenkins.io/newrelic/)
- **Prometheus Plugin** + [Grafana](https://grafana.com/)

![The image illustrates Jenkins supervision and monitoring using Grafana and Datadog, featuring dashboards and a flowchart with logs, monitoring, and auditing.](https://kodekloud.com/kk-media/image/upload/v1752868856/notes-assets/images/Advanced-Jenkins-Jenkins-Supervision/jenkins-supervision-monitoring-grafana-datadog.jpg)

This flexibility lets you align Jenkins metrics with your existing observability stack.

---

## 3\. Auditing and Configuration Changes

Tracking who did what—and when—is vital for compliance and troubleshooting. Two complementary plugins capture user actions and config updates:

| Plugin                    | Function                    | Highlights                                                       |
| ------------------------- | --------------------------- | ---------------------------------------------------------------- |
| Audit Trail Plugin        | User action logging         | File, Syslog, Elasticsearch, or Console logger options           |
| Job Config History Plugin | Version control for configs | Records `config.xml` changes, diff view, and rollback capability |

![The image illustrates Jenkins supervision for auditing, showing the use of the Audit Trail Plugin and Job Config History Plugin, with various loggers like File Logger and Syslog Logger.](https://kodekloud.com/kk-media/image/upload/v1752868857/notes-assets/images/Advanced-Jenkins-Jenkins-Supervision/jenkins-audit-trail-plugins-illustration.jpg)

**Audit Trail Logger Options**

1.  **File Logger** (default, rotating files)
2.  **Syslog Logger** (central syslog server)
3.  **Console Logger** (for quick debugging)
4.  **Elasticsearch Logger** (powerful search & analytics)

> [!important]
> **Warning**
>
> Avoid using the Console Logger in production—it can expose sensitive data in build logs.

Many teams combine both plugins so you can see who made a change and exactly what was modified.

---

## References

- [Monitoring Plugin](https://plugins.jenkins.io/monitoring/)
- [Disk Usage Plugin](https://plugins.jenkins.io/disk-usage/)
- [Build Monitor Plugin](https://plugins.jenkins.io/build-monitor-plugin/)
- [Datadog Plugin](https://plugins.jenkins.io/datadog/)
- [New Relic Plugin](https://plugins.jenkins.io/newrelic/)
- [Prometheus Plugin](https://plugins.jenkins.io/prometheus/)
- [Grafana](https://grafana.com/)
- [Audit Trail Plugin](https://plugins.jenkins.io/audit-trail/)
- [Job Config History Plugin](https://plugins.jenkins.io/jobConfigHistory/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/c03fd18f-98a1-48d0-9ca5-ed671a25a8c6)**
>
> Watch video content
