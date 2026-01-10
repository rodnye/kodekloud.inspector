# Forward Audit Logs to External Server - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Jenkins-Administration-and-Monitoring/Forward-Audit-Logs-to-External-Server)

---

## Table of Contents

- Forward Audit Logs to External Server
  - 1. Elastic Cloud: Collect and Analyze Logs
  - 2. Download and Install the Elastic Agent
  - 3. Configure the Elastic Agent to Stream Jenkins Audit Logs
  - 4. Verify Logs in Kibana
  - 5. Explore Jenkins Audit Logs
  - Links and References
  - Watch Video
    - Configuration Summary

---

## Content

Advanced Jenkins

Jenkins Administration and Monitoring

# Forward Audit Logs to External Server

In this guide, you’ll learn how to ship Jenkins audit trail logs from your controller node to an external Elastic Cloud server. We’ll cover setting up the Elastic Agent, configuring it to pick up Jenkins logs, and visualizing them in Kibana.

## 1\. Elastic Cloud: Collect and Analyze Logs

First, sign in to your Elastic Cloud account and navigate to **Observability » Collect and Analyze Logs**. This onboarding flow walks you through creating an API key and preparing the Elastic Agent for log collection.

![The image shows a webpage from Elastic's observability onboarding, offering options to collect and analyze logs, monitor application performance, and monitor infrastructure. There are tabs and a search bar at the top.](https://kodekloud.com/kk-media/image/upload/v1752868844/notes-assets/images/Advanced-Jenkins-Forward-Audit-Logs-to-External-Server/elastic-observability-onboarding-webpage.jpg)

1.  Click **Host system logs** under Resource Type.
2.  Copy the generated API key and endpoint URL; you’ll need these in the next step.

![The image shows a webpage from Elastic, displaying options for monitoring different types of resources, such as system logs, log files, OpenTelemetry, Azure, AWS, and Google Cloud Platform.](https://kodekloud.com/kk-media/image/upload/v1752868845/notes-assets/images/Advanced-Jenkins-Forward-Audit-Logs-to-External-Server/elastic-monitoring-resources-webpage.jpg)

Follow the steps to install the Elastic Agent. When prompted, the console displays a command with your API key embedded.

![The image shows a webpage from Elastic's Kibana interface, guiding users on how to add observability data by collecting system logs. It includes instructions for installing an Elastic agent and mentions an API key creation.](https://kodekloud.com/kk-media/image/upload/v1752868846/notes-assets/images/Advanced-Jenkins-Forward-Audit-Logs-to-External-Server/kibana-observability-data-setup.jpg)

> [!important]
> **Note**
>
> Make sure you have sufficient permissions to generate API keys. If you lose the key, regenerate it in the Elastic Cloud console.

## 2\. Download and Install the Elastic Agent

SSH into your Jenkins controller (Linux) and run the standalone install script. Replace the placeholders with your actual API key and endpoint URL.

```
curl https://b711dfdc62646e7af323cc5de3bec68.us-central1.gcp.cloud.es.io/3933429968a/plugins/observabilityOnboarding/assets/standalone_agent_setup.sh \
  -o standalone_agent_setup.sh && \
sudo bash standalone_agent_setup.sh \
  TfIkbXTuJm2DnRS3tBjtkybk6CWi6KNB0KRVzMHZNjLHeXxAQ== \
  https://b711dfdc62646e7af323cc5de3bec68.us-central1.gcp.cloud.es.io/internal/observability_onboarding \
  8.15.3 \
  41f90c24-3644-4edc-ad7a-763b3202a211
```

Sample output:

```
Downloading Elastic Agent archive from:
https://artifacts.elastic.co/downloads/beats/elastic-agent/elastic-agent-8.15.3-linux-x86_64.tar.gz
...
Elastic Agent successfully installed, starting enrollment.
Elastic Agent running (id: 45023cea-1f89-40b6-b5e6-32a749382edd)
Done. Configuration saved at /opt/Elastic/Agent/elastic-agent.yml
```

## 3\. Configure the Elastic Agent to Stream Jenkins Audit Logs

Open the main agent config file and add your Jenkins audit log path under `inputs`:

```
outputs:
  default:
    type: elasticsearch
    hosts: ['https://17c4dc99654624076c92fc52f34b.us-central1.gcp.cloud.es.io:443']
    apikey: 'NaemPMfB4d30Kpm9n16K-1rCAB10Yus69VgxlZA'

inputs:
  - id: jenkins-audit-logs
    type: logfile
    data_stream:
      namespace: default
    streams:
      - id: logfile-jenkins-audit
        data_stream:
          dataset: system.auth
        type: logs
        paths:
          - /var/log/jenkins/custom-audit-*.log
        exclude_files:
          - '.gz$'
        multiline:
          pattern: '^'
          match: after
        tags:
          - jenkins-audit
        processors:
          - add_locale: {}
```

> [!important]
> **Warning**
>
> Editing `elastic-agent.yml` with incorrect indentation or syntax will prevent the agent from starting. Always back up the original file before making changes.

Restart the agent to apply your updates:

```
sudo systemctl restart elastic-agent
```

## 4\. Verify Logs in Kibana

Return to **Observability » Logs** in Kibana. Within seconds, your Jenkins audit entries should appear in the stream. If you don’t see any data, open the **Troubleshooting** panel for diagnostics.

![The image shows a webpage from Elastic's Kibana interface indicating that logs are being shipped, with options for troubleshooting and exploring logs.](https://kodekloud.com/kk-media/image/upload/v1752868847/notes-assets/images/Advanced-Jenkins-Forward-Audit-Logs-to-External-Server/kibana-logs-shipping-troubleshooting.jpg)

## 5\. Explore Jenkins Audit Logs

In **Logs Explorer**, filter by the `jenkins-audit` tag or `system.auth` dataset. Click on individual events to inspect metadata such as user, timestamp, and action.

![The image shows a screenshot of the Elastic Observability Logs Explorer interface, displaying log details and content breakdown for a specific error message related to Jenkins.](https://kodekloud.com/kk-media/image/upload/v1752868848/notes-assets/images/Advanced-Jenkins-Forward-Audit-Logs-to-External-Server/elastic-observability-logs-explorer.jpg)

Example log entry:

```
[Nov 10, 2024 3:33:43,556 PM] job/monitor-jenkins/#35 Started by user siddharth, Parameters:[]
```

### Configuration Summary

| Section | Purpose                                 | Example                                       |
| ------- | --------------------------------------- | --------------------------------------------- |
| outputs | Elasticsearch endpoint & API key        | hosts: \\[…\\]; apikey: 'NaemPMfB…'           |
| inputs  | Defines log file path and parsing rules | paths: /var/log/jenkins/custom-audit-\\\*.log |

## Links and References

- [Elastic Cloud Observability](https://www.elastic.co/cloud/)
- [Elastic Agent Documentation](https://www.elastic.co/guide/en/fleet/current/elastic-agent-overview.html)
- [Jenkins Audit Trail Plugin](https://plugins.jenkins.io/audit-trail/)
- [Kibana Logs Explorer](https://www.elastic.co/guide/en/kibana/current/logs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/fe8b8755-ab0a-429d-ac8c-a7763f723359/lesson/52395607-f81b-4c76-87a6-23f1db54ada7)**
>
> Watch video content
