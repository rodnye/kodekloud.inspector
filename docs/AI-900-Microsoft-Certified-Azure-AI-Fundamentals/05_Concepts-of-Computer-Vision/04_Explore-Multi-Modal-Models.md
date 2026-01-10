# Explore Multi Modal Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Concepts-of-Computer-Vision/Explore-Multi-Modal-Models)

---

## Table of Contents

- Explore Multi Modal Models
  - Core Capabilities
  - Model Architecture
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Concepts of Computer Vision

# Explore Multi Modal Models

Multimodal models are revolutionizing artificial intelligence by simultaneously processing diverse data types, such as images and text. This fusion of language and vision capabilities makes them exceptionally versatile for a variety of computer vision tasks.

When a multimodal model processes content—like a picture of a fruit accompanied by a label reading "apple"—it leverages both visual and textual context. This integrated approach leads to more informed and accurate interpretations.

## Core Capabilities

Multimodal models can execute several tasks concurrently:

- **Image Classification:** Automatically categorizes images into predefined classes.
- **Object Detection:** Identifies and locates objects within an image.
- **Image Captioning:** Generates descriptive captions that reflect the content of an image.
- **Tagging:** Associates relevant keywords with images to improve searchability and further training (e.g., tagging an image of an orange with “orange, fruit, healthy, citrus”).

![The image illustrates different types of multi-modal models, including image classification, object detection, captioning, and tagging, using fruit as examples. Each model is depicted with a corresponding fruit image and description.](https://kodekloud.com/kk-media/image/upload/v1752856955/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Explore-Multi-Modal-Models/multi-modal-models-fruit-examples.jpg)

The strength of these models lies in capturing semantic relationships between visual elements and descriptive language. For instance, linking the shape and color of an apple with its textual label helps the model generate precise predictions and enhanced image descriptions.

![The image illustrates the concept of multi-modal models, showing the integration of speech and vision data to process image and text data, enhancing the ability to understand and generate insights.](https://kodekloud.com/kk-media/image/upload/v1752856956/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Explore-Multi-Modal-Models/multi-modal-models-speech-vision.jpg)

## Model Architecture

Multimodal models typically consist of two main components:

- **Foundation Model:** A pre-trained model on extensive datasets, providing general knowledge of image and text representations.
- **Adaptive Model:** A fine-tuned version of the foundation model, optimized for specific tasks such as image classification, object detection, captioning, or tagging.

![The image is a diagram titled "Multi-Modal Models," showing four components: Classification, Object Detection, Captioning, and Tagging, under the category "Foundation and adaptive models."](https://kodekloud.com/kk-media/image/upload/v1752856958/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Explore-Multi-Modal-Models/multi-modal-models-classification-diagram.jpg)

> [!important]
> **Note**
>
> Microsoft's Florence model serves as a prominent example of a foundation model. Trained on millions of images coupled with text captions from the internet, Florence comprises two main parts:
>
> - **Language Encoder**
> - **Image Encoder**
>
> These components enable Florence to be adapted for targeted tasks within Azure AI Vision, such as image categorization, object detection, caption generation, and image tagging.

Leveraging foundation models like Florence accelerates the development of adaptable computer vision solutions. This approach minimizes development time and enhances the performance of systems dealing with both images and text.

With the fundamentals of computer vision and multi-modal models outlined, the next section provides an overview of the computer vision services available in Azure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/ea26ec15-029f-4b2e-953e-3c9e3840f9f9/lesson/03ab4ab4-a41e-4064-90e7-519c8d770267)**
>
> Watch video content
