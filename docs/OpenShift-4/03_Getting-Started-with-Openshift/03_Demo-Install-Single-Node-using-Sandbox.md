# Demo Install Single Node using Sandbox - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Getting-Started-with-Openshift/Demo-Install-Single-Node-using-Sandbox)

---

## Table of Contents

- Demo Install Single Node using Sandbox
  - Watch Video

---

## Content

OpenShift 4

Getting Started with Openshift

# Demo Install Single Node using Sandbox

In our previous lesson, we explored how to set up CodeReady Containers. If you prefer not to go through that process, avoid running OpenShift locally, or if your machine lacks sufficient resources, the OpenShift Sandbox offers an ideal alternative.

To get started:

1.  Log into your OpenShift Console and click the **Developer Sandbox** button.
2.  Select **Learn More About the Sandbox**. This action opens a new browser window where you can immediately begin using the Sandbox.
3.  Depending on your account settings, you might need to enable the Sandbox by providing your phone number. A text message with a verification code will be sent to you. Enter the code to enable the Sandbox for your use.

Once your Sandbox is enabled, you can verify the resource availability by running the following command:

```
[your@sandbox ~]$ lscpu
RAM: 7GB
Storage: 15GB
Time Limit: 30 days
Awesome: YES
```

This output indicates that your Sandbox environment provides 7GB of RAM, 15GB of storage, and is available for a 30-day time period. The verification step also adds an extra layer of security.

After verifying your resources, click on **Start Using Your Sandbox** to log into an OpenShift instance running in the cloud. In this managed environment, all cluster components are maintained by OpenShift.

> [!important]
> **Temporary Environment**
>
> Keep in mind that the OpenShift Sandbox is intended solely for demonstration purposes and is not suitable for production workloads. The environment is temporary and will be automatically deleted after 30 days. While you can create a new Sandbox, it is designed for short-term use only.

If you need a free demo environment for OpenShift without deploying CodeReady Containers locally, the OpenShift Sandbox is a perfect solution.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/7ba3dd10-68d9-414d-b26b-8e9109a4a3d3/lesson/80ff92ba-05c1-44bb-a840-43430deebb77)**
>
> Watch video content
