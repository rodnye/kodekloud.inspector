# Why 12 Factor app - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Introduction/Why-12-Factor-app)

---

## Table of Contents

- Why 12 Factor app
  - Watch Video

---

## Content

12 Factor App

Introduction

# Why 12 Factor app

Imagine having a brilliant idea and building an application to share that vision with the world. In the past, launching an application involved overcoming numerous obstacles such as long waiting periods for a dedicated server. Once acquired, that server was permanently tied to your application, and scaling meant adding more resources to that single machine. Often, session data was stored locally, meaning that if the server failed, user progress was lost, and users had to restart from scratch.

Fast forward to today. High-growth SaaS startups can see user numbers rise from zero to millions in mere months. The speed of innovation now hinges on how quickly you can write, test, and deploy your code. Thanks to modern cloud platforms, provisioning and hosting resources can take minutes—or even seconds. With Platform-as-a-Service (PaaS) and serverless technologies, you simply write your code, push it, and see it live. These platforms boast uptimes of 99.999%, making downtime for maintenance, patching, or scaling nearly unacceptable.

> [!important]
> **Note**
>
> For optimal performance and reliability, your application must be architected to decouple from the underlying infrastructure. This means designing for portability and seamless operation across various environments—be it on-premises, Google Cloud Platform (GCP), Amazon Web Services (AWS), or Microsoft Azure—without necessitating changes to your source code.

In earlier architectures, scaling was achieved by vertically enhancing a server, an approach that often required taking the application offline for upgrades. Modern applications, however, scale horizontally by adding more servers and spinning up additional instances. To succeed in today’s fast-paced cloud environments, your application needs to be consistent across development, testing, and production while remaining easily scalable.

A decade ago, engineers at Heroku distilled a set of guiding principles for building modern applications, known today as the 12-Factor App. These twelve principles provide a blueprint for creating scalable, resilient, and maintainable applications. For additional details, refer to the [12factor.net](https://12factor.net/) website.

![The image features the text "The Twelve-Factor App" with a logo above and a URL "https://12factor.net/" below.](https://kodekloud.com/kk-media/image/upload/v1752856823/notes-assets/images/12-Factor-App-Why-12-Factor-app/frame_200.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/9a3eed42-9319-4f4c-ae45-47fd5ec2fcb5/lesson/d48719ae-7523-4b12-bf0d-b746820340a0)**
>
> Watch video content
