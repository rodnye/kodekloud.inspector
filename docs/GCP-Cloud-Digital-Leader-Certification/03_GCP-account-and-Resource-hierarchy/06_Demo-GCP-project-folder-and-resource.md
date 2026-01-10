# Demo GCP project folder and resource - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/GCP-account-and-Resource-hierarchy/Demo-GCP-project-folder-and-resource)

---

## Table of Contents

- Demo GCP project folder and resource
  - Exploring the Project Selector
  - Creating a New Project
  - Understanding the Importance of GCP Projects
  - Best Practices for GCP Project Management
  - Conclusion
  - Additional Resources
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

GCP account and Resource hierarchy

# Demo GCP project folder and resource

Welcome to this lesson on managing Google Cloud Platform (GCP) projects. In our previous session, we explored what a project is, reviewed the resource hierarchy, and discussed its importance in GCP. Today, we will demonstrate how to create a new GCP project step-by-step.

## Exploring the Project Selector

Currently, I am working within a project named "learning Google Cloud." When you click on the project selector, you'll notice multiple projects listed—even if some share the same name. Although names may be identical, remember that the project IDs are unique. It's essential to ensure that project IDs remain unique across all projects.

> [!important]
> **Project IDs**
>
> Project IDs in GCP are globally unique. Always verify the project ID you are working with to avoid any configuration issues.

Next, click on **"All"** to view complete project details.

![The image shows a Google Cloud console interface with a "Select a project" dialog box open, listing several projects with their names and IDs.](https://kodekloud.com/kk-media/image/upload/v1752875303/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-project-folder-and-resource/google-cloud-console-select-project-dialog.jpg)

## Creating a New Project

Within the selector, you can also see that projects may belong to an organization—if one has been established—or exist without one. You can bookmark frequently used projects by starring them.

To create a new project, follow these steps:

1.  Click **"New Project"**.
2.  Enter a project name. For example, I have named this project **"KodeKloud GCP Training"**.
3.  Leave the organization location unchanged.
4.  Click **"Create"**.

![The image shows a Google Cloud Platform interface for creating a new project, with fields for project name, project ID, and location. The project name entered is "KodeKloud-GCP-Training."](https://kodekloud.com/kk-media/image/upload/v1752875303/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-project-folder-and-resource/google-cloud-platform-new-project.jpg)

After your request, a new project is generated. Click **"Select this project"** to switch to your newly created project.

![The image shows a Google Cloud console dashboard with options to create a VM, run a query in BigQuery, and other quick access features. A notification about creating a project is also visible.](https://kodekloud.com/kk-media/image/upload/v1752875305/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-project-folder-and-resource/google-cloud-console-dashboard-vm-query.jpg)

## Understanding the Importance of GCP Projects

Every project in GCP serves as a logical separation within an organization. For instance, in a company issuing credit cards, different departments—such as fraud detection, credit card payments, and notifications—might be organized as separate projects. This separation simplifies administration and resource management.

A common question arises: Can resources in one project interact with those in another? The answer is yes. Provided the projects belong to the same folder and organization, inter-project interactions are possible.

![The image shows the Google Cloud Platform console with a welcome screen for the "KodeKloud-GCP-Training" project, featuring options to create a VM, run a query in BigQuery, and other quick access links.](https://kodekloud.com/kk-media/image/upload/v1752875306/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-GCP-project-folder-and-resource/google-cloud-platform-kodekloud-training.jpg)

> [!important]
> **Resource Interaction**
>
> Resources from separate projects can interact as long as they are in the same organizational context. This flexibility is particularly useful when managing projects across different departments.

Throughout this training series, we will use the new project ("KodeKloud GCP Training") to build and manage various resources.

## Best Practices for GCP Project Management

When you join an organization with a pre-established GCP project structure, it is uncommon to create new projects daily. Often, organizations have been using GCP for many years, with the architecture set long before your involvement. New projects are typically created to support new departments or initiatives.

> [!important]
> **Select the Correct Project**
>
> Always double-check that you have selected the correct project in the GCP console before executing any operations. This helps ensure that your actions affect the intended resources.

## Conclusion

This lesson demonstrated how to create a new GCP project and provided insights into its importance within an organization. Remember to always manage your projects carefully and verify your current project context in the GCP console.

Thank you for joining this session. I look forward to seeing you in the next lesson.

## Additional Resources

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [GCP Project and Resource Hierarchy](https://cloud.google.com/resource-manager/docs)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/b66b4a7d-3fda-4a71-880a-e91e7a6f4afa/lesson/04831aca-24bf-441b-9325-ac6e0a8324a2)**
>
> Watch video content
