# Building a Custom Docker Image - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Docker/Building-a-Custom-Docker-Image)

---

## Table of Contents

- Building a Custom Docker Image
  - Application Overview
  - Creating the Dockerfile
  - Selecting the Appropriate Base Image
  - Copying Application Files
  - Building the Docker Image
  - Running the Container
  - Pushing the Image to Docker Hub
  - Updating the Application and Creating New Versions
  - Additional Considerations
  - Resources
  - Watch Video
    - Logging in and Creating a Repository
    - Retagging and Pushing the Image

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Docker

# Building a Custom Docker Image

In this guide, you'll learn how to build a custom Docker image for a Flask application and push it to [Docker Hub](https://hub.docker.com). We will containerize a simple Flask app that manages tasks and walk through creating the Dockerfile, building the image, and deploying it.

## Application Overview

Our sample Flask application (app.py) manages tasks with basic operations. Below is an excerpt of the code:

```
from flask import Flask, render_template, request

app = Flask(__name__)

# A dictionary to store tasks with an ID
tasks = {}
task_id_counter = 1

@app.route('/', methods=['GET', 'POST'])
def index():
    global task_id_counter
    response_text = ""

    if request.method == 'POST':
        if 'add_task' in request.form:
            task_content = request.form.get('task_content')
            if task_content:
                tasks[task_id_counter] = task_content
                task_id_counter += 1

        elif 'delete_task' in request.form:
            task_id_to_delete = int(request.form.get('task_id_to_delete'))
            tasks.pop(task_id_to_delete, None)

    return render_template('index.html', tasks=tasks)
```

## Creating the Dockerfile

To containerize the Flask application, create a Dockerfile that includes instructions for setting the base image, copying your source code, installing dependencies, exposing the necessary port, and starting the application.

Below is an example Dockerfile for our Flask app:

```
FROM python:3.12.0b3-alpine3.18
COPY /application
WORKDIR /application
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
```

This Dockerfile performs the following actions:

- **Base Image:** Uses a Python image based on Alpine Linux, tagged as version 3.12.0b3‑alpine3.18.
- **Copying Code:** Transfers your application source code into the container.
- **Setting the Working Directory:** Switches context to `/application` for subsequent commands.
- **Installing Dependencies:** Copies `requirements.txt` and installs the necessary Python packages.
- **Exposing Port 5000:** Documents the port on which the container will listen.
- **Running the Application:** Executes the command to start the Flask application.

> [!important]
> **Note**
>
> The `EXPOSE` instruction is for documentation purposes only and does not publish the port. Use the `-p` flag to map container ports to the host, e.g., `docker run -p 5000:5000 my-flask-app:v1`.

## Selecting the Appropriate Base Image

Since this application utilizes Python, we selected an Alpine-based Python image available on [Docker Hub](https://hub.docker.com) for its reduced size and efficiency. Searching for "python" on Docker Hub provides multiple options, including slim and Alpine variants.

![The image shows the Docker Hub website, featuring a search bar and sections for trusted content, spotlight articles, and categories related to development and machine learning.](https://kodekloud.com/kk-media/image/upload/v1752879857/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Building-a-Custom-Docker-Image/docker-hub-website-search-development.jpg)

![The image shows a search results page on Docker Hub for "python," displaying various Python-related container images with options to filter by products, trusted content, and categories.](https://kodekloud.com/kk-media/image/upload/v1752879858/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Building-a-Custom-Docker-Image/docker-hub-python-search-results.jpg)

## Copying Application Files

The Dockerfile uses the `COPY` command to add your application files and dependency file into the image. Here’s an illustrative snippet:

```
FROM python:3.12.0b3-alpine3.18
COPY /application
COPY hello.txt /absolute/path
COPY hello.txt relative/to/workdir
```

This demonstrates the flexibility of the `COPY` command, allowing files to be added either to an absolute path or relative to the current working directory. Following these commands, the Dockerfile sets up the working directory, installs dependencies, exposes the application port, and defines the startup command.

## Building the Docker Image

With your Dockerfile ready, build the image by running the following command from the directory containing your Dockerfile. The `-t` flag tags the image:

```
docker build -t my-flask-app:v1 .
```

This command processes each instruction in the Dockerfile and generates a Docker image tagged `my-flask-app:v1`.

## Running the Container

After building the image, you can verify it by listing all Docker images:

```
docker image ls
```

To run the container, use the following command:

```
docker run my-flask-app:v1
```

The terminal output should confirm that your Flask application is running on port 5000. Press Ctrl+C to stop the container.

## Pushing the Image to Docker Hub

After creating your Docker image, the next step is to push it to a repository like [Docker Hub](https://hub.docker.com) for easy deployment and team access.

### Logging in and Creating a Repository

First, log into [Docker Hub](https://hub.docker.com) using:

```
docker login
```

After entering your credentials, create a new repository on Docker Hub (for example, "jenkins-flask-app").

### Retagging and Pushing the Image

Docker Hub requires images to be tagged with the format: username/repository:tag. Retag your image using your Docker Hub username:

```
docker image tag my-flask-app:v1 sanjeevkt720/jenkins-flask-app:v1
```

Verify the new tag by listing your images:

```
docker image ls
```

Now, push the image to Docker Hub:

```
docker push sanjeevkt720/jenkins-flask-app:v1
```

The terminal should display confirmation messages indicating that the image layers and digest have been successfully pushed.

## Updating the Application and Creating New Versions

As your application evolves, update the code and, if necessary, adjust the Dockerfile instructions. Build a new version of the image with an updated tag. For example, after updating the application, rebuild the image as version three:

**Dockerfile remains unchanged:**

```
FROM python:3.12.0b3-alpine3.18
COPY /application
WORKDIR /application
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
```

Rebuild the image:

```
docker build -t sanjeevkt720/jenkins-flask-app:v3 .
```

Confirm the new image tag:

```
docker image ls
```

Push the updated image to Docker Hub:

```
docker push sanjeevkt720/jenkins-flask-app:v3
```

A successful push will indicate that the new image version is available in your Docker Hub repository.

## Additional Considerations

- **Port Mapping:** To publish a container port on the host, use the `-p` flag with `docker run` (e.g., `docker run -p 5000:5000 sanjeevkt720/jenkins-flask-app:v1`).
- **Alternative Registries:** While [Docker Hub](https://hub.docker.com) is widely used, repositories on AWS, Azure, and GCP also support similar tagging and push commands.

By following these steps, you've successfully containerized your Flask application, built custom Docker images, and deployed them to Docker Hub for streamlined delivery and collaboration.

## Resources

| Resource Type | Use Case                                     | Example Command                                 |
| ------------- | -------------------------------------------- | ----------------------------------------------- |
| Docker Build  | Building a Docker image from your Dockerfile | `docker build -t my-flask-app:v1 .`             |
| Docker Run    | Running a container from the image           | `docker run -p 5000:5000 my-flask-app:v1`       |
| Docker Push   | Pushing your image to a repository           | `docker push sanjeevkt720/jenkins-flask-app:v1` |

For more detailed documentation, visit these links:

- [Docker Documentation](https://docs.docker.com/)
- [Deploying Flask Apps with Docker](https://www.docker.com/blog/containerizing-a-flask-application/)

Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/9eb65ce1-0aef-4f00-b661-5f8308aef2bd/lesson/f88eb052-fff3-4a78-83b3-3530030f8d7b)**
>
> Watch video content
