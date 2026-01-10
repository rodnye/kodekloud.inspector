# Types of Inferencing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Fundamentals-of-AI-and-ML/Types-of-Inferencing)

---

## Table of Contents

- Types of Inferencing
  - Real-Time Inferencing
  - Batch Inferencing
  - Watch Video
    - Comparison of Real-Time and Batch Inferencing

---

## Content

AWS Certified AI Practitioner

Fundamentals of AI and ML

# Types of Inferencing

Welcome back, students. Michael here.

In this article, we explore the various types of inferencing used in artificial intelligence (AI). Inferencing is the process of applying a trained AI model to new data in order to generate predictions or classifications. This allows the model to convert learned mathematical patterns into actionable insights—for example, classifying emails as spam, forecasting numerical trends, or detecting fraudulent activities.

![The image contains text explaining that inferencing is the process where AI models make predictions or decisions using new data.](https://kodekloud.com/kk-media/image/upload/v1752857466/notes-assets/images/AWS-Certified-AI-Practitioner-Types-of-Inferencing/ai-inferencing-predictions-explained.jpg)

After training, models can assess new inputs and produce probabilistic predictions. For instance, a spam filter trained on millions of emails will evaluate a new message and predict its likelihood of being spam. AI models find applications in numerous domains including fraud detection, product recommendation, and customer service automation.

![The image is an introduction to AI inferencing, showing a flow from "Training," where a model learns from historical data, to "Inferencing," where the model makes real-time decisions, with examples like fraud detection and product recommendation.](https://kodekloud.com/kk-media/image/upload/v1752857467/notes-assets/images/AWS-Certified-AI-Practitioner-Types-of-Inferencing/ai-inferencing-training-flow-diagram.jpg)

Once a model reaches a sufficient level of accuracy, it is deployed into production environments to make reliable inferences. There are two primary categories of inferencing: real-time inferencing and batch inferencing.

## Real-Time Inferencing

Real-time inferencing generates predictions or classifications instantly as data arrives. This approach is crucial for applications that demand immediate responses—such as chatbots, fraud detection systems, autonomous driving, and voice assistants like [Alexa](https://developer.amazon.com/en-US/alexa). As soon as an input is received, the model processes it immediately, ensuring prompt decision-making.

[Amazon SageMaker](https://aws.amazon.com/sagemaker/) is one example of a machine learning service that provides endpoints for deploying models capable of real-time inferencing. These endpoints are designed for high scalability and minimal latency.

![The image compares two types of inferencing: real-time inferencing, which processes data instantly, and batch inferencing, which processes data in bulk at scheduled intervals, both using Amazon SageMaker.](https://kodekloud.com/kk-media/image/upload/v1752857468/notes-assets/images/AWS-Certified-AI-Practitioner-Types-of-Inferencing/real-time-vs-batch-inferencing-sagemaker.jpg)

Real-time inferencing is especially evident in voice assistants. For example, when you ask [Alexa](https://developer.amazon.com/en-US/alexa), "What's the weather today?", the system processes your query immediately and returns the current forecast.

![The image explains real-time inferencing, highlighting its use in making instant predictions and its applications in voice assistants and self-driving cars. It includes a visual of a person asking a voice assistant about the weather.](https://kodekloud.com/kk-media/image/upload/v1752857470/notes-assets/images/AWS-Certified-AI-Practitioner-Types-of-Inferencing/real-time-inferencing-voice-assistants.jpg)

## Batch Inferencing

In contrast, batch inferencing handles large volumes of data by processing them collectively at scheduled intervals, rather than one record at a time. This method is best suited for scenarios where immediate responses are not required, but efficiency in processing extensive datasets is essential.

Batch inferencing proves ideal for tasks such as sentiment analysis on social media data accumulated over hours or days, stock market predictions, and customer segmentation. [Amazon SageMaker](https://aws.amazon.com/sagemaker/) also supports batch inferencing through its batch transform jobs, enabling users to process vast datasets collectively.

> [!important]
> **Note**
>
> Real-time inferencing is optimal for live applications requiring instant feedback, whereas batch inferencing is better suited for comprehensive analysis where time sensitivity is less critical.

### Comparison of Real-Time and Batch Inferencing

| Category              | Description                                                                                                           | Use Cases                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Real-Time Inferencing | Processes incoming data immediately, providing instant predictions.                                                   | Chatbots, fraud detection, autonomous driving, voice assistants     |
| Batch Inferencing     | Processes data in bulk at set intervals, ideal for extensive data analysis where immediate response is not necessary. | Sentiment analysis, stock market predictions, customer segmentation |

Thank you for reading this article. I look forward to exploring more topics with you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/e79d4d90-43ff-4f6a-a5c0-fe2e960cb76d/lesson/e944bce1-a9a3-4301-9638-be566c205bab)**
>
> Watch video content
