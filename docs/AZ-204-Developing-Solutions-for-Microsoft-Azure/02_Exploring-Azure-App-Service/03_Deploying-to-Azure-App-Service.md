# Deploying to Azure App Service - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Azure-App-Service/Deploying-to-Azure-App-Service)

---

## Table of Contents

- Deploying to Azure App Service
  - Deployment Options
  - Example: Converting Manual Deployment to Automated Deployment
  - Other Deployment Options
  - Converting Manual Deployment to Automated Deployment with Azure DevOps
  - Next Steps
  - Watch Video
    - Automated Deployment
    - Manual Deployment
    - Sample HTML Template (Manual Deployment)
    - Deploying via VS Code with Azure App Service Extension
    - FTP/FTPS Deployment
    - Deploying with Azure CLI
    - Accessing the Kudu Portal

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Azure App Service

# Deploying to Azure App Service

In this guide, you'll learn how to deploy your application to Azure App Service. We cover the fundamentals, usage tiers, and the creation process via the Azure portal. Azure App Service supports two primary deployment methods—manual and automated—so you can choose the one that best fits your development workflow and desired level of control.

---

## Deployment Options

Azure App Service offers two deployment approaches:

- **Manual Deployment**: Upload and manage your application files directly.
- **Automated Deployment**: Integrate with CI/CD tools to automatically deploy code changes.

![The image illustrates the process of deploying to Azure App Service, showing two methods: manual deployment and automated deployment.](https://kodekloud.com/kk-media/image/upload/v1752866397/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-app-service-deployment-methods.jpg)

### Automated Deployment

Automated deployment leverages tools such as Azure DevOps, GitHub, or Bitbucket to manage and deploy your code changes. This continuous integration and continuous deployment (CI/CD) approach streamlines the update process, minimizes manual errors, and ensures that every commit results in a consistent deployment.

![The image illustrates automated deployment to an app service using Azure DevOps, GitHub, and Bitbucket.](https://kodekloud.com/kk-media/image/upload/v1752866399/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/automated-deployment-azure-devops.jpg)

### Manual Deployment

Manual deployment is ideal for initial setups or when you require granular control over the deployment process. Azure App Service provides several manual methods:

- **Git Deployment**: Push code directly to the Azure App Service Git repository.  
  ![The image is a diagram titled "Deploying to App Service," showing Git as a source for manual deployment.](https://kodekloud.com/kk-media/image/upload/v1752866401/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/deploying-to-app-service-git-diagram.jpg)
- **CLI Deployment**: Deploy applications from the command line using the Azure CLI.
- **Zip Deploy**: Package your application into a zip file and upload it.
- **FTP/FTPS Deployment**: Directly upload your application files via FTP/FTPS.

Additional tools such as Visual Studio and Visual Studio Code (with the App Service extension) also support direct deployment to Azure.

---

## Example: Converting Manual Deployment to Automated Deployment

Below is an example of a manual deployment process using Visual Studio Code with a free HTML template to illustrate the setup.

### Sample HTML Template (Manual Deployment)

```
<!DOCTYPE html>
<html lang="en-gb" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta name="author" content="WebThemez">
    <title>FREE HTML5 Bootstrap Coming Soon Template</title>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css" media="screen">
    <link rel="stylesheet" href="css/styles.css">
    <link href="font/css/font-awesome.min.css" rel="stylesheet">
  </head>
  <body>
    <nav id="mainNav">
      <div id="menuToggle"><i class="fa fa-bars"></i></div>
      <ul class="mnlinks">
        <li class="active" id="firstLink"><a href="home" class="scroll-Link">Home</a></li>
        <li class="services" class="scroll-Link">Services</li>
        <li id="aboutUs" class="scroll-Link">About Us</li>
        <li id="contactUs" class="scroll-Link">Contact Us</li>
      </ul>
    </nav>
    <header>
      <div id="top"></div>
      <section id="home">
        <div class="banner-container">
          <div class="container">
            <div class="row">
              <div class="logo"><img src="images/logo.png" alt="logo" /></div>
            </div>
          </div>
          <div class="heading text-center"></div>
        </div>
      </section>
    </header>
  </body>
</html>
```

You can download this free template online, develop your own HTML/CSS code, or use other free Bootstrap templates.

Below is another version of the template with minor differences:

```
<html lang="en-gb" class="no-js">
  <head>
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1" />
    <title>Await Free HTML5 Bootstrap Coming Soon Template</title>
    <meta name="description" content="">
    <meta name="author" content="WebThemez">
    <!--[if lt IE 8]>
      <script type="text/javascript" src="http://explorercanvas.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/animate.css" media="screen" />
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="font/css/font-awesome.min.css">
  </head>
  <body>
    <nav id="mainNav">
      <div id="menuToggle"><i class="fa fa-bars"></i></div>
      <ul class="menu-links">
        <li class="active" id="firstLink"><a href="#" class="scroll-link">Home</a></li>
        <li><a href="#services" class="scroll-link">Services</a></li>
        <li><a href="#aboutUs" class="scroll-link">About Us</a></li>
        <li><a href="#contactus" class="scroll-link">Contact Us</a></li>
      </ul>
    </nav>
    <div class="header"></div>
    <section id="banner-container">
      <div class="container">
        <div class="row">
          <div class="logo"><img src="images/logo.png" alt="logo" /></div>
        </div>
      </div>
    </section>
  </body>
</html>
```

### Deploying via VS Code with Azure App Service Extension

Before deploying via Visual Studio Code, install the Azure App Service extension, which uses Zip Deploy to package your directory into a zip file and push it to Azure.

1.  Open your project directory in VS Code.
2.  Launch the command palette by pressing Command+Shift+P (Mac) or Control+Shift+P (Windows).
3.  Search for and select "Deploy to Web App."
4.  Choose the folder that contains your project files (HTML, CSS, JavaScript, images, etc.).
5.  Select your Azure App Service instance.
6.  Click "Deploy" to start the process.

During deployment, your application files are packaged and pushed to the App Service. Once deployment is complete, refresh your browser to see your updated web page.

![The image shows a Microsoft Azure portal interface displaying details of a web app named "az204demoapp01." It includes information about the app's resource group, status, location, and other properties.](https://kodekloud.com/kk-media/image/upload/v1752866409/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-portal-web-app-details.jpg)

> [!important]
> **Deployment Tip**
>
> Before deploying, ensure your project folder is free of unnecessary files to optimize the deployment package.

---

## Other Deployment Options

### FTP/FTPS Deployment

To deploy via FTP/FTPS, navigate to the Deployment Center in the Azure portal to retrieve your FTPS credentials. Use these credentials to securely upload your files. Remember to enable FTP authentication in the configuration settings.

![The image shows a Microsoft Azure Deployment Center interface for a web app, displaying FTPS credentials settings with fields for username and password. An alert indicates that FTP authentication is disabled for the app.](https://kodekloud.com/kk-media/image/upload/v1752866411/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-deployment-center-ftps-settings.jpg)

### Deploying with Azure CLI

For a command-line deployment, package your application as a zip file and run:

```
az webapp deploy --resource-group <group-name> --name <app-name> --src-path <zip-package-path>
```

This command deploys your zip package to the specified App Service. You can also deploy WAR or JAR files similarly:

```
az webapp deploy --resource-group <group-name> --name <app-name> --src-path ./<package-name>.war
```

Other deployment methods include using individual script files, Azure PowerShell, Kudu API, or Azure ARM templates.

### Accessing the Kudu Portal

The Kudu portal provides advanced management features, such as file upload/download and direct modifications using PowerShell. To access Kudu:

1.  Open the App Service overview in the Azure portal.
2.  Click on "Advanced Tools" or modify the URL by inserting "SCM."
3.  Use PowerShell commands (e.g., `ls`) within Kudu to explore directories.

Example PowerShell output:

```
PS C:\home> ls
```

To change directories and view site files:

```
Directory: C:\home\site\wwwroot
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        9/1/2024   9:46 AM                .vscode
d-----        9/1/2024   9:46 AM                css
d-----        9/1/2024   9:46 AM                font
d-----        9/1/2024   9:46 AM                images
d-----        9/1/2024   9:46 AM                js
-a----        10/23/2017 12:19 AM      8252 index.html
-a----        2/24/2016  11:02 AM      3596 LICENSE.txt
-a----        6/10/2016  5:11 PM       425 README.txt


PS C:\home\site\wwwroot>
cd 'C:\'
PS C:\>
```

By clicking the pencil icon next to a file (e.g., "index.html") in the Kudu portal, you can directly edit files.

---

## Converting Manual Deployment to Automated Deployment with Azure DevOps

Automated deployments ensure that every change pushed to your source control is immediately deployed to Azure App Service. Follow these steps to configure automated deployment with Azure DevOps:

1.  **Initialize Your Repository in VS Code**
    - Clone your Azure DevOps repository.
    - Copy your local files into the repository and perform an initial commit (e.g., labeled "init").

Below is an excerpt from your HTML file in the repository:

```
<!DOCTYPE html>
<html lang="en-gb" class="no-js">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Await Free HTML5 Bootstrap Coming Soon Template</title>
    <meta name="description" content="">
    <meta name="author" content="WebThemez">
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/animate.css" rel="stylesheet" media="screen" />
    <link rel="stylesheet" href="css/styles.css" />
    <link href="font/css/font-awesome.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="mainNav">
      <div id="menuToggle"><i class="fa fa-bars"></i></div>
      <ul class="menulinks">
        <li class="active" id="firstLink"><a href="#" class="scroll-link">Home</a></li>
```

2.  **Commit and Sync Your Changes**
    - After updating your site design or content, commit and push your changes within VS Code.

An example commit change might look like:

```
<!DOCTYPE html>
<html lang="en-gb">
  <head>
    <title class="no-js"></title>
  </head>
  <body>
    <div id="menuToggle" class="fa fa-bars"></div>
    <ul>
      <li class="active" id="firstLink"><a href="#home" class="scroll-Link">Home</a></li>
      <li id="services" class="scroll-Link">Services</li>
      <li id="aboutUs" class="scroll-Link"><a href="#aboutUs">About Us</a></li>
      <li id="contactUs" class="scroll-Link">Contact Us</li>
    </ul>
    <div id="top">
      <section id="home">
        <div class="banner-container">
          <div class="container">
            <div class="row">
              <div class="logo"><img src="images/logo.png" alt="logo" /></div>
            </div>
          </div>
          <div class="heading text-center">
            <h2>We are Working on our New Learning Website!</h2>
            <strong>Stay tuned for something amazing!</strong>
          </div>
        </div>
      </section>
      <section id="services" class="page-section color">
        <div class="container">
          <div class="row">
            <div class="col-md-3 text-center">
              <i class="fa fa-arrows fa-2x circle"></i>
              <h3>Responsive <span class="id-color">Design</span></h3>
              <p>Nullam ac rhoncus sapien, non gravida purus. Alinam elit imperdiet congue. Integer elit.</p>
            </div>
          </div>
        </div>
      </section>
  </body>
</html>
```

3.  **Configure the Deployment Center in Azure**
    - In the Azure portal, navigate to your App Service's Deployment Center.
    - Select Azure Repos as your source control.
    - Choose the organization, project, repository, and branch (typically the main branch).
    - Enable the necessary settings (such as SCM basic authentication) and save. Note that this may restart your application.

![The image shows an Azure DevOps interface displaying a repository's file structure and details, including folders like "css," "font," "images," and "js," along with files such as "index.html" and "README.md." The right panel contains sections for "Introduction," "Getting Started," "Build and Test," and "Contribute."](https://kodekloud.com/kk-media/image/upload/v1752866413/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-devops-repository-file-structure.jpg)

4.  **Trigger Automated Deployment**
    - Once configured, every new commit will trigger an automated deployment. Monitor the deployment logs in the Deployment Center.

![The image shows the Microsoft Azure Deployment Center interface for a web app, with settings for deploying code from Azure Repos. It includes options for selecting the organization, project, repository, and branch.](https://kodekloud.com/kk-media/image/upload/v1752866415/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-deployment-center-web-app.jpg)

- After a successful deployment, refresh the App Service overview to verify that your changes are live.

![The image shows the Microsoft Azure Deployment Center interface, displaying deployment logs and details for a web app, including commit information and activity logs.](https://kodekloud.com/kk-media/image/upload/v1752866417/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Deploying-to-Azure-App-Service/azure-deployment-center-logs-web-app.jpg)

> [!important]
> **Automated Deployment Advantage**
>
> Automated deployments not only streamline the release process but also enable rapid rollback and improve quality assurance by integrating with continuous testing.

---

## Next Steps

Now that you understand both manual and automated deployment methods for Azure App Service, explore the next steps to secure your applications by implementing authentication and authorization.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/94d21b81-de82-4d33-a347-4404baa9f869/lesson/da757363-8fda-4bb2-86ed-3adae90c6f3f)**
>
> Watch video content
