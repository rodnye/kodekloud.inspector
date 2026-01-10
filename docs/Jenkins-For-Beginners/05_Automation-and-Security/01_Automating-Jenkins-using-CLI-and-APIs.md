# Automating Jenkins using CLI and APIs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Automation-and-Security/Automating-Jenkins-using-CLI-and-APIs)

---

## Table of Contents

- Automating Jenkins using CLI and APIs
  - Jenkins CLI via SSH
  - Jenkins CLI Client (HTTP Transport)
  - Jenkins REST API
  - Conclusion
  - Watch Video
    - Retrieve the SSH Port
    - Authenticating via SSH
    - Listing Available CLI Commands
    - Triggering a Job Build
    - Getting Started with the CLI Client
    - Secure Authentication with the CLI Client
    - Key Use Cases for the REST API
    - Installing a Plugin via the REST API

---

## Content

Jenkins For Beginners

Automation and Security

# Automating Jenkins using CLI and APIs

Jenkins offers powerful automation capabilities that can significantly improve your continuous integration and continuous delivery workflows. In this guide, we explore two primary methods to automate Jenkins tasks: the Jenkins Command-Line Interface (CLI) and the Jenkins REST API. Whether you prefer to interact with Jenkins via SSH or HTTP, these methods enable efficient management of jobs, plugins, and much more.

---

## Jenkins CLI via SSH

The Jenkins CLI allows both users and administrators to interact directly with Jenkins from a shell or script, streamlining daily tasks and integrations. You can access the CLI over SSH or via a downloadable Java-based client. When using SSH, note that the SSH service is disabled by default. Jenkins will select a random port for SSH connections, so you need to determine the port number first.

> [!important]
> **Important**
>
> Ensure that the SSH service is enabled and your public key is added to the Jenkins user configuration before attempting SSH-based sessions.

### Retrieve the SSH Port

Run the following command to obtain the SSH port used by Jenkins:

```
curl -Lv https://JENKINS_URL/login 2>&1 | grep -i 'x-ssh-endpoint'
# Expected output:
# < X-SSH-Endpoint: localhost:53801
```

### Authenticating via SSH

Jenkins uses SSH-based public-private key authentication. After retrieving the SSH port, add your SSH public key to the Jenkins configuration page for your account. Once configured, you can run several built-in CLI commands.

### Listing Available CLI Commands

To display all available commands, use the following command:

```
ssh -l username -p 53801 localhost help
```

### Triggering a Job Build

One common use case is triggering a job build. For example, to start a job named "hello-kodekloud", execute:

```
ssh -l username -p 53801 localhost build hello-kodekloud -f -v
```

The console output might look similar to:

```
Started hello-kodekloud #1
Started from command line by username
Building in workspace /tmp/jenkins/workspace/hello-kodekloud
[hello-kodekloud] /bin/sh -xe /tmp/hudson56238023482.sh
+ echo Hello KodeKloud
Hello KodeKloud
Finished: SUCCESS
Completed hello-kodekloud #1 : SUCCESS
```

---

## Jenkins CLI Client (HTTP Transport)

For certain scenarios, the Jenkins CLI client provided as a JAR file can be more convenient than SSH. This client uses HTTP or WebSocket transport, which means you do not need to open additional ports on your firewall.

### Getting Started with the CLI Client

1.  Download the `jenkins-cli.jar` from your Jenkins instance.
2.  Run the client with the following command:

```
java -jar jenkins-cli.jar -s http://10.0.0.5:8080/ -webSocket help
```

This command will display a list of available commands and demonstrate that the CLI client can interact with Jenkins over HTTP.

### Secure Authentication with the CLI Client

For secure usage, the CLI client supports basic authentication as well as API tokens. Although basic authentication using `--auth username:password` is available, it exposes credentials in plain text. It is recommended to use API tokens instead. Below are some examples:

```
java -jar jenkins-cli.jar -s JENKINS_URL -auth user:token list-jobs
java -jar jenkins-cli.jar -s JENKINS_URL -auth user:token build <job_name>
java -jar jenkins-cli.jar -s JENKINS_URL -auth user:token get-job <job_name>
```

> [!important]
> **Security Best Practice**
>
> Always use API tokens instead of plain text passwords to enhance security when automating Jenkins tasks.

---

## Jenkins REST API

The Jenkins REST API provides a comprehensive set of HTTP endpoints that allow you to control Jenkins programmatically. This API can be used for various tasks including installing plugins, managing jobs, triggering builds, and retrieving logs.

### Key Use Cases for the REST API

- Installing or managing plugins
- Creating, updating, or deleting jobs
- Triggering builds and retrieving job details
- Accessing console logs and artifacts
- Managing nodes and agents

### Installing a Plugin via the REST API

For example, you can install a plugin by sending a POST request with XML data using cURL:

```
curl -s -X POST --data "<jenkins><install plugin='${plugin}' /></jenkins>" \
-H 'Content-Type: text/xml' \
http://localhost:8080/pluginManager/installNecessaryPlugins \
--user admin:$JENKINS_TOKEN
```

This command sends the necessary XML to your Jenkins instance to install the specified plugin. You can also interact with the REST API using libraries available in various programming languages like Python or Java.

> [!important]
> **Authentication Warning**
>
> Avoid hardcoding credentials in your scripts. Use API tokens and secure HTTP header configurations to reduce the risk of exposing sensitive information.

---

## Conclusion

By leveraging both the Jenkins CLI and REST API, you can automate complex tasks, enhance integration with other development tools, and significantly streamline your Jenkins administration. Whether you choose SSH for direct CLI interactions or HTTP for broader API-based automation, these tools offer flexible and secure methods to manage your Jenkins environment.

For further reading and additional examples, consider exploring these additional resources:

- [Jenkins Official Documentation](https://www.jenkins.io/doc/)
- [Jenkins CLI Guide](https://www.jenkins.io/doc/book/managing/cli/)

Happy automating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/cd53a160-c852-4d65-b718-31b284cb48da/lesson/6c0992eb-666a-48dc-af92-bf02d76e772b)**
>
> Watch video content
