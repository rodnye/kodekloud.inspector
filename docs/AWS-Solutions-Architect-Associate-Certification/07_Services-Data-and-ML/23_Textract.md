# Textract - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Textract)

---

## Table of Contents

- Textract
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Textract

Welcome back, Solutions Architects. In this article, presented by Michael Forrester, we explore the power of language processing with AWS Textract—a fully managed machine learning service designed to automatically extract text and data from scanned documents.

Textract efficiently processes various document types, such as handwritten notes, PDFs, and more, converting them into standardized digital formats that include tables, formatted text, and key data points. Once the extraction is complete, you can either download the data or store it in a database to meet your business requirements. For example, imagine medical reports being ingested into a HIPAA-compliant database to enhance patient-doctor communication, improve accuracy, and provide deeper insight through detailed analyses.

> [!important]
> **Key Capabilities**
>
> Textract enables you to:
>
> - Extract raw text from documents.
> - Identify key-value pairs by correlating form data with extracted text.
> - Extract structured table data.
> - Recognize signatures within documents.
> - Return results in multiple formats (JSON, CSV, TXT).
> - Execute queries against specific document information.

In addition to text extraction, AWS Textract also supports form and table extraction, as well as signature recognition. Its seamless integration with other AWS services, such as Lambda, makes it possible to build robust document processing pipelines. For example, you can send the extracted text to AWS Comprehend for sentiment analysis, thereby chain-processing your documents without any hassle. Its scalability is exceptional—even when working with challenging handwritten texts, Textract often requires minimal post-processing corrections.

In my own experience, I have tested Textract with some of the most challenging handwritten notes in English. Despite encountering a few minor errors with technical jargon, the service consistently produced meaningful, usable text with very little editing required.

![The image lists five features: Text Extraction, Data Extraction From Forms and Tables, Integration, Handwriting Recognition, and Scalability, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865099/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Textract/features-text-extraction-data-integration.jpg)

Textract's scalability is practically limitless. I have processed millions of documents in just a few hours—all without the need for specialized machine learning expertise.

The typical architecture of Textract follows this process:

1.  Documents are sourced and stored in Amazon S3.
2.  An AWS Lambda function is triggered to call Textract.
3.  Textract processes the document.
4.  The extracted data is output back to S3 or can be directly downloaded via the AWS Management Console.

For those new to AWS Textract, I recommend uploading a sample document with handwritten notes to your AWS account and observing how Textract transforms it into digital text.

In another example workflow, after Textract processes a document uploaded to S3 through a Lambda function, the extracted text is stored in a DynamoDB table. This structured data can then be retrieved for further processing or analysis.

![The image is a flowchart illustrating a process involving Amazon S3, AWS Lambda, Amazon Textract, and Amazon DynamoDB. It shows the sequence of data processing from storage to database.](https://kodekloud.com/kk-media/image/upload/v1752865100/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Textract/amazon-s3-aws-lambda-flowchart.jpg)

> [!important]
> **Next Steps**
>
> This article has covered the core functionality of AWS Textract: extracting text from scanned documents and converting it into a digital format for further use. If you have any questions or need further assistance, please join us on Slack. We look forward to connecting with you in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/728b244e-4db4-43d9-a98a-0bd790e0a8f3)**
>
> Watch video content
