# Generating User Stories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Planning-Phase/Generating-User-Stories)

---

## Table of Contents

- Generating User Stories
  - High-Level User Stories for Graphic Designers
  - Refining User Stories for Software Developers
  - Importing User Stories into Azure DevOps
  - Next Steps
  - Watch Video

---

## Content

AI-Assisted Development

Planning Phase

# Generating User Stories

In this lesson, we demonstrate a technique to generate high-quality user stories for your project. Rather than immediately importing them into a specialized board, we begin by crafting and refining the prompts within our current environment. These refined prompts can later be exported to Markdown, Word, PDF, or any format you prefer.

To start, enter the following prompt into your ChatGPT window:

"Analyze the provided requirements analysis document to identify key functionalities and user needs. Then generate a set of high-level user stories intended for software developers. Each user story should follow the format 'As a \[user\], I want \[functionality\] so that \[benefit\]. Use a formal tone and ensure the stories adhere to Scrum guidelines."

This detailed prompt is designed to extract precise and actionable user stories. The prompt has been saved and is available in our GitHub repository for future reference. Specificity is key; by clearly outlining your requirements, you ensure that the model returns exactly what you need—allowing for further refinements if necessary.

After entering the prompt into ChatGPT, a "failed to comment" error may occur. This error typically indicates that the system could not match the expected patterns for adding detailed comments. To resolve this, open a new chat session using ChatGPT 4.0 with canvas, upload the requirements analysis document (converted from Markdown to Word), and run the prompt again.

> [!important]
> **Note**
>
> If you encounter pattern-matching errors, switching sessions or formats (Markdown to Word) can often resolve the issue.

---

## High-Level User Stories for Graphic Designers

The initial output focuses on high-level user stories relevant to end-users, such as graphic designers. One of the example stories generated is:

- "I want to upload images to the application so I can optimize them for reduced file size."

Along with additional stories focusing on quality adjustments, intuitive interfaces, accessibility, security, and scalability, the following illustration provides context:

![The image shows a webpage with a list of high-level user stories for a project, focusing on features like image upload, quality adjustment, image display, intuitive user interface, performance, accessibility, and security. The text is displayed in a dark-themed browser window.](https://kodekloud.com/kk-media/image/upload/v1752857121/notes-assets/images/AI-Assisted-Development-Generating-User-Stories/user-stories-project-features-webpage.jpg)

---

## Refining User Stories for Software Developers

Since the initial stories were more end-user oriented, the prompt was refined to target software developers by incorporating development-specific tasks. The updated prompt specifies technologies such as Flask for the backend, OpenCV for image manipulation, and React for the frontend. The resulting developer-focused user stories include:

- Set up a Flask server to handle image upload requests.
- Create a Flask endpoint (e.g., /upload) to accept images via POST.
- Implement front-end components in React to allow image uploads.
- Validate image files on both the client and server side.
- Integrate OpenCV for quality adjustment and image optimization.
- Develop a React interface to display the processed images.

The following screenshot showcases these development tasks:

![The image shows a browser window with a dark-themed interface displaying a list of tasks related to image processing using OpenCV, Flask, and React. The tasks include image validation, quality adjustment, and image display functionalities.](https://kodekloud.com/kk-media/image/upload/v1752857122/notes-assets/images/AI-Assisted-Development-Generating-User-Stories/browser-dark-theme-image-processing-tasks.jpg)

These refined user stories help graphic designers, project managers, and developers track feature progression while providing clear, actionable tasks for the development team.

---

## Importing User Stories into Azure DevOps

Next, we streamlined the process of importing these user stories into Azure DevOps. By copying the refined stories, we prompted ChatGPT to format them into a CSV file compatible with Azure DevOps. The model responded with:

"User stories have been formatted into a CSV file compatible with Azure DevOps. You can download it here."

During import, you might encounter errors related to header names (e.g., "area" and "work item type"). Azure DevOps typically expects work item types such as epic, issues, or tasks. To resolve these issues:

1.  Open the CSV file.
2.  Modify the "work item type" field so that all entries are set to "Task" (or use underscores if required).
3.  Adjust the "priority" field as necessary (e.g., using numerical values like 1, 2, 3, 4).

The edited CSV file is illustrated below:

![The image shows a spreadsheet with user stories for an image optimizer project, including columns for title, description, priority, and area. There is also an error message about invalid and missing column headers during a CSV import in Azure DevOps.](https://kodekloud.com/kk-media/image/upload/v1752857124/notes-assets/images/AI-Assisted-Development-Generating-User-Stories/image-optimizer-user-stories-spreadsheet.jpg)

Once you correct the CSV and re-upload it, the tasks should import successfully. This successful import is demonstrated in the Azure DevOps board view:

![The image shows a project management interface from Azure DevOps, displaying a list of work items related to an "Image Optimizer" project, with details such as ID, title, assigned person, state, and activity date.](https://kodekloud.com/kk-media/image/upload/v1752857125/notes-assets/images/AI-Assisted-Development-Generating-User-Stories/azure-devops-image-optimizer-interface.jpg)

> [!important]
> **Import Tip**
>
> Using automation to generate and format user stories can significantly reduce the manual labor involved in setting up your project management tools like Azure DevOps or Jira.

---

## Next Steps

With all tasks successfully imported and clearly organized on your board, you now have a detailed to-do list ready for assignment and execution. In the next part of this lesson, we will transition to creating a technical specification document that outlines the chosen technologies and development guidelines for the project. This document will serve as a comprehensive reference for your development team.

Stay tuned for the subsequent lesson on building a robust technical specification document.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/c05d0d6f-249f-45b7-b7bf-d2ba775b6587/lesson/4e0805b7-8be3-4708-b7d6-97fa245b006a)**
>
> Watch video content
