# Demo Testing Debugging our code locally - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-01/Demo-Testing-Debugging-our-code-locally)

---

## Table of Contents

- Demo Testing Debugging our code locally
  - Prerequisites
  - Project Structure
  - 1. Initial Dockerfile
  - 2. Building the Docker Image
  - 3. Running the Container
  - 4. Fixing the Dockerfile
  - 5. Running Successfully
  - 6. Command Reference
  - Next Steps
  - Links and References
  - Watch Video
    - Common Port Binding Error
    - Flask Option Parsing Error

---

## Content

GCP DevOps Project

Sprint 01

# Demo Testing Debugging our code locally

Welcome to this step-by-step guide on building, testing, and debugging your Flask application locally within a Docker container. By the end of this tutorial, you’ll be able to:

- Containerize a Flask app using Docker
- Identify and fix common configuration typos
- Run and verify your application on a custom host port

> [!important]
> **Note**
>
> Ensure you have [Docker installed](https://docs.docker.com/get-docker/) and Python 3.8+ on your local machine before you begin.

## Prerequisites

- Python Flask application (`app.py`)
- `requirements.txt` listing `Flask` (and any other dependencies)
- A `Dockerfile` to containerize your application

## Project Structure

```
├── app.py
├── requirements.txt
└── Dockerfile
```

## 1\. Initial Dockerfile

Below is our starting `Dockerfile`—note the typo in the `CMD` instruction that we’ll address later:

```
FROM python:3.8-slim-buster


WORKDIR /app


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt


COPY .


# Note: the colon after --host is incorrect here
CMD ["python3", "-m", "flask", "run", "--host:0.0.0.0"]
```

## 2\. Building the Docker Image

Open your terminal and execute:

```
docker build -t flask-docker-demo .
```

You should see output similar to:

```
[+] Building 2.0s (10/10) FINISHED
 => [internal] load build definition from Dockerfile             0.0s
 => [internal] load .dockerignore                                0.0s
 => [internal] load metadata for docker.io/library/python:3.8-slim-buster 0.0s
 => [1/5] FROM docker.io/library/python:3.8-slim-buster@sha256:…    0.0s
 => [2/5] WORKDIR /app                                            0.0s
 => [3/5] COPY requirements.txt requirements.txt                0.0s
 => [4/5] RUN pip3 install -r requirements.txt                  0.0s
 => [5/5] COPY .                                                 0.0s
 => exporting to image                                           0.0s
 => => writing image sha256:215f34…                              0.0s
 => => naming to docker.io/flask-docker-demo                    0.0s
```

Verify the image exists:

```
docker images | grep flask-docker-demo
```

## 3\. Running the Container

Try starting the container and mapping container port 5000 to host port 5000:

```
docker run -p 5000:5000 flask-docker-demo
```

### Common Port Binding Error

```
docker: Error response from daemon: Ports are not available: listen tcp 0.0.0.0:5000: bind: address already in use.
```

If you see this, remap the host port (e.g., to 5001):

```
docker run -p 5001:5000 flask-docker-demo
```

### Flask Option Parsing Error

```
Usage: python -m flask run [OPTIONS]
Try 'python -m flask run --help' for help.


Error: No such option: --host:0.0.0.0
```

This happens because Flask expects `--host` in the form `--host=<address>`, not `--host:<address>`.

## 4\. Fixing the Dockerfile

Update the `CMD` line to use `=` instead of `:`:

```
FROM python:3.8-slim-buster


WORKDIR /app


COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt


COPY .


# Fixed: use '=' instead of ':'
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
```

Rebuild the image:

```
docker build -t flask-docker-demo .
```

## 5\. Running Successfully

Start the container on host port 5001:

```
docker run -p 5001:5000 flask-docker-demo
```

You should see:

```
* Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment.
* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:5000
* Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

Open your browser at http://localhost:5001 to confirm your Flask app is live.

> [!important]
> **Warning**
>
> This built-in Flask server is for development only. For production deployments, use a WSGI server like [Gunicorn](https://gunicorn.org/) or [uWSGI](https://uwsgi-docs.readthedocs.io/).

## 6\. Command Reference

| Command                                     | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| `docker build -t flask-docker-demo .`       | Build the Docker image for the Flask app      |
| `docker images`                             | List all local Docker images                  |
| `docker run -p HOST:5000 flask-...`         | Run container, mapping host port to container |
| `docker run -p 5001:5000 flask-docker-demo` | Remap host port if default is unavailable     |

## Next Steps

1.  Commit your changes and push to GitHub.
2.  Integrate with a CI/CD pipeline for automated builds.
3.  Deploy to a cloud platform knowing your container behaves the same as it does locally.

---

## Links and References

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/docker/)
- [GitHub Actions: Continuous Integration](https://docs.github.com/en/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/a334971a-4fa2-4c61-8891-9c189e2aab64/lesson/3d22542d-25a9-43be-9f13-65c0fdcb4e23)**
>
> Watch video content
