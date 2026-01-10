# Demo Prompting and Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Prompting-Techniques-in-LLM/Demo-Prompting-and-Parameters)

---

## Table of Contents

- Demo Prompting and Parameters
  - Navigating Azure Resources
  - Exploring Projects in Azure AI Studio
  - Model Selection and Details
  - Playing with the Chat Playground
  - Prompting Techniques
  - Fine-Tuning and the Model Catalog
  - Conclusion
  - Watch Video

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Prompting Techniques in LLM

# Demo Prompting and Parameters

Azure offers a variety of tools to access AI-related resources, and this article focuses on one of the most user-friendly options: Azure AI Studio. While Azure also provides solutions like Azure Machine Learning and a dedicated OpenAI service, Azure AI Studio is primarily designed for developers building general applications—not necessarily for data scientists who require highly customized or complex models.

## Navigating Azure Resources

After logging in to Microsoft Azure, you'll notice multiple resource groups dedicated to different projects. For instance, consider this resource group where various components are deployed:

![The image shows a Microsoft Azure portal interface displaying a resource group named "rg-genaiops" with a list of resources, their types, and locations. The resources include Azure AI hubs, projects, services, and other components located in France Central.](https://kodekloud.com/kk-media/image/upload/v1752875824/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-portal-rg-genaiops-resources.jpg)

Focus on Azure AI Studio as you explore the portal. You may see several related services like Azure AI Services. Simply click on Azure AI Studio to discover its many capabilities.

![The image shows a Microsoft Azure portal page for managing an AI hub, displaying details like resource group, location, and subscription information, with an option to launch Azure AI Studio.](https://kodekloud.com/kk-media/image/upload/v1752875825/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-portal-ai-hub-management.jpg)

## Exploring Projects in Azure AI Studio

Azure AI Studio organizes your deployments and models into projects. When you access a project, you’ll see an overview screen similar to this:

![The image shows the Azure AI Studio interface, specifically the project overview page for a project named "ai-project-pa2573jlc7ha," with options for documentation and project properties.](https://kodekloud.com/kk-media/image/upload/v1752875826/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-project-overview.jpg)

In the project dashboard, you will find several deployed large language models (LLMs), including both base and fine-tuned versions. For example:

![The image shows a dashboard from Azure AI Studio displaying a list of deployed models, including their names, versions, states, and other details. There is an option to deploy a new model at the top.](https://kodekloud.com/kk-media/image/upload/v1752875827/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-deployed-models-dashboard.jpg)

Click on any model to review examples provided by OpenAI and Microsoft. Model name postfixes, such as "instruct," indicate fine-tuning methodologies where the model is adjusted using high-level instructions rather than extensive datasets. Similarly, chat models are optimized for conversational tasks.

## Model Selection and Details

Selecting a model in Azure AI Studio reveals detailed information about its usage, training history, and metadata. For example, when reviewing Meta models, you might see an interface like the one below:

![The image shows a user interface for selecting a model in Azure AI Studio, with options for different Meta-Llama models and detailed information about the selected model, Meta-Llama-3.1-70B.](https://kodekloud.com/kk-media/image/upload/v1752875828/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-model-selection.jpg)

Another view provides a comprehensive list of models alongside performance metrics:

![The image shows a user interface for selecting a model in Azure AI Studio, displaying a list of models with their details and performance metrics.](https://kodekloud.com/kk-media/image/upload/v1752875830/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-model-selection-ui.jpg)

Additionally, there is a dedicated dashboard for managing model deployments:

![The image shows a user interface for selecting a model in Azure AI Studio, with options for different models and their descriptions. The background displays a management dashboard for model deployments.](https://kodekloud.com/kk-media/image/upload/v1752875831/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-model-selection-dashboard.jpg)

Azure AI Studio supports a wide range of models, from GPT-4 and GPT-3.5 to models available on Hugging Face. This diverse catalog allows you to select the model that best fits your application requirements.

## Playing with the Chat Playground

Azure AI Studio features an interactive Chat Playground, a testing ground for various prompting techniques. Within this environment, you can instruct models to perform tasks such as acting as a virtual shopping assistant, a legal co-pilot, or other specialized roles.

In the Chat Playground, you can adjust parameters that affect the model’s output characteristics, including:

- **Maximum Response:** Once critical for cost management, this setting dictates the maximum length of responses.
- **Frequency and Presence Penalties:** These help manage word repetition.
- **Temperature:** Controls the randomness of responses. A higher temperature (e.g., 1) encourages creativity, while a near-zero value results in deterministic outputs.
- **Top P:** Limits the pool of likely output tokens to narrow down possibilities.

![The image shows the Azure AI Studio's Chat Playground interface, featuring adjustable parameters like max response, temperature, and top P, with a section for typing user queries.](https://kodekloud.com/kk-media/image/upload/v1752875832/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-chat-playground.jpg)

> [!important]
> **Experiment with Settings**
>
> Adjust settings like temperature and top P to fine-tune the creativity and determinism of your model’s responses.

Advanced settings like logic biases are often available through the API layer, although they may not be exposed directly in the user interface.

## Prompting Techniques

Azure AI Studio showcases various prompting techniques to get the most out of generative models:

- **Zero-Shot Prompting:** Provide a piece of text and ask the model to analyze it (such as determining sentiment). This method works well with larger models.
- **Few-Shot Prompting:** Supply several examples as context so that the model can generate new text following the established pattern. This is particularly beneficial for tasks requiring consistency.
- **Chain-of-Thought Prompting:** Encourages the model to generate structured reasoning steps.
- **Meta-Prompting:** Optimizes token usage by providing a broad context to the model.
- **React Prompting:** Enhances model reliability and output by incorporating recent research findings.

An important feature in prompting is the ability to create stop sequences. For example, defining a specific stop sequence (like a period) ensures the model halts its output when the sequence is detected. This is especially useful for preventing extraneous content when generating programming code.

By fine-tuning parameters such as temperature and top P, you can control the balance between consistency and creativity. For instance, setting the temperature to zero makes responses exceedingly consistent, though it may limit creative output.

An example of these settings in action is demonstrated when the Chat Playground generates a story about a cat named Joy:

![The image shows a screenshot of the Azure AI Studio's Chat playground interface, displaying a story about a cat named Joy. Various settings and parameters for the chat model are visible on the left side.](https://kodekloud.com/kk-media/image/upload/v1752875833/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-chat-playground-2.jpg)

> [!important]
> **Be Cautious with Determinism**
>
> While reducing variability can make outputs consistent, over-constraining the model might strip away its creative potential.

## Fine-Tuning and the Model Catalog

Fine-tuning your AI model has never been easier with Azure’s streamlined tools. Although basic fine-tuning is now straightforward, selecting the right data for the process remains critical.

Access the fine-tuning section within Azure AI Studio to begin customizing your models:

![The image shows a screenshot of the Azure AI Studio interface, specifically the section for fine-tuning a model with options to start the process. The interface includes navigation options on the left and a central area with a prompt to fine-tune a model.](https://kodekloud.com/kk-media/image/upload/v1752875834/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-fine-tuning-screenshot.jpg)

Furthermore, the Azure AI Studio features a Model Catalog (sometimes referred to as the Model Garden) where you can explore an extensive library of models—including those from OpenAI and other providers:

![The image shows a model catalog interface from Azure AI Studio, displaying various AI models available for selection, such as GPT and Llama models, with options for filtering and viewing details.](https://kodekloud.com/kk-media/image/upload/v1752875836/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-Prompting-and-Parameters/azure-ai-studio-model-catalog.jpg)

## Conclusion

Azure AI Studio provides a comprehensive platform for exploring, deploying, and fine-tuning generative AI models. Whether you are experimenting with prompting techniques, tweaking model parameters, or fine-tuning your deployments, this toolset supports a wide range of functionalities that meet today’s hyperscaler standards.

Enjoy exploring Azure AI Studio and experiment with different settings to discover what best meets your application needs. For further information, visit the [Azure AI Studio Documentation](https://azure.microsoft.com/en-us/services/cognitive-services/).

Happy experimenting with Azure AI Studio!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/76989388-6613-4f3f-a188-59c26e10e98a/lesson/c1872cf1-ba8e-47f4-81dd-d99ac90e9629)**
>
> Watch video content
