# Design for managed identities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-for-authentication-and-authorization/Design-for-managed-identities)

---

## Table of Contents

- Design for managed identities
  - Traditional Credential-Based Authentication
  - Managed Identity Authentication
  - Use Cases for Managed Identities
  - Types of Managed Identities
  - Integration with Azure Key Vault
  - Watch Video
    - Key Differences Between Managed Identity Types

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design for authentication and authorization

# Design for managed identities

Managed identities provide a secure and efficient way for your Azure resources to authenticate with Azure Active Directory (Azure AD) and access other services without embedding credentials in your code. This guide explains how managed identities work and demonstrates connecting to an Azure SQL Database using both traditional credential-based authentication and managed identity authentication.

## Traditional Credential-Based Authentication

In a traditional setup, a Python web application running on Azure connects to an SQL Database using a username and password stored within the code. While this method may work, it exposes sensitive credentials that could be compromised if the code is accidentally pushed to a public repository.

```
import pyodbc

server = "mykodekloud.database.windows.net"
database = "products"
username = "dbadmin"
password = "VeryStrongPassword#889"
driver = "{ODBC Driver 17 for SQL Server}"

with pyodbc.connect(
    "DRIVER=" + driver +
    ";SERVER=tcp:" + server +
    ";PORT=1433;" +
    "DATABASE=" + database +
    ";UID=" + username +
    ";PWD=" + password
) as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
        row = cursor.fetchone()
        while row:
            print(str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()
```

> [!important]
> **Warning**
>
> Storing clear-text credentials in your code is risky. If the repository is ever breached, sensitive information can be easily stolen.

## Managed Identity Authentication

Managed identities remove the need to store credentials in your code. Instead, your Azure resource is granted an identity in Azure AD, which can then obtain an authentication token to access services such as Azure SQL Database.

The following example demonstrates how to connect to an Azure SQL Database using a managed identity. Notice that the connection string uses Active Directory MSI (Managed Service Identity) and obtains a token from Azure AD for secure authentication.

```
import pyodbc
import struct

server = "mykodekloud.database.windows.net"
database = "products"
driver = "{ODBC Driver 17 for SQL Server}"
connection_string = (
    "DRIVER=" + driver +
    ";SERVER=" + server +
    ";DATABASE=" + database
)

# Establish a connection using ActiveDirectoryMsi authentication.
_conn = pyodbc.connect(connection_string + ";Authentication=ActiveDirectoryMsi")

# Assume 'exptoken' is a byte string containing the access token obtained from Azure AD.
# The following constructs the token structure required by pyodbc.
tokenstruct = struct.pack("=I", len(exptoken)) + exptoken

# Create a connection using the token
conn = pyodbc.connect(connection_string, attrs_before={SQL_COPT_SS_ACCESS_TOKEN: tokenstruct})

with conn.cursor() as cursor:
    cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
    row = cursor.fetchone()
    while row:
        print(row[0], row[1])
        row = cursor.fetchone()
```

By using managed identity authentication, there is no need to hard-code a username or password. Instead, Azure AD returns a token for the managed identity, ensuring secure and streamlined access to your SQL database or any other service that supports Azure AD authentication.

## Use Cases for Managed Identities

Managed identities can be used in various scenarios where secure resource authentication is required. They are supported by several Azure resources, including:

- Virtual Machines
- Web Apps
- Azure Kubernetes Service (AKS)
- Function Apps
- Load Balancers

> [!important]
> **Note**
>
> Managed identities are only available for resources deployed in Azure. They cannot be used with on-premises applications.

Using managed identities eliminates the need for constant credential rotations or certificate management, as the identity is maintained automatically by Azure AD. This significantly enhances the security and manageability of your applications.

## Types of Managed Identities

There are two types of managed identities in Azure:

1.  **System-Assigned Managed Identity:**  
    This identity is automatically created for an Azure resource (e.g., a virtual machine). The identity's lifecycle is tied to the resource; if the resource is deleted, the identity is also removed.
2.  **User-Assigned Managed Identity:**  
    This is a standalone identity resource that you create in Azure. It can be assigned to multiple Azure resources, making it ideal for scenarios where different instances of your application require a common identity.

Below is a diagram comparing the two types of managed identities:

![The image is a comparison table of system-assigned and user-assigned managed identities in Azure, detailing their alignment, lifecycle, sharing capabilities, and use cases.](https://kodekloud.com/kk-media/image/upload/v1752867242/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-managed-identities/azure-managed-identities-comparison-table.jpg)

### Key Differences Between Managed Identity Types

- **Lifecycle:**  
  • System-assigned identities are deleted automatically with their resource.  
  • User-assigned identities exist independently of the resources that use them.
- **Sharing:**  
  • System-assigned identities are dedicated to a single resource (one-to-one relationship).  
  • User-assigned identities can be shared across multiple resources.
- **Use Cases:**  
  • Choose system-assigned identities for workloads confined to a single resource.  
  • Choose user-assigned identities when multiple resources require a shared identity.

Demo scenarios include a virtual machine connecting to a database, a web app accessing data, or an application gateway retrieving an SSL certificate from Key Vault. In each case, managed identities offer a secure and maintainable method of authentication.

## Integration with Azure Key Vault

Next, we explore how Azure Key Vault integrates with managed identities to further enhance your security management by providing secure storage and access to certificates, secrets, and keys.

For more information on Azure AD and role-based access control, please visit the following resources:

- [Azure Active Directory Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- [Azure Key Vault Documentation](https://docs.microsoft.com/en-us/azure/key-vault/)

By leveraging managed identities and Azure AD, you can significantly reduce the risk associated with credential management, ensuring your applications remain secure and compliant with modern security standards.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/37d1f5fb-99a1-4513-a856-4587651d9a60/lesson/fbc8aaa4-4728-495b-bf78-deed5a6c43df)**
>
> Watch video content
