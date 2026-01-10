# Basic Concepts of Generative AI tokens chunking embeddings and more - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Fundamentals-of-Generative-AI/Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more)

---

## Table of Contents

- Basic Concepts of Generative AI tokens chunking embeddings and more
  - Why Generative AI?
  - AI Models and the Transformer Architecture
  - Tokens and Tokenization
  - Embeddings and Vectors
  - Chunking
  - Large Language Models (LLMs)
  - Prompt Engineering
  - Multimodal Models
  - Conclusion
  - Watch Video
    - Context Windows

---

## Content

AWS Certified AI Practitioner

Fundamentals of Generative AI

# Basic Concepts of Generative AI tokens chunking embeddings and more

Welcome to this comprehensive lesson on generative AI. In this guide, you will gain an in-depth understanding of how generative AI works, from the fundamentals of tokenization to the intricacies of transformer architectures. Be sure to take notes along the way to maximize your learning.

---

## Why Generative AI?

Generative AI has rapidly transformed industries since its emergence, becoming a force multiplier across a range of applications—from classification and text generation to image creation and human-like interactions. Leveraging pre-trained language models, generative AI enhances efficiency, personalization, and creativity for businesses.

![The image explains the benefits of generative AI, highlighting its role in transforming industries, powering applications like text and image generation, and improving business efficiency and creativity.](https://kodekloud.com/kk-media/image/upload/v1752857486/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/generative-ai-benefits-transforming-industries.jpg)

At its core, generative AI creates original content such as text, images, videos, or code by generating new outputs that mirror the patterns it learned during training. Unlike traditional AI, which makes predictions based solely on historical data, generative AI produces innovative and context-aware solutions.

---

## AI Models and the Transformer Architecture

AI models are algorithms trained on massive datasets to recognize and replicate patterns. Neural networks form the foundation of these models, allowing them to handle diverse data types including text, images, and videos. For instance, when generating text, models predict the next token (or minimal word unit) based on prior context and relational patterns.

![The image is an infographic about generative AI models, highlighting their core built from neural networks, their use of data and prompts to generate outputs, and their ability to predict the next token or word based on learned patterns.](https://kodekloud.com/kk-media/image/upload/v1752857488/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/generative-ai-models-infographic.jpg)

A standout advancement in this field is the transformer network, defined by its "Attention Is All You Need" approach. Transformers efficiently process large sequences of data—such as full paragraphs—in parallel, making them far more powerful than previous recurrent neural network architectures. This parallel processing is instrumental in breaking down lengthy input sequences into smaller, manageable parts.

![The image describes a "Transformer Network," highlighting its parallel processing capabilities, foundational role in models like GPT and BERT, and its efficiency in handling long data sequences for generative AI.](https://kodekloud.com/kk-media/image/upload/v1752857489/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/transformer-network-parallel-processing.jpg)

### Context Windows

Transformers operate within a fixed-size "context window" that defines the model's capacity to remember and process input data. A larger window allows for handling more extensive or complex inputs—from a few sentences to entire book chapters—thereby preserving context and structure in the model's output.

![The image explains the concept of a "Context Window" in models, highlighting its role in processing input data, determining memory capacity, and handling complex inputs.](https://kodekloud.com/kk-media/image/upload/v1752857490/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/context-window-models-explanation.jpg)

---

## Tokens and Tokenization

Generative AI models work by breaking text into smaller units called tokens. This tokenization process converts text into sequences, which makes it easier for the model to analyze and predict subsequent tokens based on learned patterns.

> [!important]
> **Note**
>
> Tokenization is essential because the model does not understand complete sentences; instead, it operates on these smaller token units to generate coherent and contextually relevant outputs.

![The image explains tokens and tokenization, highlighting tokens as the smallest units of data and tokenization as the process of breaking down input into tokens, essential for AI language processing.](https://kodekloud.com/kk-media/image/upload/v1752857491/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/tokens-and-tokenization-explained.jpg)

---

## Embeddings and Vectors

Embeddings are numerical representations of tokens that capture the semantic meaning of words or phrases. Each token is encoded as a multidimensional vector, where words with similar meanings—like "do," "doing," and "done"—are positioned closer together in vector space. This numerical transformation is crucial for mathematical computations within AI models.

![The image explains embeddings and vectors, describing embeddings as numeric representations of words or phrases, and vectors as ordered lists of numbers representing data features, used to understand relationships in generative AI models.](https://kodekloud.com/kk-media/image/upload/v1752857493/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/embeddings-vectors-generative-ai-explained.jpg)

In addition to text, embeddings are applied to other data types such as images and videos, helping models understand complex multimodal relationships.

---

## Chunking

Chunking is the process of breaking down extensive data into smaller, more manageable sections. For example, a large article about dog breeds might be segmented into chunks focused on individual breeds or specific breed characteristics.

![The image explains "chunking" in generative AI, highlighting its use in breaking down large data into manageable pieces, aiding AI processing, and emphasizing the importance of choosing the right chunk size for accurate results.](https://kodekloud.com/kk-media/image/upload/v1752857494/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/chunking-in-generative-ai-explained.jpg)

Choosing the appropriate chunk size is essential—smaller chunks often yield higher precision by narrowing the topic, while larger chunks provide broader context but might reduce relevance.

---

## Large Language Models (LLMs)

Large Language Models, such as GPT and BERT, are based on transformer architectures and are trained on extensive text datasets. These models are highly versatile, capable of tasks like text completion, translation, and summarization, and they can generate human-like text from minimal examples.

![The image is an informational graphic about Large Language Models (LLMs), describing them as generative AI models trained on vast text data, with examples like GPT and BERT that generate coherent, context-aware text.](https://kodekloud.com/kk-media/image/upload/v1752857497/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/large-language-models-infographic.jpg)

---

## Prompt Engineering

Prompt engineering involves designing and refining the inputs provided to an AI model to guide the generation of desired outputs. The quality of the prompt has a direct impact on the model’s performance, especially given the constraints of its context window. Techniques in prompt engineering include:

- **Zero-shot learning:** Instructing the model to perform a task without providing any examples.
- **One-shot learning:** Offering a single example as guidance.
- **Few-shot learning:** Providing several examples to help the model understand and replicate the task.

![The image is an infographic about prompt engineering, explaining that it involves designing prompts to achieve desired outputs and includes techniques like zero-shot, one-shot, and few-shot learning.](https://kodekloud.com/kk-media/image/upload/v1752857498/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/prompt-engineering-infographic-techniques.jpg)

For instance, in zero-shot learning, a model might be tasked with classifying an unfamiliar object based solely on descriptive attributes, whereas one-shot and few-shot learning rely on one or a few examples to refine model output.

---

## Multimodal Models

Unlike single-mode models that focus on one data type, multimodal models can simultaneously process and generate various forms of data—such as text, images, audio, and video. These models are adept at tasks like generating images from text descriptions, captioning images, and conducting complex multimedia analyses.

Diffusion models, a subset of multimodal models, are particularly known for generating high-quality visuals. They work by iteratively transforming random noise into coherent images, videos, or audio clips.

![The image is an informational graphic about diffusion models, explaining their use in generating high-quality images, audio, and video by reversing a noise-adding process, and their application in tasks like image generation and upscaling.](https://kodekloud.com/kk-media/image/upload/v1752857499/notes-assets/images/AWS-Certified-AI-Practitioner-Basic-Concepts-of-Generative-AI-tokens-chunking-embeddings-and-more/diffusion-models-image-generation-graphic.jpg)

In creative industries, diffusion models like Stable Diffusion are gaining popularity for image generation, editing, and restoration due to their versatility and precision.

---

## Conclusion

This lesson provided an overview of critical generative AI concepts, including large language models, transformer architectures, context windows, tokenization, embeddings, chunking, prompt engineering, and multimodal models. Each concept is fundamental to how generative AI creates original and coherent outputs from extensive datasets.

Before you proceed, we encourage you to take the end-of-section quiz to reinforce your understanding. We look forward to guiding you through the next lesson.

> [!important]
> **Further Reading**
>
> For additional insights on these topics, explore the [Kubernetes Documentation](https://kubernetes.io/docs/), [Docker Hub](https://hub.docker.com/), and [Terraform Registry](https://registry.terraform.io/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/34a4e82e-7538-4fac-a622-dbc6a28ffcbb/lesson/347daacf-f447-4757-874f-eabeeb1f335b)**
>
> Watch video content
