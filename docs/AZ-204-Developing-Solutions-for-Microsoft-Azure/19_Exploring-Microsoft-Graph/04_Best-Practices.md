# Best Practices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-Microsoft-Graph/Best-Practices)

---

## Table of Contents

- Best Practices
  - Starting with Authentication
  - Handling Responses Effectively
  - Consent and Authorization
  - Storing Data Locally
  - Working with Microsoft Graph Explorer
  - Watch Video
    - Pagination
    - Evolvable Enumerations
    - Principle of Least Privilege
    - Correct Permission Types
    - User and Admin Experience

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring Microsoft Graph

# Best Practices

When developing applications that interact with Microsoft Graph, it is crucial to implement best practices that ensure your solution is secure, efficient, and scalable. The key focus areas include authentication, response handling, consent and authorization, and secure local data management.

## Starting with Authentication

A fundamental aspect of working with Microsoft Graph is using a bearer token in the authorization request header. This token authenticates every API request to Microsoft Graph. In previous lessons, you learned how to generate a device code for user login, which subsequently created the token required for API calls.

When using the Microsoft Authentication Library (MSAL), ensure you initialize the Graph Client accurately. This creates a secure connection and optimizes your API interactions.

## Handling Responses Effectively

### Pagination

When dealing with large datasets, Microsoft Graph returns results in a paginated format. It is essential to handle these paginated responses correctly to avoid missing any data.

### Evolvable Enumerations

Microsoft Graph evolves continuously, and API enumerations may change over time. Design your application to accommodate these changes gracefully, ensuring future compatibility with new enumerations and API updates.

## Consent and Authorization

### Principle of Least Privilege

Always follow the principle of least privilege by granting your application only the minimal permissions needed to perform its tasks. This minimizes exposure and improves overall security.

### Correct Permission Types

Different scenarios may require distinct permission types:

- Use **delegated permissions** when the application acts on behalf of a user.
- Use **application permissions** for background processes or operations that do not involve a user.

Ensure you request the appropriate permissions for each operation—some actions might require read permissions, while others need write permissions.

### User and Admin Experience

Streamline the consent process for both end users and administrators. A user-friendly consent prompt enhances the overall experience, while robust security measures maintain trust and protect sensitive data.

> [!important]
> **Tip**
>
> For more detailed guidance on permission types and best practices, review the [Microsoft Graph permissions guide](https://learn.microsoft.com/graph/permissions-reference).

## Storing Data Locally

![The image outlines best practices for using Microsoft Graph, focusing on authentication, handling responses, consent and authorization, and storing data locally.](https://kodekloud.com/kk-media/image/upload/v1752866540/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Best-Practices/microsoft-graph-best-practices.jpg)

Local data storage should be minimized and used only when necessary. When caching or persisting data locally, implement secure data retention and deletion policies to handle sensitive information in compliance with industry standards and best practices.

Following these best practices will help you build a robust, scalable, and secure application that leverages Microsoft Graph effectively.

## Working with Microsoft Graph Explorer

Microsoft Graph Explorer is a powerful tool that simplifies data querying and testing API calls. It enables you to filter data and select specific fields for a streamlined experience.

In Microsoft Graph Explorer:

- Sign in to your tenant to interact with your dataset or use a sample tenant such as the KodeKloud tenant.
- Run queries to retrieve data, such as your user profile details.

For instance, running a query to retrieve your profile may return a JSON response similar to the following:

```
{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/entity",
    "@microsoft.graph.tips": "This request only returns a subset of the resource's properties. Your app will need to use $select to return non-default properties. To find out what properties are available for this resource see https://learn.microsoft.com/graph/api/resources/user",
    "businessPhones": [],
    "displayName": "Rithin Skaria GA",
    "givenName": null,
    "jobTitle": null,
    "mail": null,
    "mobilePhone": null,
    "officeLocation": null,
    "preferredLanguage": null,
    "surname": null,
    "userPrincipalName": "rithinskaria@kodekloudlab.onmicrosoft.com",
    "id": "da464928-1789-44b7-b476-9c72db363b9"
}
```

To filter the results and include only specific fields (for example, the user principal name), use the `$select` query parameter. This method retrieves only the desired property, reducing overhead and response size.

Next, navigate to the "Resources" section in Microsoft Graph Explorer and select "Users." You can apply the `$filter` parameter to search for a particular user. For example, setting a filter condition on the user principal name allows you to narrow down results. Additionally, you can utilize parameters such as `$top` to limit the number of records returned, and combine filters, ordering, selection, expansion, and count operations as needed.

![The image shows the Microsoft Graph Explorer interface with a query to retrieve user data. The response preview displays JSON data for users, including fields like displayName and userPrincipalName.](https://kodekloud.com/kk-media/image/upload/v1752866542/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Best-Practices/microsoft-graph-explorer-user-data-json.jpg)

By using Microsoft Graph Explorer effectively, you can optimize your queries and handle data retrieval for your application with ease.

> [!important]
> **Explore Further**
>
> Learn additional techniques and advanced query options by visiting the [Microsoft Graph Documentation](https://learn.microsoft.com/graph/overview).

Adopting these practices and tools will enhance your interaction with Microsoft Graph, ensuring your application remains secure, performant, and adaptable to future changes. This concludes our module on Microsoft Graph best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/e10b0468-d089-42c7-85af-bae4774dc00c/lesson/30f7f1e3-62f9-456a-935b-70c82a33dfe8)**
>
> Watch video content
