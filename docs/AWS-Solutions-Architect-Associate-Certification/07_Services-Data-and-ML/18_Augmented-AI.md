# Augmented AI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Augmented-AI)

---

## Table of Contents

- Augmented AI
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Augmented AI

Welcome back, future solutions architects. I'm Michael Forrester, and in this article, we delve into the exciting world of augmented AI. Learn how to integrate human judgment seamlessly into machine learning workflows to boost prediction accuracy and continuously improve your models.

Amazon Augmented AI (A2I) is an AWS service that integrates human reviewers into your machine learning process. When an ML model processes input data, it outputs predictions with varying confidence levels. For predictions with low confidence—such as uncertain labels—the system automatically triggers a human review, ensuring that even borderline cases receive expert validation.

Below is a flowchart illustrating the augmented AI process. The diagram shows how input data is analyzed by an AI/ML model and, based on the prediction's confidence level, either accepted automatically as high-confidence output or forwarded for human review when needed:

![The image is a flowchart illustrating an Augmented AI process where input data is analyzed by an AI or ML model, leading to either high-confidence predictions or low-confidence cases that require human review.](https://kodekloud.com/kk-media/image/upload/v1752865016/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Augmented-AI/augmented-ai-process-flowchart.jpg)

> [!important]
> **Note**
>
> Augmented AI allows you to designate specific low-confidence data for human review, ensuring that each critical decision—like verifying if an image indeed contains a dog—is confirmed by a subject matter expert.

A2I is designed for flexibility. You can choose to have your internal teams or third-party vendors, such as [Amazon Mechanical Turk](https://www.mturk.com/), handle these human reviews. This service integrates with several AWS labeling services including [Textract](https://aws.amazon.com/textract/), [SageMaker](https://aws.amazon.com/sagemaker/), [Rekognition](https://aws.amazon.com/rekognition/), and [Comprehend](https://aws.amazon.com/comprehend/). This integration simplifies the creation of built-in human review workflows for applications like content moderation and text extraction without the hassle of writing extra code.

One of the primary benefits of augmented AI is its continuous learning capability. Feedback from human reviewers is fed back into the machine learning model, allowing it to learn from previous mistakes and improve its accuracy over time. Furthermore, the system scales automatically with the volume of predictions requiring human review:

- If you rely on Mechanical Turk, scaling is managed seamlessly.
- If you use your own workforce, ensure you have enough available reviewers to manage the workload within your target timeframe.

The image below highlights five key features of augmented AI:

- Easy integration with ML services
- Built-in human review workflows
- Access to human reviewers
- Continuous learning and improvement
- Seamless scaling

![The image lists five features: easy integration with ML services, built-in human review workflows, access to human reviewers, continuous learning and improvement, and seamless scaling.](https://kodekloud.com/kk-media/image/upload/v1752865018/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Augmented-AI/ml-services-integration-features.jpg)

In use cases like language translation where nuance is paramount, a translation service may sometimes generate low-confidence outputs. Human review in these instances ensures the translations are both nuanced and correct. Both reviewed outputs and automatically accepted high-confidence results can be stored in [Amazon S3](https://aws.amazon.com/s3/) for later use. The following flowchart demonstrates this process: input data is translated using [Amazon Translate](https://aws.amazon.com/translate/); low-confidence translations are sent for human review, while high-confidence outputs are directly stored in Amazon S3.

![The image is a flowchart illustrating a process involving input data being translated by Amazon Translate, with low-confidence translations reviewed by humans, and high-confidence translations stored in Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752865019/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Augmented-AI/amazon-translate-flowchart-process.jpg)

Additionally, when augmented AI identifies data that requires human validation, it can automatically dispatch review jobs to Mechanical Turk. Once the human experts verify the data, the results are reintegrated into the augmented AI process, maintaining high standards of accuracy throughout your workflow.

> [!important]
> **Key Takeaway**
>
> Amazon Augmented AI is an indispensable solution when you need a reliable human second opinion to validate machine learning predictions and continuously refine your models with expert feedback.

For more detailed information on integrating human review into machine learning workflows, check out these resources:

- [Amazon Augmented AI (A2I)](https://aws.amazon.com/sagemaker/augmented-ai/)
- [Amazon Mechanical Turk](https://www.mturk.com/)
- [Amazon S3](https://aws.amazon.com/s3/)

Thank you for reading! If you have any questions or need further assistance, feel free to reach out to me on Slack.

Michael Forrester

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/17a91335-b95b-4f8a-940d-e56b4a6da4ad)**
>
> Watch video content
