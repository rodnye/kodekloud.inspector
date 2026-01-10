# RDS RDS proxy - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Database/RDS-RDS-proxy)

---

## Table of Contents

- RDS RDS proxy
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Database

# RDS RDS proxy

Amazon RDS Proxy is a fully managed service designed to improve application performance and enhance database availability. Modern applications frequently open direct connections to their databases to execute queries, insert records, or delete data. As the number of application instances grows, each one establishes its own connection, which can lead to excessive connection overhead and strain the database's CPU and memory resources.

![The image illustrates the need for an RDS Proxy by showing open connections between Amazon RDS and services like Amazon EC2 and AWS Elastic Beanstalk, highlighting issues like exhausting CPU and RAM resources.](https://kodekloud.com/kk-media/image/upload/v1752865244/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-RDS-proxy/rds-proxy-connection-issues-diagram.jpg)

> [!important]
> **Understanding Connection Overhead**
>
> When numerous instances attempt to connect directly to the database, the overhead associated with constantly opening and closing connections can lead to resource exhaustion.

RDS Proxy acts as an intermediary between your application and the RDS database, maintaining a pool of persistent connections. When your application requires a database connection, it routes the request through the proxy, which provides an available, re-established connection from its pool. This strategy keeps the number of active database connections within a manageable limit, thereby reducing the load on the database server.

![The image illustrates the role of an RDS Proxy in managing connections between Amazon Relational Database Service (RDS) and services like Amazon EC2 and AWS Elastic Beanstalk, highlighting limited connections to RDS and open connections to the services.](https://kodekloud.com/kk-media/image/upload/v1752865245/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-RDS-proxy/rds-proxy-connection-management-diagram.jpg)

> [!important]
> **Preventing Resource Exhaustion**
>
> By limiting the number of active connections to the database, RDS Proxy efficiently prevents resource exhaustion. Additional connection requests are either queued or throttled until a connection becomes available.

Key benefits of using Amazon RDS Proxy include:

- **Improved Application Performance:** Reusing established connections minimizes the performance penalty associated with repeatedly opening and closing connections, leading to lower CPU and memory usage.
- **Enhanced Availability:** During a database failover, such as the transition to a standby instance, the proxy automatically reconnects to the new primary instance. This seamless failover handling can reduce downtime by up to 66% for Aurora and RDS databases.
- **Strengthened Security:** RDS Proxy integrates with AWS services like IAM and AWS Secrets Manager, eliminating the need to hardcode credentials and ensuring secure access to your database.
- **Fully Managed and Scalable:** Being a serverless solution, RDS Proxy automatically scales across multiple availability zones and requires no manual deployment, patching, or maintenance.

![The image is a presentation slide titled "AWS RDS Proxy," highlighting features such as improved application performance, increased availability, managed security, full management, compatibility, and durability.](https://kodekloud.com/kk-media/image/upload/v1752865246/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-RDS-RDS-proxy/aws-rds-proxy-presentation-slide.jpg)

In summary, Amazon RDS Proxy provides a robust solution for applications with high connection demands. By pooling persistent connections, it minimizes the overhead on your database, enhances availability during failovers, and integrates seamlessly with AWS security services. This makes it an ideal choice for applications facing sudden traffic spikes, ensuring that your database remains both resilient and efficient.

For further reading on optimizing database connections and integrating AWS services, explore additional resources on [AWS Documentation](https://aws.amazon.com/documentation/) and [Amazon RDS](https://aws.amazon.com/rds/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/9fb73cb5-caf2-4dc2-ad5c-fe5fe69507e3/lesson/13df0deb-66d0-470d-9828-0d69b4fda7c8)**
>
> Watch video content
