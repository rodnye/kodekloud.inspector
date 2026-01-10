# Python Scripting Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Programming/Python-Scripting-Question-1)

---

## Table of Contents

- Python Scripting Question 1
  - Understanding the Requirement
  - The Python psutil Module
  - Example Monitoring Script
  - Interview Strategy
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Programming

# Python Scripting Question 1

We have an on-premises Linux server that requires continuous monitoring. As a DevOps engineer with exclusive access, your goal is to develop a basic monitoring script using Python.

![The image contains a question about setting up a basic monitoring script on an on-premises Linux server, directed at a DevOps engineer.](https://kodekloud.com/kk-media/image/upload/v1752873398/notes-assets/images/DevOps-Interview-Preparation-Course-Python-Scripting-Question-1/monitoring-script-linux-server-devops.jpg)

In this article, you'll learn how to tackle this scenario by leveraging Python scripting, making it an ideal solution for rapid automation and real-world interview discussions.

## Understanding the Requirement

The task is to monitor a Linux server hosted on-premises instead of in the cloud. Python scripting is an essential skill for DevOps engineers because it allows you to quickly test solutions and automate server monitoring. This capability is particularly valuable during job interviews, where you may be asked to outline a step-by-step strategy for monitoring server health.

![The image contains text discussing the importance of scripting for DevOps engineers, emphasizing its role in quick testing, automation, and development, and mentions interview scenarios involving scripting and coding knowledge.](https://kodekloud.com/kk-media/image/upload/v1752873399/notes-assets/images/DevOps-Interview-Preparation-Course-Python-Scripting-Question-1/devops-scripting-importance-discussion.jpg)

> [!important]
> **Tip**
>
> Make sure to practice explaining your script logically, focusing on how each system metric is monitored.

## The Python psutil Module

One of the most effective tools for system monitoring in Python is the psutil module. This module provides detailed access to system information such as CPU times, memory usage, disk usage, and temperature sensors. To install psutil, run the following command:

```
pip install psutil
```

## Example Monitoring Script

Below is an example Python script that utilizes the psutil module to gather critical system metrics. The script captures details including CPU times, load averages, virtual memory, swap memory, disk usage, disk I/O counters, and temperature sensors, making it a robust solution for monitoring server performance:

```
import psutil


# CPU times
print(psutil.cpu_times())


# Average CPU load
print(psutil.getloadavg())


# Virtual memory
print(psutil.virtual_memory())


# Swap memory
print(psutil.swap_memory())


# Disk usage of the root directory
print(psutil.disk_usage('/'))


# Disk I/O counters (overall, not per disk)
print(psutil.disk_io_counters(perdisk=False))


# Temperature sensors (if available)
print(psutil.sensors_temperatures())
```

When executed on your Linux server, this script outputs detailed monitoring data that can be analyzed further or sent to a centralized system for continuous tracking and alerting.

## Interview Strategy

During an interview, if asked how you would monitor an on-premises Linux server, you might respond with the following explanation:

"I would implement a Python-based monitoring solution, leveraging the psutil module to extract essential system metrics. This script provides critical insights into CPU performance, memory usage, disk activity, and temperature sensors. It serves as a blueprint that can be enhanced to forward data to a centralized monitoring dashboard for extensive analysis and alerting."

> [!important]
> **Remember**
>
> Detailing your approach clearly not only demonstrates your technical expertise but also your practical problem-solving skills.

Thank you for reading this article. I hope you find this guide on using Python for server monitoring insightful. Stay tuned for more DevOps strategies and tips in our upcoming articles.

For more information on server monitoring and DevOps practices, explore our additional resources and documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/5e7996c8-ac3e-49b6-bfce-717b5a2ff2d3/lesson/6b048bf8-3b48-4bcd-a87c-c38866a1dd1e)**
>
> Watch video content
