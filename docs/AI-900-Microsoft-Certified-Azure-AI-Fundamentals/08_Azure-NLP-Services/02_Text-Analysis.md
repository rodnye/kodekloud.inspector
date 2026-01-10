# Text Analysis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-NLP-Services/Text-Analysis)

---

## Table of Contents

- Text Analysis
  - Key Features of Azure Text Analytics
  - Accessing Text Analysis via Azure Language Studio
  - Running Text Analysis in Language Studio
  - Additional Capabilities and Custom Models
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure NLP Services

# Text Analysis

Explore how Azure’s Text Analytics service leverages advanced natural language processing to extract actionable insights from text data. This guide explains the major features, usage scenarios, and step-by-step instructions to get started with text analysis using Azure.

![The image shows a screenshot of the Azure AI Language Studio interface, highlighting options for text analysis such as sentiment analysis, language detection, and custom text classification.](https://kodekloud.com/kk-media/image/upload/v1752856938/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-ai-language-studio-text-analysis.jpg)

Text analysis involves processing and interpreting text to uncover insights such as language detection, sentiment evaluation, key phrase extraction, and entity recognition. Azure’s Text Analytics service is designed to simplify these tasks for a wide range of applications—from customer feedback evaluation to trend monitoring.

## Key Features of Azure Text Analytics

1.  **Language Detection**  
    Automatically determine the language of the input text. This feature is essential when working with multilingual datasets as it helps select the appropriate processing model for further analysis.
2.  **Sentiment Analysis**  
    Compute sentiment scores to assess the emotional tone of text. This feature is extremely useful for quickly understanding customer feedback across various platforms, by categorizing it as positive, negative, or neutral.
3.  **Key Phrase Extraction**  
    Extract key phrases that summarize the main topics or themes within the text. This helps in identifying customer interests and highlights frequently mentioned features or products.
4.  **Entity Recognition**  
    Automatically detect and classify entities such as locations, dates, products, and more. This process enables better data organization by tagging specified names and terms.

For example, consider the sentence:  
"This is a sentence, and the predominant language is English. The sentiment here is positive because it says, 'I enjoy it.' The key phrase detected is 'a great meal,' and the entity recognized is Italy."

![The image shows a text analysis of the sentence "I enjoyed a great meal in Italy," indicating the predominant language is English, the sentiment is positive with a score of 0.92, and the key phrase is "great meal."](https://kodekloud.com/kk-media/image/upload/v1752856939/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/text-analysis-english-sentiment-positive.jpg)

> [!important]
> **Insightful Overview**
>
> Azure's Text Analytics service provides a comprehensive suite of features that make it ideal for processing large volumes of text data, including customer reviews and social media mentions.

![The image illustrates the importance of text analysis, highlighting its role in processing large volumes of text data, gaining insights into customer feedback, and extracting valuable information for further analysis.](https://kodekloud.com/kk-media/image/upload/v1752856940/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/text-analysis-importance-insights.jpg)

## Accessing Text Analysis via Azure Language Studio

To begin using Azure Text Analytics, follow these steps:

1.  Navigate to Azure AI Services and create a new language resource.
2.  Select additional features such as custom question answering, sentiment analysis, key phrase extraction, conversational language, entity recognition, summarization, and analytics if needed.

![The image shows a Microsoft Azure interface for selecting additional features in the Language service, including options like sentiment analysis, key phrase extraction, and custom question answering.](https://kodekloud.com/kk-media/image/upload/v1752856942/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-language-service-features.jpg)

3.  Assign a unique name to your resource to facilitate endpoint creation during deployment.
4.  Choose the appropriate pricing tier (for example, the Free Tier) and create a new resource group if required.
5.  Specify a storage account or select an existing one, then click "Create" to deploy the language resource.

![The image shows a Microsoft Azure interface for creating a language service, with options for naming, pricing, and storage account selection. It includes sections for custom question answering and text analytics features.](https://kodekloud.com/kk-media/image/upload/v1752856943/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-language-service-interface.jpg)

![The image shows a Microsoft Azure portal page for creating a language service, displaying configuration details such as subscription, resource group, region, and pricing tier. A notification indicates that a template deployment is being initialized.](https://kodekloud.com/kk-media/image/upload/v1752856944/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-portal-language-service-creation.jpg)

Once deployed, sign in to Language Studio and connect to your newly created language service. You will see your service name displayed at the top of the interface.

## Running Text Analysis in Language Studio

Within Language Studio, select the "Classify Text" option to begin your text analysis tasks. Here’s how to evaluate different sentiments:

- Input a sentence with negative sentiment such as "I'm really disappointed with the product."  
  The service returns a 100% negative sentiment, since the term "disappointment" strongly emphasizes negative feedback.

![The image shows a sentiment analysis result from Azure Language Studio, indicating a negative sentiment with 100% confidence for the sentence "I'm really disappointed with the product."](https://kodekloud.com/kk-media/image/upload/v1752856945/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-sentiment-analysis-negative-result.jpg)

- Next, try a sentence with positive feedback like "It was a wonderful experience."  
  The analysis will show a 100% positive sentiment.
- For a neutral expression such as "I visited the store today," the analysis might return a result with mixed sentiment scores (e.g., 95% neutral, 3% positive, 2% negative), reflecting an overall neutral tone.

![The image shows a screenshot of the Azure Language Studio interface, specifically the sentiment and opinion mining tool, displaying a neutral sentiment analysis result for a sample text.](https://kodekloud.com/kk-media/image/upload/v1752856946/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-language-studio-sentiment-analysis.jpg)

The service not only provides sentiment insights but also reliably detects text language, making it suitable for multilingual applications.

## Additional Capabilities and Custom Models

Azure Text Analytics also supports training custom models for text classification and sentiment analysis specific to your data. For example, you can extract key phrases from customer reviews to efficiently tag and categorize feedback. Consider a review mentioning "a bad experience," "the restaurant," "the food," and "the staff"—Azure will extract these key phrases for better organization.

![The image shows a screenshot of the Azure Language Studio interface, specifically the Key Phrases tryout section, with a text input and key phrases extracted from a sample review.](https://kodekloud.com/kk-media/image/upload/v1752856947/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Text-Analysis/azure-language-studio-key-phrases.jpg)

> [!important]
> **Enhance Your Insights**
>
> Custom models empower you to tailor text analysis to your unique business requirements, such as identifying product-specific sentiment or categorizing niche topics.

By exploring these capabilities in Language Studio, you gain not only the ability to analyze text for sentiment, language, and key phrases, but also the opportunity to extract deeper insights through custom configurations and question answering features.

Enhance your business intelligence and decision-making processes by integrating Azure Text Analytics into your workflow. For further reading and updates, consider visiting [Azure Cognitive Services Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/c436dcc7-e534-4650-a968-ea64da5e3aee/lesson/9ee7951f-9ea3-459f-8f2c-75380dae7924)**
>
> Watch video content
