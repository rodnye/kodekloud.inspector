# Remediation With Systems Manager Automation Runbooks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-1-Monitoring-Logging-and-Remediation/Remediation-With-Systems-Manager-Automation-Runbooks)

---

## Table of Contents

- Remediation With Systems Manager Automation Runbooks
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 1 Monitoring Logging and Remediation

# Remediation With Systems Manager Automation Runbooks

Welcome to this comprehensive guide on Systems Manager Automation Runbooks. In this article, we explore how runbooks simplify the automation of operational tasks, offering a more streamlined approach compared to traditional configuration management tools like Chef, Puppet, or Ansible.

Systems Manager Automation Runbooks are essential for automating routine tasks such as stopping instances, applying patches, or recovering problematic EC2 instances. Essentially, a runbook is a document that outlines a series of steps to complete an automation task. You can choose from predefined runbooks or build customized workflows to fit specific needs. These documents are typically initiated through the run command, State Manager, or other features within the Systems Manager ecosystem.

![The image is an introduction to Automation Runbooks, showing a flow from AWS Systems Manager Automation to executing actions via an Automation Runbook document.](https://kodekloud.com/kk-media/image/upload/v1752859956/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Remediation-With-Systems-Manager-Automation-Runbooks/automation-runbooks-introduction-flow.jpg)

Predefined workflows cover common use cases, such as restarting instances, performing backups, and managing patch updates. Additionally, you can design custom workflows that execute tasks either sequentially or concurrently. Notably, runbooks support rollback actions that help revert changes if something goes wrong, minimizing any unintended consequences during task automation.

![The image outlines key features of automation runbooks, including predefined workflows, custom runbooks, workflow execution, and rollback actions, each represented by a colored icon.](https://kodekloud.com/kk-media/image/upload/v1752859957/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Remediation-With-Systems-Manager-Automation-Runbooks/automation-runbooks-features-diagram.jpg)

Consider a scenario where you use Systems Manager to manage EBS operations. Tasks such as standardizing volume configurations, automating snapshot creation, or dynamically modifying EBS properties can be automated with a dedicated runbook. In such a case, Systems Manager utilizes an automation document that sequences EBS operational tasks. This document can be scheduled or triggered by specific events to execute actions on targeted EBS volumes, provided that the necessary permissions are in place.

![The image is a flowchart illustrating the use of AWS Systems Manager Automation for EBS operations, showing the process from launching automation documents to executing tasks on Amazon EC2 and EBS.](https://kodekloud.com/kk-media/image/upload/v1752859958/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Remediation-With-Systems-Manager-Automation-Runbooks/aws-systems-manager-ebs-flowchart.jpg)

> [!important]
> **Runbook Definition Format**
>
> Automation runbooks are typically defined using JSON or YAML. These documents include required parameters, main steps, and outputs that are essential to the task being automated. Familiarity with this structure is crucial for effective use of Systems Manager.

Below is an example YAML snippet that describes a runbook for creating an EBS snapshot:

```
Runbook(Document):
  description: Create an EBS snapshot
  parameters:
    volumeId:
      type: String
      description: (Required) The ID of the EBS volume.
  mainSteps:
    - name: createSnapshot
      action: 'aws:createSnapshot'
      inputs:
        VolumeId: "{{ volumeId }}"
        NoReboot: true
  outputs:
    SnapshotId:
      description: The ID of the created snapshot.
      type: String
```

In this example, the runbook specifies a primary step that invokes the AWS API to create a snapshot using a provided volume ID. Once the action completes, the snapshot ID is captured as an output. You can always review the automation history to find details such as the snapshot ID related to a specific volume.

> [!important]
> **Exam Preparation Tip**
>
> While the SysOps exam does not typically require you to write automation runbooks, understanding their structure and capabilities is important. Be sure to review key components such as the description, parameters, main steps, and outputs.

This overview covers the essentials of Systems Manager Automation Runbooks. For a deeper dive into real-world applications and demonstrations, explore the demo provided. We look forward to guiding you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/e7f728df-5d8d-4dbb-80f6-33c15cde3034/lesson/c938e7e5-f392-4468-ae46-a39f5736f844)**
>
> Watch video content
