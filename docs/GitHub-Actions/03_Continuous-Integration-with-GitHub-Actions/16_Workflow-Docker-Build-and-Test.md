# Workflow Docker Build and Test - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Workflow-Docker-Build-and-Test)

---

## Table of Contents

- Workflow Docker Build and Test
  - 1. Authenticate with Docker Hub
  - 2. Build the Image for Testing
  - 3. Define Your Dockerfile
  - 4. Run Container Tests
  - 5. Implement Health Endpoints in Your App
  - 6. Monitor the Workflow in GitHub Actions
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Workflow Docker Build and Test

In this guide, we’ll walk through a GitHub Actions workflow that builds a Docker image, validates it with runtime tests, and prepares it for publishing to Docker Hub.

## 1\. Authenticate with Docker Hub

Before building your container, log in to Docker Hub securely using the official `docker/login-action`.

```
jobs:
  docker:
    name: Containerization
    needs: [unit-testing, code-coverage]
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Docker Hub Login
        uses: docker/login-action@v2.2.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
```

> [!important]
> **Note**
>
> Store your Docker Hub credentials as [GitHub Secrets](/docs/github/creating-secrets-for-workflows) or repository variables to avoid exposing sensitive data in your workflow YAML.

## 2\. Build the Image for Testing

Use the `docker/build-push-action` to build your image locally without pushing it immediately. This allows you to run integration or health checks before publishing.

![The image shows a webpage from GitHub Marketplace detailing sections on usage, examples, customizing, troubleshooting, and contributing for building and pushing Docker images.](https://kodekloud.com/kk-media/image/upload/v1752876541/notes-assets/images/GitHub-Actions-Workflow-Docker-Build-and-Test/github-marketplace-docker-images-guide.jpg)

```
      - name: Build Docker Image for Testing
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
```

For more customization options, refer to the official documentation: [docker/build-push-action](https://github.com/docker/build-push-action).

## 3\. Define Your Dockerfile

Place a `Dockerfile` at the root of your repository to specify the container environment:

```
FROM node:18-alpine3.17

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

# Placeholder environment variables for MongoDB credentials
ENV MONGO_URI=uriPlaceholder
ENV MONGO_USERNAME=usernamePlaceholder
ENV MONGO_PASSWORD=passwordPlaceholder

EXPOSE 3000
CMD ["npm", "start"]
```

Key steps:

- Start from an official Node.js Alpine base image.
- Install dependencies before copying the rest of the source code.
- Expose port **3000** and set `npm start` as the default command.

## 4\. Run Container Tests

After building the image, verify that the application starts and responds to its health endpoint. Replace placeholders with your actual GitHub Secrets or repository variables.

```
      - name: Docker Image Testing
        run: |
          # List built images
          docker images

          # Run the container in detached mode
          docker run --name solar-system-app -d \
            -p 3000:3000 \
            -e MONGO_URI=$MONGO_URI \
            -e MONGO_USERNAME=$MONGO_USERNAME \
            -e MONGO_PASSWORD=$MONGO_PASSWORD \
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}

          # Display container IP address
          echo "Container IP:" $(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' solar-system-app)

          # Test the /live endpoint
          echo "Testing /live endpoint"
          wget -q -O - http://127.0.0.1:3000/live | grep live
```

> [!important]
> **Warning**
>
> Ensure that your application exposes health endpoints like `/live` or `/ready` to prevent false positives during automated testing.

## 5\. Implement Health Endpoints in Your App

Add health-check routes in your Express application so the workflow can validate container readiness:

```
const express = require('express');
const os = require('os');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/os', (req, res) => {
  res.json({ os: os.hostname(), env: process.env.NODE_ENV });
});

app.get('/live', (req, res) => {
  res.json({ status: 'live' });
});

app.get('/ready', (req, res) => {
  res.json({ status: 'ready' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
```

## 6\. Monitor the Workflow in GitHub Actions

Once you push your changes, go to the **Actions** tab in your repository to review the workflow run.

![The image shows a GitHub Actions page for a project called "Solar System Workflow," displaying a list of workflow runs with their statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876542/notes-assets/images/GitHub-Actions-Workflow-Docker-Build-and-Test/github-actions-solar-system-workflow.jpg)

Select the **Containerization** job to inspect its steps:

![The image shows a GitHub Actions workflow interface for a project named "solar-system," displaying a "docker build and test" process in progress with unit testing and code coverage jobs.](https://kodekloud.com/kk-media/image/upload/v1752876543/notes-assets/images/GitHub-Actions-Workflow-Docker-Build-and-Test/github-actions-solar-system-docker-workflow.jpg)

Watch each step transition to **success**:

![The image shows a GitHub Actions workflow interface with a successful "docker build and test" job, including steps like unit testing, code coverage, and containerization.](https://kodekloud.com/kk-media/image/upload/v1752876544/notes-assets/images/GitHub-Actions-Workflow-Docker-Build-and-Test/github-actions-docker-build-test-workflow.jpg)

You can also inspect logs to confirm build arguments, container startup, and endpoint testing:

```
/usr/bin/docker build --iidfile /tmp/docker-actions-toolkit/iidfile \
  --tag siddharth67/solar-system:f61272158d890b757e9a4639ed60f6de393edf228 .

docker images
docker run --name solar-system-app -d \
  -p 3000:3000 \
  -e MONGO_URI=$MONGO_URI \
  -e MONGO_USERNAME=$MONGO_USERNAME \
  -e MONGO_PASSWORD=$MONGO_PASSWORD \
  siddharth67/solar-system:6127158d890b757e9a46396d6de393edf228

export IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' solar-system-app)
echo $IP

wget -q -O - http://127.0.0.1:3000/live | grep live
```

![The image shows a GitHub Actions interface displaying a successful containerization job with details of Docker image testing, including repository names, tags, image IDs, creation times, and sizes.](https://kodekloud.com/kk-media/image/upload/v1752876546/notes-assets/images/GitHub-Actions-Workflow-Docker-Build-and-Test/github-actions-containerization-job-success.jpg)

---

With your image successfully built and validated, you’re now ready to push it to Docker Hub. Continue to the next article to configure the push step in your workflow.

## Links and References

- [GitHub Actions: docker/login-action](https://github.com/docker/login-action)
- [GitHub Actions: docker/build-push-action](https://github.com/docker/build-push-action)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Express.js Health Checks](https://expressjs.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/a4b43f0a-4c4a-4231-98e1-e975987e2077)**
>
> Watch video content
