# Getting started with ECS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Working-with-AWS-ECS/Getting-started-with-ECS)

---

## Table of Contents

- Getting started with ECS
  - ECS Project 1
  - Configuring ECS via the AWS Console
  - Service and Cluster Configuration
  - Watch Video

---

## Content

Amazon Elastic Container Service (AWS ECS)

Working with AWS ECS

# Getting started with ECS

Before working with Amazon Elastic Container Service (ECS) via the AWS console, visit [Docker Hub](https://hub.docker.com/) to review two demo projects created specifically for this ECS guide. These public repositories, available at [kodekloud.com/ECS-project1](https://kodekloud.com/ECS-project1) and [kodekloud.com/ECS-project2](https://kodekloud.com/ECS-project2), enable you to follow along as you configure your ECS environment.

---

## ECS Project 1

In this walkthrough, we focus on the first demo project: a basic Node.js application running on an Express server. The following example shows the HTML file served as the landing page:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
</head>
<body>
    <h1>ECS Project 1</h1>
</body>
</html>
```

A sample command prompt output for the project might look like:

```
user1 on user1 in ecs-project1 is v1.0.0 via
```

The Node.js application is set up so that a GET request to the root URL returns the HTML file:

```
const express = require("express");
const path = require("path");


const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("index");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
```

Another similar command prompt snippet may be seen during container startup:

```
user1 on user1 in ecs-project1 is v1.0.0 via
```

The application listens on port 3000. The Dockerfile for this project is straightforward, exposing port 3000 for container communication:

```
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
```

> [!important]
> **Note**
>
> Ensure that the exposed port in the Dockerfile matches the port your application is listening on.

---

## Configuring ECS via the AWS Console

Start by logging into the AWS console and searching for ECS. Once selected, you will be greeted by a guided wizard, perfect for newcomers to ECS.

![The image shows the Amazon Elastic Container Service (ECS) webpage, highlighting features like running containers at scale, flexible container placement, and integration with other AWS services. It includes a video thumbnail and a "Get started" button.](https://kodekloud.com/kk-media/image/upload/v1752869163/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/amazon-ecs-webpage-features.jpg)

Click the "Get started" button. Although ECS offers several example applications, choose the **custom option** to manually configure your container. When prompted:

- Provide a container name (e.g., "ECS-project-one").
- Specify the image as [kodekloud/ECS-project1](https://kodekloud.com/ECS-project1).> [!important]
  > **Public Repository**
  >
  > If your image were hosted on a private repository, you would be required to supply credentials. In this case, the repository is public.
- Optionally, set memory limits as required.

Critically, configure the port mappings appropriately. Because the application listens on port 3000, use 3000 as the container port with the TCP protocol.

Normally, when running a container with Docker, you might map a different external port using a command such as:

```
docker run -p [HOST_PORT]:[CONTAINER_PORT]
```

However, in ECS the host port must match the container (internal) port. For instance, if the application listens on port 3000 inside the container, it will be exposed as port 3000 externally. You cannot map, for example, host port 80 to container port 3000 in ECS.

The advanced container configuration options allow you to set health checks (for example, using the command below), environment variables, volumes, and resource limits—mirroring settings you might configure in a Docker Compose file or using a Docker run command, but all managed through a GUI.

```
CMD-SHELL, curl -f http://localhost/ || exit 1
```

Once your settings are configured, click "Update," then "Next."

![The image shows a configuration screen for setting up a container in Amazon Elastic Container Service (ECS), with fields for container name, image, memory limits, and port mappings.](https://kodekloud.com/kk-media/image/upload/v1752869164/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/ecs-container-setup-configuration.jpg)

---

## Service and Cluster Configuration

Next, define your service. The ECS wizard will automatically create a service named "ECS-project-one service." While you have the option to attach a load balancer, you can leave it set to "none" for now. The wizard will also create a new cluster with default settings. Remember, the cluster represents the collection of resources where your containers will be deployed.

![The image shows a container definition interface with options for selecting container images like "sample-app," "nginx," "tomcat-webserver," and "ecs-project1," along with their respective memory and CPU specifications. There's also a diagram illustrating the relationship between container definition, task definition, service, and cluster.](https://kodekloud.com/kk-media/image/upload/v1752869165/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/container-definition-interface-diagram.jpg)

If necessary, you can configure a load balancer later. For now, continue with the default settings. ECS will automatically create a new Virtual Private Cloud (VPC) along with the required subnets, ensuring that your ECS cluster runs in its own secure environment, isolated from your default VPC.

![The image shows a diagram of ECS objects and their relationships, along with a configuration interface for setting up an AWS Fargate cluster. It includes options for naming the cluster and automatically creating a VPC and subnets.](https://kodekloud.com/kk-media/image/upload/v1752869165/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/ecs-objects-relationships-aws-fargate.jpg)

After you review your configuration settings on the summary page—which outlines the container definition, task definition, service, and cluster—click "Create."

![The image shows a diagram of ECS objects and their relationships, along with a review section detailing task and service configurations for an ECS setup.](https://kodekloud.com/kk-media/image/upload/v1752869166/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/ecs-objects-relationships-diagram.jpg)

Service creation may take several minutes. Once the process is complete, click "View Service" to review your newly created ECS service.

![The image shows a progress screen for setting up a service in Amazon Elastic Container Service (ECS) using Fargate, with a status update indicating that 7 out of 9 steps are complete.](https://kodekloud.com/kk-media/image/upload/v1752869167/notes-assets/images/Amazon-Elastic-Container-Service-AWS-ECS-Getting-started-with-ECS/ecs-fargate-setup-progress-screen.jpg)

---

This concludes the ECS configuration walkthrough. In this guide, you learned how to set up your container, configure service and cluster settings using the ECS console, and understand the port mapping differences relative to a typical Docker run command.

Happy exploring with Amazon Elastic Container Service!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/fb45f65b-b11f-447c-9a22-ae6eae5bfc9d/lesson/16a4ba52-de32-4f38-adbb-3ce39b2cfbd2)**
>
> Watch video content
