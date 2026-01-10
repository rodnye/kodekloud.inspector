# Building Dashboard Maps with Kibana - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring/Understanding-Kibana/Building-Dashboard-Maps-with-Kibana)

---

## Table of Contents

- Building Dashboard Maps with Kibana
  - Overview
  - Step 1: Uploading Your Data
  - Step 2: Creating a Dashboard Map
  - Step 3: Analyzing the Map Data
  - Strategic Insights
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

EFK Stack: Enterprise-Grade Logging and Monitoring

Understanding Kibana

# Building Dashboard Maps with Kibana

Welcome to this tutorial on constructing dynamic dashboard maps with Kibana. In this lesson, we'll utilize your application's log data to visually represent global traffic patterns on geographic maps. This powerful visualization helps you understand user behavior and optimize your application's deployment.

## Overview

Imagine you want to analyze website visits over the past two years. With Kibana, you can effortlessly see where your users are coming from by plotting geographic coordinates obtained from your logs. This capability is invaluable for identifying traffic hotspots and making informed strategic decisions.

## Step 1: Uploading Your Data

Begin by opening the Kibana UI and navigating to the **Upload a file** option. Drag and drop your sample data file containing website visit information from around the world.

![The image shows a webpage from Elastic where a CSV file named "website_visit_data.csv" is being uploaded, displaying its contents and a summary of the data.](https://kodekloud.com/kk-media/image/upload/v1752874265/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Dashboard-Maps-with-Kibana/elastic-website-visit-data-upload.jpg)

Once uploaded, click on **Import**. Name your index (for example, "website traffic") and wait for the process to finish. Then, scroll down and select **View index in Discovery**.

> [!important]
> **Note**
>
> Ensure that the logs include geographical coordinates or location data. Without this, Kibana cannot plot the information on maps. If needed, consult with your development team to include these details in your logging system.

## Step 2: Creating a Dashboard Map

1.  Click on the navigation menu (represented by three horizontal lines).
2.  Go to **Dashboard** and click **Create Dashboard**.
3.  Choose **All types** and select **Lens**.
4.  If you see multiple indexes, select **website traffic** from the dropdown menu.
5.  Drag and drop the **location available** field into the designated area.

Kibana will automatically generate a map with your plotted traffic data.

## Step 3: Analyzing the Map Data

The generated map displays data for the period from January 2, 2023, to December 31, 2023. Each dot on the map corresponds to current traffic records based on your logs.

To explore these trends further, click on the time slider (depicted by a clock icon). Adjust the slider by moving the bar toward the end, shift it slightly to the left, and press the **Run** or **Play** button. As the timeline plays, observe how the data points move to reflect changes over time. For example, new traffic points in Japan indicate increased activity, while points that were missing may reappear as conditions change.

![The image shows a world map with various locations marked, likely representing website traffic data, displayed on an Elastic dashboard interface.](https://kodekloud.com/kk-media/image/upload/v1752874267/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Dashboard-Maps-with-Kibana/world-map-website-traffic-dashboard.jpg)

Try pausing the timeline and narrowing the timeframe further to focus on localized traffic behaviors. You might observe patterns such as temporary drops or surges in visits from specific regions like Osaka.

## Strategic Insights

This interactive dashboard is not only useful for visualizing data but also for strategic planning. By analyzing the geographic distribution of your traffic, you can make decisions like deploying your application closer to your end users for enhanced performance. For instance, a clustering of users in the European region, especially around the UK, might indicate the benefits of hosting parts of your application in that region to reduce latency.

![The image shows a world map with various data points marked, likely representing website traffic, using the Elastic platform. There is a timeline slider at the bottom for adjusting the date range of the data displayed.](https://kodekloud.com/kk-media/image/upload/v1752874268/notes-assets/images/EFK-Stack-Enterprise-Grade-Logging-and-Monitoring-Building-Dashboard-Maps-with-Kibana/world-map-website-traffic-elastic.jpg)

## Conclusion

This lesson covered how to build dashboard maps with Kibana to visualize global traffic data. By following these steps, you can derive valuable insights to optimize your application performance and design more strategic deployment plans.

Thank you for following along. Happy mapping, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/dca97dc2-95a8-4871-ae50-7aaa3e1864b6/lesson/a84225e2-4030-480b-aad3-8ebe896f356f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/efk-stack-enterprise-grade-logging-and-monitoring/module/dca97dc2-95a8-4871-ae50-7aaa3e1864b6/lesson/3f2cf834-9ba2-4026-9475-5ad58e05e6d3)**
>
> Practice lab
