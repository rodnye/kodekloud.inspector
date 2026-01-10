# Deploy and validate our application on GKE - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-05/Deploy-and-validate-our-application-on-GKE)

---

## Table of Contents

- Deploy and validate our application on GKE
  - Commit, Push, and Open a Pull Request
  - Monitoring the Build in Google Cloud Console
  - Verifying Your GKE Clusters
  - Correcting the Cluster Reference
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 05

# Deploy and validate our application on GKE

After configuring our `cloudbuild.yaml` to build, push, and deploy the Docker image to a GKE cluster via `gke.yaml`, we can automate the entire CI/CD workflow with a Cloud Build trigger. Once this file is committed to GitHub, the pipeline performs the following steps:

| Step | Builder                          | Purpose                              |
| ---- | -------------------------------- | ------------------------------------ |
| 1    | gcr.io/cloud-builders/docker     | Build the container image            |
| 2    | gcr.io/cloud-builders/docker     | Push the image to Container Registry |
| 3    | gcr.io/cloud-builders/gke-deploy | Deploy the image to our GKE cluster  |

```
steps:
  - name: "gcr.io/cloud-builders/docker"
    args:
      - "build"
      - "-t"
      - "gcr.io/$PROJECT_ID/gcpdevops"
      - "."
  - name: "gcr.io/cloud-builders/docker"
    args:
      - "push"
      - "gcr.io/$PROJECT_ID/gcpdevops"
  - name: "gcr.io/cloud-builders/gke-deploy"
    args:
      - run
      - --filename=gke.yaml
      - --image=gcr.io/$PROJECT_ID/gcpdevops
      - --location=us-central1-c
      - --cluster=gke-gcp-devops
      - --namespace=gcp-devops-prod
```

## Commit, Push, and Open a Pull Request

Use the following commands to stage, commit, and push your changes:

```
git add cloudbuild.yaml gke.yaml
git commit -m "Update deployment code"
git push origin <branch-name>
```

Then, navigate to GitHub, select your feature branch, and click **Contribute** → **Open pull request**. After reviewing the diff, click **Create pull request** and then **Merge**.

![The image shows a GitHub repository page for a project named "gcp-devops-project," featuring a branch selection dropdown and a README section describing a Docker Flask application.](https://kodekloud.com/kk-media/image/upload/v1752875493/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-our-application-on-GKE/gcp-devops-project-github-repo-readme.jpg)

![The image shows a GitHub pull request page for updating deployment code, with an open pull request ready to be merged. The branch has no conflicts with the base branch, allowing for automatic merging.](https://kodekloud.com/kk-media/image/upload/v1752875494/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-our-application-on-GKE/github-pull-request-deployment-update.jpg)

## Monitoring the Build in Google Cloud Console

Once merged into `main`, the configured [Cloud Build trigger](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers) executes our pipeline. Monitor progress under **Cloud Build** → **History**:

```
Step #0: Downloading MarkupSafe-2.1.2...
Step #0: Successfully installed ...
Step #1: Pushing layers...
Step #0: Built 83c1e572684d
Step #0: Tagged gcr.io/kodekloud-gcp-training/gcpdevops:latest
...
```

![The image shows a Google Cloud Build interface displaying build details, including a build summary with steps and a build log for a project named "KodeKloud-GCP-Training."](https://kodekloud.com/kk-media/image/upload/v1752875496/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-our-application-on-GKE/google-cloud-build-kodekloud-training.jpg)

> [!important]
> **Deployment Failure: Cluster Not Found**
>
> The deployment step failed because the specified GKE cluster name does not exist. Always verify that `--cluster` matches your actual cluster in the correct zone or region.

![The image shows a Google Cloud Build interface with a failed build notification. It includes details of the build steps and logs indicating errors in the deployment process.](https://kodekloud.com/kk-media/image/upload/v1752875497/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-our-application-on-GKE/google-cloud-build-failed-notification.jpg)

Inspecting the logs reveals an IAM binding that references a non-existent cluster:

```
gcloud projects add-iam-policy-binding kodekloud-gcp-training \
  --member=serviceAccount:248675367976-compute@cloudbuild.gserviceaccount.com \
  --role=roles/container.developer
```

```
ERROR: (gcloud.container.clusters.get-credentials) ResponseError: code=404, message=Not found: projects/kodekloud-gcp-training/zones/us-central1-c/clusters/gke-gcp-devops.
```

## Verifying Your GKE Clusters

Check your actual cluster names and locations in the Kubernetes Engine section:

![The image shows the Google Cloud Console interface, specifically the Kubernetes Engine section, displaying a list of Kubernetes clusters with one cluster named "gcp-devops-project" located in "us-central1-c".](https://kodekloud.com/kk-media/image/upload/v1752875498/notes-assets/images/GCP-DevOps-Project-Deploy-and-validate-our-application-on-GKE/google-cloud-console-kubernetes-clusters.jpg)

> [!important]
> **Tip**
>
> If you need to list clusters via the CLI, use:
>
> ```
> gcloud container clusters list --zone us-central1-c
> ```

## Correcting the Cluster Reference

Update the `cloudbuild.yaml` to use the correct cluster name:

```
steps:
  - name: "gcr.io/cloud-builders/docker"
    args: ["build", "-t", "gcr.io/$PROJECT_ID/gcpdevops", "."]
  - name: "gcr.io/cloud-builders/docker"
    args: ["push", "gcr.io/$PROJECT_ID/gcpdevops"]
  - name: "gcr.io/cloud-builders/gke-deploy"
    args:
      - run
      - --filename=gke.yaml
      - --image=gcr.io/$PROJECT_ID/gcpdevops
      - --location=us-central1-c
      - --cluster=gcp-devops-project
      - --namespace=gcp-devops-prod
```

After committing and merging these changes, the deployment will succeed.

## Links and References

- [Google Cloud Build Documentation](https://cloud.google.com/build/docs/)
- [gke-deploy | Google Anthos](https://cloud.google.com/anthos/gke-deploy)
- [Granting Roles](https://cloud.google.com/iam/docs/granting-changing-revoking-access)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/c1a43d47-87cb-459f-a9bf-2000d6223395/lesson/744e03a4-d3ec-41db-8381-27244d222682)**
>
> Watch video content
