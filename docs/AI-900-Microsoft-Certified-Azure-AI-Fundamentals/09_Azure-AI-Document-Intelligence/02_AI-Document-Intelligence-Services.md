# AI Document Intelligence Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-AI-Document-Intelligence/AI-Document-Intelligence-Services)

---

## Table of Contents

- AI Document Intelligence Services
  - Document Analysis Overview
  - Pre-built Models
  - Custom Models
  - Conclusion
  - Additional Resources
  - Watch Video
    - Invoices
    - Receipts
    - ID Documents

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure AI Document Intelligence

# AI Document Intelligence Services

Azure AI Document Intelligence Services is a powerful solution that processes various types of documents by analyzing and extracting critical information. This service converts unstructured text into structured data, ready for analysis or seamless integration with databases. In this article, we explore its capabilities, including data extraction, region identification, and support for both pre-built and custom models to optimize data entry and management.

## Document Analysis Overview

The document analysis service transforms raw data into structured information, simplifying further processing. Instead of dealing with unorganized text, you work with data that's immediately useful for analysis or direct database entry.

The service intelligently detects key elements within documents—such as tables, headers, and footers—and understands the relationships between these regions. This is especially beneficial for complex documents like contracts or detailed reports, where preserving layout and structure is crucial.

![The image showcases a presentation slide about AI Document Intelligence Services, highlighting document analysis features such as structured data representations and identifying regions of interest. It includes a screenshot of a document analysis interface and a section with bullet points explaining the features.](https://kodekloud.com/kk-media/image/upload/v1752856843/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Document-Intelligence-Services/ai-document-intelligence-services-slide.jpg)

Azure Document Intelligence offers configurable analysis options with both free and premium features, allowing you to select the appropriate level of processing based on the complexity of your documents.

## Pre-built Models

Azure provides a range of pre-built models for common document types, enabling quick and accurate data extraction. These models reduce manual data entry and streamline your workflow.

### Invoices

The pre-built invoice model automatically extracts essential details such as invoice amounts, dates, and vendor information. It is particularly effective when processing high volumes of invoices, as it efficiently captures total amounts and due dates to support financial operations.

### Receipts

The receipt model specializes in extracting key details like merchant name, total amount spent, and items purchased. This functionality greatly aids expense management by digitizing and organizing large numbers of receipts swiftly.

![The image showcases AI Document Intelligence Services, highlighting pre-built models for extracting information from invoices and receipts. It includes an example of a receipt analysis with extracted details like merchant name, total amount, and address.](https://kodekloud.com/kk-media/image/upload/v1752856844/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Document-Intelligence-Services/ai-document-intelligence-receipt-analysis.jpg)

### ID Documents

For identification documents such as passports and driving licenses, Azure’s model accurately extracts key-value pairs like name, date of birth, and ID number. This is ideal for onboarding and verification processes where accurate data capture is essential.

> [!important]
> **Note**
>
> Azure’s pre-built models are engineered to handle a diverse range of document formats, ensuring reliable data extraction across various use cases.

## Custom Models

Custom models provide the flexibility to tailor document analysis to your organization’s specific needs. By providing at least five sample documents, you can train a model to recognize and extract unique fields critical to your operations.

This capability is especially useful for specialized document types not addressed by standard models. For example, you might customize the model to extract specific fields—such as total income or taxable amounts from tax forms—to enhance data accuracy and relevance.

![The image is a presentation slide about AI Document Intelligence Services, focusing on custom models for extracting information from forms, with an example of a W-9 form. It includes a section for creating projects and a graphic of a person analyzing data.](https://kodekloud.com/kk-media/image/upload/v1752856846/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Document-Intelligence-Services/ai-document-intelligence-custom-models.jpg)

## Conclusion

Azure AI Document Intelligence Services streamline document processing by converting unstructured text into structured, actionable data. With robust capabilities such as region identification and the choice between pre-built and custom models, the service automates the extraction of essential information—from invoices and receipts to ID documents and specialized forms. This automation enhances efficiency and reduces the reliance on manual processes.

Next, we will delve into additional services available in Document Intelligence, starting with an in-depth look at Form Analysis.

## Additional Resources

- [Azure AI Documentation](https://azure.microsoft.com/en-us/services/cognitive-services/form-recognizer/)
- [Understanding Document Intelligence](https://azure.microsoft.com/en-us/overview/ai-document-intelligence/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/274638d7-15bf-409f-a5d7-69c35ff0a986/lesson/04f0d780-ebc1-415d-a03c-9e79afbd22ab)**
>
> Watch video content
