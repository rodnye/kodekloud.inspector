# Training Model Fine Tuning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Evolution-of-AI-Models/Training-Model-Fine-Tuning)

---

## Table of Contents

- Training Model Fine Tuning
  - Pre-Training: Building the Base Model
  - Fine-Tuning: Customizing the Base Model
  - RLHF: Refining with Human Feedback
  - Overview of the Training Process
  - Watch Video

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Evolution of AI Models

# Training Model Fine Tuning

This article delves into the process of building models like GPT-4 using neural networks and the Transformer architecture. Although the training process is both time-consuming and demanding in terms of human expertise, it ultimately involves a series of well-defined steps.

## Pre-Training: Building the Base Model

The first phase involves combining the model’s architecture with vast amounts of raw data to pre-train the model. This step passes terabytes of data through the model, compressing the information into the model’s weights and biases. Think of it as distilling the content of the internet—or an extensive collection of books and documents—into a compact, efficient form that the model can utilize.

![The image illustrates the pre-training phase of a model, showing a four-step process: input data, data flow through the model, compression into weights and biases, and output as a pre-trained model.](https://kodekloud.com/kk-media/image/upload/v1752875786/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Training-Model-Fine-Tuning/pretraining-model-four-step-process.jpg)

The output from pre-training is a base model that has internalized a wide variety of patterns and information. However, note that this process is inherently lossy; a model compressed to a gigabyte cannot encapsulate every detail from terabytes or even exabytes of raw data. Base models excel at generating text continuations reminiscent of their training sources (e.g., Wikipedia-style text if trained on Wikipedia data) but often fall short for interactive applications or conversations requiring rich context.

## Fine-Tuning: Customizing the Base Model

Fine-tuning adapts the base model to more specific tasks or aligns it with specialized conversational styles. In this phase, the model undergoes additional training on a high-quality, domain-specific dataset. Supervised fine-tuning is commonly applied, and platforms like Azure offer user-friendly interfaces to facilitate this procedure.

> [!important]
> **Note**
>
> Fine-tuning is straightforward in theory, but obtaining high-quality data and defining effective evaluation metrics are critical challenges. These factors are essential to ensure the model improves without compromising performance.

## RLHF: Refining with Human Feedback

An optional step, widely adopted by major model providers, is Reinforcement Learning from Human Feedback (RLHF). Also called constitutional AI when incorporating an additional AI layer to check guideline alignment, this process involves human or machine evaluation of the fine-tuned model outputs to verify they meet the desired standards. Reinforcement learning is then used iteratively to align the model more closely with the preferred output characteristics.

![The image illustrates a process flow for fine-tuning a pre-trained model using a high-quality dataset, involving both human and machine inputs, leading to an output.](https://kodekloud.com/kk-media/image/upload/v1752875787/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Training-Model-Fine-Tuning/fine-tuning-pretrained-model-flow.jpg)

## Overview of the Training Process

The overall training process consists of:

1.  **Pre-Training:** Compressing extensive raw data into a base model through the model's weights and biases.
2.  **Fine-Tuning:** Adapting this base model with high-quality, domain-specific data for targeted applications.
3.  **RLHF (Optional):** Utilizing reinforcement learning with human (or AI) feedback to further refine the model's output.

The result is an enhanced, deployment-ready model. In many enterprise contexts, models are pre-trained and fine-tuned by external providers. However, in regulated domains, understanding and potentially managing the fine-tuning and RLHF processes is essential.

> [!important]
> **Warning**
>
> When operating in regulated environments, ensure you comprehend the intricate details of both the pre-training data and the fine-tuning process. This understanding is crucial when performing these steps in-house.

![The image illustrates an "Enhanced Model" consisting of a "Fine-Tuning Process" combined with "Human and Machine Feedback."](https://kodekloud.com/kk-media/image/upload/v1752875788/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Training-Model-Fine-Tuning/enhanced-model-fine-tuning-feedback.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/e250b780-055c-474c-8ff4-3070de67d39d/lesson/2a7fb8f8-4458-4a0e-85a2-487ca7381b99)**
>
> Watch video content
