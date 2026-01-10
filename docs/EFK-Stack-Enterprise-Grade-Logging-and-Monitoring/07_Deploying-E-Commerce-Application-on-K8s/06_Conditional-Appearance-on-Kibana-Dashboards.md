# Conditional Appearance on Kibana Dashboards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Deploying-E-Commerce-Application-on-K8s/Conditional-Appearance-on-Kibana-Dashboards)

---

## Table of Contents

- Conditional Appearance on Kibana Dashboards
  - Setting Up Conditional Appearance
  - Testing the Conditional Appearance
  - Benefits of Conditional Appearance
  - Watch Video
  - Practice Lab

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Deploying E Commerce Application on K8s

# Conditional Appearance on Kibana Dashboards

Welcome to this guide on how to enhance your Kibana Dashboard by using conditional appearance. In this tutorial, you'll learn how to modify the visual styling of a dashboard element based on specific conditions, making it easier to spot critical issues at a glance.

Imagine a scenario where you track the Out-of-Stock count on your dashboard. Suppose the dashboard shows 450 events in the last 60 minutes—450 potential lost orders due to out-of-stock conditions. To immediately draw attention to such concerning figures, you can set up the dashboard to change the color of the record count when the number of events exceeds a certain threshold, such as 400.

> [!important]
> **Note**
>
> In this demo, if the total Out-of-Stock events exceed 400 within a 60-minute window, the record count will automatically display in red.

## Setting Up Conditional Appearance

Follow these steps to configure the conditional appearance for your dashboard:

1.  Open your Dashboard and click on **Edit Filters**.
2.  Select **Count of Records** and navigate to the **Color by Value** section.
3.  Choose the **Text** option and click on **Edit Colors**.
4.  Remove the existing color options.
5.  Add a new rule: if the value is greater than 400, change the text color to red.
6.  Close the settings panel and save your changes.

Once these steps are completed, your dashboard will display the record count in red whenever the number of events exceeds the threshold. In our example, since there were 450 Out-of-Stock events in the last 60 minutes, the count is highlighted in red:

![The image shows a dashboard for monitoring live events on a website, featuring a line graph, a count of 450 records, and a table of failed attempts with timestamps.](https://kodekloud.com/kk-media/image/upload/v1752874177/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Conditional-Appearance-on-Kibana-Dashboards/live-events-monitoring-dashboard.jpg)

## Testing the Conditional Appearance

To further illustrate the conditional formatting feature, try adjusting the time frame on your dashboard. For example, if you change the time frame to include only the last 30 minutes and click **Update**, the record count (224 in this case) remains in the default black color because the count does not surpass the 400 threshold:

![The image shows a dashboard for monitoring live events on a website, featuring a line graph, a count of records (224), and a table of failed attempts with timestamps.](https://kodekloud.com/kk-media/image/upload/v1752874178/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Conditional-Appearance-on-Kibana-Dashboards/live-events-monitoring-dashboard-2.jpg)

> [!important]
> **Warning**
>
> Be sure to verify that the event thresholds match the operational requirements of your monitoring setup to ensure that alerts are both meaningful and actionable.

## Benefits of Conditional Appearance

Implementing conditional formatting on your live dashboards offers several advantages:

| Benefit                  | Description                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Immediate Visual Alerts  | Quickly spot critical issues by highlighting panels that exceed defined thresholds.                   |
| Enhanced Monitoring      | Focus attention on potential problem areas, making it easier to address issues promptly.              |
| Improved Decision-Making | Provide a clear visual representation of data trends, leading to more informed operational decisions. |

By leveraging these benefits, you can monitor your application more effectively and ensure that significant changes are immediately noticeable.

That concludes our tutorial on configuring conditional appearance on Kibana Dashboards. Thank you for reading, and stay tuned for more insights on optimizing your data visualization experience!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/b1b021b3-26c0-4701-aa90-d98fd3d8dc49/lesson/2407f77d-b0c1-4d53-9051-3c296090c7fd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/b1b021b3-26c0-4701-aa90-d98fd3d8dc49/lesson/4ff7c31e-52cd-4191-bc88-c3b7a863cea7)**
>
> Practice lab
