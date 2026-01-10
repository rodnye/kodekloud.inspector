# Turning up Security on Database Services Part 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Database-Services-Part-4)

---

## Table of Contents

- Turning up Security on Database Services Part 4
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Database Services Part 4

In this article, we explore various security considerations for database services on AWS. Following our discussion on DATS as an add-on for DynamoDB, we now focus on security configurations for OpenSearch and OpenSearch Serverless. Both services offer similar security mechanisms worth understanding.

OpenSearch supports various resource-based policies along with IP-based policies for controlling access. Note that IP-based policies essentially function as identity-based policies by evaluating the user's IP address.

![The image is a diagram illustrating the architecture of OpenSearch and OpenSearch Serverless, showing components like VPC, subnets, security groups, and nodes across two availability zones. It highlights the supported policies for access, including resource, identity, and IP-based policies.](https://kodekloud.com/kk-media/image/upload/v1752864258/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/opensearch-architecture-diagram.jpg)

In the diagram above, security groups function like a private link to a data node, which processes incoming data. OpenSearch is widely used for indexing and search processes. Here are some key technical aspects of OpenSearch Service's architecture:

- OpenSearch Service is a managed service supporting OpenSearch and providing Kibana.
- Clusters are not solely composed of a single node type; a distributed search environment is recommended.
- The optimal setup includes dedicated master nodes and the Kibana interface.
- OpenSearch Service handles data persistence internally instead of relying only on external services.

![The image presents a question about the architecture of AWS OpenSearch Service, offering four statements for consideration. It is designed to help a media company understand the service's features for indexing, searching, and analyzing large datasets.](https://kodekloud.com/kk-media/image/upload/v1752864259/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-architecture-question.jpg)

For instance, consider a resource-based policy that incorporates an IP condition. Notice the "Principal" element in the policy below:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "es:ESHttp*"
      ],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": [
            "192.0.2.0/24"
          ]
        }
      }
    }
  ],
  "Resource": "arn:aws:es:us-west-1:987654321098:domain/test-domain/*"
}
```

This policy restricts access so that only requests originating from the IP range 192.0.2.0/24 are allowed. The policy is intentionally repeated to emphasize its importance.

To integrate IAM with OpenSearch for access management, you can use IAM users and groups with tailored policies attached at the resource entry point (the domain endpoint). Additionally, OpenSearch supports fine-grained access control, enabling administrators to specify permissions right down to the index or document level.

![The image presents a scenario where a financial institution plans to use AWS OpenSearch Service for analyzing transactional data, highlighting the need for strict access control. It lists four options for integrating IAM with AWS OpenSearch Service to manage access.](https://kodekloud.com/kk-media/image/upload/v1752864260/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-access-control-options.jpg)

The fine-grained access control in OpenSearch works alongside security groups to validate client requests within the VPC. The typical access control sequence is as follows:

1.  A client sends a request that enters the VPC.
2.  The security group authorizes the request to reach the domain.
3.  IAM credentials are verified.
4.  The access policy confirms the user's permission for the targeted URL or URI.
5.  Fine-grained access control applies specific permissions, returning either the full or a partial dataset.

![The image is a flowchart illustrating the process of OpenSearch and OpenSearch Serverless access, detailing steps from client request to data return based on user permissions.](https://kodekloud.com/kk-media/image/upload/v1752864261/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/opensearch-serverless-flowchart-access.jpg)

When deploying search applications, implementing fine-grained access control is essential to ensure that users have the minimum permissions required to access specific indexes or documents.

OpenSearch fine-grained access control also supports multiple authentication methods, including native local user access, Cognito, and IAM. Although Cognito may sometimes be omitted as an option, IAM remains the primary method for secure authentication.

![The image presents a question about methods to authenticate users in AWS OpenSearch Service, listing four options: AWS Identity and Access Management (IAM), Basic Authentication, OpenSearch Service Domain Tokens, and AWS Certificate Manager (ACM).](https://kodekloud.com/kk-media/image/upload/v1752864262/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-user-authentication-methods.jpg)

Endpoints and private links continue to play critical roles. Only VPC interface endpoints are appropriate for connecting to OpenSearch Service. Remember, gateway endpoints are exclusively used with services like S3 and DynamoDB, while VPC peering and Direct Connect do not attach to specific services.

![The image presents a question about choosing a VPC endpoint type for AWS OpenSearch Service, with four options: VPC Peering Endpoint, Gateway Endpoint, Interface Endpoint, and Direct Connect Endpoint.](https://kodekloud.com/kk-media/image/upload/v1752864263/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-vpc-endpoint-options.jpg)

Reviewing the architecture:

![The image is a diagram of an OpenSearch architecture, showing a setup with two availability zones, each containing subnets, security groups, data nodes, and master nodes within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752864264/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/opensearch-architecture-diagram-vpc.jpg)

To secure data as it travels between nodes, enable node-to-node encryption on OpenSearch Service. For data at rest, the service provides AES-256 encryption through the Key Management Service, applicable to components such as data nodes and log storage.

![The image presents a scenario about a financial institution exploring encryption options in AWS OpenSearch Service, listing five options and asking to choose two.](https://kodekloud.com/kk-media/image/upload/v1752864265/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-encryption-options.jpg)

A key feature of OpenSearch is its security analytics, which monitors infrastructure and ingests data from various sources to detect anomalous activities in real time. This feature triggers alerts (via Slack, email, SNS, etc.) based on pre-configured security rules. Note that security analytics is supported in OpenSearch 2.5 and later.

![The image is a flowchart describing the steps of OpenSearch's Security Analytics feature, including identifying sources, creating a detector, configuring rules and alerts, and generating responses to findings.](https://kodekloud.com/kk-media/image/upload/v1752864266/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/opensearch-security-analytics-flowchart.jpg)

Enhanced security analytics in OpenSearch can be visualized through dashboards that display security metrics and trends, offering valuable insights via anomaly detection in your logs.

![The image presents a question about which AWS OpenSearch Service feature to use for managing user permissions, with four options: AWS IAM Policies, OpenSearch Service Domain Policies, Fine-Grained Access Control (FGAC), and AWS Security Groups.](https://kodekloud.com/kk-media/image/upload/v1752864267/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-opensearch-user-permissions-options.jpg)

The discussion now turns to open source databases and their security on AWS. We will now focus on ElastiCache, AWS’s managed version of Redis or Memcached, optimized for caching and ephemeral data storage.

![The image is an infographic about Amazon ElastiCache, highlighting its two types, Memcached and Redis, and its integration with other AWS services. It outlines key benefits such as microsecond speed, high availability, and cost optimization.](https://kodekloud.com/kk-media/image/upload/v1752864268/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/amazon-elasticache-infographic-memcached-redis.jpg)

ElastiCache is primarily designed for transient data rather than long-term storage. Its basic architecture for Redis includes a primary node handling write operations and replica nodes for read requests. Furthermore, it supports automatic partitioning across multiple shards when operating in Redis cluster mode.

![The image is a question about Amazon ElastiCache for Redis, asking which statements correctly describe its basic architecture, with four options provided.](https://kodekloud.com/kk-media/image/upload/v1752864269/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/amazon-elasticache-redis-architecture-question.jpg)

Security for ElastiCache involves the use of IAM for managing access. For example, an EC2 client armed with a designated role can access ElastiCache using temporary security credentials. While IAM policies define permissions for ElastiCache operations, data-level security within Redis is managed separately through the Redis authentication mechanism.

![The image is a diagram illustrating the security setup for AWS ElastiCache using Redis or Memcached, showing a user accessing an Amazon EC2 instance with a Redis client in a public subnet, which connects to Amazon ElastiCache in a private subnet. Security is managed through IAM policies and temporary security credentials.](https://kodekloud.com/kk-media/image/upload/v1752864270/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/aws-elasticache-security-diagram.jpg)

When evaluating IAM integration with ElastiCache, it is important to recognize that while IAM controls access to the cache service, the Redis authentication mechanism governs operations within the Redis environment.

![The image presents a question about the IAM integration capabilities of Amazon ElastiCache for Redis, with four possible statements to choose from. It is designed to test understanding of AWS IAM and ElastiCache features.](https://kodekloud.com/kk-media/image/upload/v1752864271/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/iam-integration-elasticache-quiz.jpg)

Network isolation is crucial in AWS. For services like Redis on ElastiCache, deploy them within a VPC and utilize either VPC peering or an interface endpoint (not a gateway endpoint) to achieve private connectivity between services.

![The image is an instructional graphic explaining how a global e-commerce platform can achieve isolation for Amazon ElastiCache for Redis using Amazon Virtual Private Cloud (VPC). It lists four steps involving deployment, VPC peering, creating a VPC endpoint, and launching in a public subnet.](https://kodekloud.com/kk-media/image/upload/v1752864272/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/ecommerce-elasticache-vpc-setup.jpg)

For encryption, ElastiCache supports both in-transit encryption (leveraging Redis auth) and encryption at rest. These measures ensure that data remains secure both as it moves between nodes and when stored on disk with help from AWS Key Management Service.

![The image is a diagram illustrating the architecture of ElastiCache (Redis or Memcached) with encryption options, showing public and private subnets, security groups, and data flow with encryption in transit and at rest.](https://kodekloud.com/kk-media/image/upload/v1752864274/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/elasticache-architecture-diagram-encryption.jpg)

ElastiCache also offers extensive logging options that enhance security and troubleshooting:

- > [!important]
  > **Redis Slow Log**
  >
  > The Redis slow log captures commands that exceed a specified execution time, which is useful for troubleshooting latency. It logs only the commands that exceed the threshold, rather than providing a full real-time feed.
- The ElastiCache events log records changes such as modifications to cache clusters and parameter groups. These events can be subscribed to via Amazon SNS and are retained for a set period.
- Engine logs offer insights into the Redis engine's behavior, logging errors or capacity issues such as evictions. These logs integrate seamlessly with CloudWatch Logs.

![The image is an informational graphic about the Redis Slow Log feature in Amazon ElastiCache, presenting four statements to determine which is accurate. It discusses the feature's capabilities in capturing and analyzing slow-running commands.](https://kodekloud.com/kk-media/image/upload/v1752864275/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/redis-slow-log-elasticache-info.jpg)

![The image presents a question about Amazon ElastiCache events for Redis, asking which statement is true, with four options provided. It is designed with a blue background and numbered options.](https://kodekloud.com/kk-media/image/upload/v1752864276/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/amazon-elasticache-redis-question.jpg)

![The image presents a question about Amazon ElastiCache engine logs for Redis, with four possible statements to determine which is accurate. It is designed in a quiz format with a blue background and numbered options.](https://kodekloud.com/kk-media/image/upload/v1752864278/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/amazon-elasticache-redis-quiz.jpg)

Additionally, AWS provides real-time monitoring via CloudWatch, and the ElastiCache console supports automated service updates. Users can schedule or trigger engine version upgrades according to recommended apply dates. This self-service update feature ensures clusters consistently run the latest security fixes.

![The image presents a scenario where an online gaming company uses Amazon ElastiCache for Redis and explores four options for managing service updates to ensure the latest version is always running.](https://kodekloud.com/kk-media/image/upload/v1752864279/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Database-Services-Part-4/online-gaming-amazon-elasticache-updates.jpg)

In summary, ElastiCache supports encryption for data in transit and at rest, provides comprehensive logging and monitoring capabilities, and offers a straightforward mechanism for applying service updates through the AWS console or API. These features are essential for managing both the security and performance of your cache clusters.

This concludes our discussion of the security features for OpenSearch and ElastiCache. In the next section, we will transition to exploring security options for open source databases such as MongoDB and Cassandra, and how AWS enhances security for these platforms.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/2c32ed9d-178c-42a9-9dce-5dfb2014d6f5)**
>
> Watch video content
