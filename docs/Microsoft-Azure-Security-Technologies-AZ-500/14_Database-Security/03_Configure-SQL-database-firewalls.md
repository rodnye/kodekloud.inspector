# Configure SQL database firewalls - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Configure-SQL-database-firewalls)

---

## Table of Contents

- Configure SQL database firewalls
  - Types of Firewall Rules
  - How Connection Requests Are Processed
  - Configuring Firewall Rules in Azure Portal
  - Verifying Connectivity
  - Configuring Database-Level Firewall Rules
  - Next Steps
  - Watch Video

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Configure SQL database firewalls

Configuring firewall rules for Azure SQL Database adds a crucial layer of security by controlling access based on specific IP addresses and network ranges. By default, all incoming connections to Azure SQL Database are denied, even for administrators, until an appropriate firewall rule is set up.

## Types of Firewall Rules

There are two primary types of firewall rules in Azure SQL Database:

- **Server-level firewall rules**  
  These rules are applicable across all databases hosted on the same SQL Server. They can be configured via the Azure portal, T-SQL, or PowerShell.
- **Database-level firewall rules**  
  These rules are specific to an individual database and must be configured using T-SQL within the context of that database.

## How Connection Requests Are Processed

Consider a scenario where a SQL Server hosts four databases with both server-level and database-level firewall rules configured. When a client attempts to connect, the following steps occur:

1.  **Database-Level Rule Check**  
    Azure first evaluates whether the client's IP address matches any database-specific firewall rule.
    - If there is a match, access is granted solely to that database.
2.  **Server-Level Rule Check**  
    If no matching database rule is found, Azure then checks for a corresponding server-level rule.
    - A matching server-level rule allows the connection and grants access to any database on the server.
3.  **Access Denial**  
    If the client's IP address does not match any rule at either level, the connection is rejected to ensure unauthorized users cannot access the data.

> [!important]
> **Security Tip**
>
> Using both server- and database-level firewall rules allows organizations to balance between accessibility and strict security controls, ensuring only authorized clients have access.

## Configuring Firewall Rules in Azure Portal

In the Azure portal, you can configure firewall rules for your SQL Database in two ways:

- **Directly from the current blade:**  
  Add a new firewall rule without leaving the current configuration page.
- **Using the Server Firewall option:**  
  Navigate to the Overview blade and select "Server Firewall" to manage firewall settings.

On the Server Firewall configuration page, enter your IPv4 address or specify a range by defining the start IP and end IP. Once you click **Save**, the firewall rules are updated. Additionally, you can integrate virtual networks and configure private endpoint connections for enhanced control over database connectivity.

## Verifying Connectivity

After configuring the firewall, return to the database's Query Editor. After selecting "Continue as \[your user account\]," the database will display sample data across various tables. To verify connectivity, run the sample query below:

```
select * from [SalesLT].[Customer]
```

This query demonstrates how server-level firewall rules allow access and return data from the specified table.

## Configuring Database-Level Firewall Rules

The process for setting up database-level firewall rules involves an initial server-level rule to gain access. After accessing the database:

1.  Configure the specific firewall rule within the database context using T-SQL.
2.  Once the database-level rule is in effect, you can remove the broader server-level rule if necessary to tighten security further.

> [!important]
> **Best Practice**
>
> Always verify connectivity with a sample query before removing any server-level rules, ensuring that your database-level rules have been correctly enforced.

## Next Steps

Now that you understand the configuration and verification process for SQL Database firewalls, the next step is to enable and monitor database auditing. Auditing provides valuable insights into database activities and enhances overall security compliance.

For more detailed information on Azure SQL Database security, visit the [Azure SQL Database Documentation](https://learn.microsoft.com/en-us/azure/azure-sql/).

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/6910048b-56ad-4c2f-981f-b09879caa919)**
>
> Watch video content
