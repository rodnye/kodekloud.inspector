# Prompt Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Prompt-Templates)

---

## Table of Contents

- Prompt Templates
  - What Are Prompt Templates?
  - Benefits of Using Prompt Templates
  - Core Components
  - Demo Scenarios
  - Links and References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Prompt Templates

In this lesson, we’ll dive into **prompt templates**—parameterized messages that make your LangChain interactions more flexible, consistent, and reusable. Instead of hard-coding each system, human, or AI message, you define templates with placeholders that are filled in at runtime.

## What Are Prompt Templates?

A prompt template is a blueprint for your LLM interactions. You can:

- Define **system**, **human**, or **AI** messages with named placeholders
- Populate placeholders at runtime, generating **dynamic prompts**
- Chain multiple templates together, passing data from one step to the next
- Standardize messaging across your team for a consistent LLM experience

> [!important]
> **Note**
>
> Always verify that all placeholders match the input keys you supply at runtime to avoid template rendering errors.

## Benefits of Using Prompt Templates

| Benefit         | Description                                     | Example                                                |
| --------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Reusability     | Create once, reuse across multiple chains       | `greeting = "Hello, {user_name}!"`                     |
| Consistency     | Enforce a standard messaging format             | System prompts that always start with company branding |
| Flexibility     | Quickly swap out placeholders or default values | Changing `{user_name}` to `{customer_name}` globally   |
| Maintainability | Easier updates when requirements evolve         | Update tone or style in one template file              |

## Core Components

1.  **System Message Template**  
    Typically sets the overall behavior of the LLM.

    ```
    from langchain.prompts import SystemMessagePromptTemplate


    system_template = SystemMessagePromptTemplate.from_template(
        "You are a helpful assistant for {company_name} support."
    )
    ```

2.  **Human Message Template**  
    Captures user input or queries.

    ```
    from langchain.prompts import HumanMessagePromptTemplate


    human_template = HumanMessagePromptTemplate.from_template(
        "Hi, my order #{order_id} is delayed. Can you help?"
    )
    ```

3.  **AI Message Template**  
    Formats or parses the LLM’s response.

    ```
    from langchain.prompts import AIMessagePromptTemplate


    ai_template = AIMessagePromptTemplate.from_template(
        "The estimated delivery date for order {order_id} is {delivery_date}."
    )
    ```

![The image is a diagram illustrating the flow of an AI message between an application and a chat model, using a prompt template.](https://kodekloud.com/kk-media/image/upload/v1752880974/notes-assets/images/LangChain-Prompt-Templates/ai-message-flow-application-chat-model.jpg)

## Demo Scenarios

In the following demos, we’ll cover:

1.  **Creating prompt templates with placeholders**
2.  **Generating parameterized prompts**
3.  **Building reusable, organization-wide templates**

Let’s jump into the hands-on examples and see these prompt templates in action!

---

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI API Reference](https://beta.openai.com/docs/)
- [ChatML Format Guide](https://platform.openai.com/docs/guides/chat)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/4c4472e9-fd82-4691-860a-55d9fad2f7f5)**
>
> Watch video content
