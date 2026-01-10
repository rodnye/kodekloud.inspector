# Running the Experiment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Chaos-Engineering/Chaos-Engineering-on-Availability-Zone/Running-the-Experiment)

---

## Table of Contents

- Running the Experiment
  - 1. Establish Steady State
  - 2. Launch the Power Interruption Experiment
  - 3. Observe the RDS Failover
  - 4. Measure Impact on Application Metrics
  - Conclusion
  - Links and References
  - Watch Video
    - 1.1 Verifying with X-Ray Trace Map
    - 1.2 Monitoring Database Metrics in CloudWatch

---

## Content

Chaos Engineering

Chaos Engineering on Availability Zone

# Running the Experiment

In this guide, we'll walk through executing a targeted power interruption against an Amazon RDS Aurora cluster using AWS Fault Injection Simulator (FIS). You’ll learn how to:

- Establish and verify steady state conditions
- Launch a multi-step fault injection experiment
- Observe automated failover in RDS
- Measure application resilience with CloudWatch

> [!important]
> **Prerequisites**
>
> Make sure you have the following in place before you begin:
>
> - AWS CLI configured with sufficient permissions
> - An Aurora multi-AZ cluster behind an Application Load Balancer
> - AWS FIS permissions and the **Easy Power Interruption** experiment template

---

## 1\. Establish Steady State

Before introducing any faults, generate consistent load and confirm that your application and database are stable.

1.  Open your browser or use a load testing tool to send continuous requests to the pet adoption site for ~10 minutes.
2.  Collect baseline metrics from AWS X-Ray and CloudWatch.

### 1.1 Verifying with X-Ray Trace Map

1.  In the AWS Console, navigate to **AWS X-Ray** → **Trace Map**.
2.  Filter on the **PGSQL Query** service node and set the time window to the last 10 minutes.

You should observe:

- Sub-millisecond latencies
- ~139 requests per minute
- Zero faults

![The image shows an AWS CloudWatch Trace Map interface, displaying a visual representation of connections between a client, a "petfood-metric" node, and a "PGSQL Query" node.](https://kodekloud.com/kk-media/image/upload/v1752871820/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-cloudwatch-trace-map-interface.jpg)

### 1.2 Monitoring Database Metrics in CloudWatch

Open your custom **Easy Impairment Dashboard** in CloudWatch. Set the time range to 15 minutes and verify:

| Metric                 | Console Widget                         | Expected Steady State      |
| ---------------------- | -------------------------------------- | -------------------------- |
| RDS Writer Connections | RDS Database connections (blue line)   | Steady at writer node only |
| RDS Reader Connections | RDS Database connections (orange line) | Zero reader connections    |
| UnHealthyHostCount     | ALB UnHealthyHostCount                 | Zero                       |
| Latency / Fault Rate   | PGSQL Query metrics                    | <1 ms latency; 0% faults   |

![The image shows an AWS CloudWatch interface displaying metrics for a PGSQL query, including latency, requests, and fault rates over a specified time period. Graphs illustrate response times, request counts, and fault percentages.](https://kodekloud.com/kk-media/image/upload/v1752871821/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-cloudwatch-pgsql-metrics-graph.jpg)

![The image shows an AWS CloudWatch dashboard named "AZImpairmentDashboard" displaying various metrics such as ALB HTTP 5XX codes, ALB ProcessedBytes, ALB Active Connections, ALB HTTP 4XX codes, RDS Database connections, and ALB UnHealthyHostCount over a 15-minute custom time range.](https://kodekloud.com/kk-media/image/upload/v1752871822/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-cloudwatch-azimpairment-dashboard-metrics.jpg)

---

## 2\. Launch the Power Interruption Experiment

Now that baseline metrics are confirmed, we’ll execute the fault injection using AWS FIS.

1.  Go to **AWS Fault Injection Simulator** in the console.
2.  Select the **Easy Power Interruption** template.
3.  Click **Preview targets** to review the affected resources.

> [!important]
> **Warning**
>
> Double-check your target resources. This experiment will impact EC2 instances, Auto Scaling groups, subnets, RDS clusters, and more.

![The image shows an AWS Fault Injection Simulator (FIS) interface with a list of targets for resilience testing, including ElastiCache clusters and EC2 instances. The sidebar includes options for resilience management and testing.](https://kodekloud.com/kk-media/image/upload/v1752871823/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-fault-injection-simulator-interface.jpg)

The preview lists:

- Custom IAM role
- EC2 instances & Auto Scaling group
- Aurora RDS cluster
- Subnets, security groups, etc.

When you’re ready, click **Start experiment**.

![The image shows an AWS Resilience Hub interface displaying a list of resources related to a fault injection service experiment. It includes details like resource types and target information.](https://kodekloud.com/kk-media/image/upload/v1752871825/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-resilience-hub-fault-injection-experiment.jpg)

AWS FIS will execute actions in sequence. If a resource type isn’t present (e.g., ElastiCache), FIS skips it without failing the experiment.

![The image shows the AWS Resilience Hub interface, specifically the Fault Injection Service, displaying an "Actions summary" table with various actions, their statuses, and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752871826/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-resilience-hub-fault-injection-summary.jpg)

---

## 3\. Observe the RDS Failover

As the power interruption hits one AZ, your Aurora cluster will automatically fail over to the standby instance.

1.  Open the **Amazon RDS** console.
2.  Watch the writer and reader roles swap in your DB cluster view.

![The image shows an Amazon RDS dashboard displaying a list of databases with their identifiers, status, roles, engines, and other details. It includes a banner about Aurora I/O-Optimized and a suggestion for Blue/Green Deployment.](https://kodekloud.com/kk-media/image/upload/v1752871828/notes-assets/images/Chaos-Engineering-Running-the-Experiment/amazon-rds-dashboard-databases-aurora.jpg)

The failover typically completes in seconds, restoring full write capability.

---

## 4\. Measure Impact on Application Metrics

Switch back to the **Easy Impairment Dashboard** with a 10-minute range to capture transient effects:

- Writer-node connections dip briefly
- Reader-node connections rise to accommodate traffic
- A short-lived spike in **UnHealthyHostCount**

![The image shows an AWS CloudWatch dashboard named "AZImpairmentDashboard" displaying various metrics such as ALB HTTP 5XX and 4XX codes, processed bytes, active connections, RDS database connections, and unhealthy hosts over a custom time range.](https://kodekloud.com/kk-media/image/upload/v1752871829/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-cloudwatch-azimpairment-dashboard-metrics-2.jpg)

![The image shows a line graph from AWS CloudWatch displaying RDS database connections over time. Two lines represent different database instances, with one increasing and the other decreasing in connection count.](https://kodekloud.com/kk-media/image/upload/v1752871830/notes-assets/images/Chaos-Engineering-Running-the-Experiment/aws-cloudwatch-rds-connections-graph.jpg)

Despite momentary fluctuations, the pet adoption site remains fully functional with no end-user errors.

---

## Conclusion

By simulating a power loss in one Availability Zone, we verified that:

- Aurora multi-AZ failover happens automatically and swiftly
- The application maintains availability and performance
- AWS FIS provides a controlled, repeatable chaos engineering workflow

Replace routine DR drills with targeted chaos experiments to uncover hidden configuration gaps and continuously improve your system’s resilience.

## Links and References

- [AWS Fault Injection Simulator Documentation](https://docs.aws.amazon.com/fis/)
- [Amazon RDS Auto Scaling & Failover](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Managing.html)
- [AWS X-Ray Trace Map Overview](https://docs.aws.amazon.com/xray/latest/devguide/xray-console.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/chaos-engineering/module/e28ed74d-a0c9-4dbd-9950-2b6f83cd8511/lesson/4cf41e07-586a-4337-8295-1e86dc080365)**
>
> Watch video content
