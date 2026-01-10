# Section Intro - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Building-an-Interactive-Chatbot/Section-Intro)

---

## Table of Contents

- Section Intro
  - Word Completion vs. Chat Completion
  - What You’ll Build
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Building an Interactive Chatbot

# Section Intro

Welcome to this comprehensive guide on building an interactive chatbot powered by OpenAI’s GPT-3.5 and GPT-4 models. In this tutorial, you’ll learn how to:

- Craft effective prompts for both word-based and conversational APIs
- Manage conversation history to maintain context
- Assemble building blocks for a responsive customer-service chatbot
- Deploy a sample chatbot for a fictional fast-food burger restaurant

By the end of this lesson, you’ll have a solid understanding of how to integrate OpenAI’s chat completions into your applications and deliver a seamless conversational experience.

> [!important]
> **Prerequisites**
>
> Make sure you have an active OpenAI API key. You can sign up at [OpenAI](https://platform.openai.com/signup).

## Word Completion vs. Chat Completion

| Feature            | Word Completion                   | Chat Completion                                   |
| ------------------ | --------------------------------- | ------------------------------------------------- |
| API Endpoint       | `/v1/completions`                 | `/v1/chat/completions`                            |
| Input Format       | Plain prompt string               | Array of structured messages                      |
| Best Use Cases     | Short text generation, code fixes | Stateful conversations, multi-turn dialogues      |
| Model Examples     | `text-davinci-003`                | `gpt-3.5-turbo`, `gpt-4`                          |
| Context Management | Limited (token-based)             | Full message history, system/user/assistant roles |

## What You’ll Build

1.  **Prompt Engineering**: Learn how to frame user requests for accurate responses.
2.  **Context Storage**: Implement a history buffer to pass previous messages to the API.
3.  **Chat Loop**: Create an interactive loop to send and receive messages.
4.  **Fast-Food Bot**: Deploy a customer-service chatbot that takes orders, answers FAQs, and handles errors.

Let’s dive into the details!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/36c56a19-11f6-4db1-8bd7-bd6a96c82268/lesson/6be42d7c-95f5-40ec-aaae-d38ef0d950bf)**
>
> Watch video content
