# Interactive Dashboards with Drilldowns in Kibana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Understanding-Kibana/Interactive-Dashboards-with-Drilldowns-in-Kibana)

---

## Table of Contents

- Interactive Dashboards with Drilldowns in Kibana
  - Watch Video

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Understanding Kibana

# Interactive Dashboards with Drilldowns in Kibana

Welcome back. In this lesson, we explore a powerful feature in Kibana dashboards: drilldowns. Drilldowns allow you to zoom in on specific details within your visualizations, providing deeper insights into your application's behavior.

Previously, we built a comprehensive dashboard for our application. One noteworthy feature we integrated was the ability to drill down into specific data subsets. For example, if you need to analyze the activities of guest users, you can use Kibana Query Language (KQL) to filter the dashboard and focus exclusively on those interactions.

Consider the following scenario:  
When you click on the "guest" label in the donor tab, the entire dashboard updates to display only records related to guest users. This interaction is what we refer to as a drilldown in Kibana.

The concept is simple. When viewing a chart or visualization that represents aggregated data, clicking on a segment dynamically updates all other visualizations on the dashboard. This ensures every widget reflects data solely pertaining to the selected attribute, such as guest user activities.

> [!important]
> **Example: Investigating Login Failures**
>
> Suppose you want to investigate whether guest users experienced login failures. Perhaps there was an issue with the login process that prevented guest users from successfully creating accounts. By clicking directly on the segment of a graph that indicates "login failures," the drilldown filters the entire dashboard to display detailed information related to these incidents. For instance, if a graph shows two login failures on a particular day, this could suggest either user login errors or a system malfunction.

This drilldown functionality not only enhances data exploration but also enables quicker identification of trends and anomalies, streamlining debugging and optimization efforts.

Thank you for reading this article. We hope this demonstration of drilldowns in Kibana dashboards helps you build and optimize effective dashboards within your organization.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/dca97dc2-95a8-4871-ae50-7aaa3e1864b6/lesson/1c0eee9d-57c1-454b-9623-4d257c13d4bc)**
>
> Watch video content
