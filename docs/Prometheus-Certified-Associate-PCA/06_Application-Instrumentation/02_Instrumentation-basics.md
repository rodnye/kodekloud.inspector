# Instrumentation basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Prometheus-Certified-Associate-PCA/Application-Instrumentation/Instrumentation-basics)

---

## Table of Contents

- Instrumentation basics
  - Creating a Basic Flask Application
  - Installing the Prometheus Client Library
  - Incrementing the Counter
  - Exposing Metrics via a Separate HTTP Server
  - Integrating Metrics with Flask Middleware
  - Extending the Application with Additional Endpoints
  - Watch Video

---

## Content

Prometheus Certified Associate (PCA)

Application Instrumentation

# Instrumentation basics

In this tutorial, we will demonstrate how to add instrumentation to your application by building a dummy API using Flask—a robust Python web framework for creating RESTful APIs quickly. Our primary focus is on incorporating Prometheus instrumentation rather than delving into the internals of Flask.

> [!important]
> **Overview**
>
> This guide shows you how to integrate instrumentation step-by-step into a basic Flask application. Follow along to learn about adding counters to track HTTP requests and exposing metrics via Prometheus.

## Creating a Basic Flask Application

First, create a simple Flask application. In Python, you import the Flask package, initialize a Flask instance, and then create an API endpoint. For example, any GET request to the `/cars` endpoint will trigger the following function:

```
from flask import Flask
app = Flask(__name__)


@app.get("/cars")
def get_cars():
    return ["toyota", "honda", "mazda", "lexus"]


if __name__ == '__main__':
    app.run(port='5001')
```

This code snippet represents the foundation of our API. At this stage, the application does not include any Prometheus instrumentation.

## Installing the Prometheus Client Library

Before adding instrumentation, install the Prometheus client library:

```
pip install prometheus_client
```

Once installed, you can import and use the `Counter` object from the Prometheus client to track your application's metrics. For instance, initialize a counter called `http_requests_total` to record every HTTP request:

```
from prometheus_client import Counter


REQUESTS = Counter('http_requests_total', 'Total number of requests')


app = Flask(__name__)


@app.get("/cars")
def get_cars():
    return ["toyota", "honda", "mazda", "lexus"]
```

## Incrementing the Counter

To accurately track the number of requests, increment the counter each time the `/cars` endpoint is hit. You can use the `REQUESTS.inc()` method, which increases the counter by 1 for each request. Optionally, you can pass a value to `inc()` if you need a different increment:

```
from prometheus_client import Counter


REQUESTS = Counter('http_requests_total', 'Total number of requests')


app = Flask(__name__)


@app.get("/cars")
def get_cars():
    REQUESTS.inc()
    return ["toyota", "honda", "mazda", "lexus"]
```

## Exposing Metrics via a Separate HTTP Server

Currently, while metrics are recorded, they are not exposed to Prometheus. The simplest method to expose these metrics is to start Prometheus’s built-in HTTP server on a separate port (e.g., port 8000):

```
from prometheus_client import Counter, start_http_server


if __name__ == '__main__':
    start_http_server(8000)
    app.run(port='5001')
```

With this configuration, your Flask API runs on port 5001 while Prometheus metrics are available at port 8000. You can test the metrics endpoint using:

```
$ curl 127.0.0.1:8000
# HELP python_gc_objects_uncollectable_total Uncollectable object found during GC
# TYPE python_gc_objects_uncollectable_total counter
python_gc_objects_uncollectable_total{generation="0"} 0.0
python_gc_objects_uncollectable_total{generation="1"} 0.0
python_gc_objects_uncollectable_total{generation="2"} 0.0
# HELP python_gc_collections_total Number of times this generation was collected
# TYPE python_gc_collections_total counter
python_gc_collections_total{generation="0"} 77.0
python_gc_collections_total{generation="1"} 7.0
python_gc_collections_total{generation="2"} 0.0
# HELP python_info Python platform information
# TYPE python_info gauge
python_info{implementation="CPython",major="3",minor="9",patchlevel="5",version="3.9.5"} 1.0
# HELP http_requests_total Total number of requests
# TYPE http_requests_total counter
http_requests_total 5.0
# HELP http_requests_created Total number of requests
# TYPE http_requests_created gauge
http_requests_created 1.6654499091926205e+09
```

## Integrating Metrics with Flask Middleware

If you prefer to run the API and metrics on the same port, you can expose metrics via a dedicated endpoint by integrating Prometheus with Flask middleware. This method uses `make_wsgi_app` from the Prometheus client alongside `DispatcherMiddleware` from Werkzeug:

```
from flask import Flask
from prometheus_client import make_wsgi_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware


app = Flask(__name__)


# Add Prometheus middleware to export metrics at /metrics
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})
```

With this setup, your Flask API is still served on port 5001, and you can retrieve Prometheus metrics from the `/metrics` endpoint.

## Extending the Application with Additional Endpoints

Next, extend the application by adding several routes that handle different HTTP methods. In this example, endpoints are added to return all cars, retrieve a specific car by ID, create a new car, update car details, and delete a car. In a real-world scenario, you should increment the `REQUESTS` counter for every request:

```
@app.get("/cars")
def get_cars():
    REQUESTS.inc()
    return ["toyota", "honda", "mazda", "lexus"]


@app.get("/cars/<int:id>")
def get_car():
    REQUESTS.inc()
    return "Single car"


@app.post("/cars")
def create_cars():
    REQUESTS.inc()
    return "Create Car"


@app.patch("/cars/<int:id>")
def update_cars():
    REQUESTS.inc()
    return "Updating Car"


@app.delete("/cars/<int:id>")
def delete_cars():
    REQUESTS.inc()
    return "Deleting Car"
```

At this point, your fully instrumented Flask API accurately reflects the total number of HTTP requests via the `http_requests_total` counter. You can access and monitor your metrics either through the standalone Prometheus HTTP server on port 8000 or directly via the `/metrics` endpoint if using the middleware approach.

> [!important]
> **Next Steps**
>
> For more detailed information on Prometheus instrumentation, refer to the [Prometheus Client Documentation](https://github.com/prometheus/client_python). Additionally, visit the [Flask Documentation](https://flask.palletsprojects.com/) for further insights into building robust web applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/prometheus-certified-associate-pca/module/0c0155c7-00c8-4ca2-a061-e66baa1a3216/lesson/f79526d0-2745-40a9-ab84-5b8a9acaab25)**
>
> Watch video content
