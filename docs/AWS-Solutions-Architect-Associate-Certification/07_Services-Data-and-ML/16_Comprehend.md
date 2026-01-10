# Comprehend - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Comprehend)

---

## Table of Contents

- Comprehend
  - Sentiment Analysis Use Case for Product Reviews
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Comprehend

Welcome back, future Solutions Architects. In this lesson, Michael Forrester introduces Comprehend—a robust text analysis service by AWS that extracts valuable insights from textual data, including emails, documents, and newsletters.

Comprehend analyzes text by:

- Identifying speakers.
- Extracting key phrases (e.g., "Apple", "stocks", dates).
- Recognizing languages.
- Performing sentiment analysis (informative, positive, neutral, or mixed).
- Determining discussion topics (such as politics, sports, or technology).

Additionally, Comprehend offers syntax analysis and, crucial for exam preparation, detects personally identifiable information (PII). If your text contains sensitive data like a credit card number or address, Comprehend pinpoints this information so you can take steps to mask or remove it, ensuring customer data protection.

> [!important]
> **Managed Service Benefits**
>
> Being a fully managed AWS service, Comprehend supports multiple languages and integrates seamlessly with other AWS services in near real time.

![The image lists features of a service, including language detection, sentiment analysis, entity recognition, key phrases extraction, topic modeling, syntax analysis, PII detection, multilingual support, and integration with AWS services.](https://kodekloud.com/kk-media/image/upload/v1752865020/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Comprehend/service-features-language-sentiment-analysis.jpg)

## Sentiment Analysis Use Case for Product Reviews

Consider a scenario where you need to analyze sentiment from customer product reviews. Here’s a high-level workflow:

1.  **Data Upload:** Multiple product reviews are uploaded to an Amazon S3 bucket. Reviews can be stored as individual files or aggregated in a single file.
2.  **Lambda Trigger:** An AWS Lambda function is triggered upon upload, which then calls Comprehend to analyze the sentiment of each review.
3.  **NLP Processing:** Comprehend processes the reviews using natural language processing (NLP) techniques and returns detailed sentiment scores, storing the results back in the S3 bucket.

![The image illustrates a data processing workflow involving Amazon S3, AWS Lambda, and Amazon Comprehend, starting with input data represented by speech bubbles.](https://kodekloud.com/kk-media/image/upload/v1752865021/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Comprehend/data-processing-workflow-aws.jpg)

Once Comprehend has processed the data, you can use Amazon Athena for further analysis. Athena enables you to:

- Aggregate review data.
- Filter results based on specific criteria.
- Prepare data for visualization.

To visualize insights, Amazon QuickSight can be used to display trends, such as comparing positive versus negative review distributions over time or analyzing sentiment differences across product categories.

## Summary

Comprehend is a powerful natural language processing service that handles sentiment analysis, entity recognition, keyword extraction, topic modeling, and PII detection. Its capability to integrate with a suite of AWS services makes it particularly effective for real-world applications like product review analysis.

If you have any questions, feel free to reach out on Slack. Otherwise, we'll see you in the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/e898c2a7-633e-4c65-84af-3555d8e2995c)**
>
> Watch video content
