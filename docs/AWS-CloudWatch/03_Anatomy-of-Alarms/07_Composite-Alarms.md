# Composite Alarms - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-CloudWatch/Anatomy-of-Alarms/Composite-Alarms)

---

## Table of Contents

- Composite Alarms
  - Why Composite Alarms Matter
  - How to Create a Composite Alarm
  - Best Practices
  - Further Reading
  - Watch Video

---

## Content

AWS CloudWatch

Anatomy of Alarms

# Composite Alarms

AWS CloudWatch composite alarms help you manage alert noise and detect complex multi-resource scenarios by combining individual alarms with logical operators. Instead of being inundated with notifications from every metric threshold breach, you define a single composite condition that must be met before an alert fires.

## Why Composite Alarms Matter

Imagine an Auto Scaling group with dozens of EC2 instances, each monitored by alarms on CPU utilization, status checks, and network traffic. Alerts start flooding in—even for minor spikes—making it hard to spot real issues. Composite alarms act like a “chief of monitoring,” aggregating these signals and only notifying you when a meaningful combination of events occurs.

> [!important]
> **Note**
>
> Composite alarms reference existing standard alarms; they do not evaluate raw metrics directly.

Benefits at a glance:

| Benefit               | Description                                                       | Example                                                                                     |
| --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Noise Reduction       | Group related alarms to avoid alert fatigue.                      | Trigger only when both CPUUtilization _and_ StatusCheckFailed are ALARM.                    |
| Scenario Detection    | Define complex conditions that single alarms can’t express.       | Alert if network traffic is high _OR_ a custom application error rate exceeds threshold.    |
| Simplified Management | Replace multiple notification workflows with one composite alarm. | One alarm configuration in SNS/ChatOps instead of dozens of individual alarm subscriptions. |

![The image illustrates the concept of AWS CloudWatch Composite Alarms, showing how multiple alarms from EC2 instances in an Auto Scaling Group can be combined to reduce alarm noise and detect specific scenarios.](https://kodekloud.com/kk-media/image/upload/v1752862374/notes-assets/images/AWS-CloudWatch-Composite-Alarms/aws-cloudwatch-composite-alarms-diagram.jpg)

## How to Create a Composite Alarm

Follow these steps to set up a composite alarm via the AWS CLI or Console:

1.  **Create Individual Alarms**  
    Define standard CloudWatch alarms on metrics such as CPUUtilization or StatusCheckFailed.

    ```
    aws cloudwatch put-metric-alarm \
      --alarm-name CPUAlarm \
      --metric-name CPUUtilization \
      --namespace AWS/EC2 \
      --statistic Average \
      --period 300 \
      --threshold 80 \
      --comparison-operator GreaterThanThreshold \
      --evaluation-periods 2 \
      --alarm-actions arn:aws:sns:us-east-1:123456789012:NotifyMe
    ```

2.  **Configure the Composite Alarm**  
    Reference the individual alarms in a rule expression using logical operators. Supported operators: AND, OR, NOT, and parentheses for grouping.

    ```
    aws cloudwatch put-composite-alarm \
      --alarm-name HighCpuAndStatusAlarm \
      --alarm-rule "ALARM(CPUAlarm) AND ALARM(StatusCheckAlarm)" \
      --actions-enabled \
      --alarm-actions arn:aws:sns:us-east-1:123456789012:NotifyMe
    ```

3.  **Monitor Combined Conditions**  
    CloudWatch evaluates the rule expression continuously. The composite alarm enters the ALARM state only when the logical condition is met.
4.  **Receive Consolidated Notifications**  
    Instead of multiple alerts, you get a single notification that pinpoints the scenario requiring attention.

## Best Practices

- Build composite alarms around related metrics or services to maximize relevance.
- Use descriptive names for both standard and composite alarms to simplify troubleshooting.
- Test expressions in the console before automating via CLI or Infrastructure-as-Code.

> [!important]
> **Warning**
>
> Composite alarms cannot reference other composite alarms. Plan your alarm hierarchy accordingly.

## Further Reading

- [AWS CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html)
- [Monitoring Auto Scaling with CloudWatch](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html)
- [AWS CLI put-composite-alarm](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-composite-alarm.html)

---

Implementing composite alarms in your AWS monitoring strategy reduces alert fatigue, surfaces critical issues, and simplifies configuration. Start combining your alarms today for smarter, more actionable alerts!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloudwatch/module/41c3204a-bf91-4e6f-8175-02ef9b9f6b82/lesson/cd352d34-23fa-4919-b791-3c9231f0c8d1)**
>
> Watch video content
