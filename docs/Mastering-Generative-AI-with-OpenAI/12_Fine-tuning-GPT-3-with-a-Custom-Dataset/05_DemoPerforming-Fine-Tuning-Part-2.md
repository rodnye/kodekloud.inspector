# DemoPerforming Fine Tuning Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Fine-tuning-GPT-3-with-a-Custom-Dataset/DemoPerforming-Fine-Tuning-Part-2)

---

## Table of Contents

- DemoPerforming Fine Tuning Part 2
  - 1. Test Your Fine-Tuned Model via CLI
  - 2. Fine-Tuning Workflow Overview
  - 3. Test Your Model in Python

---

## Content

Mastering Generative AI with OpenAI

Fine tuning GPT 3 with a Custom Dataset

# DemoPerforming Fine Tuning Part 2

After completing your fine-tuning job, you can immediately evaluate your custom model either from the command line or within a Python script. This guide walks you through both methods.

---

## 1\. Test Your Fine-Tuned Model via CLI

Use the `openai api completions.create` command and specify your fine-tuned model’s ID, which you can copy from the fine-tuning job output:

```
openai api completions.create \
  -m "davinci:ft-janakiram-associates:sotu-qna-2023-08-05-17-12-17" \
  -p "When was the State of the Union presented?\n\n###\n\n" \
  --stop "['END','***']"
```

Example response:

```
When was the State of the Union presented?


###


The State of the Union was presented on February 5, 2023.
```

> [!important]
> **Tip**
>
> Replace the model ID with your own fine-tuned model name. You can find it in the CLI output or in your [OpenAI Dashboard](https://platform.openai.com/).

---

## 2\. Fine-Tuning Workflow Overview

Here’s a quick summary of the end-to-end fine-tuning process:

| Step | Description                                | CLI Example                                                      |
| ---- | ------------------------------------------ | ---------------------------------------------------------------- |
| 1    | Prepare the dataset (clean & format JSONL) | `openai tools fine_tunes.prepare_data -f data.jsonl`             |
| 2    | Upload and preprocess                      | Handled automatically by the API                                 |
| 3    | Create and monitor the fine-tune job       | `openai api fine_tunes.create -t data_prepared.jsonl -m davinci` |
| 4    | Test your deployed custom model            | Use CLI (`completions.create`) or integrate via code             |

For detailed instructions, see the [OpenAI Fine-Tuning Guide](https://platform.openai.com/docs/guides/fine-tuning).

---

## 3\. Test Your Model in Python

This Python example demonstrates:

- Configuring your API key
- Adding a suffix to control responses
- Looping through multiple prompts
- Printing questions with answers

```
import os
import openai


# ,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
