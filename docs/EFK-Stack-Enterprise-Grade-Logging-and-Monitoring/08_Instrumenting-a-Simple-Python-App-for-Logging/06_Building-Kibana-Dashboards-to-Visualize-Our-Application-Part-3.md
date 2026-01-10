# Building Kibana Dashboards to Visualize Our Application Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Instrumenting-a-Simple-Python-App-for-Logging/Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3)

---

## Table of Contents

- Building Kibana Dashboards to Visualize Our Application Part 3
  - Creating a Dashboard and Visualization
  - Adding More Log Information
  - Monitoring Endpoints
  - Tracking Successful and Failed Logins
  - Enhancing Visual Cues with Color Coding
  - Conclusion
  - Watch Video
    - Successful Logins
    - Failed Logins

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Instrumenting a Simple Python App for Logging

# Building Kibana Dashboards to Visualize Our Application Part 3

Welcome back! In the previous lesson, we upgraded our Python Login App to a new version that sends detailed logs to Elasticsearch and demonstrated how to roll out the change in Kubernetes. In this lesson, we'll build a useful, real-time Kibana dashboard to help you visualize and monitor your application effectively.

## Creating a Dashboard and Visualization

Start by opening your Kibana dashboard. Follow these steps:

1.  Click on the three horizontal lines (menu) and select **Dashboard**.
2.  Click **Create Dashboard** and then **Create Visualization**. This navigates you directly to the Lens console where you see a list of available fields.

For instance, to analyze the number of GET and POST operations, locate the field `request method.keyword`. Click it to confirm that it contains GET and POST request details.

![The image shows a dashboard interface from Elastic, with options to drag and drop fields for data visualization. It includes a list of available fields and a pop-up displaying top values for a selected field.](https://kodekloud.com/kk-media/image/upload/v1752874224/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3/elastic-dashboard-drag-drop-visualization.jpg)

Drag and drop the field into the center of the screen. Lens suggests the best visualization method based on your data. Choose the donut chart visualization to get a clear, visual comparison of GET versus POST requests.

![The image shows a dashboard from Elastic with a donut chart displaying the distribution of GET and POST requests, with POST at 63.64% and GET at 36.36%. The interface includes options for filtering data and selecting fields.](https://kodekloud.com/kk-media/image/upload/v1752874225/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3/elastic-dashboard-donut-chart-requests.jpg)

Click **save and return** to save the visualization. Name the chart “GET versus POST operation” and adjust its size if necessary. Next, add a panel by selecting **Text** and providing a description such as “This is a real-time dashboard for Login App.” Save your changes.

## Adding More Log Information

Your application generates additional log information, which can help monitor its health. For example, tracking the number of logs entering Elasticsearch can differentiate between normal operations and potential issues.

To inspect these logs:

1.  Click on the field `level.keyword` to see entries like info and warning messages.
2.  Drag and drop the `level.keyword` field into the workspace.
3.  Change the visualization type to an area chart and choose the “area over time” option to visualize log levels chronologically.

![The image shows a dashboard interface from Elastic, displaying available fields for data visualization and a prompt to drop fields to start creating visualizations. A pop-up shows top values for a field named "level.keyword."](https://kodekloud.com/kk-media/image/upload/v1752874226/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3/elastic-dashboard-data-visualization.jpg)

This area chart effectively visualizes the info and warning logs over time. Although the chart might seem cluttered at first, it will provide more insights as data accumulates. Once adjusted, click **save**.

To test this visualization, return to the Login App and attempt several logins (around 4 or 5 times). Then, refresh your dashboard. By default, the dashboard shows data for the last 15 minutes. To extend this:

1.  Click the time range button.
2.  Select “30 minutes ago” and click update.

This adjustment will update the graph with new data.

> [!important]
> **Note**
>
> If no data appears, it might indicate an issue with the application, Fluent Bit, or Elasticsearch. Further investigation is required.

## Monitoring Endpoints

Monitoring endpoint traffic is crucial for load distribution insights. Follow these steps to track endpoint requests:

1.  Locate the field `requesturl.keyword` to view endpoints (e.g., login, second-level authentication, welcome page).
2.  Drag and drop `requesturl.keyword` into the Lens workspace.
3.  Switch the visualization to an “overtime” chart to see the number of requests hitting each endpoint over time.

For example, the dashboard might display around 10 requests for `/login`, 4 for second-level authentication, and 2 for the welcome endpoint. Save this visualization as “endpoint monitoring.”

## Tracking Successful and Failed Logins

To monitor login success and failures:

### Successful Logins

1.  Click the three horizontal lines and navigate to **Discover**.
2.  In the search bar, enter the following KQL query:

    ```
    message: "login successful"
    ```

3.  Update the results and then click the Lens button to transform these results into a visualization.
4.  Choose **Count Overall** to display the data as a single numerical value.
5.  Save the visualization as “login successful count” and add it to your dashboard at the top.

### Failed Logins

1.  Again navigate to **Discover**.
2.  Modify the query to:

    ```
    message: "failed"
    ```

3.  Click update and then the Lens button.
4.  Select **Count Overall** to visualize the count of failed login attempts.
5.  Save this visualization as “count for failed login attempts,” and position it alongside the successful login count on the dashboard.

![The image shows a real-time dashboard for a login application, featuring a pie chart comparing GET and POST requests, a line graph of records over time, and statistics on successful logins and failed attempts.](https://kodekloud.com/kk-media/image/upload/v1752874227/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3/login-dashboard-elastic-pie-chart.jpg)

## Enhancing Visual Cues with Color Coding

To make the dashboard more intuitive, you can highlight when the number of failed logins exceeds a certain threshold. For example, if there are more than 10 failed login attempts in the last 30 minutes, the number can appear in red to signal a potential issue.

Follow these steps to adjust the failed logins visualization:

1.  Click the three dots and select **Edit Visualization**.
2.  Choose **Edit in Lens** and click on the **Count of Records** series.
3.  Scroll down to the “Color by value” option.
4.  Toggle the color settings and set thresholds—define a lower threshold (for example, 4.66 with yellow) and a higher threshold (10 with red).

![The image shows a data visualization interface displaying a "Count of records" with the number 7, alongside a color range selector for visual representation. The interface includes options for adjusting color ranges and a time filter set to the last 30 minutes.](https://kodekloud.com/kk-media/image/upload/v1752874228/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Kibana-Dashboards-to-Visualize-Our-Application-Part-3/data-visualization-count-7-interface.jpg)

After saving and returning to the dashboard, test the functionality by generating some failed login attempts. If the failed login count exceeds 10, the number should automatically turn red.

> [!important]
> **Warning**
>
> If the color coding does not reflect the expected thresholds, double-check your settings and ensure that the data is being ingested correctly.

## Conclusion

You have built a fully functional, real-time dashboard for the Login App using Elasticsearch and Kibana. This lesson walked you through the entire process—from generating logs with Fluent Bit to creating visualizations in Kibana using Lens. These visualizations help monitor GET vs. POST requests, log levels, endpoint traffic, and login success versus failure.

Thank you for following along, and I look forward to our next lesson!

For further reading and related resources, consider checking out the following:

- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
- [Kibana User Guide](https://www.elastic.co/guide/en/kibana/current/index.html)
- [Fluent Bit Documentation](https://docs.fluentbit.io/)

Happy monitoring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/2c0792c4-1a21-404f-83e2-75698bc62fe0/lesson/73adfddb-5d77-48f1-b106-92dde87ae475)**
>
> Watch video content
