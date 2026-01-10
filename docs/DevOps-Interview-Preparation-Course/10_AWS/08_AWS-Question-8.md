# AWS Question 8 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-8)

---

## Table of Contents

- AWS Question 8
  - Potential Causes
  - Diagram Explanation
  - Interview Approach
  - Watch Video
    - 1. Spot Price Fluctuations
    - 2. EC2 Quota Limits

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 8

In this lesson, we explore common issues with provisioning new nodes in Auto Scaling Groups (ASG) that rely exclusively on Spot Instances. By understanding the root causes, DevOps and AWS engineers can troubleshoot these challenges more effectively.

Often, Spot Instances experience provisioning problems due to their inherent volatility. As these instances are bid-based, sudden price changes or service limits can result in an inability to launch new nodes.

## Potential Causes

### 1\. Spot Price Fluctuations

Spot Instances are acquired through a bidding process and can be terminated if the market price exceeds your bid value. This means that if the current Spot price climbs above your configured bid, your ASG may fail to provision new nodes. Keep in mind that bidding higher only improves the likelihood of acquiring an instance; it does not guarantee successful provisioning.

> [!important]
> **Key Insight**
>
> Spot Instance pricing is dynamic. Regular monitoring of market trends and adjusting bid values can help mitigate interruptions.

### 2\. EC2 Quota Limits

AWS enforces soft limits on the number of EC2 instances per account to ensure resource control and prevent unexpected charges. Even with a sound bidding strategy, hitting your EC2 quota can prevent new nodes from being provisioned. In such scenarios, you can resolve the issue by reaching out to AWS Support to request an increase in your EC2 instance quota.

> [!important]
> **Important**
>
> Always check your current EC2 instance limits before scaling. Contact AWS Support if you frequently approach the quota threshold to ensure uninterrupted scaling.

## Diagram Explanation

Below is a diagram that illustrates Spot Instance pricing for the R4xLarge instance type. Imagine an ASG configured exclusively with R4xLarge instances. If you're operating in a specific availability zone (highlighted in green), and your bid price is lower than the current Spot price, the ASG may lose all its instances. This diagram highlights the inherent risk of relying solely on Spot Instances.

![The image contains a text warning about the risks of using only spot instances in an Auto Scaling Group (ASG) and a graph showing spot instance pricing history for different availability zones and instance types.](https://kodekloud.com/kk-media/image/upload/v1752873333/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-8/spot-instances-asg-warning-graph.jpg)

## Interview Approach

When discussing this topic in an interview, consider the following points:

- The primary issue may be that Spot Instance prices have risen beyond the configured bid value, leading to provisioning challenges.
- Another potential cause is hitting the EC2 quota limit imposed by AWS.
- A practical resolution for quota-related issues is to contact AWS Support and request a quota increase.

Understanding these factors allows you to confidently explain the challenges and solutions associated with a Spot Instance-only ASG.

That is it for this lesson, my friends.

Speak to you in the next lesson.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/83ad9cc1-b989-42d1-be77-47f99a2c9580)**
>
> Watch video content
