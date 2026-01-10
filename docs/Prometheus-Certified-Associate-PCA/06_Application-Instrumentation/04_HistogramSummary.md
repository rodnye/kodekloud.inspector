# HistogramSummary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/HistogramSummary)

---

## Table of Contents

- HistogramSummary
  - Setting Up the Histogram Metric
  - Capturing Request Latency
  - Understanding Default Buckets
  - Customizing Histogram Buckets
  - Configuring a Summary Metric
  - Watch Video
    - Detailed Explanation

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# HistogramSummary

In this guide, you'll learn how to implement a histogram metric in Python to track the latency and response time for each request in a Flask application. We will demonstrate how to record latency using a histogram metric on a per-path and per-method basis, similar to recording counter metrics. This approach provides an in-depth view of your application's performance.

## Setting Up the Histogram Metric

Begin by initializing the histogram metric. In this example, the histogram is named "request_latency_seconds" and includes two label names: "path" and "method." These labels allow you to segment metric data based on the request path and HTTP method.

```
from prometheus_client import Histogram, start_http_server
import time
from flask import request, Flask


app = Flask(__name__)


LATENCY = Histogram('request_latency_seconds', 'Request Latency', labelnames=['path', 'method'])
```

## Capturing Request Latency

To capture request latency, define two functions. The first function executes before each request, recording the start time. The second function runs after the request and calculates the latency, which is then recorded by the histogram metric.

```
def before_request():
    request.start_time = time.time()


def after_request(response):
    request_latency = time.time() - request.start_time
    LATENCY.labels(request.method, request.path).observe(request_latency)
    return response
```

These callback functions are then integrated into the Flask application using `app.before_request` and `app.after_request`:

```
if __name__ == '__main__':
    start_http_server(8000)
    app.before_request(before_request)
    app.after_request(after_request)
    app.run(port=5000)
```

### Detailed Explanation

1.  **Before Request Callback:**  
    The `before_request` function records the current time via `time.time()` when a request is received. This timestamp is stored on the `request` object for later use.
2.  **After Request Callback:**  
    After the request is processed, the `after_request` function calculates the latency by subtracting the recorded start time from the current time. It then updates the histogram metric using the `observe` method, with the request's HTTP method and path as labels.

This setup provides a robust mechanism to measure the processing time for each request, thereby enabling effective performance monitoring.

## Understanding Default Buckets

When the histogram metric is retrieved—typically via the `/metrics` endpoint—the output might look similar to the example below:

```
$ request_latency_seconds
request_latency_seconds_bucket{le="0.005",method="GET",path="/cars"} 0.0
request_latency_seconds_bucket{le="0.01",method="GET",path="/cars"} 0.0
request_latency_seconds_bucket{le="0.025",method="GET",path="/cars"} 0.0
request_latency_seconds_bucket{le="0.05",method="GET",path="/cars"} 1.0
request_latency_seconds_bucket{le="0.075",method="GET",path="/cars"} 3.0
request_latency_seconds_bucket{le="0.1",method="GET",path="/cars"} 3.0
request_latency_seconds_bucket{le="0.25",method="GET",path="/cars"} 4.0
request_latency_seconds_bucket{le="0.5",method="GET",path="/cars"} 6.0
request_latency_seconds_bucket{le="0.75",method="GET",path="/cars"} 6.0
request_latency_seconds_bucket{le="1.0",method="GET",path="/cars"} 8.0
request_latency_seconds_bucket{le="2.5",method="GET",path="/cars"} 8.0
request_latency_seconds_bucket{le="5.0",method="GET",path="/cars"} 8.0
request_latency_seconds_bucket{le="7.5",method="GET",path="/cars"} 8.0
request_latency_seconds_bucket{le="10.0",method="GET",path="/cars"} 8.0
request_latency_seconds_bucket{le="+Inf",method="GET",path="/cars"} 8.0
request_latency_seconds_count{method="GET",path="/cars"} 8.0
```

The Prometheus client library automatically creates default buckets to group latency values. However, these default settings might not be ideal for all use cases.

## Customizing Histogram Buckets

To tailor the histogram to your application's needs, you can customize the bucket boundaries. Just provide a list of bucket boundaries when initializing the metric. The example below demonstrates how to configure custom buckets:

```
LATENCY = Histogram(
    'request_latency_seconds',
    'Flask Request Latency',
    labelnames=['path', 'method'],
    buckets=[0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
)
```

## Configuring a Summary Metric

Configuring a summary metric is very similar to setting up a histogram. The only difference is that you replace `Histogram` with `Summary`. Like the histogram, the summary metric uses the `observe` method after applying the relevant labels.

```
from prometheus_client import Summary


LATENCY = Summary('request_latency_seconds', 'Flask Request Latency', labelnames=['path', 'method'])


# During the after_request callback
LATENCY.labels(request.method, request.path).observe(request_latency)
```

> [!important]
> **Important Note**
>
> The Python client library for Prometheus does not implement all the features available for summary metrics, such as configuring quantiles. These features are available in some other language clients.

By following these instructions, you can effectively monitor your Flask application's performance by tracking request latency using both histogram and summary metrics. For additional resources on Prometheus and Flask monitoring, consider exploring [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/) and [Flask Documentation](https://flask.palletsprojects.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/3b52f98d-3825-4cfd-8293-5902005dd533)**
>
> Watch video content
