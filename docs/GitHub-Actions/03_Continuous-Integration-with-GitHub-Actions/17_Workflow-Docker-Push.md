# Workflow Docker Push - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Workflow-Docker-Push)

---

## Table of Contents

- Workflow Docker Push
  - Updated Workflow Snippet
  - Step-by-Step Breakdown
  - Inspecting the Push Logs
  - Verify the Image on Docker Hub
  - Manual Push (Optional)
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Workflow Docker Push

In this lesson, you’ll extend your GitHub Actions CI workflow to publish a Docker image to [Docker Hub](https://hub.docker.com/). We’ll build the image for testing, verify it runs correctly, and then push it to your Docker Hub registry—all within a single workflow file.

> [!important]
> **Note**
>
> Ensure you’ve configured the following GitHub repository secrets:
>
> - `DOCKERHUB_USERNAME`
> - `DOCKERHUB_TOKEN`
> - `MONGO_URI`, `MONGO_USERNAME`, `MONGO_PASSWORD`

## Updated Workflow Snippet

Add these three steps to your `.github/workflows/ci.yml`:

```
# 1. Build the Docker image without pushing
- name: Docker Build for Testing
  uses: docker/build-push-action@v4
  with:
    context: .
    push: false                   # disable push during test build
    tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}


# 2. Run tests against the local image
- name: Docker Image Testing
  run: |
    docker images
    docker run --name solar-system-app -d \
      -p 3000:3000 \
      -e MONGO_URI=${{ secrets.MONGO_URI }} \
      -e MONGO_USERNAME=${{ secrets.MONGO_USERNAME }} \
      -e MONGO_PASSWORD=${{ secrets.MONGO_PASSWORD }} \
      ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}


    # Inspect container IP and test /live endpoint
    IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' solar-system-app)
    echo "Container IP: $IP"
    echo "Testing /live endpoint"
    wget -qO- "http://127.0.0.1:3000/live" | grep live


# 3. Push the tested image to Docker Hub
- name: Docker Push
  uses: docker/build-push-action@v4
  with:
    context: .
    push: true                    # enable push to registry
    tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
```

After you commit and push, GitHub Actions will execute the build, test, and push steps in sequence.

## Step-by-Step Breakdown

| Step Name                | Action                        | Description                                                          |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------- |
| Docker Build for Testing | `docker/build-push-action@v4` | Builds the image locally without pushing to the registry             |
| Docker Image Testing     | `run`                         | Starts a container, retrieves its IP, and tests the `/live` endpoint |
| Docker Push              | `docker/build-push-action@v4` | Re-builds (using cache) and uploads all layers to Docker Hub         |

## Inspecting the Push Logs

During the **Docker Push** step you’ll see output similar to:

```
/usr/bin/docker buildx build \
  --iidfile /tmp/docker-actions-toolkit/iidfile \
  --tag youruser/solar-system:e8095fb98a5b01249548095eaf3a9c371c274430 \
  --push .
```

This confirms that Buildx is pushing each layer of your image to Docker Hub.

## Verify the Image on Docker Hub

Once the workflow completes:

1.  Go to your repository on [Docker Hub](https://hub.docker.com/).
2.  Look under **Tags** for the SHA-based tag (e.g., `e8095fb98a5b01249548095eaf3a9c371c274430`).

> [!important]
> **Warning**
>
> If you see authentication errors, double-check that `DOCKERHUB_TOKEN` is up to date and has the correct permissions.

## Manual Push (Optional)

You can also push an existing local image with:

```
docker push youruser/solar-system:tagname
```

---

## Links and References

- [GitHub Actions: build-push-action](https://github.com/docker/build-push-action)
- [Docker Hub](https://hub.docker.com/)
- [GitHub Secrets Documentation](https://docs.github.com/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/f59ce571-cc4b-422e-a12b-cd1842366c56)**
>
> Watch video content
