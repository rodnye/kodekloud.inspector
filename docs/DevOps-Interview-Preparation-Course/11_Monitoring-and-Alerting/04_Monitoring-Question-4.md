# Monitoring Question 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Monitoring-and-Alerting/Monitoring-Question-4)

---

## Table of Contents

- Monitoring Question 4
  - Popular Dashboarding Tools & Their Use Cases
  - Crafting Your Answer
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Monitoring and Alerting

# Monitoring Question 4

This question is designed to understand the dashboarding tool you use to present monitoring metrics in your project. The focus is on how you display data—whether to end users, developers, or internal teams. While monitoring often encompasses a variety of tools and techniques, this question zeroes in on the dashboard aspect of your observability strategy.

## Popular Dashboarding Tools & Their Use Cases

Different environments may call for specific dashboarding tools. Here are some commonly employed options:

- **Kubernetes Environments**:  
  In projects based on Kubernetes, [Grafana](https://grafana.com/) is frequently used. Grafana offers dynamic visualizations that make it easy to monitor real-time performance metrics.
- **AWS-Powered Projects**:  
  For projects hosted on AWS—such as a three-tier web application utilizing EC2 Auto Scaling groups and databases—[AWS CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch) is often the tool of choice. Its deep integration with AWS services provides seamless monitoring.
- **On-Premises Environments**:  
  When neither Kubernetes nor AWS is utilized, the ELK stack emerges as a robust solution. Here, Kibana serves as the dashboard tool, turning logs into actionable visual insights.

Below is a diagram summarizing these dashboarding options across different environments:

![The image is a handwritten note about monitoring tools, mentioning Grafana, Cloudwatch, and ELK for different environments like Kubernetes, AWS, and on-premises.](https://kodekloud.com/kk-media/image/upload/v1752873393/notes-assets/images/DevOps-Interview-Preparation-Course-Monitoring-Question-4/monitoring-tools-grafana-cloudwatch-elk.jpg)

## Crafting Your Answer

When responding to this inquiry, you might say:

> "As a DevOps engineer, I understand that effective monitoring and dashboarding are key to maintaining observability. In our Kubernetes-based projects, we rely on Grafana to present essential performance metrics to developers, testers, and operations teams. For environments hosted on AWS, I prefer [AWS CloudWatch](https://learn.kodekloud.com/user/courses/aws-cloudwatch) due to its tight integration with AWS services and ease of use. In cases where neither Kubernetes nor AWS is applicable, I would implement an ELK stack, which leverages Kibana for efficient metric visualization."

> [!important]
> **Note**
>
> If you are less familiar with the ELK stack, it is perfectly acceptable to focus on Grafana and AWS CloudWatch—both are widely recognized as leading tools in the industry.

## Conclusion

This lesson aims to clarify how to approach questions regarding dashboarding in a monitoring setup. Whether you are using Grafana in Kubernetes projects, AWS CloudWatch in AWS environments, or the ELK stack for on-premises needs, a clear explanation of your chosen tool and its benefits will strengthen your response.

Thank you, and see you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/e9c0a8fa-ed69-494c-9d95-c5e3eb5ecfde/lesson/3a0f6a7a-569b-425f-acaa-9629ed0f8ae1)**
>
> Watch video content
