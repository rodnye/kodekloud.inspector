# CI CD Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/CICD/CI-CD-Basics)

---

## Table of Contents

- CI CD Basics
  - What is CI/CD?
  - Our Current Manual Process
  - Transition to an Automated CI/CD Pipeline
  - Popular CI/CD Tools
  - Understanding CI/CD Tools
  - Example: GitHub Actions Configuration
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

CICD

# CI CD Basics

In this article, we explore the benefits of a CI/CD pipeline and compare it to our traditional manual process for deploying code changes to production. By automating these tasks, you can speed up your development cycle and reduce the chances of human error.

## What is CI/CD?

CI/CD stands for Continuous Integration and Continuous Delivery.

- **Continuous Integration** is the automated process of building, packaging, and testing your application.
- **Continuous Delivery** automatically deploys the latest tested code to your production environment, ensuring your live system is always up-to-date.

> [!important]
> **Key Insight**
>
> Automating your deployment process with a CI/CD pipeline not only saves time but also improves consistency and reliability.

## Our Current Manual Process

Before implementing a CI/CD pipeline, our workflow involves several manual steps:

1.  Make changes to the code.
2.  Commit the changes to Git.
3.  Run Pytest to ensure that changes haven’t broken any functionality.
4.  Optionally build Docker images if required.
5.  Deploy the application. This deployment step can range from a simple `git push` (as on Heroku) to complex server logins, code pulls, and service restarts.

![The image outlines a "Current Manual Process" for software development, including steps like making changes to code, committing changes, running tests, building an image, and deploying.](https://kodekloud.com/kk-media/image/upload/v1752883357/notes-assets/images/Python-API-Development-with-FastAPI-CI-CD-Basics/current-manual-process-software-dev.jpg)

> Note: Although the deployment step is presented as a single action, it often involves multiple sub-steps based on your deployment strategy.

## Transition to an Automated CI/CD Pipeline

Implementing a CI/CD pipeline transforms our deployment process by automating critical steps:

1.  **Manual Code Update:**  
    You continue to update the code and commit changes manually.
2.  **Pipeline Trigger:**  
    Each commit triggers the CI/CD pipeline, which manages the remaining tasks automatically.
3.  **Continuous Integration Phase:**
    - Pull the latest source code.
    - Install dependencies as defined in your requirements file.
    - Run automated tests using Pytest.
    - Optionally build Docker images if your project requires containerization.

4.  **Continuous Delivery Phase:**
    - Deploy the updated application or Docker image to production automatically based on your configuration.

![The image is a flowchart illustrating an automated CI/CD process, showing steps from making code changes to updating production.](https://kodekloud.com/kk-media/image/upload/v1752883358/notes-assets/images/Python-API-Development-with-FastAPI-CI-CD-Basics/ci-cd-automation-flowchart.jpg)

> [!important]
> **Automate with Confidence**
>
> With CI/CD, only the code commit requires manual intervention. The pipeline handles the build, test, and deployment processes seamlessly.

## Popular CI/CD Tools

There are several tools available to facilitate CI/CD, including:

- [Jenkins](https://learn.kodekloud.com/user/courses/jenkins)
- Travis CI
- CircleCI
- [GitHub Actions](https://learn.kodekloud.com/user/courses/github-actions)

For this discussion, we focus on [GitHub Actions](https://learn.kodekloud.com/user/courses/github-actions) due to its seamless integration with GitHub, ease-of-use, and free hosted service.

![The image is a presentation slide about CI/CD tools, mentioning GitHub Actions for integration with GitHub repositories, and includes logos of Jenkins, Travis CI, CircleCI, TeamCity, and others.](https://kodekloud.com/kk-media/image/upload/v1752883359/notes-assets/images/Python-API-Development-with-FastAPI-CI-CD-Basics/ci-cd-tools-github-actions-logos.jpg)

## Understanding CI/CD Tools

A CI/CD tool provides a "runner"—a dedicated computer or virtual machine that executes the commands you specify. This runner carries out instructions as if you were running commands in your local terminal, such as installing packages with `pip install` or running tests with `pytest`.

Triggers for these automated tasks can include events like a git push or merge request, or even scheduled times (e.g., nightly builds). Despite its complexity, the CI/CD process is essentially a sequence of simple steps executed automatically.

![The image is a slide explaining what a CI/CD tool does, highlighting its simplicity, use of runners, configuration through YAML/JSON or GUI, and event-triggered pipelines.](https://kodekloud.com/kk-media/image/upload/v1752883360/notes-assets/images/Python-API-Development-with-FastAPI-CI-CD-Basics/ci-cd-tool-explanation-slide.jpg)

## Example: GitHub Actions Configuration

Below is an example YAML configuration for a GitHub Actions pipeline. This setup instructs the runner to perform the following tasks:

- Check out the source code.
- Set up Python 3.9.
- Update pip.
- Install dependencies from the `requirements.txt` file.
- Install and run Pytest for testing.

```
steps:
  - uses: actions/checkout@v2
  - name: Set up Python 3.9
    uses: actions/setup-python@v2
    with:
      python-version: "3.9"
  - name: Update pip
    run: python -m pip install --upgrade pip
  - name: Install dependencies
    run: pip install -r requirements.txt
  - name: Test with Pytest
    run: |
      pip install pytest
      pytest
```

This configuration mirrors the local steps you perform manually, automating the entire process from code commit to deployment.

## Conclusion

Adopting a CI/CD pipeline streamlines the deployment process by automating repetitive, manual tasks. Using tools like [GitHub Actions](https://learn.kodekloud.com/user/courses/github-actions), you can build an efficient workflow that runs tests and deploys code automatically with each commit, reducing errors and saving valuable time.

In the next lesson, we will explore how to set up [GitHub Actions](https://learn.kodekloud.com/user/courses/github-actions) to enhance our CI/CD pipeline further.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/4979410a-af57-460b-8f71-5a177fa10d2d/lesson/1d19a1cf-cba7-4d79-b887-909fd7082d53)**
>
> Watch video content
