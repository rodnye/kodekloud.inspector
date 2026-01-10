# Introduction to Generative AI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/What-is-Generative-AI/Introduction-to-Generative-AI)

---

## Table of Contents

- Introduction to Generative AI
  - Discriminative AI vs. Generative AI
  - Core Capabilities of Generative AI
  - Foundation Models: The Backbone of Generative AI
  - Further Reading and References
  - Watch Video
    - Practical Example

---

## Content

Mastering Generative AI with OpenAI

What is Generative AI

# Introduction to Generative AI

Generative AI is a rapidly advancing branch of deep learning that empowers users to create new, high-quality content—text, images, audio, and video—by learning the underlying patterns of large datasets. Once limited to research labs, generative AI tools are now accessible via web APIs and user-friendly interfaces, transforming how we automate creativity and problem solving.

## Discriminative AI vs. Generative AI

Deep learning approaches generally fall into two categories:

| Model Type     | Learning Paradigm                               | Primary Function              | Input Data          |
| -------------- | ----------------------------------------------- | ----------------------------- | ------------------- |
| Discriminative | Supervised (labeled data)                       | Classification and prediction | Images, tabular     |
| Generative     | Unsupervised / Semi-supervised (unlabeled data) | Content generation            | Text, images, video |

![The image illustrates the differences between Discriminative AI and Generative AI within deep learning models, highlighting their functions and data requirements. Discriminative AI focuses on classification and prediction using labeled datasets, while Generative AI deals with understanding data distribution and generating new data from large unlabeled datasets.](https://kodekloud.com/kk-media/image/upload/v1752881598/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Introduction-to-Generative-AI/discriminative-generative-ai-deep-learning.jpg)

> [!important]
> **Note**
>
> Discriminative models estimate the probability of labels given inputs (`P(y|x)`), whereas generative models learn the joint probability of inputs and outputs (`P(x, y)`) to create fresh data.

### Practical Example

- **Discriminative AI**  
  Input: Photo of a dog  
  Output: Label “dog”
- **Generative AI**  
  Input: Photo of a dog + prompt “dog wearing goggles”  
  Output: New image of a dog with goggles

![The image compares Discriminative AI and Generative AI, showing how a Predictive ML Model learns relationships between data and labels to produce labels, while a GenAI Model learns patterns in unstructured content to generate new content.](https://kodekloud.com/kk-media/image/upload/v1752881600/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Introduction-to-Generative-AI/discriminative-generative-ai-comparison.jpg)

## Core Capabilities of Generative AI

Generative models transform raw patterns into rich, novel outputs:

- **Text generation**  
  Articles, summaries, code snippets in English and multiple languages
- **Image and artwork creation**  
  Photorealistic renders, illustrations, style transfers
- **Video sequence synthesis**  
  Frame interpolation, short clips, animation
- **Audio and speech**  
  Music composition, voice cloning, sound effects

## Foundation Models: The Backbone of Generative AI

Foundation models are large-scale architectures pretrained on vast, diverse datasets. They serve as the starting point for fine-tuning on specific tasks:

- **Examples**
  - GPT family (OpenAI)
  - BERT and RoBERTa (Google)
  - Stable Diffusion (Stability AI)
- **Benefits**
  - Reduced training time
  - Transfer learning for specialized applications
  - Robust performance on unseen inputs

> [!important]
> **Warning**
>
> Always verify generated content for factual accuracy and potential biases. Generative AI can inadvertently replicate harmful patterns from its training data.

## Further Reading and References

- [OpenAI GPT-3 Documentation](https://platform.openai.com/docs)
- [Hugging Face Models](https://huggingface.co/models)
- [Deep Learning Overview](https://www.deeplearning.ai/tutorials/)
- [Ethics in AI](https://www.partnershiponai.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/5f4c8f03-fd62-495c-a094-5749ee57001d/lesson/511ec2f1-f2b0-40d9-b7f6-c211a9dd2a1a)**
>
> Watch video content
