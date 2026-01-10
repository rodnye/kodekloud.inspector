# Understanding multi container application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Amazon-Elastic-Container-Service-AWS-ECS/Deploying-a-new-application-from-scratch/Understanding-multi-container-application)

---

## Table of Contents

- Understanding multi container application
  - Docker Compose Configuration
  - API Endpoints
  - Connecting to MongoDB
  - Watch Video
    - API Container Setup
    - Console Output Example
    - Docker Compose Variants
    - GET /notes
    - GET /notes/:id
    - POST /notes
    - PATCH /notes/:id
    - DELETE /notes/:id
      - Variant 1 – Using a Bind Mount
      - Variant 2 – Using a Named Volume

---

## Content

Amazon Elastic Container Service (AWS ECS)

Deploying a new application from scratch

# Understanding multi container application

In this lesson, we explore an application architecture that leverages multiple containers to separate concerns effectively. The architecture consists of two containers:

- An API container running a Node.js/Express application.
- A MongoDB container using the default Mongo image.

This setup demonstrates how to configure inter-container communication using Docker Compose and how the API leverages environment variables to configure its connection to MongoDB.

> [!important]
> **Overview**
>
> The Node.js application integrates with MongoDB through Mongoose and implements a basic CRUD interface to manage notes.

## Docker Compose Configuration

Below is an example Docker Compose configuration outlining the multi-container deployment. Two variants for the MongoDB volume configuration are provided based on your persistence needs.

### API Container Setup

The API container is built from the project source and exposes port 3000. It uses environment variables for connecting to the MongoDB container, as illustrated by the following excerpt:

```
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/noteModel");


const app = express();
app.use(cors());
app.use(express.json());


const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`;
// Alternative connection string for local testing:
// const mongoURL = `mongodb://localhost:27017/?authSource=admin`;
```

### Console Output Example

A sample console output upon running the application might appear as follows:

```
user1 on  user1 in ecs-project2 [!] is 📦 v1.0.0 via 🐳
```

### Docker Compose Variants

#### Variant 1 – Using a Bind Mount

This variant uses a bind mount for the MongoDB data directory to link the container's `/data/db` to a local folder.

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
      - ./data:/data/db
```

#### Variant 2 – Using a Named Volume

This variant uses a named volume (`mongo_data`) to manage the persistence of MongoDB data.

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
      - mongo_data:/data/db


volumes:
  mongo_data:
```

> [!important]
> **Important**
>
> Ensure that the environment variables for MongoDB (MONGO_USER, MONGO_PASSWORD, MONGO_IP, and MONGO_PORT) are correctly passed to the API container. This is crucial for establishing a successful connection.

## API Endpoints

The API provides a set of endpoints for performing CRUD operations on a "notes" collection. Below are details of each endpoint with corresponding code examples.

| HTTP Method | Endpoint   | Description                          |
| ----------- | ---------- | ------------------------------------ |
| GET         | /notes     | Retrieve all notes from the database |
| GET         | /notes/:id | Retrieve a single note by ID         |
| POST        | /notes     | Create a new note entry              |
| PATCH       | /notes/:id | Update an existing note              |
| DELETE      | /notes/:id | Delete a specific note               |

### GET /notes

Retrieves all notes stored in the database.

```
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### GET /notes/:id

Retrieves the details of a single note based on the provided ID. (The relevant code for this endpoint is implied by the overall CRUD structure.)

### POST /notes

Creates a new note entry in the database.

```
app.post("/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ note });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: "fail" });
  }
});
```

### PATCH /notes/:id

Updates an existing note and returns the updated note if successful.

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
    res.status(400).json({ error: e.message });
  }
});
```

### DELETE /notes/:id

Deletes a note corresponding to a given ID.

```
app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ status: "success" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});
```

A sample console output after executing these operations might be:

```
user1 on  user1 in ecs-project2 [!] is 📦 v1.0.0 via 🐳
```

## Connecting to MongoDB

The application uses Mongoose to establish a connection with the MongoDB container at startup. The connection relies on the environment variables defined earlier. Once the connection is successful, the server begins listening on port 3000.

```
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(3000, () =>
      console.log("Server is listening on PORT 3000")
    );
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
```

> [!important]
> **Reminder**
>
> Make sure your environment variables for the MongoDB connection are properly set in your deployment configuration to avoid connectivity issues.

Transcribed by [Otter.ai](https://otter.ai)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/amazon-elastic-container-service-aws-ecs/module/5d992c10-db1a-4e88-91f3-83c23d3595d0/lesson/59eb4682-3eda-4521-bdaf-1b37c1fbd435)**
>
> Watch video content
