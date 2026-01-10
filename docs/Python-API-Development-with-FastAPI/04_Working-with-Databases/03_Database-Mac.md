# Database Mac - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Database-Mac)

---

## Table of Contents

- Database Mac
  - Step 1: Download PostgreSQL for macOS
  - Step 2: Install PostgreSQL on Your Mac
  - Step 3: Configure PostgreSQL
  - Step 4: Launch and Manage PostgreSQL with pgAdmin
  - Watch Video

---

## Content

Python API Development with FastAPI

Working with Databases

# Database Mac

In this article, we will guide you through the installation of PostgreSQL on a macOS machine. Follow these steps to download, install, and set up PostgreSQL, one of the most robust and popular open-source databases available.

## Step 1: Download PostgreSQL for macOS

Start by searching for PostgreSQL using your favorite search engine. The top result should lead you to the official PostgreSQL website. Once there, navigate to the Downloads section where you'll find a list of supported platforms. For macOS users, click on the macOS installer option.

When you click the macOS installer, you will see multiple available versions:

![The image shows a macOS desktop with a Safari browser window open to a PostgreSQL download page and a Finder window displaying Python-related files.](https://kodekloud.com/kk-media/image/upload/v1752883476/notes-assets/images/Python-API-Development-with-FastAPI-Database-Mac/macos-safari-postgresql-python-files.jpg)

Download the latest stable version available. For example, version 13.4 might be the most recent release at the time of writing. If you view this article at a later date, the version number may have changed; however, the installation procedure will remain similar.

![The image shows a computer desktop with a web browser open to a PostgreSQL database download page, alongside a file explorer window displaying Python-related files.](https://kodekloud.com/kk-media/image/upload/v1752883481/notes-assets/images/Python-API-Development-with-FastAPI-Database-Mac/postgresql-database-python-files-desktop.jpg)

## Step 2: Install PostgreSQL on Your Mac

After downloading the installer, locate and open the DMG file to start the installation process. If prompted with a security warning, click "Open" and enter your administrator password when requested.

The installer window will appear with an option to click "Next." You should retain the default installation directory. The installer provides four different components by default:

1.  **PostgreSQL Server:** The core database engine that you need to run your database.
2.  **pgAdmin:** A Graphical User Interface (GUI) tool for managing your PostgreSQL databases. For ease of management, it is recommended to install this component.
3.  **Stack Builder:** An optional tool designed to install additional extensions to enhance PostgreSQL functionality. You may uncheck this option if not required.
4.  **Command Line Tools:** Tools for managing PostgreSQL via the terminal. Although this article primarily focuses on the GUI, installing these tools can be beneficial for advanced configuration and future use.

![The image shows a macOS desktop with a PostgreSQL installation window open, displaying component selection options. In the background, a browser window is open on the PostgreSQL download page.](https://kodekloud.com/kk-media/image/upload/v1752883482/notes-assets/images/Python-API-Development-with-FastAPI-Database-Mac/macos-postgresql-installation-window.jpg)

> [!important]
> **Note**
>
> If you plan to work extensively with PostgreSQL commands, consider installing the Command Line Tools along with pgAdmin for additional flexibility.

## Step 3: Configure PostgreSQL

Proceed with the installation by choosing a default data directory and setting up a password for your PostgreSQL instance. This password functions similarly to a root password and is necessary for administrative access to your database.

![The image shows a macOS desktop with a PostgreSQL installation process in progress, including a password setup window and a browser page with PostgreSQL resources.](https://kodekloud.com/kk-media/image/upload/v1752883483/notes-assets/images/Python-API-Development-with-FastAPI-Database-Mac/macos-postgresql-installation-process.jpg)

You will also be prompted to specify a port for your PostgreSQL instance. The installer pre-configures a default port. While it's possible to change this, ensure that any subsequent configurations (for example, API connections) reference this port appropriately. It is generally recommended to keep the default setting.

Continue clicking "Next" until the installation process begins. Once the installation is complete, click "Finish" to exit the installer. At this point, PostgreSQL is successfully installed on your Mac.

## Step 4: Launch and Manage PostgreSQL with pgAdmin

To manage your database, launch pgAdmin—a powerful GUI tool for interacting with PostgreSQL. Use the macOS search feature to locate and open "pgAdmin." This tool will be your primary interface for managing PostgreSQL throughout this guide.

![The image shows a Mac desktop with multiple windows open, including a search for "pgAdmin 4.app" and a webpage about PostgreSQL resources.](https://kodekloud.com/kk-media/image/upload/v1752883484/notes-assets/images/Python-API-Development-with-FastAPI-Database-Mac/mac-desktop-pgadmin-postgresql.jpg)

> [!important]
> **Next Steps**
>
> This guide has covered the PostgreSQL installation process. In the next sections, we will explore how to perform basic database management tasks using pgAdmin.

This concludes the PostgreSQL installation process on macOS. Enjoy working with your new PostgreSQL database and refer to additional PostgreSQL documentation for advanced configurations and management tips.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/5eebd698-bbb4-4968-a43e-205932b44d85)**
>
> Watch video content
