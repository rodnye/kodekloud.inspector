# ArgoCD Walkthrough - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Application-Delivery/ArgoCD-Walkthrough)

---

## Table of Contents

- ArgoCD Walkthrough
  - Creating a New Application
  - Conclusion
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Application Delivery

# ArgoCD Walkthrough

In this guide, we will explore the Argo CD user interface and demonstrate how to integrate your Kubernetes manifest repository with Argo CD for continuous deployment.

> [!important]
> **Prerequisites**
>
> Ensure that Argo CD is installed and you are logged into the UI. For installation and configuration details, refer to our [BA - Gitops with Argo CD](https://learn.kodekloud.com/user/courses/bah-gitops-workshop) course.

## Creating a New Application

Follow these steps to set up a new application in Argo CD:

1.  **Open the New Application Dialog**  
    Click on the **New App** button located in the upper left corner of the interface.
2.  **Application Details Pop-up**  
    A pop-up window will prompt you to provide the following details for your Argo CD application:
    - **Application Name and Project Name:**  
      Enter the desired names.
    - **Source Section:**
      - Specify the repository URL for your Kubernetes manifest files to establish the connection between your repository and Argo CD.
      - Optionally, set a specific revision; by default, Argo CD monitors the HEAD revision.
      - Define the path to the folder containing the YAML files within your repository.

3.  **Configure the Destination**  
    Set up where the deployment will be applied by providing:
    - **Cluster URL:** Provide the URL of the Kubernetes cluster for applying changes.
    - **Target Namespace:** Enter the namespace within the cluster where the application will be deployed.

4.  **Additional Settings (Optional)**
    - Click on the **Edit as YAML** button to view or modify advanced configuration options.
    - Enable the **Self-Heal** feature by setting it to true. This option allows Argo CD to automatically apply changes from your GitOps repository to the cluster, ensuring an automated continuous deployment process.

5.  **Review and Create**  
    After supplying the Git repository URL, setting the CD pipeline Argo repo URL, selecting the cluster (typically `kubernetes.default.svc`), and specifying the namespace (such as `default`), review all application details.  
    When you are satisfied with the configuration, click on the **Create** button to finalize the setup.

## Conclusion

You have now successfully integrated your GitOps repository with Argo CD, enabling an automated continuous deployment pipeline. Enjoy the benefits of streamlined deployments and reduced manual intervention!

For further reading and related resources, visit:

- [Argo CD Documentation](https://argo-cd.readthedocs.io/)
- [GitOps Fundamentals](https://www.weave.works/technologies/gitops/)

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/7221af3a-169a-4c55-bc00-b7b40e1dceda/lesson/4ee7d9b2-7632-4060-bc0b-a950a191f978)**
>
> Watch video content
