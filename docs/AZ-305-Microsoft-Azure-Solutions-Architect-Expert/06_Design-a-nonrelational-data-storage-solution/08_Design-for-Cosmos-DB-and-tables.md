# Design for Cosmos DB and tables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-nonrelational-data-storage-solution/Design-for-Cosmos-DB-and-tables)

---

## Table of Contents

- Design for Cosmos DB and tables
  - Azure Table Storage
  - Cosmos DB
  - Benefits of Moving from Table Storage to Cosmos DB
  - Choosing the Right Cosmos DB API
  - Conclusion
  - Watch Video
    - Working with Table Storage Using Azure Storage Explorer
    - Creating a Cosmos DB Account

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a nonrelational data storage solution

# Design for Cosmos DB and tables

In this lesson, we explore two NoSQL data stores available on Azure: Azure Table Storage and Cosmos DB. We will compare the Table API provided by Azure Storage with the Cosmos DB Table API, helping you determine which service best fits your application needs.

## Azure Table Storage

Azure Table Storage is designed to store non-relational structured (NoSQL) data in the cloud. Within a storage account, you can create multiple tables as long as each table has a unique name. Each table is made up of entities, and each entity contains a set of properties. For instance, an entity may have a property "name" with the value "Sylvia", along with properties like "country," "phone," and "zip."

This service is ideal for managing large datasets (potentially terabytes of data) such as e-commerce product catalogs or user information for web applications. Its architecture uses a partition key and row key—comparable to rows and columns in relational databases—which supports efficient querying through clustered indexes. It is best suited for datasets that do not require complex joins, foreign keys, or stored procedures. Common examples include address books, device information logs, and simple web application data, where speed and cost-effectiveness are crucial.

Below is a diagram that illustrates the key concepts of Table Storage as a NoSQL data store, showcasing benefits like scalability, simplicity, and efficient querying.

![The image is a diagram explaining "Table Storage" for storing NoSQL data in the cloud, showing how data is organized into containers, files, tables, and queues, with examples of entities. It highlights benefits like handling large data, simplicity, easy querying, and cost-effectiveness.](https://kodekloud.com/kk-media/image/upload/v1752867127/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/table-storage-nosql-diagram.jpg)

### Working with Table Storage Using Azure Storage Explorer

1.  **Create a Table in Azure Portal**  
    Log in to the Azure portal, navigate to your storage account, and select "Tables." Click "Add a table," provide a unique name (e.g., "customers"), and create the table. Note that clicking on the table name in the portal does not show its data—you need Azure Storage Explorer to view or modify its contents.

    ![The image shows a Microsoft Azure portal interface displaying a storage account named "eventanalyticsab46" with a table named "customers" successfully created.](https://kodekloud.com/kk-media/image/upload/v1752867128/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-portal-storage-account-customers.jpg)

2.  **Connecting via Azure Storage Explorer**  
    Open Azure Storage Explorer and click on the Connect button. Choose to connect to a storage account using access keys. Retrieve the account name and key from the Azure portal ("Account access keys" section), paste the key into Storage Explorer, and connect. Once connected, navigate to the "Tables" section to find your "customers" table.

    ![The image shows a Microsoft Azure interface with a pop-up window for connecting to Azure Storage. It includes fields for display name, account name, account key, and storage domain options.](https://kodekloud.com/kk-media/image/upload/v1752867129/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-storage-connection-popup.jpg)

3.  **Inserting Data into the Table**  
    Within the "customers" table, you work with two default fields: partition key and row key—which function like XY coordinates for fast querying. For example, you might assign the partition key as a country and the row key as a unique user ID.
    - **First Entry:**
      - Partition key: US
      - Row key: (first user ID)
      - Properties: name (Sam), state (Texas), email (sam@sam.com)

      Click "Insert" to add the user.

    - **Second Entry:**
      - Partition key: Singapore
      - Row key: (first user ID for Singapore)
      - Properties: name (Matt), state ("SG" since state data is missing), email (matt@matt.com), zip (e.g., 1123)

    - **Third Entry:**
      - Partition key: US
      - Row key: (second user ID)
      - Properties: name (Jane), state (Illinois), email (jane@jane.com)

    > [!important]
    > **Note**
    >
    > New properties (columns) are dynamically added to entities without recreating the table, and a system-maintained "timestamp" is automatically updated.

    ![The image shows a Microsoft Azure Storage Explorer interface displaying a table named "customers" with a single entry, alongside a list of storage accounts on the left.](https://kodekloud.com/kk-media/image/upload/v1752867130/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-storage-explorer-customers-table.jpg) ![The image shows a Microsoft Azure Storage Explorer interface displaying a table named "customers" with data entries, alongside a list of storage accounts on the left.](https://kodekloud.com/kk-media/image/upload/v1752867131/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-storage-explorer-customers-table-2.jpg)

4.  **Querying Data**  
    Data retrieval is based on the partition and row keys. For instance, you might query all users belonging to the US partition and delete a specific record if necessary. In many real-world applications, such operations are executed via the Azure Storage SDK for tables or through its REST API.

## Cosmos DB

Cosmos DB is a fully managed NoSQL database service on Azure that offers enhanced availability options compared to Table Storage. Unlike Table Storage, which uses the storage account's default redundancy, Cosmos DB replicates data across multiple global regions, allowing both read and write operations on any replica.

![The image is a diagram illustrating when to use Azure Cosmos DB, showing its integration with Azure services like App Service, Functions, and Cache for Redis across active and standby regions. It highlights features such as automatic scalability, enterprise-grade security, multi-region replication, and platform management.](https://kodekloud.com/kk-media/image/upload/v1752867132/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-integration-diagram.jpg)

### Creating a Cosmos DB Account

1.  **Account Creation**  
    Create a Cosmos DB account in the Azure portal. Cosmos DB supports six APIs: NoSQL, MongoDB, Apache Cassandra, Table API, Gremlin API, and PostgreSQL. Choose the appropriate API based on your application requirements and skill set. For this lesson, we will use the NoSQL (SQL API).

    ![The image shows a Microsoft Azure portal page for creating an Azure Cosmos DB account, offering various API options like NoSQL, MongoDB, Apache Cassandra, Table, Apache Gremlin, and PostgreSQL. Each option includes a brief description and buttons to create or learn more.](https://kodekloud.com/kk-media/image/upload/v1752867133/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-account-creation.jpg)

2.  **Configuration**
    - Select your subscription and create a new resource group if needed.
    - Provide a unique account name and choose a region (e.g., East US).
    - Choose between provisioned throughput or serverless.
    - Optionally, apply the free tier discount and configure global distribution settings (geo-redundancy, multi-region writes, availability zones).
    - Configure networking and backup policies based on your application's needs.

    ![The image shows a Microsoft Azure portal page for creating an Azure Cosmos DB account, with fields for subscription, resource group, account name, location, and capacity mode.](https://kodekloud.com/kk-media/image/upload/v1752867134/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-account-creation-2.jpg) ![The image shows a Microsoft Azure portal page for creating an Azure Cosmos DB account, specifically focusing on the "Global Distribution" settings, with options for enabling or disabling geo-redundancy, multi-region writes, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752867135/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-global-distribution-settings.jpg) ![The image shows a Microsoft Azure portal page for creating an Azure Cosmos DB account, specifically focusing on setting the backup policy options. It includes choices for periodic and continuous backup policies, backup intervals, retention, and storage redundancy options.](https://kodekloud.com/kk-media/image/upload/v1752867137/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-backup-policy.jpg)

Creation of the account typically takes two to three minutes. Once completed, you can set up a container (similar to a table in Table Storage) to store your data.

3.  **Setting Up a Database and Container**
    - Open the Data Explorer within your Cosmos DB account.
    - Optionally remove the default "ToDoList" database and create a new database named "customers."
    - Set the throughput (for example, 1000 RU/s) and create a container named "customer" within the "customers" database.
    - Specify a partition key (for instance, using the "ID" field).

    ![The image shows the Microsoft Azure Data Explorer interface with a welcome message explaining that Azure Cosmos DB is a fully managed NoSQL database service. The interface includes navigation options and learning resources.](https://kodekloud.com/kk-media/image/upload/v1752867138/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-data-explorer.jpg) ![The image shows a Microsoft Azure Data Explorer interface for a Cosmos DB account, displaying a "ToDoList" database with options for items, stored procedures, and other settings. The main panel suggests creating or working with existing documents.](https://kodekloud.com/kk-media/image/upload/v1752867139/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-data-explorer-cosmosdb-todolist.jpg) ![The image shows the Microsoft Azure Data Explorer interface, where a user is setting up a new database with options for database ID, throughput, and autoscale settings.](https://kodekloud.com/kk-media/image/upload/v1752867141/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-data-explorer-database-setup.jpg)

4.  **Data Import Using the Cosmos DB Data Migration Tool**  
    Prepare a JSON file containing customer details and use the Cosmos DB Data Migration Tool provided by Microsoft to import data:
    - Add your JSON file.

      ![The image shows a Microsoft Azure Data Explorer interface with a file explorer window open, displaying a JSON file named "customers" ready to be selected.](https://kodekloud.com/kk-media/image/upload/v1752867142/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-data-explorer-json-file.jpg)

    - Retrieve the primary connection string from the Cosmos DB account's "Keys" section.
    - In the migration tool, enter the connection string, specify the database name ("customers"), container name ("customers"), and the partition key ("ID").
    - Verify the connection and click "Import." Depending on the dataset size (e.g., 100,000 records), the import process might take several minutes.

5.  **Querying Your Cosmos DB Data**  
    After importing, use the Data Explorer to view your data. Run SQL-like queries to inspect records. For example, to fetch all records:

    ```
    SELECT * FROM c
    ```

    You can inspect a single record to verify fields like "email", "first", "last", "company", and "created_at" (note that "created_at" is sourced from the JSON file rather than being auto-generated).

    To query users from Switzerland, you could run:

    ```
    SELECT * FROM c WHERE c.country = "Switzerland"
    ```

    An example output might look like this:

    ```
    {
      "id": "390",
      "email": "candelario4@yahoo.com",
      "first": "Adolphus",
      "last": "Mante",
      "company": "Labadie, Sporer and Nicolas",
      "created_at": "2014-09-15T22:09:07.724Z",
      "country": "Switzerland",
      "_rid": "TDeUMes8GAAAAAAAABc+",
      "_self": "uds/TDeUMes8GAAAAAAAABc+/",
      "_etag": "\"0000f211-0000-0100-0000-63bbfa500000\"",
      "_attachments": "attachments/",
      "_ts": 1672363708
    }
    ```

## Benefits of Moving from Table Storage to Cosmos DB

While Table Storage provides fast access, it does not guarantee strict latency or throughput limits. Cosmos DB delivers several advantages:

- **Latency:** Achieves single-digit millisecond latency.
- **Throughput:** Offers dedicated throughput measured in Request Units per second (RUs), ensuring predictable performance.
- **Global Distribution:** Supports turnkey global distribution across more than 30 regions.
- **Indexing:** Automatically indexes all properties, not only the partition and row keys.
- **Query Capability:** Provides flexible, SQL-like queries across all indexed properties.
- **Consistency Levels:** Supports five distinct consistency levels beyond the basic options in Table Storage.
- **Pricing Models:** Offers both consumption-based (serverless) and provisioned capacity models.
- **SLA:** Guarantees 99.99% availability in single-region accounts and up to 99.999% read availability in multi-region accounts.

![The image is a comparison table highlighting the benefits of moving from Table Storage to Cosmos DB, covering aspects like latency, throughput, global distribution, indexing, query, consistency, pricing, and SLAs.](https://kodekloud.com/kk-media/image/upload/v1752867144/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/table-storage-to-cosmos-db-comparison.jpg)

To enable multi-region replication, access your Cosmos DB account in the Azure portal, add the desired regions, and (if needed) enable availability zones. Be aware that increasing throughput might be required to support multiple regions.

![The image shows a Microsoft Azure portal interface for configuring global data replication in Azure Cosmos DB. It includes a world map with selectable regions and a warning about throughput limits.](https://kodekloud.com/kk-media/image/upload/v1752867144/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/azure-cosmos-db-replication-portal.jpg)

## Choosing the Right Cosmos DB API

Cosmos DB provides six different APIs to support various application requirements and development needs:

- NoSQL (SQL API)
- MongoDB
- PostgreSQL
- Apache Cassandra
- Gremlin
- Table API

When deciding which API to use, consider the following:

- For migrating an existing application that already uses MongoDB, Gremlin, or another API, choose the corresponding API.
- If building a new application and you need native SQL syntax with the latest features, opt for the NoSQL (SQL API).
- Alternatively, if your team has expertise in MongoDB, PostgreSQL, or Cassandra, you can select the familiar API.

The following flowchart outlines the decision-making process for selecting the most appropriate Cosmos DB API based on your requirements:

![The image is a flowchart from KodeKloud titled "Choosing Cosmos DB API," outlining decision paths for migrating or building new applications using various APIs like NoSQL, MongoDB, and PostgreSQL. It guides users based on their optimization needs and existing skills.](https://kodekloud.com/kk-media/image/upload/v1752867146/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-Cosmos-DB-and-tables/choosing-cosmos-db-api-flowchart.jpg)

## Conclusion

This lesson covered the fundamentals of both Azure Table Storage and Cosmos DB, demonstrating how to create, manage, and query data in each service. We also highlighted the advanced features of Cosmos DB such as global distribution, automatic indexing, and flexible consistency levels. These insights should help you choose the most appropriate data store based on your application requirements.

Next, we will transition to the subsequent module to further explore these powerful Azure data services.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/7f522b0e-e9c6-4a0a-acfa-345ee6ebb885/lesson/87350714-f577-4244-addf-78265bc89fce)**
>
> Watch video content
