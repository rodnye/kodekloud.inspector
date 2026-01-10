# Jenkins Fingerprints - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Extending-Jenkins/Jenkins-Fingerprints)

---

## Table of Contents

- Jenkins Fingerprints
  - Watch Video
  - Practice Lab

---

## Content

Jenkins For Beginners

Extending Jenkins

# Jenkins Fingerprints

Jenkins fingerprints are a powerful feature that allows you to track file usage across different jobs. This mechanism is especially useful when managing multiple interconnected projects. By recording fingerprints at the project level, Jenkins can identify which versions of a file are used throughout your builds. Essentially, the fingerprint is an MD5 checksum stored with metadata about which builds have utilized the file, without actually storing the file itself. You can review these details on the Jenkins home/fingerprints page.

In the demonstrated workflow, an ASCII build job generates an artifact, which is then used by a test job. This test job creates another artifact that is later consumed by a deploy job. The dependency chain is as follows:

- The deploy job depends on the test job.
- The test job depends on the build job.

To effectively track this process, manual configuration of fingerprint recording is required. Follow these steps to set it up:

1.  Open the job configuration page.
2.  Scroll down to the **Post-build Actions** section.
3.  Select the option to **Record fingerprints of files to track usage**.> [!important]
    > **Tip**
    >
    > Click the help button for further clarification on this feature.
4.  Enter the file name(s) you wish to track. In this example, the file is named `advice.json`.

![The image shows a Jenkins configuration screen for a job named "ascii-build-job," with options for triggering builds and recording file fingerprints.](https://kodekloud.com/kk-media/image/upload/v1752879459/notes-assets/images/Jenkins-For-Beginners-Jenkins-Fingerprints/jenkins-ascii-build-job-config.jpg)

After setting up the configuration for the build job, click **Save**. Although you can repeat this process for the test and deploy jobs, this demonstration focuses solely on configuring the build job.

Once you trigger a build (for instance, build number 8), the `advice.json` file will be generated and assigned a fingerprint. Clicking on the fingerprint link will display the MD5 checksum for the file, along with a detailed list of jobs and their build IDs that have utilized this file. This method offers a clear view of how Jenkins tracks file dependencies across various builds.

Furthermore, Jenkins provides an option to track additional files through the dashboard's fingerprint feature. You can upload any file and retrieve comprehensive usage details, such as when the file was used, the dependent projects, and the associated build IDs.

![The image shows a Jenkins dashboard with a list of jobs, their statuses, last success and failure times, and durations. The interface includes options like "New Item," "Build History," and "Manage Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752879460/notes-assets/images/Jenkins-For-Beginners-Jenkins-Fingerprints/jenkins-dashboard-jobs-statuses.jpg)

For a hands-on approach, utilize the **Check File Fingerprint** tool available on the Jenkins dashboard. This feature allows you to upload a file, verify its fingerprint against the Jenkins database, and receive an in-depth analysis of its use across projects.

![The image shows a Jenkins dashboard with the "Check File Fingerprint" feature, allowing users to upload a file to check its fingerprint against the database. The interface includes options like "New Item," "Build History," and "Manage Jenkins."](https://kodekloud.com/kk-media/image/upload/v1752879461/notes-assets/images/Jenkins-For-Beginners-Jenkins-Fingerprints/jenkins-dashboard-file-fingerprint.jpg)

> [!important]
> **Key Takeaway**
>
> By following these steps, you can efficiently monitor and manage file dependencies in your Jenkins projects using fingerprints.

This guide has detailed how Jenkins utilizes fingerprints to track file usage across different builds and jobs. Implementing these practices will improve your project's dependency management and overall workflow efficiency. Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/6a945431-1040-4467-b874-ef7d24d5a6a0/lesson/e23db1d6-105b-4068-8524-929518a5f977)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/6a945431-1040-4467-b874-ef7d24d5a6a0/lesson/c7258333-58e2-440c-822b-507a056998f2)**
>
> Practice lab
