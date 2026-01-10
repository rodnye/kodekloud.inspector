# Building our first dashboard using Kibana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Understanding-Kibana/Building-our-first-dashboard-using-Kibana)

---

## Table of Contents

- Building our first dashboard using Kibana
  - Uploading the CSV File
  - Creating the First Visualization
  - Adding an Image to the Dashboard
  - Visualizing Event Types Over Time
  - Visualizing User ID Distribution
  - Filtering and Drilling Down with KQL
  - Interacting with the Dashboard
  - Conclusion
  - Watch Video
  - Practice Lab
    - Visualizing "Reason" Data

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Understanding Kibana

# Building our first dashboard using Kibana

Welcome to this comprehensive guide on creating your first Kibana dashboard. In this tutorial, we will walk you through uploading log data from a CSV file, visualizing it with Kibana's Lens feature, and leveraging KQL for deeper insights, all with step-by-step instructions and clear diagrams.

---

## Uploading the CSV File

Begin by opening the Kibana UI and selecting the "Upload a file" option. Drag and drop a CSV file containing log data from an Ecommerce Application. Kibana automatically analyzes the CSV file and displays key metadata including the number of lines analyzed, the delimiter, and header information.

Kibana also presents a snapshot of the file statistics, helping you understand which fields will be available for your dashboard. For example:

![The image shows a screenshot of a data analysis interface for a CSV file named "ecommerce_logs.csv," displaying file contents, summary statistics, and field analysis.](https://kodekloud.com/kk-media/image/upload/v1752874269/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/data-analysis-ecommerce-logs-screenshot.jpg)

Next, scroll up and click on **Import**. Assign an index name—use "Ecommerce Application" for this example. After clicking **Import**, Kibana processes the file by creating an index and ingesting the data into Elasticsearch.

Upon successful data upload, a confirmation view is displayed:

![The image shows a data import interface from Elastic, displaying the successful processing of an "ecommerce_logs.csv" file with a bar chart and import details. Options for viewing and managing data are also visible.](https://kodekloud.com/kk-media/image/upload/v1752874270/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/elastic-data-import-ecommerce-logs.jpg)

Click **View index in Discovery** to review the uploaded data. You will see details such as a defined time frame (e.g., Jan 1, 2023 to April 25, 2024) and various fields like timestamp, event type, IP address, product ID, promotion ID, reason, and user ID.

---

## Creating the First Visualization

To start building your dashboard, follow these steps:

1.  Click the three-line menu.
2.  Select **Dashboard**.
3.  Click on **Create a dashboard**.
4.  Choose **Create Visualization** to open the Lens UI.

On the left side of the Lens UI, all available fields from the selected index are listed. If multiple indices are in use, ensure you select the correct one from the drop-down menu.

### Visualizing "Reason" Data

1.  Select the **reason** field and drag it to the center.
2.  Kibana Lens will suggest a bar chart that displays the count of records for each value in the "reason" field for the selected date range.

![The image shows a dashboard from an analytics tool displaying a vertical bar chart. The chart visualizes the count of records for different reasons, such as "user_not_found," "too_many_attempts," and "invalid_password."](https://kodekloud.com/kk-media/image/upload/v1752874272/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/analytics-dashboard-bar-chart.jpg)

This chart highlights issues like failed logins caused by missing user IDs, providing valuable insights into your application's performance. To incorporate this chart into the dashboard:

- Click **Save and return**.
- Enter a title (e.g., "Count of Reason Type").
- Click **Apply**.
- Save the dashboard (e.g., "eCommerce App Dashboard").

You can also adjust the chart panel's size by resizing it. Optionally, add a text panel by selecting **Add panel** > **Text** to include notes such as "Centralized dashboard for our ecommerce app information." Click **Update** and **Save** to confirm.

---

## Adding an Image to the Dashboard

Personalize your dashboard by adding an image, such as a team logo:

1.  Click **Add panel**, then select **Image**.
2.  Drag and drop your local image file into the panel.
3.  Once the image is displayed, click **Save** and adjust its size if necessary.

Return to Lens by clicking **Add panel** and choosing **Lens** to continue creating additional visualizations.

---

## Visualizing Event Types Over Time

Analyze the event types captured from your ecommerce application to gain insights on user activity. For example, events such as "login_attempt" and "product_view" can help track user behavior.

1.  Drag the **event type** field to the center.
2.  Click on the **Overtime** option to visualize event types over various dates.

![The image shows a dashboard from Elastic with a vertical bar chart displaying the count of records for different event types in an e-commerce app. The chart includes categories like login attempts, login failures, login successes, promotion clicks, checkouts, and others.](https://kodekloud.com/kk-media/image/upload/v1752874273/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/elastic-dashboard-ecommerce-bar-chart.jpg)

This visualization might reveal, for instance, that on a specific date (e.g., 27/11/2023) there were multiple login attempts, login failures, and other events. To add this chart:

- Click **Save and return**.
- Provide a title (e.g., "Event Type").
- Click **Apply** to update the dashboard.

---

## Visualizing User ID Distribution

Gain insights into user engagement by creating a visualization for the **user ID** field:

1.  Select the **user ID** field.
2.  Drag it to the center and choose a donut or pie chart as the visualization style.

This chart can illustrate user distribution, such as showing that 19% of users are guests, with the remaining representing logged-in users or specific IDs. If required, click on a segment (e.g., the guest slice) and adjust to display more values (for example, increase from the top five to 500 values).

![The image shows a dashboard from Elastic with a donut chart displaying user data from an e-commerce app. The chart segments include "guest" at 19% and "Other" at 80.6%, with smaller segments for specific user IDs.](https://kodekloud.com/kk-media/image/upload/v1752874274/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/elastic-dashboard-donut-chart-user-data.jpg)

After verifying the data display:

- Click **Save and return**.
- Enter a title (e.g., "User ID Distribution").
- Click **Apply**.
- Reposition the panel as needed (then click **Save** to finalize the dashboard).

---

## Filtering and Drilling Down with KQL

Focus on specific events, such as login failures, using Kibana Query Language (KQL):

1.  Navigate to the **Discover** section by clicking the three-line menu and selecting **Discover**.
2.  If prompted, click **Discard changes**.
3.  In the search bar, enter the following KQL syntax:

    ```
    event_type: "login_failure"
    ```

4.  Click **Update** to filter the logs, displaying only entries that match the search criteria.

![The image shows an Elastic dashboard displaying a bar chart and a table of login failure events for an e-commerce app, with details like timestamps, IP addresses, and reasons for failure.](https://kodekloud.com/kk-media/image/upload/v1752874275/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/elastic-dashboard-login-failures.jpg)

After verifying the filtered logs, switch back to the visualization view by clicking the Lens icon. Select **Count overall** to create a chart representing the total number of login failure records. The KQL syntax remains visible at the top of the screen for reference.

- Click **Save**.
- Provide a chart name (e.g., "Count of Login Failures").
- Choose your existing dashboard.
- Click **Save and go to dashboard**.

![The image shows a dashboard from Elastic displaying a bar chart of login failure events over time, along with a detailed list of these events including timestamps, IP addresses, and reasons for failure.](https://kodekloud.com/kk-media/image/upload/v1752874277/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/elastic-dashboard-login-failures-chart.jpg)

---

## Interacting with the Dashboard

Your fully interactive dashboard now includes multiple panels featuring visualizations and images, each representing different aspects of your ecommerce application's logs. For example, clicking on a chart segment such as "invalid password" triggers a drilldown, filtering the entire dashboard to focus on that specific event.

To adjust your view:

- Remove any applied filters by clicking the clear (cross) button.
- Refresh the dashboard to restore the normal view.
- Modify the date range by selecting new start and end dates (e.g., displaying logs from April 1, 2023 to April 25, 2024).

![The image shows a dashboard from an analytics platform with various charts and graphs, including bar charts, a pie chart, and a record count, related to an e-commerce app's data.](https://kodekloud.com/kk-media/image/upload/v1752874278/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-our-first-dashboard-using-Kibana/ecommerce-analytics-dashboard-charts.jpg)

These interactive capabilities greatly enhance the troubleshooting and monitoring processes, making it easier for application developers, SREs, DevOps engineers, and product teams to extract actionable insights.

---

## Conclusion

In this lesson, you learned how to build an end-to-end dashboard for an ecommerce application using Kibana. By integrating various tools such as Lens for visualization, KQL for filtering, and interactive drilldowns, you are now equipped to monitor and debug your application effectively.

> [!important]
> **Note**
>
> For more information on Kibana and other Elastic Stack components, check out the [Elastic Documentation](https://www.elastic.co/guide/index.html).

Thank you for following along, and stay tuned for our next lesson where we explore more advanced Kibana features.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/dca97dc2-95a8-4871-ae50-7aaa3e1864b6/lesson/2661a6ba-85bb-481f-ad6f-4807bba3baec)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/dca97dc2-95a8-4871-ae50-7aaa3e1864b6/lesson/63fdc4a2-d0f0-4682-8458-132971bacda2)**
>
> Practice lab
