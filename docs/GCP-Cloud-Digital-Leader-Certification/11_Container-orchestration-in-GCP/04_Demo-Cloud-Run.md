# Demo Cloud Run - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Container-orchestration-in-GCP/Demo-Cloud-Run)

---

## Table of Contents

- Demo Cloud Run
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Container orchestration in GCP

# Demo Cloud Run

Welcome to this comprehensive lesson on deploying container images using Cloud Run on Google Cloud Platform (GCP). In this tutorial, you'll learn how to deploy a container image, configure autoscaling, monitor your service, and explore Kubernetes Engine (GKE) options for container orchestration.

After logging into your GCP Console, start by verifying that you are working in the correct project. Once confirmed, search for "Cloud Run."

![The image shows the Google Cloud Platform console with a welcome screen for the "KodeKloud-GCP-Training" project. It includes options for creating a VM, running a query in BigQuery, and quick access to various project resources.](https://kodekloud.com/kk-media/image/upload/v1752875208/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Cloud-Run/google-cloud-platform-kodekloud-training.jpg)

Since no services are listed, click on **"Create Service."** If prompted to activate the Cloud Run API, proceed with the activation. On the service creation page, provide the container image you wish to deploy. A demo container image is available by default for all projects.

Next, assign a service name and choose your desired region (the default option is used in this example). Configure the autoscaling settings by deciding whether to maintain a minimum of one container at all times or allow scaling down to zero when there is no traffic. You can also set a maximum limit; in this demonstration, the maximum is set to 200 containers—but feel free to adjust this as needed. For this demo, all traffic is allowed, and "Allow unauthenticated invocation" is selected. With all other settings left as default, click **"Create."**

![The image shows a Google Cloud Platform interface for creating a Cloud Run service, with options for container image URL, service name, region, CPU allocation, autoscaling, and ingress settings.](https://kodekloud.com/kk-media/image/upload/v1752875210/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Cloud-Run/google-cloud-run-service-creation.jpg)

The deployment process is impressively fast—your application is up and running in less than ten minutes. Return to the Cloud Run dashboard to review the deployed service, which displays details such as the number of incoming requests (currently zero), the region, and the deployer's identity. Click on your service to access its monitoring dashboard.

![The image shows a Google Cloud Console interface for Cloud Run, displaying details of a service revision named "my-service-00001-geb," including configuration settings like CPU allocation, concurrency, and autoscaling.](https://kodekloud.com/kk-media/image/upload/v1752875211/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Cloud-Run/google-cloud-console-cloud-run-service-details.jpg)

From the monitoring dashboard, you can track key performance metrics and view detailed information about your container. To access the live application, simply copy the provided URL and paste it into your web browser. This will load the demo website generated directly from the deployed Docker image.

> [!important]
> **Note**
>
> The Docker image you deployed contains the complete code for your web application, ensuring consistency across deployments.

![The image shows a congratulatory message for successfully deploying a container image to Cloud Run, with an illustration of people celebrating around a unicorn. It includes details about the deployment and options for next steps.](https://kodekloud.com/kk-media/image/upload/v1752875212/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Cloud-Run/cloud-run-deployment-celebration-unicorn.jpg)

If you ever need to remove the application, you can do so easily from the Cloud Run dashboard by selecting the service and choosing the delete option.

For those interested in container orchestration beyond Cloud Run, consider exploring [Google Kubernetes Engine (GKE)](https://learn.kodekloud.com/user/courses/gke-google-kubernetes-engine). Unlike Cloud Run, GKE is not a fully serverless solution but provides robust container orchestration using Kubernetes.

To get started with GKE, search for "Kubernetes Engine" in your GCP Console. If required, activate the GKE API—which may take up to five minutes before it becomes active. Once the API is enabled, click on **"Create a cluster."** You will be presented with two primary options: Autopilot and Standard.

- Autopilot mode manages most configuration settings for you, requiring only basic details like cluster name and network.
- Standard mode offers extensive customization options for more advanced deployment configurations.

![The image shows a Google Cloud Platform interface for creating a Kubernetes cluster, offering options for "Autopilot" and "Standard" cluster modes. The user can configure or compare these options.](https://kodekloud.com/kk-media/image/upload/v1752875213/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Demo-Cloud-Run/google-cloud-kubernetes-cluster-options.jpg)

> [!important]
> **Note**
>
> If you're new to GKE or GCP, Autopilot mode is recommended as it simplifies configuration and maintenance, allowing you to focus on developing your application.

When preparing for your GCP certification, keep in mind that the two primary container orchestration services to master are Cloud Run and GKE.

This concludes our lesson on deploying an application using Cloud Run and provides an overview of GKE cluster options. Thank you for following along, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/d639dd79-213a-4d3c-928f-7e6392a95b3c/lesson/e46e9caf-1a1b-42b1-8bfa-4c5d08fe2987)**
>
> Watch video content
