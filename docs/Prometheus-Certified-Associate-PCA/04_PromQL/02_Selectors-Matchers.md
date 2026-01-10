# Selectors Matchers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/PromQL/Selectors-Matchers)

---

## Table of Contents

- Selectors Matchers
  - Equality Matcher
  - Negative Equality Matcher
  - Regular Expression Matcher
  - Negative Regular Expression Matcher
  - Combining Multiple Label Selectors
  - Range Vector Selectors
  - Summary
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

PromQL

# Selectors Matchers

In this lesson, we explore how Prometheus uses selectors and matchers to filter time series data. When you query using a metric name like "node_filesystem_avail_bytes", Prometheus returns every time series that matches this metric. For example:

```
$ node_filesystem_avail_bytes
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"}
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node2", mountpoint="/boot/efi"}
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node1", mountpoint="/"}
node_filesystem_avail_bytes{device="/dev/sda3", fstype="ext4", instance="node2", mountpoint="/"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/lock"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/snapd/ns"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node1", mountpoint="/run/user/1000"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/lock"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/snapd/ns"}
node_filesystem_avail_bytes{device="tmpfs", fstype="tmpfs", instance="node2", mountpoint="/run/user/1000"}
```

By default, all these time series are returned. However, if you are interested in a specific subset, label matchers allow you to narrow down the results by filtering based on individual label values.

![The image is a guide on label matchers, explaining different types of matchers such as exact match, negative equality, and regular expression matchers for time series metrics.](https://kodekloud.com/kk-media/image/upload/v1752883042/notes-assets/images/Prometheus-Certified-Associate-PCA-Selectors-Matchers/label-matchers-guide-time-series.jpg)

> [!important]
> **Note**
>
> There are several types of label matchers in Prometheus:
>
> 1.  Equality Matcher
> 2.  Negative Equality Matcher
> 3.  Regular Expression Matcher
> 4.  Negative Regular Expression Matcher

## Equality Matcher

The equality matcher returns all time series that have a specific label value. For instance, to filter time series from a specific instance like "node1", include the label filter within curly braces:

```
$ node_filesystem_avail_bytes{instance="node1"}
node_filesystem_avail_bytes{device="/dev/sda2", fstype="vfat", instance="node1", mountpoint="/boot/efi"}
...
```

This query returns only those series with the instance label set to "node1". Note that occasionally, other series might appear grayed out indicating they have been filtered out.

## Negative Equality Matcher

The negative equality matcher helps exclude time series with a particular label value. For example, to filter out time series where the "device" label equals "tmpfs", you would use:

```
$ node_filesystem_avail_bytes{device!="tmpfs"}
```

This query returns time series where the device is not "tmpfs".

## Regular Expression Matcher

For advanced filtering, you can use the regular expression matcher. Suppose you want to include only time series where the "device" label starts with "/dev/sda" (covering both "/dev/sda2" and "/dev/sda3"). In that case, you can run:

```
$ node_filesystem_avail_bytes{device=~"/dev/sda.*"}
```

The `=~` operator signals that you are using a regular expression, where `/dev/sda.*` matches any value beginning with "/dev/sda".

## Negative Regular Expression Matcher

Conversely, to exclude time series based on a regex pattern, you can apply the negative regular expression matcher. For example, to filter out any series where the mountpoint starts with "/boot", execute:

```
$ node_filesystem_avail_bytes{mountpoint!~"/boot.*"}
```

This query omits all time series with a mountpoint that starts with "/boot".

## Combining Multiple Label Selectors

Prometheus supports combining multiple label selectors within a single query. For example, if you want time series from "node1" that do not have the device label "tmpfs", you can use:

```
$ node_filesystem_avail_bytes{instance="node1", device!="tmpfs"}
```

This combined query applies both filters concurrently to return the desired output.

## Range Vector Selectors

Range vector selectors allow you to retrieve historical data for a time series over a specified duration. Unlike an instant vector that gives the most recent value, a range vector provides all values scraped over a given period. For instance, to view data for the "node_arp_entries" metric from "node1" over the last 2 minutes, you can use:

```
$ node_arp_entries{instance="node1"}[2m]
  8 @1669253129.609
  2 @1669253144.609
  3 @1669253159.609
  1 @1669253174.609
  7 @1669253189.609
  7 @1669253204.609
  6 @1669253229.609
  6 @1669253234.609
```

The suffix `[2m]` indicates that the query should return all values recorded over the past 2 minutes.

> [!important]
> **Key Takeaway**
>
> By mastering selectors and matchers, you can construct precise queries in Prometheus to monitor and analyze only the time series that matter to your observability needs.

## Summary

This lesson demonstrated how to:

- Use equality matchers to filter by specific label values.
- Apply negative matchers to exclude unwanted series.
- Employ regular expressions for flexible matching.
- Combine multiple label selectors for more refined queries.
- Utilize range vector selectors to retrieve historical metric data.

For further reading on Prometheus querying and label matching, check out the [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/b4de09eb-de60-4a9d-a193-b6f74f9889a3/lesson/6370db41-46cc-48aa-8ffc-e7ae911bce03)**
>
> Watch video content
