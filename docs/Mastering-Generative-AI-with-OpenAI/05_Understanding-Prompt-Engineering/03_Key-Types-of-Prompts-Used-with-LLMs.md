# Key Types of Prompts Used with LLMs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Understanding-Prompt-Engineering/Key-Types-of-Prompts-Used-with-LLMs)

---

## Table of Contents

- Key Types of Prompts Used with LLMs
  - 1. Explicit Prompts
  - 2. Conversational Prompts
  - 3. Instructional Prompts
  - 4. Context-Based Prompts
  - 5. Open-Ended Prompts
  - 6. Bias-Mitigating Prompts
  - 7. Code-Generation Prompts
  - Summary
  - Links and References
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Understanding Prompt Engineering

# Key Types of Prompts Used with LLMs

Prompt engineering is essential for guiding large language models (LLMs) toward precise, relevant, and unbiased outputs. In this article, we explore seven core prompt categories—each optimized for different use cases and outcomes.

![The image lists different types of prompts, including explicit, conversational, instructional, context-based, open-ended, bias-mitigating, and code-generation prompts. Each type is represented with an icon and a colored border.](https://kodekloud.com/kk-media/image/upload/v1752881553/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/prompt-types-icons-list.jpg)

| Prompt Type     | Purpose                                             | Example Use Case                   |
| --------------- | --------------------------------------------------- | ---------------------------------- |
| Explicit        | Clearly defines format & content                    | Story writing, summaries           |
| Conversational  | Simulates chat with follow-ups                      | Interactive Q&A, customer support  |
| Instructional   | Provides structured requirements                    | Blog posts, reports                |
| Context-Based   | Supplies background then asks a question            | Travel plans, project planning     |
| Open-Ended      | Broad queries for creative or comprehensive answers | Opinion pieces, research overviews |
| Bias-Mitigating | Directs neutrality and factual balance              | Sensitive topics, policy analysis  |
| Code-Generation | Generates programming snippets                      | Utility functions, scripts         |

## 1\. Explicit Prompts

Explicit prompts specify the exact format, style, and content you need. The more details you provide, the closer the output matches your expectations.

Example: “Write a short story about a young girl who discovers a magical key that unlocks a hidden door to another world.”

![The image shows a prompt and response from a writing application. The prompt asks for a short story about a young girl who finds a magical key, and the response begins a story about a girl named Lily in a bustling city.](https://kodekloud.com/kk-media/image/upload/v1752881554/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/short-story-prompt-response-lily.jpg)

## 2\. Conversational Prompts

These prompts mimic a chat dialogue, allowing follow-up questions, clarifications, or variations—just like talking to an assistant.

User: “Can you tell me a funny joke about cats?”  
Assistant: “Why did the cat sit on the computer? Because there were too many cheetahs!”

![The image shows a chat interface with a joke about cats, where the punchline is "Because there's too many cheetahs!"](https://kodekloud.com/kk-media/image/upload/v1752881555/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/chat-interface-cat-joke-punchline.jpg)

## 3\. Instructional Prompts

Also known as prescriptive prompts, these guide the model with explicit structure—sections, tone, length, or formatting rules.

Example: “Write a detailed blog post discussing the benefits and drawbacks of renewable energy. Structure it with an introduction, a benefits section, a drawbacks section, and a conclusion.”

## 4\. Context-Based Prompts

Start by supplying background information or a scenario, then pose a targeted question. This combination yields richer, more relevant responses.

Context:  
“I’m planning a week-long trip to Paris next month.”  
Prompt:  
“Suggest must-visit tourist attractions and local restaurants based on my itinerary.”

![The image shows a conversation about planning a trip to Paris, with recommendations for popular tourist attractions like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. It includes a prompt and response format with icons representing the user and assistant.](https://kodekloud.com/kk-media/image/upload/v1752881557/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/trip-planning-paris-tourist-attractions.jpg)

## 5\. Open-Ended Prompts

Open-ended prompts are intentionally broad, inviting creativity or comprehensive exploration without tight constraints.

Example: “What is the impact of AI on society?”

![The image is a slide titled "Open-Ended Prompts" discussing the impact of AI on society, focusing on automation, labor displacement, and healthcare. It includes text about AI's transformative potential and challenges.](https://kodekloud.com/kk-media/image/upload/v1752881558/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/open-ended-prompts-ai-impact-society.jpg)

## 6\. Bias-Mitigating Prompts

To counteract biases in training data, explicitly instruct the model to present balanced, fact-based information and avoid partisanship.

> [!important]
> **Warning**
>
> When covering sensitive or controversial topics, always ensure your prompt requests neutrality and evidence-based responses to minimize unintended bias.

Example: “Discuss caste-based reservations in India. Avoid favoring any group or ideology. Present factual information supported by reliable sources, striving for inclusivity and fairness.”

![The image is a screenshot of a text discussing bias-mitigating prompts related to caste-based reservations in India, highlighting the need for balanced perspectives and historical context.](https://kodekloud.com/kk-media/image/upload/v1752881559/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/bias-mitigating-prompts-caste-reservations.jpg)

## 7\. Code-Generation Prompts

LLMs excel at producing code snippets, algorithms, or scripts. Simply describe the functionality you need, and then test and refine the output.

![The image shows a code-generation prompt asking to write a Python function that sums even numbers in a list of integers. It also features a chat interface with a green icon.](https://kodekloud.com/kk-media/image/upload/v1752881560/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Key-Types-of-Prompts-Used-with-LLMs/code-generation-python-sum-even-numbers.jpg)

Example Python function:

```
def sum_even_numbers(numbers):
    even_sum = 0
    for num in numbers:
        if num % 2 == 0:
            even_sum += num
    return even_sum


# Example usage
input_list = [2, 5, 8, 10, 3, 6]
result = sum_even_numbers(input_list)
print("Sum of even numbers:", result)
```

> [!important]
> **Note**
>
> Always review and test generated code for edge cases, performance, and security considerations before using it in production.

## Summary

We’ve covered the seven primary prompt types—explicit, conversational, instructional, context-based, open-ended, bias-mitigating, and code-generation. By selecting and refining these prompts, you can significantly improve LLM accuracy, relevance, and fairness. Experiment with each category to discover what works best for your applications.

## Links and References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/8c96af76-fcd9-4bdf-a176-b7af1decdc5c/lesson/6a4d412c-f03b-4c18-b187-df2de1ea3bed)**
>
> Watch video content
