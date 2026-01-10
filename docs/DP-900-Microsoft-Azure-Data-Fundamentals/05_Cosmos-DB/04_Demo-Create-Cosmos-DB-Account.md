# Demo Create Cosmos DB Account - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DP-900-Microsoft-Azure-Data-Fundamentals/Cosmos-DB/Demo-Create-Cosmos-DB-Account)

---

## Table of Contents

- Demo Create Cosmos DB Account
  - 1. Create an Azure Cosmos DB Account
  - 2. Choose Capacity Mode
  - 3. Configure Global Distribution
  - 4. Add a Container
  - 5. Configure Global Replication
  - 6. Explore Data Explorer
  - Watch Video
    - Geo-redundancy vs. Multi-region Writes

---

## Content

DP-900: Microsoft Azure Data Fundamentals

Cosmos DB

# Demo Create Cosmos DB Account

In this lesson, you’ll learn how to provision an Azure Cosmos DB account, configure a NoSQL database and container, enable global distribution, and insert your first document using the Data Explorer. By the end, you’ll understand Cosmos DB’s core concepts and be ready to build globally distributed applications.

---

## 1\. Create an Azure Cosmos DB Account

1.  In the Azure portal, type **Cosmos DB** in the search bar and select **Azure Cosmos DB**.
2.  Click **Create Azure Cosmos DB account**.
3.  Under **API**, choose **Azure Cosmos DB for NoSQL**:

![The image shows a Microsoft Azure interface for creating an Azure Cosmos DB account, offering options for different APIs like NoSQL, PostgreSQL, MongoDB, Apache Cassandra, Table, and Apache Gremlin. Each option includes a brief description and buttons to "Create" or "Learn more."](https://kodekloud.com/kk-media/image/upload/v1752872925/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-account-interface.jpg)

4.  Click **Create** and fill out the **Basics** tab:
    - **Subscription**: Select your Azure subscription
    - **Resource group**: Pick an existing group or create a new one, e.g., _MyResourceGroup_
    - **Account Name**: Enter a unique name (e.g., `phvcosmos`)
    - **Region**: Choose the nearest region (e.g., East US)

---

## 2\. Choose Capacity Mode

Cosmos DB offers two billing models. Select the mode that best fits your workload:

| Capacity Mode          | Billing Model           | Ideal For                         |
| ---------------------- | ----------------------- | --------------------------------- |
| Provisioned throughput | Request Units (RUs/sec) | Predictable performance workloads |
| Serverless             | Pay per request         | Infrequent or bursty traffic      |

1.  Under **Capacity mode**, pick **Provisioned throughput**.
2.  Enable the free tier discount (if eligible).
3.  Optionally **Limit total throughput** to prevent unexpected RU charges.

> [!important]
> **Note**
>
> Limiting throughput helps you stay within budget by capping the maximum RUs your account can consume.

---

## 3\. Configure Global Distribution

1.  Switch to the **Global distribution** tab.
2.  Toggle **Multi-region writes** (allows writes in all regions).

![The image shows a Microsoft Azure interface for creating an Azure Cosmos DB account, specifically focusing on global distribution settings like geo-redundancy, multi-region writes, and availability zones. Options for enabling or disabling these features are displayed.](https://kodekloud.com/kk-media/image/upload/v1752872926/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-global-distribution-settings.jpg)

3.  Click **Review + create**.
4.  After validation passes, click **Create**. Deployment may take a few minutes.

![The image shows a Microsoft Azure portal screen indicating that a Cosmos DB deployment is complete, with options to view deployment details and next steps.](https://kodekloud.com/kk-media/image/upload/v1752872928/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-portal-cosmos-db-deployment-complete.jpg)

---

## 4\. Add a Container

1.  Go to your new account’s **Overview** page and click **\+ Create Container**.
2.  By default:
    - Database ID: **items**
    - Container ID: **items**
    - Throughput: 400 RUs/sec on the container (1,000 RUs/sec at the account level)

![The image shows a Microsoft Azure Cosmos DB quick start guide with steps to add a container, download a .NET app, and work with data using the Data Explorer.](https://kodekloud.com/kk-media/image/upload/v1752872929/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-quick-start-guide.jpg)

You can also download sample apps in .NET, Java, Node.js, or Python, or use **Data Explorer** to explore and manage data.

---

## 5\. Configure Global Replication

1.  Under **Settings**, select **Replicate data globally**.
2.  On the world map, click to add a secondary region (e.g., Canada Central).

![The image shows a Microsoft Azure interface for replicating data globally using Azure Cosmos DB. It includes a world map with selectable regions and options to configure multi-region writes.](https://kodekloud.com/kk-media/image/upload/v1752872931/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-global-replication-interface.jpg)

> [!important]
> **Warning**
>
> Adding regions with **Multi-region writes** multiplies RU consumption across each region. Ensure your account-level RU quota covers all selected regions, or adjust your throughput accordingly.

### Geo-redundancy vs. Multi-region Writes

- **Multi-region writes**: Clients can write to any configured region.
- **Geo-redundancy**: Maintains a passive standby region for automatic failover.

You may enable both if you require active-active writes and automatic failover.

3.  Click **Save**. Back in **Overview**, you’ll now see all configured regions:

![The image shows a Microsoft Azure Cosmos DB account overview page, displaying details such as resource group, subscription ID, throughput limit, and database information.](https://kodekloud.com/kk-media/image/upload/v1752872932/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-account-overview.jpg)

---

## 6\. Explore Data Explorer

1.  In the portal menu, choose **Data Explorer** (or press Ctrl + F and search for it).

![The image shows the Azure Cosmos DB Data Explorer interface, featuring options for creating a new container, launching a quick start, and connecting to a database. The left panel displays a navigation menu with sections like Overview, Activity log, and Data Explorer.](https://kodekloud.com/kk-media/image/upload/v1752872935/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752872935/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-data-explorer-interface.jpg)

2.  Expand your **items** database and container.

![The image shows the Azure Cosmos DB Data Explorer interface, featuring options for creating a new container, launching a quick start, and connecting to a database. The left panel displays a navigation menu with sections like Overview, Activity log, and Data Explorer.](https://kodekloud.com/kk-media/image/upload/v1752872935/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752872935/notes-assets/images/DP-900-Microsoft-Azure-Data-Fundamentals-Demo-Create-Cosmos-DB-Account/azure-cosmos-db-data-explorer-interface.jpg)

3.  Click **New Item**. Replace the default JSON:

```
{
  "id": "replace_with_new_document_id"
}
```

with:

```
{
  "CustomerId": 1,
  "FirstName": "Peter",
  "LastName": "Vogel"
}
```

4.  Press **Save**. Cosmos DB augments your document with system properties:

```
{
  "CustomerId": 1,
  "FirstName": "Peter",
  "LastName": "Vogel",
  "id": "3a0585fd-1202-4855-91ef-5077ca6c263c",
  "_rid": "VRJWANGK1u0BAAAAAAAAAA==",
  "_self": "dbs/VRJWAA==/colls/VRJWANGK1u0=/docs/VRJWANGK1u0BAAAAAAAAAA==/",
  "_etag": "\"b002c1f-0000-0100-0000-64fcd0bf0000\"",
  "_attachments": "attachments/",
  "_ts": 1694292751
}
```

Key system properties:

- **\_etag**: Concurrency control
- **\_ts**: Last-modified timestamp

---

Congratulations! You have successfully created an Azure Cosmos DB account, configured a NoSQL database and container, set up global distribution, and inserted your first document. For more details, see the [Azure Cosmos DB documentation](https://docs.microsoft.com/azure/cosmos-db/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/dp-900-microsoft-azure-data-fundamentals/module/06b26525-f54a-46ed-84c1-da4191607325/lesson/91c27e1a-b7bb-4df9-99ab-440c6e0e6892)**
>
> Watch video content
