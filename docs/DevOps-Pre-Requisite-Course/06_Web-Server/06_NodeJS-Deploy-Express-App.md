# NodeJS Deploy Express App - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Web-Server/NodeJS-Deploy-Express-App)

---

## Table of Contents

- NodeJS Deploy Express App
  - Project Structure
  - Application Code (app.js)
  - Installing Dependencies
  - Running the Application
  - Production Process Management
  - Summary
  - Watch Video
  - Practice Lab
    - Development and Production Modes
    - Using PM2 for Production

---

## Content

DevOps Pre-Requisite Course

Web Server

# NodeJS Deploy Express App

In this lesson, we explore the popular Node.js web framework, Express.js, and demonstrate how to deploy an Express application on a production-grade server. We will examine the typical project structure, configure the app, manage dependencies, and implement best practices for production deployments.

## Project Structure

A standard Node.js project includes several key files:

- **LICENSE**: The license file detailing usage rights.
- **README**: Documentation and usage instructions.
- **package.json**: Contains application metadata and dependencies.
- **app.js**: The entry point of the application.

For larger and more organized applications, the directory structure may include:

- **public**: Contains front-end assets like HTML, CSS, and JavaScript.
- **test**: Directory for automated tests.
- **config**: Configuration files.
- **routes**: API route definitions.
- **services**: External service implementations.
- **DB**: Database models and seed files.
- **core**: Core business logic.

## Application Code (app.js)

The `app.js` file demonstrates a basic Express application. It serves static files from the **public** directory and provides an API endpoint to retrieve a list of products. The application listens on port 3000.

```
const express = require('express');
const path = require('path');
const app = express();


// API endpoint to fetch products
app.get('/products', (req, res) => {
  res.send(getProductList());
});


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Listen on port 3000
app.listen(3000);
```

## Installing Dependencies

After downloading the source code, install the necessary dependencies by running the following command in the terminal:

```
npm install
```

This command reads and installs all dependencies listed in your **package.json** file.

## Running the Application

### Development and Production Modes

Once the dependencies are installed, start the application using Node.js. Since the entry point is `app.js`, you can launch it directly:

```
node app.js
```

However, many applications define additional scripts in the **package.json** file for different environments. For example, a typical **package.json** file might include:

```
{
  "name": "my-application",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "dotenv": "^5.0.0",
    "execa": "^0.9.0",
    "express": "^4.16.2"
  },
  "scripts": {
    "debug": "node debug app.js",
    "start": "NODE_ENV=production node app.js",
    "start:dev": "NODE_ENV=dev node app.js",
    "test:e2e": "node tests/run-e2e-test.js",
    "test:unit": "jest tests/unit",
    "test:unit:watch": "jest tests/unit --watch"
  }
}
```

To run in production mode:

```
npm run start
```

And for development mode:

```
npm run start:dev
```

This approach allows your application to adjust its behavior based on the `NODE_ENV` variable.

> [!important]
> **Note**
>
> Using environment-specific scripts ensures that your application remains consistent across different stages, such as development, testing, and production.

## Production Process Management

While running an application with `node app.js` or via npm scripts can work well during development, they are not reliable for production environments. A crash in Node.js will terminate the process, potentially causing downtime. To avoid this, it is best to use a production-grade process manager.

### Using PM2 for Production

[PM2](https://pm2.keymetrics.io/) is a robust process manager that comes with a built-in load balancer. To start your application with PM2, simply run:

```
pm2 start app.js
```

For running multiple instances in cluster mode (for example, four instances), execute:

```
pm2 start app.js -i 4
```

This command instructs PM2 to manage multiple instances of your application, ensuring high availability and optimal performance.

> [!important]
> **Warning**
>
> Avoid running production applications directly with Node.js commands, as this can lead to uptime issues if the application crashes. Use a process manager like PM2 for enhanced reliability.

## Summary

This lesson provided an overview of deploying an Express.js application, covering:

- A typical Node.js project structure.
- Setting up and configuring the `app.js` file.
- Installing dependencies with npm.
- Managing different environments using npm scripts.
- Deploying the application with a process manager like PM2 for production.

These best practices not only streamline development but also ensure that your application performs reliably in a production environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/bdd05fa1-ea8c-453f-a4b1-c3675476ad04)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/7b46f5af-a05b-454e-a791-8cb429c8b635)**
>
> Practice lab
