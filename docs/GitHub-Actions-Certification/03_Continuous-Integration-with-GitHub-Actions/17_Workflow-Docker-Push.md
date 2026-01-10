# Workflow Docker Push - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Workflow-Docker-Push)

---

## Table of Contents

- Workflow Docker Push
  - 1. Build and Test the Docker Image
  - 2. Push the Docker Image to Docker Hub
  - 3. Inspecting the Workflow Logs
  - 4. Verifying on Docker Hub
  - Job Summary
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Workflow Docker Push

In this tutorial, we’ll enhance our GitHub Actions workflow to build, test, and publish a Docker image to Docker Hub. You’ll learn how to use Docker Buildx for multi-platform builds, run live container tests, and manage credentials securely for a robust CI/CD pipeline.

## 1\. Build and Test the Docker Image

First, we compile the image locally without pushing it, then spin up a container to validate the `/live` endpoint.

> [!important]
> **Note**
>
> Tagging images with the Git SHA ensures traceability. Use `${{ github.sha }}` for an immutable reference.

```
jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Docker Build for Testing
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}

      - name: Docker Image Testing
        env:
          MONGO_URI: ${{ secrets.MONGO_URI }}
          MONGO_USERNAME: ${{ secrets.MONGO_USERNAME }}
          MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}
        run: |
          # List local images
          docker images

          # Run container for testing
          docker run --name solar-system-app -d \
            -p 3000:3000 \
            -e MONGO_URI="$MONGO_URI" \
            -e MONGO_USERNAME="$MONGO_USERNAME" \
            -e MONGO_PASSWORD="$MONGO_PASSWORD" \
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}

          # Extract container IP and test the live endpoint
          IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' solar-system-app)
          echo "Container IP: $IP"

          echo "Testing Image URL using wget"
          wget -q -O - "http://$IP:3000/live" | grep live
```

## 2\. Push the Docker Image to Docker Hub

Once tests pass, rebuild (with cache reuse) and push the image in a dedicated job.

```
  push-image:
    needs: build-and-test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Docker Build and Push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
```

> [!important]
> **Warning**
>
> Ensure your `DOCKERHUB_TOKEN` is stored as a [GitHub repository secret](https://docs.github.com/actions/security-guides/encrypted-secrets) to prevent credential leaks.

## 3\. Inspecting the Workflow Logs

During the push step, the logs will indicate cache reuse and the push command:

```
/usr/bin/docker buildx build \
  --iidfile /tmp/docker-actions-toolkit/iidfile \
  --tag siddharth67/solar-system:e8095fb98a5b01249540a95eaf3a9c371c274430 \
  --push .
```

The `build-push-action` automatically leverages layers from the testing job to speed up the push.

## 4\. Verifying on Docker Hub

After completion, navigate to your Docker Hub repository. You should find a new tag matching the commit SHA, for example:

```
siddharth67/solar-system:e8095fb98a5b01249540a95eaf3a9c371c274430
```

This confirms that your GitHub Actions workflow has successfully built, tested, and published your image.

## Job Summary

| Job Name       | Purpose                      | Key Steps                                    |
| -------------- | ---------------------------- | -------------------------------------------- |
| build-and-test | Build image & run live tests | Checkout, Buildx setup, build, run container |
| push-image     | Publish image to Docker Hub  | Checkout, Buildx setup, login, build & push  |

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Buildx Action](https://github.com/docker/setup-buildx-action)
- [Docker Login Action](https://github.com/docker/login-action)
- [Docker Build-Push Action](https://github.com/docker/build-push-action)
- [Docker Hub](https://hub.docker.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/08f7e239-50da-4b62-98ef-4d2b4a096523)**
>
> Watch video content
