# Source Citation and Data Lineage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Security-Compliance-and-Governance-for-AI-Solutions/Source-Citation-and-Data-Lineage)

---

## Table of Contents

- Source Citation and Data Lineage
  - Tracking Artifacts in AI Development
  - Enhancing Model Management with SageMaker Subservices
  - Centralizing Data Attributes with Feature Store
  - Conclusion
  - Watch Video

---

## Content

AWS Certified AI Practitioner

Security Compliance and Governance for AI Solutions

# Source Citation and Data Lineage

Welcome to this comprehensive lesson on source citation and data lineage—a critical aspect of developing generative AI models using AWS SageMaker. In this lesson, we explore the importance of tracking every step in your data’s lifecycle, ensuring transparency, compliance, and model integrity.

Data lineage is fundamental for tracking data sources, monitoring processing steps, and recording how data is pre-processed and stored. Think of it as version control for datasets and models. The process documents the origin and every subsequent change, ensuring that your AI models have a clear audit trail from inception to final deployment.

![The image illustrates the importance of data lineage in AI, showing a flow from data source to data processing and then to data storage. It highlights that data lineage tracks the origin and changes in data throughout its lifecycle.](https://kodekloud.com/kk-media/image/upload/v1752857788/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/data-lineage-ai-flow-diagram.jpg)

In this context, the term "feature" refers to an attribute or characteristic of the data—not a software feature. Tracking data lineage means ensuring data integrity, regulatory compliance, and reproducibility of AI models. It essentially provides you with a detailed roadmap of every processing step, much like an audit trail for your AI model development process.

![The image outlines the importance of data lineage in AI, highlighting three key aspects: data integrity, compliance, and model reproducibility.](https://kodekloud.com/kk-media/image/upload/v1752857789/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/data-lineage-ai-importance.jpg)

## Tracking Artifacts in AI Development

One of the major challenges in model development is keeping track of the numerous artifacts involved, including:

- **Model artifacts**
- **Data artifacts**
- **Hyperparameter tuning artifacts**
- **Source code**
- **Datasets**
- **Container images**

Each component requires versioning, tracking, and backup. Source code and datasets are generally managed through version-controlled repositories and storage systems that support metadata tagging.

![The image is a diagram titled "Machine Learning – Need for Tracking Artifacts," showing different artifacts to track: source code, datasets, container images, and model versions.](https://kodekloud.com/kk-media/image/upload/v1752857790/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/machine-learning-tracking-artifacts-diagram.jpg)

For example, version control tools such as GitHub or AWS CodeCommit are used for managing code, while Amazon S3 serves as a robust solution for dataset storage.

![The image illustrates version control for code and datasets, highlighting GitHub and AWS CodeCommit for code repositories, and Amazon S3 for dataset storage.](https://kodekloud.com/kk-media/image/upload/v1752857791/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/version-control-github-aws-s3.jpg)

When working with container images, using Amazon Elastic Container Registry (ECR) is recommended. Each container image is uniquely tagged (e.g., "Training_v1" or "Inference_v1") to ensure that every new build creates a distinct version without overwriting existing ones.

![The image illustrates the use of Amazon Elastic Container Registry (ECR) for tracking container images, highlighting two images with tags "Training_v1" and "Inference_v1," and explaining their storage and identification features.](https://kodekloud.com/kk-media/image/upload/v1752857792/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/amazon-ecr-container-images-tags.jpg)

## Enhancing Model Management with SageMaker Subservices

One of the standout SageMaker subservices is the **Model Registry**. This tool is critical for managing different versions of production models. Each model version is documented with its parameters, evaluation metrics, and associated artifacts, establishing reproducibility and compliance.

![The image illustrates the SageMaker Model Registry for model versioning, showing how models are organized into groups with versions, including metadata like metrics and parameters. It highlights the registry's role in managing model versions for production.](https://kodekloud.com/kk-media/image/upload/v1752857794/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-model-registry-versioning.jpg)

Another key tool is **Model Cards**, which provide detailed documentation for each model. Model Cards include:

- Intended uses
- Risk assessments
- Training details (data sources, parameter adjustments)
- Evaluation results (accuracy, precision, recall, F1 scores, etc.)

This documentation framework ensures transparency and compliance for risk managers, data scientists, and stakeholders.

![The image is a slide titled "SageMaker Model Cards – Documenting Model Details," highlighting four key areas: Intended Uses, Risk Assessments, Training Details, and Evaluation Results. It emphasizes the importance of these aspects for risk managers, data scientists, and stakeholders to ensure compliance and transparency.](https://kodekloud.com/kk-media/image/upload/v1752857795/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-model-cards-documentation.jpg)

> [!important]
> **Note**
>
> Remember: Detailed documentation through tools like Model Cards is essential for regulatory compliance and understanding model behavior.

In contrast to Model Cards, **SageMaker Lineage Tracking** offers a graphical representation of your entire machine learning workflow. It maps the flow from datasets to container images, training jobs, and processing jobs, making it easier to pinpoint dependencies and modifications during training.

![The image is a diagram illustrating SageMaker Lineage Tracking for machine learning workflows, showing a sequence from datasets to container images, training jobs, and processing jobs.](https://kodekloud.com/kk-media/image/upload/v1752857796/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-lineage-tracking-diagram.jpg)

Lineage Tracking not only visualizes the workflow, but it also allows you to query and identify relationships within the process. This means you can retrieve models by dataset, find datasets linked with specific containers, and understand dependencies—crucial for replicating training processes and ensuring compliance.

![The image is an infographic about SageMaker Lineage Tracking, highlighting its benefits: establishing governance, enabling traceability, and maintaining historical records.](https://kodekloud.com/kk-media/image/upload/v1752857797/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-lineage-tracking-infographic.jpg)

Moreover, the capability to query lineage data enables you to identify all factors—including third-party libraries and custom feature transformations—that influenced a model’s outcomes.

![The image is a diagram titled "SageMaker – Querying Lineage Data," showing four steps: retrieving models by dataset, finding datasets by container, dependency identification, and ensuring reproducibility.](https://kodekloud.com/kk-media/image/upload/v1752857798/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-querying-lineage-data-diagram.jpg)

## Centralizing Data Attributes with Feature Store

Another impressive SageMaker subservice is the **Feature Store**. In this context, a "feature" refers to a specific data attribute rather than a software functionality. Feature Store centralizes and manages reusable machine learning features, facilitating:

- Consistent and controlled access to key data features.
- Ensured data integrity and compliance with lineage tracking.
- Efficient data cataloging and point-in-time queries to validate training or inference conditions.

The table below summarizes the key benefits of SageMaker Feature Store:

| Benefit                     | Description                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| Controlled Access           | Ensures consistent usage of critical data attributes.                      |
| Data Integrity & Compliance | Tracks feature lineage to maintain audit trails and regulatory compliance. |
| Efficient Cataloging        | Simplifies data feature reuse with metadata and versioning controls.       |

![The image is an infographic about SageMaker Feature Store's feature lineage, highlighting its capabilities in tracking data processing, capturing execution code, and ensuring data integrity and compliance.](https://kodekloud.com/kk-media/image/upload/v1752857802/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-feature-store-lineage-infographic.jpg)

![The image is a presentation slide about SageMaker Feature Store, highlighting its role in data cataloging for machine learning. It lists benefits such as storing and cataloging data features, simplifying tracking and reuse with metadata, and ensuring consistency and traceability in feature engineering.](https://kodekloud.com/kk-media/image/upload/v1752857803/notes-assets/images/AWS-Certified-AI-Practitioner-Source-Citation-and-Data-Lineage/sagemaker-feature-store-presentation.jpg)

## Conclusion

In summary, whether you are using Feature Store, Model Cards, Model Registry, or Lineage Tracking, each SageMaker subservice plays a critical role in ensuring that your data and model artifacts are well-documented, reproducible, and compliant with regulations. These capabilities are indispensable for building robust, transparent AI models.

> [!important]
> **Key Takeaway**
>
> Ensuring transparency, version control, and traceability in your machine learning workflows is essential not only for compliance but also for building reliable AI systems.

Thank you for reading this lesson. The concepts discussed here are integral to understanding AI model development's complexities and will support your learning journey. Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-ai-practitioner/module/ec2a70a1-c3fc-4b7a-adef-26ae64d8f107/lesson/156cc2ec-9a13-407c-a858-87f48faee99b)**
>
> Watch video content
