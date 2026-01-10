# General Instructions GKE Playground - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Playground-Instructions/General-Instructions-GKE-Playground)

---

## Table of Contents

- General Instructions GKE Playground
  - 1. Launch the GCP Sandbox
  - 2. Accept Terms and Conditions
  - 3. Enable the Kubernetes Engine API
  - Links and References
  - Watch Video

---

## Content

GKE - Google Kubernetes Engine

Playground Instructions

# General Instructions GKE Playground

This guide shows you how to access the Google Cloud Platform (GCP) Sandbox environment for your Google Kubernetes Engine (GKE) labs. Follow these steps to launch the sandbox, accept all terms, and enable the Kubernetes Engine API.

## 1\. Launch the GCP Sandbox

1.  In Qwiklabs, select the **Playgrounds** tab.
2.  Scroll down to **Cloud Playgrounds** and click **Google Cloud Platform**.
3.  Review the quick start guide on the homepage to understand the sandbox limits.
4.  Click **Launch Now** to provision a temporary environment. You’ll see a console link, username, and password.

> [!important]
> **Note**
>
> Your sandbox credentials are valid for 60 minutes. Copy them immediately and store them securely.

![The image shows a Google Cloud Platform console login page with a link, username, and password, along with an expiration timer. A menu is open on the right side of the screen.](https://kodekloud.com/kk-media/image/upload/v1752875738/notes-assets/images/GKE-Google-Kubernetes-Engine-General-Instructions-GKE-Playground/google-cloud-platform-login-page.jpg)

> Open the console link in an incognito/private window to avoid conflicts with existing Google credentials.

## 2\. Accept Terms and Conditions

When the console opens:

1.  A Google account welcome page appears—click **I understand** to acknowledge management and privacy policies.
2.  Read and accept the GCP Terms of Service, then click **Agree and Continue**.
3.  You may leave the email updates option unchecked.

![The image shows a Google account welcome page with a message about account management and privacy policies, including a button labeled "I understand."](https://kodekloud.com/kk-media/image/upload/v1752875739/notes-assets/images/GKE-Google-Kubernetes-Engine-General-Instructions-GKE-Playground/google-account-welcome-page-privacy.jpg)

![The image shows a Google Cloud Platform dashboard with a pop-up window prompting a user to agree to the terms of service and select a country. The dashboard includes sections for project info, resources, and platform status.](https://kodekloud.com/kk-media/image/upload/v1752875740/notes-assets/images/GKE-Google-Kubernetes-Engine-General-Instructions-GKE-Playground/google-cloud-platform-dashboard-terms-popup.jpg)

## 3\. Enable the Kubernetes Engine API

Before starting any GKE lab, ensure the Kubernetes Engine API is active:

1.  In the GCP Console navigation menu, go to **APIs & Services** → **Enabled APIs & Services**.
2.  Click **\+ ENABLE APIS AND SERVICES** at the top.
3.  Search for **Kubernetes Engine API** and select it.
4.  If you see a **Disable API** button, the API is already enabled.

| Menu Path                                 | Purpose                         |
| ----------------------------------------- | ------------------------------- |
| APIs & Services → Enabled APIs & Services | View currently enabled services |
| APIs & Services → Library                 | Browse and enable new APIs      |

![The image shows a Google Cloud Platform dashboard displaying a list of enabled APIs and services. The left sidebar includes options like Library, Credentials, and OAuth consent screen.](https://kodekloud.com/kk-media/image/upload/v1752875741/notes-assets/images/GKE-Google-Kubernetes-Engine-General-Instructions-GKE-Playground/google-cloud-platform-dashboard-apis-services.jpg)

![The image shows the Google Cloud Console interface for the Kubernetes Engine API, displaying metrics and settings options. It indicates that the API is enabled, but no data is available for the selected time frame.](https://kodekloud.com/kk-media/image/upload/v1752875743/notes-assets/images/GKE-Google-Kubernetes-Engine-General-Instructions-GKE-Playground/google-cloud-console-kubernetes-engine-api.jpg)

With the Kubernetes Engine API enabled, you are now ready to begin your GKE labs.

## Links and References

- [Google Cloud Console](https://console.cloud.google.com/)
- [Kubernetes Engine API Documentation](https://cloud.google.com/kubernetes-engine/docs/reference/rest)
- [Qwiklabs Playgrounds](https://www.qwiklabs.com/playgrounds)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine/module/f7a534a3-6dcf-42b8-96c8-648e59b02830/lesson/068f4e04-93d3-4f7c-8730-41d5344aeb7f)**
>
> Watch video content
