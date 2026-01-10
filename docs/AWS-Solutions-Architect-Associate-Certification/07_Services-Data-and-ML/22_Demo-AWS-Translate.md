# Demo AWS Translate - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Demo-AWS-Translate)

---

## Table of Contents

- Demo AWS Translate
  - Real-Time Translation
  - Batch Translation
  - Custom Terminology
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Demo AWS Translate

In this article, we demonstrate how to use AWS Translate to convert text from one language to another. Whether you need real-time translation for quick text or batch translation for files, AWS Translate offers flexible workflows to suit your needs.

## Real-Time Translation

To begin, navigate to the AWS Translate console. Within Amazon Translate, you will find two main options: real-time translation and batch translation.

When you select real-time translation, you will notice options for specifying the source and target languages. Simply copy the text you want to translate, paste it into the text input box, and let AWS Translate handle the rest. If the auto-detect option is enabled, the service automatically identifies the input language.

![The image shows the Amazon Translate interface with a real-time translation feature. It displays a text input box with the sentence "Hello, how are you today. Where is the library?" and the same text in the translated text box.](https://kodekloud.com/kk-media/image/upload/v1752865022/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/amazon-translate-real-time-interface.jpg)

Currently, the service is set to auto-detect the language, correctly identifying English for the provided sentence. You also have the option to manually specify the source language if necessary. For example, to translate the text into Spanish, simply choose "Spanish" as the target language. The same process applies if you select another target language such as French or any other supported language.

In addition to text input, AWS Translate also supports document translation. For document translation:

1.  Specify the source and target languages.
2.  Upload your file.
3.  Indicate the document type (e.g., a text file, HTML, or a .docx file) to ensure proper handling by the service.

![The image shows the Amazon Translate interface, where English text is being translated into French. The input text is "Hello, how are you today. Where is the library?" and the translated text is "Bonjour, comment allez-vous aujourd'hui. Où se trouve la bibliothèque ?"](https://kodekloud.com/kk-media/image/upload/v1752865023/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/amazon-translate-english-french.jpg)

> [!important]
> **Quick Tip**
>
> For best results, always verify that the correct source and target languages are selected before initiating the translation.

## Batch Translation

Batch translation is ideal for processing multiple files or large documents. To create a batch translation job, follow these steps:

1.  Provide a unique job name.
2.  Specify the source language.
3.  Indicate the S3 bucket where the files to be translated are stored.
4.  Define the file format.
5.  Choose the location where the translated files will be saved (either in a different S3 bucket or in a specific folder within the same bucket).

![The image shows a screenshot of the AWS console, specifically the page for creating a translation job. It includes fields for input and output S3 locations, file format selection, and optional customization settings.](https://kodekloud.com/kk-media/image/upload/v1752865024/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/aws-console-translation-job-screenshot.jpg)

The batch translation process mirrors that of real-time translation—determine the source and destination languages, and select the appropriate files for translation.

For illustration, here is another example related to real-time translation:

![The image shows the Amazon Translate interface for creating a translation job, with options to set the job name, source and target languages, and input data location.](https://kodekloud.com/kk-media/image/upload/v1752865026/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/amazon-translate-job-interface.jpg)

Suppose you aim to translate the following sentence into Spanish:

"I graduated college in 2013. And I have over 10 years of experience working with Amazon Web Services. I mainly configure the networking side of things, like configuring virtual private clouds."

When translating, each word is processed individually. For example, "virtual private clouds" might be translated directly as "Nubes Privadas Virtuales." However, direct translations may not always capture the industry-specific meaning accurately.

> [!important]
> **Important**
>
> If you are not fluent in the target language, be cautious with direct translations as they might alter the intended meaning of technical terms.

## Custom Terminology

AWS Translate offers custom terminology to ensure that industry-specific terms are preserved during the translation process. This feature allows you to manually define translations for specific phrases, preventing them from being altered by the auto-translation process.

To set up custom terminology:

1.  Navigate to the "Custom Terminology" section.
2.  Click on "Create Terminology."
3.  Name the terminology file (for example, "AWS term").
4.  Provide the terminology file in one of the supported formats: CSV, TMX, or TSV.
5.  Specify the translation directionality.

![The image shows the "Terminology settings" page in the AWS Translate console, where users can configure terminology file data formats and directionality options.](https://kodekloud.com/kk-media/image/upload/v1752865027/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/aws-translate-terminology-settings.jpg)

Below is an example CSV file format ensuring that "virtual private clouds" remains unchanged across multiple languages:

```
en,fr,es
virtual private clouds,virtual private clouds,virtual private clouds
```

This CSV file instructs AWS Translate to keep the term "virtual private clouds" intact in English, French, and Spanish. Once your file (e.g., "custom-terminology.csv") is ready, upload it to create your custom terminology entry. Afterward, return to the real-time translation interface, paste your sentence again, and select your desired target language. By enabling custom terminology in the additional settings and choosing your custom terminology (e.g., "AWS term"), "virtual private clouds" remains unchanged in the translated output.

![The image shows the Amazon Translate interface, where text is being translated from English to Spanish in real-time. The source text discusses experience with Amazon Web Services, and the translated text is displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752865028/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-AWS-Translate/amazon-translate-english-spanish-interface.jpg)

Leveraging custom terminology ensures your translations are technically accurate and contextually appropriate, especially when handling specialized content.

## Summary

AWS Translate is a versatile tool that supports both real-time and batch translation workflows. By incorporating custom terminology, you can maintain consistency in industry-specific language across different translations, ensuring clarity and precision in your communication.

For further reading and additional resources, check out the following links:

- [AWS Translate Documentation](https://docs.aws.amazon.com/translate/)
- [AWS Solutions Architect Certification Guides](https://aws.amazon.com/certification/)

With these techniques, you can enhance your translation workflows, whether you're translating individual texts or managing complex document translations with AWS Translate.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/bb12019c-0007-4022-a703-8853db2f14f5)**
>
> Watch video content
