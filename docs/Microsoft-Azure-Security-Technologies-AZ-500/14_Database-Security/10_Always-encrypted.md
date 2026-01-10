# Always encrypted - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Database-Security/Always-encrypted)

---

## Table of Contents

- Always encrypted
  - Benefits of Always Encrypted
  - Implementing Always Encrypted
  - Conclusion
  - Watch Video
    - Step 1: Viewing the Data
    - Step 2: Launching the Always Encrypted Wizard
    - Step 3: Key Generation and Storage
    - Step 4: Verifying the Encryption

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Database Security

# Always encrypted

Always Encrypted is an advanced data encryption technology available in both Azure SQL Database and SQL Server. It safeguards sensitive data at rest, during transit, and even during processing. With Always Encrypted, sensitive information remains encrypted within the database, ensuring that only client applications or servers with access to the encryption keys can decrypt and view the data.

## Benefits of Always Encrypted

- **Transparent Data Encryption/Decryption:** Encryption and decryption operations occur at the application layer, reducing the exposure risk within the database.
- **Enhanced Key Management:** Encryption keys are managed on the client side, keeping them hidden from the database engine.
- **Secure Enclaves Support:** Enables confidential computations on encrypted data to boost privacy.
- **Flexible Encryption Types:**
  - **Randomized Encryption:** Encrypts data in a non-deterministic way, preventing pattern analysis for higher security.
  - **Deterministic Encryption:** Consistently produces the same encrypted value for a given plaintext, which supports indexing and equality searches.
- **Regulatory Compliance:** Aids in meeting strict data encryption and privacy regulations.

## Implementing Always Encrypted

Implementing Always Encrypted involves identifying the database tables and columns that house sensitive information. For example, suppose the Social Security Number (SSN) or an address field in the \[SalesLT\].\[Address\] table contains sensitive data. You can use SQL Server Management Studio (SSMS) to start the Always Encrypted Wizard by selecting the table and choosing the "Encrypt Columns" option.

### Step 1: Viewing the Data

Begin by executing a query in SSMS to display data from your target table. This helps you identify the columns that require encryption:

```
SELECT TOP (1000) [AddressID],
       [AddressLine1],
       [AddressLine2],
       [City],
       [StateProvince],
       [CountryRegion],
       [PostalCode],
       [Rowguid],
       [ModifiedDate]
FROM [SalesLT].[Address]
```

### Step 2: Launching the Always Encrypted Wizard

Right-click the table in SSMS, select **Encrypt Columns**, and the Always Encrypted Wizard will launch. Follow these steps in the wizard:

- Choose the columns to encrypt (e.g., AddressLine1)
- Select the encryption type:
  - **Deterministic Encryption:** Always returns the same encrypted value for identical plaintext.
  - **Randomized Encryption:** Provides full data anonymity by encrypting data differently each time.

![The image illustrates the implementation of "Always Encrypted" using a wizard, showing the encryption of data columns like "First Name" and "SSN" with column master keys. It includes screenshots of the column selection and master key configuration processes.](https://kodekloud.com/kk-media/image/upload/v1752881765/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Always-encrypted/always-encrypted-wizard-implementation.jpg)

### Step 3: Key Generation and Storage

Within the wizard, you have the option to auto-generate an encryption key. You can choose to use the same key for multiple columns or create unique keys per column. The master key that encrypts these column encryption keys can also be auto-generated and stored as:

- A Windows certificate in the Certificate Store, or
- Within Azure Key Vault for enhanced cloud-based security.

For this example, the master key is stored locally in the Windows Certificate Store. Proceed with the wizard to finalize the encryption configuration.

### Step 4: Verifying the Encryption

After completing the encryption process (which may require some time), run your query again to confirm that the data is encrypted. Although the database now displays the encrypted data, using the master key in your query or application will decrypt and reveal the original values.

```
SELECT TOP (1000) [AddressID],
       [AddressLine1],
       [AddressLine2],
       [City],
       [StateProvince],
       [CountryRegion],
       [PostalCode],
       [Rowguid],
       [ModifiedDate]
FROM [SalesLT].[Address]
```

![The image shows a SQL Server Management Studio interface with a query window displaying a SQL query and its results. A "Summary" dialog box is open, detailing encryption settings for a database operation.](https://kodekloud.com/kk-media/image/upload/v1752881766/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Always-encrypted/sql-server-management-studio-query-results.jpg)

> [!important]
> **Note**
>
> Always ensure that your client application securely manages the encryption keys to maintain data confidentiality.

## Conclusion

The implementation of Always Encrypted provides an effective means to secure sensitive data throughout its lifecycle. With encryption at every layer—from data at rest to data in transit—you're better equipped to meet regulatory compliance and enhance overall data security.

In our next module, we will explore security operations in greater depth. Stay tuned!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d199f126-f1df-43a8-bd3d-68cd689d509d/lesson/f3e7dc83-4b53-4eb4-889f-0efd185c6213)**
>
> Watch video content
