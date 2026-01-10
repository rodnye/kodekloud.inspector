# APPENDIX B Pre Requisite CICD - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Conclusion-and-APPENDIX/APPENDIX-B-Pre-Requisite-CICD)

---

## Table of Contents

- APPENDIX B Pre Requisite CICD
  - Packaging Your Application
  - Overcoming Manual Setup Challenges
  - Leveraging Docker for Automation
  - Understanding the Build Pipeline
  - CI/CD Pipeline Demo
  - Watch Video

---

## Content

OpenShift 4

Conclusion and APPENDIX

# APPENDIX B Pre Requisite CICD

Welcome to this comprehensive guide on CI/CD builds. In this article, we provide an introduction to continuous integration and continuous delivery (CI/CD) using [Docker for Beginners](https://learn.kodekloud.com/user/courses/labs-docker-for-the-absolute-beginners). Whether you are new to these concepts or have some experience, this guide will help you understand how to package, test, and deploy applications efficiently. For those familiar with these topics, you may also explore their application in [OpenShift](https://learn.kodekloud.com/user/courses/openshift-4).

## Packaging Your Application

After building your application and uploading your code to a source repository, the next step is packaging it for deployment. Consider the following examples:

- **Java Application:**  
  The application is compiled into a JAR, EAR, or WAR file. In our demo, the Java application is packaged as `app.jar`. You can run it using:

  ```
  java -jar app.jar
  ```

- **Python Application:**  
  Package using tools like `distutils` to create a compressed file that can be installed with pip:

  ```
  pip install app.tar.gz
  ```

- **Ruby Application:**  
  Package into a gem file for distribution:

  ```
  gem install app.gem
  ```

> [!important]
> **Note**
>
> For a consolidated view, here are the packaging commands for different types of applications:

## Overcoming Manual Setup Challenges

After packaging, running the application on a host often requires additional setup tasks such as:

- Installing the required application platform (e.g., Apache Tomcat for Java or the Python interpreter).
- Installing and configuring additional dependencies.
- Modifying configuration files and setting up system services.
- Starting the application services.

These manual steps can lead to misconfigurations or inconsistent behavior across different environments.

## Leveraging Docker for Automation

To eliminate these risks, all instructions and dependencies are encapsulated into a Docker image using a Dockerfile. This approach not only streamlines the deployment process but also ensures consistency across environments. Use the following commands to build and run your Docker image:

```
docker build Dockerfile
docker run app
```

Once built, the Docker image undergoes automated testing using frameworks like Robot Framework or Selenium. These tests run predefined cases to validate that the application functions as expected. After successful tests, the image is released to consumers via a Docker repository, such as Docker Hub. Consumers can then deploy the image on container hosting and orchestration platforms like Kubernetes or other PaaS/CaaS solutions.

## Understanding the Build Pipeline

The entire process from committing code, building a Docker image, testing it, releasing it on Docker Hub, and deploying it in production constitutes the build pipeline. Automation tools such as [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) or Bamboo drive continuous integration and continuous delivery (or deployment).

The following image illustrates a typical build pipeline that includes stages like source code management, build, test, release, and deploy. It also highlights the use of industry-standard tools like Docker, Jenkins, and Kubernetes.

![The image illustrates a build pipeline process involving stages like source code, build, test, release, and deploy, using tools such as Docker, Jenkins, and Kubernetes. It highlights continuous integration, delivery, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752882627/notes-assets/images/OpenShift-4-APPENDIX-B-Pre-Requisite-CICD/build-pipeline-continuous-integration.jpg)

## CI/CD Pipeline Demo

Let’s move on to a practical demo where we add a Dockerfile to our application and configure a simple CI/CD pipeline. This demo, based on the course [GitLab CI/CD: Architecting, Deploying, and Optimizing Pipelines](https://learn.kodekloud.com/user/courses/gitlab-ci-cd-architecting-deploying-and-optimizing-pipelines), will walk you through the key stages:

- Source Code Management
- Automated Builds
- Testing
- Release
- Deployment

Each stage uses industry-standard tools to ensure a robust and streamlined CI/CD workflow.

> [!important]
> **Next Steps**
>
> Explore additional resources such as [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/) for further insights into containerization and orchestration.

That’s it for this article. Stay tuned for the next lesson where we dive deeper into CI/CD practices and further automation strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/d84e1350-21eb-421e-87d0-2d7bf019360f/lesson/a0a57a2e-a3ff-424d-93ef-f4d309ecc6a5)**
>
> Watch video content
