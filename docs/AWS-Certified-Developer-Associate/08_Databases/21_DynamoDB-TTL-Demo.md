# DynamoDB TTL Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Databases/DynamoDB-TTL-Demo)

---

## Table of Contents

- DynamoDB TTL Demo
  - Table Creation and Session Data
  - Enabling TTL on the DynamoDB Table
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Databases

# DynamoDB TTL Demo

In this article, we demonstrate how to use Time to Live (TTL) in a DynamoDB table with a real-world scenario. Consider a table that stores users' login statuses. Typically, when a user logs into an application, a session is created to indicate whether the user is logged in or logged out. These sessions are maintained for a specific duration (minutes, hours, or days) as required by the application—for example, a session that expires four hours after login.

## Table Creation and Session Data

Begin by creating a table named "login sessions." In this table, each time a user logs in, a new session entry is generated with a unique ID as the partition key. There is no need for a sort key in this context, and we will disable auto scaling by setting lower provisioned capacity units for a more controlled setup.

![The image shows a screenshot of the AWS DynamoDB console, specifically the "Create table" page, where a user is entering details like table name, partition key, and sort key.](https://kodekloud.com/kk-media/image/upload/v1752858808/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-create-table-screenshot.jpg)

After creating the table, insert dummy data to simulate active sessions. Each session entry should include the following details:

- A unique session ID.
- A user attribute (email, username, or user ID—in our case, "user1@gmail.com").
- Optional additional data such as the IP address or device type from which the user logged in.
- An expiration attribute that defines when the session should terminate.

For the TTL attribute, add a property (for example, "expires") of type Number. This attribute will hold an epoch timestamp indicating when the session expires.

![The image shows a screenshot of the AWS DynamoDB console, specifically the "Read/write capacity settings" section, where the user can choose between "Provisioned" and "On-demand" capacity modes and set read and write capacity units.](https://kodekloud.com/kk-media/image/upload/v1752858809/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-read-write-capacity-settings.jpg)

Once capacity is configured, create a session entry with attributes such as:

- ID: 1
- User: user1@gmail.com
- IP Address: \[the user's IP address\]
- Expires: \[epoch timestamp representing the session expiration time\]

![The image shows an AWS DynamoDB console interface, displaying details of a table named "loginSessions" with options for managing and viewing table information.](https://kodekloud.com/kk-media/image/upload/v1752858810/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-console-loginsessions.jpg)

Remember to provide the expiration time as an epoch timestamp rather than a human-readable date. For instance, to set a one-hour expiration, use a conversion tool like [EpochConverter](https://www.epochconverter.com) to generate the correct timestamp.

![The image shows a webpage from EpochConverter, a tool for converting epoch and Unix timestamps to human-readable dates. It includes input fields for date conversion and displays the converted date and time, along with some advertisements.](https://kodekloud.com/kk-media/image/upload/v1752858812/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/epochconverter-timestamp-conversion-webpage.jpg)

After converting the desired future time, copy the epoch timestamp and assign it as the value of the "expires" attribute in your session entry. This ensures that the TTL property is properly set for automatic deletion once the session has expired.

![The image shows an AWS DynamoDB interface where a user is creating an item with attributes such as "id," "user," "ip," and "expiresAt."](https://kodekloud.com/kk-media/image/upload/v1752858813/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-create-item-attributes.jpg)

## Enabling TTL on the DynamoDB Table

Next, enable TTL on your "login sessions" table by following these steps:

1.  Navigate to the "login sessions" table in the AWS DynamoDB console.
2.  Go to the "Additional settings" section.
3.  Select the "Time to Live" option.
4.  Enter the TTL attribute name (e.g., "expires" or "expiresAt") that the table will use to determine when an item should expire.
5.  Use the preview functionality to simulate expiration. For example, if you set the expiration to one hour in the future and refresh the current timestamp, no items should be eligible for deletion at that moment.

![The image shows an AWS DynamoDB interface for configuring the "Time to Live" (TTL) settings, including fields for TTL attribute name and a preview section for simulating expiration.](https://kodekloud.com/kk-media/image/upload/v1752858814/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-ttl-settings-interface.jpg)

> [!important]
> **Simulation Tip**
>
> To observe TTL in action, simulate a future time (e.g., two hours ahead). DynamoDB will indicate that items with expired TTL values are ready for deletion. Once you are satisfied with the preview, activate TTL.

![The image shows an AWS DynamoDB console with a table named "loginSessions" selected, displaying a single item with details such as ID, expiration time, IP address, and user email.](https://kodekloud.com/kk-media/image/upload/v1752858816/notes-assets/images/AWS-Certified-Developer-Associate-DynamoDB-TTL-Demo/aws-dynamodb-console-loginsessions-2.jpg)

## Conclusion

By following the steps outlined above, you have successfully configured TTL for your DynamoDB table. This feature automates session management by automatically deleting expired items, ensuring that your table remains efficient and performant. The key steps include:

- Defining an expiration attribute using an epoch timestamp.
- Enabling TTL in the DynamoDB console settings.
- Verifying the TTL behavior with the preview functionality.

This approach guarantees that session entries are removed after the designated expiration time, keeping your database streamlined and up-to-date.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/a1267c00-fc48-4a9b-8d41-fd642fa743ea/lesson/b46b8293-93f8-4c03-ac54-b3ffe9e65cbb)**
>
> Watch video content
