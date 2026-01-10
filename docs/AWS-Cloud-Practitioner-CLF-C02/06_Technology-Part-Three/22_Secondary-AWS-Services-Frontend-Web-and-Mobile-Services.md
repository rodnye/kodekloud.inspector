# Secondary AWS Services Frontend Web and Mobile Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/Secondary-AWS-Services-Frontend-Web-and-Mobile-Services)

---

## Table of Contents

- Secondary AWS Services Frontend Web and Mobile Services
  - Amazon Amplify Overview
  - Amazon AppSync Overview
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# Secondary AWS Services Frontend Web and Mobile Services

Welcome, Cloud Practitioners. In this article, presented by Michael Forrester, we explore two essential AWS services that empower front-end and mobile development. Although these services target a niche area within AWS, they offer powerful capabilities for developers building dynamic applications.

We will examine two main services:

- **AWS Amplify** – A solution for deploying web and mobile applications that simplifies code deployment into a managed infrastructure.
- **AWS AppSync** – A service for deploying GraphQL APIs that provides flexible, real-time access to multiple data sources.

Amplify is predominantly used for building web and mobile applications. Its core features include:

- Easy integration with Amazon Cognito for authentication
- Built-in backend functions, such as access to DynamoDB
- Web hosting capabilities for simplified deployment
- Compatibility with popular JavaScript frameworks like React, Angular, and Vue.js

Conversely, AppSync is engineered to deliver real-time updates, offline functionality, and seamless GraphQL integration. GraphQL provides an efficient way to access multiple APIs or API-fronted data sources, ensuring near real-time data integration across heterogeneous sources.

![The image highlights AWS AppSync's core features: real-time updates and offline functionality, and its integration with GraphQL for app development.](https://kodekloud.com/kk-media/image/upload/v1752862191/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_70.jpg)

**In summary:**

- AWS Amplify focuses on dynamic web and mobile applications.
- AWS AppSync provides comprehensive data access via GraphQL for unified entry from multiple sources.

![The image outlines general use cases for AWS Amplify and AWS AppSync: building dynamic web and mobile apps, and providing real-time updates.](https://kodekloud.com/kk-media/image/upload/v1752862192/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_100.jpg)

Both services are designed to deliver speed, efficiency, and scalability, adapting to varied deployment and data integration requirements.

![The image highlights modern computing's relevance, emphasizing speed, efficiency, and scalability, with icons representing these concepts.](https://kodekloud.com/kk-media/image/upload/v1752862193/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_110.jpg)

Together, these services provide a unified development experience. While Amplify streamlines front-end deployment, AppSync enhances backend real-time functionality. Both adhere to AWS’s strict security standards and offer scalability to evolve along with your application needs.

---

## Amazon Amplify Overview

Let's begin with AWS Amplify. A common question is how to differentiate services prefixed with "Amazon" versus "AWS." Typically, a service branded with "Amazon" can operate as a standalone solution, whereas "AWS" prefixed services often complement or enhance another AWS service. For example, Elastic Block Store (EBS) is tightly integrated with EC2.

Amazon Amplify offers a streamlined deployment methodology for web and mobile apps, particularly those built with JavaScript. Its key functionalities include:

- Simplified authentication integration
- Easy access to AWS backend services such as DynamoDB
- Application hosting with automated CI/CD pipelines to support versioning, feature expansion, and rapid deployment

![The image outlines Amazon Amplify's core features and framework integrations, highlighting easy authentication, backend functions, hosting, and compatibility with React, Angular, and Vue.js.](https://kodekloud.com/kk-media/image/upload/v1752862195/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_200.jpg)

While much of its underlying technology remains an AWS-managed implementation detail, Amplify delivers a powerful, yet abstracted, development and deployment experience.

![The image illustrates Amazon Amplify's components: Backend Development, Frontend Development, and CI/CD Pipeline, connected under the title "Diving Deeper Into Amazon Amplify."](https://kodekloud.com/kk-media/image/upload/v1752862196/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_220.jpg)

Generically speaking, Amplify is ideal for building dynamic web and mobile applications that benefit from real-time updates, accelerated deployment speed, and enhanced operational efficiency.

![The image outlines Amazon Amplify's general use cases: building dynamic web and mobile apps, and providing real-time updates.](https://kodekloud.com/kk-media/image/upload/v1752862197/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_240.jpg)

To summarize, AWS Amplify enables:

- Easy authentication
- Robust back-end and front-end functionalities
- Reliable application hosting integrated with CI/CD pipelines

![The image is a slide titled "Conclusion" listing three points: Easy authentication, Backend functions, and Hosting and CI/CD pipeline.](https://kodekloud.com/kk-media/image/upload/v1752862197/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_270.jpg)

> [!important]
> **Demo Alert**
>
> A brief demo of Amplify will follow shortly, demonstrating its capabilities in streamlining web and mobile application deployment.

---

## Amazon AppSync Overview

Next, we turn our focus to AWS AppSync. AppSync is primarily used for obtaining API access via GraphQL—both online and offline—integrating multiple data sources while synchronizing data between disparate systems. Its main features include robust real-time data synchronization and stringent security and authorization controls.

When considering AppSync, think of it as the dedicated GraphQL solution tailored for your application. It is especially useful when you need to securely integrate multiple APIs or API-fronted data sources without compromising on performance.

![The image illustrates Amazon AppSync's tasks: backend development, data synchronization, and security and authorization, using a flowchart with icons and text.](https://kodekloud.com/kk-media/image/upload/v1752862198/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_350.jpg)

AppSync enhances the dynamic capabilities found in Amplify by focusing specifically on:

- Backend development
- Data synchronization across various APIs
- Comprehensive security and authorization features

![The image outlines Amazon AppSync use cases: building dynamic web and mobile apps, and providing real-time updates.](https://kodekloud.com/kk-media/image/upload/v1752862200/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_370.jpg)

Both Amplify and AppSync operate as “black boxes,” meaning their underlying architectures are managed by AWS. Nonetheless, they deliver scalable solutions that boost operational speed and overall efficiency.

In summary, AWS AppSync is a GraphQL-based service designed to support backend development by integrating multiple API data sources, enabling effective data synchronization, and enforcing stringent security measures.

![The image is a slide titled "Conclusion" listing three points: Backend development, Data synchronization, and Security and authorization.](https://kodekloud.com/kk-media/image/upload/v1752862200/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-Frontend-Web-and-Mobile-Services/frame_420.jpg)

> [!important]
> **Upcoming Demo**
>
> A brief demo of AppSync is provided later in this article to showcase these concepts in a real-world scenario.

Thank you for reading. Continue to the demonstration sections to explore how AWS Amplify and AWS AppSync function in real-world applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/ec8c72e9-0d16-4abb-9aac-cc714f57fcc6)**
>
> Watch video content
