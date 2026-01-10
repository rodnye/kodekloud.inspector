# Installing Blue Ocean - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Blue-Ocean/Installing-Blue-Ocean)

---

## Table of Contents

- Installing Blue Ocean
  - Installation Steps
  - Accessing Blue Ocean
  - Next Steps
  - Watch Video

---

## Content

Jenkins

Blue Ocean

# Installing Blue Ocean

Blue Ocean is an integrated part of Jenkins, but it is not enabled by default. Installing Blue Ocean is simple using the built-in plugin management system.

## Installation Steps

1.  Navigate to **Manage Jenkins** and then select **Manage Plugins**.
2.  Click on the **Available** tab.
3.  Enter "Blue Ocean" in the search box. Among the results, locate the **Blue Ocean aggregator**.
4.  Click on the **Blue Ocean aggregator** entry and then choose **Install without Restart**.> [!important]
    > **Note**
    >
    > Jenkins will automatically install multiple related components, so there is no need to install them individually.

Allow a few minutes for the installation to complete. Once finished, you can proceed to access Blue Ocean.

## Accessing Blue Ocean

To launch Blue Ocean, simply append `/blue` to your Jenkins URL. This action opens the new pipeline-focused interface:

- URL Example: `http://your-jenkins-server/blue`

If you need to return to the standard Jenkins portal, click on **Administration** within Blue Ocean. To switch back to Blue Ocean later, either append `/blue` to your Jenkins URL or click on the **Open Blue Ocean** button within the interface.

> [!important]
> **Warning**
>
> Ensure that you have proper access rights and a stable connection before making significant changes to your Jenkins configuration.

## Next Steps

This article covers the installation and access procedures for Blue Ocean. Stay tuned for further discussions on Jenkins pipelines and additional advanced configurations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/77db3006-93f7-42b0-90d0-6fd961631d1f/lesson/8c68182c-d48c-413c-ab5e-a66494f5f6c0)**
>
> Watch video content
