# Prompt Engineering Techniques and Best Practices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Applications-of-Foundation-Models/Prompt-Engineering-Techniques-and-Best-Practices)

---

## Table of Contents

- Prompt Engineering Techniques and Best Practices
  - What Is a Prompt?
  - Crafting the Perfect Prompt
  - Prompting Techniques
  - Prompt Tuning
  - Integrating with AWS Bedrock
  - Security and Safety in Prompt Engineering
  - Summary
  - Watch Video
    - Zero-Shot Prompting
    - One-Shot and Few-Shot Prompting
    - Chain-of-Thought Prompting
    - Prompt Templates

---

## Content

AWS Certified AI Practitioner

Applications of Foundation Models

# Prompt Engineering Techniques and Best Practices

Welcome to our comprehensive guide on prompt engineering techniques and best practices. Prompt engineering is pivotal for designing effective instructions that guide large language models (LLMs) to generate high-quality, accurate, and relevant outputs. In this guide, we discuss various strategies—from crafting clear prompts and using negative qualifiers to understanding a model's latent space—to help you optimize your interactions with AI systems.

Prompt engineering is the art of designing user inputs that clearly define the desired task for a model. A well-crafted prompt sets the stage for precise responses, significantly reducing the chance of generating misleading or poor outputs.

![The image explains the importance of prompt engineering, highlighting its role in helping a model understand what is expected of it.](https://kodekloud.com/kk-media/image/upload/v1752857205/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-engineering-importance-explained.jpg)

A poorly designed prompt results in suboptimal outputs, whereas engaging and optimized prompts greatly enhance accuracy and relevancy. The following image illustrates how effective prompt engineering maximizes model performance:

![The image explains the importance of prompt engineering, highlighting its role in optimizing prompts to improve response, accuracy, and relevance, making it essential for effective use of LLMs.](https://kodekloud.com/kk-media/image/upload/v1752857206/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-engineering-importance-llms.jpg)

Understanding these techniques is crucial for various tasks, including classification, text generation, and answering questions.

![The image explains the importance of prompt engineering for effective use of LLMs, highlighting its role in classification, text generation, and answering questions.](https://kodekloud.com/kk-media/image/upload/v1752857208/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-engineering-llms-importance.jpg)

## What Is a Prompt?

A prompt is the input provided by the user that defines the task a model should perform. For instance, you might say, "I would like to understand all the ins and outs of Kubernetes," or "I want to excel in my exam performance." This input specifies the task and guides the model's actions. It can include context, sample outputs, and specific instructions to enhance clarity.

![The image explains what a prompt is, describing it as an input provided by the user to guide a language model, accompanied by a graphic of text and checkmarks.](https://kodekloud.com/kk-media/image/upload/v1752857209/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-input-language-model-graphic.jpg)

A well-crafted prompt not only describes the task but can also include examples to further clarify your intentions. For example, a prompt like "Write a short formal email to express appreciation" can be supplemented with contextual details and a sample format to guide the model toward a relevant and complete output.

![The image is a slide titled "What is a Prompt?" with an icon of a document and magnifying glass, and text stating that context or examples in prompts help guide the model.](https://kodekloud.com/kk-media/image/upload/v1752857210/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/what-is-a-prompt-slide.jpg)

Prompts can also be used to establish style, tone, or format—for instance, instructing the model to format a friendly email from a team leader thanking the team for completing a project ahead of schedule.

![The image is a slide titled "What is a Prompt?" with an example prompt about writing a friendly email as a team leader to thank a team for completing a project ahead of schedule.](https://kodekloud.com/kk-media/image/upload/v1752857210/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/what-is-a-prompt-friendly-email.jpg)

An effective prompt should clearly define and bound the task by including instructions, examples, and even negative qualifiers to filter out unwanted content.

![The image is a diagram titled "What is Prompt Engineering?" showing a central circle labeled "Prompt" connected to three surrounding circles labeled "Instructions," "Examples," and "Context."](https://kodekloud.com/kk-media/image/upload/v1752857212/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/what-is-prompt-engineering-diagram.jpg)

## Crafting the Perfect Prompt

When designing a prompt, consider incorporating the following elements to optimize model performance:

1.  **Context:**  
    Provide background and specific instructions to clarify the expected outcome. For example, if crafting a motivational speech prompt for new employees, include details about the audience, experience level, and desired tone.

    ![The image explains the importance of context in prompt engineering, highlighting that it provides relevant background information and helps models understand nuances and specifics.](https://kodekloud.com/kk-media/image/upload/v1752857213/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/context-in-prompt-engineering-importance.jpg)

    In a real-world scenario like a motivational speech, you might instruct the model to avoid excessive jargon and focus on inspiring innovation and collaboration.

    ![The image is a slide titled "Context in Prompt Engineering," detailing a prompt for writing a motivational speech for new employees at a tech company, emphasizing innovation, collaboration, and growth.](https://kodekloud.com/kk-media/image/upload/v1752857214/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/context-prompt-engineering-motivational-speech.jpg)

2.  **Instruction:**  
    Be precise about what you need. Instead of using a vague prompt like "Write something about AI," specify "Write a short paragraph about how AI is transforming healthcare with a focus on data analytics." Clear instructions help reduce ambiguity and guide the model effectively.

    ![The image compares clear and vague instructions in prompt engineering, highlighting that clear instructions define specific tasks for the model, while vague instructions lead to poor responses.](https://kodekloud.com/kk-media/image/upload/v1752857215/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/clear-vague-instructions-prompt-engineering.jpg)

    The image below further illustrates the impact that clear versus vague instructions can have on AI outputs:

    ![The image compares vague and clear instructions about AI, showing how clarity affects the quality of output. It highlights that clear instructions lead to more focused and relevant responses.](https://kodekloud.com/kk-media/image/upload/v1752857216/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/ai-instructions-clarity-comparison.jpg)

3.  **Negative Prompts:**  
    Clearly specify what should be avoided. For example, when writing a product description for a smartwatch, instruct the model to focus on key features like heart rate monitoring, GPS, and battery life—but to avoid details about packaging history or brand backstory.

    ![The image contains a prompt for writing a product description for a smartwatch, focusing on key features like heart rate monitoring, GPS, and battery life, while avoiding unnecessary details about packaging or brand history.](https://kodekloud.com/kk-media/image/upload/v1752857218/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/smartwatch-product-description-prompt.jpg)

4.  **Latent Space Considerations:**  
    A model's latent space represents its internal understanding based on training data. Effective prompt design guides the model to retrieve information within this latent space. It is important to note that asking for information beyond a model's training data (such as recent events post cutoff date) may result in inaccurate or hallucinated responses.

    ![The image explains "Model Latent Space," highlighting that it stores knowledge learned during training and interacts with prompts to retrieve patterns and data.](https://kodekloud.com/kk-media/image/upload/v1752857219/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/model-latent-space-knowledge-diagram.jpg)

    Always consider the model’s capacity—whether it is a generalist or specialized in a particular domain—when crafting your prompt.

## Prompting Techniques

Several prompting techniques can optimize your interaction with AI models:

### Zero-Shot Prompting

Zero-shot prompting involves providing only the instruction without examples. For instance, a prompt like "Write a short poem about the ocean" relies solely on the model’s pre-existing knowledge.

### One-Shot and Few-Shot Prompting

One-shot prompting includes a single example alongside the instruction, while few-shot prompting incorporates multiple examples. These approaches act as in-context training, enabling the model to better understand the desired output by examining a set of examples.

![The image compares zero-shot prompting without examples and with examples, showing how AI generates a poem about the ocean in each scenario. The left side provides a direct prompt, while the right side includes an example of a poem about the sky to guide the AI.](https://kodekloud.com/kk-media/image/upload/v1752857220/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/zero-shot-prompting-poem-comparison.jpg)

### Chain-of-Thought Prompting

Chain-of-thought prompting encourages the model to break down its reasoning into clear, logical steps before providing the final answer. This method is particularly effective for solving complex math problems or decision-making tasks, as it enhances both transparency and coherence.

![The image explains "Chain-of-Thought Prompting," highlighting its ability to break down reasoning into intermediate steps and assist with complex reasoning or logical thinking tasks.](https://kodekloud.com/kk-media/image/upload/v1752857221/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/chain-of-thought-prompting-diagram.jpg)

This approach not only guides the final output but also clarifies the reasoning process:

![The image illustrates "Chain-of-Thought Prompting" with icons representing a math problem and a decision-making scenario, emphasizing that breaking down reasoning improves a model's coherence and logic.](https://kodekloud.com/kk-media/image/upload/v1752857223/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/chain-of-thought-prompting-diagram-2.jpg)

### Prompt Templates

Reusable prompt templates help maintain consistency and efficiency across similar tasks. Whether you are generating exam questions, structuring documents, or providing code examples, a standardized template expedites the process and supports collaborative improvements.

## Prompt Tuning

Prompt tuning is the process of optimizing the prompt itself during training without modifying the main model parameters. This technique allows you to fine-tune instructions for specific tasks—similar to using a specialized system prompt—ensuring the model’s outputs are more closely aligned with your requirements.

![The image is about "Prompt Tuning" and includes an icon of a gear with text explaining that it fine-tunes a model by optimizing the prompt's continuous embedding during training.](https://kodekloud.com/kk-media/image/upload/v1752857224/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-tuning-gear-icon.jpg)

A solid understanding of the model’s latent space, which encapsulates its training data, is vital. Well-designed prompts can effectively query this latent space to extract precise and relevant information. For example, when developing a vacation recommendation system, your prompts should accurately access details such as destinations, weather conditions, and local activities.

![The image is a diagram illustrating the concept of latent space and prompts, showing the flow from input to model, which interacts with latent space to generate a response.](https://kodekloud.com/kk-media/image/upload/v1752857226/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/latent-space-prompt-diagram.jpg)

Being mindful of the model’s limitations, such as its knowledge cutoff or potential for hallucinations, will help you design prompts that work within the bounds of its training data.

![The image illustrates a model for recommending vacation spots using latent space and prompts, focusing on destinations, weather conditions, and activities. It explains how prompts query the space to generate new outputs based on stored data.](https://kodekloud.com/kk-media/image/upload/v1752857227/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/vacation-spot-recommendation-model.jpg)

## Integrating with AWS Bedrock

AWS Bedrock supports a wide range of prompt engineering techniques by offering a comprehensive model hosting service. When using LLMs on Bedrock, crafting effective prompts is essential. For example, creating a travel planning chatbot on [AWS Bedrock](https://aws.amazon.com/bedrock) could involve integrating with [Amazon Lex](https://aws.amazon.com/lex), connecting to databases like [Amazon Redshift](https://aws.amazon.com/redshift), and utilizing services such as [Amazon Cognito](https://aws.amazon.com/cognito). Refined prompt engineering guides chatbot interactions and ensures optimal performance.

![The image is a flowchart illustrating the integration of AWS Bedrock and prompt engineering for a travel planning chatbot system, involving components like Amazon Redshift, a load balancer, and Amazon Cognito.](https://kodekloud.com/kk-media/image/upload/v1752857228/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/aws-bedrock-prompt-engineering-flowchart.jpg)

> [!important]
> **Note**
>
> The quality and comprehensiveness of a model’s latent space depend heavily on its training data. Smaller or less comprehensive models might not capture all details, potentially leading to hallucinated outputs if prompts request data beyond the model’s scope.

![The image discusses the role of training data, highlighting Wikipedia and Common Crawl as examples of massive datasets used for training models.](https://kodekloud.com/kk-media/image/upload/v1752857229/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/training-data-wikipedia-common-crawl.jpg)

## Security and Safety in Prompt Engineering

Security measures are essential to prevent the generation of harmful content or the exposure of sensitive data. AWS Bedrock includes Guardrails—a product designed to filter harmful content, block specific keywords, and safeguard against prompt injections.

![The image outlines five key techniques for effective prompt engineering, including being specific, providing examples, using an iterative process, understanding model strengths and weaknesses, and balancing simplicity and complexity.](https://kodekloud.com/kk-media/image/upload/v1752857230/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-engineering-techniques-outline.jpg)

Guardrails help set boundaries for inputs and outputs, mitigating risks such as prompt injection—where untrusted user input can manipulate trusted prompts—and other attacks like jailbreaking or hijacking.

![The image outlines three guardrails in prompt engineering: blocking specific words, setting thresholds for filtering harmful content, and protecting against prompt attacks like jailbreaks or injections.](https://kodekloud.com/kk-media/image/upload/v1752857231/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-engineering-guardrails-outline.jpg)

For example, prompt injection might involve asking for a factual summary of the Eiffel Tower while attempting to inject false information (such as claiming it is a secret alien communications tower).

![The image explains "Prompt Injection" with an example, showing how an attacker can manipulate input to include false information about the Eiffel Tower.](https://kodekloud.com/kk-media/image/upload/v1752857232/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/prompt-injection-eiffel-tower-example.jpg)

Jailbreaking circumvents established safety measures, and hijacking manipulates original prompts to change outputs. Both are significant risks for AI systems. However, Guardrails are designed to mitigate these attacks.

![The image explains "Jailbreaking" as bypassing safety measures to generate restricted responses, and "Hijacking" as manipulating the original prompt to change its output.](https://kodekloud.com/kk-media/image/upload/v1752857233/notes-assets/images/AWS-Certified-AI-Practitioner-Prompt-Engineering-Techniques-and-Best-Practices/jailbreaking-hijacking-explained.jpg)

## Summary

Effective prompt engineering combines clarity, specific context, well-defined examples, and a strong understanding of the model’s latent space. Key takeaways include:

- Use zero-shot prompting for general tasks.
- Apply one-shot or few-shot prompting when additional guidance is necessary.
- Leverage chain-of-thought prompting for complex reasoning.
- Utilize prompt templates to maintain consistency across similar tasks.
- Employ prompt tuning to optimize instructions without altering model parameters.

Additionally, ensuring robust security measures through tools like Guardrails is crucial to maintain data integrity and prevent malicious outputs.

Thank you for reading our detailed guide on prompt engineering techniques and best practices. For more insights on LLMs and AI integration, explore our other resources or visit the [AWS Bedrock page](https://aws.amazon.com/bedrock).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/df9d2cbf-06c5-4b4f-ada0-e918658c6923/lesson/e174b178-637f-4445-b0be-7228888994fe)**
>
> Watch video content
