# Environment Variables in Docker Recap - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Environment-Variables-in-Docker-Recap)

---

## Table of Contents

- Environment Variables in Docker Recap
  - Table of Contents
  - Why Use Environment Variables?
  - Step 1: Read Environment Variables Locally
  - Step 2: Pass Variables into Docker
  - Docker Commands Reference
  - Further Reading
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Environment Variables in Docker Recap

Modern application development favors separating configuration from code. By using environment variables—especially within Docker containers—you can adhere to [The Twelve-Factor App](https://12factor.net/) methodology and deploy more flexibly.

## Table of Contents

1.  [Why Use Environment Variables?](#why-use-environment-variables)
2.  [Step 1: Read Environment Variables Locally](#step-1-read-environment-variables-locally)
3.  [Step 2: Pass Variables into Docker](#step-2-pass-variables-into-docker)
4.  [Docker Commands Reference](#docker-commands-reference)
5.  [Further Reading](#further-reading)

---

## Why Use Environment Variables?

Hardcoding configuration values (such as colors, database URLs, or API keys) leads to brittle deployments and requires code changes for every tweak. Environment variables allow you to:

- Decouple code from deployment details
- Support multiple environments (dev, staging, prod) without modifying source
- Secure sensitive data outside of version control

> [!important]
> **Note**
>
> Using environment variables is a best practice for twelve-factor compliant apps.

---

## Step 1: Read Environment Variables Locally

Below is a simple Flask application (`app.py`) that reads `APP_COLOR` from the environment, defaulting to `"red"` if unset.

```
import os
from flask import Flask, render_template

app = Flask(__name__)

# Read background color from environment; default to "red"
color = os.environ.get("APP_COLOR", "red")

@app.route("/")
def main():
    print(f"Current color: {color}")
    return render_template("hello.html", color=color)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

To test locally:

```
export APP_COLOR=blue
python app.py
```

Visit `http://localhost:8080`—the page background will reflect your `APP_COLOR`. If you don’t set `APP_COLOR`, it gracefully falls back to **red**.

> [!important]
> **Warning**
>
> Never commit sensitive environment variables (like credentials) to your code repository. Consider using a secrets manager for production.

---

## Step 2: Pass Variables into Docker

Once your app is containerized, leverage Docker’s `-e` flag (or `--env-file`) to inject runtime configuration.

1.  **Build the image**

    ```
    docker build -t simple-webapp-color .
    ```

2.  **Run with a custom color**

    ```
    docker run -e APP_COLOR=blue simple-webapp-color
    ```

3.  **Scale with different settings**

    ```
    docker run -e APP_COLOR=green simple-webapp-color
    docker run -e APP_COLOR=yellow simple-webapp-color
    ```

By externalizing `APP_COLOR`, you keep one image for all environments—no code changes required.

---

## Docker Commands Reference

| Command                            | Purpose                                 | Example                                                |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------------ |
| `docker build`                     | Build an image from a `Dockerfile`      | `docker build -t simple-webapp-color .`                |
| `docker run -e VAR=VALUE`          | Run a container with an environment var | `docker run -e APP_COLOR=blue simple-webapp-color`     |
| `docker run --env-file ./env.list` | Load multiple vars from a file          | `docker run --env-file ./env.list simple-webapp-color` |

---

## Further Reading

- [Flask Official Documentation](https://flask.palletsprojects.com/)
- [Docker ENV and ARG](https://docs.docker.com/engine/reference/builder/#env)
- [The Twelve-Factor App: Config](https://12factor.net/config)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/0e0f5842-508b-4a14-905f-9a55be61d342)**
>
> Watch video content
