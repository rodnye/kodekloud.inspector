# What are Tokens - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Understanding-Tokens-and-API-Parameters/What-are-Tokens)

---

## Table of Contents

- What are Tokens
  - Tokenization in OpenAI Models
  - Tools for Exploring Tokenization
  - Context Length and Token Limits
  - Token Cost Impact
  - Interactive Tokenizer Demo
  - Programmatic Tokenization with Tiktoken
  - Links and References
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Understanding Tokens and API Parameters

# What are Tokens

In this guide, we’ll dive into how large language models (LLMs) like GPT-3 and ChatGPT convert text into numerical units called **tokens**. Rather than processing words or sentences directly, these models operate on tokens: when you submit a prompt, it’s first transformed into tokens; when the model replies, it generates tokens that are decoded back into human-readable text.

![The image is a flowchart illustrating how Large Language Models (LLMs) function, showing the process from prompt to tokens, model processing, and response.](https://kodekloud.com/kk-media/image/upload/v1752881570/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/llm-function-flowchart-prompt-tokens-response.jpg)

> [!important]
> **Note**
>
> Tokens represent sub-word units rather than full words. Breaking text into these pieces is called **tokenization**.

## Tokenization in OpenAI Models

For OpenAI’s GPT-3 family, one token typically equals about four English characters. In practical terms:

| Metric       | Approximate Equivalence |
| ------------ | ----------------------- |
| 1 token      | ~4 characters           |
| 100 tokens   | ~75 words               |
| 2,048 tokens | ~1,500 words            |

> [!important]
> **Note**
>
> These are averages—actual token counts vary based on language, punctuation, and formatting.

![The image explains tokenization for OpenAI models like GPT-3, detailing how characters and words are converted into tokens. It provides examples of token-to-character and token-to-word conversions.](https://kodekloud.com/kk-media/image/upload/v1752881571/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/openai-tokenization-gpt3-explained.jpg)

## Tools for Exploring Tokenization

To inspect how your text is split into tokens, try these:

| Tool             | Description                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI Tokenizer | Interactive web app to visualize token boundaries: [https://platform.openai.com/tokenizer](https://platform.openai.com/tokenizer) |
| Tiktoken         | Open-source Python library for encoding/decoding tokens: [https://github.com/openai/tiktoken](https://github.com/openai/tiktoken) |

![The image shows two tools for exploring tokens: OpenAI's tokenizer platform and a GitHub repository for "tiktoken."](https://kodekloud.com/kk-media/image/upload/v1752881572/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/openai-tokenizer-tiktoken-tools.jpg)

## Context Length and Token Limits

Every LLM enforces a maximum **context length**, which is the sum of input and output tokens in a single request. Exceeding this limit triggers errors or truncated responses.

- Current cap for many OpenAI models: **4,097 tokens**
- Example: If your prompt consumes 4,000 tokens, you have only 97 tokens left for the model’s answer.

To work with longer conversations, split your text into chunks or feed previous model outputs as new inputs.

![The image explains token limits for OpenAI models, stating a maximum token size of 4,097 and suggesting ways to manage prompt limitations.](https://kodekloud.com/kk-media/image/upload/v1752881573/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/openai-token-limits-prompt-management.jpg)

## Token Cost Impact

OpenAI’s billing is based on tokens processed. For example, GPT-3.5 Turbo is priced at **$0.002 per 1,000 tokens** (check the [latest pricing](https://openai.com/pricing)).

Monitoring token usage helps you:

- Optimize prompt length to fit within context limits
- Manage monthly spending by choosing shorter prompts or more efficient models

![The image explains the cost impact of token size for GPT-3.5 Turbo, which is $0.002 per 1,000 tokens, and suggests optimizing costs by selecting the right model variation, reducing token size, and setting usage limits.](https://kodekloud.com/kk-media/image/upload/v1752881574/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/gpt-3-5-turbo-token-cost-impact.jpg)

## Interactive Tokenizer Demo

Try the OpenAI Tokenizer with this prompt:

```
If it is 9AM in London, what time is it in Hyderabad. Be concise.
```

- Characters: 65
- Words: 14
- Tokens: 19

![The image shows a webpage from WordCounter.net displaying a text box with a sentence about time conversion between London and Hyderabad. It includes word and character count details on the side.](https://kodekloud.com/kk-media/image/upload/v1752881576/notes-assets/images/Mastering-Generative-AI-with-OpenAI-What-are-Tokens/wordcounter-time-conversion-london-hyderabad.jpg)

You can also inspect the raw token IDs—a vector of integers—for advanced debugging.

## Programmatic Tokenization with Tiktoken

Install the library:

```
pip install tiktoken
```

Use it in Python:

```
import tiktoken


# Choose encoding for your model
encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")


prompt = "If it is 9AM in London, what time is it in Hyderabad. Be concise."


# Encode text → list of token IDs
tokens = encoding.encode(prompt)
print(tokens)
# Count tokens
print(len(tokens))  # 19


# Decode back to text
print(encoding.decode(tokens))
# "If it is 9AM in London, what time is it in Hyderabad. Be concise."
```

---

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- [Tiktoken on GitHub](https://github.com/openai/tiktoken)
- [OpenAI Pricing](https://openai.com/pricing)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/e983525e-3a5a-4043-9319-4f259e41bc79/lesson/79a3c5fa-415e-4e90-a032-391ad1a0fd61)**
>
> Watch video content
