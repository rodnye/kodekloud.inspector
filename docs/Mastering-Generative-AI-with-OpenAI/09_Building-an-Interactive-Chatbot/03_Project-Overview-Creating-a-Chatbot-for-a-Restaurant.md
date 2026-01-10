# Project Overview Creating a Chatbot for a Restaurant - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Building-an-Interactive-Chatbot/Project-Overview-Creating-a-Chatbot-for-a-Restaurant)

---

## Table of Contents

- Project Overview Creating a Chatbot for a Restaurant
  - Table of Contents
  - 1. End-User Experience
  - 2. Setup: Imports and API Key
  - 3. Chat Completion Helper
  - 4. Bot Instructions
  - 5. Conversation State and Widgets
  - 6. Processing User Messages
  - 7. Building the Dashboard
  - 8. Dependencies
  - 9. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Building an Interactive Chatbot

# Project Overview Creating a Chatbot for a Restaurant

In this tutorial, you’ll build a fast-food ordering chatbot—**BurgerBot**—using the [OpenAI Chat API](https://platform.openai.com/docs/guides/chat) and [HoloViz Panel](https://panel.holoviz.org) within a [Jupyter notebook](https://jupyter.org). We’ll start by experiencing the end-user flow and then break down each implementation step: environment setup, API integration, instruction design, state management, and UI assembly.

---

## Table of Contents

1.  [End-User Experience](#1-end-user-experience)
2.  [Setup: Imports and API Key](#2-setup-imports-and-api-key)
3.  [Chat Completion Helper](#3-chat-completion-helper)
4.  [Bot Instructions](#4-bot-instructions)
5.  [Conversation State and Widgets](#5-conversation-state-and-widgets)
6.  [Processing User Messages](#6-processing-user-messages)
7.  [Building the Dashboard](#7-building-the-dashboard)
8.  [Dependencies](#8-dependencies)
9.  [Next Steps](#9-next-steps)

---

## 1\. End-User Experience

Inside the notebook, Panel presents a simple chat interface. A typical conversation might look like this:

```
User: Hello
Assistant: Hello there! Welcome to Burger Bliss. How can I assist you today?
User: I want to order a chicken burger.
Assistant: We have two options: Crispy Chicken Burger and BB Grilled Chicken Burger. Which one would you like?
User: I’ll have the Spicy Crispy Chicken Burger.
Assistant: Excellent choice! Anything else you’d like to add, like extra fries or a drink?
User: Can I have extra fries please?
Assistant: Of course! Would you like anything to drink? We have Coke, Fanta, Sprite, and Bottled Water.
User: I am done.
Assistant: Alright, that’s a Spicy Crispy Chicken Burger with extra fries. Pickup or delivery?
User: It’s for pickup.
Assistant: Great! When would you like to pick it up?
User: In 10 minutes.
Assistant: Perfect. Your order will be ready for pickup in 10 minutes. Thank you for choosing Burger Bliss!
```

---

## 2\. Setup: Imports and API Key

```
import os
import openai
import panel as pn

# Load your OpenAI API key from an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")
```

> [!important]
> **Warning**
>
> Never expose your `OPENAI_API_KEY` in public repositories. Use environment variables or a secrets manager.

---

## 3\. Chat Completion Helper

Create a helper function to send messages to the Chat API and return the assistant’s reply:

```
def get_chat_completion(messages):
    """
    Sends a list of messages to OpenAI’s ChatCompletion API
    and returns the assistant’s response text.
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    return response.choices[0].message.content
```

---

## 4\. Bot Instructions

Define system-level instructions to guide BurgerBot’s behavior:

```
bot_instructions = """
You are BurgerBot, an automated service to collect orders at Burger Bliss.
1. Greet the customer.
2. Gather the full order; summarize before confirmation.
3. Ask for pickup or delivery (if delivery, request address).
4. Confirm payment details.
5. Clarify menu options with unique item identifiers.
"""
```

---

## 5\. Conversation State and Widgets

Initialize the conversation context and Panel widgets:

```
# Starting context with system instructions
context = [{"role": "system", "content": bot_instructions}]

# TextInput widget for user messages
user_input = pn.widgets.TextInput(
    placeholder="Type your message here...", width=400
)

# List to hold UI panels for each message
panels = []
```

---

## 6\. Processing User Messages

Define a function that handles user input, updates the chat context, and renders messages:

```
def collect_messages():
    prompt = user_input.value
    user_input.value = ""  # Clear the input field

    # Add user prompt to context and fetch assistant response
    context.append({"role": "user", "content": prompt})
    response = get_chat_completion(context)
    context.append({"role": "assistant", "content": response})

    # Display the user’s message
    panels.append(pn.Row("User:", pn.pane.Markdown(prompt, width=600)))
    # Display the assistant’s reply
    panels.append(
        pn.Row(
            "Assistant:",
            pn.pane.Markdown(
                response,
                width=600,
                styles={"background-color": "#F6F6F6"}
            )
        )
    )

    return pn.Column(*panels)
```

---

## 7\. Building the Dashboard

Bind the message handler to a button and assemble the UI:

```
# Button to send messages
chat_button = pn.widgets.Button(name="Send", button_type="primary")

# Bind the function to the button click
interactive_chat = pn.bind(collect_messages, chat_button)

# Layout the dashboard
dashboard = pn.Column(
    user_input,
    pn.Row(chat_button),
    pn.panel(interactive_chat, loading_indicator=True, height=300),
)

dashboard
```

> [!important]
> **Note**
>
> Run this cell in your Jupyter notebook. Click **Send** after typing each message to interact with BurgerBot.

---

## 8\. Dependencies

| Package    | Minimum Version | Purpose                            |
| ---------- | --------------- | ---------------------------------- |
| openai     | 0.27.0          | OpenAI ChatCompletion API client   |
| panel      | 0.14.0          | Interactive dashboards and widgets |
| jupyterlab | 3.0.0           | Jupyter notebook environment       |

---

## 9\. Next Steps

In upcoming sections, you’ll learn how to:

- Craft more precise prompts for improved order accuracy
- Manage conversation state and handle edge cases
- Style the Panel UI for a polished user experience
- Integrate a real-time database for order tracking

---

## Links and References

- [OpenAI Chat API Documentation](https://platform.openai.com/docs/guides/chat)
- [Panel Documentation](https://panel.holoviz.org)
- [Jupyter Project](https://jupyter.org)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/36c56a19-11f6-4db1-8bd7-bd6a96c82268/lesson/fb5fb83d-53e8-48e9-9bee-fed2a26dcd44)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/36c56a19-11f6-4db1-8bd7-bd6a96c82268/lesson/098b2658-271b-4427-9b7d-e8e214f3cafc)**
>
> Practice lab
