# HTTP verbs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/HTTP-verbs)

---

## Table of Contents

- HTTP verbs
  - GET Method
  - POST Method
  - PUT Method
  - DELETE Method
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# HTTP verbs

In this guide, we build a fully-fledged RESTful API that supports GET, POST, PUT, and DELETE operations—enabling complete CRUD (Create, Read, Update, Delete) functionality. Although this might seem complex at first, we will break down and implement each concept step by step.

HTTP defines several request methods to determine the action to be taken for a given resource. While these methods are sometimes seen as mere nouns, they are conventionally known as HTTP verbs. Below, we explore some of the most commonly used HTTP verbs:

## GET Method

The GET method is used to request a representation of a specified resource. Endpoints defined with GET should strictly retrieve data without causing any side effects, ensuring safe and idempotent operations.

![The image is a slide explaining the GET method in HTTP, stating that it requests a representation of a specified resource and should only retrieve data.](https://kodekloud.com/kk-media/image/upload/v1752868679/notes-assets/images/Advanced-Golang-HTTP-verbs/http-get-method-explanation-slide.jpg)

> [!important]
> **Important**
>
> Ensure that GET requests do not alter the resource state on the server.

## POST Method

The POST method allows you to submit data to a specified resource. This operation often results in the creation of a new resource or triggers a change in the server's state. In the context of CRUD, POST is typically associated with the "create" action.

![The image is a slide explaining the POST method, stating that it submits an entity to a specified resource, often causing a change in state or side effects on the server.](https://kodekloud.com/kk-media/image/upload/v1752868679/notes-assets/images/Advanced-Golang-HTTP-verbs/post-method-explanation-slide.jpg)

## PUT Method

The PUT method is designed to update a resource. It replaces all current representations of the target resource with the data provided in the request payload. Use PUT when you need to perform full updates to existing resources.

![The image is a slide explaining the PUT method in HTTP, stating that it replaces all current representations of the target resource with the request payload.](https://kodekloud.com/kk-media/image/upload/v1752868680/notes-assets/images/Advanced-Golang-HTTP-verbs/http-put-method-explanation-slide.jpg)

> [!important]
> **Tip**
>
> When updating partial resources, consider using the PATCH method instead of PUT for efficiency.

## DELETE Method

The DELETE method allows for the removal of a specified resource from the server. This operation is essential for managing data lifecycle and cleaning up unnecessary resources.

![The image is a slide explaining the DELETE method, stating that it deletes the specified resource.](https://kodekloud.com/kk-media/image/upload/v1752868681/notes-assets/images/Advanced-Golang-HTTP-verbs/delete-method-resource-explanation.jpg)

For this project, we will focus on implementing these four HTTP methods—GET, POST, PUT, and DELETE—to perform the necessary CRUD operations effectively. This modular approach ensures that your API adheres to RESTful principles while providing a solid foundation for future expansion.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/22c37a9c-6fc6-45e3-ace5-e35bca51308b)**
>
> Watch video content
