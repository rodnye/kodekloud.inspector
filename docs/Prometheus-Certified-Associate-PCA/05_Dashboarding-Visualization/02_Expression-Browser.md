# Expression Browser - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Dashboarding-Visualization/Expression-Browser)

---

## Table of Contents

- Expression Browser
  - Accessing the Expression Browser
  - Executing Queries
  - Working with Multiple Panels
  - Visualizing Data with the Graph Page
  - Conclusion
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Dashboarding Visualization

# Expression Browser

The Expression Browser is a built-in web UI provided by Prometheus that allows you to execute ad hoc PromQL queries and generate simple graphs. While it offers only basic functionality, it is an ideal tool for quick debugging and one-off queries. However, note that it is not designed for building custom dashboards or handling day-to-day monitoring.

![The image is a slide describing the "Expression Browser," a web UI for executing queries and simple graphs, noting its limited functionality and unsuitability for building custom dashboards or day-to-day monitoring.](https://kodekloud.com/kk-media/image/upload/v1752882978/notes-assets/images/Prometheus-Certified-Associate-PCA-Expression-Browser/expression-browser-ui-description.jpg)

## Accessing the Expression Browser

To get started, open your web browser and navigate to the IP address of your Prometheus server along with the appropriate port number. This action loads the Expression Browser interface, where you can input any PromQL query.

For instance, type "node" into the query editor. With autocomplete enabled, the interface will suggest available metrics that begin with "node" along with their types. If autocomplete is disabled, these suggestions will not appear.

![The image shows a Prometheus web interface on a Linux system, displaying a query editor with a list of node metrics.](https://kodekloud.com/kk-media/image/upload/v1752882980/notes-assets/images/Prometheus-Certified-Associate-PCA-Expression-Browser/prometheus-web-interface-linux-metrics.jpg)

> [!important]
> **Tip**
>
> When testing queries with autocomplete, ensure it is enabled in your browser settings to maximize efficiency.

## Executing Queries

You can run an arbitrary query such as:

```
node_memory_Active_bytes{instance="192.168.1.168:9100", job="node"}
```

When executed, the Expression Browser displays the corresponding metric along with all its associated labels and the current value. To see historical data, simply select a different evaluation time from the dropdown menu—for example, viewing the metric value from one day ago.

For a more detailed analysis over a specific period (such as the past five minutes), adjust the query to retrieve a range vector. The Expression Browser will then display the corresponding time series data.

## Working with Multiple Panels

The Expression Browser also supports multiple panels, enabling side-by-side comparisons of query results. For example, after executing your first query, add another panel and run a query like:

```
node_cpu_seconds_total
```

![The image shows a Prometheus monitoring interface displaying query results for memory and CPU metrics. It includes tables with data on `node_memory_Active_bytes` and `node_cpu_seconds_total`.](https://kodekloud.com/kk-media/image/upload/v1752882981/notes-assets/images/Prometheus-Certified-Associate-PCA-Expression-Browser/prometheus-monitoring-cpu-memory-metrics.jpg)

> [!important]
> **Hint**
>
> Using multiple panels can help you quickly compare metrics such as memory usage and CPU load for more effective troubleshooting.

## Visualizing Data with the Graph Page

To enhance your analysis, navigate to the Graph page where you can visualize metric data. Consider the following query:

```
node_memory_Active_bytes{instance="192.168.1.168:9100", job="node"}
```

This query returns a range vector, but the Graph page is designed to display an instant vector. To resolve this, modify the query or apply a function. A common approach is to use the rate function to calculate the change over time:

```
rate(node_memory_Active_bytes[5m])
```

Running the above query depicts the rate of change over a five-minute interval. You can further customize the graph’s time window (for example, 30 minutes or 2 hours) or specify a custom evaluation time via the time picker.

The graph page also includes a legend that clearly identifies each series, particularly when graphing multiple series with various labels. For example, graphing:

```
rate(node_memory_Active_bytes[5m])
```

will display detailed metric labels in the legend. To further illustrate, consider graphing the CPU rate over a two-minute interval:

```
rate(node_cpu_seconds_total[2m])
```

Although this graph may seem less dynamic if the values are steady, the legend will still distinctly represent each node’s CPU metric.

## Conclusion

In summary, the Expression Browser is a straightforward and effective tool for executing quick PromQL queries and generating basic graphs. While it may not support advanced dashboarding, it remains an essential resource for rapid troubleshooting and on-demand monitoring.

For further details on Prometheus and PromQL, refer to the [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/d8fe7717-c2f8-4cfc-b3a7-c88d20fd5659/lesson/2fed6a36-d435-46de-8728-e1a9fd5824e6)**
>
> Watch video content
