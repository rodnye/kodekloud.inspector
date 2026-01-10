# SQS Settings demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Application-Integrations/SQS-Settings-demo)

---

## Table of Contents

- SQS Settings demo
  - Message Retention and Visibility Timeout
  - Delivery Delay
  - Receive Message Wait Time
  - Conclusion
  - Watch Video
    - Demonstrating the Visibility Timeout

---

## Content

AWS Certified Developer - Associate

Application Integrations

# SQS Settings demo

In this lesson, we explore various configuration options available for an Amazon SQS queue and examine their impact on queue behavior. Continuing from our previous demo where we created a "newUser" queue, we'll now customize its settings by clicking the Edit button. The key settings discussed here include:

- Message Retention Period
- Visibility Timeout
- Delivery Delay
- Receive Message Wait Time

---

## Message Retention and Visibility Timeout

The message retention period determines how long a message remains in the queue before it is automatically deleted. Amazon SQS allows message retention for up to 14 days. In our current configuration, messages are stored for four days by default.

The visibility timeout, on the other hand, defines the duration a consumer has to process and delete a message after retrieving it. For example, a visibility timeout of 30 seconds means that once a consumer fetches a message, it must process and delete the message within that period. If not deleted, the message reappears in the queue and might be processed again by the same or a different consumer. Adjust the timeout based on your application’s processing time; for instance, you might extend it to 60 seconds if processing takes closer to one minute.

Before diving into the demonstration, we reset the visibility timeout to 30 seconds.

![The image shows the Amazon SQS (Simple Queue Service) interface where a user is editing the configuration settings for a queue named "newUser," including visibility timeout, message retention period, and encryption options.](https://kodekloud.com/kk-media/image/upload/v1752858426/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings-demo/amazon-sqs-queue-configuration.jpg)

---

### Demonstrating the Visibility Timeout

1.  **Simulated Concurrent Processing:**  
    Open the Send and Receive Messages page in two separate browser tabs. These tabs simulate two applications polling the SQS queue simultaneously.
2.  **Message Dispatching:**  
    Send a test message to the queue. With the message in the queue, use the first tab to poll for messages.
3.  **Visibility Timeout in Action:**  
    Once the first tab retrieves the message, the 30-second visibility window begins. During this interval, the message remains hidden from the second tab.
4.  **Reappearance and Retry:**  
    If the message is not deleted within 30 seconds, it becomes visible in the queue again and is available for processing by the second tab (or another consumer). The interface also displays a "receive count," incrementing each time the message is processed due to timeouts.

After verifying the behavior, ensure you delete the message to confirm that the queue is empty.

![The image shows the Amazon SQS (Simple Queue Service) interface where a message has been sent and is ready to be received. It includes options for sending and receiving messages, with details about message attributes and polling settings.](https://kodekloud.com/kk-media/image/upload/v1752858429/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings-demo/amazon-sqs-message-interface.jpg)

> [!important]
> **Note**
>
> When testing visibility timeout, ensure that your processing logic efficiently deletes messages to prevent duplicate processing.

---

## Delivery Delay

Delivery delay allows you to postpone the visibility of messages for a defined period after they are sent. When a delivery delay is set at the queue level, every message sent becomes visible only after the specified delay. For example, a 10-second delivery delay means that messages are only available for consumption 10 seconds after being sent. Note that this setting can be overridden on a per-message basis.

To demonstrate the delivery delay:

1.  Open the Send and Receive Messages page.
2.  Send a message with a custom delivery delay. For instance, set a 20-second delay with the message body "hey this is a delayed message."
3.  Immediately poll for messages. The message will not appear until 20 seconds have elapsed.

![The image shows an AWS SQS console interface for sending and receiving messages, with a message body and delivery delay settings. The message "hey this is a delayed message" is set with a 20-second delay.](https://kodekloud.com/kk-media/image/upload/v1752858430/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings-demo/aws-sqs-console-message-delay.jpg)

After waiting 20 seconds, the delayed message becomes visible, confirming the functionality of the delivery delay.

![The image shows an AWS SQS console where a delayed message is being sent with a 20-second delivery delay. It also displays the message receiving section with polling settings and message details.](https://kodekloud.com/kk-media/image/upload/v1752858431/notes-assets/images/AWS-Certified-Developer-Associate-SQS-Settings-demo/aws-sqs-delayed-message-console.jpg)

> [!important]
> **Note**
>
> Delivery delays can be useful for time-sensitive workflows that need postponed processing or for handling burst traffic patterns.

---

## Receive Message Wait Time

The receive message wait time setting enables long polling for your SQS queue. Instead of repeatedly polling and immediately proceeding when no messages are available, this setting instructs the consumer to wait for a specified duration (e.g., 10 or 20 seconds) for a message to arrive before returning. This approach reduces the cost associated with continuous polling by minimizing empty responses.

---

## Conclusion

In summary, this lesson has covered several important SQS configuration options:

- **Message Retention Period:** Retains messages for up to 14 days.
- **Visibility Timeout:** Controls the time a consumer has to process a message.
- **Delivery Delay:** Postpones message visibility for a specified delay.
- **Receive Message Wait Time:** Enables long polling to efficiently manage message retrieval.

Fine-tuning these settings can significantly enhance the performance and reliability of your SQS queues. We hope you found this guide informative and that it deepens your understanding of configuring Amazon SQS for optimal results.

For further information, consider visiting the [Amazon SQS Documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html).

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/60c267ab-da8b-4408-97f4-b53aad3f4479/lesson/df9610d3-68a3-4c01-9606-1ee264cf1e38)**
>
> Watch video content
