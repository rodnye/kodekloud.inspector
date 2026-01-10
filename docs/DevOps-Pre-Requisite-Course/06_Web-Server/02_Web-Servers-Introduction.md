# Web Servers Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Web-Server/Web-Servers-Introduction)

---

## Table of Contents

- Web Servers Introduction
  - What Are Web Frameworks and Web Servers?
  - Serving Your Application
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Web Server

# Web Servers Introduction

In this lesson, we explore the concepts of web frameworks and web servers, their roles, and how they work together to deliver dynamic content over the internet.

The Stack Overflow Insights page for 2019 highlights the popularity of several web frameworks, covering both front-end and back-end options.

![A bar chart ranking web frameworks by popularity among developers, with jQuery leading at 48.7%, followed by React.js and Angular/Angular.js.](https://kodekloud.com/kk-media/image/upload/v1752873533/notes-assets/images/DevOps-Pre-Requisite-Course-Web-Servers-Introduction/frame_10.jpg)

The list includes frameworks for both the front-end and back-end. For now, our focus will be on back-end frameworks. Later, we will explain the differences between front-end and back-end frameworks. For instance, Express is a NodeJS-based web framework, Spring is Java-based, and both Django and Flask use Python.

> [!important]
> **Understanding Web Technologies**
>
> Web frameworks are crucial in defining how applications handle requests and responses. They enable developers to simplify tasks such as routing, middleware integration, and data management.

## What Are Web Frameworks and Web Servers?

Imagine an e-commerce website hosted on a web server. When a user enters the website's URL in their browser, a request is sent to the server hosting the application. The server processes the request and returns a web page along with additional data, such as a list of available products. The web server handles the server-side logic (written in languages like Java, Python, or JavaScript), while the client-side (composed of HTML, CSS, and JavaScript) is rendered in the user's browser. Additionally, users can inspect the client-side code using browser developer tools.

![The image illustrates a web framework concept, showing a browser request to a web server, with technologies like HTML, CSS, JavaScript, Java, Python, and JS.](https://kodekloud.com/kk-media/image/upload/v1752873534/notes-assets/images/DevOps-Pre-Requisite-Course-Web-Servers-Introduction/frame_130.jpg)

Both server-side and client-side codes are developed as part of a single application, and web frameworks simplify the interactions between them. Below is an example of server-side code written in Java using the Spring Boot framework:

```
package com.example.demo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class DemoApplication {


    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @GetMapping("/products")
    public String[] getProducts() {
        return getProductList();
    }

    // Assume getProductList() retrieves a list of products from the database.
}
```

In this Java example, an HTTP GET request on "/products" fetches a list of products from the database. Other languages offer similar functionality. Consider the following samples using Python with Flask and JavaScript with Express:

```
from flask import Flask
app = Flask(__name__)


@app.route('/products')
def get_products():
    return getProductList()  # Assume getProductList() retrieves product data.


if __name__ == '__main__':
    app.run()
```

```
const express = require('express');
const app = express();


app.get('/products', (req, res) => {
    res.send(getProductList()); // Assume getProductList() retrieves product data.
});


app.listen(3000, () => console.log('Server running on port 3000'));
```

> [!important]
> **Production Deployment Reminder**
>
> Although many frameworks include built-in servers for development—for example, Flask's `app.run()`—these are not optimized for production. It's recommended to use a dedicated web server for handling live traffic.

## Serving Your Application

After developing your web application, the next step is to serve it by configuring the application to listen on a specific port and processing incoming requests. In some frameworks, like Flask, the built-in server can be used for development, but in production scenarios, a dedicated web server should be employed.

A web server makes your application accessible over the network. In certain platforms, such as Python or NodeJS, the code might run without significant modifications, while Java applications are typically packaged into deployable artifacts. Some popular web servers include Apache Tomcat, GlassFish, NGINX, Unicorn, and JBoss. Each server runs one or more processes that listen on designated ports for incoming requests—for example, Tomcat usually listens on port 8080, NGINX on port 80, and Unicorn on port 8000, though these may be reconfigured.

Web servers can host multiple applications at the same time. They often route requests based on URL, hostname, or path, directing them to the appropriate application. Websites generally fall into one of two categories:

| Website Type | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| Static       | Serves unchanging content, such as image galleries.                                   |
| Dynamic      | Retrieves and renders content on demand from a database, as seen in e-commerce sites. |

![The image compares static and dynamic websites, showing examples and logos of related technologies like NGINX, Apache, Apache Tomcat, and uWSGI.](https://kodekloud.com/kk-media/image/upload/v1752873535/notes-assets/images/DevOps-Pre-Requisite-Course-Web-Servers-Introduction/frame_480.jpg)

Static web servers, such as the Apache HTTP server and NGINX, focus on delivering static content. On the other hand, application servers like Apache Tomcat and Unicorn are optimized to handle dynamic content by executing server-side code that interacts with databases and other services.

In the remainder of this lesson, we will delve deeper into web server and application server technologies, and experiment with hosting applications using these tools.

For more detailed information on web frameworks and servers, see:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/b08dfb42-dea4-4432-862a-600e5e2649a6/lesson/82be6606-942f-4f69-a818-da816bbdf446)**
>
> Watch video content
