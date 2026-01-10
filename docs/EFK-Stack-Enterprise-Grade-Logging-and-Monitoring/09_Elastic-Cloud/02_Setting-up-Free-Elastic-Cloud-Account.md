# Setting up Free Elastic Cloud Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Elastic-Cloud/Setting-up-Free-Elastic-Cloud-Account)

---

## Table of Contents

- Setting up Free Elastic Cloud Account
  - Step 1: Finding Elastic Cloud
  - Step 2: Start Your Free Trial
  - Step 3: Registration Process
  - Step 4: Configuring Your Deployment
  - Step 5: Reviewing Your Deployment
  - Step 6: Accessing Kibana and Next Steps
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Elastic Cloud

# Setting up Free Elastic Cloud Account

Welcome to this hands-on guide for creating your first Elastic Cloud account. Elastic Cloud offers a 14-day free trial that allows you to explore its powerful features without any commitment. Follow the steps below to get started with your trial account.

## Step 1: Finding Elastic Cloud

1.  Open your Google Chrome (or your preferred browser) and search for "Elastic Cloud."
2.  Click on the first link in the search results. This will lead you to the Elastic Cloud website where the free trial is prominently featured.

![The image shows a Google search results page for "elastic cloud," featuring sponsored links and information about Elastic Cloud services and webinars.](https://kodekloud.com/kk-media/image/upload/v1752874198/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Setting-up-Free-Elastic-Cloud-Account/google-search-elastic-cloud-results.jpg)

## Step 2: Start Your Free Trial

1.  Click on the **"Start Free Trial"** button.
2.  You will see several sign-up options, including registration via cloud marketplaces and a direct sign-up for an Elastic Cloud account.
3.  For this guide, we will register directly with Elastic Cloud. At the time of recording, no credit card is required to sign up for the free trial.

![The image shows a sign-up page for a free trial of Elastic, with options to sign up via email or through cloud marketplaces like Amazon Web Services, Google Cloud, and Microsoft Azure.](https://kodekloud.com/kk-media/image/upload/v1752874199/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Setting-up-Free-Elastic-Cloud-Account/elastic-free-trial-signup-page.jpg)

> [!important]
> **Note**
>
> If you’re exploring Elastic Cloud for evaluation, you can register without providing detailed company information—just enter "Not Available" when prompted.

## Step 3: Registration Process

1.  Select **Google** as your preferred sign-in method.
2.  Choose your email ID and click **"Continue."**
3.  Fill in your full name and company details. If you do not wish to provide your company information, simply enter **"Not Available."**
4.  When asked about your experience with Elastic, select **"I am new"** and choose the **"Evaluate Elastic for my project"** use case.

![The image shows a registration form for Elastic, asking for user information such as full name, company, experience level, and areas of interest. There are options to select interests and actions related to Elastic services.](https://kodekloud.com/kk-media/image/upload/v1752874200/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Setting-up-Free-Elastic-Cloud-Account/elastic-registration-form-user-info.jpg)

5.  Click **"Next."**
6.  If additional details are required, enter **"observability logs"** or select one of the available options.
7.  Continue by clicking **"Next"** and wait for the registration process to complete.

## Step 4: Configuring Your Deployment

1.  Name your deployment (e.g., **"Elastic Cloud"**) while keeping the remaining settings at their defaults.
2.  By default, Elastic Cloud deploys your environment on [Google Cloud Platform (GCP)](https://cloud.google.com/). To choose a different provider, click **"Edit Settings"** and select your preferred cloud provider. For this demonstration, we are using the default GCP.
3.  You can also select the hardware profile. Options include vector search optimized, storage optimized, and more. If you are new to Elastic Cloud, it is recommended to leave these options at their default values.
4.  Click on **"Create Deployment."**

Once your deployment is ready, you will be redirected to a page that displays your Kibana UI.

![The image shows a web interface for creating a deployment on Elastic Cloud, with options to select the cloud provider, region, hardware profile, and version.](https://kodekloud.com/kk-media/image/upload/v1752874201/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Setting-up-Free-Elastic-Cloud-Account/elastic-cloud-deployment-interface.jpg)

## Step 5: Reviewing Your Deployment

1.  To view the details of your deployment, click on your account and navigate to **"Organization."**
2.  Here, you will see your organization details (typically, only you as the user). Then, click on **"Cloud"** to review your deployment’s status, ensuring it is healthy and that the cloud provider's details are correctly displayed.
3.  Although you have the option to create additional deployments, continue with the one you just created.

![The image shows a dashboard for Elastic Cloud, featuring options for creating deployments, serverless projects, and accessing support, training, news, and community events.](https://kodekloud.com/kk-media/image/upload/v1752874202/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Setting-up-Free-Elastic-Cloud-Account/elastic-cloud-dashboard-options.jpg)

## Step 6: Accessing Kibana and Next Steps

1.  Click the **"Open"** button to launch your Kibana URL, where you can start monitoring and analyzing your data.
2.  The next step in this series will demonstrate how to integrate your Kubernetes cluster with Elastic Cloud to collect and forward Kubernetes metrics to Elasticsearch.

> [!important]
> **Upcoming Tutorial**
>
> In the next article, we will walk you through the process of integrating a Kubernetes cluster with Elastic Cloud for monitoring purposes. Stay tuned!

Thank you for following this guide. Enjoy exploring Elastic Cloud and the powerful observability tools it offers!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/be2630b4-1d09-403d-98f4-71c5ea9f2df7/lesson/c26fd8bf-a34f-4eab-bde3-91a541b4b10d)**
>
> Watch video content
