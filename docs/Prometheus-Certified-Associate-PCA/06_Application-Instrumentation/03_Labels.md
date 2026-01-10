# Labels - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/Labels)

---

## Table of Contents

- Labels
  - Endpoint-Specific Counters
  - Using Labels for Request Counters
  - Extending Labels: Tracking HTTP Methods
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# Labels

In this article, we explain how to modify your application to record the number of HTTP requests per endpoint while still keeping track of the overall total. Initially, the application handles requests for two endpoints: `/cars` and `/boats`. Let’s start with a basic implementation that uses a global counter which increments on every call.

> [!important]
> **Basic Counter Example**
>
> The following code demonstrates a simple approach where a single counter, `REQUESTS`, is incremented regardless of the endpoint.

```
@app.get("/cars")
def get_cars():
    REQUESTS.inc()
    return ["toyota", "honda", "mazda", "lexus"]


@app.post("/cars")
def create_cars():
    REQUESTS.inc()
    return "Create Car"


@app.get("/boats")
def get_boats():
    return ["boat1", "boat2", "boat3"]


@app.post("/boats")
def create_boat():
    return "Create Boat"
```

While this method works to keep track of the total number of requests, it does not allow you to determine how many requests each endpoint receives. To achieve this, you could create individual counters for every endpoint.

## Endpoint-Specific Counters

One approach is to instantiate separate counters for each endpoint. This method is straightforward, but it requires you to manually update queries and configurations each time a new endpoint is added.

```
CAR_REQUESTS = Counter('requests_cars_total',
                         'Total number of requests for /cars path')
BOATS_REQUESTS = Counter('requests_boats_total',
                           'Total number of requests for /boats path')


@app.get("/cars")
def get_cars():
    CAR_REQUESTS.inc()
    return ["toyota", "honda", "mazda", "lexus"]


@app.post("/cars")
def create_cars():
    CAR_REQUESTS.inc()
    return "Create Car"


@app.get("/boats")
def get_boats():
    BOATS_REQUESTS.inc()
    return ["boat1", "boat2", "boat3"]


@app.post("/boats")
def create_boat():
    BOATS_REQUESTS.inc()
    return "Create Boat"
```

> [!important]
> **Maintenance Consideration**
>
> As your application scales up, managing multiple counters for different endpoints can become cumbersome. Each new endpoint will require additional counter instances and updates in your monitoring queries.

## Using Labels for Request Counters

A more scalable solution is to use labels. This approach allows you to define a single counter with the flexibility of differentiating request paths using labels. When initializing the counter, you specify a list of label names (in this example, we use `path`). Then, while handling a request, call the `labels` method with the appropriate path before incrementing the counter.

```
REQUESTS = Counter('http_requests_total',
                   'Total number of requests',
                   labelnames=['path'])


@app.get("/cars")
def get_cars():
    REQUESTS.labels('/cars').inc()
    return ["toyota", "honda", "mazda", "lexus"]


@app.post("/cars")
def create_cars():
    REQUESTS.labels('/cars').inc()
    return "Create Car"


@app.get("/boats")
def get_boats():
    REQUESTS.labels('/boats').inc()
    return ["boat1", "boat2", "boat3"]


@app.post("/boats")
def create_boat():
    REQUESTS.labels('/boats').inc()
    return "Create Boat"
```

With this setup, you can query the metrics for a specific endpoint by filtering on the `path` label. For example, running the query for the `/cars` endpoint would look like this:

```
$ http_requests_total{path="/cars"}
http_requests_total{path="/cars"} 5.0
```

Similarly, you can retrieve metrics for the `/boats` endpoint or aggregate totals across all paths:

```
$ http_requests_total{path="/boats"}
http_requests_total{path="/boats"} 2.0


$ http_requests_total
http_requests_total{path="/cars"} 5.0
http_requests_total{path="/boats"} 2.0


$ sum(http_requests_total)
{} 7.0
```

## Extending Labels: Tracking HTTP Methods

To enhance your monitoring further, you might want to track the HTTP method (e.g., GET or POST) alongside the request path. This requires adding a second label called `method` during counter initialization. When handling a request, provide both the path and the method to the `labels` method.

```
REQUESTS = Counter('http_requests_total',
                   'Total number of requests',
                   labelnames=['path', 'method'])


@app.get("/cars")
def get_cars():
    REQUESTS.labels('/cars', 'get').inc()
    return ["toyota", "honda", "mazda", "lexus"]


@app.post("/cars")
def create_cars():
    REQUESTS.labels('/cars', 'post').inc()
    return "Create Car"


@app.get("/boats")
def get_boats():
    REQUESTS.labels('/boats', 'get').inc()
    return ["boat1", "boat2"]


@app.post("/boats")
def create_boat():
    REQUESTS.labels('/boats', 'post').inc()
    return "Create Boat"
```

From the framework's perspective (for example, in Flask), the method label corresponds to the actual HTTP method used in the request. This configuration allows you to query the metrics either by combining both labels—for instance, filtering by `method="get"`—or solely by the `path` label to obtain aggregated counts. This flexible, label-based approach enables scalable and maintainable monitoring of your application’s endpoints as it grows and evolves.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/c0e01897-34ab-4c6f-a288-e25b645e8c5c)**
>
> Watch video content
