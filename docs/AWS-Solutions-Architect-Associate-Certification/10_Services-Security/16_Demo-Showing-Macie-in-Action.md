# Demo Showing Macie in Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Demo-Showing-Macie-in-Action)

---

## Table of Contents

- Demo Showing Macie in Action
  - Step 1: Enable AWS Macie
  - Step 2: Generate Test Data

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Demo Showing Macie in Action

---

language: en

---

In this lesson, we will demonstrate how to work with AWS Macie to identify sensitive data in your S3 buckets. AWS Macie is a powerful security service that uses machine learning to recognize personally identifiable information (PII) and other sensitive data types. Follow along as we walk through the process step-by-step.

## Step 1: Enable AWS Macie

Begin by signing in to the AWS Management Console and searching for "Macie" in the search window. Select "Get Started" to enable AWS Macie.  
Click on **Enable Macie** to activate its functionality. Once enabled, you can configure Macie to scan your S3 buckets for sensitive data.

## Step 2: Generate Test Data

To verify that Macie correctly identifies sensitive data, we will generate some test files. In this demo, we have three example files:

1.  **addresses.txt**  
    This file contains dummy addresses from the United States. Each address represents personal information that ideally should not be stored in an S3 bucket.  
    ![The image shows a text editor displaying a list of addresses in a file named "addresses.txt." The addresses are formatted with street names, cities, states, and ZIP codes.](https://kodekloud.com/kk-media/image/upload/v1752865781/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/addresses-txt-list-editor.jpg)
2.  **credit_cards.txt**  
    This file includes a list of credit card details with card numbers, expiration dates, and verification numbers. Below is a sample of the content:

1 VISA, 4916245657687972, 7/2030, 352 2 VISA, 4556276704904925, 6/2024, 616 3 VISA, 4929642655495499, 11/2029, 288 4 VISA, 4024007142950408, 8/2027, 897 5 VISA, 4716370077620671, 3/2025, 876 6 VISA, 4533220187054539, 9/2026, 102 7 VISA, 4539956991960712, 10/2030, 930 8 VISA, 4929085085149061, 6/2028, 674 9 VISA, 4532470873521771, 10/2027, 929 10 VISA, 4024007128445607, 10/2023, 732 11 VISA, 4485583681960705, 12/2025, 672

```


3. **random-text.txt**
This file contains random text that does not include any sensitive information. It is used to validate that Macie does not flag non-sensitive data.


The expectation is that AWS Macie will flag the sensitive information in **addresses.txt** and **credit_cards.txt**.


## Step 3: Upload Files to an S3 Bucket


Create an S3 bucket to store these files. For this demonstration, we already have a bucket named **Macie - KodeKloud**. Upload the three files into this bucket.


## Step 4: Create and Configure a Macie Job


Return to the Macie console and navigate to the **Jobs** section, then click on **Create job**.
![The image shows the Amazon Macie dashboard with a list of jobs, including their names, resources, job types, statuses, and creation times. A warning message at the top indicates that a repository for sensitive data discovery results needs to be configured.](https://kodekloud.com/kk-media/image/upload/v1752865782/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-dashboard-jobs-list.jpg)


From the list of S3 buckets, select your bucket (KodeKloud) to create a job that scans the entire bucket and provides an estimated cost.
![The image shows an Amazon Macie interface where a user is selecting S3 buckets for analysis. It includes details about a specific bucket named "macie-kodekloud" with its account ID, region, and other metadata.](https://kodekloud.com/kk-media/image/upload/v1752865783/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-s3-bucket-selection.jpg)


After selecting the bucket, click **Next**. At this point, you can choose whether to schedule the scan or run a one-time scan. For this demo, we will run a one-time scan.
![The image shows an Amazon Macie interface for creating a job to refine the scope of sensitive data discovery, with options for scheduling and sampling depth.](https://kodekloud.com/kk-media/image/upload/v1752865785/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-sensitive-data-job.jpg)
,[object Object],


Click **Next** to proceed to the managed data identifier options. AWS Macie provides pre-built rules for detecting common sensitive data types such as social security numbers, credit card information, addresses, etc.
![The image shows an Amazon Macie interface where sensitive data types and categories are listed, such as personal information and credentials.](https://kodekloud.com/kk-media/image/upload/v1752865786/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-sensitive-data-interface.jpg)


For this demo, select the following two identifiers:
- **ADDRESS**
- **CREDIT_CARD_NUMBER**


You can select additional identifiers based on your security requirements.
![The image shows an Amazon Macie interface where specific managed data identifiers are being selected, including "ADDRESS" and "CREDIT_CARD_NUMBER," categorized under personal and financial information.](https://kodekloud.com/kk-media/image/upload/v1752865787/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-managed-identifiers-selection.jpg)


Click **Next** to continue. If you wish to define custom data identifiers (using regular expressions), you can do so on the next screen; however, we will skip this step for now and click **Next**.


On the subsequent page, you have the option to add text patterns for Macie to ignore. Once you have reviewed those settings, click **Next**. Then, give your job a name—in this demo, we use **Macie test job**. Click **Next** to review your configuration, and then click **Submit** to initiate the job.


## Step 5: Monitor the Job and Review Findings


After submitting the job, AWS Macie begins scanning the designated S3 bucket. The job may take between 10 to 20 minutes to complete. Refresh the Macie console to check for a status update indicating the job has completed.
![The image shows the Amazon Macie console with a list of jobs for analyzing sensitive data in S3 buckets. A notification indicates that a job was successfully created, but a repository for sensitive data discovery results needs configuration.](https://kodekloud.com/kk-media/image/upload/v1752865788/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-console-s3-jobs.jpg)


Once complete, click on **Show findings** to view the detected sensitive data. A new tab will open displaying detailed findings, including severity levels (high or medium) for each piece of sensitive data.


For example, selecting the first finding reveals details for an S3 object labeled "financial" from the **credit_cards.txt** file, showing that 11 credit card numbers were detected along with specific metadata regarding the resource.


![The image shows an Amazon Macie dashboard with findings related to sensitive data discovery, highlighting high and medium risk levels for financial and personal data in S3 buckets. A warning at the top indicates a repository configuration is needed for sensitive data discovery results.](https://kodekloud.com/kk-media/image/upload/v1752865790/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-dashboard-sensitive-data.jpg)


Scrolling down will reveal findings corresponding to the **addresses.txt** file, which in this demo include four identified addresses.
![The image shows an Amazon Macie dashboard displaying findings related to sensitive data discovery. It lists two findings with different severity levels, indicating the presence of sensitive information in S3 objects.](https://kodekloud.com/kk-media/image/upload/v1752865791/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Demo-Showing-Macie-in-Action/amazon-macie-dashboard-sensitive-data-2.jpg)
,[object Object],


## Conclusion


This demonstration showcased how AWS Macie scans your S3 buckets—using either one-time or scheduled jobs—to identify and report sensitive data. By following these steps, you can quickly set up Macie to help safeguard your data storage and ensure compliance with data privacy standards.


Thank you for following this lesson. We look forward to seeing you in the next article.


---


For more details on securing your data environment, be sure to check out the following resources:
- [AWS Macie Documentation](https://docs.aws.amazon.com/macie/latest/userguide/what-is-macie.html)
- [Sensitive Data Discovery with AWS](https://aws.amazon.com/macie/sensitive-data/)


Happy Securing!
,[object Object],
```
