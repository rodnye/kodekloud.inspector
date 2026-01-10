# Configure dynamic data masking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Configure-dynamic-data-masking)

---

## Table of Contents

- Configure dynamic data masking
  - Real-World Analogy
  - What Is Dynamic Data Masking?
  - Configuring Dynamic Data Masking in the Azure Portal
  - Verifying the Masked Data
  - Configuring User Access with T-SQL
  - Conclusion
  - Additional Resources
  - Watch Video
    - Key Features of Dynamic Data Masking

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Configure dynamic data masking

Dynamic Data Masking (DDM) is a security feature in Azure SQL that conceals sensitive information in query results, reducing the risk of exposing confidential data to unauthorized users. In this lesson, we explain what dynamic data masking is, its benefits, and how to configure it in Azure SQL.

## Real-World Analogy

Imagine calling your bank where the customer service agent requests the last four digits of your credit card number, debit card number, Social Security number, or another identification number. Although this step verifies your identity, you wouldn’t want the agent to have full access to your sensitive data. To mitigate this risk, banks and other organizations apply data masking. The agent sees only a portion of the number—typically the last four digits—which is sufficient for verification but prevents misuse of complete data.

## What Is Dynamic Data Masking?

Dynamic data masking protects sensitive data by replacing it with obfuscated values during query execution. Consider a database with a schema named CX that includes a table called Customer with columns like Name, SSN, and Phone Number. If you decide to mask the SSN column, any query retrieving that column will display masked content (such as random characters or a predefined format) instead of the actual SSN. This masking is applied in real time so that unauthorized users never see the unmasked data.

### Key Features of Dynamic Data Masking

- **Real-time Masking:** Data is masked instantly at query time, ensuring that sensitive information is never fully exposed.
- **Customizable Masks:** Define specific mask rules based on data sensitivity. Azure SQL offers built-in options for email addresses, credit card numbers, and zip codes, and you can also create custom masking patterns.
- **Predefined Masking Patterns:** Azure SQL provides ready-to-use masks for common sensitive data types.
- **Role-based Access:** Only users with appropriate permissions can view unmasked data.
- **Compliance Support:** Masking aids in meeting data protection regulations by ensuring that only authorized information is visible to application users.

## Configuring Dynamic Data Masking in the Azure Portal

You can easily add a masking rule to a specific column in your SQL database via the Azure Portal. For example, to mask customer email addresses:

1.  Navigate to your database and scroll down to the Dynamic Data Masking section.
2.  Select the Customer table and choose the column to mask (for example, Email Address).
3.  Choose the "Email" option from the available masking formats.

![The image shows a Microsoft Azure interface for adding a masking rule to a SQL database, specifically for masking email addresses in the "Customer" table of the "SalesLT" schema. Various masking field format options are available, such as default value and email format.](https://kodekloud.com/kk-media/image/upload/v1752881768/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-dynamic-data-masking/azure-sql-masking-rule-email.jpg)

Once the mask is applied, running a query will display masked data (such as the email address) for users lacking elevated privileges.

![The image shows a Microsoft Azure portal interface for configuring Dynamic Data Masking on a SQL database, with a masking rule applied to the "EmailAddress" column in the "Customer" table.](https://kodekloud.com/kk-media/image/upload/v1752881769/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-dynamic-data-masking/azure-dynamic-data-masking-sql.jpg)

> [!important]
> **Note**
>
> After adding the mask rule, when you query the database, masked data is returned for non-administrative users. However, administrators who have higher privileges will see unmasked information.

## Verifying the Masked Data

When you execute queries against the table, non-administrative users will receive masked data. For instance, if you run the following query as an administrator, you will see complete data:

```
SELECT TOP (1000)
      [CustomerID],
      [NameStyle],
      [Title],
      [FirstName],
      [MiddleName],
      [LastName],
      [Suffix],
      [CompanyName],
      [SalesPerson],
      [EmailAddress],
      [Phone],
      [PasswordHash],
      [PasswordSalt],
      [rowguid],
      [ModifiedDate]
FROM [SalesLT].[Customer]
```

In contrast, users with restricted privileges will see masked email addresses in place of the full details.

## Configuring User Access with T-SQL

To control who can see the unmasked data, you need to configure user logins and assign proper permissions using SQL Server Management Studio (SSMS). It is important to note that both the login and user must be created on the master database.

Follow these steps to configure user access:

1.  Open SSMS, click on Connect → Database Engine, and connect using the server name provided from the Azure Portal.
2.  If the user does not exist, create the login and the associated user from an external provider.

Execute the following T-SQL commands to create the login and user:

```
CREATE LOGIN "a.davis@kodekcloudlab.onmicrosoft.com" FROM EXTERNAL PROVIDER;
CREATE USER "a.davis@kodekcloudlab.onmicrosoft.com" FROM EXTERNAL PROVIDER;
```

After running these commands, reconnect with your configured account, navigate to the target database, and select the Customer table to verify that the EmailAddress column displays masked values for non-administrative users.

## Conclusion

Dynamic Data Masking in Azure SQL is an effective method for safeguarding sensitive data by displaying only masked values to unauthorized users. It offers real-time masking, customizable patterns, and role-based access control, all of which support compliance with data protection regulations. Whether configured via the Azure Portal or using T-SQL, dynamic data masking helps ensure that sensitive information remains secure.

This concludes our discussion on dynamic data masking. For further security, consider implementing Transparent Data Encryption (TDE) to protect your data at rest.

## Additional Resources

- [Azure SQL Database Documentation](https://learn.microsoft.com/en-us/azure/azure-sql/)
- [Understanding Dynamic Data Masking](https://learn.microsoft.com/en-us/azure/azure-sql/database/dynamic-data-masking-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/52ea71ec-7533-4e9c-b83c-78966f2237cd)**
>
> Watch video content
