# Devops Tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Pre-Requisite-Course/Introduction/Devops-Tools)

---

## Table of Contents

- Devops Tools
  - From Idea to First Release
  - The Basic Workflow: Building and Deploying
  - Scaling Collaboration with Git and GitHub
  - Introducing CI/CD for Automated Deployments
  - Packaging with Containers
  - Scaling with Container Orchestration
  - Infrastructure as Code with Terraform
  - Post-Provisioning Configuration with Ansible
  - Monitoring Infrastructure with Prometheus and Grafana
  - Conclusion
  - Watch Video

---

## Content

DevOps Pre-Requisite Course

Introduction

# Devops Tools

When diving into DevOps, you encounter a diverse set of tools, including Docker, Kubernetes, Ansible, Terraform, Git, GitHub, Jenkins, Prometheus, and Grafana. Although this array of technologies might initially seem overwhelming, this guide walks you through a real-world scenario that demonstrates how each tool plays a crucial role as your application and infrastructure evolve.

## From Idea to First Release

Every great project starts with an idea—imagine building a website that books tickets to Mars, helping users avoid long queues and high prices. As with any innovative project, you start writing code. Hours later, the first version is ready. However, this version is running on your local machine, accessible via HTTP on localhost (port 8080):

```
def book_my_ticket_to_mars():
    # world changing code here


# starts here
if __name__ == '__main__':
    book_my_ticket_to_mars()
```

Running your application locally is ideal for early testing, but it won’t suffice when you need to share it with the world. To make your application accessible 24/7, you must deploy it on a server—whether it’s a physical machine, a virtual machine, or a cloud instance. Simply copying the code isn’t enough; the server also requires the correct runtime environment (like Python or Java) and all necessary libraries with the proper versions. Here, your laptop serves as the development environment, while the server becomes the production environment.

Once deployed, users can access your application using the server’s IP address. However, an IP address isn’t always user friendly. That’s why you purchase a domain name and map it to your server.

![The image contrasts development and production environments, showing local development on a laptop and production on servers, with different URLs and programming languages.](https://kodekloud.com/kk-media/image/upload/v1752873436/notes-assets/images/DevOps-Pre-Requisite-Course-Devops-Tools/frame_170.jpg)

## The Basic Workflow: Building and Deploying

Initially, your workflow consists of a few critical steps:

1.  Develop the code on your local machine using an editor like VS Code or PyCharm.
2.  Build the code by converting it into an executable format or binary (using tools such as Python setuptools, Maven, or Gradle).
3.  Deploy the built executable to your production server.

A build script is often used to automate the build process:

```
$ ./build.sh
$ ./app
```

## Scaling Collaboration with Git and GitHub

As your website gains popularity and your user base expands, you invite other developers to contribute. Each team member works on their local environment, which can lead to conflicts when multiple developers modify the same files. This is where Git, a version control system, becomes indispensable. It allows developers to pull the latest changes, merge their contributions, and push updates back to a shared repository.

Platforms like GitHub, GitLab, and Bitbucket act as cloud-based hubs that streamline code collaboration, version control, and project management. For example, common Git commands include:

```
$ git pull
$ git push
```

At this stage, while Git manages version control, GitHub provides a centralized repository along with a user-friendly interface for project management.

## Introducing CI/CD for Automated Deployments

With multiple developers continuously pushing new features and bug fixes, manually transferring code between environments is inefficient and prone to errors. A dedicated build server is implemented to fetch the latest code, build it, and deploy it first to a testing environment. After successful tests, the new build is moved to production.

> [!important]
> **CI/CD Benefits**
>
> Automating your deployment process reduces errors and accelerates feature delivery. Tools like Jenkins, GitHub Actions, and GitLab CI/CD enable continuous integration and deployment, facilitating multiple daily deployments and quicker feedback loops.

The automated pipeline typically works as follows:

- Code is pulled from the GitHub repository.
- The build server compiles the code.
- Automated tests run on the build.
- If tests pass, the executable is deployed to production.

![The image illustrates a CI/CD pipeline process using Jenkins, GitHub Actions, and GitLab CI/CD, showing stages of development, build, test, and deployment.](https://kodekloud.com/kk-media/image/upload/v1752873437/notes-assets/images/DevOps-Pre-Requisite-Course-Devops-Tools/frame_530.jpg)

## Packaging with Containers

Even with CI/CD automation, ensuring that applications run consistently across different environments requires precise dependency management. Manually installing every dependency on each server is inefficient and error-prone. Containers solve this problem by encapsulating your application and its dependencies in an image that can run uniformly across any system.

Docker is one of the most popular containerization technologies. Developers create a Dockerfile that describes the application environment. During the build process, Docker generates an image that can be deployed on any server:

```
$ vi Dockerfile
$ docker build -t mars_ticket_app .
$ docker run -d -p 80:80 mars_ticket_app
```

Containers also provide process isolation, allowing multiple containers to run on the same server without interference.

## Scaling with Container Orchestration

As user demand grows, you may need to run containers on several servers, a process that becomes challenging to manage manually. Container orchestration platforms like Kubernetes help automate tasks such as starting new containers when demand increases, shutting them down when demand decreases, and restarting failed containers. Kubernetes automatically scales and manages containerized applications, ensuring consistency and efficiency across your infrastructure.

A typical workflow in this scenario involves developers pushing code to GitHub, CI/CD pipelines building Docker images, testing the application, and finally Kubernetes deploying the containers to production.

## Infrastructure as Code with Terraform

Manually provisioning servers to ensure they all have the same configuration is a complex and error-prone task. To address this, tools like Terraform allow you to define your infrastructure as code. Using manifest files, Terraform provisions new servers with consistent configurations, such as operating system versions, storage, kernel settings, and container runtimes.

Below is an excerpt from a Terraform manifest that provisions three servers with identical configurations:

```
resource "aws_instance" "node01" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"


  tags = {
    Name = "controlplane"
  }
}


resource "aws_instance" "node02" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"


  tags = {
    Name = "worker01"
  }
}


resource "aws_instance" "node03" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"


  tags = {
    Name = "worker02"
  }
}
```

Modifications to your infrastructure are made in the Terraform code and applied with:

```
$ terraform apply
```

## Post-Provisioning Configuration with Ansible

Provisioning servers is only part of the equation. After your servers are up and running, they require further configuration—installing necessary software, configuring services, and adjusting system settings. Ansible automates these post-provisioning tasks through playbooks, which are version-controlled like any other code. While Terraform handles the provisioning, Ansible excels at configuring and managing software on your servers.

An example Ansible playbook for deploying a Kubernetes cluster might look like this:

```
---
# This playbook deploys the Kubernetes cluster.
- name: Apply common configuration to all nodes
  hosts: all
  remote_user: root
  roles:
    - common


- name: Configure and deploy the controlplane
  hosts: controlplane
  remote_user: root
  roles:
    - kubernetes_controlplane


- name: Configure and deploy worker nodes
  hosts: workers
  remote_user: root
  roles:
    - kubernetes_workers
```

## Monitoring Infrastructure with Prometheus and Grafana

Deploying and configuring your infrastructure is only half the battle; ongoing monitoring is essential to ensure everything runs smoothly. Prometheus gathers metrics such as CPU usage, memory consumption, and process statuses from your servers. Grafana then visualizes this data through dashboards, helping you quickly spot trends and potential issues.

![The image illustrates a CI/CD pipeline using Infrastructure as Code (IaC) with tools like Ansible, Terraform, Prometheus, and Grafana, showing development, build, test, and production stages.](https://kodekloud.com/kk-media/image/upload/v1752873438/notes-assets/images/DevOps-Pre-Requisite-Course-Devops-Tools/frame_940.jpg)

## Conclusion

This guide has taken you on a journey from your initial idea to a fully automated, scalable, and monitored production environment. By integrating development tools, CI/CD pipelines, containerization, orchestration, infrastructure provisioning, configuration management, and monitoring solutions, DevOps practices enable seamless transitions from concept to high-quality software delivery.

For further reading, explore these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

DevOps is the convergence of people, processes, and tools working in harmony to ensure that your software is deployed reliably and efficiently.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-pre-requisite-course/module/10cc998e-4162-40ec-be18-d26a77d7a474/lesson/dbafa3a2-d069-4c84-8977-d405f017bd04)**
>
> Watch video content
