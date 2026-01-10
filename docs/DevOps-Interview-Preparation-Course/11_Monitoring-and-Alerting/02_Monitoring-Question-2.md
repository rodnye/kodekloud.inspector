# Monitoring Question 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Monitoring-and-Alerting/Monitoring-Question-2)

---

## Table of Contents

- Monitoring Question 2
  - Overview
  - Monitoring Strategy
  - Implementation Overview
  - Conclusion
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Monitoring and Alerting

# Monitoring Question 2

Your development team needs an effective way to monitor an API endpoint and determine which HTTP responses should trigger an alert. This guide provides a technology-agnostic approach that highlights key concepts applicable across various monitoring tools.

## Overview

When troubleshooting an HTTP endpoint, your primary task is to interpret the API's response to a GET request. Every API endpoint—whether it is called `/status`, `/home`, or another path—performs a designated function and returns an HTTP response code. Think of it like making a phone call: you either receive an immediate answer, a busy signal, or are directed to voicemail. In the same way, an API endpoint communicates the outcome of a request through response codes.

HTTP response codes are divided into distinct categories:

- **200 to 299:** Successful responses.
- **300 to 399:** Redirection responses.
- **400 to 499:** Client error responses.
- **500 to 599:** Server error responses.

## Monitoring Strategy

A monitoring script or service will periodically send GET requests to the API endpoint and evaluate the HTTP response code. It is crucial to focus on responses in the 400 or 500 range, as these indicate client-side or server-side issues respectively. When such errors are detected, an alert must be triggered to ensure a prompt response.

> [!important]
> **Tip**
>
> For a real-time scenario, consider implementing your monitoring solution with lightweight scripts in languages like Python or Bash. This can enable quick response and easy integration with various alerting platforms.

## Implementation Overview

To address this interview question, you can explain that your monitoring solution will perform the following steps:

1.  **Send a GET Request:** Access the API endpoint to retrieve its current status.
2.  **Check the HTTP Response Code:** Classify the response based on standard HTTP codes.
3.  **Trigger Alerts:** If the response code falls within the 400–499 (client error) or 500–599 (server error) ranges, generate an alert for further investigation.

Below is a diagram that visually explains the process, including the categorization of HTTP response codes and the triggering of alerts when a response code in the 400 or 500 range is encountered.

![The image is a diagram explaining API endpoints and HTTP response codes, highlighting different response categories and the triggering of alerts for 400 or 500 range codes.](https://kodekloud.com/kk-media/image/upload/v1752873392/notes-assets/images/DevOps-Interview-Preparation-Course-Monitoring-Question-2/api-endpoints-http-response-diagram.jpg)

> [!important]
> **Important**
>
> Do not delve into in-depth coding details unless specifically asked during the interview. Focus on explaining the overall strategy and reasoning behind monitoring HTTP response codes.

## Conclusion

This lesson provided an overview of how to monitor API endpoints by sending GET requests and evaluating HTTP response codes. Emphasize in your interview that:

- A GET request is used to check the API endpoint.
- The returned HTTP response code determines the API's status.
- Alerts are triggered if the response indicates a client error (400–499) or a server error (500–599).

This high-level understanding demonstrates practical experience with monitoring and troubleshooting API endpoints without the need for extensive technical coding details.

Thank you for reviewing this lesson on monitoring API endpoints. We will continue with further topics shortly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/e9c0a8fa-ed69-494c-9d95-c5e3eb5ecfde/lesson/9c302595-9cdc-4038-bcdc-f5b7e847a625)**
>
> Watch video content
