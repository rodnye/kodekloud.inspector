# Application of LLMs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Application-and-Assessment-of-LLMs/Application-of-LLMs)

---

## Table of Contents

- Application of LLMs
  - Watch Video

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Application and Assessment of LLMs

# Application of LLMs

In this article, we explore the diverse applications of Large Language Models (LLMs) beyond traditional human language tasks. These models are increasingly used for code generation, documentation, translation (including code translation), and even in cutting-edge domains like bioinformatics. For example, models such as [Codex](https://openai.com/blog/openai-codex) are being trained on non-traditional data sources to extend their versatility.

![The image lists three programming-related tasks: code generation, documentation, and code translation, each with a brief description and corresponding icon.](https://kodekloud.com/kk-media/image/upload/v1752875751/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/programming-tasks-code-gen-docs-translation.jpg)

LLMs leverage neural networks to recognize patterns and relationships in sequence data, making them particularly effective in areas like code generation. Enterprise organizations modernize or recreate code routinely, and transformer-based models—trained on vast repositories of code—can efficiently generate similar, high-quality code.

Below is a simple example of a quicksort function implemented in Python, demonstrating basic code generation:

```
def quicksort(arr):
    # Sorting logic here
    return sorted(arr)
```

Recent breakthroughs, such as [AlphaFold](https://www.deepmind.com/blog/alphafold), highlight the adaptability of transformer and transformer-like models in areas outside traditional protein folding. Pharmaceutical companies, for instance, are investing in these advancements for medium- to long-term pipeline development.

> [!important]
> **Important Consideration**
>
> While models trained primarily on datasets like Common Crawl can be highly effective, they may require additional fine-tuning to excel in specialized tasks such as RNA analysis.

A key decision point when working with LLMs is the choice between open-source and proprietary models. This decision generally depends on three critical factors:

1.  Performance needs
2.  Cost and licensing
3.  Customization

![The image features the text "Navigating Choices – Open-Source vs Proprietary LLMs" alongside a graphic of a hand icon surrounded by circles.](https://kodekloud.com/kk-media/image/upload/v1752875752/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/navigating-choices-open-source-llms.jpg)

During the early stages of a project, such as proof-of-concept or proof-of-value, an application might only serve a limited user base. However, scaling to support thousands of users (for example, 20,000 users) requires strategic planning to meet performance demands. Large models, often deployed by hyperscalers, deliver the necessary scalability but might involve complex licensing and higher costs.

![The image is a diagram titled "Inference Parameters" with three tabs: "Performance Needs," "Cost and Licensing," and "Customization." The "Performance Needs" tab is highlighted, listing features like "Benchmark Leaders," "High Accuracy," "Advanced Features," and "Enterprise Focus."](https://kodekloud.com/kk-media/image/upload/v1752875753/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/inference-parameters-performance-needs-diagram.jpg)

When evaluating cost and licensing, it is crucial to understand that operating these models can be expensive. However, a smaller model does not necessarily guarantee a lower total cost of ownership (TCO). Teams should assess whether they have the in-house capabilities to manage the infrastructure or if partnering with third-party experts is more appropriate. Licensing arrangements can be complex; for example, some open-source models may include restrictions, such as copyleft clauses, that limit proprietary enhancements.

![The image is a diagram titled "Inference Parameters" with three categories: Performance Needs, Cost and Licensing, and Customization. The highlighted section, "Cost and Licensing," includes points like Cost-Effective, Flexible Licensing, Startup-Friendly, and Academic Use.](https://kodekloud.com/kk-media/image/upload/v1752875754/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/inference-parameters-cost-licensing-diagram.jpg)

Customization plays a critical role for domain-specific applications. Open-source models offer greater control and customization. In contrast, larger proprietary models may provide additional fine-tuning options on platforms such as [OpenAI](https://openai.com), [Azure](https://azure.microsoft.com), or [Google Gemini](https://ai.googleblog.com/). Consider the level of tuning available to ensure it meets your specific project needs. In industries like finance or healthcare where data sovereignty and privacy are of utmost importance, deploying open-source models on-premises or in a private cloud might be the optimal solution.

![The image is a diagram titled "Inference Parameters" with three categories: "Performance Needs," "Cost and Licensing," and "Customization." The "Customization" section highlights features like "Customizable," "No Restrictions," "Domain-Specific," and "Flexible Tuning."](https://kodekloud.com/kk-media/image/upload/v1752875756/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/inference-parameters-diagram-customization.jpg)

A flowchart further comparing open-source and proprietary LLMs emphasizes the importance of stringent data privacy and control, especially for financial institutions. This visual aid highlights the deployment of an open-source model on-premises to meet these critical requirements.

![The image is a flowchart comparing open-source and proprietary LLMs, highlighting a financial firm's need for stringent data privacy and control over sensitive information, leading to the deployment of an open-source model on-premises.](https://kodekloud.com/kk-media/image/upload/v1752875757/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/open-source-vs-proprietary-llms-flowchart.jpg)

When choosing a model, it is vital to evaluate performance, cost, licensing constraints, and customizability. Overlooking any of these aspects can lead to project challenges, such as a promising concept failing due to critical oversights.

In the next section of this lesson, we will assess LLM performance using both objective quantitative methods and real-world deployment evaluations. This dual approach ensures that theoretical performance metrics are effectively translated into practical applications across various environments.

![The image features the text "Critical Evaluation – Assessing LLM Performance" alongside an icon of a clipboard with a checkmark.](https://kodekloud.com/kk-media/image/upload/v1752875758/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Application-of-LLMs/critical-evaluation-llm-performance-clipboard.jpg)

Thank you for reading this section. Stay tuned as we dive deeper into performance assessment and further refine our understanding of deploying LLMs efficiently and effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/1ee19bb4-63e7-4577-b042-a4dbf33d4097/lesson/c511ac42-3063-47c2-a576-cfc8a87cae50)**
>
> Watch video content
