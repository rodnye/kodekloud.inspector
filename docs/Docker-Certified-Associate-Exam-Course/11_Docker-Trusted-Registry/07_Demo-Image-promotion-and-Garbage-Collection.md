# Demo Image promotion and Garbage Collection - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Demo-Image-promotion-and-Garbage-Collection)

---

## Table of Contents

- Demo Image promotion and Garbage Collection
  - Configure Image Promotion Policy
  - Push and Promote an Image
  - Configure Garbage Collection
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Demo Image promotion and Garbage Collection

Optimize your Docker image workflow by configuring automatic image promotions from development to production repositories and managing storage with garbage collection in Docker Trusted Registry (DTR).

**Table of Contents**

1.  [Configure Image Promotion Policy](#configure-image-promotion-policy)
2.  [Push and Promote an Image](#push-and-promote-an-image)
3.  [Configure Garbage Collection](#configure-garbage-collection)
4.  [Links and References](#links-and-references)

---

## Configure Image Promotion Policy

First, set up an automated policy to move images tagged as `stable` from your development repository (`devimages`) to production (`prodimages`).

1.  In the DTR UI, go to **Repositories** and select **devimages**.
2.  Click **Promotions** and choose **Tag Name** as the criterion.
3.  Define the rule:
    - **tagName** == `"stable"`
4.  Click **Add**.
5.  Under **Target Repository**, pick **prodimages**.
6.  For **Target Tag Name**, enter `%n` to preserve the original tag.
7.  Save by clicking **Save and Apply**.

![The image shows a Docker Enterprise Trusted Registry interface, specifically the repositories section, with options to filter by tag name and other criteria. It also includes fields for specifying a target repository and tag name variables.](https://kodekloud.com/kk-media/image/upload/v1752873952/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Image-promotion-and-Garbage-Collection/docker-enterprise-trusted-registry-repositories.jpg)

After saving, you’ll see the new policy listed with **Last Promoted** set to _never_ until it runs for the first time.

![The image shows a Docker Enterprise Trusted Registry interface where a user is configuring repository settings, including criteria for vulnerabilities and tag naming conventions.](https://kodekloud.com/kk-media/image/upload/v1752873954/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Image-promotion-and-Garbage-Collection/docker-enterprise-trusted-registry-settings.jpg)

> [!important]
> **Note**
>
> Make sure both `devimages` and `prodimages` repositories exist and are empty before you create the policy.

---

## Push and Promote an Image

Tag and push an image with `stable` on your local machine to trigger the promotion:

```
# Tag alpine:latest for devimages
docker tag alpine:latest 54.145.234.153/yogeshraheja/devimages:stable


# Push to the devimages repository
docker push 54.145.234.153/yogeshraheja/devimages:stable
```

Return to the DTR console:

1.  Refresh **devimages**.
2.  Under **Promotions**, **Last Promoted** will update to the current timestamp.
3.  Click **Activity** to view the detailed promotion log.

To confirm, inspect **prodimages**:

![The image shows a Docker Enterprise Trusted Registry interface displaying details of a repository named "yogeshraheja/prodimages," including a tagged image labeled "stable(Promoted)" with its type, ID, size, and vulnerability scan options.](https://kodekloud.com/kk-media/image/upload/v1752873955/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Image-promotion-and-Garbage-Collection/docker-enterprise-trusted-registry-yogeshraheja-prodimages.jpg)

The `stable (Promoted)` tag indicates that the image has been moved successfully.

> [!important]
> **Warning**
>
> Production repositories should only receive thoroughly tested images. Double-check your promotion rules to avoid deploying unverified containers.

---

## Configure Garbage Collection

Over time, untagged images accumulate and consume disk space. DTR’s Garbage Collection removes these images based on your schedule.

1.  Navigate to **System** > **Garbage Collection** in the DTR UI.
2.  Choose a collection mode:

| Mode               | Description                                       |
| ------------------ | ------------------------------------------------- |
| Until Done         | Runs until **all** untagged images are removed.   |
| For a Defined Time | Runs for a specified duration (e.g., 10 minutes). |
| Never (Default)    | Disables automatic garbage collection.            |

3.  (Optional) Schedule it using a cron expression for regular cleanups.
4.  Click **Save** to apply.

![The image shows a Docker Enterprise Trusted Registry interface focused on garbage collection settings, allowing users to configure the removal of untagged images. Options include setting a duration for the process and scheduling it with a cron job.](https://kodekloud.com/kk-media/image/upload/v1752873956/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Image-promotion-and-Garbage-Collection/docker-enterprise-garbage-collection-settings.jpg)

> [!important]
> **Note**
>
> By default, automatic garbage collection is disabled. Enabling it prevents your DTR storage from filling up.

---

## Links and References

- [Docker Trusted Registry Overview](https://docs.docker.com/ee/dtr/)
- [Manage Images with DTR](https://docs.docker.com/ee/dtr/manage-images/)
- [Docker Docs: Garbage Collection](https://docs.docker.com/ee/dtr/admin/store/#garbage-collection)

---

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/559a4fbc-c655-43aa-8fbc-74f0957c6c22)**
>
> Watch video content
