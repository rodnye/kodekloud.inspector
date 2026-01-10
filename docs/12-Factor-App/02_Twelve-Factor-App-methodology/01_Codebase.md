# Codebase - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Codebase)

---

## Table of Contents

- Codebase
  - A Simple Flask Example
  - The First Factor: One Codebase
  - Summary
  - Watch Video
    - Managing Multiple Applications

---

## Content

12 Factor App

Twelve Factor App methodology

# Codebase

In this article, we will explore the 12-Factor App methodology while demonstrating a simple example built with Python and the Flask web framework. These principles are designed to guide the development of scalable, resilient, and maintainable applications.

The 12 factors are as follows:

1.  Have one codebase.
2.  Explicitly declare and isolate dependencies.
3.  Store configuration in the environment.
4.  Treat backing services as attached resources.
5.  Strictly separate build and run stages.
6.  Execute the app as one or more stateless processes.
7.  Export services via port binding.
8.  Scale out via the process model.
9.  Maximize robustness with fast startup and graceful shutdown.
10. Keep development, staging, and production as similar as possible.
11. Treat logs as event streams.
12. Run admin or management tasks as one-off processes.

## A Simple Flask Example

We begin with a basic Flask application that displays a simple message when accessed via a browser. The entry point for our Flask app is the `app.py` file, which is responsible for handling all incoming and outgoing requests.

Below is the code for our simple Flask app:

```
from flask import Flask

app = Flask(__name__)

@app.route('/')
def welcomeToKodeKloud():
    return "Welcome to KODEKLOUD!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

When you run this application and navigate to its URL in your browser, the homepage will display the message "Welcome to KODEKLOUD!".

> [!important]
> **Note**
>
> At this stage, the code is stored only on your local machine.

## The First Factor: One Codebase

The first principle of the 12-Factor App methodology insists on maintaining a single codebase per application. This approach is essential as your user base expands and new features are added, especially when multiple developers are involved. Each developer works on their own local environment while committing changes to a central repository.

Without a proper version control system, concurrent modifications by different developers could lead to conflicts. This is where Git becomes invaluable. Git enables concurrent contributions to the same codebase by facilitating operations like pulling the latest changes with the `git pull` command, making local updates, and pushing new commits using `git push`.

The central repository is typically hosted on a cloud platform. For example, [GitHub](https://github.com) is a popular platform for hosting Git repositories, while [GitLab](https://about.gitlab.com) and [Bitbucket](https://bitbucket.org) offer similar solutions.

![The image shows a central folder icon connected to four laptops, each with a person, representing a shared network or collaborative workspace.](https://kodekloud.com/kk-media/image/upload/v1752856826/notes-assets/images/12-Factor-App-Codebase/frame_120.jpg)

### Managing Multiple Applications

Consider starting with an initial web application. Over time, you might expand your system by adding services such as order processing or delivery functionalities. In the past, it was common to maintain a single codebase for all related applications. However, once multiple services are deployed, the architecture becomes distributed, and sharing one codebase across multiple applications violates the 12-Factor App principles. Each application should reside in its own codebase.

![The image highlights that sharing code among multiple apps violates the twelve-factor app principles, with icons and a list of services showing recent updates.](https://kodekloud.com/kk-media/image/upload/v1752856828/notes-assets/images/12-Factor-App-Codebase/frame_200.jpg)

Within a single codebase, you can still deploy multiple instances of your application across various environments (such as development, staging, and production). This strategy ensures that while each application maintains its isolated codebase, you can manage multiple deployments seamlessly.

![The image depicts a deployment pipeline diagram with stages labeled "dev," "staging," and "prod," connected to a central icon representing a web application.](https://kodekloud.com/kk-media/image/upload/v1752856830/notes-assets/images/12-Factor-App-Codebase/frame_210.jpg)

This structure not only keeps your development process organized but also promotes consistency across different environments, allowing for smoother transitions between development, testing, and production stages.

## Summary

By following the principles outlined in the 12-Factor App methodology, you ensure that every aspect of your application—from a single codebase to distinct deployments across environments—is optimized for scalability and maintainability. Leveraging tools like Git further enhances collaborative development, helping you manage changes effectively as your application grows.

For more insights on scalable application design and best practices, explore our additional resources and documentation linked below.

- [Flask Documentation](https://flask.palletsprojects.com/)
- [GitHub Guides](https://guides.github.com/)
- [12 Factor App](https://12factor.net)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/6f65b08c-1493-48cc-8370-35966e64b410)**
>
> Watch video content
