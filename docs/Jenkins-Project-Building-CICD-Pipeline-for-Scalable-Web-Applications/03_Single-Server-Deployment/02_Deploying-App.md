# Deploying App - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Single-Server-Deployment/Deploying-App)

---

## Table of Contents

- Deploying App
  - Setting Up the Application Directory and Virtual Environment
  - Configuring the systemd Service
  - Reloading systemd and Starting the Service
  - Configuring Network Access
  - Summary
  - Watch Video
    - Explanation of the Service File

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Single Server Deployment

# Deploying App

Deploy your Flask application on a server before configuring a CI/CD pipeline. In this guide, you'll learn how to deploy a Flask application to an [AWS EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) (or a similar server). We will walk through setting up the application directory, creating a Python virtual environment, and configuring a systemd service to manage your app.

## Setting Up the Application Directory and Virtual Environment

Begin by connecting to your server and creating a dedicated folder for your application code. In this example, we use the default user `ec2-user` on an AWS EC2 instance:

```
# Create the application directory
mkdir /home/ec2-user/app
```

Next, navigate into the newly created directory and set up a Python virtual environment. This environment will isolate your application's dependencies:

```
# Change to the application directory
cd /home/ec2-user/app


# Create a Python virtual environment
python3 -m venv venv
```

> [!important]
> **Note**
>
> Using a virtual environment ensures that the package dependencies for your Flask application do not interfere with other applications on your server.

## Configuring the systemd Service

To ensure that your Flask application runs automatically and utilizes the virtual environment, create a systemd unit file. This file instructs systemd on how to manage your service. Follow these steps:

1.  Create a file named `flask-app.service` under `/etc/systemd/system`.
2.  Add the following content to the file:

```
[Unit]
Description=Flask App
After=network.target


[Service]
User=ec2-user
Group=ec2-user
WorkingDirectory=/home/ec2-user/app/
Environment="PATH=/home/ec2-user/app/venv/bin"
ExecStart=/home/ec2-user/app/venv/bin/python3 /home/ec2-user/app/app.py


[Install]
WantedBy=multi-user.target
```

### Explanation of the Service File

- **\[Unit\] Section**
  - **Description:** A brief description of the service.
  - **After=network.target:** Ensures the service starts only after the network is initialized, which is critical for web applications.

- **\[Service\] Section**
  - **User and Group:** The application runs under the `ec2-user` account. Adjust these values based on your server’s configuration.
  - **WorkingDirectory:** Specifies where the application code is located.
  - **Environment:** Sets the `PATH` to the virtual environment’s `bin` directory, ensuring the correct Python interpreter and dependencies are used.
  - **ExecStart:** Launches the application using the Python interpreter from the virtual environment.

- **\[Install\] Section**
  - **WantedBy=multi-user.target:** Configures the service to start when the system reaches the multi-user runlevel, which is standard for servers without a graphical interface.

> [!important]
> **Important**
>
> Make sure your `app.py` file is located in the `/home/ec2-user/app/` directory and that it is configured correctly to run your Flask application.

## Reloading systemd and Starting the Service

After creating or modifying your systemd service file, reload the systemd configuration, enable the service to launch on boot, and start the service immediately:

```
# Reload systemd configuration to include the new service file
sudo systemctl daemon-reload


# Enable the service to start on boot
sudo systemctl enable flask-app.service


# Start the Flask application service immediately
sudo systemctl start flask-app.service
```

## Configuring Network Access

Ensure that your server’s firewall or security groups (for AWS users) allow traffic on the application's designated port. For example, if your application listens on port 5000, make sure this port is open to allow external access.

> [!important]
> **Warning**
>
> If your server’s firewall or security groups are not configured correctly, the Flask application might not be accessible from outside, even if it is running.

## Summary

In this guide, you learned how to deploy your Flask application by:

- Setting up the application directory and Python virtual environment.
- Configuring a systemd service to automate the application startup.
- Reloading systemd and starting the service.
- Adjusting network access to allow incoming traffic.

Next, we will explore deploying the application on AWS and dive deeper into CI/CD pipeline integration for even smoother workflows.

For additional details on deploying Flask applications and automating deployments, visit the following resources:

- [AWS EC2 Documentation](https://aws.amazon.com/ec2/)
- [Flask Official Documentation](https://flask.palletsprojects.com/)
- [Systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/5fe5875c-d1e2-4f35-8161-af0830fe0deb/lesson/30c1074d-3562-41ee-9f7d-fe7738fb1df2)**
>
> Watch video content
