# Course Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Autoscaling/Introduction/Course-Introduction)

---

## Table of Contents

- Course Introduction
  - Table of Contents
  - Manual Scaling Fundamentals
  - Automating with HPA
  - Exploring VPA
  - Cluster Proportional Autoscaler (CPA)
  - Event-Driven Autoscaling with KEDA
  - Join the Community
  - Watch Video

---

## Content

Kubernetes Autoscaling

Introduction

# Course Introduction

Kubernetes has emerged as the de facto platform for container orchestration—often called “the Linux of the cloud.” With the AI revolution accelerating, many services you use (e.g., [PoE](https://poe.com), [Anthropic Cloud](https://cloud.anthropic.com), [ChatGPT](https://chat.openai.com)) run on Kubernetes combined with specialized orchestrators. As AI adoption grows, so does the demand for Kubernetes expertise.

According to a 2022 survey by Indeed, Kubernetes led job-search growth with a **173%** year-over-year increase:

![The image is an Indeed survey report showing the year-over-year growth in job search interest for various tech skills, with Kubernetes leading at 173% growth. Other skills listed include Magento, Verilog, and Golang.](https://kodekloud.com/kk-media/image/upload/v1752880193/notes-assets/images/Kubernetes-Autoscaling-Course-Introduction/indeed-survey-tech-skills-growth.jpg)

This upward trend continued through 2023 and into 2024, making it essential to develop your Kubernetes skills to boost your market value.

Welcome to **Kubernetes on a Scaling**. I’m Michael Forrester, and in this course you’ll master efficient scaling of Kubernetes workloads through hands-on labs. You’ll learn by experimenting, troubleshooting, and building confidence to tackle scaling challenges in production environments.

## Table of Contents

| Scaling Method                  | Focus                                    | Key Benefits                           |
| ------------------------------- | ---------------------------------------- | -------------------------------------- |
| Manual Scaling                  | Basic `kubectl` commands                 | Understand core autoscaling primitives |
| Horizontal Pod Autoscaler (HPA) | CPU, memory, custom & external metrics   | Automated pod count adjustments        |
| Vertical Pod Autoscaler (VPA)   | CPU & memory resource recommendations    | Optimized resource allocation per pod  |
| Cluster Proportional Autoscaler | Component scaling based on cluster size  | Balanced control-plane scaling         |
| Event-Driven Autoscaling (KEDA) | Event triggers (Cron, Redis, Prometheus) | Dynamic response to external events    |

## Manual Scaling Fundamentals

We begin with manual scaling to grasp how Kubernetes handles resource changes under the hood. You’ll use basic `kubectl` commands to adjust and observe workload sizes, gaining a solid foundation before moving on to automated methods.

## Automating with HPA

The **Horizontal Pod Autoscaler (HPA)** automatically adjusts the number of pod replicas based on observed metrics like CPU, memory, and custom metrics. You’ll explore the HPA architecture, configure necessary adapters, and create HPA objects to automate scaling in various scenarios.

## Exploring VPA

The **Vertical Pod Autoscaler (VPA)** recommends or applies resource request and limit adjustments for containers. Through labs, you’ll learn how VPA helps optimize CPU and memory allocation per pod, improving application stability and efficiency.

## Cluster Proportional Autoscaler (CPA)

The **Cluster Proportional Autoscaler** scales control-plane components—such as the API server, scheduler, and controller manager—based on cluster size. You’ll configure CPA policies to ensure your control-plane scales in line with workload demands.

## Event-Driven Autoscaling with KEDA

**KEDA** (Kubernetes Event-Driven Autoscaling) enables scaling based on external events—cron schedules, message queues, Redis lists, Prometheus alerts, and more. In this module, you’ll connect KEDA to various event sources and implement flexible autoscaling strategies.

## Join the Community

Engage with fellow learners in our vibrant forum—ask questions, share best practices, and collaborate on scaling strategies. Active participation accelerates your learning and helps others.

Let’s get started on mastering Kubernetes autoscaling techniques. See you in class!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-autoscaling/module/13b7ea01-bb9e-497b-a190-aafcddaa3f11/lesson/a0518bc3-09b2-441b-bf02-7718e42a327a)**
>
> Watch video content
