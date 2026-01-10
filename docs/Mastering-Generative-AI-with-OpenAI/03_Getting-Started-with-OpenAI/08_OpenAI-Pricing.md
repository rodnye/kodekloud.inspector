# OpenAI Pricing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Getting-Started-with-OpenAI/OpenAI-Pricing)

---

## Table of Contents

- OpenAI Pricing
  - Text-Based Use Cases
  - Links and References
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Getting Started with OpenAI

# OpenAI Pricing

> [!important]
> **Pricing Disclaimer**
>
> OpenAI’s pricing is dynamic and may change at any time. For the most current rates, please visit [openai.com/pricing](https://openai.com/pricing).

OpenAI categorizes its foundation models into three primary types—text, image, and audio—each charged using a distinct unit:

| Model Category  | Billing Unit        | Basis                                           |
| --------------- | ------------------- | ----------------------------------------------- |
| Text            | 1,000 tokens        | ~750 words per 1,000 tokens                     |
| Image           | Per generated image | Cost varies by image resolution                 |
| Audio (Whisper) | Per second of audio | Charged by duration (transcription/translation) |

> [!important]
> **Measuring Token Usage**
>
> A token corresponds to roughly 0.75 English words. Tools like [tiktoken](https://github.com/openai/tiktoken) help estimate token counts before you send requests.

## Text-Based Use Cases

Text models support a variety of tasks, each billed per 1,000 tokens:

| Use Case             | Description                        |
| -------------------- | ---------------------------------- |
| Word/Code Completion | Predictive text or code generation |
| Chat                 | Conversational AI interactions     |
| Embeddings           | Semantic vector generation         |
| Fine-Tuning          | Custom model training              |

![The image shows the OpenAI pricing model for text, image, and audio services, detailing costs per 1,000 tokens for various tasks like word/code completion, chat, embedding, fine-tuning, and Whisper audio.](https://kodekloud.com/kk-media/image/upload/v1752881527/notes-assets/images/Mastering-Generative-AI-with-OpenAI-OpenAI-Pricing/openai-pricing-model-tokens-services.jpg)

> [!important]
> **Stay Up to Date**
>
> Always check the [official pricing page](https://openai.com/pricing) before planning your integration or budgeting for production workloads.

---

We’ll now take a closer look at ChatGPT—how it works and how to integrate it into your applications.

## Links and References

- [OpenAI Pricing](https://openai.com/pricing)
- [tiktoken GitHub Repository](https://github.com/openai/tiktoken)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/7cf291c5-4705-4a69-965a-b0ba7d2169c6/lesson/e77a45ed-debb-4df4-bdf9-a3a767c9357f)**
>
> Watch video content
