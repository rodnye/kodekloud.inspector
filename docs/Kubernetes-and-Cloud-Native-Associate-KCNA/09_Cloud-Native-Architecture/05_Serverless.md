# Serverless - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Architecture/Serverless)

---

## Table of Contents

- Serverless
  - Function as a Service (FaaS)
  - Kubernetes Serverless: The Hybrid Approach
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Architecture

# Serverless

Imagine hosting a birthday party at home while hiring a professional cleaning team. This team prepares your home before the event, keeps it tidy during the festivities, and cleans up once the guests leave. This practical approach mirrors serverless computing.

In traditional computing, companies need to purchase or manage servers themselves, setting them up and continually maintaining them. With serverless computing, however, the cloud provider manages the infrastructure—provisioning, maintenance, and scaling—allowing you to focus solely on your application's core functionality.

![The image illustrates "Serverless Computing" with a cloud icon above a grid of server icons, suggesting cloud-based server management.](https://kodekloud.com/kk-media/image/upload/v1752880499/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_50.jpg)

Even though the server infrastructure is managed by the cloud provider, your application still performs essential tasks such as resizing images, sending notifications, or triggering emails. These operations represent your business logic running seamlessly in the background.

## Function as a Service (FaaS)

Function as a Service (FaaS) is like hiring a team of specialized helpers for your party. One helper greets guests, another serves drinks, and another ensures everyone is having a great time. Each helper has a single, clear role and only works when needed. Similarly, FaaS lets you write small, task-specific pieces of code that execute in response to events like HTTP requests or messages in a queue.

![The image shows three icons representing tasks: image resizing, notifications, and email, under the title "Tasks in the Application."](https://kodekloud.com/kk-media/image/upload/v1752880500/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_70.jpg)

These specialized functions are uploaded to a cloud provider, which automatically executes them when triggered by specific events. The pay-as-you-go pricing model means you only incur costs when the code runs—similar to hiring helpers only for the time they work. This setup is ideal for applications that encounter unpredictable traffic or usage patterns.

![The image features the text "Function-As-A-Service" with three blue icons: a person at a desk, two people toasting, and a person in formal attire.](https://kodekloud.com/kk-media/image/upload/v1752880502/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_100.jpg)

The cost-saving benefits become even more apparent with the pay-as-you-go model:

![The image illustrates the "Pay As You Go Model" with icons of a person at a desk, a clock, and money.](https://kodekloud.com/kk-media/image/upload/v1752880502/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_140.jpg)

> [!important]
> **Example: Online T-Shirt Store**
>
> For example, consider a small online t-shirt store that needs to send a confirmation email after a purchase. Instead of managing an email server or developing complex dispatch code, you could simply implement a function using a service like AWS Lambda. This function would be triggered automatically after a customer makes a purchase, sending the confirmation email via services such as SendGrid or Amazon SES. The FaaS platform scales the function based on incoming request volume.

Major public cloud providers support FaaS, with offerings such as:

- AWS Lambda and AWS Fargate (Amazon Web Services)
- Azure Functions (Microsoft Azure)
- Google Cloud Functions (Google Cloud)
- IBM Cloud Functions

## Kubernetes Serverless: The Hybrid Approach

Kubernetes serverless combines the scalability of Kubernetes with the ease of serverless computing. In a standard Kubernetes setup, containers run within clusters spread across multiple servers or virtual machines. Kubernetes ensures high availability with features like auto-scaling, load balancing, and self-healing.

With the evolving demand for serverless architectures, platforms like Knative and OpenFaaS have been developed on top of Kubernetes. These platforms empower developers to deploy serverless functions that automatically handle scaling, event triggering, and lifecycle management. This hybrid model offers enhanced scalability, reduced operational costs, and improved developer productivity.

![The image illustrates Kubernetes Serverless, featuring Knative and OpenFaaS, with icons representing scaling, event triggering, and lifecycle management.](https://kodekloud.com/kk-media/image/upload/v1752880503/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_270.jpg)

The subsequent diagram emphasizes Kubernetes’s scalability and reliability alongside the cost reductions and increased productivity achieved with serverless computing:

![The image highlights "Kubernetes Serverless," emphasizing scalability and reliability for Kubernetes, and reduced operational cost and improved developer productivity for serverless computing.](https://kodekloud.com/kk-media/image/upload/v1752880504/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Serverless/frame_280.jpg)

> [!important]
> **Key Takeaways**
>
> - Serverless computing frees you from managing infrastructure, enabling you to focus on application logic.
> - FaaS offers efficient, event-driven execution of code on a pay-as-you-go basis.
> - Kubernetes serverless combines container orchestration with the operational benefits of serverless computing.

This overview of serverless computing closes our discussion, paving the way to explore implementation details and advanced strategies for leveraging these modern technologies effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/c5b96591-7106-4a51-abe1-d77b53e1a92c/lesson/5b60890f-e903-4680-962c-3b9b8bf80988)**
>
> Watch video content
