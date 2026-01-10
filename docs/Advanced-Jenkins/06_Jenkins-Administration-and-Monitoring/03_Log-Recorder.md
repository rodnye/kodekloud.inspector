# Log Recorder - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Log-Recorder)

---

## Table of Contents

- Log Recorder
  - Examples: Non-UI Configuration
  - 1. Adding a Logger from the UI
  - 2. Use Case: Capturing Logs for a Kubernetes Cloud
  - Links and References
  - Watch Video
    - 1. logging.properties File (Approach 3)
    - 2. Default Levels via UI (Non-Persistent, Approach 5)

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Log Recorder

In this lesson, we'll explore how to create and configure loggers in Jenkins for effective troubleshooting and debugging using the Log Recorder. You can choose one of the following methods to adjust logging levels:

| Approach | Method                                                                   | Persistence                         |
| -------- | ------------------------------------------------------------------------ | ----------------------------------- |
| 1        | Add a logger from the UI (recommended)                                   | Permanent                           |
| 2        | Run a Groovy script during Jenkins initialization                        | Permanent                           |
| 3        | Supply a `logging.properties` file in `$JENKINS_HOME/logging.properties` | Permanent                           |
| 4        | Place a logger configuration file in the `$JENKINS_HOME/logs` directory  | Permanent                           |
| 5        | Configure default levels via the UI (non-persistent)                     | Session only (resets after restart) |

> [!important]
> **Warning**
>
> Increasing log verbosity can generate large volumes of data and impact the Jenkins controller's performance. Enable higher log levels only during active troubleshooting, then revert to defaults or remove the custom logger.

## Examples: Non-UI Configuration

Below are two configuration examples for approaches 3 and 5.

### 1\. `logging.properties` File (Approach 3)

Create a `logging.properties` file under `$JENKINS_HOME/logging.properties`:

```
.level = INFO
handlers = java.util.logging.ConsoleHandler

java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter

hudson.security.csrf.CrumbFilter.level = SEVERE
hudson.plugins.git.GitStatus.level = SEVERE
```

### 2\. Default Levels via UI (Non-Persistent, Approach 5)

If you add default levels through the Jenkins UI (which does not survive a restart), use this XML snippet:

```
<?xml version='1.1' encoding='UTF-8'?>
<log>
  <name>kb-article</name>
  <targets>
    <target>
      <name>org.jenkinsci.plugins.saml</name>
      <level>300</level>
    </target>
    <target>
      <name>org.pac4j</name>
      <level>300</level>
    </target>
  </targets>
</log>
```

---

## 1\. Adding a Logger from the UI

The most straightforward method to configure logging is via the Jenkins web interface:

1.  Go to **Manage Jenkins** → **System Log**.
2.  Click **Add new log recorder**.
3.  Enter a meaningful name, e.g., `example-logs`.
4.  Under **Log Levels**, select the severity (ALL, FINE, FINEST, etc.).
5.  In the **Loggers** section, add one or more package or class names (for example, `io.fabric8.kubernetes.client`).
6.  Click **Save**.

![The image is a screenshot of a webpage providing instructions on how to add a logger from the UI in Jenkins, including a step-by-step guide and a partial view of the Jenkins interface.](https://kodekloud.com/kk-media/image/upload/v1752868859/notes-assets/images/Advanced-Jenkins-Log-Recorder/jenkins-ui-logger-instructions.jpg)

---

## 2\. Use Case: Capturing Logs for a Kubernetes Cloud

When Jenkins is integrated with a Kubernetes cloud, a simple **Test Connection** might fail due to insufficient permissions:

```
Error testing connection https://...k8s.ondigitalocean.com:
io.fabric8.kubernetes.client.KubernetesClientException: Failure executing GET at https://.../api/v1/namespaces/jenkins-123/pods.
Message: pods is forbidden: User "system:serviceaccount:jenkins:jenkins-sa" cannot list resource "pods" in the namespace "jenkins-123"
Received status: Status(apiVersion="", code=403, kind=Status, message=pods is forbidden: ..., metadata=...)
```

To troubleshoot this:

1.  Navigate to **Manage Jenkins** → **System Log**.
2.  Click **Add new log recorder**, name it `k8s-logs`.
3.  Under **Log Levels**, set **ALL** (or another desired level).
4.  In **Loggers**, search for `kubernetes` and select `io.fabric8.kubernetes.client` (or a specific sub-package).
5.  Click **Save**.

![The image shows a Jenkins configuration screen for setting up a log recorder named "k8s-logs," with a dropdown menu for selecting log levels such as ALL, FINEST, FINER, and others. There is a warning about setting the Root logger to FINE or below due to performance issues.](https://kodekloud.com/kk-media/image/upload/v1752868860/notes-assets/images/Advanced-Jenkins-Log-Recorder/jenkins-log-recorder-k8s-logs.jpg)

After saving, trigger **Test Connection** again and refresh the `k8s-logs` recorder. You should see detailed HTTP traffic:

```
Nov 10, 2024 17:34:35 FINE io.fabric8.kubernetes.client.utils.HttpClientUtils getHttpClientFactory
Using httpclient io.fabric8.kubernetes.client.okhttp.OkHttpClientFactory factory
Nov 10, 2024 17:34:35 FINEST io.fabric8.kubernetes.client.http.HttpLoggingInterceptor$HttpLogger logStart
-HTTP START-
Nov 10, 2024 17:34:35 FINEST io.fabric8.kubernetes.client.http.HttpLoggingInterceptor$HttpLogger logRequest
> GET https://.../api/v1/namespaces/jenkins-123/pods
> Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...
Nov 10, 2024 17:34:35 FINEST io.fabric8.kubernetes.client.http.HttpLoggingInterceptor$HttpLogger logResponse
< HTTP/1.1 403 Forbidden
< content-type: application/json
< content-length: 302
{
  "kind": "Status",
  "apiVersion": "v1",
  "status": "Failure",
  "message": "pods is forbidden: User \"system:serviceaccount:jenkins:jenkins-service-account\" cannot list resource \"pods\" in the namespace \"jenkins-123\"",
  "reason": "Forbidden",
  "details": { "kind": "pods" },
  "code": 403
}
Nov 10, 2024 17:34:35 FINE io.fabric8.kubernetes.client.impl.BaseClient close
The client and associated httpclient ... have been closed.
```

![The image shows a screenshot of a Jenkins log file with HTTP requests and responses, including error messages related to Kubernetes permissions.](https://kodekloud.com/kk-media/image/upload/v1752868861/notes-assets/images/Advanced-Jenkins-Log-Recorder/jenkins-log-http-requests-kubernetes.jpg)

Once credentials or RBAC rules are corrected, rerunning the test will produce a concise success response:

```
{
  "major": "1",
  "minor": "29",
  "gitVersion": "v1.29.9",
  "gitCommit": "1141af58037bd7f0d9ed63e591c5e52dd9b298",
  "gitTreeState": "clean",
  "buildDate": "2024-09-11T20:19:54Z",
  "goVersion": "go1.22.6",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

> [!important]
> **Note**
>
> After you finish debugging, remember to delete or disable any custom log recorders to avoid excessive log generation and performance degradation.

---

## Links and References

- [Jenkins System Log](https://www.jenkins.io/doc/book/managing/system-log/)
- [Jenkins Pipeline Logging](https://www.jenkins.io/doc/book/pipeline/)
- [Kubernetes Java Client (Fabric8)](https://github.com/fabric8io/kubernetes-client)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/7f8a8bae-7536-4c67-b325-9c785e950bd3)**
>
> Watch video content
