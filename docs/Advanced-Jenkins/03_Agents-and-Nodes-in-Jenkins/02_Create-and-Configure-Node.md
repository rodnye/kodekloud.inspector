# Create and Configure Node - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Create-and-Configure-Node)

---

## Table of Contents

- Create and Configure Node
  - 1. Review Existing Nodes
  - 2. Add a New Node
  - 3. Launch the Agent via JNLP
  - 4. Verify the Agent in Jenkins
  - 5. Inspect the Agent VM
  - Links and References
  - Watch Video
    - Sample Commands
    - Common Connection Error

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Create and Configure Node

This guide walks you through setting up a new Jenkins agent (node) on a dedicated Ubuntu VM—**Ubuntu-Docker-JDK17-Node20**—for distributed builds. You’ll learn how to register the agent in Jenkins, launch it via JNLP, resolve common connection errors, and verify that it’s online.

## 1\. Review Existing Nodes

1.  In Jenkins, go to **Manage Jenkins → Nodes**.
2.  By default, you’ll see only the built-in controller node.

![The image shows a Jenkins dashboard displaying node information, including architecture, clock difference, and disk space details. The build queue is empty, and the build executor status shows two idle executors.](https://kodekloud.com/kk-media/image/upload/v1752868758/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-dashboard-node-info-idle-executors.jpg)

## 2\. Add a New Node

1.  Click **New Node**.
2.  Enter a name (for example, `Ubuntu-Agent`) and choose **Permanent Agent**.
3.  Configure the fields below:

| Field                 | Description                                   | Example                                                      |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| Description           | Optional notes about this agent.              | “Docker + JDK17 on Ubuntu”                                   |
| \\# of executors      | Maximum parallel builds.                      | `2`                                                          |
| Remote root directory | Workspace, logs, and temp files on the agent. | `/home/jenkins-agent`                                        |
| Labels                | Tags to match pipeline stages or jobs.        | `docker`, `jdk17`                                            |
| Usage                 | Controls job assignment.                      | “Only build jobs with label expressions matching this node.” |

4.  Under **Launch method**, select **Launch agent by connecting it to the controller** and set **Availability** to keep it always online.
5.  Add any **Node Properties** you need—disk space monitoring, environment variables, tool locations, etc.

![The image shows a Jenkins interface for configuring a node, with fields for description, number of executors, and remote root directory. There is a warning indicating that the remote directory is mandatory.](https://kodekloud.com/kk-media/image/upload/v1752868759/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-node-configuration-interface.jpg)

![The image shows a Jenkins configuration page for managing nodes, with options for setting the number of executors, remote root directory, labels, usage, and launch method. The "Launch method" dropdown is expanded, showing different options for connecting the agent to the controller.](https://kodekloud.com/kk-media/image/upload/v1752868761/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-configuration-managing-nodes.jpg)

![The image shows a Jenkins dashboard interface with node properties settings, including disk space monitoring thresholds and environment variables.](https://kodekloud.com/kk-media/image/upload/v1752868762/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-dashboard-node-properties.jpg)

6.  Click **Save**. The new node appears **offline** until you launch its agent process.

## 3\. Launch the Agent via JNLP

Download `agent.jar` and start the agent on your VM. Here’s a quick reference for JNLP options:

| Option     | Description                        |
| ---------- | ---------------------------------- |
| `-url`     | Jenkins controller URL             |
| `-secret`  | Agent’s secret for authentication  |
| `-name`    | Node name as registered in Jenkins |
| `-workDir` | Local workspace on the agent       |

### Sample Commands

```
# Unix (inline secret)
curl -sO http://64.227.187.25:8080/jnlpJars/agent.jar
java -jar agent.jar \
  -url http://64.227.187.25:8080/ \
  -secret 687ec2b7…5c4a6f41 \
  -name "ubuntu-agent" \
  -workDir "/home/jenkins-agent"
```

```
:: Windows (curl.exe)
curl.exe -sO http://64.227.187.25:8080/jnlpJars/agent.jar
java -jar agent.jar ^
  -url http://64.227.187.25:8080/ ^
  -secret 687ec2b7…5c4a6f41 ^
  -name "ubuntu-agent" ^
  -workDir "C:\jenkins-agent"
```

```
# Unix (secret file)
echo 687ec2b7…5c4a6f41 > secret-file
curl -sO http://64.227.187.25:8080/jnlpJars/agent.jar
java -jar agent.jar \
  -url http://64.227.187.25:8080/ \
  -secret @secret-file \
  -name "ubuntu-agent" \
  -workDir "/home/jenkins-agent"
```

On your Ubuntu VM:

```
cd /home
curl -sO http://64.227.187.25:8080/jnlpJars/agent.jar
java -jar agent.jar \
  -url http://64.227.187.25:8080/ \
  -secret 687ec2b7…5c4a6f41 \
  -name "ubuntu-agent" \
  -workDir "/home/jenkins-agent"
```

> [!important]
> **Note**
>
> Ensure the agent’s JDK version matches the controller’s JDK to avoid compatibility issues.

### Common Connection Error

If your agent logs show a `404` for `.../jnlpAgentListener/`, it means the inbound agent TCP port is disabled.

> [!important]
> **Warning**
>
> Inbound agents require a TCP port.
> Go to **Manage Jenkins → Configure Global Security** and set **TCP port for inbound agents** to **Fixed** or **Random**.

![The image shows a Jenkins security configuration page with options for setting the TCP port for inbound agents and CSRF protection settings. The TCP port is currently set to "Disable."](https://kodekloud.com/kk-media/image/upload/v1752868763/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-security-configuration-tcp-port.jpg)

Save and re-run the JNLP command. You should see:

```
INFO: Using /home/jenkins-agent as a remoting work directory
INFO: Setting up agent: ubuntu-agent
INFO: Locating server among [http://64.227.187.25:8080]
INFO: Connected
```

## 4\. Verify the Agent in Jenkins

1.  Go back to **Manage Jenkins → Nodes**.
2.  Confirm that `ubuntu-agent` is **online** and ready.

![The image shows a Jenkins dashboard displaying node information, including architecture, disk space, and response time for two nodes: "Built-In Node" and "ubuntu-agent."](https://kodekloud.com/kk-media/image/upload/v1752868765/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-dashboard-node-info.jpg)

Click on the agent name to explore:

- **System Information** (JVM, OS, environment)  
  ![The image shows a Jenkins interface displaying system information for an "ubuntu-agent," including system properties with hidden values.](https://kodekloud.com/kk-media/image/upload/v1752868766/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-ubuntu-agent-system-info.jpg)
- **JavaMelody Monitoring** (threads, processes, GC stats)  
  ![The image shows a Jenkins interface with JavaMelody Monitoring options for system reports and actions, including viewing threads, OS processes, and executing the garbage collector.](https://kodekloud.com/kk-media/image/upload/v1752868767/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-javamelody-monitoring-interface.jpg)
- **Agent Log** (connection status, version)  
  ![The image shows a Jenkins interface displaying a log for an "ubuntu-agent," indicating that the agent is successfully connected and online. The sidebar includes options like Status, Configure, and Monitoring.](https://kodekloud.com/kk-media/image/upload/v1752868769/notes-assets/images/Advanced-Jenkins-Create-and-Configure-Node/jenkins-ubuntu-agent-log-interface.jpg)

## 5\. Inspect the Agent VM

On the agent VM, verify the working directory structure:

```
root@ubuntu-docker-jdk17-node20:/home# ls
agent.jar  jenkins-agent

root@ubuntu-docker-jdk17-node20:/home# cd jenkins-agent/
root@ubuntu-docker-jdk17-node20:/home/jenkins-agent# ls
remoting
```

As you run builds, Jenkins will create `workspace`, `logs`, and `artifacts` folders under `/home/jenkins-agent`.

---

## Links and References

- [Jenkins Distributed Builds](https://www.jenkins.io/doc/book/architecture/distributed/)
- [Managing Nodes - Jenkins User Handbook](https://www.jenkins.io/doc/book/managing/nodes/)
- [JNLP Agents](https://www.jenkins.io/doc/book/managing/nodes/#jnlp-agents)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/8fb04397-a436-418a-af28-1f6f99967190)**
>
> Watch video content
