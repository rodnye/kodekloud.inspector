# OpenSearch Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/OpenSearch-Demo)

---

## Table of Contents

- OpenSearch Demo
  - Domain Creation: Easy Create vs. Standard Create
  - Domain Configuration Options
  - Accessing the OpenSearch Cluster
  - Uploading Data to OpenSearch
  - Deleting the OpenSearch Domain
  - Watch Video
    - Template Selection and Availability Zones
    - OpenSearch Version and Instance Configuration
    - Storage Options
    - Network and Access Control Settings
    - Adding Sample Data
    - Single Document Upload
    - Bulk Document Upload
    - Searching Data via Dashboards

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# OpenSearch Demo

In this lesson, we guide you through working with Amazon OpenSearch by creating and configuring an OpenSearch domain. A domain represents an OpenSearch cluster with specific settings, instance types, instance counts, and storage resources. In this demo, our domain is named "demo."

![The image shows an AWS OpenSearch Service interface for creating a new domain, with options for domain name, creation method, and engine version. A summary of the configuration is displayed on the right.](https://kodekloud.com/kk-media/image/upload/v1752865190/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/aws-opensearch-create-domain-interface.jpg)

## Domain Creation: Easy Create vs. Standard Create

When creating a domain, you have two options:

- **Easy create:** Quickly set up the domain with recommended default configurations.
- **Standard create:** Customize each setting in detail.

For this lesson, we select **Standard create** to explore the available configuration options.

## Domain Configuration Options

### Template Selection and Availability Zones

Begin by selecting an environment template:

- For production data, choose **production**.
- For demos or testing, select **dev/test**.

You can deploy the domain with or without a dedicated standby node. In this demo, we proceed without a standby node. Next, choose the number of Availability Zones. We select one Availability Zone—although for production deployments, using multiple zones is recommended for high availability.

### OpenSearch Version and Instance Configuration

Choose the OpenSearch version you require. You may also select an Elasticsearch version if needed. For this demo, we opt for version 2.9 (the latest).

Next, select the EC2 instance type to run your cluster. Since this is a demo, we choose a cost-effective T3 small instance. Determine the number of nodes per Availability Zone; for example, one node per zone yields a single node. (If you configured three Availability Zones with one node each, you would have three total nodes.)

### Storage Options

Configure your storage preferences:

- Choose **EBS** as the storage type.
- Select the appropriate volume type.
- Define the storage size per node. For this demo, we use a minimal configuration of 10 GB per node.

Optionally, you can enable a dedicated master node; however, for this demonstration, that option remains disabled.

![The image shows an AWS OpenSearch Service configuration screen, detailing options for data storage, node types, and encryption settings. A summary panel on the right provides an overview of the selected configurations.](https://kodekloud.com/kk-media/image/upload/v1752865191/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/aws-opensearch-service-configuration.jpg)

### Network and Access Control Settings

Scroll down to configure network settings. For this demo, choose public access. In a production environment, you may wish to deploy within a specific VPC, subnet, and defined security groups.

For access control, you have two options: use IAM or create a master user. In this example, we create a master user by entering a default master username and password that meet security requirements.

![The image shows an AWS console screen for setting up fine-grained access control in OpenSearch, with options for creating a master user and configuring authentication settings.](https://kodekloud.com/kk-media/image/upload/v1752865193/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/aws-console-opensearch-access-control.jpg)

Additional options include enabling SAM authentication or Amazon Cognito authentication. Under access policies, this demo uses fine-grained access control without further modifications.

![The image shows an AWS console screen for creating a domain, with options for domain access policy and encryption settings. A summary panel on the right displays configuration details like engine version, data nodes, and network access.](https://kodekloud.com/kk-media/image/upload/v1752865194/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/aws-console-domain-creation-settings.jpg)

Leave the remaining settings (such as automatic software updates) as default and deploy your cluster.

> [!important]
> **Deployment Time**
>
> The deployment process may take 15 to 20 minutes.

## Accessing the OpenSearch Cluster

After deployment, click the endpoint to connect to your cluster. You will see two URLs: one for sending requests to add or retrieve data and another for accessing the OpenSearch Dashboard. Click the dashboard URL and log in using your master username (for example, "admin") and the password you configured.

During the initial login, a pop-up message may prompt you to choose between specific tenants or a global dashboard. For simplicity, select the global option.

At this point, the cluster will be empty. OpenSearch provides a demo dataset to help you practice with sample data.

### Adding Sample Data

When adding data, you will see three sample datasets. For this lesson, select the **e-commerce orders** dataset. After installation, click "view data" to explore the new configurations created automatically within OpenSearch.

![The image shows an eCommerce dashboard with various data visualizations, including transaction statistics, sales by gender, average sales price, total revenue, and sales by category.](https://kodekloud.com/kk-media/image/upload/v1752865195/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/ecommerce-dashboard-data-visualizations.jpg)

Within the OpenSearch Dashboard, navigate to **Management > Index Management > Indices** to view the indices created for the dataset. By selecting the specific e-commerce dataset, you can review the index mappings and see which fields are indexed.

Switch to the **Discover** tab in the OpenSearch Dashboard to view all data points. By default, the date filter covers the last seven days, but you can adjust this range as needed.

![The image shows a dashboard from OpenSearch with a bar chart displaying order data over time and a detailed log of transactions below. The interface includes filters and options for data analysis.](https://kodekloud.com/kk-media/image/upload/v1752865196/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/opensearch-dashboard-order-data-chart.jpg)

Filters allow you to refine the data further. For instance, selecting the "manufacturer" field displays the top five manufacturers. You can also add filters for fields like "day of week" (e.g., filtering for Saturday) to combine multiple criteria.

## Uploading Data to OpenSearch

For those interested in uploading their own data and performing queries on an OpenSearch cluster, refer to the [AWS Documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/index.html) for a demo with commands to upload data and run queries.

### Single Document Upload

Use this curl command to upload a single document to the "movies" index. Remember to update the username, password, and domain endpoint as needed.

```
curl -XPUT -u 'admin:Password123!' 'domain-endpoint/movies/_doc/1' -d '{ "director": "Burton, Tim", "genre": ["Comedy", "Sci-Fi"], "year": 1996, "actor": ["Jack Nicholson", "Pierce Brosnan", "Sarah Jessica Parker"], "title": "Mars Attacks!" }' -H 'Content-Type: application/json'
```

### Bulk Document Upload

For bulk uploads, prepare a file (e.g., bulk_movies.json) with the following content:

```
{ "index": { "_index": "movies", "_id": "2" } }
{ "director": "Frankenheimer, John", "genre": ["Drama", "Mystery", "Thriller", "Crime"], "year": 1962, "actor": ["Lansbury, Angela", "Sinatra, Frank"] }
{ "index": { "_index": "movies", "_id": "3" } }
{ "director": "Baird, Stuart", "genre": ["Action", "Crime", "Thriller"], "year": 1998, "actor": ["Downey Jr., Robert", "Jones, Tommy Lee", "Snipes, Wesley"] }
{ "index": { "_index": "movies", "_id": "4" } }
{ "director": "Ray, Nicholas", "genre": ["Drama", "Romance"], "year": 1955, "actor": ["Hopper, Dennis", "Wood, Natalie", "Dean, James", "Mineo, Sal"] }
```

Then execute the following command to perform the bulk upload:

```
curl -XPOST -u 'admin:Password123!' 'https://search-demo-kt2xqr2r2yoeyqvf7hqjzna2m.us-east-1.es.amazonaws.com/_bulk' --data-binary @bulk_movies.json -H 'Content-Type: application/json'
```

If successful, your response will indicate that documents have been added (status code 201). An example response might look like this:

```
{
  "took": 61,
  "errors": false,
  "items": [
    {
      "index": {
        "_index": "movies",
        "_id": "2",
        "_version": 1,
        "result": "created",
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 0,
        "_primary_term": 1,
        "status": 201
      }
    },
    {
      "index": {
        "_index": "movies",
        "_id": "4",
        "_version": 1,
        "result": "created",
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 0,
        "_primary_term": 1,
        "status": 201
      }
    }
  ]
}
```

After uploading, verify the data in the **Index Management** section of the OpenSearch Dashboard by reviewing the "movies" index mappings. This view will display fields such as actor, director, genre, title, and year.

![The image shows an OpenSearch Dashboards interface displaying details of a "movies" index, including its overview and index mappings with fields like actor, director, genre, title, and year.](https://kodekloud.com/kk-media/image/upload/v1752865197/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/opensearch-dashboards-movies-index.jpg)

### Searching Data via Dashboards

To search for data in OpenSearch Dashboards:

1.  Navigate to **Dashboards > Index Patterns** and create an index pattern for "movies."
2.  Go to the **Discover** tab.
3.  Select the "movies" index and run queries. For example, search for movies featuring a specific actor like Robert Downey Jr.

![The image shows an OpenSearch Dashboards interface with a filter being edited to search for movies by a specific actor. The results display movie details such as genre, year, and title.](https://kodekloud.com/kk-media/image/upload/v1752865198/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/opensearch-dashboards-movie-filter.jpg)

## Deleting the OpenSearch Domain

To conclude this lesson, delete your OpenSearch cluster by following these steps:

1.  In the AWS console, navigate to **Domains**.
2.  Select your "demo" domain.
3.  Click **delete** and confirm by typing the domain name ("demo") into the confirmation dialog.

![The image shows a confirmation dialog box for deleting a domain named "demo" in the Amazon OpenSearch Service console, requiring the user to type "demo" to confirm the deletion.](https://kodekloud.com/kk-media/image/upload/v1752865199/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-OpenSearch-Demo/delete-domain-confirmation-dialog.jpg)

> [!important]
> **Lesson Complete**
>
> This concludes our lesson on Amazon OpenSearch. Enjoy exploring the capabilities and features that OpenSearch has to offer!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/d1107238-c65e-4af2-83f1-242cee243ced)**
>
> Watch video content
