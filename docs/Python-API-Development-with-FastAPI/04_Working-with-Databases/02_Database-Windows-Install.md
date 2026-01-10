# Database Windows Install - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Database-Windows-Install)

---

## Table of Contents

- Database Windows Install
  - Step 1: Locate the PostgreSQL Website
  - Step 2: Download the Windows Installer
  - Step 3: Run the Installer
  - Step 4: Configure the Database
  - Step 5: Complete the Installation
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Database Windows Install

This article demonstrates how to install PostgreSQL on a Windows machine with a step-by-step walkthrough. Follow the instructions below and refer to the accompanying images to guide you through the process.

## Step 1: Locate the PostgreSQL Website

Begin by opening your preferred web browser and searching for “PostgreSQL.” Typically, the PostgreSQL website appears as the first result. Click on the link that directs you to [PostgreSQL.org](https://www.postgresql.org).

![The image shows a Google search results page for "Postgres," featuring ads and a knowledge panel with information about PostgreSQL, including its description, release details, and related searches.](https://kodekloud.com/kk-media/image/upload/v1752883492/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/google-search-postgres-results.jpg)

## Step 2: Download the Windows Installer

Once on the PostgreSQL website, locate and click the **Downloads** button, and then select **Windows**. At the top of the Windows download page, click the link to download the installer.

![The image shows a webpage for downloading PostgreSQL Windows installers, detailing platform support for various PostgreSQL versions. It includes a table listing compatible Windows platforms for each version.](https://kodekloud.com/kk-media/image/upload/v1752883493/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/postgresql-windows-installers-download.jpg)

On the download page, you will find a list of available PostgreSQL versions. The latest version is currently 13.4, though you may choose a newer version if available. The installation process remains largely the same across versions. After the download is complete, run the installer. If a User Account Control (UAC) prompt appears, click **Yes** to proceed.

![The image shows a Windows User Account Control prompt asking for permission to allow the app "postgresql-13.4-1-windows-x64.exe" to make changes to the device. The options "Yes" and "No" are available for selection.](https://kodekloud.com/kk-media/image/upload/v1752883494/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/windows-uac-postgresql-prompt.jpg)

## Step 3: Run the Installer

When the installer opens, click **Next** on the welcome screen. The default installation directory is pre-selected; most users do not need to modify this path.

The installer then presents you with options for the components to install:

- **PostgreSQL Server**: The core database engine.
- **PgAdmin**: A graphical tool that simplifies managing your PostgreSQL instance. It is recommended to install PgAdmin for easier database administration.
- **Stack Builder**: An optional feature that assists in installing extensions and additional tools for PostgreSQL. For basic usage, you can leave this option checked.
- **Command Line Tools**: Essential for performing database operations via the command line. It is advisable to retain these tools for future tasks.

![The image shows a webpage from EDB with PostgreSQL tutorials and resources, and a setup window for selecting components to install PostgreSQL.](https://kodekloud.com/kk-media/image/upload/v1752883494/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/edb-postgresql-tutorials-setup.jpg)

Continue through the installer by accepting the default data directory settings.

## Step 4: Configure the Database

You will now be prompted to establish a password for the superuser account. Make sure to select a secure password and remember it for future use.

> [!important]
> **Note**
>
> Keep your superuser password secure as it is critical for managing your PostgreSQL instance.

Next, you will be asked to specify the port on which PostgreSQL will run. The default port is 5432. While you can change this port, it is recommended to use the default to avoid configuration complications.

![The image shows a webpage from EDB with PostgreSQL tutorials and resources, and a setup window prompting for a database password.](https://kodekloud.com/kk-media/image/upload/v1752883495/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/edb-postgresql-tutorials-setup-2.jpg)

![The image shows a webpage from EDB with PostgreSQL tutorials and resources, and a setup window prompting for a port number during installation.](https://kodekloud.com/kk-media/image/upload/v1752883496/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/edb-postgresql-tutorials-setup-port.jpg)

After verifying your settings, click **Next** to begin the installation process.

![The image shows a webpage from EDB with PostgreSQL tutorials and resources, and a setup window for PostgreSQL installation is open in the foreground.](https://kodekloud.com/kk-media/image/upload/v1752883497/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/edb-postgresql-tutorials-installation.jpg)

## Step 5: Complete the Installation

Once the installation is complete, click **Finish**. To manage your PostgreSQL instance, launch the PgAdmin application. You can locate PgAdmin by searching for it in the Windows start menu.

![The image shows a webpage from EDB offering PostgreSQL tutorials, resources, and training, with a Windows start menu open displaying the pgAdmin 4 app.](https://kodekloud.com/kk-media/image/upload/v1752883498/notes-assets/images/Python-API-Development-with-FastAPI-Database-Windows-Install/edb-postgresql-tutorials-pgadmin.jpg)

In the next part of this lesson, we will explore how to create individual database instances and tables using PgAdmin. This foundational knowledge will help you get started with database management and development using PostgreSQL on Windows.

Happy installing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/c48b3fdc-8de4-42c2-97e1-d4ce468fccc0)**
>
> Watch video content
