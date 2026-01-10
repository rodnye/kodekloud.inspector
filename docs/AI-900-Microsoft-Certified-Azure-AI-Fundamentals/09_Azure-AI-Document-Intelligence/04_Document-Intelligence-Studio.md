# Document Intelligence Studio - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-AI-Document-Intelligence/Document-Intelligence-Studio)

---

## Table of Contents

- Document Intelligence Studio
  - Getting Started
  - Navigating Document Intelligence Studio
  - Using Pre-Built Models
  - Working with Identity Documents
  - Conclusion
  - Watch Video
    - Connecting via Azure AI Services

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure AI Document Intelligence

# Document Intelligence Studio

Document Intelligence Studio is a robust Azure-powered solution designed to simplify document processing using a no-code approach. This service empowers both technical and non-technical users to extract structured data—such as fields from forms, invoices, receipts, and more—without writing any code.

Document Intelligence Studio features an intuitive interface that allows you to test its capabilities using prebuilt models on sample documents or your own uploads. This no-code environment supports advanced data extraction, reading, and layout analysis, making it easier to integrate extracted data into your workflows.

![The image shows a screenshot of the "Document Intelligence Studio" interface, highlighting a no-code approach to document analysis with options for reading, layout, and general document processing. It includes sections for prebuilt models and a description of the service's functionality.](https://kodekloud.com/kk-media/image/upload/v1752856849/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Document-Intelligence-Studio/document-intelligence-studio-screenshot.jpg)

## Getting Started

Before you begin using Document Intelligence Studio, you must create a resource. You have two options:

- Create a dedicated Document Intelligence resource in Azure.
- Use an existing Azure AI Services multi-service account.

Once your resource is set up, enable it within Document Intelligence Studio to unlock its full capabilities. Then, navigate to the Getting Started page to explore a suite of prebuilt models specifically designed to extract relevant information from various document types such as forms, receipts, and invoices. This process leverages Azure AI-powered tools to streamline data extraction and facilitate seamless integration into your business processes.

![The image is a guide for setting up a Document Intelligence Studio, detailing steps to create and enable resources, and showcasing features like document analysis and prebuilt models.](https://kodekloud.com/kk-media/image/upload/v1752856851/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Document-Intelligence-Studio/document-intelligence-studio-guide.jpg)

## Navigating Document Intelligence Studio

Access Document Intelligence Studio by logging in to the Azure portal and visiting:

https://documentintelligence.azure.com

Once logged in, you can explore a variety of models tailored for processing different types of documents, including:

- Reading
- Layout analysis
- Journal documents
- Invoices
- Receipts
- Identity documents

Additionally, you have the option to create custom models. When selecting a model, you may be prompted to sign in and associate a resource. Document Intelligence Studio supports two methods for connecting your resource:

1.  Creating a dedicated Document Intelligence service.
2.  Utilizing Azure AI Services through a multi-service account.

### Connecting via Azure AI Services

When opting for Azure AI Services, follow these steps to set up your resource connection:

- Locate the Document Intelligence resource within your Azure AI Services account.
- Copy the API endpoint.
- Copy the API key.
- Enter the copied endpoint and API key into Document Intelligence Studio.
- Click "Continue" followed by "Finish" to complete the setup.

![The image shows a configuration window for the Document Intelligence Studio on Azure, where a user is entering an API endpoint and key to set up a service resource.](https://kodekloud.com/kk-media/image/upload/v1752856852/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Document-Intelligence-Studio/document-intelligence-studio-configuration.jpg)

## Using Pre-Built Models

After connecting your resource, you can immediately run analyses on sample documents. For instance, performing an analysis on an invoice will extract key pieces of information such as paragraphs of text and specific fields. This is particularly advantageous for integrating extracted data into other workflows.

A common scenario involves processing invoices. By selecting the invoice model, you can automatically extract critical fields like:

- Amount due
- Billing address and recipient details
- Customer address

![The image shows a screenshot of the Azure AI Document Intelligence Studio interface, displaying an analyzed invoice with highlighted fields and extracted data on the right panel.](https://kodekloud.com/kk-media/image/upload/v1752856853/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Document-Intelligence-Studio/azure-ai-document-intelligence-invoice.jpg)

Unlike traditional OCR, which merely converts image text into digital format, Document Intelligence Studio understands the context of the document. For example, rather than just extracting labels such as "Microsoft Finance" or "Bill Street," it can distinguish between "bill to" and "ship to" addresses by analyzing the document's structure.

## Working with Identity Documents

Document Intelligence Studio is not limited to invoices and forms; it also excels at processing identity documents. By analyzing ID cards, the service can extract crucial details, including:

- Address
- Date of birth
- Date of expiration
- Date of issue

This feature is particularly useful for documents such as Aadhaar cards (an Indian identity document) or United States PR IDs, providing efficient and accurate extraction of personal information.

![The image shows a digital interface displaying an Aadhaar card, an Indian identity document, with personal details and a photograph. It appears to be part of a document analysis tool.](https://kodekloud.com/kk-media/image/upload/v1752856854/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Document-Intelligence-Studio/aadhaar-card-digital-interface-analysis.jpg)

## Conclusion

Document Intelligence Studio offers an accessible, no-code solution for extracting and analyzing data from a variety of document types. Its seamless integration with Azure AI Services allows businesses to streamline document processing workflows without requiring extensive technical expertise.

> [!important]
> **Next Steps**
>
> Stay tuned for our upcoming articles where we will delve into other Azure AI capabilities, such as Azure AI Search, and how they can further enhance your document processing and data extraction processes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/274638d7-15bf-409f-a5d7-69c35ff0a986/lesson/ee5063f0-b599-4e62-b41e-bf588e55d1ad)**
>
> Watch video content
