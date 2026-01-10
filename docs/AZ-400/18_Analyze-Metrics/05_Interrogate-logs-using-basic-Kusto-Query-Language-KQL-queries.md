# Interrogate logs using basic Kusto Query Language KQL queries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Analyze-Metrics/Interrogate-logs-using-basic-Kusto-Query-Language-KQL-queries)

---

## Table of Contents

- Interrogate logs using basic Kusto Query Language KQL queries
  - Accessing Azure Log Analytics
  - 1. Filtering Security Log Data
  - 2. Summarizing Failed Logins by Account
  - 3. Querying Azure Resource Logs
  - 4. Switching Between UI and KQL Modes
  - 5. Sharing and Exporting Results
  - Links and References
  - Watch Video
    - Key KQL Functions

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Analyze Metrics

# Interrogate logs using basic Kusto Query Language KQL queries

In this guide, you’ll learn how to use Kusto Query Language (KQL) to analyze logs in Azure Log Analytics. Whether you’re preparing for the AZ-400 exam or managing production environments, mastering KQL lets you filter, aggregate, and visualize log data efficiently.

## Accessing Azure Log Analytics

1.  Sign in to the [Azure portal](https://portal.azure.com/).
2.  In the search bar, type **Log Analytics** and select the service.

![The image shows the Microsoft Azure portal with a search bar in use, displaying search results for "Log Analytics" including services, resources, and marketplace options.](https://kodekloud.com/kk-media/image/upload/v1752867310/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Interrogate-logs-using-basic-Kusto-Query-Language-KQL-queries/azure-portal-log-analytics-search-results.jpg)

3.  Choose your workspace and click **Logs** to launch the query interface.

![The image shows a Microsoft Azure Log Analytics workspace interface with options for creating and managing queries. The query history section indicates no queries have been run yet.](https://kodekloud.com/kk-media/image/upload/v1752867312/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Interrogate-logs-using-basic-Kusto-Query-Language-KQL-queries/azure-log-analytics-query-interface.jpg)

All queries run from this **Logs** hub using KQL.

## 1\. Filtering Security Log Data

Filtering is the foundation of any log investigation. Below are examples querying the `SecurityEvent` table.

Retrieve the last 24 hours of security events (limit to 10 records):

```
SecurityEvent
| where TimeGenerated > ago(1d)
| project TimeGenerated, Account, EventID, IpAddress, Computer
| take 10
```

Filter for failed logon attempts (EventID 4625) over the last 30 days:

```
SecurityEvent
| where TimeGenerated > ago(30d)
| where EventID == 4625
| project TimeGenerated, Account, EventID, IpAddress, Computer
| take 10
```

> [!important]
> **Understanding Event IDs**
>
> EventID 4625 indicates an account failed to log on. Use [Microsoft’s official Event ID reference](https://docs.microsoft.com/windows/security/threat-protection/auditing/event-4625) to explore other security events.

## 2\. Summarizing Failed Logins by Account

To identify which accounts are targeted most frequently, aggregate and sort failed login counts:

![The image shows a Microsoft Azure Logs interface with a date range selection calendar open, allowing users to specify a time range for log queries. The interface includes options for running queries and managing log data.](https://kodekloud.com/kk-media/image/upload/v1752867313/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Interrogate-logs-using-basic-Kusto-Query-Language-KQL-queries/azure-logs-interface-date-range-calendar.jpg)

```
SecurityEvent
| where TimeGenerated > ago(30d)
| where EventID == 4625
| summarize FailedLogins = count() by Account
| order by FailedLogins desc
```

### Key KQL Functions

| Function  | Description                      | Example                                |
| --------- | -------------------------------- | -------------------------------------- |
| ago()     | Filters records by relative time | `where TimeGenerated > ago(7d)`        |
| project   | Selects specific columns         | `project TimeGenerated, ResourceGroup` |
| summarize | Aggregates rows                  | `summarize count() by OperationName`   |
| order by  | Sorts the output                 | `order by count_ desc`                 |

## 3\. Querying Azure Resource Logs

Azure resource logs, including activity and diagnostic data, are stored in the `AzureDiagnostics` table.

Fetch the last 7 days of resource operations:

```
AzureDiagnostics
| where TimeGenerated > ago(7d)
| project TimeGenerated, Resource, ResourceGroup, OperationName, ResultType
| take 10
```

Filter to only failed operations:

```
AzureDiagnostics
| where TimeGenerated > ago(7d)
| where ResultType == "Failed"
| project TimeGenerated, Resource, ResourceGroup, OperationName, ResultType
| take 10
```

## 4\. Switching Between UI and KQL Modes

Azure Log Analytics now offers two query experiences:

- **Simple Mode**: Drag-and-drop interface to select tables, apply filters, and set limits without writing code.
- **KQL Mode**: Full control to write custom queries.

Toggle modes via **More analytics settings** in the Logs pane.

![The image shows a Microsoft Azure Logs interface displaying a table of log entries with various columns like TimeGenerated, Id, Source, and ResultCode. A dropdown menu for adding filters and operators is open, with a cursor pointing to the "Add" button.](https://kodekloud.com/kk-media/image/upload/v1752867315/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Interrogate-logs-using-basic-Kusto-Query-Language-KQL-queries/azure-logs-interface-log-entries-table.jpg)

## 5\. Sharing and Exporting Results

Once your query returns data, you can:

- Copy a secure link to share the query
- Export results to CSV (all rows or displayed columns)
- Copy results to the clipboard

> [!important]
> **Warning**
>
> Be cautious when sharing or exporting sensitive log data. Always follow your organization’s data governance policies.

---

With these techniques, you can:

- Filter and project security events
- Aggregate and rank failed logins
- Query Azure resource diagnostics
- Navigate both UI-driven and code-driven analysis
- Securely share or export log data

## Links and References

- [Azure Log Analytics Overview](https://docs.microsoft.com/azure/azure-monitor/logs/log-analytics-overview)
- [Kusto Query Language (KQL) Documentation](https://docs.microsoft.com/azure/data-explorer/kusto/query/)
- [AzureDiagnostics Table Schema](https://docs.microsoft.com/azure/azure-monitor/platform/log-analytics-diagnostics)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/473876ba-f35b-4ae7-a361-3fc9572e593d/lesson/a3725ba3-cde5-459e-9df9-2da9b8050fd1)**
>
> Watch video content
