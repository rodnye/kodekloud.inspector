# Messages in ChatModel - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Messages-in-ChatModel)

---

## Table of Contents

- Messages in ChatModel
  - Table of Contents
  - Core Message Types
  - Message Workflow
  - Statefulness and LLMs
  - Implementing in LangChain
  - Links and References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Messages in ChatModel

Unlock the full potential of chat-based interactions by understanding how messages are structured in a chat model. Whether you’re building a conversational AI assistant or integrating a chatbot into your application, mastering the flow of messages ensures richer, more accurate interactions.

## Table of Contents

1.  [Core Message Types](#core-message-types)
2.  [Message Workflow](#message-workflow)
3.  [Statefulness and LLMs](#statefulness-and-llms)
4.  [Implementing in LangChain](#implementing-in-langchain)
5.  [Links and References](#links-and-references)

---

## Core Message Types

When working with a chat model, all communication is framed as a sequence of three distinct message objects:

| Message Type | Purpose                                 | Example                       |
| ------------ | --------------------------------------- | ----------------------------- |
| System       | Establishes persona or global settings  | “Act like a physics teacher.” |
| Human        | Captures user input or inquiries        | “Explain Newton’s laws.”      |
| AI           | Contains the model’s generated response | “Newton’s first law states…”  |

> [!important]
> **Note**
>
> System and human messages together form the **prompt** sent to the model. AI messages are the model’s replies based on that prompt sequence.

---

## Message Workflow

Below is a high-level flowchart illustrating how your application composes and processes these messages before, during, and after calling the chat model API:

![The image is a flowchart illustrating the process of understanding messages in a chat model, showing the transition from an application to system, human, and AI messages, leading to a chat model involving a dietician.](https://kodekloud.com/kk-media/image/upload/v1752880971/notes-assets/images/LangChain-Messages-in-ChatModel/chat-model-message-understanding-flowchart.jpg)

1.  **Initialize System Message**
2.  **Accept Human Message**
3.  **Invoke Chat Model**
4.  **Receive AI Message**
5.  **Render Response to User**

---

## Statefulness and LLMs

Large language models (LLMs) do not maintain memory across separate sessions. This means every new conversation **must** include its system message to preserve context.

> [!important]
> **Warning**
>
> If you omit the system message at the start of a session, the model will have no persona or configuration, leading to unpredictable or generic responses.

![The image explains that large language models (LLMs) lack statefulness, meaning they do not recall or remember anything.](https://kodekloud.com/kk-media/image/upload/v1752880972/notes-assets/images/LangChain-Messages-in-ChatModel/llms-lack-statefulness-explanation.jpg)

---

## Implementing in LangChain

[LangChain](https://langchain.com) simplifies prompt construction by treating each message as an object. Here’s a basic example in JavaScript:

```
import { ChatOpenAI } from "langchain/chat_models";
import {
  SystemMessage,
  HumanMessage,
  AIMessage
} from "langchain/schema";


const chat = new ChatOpenAI({ temperature: 0.7 });


const messages = [
  new SystemMessage("You are a friendly dietician."),
  new HumanMessage("What is a balanced meal plan for weight loss?")
];


const response = await chat.call(messages);
console.log(response); // AIMessage with the diet plan
```

Use this pattern to chain multiple messages, inject context, or adjust personas dynamically.

---

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI Chat Models](https://platform.openai.com/docs/models/chat)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Explore these resources for deeper dives into conversational AI, deployment best practices, and scaling your chat application.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/677506d8-0d22-4c90-bee6-b358e5f08e30)**
>
> Watch video content
