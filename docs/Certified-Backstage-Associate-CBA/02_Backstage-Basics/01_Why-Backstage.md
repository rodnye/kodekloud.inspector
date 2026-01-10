# Why Backstage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Why-Backstage)

---

## Table of Contents

- Why Backstage
  - 1. A Single Developer Portal
  - 2. Unified Service Documentation
  - 3. Clear Ownership and Faster Answers
  - 4. Visualizing Service Dependencies
  - 5. Debugging Third-Party Integrations
  - 6. Automating New Project Scaffolding
  - 7. Self-Service Infrastructure Requests
  - 8. Internal Developer Portals (IDPs)
  - Backstage: Your Open Source IDP Framework
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Why Backstage

Developers rarely spend all day writing code. Instead, they juggle a variety of tools:

| Category                   | Example Tools                         |
| -------------------------- | ------------------------------------- |
| Source Code Management     | GitHub, GitLab                        |
| CI/CD                      | Jenkins, Travis CI, CircleCI          |
| Documentation              | Confluence, GitHub Pages, Google Docs |
| Observability & Monitoring | Prometheus, Grafana, OpenTelemetry    |
| Alerting                   | PagerDuty, Alertmanager               |
| Cloud Consoles             | AWS Console, Azure Portal, GCP        |
| FinOps                     | CloudHealth, Kubecost                 |

![The image is an infographic titled "Why Backstage?" showing a person at a desk with logos of various tools like GitHub, Travis CI, Prometheus, Grafana, AWS, and Azure. It lists reasons for using Backstage, including source code management, CI/CD tools, service documentation, observability tools, alerting systems, infrastructure management, and resource cost tracking.](https://kodekloud.com/kk-media/image/upload/v1752870034/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/why-backstage-infographic-tools.jpg)

> [!important]
> **Note**
>
> Switching between tabs wastes time and mental energy—especially for new hires who must bookmark dozens of URLs.

## 1\. A Single Developer Portal

Imagine all your tools available on one site. A unified portal lets developers log in, find everything they need, and focus on writing code instead of searching for links.

## 2\. Unified Service Documentation

Service docs spread across Confluence, Google Docs, GitHub Pages, or internal wikis create friction.

![The image illustrates different teams using various tools like Confluence, Google Docs, Internal Website, and GitHub Pages, with a developer from Team X accessing a unified interface.](https://kodekloud.com/kk-media/image/upload/v1752870035/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/team-tools-unified-interface.jpg)

![The image illustrates different teams using various tools like Confluence, Google Docs, Internal Website, and GitHub Pages, with a developer from Team X accessing a unified interface.](https://kodekloud.com/kk-media/image/upload/v1752870036/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/team-tools-unified-interface-2.jpg)

Backstage’s software catalog stores metadata and docs together—searchable, versioned, and always up to date.

## 3\. Clear Ownership and Faster Answers

Outdated docs force developers to track down service owners:

![The image shows a developer from Team X asking, "Hey, do you know who owns this service?" to a group labeled as Manager, Teammate 1, Teammate 3, and Teammate 4. It highlights a communication or ownership query.](https://kodekloud.com/kk-media/image/upload/v1752870037/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/team-x-service-ownership-query.jpg)

Even after finding someone, they may have moved on:

![The image shows a conversation between a developer from Team X and another person, discussing outdated documentation and redirecting to a manager from Team C for assistance. The title is "Why Backstage?"](https://kodekloud.com/kk-media/image/upload/v1752870038/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/conversation-outdated-documentation-why-backstage.jpg)

Common frustrations:

1.  Hours spent hunting for documentation
2.  Difficulty identifying service owners
3.  Time lost coordinating contacts

![The image is a slide titled "Why Backstage?" highlighting three challenges: spending hours searching through platforms, struggling to identify service owners, and wasting time finding documents and contacts instead of coding.](https://kodekloud.com/kk-media/image/upload/v1752870039/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/why-backstage-challenges-slide.jpg)

Backstage solves this by displaying ownership details alongside documentation in a central hub:

![The image is a diagram explaining the benefits of using Backstage, highlighting a "Central Hub" for searchable locations, documentation, and ownership, with goals to find documents quickly and contact the right person.](https://kodekloud.com/kk-media/image/upload/v1752870039/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/backstage-central-hub-benefits-diagram.jpg)

## 4\. Visualizing Service Dependencies

Updating a service without insight into downstream dependencies can cause failures:

![The image is a flowchart illustrating a software repository (documentation hub) connected to four software components (A, B, C, D), each with its own dependent software.](https://kodekloud.com/kk-media/image/upload/v1752870040/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/software-repository-flowchart-components.jpg)

A portal that visualizes these relationships helps you see which applications rely on your service before deploying changes.

## 5\. Debugging Third-Party Integrations

Troubleshooting email delivery often starts with SendGrid:

![The image shows a person sitting with a laptop and a chat conversation discussing the lack of documentation for an email service setup. The text "Why Backstage?" suggests a context of improving documentation or processes.](https://kodekloud.com/kk-media/image/upload/v1752870042/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/person-laptop-chat-documentation.jpg)

```
import os
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content


SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
RECEIVER_EMAIL = "customer@example.com"
SUBJECT = "Welcome to Our Application!"
BODY = "Thank you for using our app! We are glad to have you onboard."


if not SENDGRID_API_KEY or not SENDER_EMAIL:
    raise EnvironmentError("Missing SendGrid configuration. Check environment variables.")


sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
from_email = Email(SENDER_EMAIL)
to_email = To(RECEIVER_EMAIL)
content = Content("text/plain", BODY)
mail = Mail(from_email, to_email, SUBJECT, content)


try:
    response = sg.send(mail)
    print(f"Email sent successfully! Status Code: {response.status_code}")
except Exception as e:
    print(f"Failed to send email: {e}")
```

If that fails, you might switch to SMTP:

```
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = "customer@example.com"
SUBJECT = "Welcome to Our Application!"
BODY = "Thank you for using our app! We are glad to have you onboard."


if not SMTP_SERVER or not SENDER_EMAIL or not SENDER_PASSWORD:
    raise EnvironmentError("Missing SMTP configuration. Check environment variables.")


message = MIMEMultipart()
message["From"] = SENDER_EMAIL
message["To"] = RECEIVER_EMAIL
message["Subject"] = SUBJECT
message.attach(MIMETText(BODY, "plain"))


try:
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, message.as_string())
        print("Email sent successfully!")
except Exception as e:
    print(f"Failed to send email: {e}")
```

Without dependency tracking, downstream services can break. Backstage’s graphing prevents these surprises.

## 6\. Automating New Project Scaffolding

Launching a new service manually requires many steps:

- Creating a GitHub repository
- Provisioning Kubernetes clusters
- Setting up linting, formatting, tests, and CI/CD
- Configuring repository permissions
- Creating databases and DNS entries
- Deploying to production

![The image is a flowchart illustrating the steps involved in using Backstage for software development, including creating a GitHub repo, setting up tooling, provisioning a Kubernetes cluster, and deploying an application.](https://kodekloud.com/kk-media/image/upload/v1752870043/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/backstage-software-development-flowchart.jpg)

Backstage templates automate all of this with a single button click:

![The image is a flowchart explaining the benefits of using Backstage, highlighting the elimination of manual tasks, ease of project creation with a button click, and automation through predefined templates.](https://kodekloud.com/kk-media/image/upload/v1752870044/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/backstage-benefits-flowchart.jpg)

**Template Benefits**

- Centralized template management
- Enforced best practices
- Language- and framework-specific scaffolds

![The image is a slide titled "Why Backstage?" highlighting four benefits: Centralized Template Management, Standardized Practices, Language Support, and Framework Support.](https://kodekloud.com/kk-media/image/upload/v1752870045/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/why-backstage-benefits-slide.jpg)

## 7\. Self-Service Infrastructure Requests

Filing tickets for S3 buckets or VMs can take days:

![The image shows an illustration of a developer working on a laptop and a chat conversation with an infrastructure team discussing setting up an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752870046/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/developer-laptop-s3-bucket-chat.jpg)

With Backstage, developers fill out a form:

![The image shows a developer sitting at a desk with a laptop, next to an infrastructure request form detailing virtual machine specifications and a "Submit Request" button.](https://kodekloud.com/kk-media/image/upload/v1752870046/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/developer-desk-laptop-infrastructure-request.jpg)

The infra team reviews, approves, and the portal provisions resources automatically with correct policies.

## 8\. Internal Developer Portals (IDPs)

All these scenarios led to Internal Developer Portals—central hubs that aggregate tools, documentation, and resources so teams can build, test, and deploy software efficiently.

![The image is a flowchart illustrating the concept of "Internal Developer Portals," showing a development team accessing tools, documentation, and resources, leading to coding, testing, and deployment stages.](https://kodekloud.com/kk-media/image/upload/v1752870047/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/internal-developer-portals-flowchart.jpg)

**Core IDP Features**

| Feature                         | Description                                 |
| ------------------------------- | ------------------------------------------- |
| Software Catalog                | Searchable registry of all company services |
| Documentation Hub               | Linked docs for each service                |
| Ownership & Dependency Tracking | Clear ownership and live dependency graphs  |
| Scaffolding Templates           | Automated project boilerplates              |
| Admin Controls                  | Policy enforcement and governance           |

![The image lists features of IDPs, including a catalog, documentation hub, ownership tracking, templates, and admin controls, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752870048/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/idp-features-catalog-docs-templates.jpg)

**Key Benefits**

- Streamlined access and searchability
- Consistent, up-to-date documentation
- Enhanced collaboration and community
- Faster development with pre-built code samples
- Quicker onboarding for new team members
- Self-service provisioning with guardrails
- Governance via policies and templates

![The image lists the benefits of IDPs, including streamlined accessibility, effective documentation, enhanced collaboration, accelerated development, faster onboarding, and self-service capabilities.](https://kodekloud.com/kk-media/image/upload/v1752870049/notes-assets/images/Certified-Backstage-Associate-CBA-Why-Backstage/idp-benefits-accessibility-documentation.jpg)

## Backstage: Your Open Source IDP Framework

Backstage is an open source platform for building Internal Developer Portals. It provides:

- A software catalog with metadata and search
- Built-in support for Markdown, MkDocs, and TechDocs
- An extensible plugin architecture
- Scaffolding tools for project templates
- Role-based access control and policy enforcement

We’ll dive into Backstage’s architecture, core plugins, and best practices for running your own portal.

## Links and References

- [Backstage Documentation](https://backstage.io/docs)
- [Backstage Plugin Marketplace](https://backstage.io/plugins)
- [Internal Developer Portal Concept](https://martinfowler.com/articles/internal-developer-portal.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/63b3da56-6a9c-43f4-b93e-74bb3614c527)**
>
> Watch video content
