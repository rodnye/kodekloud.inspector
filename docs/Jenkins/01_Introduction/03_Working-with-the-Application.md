# Working with the Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Introduction/Working-with-the-Application)

---

## Table of Contents

- Working with the Application
  - Running Tests in VS Code
  - The Challenges of Manual Testing
  - Visualizing the API with Swagger
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Introduction

# Working with the Application

Before diving into [Jenkins](https://learn.kodekloud.com/user/courses/jenkins), let's get the GoWebApp up and running locally. Begin by cloning the sample repository from GitHub, then launch the application with the following command:

```
go run main.go
```

This command executes the main Go configuration at the repository's root. When the application starts successfully, you will see output similar to:

```
2022-02-24T09:50:50.256-0500  DEBUG   logger/gormlogger.go:58 [gorm] INSERT INTO `category_master` (`name`) VALUES ("Technical Book")
2022-02-24T09:50:50.257-0500  DEBUG   logger/gormlogger.go:58 [gorm] INSERT INTO `category_master` (`name`) VALUES ("Magazine")
2022-02-24T09:50:50.257-0500  DEBUG   logger/gormlogger.go:58 [gorm] INSERT INTO `category_master` (`name`) VALUES ("Novel")
2022-02-24T09:50:50.257-0500  DEBUG   logger/gormlogger.go:58 [gorm] INSERT INTO `format_master` (`name`) VALUES ("Paper Book")
2022-02-24T09:50:50.258-0500  DEBUG   logger/gormlogger.go:58 [gorm] INSERT INTO `format_master` (`name`) VALUES ("E-Book")
2022-02-24T09:50:50.339-0500  INFO    go-webapp-sample/main.go:42 Served the static contents.
```

Open your web browser and navigate to [http://localhost:8080](http://localhost:8080). You should see the application running on port 8080. Log in using your provided credentials to confirm that your session is active.

Next, test the API endpoints:

- Access the books API:

  ```
  /api/books
  ```

  ![The image shows a browser with the address bar displaying "localhost:8080/a" and a dropdown of suggested URLs related to local API endpoints.](https://kodekloud.com/kk-media/image/upload/v1752880072/notes-assets/images/Jenkins-Working-with-the-Application/frame_60.jpg)

  This endpoint retrieves information about the books available in the application.

- Check your login status:

  ```
  /api/login/status
  ```

  The response will be similar to:

  ```
  {
    "content": null,
    "last": false,
    "totalElements": 0,
    "totalPages": 0,
    "size": 0,
    "page": 0,
    "numberOfElements": 0
  }
  ```

  This confirms that your login session is active.

## Running Tests in VS Code

Switch back to VS Code and observe the terminal output to see API requests being processed by the application. Instead of manually testing each endpoint, run the automated tests available in the Jenkins Controller directory. Open a new VS Code terminal and execute:

```
go test -v .
```

This command runs all tests in the controller directory. A successful test run will display output indicating that all tests have passed, with status codes (such as 200 for GET requests) confirming that the APIs responded correctly. For example:

```
2022-02-24T09:06:31.517-0500 DEBUG middleware/middleware.go:89 /api/books Action Start
2022-02-24T09:06:31.518-0500 DEBUG logger/gorm/logger.go:58 [gorm] select b.*, c.id as category_id, c.name as category_name, f.id as format_id, f.name as format_name from book b inner join category_master c on c.id = b.category_id inner join format_master f on f.id = b.format_id where title like "%"
2022-02-24T09:06:31.519-0500 DEBUG middleware/middleware.go:93 /api/books Action End
2022-02-24T09:06:33.235-0500 INFO  middleware/middleware.go:89 ::1 test /api/books GET 200
```

> [!important]
> **Tip**
>
> Integrating tests in your CI/CD pipeline can save you time by automatically running these tests during every code change.

## The Challenges of Manual Testing

Manually starting the application, opening a browser, and testing each API endpoint can be tedious—especially when small changes require repeated tests. This process is inefficient for DevOps engineers.

![The image shows a Visual Studio Code interface with a file explorer and terminal displaying debug logs for a Go web application project.](https://kodekloud.com/kk-media/image/upload/v1752880073/notes-assets/images/Jenkins-Working-with-the-Application/frame_170.jpg)

Instead, automating tests via a CI/CD pipeline with [Jenkins](https://learn.kodekloud.com/user/courses/jenkins) streamlines this process. In a CI pipeline, commands like "go test -v ." are executed automatically, promptly identifying any failures. Here’s an example of test output from a CI process:

```
2022-02-24T09:03:48.840-0500 INSERT INTO `authority_master` (`name`) VALUES ("Admin")
2022-02-24T09:03:48.918-0500 INSERT INTO `account_master` (`name`, `password`, `authority_id`) VALUES ("test","$2a$10$3G6WYAc16myvMw/nNlozewm62zjLYvwghQ.kBKRBdOu3y5goN/Y",1)
2022-02-24T09:03:48.918-0500 INSERT INTO `category_master` (`name`) VALUES ("Technical Book")
2022-02-24T09:03:48.918-0500 INSERT INTO `category_master` (`name`) VALUES ("Magazine")
2022-02-24T09:03:48.918-0500 INSERT INTO `category_master` (`name`) VALUES ("Novel")
2022-02-24T09:03:48.918-0500 INSERT INTO `format_master` (`name`) VALUES ("Paper Book")
2022-02-24T09:03:48.918-0500 INSERT INTO `format_master` (`name`) VALUES ("eBook")
PASS: TestGetHealthCheck (0.08s)
ok      github.com/ybkuroki/go-webapp-sample/controller (cached)
```

By integrating tests with Jenkins, you eliminate the need for manual testing, ensuring consistent and reliable API validation.

> [!important]
> **Important**
>
> Always verify that your CI/CD pipeline is running tests automatically after every change to catch any issues early.

## Visualizing the API with Swagger

The application includes a Swagger API interface that documents all available endpoints. To explore the API visually, navigate to:

```
/swagger/index.html
```

This Swagger UI displays detailed information about each API endpoint such as GET, POST, PUT, and DELETE methods, making it an invaluable resource during development and debugging.

![The image shows a Swagger UI interface displaying API endpoints for authentication, book management, and categories, with methods like GET, POST, PUT, and DELETE.](https://kodekloud.com/kk-media/image/upload/v1752880074/notes-assets/images/Jenkins-Working-with-the-Application/frame_290.jpg)

That concludes this article. Now, it's time to practice what you've learned and enhance your development workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/5a828d07-ced8-44a3-8b8d-f2467f247360/lesson/14d43374-e4d6-42bf-9c2f-968d2f26e985)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/5a828d07-ced8-44a3-8b8d-f2467f247360/lesson/676b9040-7278-403f-a1a4-8de0fa5dc83c)**
>
> Practice lab
