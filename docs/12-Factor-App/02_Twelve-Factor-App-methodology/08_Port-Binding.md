# Port Binding - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Port-Binding)

---

## Table of Contents

- Port Binding
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Port Binding

Accessing our Flask web application is as straightforward as entering the URL along with the port number into your web browser. In our example, the application runs on port 5000. When accessed successfully, a welcome message along with a visitor count is displayed.

![A browser window displays a message: "Welcome to KODEKLOUD! Visitor Count: 10" on a localhost server.](https://kodekloud.com/kk-media/image/upload/v1752856837/notes-assets/images/12-Factor-App-Port-Binding/frame_10.jpg)

By default, the Python Flask framework listens on port 5000. However, when running multiple instances of the application on the same server, each instance can bind to a unique port (such as 5001, 5002, etc.). In multi-service environments, different services are assigned distinct ports—for instance, Redis typically operates on port 6379.

![The image shows a network diagram with four nodes labeled 5001, 5000, 5002, and 6379, featuring globe and database icons.](https://kodekloud.com/kk-media/image/upload/v1752856838/notes-assets/images/12-Factor-App-Port-Binding/frame_30.jpg)

Binding an application to a specific port allows it to export HTTP as a service and listen directly for incoming requests. In contrast to traditional web applications that depend on an external web server, the 12-Factor App methodology encourages creating self-contained applications with built-in web servers. This design approach not only simplifies deployment but also enhances scalability.

> [!important]
> **Note**
>
> For environments that host multiple services simultaneously, ensuring each service is bound to a unique port is crucial for preventing conflicts and maintaining smooth communication between services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/c1850baa-bddf-4f55-977c-cb3c9234ee15)**
>
> Watch video content
