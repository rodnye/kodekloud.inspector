# Models and Model Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Models-and-Model-Parameters)

---

## Table of Contents

- Models and Model Parameters
  - Architecture
  - Parameters
  - Weights
  - Context Length
  - Embedding Length
  - Quantization
  - Links and References
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Models and Model Parameters

We’ve installed **Ollama** locally and launched our first large language model (LLM). In this guide, we’ll explore the full catalog of models that Ollama supports and learn how to interpret their technical specifications. Whether you’re a beginner or an experienced developer, you don’t need deep AI knowledge to get started—our analogies and examples will clarify each concept.

To browse all available models, visit [ollama.com/search](https://ollama.com/search). Below, we’ll show you how to search for models, inspect their details, and choose the right one for your project.

Consider **Jane**, a developer building a local AI assistant. When deciding on a model, she balances:

- Output quality (accuracy, coherence)
- Computational requirements (RAM, CPU/GPU)
- Hardware availability (laptop vs. server)

Ollama’s catalog includes families like Meta’s LLaMA, QWQ, Mistral, and more. You’ll see multiple versions—for example, LLaMA 3.3, 3.2, and 3.1. What do those numbers mean? Let’s dive in.

If you click a model on the website, you’ll see a detailed info page. For instance, on **LLaMA 3.2**, the specifications include its architecture, parameter count, and quantization format. You can also retrieve this info locally:

```
ollama run llama-3.2
# At the prompt, type:
show info
```

![The image shows a "Model Info Page" for Meta's Llama 3.2, detailing its specifications and features, with a Meta logo and a brief description of the model's capabilities.](https://kodekloud.com/kk-media/image/upload/v1752883705/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/llama-3-2-model-info-page.jpg)

Understanding these terms will help you select a model that aligns with your application’s requirements and hardware constraints. Let’s break them down.

## Architecture

A model’s architecture is its blueprint, defining the core design and the family it belongs to. For example, LLaMA 3.1, 3.2, and 3.3 all share the **LLaMA** architecture—Meta’s transformer-based model line.

> [!important]
> **Note**
>
> If you’ve already built pipelines around one architecture, sticking with the same family ensures consistent behavior.

![The image is a slide titled "Architecture" with three bullet points describing aspects of a model's design, its family, and its relation to the Llama family of models by Meta.](https://kodekloud.com/kk-media/image/upload/v1752883706/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/architecture-model-design-bullet-points.jpg)

Learn more about transformers in the [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) documentation.

## Parameters

Parameters are the “knowledge” learned during training, stored as numerical weights. Think of a model as a library: each parameter is like a book on the shelf. More parameters = more books = more stored information.

- **3.2 B parameters** means 3.2 billion “books.”
- For comparison, **GPT-3** has **175 B parameters**.

![The image is a slide titled "Parameters" with a description stating, "The 'knowledge' stored and learned during the training."](https://kodekloud.com/kk-media/image/upload/v1752883707/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/parameters-knowledge-training-slide.jpg)

Larger models typically yield better accuracy but require more memory and compute power.

> [!important]
> **Warning**
>
> High-parameter models can exceed your machine’s RAM and slow down inference. Choose a smaller model if you have limited resources.

![The image compares two models with different parameter sizes, illustrating a smaller model with million parameters and a larger GPT-3 model with billion parameters, totaling 3.2 billion parameters.](https://kodekloud.com/kk-media/image/upload/v1752883708/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/model-comparison-parameters-gpt3.jpg)

## Weights

Weights determine the strength of connections within the neural network. During training, these values are optimized—much like refining a recipe by adjusting ingredient ratios to get the best flavor.

- Each input feature is an ingredient.
- The weight assigns its importance in the final prediction.

![The image illustrates "Weights in LLM" with a brain icon labeled "Decision-making Brain" at the center, surrounded by a gradient arc from green (high) to red (low).](https://kodekloud.com/kk-media/image/upload/v1752883710/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/weights-in-llm-decision-making-brain.jpg)

Once training finishes, weights are fixed. If the model “knows” that 2 + 2 = 4, that pathway has a high weight compared to incorrect routes.

## Context Length

Context length (or context window) is the maximum number of tokens the model can process at once. Think of it as how much of your book you can feed to the model at a time.

- **131,072 tokens** ≈ 100K–130K words.

![The image is a slide titled "Context Length," explaining how much a model can "remember" and process at once, with an example text about a dog named Max in a village. It includes an icon labeled "Writing a Book."](https://kodekloud.com/kk-media/image/upload/v1752883710/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/context-length-model-memory-example.jpg)

Larger context lengths maintain coherence over longer documents or conversations but also increase memory usage.

![The image explains context length, showing that a model can process 131,072 tokens, equivalent to 100,000–130,000 words.](https://kodekloud.com/kk-media/image/upload/v1752883711/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/context-length-model-tokens-explanation.jpg)

> [!important]
> **Note**
>
> For long transcripts or codebases, choose a model with an extended context window to avoid cutting off important information.

## Embedding Length

When processing text, each token is converted into a vector of fixed length—this is the embedding length. Larger embeddings capture richer contextual information.

- **3,072-dimensional vector** → each token is represented in 3,072 dimensions.

![The image explains "Embedding Length," indicating that a vector representation of each token has a length of 3,072.](https://kodekloud.com/kk-media/image/upload/v1752883712/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/embedding-length-vector-representation.jpg)

Big embeddings help the model understand subtle nuances but increase computational load.

## Quantization

Quantization reduces numeric precision (e.g., from 32-bit floats to 4-bit integers) to save memory and speed up inference. It’s similar to compressing an image: you lose a bit of detail but gain storage and performance benefits.

![The image explains quantization, highlighting the reduction of precision from 32-bit to 4-bit to save memory and speed up processing.](https://kodekloud.com/kk-media/image/upload/v1752883713/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/quantization-precision-reduction-diagram.jpg)

> [!important]
> **Note**
>
> Quantized models (e.g., Q4, Q8) strike a balance between speed and accuracy, ideal for local development.

---

Next, we’ll navigate back to the Ollama website to explore additional models and run a second experiment on our local machine.

![The image outlines two next steps: exploring different models on the Ollama website and running a second model on a local machine.](https://kodekloud.com/kk-media/image/upload/v1752883714/notes-assets/images/Running-Local-LLMs-With-Ollama-Models-and-Model-Parameters/ollama-next-steps-models-running.jpg)

---

## Links and References

- [Ollama Documentation](https://ollama.com/docs/)
- [Transformer Architecture](https://arxiv.org/abs/1706.03762)
- [Quantization Techniques for LLMs](https://www.tensorflow.org/model_optimization/quantization)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/1c40541c-995a-42a4-b393-e99e3cb97b17)**
>
> Watch video content
