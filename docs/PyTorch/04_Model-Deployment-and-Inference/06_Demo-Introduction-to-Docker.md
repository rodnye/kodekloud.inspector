# Demo Introduction to Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Model-Deployment-and-Inference/Demo-Introduction-to-Docker)

---

## Table of Contents

- Demo Introduction to Docker
  - Installing Docker on Ubuntu
  - Verifying the Docker Installation
  - Building a Docker Image for the Flask App
  - Running the Docker Container
  - Testing the Flask Application Inside Docker
  - Tagging and Pushing the Docker Image to Docker Hub
  - Conclusion
  - Watch Video
  - Practice Lab
    - Step 1: Prerequisites
    - Step 2: Add the Docker Repository
    - Step 3: Install Docker Engine
    - Dockerfile Explanation

---

## Content

PyTorch

Model Deployment and Inference

# Demo Introduction to Docker

In this lesson, we guide you through using Docker to deploy a Flask application as part of a model deployment process. You will learn how to install Docker on an Ubuntu server, build a container image for your Flask app, verify the installation, run the container, test the application, and finally push the image to Docker Hub.

---

## Installing Docker on Ubuntu

Docker runs on Linux, Windows, and macOS, but in this example we focus on an Ubuntu server. The following instructions are adapted from the official Docker documentation.

> [!important]
> **Update Your Package List**
>
> Before starting the installation, update your package index to ensure you have the latest information from the repositories.

### Step 1: Prerequisites

Update your package index and install the required packages:

```
apt-get update
apt-get install ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
```

### Step 2: Add the Docker Repository

Add the Docker repository to your system. This command automatically determines your system’s version codename:

```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### Step 3: Install Docker Engine

Update the package list again and install the Docker Engine, CLI, containerd, and additional required packages. This process may take a few moments:

```
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

You should see output similar to the following, indicating that Docker and its dependencies have been installed:

```
Get:2 https://download.docker.com/linux/ubuntu lunar/stable amd64 Packages [16.1 kB]
Hit:3 http://old-releases.ubuntu.com/ubuntu lunar InRelease
...
Fetched 64.9 kB in 1s (96.1 kB)
...
The following NEW packages will be installed: apparmor, containerd.io, docker-ce, docker-ce-cli, docker-buildx-plugin, docker-compose-plugin, ...
```

After installation, open a terminal to start and enable the Docker service.

---

## Verifying the Docker Installation

To confirm that Docker has been installed correctly, check the version:

```
docker version
```

Next, run Docker’s official "Hello World" container to verify that both the client and daemon are functioning properly:

```
docker run hello-world
```

A successful run will produce output like:

```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
...
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

---

## Building a Docker Image for the Flask App

This section walks you through containerizing a Flask application by creating a Dockerfile that outlines the necessary build steps.

### Dockerfile Explanation

The Dockerfile below uses a slim official Python image and installs the CPU version of PyTorch to minimize the image size. It then installs Python dependencies, copies your Flask app, and sets up a non-root user for enhanced security.

```
# Use the official Python base image
FROM python:3.11-slim

# Set the working directory
WORKDIR /opt/app

# Install CPU version of PyTorch
RUN pip install torch==2.4.1 --index-url https://download.pytorch.org/whl/cpu

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app code
COPY ./flask_app .

# Create a user and group for running the app
RUN groupadd -r pytorch && useradd --no-log-init -r -g pytorch pytorch

# Change ownership of the app directory
RUN chown -R pytorch:pytorch /opt/app

# Switch to the created user
USER pytorch

# Expose the port that our Flask app is listening on
EXPOSE 8000

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]
```

Place this Dockerfile in the same directory as your `requirements.txt` file and your Flask app. Then, build your Docker image with the following command:

```
docker build -t mobilenetv3lg-flask:v1.0 .
```

During the build process, you will see steps that include loading the base image, copying files, installing Python packages via pip, and setting up a non-root user. After the build completes, verify the new image with:

```
docker images
```

A sample output might look like this:

```
REPOSITORY              TAG       IMAGE ID       CREATED               SIZE
mobilenetv3lg-flask     v1.0      1734db15a849   About a minute ago    5.39GB
hello-world             latest    d2c94e258dc9   20 months ago         13.3kB
```

> [!important]
> **Image Size Optimization**
>
> After optimizing the image by including only CPU dependencies, you may notice a reduction in image size (e.g., from 5.39GB to 1.34GB).

---

## Running the Docker Container

Now that your Docker image is ready, you can run it as a container. The command below maps port 8000 in the container to port 8000 on your local machine:

```
docker run -p 8000:8000 mobilenetv3lg-flask:v1.0
```

When the container starts, you may see log messages similar to the following:

```
2025-01-16 19:05:41,363 - INFO - Loading MobileNetV3 Large pre-trained model...
Downloading: "https://download.pytorch.org/models/mobilenet_v3_large-5c1a4163.pth" to /home/pytorch/.cache/torch/hub/checkpoints/mobilenet_v3_large-5c1a4163.pth
100.0%
2025-01-16 19:05:41,827 - INFO - Model loaded successfully.
* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:8000
...
```

For deploying the container in detached mode (running in the background), use the `-d` flag:

```
docker run -d -p 8000:8000 mobilenetv3lg-flask:v1.0
```

You can monitor your containers with:

```
docker ps
```

And view container logs with:

```
docker logs <container_id>
```

---

## Testing the Flask Application Inside Docker

With your container running, test the Flask endpoint by sending a POST request with an image payload. The following Python script encodes an image in Base64, constructs a JSON payload, and sends it to the `/predict` endpoint:

```
import requests
import base64

# Open the image file and encode it to Base64
with open('dog-1.jpg', 'rb') as img_file:
    base64_string = base64.b64encode(img_file.read()).decode('utf-8')

# Construct the JSON payload
payload = { "image": base64_string }

# Specify the headers
headers = { "Content-Type": "application/json" }

# Send the POST request
response = requests.post("http://127.0.0.1:8000/predict", headers=headers, json=payload)

# Print the response from the server
print("Response JSON:", response.json())
```

A successful response might show:

```
Response JSON: {'prediction': 207}
```

This indicates that the inference request was processed correctly by your Flask application.

---

## Tagging and Pushing the Docker Image to Docker Hub

To share your Docker image, start by tagging it with your Docker Hub username:

```
docker tag mobilenetv3lg-flask:v1.0 username/mobilenetv3lg-flask:v1.0
```

Next, log in to Docker Hub:

```
docker login -u username
```

Enter your password when prompted. After logging in, push the tagged image to Docker Hub:

```
docker push username/mobilenetv3lg-flask:v1.0
```

Once pushed, you can pull and run the image on another system with:

```
docker pull username/mobilenetv3lg-flask:v1.0
docker run -p 8000:8000 username/mobilenetv3lg-flask:v1.0
```

The output during the push confirms that Docker has uploaded the image layers and generated a digest.

---

## Conclusion

In this lesson, you learned how to:

- Install Docker on an Ubuntu server.
- Build a Docker image using a Dockerfile that packages a Flask application along with CPU-based PyTorch dependencies.
- Run a Docker container and verify its operation by sending a test inference request.
- Tag and push the Docker image to Docker Hub for easy distribution and deployment.

With your Docker image now hosted on Docker Hub, you can seamlessly deploy and share your application across different environments. Next, we will explore containerizing a best-trained model in a lab exercise.

Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/cd9074ad-839d-4206-b652-89620b04a816)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/a2426a0c-b7e8-4de8-9d0e-841003658a16)**
>
> Practice lab
