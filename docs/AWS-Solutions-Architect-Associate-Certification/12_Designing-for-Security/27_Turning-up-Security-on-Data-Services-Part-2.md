# Turning up Security on Data Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Data-Services-Part-2)

---

## Table of Contents

- Turning up Security on Data Services Part 2
  - Amazon QuickSight
  - Amazon Redshift and Data Warehousing
  - Amazon SageMaker
  - Amazon Rekognition
  - Amazon Polly
  - Amazon Lex
  - Amazon Comprehend
  - Amazon Forecast
  - Augmented AI (A2I)
  - Amazon Fraud Detector
  - Transcription and Translation Services
  - Amazon Textract
  - Summary
  - Watch Video
  - Practice Lab
    - Amazon Transcribe
    - Amazon Translate

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Data Services Part 2

In this lesson, we review the security aspects of several AWS data and machine learning services. We cover visualization tools, data warehousing solutions, and inference services, along with natural language processing, transcription, and translation. Each section describes the security features of the service, the encryption methods used, and complements the discussion with relevant diagrams.

---

## Amazon QuickSight

Amazon QuickSight is a visualization tool that lets you build dashboards by pulling data from sources such as Lake Formation, Athena, and the AWS Glue Data Catalog. As a fully managed service, QuickSight natively encrypts data both at rest and in transit. This encryption covers stored data, temporary storage within its SPICE engine, and all data movement. In addition, QuickSight integrates with CloudWatch for monitoring execution flows and metrics without requiring extra configuration.

![The image presents a scenario where a financial services company is evaluating Amazon QuickSight for data visualization, focusing on encryption features. It lists four options regarding QuickSight's encryption capabilities for data security.](https://kodekloud.com/kk-media/image/upload/v1752864185/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-quicksight-encryption-options.jpg)

---

## Amazon Redshift and Data Warehousing

Amazon Redshift is an SQL-based data warehousing solution that offers performance insights with automatic logging. Its tight integration with IAM and encryption mechanisms makes it a secure choice for managing large volumes of data. For more detailed aspects of its security features, refer to the dedicated sections later in this lesson.

---

## Amazon SageMaker

Amazon SageMaker provides a platform for building, training, and deploying machine learning models. Its security features are designed to protect sensitive data during the entire machine learning lifecycle. Key aspects include:

- **Notebooks and Studio:** SageMaker Notebooks (essentially EC2 instances running Jupyter) automatically encrypt data at rest and in transit.
- **Training Jobs:** Enable inner-container traffic encryption during training by specifying the appropriate encryption parameter in the API.
- **VPC Access and Storage Encryption:** Deploy SageMaker within a VPC to restrict public Internet access, and enforce storage encryption using custom keys.

![The image is a diagram illustrating the security design for Amazon SageMaker, showing the flow from users through IAM permissions to SageMaker, and its components like Notebook, Training, and Model. It highlights SageMaker's role in training and deploying machine learning models.](https://kodekloud.com/kk-media/image/upload/v1752864186/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-sagemaker-security-design-diagram.jpg)

For secure configurations, ensure that:

- Inner container traffic encryption is set to true.
- SageMaker is deployed in a VPC to isolate instances from the Internet using security groups and specific VPC endpoints.

![The image presents a question about Amazon SageMaker notebook features, offering four statements to identify the best description.](https://kodekloud.com/kk-media/image/upload/v1752864187/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-sagemaker-notebook-features.jpg)

![The image is a diagram illustrating Amazon SageMaker's security features, showing multiple training instances connected to Amazon S3 for data access using SageMaker Pipe mode. It also mentions encryption of data at rest and in transit.](https://kodekloud.com/kk-media/image/upload/v1752864188/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/sagemaker-security-features-diagram.jpg)

![The image is a slide titled "Designing for Security – SageMaker," showing a configuration screen for network and storage settings in SageMaker, highlighting VPC access and a "No Internet" mode.](https://kodekloud.com/kk-media/image/upload/v1752864190/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/designing-for-security-sagemaker.jpg)

![The image provides steps for configuring Amazon SageMaker to operate in a "No Internet" mode for maximum data security, including using a VPC without an Internet Gateway, setting offline mode, using AWS Direct Connect, and enabling an IAM policy to block internet access.](https://kodekloud.com/kk-media/image/upload/v1752864191/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/sagemaker-no-internet-configuration.jpg)

Monitoring SageMaker is integrated with CloudWatch for logging and metrics, and AWS CloudTrail provides comprehensive auditing.

---

## Amazon Rekognition

Amazon Rekognition analyzes and recognizes objects within images. This service encrypts input media and associated metadata by default. For additional security, client-side encryption is supported, though the data must be decrypted prior to processing. To maintain secure access, deploy VPC interface endpoints (PrivateLink).

![The image outlines encryption options provided by Amazon Rekognition to ensure the confidentiality and integrity of media content, including client-side encryption, encryption at rest with AWS KMS, in-transit encryption using SSL/TLS, and built-in encryption within Rekognition.](https://kodekloud.com/kk-media/image/upload/v1752864193/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-rekognition-encryption-options.jpg)

![The image illustrates a security design for AWS Rekognition, showing the connection between EC2 image processing within a VPC and AWS Rekognition image processing via an interface endpoint. It emphasizes the importance of VPC endpoints for services like Rekognition.](https://kodekloud.com/kk-media/image/upload/v1752864194/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/aws-rekognition-security-design-vpc.jpg)

---

## Amazon Polly

Amazon Polly converts text to lifelike speech. As a managed service, its security largely relies on the backing storage used for audio outputs (usually Amazon S3). When evaluating Polly’s security, it is important to consider the encryption settings and access policies configured on S3, as well as logging through CloudWatch.

---

## Amazon Lex

Amazon Lex, which powers conversational chatbots, combines automatic speech recognition (ASR) with natural language understanding (NLU) to convert speech to text and analyze intent. It encrypts data by default and uses IAM for fine-grained access control. Lex can also be accessed securely by leveraging VPC interface endpoints.

![The image is a diagram illustrating the security design for Amazon Lex, highlighting encryption, logging, and infrastructure protections, with a flow involving Amazon CloudWatch and AWS Lambda.](https://kodekloud.com/kk-media/image/upload/v1752864195/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-lex-security-design-diagram.jpg)

> [!important]
> **Note**
>
> When securing Lex interactions, be sure to employ PrivateLink to privatize traffic as needed.

---

## Amazon Comprehend

Amazon Comprehend is a natural language processing service that extracts key insights such as entities, key phrases, language, sentiment, and topics from text. Fully managed and leveraging pre-trained machine learning models, Comprehend simplifies NLP tasks. Users can enable encryption for both input data and outputs using AWS KMS.

![The image illustrates a process of extracting meaning from text, showing input sources like social media and documents, and outputting entities, key phrases, language, sentiment, and topics.](https://kodekloud.com/kk-media/image/upload/v1752864196/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/text-meaning-extraction-process.jpg)

![The image explains the key architectural elements of Amazon Comprehend, highlighting its use of machine learning models on EC2 instances, its fully managed service nature, serverless framework, and the need for manual setup of data pipelines using AWS Glue.](https://kodekloud.com/kk-media/image/upload/v1752864197/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-comprehend-architecture-diagram.jpg)

---

## Amazon Forecast

Amazon Forecast builds time-series forecasting models using historical data. While it remains a newer addition to AWS’s machine learning portfolio, its security practices align with standard AWS services: data at rest is encrypted (with options for user-managed keys) and access is controlled by IAM. Logging support is available via CloudTrail and CloudWatch.

---

## Augmented AI (A2I)

Amazon Augmented AI (A2I) adds a human review step to machine learning predictions when confidence is low. This helps improve the accuracy of results by integrating human verification via internal teams or AWS Mechanical Turk. Key security considerations include protecting submitted data and review processes with IAM policies and KMS encryption.

![The image is a diagram explaining Amazon Augmented AI, showing how input data is processed by an AI service, with high-confidence predictions sent to a client application and low-confidence predictions reviewed by humans. It highlights the role of human review in improving machine learning models.](https://kodekloud.com/kk-media/image/upload/v1752864198/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-augmented-ai-diagram.jpg)

![The image outlines security considerations for a healthcare company using Amazon Augmented AI (A2I), highlighting the need for external data protection, integration with AWS IAM, and support for AWS KMS for encryption.](https://kodekloud.com/kk-media/image/upload/v1752864200/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/healthcare-security-amazon-a2i.jpg)

---

## Amazon Fraud Detector

Amazon Fraud Detector identifies anomalous and potentially fraudulent activities within transactions. It integrates with IAM for secure access management and leverages AWS KMS for encryption of data at rest. Additionally, the service supports comprehensive logging and monitoring through CloudTrail and CloudWatch.

![The image illustrates a flowchart for a fraud detection system using AWS services, including a CSV file input, Amazon S3 buckets, AWS Lambda, and Amazon Fraud Detector.](https://kodekloud.com/kk-media/image/upload/v1752864201/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/fraud-detection-flowchart-aws-services.jpg)

---

## Transcription and Translation Services

### Amazon Transcribe

Amazon Transcribe securely converts audio and video content into text. It encrypts data automatically in transit and at rest while also supporting customer-managed keys. Its security framework ensures that media files remain protected throughout the transcription process.

![The image outlines security measures offered by Amazon Transcribe to ensure the confidentiality and integrity of media files during transcription, including hardware security modules, encryption, integration with Amazon Macie, and virtual private cloud services.](https://kodekloud.com/kk-media/image/upload/v1752864202/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-transcribe-security-measures.jpg)

### Amazon Translate

Amazon Translate provides language translation services with strong security measures. It encrypts data in transit using TLS and secures information at rest (typically using AES-256). Moreover, Amazon Translate complies with industry standards such as ISO 27001, PCI DSS, and HIPAA.

![The image presents a question about Amazon Translate's security measures for document confidentiality and integrity, followed by four options detailing different encryption and security features.](https://kodekloud.com/kk-media/image/upload/v1752864204/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Data-Services-Part-2/amazon-translate-security-options.jpg)

---

## Amazon Textract

Amazon Textract extracts text and structured data from scanned documents while ensuring robust security. It leverages server-side encryption for data stored in S3 and relies on IAM for authenticated access and user management.

> [!important]
> **Note**
>
> Remember that ensuring the security of outputs from Textract also depends on the configurations of connected services such as the S3 buckets storing the document data.

---

## Summary

This lesson covered the security features of an array of AWS data and machine learning services—from data ingestion and visualization to inference and transcription. Key themes include:

- Default encryption both at rest and in transit.
- Use of AWS KMS for customer-managed encryption.
- Robust access controls using AWS IAM.
- Monitoring and logging through AWS CloudWatch and CloudTrail.

While most of these services are designed to be highly secure by default, it remains essential for architects to apply additional settings—like inner container encryption in SageMaker or restricted access via VPC endpoints—to align with specific security requirements.

Thank you for following this lesson on AWS security considerations. In the next section, we will explore additional security topics and best practices.

For further reading, consider these resources:

- [AWS Security Documentation](https://aws.amazon.com/security/)
- [Amazon Web Services – Compliance](https://aws.amazon.com/compliance/)
- [AWS Best Practices for Security, Identity, & Compliance](https://aws.amazon.com/architecture/security-identity-compliance/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/75e6570a-8253-4160-afd1-c4166faea0a3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/016be149-a7ce-4e76-998a-d36fa6bd5795)**
>
> Practice lab
