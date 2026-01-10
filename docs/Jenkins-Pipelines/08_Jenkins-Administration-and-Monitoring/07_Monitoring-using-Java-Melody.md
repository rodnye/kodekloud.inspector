# Monitoring using Java Melody - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Monitoring-using-Java-Melody)

---

## Table of Contents

- Monitoring using Java Melody
  - Introduction to Java Melody
  - Configuring Monitoring in Jenkins
  - Accessing the Monitoring Dashboard
  - Monitoring Jenkins Nodes
  - Monitoring Build Jobs
  - Conclusion
  - Watch Video
    - Monitoring the Jenkins Controller

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Monitoring using Java Melody

In this lesson, you will learn how to monitor Jenkins effectively using [Java Melody](https://javamelody.org/), a robust tool designed for real-time monitoring of Java applications.

## Introduction to Java Melody

[Java Melody](https://javamelody.org/) is a dedicated monitoring solution that tracks performance and resource usage in Java applications. By capturing real-time statistics based on user interactions, it provides valuable insights into application operations. Since Jenkins is built on Java, Java Melody is an excellent tool for keeping an eye on its performance and resource utilization.

## Configuring Monitoring in Jenkins

To integrate Java Melody with Jenkins, install the Monitoring plugin. After installation and a controller restart, Jenkins monitoring becomes available. For advanced configurations, refer to the [Monitoring Plugin documentation](https://plugins.jenkins.io/monitoring).

![The image shows a webpage for the Jenkins Monitoring plugin, detailing its features, version, installation statistics, and links for further information.](https://kodekloud.com/kk-media/image/upload/v1752879682/notes-assets/images/Jenkins-Pipelines-Monitoring-using-Java-Melody/jenkins-monitoring-plugin-webpage.jpg)

This webpage provides an overview of the monitoring plugin’s features, including detailed visualizations of metrics such as memory usage, CPU performance, and system health. It supports generating reports in HTML or PDF format and is available in multiple languages, including English, German, and French.

## Accessing the Monitoring Dashboard

After installing the Monitoring plugin:

1.  Navigate to "Manage Jenkins" within the Jenkins interface.
2.  Scroll down to locate the options for "Monitoring of Jenkins Instance" and "Monitoring of Jenkins Agents."

The monitoring for the Jenkins instance focuses on key metrics like memory usage, CPU performance, and HTTP requests. In contrast, monitoring for Jenkins agents provides insights into the build queue and other operational details.

### Monitoring the Jenkins Controller

On your main Jenkins controller (Jenkins Controller 1), you can access essential performance metrics such as used memory, CPU allocation, active HTTP sessions, and more.

![The image shows a JavaMelody monitoring dashboard for Jenkins, displaying various performance metrics such as used memory, CPU usage, active threads, HTTP sessions, and errors over a one-day period. It includes graphs and tables summarizing statistics and system errors.](https://kodekloud.com/kk-media/image/upload/v1752879684/notes-assets/images/Jenkins-Pipelines-Monitoring-using-Java-Melody/javamelody-jenkins-monitoring-dashboard.jpg)

This dashboard is well-suited for users who need detailed statistical insights and analytics. In addition, various chart options allow for in-depth analysis of HTTP request performance, including mean time and CPU time metrics.

![The image shows a statistics report from a monitoring tool, detailing HTTP request performance metrics such as mean time, max time, and cumulative CPU time for various requests. It includes a table with data on hits, allocated memory, and system errors.](https://kodekloud.com/kk-media/image/upload/v1752879685/notes-assets/images/Jenkins-Pipelines-Monitoring-using-Java-Melody/http-request-performance-report.jpg)

You can adjust the time period for displayed data and generate reports, including a PDF option, to facilitate sharing and record-keeping.

## Monitoring Jenkins Nodes

In addition to the main controller, Jenkins nodes can also be monitored. In single-node environments, the dashboard may present limited data; however, it still offers essential functionalities such as:

- Executing the garbage collector
- Generating heap dumps
- Viewing the memory histogram
- Inspecting active HTTP sessions (complete with details like country, browser, and user)

![The image shows a JavaMelody monitoring dashboard with various performance graphs, including build executions, memory usage, CPU usage, and build queue statistics over a one-day period.](https://kodekloud.com/kk-media/image/upload/v1752879686/notes-assets/images/Jenkins-Pipelines-Monitoring-using-Java-Melody/javamelody-monitoring-dashboard-performance.jpg)

> [!important]
> **Note**
>
> For single-node setups, while the available monitoring information might be limited compared to multi-node environments, the essential details for system health and performance are still readily accessible.

## Monitoring Build Jobs

To view real-time monitoring data, trigger a Jenkins job such as the "test build monitoring plugin" job. For example, a stage in the job can introduce a 60-second delay, during which the dashboard refreshes to display live updates.

![The image shows a monitoring dashboard for a Jenkins server, displaying system errors, current requests, and system information such as memory usage and CPU load.](https://kodekloud.com/kk-media/image/upload/v1752879687/notes-assets/images/Jenkins-Pipelines-Monitoring-using-Java-Melody/jenkins-server-monitoring-dashboard.jpg)

This dashboard provides detailed information about active threads and total thread counts, offering insights into the system load during job execution.

## Conclusion

The Java Melody plugin delivers a comprehensive monitoring solution tailored for Jenkins. It covers both the controller and nodes by presenting detailed performance metrics and system reports that are crucial for effective resource management and quick troubleshooting. If you operate multiple concurrent jobs, this monitoring dashboard will provide critical insights into system performance and stability.

Thank you for reading this lesson on Monitoring Jenkins with Java Melody. For more detailed information on related topics, explore the [Jenkins Documentation](https://www.jenkins.io/doc/) and [Java Melody website](https://javamelody.org/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/85e296c0-2760-40ec-ab69-33eb827835be)**
>
> Watch video content
