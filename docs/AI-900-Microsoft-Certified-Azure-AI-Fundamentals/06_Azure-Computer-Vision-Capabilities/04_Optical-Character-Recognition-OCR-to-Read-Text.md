# Optical Character Recognition OCR to Read Text - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-Computer-Vision-Capabilities/Optical-Character-Recognition-OCR-to-Read-Text)

---

## Table of Contents

- Optical Character Recognition OCR to Read Text
  - Overview of OCR Capabilities
  - OCR in Action with Azure
  - Conclusion
  - Watch Video
    - Printed Text Extraction
    - Handwritten Text Extraction
    - Quick Text Extraction from Images
    - Asynchronous Processing for Bulk Documents
    - How to Use OCR in Azure Portal

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure Computer Vision Capabilities

# Optical Character Recognition OCR to Read Text

In this article, we explore Optical Character Recognition (OCR), a powerful technology designed to convert text from images into machine-readable data. OCR is essential for processing printed and handwritten content, making it easier to manage, search, and analyze information across various applications.

## Overview of OCR Capabilities

OCR can extract text from various image sources, handling both printed and handwritten text effectively. Below, we detail its main capabilities.

### Printed Text Extraction

OCR excels at extracting printed text from images such as scanned documents, photographs, and digital images. For instance, it can process a scanned page from a book or a form photograph, converting the content into editable text. This functionality is particularly useful for:

- Archiving physical documents digitally
- Automating data entry from printed forms

### Handwritten Text Extraction

OCR also supports the recognition of handwritten text. Whether it’s a personal note, a handwritten shopping list, or meeting notes, OCR can convert these into searchable and editable digital text. This capability streamlines the process of managing handwritten data.

![The image explains Optical Character Recognition (OCR) for reading text, highlighting its ability to detect printed and handwritten text. It includes an example of a handwritten list being digitized.](https://kodekloud.com/kk-media/image/upload/v1752856895/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Optical-Character-Recognition-OCR-to-Read-Text/ocr-handwritten-text-detection.jpg)

### Quick Text Extraction from Images

OCR rapidly extracts text from images, making it ideal for converting visual data—such as a photograph of a note, a menu, or a street sign—into editable and searchable content.

### Asynchronous Processing for Bulk Documents

For large volumes of scanned documents, OCR offers asynchronous processing. This enables tasks to be queued and processed in the background without requiring real-time analysis. It is a reliable solution for extensive archives or bulk document workflows.

> [!important]
> **Note**
>
> Asynchronous processing improves efficiency when dealing with large document sets by offloading tasks to background processing, ensuring your system remains responsive.

Below is an example list extracted from scanned documents using OCR:

```
Workout
Clean the house
Groom the dog
Make dinner
Go shopping
Organize your desk
Go to the beach
Drink enough water
```

![The image explains Optical Character Recognition (OCR) for text extraction, featuring a handwritten list and highlighting options for quick text extraction from images and asynchronous analysis of scanned documents.](https://kodekloud.com/kk-media/image/upload/v1752856896/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Optical-Character-Recognition-OCR-to-Read-Text/ocr-text-extraction-handwritten-list.jpg)

## OCR in Action with Azure

Azure's OCR capabilities provide a versatile and powerful solution for digitizing text from images and documents. Whether you need to extract printed or handwritten text, you can choose between rapid extraction for individual images or asynchronous processing for bulk documents. This simplifies digital transformation tasks, enhances data entry efficiency, and facilitates the management of digitized archives.

### How to Use OCR in Azure Portal

1.  Open AI Studio and navigate to the Image section.
2.  Select the Optical Character Recognition option.
3.  Choose the handwritten note you want to process.
4.  Ensure you have a connected AI service deployed; this service converts the handwritten text into a digital format.
5.  The extracted result is presented in JSON format, similar to previous examples where a handwritten note was uploaded to Azure Storage.

![The image shows a purple paper with handwritten text, featuring motivational quotes. The text is highlighted and extracted on the right side of the screen.](https://kodekloud.com/kk-media/image/upload/v1752856898/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Optical-Character-Recognition-OCR-to-Read-Text/purple-paper-motivational-quotes.jpg)

You can also access OCR functionalities from Vision Studio, provided an Azure resource has been created for that service.

## Conclusion

In summary, OCR technology is a pivotal tool for transforming both printed and handwritten text into digital form. The flexibility to quickly process individual images or handle bulk document processing asynchronously makes OCR a valuable asset for businesses aiming to modernize their data workflows.

Next, we will dive into Natural Language Processing (NLP) and explore how it works hand-in-hand with OCR to unlock deeper insights from your data.

For more detailed insights, visit the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/46a90709-d0a2-4cb4-b860-dc4d791fd802/lesson/d16af170-8818-4500-9255-f0cc49348e4f)**
>
> Watch video content
