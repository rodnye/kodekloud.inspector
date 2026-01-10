# Monitoring Tools PrometheusGrafanaEvidently - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Model-Deployment-and-Serving/Monitoring-Tools-PrometheusGrafanaEvidently)

---

## Table of Contents

- Monitoring Tools PrometheusGrafanaEvidently
  - The Importance of ML Model Monitoring
  - Essential Metrics to Track
  - Best Practices for ML Model Monitoring
  - Specialized Monitoring Tools
  - Watch Video

---

## Content

Fundamentals of MLOps

Model Deployment and Serving

# Monitoring Tools PrometheusGrafanaEvidently

Hello and welcome back!

In this lesson, we explore how to effectively monitor machine learning (ML) models—a critical requirement for maintaining performance and reliability. Recall our earlier example of a warehouse operator relying on our prediction dashboard, with all associated infrastructure deployed in a Kubernetes cluster. Since 100% of the traffic flows directly from the public dashboard into the cluster, robust monitoring is essential for both the dashboard and the ML serving layer.

Below is a diagram illustrating how the monitoring process integrates within the overall system:

![The image is a flowchart illustrating the process of monitoring machine learning models, showing the interaction between a warehouse operator, a dashboard, frontend and ML serving namespaces, and a CI/CD pipeline.](https://kodekloud.com/kk-media/image/upload/v1752875158/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/ml-model-monitoring-flowchart.jpg)

## The Importance of ML Model Monitoring

Once deployed, continuous monitoring ensures that your models operate as expected and allows for prompt intervention when issues arise. Check out this visual overview:

![The image is a slide titled "Monitoring ML Models" with an illustration of a computer screen displaying a graph and a magnifying glass. Below, it states that model monitoring is a critical phase in the machine learning lifecycle after deployment.](https://kodekloud.com/kk-media/image/upload/v1752875159/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/monitoring-ml-models-graph-illustration.jpg)

Below are three key reasons to incorporate ML model monitoring into your workflow:

1.  **Performance and Maintenance**  
    Think of this as a regular health check for your model. For example, if a credit score model's accuracy drops from 95% to 85% over three months due to changing economic conditions, timely alerts allow for immediate corrective measures.
2.  **Reduction of Issues**  
    Monitoring covers more than simple performance metrics. For instance, a recommendation system might begin favoring certain categories during seasonal trends; without proper monitoring, such biases could remain undetected for too long.
3.  **Feedback Loop**  
    Continuous improvement relies on a robust feedback loop. In a fraud detection system, for example, monitoring helps identify recurring false positives, providing insights to retrain and refine the model with better data.

![The image outlines reasons for monitoring machine learning models, including performance maintenance, detection of issues, and a feedback loop, each represented by a distinct icon.](https://kodekloud.com/kk-media/image/upload/v1752875160/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/monitoring-machine-learning-models-reasons.jpg)

> [!important]
> **Key Points**
>
> Ensuring comprehensive monitoring helps not only in maintaining model performance but also in uncovering hidden patterns or biases that might affect decision-making. Start integrating these practices early in your ML lifecycle.

## Essential Metrics to Track

Monitoring should include a range of metrics to provide a complete picture of your model’s performance and health. Essential metrics include:

- **Accuracy Metrics**  
  Go beyond overall accuracy; track class-specific results, analyze confusion matrices, and review confidence score distributions. For instance, in a production image classification model, these insights can highlight subtle performance shifts.
- **Data Quality**  
  Verify that incoming data meets expected standards by monitoring for feature drift, missing values, and schema changes. If you are processing sensor data, ensure that values remain within the expected range for accurate model inference.
- **Resource Utilization**  
  Monitor system-level metrics like inference latency, memory usage, and GPU utilization. A sudden increase in latency can indicate a bottleneck or potential system issues in data processing.

![The image lists three key metrics to track: Accuracy, Data Quality, and Resource Utilization, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752875162/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/key-metrics-accuracy-data-quality-utilization.jpg)

## Best Practices for ML Model Monitoring

Adopting these best practices helps form a proactive approach to ML monitoring:

1.  **Begin Monitoring Early**  
    Integrate monitoring during the model validation phase rather than waiting for problems in production.
2.  **Set Clear Thresholds**  
    Define explicit limits for performance, data drift, and resource usage. These thresholds aid in early detection of issues.
3.  **Incorporate Multiple Signals**  
    When one metric, such as accuracy, deviates, corroborate with other indicators like resource utilization or data drift to identify the root cause.
4.  **Regular Reviews**  
    Schedule periodic reviews of your metrics rather than relying solely on automated alerts to ensure continuous improvement.

![The image outlines best practices for monitoring, including beginning monitoring early, setting thresholds, incorporating multiple signals, and conducting regular reviews.](https://kodekloud.com/kk-media/image/upload/v1752875163/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/monitoring-best-practices-outline.jpg)

> [!important]
> **Pro Tip**
>
> Begin with critical metrics and expand your monitoring framework progressively. This iterative approach not only simplifies initial setup but also builds confidence in your deployed models over time.

## Specialized Monitoring Tools

Several tools can enhance your ML monitoring strategy, each offering unique capabilities:

- **Prometheus:**  
  A powerful time-series monitoring system commonly used in DevOps, ideal for tracking ML model metrics.
- **Evidently AI:**  
  Specializes in ML monitoring and drift detection, providing insights tailored for machine learning applications.
- **Grafana:**  
  Offers robust visualization and dashboard capabilities on top of Prometheus, making your monitoring data both accessible and actionable.

![The image lists specialized monitoring tools: Prometheus, Evidently AI, and Grafana.](https://kodekloud.com/kk-media/image/upload/v1752875164/notes-assets/images/Fundamentals-of-MLOps-Monitoring-Tools-PrometheusGrafanaEvidently/monitoring-tools-prometheus-evidently-grafana.jpg)

In addition, tools like New Relic offer end-to-end observability for ML models. A common architecture involves using Prometheus to collect base metrics, Grafana for visualization, and Evidently AI for in-depth drift detection.

Remember, ML model monitoring is an ongoing process rather than a one-time setup. Begin with monitoring critical metrics and systematically expand your system to maintain and improve confidence in your deployed models.

Thank you for reading this lesson. Stay tuned for more insights in our next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/2bd484e3-8ec0-4fe4-8dd9-0f7f92e52970/lesson/64e5de0c-fde1-41a1-aa5d-e9630e99e1b3)**
>
> Watch video content
