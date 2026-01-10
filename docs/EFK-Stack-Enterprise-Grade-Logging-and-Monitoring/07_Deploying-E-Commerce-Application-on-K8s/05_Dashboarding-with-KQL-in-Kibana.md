# Dashboarding with KQL in Kibana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Deploying-E-Commerce-Application-on-K8s/Dashboarding-with-KQL-in-Kibana)

---

## Table of Contents

- Dashboarding with KQL in Kibana
  - Creating a Dashboard for "Page 3" Activity
  - Analyzing Out-of-Stock Trends
  - Monitoring Failed Login Attempts
  - Concluding Thoughts
  - Further Reading
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Deploying E Commerce Application on K8s

# Dashboarding with KQL in Kibana

Welcome to this guide on creating insightful dashboards in Kibana using KQL (Kibana Query Language). In this article, we’ll walk you through filtering logs, creating visualizations, and combining these elements into an effective dashboard. We also compare KQL with the Lens method, enabling you to identify patterns in your logs quickly.

## Creating a Dashboard for "Page 3" Activity

Begin by filtering logs to analyze users viewing page 3. In the Kibana UI, where your logs are listed, enter the query `"page 3"` in the search bar. Using double quotes searches for the exact phrase, ensuring only relevant entries are displayed.

![The image shows a data analytics dashboard with a search query for "viewing page3," displaying a bar graph and a list of log entries highlighting user activity related to viewing a specific page.](https://kodekloud.com/kk-media/image/upload/v1752874180/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/data-analytics-dashboard-user-activity.jpg)

Once you verify the filtered results, click **Save** and assign a name such as "live, page 3 view." This saves your query, keeping the dashboard focused solely on page 3 logs.

Next, click the button that takes you to the dashboard view. Here, you will see a visualization of log counts over various time intervals specifically related to page 3 views. The graph illustrates the trend in record counts.

![The image shows a data visualization interface with a vertical bar chart displaying the count of records over time. The chart is part of a dashboard with options for selecting fields and customizing the visualization.](https://kodekloud.com/kk-media/image/upload/v1752874181/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/data-visualization-bar-chart-dashboard.jpg)

To enhance the visualization, consider switching from a vertical bar chart to a line chart for improved trend analysis. Select the line chart option from the suggestions at the bottom. When satisfied with the new visualization, click **Save** and name it "live count of viewing happening on page 3." Since you don’t yet have a dashboard, choose **view** to proceed with creating one.

Your new dashboard now displays the visualization. You can adjust its size for optimal clarity, then click **Save**. Name your dashboard (for example, "app event monitoring") and confirm the changes.

For additional context, add a text panel to the dashboard. Click on the panel options, select **Text**, and in the markdown editor, enter a description such as:

"This dashboard is for viewing all live events happening on the website."

After updating the text panel, click **Update** and then **Save and Return**. Your dashboard now includes this explanatory text.

![The image shows a dashboard with a line graph displaying live viewing counts on a website and a note indicating the dashboard's purpose for monitoring live events.](https://kodekloud.com/kk-media/image/upload/v1752874182/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/live-viewing-counts-dashboard.jpg)

## Analyzing Out-of-Stock Trends

Switch to Kibana's Discover section (ensuring you are in Discover mode) and search for "out-of-stock" to analyze product availability. The search automatically applies a visualization filter (using a lens button) to display out-of-stock trends.

![The image shows a data dashboard with a bar graph and a list of log entries highlighting "OUT OF STOCK" warnings for orders.](https://kodekloud.com/kk-media/image/upload/v1752874183/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/data-dashboard-bar-graph-out-of-stock.jpg)

This visualization displays the current out-of-stock values along with their counts. For instance, if the counter indicates 334 events, you can use this number in your dashboard to highlight inventory issues over your selected time frame. Save this visualization and add it to your "app event monitoring" dashboard, renaming it to "total out of stock events happening in the time frame selected." Finally, click **Save and go to Dashboard** to view the updated dashboard.

## Monitoring Failed Login Attempts

Return to Discover mode to monitor failed login attempts. Apply a filter for failed attempts by clicking the corresponding button, which takes you to a tabular dashboard view. Change the visualization type to a table format to display the number of failed logins per timestamp.

Once the table view is configured, the dashboard will display the total count of failed login records. Save this visualization as "failed attempt" and add it to your dashboard. You can reposition the panel for better visibility.

![The image shows a dashboard for monitoring live events on a website, featuring a line graph, a count of records (337), and a table of failed attempts with timestamps.](https://kodekloud.com/kk-media/image/upload/v1752874184/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/live-events-monitoring-dashboard.jpg)

To adjust the time frame, update the settings from the last 45 minutes to the last 60 minutes and click **Update**.

> [!important]
> **Time Frame Adjustment**
>
> If you are analyzing data for a shorter period (e.g., 20-30 minutes), the counts might be lower. In this lab, the analysis spans over 60 minutes, which explains the higher numbers.

![The image shows a dashboard with a line graph, a count of records, and a table of failed attempts with timestamps. It is used for monitoring live events on a website.](https://kodekloud.com/kk-media/image/upload/v1752874185/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Dashboarding-with-KQL-in-Kibana/live-event-monitoring-dashboard.jpg)

## Concluding Thoughts

These dashboards provide valuable insights into user behavior and system performance, making it easier to communicate findings to both product managers and engineering teams. For example:

- A significant number of out-of-stock events can trigger inventory management actions.
- Frequent views on page 3 (such as in a groceries application) could indicate a need for scaling associated systems.
- Numerous failed login attempts may signal potential backend load issues that require further investigation.

This article demonstrated how to build dashboards in Kibana using KQL with a straightforward, SQL-like syntax. Thank you for reading, and we look forward to sharing more insights in our upcoming lessons.

## Further Reading

- [Kibana Documentation](https://www.elastic.co/guide/en/kibana/current/index.html)
- [Elasticsearch Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/b1b021b3-26c0-4701-aa90-d98fd3d8dc49/lesson/06218a17-a219-4ab0-919e-15604e61fa3d)**
>
> Watch video content
