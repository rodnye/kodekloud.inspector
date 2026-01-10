# Setting Up Demo API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/Setting-Up-Demo-API)

---

## Table of Contents

- Setting Up Demo API
  - Repository Setup
  - Running the Demo API Lessons
  - Conclusion
  - Watch Video
    - Lesson One
    - Lesson Two

---

## Content

Postman Essentials

Postman Essentials

# Setting Up Demo API

In this guide, you'll learn how to set up and run a demo API built with Node.js. This demo API is part of a GitHub repository that contains several lesson folders, each demonstrating various Postman features through a simple API.

> [!important]
> **Prerequisite**
>
> Before starting, ensure you have Node.js installed on your computer. If you haven't installed it yet, please download the latest version (LTS or Current) from the [official Node.js website](https://nodejs.org/en/).

![The image shows a GitHub repository page for "kodekloudhub/postman" with files and folders listed, including a README.md file. The page also displays contributor information and indicates that the project is written in JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752882937/notes-assets/images/Postman-Essentials-Setting-Up-Demo-API/github-repo-kodekloudhub-postman.jpg)

## Repository Setup

Follow these steps to clone and install the repository:

1.  **Clone the Repository**  
    Copy the repository URL from GitHub and open your terminal. Then run:

    ```
    C:\Users\sanje\Documents\demo\postman>git clone https://github.com/kodeloudhub/postman.git
    Cloning into 'postman'...
    remote: Enumerating objects: 35, done.
    remote: Counting objects: 100% (35/35), done.
    remote: Compressing objects: 100% (20/20), done.
    Receiving objects: 80% (28/35) used 31 (delta 9), pack-reused 0
    Receiving objects: 100% (35/35), 49.51 KiB | 1.41 MiB/s, done.
    Resolving deltas: 100% (10/10), done.
    ```

2.  **Install Dependencies**  
    Change into the repository directory and install the required packages using NPM:

    ```
    C:\Users\sanje\Documents\demo\postman>npm install
    ```

![The image shows the Node.js download page, offering options to download the LTS and Current versions for Windows (x64). The page includes navigation links and information about supported releases.](https://kodekloud.com/kk-media/image/upload/v1752882939/notes-assets/images/Postman-Essentials-Setting-Up-Demo-API/nodejs-download-page-lts-current.jpg)

## Running the Demo API Lessons

The repository is organized into multiple lesson folders, each containing an `index.js` file that serves as the entry point for that lesson. Use the commands below to run the lessons on your local machine:

### Lesson One

To run Lesson One, navigate to its folder and execute:

```
node lesson/index.js
```

### Lesson Two

For Lesson Two, run the following command:

```
node lesson1/index.js
```

When you run Lesson Two, you will see output similar to:

```
Executing (default): SELECT 1+1 AS result
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): PRAGMA foreign_keys = OFF
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = ON
Executing (default): CREATE TABLE IF NOT EXISTS `Products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL UNIQUE, `price` FLOAT, `category` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Products`);
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Users`);
Connection has been established successfully.
listening on port 4000
```

Once the API is running and listening on port 4000, it means your server is active on your local machine.

> [!important]
> **Testing the API**
>
> You can validate the functioning of the API by running:
>
> ```
> curl localhost:4000
> ```
>
> If the API is working correctly, you’ll receive a response indicating success.

To stop the API at any time, press Ctrl+C in the terminal. You can then run another lesson by executing its corresponding command.

![The image shows a GitHub repository page for "kodekloudhub/postman" with files and folders listed, including "lesson1," "lesson2," and "lesson3." The repository is written in JavaScript and has contributors listed on the right.](https://kodekloud.com/kk-media/image/upload/v1752882940/notes-assets/images/Postman-Essentials-Setting-Up-Demo-API/kodekloudhub-postman-repo-files.jpg)

## Conclusion

By following these steps, you can easily set up and experiment with the Node.js demo API on your local environment. Enjoy exploring and learning about the API features across the various lessons!

For more information on working with Node.js and APIs, you might find these resources helpful:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Postman Learning Center](https://learning.postman.com/)
- [GitHub Guides](https://guides.github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/f83b17f0-17d3-4109-b93e-a5834803790f)**
>
> Watch video content
