# Building Kibana Dashboards to Visualize Our Application Part 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Instrumenting-a-Simple-Python-App-for-Logging/Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-4)

---

## Table of Contents

- Building Kibana Dashboards to Visualize Our Application Part 4
  - Step 1: Deleting the Existing Elasticsearch Index
  - Step 2: Updating and Redeploying the Python Application in Kubernetes
  - Step 3: Verifying the Login Application
  - Step 4: Examining Structured Logs in Elasticsearch
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Instrumenting a Simple Python App for Logging

# Building Kibana Dashboards to Visualize Our Application Part 4

Welcome back! In this lesson, we will redeploy our Login App and observe how the enhanced logging from our improved login module is captured and visualized in Kibana.

─────────────────────────────────────────────

## Step 1: Deleting the Existing Elasticsearch Index

First, delete the current Elasticsearch index to ensure a clean slate:

1.  Open Elasticsearch and click on the three-line menu.
2.  Scroll down to "Stack Management."
3.  Select "Index Management," choose the relevant index, and click "Manage Index."
4.  Click the "delete index" option to remove the entire index.

> [!important]
> **Tip**
>
> If you only desire to remove the records while preserving the index structure, use the "flush index" option instead.

![The image shows the "Index Management" section of an Elasticsearch interface, displaying options for managing indices, including settings and actions like closing or deleting an index.](https://kodekloud.com/kk-media/image/upload/v1752874229/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-4/elasticsearch-index-management-interface.jpg)

─────────────────────────────────────────────

## Step 2: Updating and Redeploying the Python Application in Kubernetes

Switch over to your Kubernetes cluster and update the Python application deployment:

1.  **Check Cluster Status:**  
    Clear your screen and list the resources to verify the current state:

    ```
    kubectl get svc
    kubectl get pods
    kubectl logs -f fluent-bit-798s8
    ```

2.  **Update Deployment File:**  
    Open the YAML file for your Python application (e.g., `python-app-deployment.yaml`). Update the version number from 3 to 4 and ensure that the Docker image for version 4 is ready. Use the snippet below as a guide:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: simple-webapp-deployment
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: simple-webapp
      template:
        metadata:
          labels:
            app: simple-webapp
        spec:
          containers:
          - name: simple-webapp
            image: learnwithraghu/simple-login-page:v4
            volumeMounts:
            - mountPath: /log
              name: log-volume
          volumes:
          - name: log-volume
            hostPath:
              path: /var/log/webapp
              type: DirectoryOrCreate
    ```

3.  **Apply the Updated Deployment:**  
    Save your changes and apply the update:

    ```
    kubectl apply -f .
    ```

    This action will initiate the termination of the old pod and spin up a new pod automatically.

4.  **Restart Fluent Bit:**  
    To ensure Fluent Bit picks up logs from the new deployment, delete the existing Fluent Bit pod:

    ```
    kubectl delete pod fluent-bit-798s8
    kubectl get pods
    ```

─────────────────────────────────────────────

## Step 3: Verifying the Login Application

After updating the deployment, it's time to verify if the login functionality is working correctly:

1.  **Retrieve NodePort:**  
    Obtain the NodePort by checking the services:

    ```
    kubectl get svc
    ```

2.  **Test the Application:**  
    Open your browser and paste the NodePort URL:
    - **Successful Login:** Use the default credentials (Username: admin, Password: password) to log in.
    - **Failed Login:** Attempt to log in with an incorrect password to confirm that the application rejects invalid credentials.

─────────────────────────────────────────────

## Step 4: Examining Structured Logs in Elasticsearch

After verifying the login functionality, a new index is automatically created in Elasticsearch. Follow these steps to examine the structured logs:

1.  **Access the New Index:**  
    Click on the new index and then select "Discover Index."
2.  **Handle Temporary Errors:**  
    If you see an error message like the one below, simply navigate to "Analytics" and click "Discover" again: ![The image shows an Elastic search interface with an error message stating "Cannot retrieve search results" due to a field format issue.](https://kodekloud.com/kk-media/image/upload/v1752874231/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-4/elastic-search-error-message.jpg)

    > [!important]
    > **Attention**
    >
    > This error occurs when Elasticsearch is slow to interpret the time field in the log file. Revisiting "Discover" should resolve the issue.

3.  **Review Enhanced Logs:**  
    Notice that the logs are no longer lumped into a single "log" field. They are now distributed among 15 structured fields (including request method, remote address, time, logger, message, path name, etc.). This structure simplifies the exploration and analysis of log data in Kibana. It also paves the way to create interactive dashboards using Lens.

    ![The image shows an Elastic dashboard displaying log data with timestamps, log levels, and other details. It includes a graph and a list of documents with various fields like request methods and URLs.](https://kodekloud.com/kk-media/image/upload/v1752874233/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-4/elastic-dashboard-log-data-graph.jpg)

─────────────────────────────────────────────

With your system now ingesting structured logs, you're all set to build a practical dashboard in Kibana. Stay tuned for the next article where we will dive into creating comprehensive visualizations.

Thank you for following along!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/2c0792c4-1a21-404f-83e2-75698bc62fe0/lesson/84165845-413e-4e2f-9e11-600eeba44fb5)**
>
> Watch video content
