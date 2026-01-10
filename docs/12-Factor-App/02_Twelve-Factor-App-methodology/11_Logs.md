# Logs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Logs)

---

## Table of Contents

- Logs
  - Logging Storage Approaches
  - Example: Sending Logs via Fluentd
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Logs

In this article, we explore the logging mechanism used by our application and how it handles various output events like server startup, port listening, HTTP requests, and error reporting. Logs are crucial for monitoring system activities and troubleshooting issues.

When the application starts, it produces logs detailing the server startup sequence, including server addresses and port numbers. Every HTTP request served is recorded, as illustrated in the example below.

```
* Serving Flask app 'main'
* Debug mode: on
* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:8080
Press CTRL+C to quit
* Restarting with stat
* Debugger is active!
* Debugger PIN: 547-019-069
127.0.0.1 - - [25/Feb/2023 16:19:24] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [25/Feb/2023 16:19:24] "GET /favicon.ico HTTP/1.1" 404 -
127.0.0.1 - - [25/Feb/2023 16:19:26] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [25/Feb/2023 16:19:27] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [25/Feb/2023 16:19:27] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [25/Feb/2023 16:19:27] "GET / HTTP/1.1" 200 -
```

These logs not only capture standard operations of the server but also record errors and other significant events, making them indispensable for diagnosing issues when failures occur.

## Logging Storage Approaches

Traditionally, applications write logs to local files. However, in containerized environments, this method presents challenges:

- **Volatility:** A container may terminate at any time, causing the loss of local log files.
- **Inflexibility:** Tying your logging system to a specific file system location restricts scalability and portability.

An alternative is to send logs to a centralized logging server using systems such as Fluentd, the ELK Stack, or Splunk. While centralized logging enhances management and analysis, directly integrating your application with a specific logging provider is not recommended.

> [!important]
> **Best Practice**
>
> Always design your application so that it remains agnostic to any logging backend, which improves flexibility, scalability, and ease of maintenance.

## Example: Sending Logs via Fluentd

The following Python code demonstrates how logs can be sent to a Fluentd logging server. Note, however, that this pattern directly couples your application to Fluentd, which is discouraged:

```
from fluent import sender


# Configure logger for remote logging via Fluentd
logger = sender.FluentSender('app', host='host', port=24224)


# Emit a log event with details
logger.emit('follow', {'from': 'userA', 'to': 'userB'})
```

According to the 11th principle of the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology, applications should not be responsible for log storage or routing. Instead, all logs should be directed to standard output or written as structured JSON to a local file. This practice allows an external agent to collect and forward logs to a centralized repository, where they can be queried and analyzed efficiently.

Centralized logging solutions like the ELK Stack and Splunk are designed to ingest and process structured log data, making log analysis faster and more effective.

By decoupling the logging mechanism from your application, you ensure that your system remains agile and well-suited for cloud-native and containerized environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/635cc3fc-da70-4d2b-822e-0d63f0e17323)**
>
> Watch video content
