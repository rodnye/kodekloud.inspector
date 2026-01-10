# ECS Demo Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/ECS-Demo-Part-2)

---

## Table of Contents

- ECS Demo Part 2
  - Docker Compose Configuration
  - API Endpoints Overview
  - AWS ECS Setup and Task Definition
  - Creating the ECS Service
  - Testing the Deployment
  - Securing the ECS Security Group
  - Watch Video
    - GET /notes
    - GET /notes/:id
    - POST /notes
    - PATCH /notes/:id
    - DELETE /notes/:id
    - MongoDB Connection and Server Initialization
    - ECS Task Definition and Security Group
      - Container Configuration

---

## Content

AWS Solutions Architect Associate Certification

Services Compute

# ECS Demo Part 2

In this guide, we explore our multi-container application running on AWS ECS. The application comprises a Node.js/Express API and a MongoDB container, demonstrating a robust architecture for containerized deployments. Below is an in-depth overview, including configuration details, API endpoints, and AWS ECS setup.

---

## Docker Compose Configuration

The following Docker Compose file defines two services: an API container and a MongoDB container. The API service uses our pre-built image "kodekloud/ecs-project2" and environment variables to connect to MongoDB, while the MongoDB service leverages persistent storage through volumes.

```
version: "3"
services:
  api:
    build: .
    image: kodekloud/ecs-project2
    environment:
      - MONGO_USER=mongo
      - MONGO_PASSWORD=password
      - MONGO_IP=mongo
      - MONGO_PORT=27017
    ports:
      - "3000:3000"
  mongo:
    image: mongo
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongo
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo-db:/data/db


volumes:
  mongo-db:
```

The API container listens on port 3000 and connects to MongoDB using the provided environment variables. Meanwhile, the MongoDB container utilizes the official image and leverages volume mapping for durable data storage.

> [!important]
> **Note**
>
> Ensure that environment variables for MongoDB connectivity are properly set to avoid connection issues.

---

## API Endpoints Overview

The API, built with Express and Mongoose, implements basic CRUD functionality for managing notes. The code snippets below illustrate each endpoint:

### GET /notes

Retrieves all notes from the database.

```
const app = express();
app.use(cors());
app.use(express.json());


const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`;


app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ notes });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
});
```

### GET /notes/:id

Retrieves a specific note by its ID.

```
app.get("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ note });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "fail" });
    }
});
```

### POST /notes

Creates a new note.

```
app.post("/notes", async (req, res) => {
    console.log(req.body);
    try {
        const note = await Note.create(req.body);
        return res.status(201).json({ note });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ status: "fail" });
    }
});
```

### PATCH /notes/:id

Updates an existing note.

```
app.patch("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ note });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "fail" });
    }
});
```

### DELETE /notes/:id

Deletes a note by its ID.

```
app.delete("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        console.log(note);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ status: "success" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: "fail" });
    }
});
```

### MongoDB Connection and Server Initialization

The snippet below uses Mongoose to connect to MongoDB. Upon successful connection, the server starts listening on port 3000.

```
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(3000, () => console.log("Server is listening on PORT 3000"));
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
```

Console Confirmation:

```
user1 on user1 in ecs-project2 [!] is 📦 v1.0.0 via ⎇
```

---

## AWS ECS Setup and Task Definition

Before deploying the application on ECS, proper configuration of AWS components is crucial. This section will guide you through setting up the security group, task definition, container configurations, and volumes.

### ECS Task Definition and Security Group

**Step 1: Create a Security Group for ECS**

Navigate to EC2 → Security Groups. Create a new security group (e.g., "ECS-SG") and allow all traffic temporarily. Select the correct VPC matching your ECS cluster.

![The image shows a web interface for creating a security group in AWS EC2, with fields for basic details, inbound rules, and outbound rules. The security group has no inbound rules, and the outbound rules allow all traffic.](https://kodekloud.com/kk-media/image/upload/v1752864868/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-ec2-security-group-interface.jpg)

**Step 2: Create an ECS Task Definition**

Go to the ECS console and create a new task definition using Fargate. Assign the ECS task execution role accordingly. Name the task definition (e.g., "ECS-Project2").

![The image shows an Amazon ECS dashboard displaying a list of task definitions, all marked as "ACTIVE." There are options to create a new task definition or revision.](https://kodekloud.com/kk-media/image/upload/v1752864869/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/amazon-ecs-dashboard-active-tasks.jpg)

#### Container Configuration

1.  **MongoDB Container**
    - **Container Name:** Mongo
    - **Image:** Default Mongo image from Docker Hub
    - **Port Mapping:** 27017
    - **Environment Variables:**
      - MONGO_INITDB_ROOT_USERNAME: mongo
      - MONGO_INITDB_ROOT_PASSWORD: password
    - **Volume Mapping:** Mount the volume (e.g., "mongo-db") at `/data/db`.

    ```
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongo
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo-db:/data/db
    ```

    ![The image shows a configuration screen for adding a container, with fields for container name, image, memory limits, and port mappings. It also includes advanced container configuration options like health checks.](https://kodekloud.com/kk-media/image/upload/v1752864870/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/add-container-user-interface.jpg)

    After setting the environment variables, proceed through the configuration.

    ![The image shows a configuration screen for adding a container, including fields for entry point, command, working directory, and environment variables. It also includes sections for container timeouts and network settings.](https://kodekloud.com/kk-media/image/upload/v1752864871/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/container-configuration-screen-settings.jpg)

2.  **Express API Container**
    - **Container Name:** e.g., "web API"
    - **Image:** kodekloud/ecs-project2
    - **Port Mapping:** 3000
    - **Environment Variables:**
      - MONGO_USER: mongo
      - MONGO_PASSWORD: password
      - MONGO_IP: mongo (adjust to "localhost" if required in ECS)
      - MONGO_PORT: 27017

    ```
    version: "3"
    services:
      api:
        build: .
        image: kodekloud/ecs-project2
        environment:
          - MONGO_USER=mongo
          - MONGO_PASSWORD=password
          - MONGO_IP=mongo
          - MONGO_PORT=27017
        ports:
          - "3000:3000"
    ```

    ![The image shows a web interface for adding a container, with fields for container name, image, memory limits, and port mappings. It also includes advanced container configuration options like health checks.](https://kodekloud.com/kk-media/image/upload/v1752864873/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/web-interface-add-container-options.jpg)

3.  **Volume Setup for MongoDB**

    To ensure persistent data storage, define a volume for MongoDB. In the task definition, add a volume (e.g., "MongoDB") and select AWS Elastic File System (EFS) as the volume type.

    ![The image shows a dialog box for adding a volume in an AWS interface, with options for configuring volume type, file system ID, access point ID, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752864874/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-volume-add-dialog-box.jpg)

    **Create an EFS File System:**
    1.  Select "Create File System" via the provided link.
    2.  Name the file system (e.g., MongoDB) and select the correct VPC.
    3.  Customize the setup to include desired subnets.
    4.  Update the EFS security group to allow only NFS access (port 2049) from your ECS security group.

    ![The image shows a web interface for creating an Amazon Elastic File System (EFS), with options to name the file system, select a Virtual Private Cloud (VPC), and choose a storage class.](https://kodekloud.com/kk-media/image/upload/v1752864875/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/amazon-efs-web-interface-creation.jpg)

    Finally, update the MongoDB container's task definition to assign the EFS volume mount at `/data/db`.

    ![The image shows an AWS management console interface for configuring container definitions, including memory and CPU allocations, with options for service integration, proxy configuration, and log router integration.](https://kodekloud.com/kk-media/image/upload/v1752864877/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-management-console-container-config.jpg)

    Complete the task definition creation. You might see multiple revisions if this is not the first deployment.

    ![The image shows a configuration screen for creating a new task definition in AWS, specifically for setting up task and container definitions with options like task name, network mode, and task role.](https://kodekloud.com/kk-media/image/upload/v1752864878/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-task-definition-configuration-2.jpg)

---

## Creating the ECS Service

With the task definition ready, follow these steps to create an ECS service and attach a load balancer:

1.  Go to your ECS cluster and click "Create Service."
2.  Select Fargate as the launch type with the Linux platform.
3.  Choose the task definition (e.g., "ECS-Project2") and provide a service name (e.g., "notes app service").
4.  Set the desired number of tasks to 1, ensuring the correct VPC and subnets are selected.
5.  For the security group, select the one created earlier ("ECS-SG").

![The image shows a configuration screen for creating a service in AWS, specifically focusing on network settings such as VPC, subnets, and security groups. It includes options for enabling public IP assignment and configuring load balancing.](https://kodekloud.com/kk-media/image/upload/v1752864879/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-service-configuration-network-settings.jpg)

**Add an Application Load Balancer (ALB):**

- Open the load balancer setup in a new tab.
- Create a new ALB (e.g., "notes LB") using IPv4; ensure it is internet-facing and assigned to the correct VPC.
- Create a new security group for the load balancer (e.g., "LB-SG") that permits HTTP traffic on port 80.

![The image shows a configuration screen for setting up security groups in AWS, displaying options for selecting existing security groups and their inbound rules.](https://kodekloud.com/kk-media/image/upload/v1752864880/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-security-groups-configuration.jpg)

**Configure Listener Rules and Target Group:**

Define listener rules on port 80 to forward traffic to the API container:

1.  Create a target group for the ALB:
    - Choose "IP addresses" as the target type (suitable for ECS).
    - Name the target group (e.g., "notes-target-group1").
    - Set the health check path to `/notes` and the port to 3000.

    ![The image shows a configuration screen for setting up an Application Load Balancer on AWS, including options for target group name, protocol, IP address type, VPC, and health checks.](https://kodekloud.com/kk-media/image/upload/v1752864881/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-application-load-balancer-configuration.jpg)

2.  Assign the target group to your ALB.

    ![The image shows an AWS EC2 dashboard with a target group named "notes-tg1" successfully created. It displays details like port, protocol, target type, and VPC ID.](https://kodekloud.com/kk-media/image/upload/v1752864883/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-ec2-dashboard-target-group.jpg)

3.  Return to the ECS service configuration. Specify that the load balancer forwards traffic on port 80 to port 3000 on the API container. Review and create the service.

    ![The image shows a configuration screen for setting up a load balancer in AWS, detailing settings such as load balancer name, listener port, protocol, and target group.](https://kodekloud.com/kk-media/image/upload/v1752864884/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-load-balancer-configuration-screen.jpg)

After the service is created, verify that the task transitions from provisioning to running. Both containers should reflect a running status.

![The image shows an AWS ECS console displaying details of a service named "notes-app-service" with a task in the "PROVISIONING" state. The service uses the FARGATE launch type.](https://kodekloud.com/kk-media/image/upload/v1752864885/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-ecs-notes-app-service-provisioning.jpg)

Selecting the task reveals detailed container statuses and networking information.

![The image shows an AWS ECS task details page, displaying information about a running task, including cluster details, network configuration, and container statuses.](https://kodekloud.com/kk-media/image/upload/v1752864886/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-ecs-task-details-page.jpg)

---

## Testing the Deployment

Test the API by directly accessing the container's IP on port 3000 via tools like Postman:

- Send a GET request to `/notes` to retrieve notes (an empty array if no notes are present).
- For production, use the ALB DNS name; the ALB on port 80 forwards traffic to the API container on port 3000.

**Example: Testing a POST Request**

Send a JSON payload to create a note:

```
{
  "title": "second note",
  "body": "remember to do dishes!!!"
}
```

A successful POST creates a note. A subsequent GET request returns:

```
{
  "notes": [
    {
      "_id": "63211a3c034fdd55dce212834",
      "title": "second note",
      "body": "remember to do dishes!!!",
      "__v": 0
    }
  ]
}
```

![The image shows a Postman interface with a GET request to a URL, displaying a JSON body with a note titled "second-note" and a message to "remember to do dishes." The response section shows an empty "notes" array.](https://kodekloud.com/kk-media/image/upload/v1752864887/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/postman-get-request-json-second-note.jpg)

---

## Securing the ECS Security Group

It is important to restrict access to your ECS resources. Currently, the ECS security group permits all incoming traffic, which is not secure.

**Action Steps:**

1.  Remove the rule that allows all traffic.
2.  Add a new rule to allow Custom TCP traffic on port 3000.
3.  Set the source to the load balancer security group (LB-SG) only.

![The image shows an AWS security group configuration screen, displaying details and inbound rules for a specific security group named "ecs-sg."](https://kodekloud.com/kk-media/image/upload/v1752864889/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-security-group-ecs-sg-config.jpg)

After updating the security group, test the API through the ALB DNS name to ensure that only traffic from the ALB is accepted.

![The image shows an AWS security group configuration page, displaying details and inbound rules for a specific security group named "ecs-sg."](https://kodekloud.com/kk-media/image/upload/v1752864890/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-ECS-Demo-Part-2/aws-security-group-ecs-sg-config-2.jpg)

> [!important]
> **Warning**
>
> Securing your ECS security group is critical. Ensure that only the necessary traffic is allowed to minimize potential exposure and vulnerabilities.

---

By following these detailed steps, you have successfully deployed a containerized application on AWS ECS with a load balancer ensuring efficient traffic routing, along with security group modifications to secure your environment. For more information on container orchestration and best practices, visit [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/afe0c951-fe76-47f2-9fc4-18858721be70/lesson/1828b2a8-3a91-48c7-b8c5-5003c7a2b801)**
>
> Watch video content
