# Client Library - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Push-Gateway/Client-Library)

---

## Table of Contents

- Client Library
  - Watch Video
  - Practice Lab

---

## Content

Prometheus Certified Associate (PCA)

Push Gateway

# Client Library

Prometheus client libraries allow you to push metrics to a Push Gateway efficiently. They support three primary operations that correspond to common HTTP methods for metric manipulation:

1.  A push operation that removes any existing metrics for the job and adds the new ones (equivalent to an HTTP PUT request).
2.  A push operation that updates metrics with the same name while leaving other metrics unchanged (behaving like an HTTP POST request).
3.  A delete operation that removes all metrics in a specified group (similar to an HTTP DELETE request).

Below is an example demonstrating how to push metrics using the Prometheus client library:

```
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway


# Create a new registry to hold our metrics
registry = CollectorRegistry()


# Define a gauge metric and register it with the registry
test_metric = Gauge('test_metric', 'This is an example metric', registry=registry)


# Set a value for the metric
test_metric.set(10)


# Push the metric to the Push Gateway
push_to_gateway('user2:9091', job='batch', registry=registry)
```

> [!important]
> **Note**
>
> In the example above, the CollectorRegistry is used to group all metrics together. After defining and updating a gauge metric, the `push_to_gateway` function pushes the updated metric to the designated Push Gateway, ensuring that the metrics for the specified job are up to date.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/18b41166-411a-42a8-91c2-18a5b49bc189/lesson/bd98ee9b-5815-453b-a3b6-f261ae83377c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/18b41166-411a-42a8-91c2-18a5b49bc189/lesson/1b35c5df-3f0d-46cb-b867-50af1283ff50)**
>
> Practice lab
