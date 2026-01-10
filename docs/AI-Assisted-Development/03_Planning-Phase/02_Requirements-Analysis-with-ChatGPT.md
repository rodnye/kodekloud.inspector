# Requirements Analysis with ChatGPT - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Planning-Phase/Requirements-Analysis-with-ChatGPT)

---

## Table of Contents

- Requirements Analysis with ChatGPT
  - Step 1: Crafting a Detailed Prompt
  - Step 2: Generating the Document
  - Step 3: Refining the Document with Interactive Queries
  - Step 4: Defining Requirements and Stakeholder Analysis
  - Step 5: Excerpt from the Final Requirements Analysis Document
  - Final Thoughts
  - Watch Video
    - Functional Requirements
    - Non-functional Requirements
    - Stakeholder Analysis
    - Assumptions and Dependencies
    - Constraints
    - Acceptance Criteria

---

## Content

AI-Assisted Development

Planning Phase

# Requirements Analysis with ChatGPT

This lesson demonstrates how to create a formal requirements analysis document for a web-based application using ChatGPT. The resulting document is designed to be a comprehensive reference for developers, clients, stakeholders, and project managers.

## Step 1: Crafting a Detailed Prompt

Begin by constructing a detailed prompt for ChatGPT. The prompt should include clear instructions to create a technical requirements analysis document. For example:

"Assist me in creating a formal and technical requirements analysis document for a web-based application intended for developers, clients, and stakeholders. This document should follow industry best practices and include the following sections: Introduction, Purpose, Scope, Functional Requirements, Non-functional Requirements, Stakeholder Analysis, Constraints, and Acceptance Criteria."

This precise prompt ensures that all necessary aspects are covered in the finalized document, resulting in a valuable reference tool for project teams.

## Step 2: Generating the Document

After copying the prompt into ChatGPT 4.0 using the Canvas functionality, the tool generates a comprehensive document covering all the outlined sections for the web application's requirements.

![The image shows a web browser window with a document titled "Web App Requirements," detailing sections on constraints, acceptance criteria, and a conclusion for a web-based application project. The document is structured to provide clarity for developers, clients, and stakeholders.](https://kodekloud.com/kk-media/image/upload/v1752857127/notes-assets/images/AI-Assisted-Development-Requirements-Analysis-with-ChatGPT/web-app-requirements-document.jpg)

## Step 3: Refining the Document with Interactive Queries

One of ChatGPT’s interactive features is its ability to ask clarifying questions. These questions help refine and accurately complete the document. For example:

![The image shows a web browser window with a document titled "Web App Requirements," detailing sections like Introduction, Purpose, Scope, and Functional Requirements for a web-based application. On the left, there are clarifying questions to help fill out the document.](https://kodekloud.com/kk-media/image/upload/v1752857128/notes-assets/images/AI-Assisted-Development-Requirements-Analysis-with-ChatGPT/web-app-requirements-document-2.jpg)

Using the clarifying questions, you can define key application details such as:

- **Application Name:** Image Optimizer
- **Target Audience:** Graphics department
- **Key Functionality:**
  - Image upload
  - Quality adjustment to reduce file size
- **Scope:**
  - Provide an interface for uploading images, adjusting quality, and displaying the modified output
  - **Out of Scope:** Saving the image

Since the application does not involve full CRUD operations (i.e., no data saving), the functional requirements are limited to uploading an image, processing it, and displaying the result. Additional features like dashboard metrics or notifications are not included.

## Step 4: Defining Requirements and Stakeholder Analysis

### Functional Requirements

- Image upload capability
- Image quality adjustment functionality
- Display of the processed image

### Non-functional Requirements

- **Concurrent Users:** 10
- **Acceptable Response Time:** 1 second
- **Performance Benchmarks:** Maintain the response time requirement

### Stakeholder Analysis

- **Primary Users:** Graphic designers
- **Technical Team:** Developers and project managers handle coding, testing, and oversight
- **Quality Assurance:** QA team validates application functionality

### Assumptions and Dependencies

- Browser compatibility and device support are considered.
- There are no assumptions of additional complexities or external API integrations.

### Constraints

- **Budget:** $1 million
- **Timeframe:** 1 week
- **Technology Stack:**
  - Backend: Flask
  - Frontend: React

### Acceptance Criteria

- All functional features must be implemented and thoroughly tested.
- The application must meet performance and security requirements (including passing vulnerability and penetration tests).
- User acceptance testing must yield positive feedback.
- Complete user stories and technical documentation must be provided.

## Step 5: Excerpt from the Final Requirements Analysis Document

Below is an excerpt from the refined document for the Image Optimizer application:

- **Introduction:**  
  Provides a comprehensive analysis for an application that facilitates image quality adjustments to reduce file sizes. This document serves as a guide for both technical and non-technical team members.
- **Purpose:**  
  To outline the functional and non-functional requirements for the Image Optimizer application.
- **Scope:**  
  The web-based platform is accessible via modern browsers, offering essential features such as image upload, quality adjustment, and image display, while excluding functionalities like image saving.
- **Functional Requirements:**  
  Supports image upload, quality adjustment, and image presentation with no additional dashboard or notification features.
- **Non-functional Requirements:**  
  Supports up to 10 concurrent users with a response time of under 1 second per key operation; adheres to industry-standard security practices including encryption; ensures high usability and scalability.
- **Stakeholder Analysis:**  
  Focuses on graphic designers as primary users while developers and project managers manage implementation. A QA team ensures the application meets specified standards.
- **Constraints:**  
  Bounded by a $1 million budget, a one-week deadline, and a tech stack including Flask (backend) and React (frontend).
- **Acceptance Criteria:**  
  All functional requirements must be implemented and validated, performance targets met, the application passes security evaluations, and comprehensive documentation is provided.

After refining the document, the content was copied into [Google Docs](https://docs.google.com) to view the formatted result.

![The image shows a Google Docs document titled "Requirements Analysis Document for Image Optimizer," detailing the introduction, purpose, scope, and requirements for a web-based image optimization application.](https://kodekloud.com/kk-media/image/upload/v1752857129/notes-assets/images/AI-Assisted-Development-Requirements-Analysis-with-ChatGPT/requirements-analysis-image-optimizer-doc.jpg)

## Final Thoughts

Using ChatGPT in this way can significantly streamline the documentation process. Instead of manually drafting multiple documents over several hours, you can generate detailed, industry-standard documentation quickly and efficiently.

![The image shows a Google Docs document with sections on assumptions, dependencies, constraints, and acceptance criteria for a project. It includes details about budget, timeframe, technology, and testing requirements.](https://kodekloud.com/kk-media/image/upload/v1752857130/notes-assets/images/AI-Assisted-Development-Requirements-Analysis-with-ChatGPT/google-docs-project-details-sections.jpg)

> [!important]
> **Note**
>
> By using a detailed prompt and clarifying questions, you ensure that ChatGPT generates a comprehensive and precise requirements analysis document, saving valuable time in the documentation process.

Next, we will explore generating user stories for the project.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/c05d0d6f-249f-45b7-b7bf-d2ba775b6587/lesson/e0590059-563b-438c-b0d9-c572a13bb0f0)**
>
> Watch video content
