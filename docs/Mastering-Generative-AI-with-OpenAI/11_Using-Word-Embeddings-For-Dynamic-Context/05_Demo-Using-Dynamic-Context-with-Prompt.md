# Demo Using Dynamic Context with Prompt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Using-Word-Embeddings-For-Dynamic-Context/Demo-Using-Dynamic-Context-with-Prompt)

---

## Table of Contents

- Demo Using Dynamic Context with Prompt
  - 1. Basic Chat Completion (No External Context)
  - 2. Injecting Static Context
  - 3. Why You Need Dynamic Context
  - 4. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Using Word Embeddings For Dynamic Context

# Demo Using Dynamic Context with Prompt

In this tutorial, we’ll cover **dynamic context injection**—a technique that ensures your chatbot always provides accurate, up-to-date answers by pulling relevant information at runtime. You’ll start with a basic chat application using the [OpenAI Chat Completion endpoint](https://platform.openai.com/docs/guides/chat) and evolve it into a robust system that sources context dynamically.

## 1\. Basic Chat Completion (No External Context)

First, observe how GPT-3.5-turbo handles a query about the 95th Academy Awards (March 2023) without any added context. Because its training data cuts off in September 2021, it won’t know about later events.

```
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "You answer questions about the 95th Academy Awards held in March 2023. Answer only if you are sure."
        },
        {
            "role": "user",
            "content": "Which movie won the Best Picture award?"
        }
    ]
)

print(response.choices[0].message.content)
```

Expected response:

```
I’m sorry, but I don’t have information on events after September 2021.
```

> [!important]
> **Note**
>
> Without external context, the model defaults to stating its knowledge cutoff.

## 2\. Injecting Static Context

To work around the cutoff, you can paste relevant excerpts from a trusted source directly into the prompt. For instance, from [Good Morning America](https://abcnews.go.com/GoodMorningAmerica/):

> On Hollywood’s biggest night, _Everything Everywhere All at Once_ reigned supreme, winning seven Oscars, including Best Picture.

Inject this snippet into your user message:

```
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "You answer questions about the 95th Academy Awards held in March 2023. Answer only if you are sure."
        },
        {
            "role": "user",
            "content": (
                "On Hollywood’s biggest night, \"Everything Everywhere All at Once\" reigned supreme, "
                "winning seven Oscars, including Best Picture. "
                "Which movie won the Best Picture award?"
            )
        }
    ]
)

print(response.choices[0].message.content)
```

Output:

```
"Everything Everywhere All at Once" won the Best Picture award at the 95th Academy Awards.
```

> [!important]
> **Warning**
>
> Static context can quickly bloat your prompt and is tedious to maintain as information changes.

## 3\. Why You Need Dynamic Context

Manual context updates are not scalable. Instead, build a pipeline that:

| Step                           | Description                                                      |
| ------------------------------ | ---------------------------------------------------------------- |
| 1\\. Store documents           | Save articles, transcripts, or FAQs in a vector database         |
| 2\\. Embed user queries        | Generate embeddings for incoming questions                       |
| 3\\. Retrieve relevant context | Perform a similarity search to fetch the most pertinent passages |
| 4\\. Inject into the prompt    | Append retrieved snippets dynamically before calling the API     |

This **dynamic context** approach keeps your chatbot current without manual prompt edits.

## 4\. Next Steps

In the following sections, we’ll demonstrate how to:

- Generate embeddings for your documents
- Set up and query a vector store (e.g., Pinecone, FAISS)
- Compose the final prompt with retrieved context and call the Chat Completion endpoint

Stay tuned for the detailed implementation guide!

## Links and References

- [OpenAI Chat Completion Guide](https://platform.openai.com/docs/guides/chat)
- [Good Morning America Oscars Coverage](https://abcnews.go.com/GoodMorningAmerica/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/478f01b4-0988-4d48-88d0-316f8e513f16)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/47024875-1f0f-49a1-a396-f4305f1b5ca2)**
>
> Practice lab
