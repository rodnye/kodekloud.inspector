# Overview of AI and ML Services on AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Fundamentals-of-AI-and-ML/Overview-of-AI-and-ML-Services-on-AWS)

---

## Table of Contents

- Overview of AI and ML Services on AWS
  - AWS AI Service Landscape
  - Bedrock – Generative AI Made Easy
  - SageMaker – The Machine Learning Workhorse
  - Image and Video Analysis with Rekognition
  - Conversational AI with Lex and Polly
  - Natural Language Processing with Comprehend
  - Fraud Detection with Fraud Detector
  - Speech Processing with Transcribe and Translate
  - Document Processing with Textract
  - Data Processing Services
  - Augmented AI (A2I)
  - Data Visualization with QuickSight
  - Conclusion
  - Watch Video
    - Amazon Lex
    - Amazon Polly
    - Amazon Transcribe
    - Amazon Translate
    - AWS Glue and Glue DataBrew
    - Elastic MapReduce (EMR)

---

## Content

AWS Certified AI Practitioner

Fundamentals of AI and ML

# Overview of AI and ML Services on AWS

Welcome to this comprehensive lesson on AI and ML services on AWS. In this article, we explain the various tools and services offered by AWS, detailing their features, workflows, and integration capabilities. This information is designed to support your certification journey and practical application of cloud-based AI and machine learning solutions. Remember to take your time and revisit sections as needed.

## AWS AI Service Landscape

AWS's robust suite of AI and machine learning services addresses challenges in scalability, data processing, and deployment. These services are designed to be user-friendly and highly scalable. Key services include SageMaker, Polly, Lex, Rekognition, Bedrock (the premier generative AI service), Transcribe, Textract, and others. Acquaintance with these tools, including their subservices, is invaluable for both certification and real-world projects.

![The image is a diagram highlighting AWS as a leader in AI services, emphasizing its tools as comprehensive and scalable.](https://kodekloud.com/kk-media/image/upload/v1752857414/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-ai-services-leader-diagram.jpg)

For instance, SageMaker is used for custom machine learning model development, Polly for converting text into lifelike speech, and Lex for building conversational interfaces. Additional offerings include Rekognition for image and video analysis, Bedrock for generative AI applications, Transcribe for speech-to-text conversion, and Textract for extracting text from scanned documents.

![The image highlights AWS as a leader in AI services, featuring AWS SageMaker, AWS Polly, and AWS Lex, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752857415/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-ai-services-sagemaker-polly-lex.jpg)

## Bedrock – Generative AI Made Easy

Amazon Bedrock is a fully managed generative AI service that supports a range of foundation models—including those from Claude, OpenAI, and open source projects. This service simplifies the development of generative AI applications with native integrations to S3, EC2, and SageMaker. It also offers several advanced capabilities:

- **Guardrails:** Ensure models adhere to content restrictions, compliance requirements, and data privacy standards.
- **Bedrock Agents:** Automate generative AI tasks and workflows, enhancing interactivity and dynamic operations.

![The image explains that Amazon Bedrock is a fully managed service for foundation models, designed to simplify generative AI application development.](https://kodekloud.com/kk-media/image/upload/v1752857416/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-bedrock-managed-service-ai.jpg)

![The image is a diagram showing AWS Bedrock's capabilities, connecting to AWS S3, AWS EC2, and AWS SageMaker.](https://kodekloud.com/kk-media/image/upload/v1752857417/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-bedrock-capabilities-diagram.jpg)

![The image is a slide titled "AWS Bedrock – Guardrails," listing three features: ensuring safe and responsible AI, built-in content moderation, and compliance and data privacy features.](https://kodekloud.com/kk-media/image/upload/v1752857418/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-bedrock-guardrails-features.jpg)

![The image is a slide titled "AWS Bedrock Agents" with three points: automating complex tasks, orchestrating workflows based on AI outputs, and enhancing application capabilities.](https://kodekloud.com/kk-media/image/upload/v1752857420/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-bedrock-agents-workflows-automation.jpg)

## SageMaker – The Machine Learning Workhorse

Amazon SageMaker is a managed service that accelerates building, training, and deploying machine learning models. Tailored for data scientists and machine learning engineers, SageMaker offers a range of powerful tools and customizations:

- **Data Preparation and Labeling:** Utilize tools such as SageMaker Canvas, Notebook Instances, Data Wrangler, and Ground Truth for data exploration, cleaning, and labeling.
- **Training and Tuning:** Benefit from distributed training and automatic hyperparameter tuning to optimize model performance.
- **Deployment:** Leverage blue/green deployments, versioned endpoints, and scalable hosting for quick and efficient model deployment.

![The image is an overview of SageMaker, outlining four steps: data preparation, model training, tuning, and deployment. Each step is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752857421/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/sagemaker-overview-four-steps.jpg)

The end-to-end workflow in SageMaker includes data ingestion (from sources such as S3 and EFS), interactive exploration using Jupyter notebooks, model training and evaluation, and real-time predictions through hosted endpoints.

![The image illustrates a SageMaker workflow consisting of five steps: data ingestion, data preparation and exploration, model training, model evaluation and tuning, and model deployment. Each step includes specific tools or data types used in the process.](https://kodekloud.com/kk-media/image/upload/v1752857423/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/sagemaker-workflow-five-steps.jpg)

Additionally, SageMaker integrates with AWS Glue for seamless extraction, transformation, and loading (ETL) operations.

![The image lists five features: built-in algorithms and BYOA, integrated Jupyter Notebooks, distributed training, automatic model tuning, and SageMaker Studio.](https://kodekloud.com/kk-media/image/upload/v1752857424/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/sagemaker-features-algorithms-notebooks.jpg)

## Image and Video Analysis with Rekognition

Amazon Rekognition offers powerful visual analysis to detect and identify objects, scenes, and activities in both images and videos. Its key functionalities include:

- Automated tagging and metadata generation for images.
- Content moderation to eliminate unsafe or inappropriate content.
- Integration with AWS S3 and Lambda to automate workflows and store analysis results.

![The image explains that Amazon Rekognition analyzes images and videos for object detection, facial analysis, and text recognition.](https://kodekloud.com/kk-media/image/upload/v1752857424/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-rekognition-image-analysis.jpg)

![The image lists use cases for technology, including facial recognition in security systems, analyzing visual content for media companies, and recognizing logos or product features in retail.](https://kodekloud.com/kk-media/image/upload/v1752857426/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/technology-use-cases-facial-recognition.jpg)

![The image illustrates a flowchart showing Amazon Rekognition analyzing an image and suggesting keywords like "Mountain," "Glacier," and "Landscape."](https://kodekloud.com/kk-media/image/upload/v1752857427/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-rekognition-flowchart-keywords.jpg)

![The image illustrates a process where a robot analyzes images, categorizing them into "Harmful Content" and "Safe Content."](https://kodekloud.com/kk-media/image/upload/v1752857428/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/robot-image-analysis-categorization.jpg)

![The image is a flowchart illustrating the process of using Amazon Rekognition, involving an image upload to an S3 bucket, triggering AWS Lambda, processing with Amazon Rekognition, and storing results in Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752857429/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-rekognition-flowchart-process.jpg)

## Conversational AI with Lex and Polly

### Amazon Lex

Amazon Lex enables the development of sophisticated conversational interfaces, including chatbots and virtual assistants, that work with both voice and text. Main features include:

- **Natural Language Understanding (NLU)** and **Automatic Speech Recognition (ASR)**.
- Easy integration with AWS Lambda, Amazon Cognito, and Polly for multi-channel support.
- Use cases such as customer service bots for hotel bookings and streamlined virtual assistants for everyday tasks.

![The image is a flowchart illustrating a process involving Amazon Cognito, Amazon Lex, AWS Lambda, and Amazon DocumentDB, showing the interaction between a user and these services.](https://kodekloud.com/kk-media/image/upload/v1752857430/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-cognito-lex-lambda-documentdb-flowchart.jpg)

![The image lists five features: Natural Language Understanding and Automatic Speech Recognition, easy to build, fully managed, built-in integrations, and multi-channel support.](https://kodekloud.com/kk-media/image/upload/v1752857432/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/nlp-speech-recognition-features.jpg)

### Amazon Polly

Amazon Polly is a text-to-speech service that transforms text into lifelike speech. Its key features include:

- Real-time audio streaming or asynchronous speech file generation.
- Support for Speech Synthesis Markup Language (SSML) to control aspects like pronunciation, volume, pitch, and speed.
- Seamless integration with AWS services such as Lex and Lambda, forming the vocal response layer in conversational workflows.

![The image shows a conversation between a human and a robot named Polly, discussing the weather. The human asks about the weather, and Polly responds with the current temperature and forecast.](https://kodekloud.com/kk-media/image/upload/v1752857432/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/human-robot-conversation-weather.jpg)

![The image lists five features: lifelike speech, real-time streaming or file generation, SSML support, lexicon support, and integration with other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752857434/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-tts-features-list.jpg)

## Natural Language Processing with Comprehend

Amazon Comprehend is designed to analyze text data, extracting key phrases, sentiment, and entities. It is useful for various applications, including:

- Analyzing product reviews to determine sentiment (positive, neutral, or negative).
- Detecting language, identifying entities, and performing topic modeling.
- Integrating with AWS Lambda, S3, and Athena for scalable, large-scale text analysis.

![The image illustrates a data processing workflow using AWS services, including Amazon S3, AWS Lambda, Amazon Comprehend, and Athena, with a focus on text analysis.](https://kodekloud.com/kk-media/image/upload/v1752857435/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-data-processing-workflow-text-analysis.jpg)

## Fraud Detection with Fraud Detector

Amazon Fraud Detector is a fully managed service that leverages machine learning to identify fraudulent activities in real time. It is designed to:

- Reduce online payment fraud by evaluating transaction risks.
- Enable custom model training using historical data with continuous performance monitoring.
- Optionally integrate human review (A2I) for reviewing low-confidence predictions.

![The image outlines an eight-step process for a fraud detector, including defining the business use case, inputting historical data, selecting and training a model, and deploying the detector for real-time or batch evaluation.](https://kodekloud.com/kk-media/image/upload/v1752857436/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/fraud-detector-eight-step-process.jpg)

![The image is a flowchart illustrating how a fraud detection system works, involving a client application, a fraud detector model, human reviews, Amazon S3, and a fraud detector.](https://kodekloud.com/kk-media/image/upload/v1752857437/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/fraud-detection-system-flowchart.jpg)

## Speech Processing with Transcribe and Translate

### Amazon Transcribe

Amazon Transcribe converts audio and video content into text using advanced automatic speech recognition. Its capabilities include:

- Speaker labeling for up to 10 distinct voices.
- Integration with Lambda to trigger downstream workflows for storing or processing transcribed text.
- Use cases such as subtitle generation, meeting transcription, and processing via services like Translate or Comprehend.

![The image illustrates a workflow involving Amazon S3, AWS Lambda, and Amazon Transcribe, leading to services like Amazon Translate, Amazon Comprehend, and Amazon DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752857438/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-s3-lambda-transcribe-workflow.jpg)

### Amazon Translate

Amazon Translate offers neural machine translation capabilities to convert text between languages. Its features include:

- Support for a wide range of languages with near real-time translation.
- Custom terminology support for domain-specific language.
- Integration with Lambda, S3, Polly, and Comprehend to develop multilingual applications.

![The image is a flowchart illustrating a translation process using AWS services, starting with Amazon S3 for source text, then AWS Lambda, followed by Amazon Translate, and ending with Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752857439/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-translation-process-flowchart.jpg)

![The image lists five features: neural machine translation, a wide range of supported languages, real-time translation, seamless integration, and custom terminology.](https://kodekloud.com/kk-media/image/upload/v1752857441/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/neural-machine-translation-features.jpg)

Integration between Transcribe and Translate enables robust voice-based multilingual support—audio is transcribed, then translated, and potentially converted back to speech, providing a complete language solution.

![The image illustrates a process involving a person communicating with a robot, which then utilizes Amazon Transcribe, Amazon Translate, and Amazon Polly services.](https://kodekloud.com/kk-media/image/upload/v1752857442/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/person-robot-amazon-services-process.jpg)

## Document Processing with Textract

Amazon Textract employs Optical Character Recognition (OCR) to extract text, tables, and forms from scanned documents. It is ideal for automating the processing of handwritten or printed materials by:

- Extracting text in a structured format.
- Recognizing forms, tables, and signatures.
- Seamlessly integrating with S3, Lambda, and databases for downstream processing.

![The image illustrates a flowchart showing a process involving Amazon S3, AWS Lambda, Amazon Textract, and Amazon DynamoDB. It shows the sequence of data processing from storage to text extraction and database storage.](https://kodekloud.com/kk-media/image/upload/v1752857444/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/amazon-s3-aws-lambda-flowchart.jpg)

## Data Processing Services

### AWS Glue and Glue DataBrew

AWS Glue is an essential serverless ETL service for data extraction, transformation, and loading. Its core capabilities include:

- Crawling diverse data sources (e.g., SQL databases, DynamoDB) to create a metadata-rich data catalog.
- Executing Python (PySpark) or Scala-based ETL jobs to load data into targets like S3, Redshift, or Athena.
- Supporting both batch processing and trigger-based jobs.

![The image illustrates a data processing flow in AWS Glue, showing a datastore connected to a crawler, which then feeds into a data catalog.](https://kodekloud.com/kk-media/image/upload/v1752857445/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-glue-data-processing-flow.jpg)

Glue DataBrew extends these capabilities with a visual interface for data preparation. Users can:

- Create and apply transformation recipes without writing code.
- Profile and visually clean data.
- Schedule and manage large-scale transformation jobs seamlessly.

![The image is a flowchart for Glue DataBrew, illustrating steps: create projects, select datasets, select recipes, and run jobs.](https://kodekloud.com/kk-media/image/upload/v1752857446/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/glue-databrew-flowchart-steps.jpg)

![The image lists five features: visual data preparation, data profiling, scalability and performance, integration with AWS Data Stores, and job scheduling and reusability.](https://kodekloud.com/kk-media/image/upload/v1752857447/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/data-preparation-profiling-features.jpg)

### Elastic MapReduce (EMR)

Amazon EMR is a managed big data processing framework that leverages tools like Apache Hadoop, Apache Spark, and Hive. Key functionalities include:

- Launching and managing clusters of EC2 instances optimized for big data workloads.
- Processing data from sources such as S3, RDS, Redshift, and Kinesis, then writing results back to S3.
- Offering both traditional cluster-based and serverless deployment options.

![The image is a diagram illustrating the integration of Amazon Web Services (AWS) components with Elastic MapReduce (EMR), showing data flow from services like DynamoDB, RDS, and S3 to Redshift, Kinesis, and S3.](https://kodekloud.com/kk-media/image/upload/v1752857448/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-emr-integration-diagram.jpg)

![The image illustrates a flowchart for Elastic MapReduce (EMR) with steps for submitting an input dataset, processing with Pig and Hive programs, and writing the output dataset, along with status indicators like "Completed," "Failed," and "Cancelled."](https://kodekloud.com/kk-media/image/upload/v1752857450/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/emr-flowchart-pig-hive-status.jpg)

## Augmented AI (A2I)

Amazon Augmented AI (A2I) seamlessly integrates human review into machine learning workflows, ideal for verifying low-confidence predictions. Key aspects include:

- Built-in human review workflows available within SageMaker.
- Options to use either AWS Mechanical Turk for public review or a private, internal workforce.
- Continuous improvement of model accuracy by incorporating human feedback.

![The image is a flowchart illustrating an "Augmented AI" process, where input data is translated using Amazon Translate, with low-confidence translations reviewed by humans before storing the translated text in Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752857451/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/augmented-ai-translation-flowchart.jpg)

## Data Visualization with QuickSight

Amazon QuickSight is a scalable, serverless business intelligence service that creates interactive dashboards and visualizations. It integrates with multiple AWS data sources such as Athena, Redshift, RDS, and Glue. Notable features include:

- The SPICE engine for super-fast, parallel, in-memory calculations.
- Natural language querying capabilities with QuickSight Q.
- Automated data refresh, encryption, and effortless integration with other AWS services.

![The image illustrates a data flow diagram showing AWS services like S3, Athena, RDS, Redshift, Aurora, and Glue feeding into QuickSight for data visualization, represented by charts and graphs.](https://kodekloud.com/kk-media/image/upload/v1752857452/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/aws-data-flow-diagram-quicksight.jpg)

![The image describes SPICE, a super-fast, parallel, in-memory calculation engine, highlighting its features such as high-speed data processing, automatic dataset refresh, data encryption, in-memory storage, seamless scaling, and support for natural language querying.](https://kodekloud.com/kk-media/image/upload/v1752857453/notes-assets/images/AWS-Certified-AI-Practitioner-Overview-of-AI-and-ML-Services-on-AWS/spice-parallel-in-memory-engine.jpg)

> [!important]
> **Note**
>
> For more detailed guidance on integrating these services, please refer to the official [AWS Documentation](https://aws.amazon.com/documentation/).

## Conclusion

This article has provided a detailed overview of AWS's AI, ML, and data processing services—from generative AI with Bedrock to data visualization with QuickSight and big data processing with EMR. Understanding these services, their workflows, and integration points is essential for both AWS certification and real-world application in cloud-based AI and ML projects.

Thank you for reading, and we look forward to guiding you through the next chapter in your AWS journey.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/e79d4d90-43ff-4f6a-a5c0-fe2e960cb76d/lesson/9b876938-7e33-462e-b06a-cb4ac4427be6)**
>
> Watch video content
