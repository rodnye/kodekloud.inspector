# Gauge - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/Gauge)

---

## Table of Contents

- Gauge
  - Gauge Metric Implementation
  - Monitoring the Gauge Metric
  - Additional Resources
  - Watch Video
    - Implementation Details

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# Gauge

In this article, we will demonstrate how to create a gauge metric that monitors the total number of active requests—those currently being processed but not yet completed. A gauge metric is similar to a counter; however, it provides additional flexibility by supporting both increment and decrement operations, as well as allowing you to set a specific value when needed.

> [!important]
> **Overview**
>
> A gauge is especially useful for tracking values that can go up and down, such as the number of in-progress requests on your server.

## Gauge Metric Implementation

Below is the Python code that defines a gauge metric for in-progress requests along with two functions that update the metric during the request lifecycle:

```
IN_PROGRESS = Gauge('inprogress_requests',
                    'Total number of requests in progress',
                    labelnames=['path', 'method'])


def before_request():
    IN_PROGRESS.labels(request.method, request.path).inc()
    request.start_time = time.time()


def after_request(response):
    IN_PROGRESS.labels(request.method, request.path).dec()
    return response
```

### Implementation Details

- **Gauge Initialization**:  
  The gauge metric, named `inprogress_requests`, is initialized with a description and two labels: `path` and `method`. These labels allow you to differentiate the number of active requests based on the request URL path and HTTP method.
- **before_request Function**:  
  This function is invoked at the beginning of every request. It increments the gauge for the corresponding `method` and `path`, and records the request's start time.
- **after_request Function**:  
  When a request completes, this function is triggered to decrement the gauge, thus reflecting the decrease in active requests.

> [!important]
> **Key Consideration**
>
> Ensure that the `before_request` and `after_request` functions are correctly integrated with your web framework's request lifecycle hooks.

## Monitoring the Gauge Metric

When querying the metric (for example, with Prometheus), you might receive an output like the following. This output displays the number of active requests per HTTP method and path:

```
$ inprogress_requests
inprogress_requests{method="GET",path="/cars"} 3.0
inprogress_requests{method="POST",path="/cars"} 0.0
inprogress_requests{method="POST",path="/boats"} 18.0
inprogress_requests{method="GET",path="/boats"} 7.0
```

This example clearly demonstrates how the gauge metric differentiates active requests based on the HTTP method and request path, providing a detailed insight into your application's current processing state.

## Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [Python Client for Prometheus](https://github.com/prometheus/client_python)

By following these guidelines, you can effectively monitor and analyze the number of active requests in your application, leading to improved performance tracking and system reliability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/060795c9-183c-4239-8e3b-ec458de2780e)**
>
> Watch video content
