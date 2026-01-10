# Building Kibana Dashboards to Visualize Our Application Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Instrumenting-a-Simple-Python-App-for-Logging/Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-1)

---

## Table of Contents

- Building Kibana Dashboards to Visualize Our Application Part 1
  - Accessing Kibana in Your Kubernetes Cluster
  - Navigating Kibana and Creating an Index
  - Real-Time Log Visualization
  - Analyzing Log Structure in Kibana
  - Next Steps
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Instrumenting a Simple Python App for Logging

# Building Kibana Dashboards to Visualize Our Application Part 1

Hello and welcome back!

In our previous article, we successfully deployed a Fluent Bit application that forwarded logs to Elasticsearch. Now, we will dive into visualizing these logs using Kibana.

This article is organized into three parts. In Part 1, we will explore Kibana by creating an index and reviewing the logs. We will evaluate whether the current log structure is sufficient or if it requires improvements.

Let's get started by accessing Kibana in our Kubernetes cluster.

## Accessing Kibana in Your Kubernetes Cluster

First, switch to the appropriate namespace using the following command:

```
kubectl config set-context --current --namespace=efk
```

Next, list the services running in the cluster:

```
kubectl get svc
```

The output might look like this:

```
controlplane ~ ⟩ kubectl get svc
NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                     AGE
elasticsearch          NodePort    10.104.87.23    <none>       9200:30200/TCP,9300:30300/TCP   9m31s
kibana                 NodePort    10.103.210.120  <none>       5601:30601/TCP               9m31s
simple-webapp-service  NodePort    10.102.109.237  <none>       80:39001/TCP                 9m13s
```

Copy the Kibana port number, click on the three dots next to its service, choose "New Port," and paste the port number. Then, click "Open Port" to launch the Kibana UI.

## Navigating Kibana and Creating an Index

Once the Kibana UI loads, click on the menu icon (the three bars) and navigate to **Stack Management → Index Management**. Here, you will see an index populated by Fluent Bit:

![The image shows the "Index Management" section of an Elastic interface, displaying details of an index named "logstash-2024.07.13" with its health status, number of primaries, replicas, document count, and storage size.](https://kodekloud.com/kk-media/image/upload/v1752874218/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-1/index-management-logstash-2024-07-13.jpg)

Click on the index name, then select **Discover Index**. Next, click on **Create data view**. Provide a name for the data view (for example, "login") and specify the desired index pattern:

![The image shows a Kibana interface where a user is creating a data view, with fields for the name, index pattern, and timestamp field.](https://kodekloud.com/kk-media/image/upload/v1752874219/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-1/kibana-data-view-creation-interface.jpg)

After entering the required information, click **Save data view**.

## Real-Time Log Visualization

Upon saving, you will be redirected to the Kibana UI where logs are visualized in real time:

![The image shows a dashboard from Elastic's Discover tool, displaying log data with a histogram and a list of documents containing log entries.](https://kodekloud.com/kk-media/image/upload/v1752874220/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-1/elastic-discover-log-dashboard.jpg)

To verify that logs are flowing into Elasticsearch, log into your application using any username and password. After a successful login, refresh Kibana. New records should appear, confirming that the end-to-end integration is working.

Every front-end UI action is now logged and can be visualized in real time:

![The image shows a dashboard from Elastic's Discover tool, displaying log data with a histogram and a list of documents containing log entries. The interface includes options for filtering and sorting the data.](https://kodekloud.com/kk-media/image/upload/v1752874222/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-1/elastic-discover-log-dashboard-2.jpg)

## Analyzing Log Structure in Kibana

Review the available log fields such as timestamp, log, stream, and time. Click on the **log** field to view its subfields, which include various log levels such as info and warnings. By selecting the lens icon, you can create a graph based on the `log.keyword` field.

However, modifying the graph type (such as switching to lines or vertical bars) might not resolve the clutter issue. The logs remain consolidated in a single field due to the way the application sends its logs. Without additional parsing, building a clear and useful dashboard becomes challenging. It requires reliance on extensive KQL queries or regular expressions to differentiate the log details.

> [!important]
> **Note**
>
> Improving the readability of log data may require advanced log parsing techniques to segregate log details into meaningful fields. This will simplify querying and dashboard creation in Kibana.

## Next Steps

In the upcoming article, we will demonstrate how to enhance our logging structure. The improvements will make the information sent to Elasticsearch more actionable, allowing for efficient dashboards and easier log analysis.

Thank you for reading, and see you in the next part.

For additional resources, check out:

- [Kibana Documentation](https://www.elastic.co/guide/en/kibana/current/index.html)
- [Elasticsearch Guide](https://www.elastic.co/guide/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/2c0792c4-1a21-404f-83e2-75698bc62fe0/lesson/ee7a57ee-50bb-46f7-aca0-b03864ea4765)**
>
> Watch video content
