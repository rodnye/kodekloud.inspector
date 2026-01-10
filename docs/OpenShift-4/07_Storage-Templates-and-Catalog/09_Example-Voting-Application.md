# Example Voting Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Storage-Templates-and-Catalog/Example-Voting-Application)

---

## Table of Contents

- Example Voting Application
  - Application Overview
  - Microservices Architecture in Action
  - Watch Video
    - Voting Interface – Python
    - Vote Processing – .NET Worker
    - Results Display – Node.js

---

## Content

OpenShift 4

Storage Templates and Catalog

# Example Voting Application

Hello, and welcome to this lesson. My name is Mumshad Manambath. In this session, we'll delve into microservices architecture by deploying a simple yet powerful web application. This sample application, renowned for its Docker demonstrations, illustrates how to build and deploy an entire application stack using Docker.

## Application Overview

This voting application comprises multiple components, each built with a distinct technology, seamlessly integrated to offer a complete voting solution.

### Voting Interface – Python

The application starts with a Python-based web interface where users can cast their vote between two options: cats or dogs. When a vote is submitted, it is stored in Redis, serving as an in-memory data store.

![The image shows a person standing next to a diagram labeled "Voting Application," with a browser window displaying a "Cats vs Dogs" voting interface.](https://kodekloud.com/kk-media/image/upload/v1752882796/notes-assets/images/OpenShift-4-Example-Voting-Application/voting-application-cats-vs-dogs-diagram.jpg)

### Vote Processing – .NET Worker

After a vote is registered in Redis, a dedicated worker application written in .NET processes the vote. This worker updates a PostgreSQL database by incrementing the vote count for the selected option. The PostgreSQL database maintains a table with the total votes for each option, ensuring that all entries are accurately recorded.

> [!important]
> **Note**
>
> The PostgreSQL database is critical for data persistence, ensuring that each vote is reliably accounted for in the application's record.

### Results Display – Node.js

The final component is a web interface developed in Node.js, which retrieves the latest vote counts from PostgreSQL and presents the results to the user, ensuring that the displayed data is always current.

![The image shows a person standing in front of a diagram of a sample application architecture, featuring components like a voting app, in-memory database, and worker, with a voting result displayed on a screen.](https://kodekloud.com/kk-media/image/upload/v1752882798/notes-assets/images/OpenShift-4-Example-Voting-Application/sample-application-architecture-diagram.jpg)

## Microservices Architecture in Action

The sample application integrates diverse services and development platforms—including Python, Node.js, and .NET—to form a cohesive microservices architecture. This implementation serves as a prime example of how to configure an entire application stack with Docker, leveraging the strengths of multiple technologies.

> [!important]
> **Warning**
>
> Be diligent in monitoring and maintaining each component of this microservices architecture to effectively manage potential debugging and scaling challenges that may arise from using multiple programming platforms.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/b7e60e62-0f83-422c-8fca-6c9bb3cf4862/lesson/722f0bb6-b193-4939-978c-05e7399a6bd5)**
>
> Watch video content
