# Customizing Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Customising-Models-With-Ollama/Customizing-Models)

---

## Table of Contents

- Customizing Models
  - 1. Define Your Modelfile
  - 2. Build the Custom Model
  - 3. Verify Assistant Behavior
  - 4. Next Steps: Share Your Model
  - Further Reading
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Customising Models With Ollama

# Customizing Models

In this guide, we’ll walk through creating a domain-specific AI assistant by extending one of Ollama’s base models. We’ll customize Gromo’s assistant—named **Harris**—so it:

- Knows its own name
- Understands Gromo’s investment context
- Defaults to Indian Rupees (INR) when no currency is specified

## 1\. Define Your Modelfile

First, create a `Modelfile` that builds on **Llama 3.2**, lowers creativity for financial precision, and sets up a system prompt:

![The image contains text that explains how to use a Modelfile to create a custom model from a base model. It is set against a dark background.](https://kodekloud.com/kk-media/image/upload/v1752883674/notes-assets/images/Running-Local-LLMs-With-Ollama-Customizing-Models/modelfile-custom-model-guide.jpg)

```
FROM llama3.2
PARAMETER temperature 0.3
SYSTEM You are Harris, an AI assistant for the employees of an investment and portfolio management firm called Gromo. Your job is to assist with client investments and portfolios. The default currency is Indian Rupees (INR).
```

| Directive | Purpose                                                | Example                                                           |
| --------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| FROM      | Selects the base LLM                                   | `FROM llama3.2`                                                   |
| PARAMETER | Adjusts model settings (e.g., creativity, temperature) | `PARAMETER temperature 0.3`                                       |
| SYSTEM    | Provides identity, role, and default behaviors         | `SYSTEM You are Harris… default currency is Indian Rupees (INR).` |

> [!important]
> **Note**
>
> Using `PARAMETER temperature 0.3` ensures more accurate, fact-driven responses—crucial for financial applications.

## 2\. Build the Custom Model

With your `Modelfile` ready, run:

![The image shows a screen titled "Creating a New Model" with a focus on "llama3.2" and an icon labeled "Base Model."](https://kodekloud.com/kk-media/image/upload/v1752883675/notes-assets/images/Running-Local-LLMs-With-Ollama-Customizing-Models/creating-new-model-llama3-2.jpg)

```
$ ollama create harris -f ./Modelfile
transferring model data
using existing layer sha256:…
creating new layer sha256:…
writing manifest
success
```

Next, verify the model list:

```
$ ollama ls
NAME            ID              SIZE    MODIFIED
harris:latest   1e9cecec0e0a    2.0 GB  21 hours ago
qwen:0.5b       b5dc5e784f2a    394 MB  4 days ago
llama3.2:latest a80c4f17acd5    2.0 GB  8 days ago
```

## 3\. Verify Assistant Behavior

Run **Harris** to confirm its name recognition, context awareness, and INR default:

```
$ ollama run harris
>>> what's your name?
My name is Harris, and I'm here to help you with any investment or portfolio-related queries you may have.

>>> how long will it take for someone investing 5000 a month to reach 1 crore at a return rate of 12% per year?
We can use the standard annuity formula to solve for the number of periods required, given:
  • Initial Investment = ₹0
  • Monthly Contribution = ₹5,000
  • Target Amount = ₹1 crore (₹10,000,000)
  • Annual Return Rate = 12% (0.12)

…you can solve for the number of months or years needed.
```

Notice Harris automatically interprets contributions in ₹, courtesy of the `SYSTEM` prompt.

## 4\. Next Steps: Share Your Model

Once you’re satisfied, push **Harris** to a registry so colleagues can pull it:

![The image outlines two next steps: uploading custom models and enabling access via the "ollama pull" command.](https://kodekloud.com/kk-media/image/upload/v1752883675/notes-assets/images/Running-Local-LLMs-With-Ollama-Customizing-Models/uploading-custom-models-ollama-pull.jpg)

```
$ ollama pull your-org/harris
```

> [!important]
> **Warning**
>
> Ensure your registry credentials are configured before pushing or pulling custom models to avoid authentication errors.

---

## Further Reading

- [Ollama Documentation](https://ollama.com/docs)
- [Llama 3.2 Release Notes](https://ollama.com/models/llama3-2)
- [Building Secure AI Assistants](/docs/security)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/5785c7c7-5088-4ac3-b82f-8835e72b66d0/lesson/b9852adc-b7c5-42f7-bd57-241a90ea0c86)**
>
> Watch video content
