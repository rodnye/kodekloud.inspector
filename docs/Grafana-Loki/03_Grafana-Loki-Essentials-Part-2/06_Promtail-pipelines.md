# Promtail pipelines - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Grafana-Loki/Grafana-Loki-Essentials-Part-2/Promtail-pipelines)

---

## Table of Contents

- Promtail pipelines
  - Understanding the Log Structure
  - Updating the Promtail Configuration
  - Deploying the Updated Configuration
  - Verifying the Changes in Grafana
  - Watch Video

---

## Content

Grafana Loki

Grafana Loki Essentials Part 2

# Promtail pipelines

In this article, we explore how to modify your Promtail configuration to extract specific log properties—such as the HTTP method and status code—and store them as labels. This enhancement enables more efficient indexing and querying within Loki. The guide below walks you through understanding the log structure, updating your Promtail configuration, deploying the changes, and verifying the results in Grafana.

---

## Understanding the Log Structure

Promtail handles logs that include embedded JSON strings. Consider sample log entries where properties like the HTTP method, route, and status code are embedded within a JSON object. Although you can still search for text, promoting these values to labels simplifies filtering and querying. For example, a typical log entry might appear as follows:

```
2023-08-06 19:20:36.819 "log":{"level":50,"time":1691364036818,"pid":1,"hostname":"api-5bb95b4844-ln5xk","method":"PATCH","route":"/users","code":"201"}
2023-08-06 19:20:36.818 "log":{"level":30,"time":1691364036814,"pid":1,"hostname":"api-5bb95b4844-ln5xk","method":"GET","route":"/users","code":"404"}
2023-08-06 19:20:36.823 "log":{"level":40,"time":1691364036821,"pid":1,"hostname":"api-5bb95b4844-ln5xk","method":"POST","route":"/users","code":"200"}
```

When logs are forwarded by Promtail, they might be wrapped in an outer JSON structure similar to this:

```
2023-08-06 19:20:36.819 {"log":"{\"level\":50,\"time\":1691340363618,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"PATCH\",\"route\":\"/users/\",\"code\":\"201\"}\n","stream":"stdout","time":"2023-08-06T19:20:36.818396Z"}
2023-08-06 19:20:35.865 {"log":"{\"level\":30,\"time\":1691340363481,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"GET\",\"route\":\"/users/\",\"code\":\"404\"}\n","stream":"stdout","time":"2023-08-06T19:20:35.348775Z"}
2023-08-06 19:20:30.998 {"log":"{\"level\":40,\"time\":1691340362879,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"POST\",\"route\":\"/users/\",\"code\":\"200\"}\n","stream":"stdout","time":"2023-08-06T19:20:30.287125Z"}
2023-08-06 19:20:28.938 {"log":"{\"level\":50,\"time\":1691340362698,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"DELETE\",\"route\":\"/users/\",\"code\":\"500\"}\n","stream":"stdout","time":"2023-08-06T19:20:28.237299Z"}
```

Within these log entries, the JSON object includes a "log" property that holds another JSON string. The objective is to extract the values of "code" and "method" from this nested JSON and use them as labels in Loki.

---

## Updating the Promtail Configuration

To extract these properties as labels, update your Promtail configuration file (typically named `promtail.yaml`). Begin by examining the log structure to confirm the placement of the required data, and then add a new pipeline stage.

Below is an example of the original Promtail configuration snippet:

```
scrape_configs:
  # See https://github.com/grafana/loki/blob/master/production/ksonnet/promtail/scrape_config.libsonnet for reference
  - job_name: kubernetes-pods
    pipeline_stages:
      - cri: {}
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels:
          - __meta_kubernetes_pod_controller_name
        regex: ([-0-9a-z-.]+)?([-0-9a-f]{8,10})?
        action: replace
        target_label: __tmp_controller_name
      - source_labels:
          - __meta_kubernetes_pod_label_app_kubernetes_io_name
          - __meta_kubernetes_pod_label_app
          - __tmp_controller_name
          - __meta_kubernetes_pod_name
        regex: ^.*([^[;]+)(;.*)?$
        action: replace
```

Now, integrate a new pipeline stage that uses the "match" stage to target pods by their labels, followed by JSON stages to extract the desired properties. The updated snippet appears as follows:

```
scrape_configs:
  # Reference: https://github.com/grafana/loki/blob/master/production/ksonnet/promtail/scrape_config.libsonnet
  - job_name: kubernetes-pods
    pipeline_stages:
      - cri: {}
      - match:
          selector: '{app="api"}'
          stages:
            - json:
                expressions:
                  log:
            - json:
                source: log
                expressions:
                  code: code
                  method: method
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels:
          - __meta_kubernetes_pod_controller_name
        regex: ([-0-9a-z.]+)?([-0-9a-f]{8,10})?
        action: replace
        target_label: __tmp_controller_name
      - source_labels:
          - __meta_kubernetes_pod_label_app_kubernetes_io_name
          - __meta_kubernetes_pod_label_app
          - __tmp_controller_name
          - __meta_kubernetes_pod_name
```

> [!important]
> **Explanation**
>
> The first JSON stage extracts the inner "log" property from the incoming message, while the second JSON stage works on the extracted "log" object to obtain the "code" and "method" fields. These extracted properties can then be used as labels in Loki for more detailed queries.

---

## Deploying the Updated Configuration

Once you have saved the updated `promtail.yaml`, update the Promtail secret in your Kubernetes cluster to deploy these changes. Follow these steps:

1.  **Retrieve the Current Secret:**

    Execute the command below to save the existing secret to a file:

    ```
    kubectl get secret loki-promtail -o jsonpath="{.data.promtail\.yaml}" | base64 --decode > promtail.yaml
    ```

2.  **Delete the Existing Secret:**

    Remove the current secret with:

    ```
    kubectl delete secret loki-promtail
    ```

3.  **Create a New Secret from the Updated File:**

    Recreate the secret using:

    ```
    kubectl create secret generic loki-promtail --from-file=./promtail.yaml
    ```

4.  **Restart the Promtail Pod:**

    Since Promtail pods use this secret, restart the pod to apply the changes:

    ```
    kubectl delete pod loki-promtail-bk9rj
    ```

    After a few seconds, Kubernetes will launch a new pod with the updated configuration. Verify the running pods by executing:

    ```
    kubectl get pod
    ```

> [!important]
> **Important**
>
> Ensure you apply these commands carefully in your production environment. Always back up your current configuration before making changes.

---

## Verifying the Changes in Grafana

After deploying the updated configuration, return to Grafana to confirm that the labels have been correctly applied. Look for log entries that now include the `code` and `method` labels. For example:

```
{
  "log": "{\"level\":50,\"time\":1691346386182,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"PATCH\",\"route\":\"/users/\",\"code\":\"201\"}\n",
  "stream": "stdout",
  "time": "2023-08-06T12:20:36.818339263Z"
}
```

```
{
  "log": "{\"level\":30,\"time\":1691343483114,\"pid\":1,\"hostname\":\"api-5bb95b4844-ln5xk\",\"method\":\"GET\",\"route\":\"/users/\",\"code\":\"404\"}\n",
  "stream": "stdout",
  "time": "2023-08-06T12:20:34.814877552Z"
}
```

Using Grafana’s query builder, you can now perform filtered searches. For instance, to find log entries with a status code of "200", use a query like:

```
{pod="api-5bb95b4844-ln5xk", code="200"} |= ""
```

This confirms that Promtail successfully extracts and assigns the desired log properties as labels, enabling more precise search capabilities in Loki.

---

By following these detailed steps, you have enhanced your logging pipeline by converting essential log properties into labels. This improved configuration not only streamlines the log analysis process but also boosts the efficiency of your monitoring setup using Grafana and Loki.

For additional guidance, check out the official [Loki Documentation](https://grafana.com/docs/loki/latest/) and [Promtail Repository](https://github.com/grafana/loki/tree/main/clients/cmd/promtail).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/grafana-loki/module/bcacc3b5-9868-4ee5-9a59-a2b73b2c500f/lesson/6057681f-cdf8-40f9-ae2b-0730caebecc6)**
>
> Watch video content
