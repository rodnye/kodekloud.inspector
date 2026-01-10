# Leveraging Ollama Models in Application Development - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Building-AI-Applications/Leveraging-Ollama-Models-in-Application-Development)

---

## Table of Contents

- Leveraging Ollama Models in Application Development
  - Recap: Interacting with Ollama via REST API
  - Integrating API Calls into Your Application
  - Real-World Scenarios
  - Example: Pulumi’s Infrastructure Chatbot
  - Choosing Your Client Library
  - Hands-On: Poem Generator in Python
  - Next Steps
  - References and Further Reading
  - Watch Video
    - Core AI Application Workflow

---

## Content

Running Local LLMs With Ollama

Building AI Applications

# Leveraging Ollama Models in Application Development

In this lesson, you’ll learn how to build AI-powered applications by integrating local Ollama models directly into your code. We’ll cover the end-to-end workflow—from capturing user input and invoking an LLM to processing and displaying responses. Our examples focus on Python, but the same patterns apply to Go, JavaScript, and more.

## Recap: Interacting with Ollama via REST API

Before diving into code, let’s revisit how we used `curl` to query local models:

![The image is a slide titled "Recap" with two points: interacting with the Ollama REST API using "curl" and getting a response from different models.](https://kodekloud.com/kk-media/image/upload/v1752883654/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/recap-ollama-rest-api-curl.jpg)

Key takeaways:

- Use `curl` to POST messages to your Ollama server.
- Retrieve structured JSON responses from any running model.

## Integrating API Calls into Your Application

Instead of shell commands, embed API calls in your code. Whether you write in Python, Go, or JavaScript, you can leverage the OpenAI client libraries to target your local Ollama endpoint:

![The image titled "The Story of Jane" features icons for Python, Go, and JavaScript programming languages, along with an illustration labeled "Jane."](https://kodekloud.com/kk-media/image/upload/v1752883655/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/the-story-of-jane-programming-icons.jpg)

### Core AI Application Workflow

1.  Collect user input or fetch existing data.
2.  Send that input to a large language model (LLM).
3.  Process the response through your business logic.
4.  Present the final result to the user.

![The image is a flowchart illustrating the process of AI applications, showing steps of taking user input and sending it to a large language model (LLM) for a relevant response.](https://kodekloud.com/kk-media/image/upload/v1752883656/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/ai-applications-flowchart-llm-response.jpg)

## Real-World Scenarios

| Use Case                 | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| AI-Driven Chatbot        | Jane’s product docs bot answers user questions with context.   |
| Risk Assessment Platform | Growmore’s internal tool analyzes client data for risk scores. |

![The image illustrates a flowchart showing interactions between "Jane," an "AI Chatbot," and "Users," with an "AI Platform" and "Growmore" mentioned. It visually represents communication and information flow among these entities.](https://kodekloud.com/kk-media/image/upload/v1752883657/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/flowchart-jane-ai-chatbot-users.jpg)

## Example: Pulumi’s Infrastructure Chatbot

Pulumi’s [AI chatbot](https://pulumi.com/ai) lets you describe infrastructure in natural language and returns code in C#, Go, or Python:

```
package main


import (
    "github.com/pulumi/pulumi-aws/sdk/v6/go/aws/s3"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)


func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        bucket, err := s3.NewBucket(ctx, "my-bucket", nil)
        if err != nil {
            return err
        }
        ctx.Export("bucketName", bucket.ID())
        return nil
    })
}
```

By using OpenAI libraries, you can replicate this experience in your own app, swapping between a local Ollama host in development and the hosted OpenAI API in production—no code changes required.

## Choosing Your Client Library

Both Ollama and OpenAI support multiple languages. Below is a quick reference:

| Language   | Library                             | Local + Hosted Compatibility |
| ---------- | ----------------------------------- | ---------------------------- |
| Python     | `openai`                            | ✔️                           |
| TypeScript | `openai`                            | ✔️                           |
| Go         | `github.com/sashabaranov/go-openai` | ✔️                           |
| Java       | `com.theokanning.openai`            | ✔️                           |

![The image displays logos for Ollama and OpenAI at the top, and logos for Python, TypeScript, Go, and Java at the bottom, all on a dark background.](https://kodekloud.com/kk-media/image/upload/v1752883659/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/ollama-openai-python-typescript-go-java.jpg)

## Hands-On: Poem Generator in Python

Imagine an app where users submit prompts and receive custom poems:

![The image illustrates a process for building an application, showing a user interacting with AI, which uses a large language model (LLM) to generate a poem.](https://kodekloud.com/kk-media/image/upload/v1752883660/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/application-building-ai-poem-llm.jpg)

```
import os
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("LLM_ENDPOINT")  # e.g., "http://localhost:11434"
)


# User prompt for poem generation
input_message = "Write a haiku about autumn leaves."


response = client.chat.completions.create(
    model=os.getenv("MODEL"),
    messages=[
        {"role": "system", "content": "You are an AI chatbot specialized in writing poems."},
        {"role": "user", "content": input_message}
    ]
)


poem = response.choices[0].message.content
print(poem)
```

> [!important]
> **Warning**
>
> Ensure your environment variables (`OPENAI_API_KEY`, `LLM_ENDPOINT`, `MODEL`) are correctly set before running the script.> [!important]
> **Note**
>
> You can switch between your local Ollama server and the hosted OpenAI API simply by updating the `LLM_ENDPOINT` URL.

## Next Steps

Now that you’ve seen how to:

1.  Initialize the OpenAI client for local Ollama models
2.  Send chat completion requests
3.  Extract and display the generated text

You’re ready to build the full poem-generator application step by step.

![The image outlines two next steps: leveraging the OpenAI Python library and using the code to build an AI application.](https://kodekloud.com/kk-media/image/upload/v1752883662/notes-assets/images/Running-Local-LLMs-With-Ollama-Leveraging-Ollama-Models-in-Application-Development/openai-python-library-ai-application.jpg)

## References and Further Reading

- [OpenAI Python Library Documentation](https://github.com/openai/openai-python)
- [Ollama Official Guide](https://ollama.com/docs)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/8df2f2d5-d3c5-433d-b5f5-f553b040b2e7/lesson/df5bade3-d12b-4584-aae7-c4bdbaae39ff)**
>
> Watch video content
